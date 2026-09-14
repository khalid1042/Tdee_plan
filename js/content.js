/**
 * Comprehensive SEO Content Engine
 * Provides unique, non-duplicative, rank-optimized content for all Silo routes.
 * Every route owns a distinct focus keyword and search intent.
 */

window.TDEEContent = {
  routes: {
    // ==========================================
    // SILO 1: TDEE CORE & KNOWLEDGE GUIDES
    // ==========================================

    '/blog/what-is-tdee/': {
      title: 'What Is TDEE? Meaning, 4 Components & Complete Guide (2026)',
      metaDescription: 'Discover what Total Daily Energy Expenditure (TDEE) means, the 4 components of daily calorie burn, and how your metabolism uses energy.',
      category: 'TDEE Guides',
      readTime: '7 min read',
      h1: 'What Is TDEE? Meaning, Physiology & Energy Components',
      content: `
        <p><strong>Total Daily Energy Expenditure (TDEE)</strong> is the cumulative measure of energy, expressed in kilocalories (kcal), that your body expends over a 24-hour period. It combines your baseline metabolic survival cost with physical movement, intentional workout training, and the energy consumed digesting food.</p>
        
        <p>Understanding your TDEE allows you to replace dietary guesswork with mathematical precision. Rather than following generic calorie budgets, knowing your TDEE gives you your exact personal baseline for weight loss, maintenance, or muscle gain.</p>

        <h2>The 4 Physiological Components of TDEE</h2>
        <p>Human energy expenditure is divided into four distinct biological categories:</p>

        <table style="width:100%; border-collapse:collapse; margin:1.5rem 0; text-align:left;">
          <thead>
            <tr style="border-bottom:2px solid var(--border-color); color:var(--accent-cyan);">
              <th style="padding:0.75rem;">Component</th>
              <th style="padding:0.75rem;">Share of TDEE</th>
              <th style="padding:0.75rem;">Biological Function</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom:1px solid var(--border-color);">
              <td style="padding:0.75rem;"><strong>BMR (Basal Metabolic Rate)</strong></td>
              <td style="padding:0.75rem;">60% – 70%</td>
              <td style="padding:0.75rem;">Cellular repair, respiration, brain function, heart rhythm at rest.</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-color);">
              <td style="padding:0.75rem;"><strong>NEAT (Non-Exercise Thermogenesis)</strong></td>
              <td style="padding:0.75rem;">15% – 20%</td>
              <td style="padding:0.75rem;">Spontaneous walking, posture, fidgeting, daily occupational tasks.</td>
            </tr>
            <tr style="border-bottom:1px solid var(--border-color);">
              <td style="padding:0.75rem;"><strong>EEE (Exercise Energy Expenditure)</strong></td>
              <td style="padding:0.75rem;">5% – 15%</td>
              <td style="padding:0.75rem;">Structured workouts, weight lifting, running, or cardio training.</td>
            </tr>
            <tr>
              <td style="padding:0.75rem;"><strong>TEF (Thermic Effect of Food)</strong></td>
              <td style="padding:0.75rem;">~10%</td>
              <td style="padding:0.75rem;">Energy expended breaking down, digesting, and absorbing food.</td>
            </tr>
          </tbody>
        </table>

        <h2>Detailed Breakdown of TEF by Macronutrient</h2>
        <p>Not all calories burn equal energy during digestion. Protein has by far the highest thermic cost:</p>
        <ul>
          <li><strong>Protein TEF (20% – 30%):</strong> Out of 100 calories of protein, 20 to 30 calories are consumed simply digesting and processing it!</li>
          <li><strong>Carbohydrate TEF (5% – 10%):</strong> Moderate metabolic digestion cost.</li>
          <li><strong>Fat TEF (0% – 3%):</strong> Very low metabolic cost; easily stored or utilized.</li>
        </ul>

        <h2>Why TDEE Is Superior to Generic Calorie Guidelines</h2>
        <p>Standard dietary guidelines often suggest a blanket "2,000 calorie diet." However, a 90 kg male athlete may have a TDEE of 3,200 calories, while a 55 kg sedentary office worker may have a TDEE of 1,600 calories. Following generic advice causes severe under-eating or accidental weight gain. Calculating your TDEE using our <a href="/">homepage TDEE calculator engine</a> provides an individualized target tailored to your height, weight, age, and lifestyle.</p>
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
      `
    },

    '/blog/tdee-vs-bmr/': {
      title: 'TDEE vs BMR: What Is the Difference & Which Should You Use?',
      metaDescription: 'Understand the difference between Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE), organ energy breakdown, and avoiding starvation deficits.',
      category: 'Comparisons',
      readTime: '6 min read',
      h1: 'TDEE vs BMR: Key Differences & Organ Energy Breakdown',
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

        <h2>Organ Baseline Energy Breakdown at Rest (BMR)</h2>
        <p>Your BMR represents the energy demanded by vital biological organs. According to clinical physiological data, BMR energy is consumed as follows:</p>
        <ul>
          <li><strong>Liver (~27%):</strong> High metabolic conversion and protein synthesis.</li>
          <li><strong>Brain (~19%):</strong> Continuous electrical signaling and glucose usage.</li>
          <li><strong>Skeletal Muscle (~18%):</strong> Baseline muscle tone and cellular ion pumping at rest.</li>
          <li><strong>Kidneys (~10%):</strong> Continuous blood filtration and fluid balance.</li>
          <li><strong>Heart (~7%):</strong> Incessant mechanical pumping.</li>
          <li><strong>Other Organs (~19%):</strong> Gastrointestinal lining, skin repair, lungs.</li>
        </ul>

        <h2>Why You Should Never Eat Below Your BMR</h2>
        <p>Eating significantly below your BMR causes adaptive thermogenesis (metabolic adaptation). When energy intake drops below baseline cellular requirements, the body responds defensively by downregulating thyroid hormones (T3), lowering spontaneous physical movement, increasing hunger signals, and breaking down lean muscle tissue for fuel.</p>

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

    '/blog/mifflin-st-jeor-equation/': {
      title: 'Mifflin-St Jeor Equation: BMR Formula Accuracy & Science (2026)',
      metaDescription: 'In-depth guide to the Mifflin-St Jeor BMR equation. Learn why clinical studies validate it as the most accurate resting metabolic rate formula.',
      category: 'Scientific Formulas',
      readTime: '6 min read',
      h1: 'Mifflin-St Jeor Equation: History, Accuracy & Science',
      content: `
        <p>The <strong>Mifflin-St Jeor Equation</strong> was published in 1990 by Dr. MD Mifflin and ST St Jeor in the <em>American Journal of Clinical Nutrition</em>. It remains the gold-standard formula used by clinical dietitians and sports nutritionists worldwide to predict Basal Metabolic Rate (BMR).</p>

        <h2>The Mathematical Equations</h2>
        <p>The formula calculates daily resting caloric expenditure based on body mass, height, age, and biological sex:</p>
        <div style="background:var(--bg-tertiary); padding:1.25rem; border-radius:8px; border-left:4px solid var(--accent-cyan); margin:1.5rem 0;">
          <ul>
            <li><strong>Men:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5</li>
            <li><strong>Women:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161</li>
          </ul>
        </div>

        <h2>Why Mifflin-St Jeor Outperformed Harris-Benedict</h2>
        <p>Prior to 1990, the <strong>Revised Harris-Benedict equation (1984)</strong> was the primary BMR formula. However, clinical validation studies by the Academy of Nutrition and Dietetics demonstrated that Harris-Benedict systematically overestimates BMR in modern adults by 5% to 15% due to changes in population body composition over time.</p>
        <p>Mifflin-St Jeor was proven accurate within ±10% for over 82% of healthy non-obese and obese adults, establishing it as the most reliable standard.</p>
      `
    },

    // ==========================================
    // SILO 2-7: CORE CALCULATOR TOOL PAGES
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
      title: 'About Us: Science-Backed Energy Expenditure Platform',
      metaDescription: 'Learn about our team, scientific calculation methodology, and commitment to evidence-based nutrition tools.',
      category: 'Company',
      h1: 'About Our TDEE Platform',
      content: `
        <p>Welcome to <strong>TDEE Calculator</strong>, a platform dedicated to providing science-backed, accurate, and actionable energy expenditure tools.</p>
        
        <h2>Our Mission</h2>
        <p>Our mission is to bridge the gap between static mathematical energy formulas and real-world human metabolic adaptation. Standard calculators often provide a single, static estimate that can be frustratingly inaccurate for individuals with unique metabolisms, changing activity levels, or extended dieting histories. Our tool empowers users not just with a baseline starting point, but with an <strong>adaptive calibration engine</strong> that aligns the math with your body's real-world weight trends.</p>
        
        <h2>Who We Are</h2>
        <p>We are a team of data-driven fitness enthusiasts, developers, and nutrition science researchers. We noticed that while there are many TDEE calculators on the internet, most rely on outdated formulas or fail to explain the massive error margins inherent in estimating metabolism. We built this platform to provide a transparent, clinical-grade tool that anyone can use for free.</p>
        
        <h2>Our Core Values</h2>
        <ul>
          <li><strong>Scientific Rigor:</strong> We only utilize peer-reviewed, clinically validated formulas (such as Mifflin-St Jeor and Katch-McArdle) rather than arbitrary math.</li>
          <li><strong>Radical Transparency:</strong> We explicitly communicate the error margins, confidence intervals, and biological variance that affect energy expenditure. We never pretend our calculator is magic—it is an estimate that requires your real-world data to perfect.</li>
          <li><strong>Privacy First:</strong> Your body measurements, weight logs, and daily caloric entries remain 100% local to your device's browser. We do not transmit, store, or sell your personal health metrics to third-party servers. Your data belongs to you.</li>
          <li><strong>No Fads, Just Math:</strong> We do not promote fad diets, rapid weight loss schemes, or unsustainable fitness practices. Energy balance is a biological mechanism, and we aim to explain it clearly.</li>
        </ul>
        
        <p>Whether you are a competitive athlete, a fitness beginner, or someone looking to maintain a healthy lifestyle, our platform is designed to give you the precise data you need to reach your goals.</p>
      `
    },

    '/contact/': {
      title: 'Contact Us: Support & Questions',
      metaDescription: 'Get in touch with our team for questions about our TDEE calculator, partnership opportunities, or support.',
      category: 'Company',
      h1: 'Contact Us',
      content: `
        <p>If you have questions about how our calculators work, feedback on our tools, or business inquiries, please reach out.</p>
        <h2>Contact Information</h2>
        <p><strong>Email:</strong> support@tdeecalculator.com</p>
        <p><em>Please note that we cannot provide personal medical or dietary advice. All information is for general educational purposes.</em></p>
      `
    },

    '/editorial-policy/': {
      title: 'Editorial Policy: Research Integrity & Scientific Standards',
      metaDescription: 'Our editorial principles, peer-review standards, and commitment to evidence-based nutrition science.',
      category: 'Trust',
      h1: 'Editorial & Research Policy',
      content: `
        <p>At TDEE Calculator, our content is governed by a strict commitment to scientific accuracy, clinical validity, and objective reporting. We understand that health and nutrition information directly impacts our users' well-being, which is why we hold our editorial process to the highest standards.</p>
        
        <h2>Evidence-Based Guidelines</h2>
        <p>Every article, guide, and calculator formula published on our site is strictly audited against published clinical nutrition research and peer-reviewed studies. We source our data from reputable institutions, including:</p>
        <ul>
          <li>The National Institutes of Health (NIH)</li>
          <li>The American College of Sports Medicine (ACSM)</li>
          <li>The American Journal of Clinical Nutrition</li>
          <li>The Journal of the International Society of Sports Nutrition (JISSN)</li>
        </ul>
        
        <h2>Review and Update Process</h2>
        <p>Nutrition science is constantly evolving. Our editorial team conducts periodic reviews of all core guides (such as our explanations of BMR, TEF, and metabolic adaptation) to ensure they reflect current clinical consensus. When new, validated methodologies emerge, we update our calculators and methodologies accordingly, and transparently log these changes.</p>
        
        <h2>Independence and Objectivity</h2>
        <p>TDEE Calculator maintains strict editorial independence. We do not accept sponsored content that conflicts with our scientific values, nor do we alter our formulas or recommendations to favor commercial partners. Any affiliate links or advertisements are clearly separated from our editorial content and have zero influence over our scientific reporting.</p>
        
        <h2>Error Correction</h2>
        <p>If an error in our content or calculation formulas is identified, we are committed to correcting it immediately. We encourage feedback from registered dietitians, clinical researchers, and our user base. Corrections are implemented swiftly with transparency regarding the update.</p>
      `
    },

    '/how-we-calculate/': {
      title: 'How We Calculate TDEE, BMR & Adaptive Expenditure',
      metaDescription: 'Comprehensive breakdown of our mathematical formulas, activity score algorithms, and adaptive calibration models.',
      category: 'Methodology',
      h1: 'How We Calculate: Scientific Formulas & Methodology',
      content: `
        <p>Transparency is our highest priority. We believe you should understand exactly how your body's energy needs are being calculated. Here is the comprehensive mathematical framework and methodology powering our tools:</p>
        
        <h2>1. The Baseline: Mifflin-St Jeor Equation</h2>
        <p>For users who do not know their body fat percentage, we calculate Basal Metabolic Rate (BMR) using the <strong>Mifflin-St Jeor equation</strong>. Published in 1990, this formula has been repeatedly validated by clinical dietitians as the most accurate predictive equation for modern adults, offering a precision rate within ±10% for the majority of the population.</p>
        <p><em>Men: (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5</em><br>
        <em>Women: (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161</em></p>
        
        <h2>2. Advanced Precision: Katch-McArdle Equation</h2>
        <p>When a user supplies their body fat percentage, our engine automatically switches to the <strong>Katch-McArdle equation</strong>. This formula ignores total body weight and instead calculates resting expenditure directly from Lean Body Mass (LBM). This prevents the calculator from overestimating the calorie needs of individuals with higher body fat, and underestimating the needs of heavily muscled athletes.</p>
        <p><em>BMR = 370 + (21.6 × Lean Body Mass in kg)</em></p>
        
        <h2>3. Activity Multipliers (TDEE)</h2>
        <p>To convert BMR into Total Daily Energy Expenditure (TDEE), we apply standard physical activity level (PAL) multipliers ranging from 1.2 (Sedentary) to 1.9 (Extra Active). For users who utilize our Smart Wizard, we dynamically adjust these multipliers based on reported step counts and workout intensity to generate a custom fractional multiplier (e.g., 1.42).</p>
        
        <h2>4. The Adaptive Calibration Engine</h2>
        <p>Static formulas can only estimate. Our signature <strong>Adaptive Calibration Engine</strong> looks at what actually happens in the real world. By analyzing your daily caloric intake against your daily scale weight over a 14 to 28 day period, we use linear regression to find your true observed TDEE.</p>
        <p>The engine utilizes the established clinical constant that a change in body tissue of 1 kilogram roughly equates to an energy imbalance of 7,700 kilocalories (or 3,500 kcals per pound). By calculating the daily energy delta required to produce your specific rate of weight change, we output a calibrated TDEE that is customized to your unique metabolic rate and NEAT (Non-Exercise Activity Thermogenesis) levels.</p>
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
