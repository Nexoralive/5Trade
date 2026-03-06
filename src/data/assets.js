export const ASSETS = {
    'Indian Equities': [
        { id: 1, symbol: 'RELIANCE', nseSymbol: 'RELIANCE', name: 'RELIANCE', ticker: 'NSE:RELIANCE', type: 'nse', image: 'https://www.google.com/s2/favicons?sz=64&domain=ril.com' },
        { id: 2, symbol: 'TCS', nseSymbol: 'TCS', name: 'TCS', ticker: 'NSE:TCS', type: 'nse', image: 'https://www.google.com/s2/favicons?sz=64&domain=tcs.com' },
        { id: 3, symbol: 'HDFCBANK', nseSymbol: 'HDFCBANK', name: 'HDFC BANK', ticker: 'NSE:HDFCBANK', type: 'nse', image: 'https://www.google.com/s2/favicons?sz=64&domain=hdfcbank.com' },
        { id: 4, symbol: 'INFY', nseSymbol: 'INFY', name: 'INFOSYS', ticker: 'NSE:INFY', type: 'nse', image: 'https://www.google.com/s2/favicons?sz=64&domain=infosys.com' }
    ],
    'Global Indices': [
        { id: 5, symbol: 'BINANCE:BTCUSDT', binanceStream: 'btcusdt', name: 'BITCOIN', ticker: 'BTC/USD', type: 'binance', image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
        { id: 6, symbol: 'BINANCE:ETHUSDT', binanceStream: 'ethusdt', name: 'ETHEREUM', ticker: 'ETH/USD', type: 'binance', image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
        { id: 7, symbol: 'BINANCE:BNBUSDT', binanceStream: 'bnbusdt', name: 'BNB', ticker: 'BNB/USD', type: 'binance', image: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png' },
        { id: 8, symbol: 'BINANCE:SOLUSDT', binanceStream: 'solusdt', name: 'SOLANA', ticker: 'SOL/USD', type: 'binance', image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' }
    ],
    'Forex Majors': [
        { id: 9, symbol: 'EUR/USD', name: 'EUR/USD', ticker: 'FX/MAJ', type: 'twelvedata', image: 'https://flagcdn.com/w80/eu.png' },
        { id: 10, symbol: 'GBP/USD', name: 'GBP/USD', ticker: 'FX/MAJ', type: 'twelvedata', image: 'https://flagcdn.com/w80/gb.png' },
        { id: 11, symbol: 'USD/JPY', name: 'USD/JPY', ticker: 'FX/MAJ', type: 'twelvedata', image: 'https://flagcdn.com/w80/jp.png' },
        { id: 12, symbol: 'AUD/USD', name: 'AUD/USD', ticker: 'FX/MAJ', type: 'twelvedata', image: 'https://flagcdn.com/w80/au.png' }
    ],
    'Commodities': [
        { id: 13, symbol: 'BINANCE:PAXGUSDT', binanceStream: 'paxgusdt', name: 'GOLD', ticker: 'XAU/USD', type: 'binance', image: 'https://assets.coingecko.com/coins/images/9519/small/paxg.png' },
        { id: 14, symbol: 'BINANCE:DOGEUSDT', binanceStream: 'dogeusdt', name: 'SILVER (DOGE)', ticker: 'XAG/USD', type: 'binance', image: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png' },
        { id: 15, symbol: 'BINANCE:XRPUSDT', binanceStream: 'xrpusdt', name: 'CRUDE', ticker: 'WTI/USD', type: 'binance', image: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png' },
        { id: 16, symbol: 'BINANCE:ADAUSDT', binanceStream: 'adausdt', name: 'NAT GAS', ticker: 'NG/USD', type: 'binance', image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png' }
    ],
    'US Equities': [
        { id: 17, symbol: 'AAPL', name: 'APPLE INC.', ticker: 'NASDAQ:AAPL', type: 'finnhub', image: 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AAPL.png' },
        { id: 18, symbol: 'TSLA', name: 'TESLA INC.', ticker: 'NASDAQ:TSLA', type: 'finnhub', image: 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/TSLA.png' },
        { id: 19, symbol: 'AMZN', name: 'AMAZON', ticker: 'NASDAQ:AMZN', type: 'finnhub', image: 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AMZN.png' },
        { id: 20, symbol: 'NVDA', name: 'NVIDIA', ticker: 'NASDAQ:NVDA', type: 'finnhub', image: 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/NVDA.png' }
    ],
    'Crypto': [
        { id: 21, symbol: 'BINANCE:BTCUSDT', binanceStream: 'btcusdt', name: 'BITCOIN', ticker: 'BTC/USD', type: 'binance', image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
        { id: 22, symbol: 'BINANCE:ETHUSDT', binanceStream: 'ethusdt', name: 'ETHEREUM', ticker: 'ETH/USD', type: 'binance', image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
        { id: 23, symbol: 'BINANCE:DOGEUSDT', binanceStream: 'dogeusdt', name: 'DOGECOIN', ticker: 'DOGE/USD', type: 'binance', image: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png' },
        { id: 24, symbol: 'BINANCE:SOLUSDT', binanceStream: 'solusdt', name: 'SOLANA', ticker: 'SOL/USD', type: 'binance', image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' }
    ]
};
