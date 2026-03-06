import https from 'https';

const API_KEY = 'd6iomohr01qleu94uomgd6iomohr01qleu94uon0';
const symbols = ['AAPL', 'TSLA', 'AMZN', 'NVDA', 'RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'INFY.NS'];

const fetchProfile = (symbol) => {
  return new Promise((resolve) => {
    https.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${API_KEY}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ symbol, logo: JSON.parse(data).logo }));
    }).on('error', () => resolve({ symbol, logo: null }));
  });
};

async function test() {
  for (const s of symbols) {
    const res = await fetchProfile(s);
    console.log(s, res.logo);
  }
}
test();
