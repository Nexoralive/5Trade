import { ASSETS } from './src/data/assets.js';
import https from 'https';

const checkUrl = (url) => {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', () => resolve({ url, status: 'error' }));
  });
};

async function checkAll() {
  const promises = [];
  Object.values(ASSETS).forEach(category => {
    category.forEach(asset => {
      if (asset.image) promises.push(checkUrl(asset.image));
    });
  });
  
  const results = await Promise.all(promises);
  results.forEach(r => {
    if (r.status !== 200 && r.status !== 301 && r.status !== 302) {
      console.log('BROKEN:', r.url, 'Status:', r.status);
    }
  });
  console.log('Done checking.');
}

checkAll();
