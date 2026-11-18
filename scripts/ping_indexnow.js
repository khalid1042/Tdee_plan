const fs = require('fs');
const https = require('https');
const path = require('path');

const host = 'tdeecalculater.com';
const key = 'c7e2b8a4f91043d8a56e1b2390f7a8b9';
const keyLocation = `https://${host}/${key}.txt`;

// Read sitemap.xml to extract all URLs
const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

const urlMatches = sitemapContent.match(/<loc>(https:\/\/[^<]+)<\/loc>/g) || [];
const urlList = urlMatches.map(m => m.replace(/<\/?loc>/g, '').trim());

console.log(`Found ${urlList.length} canonical URLs to submit to IndexNow.`);

const postData = JSON.stringify({
  host: host,
  key: key,
  keyLocation: keyLocation,
  urlList: urlList
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  console.log(`IndexNow API Response Status: ${res.statusCode} (${res.statusMessage})`);
  let responseBody = '';
  res.on('data', chunk => responseBody += chunk);
  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log('✅ IndexNow broadcast successful! Search engines (Bing, Copilot, Yandex, Seznam) notified.');
    } else {
      console.log(`Response body: ${responseBody}`);
    }
  });
});

req.on('error', (e) => {
  console.error(`IndexNow Request error: ${e.message}`);
});

req.write(postData);
req.end();
