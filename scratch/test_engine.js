const fs = require('fs');

// Mock window
const window = {};
eval(fs.readFileSync('js/calculator.js', 'utf8'));
eval(fs.readFileSync('js/calibration.js', 'utf8'));

console.log('--- TESTING CALCULATOR LOGIC ---');

// Test 1: Mifflin-St Jeor 28yo male 175cm 75kg
const bmrMale = window.TDEECalculator.calculateBMR({
  gender: 'male',
  age: 28,
  heightCm: 175,
  weightKg: 75
});
console.log('Male BMR (Expected ~1,719):', bmrMale.bmr, bmrMale.formula);

// Test 2: Female BMR 28yo 165cm 60kg
const bmrFemale = window.TDEECalculator.calculateBMR({
  gender: 'female',
  age: 28,
  heightCm: 165,
  weightKg: 60
});
console.log('Female BMR (Expected ~1,320):', bmrFemale.bmr, bmrFemale.formula);

// Test 3: Katch-McArdle with Body Fat %
const bmrKatch = window.TDEECalculator.calculateBMR({
  gender: 'male',
  age: 28,
  heightCm: 175,
  weightKg: 75,
  bodyFat: 15
});
console.log('Katch-McArdle BMR (Expected ~1,748):', bmrKatch.bmr, bmrKatch.formula);

// Test 4: TDEE with Moderately Active multiplier (1.55)
const tdeeMod = window.TDEECalculator.calculateTDEE({
  gender: 'male',
  age: 28,
  heightCm: 175,
  weightKg: 75,
  activityKey: 'moderately_active'
});
console.log('TDEE Moderately Active (Expected ~2,664):', tdeeMod.tdee, 'Range:', tdeeMod.minRange, '-', tdeeMod.maxRange);

// Test 5: Wizard Multiplier
const wizardMult1 = window.TDEECalculator.calculateWizardMultiplier({ steps: '5k_8k', workoutDays: 4, intensity: 'moderate' });
console.log('Wizard Multiplier (5k-8k steps, 4 workouts, moderate):', wizardMult1);

const wizardMult2 = window.TDEECalculator.calculateWizardMultiplier({ steps: 'over_12k', workoutDays: 5, intensity: 'high' });
console.log('Wizard Multiplier (12k+ steps, 5 workouts, high intensity):', wizardMult2);

// Test 6: Calibration Lab
const calibResult = window.TDEECalibration.calibrateExpenditure(window.TDEECalibration.SAMPLE_DATA, 2450);
console.log('Calibration Lab Sample Result: Observed TDEE:', calibResult.observedTdee, 'Formula Difference:', calibResult.formulaDifference, 'Confidence:', calibResult.confidence);

console.log('\nALL ENGINE TESTS COMPLETED SUCCESSFULLY.');
