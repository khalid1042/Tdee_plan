const fs = require('fs');
const path = require('path');

const window = {};
eval(fs.readFileSync(path.join(__dirname, '..', 'js', 'content.js'), 'utf8'));
const routes = window.TDEEContent.routes;

const pages = ['/', ...Object.keys(routes)];

console.log('PAGE AUDIT MATRIX: Total pages: ' + pages.length);
pages.forEach(p => {
  let file = p === '/' ? path.join(__dirname, '..', 'index.html') : path.join(__dirname, '..', p.replace(/^\/|\/$/g, ''), 'index.html');
  if (!fs.existsSync(file)) {
    console.log('[MISSING FILE] ' + p + ' -> ' + file);
    return;
  }
  const html = fs.readFileSync(file, 'utf8');
  
  const titleM = html.match(/<title>(.*?)<\/title>/i);
  const title = titleM ? titleM[1] : 'NONE';
  
  const descM = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  const desc = descM ? descM[1] : 'NONE';
  
  const canonM = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i);
  const canonical = canonM ? canonM[1] : 'NONE';
  
  const robotsM = html.match(/<meta\s+name=["']robots["']\s+content=["'](.*?)["']/i);
  const robots = robotsM ? robotsM[1] : 'NONE';

  const h1Matches = [...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/gis)];
  const h1s = h1Matches.map(m => m[1].replace(/<[^>]+>/g, '').trim());
  
  console.log(`\nURL: ${p}`);
  console.log(`  Title (${title.length} chars): ${title}`);
  console.log(`  Desc (${desc.length} chars): ${desc}`);
  console.log(`  Canonical: ${canonical}`);
  console.log(`  Robots: ${robots}`);
  console.log(`  H1 count: ${h1s.length} -> "${h1s.join(' | ')}"`);
});
