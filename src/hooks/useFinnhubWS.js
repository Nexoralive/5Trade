import { useState, useEffect, useRef } from 'react';

const API_KEY = import.meta.env.VITE_FINNHUB_KEY || '';
const TWELVEDATA_KEY = import.meta.env.VITE_TWELVEDATA_KEY || '';

// Realistic seed prices per symbol
const SEED_PRICES = {
    'RELIANCE': 1360,
    'TCS': 3520,
    'HDFCBANK': 1785,
    'INFY': 1575,
    'BINANCE:BTCUSDT': 67420,
    'BINANCE:ETHUSDT': 3510,
    'BINANCE:BNBUSDT': 415,
    'BINANCE:SOLUSDT': 175,
    'EUR/USD': 1.0845,
    'GBP/USD': 1.2643,
    'USD/JPY': 149.82,
    'AUD/USD': 0.6521,
    'BINANCE:PAXGUSDT': 2345,
    'BINANCE:DOGEUSDT': 0.1734,
    'BINANCE:XRPUSDT': 0.5891,
    'BINANCE:ADAUSDT': 0.4873,
    'AAPL': 189.30,
    'TSLA': 248.75,
    'AMZN': 185.20,
    'NVDA': 875.40,
};

function buildHistory(base, length = 20) {
    // Flat line at seed price until real data fills in
    return Array(length).fill(base);
}

function buildInitialData(symbols) {
    const out = {};
    symbols.forEach(asset => {
        const base = SEED_PRICES[asset.symbol] ?? 0;
        out[asset.symbol] = {
            price: base,
            history: buildHistory(base),
            changePercent: '0.00',
            direction: 'up',
            updatedAt: Date.now(),
        };
    });
    return out;
}

export const useFinnhubWS = (symbols) => {
    // ─── initialise from seed so cards are NEVER blank ───
    const [data, setData] = useState(() => buildInitialData(symbols));
    const [status, setStatus] = useState('connected');
    const blockedSymbols = useRef(new Set());  // symbols that returned 403

    // ─── When category changes (symbols prop changes), immediately
    //     hydrate new symbol keys so there's zero skeleton flash ───
    const prevSymbolsRef = useRef(symbols);
    useEffect(() => {
        const prevKeys = new Set(prevSymbolsRef.current.map(s => s.symbol));
        const newKeys = symbols.map(s => s.symbol);
        const missing = newKeys.filter(k => !prevKeys.has(k));
        if (missing.length > 0) {
            // Patch in seed data for new symbols instantly
            setData(prev => {
                const patch = {};
                symbols.forEach(asset => {
                    if (!prev[asset.symbol]) {
                        const base = SEED_PRICES[asset.symbol] ?? 0;
                        patch[asset.symbol] = {
                            price: base,
                            history: buildHistory(base),
                            changePercent: '0.00',
                            direction: 'up',
                            updatedAt: Date.now(),
                        };
                    }
                });
                return { ...prev, ...patch };
            });
        }
        prevSymbolsRef.current = symbols;
    }, [symbols]);

    useEffect(() => {
        if (!API_KEY) {
            // ─── No API key: run mock ticker for all symbols ───
            setStatus('connected');
            const mockInterval = setInterval(() => {
                setData(prev => {
                    const next = { ...prev };
                    symbols.forEach(asset => {
                        const entry = next[asset.symbol];
                        if (!entry) return;
                        const base = entry.price;
                        const delta = base * (Math.random() - 0.48) * 0.003;
                        const newP = +(base + delta).toFixed(6);
                        next[asset.symbol] = {
                            price: newP,
                            history: [...entry.history.slice(-19), newP],
                            changePercent: ((delta / base) * 100).toFixed(2),
                            direction: delta >= 0 ? 'up' : 'down',
                            updatedAt: Date.now(),
                        };
                    });
                    return next;
                });
            }, 2500);
            return () => clearInterval(mockInterval);
        }

        // ─── Finnhub REST polling for ws/rest type symbols ───
        // (WebSocket is unreliable on free tier, REST works consistently)
        const finnhubSymbols = symbols.filter(s => s.type === 'ws' || s.type === 'rest');
        let finnhubInterval;
        if (finnhubSymbols.length > 0) {
            const fetchFinnhub = async () => {
                for (const asset of finnhubSymbols) {
                    // Skip symbols that previously returned 403
                    if (blockedSymbols.current.has(asset.symbol)) continue;
                    try {
                        const res = await fetch(
                            `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(asset.symbol)}&token=${API_KEY}`
                        );
                        if (res.status === 403) {
                            blockedSymbols.current.add(asset.symbol);
                            console.warn(`[Finnhub] ${asset.symbol} not available on free tier — using simulated data`);
                            continue;
                        }
                        if (res.status === 429) continue; // rate limited, skip this cycle
                        if (res.ok) {
                            const d = await res.json();
                            if (d.c === 0 && d.h === 0) continue; // market closed / no data
                            setData(prev => {
                                const prevA = prev[asset.symbol] || { price: d.pc || 0, history: [] };
                                return {
                                    ...prev,
                                    [asset.symbol]: {
                                        price: d.c,
                                        history: [...prevA.history.slice(-19), d.c],
                                        changePercent: d.dp?.toFixed(2) || '0.00',
                                        direction: d.d >= 0 ? 'up' : 'down',
                                        updatedAt: Date.now(),
                                    },
                                };
                            });
                        }
                    } catch (e) { /* network error, retry next interval */ }
                    // Stagger requests: 500ms gap between each symbol
                    await new Promise(r => setTimeout(r, 500));
                }
            };
            fetchFinnhub();  // immediate first fetch
            finnhubInterval = setInterval(fetchFinnhub, 15000);  // 15s to stay within 60 calls/min
        }

        // ─── Mock ticker for symbols blocked by Finnhub (403) ───
        const mockBlockedInterval = setInterval(() => {
            setData(prev => {
                const next = { ...prev };
                let changed = false;
                symbols.forEach(asset => {
                    if (asset.type === 'nse') return; // NSE has its own fetcher
                    if (!blockedSymbols.current.has(asset.symbol)) return;
                    const entry = next[asset.symbol];
                    if (!entry) return;
                    changed = true;
                    const base = entry.price;
                    const delta = base * (Math.random() - 0.48) * 0.003;
                    const newP = +(base + delta).toFixed(6);
                    next[asset.symbol] = {
                        price: newP,
                        history: [...entry.history.slice(-19), newP],
                        changePercent: ((delta / base) * 100).toFixed(2),
                        direction: delta >= 0 ? 'up' : 'down',
                        updatedAt: Date.now(),
                    };
                });
                return changed ? next : prev;
            });
        }, 2500);

        // ─── NSE India polling for Indian equities (via Vite proxy) ───
        const nseSymbols = symbols.filter(s => s.type === 'nse');
        let nseInterval;
        if (nseSymbols.length > 0) {
            const fetchNSE = () => {
                nseSymbols.forEach(async (asset) => {
                    try {
                        const nseSym = asset.nseSymbol || asset.symbol;
                        const res = await fetch(`/nse-api/api/quote-equity?symbol=${nseSym}`);
                        if (!res.ok) return;
                        const d = await res.json();
                        const pi = d.priceInfo;
                        if (!pi || !pi.lastPrice) return;
                        setData(prev => {
                            const prevA = prev[asset.symbol] || { price: pi.previousClose || 0, history: [] };
                            const change = pi.change || 0;
                            return {
                                ...prev,
                                [asset.symbol]: {
                                    price: pi.lastPrice,
                                    history: [...prevA.history.slice(-19), pi.lastPrice],
                                    changePercent: pi.pChange?.toFixed(2) || '0.00',
                                    direction: change >= 0 ? 'up' : 'down',
                                    updatedAt: Date.now(),
                                },
                            };
                        });
                    } catch (e) { /* network error, retry next interval */ }
                });
            };
            fetchNSE(); // immediate first fetch
            nseInterval = setInterval(fetchNSE, 8000);
        }

        // ─── Twelve Data polling for forex (type: 'twelvedata') ───
        const twelvedataSymbols = symbols.filter(s => s.type === 'twelvedata');
        let twelvedataInterval;
        if (twelvedataSymbols.length > 0 && TWELVEDATA_KEY) {
            const fetchTwelveData = async () => {
                for (const asset of twelvedataSymbols) {
                    try {
                        const res = await fetch(
                            `https://api.twelvedata.com/quote?symbol=${encodeURIComponent(asset.symbol)}&apikey=${TWELVEDATA_KEY}`
                        );
                        if (!res.ok) continue;
                        const d = await res.json();
                        if (d.code || !d.close) continue; // error response
                        const price = parseFloat(d.close);
                        const change = parseFloat(d.change) || 0;
                        const pctChange = parseFloat(d.percent_change) || 0;
                        setData(prev => {
                            const prevA = prev[asset.symbol] || { price: 0, history: [] };
                            return {
                                ...prev,
                                [asset.symbol]: {
                                    price,
                                    history: [...prevA.history.slice(-19), price],
                                    changePercent: pctChange.toFixed(2),
                                    direction: change >= 0 ? 'up' : 'down',
                                    updatedAt: Date.now(),
                                },
                            };
                        });
                    } catch (e) { /* network error, retry next interval */ }
                    // Stagger: 1s gap between each to respect 8 calls/min
                    await new Promise(r => setTimeout(r, 1000));
                }
            };
            fetchTwelveData(); // immediate first fetch
            twelvedataInterval = setInterval(fetchTwelveData, 10000); // every 10s
        }

        setStatus('connected');

        return () => {
            if (finnhubInterval) clearInterval(finnhubInterval);
            clearInterval(mockBlockedInterval);
            if (nseInterval) clearInterval(nseInterval);
            if (twelvedataInterval) clearInterval(twelvedataInterval);
        };
    }, [symbols]);

    return { data, status };
};
