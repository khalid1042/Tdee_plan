/**
 * Core Mathematics & Estimation Engine for TDEE, BMR, Macros, and Scenarios.
 */

window.TDEECalculator = {
  // Activity Level Multipliers
  ACTIVITY_MULTIPLIERS: {
    sedentary: { label: 'Sedentary (office job, little movement)', val: 1.2 },
    lightly_active: { label: 'Lightly Active (1-3 days workout or 6k steps)', val: 1.375 },
    moderately_active: { label: 'Moderately Active (3-5 days workout or 9k steps)', val: 1.55 },
    very_active: { label: 'Very Active (6-7 intense workouts or 12k steps)', val: 1.725 },
    extra_active: { label: 'Extra Active (hard physical job + training)', val: 1.9 }
  },

  /**
   * Primary BMR Calculation
   * Default: Mifflin-St Jeor
   * Optional: Katch-McArdle (if body fat % provided)
   */
  calculateBMR: function(params) {
    var age = parseFloat(params.age) || 28;
    var gender = params.gender || 'male';
    var heightCm = parseFloat(params.heightCm) || 175;
    var weightKg = parseFloat(params.weightKg) || 75;
    var bodyFat = parseFloat(params.bodyFat);

    // Katch-McArdle if body fat percentage is provided and valid
    if (!isNaN(bodyFat) && bodyFat > 3 && bodyFat < 60) {
      var lbmKg = weightKg * (1 - (bodyFat / 100));
      var katchBmr = Math.round(370 + (21.6 * lbmKg));
      return {
        bmr: katchBmr,
        formula: 'Katch-McArdle (Body Fat Based)',
        lbmKg: Math.round(lbmKg * 10) / 10
      };
    }

    // Mifflin-St Jeor Formula
    var mifflinBmr;
    if (gender === 'male') {
      mifflinBmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
    } else {
      mifflinBmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
    }

    return {
      bmr: Math.round(mifflinBmr),
      formula: 'Mifflin-St Jeor',
      lbmKg: null
    };
  },

  /**
   * Harris-Benedict (Revised) for formula comparison mode
   */
  calculateHarrisBenedict: function(params) {
    var age = parseFloat(params.age) || 28;
    var gender = params.gender || 'male';
    var heightCm = parseFloat(params.heightCm) || 175;
    var weightKg = parseFloat(params.weightKg) || 75;

    var bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
    }
    return Math.round(bmr);
  },

  /**
   * Full TDEE Calculation with Confidence Intervals
   */
  calculateTDEE: function(params) {
    var bmrObj = this.calculateBMR(params);
    var bmr = bmrObj.bmr;
    var multKey = params.activityKey || 'moderately_active';
    var multiplier = params.customMultiplier || (this.ACTIVITY_MULTIPLIERS[multKey] ? this.ACTIVITY_MULTIPLIERS[multKey].val : 1.55);

    var tdee = Math.round(bmr * multiplier);

    // Confidence Interval Range (Variance of ± 9%)
    var minRange = Math.round(tdee * 0.91);
    var maxRange = Math.round(tdee * 1.09);

    return {
      bmr: bmr,
      tdee: tdee,
      multiplier: multiplier,
      formulaName: bmrObj.formula,
      lbmKg: bmrObj.lbmKg,
      minRange: minRange,
      maxRange: maxRange,
      weeklyTdee: tdee * 7
    };
  },

  /**
   * Rest Day vs Training Day Caloric Split
   * Keeps weekly caloric expenditure constant while matching workout demands.
   */
  calculateRestTrainingSplit: function(tdee, trainingDaysPerWeek) {
    trainingDaysPerWeek = parseInt(trainingDaysPerWeek) || 4;
    var restDays = 7 - trainingDaysPerWeek;

    // Delta: +200 kcal on training days, spread rest day deficit accordingly
    var surplusPerTrainingDay = 220;
    var trainingDayCals = Math.round(tdee + surplusPerTrainingDay);
    var restDayCals = Math.round(((tdee * 7) - (trainingDayCals * trainingDaysPerWeek)) / Math.max(1, restDays));

    return {
      trainingDayCals: trainingDayCals,
      restDayCals: restDayCals,
      trainingDays: trainingDaysPerWeek,
      restDays: restDays,
      weeklyTotal: (trainingDayCals * trainingDaysPerWeek) + (restDayCals * restDays)
    };
  },

  /**
   * Goal Targets Simulator
   */
  calculateGoals: function(tdee, weightKg) {
    return {
      maintain: {
        calories: tdee,
        paceText: 'Maintain current weight (0.0 kg/week)',
        label: 'Maintenance'
      },
      mildDeficit: {
        calories: Math.round(tdee * 0.85), // -15%
        paceText: 'Slow Fat Loss (-0.25 kg / ~0.5 lb per week)',
        label: 'Mild Deficit (-15%)'
      },
      moderateDeficit: {
        calories: Math.round(tdee * 0.78), // -22%
        paceText: 'Moderate Fat Loss (-0.5 kg / ~1.1 lb per week)',
        label: 'Optimal Fat Loss (-22%)'
      },
      aggressiveDeficit: {
        calories: Math.round(tdee * 0.70), // -30%
        paceText: 'Aggressive Fat Loss (-0.8 kg / ~1.7 lb per week)',
        label: 'Aggressive Deficit (-30%)'
      },
      leanBulk: {
        calories: Math.round(tdee * 1.10), // +10%
        paceText: 'Lean Muscle Gain (+0.2 kg / ~0.4 lb per week)',
        label: 'Lean Surplus (+10%)'
      }
    };
  },

  /**
   * Macro Allocation Logic
   */
  calculateMacros: function(targetCalories, weightKg, presetKey) {
    presetKey = presetKey || 'balanced';
    var proteinGrams, carbGrams, fatGrams;

    if (presetKey === 'high_protein') {
      // 2.2g protein per kg weight
      proteinGrams = Math.round(weightKg * 2.2);
      var proteinCals = proteinGrams * 4;
      var fatCals = targetCalories * 0.25;
      fatGrams = Math.round(fatCals / 9);
      var carbCals = Math.max(0, targetCalories - proteinCals - fatCals);
      carbGrams = Math.round(carbCals / 4);
    } else if (presetKey === 'low_carb') {
      proteinGrams = Math.round(weightKg * 2.0);
      var pCals = proteinGrams * 4;
      fatGrams = Math.round((targetCalories * 0.40) / 9);
      var fCals = fatGrams * 9;
      carbGrams = Math.round(Math.max(0, targetCalories - pCals - fCals) / 4);
    } else if (presetKey === 'keto') {
      carbGrams = 30; // Max 30g carbs
      proteinGrams = Math.round(weightKg * 1.8);
      var nonFatCals = (carbGrams * 4) + (proteinGrams * 4);
      fatGrams = Math.round(Math.max(0, targetCalories - nonFatCals) / 9);
    } else {
      // Balanced: 30% Protein, 40% Carbs, 30% Fat
      proteinGrams = Math.round((targetCalories * 0.30) / 4);
      carbGrams = Math.round((targetCalories * 0.40) / 4);
      fatGrams = Math.round((targetCalories * 0.30) / 9);
    }

    return {
      protein: { grams: proteinGrams, calories: proteinGrams * 4, pct: Math.round(((proteinGrams * 4) / targetCalories) * 100) },
      carbs: { grams: carbGrams, calories: carbGrams * 4, pct: Math.round(((carbGrams * 4) / targetCalories) * 100) },
      fat: { grams: fatGrams, calories: fatGrams * 9, pct: Math.round(((fatGrams * 9) / targetCalories) * 100) },
      totalCalories: targetCalories
    };
  },

  /**
   * Activity Wizard Score Multiplier Calculation
   */
  calculateWizardMultiplier: function(answers) {
    // Base score starts at Sedentary 1.2
    var score = 1.2;

    // Daily Steps / Occupation
    if (answers.steps === 'under_5k') score += 0.05;
    else if (answers.steps === '5k_8k') score += 0.15;
    else if (answers.steps === '8k_12k') score += 0.28;
    else if (answers.steps === 'over_12k') score += 0.42;

    // Workout Frequency
    var freq = parseInt(answers.workoutDays) || 0;
    score += (freq * 0.04);

    // Workout Intensity
    if (answers.intensity === 'high') score += 0.08;

    // Round to 3 decimal places
    var finalMult = Math.min(1.95, Math.max(1.2, Math.round(score * 1000) / 1000));
    return finalMult;
  },

  /**
   * "What If" Activity Scenario Simulator
   */
  simulateStepIncrease: function(currentTdee, extraSteps) {
    // Approx 40 calories burned per 1,000 steps
    extraSteps = parseInt(extraSteps) || 3000;
    var extraBurn = Math.round((extraSteps / 1000) * 40);
    return {
      extraSteps: extraSteps,
      extraBurn: extraBurn,
      newTdee: currentTdee + extraBurn
    };
  }
};
