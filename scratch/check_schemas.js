const fs = require('fs');
const path = require('path');

const window = {};
eval(fs.readFileSync(path.join(__dirname, '..', 'js', 'content.js'), 'utf8'));
const routes = window.TDEEContent.routes;
const pages = ['/', ...Object.keys(routes), '/what-is-tdee/', '/how-to-calculate-tdee/'];

let totalErrors = 0;

pages.forEach(p => {
  let file = p === '/' ? path.join(__dirname, '..', 'index.html') : path.join(__dirname, '..', p.replace(/^\/|\/$/g, ''), 'index.html');
  if (!fs.existsSync(file)) {
    console.error(`[ERROR] File missing for ${p}: ${file}`);
    totalErrors++;
    return;
  }
  const html = fs.readFileSync(file, 'utf8');
  const jsonLdMatches = [...html.matchAll(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
  
  if (jsonLdMatches.length === 0) {
    console.error(`[WARN] No JSON-LD found in ${p}`);
  }

  jsonLdMatches.forEach((m, idx) => {
    try {
      const parsed = JSON.parse(m[1].trim());
      const graph = parsed['@graph'] || [parsed];
      const types = graph.map(node => node['@type']);
      console.log(`[OK] ${p} (Schema block ${idx+1}): Types -> [${types.join(', ')}]`);
    } catch (e) {
      console.error(`[ERROR] Invalid JSON-LD in ${p}: ${e.message}`);
      totalErrors++;
    }
  });
});

console.log(`\nAudit completed with ${totalErrors} schema errors.`);
