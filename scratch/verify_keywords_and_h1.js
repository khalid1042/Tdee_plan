const fs = require('fs');
const path = require('path');

const checks = [
  {
    route: '/how-to-calibrate-tdee-with-weight-trends/',
    expectedKeyword: 'how to calibrate tdee with real-world weight trends',
    expectedH1: 'How to Calibrate TDEE With Real-World Weight Trends'
  },
  {
    route: '/activity-factor-questionnaire-for-lifting/',
    expectedKeyword: 'accurate activity factor questionnaire for lifting',
    expectedH1: 'Accurate Activity Factor Questionnaire for Lifting'
  },
  {
    route: '/tdee-calculator-with-rest-and-training-day-macros/',
    expectedKeyword: 'tdee calculator with rest and training day macros',
    expectedH1: 'TDEE Calculator With Rest and Training Day Macros'
  }
];

let allPassed = true;

checks.forEach(c => {
  const filePath = path.join(__dirname, '..', c.route.replace(/^\/|\/$/g, ''), 'index.html');
  if (!fs.existsSync(filePath)) {
    console.error(`[FAIL] File not found: ${filePath}`);
    allPassed = false;
    return;
  }

  const html = fs.readFileSync(filePath, 'utf8');

  // Check H1
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (h1Matches.length !== 1) {
    console.error(`[FAIL] Expected exactly 1 <h1> in ${c.route}, found ${h1Matches.length}`);
    allPassed = false;
  } else {
    const h1Text = h1Matches[0][1].replace(/<[^>]+>/g, '').trim();
    if (h1Text.toLowerCase().includes(c.expectedKeyword.toLowerCase())) {
      console.log(`[PASS] ${c.route} has single <h1> matching target keyword: "${h1Text}"`);
    } else {
      console.error(`[FAIL] ${c.route} <h1> does not match expected keyword. Found: "${h1Text}"`);
      allPassed = false;
    }
  }

  // Check Meta Description
  const metaDescMatch = html.match(/<meta name="description"\s+content="([^"]*)"/i);
  if (!metaDescMatch) {
    console.error(`[FAIL] ${c.route} missing meta description`);
    allPassed = false;
  } else {
    const metaDesc = metaDescMatch[1];
    if (metaDesc.toLowerCase().includes(c.expectedKeyword.toLowerCase())) {
      console.log(`[PASS] ${c.route} meta description contains keyword: "${metaDesc}"`);
    } else {
      console.error(`[FAIL] ${c.route} meta description does not contain target keyword: "${metaDesc}"`);
      allPassed = false;
    }
  }

  // Check Calculator Mount Content
  const mountMatch = html.match(/<div id="silo-calculator-mount">([\s\S]*?)<\/div>\s*<div id="silo-body"/i);
  if (!mountMatch || mountMatch[1].trim().length < 50) {
    console.error(`[FAIL] ${c.route} missing pre-mounted calculator HTML`);
    allPassed = false;
  } else {
    console.log(`[PASS] ${c.route} has pre-mounted tool widget (${mountMatch[1].trim().length} chars of HTML)`);
  }
});

// Also check all 26 pages for single <h1>
const window = {};
eval(fs.readFileSync(path.join(__dirname, '..', 'js', 'content.js'), 'utf8'));
const routes = window.TDEEContent.routes;
const allRoutes = ['/', ...Object.keys(routes)];

allRoutes.forEach(r => {
  const file = r === '/' ? path.join(__dirname, '..', 'index.html') : path.join(__dirname, '..', r.replace(/^\/|\/$/g, ''), 'index.html');
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  const h1s = [...content.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (h1s.length !== 1) {
    console.error(`[FAIL] ${r} has ${h1s.length} <h1> tags!`);
    allPassed = false;
  }
});

if (allPassed) {
  console.log('\n🌟 ALL KEYWORD, H1, AND PRE-RENDER CHECKS PASSED PERFECTLY!');
  process.exit(0);
} else {
  console.error('\n❌ ISSUES DETECTED');
  process.exit(1);
}
