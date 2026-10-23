const fs = require('fs');
const path = require('path');

const contentJs = fs.readFileSync(path.join(__dirname, '..', 'js', 'content.js'), 'utf8');
const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

function auditFile(name, content) {
  console.log(`=== AUDIT: ${name} ===`);
  const aRegex = /<a\s+[^>]*href=["']([^"']*(?:pubmed|ncbi)[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  let count = 0;
  let hasUtm = 0;
  let missingRelNoreferrer = 0;
  const urls = new Set();
  
  while ((m = aRegex.exec(content)) !== null) {
    count++;
    urls.add(m[1]);
    if (m[1].includes('utm_source')) hasUtm++;
    const fullTag = m[0];
    if (!fullTag.includes('rel="noopener noreferrer"') || !fullTag.includes('target="_blank"')) {
      missingRelNoreferrer++;
    }
  }
  
  console.log(`Total links: ${count}`);
  console.log(`Has UTM query: ${hasUtm}`);
  console.log(`Missing rel="noopener noreferrer" or target="_blank": ${missingRelNoreferrer}`);
  console.log('Unique URLs:');
  urls.forEach(u => console.log('  - ' + u));
}

auditFile('js/content.js', contentJs);
auditFile('index.html', indexHtml);
