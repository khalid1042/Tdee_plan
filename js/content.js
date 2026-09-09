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
      title: 'How to Calculate TDEE: Step-by-Step Guide & Methods',
      metaDescription: 'Learn step-by-step how to calculate your Total Daily Energy Expenditure using Mifflin-St Jeor, body fat multipliers, and real-world calibration.',
      category: 'TDEE Guides',
      readTime: '7 min read',
      h1: 'How to Calculate Your TDEE (Formula & Step-by-Step)',
      content: `
        <p>Calculating your Total Daily Energy Expenditure requires two main steps: determining your Basal Metabolic Rate (BMR) and applying an Activity Factor multiplier.</p>
        
        <h2>Step 1: Calculate Your BMR</h2>
        <p>The standard benchmark for BMR estimation is the <strong>Mifflin-St Jeor Equation</strong>:</p>
        <ul>
          <li><strong>Men:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in yrs) + 5</li>
          <li><strong>Women:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in yrs) - 161</li>
        </ul>

        <h2>Step 2: Apply Your Activity Level Multiplier</h2>
        <p>Multiply your BMR by your corresponding lifestyle activity factor:</p>
        <ul>
          <li><strong>Sedentary (1.20):</strong> Desk job, little to no exercise.</li>
          <li><strong>Lightly Active (1.375):</strong> Light exercise 1–3 days/week or ~6,000 daily steps.</li>
          <li><strong>Moderately Active (1.55):</strong> Moderate workouts 3–5 days/week or ~9,000 daily steps.</li>
          <li><strong>Very Active (1.725):</strong> Heavy workouts 6–7 days/week or ~12,000 daily steps.</li>
          <li><strong>Extra Active (1.90):</strong> Physical job plus daily strenuous training.</li>
        </ul>

        <h2>Step 3: Calibrate with Real-World Data</h2>
        <p>Formula estimates can vary by ±10%. To find your true personal TDEE, track your daily caloric intake and morning scale weight over 14 to 21 days using our <a href="#calibration-lab">Adaptive Calibration Lab</a>.</p>
      `
    },

    '/blog/tdee-vs-bmr/': {
      title: 'TDEE vs BMR: What Is the Difference & Which Should You Use?',
      metaDescription: 'Understand the difference between Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE), and why eating below BMR can harm progress.',
      category: 'Comparisons',
      readTime: '5 min read',
      h1: 'TDEE vs BMR: Key Differences Explained',
      content: `
        <p>While both <strong>BMR</strong> and <strong>TDEE</strong> are key metrics in clinical nutrition, they represent fundamentally different figures.</p>
        
        <h2>Key Differences at a Glance</h2>
        <ul>
          <li><strong>BMR (Basal Metabolic Rate):</strong> The minimum energy your body burns in a state of complete rest to keep organs functioning.</li>
          <li><strong>TDEE (Total Daily Energy Expenditure):</strong> BMR <em>plus</em> all movement, daily tasks, workouts, and food digestion.</li>
        </ul>

        <h2>Why You Should Never Starve Below Your BMR</h2>
        <p>Eating significantly below your BMR causes adaptive thermogenesis (metabolic adaptation). When fuel intake drops below baseline organ requirements, the body downregulates thyroid hormones, decreases non-exercise activity, and breaks down muscle tissue for energy.</p>
        <p>To safely lose fat, base your deficit on your <strong>TDEE</strong>, not your BMR!</p>
      `
    },

    '/blog/tdee-for-weight-loss/': {
      title: 'TDEE for Weight Loss: Setting the Perfect Calorie Deficit',
      metaDescription: 'Learn how to use your TDEE to set a sustainable calorie deficit for fat loss without losing muscle or ruining your metabolism.',
      category: 'Weight Loss',
      readTime: '6 min read',
      h1: 'How to Use TDEE for Sustainable Fat Loss',
      content: `
        <p>To lose body fat, you must create an energy deficit where daily energy intake is less than your TDEE. However, bigger deficits are not always better.</p>
        
        <h2>Selecting Your Caloric Deficit Rate</h2>
        <ul>
          <li><strong>Slow & Steady (-15% TDEE):</strong> Ideal for lean individuals preserving maximum muscle mass. Lose ~0.25 kg/week.</li>
          <li><strong>Moderate Deficit (-20% to -25% TDEE):</strong> The sweet spot for most adults. Combines reliable fat loss with high energy levels. Lose ~0.5 kg/week.</li>
          <li><strong>Aggressive Deficit (-30% TDEE):</strong> Suitable for short periods or individuals with higher body fat percentages.</li>
        </ul>
      `
    },

    // ==========================================
    // CORE CALCULATORS SILO PAGES
    // ==========================================
    '/bmr-calculator/': {
      title: 'BMR Calculator: Calculate Basal Metabolic Rate Accurately',
      metaDescription: 'Calculate your Basal Metabolic Rate (BMR) using Mifflin-St Jeor and Katch-McArdle formulas. Find out your baseline calorie consumption.',
      category: 'Calculator',
      h1: 'BMR Calculator (Basal Metabolic Rate)',
      content: `
        <p>Your <strong>Basal Metabolic Rate (BMR)</strong> is the number of calories your body burns while at complete rest to keep your brain, heart, lungs, and liver functioning.</p>
        <p>Use the main calculator above to get your instant BMR readout alongside your total daily energy burn!</p>
      `
    },

    '/maintenance-calorie-calculator/': {
      title: 'Maintenance Calorie Calculator: Find Your Zero-Gain Intake',
      metaDescription: 'Find your precise maintenance calories based on age, height, weight, activity level, and lean body mass.',
      category: 'Calculator',
      h1: 'Maintenance Calorie Calculator',
      content: `
        <p>Your <strong>maintenance calories</strong> are the exact amount of energy required to maintain your current body weight. Eating at maintenance preserves body composition, energy, and athletic performance.</p>
      `
    },

    '/calorie-deficit-calculator/': {
      title: 'Calorie Deficit Calculator: Target Calories for Fat Loss',
      metaDescription: 'Determine your ideal daily calorie deficit for fat loss. Calculate weight loss timelines and safe caloric targets.',
      category: 'Calculator',
      h1: 'Calorie Deficit Calculator',
      content: `
        <p>Calculate your custom fat-loss targets. Choose between mild (-15%), moderate (-22%), and aggressive (-30%) deficits with automatic weekly calorie budgets.</p>
      `
    },

    '/macro-calculator/': {
      title: 'Macro Calculator: Calculate Protein, Carbs & Fat Targets',
      metaDescription: 'Calculate your macronutrient breakdown for fat loss, muscle gain, or maintenance. Customized protein, carb, and fat distributions.',
      category: 'Calculator',
      h1: 'Macro Calculator (Flexible Macronutrients)',
      content: `
        <p>Macronutrients (Protein, Carbohydrates, and Fats) dictate body composition. Use our macro engine to tailor your nutrition for optimal performance.</p>
      `
    },

    '/calories-burned-calculator/': {
      title: 'Calories Burned Calculator: Daily Energy Expenditure Burn',
      metaDescription: 'Calculate total calories burned per day based on non-exercise movement, daily steps, and workout sessions.',
      category: 'Calculator',
      h1: 'Calories Burned Calculator',
      content: `
        <p>Discover your total daily caloric burn across resting metabolic rate, lifestyle steps, occupation movement, and gym workouts.</p>
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
