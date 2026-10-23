const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const PORT = 8089;

const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png'
};

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let f = path.join(root, p === '/' ? 'index.html' : p);

  try {
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) {
      f = path.join(f, 'index.html');
    }
    const d = fs.readFileSync(f);
    res.writeHead(200, { 'Content-Type': mime[path.extname(f)] || 'text/html' });
    res.end(d);
  } catch (e) {
    try {
      const d = fs.readFileSync(path.join(root, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(d);
    } catch (e2) {
      res.writeHead(404);
      res.end('nf');
    }
  }
});

function fetchUrl(pathname) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${PORT}${pathname}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

server.listen(PORT, async () => {
  console.log(`Test server running on port ${PORT}`);

  const routesToTest = [
    '/',
    '/blog/what-is-tdee/',
    '/what-is-tdee/',
    '/blog/how-to-calculate-tdee/',
    '/how-to-calculate-tdee/',
    '/healthy-food-and-healthy-life/',
    '/calibrate-tdee-weight-trends/',
    '/how-to-calibrate-tdee-with-weight-trends/',
    '/accurate-activity-factor-questionnaire/',
    '/activity-factor-questionnaire-for-lifting/',
    '/tdee-calculator-rest-training-day-macros/',
    '/tdee-calculator-with-rest-and-training-day-macros/'
  ];

  let passed = true;

  for (const r of routesToTest) {
    try {
      console.log(`\nTesting route: ${r}`);
      const { statusCode, body } = await fetchUrl(r);
      console.log(`  Status Code: ${statusCode}`);

      if (statusCode !== 200) {
        console.error(`  FAIL: non-200 status on ${r}`);
        passed = false;
      }

      if (r === '/') {
        if (!body.includes('id="hero-workspace"')) {
          console.error(`  FAIL: Homepage missing hero-workspace`);
          passed = false;
        }
      } else if (
        r === '/what-is-tdee/' ||
        r === '/how-to-calculate-tdee/' ||
        r === '/how-to-calibrate-tdee-with-weight-trends/' ||
        r === '/activity-factor-questionnaire-for-lifting/' ||
        r === '/tdee-calculator-with-rest-and-training-day-macros/'
      ) {
        // Redirect stubs
        if (!body.includes('http-equiv="refresh"') || !body.includes('rel="canonical"')) {
          console.error(`  FAIL: Redirect stub ${r} missing canonical or refresh directive!`);
          passed = false;
        } else {
          console.log(`  PASS: Redirect stub ${r} cleanly points to canonical destination.`);
        }
      } else {
        if (body.includes('id="hero-workspace"')) {
          console.error(`  FAIL: Subpage ${r} contains hero-workspace! (Duplication bug)`);
          passed = false;
        } else {
          console.log(`  PASS: Subpage ${r} cleanly excludes hero-workspace.`);
        }

        if (!body.includes('id="silo-container"')) {
          console.error(`  FAIL: Subpage ${r} missing silo-container!`);
          passed = false;
        }
      }

      if (body.includes('Dr. Michael Chen') || body.includes('Dr. Sarah Jenkins')) {
        console.error(`  FAIL: Found unverified credentials in ${r}`);
        passed = false;
      } else {
        console.log(`  PASS: No unverified credentials in ${r}.`);
      }

    } catch (err) {
      console.error(`  ERROR testing ${r}:`, err.message);
      passed = false;
    }
  }

  server.close();

  if (passed) {
    console.log('\n✅ ALL INTEGRATION TESTS PASSED 100% CLEAN!');
    process.exit(0);
  } else {
    console.error('\n❌ INTEGRATION TESTS FAILED');
    process.exit(1);
  }
});
