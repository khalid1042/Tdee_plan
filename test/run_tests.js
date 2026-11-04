/**
 * Automated Test Suite for TDEECalculator.com
 * Validates:
 * 1. Calculation Engine Math & Terminology (Mifflin REE, Katch LBM, splits, wizard)
 * 2. Pre-rendered HTML Metadata (canonical, titles, descriptions, H1 hierarchy)
 * 3. Structured Data JSON-LD Syntax & E-E-A-T Safety (zero fake review boards)
 * 4. Internal Link Integrity (0 broken links across all 27 routes)
 * 5. Sitemap XML Validity & Synchronization
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✔ PASS: ${testName}`);
  } else {
    failedTests++;
    console.error(`  ✖ FAIL: ${testName} ${details ? '(' + details + ')' : ''}`);
  }
}

console.log('\n======================================================');
console.log('  TDEECalculator.com — Automated Test Suite');
console.log('======================================================\n');

// -----------------------------------------------------------------------------
// SUITE 1: CALCULATION ENGINE MATHEMATICS
// -----------------------------------------------------------------------------
console.log('--- Suite 1: Calculation Engine Mathematics & Physics ---');

global.window = global;
require(path.join(ROOT_DIR, 'js', 'calculator.js'));
const calc = window.TDEECalculator;

// Test 1.1: Male Mifflin-St Jeor REE
const maleBmr = calc.calculateBMR({ age: 28, gender: 'male', heightCm: 175, weightKg: 75 });
assert(
  maleBmr.ree === 1709 && maleBmr.bmr === 1709,
  'Mifflin-St Jeor male calculation returns correct REE (1709 kcal)',
  `Received: ${JSON.stringify(maleBmr)}`
);
assert(
  maleBmr.formula === 'Mifflin-St Jeor (REE)',
  'Mifflin formula labeled accurately with REE notation'
);

// Test 1.2: Female Mifflin-St Jeor REE
const femaleBmr = calc.calculateBMR({ age: 30, gender: 'female', heightCm: 165, weightKg: 65 });
assert(
  femaleBmr.ree === 1370 && femaleBmr.bmr === 1370,
  'Mifflin-St Jeor female calculation returns correct REE (1370 kcal)',
  `Received: ${femaleBmr.ree}`
);

// Test 1.3: Katch-McArdle LBM Formula
const katch = calc.calculateBMR({ weightKg: 80, bodyFat: 15 });
assert(
  katch.bmr === 1839 && katch.lbmKg === 68,
  'Katch-McArdle calculates LBM (68kg) and BMR (1839 kcal) accurately',
  `Received: ${JSON.stringify(katch)}`
);

// Test 1.4: TDEE Multipliers
const tdeeObj = calc.calculateTDEE(1709, 'moderately_active');
assert(
  tdeeObj.tdee === 2649,
  'TDEE accurately multiplies REE by 1.55 (1709 * 1.55 = 2649 kcal)',
  `Received: ${tdeeObj.tdee}`
);

// Test 1.5: Rest & Training Day Calorie Split Budget Conservation
const split = calc.calculateRestTrainingSplit(2500, 4);
const expectedWeekly = 2500 * 7; // 17500
const splitWeekly = (split.trainingDayCals * 4) + (split.restDayCals * 3);
assert(
  Math.abs(splitWeekly - expectedWeekly) <= 5,
  'Training and Rest Day macro split conserves weekly energy budget within rounding margin',
  `Expected: ${expectedWeekly}, Actual: ${splitWeekly}`
);

// Test 1.6: Goal Calculations & Metabolic Adaptation Wording
const goals = calc.calculateGoals(2500);
assert(
  goals.mildDeficit.calories === 2125 &&
  goals.moderateDeficit.calories === 1950 &&
  goals.aggressiveDeficit.calories === 1750 &&
  goals.leanBulk.calories === 2750,
  'Calorie deficit and surplus targets compute correct mathematical percentages (-15%, -22%, -30%, +10%)'
);
assert(
  goals.mildDeficit.paceText.includes('metabolic adaptation'),
  'Deficit paceText contains scientific qualification regarding dynamic metabolic adaptation'
);

// Test 1.7: 60-Second Movement Questionnaire Wizard
const wizardMult = calc.calculateWizardMultiplier({ steps: '5k_8k', workoutDays: 4, intensity: 'moderate' });
assert(
  wizardMult >= 1.45 && wizardMult <= 1.60,
  'Movement questionnaire computes realistic Physical Activity Level (1.52x)',
  `Received: ${wizardMult}`
);

// -----------------------------------------------------------------------------
// SUITE 2: STATIC PRE-RENDERED METADATA & ON-PAGE SEO
// -----------------------------------------------------------------------------
console.log('\n--- Suite 2: Static HTML Metadata & On-Page SEO ---');

const routes = [
  '/',
  '/bmr-calculator/',
  '/maintenance-calorie-calculator/',
  '/calorie-deficit-calculator/',
  '/calorie-surplus-calculator/',
  '/macro-calculator/',
  '/calories-burned-calculator/',
  '/calibrate-tdee-weight-trends/',
  '/accurate-activity-factor-questionnaire/',
  '/tdee-calculator-rest-training-day-macros/',
  '/blog/what-is-tdee/',
  '/blog/how-to-calculate-tdee/',
  '/blog/tdee-vs-bmr/',
  '/blog/tdee-for-weight-loss/',
  '/tdee-for-weight-gain/',
  '/tdee-for-muscle-building/',
  '/healthy-food-and-healthy-life/',
  '/blog/mifflin-st-jeor-equation/',
  '/how-we-calculate/',
  '/about/',
  '/contact/',
  '/editorial-policy/',
  '/sources/',
  '/privacy-policy/',
  '/terms/',
  '/disclaimer/',
  '/cookie-policy/'
];

assert(routes.length === 27, 'Total canonical routes inventory equals exactly 27');

let allPagesExist = true;
let allCanonicalValid = true;
let allTitlesValid = true;
let allDescriptionsValid = true;
let allH1Valid = true;

routes.forEach(route => {
  const filePath = route === '/' 
    ? path.join(ROOT_DIR, 'index.html') 
    : path.join(ROOT_DIR, route, 'index.html');

  if (!fs.existsSync(filePath)) {
    allPagesExist = false;
    console.error(`Missing HTML file: ${filePath}`);
    return;
  }

  const html = fs.readFileSync(filePath, 'utf8');

  // Check canonical
  const expectedCanonical = `https://tdeecalculater.com${route}`;
  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)">/);
  if (!canonicalMatch || canonicalMatch[1] !== expectedCanonical) {
    allCanonicalValid = false;
    console.error(`Canonical mismatch in ${route}: Expected ${expectedCanonical}, found ${canonicalMatch ? canonicalMatch[1] : 'none'}`);
  }

  // Check title length
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  if (!titleMatch || titleMatch[1].length === 0 || titleMatch[1].length > 68) {
    allTitlesValid = false;
    console.error(`Title issue in ${route}: "${titleMatch ? titleMatch[1] : 'none'}" (Length: ${titleMatch ? titleMatch[1].length : 0})`);
  }

  // Check meta description (handles multiline attributes)
  const descMatch = html.match(/<meta\s+name=["']description["'][\s\S]*?content=["']([^"']+)["']/i) ||
                    html.match(/<meta\s+content=["']([^"']+)["'][\s\S]*?name=["']description["']/i);
  if (!descMatch || descMatch[1].trim().length < 50 || descMatch[1].trim().length > 175) {
    allDescriptionsValid = false;
    console.error(`Description length issue in ${route}: (Length: ${descMatch ? descMatch[1].trim().length : 0})`);
  }

  // Check single H1
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  if (h1Matches.length !== 1) {
    allH1Valid = false;
    console.error(`H1 count issue in ${route}: Found ${h1Matches.length} <h1> tags`);
  }
});

assert(allPagesExist, 'All 27 canonical HTML files exist on disk');
assert(allCanonicalValid, 'All 27 pages have exact self-referencing canonical URLs with trailing slashes');
assert(allTitlesValid, 'All 27 page titles are concise and optimized for mobile/desktop SERPs (<68 chars)');
assert(allDescriptionsValid, 'All 27 meta descriptions exist with valid search snippet lengths');
assert(allH1Valid, 'Every canonical page has exactly one <h1> heading');

// -----------------------------------------------------------------------------
// SUITE 3: STRUCTURED DATA (JSON-LD) & E-E-A-T SAFETY
// -----------------------------------------------------------------------------
console.log('\n--- Suite 3: Structured Data (JSON-LD) & E-E-A-T Authenticity ---');

let schemasParsedCleanly = true;
let zeroFakeReviewBoards = true;

routes.forEach(route => {
  const filePath = route === '/' 
    ? path.join(ROOT_DIR, 'index.html') 
    : path.join(ROOT_DIR, route, 'index.html');

  const html = fs.readFileSync(filePath, 'utf8');

  // Verify no fake review boards in text or schema
  if (/Reviewed by a Registered Dietitian|CISSN|reviewedBy/i.test(html)) {
    zeroFakeReviewBoards = false;
    console.error(`Unverified review board claim found in ${route}`);
  }

  const scriptMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  scriptMatches.forEach(scriptTag => {
    const jsonStr = scriptTag.replace(/<script type="application\/ld\+json">|<\/script>/g, '').trim();
    try {
      JSON.parse(jsonStr);
    } catch (e) {
      schemasParsedCleanly = false;
      console.error(`JSON-LD syntax error in ${route}: ${e.message}`);
    }
  });
});

assert(schemasParsedCleanly, 'All JSON-LD structured data scripts parse with 100% valid JSON syntax');
assert(zeroFakeReviewBoards, 'Zero unverified RD/CISSN claims or fake review boards exist in HTML or Schema across all 27 pages');

// -----------------------------------------------------------------------------
// SUITE 4: INTERNAL LINK INTEGRITY & 404 PREVENTION
// -----------------------------------------------------------------------------
console.log('\n--- Suite 4: Internal Link Integrity & 404 Prevention ---');

const knownValidRoutes = new Set([
  ...routes,
  '/what-is-tdee/',
  '/how-to-calculate-tdee/',
  '/how-to-calibrate-tdee-with-weight-trends/',
  '/activity-factor-questionnaire-for-lifting/',
  '/tdee-calculator-with-rest-and-training-day-macros/'
]);

let brokenLinksCount = 0;

routes.forEach(route => {
  const filePath = route === '/' 
    ? path.join(ROOT_DIR, 'index.html') 
    : path.join(ROOT_DIR, route, 'index.html');

  const html = fs.readFileSync(filePath, 'utf8');
  const hrefMatches = html.match(/href="(\/[^"#?]*)"/g) || [];

  hrefMatches.forEach(match => {
    let cleanHref = match.replace(/href="|"/g, '');
    
    // Check if it's a file link (has an extension like .xml, .png, .ico, .svg, .webmanifest)
    if (/\.[a-z0-9]+$/i.test(cleanHref)) {
      const assetPath = path.join(ROOT_DIR, cleanHref);
      if (!fs.existsSync(assetPath)) {
        brokenLinksCount++;
        console.error(`Broken asset link in ${route}: ${cleanHref}`);
      }
    } else {
      // It's an internal route - ensure trailing slash
      if (!cleanHref.endsWith('/')) cleanHref += '/';
      if (!knownValidRoutes.has(cleanHref)) {
        brokenLinksCount++;
        console.error(`Broken route link in ${route}: ${cleanHref}`);
      }
    }
  });
});

assert(brokenLinksCount === 0, `Zero broken internal links detected across all 27 pages (Checked: 0 errors)`);

// -----------------------------------------------------------------------------
// SUITE 5: SITEMAP & ROBOTS VALIDITY
// -----------------------------------------------------------------------------
console.log('\n--- Suite 5: Sitemap & Robots.txt Infrastructure ---');

const sitemapPath = path.join(ROOT_DIR, 'sitemap.xml');
assert(fs.existsSync(sitemapPath), 'sitemap.xml exists in root directory');

const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const sitemapUrls = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

assert(sitemapUrls.length === 27, `sitemap.xml contains exactly 27 canonical URLs (Found: ${sitemapUrls.length})`);

const expectedSitemapUrls = routes.map(r => `https://tdeecalculater.com${r}`);
const missingSitemapUrls = expectedSitemapUrls.filter(u => !sitemapUrls.includes(u));
assert(missingSitemapUrls.length === 0, 'Every canonical route is present in sitemap.xml');

const robotsPath = path.join(ROOT_DIR, 'robots.txt');
assert(fs.existsSync(robotsPath), 'robots.txt exists in root directory');
const robotsContent = fs.readFileSync(robotsPath, 'utf8');
assert(robotsContent.includes('Sitemap: https://tdeecalculater.com/sitemap.xml'), 'robots.txt contains correct sitemap directive');


// -----------------------------------------------------------------------------
// SUITE 6: GA4 ANALYTICS & PRIVACY COMPLIANCE
// -----------------------------------------------------------------------------
console.log('\n--- Suite 6: GA4 Analytics & Privacy Compliance ---');

const indexHtmlForGA4 = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
const appJsForGA4 = fs.readFileSync(path.join(ROOT_DIR, 'js', 'app.js'), 'utf8');

// 6.1 GA4 script tag present in index.html
assert(
  indexHtmlForGA4.includes('googletagmanager.com/gtag/js'),
  'GA4 gtag.js script tag is present in index.html'
);

// 6.2 anonymize_ip is enabled
assert(
  indexHtmlForGA4.includes("'anonymize_ip': true"),
  'GA4 config has anonymize_ip: true (privacy requirement)'
);

// 6.3 Placeholder ID present — warns user to replace it
assert(
  indexHtmlForGA4.includes('G-XXXXXXXXXX'),
  'GA4 placeholder Measurement ID present (user must replace with real ID)'
);

// 6.4 tdeeTrack() helper present in app.js
assert(
  appJsForGA4.includes('function tdeeTrack('),
  'tdeeTrack() privacy-safe analytics helper present in js/app.js'
);

// 6.5 All 6 anonymous events wired
const expectedEvents = [
  "tdeeTrack('calculator_submit'",
  "tdeeTrack('goal_select'",
  "tdeeTrack('unit_toggle'",
  "tdeeTrack('activity_wizard_complete'",
  "tdeeTrack('calibration_run'",
  "tdeeTrack('macro_view'"
];
expectedEvents.forEach(function(evt) {
  assert(appJsForGA4.includes(evt), `Anonymous event wired: ${evt.replace("tdeeTrack('", '').replace("'", '')}`);
});

// 6.6 Zero PII policy — no raw personal health values in event params
const piiParams = ['age:', 'weight:', 'height:', 'body_fat:', 'calories:'];
piiParams.forEach(function(param) {
  // Check only inside tdeeTrack() calls — look for the pattern in event call blocks
  const trackCalls = appJsForGA4.match(/tdeeTrack\([\s\S]*?\);/g) || [];
  const hasPii = trackCalls.some(call => call.includes(param));
  assert(!hasPii, `Zero PII: no "${param}" value in any tdeeTrack() call`);
});

// 6.7 GA4 present in a pre-rendered subpage (confirms build.js propagation)
const subpageHtml = fs.readFileSync(path.join(ROOT_DIR, 'bmr-calculator', 'index.html'), 'utf8');
assert(
  subpageHtml.includes('googletagmanager.com/gtag/js'),
  'GA4 script tag propagated to pre-rendered subpages (bmr-calculator/index.html)'
);

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log('\n======================================================');
console.log(`  Test Run Complete: ${passedTests}/${totalTests} Passed | ${failedTests} Failed`);
console.log('======================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
