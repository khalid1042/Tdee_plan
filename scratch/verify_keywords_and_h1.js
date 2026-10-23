const fs = require('fs');
const path = require('path');

const checks = [
  {
    route: '/calibrate-tdee-weight-trends/',
    expectedTitle: 'How to Calibrate TDEE with Real-World Weight Trends',
    expectedDesc: 'Ditch inaccurate online estimates. Learn how to track rolling daily calorie intake and morning weight averages over 14-28 days to calculate your true observed metabolic rate.',
    expectedH1: 'How to Calibrate TDEE with Real-World Weight Trends'
  },
  {
    route: '/accurate-activity-factor-questionnaire/',
    expectedTitle: 'Accurate Activity Factor Questionnaire for Lifting & Fitness',
    expectedDesc: 'Calculate your custom metabolic multiplier. Our 60-second wizard cross-references daily occupational NEAT steps and workout routines to prevent accidental calorie overestimation.',
    expectedH1: 'Accurate Activity Factor Questionnaire for Lifting & Fitness'
  },
  {
    route: '/tdee-calculator-rest-training-day-macros/',
    expectedTitle: 'TDEE Calculator with Rest and Training Day Macros Split',
    expectedDesc: 'Optimize your nutrition strategy. View custom protein, carbohydrate, and fat breakdowns designed specifically to fuel hard workout sessions and maximize active recovery rest days.',
    expectedH1: 'TDEE Calculator with Rest and Training Day Macros Split'
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

  // Check Title
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (!titleMatch || titleMatch[1].trim() !== c.expectedTitle) {
    console.error(`[FAIL] ${c.route} title mismatch. Expected: "${c.expectedTitle}", Found: "${titleMatch ? titleMatch[1].trim() : 'none'}"`);
    allPassed = false;
  } else {
    console.log(`[PASS] ${c.route} title matches exactly: "${titleMatch[1].trim()}"`);
  }

  // Check H1
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (h1Matches.length !== 1) {
    console.error(`[FAIL] Expected exactly 1 <h1> in ${c.route}, found ${h1Matches.length}`);
    allPassed = false;
  } else {
    const h1Text = h1Matches[0][1].replace(/<[^>]+>/g, '').trim();
    if (h1Text === c.expectedH1) {
      console.log(`[PASS] ${c.route} has single <h1> matching expected: "${h1Text}"`);
    } else {
      console.error(`[FAIL] ${c.route} <h1> mismatch. Expected: "${c.expectedH1}", Found: "${h1Text}"`);
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
    if (metaDesc === c.expectedDesc) {
      console.log(`[PASS] ${c.route} meta description matches exactly: "${metaDesc}"`);
    } else {
      console.error(`[FAIL] ${c.route} meta description mismatch. Expected: "${c.expectedDesc}", Found: "${metaDesc}"`);
      allPassed = false;
    }
  }

  // Check Canonical Link
  const canonicalMatch = html.match(/<link rel="canonical"\s+href="([^"]*)"/i);
  const expectedCanonical = `https://tdeecalculater.com${c.route}`;
  if (!canonicalMatch || canonicalMatch[1] !== expectedCanonical) {
    console.error(`[FAIL] ${c.route} canonical mismatch. Expected: "${expectedCanonical}", Found: "${canonicalMatch ? canonicalMatch[1] : 'none'}"`);
    allPassed = false;
  } else {
    console.log(`[PASS] ${c.route} canonical link matches: "${canonicalMatch[1]}"`);
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
  console.log('\n🌟 ALL METADATA, TITLE, H1, CANONICAL, AND PRE-RENDER CHECKS PASSED PERFECTLY!');
  process.exit(0);
} else {
  console.error('\n❌ ISSUES DETECTED');
  process.exit(1);
}
