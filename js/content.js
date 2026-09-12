/**
 * Content Engine providing comprehensive topical guides, specialized calculator pages,
 * trust/authority documents, and legal pages for all Silo routes.
 */

window.TDEEContent = {
  routes: {
    // ==========================================
    // BLOG & KNOWLEDGE SILO
    // ==========================================
    '/blog/what-is-tdee/': {
      title: 'What Is TDEE? Meaning, Formula & Complete Guide (2026)',
      metaDescription: 'Discover what Total Daily Energy Expenditure (TDEE) means, how energy burn is calculated, and how to use your TDEE to burn fat or build muscle effectively.',
      category: 'TDEE Guides',
      readTime: '6 min read',
      h1: 'What Is TDEE? Meaning, Formula & How It Works',
      content: `
        <p><strong>Total Daily Energy Expenditure (TDEE)</strong> represents the total number of calories your body burns in a 24-hour period. It combines your Basal Metabolic Rate (BMR) with your physical activity levels, exercise, and the energy required to digest food.</p>
        
        <h2>The 4 Components of TDEE</h2>
        <p>Your daily energy burn is divided into four distinct physiological components:</p>
        <ul>
          <li><strong>Basal Metabolic Rate (BMR) ~60–70%:</strong> The baseline calories your body consumes simply staying alive (brain function, heart beating, lung respiration, cell repair).</li>
          <li><strong>Non-Exercise Activity Thermogenesis (NEAT) ~15%:</strong> Energy expended through daily non-exercise movement such as walking, fidgeting, carrying groceries, and cleaning.</li>
          <li><strong>Exercise Energy Expenditure (EEE) ~5–15%:</strong> Calories burned during intentional physical workouts like lifting weights, running, swimming, or sports.</li>
          <li><strong>Thermic Effect of Food (TEF) ~10%:</strong> The metabolic cost of breaking down and absorbing macronutrients (protein requires ~20-30% of its energy to digest!).</li>
        </ul>

        <h2>Why TDEE Matters More Than Simple BMR</h2>
        <p>Many individuals confuse BMR with TDEE. Eating only your BMR calories while maintaining an active lifestyle can lead to severe caloric deficits, lethargy, muscle loss, and hormonal down-regulation. Calculating your TDEE provides your true <em>maintenance calories</em> — the exact baseline needed to maintain your body weight.</p>

        <h2>How to Use Your TDEE for Your Goals</h2>
        <ul>
          <li><strong>Fat Loss:</strong> Consume 15% to 25% below your TDEE (creating a calorie deficit).</li>
          <li><strong>Weight Maintenance:</strong> Eat equal to your estimated TDEE.</li>
          <li><strong>Muscle Growth (Lean Bulk):</strong> Consume 5% to 10% above your TDEE (creating a controlled caloric surplus).</li>
        </ul>
      `
    },

    '/blog/how-to-calculate-tdee/': {
      title: 'How to Calculate TDEE: Step-by-Step Formulas & Guide (2026)',
      metaDescription: 'Learn how to calculate your Total Daily Energy Expenditure (TDEE) step-by-step using Mifflin-St Jeor, activity multipliers, and real-world tracking.',
      category: 'TDEE Guides',
      readTime: '8 min read',
      h1: 'How to Calculate Your TDEE (Formulas & Step-by-Step Guide)',
      content: `
        <p>Calculating your Total Daily Energy Expenditure (TDEE) is the fundamental first step in taking control of your body composition. Whether your goal is to lose fat, maintain your current weight, or build lean muscle, knowing how many calories your body burns in 24 hours gives you the precise baseline you need.</p>
        
        <p>While an automated <a href="/">main TDEE calculator</a> makes this fast, understanding the underlying mathematical formulas empowers you to tailor your nutrition with confidence. This guide explains how to calculate your TDEE step-by-step using validated scientific equations.</p>

        <h2>Step 1: Calculate Your Basal Metabolic Rate (BMR)</h2>
        <p>Your Basal Metabolic Rate (BMR) represents the calories your body consumes simply staying alive at rest. It powers essential physiological functions such as breathing, blood circulation, cell repair, and brain activity. BMR accounts for approximately 60% to 70% of your total daily burn.</p>
        
        <p>The clinical benchmark formula for estimating BMR in healthy adults is the <strong>Mifflin-St Jeor Equation</strong>. Introduced in 1990, peer-reviewed <a href="https://pubmed.ncbi.nlm.nih.gov/2305711/" target="_blank" rel="noopener">Mifflin-St Jeor equation validation study</a> research demonstrates that it provides the highest accuracy rate across diverse population groups.</p>

        <div style="background:var(--bg-tertiary); padding:1.25rem; border-radius:8px; border-left:4px solid var(--accent-cyan); margin:1.5rem 0;">
          <p style="margin-bottom:0.5rem; font-weight:700; color:#fff;">Mifflin-St Jeor Formula:</p>
          <ul style="margin-bottom:0;">
            <li><strong>Men:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in yrs) + 5</li>
            <li><strong>Women:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in yrs) - 161</li>
          </ul>
        </div>

        <h3>Example Calculation:</h3>
        <p>For a 30-year-old male weighing 80 kg and measuring 180 cm tall:</p>
        <ol>
          <li>(10 × 80) = 800</li>
          <li>(6.25 × 180) = 1,125</li>
          <li>(5 × 30) = 150</li>
          <li><strong>BMR</strong> = 800 + 1,125 - 150 + 5 = <strong>1,780 kcal/day</strong></li>
        </ol>

        <p>If you know your exact body fat percentage, you can alternatively use our <a href="/bmr-calculator/">BMR calculator tool</a> powered by the <strong>Katch-McArdle Equation</strong>, which calculates BMR based on Lean Body Mass (LBM):</p>
        <p style="font-style:italic; background:rgba(255,255,255,0.04); padding:0.75rem; border-radius:6px;">BMR = 370 + (21.6 × LBM in kg)</p>

        <h2>Step 2: Apply Your Activity Level Multiplier</h2>
        <p>BMR only measures resting expenditure. To find your complete daily energy burn, you must multiply your BMR by an <strong>Activity Factor</strong> that accounts for job movement, lifestyle steps, and intentional exercise.</p>

        <table style="width:100%; border-collapse:collapse; margin:1.5rem 0; text-align:left;">
          <thead>
            <tr style="border-bottom:2px solid var(--border-color); color:var(--accent-cyan);">
              <th style="padding:0.75rem;">Activity Category</th>
              <th style="padding:0.75rem;">Physical Lifestyle Description</th>
              <th style="padding:0.75rem;">Multiplier</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border-color);">
              <td style="padding:0.75rem;"><strong>Sedentary</strong></td>
              <td style="padding:0.75rem;">Desk job, minimal walking, no formal exercise</td>
              <td style="padding:0.75rem;"><strong>1.200</strong></td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-color);">
              <td style="padding:0.75rem;"><strong>Lightly Active</strong></td>
              <td style="padding:0.75rem;">Light exercise 1–3 days/week or ~6,000 daily steps</td>
              <td style="padding:0.75rem;"><strong>1.375</strong></td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-color);">
              <td style="padding:0.75rem;"><strong>Moderately Active</strong></td>
              <td style="padding:0.75rem;">Moderate exercise 3–5 days/week or ~9,000 daily steps</td>
              <td style="padding:0.75rem;"><strong>1.550</strong></td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-color);">
              <td style="padding:0.75rem;"><strong>Very Active</strong></td>
              <td style="padding:0.75rem;">Heavy exercise 6–7 days/week or ~12,000 daily steps</td>
              <td style="padding:0.75rem;"><strong>1.725</strong></td>
            </tr>
            <tr>
              <td style="padding:0.75rem;"><strong>Extra Active</strong></td>
              <td style="padding:0.75rem;">Physical labor job plus strenuous daily training</td>
              <td style="padding:0.75rem;"><strong>1.900</strong></td>
            </tr>
          </tbody>
        </table>

        <h3>Final TDEE Equation:</h3>
        <p style="font-size:1.1rem; font-weight:700; color:var(--accent-emerald);">TDEE = BMR × Activity Multiplier</p>
        <p>Using our previous example of a male with a BMR of 1,780 kcal who is <strong>Moderately Active</strong> (1.55 multiplier):</p>
        <p style="font-size:1.1rem; font-weight:700;">TDEE = 1,780 × 1.55 = 2,759 kcal/day</p>
        <p>This individual requires approximately 2,760 calories per day to maintain his current body weight.</p>

        <h2>Step 3: Calibrate Your Estimate with Real-World Tracking</h2>
        <p>Static mathematical formulas are evidence-based starting points, but individual variations in Non-Exercise Activity Thermogenesis (NEAT) and metabolic efficiency mean formula estimates carry a typical variance of ±10%.</p>

        <p>To find your true observed TDEE:</p>
        <ol>
          <li>Log your daily caloric intake using a digital food scale for 14 consecutive days.</li>
          <li>Record your morning scale weight daily after waking up and using the bathroom.</li>
          <li>Compare the average weight of Week 1 against Week 2.</li>
        </ol>
        <p>If your average weight remains unchanged over 14 days, your average daily caloric intake is your true maintenance TDEE. If you are looking to lose weight, plug your baseline into our <a href="/calorie-deficit-calculator/">calorie deficit calculator</a> to establish a safe deficit target.</p>

        <h2>Frequently Asked Questions (FAQ)</h2>
        <div class="faq-grid">
          <div class="faq-item">
            <div class="faq-question">
              <span>How often should I recalculate my TDEE?</span>
              <span class="faq-icon">▼</span>
            </div>
            <div class="faq-answer">
              <p>Recalculate your TDEE whenever your body weight changes by more than 3 to 5 kg (7 to 11 lbs), or when your daily occupation or workout routine changes significantly.</p>
            </div>
          </div>
          <div class="faq-item">
            <div class="faq-question">
              <span>Is TDEE the same as BMR?</span>
              <span class="faq-icon">▼</span>
            </div>
            <div class="faq-answer">
              <p>No. BMR measures calories burned at complete rest, while TDEE includes BMR plus all physical movement, daily steps, workouts, and food digestion.</p>
            </div>
          </div>
          <div class="faq-item">
            <div class="faq-question">
              <span>Why am I not losing weight eating at my calculated TDEE deficit?</span>
              <span class="faq-icon">▼</span>
            </div>
            <div class="faq-answer">
              <p>Formula estimates can overestimate activity levels. Inaccuracies in food logging (such as untracked cooking oils or visual portion estimates) are also common. Track daily calories strictly for 14 days and adjust your multiplier if needed.</p>
            </div>
          </div>
        </div>
      `
    },

    '/blog/tdee-vs-bmr/': {
      title: 'TDEE vs BMR: What Is the Difference & Which Should You Use?',
      metaDescription: 'Understand the difference between Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE), and why eating below BMR can harm fat loss progress.',
      category: 'Comparisons',
      readTime: '6 min read',
      h1: 'TDEE vs BMR: Key Differences Explained',
      content: `
        <p>While both <strong>BMR (Basal Metabolic Rate)</strong> and <strong>TDEE (Total Daily Energy Expenditure)</strong> are foundational numbers in clinical nutrition, confusing the two is one of the most common mistakes people make when planning a diet.</p>
        
        <h2>Key Differences at a Glance</h2>
        <table style="width:100%; border-collapse:collapse; margin:1.5rem 0; text-align:left;">
          <thead>
            <tr style="border-bottom:2px solid var(--border-color); color:var(--accent-cyan);">
              <th style="padding:0.75rem;">Metric</th>
              <th style="padding:0.75rem;">Definition</th>
              <th style="padding:0.75rem;">Includes Activity?</th>
              <th style="padding:0.75rem;">Primary Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border-color);">
              <td style="padding:0.75rem;"><strong>BMR</strong></td>
              <td style="padding:0.75rem;">Calories burned at complete 24-hour rest</td>
              <td style="padding:0.75rem;">❌ No movement included</td>
              <td style="padding:0.75rem;">Clinical baseline energy floor</td>
            </tr>
            <tr>
              <td style="padding:0.75rem;"><strong>TDEE</strong></td>
              <td style="padding:0.75rem;">Total calories burned including movement & exercise</td>
              <td style="padding:0.75rem;">✓ Full daily activity included</td>
              <td style="padding:0.75rem;">Setting maintenance, fat loss, or bulk targets</td>
            </tr>
          </tbody>
        </table>

        <h2>Understanding Basal Metabolic Rate (BMR)</h2>
        <p>Your BMR is the exact caloric energy your organs (brain, heart, lungs, liver, and kidneys) consume to maintain vital functions while in a neutral environment without physical movement. BMR accounts for roughly 60% to 70% of total daily energy output.</p>

        <h2>Understanding Total Daily Energy Expenditure (TDEE)</h2>
        <p>TDEE builds upon your BMR by adding three active expenditure components:</p>
        <ul>
          <li><strong>NEAT (Non-Exercise Movement):</strong> Walking around the house, standing, fidgeting, working at a desk.</li>
          <li><strong>EEE (Exercise Expenditure):</strong> Dedicated physical training like weightlifting, running, or cycling.</li>
          <li><strong>TEF (Thermic Effect of Food):</strong> The energy required to digest, break down, and assimilate food.</li>
        </ul>

        <h2>Why You Should Never Eat Below Your BMR</h2>
        <p>Eating significantly below your BMR causes adaptive thermogenesis (metabolic adaptation). When energy intake drops below baseline cellular requirements, the body responds defensively by downregulating thyroid hormones, lowering spontaneous physical movement, increasing hunger signals, and breaking down lean muscle tissue for fuel.</p>

        <p>To safely lose body fat, always calculate your caloric deficit as a percentage below your <strong>TDEE</strong>, keeping your target calories at or above your baseline BMR. Use our <a href="/bmr-calculator/">standalone BMR calculator</a> to determine your personal floor.</p>
      `
    },

    '/blog/tdee-for-weight-loss/': {
      title: 'TDEE for Weight Loss: Setting the Perfect Calorie Deficit',
      metaDescription: 'Learn how to use your TDEE to set a sustainable calorie deficit for fat loss without losing muscle or harming metabolic health.',
      category: 'Weight Loss',
      readTime: '7 min read',
      h1: 'How to Use TDEE for Sustainable Fat Loss',
      content: `
        <p>To lose body fat, you must create a sustained energy deficit where total caloric intake is lower than your Total Daily Energy Expenditure (TDEE). However, creating an overly aggressive deficit can backfire by triggering muscle loss and intense hunger.</p>
        
        <h2>Selecting the Right Deficit Rate for Your Body</h2>
        <p>Different body composition goals and starting fat percentages require different deficit rates:</p>
        <ul>
          <li><strong>Mild Deficit (-15% TDEE):</strong> Recommended for lean individuals or athletes looking to preserve maximum muscle mass and workout performance. Rate of loss: ~0.25 kg (0.5 lbs) per week.</li>
          <li><strong>Moderate Deficit (-20% to -25% TDEE):</strong> The optimal sweet spot for most adults. Combines predictable fat loss with stable energy levels and manageable appetite. Rate of loss: ~0.5 kg (1.1 lbs) per week.</li>
          <li><strong>Aggressive Deficit (-30% TDEE):</strong> Reserved for short durations or individuals with higher initial body fat levels. Rate of loss: ~0.8 kg (1.7 lbs) per week.</li>
        </ul>

        <h2>3 Rules for Successful TDEE Fat Loss</h2>
        <ol>
          <li><strong>Keep Protein Intake High:</strong> Aim for 1.6 to 2.2 grams of protein per kilogram of body weight to safeguard lean muscle mass while in a deficit.</li>
          <li><strong>Maintain Resistance Training:</strong> Lifting weights signals your body to retain muscle tissue and prioritize body fat breakdown for energy.</li>
          <li><strong>Monitor Weekly Scale Averages:</strong> Evaluate weight loss using 7-day rolling averages rather than daily fluctuations to account for water weight noise.</li>
        </ol>

        <p>Ready to calculate your customized deficit target? Use our <a href="/calorie-deficit-calculator/">interactive calorie deficit calculator</a>.</p>
      `
    },

    // ==========================================
    // CORE CALCULATORS SILO PAGES
    // ==========================================
    '/bmr-calculator/': {
      title: 'BMR Calculator: Calculate Basal Metabolic Rate Accurately',
      metaDescription: 'Calculate your Basal Metabolic Rate (BMR) using Mifflin-St Jeor and Katch-McArdle formulas. Discover your baseline resting calorie burn.',
      category: 'Calculator',
      h1: 'BMR Calculator (Basal Metabolic Rate)',
      content: `
        <p>Your <strong>Basal Metabolic Rate (BMR)</strong> is the total number of calories your body burns while at complete rest to keep your brain, heart, lungs, liver, and cellular processes functioning over 24 hours.</p>
        
        <h2>How BMR Is Calculated</h2>
        <p>Our tool utilizes the two most clinical formulas validated in metabolic research:</p>
        <ul>
          <li><strong>Mifflin-St Jeor Formula:</strong> The gold standard equation for healthy adults based on age, sex, height, and body weight.</li>
          <li><strong>Katch-McArdle Formula:</strong> Activated when body fat percentage is supplied, calculating resting expenditure directly from Lean Body Mass (LBM).</li>
        </ul>

        <h2>Why BMR Matters for Your TDEE</h2>
        <p>BMR forms the baseline layer of your Total Daily Energy Expenditure (TDEE). Once your BMR is established, applying your lifestyle activity factor provides your total daily energy requirement.</p>
      `
    },

    '/maintenance-calorie-calculator/': {
      title: 'Maintenance Calorie Calculator: Find Your Zero-Gain Intake',
      metaDescription: 'Find your precise maintenance calories based on age, height, weight, activity level, and lean body mass.',
      category: 'Calculator',
      h1: 'Maintenance Calorie Calculator',
      content: `
        <p>Your <strong>maintenance calories</strong> represent the exact energy intake where caloric consumption equals total daily energy expenditure (TDEE). Eating at maintenance preserves body weight, hormonal balance, athletic performance, and metabolic health.</p>

        <h2>When Should You Eat at Maintenance?</h2>
        <ul>
          <li><strong>Diet Breaks & Refeeds:</strong> Taking 1 to 2 weeks at maintenance after prolonged fat loss restores thyroid hormones and leptin.</li>
          <li><strong>Body Recomposition:</strong> Beginners and returning lifters can build muscle while losing fat simultaneously by eating at maintenance with high protein.</li>
          <li><strong>Long-Term Weight Stabilization:</strong> Maintaining your achieved goal weight after completing a fat loss phase.</li>
        </ul>
      `
    },

    '/calorie-deficit-calculator/': {
      title: 'Calorie Deficit Calculator: Target Calories for Fat Loss',
      metaDescription: 'Determine your ideal daily calorie deficit for fat loss. Calculate weight loss timelines and safe caloric targets.',
      category: 'Calculator',
      h1: 'Calorie Deficit Calculator',
      content: `
        <p>A <strong>calorie deficit</strong> occurs when you consume fewer calories than your TDEE burns. Your body makes up the energy gap by burning stored body tissue, primarily adipose fat.</p>

        <h2>Choosing Your Calorie Deficit Strategy</h2>
        <p>Use the interactive calculator above to select your target deficit pace:</p>
        <ul>
          <li><strong>Mild (-15%):</strong> Slow, sustainable fat loss preserving high training energy.</li>
          <li><strong>Optimal (-22%):</strong> Balanced fat loss rate of approximately 0.5 kg (1 lb) per week.</li>
          <li><strong>Aggressive (-30%):</strong> Faster fat loss for short-term phases.</li>
        </ul>
      `
    },

    '/calorie-surplus-calculator/': {
      title: 'Calorie Surplus Calculator: Lean Bulk & Muscle Gain Intake',
      metaDescription: 'Calculate your optimal calorie surplus for muscle growth and weight gain without excessive fat accretion.',
      category: 'Calculator',
      h1: 'Calorie Surplus Calculator (Lean Bulk Target)',
      content: `
        <p>Building new muscle tissue is an energy-intensive process requiring a caloric surplus above your TDEE. Consuming a controlled surplus provides the extra energy required for protein synthesis and muscular recovery.</p>

        <h2>Optimizing Your Calorie Surplus Rate</h2>
        <ul>
          <li><strong>Lean Surplus (+10% TDEE):</strong> Adds ~0.2 kg/week, minimizing fat gain while maximizing lean muscle accretion.</li>
          <li><strong>Moderate Surplus (+15% TDEE):</strong> Recommended for intermediate lifters seeking steady strength gains.</li>
          <li><strong>Aggressive Surplus (+20% TDEE):</strong> Suitable for hardgainers or athletes undergoing intense double-session training.</li>
        </ul>
      `
    },

    '/macro-calculator/': {
      title: 'Macro Calculator: Calculate Protein, Carbs & Fat Targets',
      metaDescription: 'Calculate your macronutrient breakdown for fat loss, muscle gain, or maintenance. Customized protein, carb, and fat distributions.',
      category: 'Calculator',
      h1: 'Macro Calculator (Flexible Macronutrients)',
      content: `
        <p>While total calories determine whether you gain or lose weight, your <strong>macronutrient breakdown (Protein, Carbohydrates, and Fats)</strong> dictates body composition and energy levels.</p>

        <h2>The Roles of Each Macronutrient</h2>
        <ul>
          <li><strong>Protein (4 kcal/g):</strong> Essential for muscle tissue repair, enzyme production, and satiety during fat loss.</li>
          <li><strong>Carbohydrates (4 kcal/g):</strong> The primary high-intensity fuel source for workout performance and glycogen replenishment.</li>
          <li><strong>Fats (9 kcal/g):</strong> Required for hormone production (testosterone, estrogen), joint health, and nutrient absorption.</li>
        </ul>
      `
    },

    '/calories-burned-calculator/': {
      title: 'Calories Burned Calculator: Daily Energy Expenditure Burn',
      metaDescription: 'Calculate total calories burned per day based on non-exercise movement, daily steps, and workout sessions.',
      category: 'Calculator',
      h1: 'Calories Burned Calculator',
      content: `
        <p>Your daily caloric burn is dynamic. The <strong>Calories Burned Calculator</strong> calculates your total expenditure by combining baseline resting metabolic rate with step counts, daily lifestyle movement, and workout duration.</p>

        <h2>Understanding Daily Step Burn</h2>
        <p>Walking is one of the most effective ways to boost Non-Exercise Activity Thermogenesis (NEAT). On average, every 1,000 steps burn approximately 35 to 45 additional calories depending on body weight.</p>
      `
    },

    // ==========================================
    // TRUST & AUTHORITY PAGES
    // ==========================================
    '/about/': {
      title: 'About Us: Our Mission & Science-Backed Approach',
      metaDescription: 'Learn about our team, scientific calculation methodology, and commitment to evidence-based nutrition tools.',
      category: 'Company',
      h1: 'About Our TDEE Platform',
      content: `
        <p>Our platform was built to bridge the gap between static mathematical energy formulas and real-world human metabolic adaptation. Standard calculators provide static estimates; our tool empowers users with adaptive calibration based on real weight trends.</p>
        <h2>Our Commitment</h2>
        <ul>
          <li><strong>Scientific Rigor:</strong> We utilize peer-reviewed clinical formulas (Mifflin-St Jeor, Katch-McArdle, Harris-Benedict).</li>
          <li><strong>Transparency:</strong> We explicitly communicate formula error margins and confidence intervals.</li>
          <li><strong>Privacy First:</strong> Your body measurements and tracking logs remain 100% local to your device browser.</li>
        </ul>
      `
    },

    '/editorial-policy/': {
      title: 'Editorial Policy: Research Integrity & Scientific Standards',
      metaDescription: 'Our editorial principles, peer-review standards, and commitment to evidence-based nutrition science.',
      category: 'Trust',
      h1: 'Editorial & Research Policy',
      content: `
        <p>Every article, guide, and calculator formula on our site is audited against published clinical nutrition research and peer-reviewed studies from institutions such as the NIH and American College of Sports Medicine (ACSM).</p>
      `
    },

    '/how-we-calculate/': {
      title: 'How We Calculate TDEE, BMR & Adaptive Expenditure',
      metaDescription: 'Comprehensive breakdown of our mathematical formulas, activity score algorithms, and adaptive calibration models.',
      category: 'Methodology',
      h1: 'How We Calculate: Scientific Formulas & Methodology',
      content: `
        <p>Transparency is our highest priority. Here is the mathematical framework behind our tools:</p>
        <h2>1. Mifflin-St Jeor BMR Equation</h2>
        <p>Published in 1990, the Mifflin-St Jeor equation is validated as the most accurate formula for modern adults within ±10% precision.</p>
        <h2>2. Katch-McArdle Lean Body Mass Equation</h2>
        <p>When body fat percentage is supplied, we calculate Lean Body Mass (LBM = Weight × (1 - BodyFat%)) and apply BMR = 370 + (21.6 × LBM).</p>
        <h2>3. Adaptive Real-World Calibration Model</h2>
        <p>Observed TDEE is computed via linear regression of 7-21 day calorie logs against scale weight changes using the 7,700 kcal/kg tissue energy equivalent constant.</p>
      `
    },

    '/sources/': {
      title: 'Scientific Sources & Clinical References',
      metaDescription: 'Reference bibliography of peer-reviewed studies and clinical papers powering our calculators.',
      category: 'Trust',
      h1: 'Scientific Sources & References',
      content: `
        <ol>
          <li>Mifflin, M. D., et al. (1990). "A new predictive equation for resting energy expenditure in healthy individuals." <em>The American Journal of Clinical Nutrition</em>, 51(2), 241-247.</li>
          <li>Katch, F. I., & McArdle, W. D. (1996). <em>Nutrition, Weight Control, and Exercise</em>. Lea & Febiger.</li>
          <li>Hall, K. D., et al. (2011). "Quantifying the effect of energy imbalance on bodyweight." <em>The Lancet</em>, 378(9793), 826-837.</li>
          <li>Trexler, E. T., Smith-Ryan, A. E., & Norton, L. E. (2014). "Metabolic adaptation to weight loss: implications for the athlete." <em>Journal of the International Society of Sports Nutrition</em>, 11(1), 7.</li>
        </ol>
      `
    },

    // ==========================================
    // LEGAL PAGES
    // ==========================================
    '/privacy-policy/': {
      title: 'Privacy Policy: Data Protection & Privacy Commitment',
      metaDescription: 'Our commitment to user privacy. We do not store or sell your private body metrics.',
      category: 'Legal',
      h1: 'Privacy Policy',
      content: `
        <p>Your privacy is paramount. All calculations, personal measurements, and calibration logs performed on this website occur locally inside your web browser engine. We do not transmit or sell personal health metrics to third-party servers.</p>
      `
    },

    '/terms/': {
      title: 'Terms of Service: Usage Guidelines',
      metaDescription: 'Terms of service for using our calculators and informational content.',
      category: 'Legal',
      h1: 'Terms of Service',
      content: `
        <p>By using this website, you agree to these terms. Content and tool outputs are provided for educational and informational purposes only.</p>
      `
    },

    '/disclaimer/': {
      title: 'Medical Disclaimer: Not Medical Advice',
      metaDescription: 'Health and medical disclaimer. Our calculators provide estimates, not medical diagnoses.',
      category: 'Legal',
      h1: 'Medical & Health Disclaimer',
      content: `
        <p><strong>Disclaimer:</strong> The contents and tool outputs of this website are for informational and educational purposes only and are not intended as medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider or registered dietitian before undertaking any diet or exercise regimen.</p>
      `
    },

    '/cookie-policy/': {
      title: 'Cookie Policy',
      metaDescription: 'Information about how local storage and session cookies operate.',
      category: 'Legal',
      h1: 'Cookie Policy',
      content: `
        <p>This website utilizes local storage to save your preferred units (metric/imperial) and temporary calibration data locally on your device.</p>
      `
    }
  }
};
