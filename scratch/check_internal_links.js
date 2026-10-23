const fs = require('fs');
const path = require('path');

const window = {};
eval(fs.readFileSync(path.join(__dirname, '..', 'js', 'content.js'), 'utf8'));
const routes = window.TDEEContent.routes;

const validUrls = new Set([
  '/',
  ...Object.keys(routes),
  '/what-is-tdee/',
  '/how-to-calculate-tdee/'
]);

// Also known static assets or hashes
const knownFiles = new Set([
  '/sitemap.xml',
  '/robots.txt',
  '/css/styles.css',
  '/js/app.js',
  '/js/calculator.js',
  '/js/extras.js',
  '/js/calibration.js',
  '/js/diagnostic.js',
  '/js/healthy-life.js',
  '/js/content.js',
  '/js/chatbot.js',
  '/mobile-final.png'
]);

const pages = ['/', ...Object.keys(routes)];
const linkCounts = new Map();
validUrls.forEach(u => linkCounts.set(u, 0));

const brokenLinks = [];
const redirectLinks = [];

pages.forEach(p => {
  let file = p === '/' ? path.join(__dirname, '..', 'index.html') : path.join(__dirname, '..', p.replace(/^\/|\/$/g, ''), 'index.html');
  if (!fs.existsSync(file)) return;
  const html = fs.readFileSync(file, 'utf8');

  // find all <a href="...">
  const aMatches = [...html.matchAll(/<a\s+[^>]*href=["']([^"']*)["'][^>]*>/gi)];

  aMatches.forEach(m => {
    let href = m[1].trim();
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return; // external
    }
    if (href.startsWith('#')) return; // anchor

    // Normalize path
    let normHref = href.split('#')[0].split('?')[0];
    if (normHref.startsWith('/images/')) {
      const imgPath = path.join(__dirname, '..', normHref);
      if (!fs.existsSync(imgPath)) {
        brokenLinks.push({ from: p, to: href, reason: 'Image file does not exist' });
      }
      return;
    }

    if (!normHref.endsWith('/') && !path.extname(normHref)) {
      normHref = normHref + '/';
    }

    if (linkCounts.has(normHref)) {
      linkCounts.set(normHref, linkCounts.get(normHref) + 1);
    } else if (knownFiles.has(normHref)) {
      // known static
    } else {
      brokenLinks.push({ from: p, to: href, reason: 'Target route not recognized' });
    }

    // Check if link points to an obsolete redirect target
    if (normHref === '/weight-gain/' || normHref === '/tdee-calculator-for-women-to-gain-weight/' || normHref === '/blog/tdee-for-weight-gain/' || normHref === '/blog/tdee-for-muscle-building/') {
      redirectLinks.push({ from: p, to: href, reason: 'Links directly to a 301 redirect source rather than canonical destination' });
    }
  });
});

console.log('--- LINK AUDIT SUMMARY ---');
console.log(`Total broken links found: ${brokenLinks.length}`);
brokenLinks.forEach(b => console.log(`  Broken: ${b.from} -> ${b.to} (${b.reason})`));

console.log(`\nTotal redirect links found: ${redirectLinks.length}`);
redirectLinks.forEach(r => console.log(`  Redirect Link: ${r.from} -> ${r.to}`));

console.log('\n--- INCOMING INTERNAL LINK COUNTS ---');
for (const [url, count] of linkCounts.entries()) {
  console.log(`  ${url}: ${count} internal links`);
}
