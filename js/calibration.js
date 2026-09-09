/**
 * Real-World TDEE Calibration Lab & Adaptive Expenditure Engine.
 * Calibrates static formula TDEE using actual daily calorie intake + weight trends.
 */

window.TDEECalibration = {
  // Pre-filled realistic sample data for instant demo
  SAMPLE_DATA: [
    { day: 1, cals: 2350, weight: 78.5 },
    { day: 2, cals: 2400, weight: 78.6 },
    { day: 3, cals: 2280, weight: 78.4 },
    { day: 4, cals: 2310, weight: 78.3 },
    { day: 5, cals: 2390, weight: 78.5 },
    { day: 6, cals: 2450, weight: 78.2 },
    { day: 7, cals: 2300, weight: 78.3 },
    { day: 8, cals: 2340, weight: 78.2 },
    { day: 9, cals: 2290, weight: 78.1 },
    { day: 10, cals: 2360, weight: 78.2 },
    { day: 11, cals: 2410, weight: 78.0 },
    { day: 12, cals: 2320, weight: 77.9 },
    { day: 13, cals: 2350, weight: 78.0 },
    { day: 14, cals: 2300, weight: 77.8 }
  ],

  /**
   * Main Adaptive Expenditure Calibration Algorithm
   * @param {Array<{day: number, cals: number, weight: number}>} entries
   * @param {number} formulaTdee - Initial formula estimate for comparison
   */
  calibrateExpenditure: function(entries, formulaTdee) {
    if (!entries || entries.length < 7) {
      return {
        error: 'At least 7 days of calorie and weight logs are required for reliable adaptive calibration.'
      };
    }

    // Filter out invalid rows
    var validLogs = entries.filter(function(e) {
      return !isNaN(e.cals) && e.cals > 500 && !isNaN(e.weight) && e.weight > 30;
    });

    if (validLogs.length < 7) {
      return {
        error: 'Please enter valid numbers for at least 7 days.'
      };
    }

    var numDays = validLogs.length;

    // 1. Calculate Average Caloric Intake
    var totalCals = 0;
    validLogs.forEach(function(l) { totalCals += l.cals; });
    var avgDailyCals = Math.round(totalCals / numDays);

    // 2. Weight Trend Analysis: Compare first 3-7 days rolling avg vs last 3-7 days rolling avg
    var windowSize = Math.min(7, Math.floor(numDays / 2));
    
    var startWeights = validLogs.slice(0, windowSize).map(function(l) { return l.weight; });
    var endWeights = validLogs.slice(numDays - windowSize).map(function(l) { return l.weight; });

    var startAvgWeight = startWeights.reduce(function(a, b) { return a + b; }, 0) / windowSize;
    var endAvgWeight = endWeights.reduce(function(a, b) { return a + b; }, 0) / windowSize;

    var totalWeightDeltaKg = endAvgWeight - startAvgWeight;
    
    // Weight change rate per week (kg/week)
    var weeks = numDays / 7;
    var weightChangePerWeekKg = totalWeightDeltaKg / weeks;

    // 3. Convert Weight Change to Energy Imbalance (7,700 kcal per 1 kg body mass)
    var dailyEnergyImbalance = (weightChangePerWeekKg * 7700) / 7;

    // 4. Observed Real-World TDEE = Daily Intake - Imbalance
    var observedTdee = Math.round(avgDailyCals - dailyEnergyImbalance);
    var formulaDifference = observedTdee - (formulaTdee || observedTdee);

    // 5. Confidence Score
    var confidence = 'Low';
    var confidenceReason = '';
    if (numDays >= 14) {
      confidence = 'High';
      confidenceReason = '14+ days of continuous tracking provides strong statistical accuracy.';
    } else if (numDays >= 10) {
      confidence = 'Moderate';
      confidenceReason = '10-13 days provides a reliable initial estimate. Track for 21 days for maximum precision.';
    } else {
      confidence = 'Fair';
      confidenceReason = '7-9 days captured. Keep logging to smooth out temporary water weight fluctuations.';
    }

    return {
      numDaysTracked: numDays,
      avgDailyCals: avgDailyCals,
      startAvgWeight: Math.round(startAvgWeight * 100) / 100,
      endAvgWeight: Math.round(endAvgWeight * 100) / 100,
      totalWeightDeltaKg: Math.round(totalWeightDeltaKg * 100) / 100,
      weightChangePerWeekKg: Math.round(weightChangePerWeekKg * 100) / 100,
      observedTdee: observedTdee,
      formulaTdee: formulaTdee || null,
      formulaDifference: formulaDifference,
      confidence: confidence,
      confidenceReason: confidenceReason
    };
  }
};
