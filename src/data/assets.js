export const ASSETS = {
    'Indian Equities': [
        { id: 1, symbol: 'RELIANCE', nseSymbol: 'RELIANCE', name: 'RELIANCE', ticker: 'NSE:RELIANCE', type: 'nse' },
        { id: 2, symbol: 'TCS', nseSymbol: 'TCS', name: 'TCS', ticker: 'NSE:TCS', type: 'nse' },
        { id: 3, symbol: 'HDFCBANK', nseSymbol: 'HDFCBANK', name: 'HDFC BANK', ticker: 'NSE:HDFCBANK', type: 'nse' },
        { id: 4, symbol: 'INFY', nseSymbol: 'INFY', name: 'INFOSYS', ticker: 'NSE:INFY', type: 'nse' }
    ],
    'Global Indices': [
        { id: 5, symbol: 'BINANCE:BTCUSDT', binanceStream: 'btcusdt', name: 'BITCOIN', ticker: 'BTC/USD', type: 'binance' },
        { id: 6, symbol: 'BINANCE:ETHUSDT', binanceStream: 'ethusdt', name: 'ETHEREUM', ticker: 'ETH/USD', type: 'binance' },
        { id: 7, symbol: 'BINANCE:BNBUSDT', binanceStream: 'bnbusdt', name: 'BNB', ticker: 'BNB/USD', type: 'binance' },
        { id: 8, symbol: 'BINANCE:SOLUSDT', binanceStream: 'solusdt', name: 'SOLANA', ticker: 'SOL/USD', type: 'binance' }
    ],
    'Forex Majors': [
        { id: 9, symbol: 'EUR/USD', name: 'EUR/USD', ticker: 'FX/MAJ', type: 'twelvedata' },
        { id: 10, symbol: 'GBP/USD', name: 'GBP/USD', ticker: 'FX/MAJ', type: 'twelvedata' },
        { id: 11, symbol: 'USD/JPY', name: 'USD/JPY', ticker: 'FX/MAJ', type: 'twelvedata' },
        { id: 12, symbol: 'AUD/USD', name: 'AUD/USD', ticker: 'FX/MAJ', type: 'twelvedata' }
    ],
    'Commodities': [
        { id: 13, symbol: 'BINANCE:PAXGUSDT', binanceStream: 'paxgusdt', name: 'GOLD', ticker: 'XAU/USD', type: 'binance' },
        { id: 14, symbol: 'BINANCE:DOGEUSDT', binanceStream: 'dogeusdt', name: 'SILVER (DOGE)', ticker: 'XAG/USD', type: 'binance' },
        { id: 15, symbol: 'BINANCE:XRPUSDT', binanceStream: 'xrpusdt', name: 'CRUDE', ticker: 'WTI/USD', type: 'binance' },
        { id: 16, symbol: 'BINANCE:ADAUSDT', binanceStream: 'adausdt', name: 'NAT GAS', ticker: 'NG/USD', type: 'binance' }
    ],
    'US Equities': [
        { id: 17, symbol: 'AAPL', name: 'APPLE INC.', ticker: 'NASDAQ:AAPL', type: 'finnhub' },
        { id: 18, symbol: 'TSLA', name: 'TESLA INC.', ticker: 'NASDAQ:TSLA', type: 'finnhub' },
        { id: 19, symbol: 'AMZN', name: 'AMAZON', ticker: 'NASDAQ:AMZN', type: 'finnhub' },
        { id: 20, symbol: 'NVDA', name: 'NVIDIA', ticker: 'NASDAQ:NVDA', type: 'finnhub' }
    ],
    'Crypto': [
        { id: 21, symbol: 'BINANCE:BTCUSDT', binanceStream: 'btcusdt', name: 'BITCOIN', ticker: 'BTC/USD', type: 'binance' },
        { id: 22, symbol: 'BINANCE:ETHUSDT', binanceStream: 'ethusdt', name: 'ETHEREUM', ticker: 'ETH/USD', type: 'binance' },
        { id: 23, symbol: 'BINANCE:DOGEUSDT', binanceStream: 'dogeusdt', name: 'DOGECOIN', ticker: 'DOGE/USD', type: 'binance' },
        { id: 24, symbol: 'BINANCE:SOLUSDT', binanceStream: 'solusdt', name: 'SOLANA', ticker: 'SOL/USD', type: 'binance' }
    ]
};
