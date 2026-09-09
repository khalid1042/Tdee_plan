/**
 * "Why Am I Not Losing Weight?" Interactive Diagnostic Engine.
 */

window.TDEEDiagnostic = {
  /**
   * Evaluates user responses to diagnose plateaus and provide targeted fixes.
   */
  diagnosePlateau: function(answers) {
    var issuesFound = [];
    var keyTakeaways = [];

    // 1. Duration Check
    if (answers.duration === 'under_14') {
      issuesFound.push({
        title: 'Insufficient Tracking Time (Water Weight Noise)',
        severity: 'medium',
        explanation: 'Fat loss takes time to register on the scale. Water weight fluctuations from glycogen, sodium, and digestion can easily mask 1–2 kg of true fat loss over a 14-day window.',
        recommendation: 'Continue following your target for at least 3 to 4 full weeks before adjusting calorie targets.'
      });
    }

    // 2. Food Weighing Precision
    if (answers.weighing === 'visual' || answers.weighing === 'cups') {
      issuesFound.push({
        title: 'Calorie Measurement Error (Eyeballing vs Digital Scale)',
        severity: 'high',
        explanation: 'Studies show humans underestimate portion sizes by 20% to 45% when using cups or visual estimation. Tablespoon peanut butter or olive oil can easily contain 50–100 extra uncounted calories.',
        recommendation: 'Use a digital kitchen scale for all solid foods (grams/ounces) and measure cooking oils precisely.'
      });
    }

    // 3. Uncounted Extras (Oils, Sauces, Drinks)
    if (answers.hiddenCals === 'no' || answers.hiddenCals === 'sometimes') {
      issuesFound.push({
        title: 'Untracked Liquid Calories & Cooking Fats',
        severity: 'high',
        explanation: 'Cooking oil (120 kcal/tbsp), salad dressings, coffee creamers, and sauces are the #1 cause of uncounted energy intake.',
        recommendation: 'Log every drop of cooking spray, butter, sauce, condiment, and beverage entering your mouth.'
      });
    }

    // 4. Weekend Intake Discrepancy
    if (answers.weekends === 'untracked' || answers.weekends === 'cheat_days') {
      issuesFound.push({
        title: 'Weekend Calorie Surplus Wiping Deficit',
        severity: 'high',
        explanation: 'A 500 kcal daily deficit Monday through Friday saves 2,500 kcal. However, an untracked Saturday night meal + alcohol can add 2,500–3,500 kcal, wiping out the entire week’s fat loss.',
        recommendation: 'Track weekend meals with the same diligence as weekdays, or utilize a Weekly Calorie Budget strategy.'
      });
    }

    // 5. Unconscious NEAT Reduction
    if (answers.neat === 'dropped') {
      issuesFound.push({
        title: 'Decreased Non-Exercise Activity (NEAT Compensation)',
        severity: 'medium',
        explanation: 'When in a caloric deficit, your body subtly reduces subconscious movement (fidgeting, pacing, posture) to conserve energy.',
        recommendation: 'Set a daily step goal (e.g., 8,000–10,000 steps) to preserve baseline energy expenditure.'
      });
    }

    // 6. Water Retention & Cortisol
    if (answers.soreness === 'yes' || answers.stress === 'high') {
      issuesFound.push({
        title: 'Cortisol & Muscle Repair Inflammation',
        severity: 'low',
        explanation: 'Heavy resistance training causes micro-tears in muscle fibers, causing temporary inflammation and water retention. High stress or elevated cortisol also increases aldosterone, storing water weight.',
        recommendation: 'Prioritize 7-9 hours of sleep, manage stress, and track weekly weight trends rather than daily weigh-ins.'
      });
    }

    if (issuesFound.length === 0) {
      keyTakeaways.push('Your tracking methods appear solid! If your weight has truly stalled for over 4 consecutive weeks, your actual TDEE may be lower than initial static estimates. Consider reducing daily intake by 150-200 calories or increasing daily steps by 2,000.');
    }

    return {
      totalIssues: issuesFound.length,
      issues: issuesFound,
      keyTakeaways: keyTakeaways
    };
  }
};
