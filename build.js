const fs = require('fs');
const path = require('path');

console.log('Starting static pre-rendering...');

// 1. Read index.html template
const indexPath = path.join(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf-8');

// 2. Read and parse content.js
const contentJsPath = path.join(__dirname, 'js', 'content.js');
const contentJs = fs.readFileSync(contentJsPath, 'utf-8');

// Mock window to execute content.js in node
const window = {};
eval(contentJs);

if (!window.TDEEContent || !window.TDEEContent.routes) {
  console.error('Failed to parse TDEEContent from content.js');
  process.exit(1);
}

const routes = window.TDEEContent.routes;

// FAQ Extractor Helper
function extractFaqsFromContent(content) {
  const faqs = [];
  if (!content) return faqs;

  // Match only the h2 that specifically contains Frequently Asked Questions
  const faqHeaderMatch = content.match(/<h2[^>]*>[^<]*Frequently Asked Questions[^<]*<\/h2>/i);
  if (!faqHeaderMatch) return faqs;

  const startIdx = faqHeaderMatch.index + faqHeaderMatch[0].length;
  const nextH2 = content.substring(startIdx).search(/<h2[^>]*>/i);
  const searchSpace = nextH2 !== -1 ? content.substring(startIdx, startIdx + nextH2) : content.substring(startIdx);

  // Pattern 1: <details><summary>Q</summary>...<p>A</p>...</details>
  const detailsRegex = /<details[\s\S]*?<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi;
  let match;
  while ((match = detailsRegex.exec(searchSpace)) !== null) {
    const question = match[1].replace(/<[^>]+>/g, '').trim();
    const answer = match[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (question && answer) faqs.push({ question, answer });
  }
  if (faqs.length > 0) return faqs;

  // Pattern 2: faq-item or faq-container with h3 & p
  const h3pRegex = /<h3[^>]*>([\s\S]*?)<\/h3>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/gi;
  while ((match = h3pRegex.exec(searchSpace)) !== null) {
    const question = match[1].replace(/<[^>]+>/g, '').trim();
    const answer = match[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (question && answer && (question.includes('?') || question.length < 120)) {
      faqs.push({ question, answer });
    }
  }

  return faqs;
}

// 3. Helper to replace metadata in HTML string
function updateHtmlForRoute(html, route, routeData) {
  let updatedHtml = html;
  const slug = route.replace(/^\/|\/$/g, '').replace(/\//g, '-');
  const ogImageFilename = slug ? `og-${slug}.png` : 'mobile-final.png';
  const ogImageUrl = `https://tdeecalculater.com/images/${ogImageFilename}`;

  // Update Title
  updatedHtml = updatedHtml.replace(/<title>.*<\/title>/, `<title>${routeData.title}</title>`);
  
  // Update Meta Description
  updatedHtml = updatedHtml.replace(/<meta name="description"\s+content="[^"]*">/, `<meta name="description" content="${routeData.metaDescription}">`);
  
  // Update OG Title, Description, and Image
  updatedHtml = updatedHtml.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${routeData.title}">`);
  updatedHtml = updatedHtml.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${routeData.metaDescription}">`);
  updatedHtml = updatedHtml.replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${ogImageUrl}">`);

  // Update Twitter Title, Description, and Image
  updatedHtml = updatedHtml.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${routeData.title}">`);
  updatedHtml = updatedHtml.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${routeData.metaDescription}">`);
  updatedHtml = updatedHtml.replace(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${ogImageUrl}">`);

  // Update Canonical URL and OG URL
  updatedHtml = updatedHtml.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="https://tdeecalculater.com${route}">`);
  updatedHtml = updatedHtml.replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="https://tdeecalculater.com${route}">`);

  const author = window.TDEEContent.author || 'TDEE Calculator Editorial Team';
  const lastUpdated = window.TDEEContent.lastUpdated || 'October 2026';

  const trustMetaHTML = `
      <div class="trust-meta" style="margin-bottom: 2rem; padding: 1rem; background: var(--bg-tertiary); border-radius: 8px; font-size: 0.9rem; border-left: 4px solid var(--accent-cyan);">
        <div style="margin-bottom: 0.5rem;"><strong>✍️ Editorial Attribution:</strong> ${author}</div>
        <div style="margin-bottom: 0.5rem;"><strong>🔬 Methodology:</strong> Evidence-Based Clinical Equations (Mifflin-St Jeor &amp; Katch-McArdle)</div>
        <div><strong>📅 Last Updated:</strong> ${lastUpdated}</div>
      </div>
  `;

  // Static HTML generators for pre-rendering functional tools
  function getCalibrationLabStaticHtml() {
    return `
      <div class="glass-card extras-calc" style="border-color: rgba(168, 85, 247, 0.35);">
        <div class="card-header" style="flex-wrap: wrap; gap: 0.75rem;">
          <div>
            <span class="hero-badge" style="background: rgba(168,85,247,0.15); color: var(--accent-purple); border-color: rgba(168,85,247,0.3);">🔬 Signature Differentiator</span>
            <h3 class="card-title" style="margin-top: 0.5rem;"><span class="card-title-icon">📊</span> Adaptive TDEE Calibration Lab</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin: 0.25rem 0 0;">
              Log daily calories and morning weight to calibrate your actual observed expenditure and eliminate hydration noise.
            </p>
          </div>
        </div>
        <div class="water-weight-explainer" style="margin: 1rem 0; padding: 0.85rem 1rem; background: var(--bg-tertiary); border-radius: 8px; border-left: 4px solid var(--accent-purple); font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">
          💡 <strong>Why 14–28 Day Rolling Averages Defeat Water Weight:</strong> Daily scale fluctuations of 1–4 lbs are driven by water binding to muscle glycogen (~3–4g water per gram of carb), sodium shifts, and intestinal food mass. Comparing the rolling average of your first 7 days against your concluding 7 days neutralizes high-frequency hydration swings.
        </div>
        <div style="display:flex; gap:0.75rem; margin-bottom:1rem; flex-wrap:wrap; align-items:center;">
          <button type="button" class="btn-primary cl-sample-btn" style="width:auto; padding: 0.55rem 1.25rem; font-size: 0.9rem; background: linear-gradient(135deg, var(--accent-purple), var(--accent-indigo)); border: none;">⚡ Fill 14-Day Sample Data (Instant Demo)</button>
          <button type="button" class="btn-secondary cl-run-btn" style="width:auto; padding: 0.55rem 1.25rem; font-size: 0.9rem; font-weight: 700;">Calculate Adaptive TDEE</button>
          <button type="button" class="btn-secondary cl-add-btn" style="width:auto; padding: 0.55rem 1rem; font-size: 0.9rem;">+ Add Day</button>
          <button type="button" class="btn-secondary cl-clear-btn" style="width:auto; padding: 0.55rem 1rem; font-size: 0.9rem; color: var(--accent-rose); border-color: rgba(244,63,94,0.3);">Clear Data</button>
        </div>
        <div style="font-size: 0.8rem; color: var(--text-dim); margin-bottom: 1rem;">
          🔒 <strong>Client-Side Local Privacy:</strong> All weight and calorie computations run locally in your browser. No personal health records are sent to any external server.
        </div>
        <div class="tracker-table-wrapper" style="max-height: 380px; overflow-y: auto;">
          <table class="tracker-table" style="width: 100%;">
            <thead>
              <tr>
                <th style="width: 20%;">Day</th>
                <th style="width: 45%;">Daily Calories Eaten (kcal)</th>
                <th style="width: 35%;">Morning Weight (kg)</th>
              </tr>
            </thead>
            <tbody class="cl-table-body">
              <tr><td style="font-weight:700; color:var(--accent-purple);">Day 1</td><td><input type="number" class="input-field cl-row-cals" value="2350" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td><td><input type="number" step="0.1" class="input-field cl-row-weight" value="78.5" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td></tr>
              <tr><td style="font-weight:700; color:var(--accent-purple);">Day 2</td><td><input type="number" class="input-field cl-row-cals" value="2400" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td><td><input type="number" step="0.1" class="input-field cl-row-weight" value="78.6" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td></tr>
              <tr><td style="font-weight:700; color:var(--accent-purple);">Day 3</td><td><input type="number" class="input-field cl-row-cals" value="2280" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td><td><input type="number" step="0.1" class="input-field cl-row-weight" value="78.4" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td></tr>
              <tr><td style="font-weight:700; color:var(--accent-purple);">Day 4</td><td><input type="number" class="input-field cl-row-cals" value="2310" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td><td><input type="number" step="0.1" class="input-field cl-row-weight" value="78.3" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td></tr>
              <tr><td style="font-weight:700; color:var(--accent-purple);">Day 5</td><td><input type="number" class="input-field cl-row-cals" value="2390" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td><td><input type="number" step="0.1" class="input-field cl-row-weight" value="78.5" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td></tr>
              <tr><td style="font-weight:700; color:var(--accent-purple);">Day 6</td><td><input type="number" class="input-field cl-row-cals" value="2450" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td><td><input type="number" step="0.1" class="input-field cl-row-weight" value="78.2" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td></tr>
              <tr><td style="font-weight:700; color:var(--accent-purple);">Day 7</td><td><input type="number" class="input-field cl-row-cals" value="2300" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td><td><input type="number" step="0.1" class="input-field cl-row-weight" value="78.3" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td></tr>
              <tr><td style="font-weight:700; color:var(--accent-purple);">Day 8</td><td><input type="number" class="input-field cl-row-cals" value="2340" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td><td><input type="number" step="0.1" class="input-field cl-row-weight" value="78.2" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td></tr>
              <tr><td style="font-weight:700; color:var(--accent-purple);">Day 9</td><td><input type="number" class="input-field cl-row-cals" value="2290" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td><td><input type="number" step="0.1" class="input-field cl-row-weight" value="78.1" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td></tr>
              <tr><td style="font-weight:700; color:var(--accent-purple);">Day 10</td><td><input type="number" class="input-field cl-row-cals" value="2360" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td><td><input type="number" step="0.1" class="input-field cl-row-weight" value="78.2" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td></tr>
              <tr><td style="font-weight:700; color:var(--accent-purple);">Day 11</td><td><input type="number" class="input-field cl-row-cals" value="2410" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td><td><input type="number" step="0.1" class="input-field cl-row-weight" value="78.0" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td></tr>
              <tr><td style="font-weight:700; color:var(--accent-purple);">Day 12</td><td><input type="number" class="input-field cl-row-cals" value="2320" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td><td><input type="number" step="0.1" class="input-field cl-row-weight" value="77.9" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td></tr>
              <tr><td style="font-weight:700; color:var(--accent-purple);">Day 13</td><td><input type="number" class="input-field cl-row-cals" value="2350" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td><td><input type="number" step="0.1" class="input-field cl-row-weight" value="78.0" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td></tr>
              <tr><td style="font-weight:700; color:var(--accent-purple);">Day 14</td><td><input type="number" class="input-field cl-row-cals" value="2300" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td><td><input type="number" step="0.1" class="input-field cl-row-weight" value="77.8" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td></tr>
            </tbody>
          </table>
        </div>
        <div class="cl-result-card calibration-result-card" style="margin-top: 1.25rem;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;">
            <div>
              <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">Observed Real-World TDEE</div>
              <div class="cl-observed-tdee" style="font-size:2rem; font-weight:900; color:var(--accent-purple);">2,545 kcal/day</div>
              <div class="cl-formula-delta" style="font-size:0.85rem; font-weight:600; color:var(--accent-cyan); margin-top:0.25rem;">+95 kcal vs Formula Baseline</div>
            </div>
            <div>
              <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">Average Daily Intake</div>
              <div class="cl-avg-cals" style="font-size:1.35rem; font-weight:700; color:#fff;">2,350 kcal/day</div>
              <div style="font-size:0.8rem; color:var(--text-muted);">Logged across 14 days</div>
            </div>
            <div>
              <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">True Weight Trend Rate</div>
              <div class="cl-weight-delta" style="font-size:1.35rem; font-weight:700; color:var(--accent-emerald);">-0.22 kg/week</div>
              <div class="cl-confidence-badge" style="display:inline-block; margin-top:0.35rem; padding:0.2rem 0.5rem; background:rgba(16,185,129,0.15); color:var(--accent-emerald); border-radius:4px; font-size:0.75rem; font-weight:700;">High Confidence (14 Days)</div>
            </div>
          </div>
          <div class="cl-summary-text" style="margin-top: 1rem; padding-top: 0.85rem; border-top: 1px solid var(--border-color); font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">
            Analysis: Days 1–7 weight average was 78.46 kg; concluding average was 78.03 kg (-0.43 kg net delta). Energy imbalance: -242 kcal/day. Observed maintenance expenditure: <strong>2,545 kcal/day</strong>.
          </div>
        </div>
      </div>
    `;
  }

  function getQuestionnaireWizardStaticHtml() {
    return `
      <div class="glass-card extras-calc" style="border-color: rgba(6, 182, 212, 0.35);">
        <div class="card-header" style="flex-wrap: wrap; gap: 0.75rem;">
          <div>
            <span class="hero-badge" style="background: rgba(6,182,212,0.15); color: var(--accent-cyan); border-color: rgba(6,182,212,0.3);">⚡ Accurate Multiplier Finder</span>
            <h3 class="card-title" style="margin-top: 0.5rem;"><span class="card-title-icon">🧭</span> 60-Second Movement Questionnaire for Lifters</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin: 0.25rem 0 0;">
              Isolate your occupational NEAT steps from your gym workout frequency to calculate your true Physical Activity Level (PAL).
            </p>
          </div>
        </div>
        <div class="quiz-step" style="margin-top: 1.25rem;">
          <h4 style="font-size: 1.05rem; margin-bottom: 0.35rem; color: var(--accent-cyan);">Step 1: Daily Occupational Movement (NEAT Baseline)</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">How many steps do you take during a typical workday outside of structured gym exercise?</p>
          <div class="options-grid" style="grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 0.75rem;">
            <div class="option-card wizard-option qw-opt" data-group="steps" data-val="under_5k">
              <div class="option-title">Under 5,000 steps</div>
              <div class="option-desc">Desk job, remote work, driving, mostly seated.</div>
            </div>
            <div class="option-card wizard-option qw-opt selected" data-group="steps" data-val="5k_8k">
              <div class="option-title">5,000 – 8,000 steps</div>
              <div class="option-desc">Office worker with daily errands, light commuting, or lunch walk.</div>
            </div>
            <div class="option-card wizard-option qw-opt" data-group="steps" data-val="8k_12k">
              <div class="option-title">8,000 – 12,000 steps</div>
              <div class="option-desc">Active job: retail, teacher, hospitality, sales floor.</div>
            </div>
            <div class="option-card wizard-option qw-opt" data-group="steps" data-val="over_12k">
              <div class="option-title">12,000+ steps</div>
              <div class="option-desc">Physically demanding: nurse, construction, warehouse, trades.</div>
            </div>
          </div>
        </div>
        <div class="quiz-step" style="margin-top: 1.5rem;">
          <h4 style="font-size: 1.05rem; margin-bottom: 0.35rem; color: var(--accent-cyan);">Step 2: Structured Workout &amp; Lifting Frequency</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">How many days per week do you perform dedicated resistance or barbell training?</p>
          <div class="options-grid" style="grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 0.75rem;">
            <div class="option-card wizard-option qw-opt" data-group="workoutDays" data-val="0">
              <div class="option-title">0 – 1 days / week</div>
              <div class="option-desc">Little to no dedicated gym or strength sessions.</div>
            </div>
            <div class="option-card wizard-option qw-opt" data-group="workoutDays" data-val="2">
              <div class="option-title">2 – 3 days / week</div>
              <div class="option-desc">Consistent light-to-moderate training or full-body lifting.</div>
            </div>
            <div class="option-card wizard-option qw-opt selected" data-group="workoutDays" data-val="4">
              <div class="option-title">4 – 5 days / week</div>
              <div class="option-desc">Dedicated upper/lower split, PPL, or strength program.</div>
            </div>
            <div class="option-card wizard-option qw-opt" data-group="workoutDays" data-val="6">
              <div class="option-title">6 – 7 days / week</div>
              <div class="option-desc">High-frequency athletic training or two-a-days.</div>
            </div>
          </div>
        </div>
        <div class="quiz-step" style="margin-top: 1.5rem;">
          <h4 style="font-size: 1.05rem; margin-bottom: 0.35rem; color: var(--accent-cyan);">Step 3: Training Intensity &amp; Session Demands</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">What is the typical intensity of your workout sessions?</p>
          <div class="options-grid" style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 0.75rem;">
            <div class="option-card wizard-option qw-opt selected" data-group="intensity" data-val="moderate">
              <div class="option-title">Moderate Intensity</div>
              <div class="option-desc">Standard hypertrophy sets, 2–3 min rests, steady cardio.</div>
            </div>
            <div class="option-card wizard-option qw-opt" data-group="intensity" data-val="high">
              <div class="option-title">High / Vigorous Intensity</div>
              <div class="option-desc">Heavy compound powerlifting, CrossFit, sprints, HIIT circuits.</div>
            </div>
          </div>
        </div>
        <div class="qw-result-box" style="margin-top: 1.5rem; padding: 1.25rem; background: rgba(6, 182, 212, 0.08); border: 1px solid var(--accent-cyan); border-radius: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em;">Calculated Lifter Multiplier (PAL)</div>
              <div class="qw-display-mult" style="font-size: 2.2rem; font-weight: 900; color: var(--accent-cyan);">1.510</div>
              <div class="qw-display-summary" style="font-size: 0.9rem; color: var(--text-primary); font-weight: 600; margin-top: 0.25rem;">Moderately Active equivalent</div>
            </div>
            <div class="qw-shield-box" style="text-align: right; max-width: 320px;">
              <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--accent-emerald); font-weight: 700;">🛡️ Overestimation Avoided</div>
              <div class="qw-shield-diff" style="font-size: 1.35rem; font-weight: 800; color: var(--accent-emerald);">385 kcal / day</div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">Saved vs picking "Very Active" (1.725) by mistake</div>
            </div>
          </div>
          <div class="qw-formula-breakdown" style="margin-top: 1rem; padding-top: 0.85rem; border-top: 1px solid rgba(6,182,212,0.25); font-size: 0.85rem; color: var(--text-muted);">
            Additive Model: Base (1.200) + Steps (+0.150) + Workouts (+0.160) + Intensity (+0.000) = <strong>1.510</strong>
          </div>
        </div>
      </div>
    `;
  }

  function getRestTrainingSplitStaticHtml() {
    return `
      <div class="glass-card extras-calc" style="border-color: rgba(16, 185, 129, 0.35);">
        <div class="card-header" style="flex-wrap: wrap; gap: 0.75rem;">
          <div>
            <span class="hero-badge" style="background: rgba(16,185,129,0.15); color: var(--accent-emerald); border-color: rgba(16,185,129,0.3);">⚡ Calorie &amp; Macro Cycling</span>
            <h3 class="card-title" style="margin-top: 0.5rem;"><span class="card-title-icon">⚖️</span> TDEE Calculator With Rest &amp; Training Day Macros</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin: 0.25rem 0 0;">
              Split your calories and carbs between workout days and rest days while matching your exact weekly calorie target.
            </p>
          </div>
        </div>
        <div class="rts-results" style="margin-top: 1rem;">
          <div style="padding: 1rem; background: var(--bg-tertiary); border-radius: 8px; border-left: 4px solid var(--accent-cyan); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Average Daily Target</div>
              <div class="rts-avg-target" style="font-size: 1.6rem; font-weight: 900; color: #fff;">2,500 kcal/day</div>
            </div>
            <div>
              <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Weekly Energy Budget (TDEE &times; 7)</div>
              <div class="rts-weekly-budget" style="font-size: 1.4rem; font-weight: 800; color: var(--accent-cyan);">17,500 kcal/week</div>
            </div>
          </div>
          <div class="split-card" style="margin-top: 1.25rem;">
            <div class="split-box training" style="border-left: 4px solid var(--accent-emerald);">
              <div class="split-title" style="color: var(--accent-emerald); font-weight: 700;">🏋️‍♂️ Training Days (<span class="rts-disp-tdays">4</span>x/week)</div>
              <div class="rts-train-cals split-val" style="color: var(--accent-emerald); font-size: 1.85rem; margin: 0.35rem 0;">2,720 kcal</div>
              <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.75rem;">+220 kcal workout fuel &amp; glycogen load</div>
              <div class="macro-grid" style="grid-template-columns: 1fr; gap: 0.5rem;">
                <div class="macro-card protein" style="padding: 0.6rem 0.75rem;">
                  <div class="rts-train-protein" style="font-size: 1.1rem; font-weight: 800;">176g</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">Protein (2.2g/kg · 26%)</div>
                </div>
                <div class="macro-card carbs" style="padding: 0.6rem 0.75rem;">
                  <div class="rts-train-carbs" style="font-size: 1.1rem; font-weight: 800;">352g</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">Carbohydrates (High Fuel · 52%)</div>
                </div>
                <div class="macro-card fat" style="padding: 0.6rem 0.75rem;">
                  <div class="rts-train-fat" style="font-size: 1.1rem; font-weight: 800;">68g</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">Healthy Fats (Moderate · 22%)</div>
                </div>
              </div>
            </div>
            <div class="split-box rest" style="border-left: 4px solid var(--accent-amber);">
              <div class="split-title" style="color: var(--accent-amber); font-weight: 700;">🛋️ Rest Days (<span class="rts-disp-rdays">3</span>x/week)</div>
              <div class="rts-rest-cals split-val" style="color: var(--accent-amber); font-size: 1.85rem; margin: 0.35rem 0;">2,207 kcal</div>
              <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.75rem;">Balanced deficit for cellular repair &amp; fat burn</div>
              <div class="macro-grid" style="grid-template-columns: 1fr; gap: 0.5rem;">
                <div class="macro-card protein" style="padding: 0.6rem 0.75rem;">
                  <div class="rts-rest-protein" style="font-size: 1.1rem; font-weight: 800;">176g</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">Protein (Identical 2.2g/kg · 32%)</div>
                </div>
                <div class="macro-card carbs" style="padding: 0.6rem 0.75rem;">
                  <div class="rts-rest-carbs" style="font-size: 1.1rem; font-weight: 800;">188g</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">Carbohydrates (Lower Insulin · 34%)</div>
                </div>
                <div class="macro-card fat" style="padding: 0.6rem 0.75rem;">
                  <div class="rts-rest-fat" style="font-size: 1.1rem; font-weight: 800;">83g</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">Healthy Fats (Elevated · 34%)</div>
                </div>
              </div>
            </div>
          </div>
          <div class="rts-budget-check" style="margin-top: 1.25rem; padding: 0.85rem 1rem; background: var(--bg-tertiary); border-radius: 8px; border-left: 4px solid var(--accent-emerald); font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">
            ✅ <strong>Weekly Conservation Check:</strong> (<span class="rts-check-tcount">4</span> &times; <span class="rts-check-tcals">2,720</span> kcal) + (<span class="rts-check-rcount">3</span> &times; <span class="rts-check-rcals">2,207</span> kcal) = <strong>17,501 kcal/week</strong>. Your weekly target is strictly maintained.
          </div>
        </div>
      </div>
    `;
  }

  let preMountedCalcHTML = '';
  if (route === '/how-to-calibrate-tdee-with-weight-trends/') {
    preMountedCalcHTML = getCalibrationLabStaticHtml();
  } else if (route === '/activity-factor-questionnaire-for-lifting/') {
    preMountedCalcHTML = getQuestionnaireWizardStaticHtml();
  } else if (route === '/tdee-calculator-with-rest-and-training-day-macros/') {
    preMountedCalcHTML = getRestTrainingSplitStaticHtml();
  }

  // Inject the Silo container HTML
  const siloContainerHTML = `
  <!-- Dynamic Container for SPA Silo Pages -->
  <div id="silo-container" class="container content-section">
    <div class="article-body">
      <span id="silo-category" class="hero-badge">${routeData.category || 'Guide'}</span>
      <h1 id="silo-title" style="margin: 1rem 0 1.5rem;">${routeData.h1 || routeData.title}</h1>
      ${trustMetaHTML}
      <div id="silo-calculator-mount">${preMountedCalcHTML}</div>
      <div id="silo-body" class="article-body">
${routeData.content}
      </div>
      <div style="margin-top:3rem; padding-top:1.5rem; border-top:1px solid var(--border-color);">
        <a href="/" class="btn-secondary">← Back to Main TDEE Calculator</a>
      </div>
    </div>
  </div>
  `;

  // ISSUE A FIX: Completely remove #hero-workspace div and all homepage body content between header and footer for subpages!
  const heroStartIndex = updatedHtml.indexOf('<div id="hero-workspace">');
  const footerStartIndex = updatedHtml.indexOf('<!-- Footer');
  const footerTagIndex = updatedHtml.indexOf('<footer');
  const targetFooterIndex = footerStartIndex !== -1 ? footerStartIndex : footerTagIndex;

  if (heroStartIndex !== -1 && targetFooterIndex !== -1) {
    updatedHtml = updatedHtml.substring(0, heroStartIndex) + siloContainerHTML + '\n' + updatedHtml.substring(targetFooterIndex);
  }

  // Inject Route-Specific Structured Data (JSON-LD)
  const isArticlePage = route.startsWith('/blog/') || route === '/tdee-for-weight-gain/' || route === '/tdee-for-muscle-building/' || route === '/weight-gain/' || route === '/tdee-calculator-for-women-to-gain-weight/' || route === '/how-we-calculate/' || route === '/about/' || route === '/what-is-tdee/' || route === '/how-to-calculate-tdee/' || route === '/healthy-food-and-healthy-life/' || route === '/how-to-calibrate-tdee-with-weight-trends/' || route === '/activity-factor-questionnaire-for-lifting/' || route === '/tdee-calculator-with-rest-and-training-day-macros/';
  const isCalcPage = route.includes('calculator') || route === '/how-to-calibrate-tdee-with-weight-trends/' || route === '/activity-factor-questionnaire-for-lifting/';
  const fullUrl = `https://tdeecalculater.com${route}`;
  const pageTitle = (routeData.h1 || routeData.title);
  const pageDesc = routeData.metaDescription || '';
  const categoryName = routeData.category || (route.includes('calculator') ? 'Calculators' : 'TDEE Guides');

  const graphNodes = [
    {
      "@type": "WebSite",
      "@id": "https://tdeecalculater.com/#website",
      "url": "https://tdeecalculater.com/",
      "name": "TDEE Calculator",
      "inLanguage": "en-US"
    },
    {
      "@type": "Organization",
      "@id": "https://tdeecalculater.com/#organization",
      "name": "TDEE Calculator",
      "url": "https://tdeecalculater.com/"
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${fullUrl}#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://tdeecalculater.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": categoryName,
          "item": fullUrl
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": pageTitle,
          "item": fullUrl
        }
      ]
    }
  ];

  if (isCalcPage) {
    graphNodes.push({
      "@type": "WebApplication",
      "@id": `${fullUrl}#webapp`,
      "name": pageTitle,
      "url": fullUrl,
      "applicationCategory": "HealthApplication",
      "operatingSystem": "All",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    });
  } else if (route === '/about/') {
    graphNodes.push({
      "@type": "AboutPage",
      "@id": `${fullUrl}#aboutpage`,
      "name": pageTitle,
      "url": fullUrl,
      "description": pageDesc
    });
  } else if (route === '/contact/') {
    graphNodes.push({
      "@type": "ContactPage",
      "@id": `${fullUrl}#contactpage`,
      "name": pageTitle,
      "url": fullUrl,
      "description": pageDesc
    });
  } else if (!isArticlePage) {
    graphNodes.push({
      "@type": "WebPage",
      "@id": `${fullUrl}#webpage`,
      "name": pageTitle,
      "url": fullUrl,
      "description": pageDesc
    });
  }

  // ISSUE B FIX: Use truthful neutral Organization attribution without unverified degrees or medical reviewer claims
  if (isArticlePage) {
    graphNodes.push({
      "@type": "Article",
      "@id": `${fullUrl}#article`,
      "isPartOf": { "@id": "https://tdeecalculater.com/#website" },
      "headline": pageTitle,
      "description": pageDesc,
      "mainEntityOfPage": fullUrl,
      "datePublished": "2026-10-02",
      "dateModified": "2026-10-11",
      "author": {
        "@type": "Organization",
        "name": "TDEE Calculator Editorial Team",
        "url": "https://tdeecalculater.com/about/"
      },
      "publisher": { "@id": "https://tdeecalculater.com/#organization" },
      "image": ogImageUrl
    });
  }

  // Add FAQPage node for all visible FAQs on page
  const extractedFaqs = extractFaqsFromContent(routeData.content);
  if (extractedFaqs.length > 0) {
    graphNodes.push({
      "@type": "FAQPage",
      "@id": `${fullUrl}#faq`,
      "mainEntity": extractedFaqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    });
  }

  const routeJsonLd = {
    "@context": "https://schema.org",
    "@graph": graphNodes
  };

  updatedHtml = updatedHtml.replace(/<!-- JSON-LD Structured Data Schema -->[\s\S]*?<\/script>/, `<!-- JSON-LD Structured Data Schema -->\n  <script type="application/ld+json">\n  ${JSON.stringify(routeJsonLd, null, 4)}\n  </script>`);

  return updatedHtml;
}

// 4. Generate static files for each canonical route
for (const [route, routeData] of Object.entries(routes)) {
  if (route === '/' || !routeData) continue; // Homepage is handled by main index.html

  const dirPath = path.join(__dirname, route);
  fs.mkdirSync(dirPath, { recursive: true });

  const routeHtml = updateHtmlForRoute(indexHtml, route, routeData);
  const filePath = path.join(dirPath, 'index.html');
  fs.writeFileSync(filePath, routeHtml, 'utf-8');
  
  console.log(`Generated static file for route: ${route}`);
}

console.log('Static pre-rendering complete!');
