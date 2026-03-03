import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { ASSETS } from '../data/assets';

const API_KEY = import.meta.env.VITE_FINNHUB_KEY || '';
const TWELVEDATA_KEY = import.meta.env.VITE_TWELVEDATA_KEY || '';

// ─── Seed prices ───
const SEED_PRICES = {
    'RELIANCE': 1360, 'TCS': 3520, 'HDFCBANK': 1785, 'INFY': 1575,
    'BINANCE:BTCUSDT': 67420, 'BINANCE:ETHUSDT': 3510,
    'BINANCE:BNBUSDT': 415, 'BINANCE:SOLUSDT': 175,
    'EUR/USD': 1.0845, 'GBP/USD': 1.2643,
    'USD/JPY': 149.82, 'AUD/USD': 0.6521,
    'BINANCE:PAXGUSDT': 2345, 'BINANCE:DOGEUSDT': 0.1734,
    'BINANCE:XRPUSDT': 0.5891, 'BINANCE:ADAUSDT': 0.4873,
    'AAPL': 189.30, 'TSLA': 248.75, 'AMZN': 185.20, 'NVDA': 875.40,
};

// Deduplicated list of ALL symbols
const ALL_SYMBOLS = [];
const seen = new Set();
Object.values(ASSETS).forEach(cat => {
    cat.forEach(a => {
        if (!seen.has(a.symbol)) { seen.add(a.symbol); ALL_SYMBOLS.push(a); }
    });
});

function buildInitialData() {
    const out = {};
    ALL_SYMBOLS.forEach(a => {
        const base = SEED_PRICES[a.symbol] ?? 0;
        out[a.symbol] = {
            price: base, history: Array(20).fill(base),
            changePercent: '0.00', direction: 'up', updatedAt: Date.now(),
        };
    });
    return out;
}

// ─── Context ───
const MarketDataContext = createContext({ data: {}, status: 'connecting' });
export const useMarketData = () => useContext(MarketDataContext);

// Helper: update a single symbol's data
function updateSymbol(setData, symbol, price, changePercent, direction) {
    setData(prev => {
        const prevA = prev[symbol] || { history: [] };
        return {
            ...prev,
            [symbol]: {
                price,
                history: [...prevA.history.slice(-19), price],
                changePercent: changePercent ?? '0.00',
                direction: direction ?? 'up',
                updatedAt: Date.now(),
            },
        };
    });
}

export const MarketDataProvider = ({ children }) => {
    const [data, setData] = useState(buildInitialData);
    const [status, setStatus] = useState('connecting');

    // Refs for WebSocket instances (for cleanup)
    const binanceWs = useRef(null);
    const finnhubWs = useRef(null);
    const intervalsRef = useRef([]);

    useEffect(() => {
        // Build a reverse map: binance stream name → symbol key
        const binanceStreamToSymbol = {};
        ALL_SYMBOLS.filter(a => a.type === 'binance').forEach(a => {
            const stream = a.binanceStream || a.symbol.split(':')[1]?.toLowerCase();
            if (stream) binanceStreamToSymbol[stream.toUpperCase()] = a.symbol;
        });

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // 1. BINANCE WebSocket (Crypto + Commodities)
        //    FREE, no API key, 24/7 streaming
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        const binanceAssets = ALL_SYMBOLS.filter(a => a.type === 'binance');
        if (binanceAssets.length > 0) {
            const streams = binanceAssets
                .map(a => a.binanceStream || a.symbol.split(':')[1]?.toLowerCase())
                .filter(Boolean)
                .map(s => `${s}@miniTicker`)  // miniTicker = lightweight 1s updates
                .join('/');

            const connectBinance = () => {
                const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);
                binanceWs.current = ws;

                ws.onopen = () => {
                    console.log('[Binance WS] Connected');
                    setStatus('connected');
                };

                ws.onmessage = (event) => {
                    try {
                        const msg = JSON.parse(event.data);
                        const d = msg.data;
                        if (!d || !d.s || !d.c) return;

                        // d.s = "BTCUSDT", need to map to "BINANCE:BTCUSDT"
                        const sym = binanceStreamToSymbol[d.s];
                        if (!sym) return;

                        const price = parseFloat(d.c);  // close price
                        const openPrice = parseFloat(d.o); // open price (24h)
                        const pctChange = openPrice > 0
                            ? (((price - openPrice) / openPrice) * 100).toFixed(2)
                            : '0.00';
                        const dir = price >= openPrice ? 'up' : 'down';

                        updateSymbol(setData, sym, price, pctChange, dir);
                    } catch (e) { /* parse error, skip */ }
                };

                ws.onerror = () => { /* will trigger onclose */ };
                ws.onclose = () => {
                    console.log('[Binance WS] Disconnected, reconnecting in 3s...');
                    setTimeout(connectBinance, 3000);
                };
            };
            connectBinance();
        }

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // 2. FINNHUB WebSocket (US Equities)
        //    Works during market hours, REST fallback when closed
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        const finnhubAssets = ALL_SYMBOLS.filter(a => a.type === 'finnhub');
        let finnhubRestInterval;
        let finnhubWsConnected = false;

        if (finnhubAssets.length > 0 && API_KEY) {
            const connectFinnhub = () => {
                const ws = new WebSocket(`wss://ws.finnhub.io/?token=${API_KEY}`);
                finnhubWs.current = ws;
                let receivedData = false;

                ws.onopen = () => {
                    console.log('[Finnhub WS] Connected');
                    finnhubWsConnected = true;
                    // Subscribe to each US equity symbol
                    finnhubAssets.forEach(a => {
                        ws.send(JSON.stringify({ type: 'subscribe', symbol: a.symbol }));
                    });
                };

                ws.onmessage = (event) => {
                    try {
                        const msg = JSON.parse(event.data);
                        if (msg.type !== 'trade' || !msg.data?.length) return;
                        receivedData = true;

                        // Finnhub sends batched trades. Take the last trade per symbol.
                        const latest = {};
                        msg.data.forEach(trade => { latest[trade.s] = trade; });

                        Object.entries(latest).forEach(([sym, trade]) => {
                            const price = trade.p;
                            setData(prev => {
                                const prevA = prev[sym];
                                if (!prevA) return prev;
                                const seedPrice = SEED_PRICES[sym] || prevA.history[0] || price;
                                const pct = seedPrice > 0
                                    ? (((price - seedPrice) / seedPrice) * 100).toFixed(2)
                                    : '0.00';
                                return {
                                    ...prev,
                                    [sym]: {
                                        price,
                                        history: [...prevA.history.slice(-19), price],
                                        changePercent: pct,
                                        direction: price >= seedPrice ? 'up' : 'down',
                                        updatedAt: Date.now(),
                                    },
                                };
                            });
                        });
                    } catch (e) { /* parse error */ }
                };

                ws.onerror = () => { /* triggers onclose */ };
                ws.onclose = () => {
                    console.log('[Finnhub WS] Closed');
                    finnhubWsConnected = false;
                    // Don't auto-reconnect — fall back to REST polling
                    startFinnhubRest();
                };

                // If no trade data after 10s (market closed), fall back to REST
                setTimeout(() => {
                    if (!receivedData) {
                        console.log('[Finnhub WS] No trades received (market may be closed), falling back to REST');
                        ws.close();
                    }
                }, 10000);
            };

            const startFinnhubRest = () => {
                if (finnhubRestInterval) return; // already running
                const fetchFinnhub = async () => {
                    for (const asset of finnhubAssets) {
                        try {
                            const res = await fetch(
                                `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(asset.symbol)}&token=${API_KEY}`
                            );
                            if (res.status === 429 || res.status === 403) continue;
                            if (res.ok) {
                                const d = await res.json();
                                if (d.c === 0 && d.h === 0) continue;
                                updateSymbol(setData, asset.symbol, d.c, d.dp?.toFixed(2), d.d >= 0 ? 'up' : 'down');
                            }
                        } catch (e) { /* retry */ }
                        await new Promise(r => setTimeout(r, 800));
                    }
                };
                fetchFinnhub();
                finnhubRestInterval = setInterval(fetchFinnhub, 30000);
                intervalsRef.current.push(finnhubRestInterval);
            };

            connectFinnhub();
        }

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // 3. TWELVE DATA WebSocket (Forex)
        //    One WS connection per pair = 4 WS credits out of 8
        //    Falls back to free ExchangeRate API if WS is rate-limited
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        const twelvedataAssets = ALL_SYMBOLS.filter(a => a.type === 'twelvedata');
        const forexWsRefs = [];
        const openPrices = {};
        const wsReceived = new Set(); // track which pairs got WS data

        if (twelvedataAssets.length > 0 && TWELVEDATA_KEY) {
            twelvedataAssets.forEach((asset, idx) => {
                const connectForexPair = () => {
                    const ws = new WebSocket(`wss://ws.twelvedata.com/v1/quotes/price?apikey=${TWELVEDATA_KEY}`);
                    forexWsRefs.push(ws);

                    ws.onopen = () => {
                        console.log(`[TwelveData WS] ${asset.symbol} connected`);
                        ws.send(JSON.stringify({
                            action: 'subscribe',
                            params: { symbols: asset.symbol },
                        }));
                    };

                    ws.onmessage = (event) => {
                        try {
                            const msg = JSON.parse(event.data);

                            if (msg.event === 'subscribe-status') {
                                const ok = (msg.success || []).map(s => s.symbol);
                                const fail = (msg.fails || []);
                                if (ok.length) console.log(`[TwelveData WS] ✓ ${ok.join(', ')}`);
                                if (fail.length) console.warn(`[TwelveData WS] ✗ ${asset.symbol}:`, JSON.stringify(fail));
                                return;
                            }

                            if (msg.event !== 'price' || !msg.price) return;

                            wsReceived.add(asset.symbol);
                            const price = parseFloat(msg.price);
                            if (!openPrices[asset.symbol]) openPrices[asset.symbol] = price;
                            const openP = openPrices[asset.symbol];
                            const change = price - openP;
                            const pct = openP > 0
                                ? ((change / openP) * 100).toFixed(2)
                                : '0.00';

                            updateSymbol(setData, asset.symbol, price, pct, change >= 0 ? 'up' : 'down');
                        } catch (e) { /* parse error */ }
                    };

                    ws.onerror = () => { /* triggers onclose */ };
                    ws.onclose = () => {
                        console.log(`[TwelveData WS] ${asset.symbol} disconnected, reconnecting...`);
                        setTimeout(connectForexPair, 5000 + idx * 1000);
                    };
                };

                // Stagger connections by 500ms to avoid burst
                setTimeout(connectForexPair, idx * 500);
            });

            // ── Fallback: free ExchangeRate API (no key needed) ──
            // If Twelve Data WS doesn't deliver data within 10s, use this
            const forexFallbackMap = {
                'EUR/USD': { from: 'EUR', to: 'USD' },
                'GBP/USD': { from: 'GBP', to: 'USD' },
                'USD/JPY': { from: 'USD', to: 'JPY' },
                'AUD/USD': { from: 'AUD', to: 'USD' },
            };

            const fetchForexFallback = async () => {
                const pairsToFetch = twelvedataAssets.filter(a => !wsReceived.has(a.symbol));
                if (pairsToFetch.length === 0) return; // WS is covering all pairs

                console.log('[Forex Fallback] Fetching:', pairsToFetch.map(a => a.symbol).join(', '));

                for (const asset of pairsToFetch) {
                    const pair = forexFallbackMap[asset.symbol];
                    if (!pair) continue;
                    try {
                        const res = await fetch(
                            `https://open.er-api.com/v6/latest/${pair.from}`
                        );
                        if (res.ok) {
                            const d = await res.json();
                            const rate = d.rates?.[pair.to];
                            if (rate) {
                                const seed = SEED_PRICES[asset.symbol] || rate;
                                const change = rate - seed;
                                const pct = seed > 0
                                    ? ((change / seed) * 100).toFixed(2)
                                    : '0.00';
                                updateSymbol(setData, asset.symbol, rate, pct, change >= 0 ? 'up' : 'down');
                            }
                        }
                    } catch (e) { /* skip */ }
                    await new Promise(r => setTimeout(r, 300));
                }
            };

            // Check after 10s if WS delivered, if not fetch from fallback
            setTimeout(() => {
                fetchForexFallback();
                // Keep polling fallback every 60s for pairs WS doesn't cover
                const fallbackInterval = setInterval(fetchForexFallback, 60000);
                intervalsRef.current.push(fallbackInterval);
            }, 10000);
        }

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        // 4. NSE India REST polling (Indian Equities)
        //    No WebSocket available, stays on polling
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        const nseAssets = ALL_SYMBOLS.filter(a => a.type === 'nse');
        let nseInterval;
        if (nseAssets.length > 0) {
            const fetchNSE = () => {
                nseAssets.forEach(async (asset) => {
                    try {
                        const res = await fetch(`/nse-api/api/quote-equity?symbol=${asset.nseSymbol || asset.symbol}`);
                        if (!res.ok) return;
                        const d = await res.json();
                        const pi = d.priceInfo;
                        if (!pi || !pi.lastPrice) return;
                        updateSymbol(
                            setData, asset.symbol, pi.lastPrice,
                            pi.pChange?.toFixed(2), (pi.change || 0) >= 0 ? 'up' : 'down'
                        );
                    } catch (e) { /* retry */ }
                });
            };
            fetchNSE();
            nseInterval = setInterval(fetchNSE, 10000);
            intervalsRef.current.push(nseInterval);
        }

        setStatus('connected');

        // ─── Cleanup ───
        return () => {
            if (binanceWs.current) { binanceWs.current.onclose = null; binanceWs.current.close(); }
            if (finnhubWs.current) { finnhubWs.current.onclose = null; finnhubWs.current.close(); }
            forexWsRefs.forEach(ws => { ws.onclose = null; ws.close(); });
            intervalsRef.current.forEach(id => clearInterval(id));
        };
    }, []);

    return (
        <MarketDataContext.Provider value={{ data, status }}>
            {children}
        </MarketDataContext.Provider>
    );
};
