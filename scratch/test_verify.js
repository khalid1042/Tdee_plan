const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8089;
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath.endsWith('/')) reqPath += 'index.html';
  let filePath = path.join(__dirname, '..', reqPath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(__dirname, '..', reqPath.replace(/\/index\.html$/, ''), 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, '..', 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'text/plain';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${PORT}${urlPath}`, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body }));
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
    '/healthy-food-and-healthy-life/'
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
      } else if (r === '/what-is-tdee/' || r === '/how-to-calculate-tdee/') {
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
    console.error('\n❌ SOME TESTS FAILED.');
    process.exit(1);
  }
});
