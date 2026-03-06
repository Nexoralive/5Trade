const https = require('https');

const API_KEY = 'd6iomohr01qleu94uomgd6iomohr01qleu94uon0';

const fetchProfile = (symbol) => {
  return new Promise((resolve, reject) => {
    https.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${API_KEY}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
};

async function test() {
  const result = await fetchProfile('AAPL');
  console.log('AAPL Logo:', result.logo);
}

test();
