/**
 * Extra Calculator Engines & Silo-Page UI Builder.
 * Provides fully interactive standalone calculators for:
 *  - /bmr-calculator/
 *  - /maintenance-calorie-calculator/
 *  - /calorie-deficit-calculator/
 *  - /macro-calculator/
 *  - /calories-burned-calculator/
 * Depends on window.TDEECalculator (js/calculator.js) and is mounted by
 * js/app.js's router after silo content is injected.
 */
window.TDEEExtras = (function() {
  'use strict';

  /* ===================== Calc Engines ===================== */

  function toMetric(inputs, unit) {
    var h = parseFloat(inputs.height) || 175;
    var w = parseFloat(inputs.weight) || 75;
    if (unit === 'imperial') {
      return { heightCm: h * 2.54, weightKg: w * 0.453592 };
    }
    return { heightCm: h, weightKg: w };
  }

  function bmrCalc(inputs, unit) {
    var m = toMetric(inputs, unit);
    var res = window.TDEECalculator.calculateBMR({
      age: inputs.age, gender: inputs.gender,
      heightCm: m.heightCm, weightKg: m.weightKg, bodyFat: inputs.bodyFat
    });
    var harris = window.TDEECalculator.calculateHarrisBenedict({
      age: inputs.age, gender: inputs.gender, heightCm: m.heightCm, weightKg: m.weightKg
    });
    var harrisBmr = (typeof harris === 'object') ? harris.bmr : harris;
    return {
      primary: res.bmr,
      unitLabel: 'kcal/day at complete rest',
      formulaName: res.formula,
      rows: [
        { label: 'Mifflin-St Jeor', value: inputs.bodyFat ? null : (inputs.bodyFat ? 0 : res.bmr), show: !inputs.bodyFat },
        { label: 'Revised Harris-Benedict', value: harrisBmr ? Math.round(harrisBmr) + ' kcal' : null, show: !!harrisBmr },
        { label: 'Katch-McArdle (body-fat based)', value: inputs.bodyFat ? res.bmr + ' kcal (LBM ' + res.lbmKg + ' kg)' : null, show: !!inputs.bodyFat }
      ]
    };
  }

  function maintenanceCalc(inputs, unit) {
    var m = toMetric(inputs, unit);
    var res = window.TDEECalculator.calculateTDEE({
      age: inputs.age, gender: inputs.gender, heightCm: m.heightCm,
      weightKg: m.weightKg, bodyFat: inputs.bodyFat, activityKey: inputs.activity
    });
    var goals = window.TDEECalculator.calculateGoals(res.tdee, m.weightKg);
    return {
      primary: res.tdee,
      unitLabel: 'kcal/day (Maintenance Calories)',
      formulaName: 'Formula: ' + res.formula,
      rows: [
        { label: 'BMR (Resting Baseline Floor)', value: res.bmr.toLocaleString() + ' kcal/day', show: true },
        { label: 'Maintenance Calories (TDEE)', value: res.tdee.toLocaleString() + ' kcal/day', show: true },
        { label: 'Weight-Loss Target (Optimal Deficit -22%)', value: goals.moderateDeficit.calories.toLocaleString() + ' kcal/day (−0.5 kg / ~1.1 lb per week)', show: true },
        { label: 'Weight-Gain Target (Lean Surplus +10%)', value: goals.leanBulk.calories.toLocaleString() + ' kcal/day (+0.2 kg / ~0.4 lb per week)', show: true },
        { label: 'Estimated Range (±9% variance)', value: res.minRange.toLocaleString() + ' – ' + res.maxRange.toLocaleString() + ' kcal/day', show: true }
      ]
    };
  }

  function deficitCalc(inputs, unit) {
    var m = toMetric(inputs, unit);
    var res = window.TDEECalculator.calculateTDEE({
      age: inputs.age, gender: inputs.gender, heightCm: m.heightCm,
      weightKg: m.weightKg, bodyFat: inputs.bodyFat, activityKey: inputs.activity
    });
    var goals = window.TDEECalculator.calculateGoals(res.tdee, m.weightKg);
    var weeklyLoss = { mildDeficit: 0.25, moderateDeficit: 0.5, aggressiveDeficit: 0.8 };
    return {
      primary: goals.moderateDeficit.calories,
      unitLabel: 'kcal/day at moderate deficit',
      formulaName: 'Based on ' + res.formula,
      rows: [
        { label: 'Maintenance (TDEE)', value: res.tdee + ' kcal', show: true },
        { label: 'Mild deficit (−15%) · −0.25 kg/wk', value: goals.mildDeficit.calories + ' kcal', show: true },
        { label: 'Moderate deficit (−22%) · −0.5 kg/wk', value: goals.moderateDeficit.calories + ' kcal', show: true },
        { label: 'Aggressive deficit (−30%) · −0.8 kg/wk', value: goals.aggressiveDeficit.calories + ' kcal', show: true },
        { label: 'Lean surplus (+10%) · +0.2 kg/wk', value: goals.leanBulk.calories + ' kcal', show: true },
        { label: 'Estimated time to lose 5 kg (moderate)', value: Math.round(5 / 0.5 * 10) / 10 + ' weeks', show: true }
      ]
    };
  }

  function macroCalc(inputs, unit) {
    var m = toMetric(inputs, unit);
    var res = window.TDEECalculator.calculateTDEE({
      age: inputs.age, gender: inputs.gender, heightCm: m.heightCm,
      weightKg: m.weightKg, bodyFat: inputs.bodyFat, activityKey: inputs.activity
    });
    var target = Math.round(res.tdee * (parseFloat(inputs.goalPct) || 1));
    var macros = window.TDEECalculator.calculateMacros(target, m.weightKg, inputs.macroPreset);
    return {
      primary: target,
      unitLabel: 'kcal/day target',
      formulaName: res.formula,
      macroCards: [
        { name: 'Protein', grams: macros.protein.grams, cals: macros.protein.grams * 4, pct: macros.protein.pct, cls: 'protein' },
        { name: 'Carbohydrates', grams: macros.carbs.grams, cals: macros.carbs.grams * 4, pct: macros.carbs.pct, cls: 'carbs' },
        { name: 'Fat', grams: macros.fat.grams, cals: macros.fat.grams * 9, pct: macros.fat.pct, cls: 'fat' }
      ]
    };
  }

  function burnedCalc(inputs, unit) {
    var m = toMetric(inputs, unit);
    var res = window.TDEECalculator.calculateTDEE({
      age: inputs.age, gender: inputs.gender, heightCm: m.heightCm,
      weightKg: m.weightKg, bodyFat: inputs.bodyFat, activityKey: inputs.activity
    });
    var steps = parseInt(inputs.steps, 10) || 0;
    var sim = window.TDEECalculator.simulateStepIncrease(res.tdee, steps);
    var workoutMin = parseFloat(inputs.workoutMin) || 0;
    // ~7 kcal/min moderate-intensity training, scaled by body weight (70 kg reference)
    var workoutBurn = Math.round(workoutMin * 7 * (m.weightKg / 70));
    var total = res.tdee + sim.extraBurn + workoutBurn;
    return {
      primary: total,
      unitLabel: 'kcal/day total burn',
      formulaName: res.formula,
      rows: [
        { label: 'Resting burn (BMR)', value: res.bmr + ' kcal', show: true },
        { label: 'Lifestyle & daily activity burn', value: (res.tdee - res.bmr) + ' kcal', show: true },
        { label: steps.toLocaleString() + ' extra steps', value: '+' + sim.extraBurn + ' kcal', show: steps > 0 },
        { label: workoutMin + ' min workout', value: '+' + workoutBurn + ' kcal', show: workoutMin > 0 }
      ]
    };
  }

  function surplusCalc(inputs, unit) {
    var m = toMetric(inputs, unit);
    var res = window.TDEECalculator.calculateTDEE({
      age: inputs.age, gender: inputs.gender, heightCm: m.heightCm,
      weightKg: m.weightKg, bodyFat: inputs.bodyFat, activityKey: inputs.activity
    });
    var goalMult = parseFloat(inputs.goalPct);
    if (isNaN(goalMult)) goalMult = 1.10;
    var primaryCals = Math.round(res.tdee * goalMult);
    var leanBulkCals = Math.round(res.tdee * 1.10);
    var moderateSurplusCals = Math.round(res.tdee * 1.15);
    var aggressiveSurplusCals = Math.round(res.tdee * 1.20);

    var goalNames = {
      '1': 'Maintain weight',
      '1.1': 'Lean Surplus (+10%)',
      '1.10': 'Lean Surplus (+10%)',
      '1.15': 'Moderate Surplus (+15%)',
      '1.2': 'Aggressive Surplus (+20%)',
      '1.20': 'Aggressive Surplus (+20%)'
    };
    var selectedGoalLabel = goalNames[inputs.goalPct] || (goalMult === 1 ? 'Maintain weight' : 'Surplus');

    return {
      primary: primaryCals,
      unitLabel: 'kcal/day (' + selectedGoalLabel + ')',
      formulaName: 'Based on ' + (res.formulaName || 'Mifflin-St Jeor') + ' · ' + selectedGoalLabel,
      rows: [
        { label: 'Maintenance (TDEE)', value: res.tdee + ' kcal', show: true },
        { label: 'Lean Surplus (+10%) · +0.2 kg/wk', value: leanBulkCals + ' kcal', show: true },
        { label: 'Moderate Surplus (+15%) · +0.35 kg/wk', value: moderateSurplusCals + ' kcal', show: true },
        { label: 'Aggressive Surplus (+20%) · +0.5 kg/wk', value: aggressiveSurplusCals + ' kcal', show: true }
      ]
    };
  }

  function muscleCalc(inputs, unit) {
    var m = toMetric(inputs, unit);
    var res = window.TDEECalculator.calculateTDEE({
      age: inputs.age, gender: inputs.gender, heightCm: m.heightCm,
      weightKg: m.weightKg, bodyFat: inputs.bodyFat, activityKey: inputs.activity
    });
    
    var exp = inputs.experience || 'intermediate';
    var surplusAdd = (exp === 'beginner') ? 350 : (exp === 'advanced' ? 200 : 275);
    var bulkingTarget = res.tdee + surplusAdd;
    
    var proteinGrams = Math.round(m.weightKg * 2.2);
    var fatGrams = Math.round((bulkingTarget * 0.25) / 9);
    var carbGrams = Math.round((bulkingTarget - (proteinGrams * 4) - (fatGrams * 9)) / 4);

    var expTitle = (exp === 'beginner') ? 'Beginner (1st Year)' : (exp === 'advanced' ? 'Advanced (4+ Years)' : 'Intermediate (2-3 Years)');

    var muscleGainRate = (exp === 'beginner') 
      ? '1.5 – 2.0 lbs (0.7–0.9 kg) / month' 
      : (exp === 'advanced') 
      ? '0.25 – 0.5 lbs (0.1–0.2 kg) / month' 
      : '0.75 – 1.0 lb (0.35–0.45 kg) / month';

    return {
      primary: bulkingTarget,
      unitLabel: 'kcal/day for Lean Muscle Hypertrophy',
      formulaName: 'Based on ' + res.formula + ' + ' + surplusAdd + ' kcal Surplus',
      macroCards: [
        { name: 'Protein (MPS Optimization)', grams: proteinGrams, cals: proteinGrams * 4, pct: Math.round((proteinGrams * 4 / bulkingTarget) * 100), cls: 'protein' },
        { name: 'Carbohydrates (Glycogen & Power)', grams: carbGrams, cals: carbGrams * 4, pct: Math.round((carbGrams * 4 / bulkingTarget) * 100), cls: 'carbs' },
        { name: 'Healthy Fats (Anabolic Support)', grams: fatGrams, cals: fatGrams * 9, pct: Math.round((fatGrams * 9 / bulkingTarget) * 100), cls: 'fat' }
      ],
      rows: [
        { label: 'Maintenance Energy Expenditure (TDEE)', value: res.tdee + ' kcal/day', show: true },
        { label: 'Hypertrophy Calorie Surplus (' + expTitle + ')', value: '+' + surplusAdd + ' kcal/day', show: true },
        { label: 'Daily Muscle Synthesis Protein Floor (2.2g/kg)', value: proteinGrams + 'g protein/day', show: true },
        { label: 'Estimated Monthly Lean Muscle Potential', value: muscleGainRate, show: true },
        { label: 'Recommended Monthly Weight Cap', value: '+' + Math.round((surplusAdd * 30 / 3500) * 10) / 10 + ' lbs / month', show: true }
      ]
    };
  }

  var ENGINES = {
    bmr: bmrCalc,
    maintenance: maintenanceCalc,
    deficit: deficitCalc,
    surplus: surplusCalc,
    muscle: muscleCalc,
    macro: macroCalc,
    burned: burnedCalc
  };

  /* ===================== Shared UI Builder ===================== */

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function(c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function buildForm(container, calcKey) {
    var isBmr = calcKey === 'bmr';
    var isMacro = calcKey === 'macro';
    var isBurned = calcKey === 'burned';
    var isMuscle = calcKey === 'muscle';

    container.innerHTML =
      '<div class="glass-card extras-calc">' +
        '<div class="card-header">' +
          '<h3 class="card-title"><span class="card-title-icon">🏋️‍♂️</span> ' + (isMuscle ? 'Muscle Building & Hypertrophy Calculator' : 'Calculator') + '</h3>' +
          '<div class="segmented-control" style="width:140px;">' +
            '<button type="button" class="segmented-btn active" data-unit="metric">Metric</button>' +
            '<button type="button" class="segmented-btn" data-unit="imperial">Imperial</button>' +
          '</div>' +
        '</div>' +
        '<div class="extras-form-grid">' +
          '<div class="form-group">' +
            '<label class="form-label" id="lbl-sex">Sex</label>' +
            '<div class="segmented-control" role="group" aria-labelledby="lbl-sex">' +
              '<button type="button" class="segmented-btn active" data-gender="male" aria-label="Male">Male</button>' +
              '<button type="button" class="segmented-btn" data-gender="female" aria-label="Female">Female</button>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ex-input-age">Age <span class="label-hint">years</span></label>' +
            '<input type="number" id="ex-input-age" class="input-field ex-age" value="28" min="15" max="90" inputmode="decimal" aria-label="Age in years">' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ex-input-height">Height <span class="label-hint ex-hunit">cm</span></label>' +
            '<input type="number" id="ex-input-height" class="input-field ex-height" value="175" min="50" max="260" inputmode="decimal" aria-label="Height">' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="ex-input-weight">Weight <span class="label-hint ex-wunit">kg</span></label>' +
            '<input type="number" id="ex-input-weight" class="input-field ex-weight" value="75" min="30" max="300" inputmode="decimal" aria-label="Weight">' +
          '</div>' +
          (isMuscle
            ? '<div class="form-group">' +
                '<label class="form-label" for="ex-select-experience">Lifting Experience</label>' +
                '<select id="ex-select-experience" class="select-field ex-experience" aria-label="Lifting Experience Level">' +
                  '<option value="beginner">Beginner (1st Year Lifting)</option>' +
                  '<option value="intermediate" selected>Intermediate (2-3 Years Lifting)</option>' +
                  '<option value="advanced">Advanced (4+ Years Lifting)</option>' +
                '</select>' +
              '</div>'
            : '') +
          (isBmr
            ? '<div class="form-group">' +
                '<label class="form-label" for="ex-input-bodyfat">Body Fat % <span class="label-hint">(Optional — Katch-McArdle)</span></label>' +
                '<input type="number" id="ex-input-bodyfat" class="input-field ex-bodyfat" placeholder="e.g. 18" min="3" max="60" inputmode="decimal" aria-label="Body Fat Percentage">' +
              '</div>'
            : '') +
          (!isBmr
            ? '<div class="form-group">' +
                '<label class="form-label" for="ex-select-activity">Activity Level</label>' +
                '<select id="ex-select-activity" class="select-field ex-activity" aria-label="Activity Level">' +
                  '<option value="sedentary">Sedentary (desk job, little exercise)</option>' +
                  '<option value="lightly_active">Lightly Active (1-3 workouts/wk)</option>' +
                  '<option value="moderately_active" selected>Moderately Active (3-5 workouts/wk)</option>' +
                  '<option value="very_active">Very Active (6-7 intense workouts)</option>' +
                  '<option value="extra_active">Extra Active (physical job + training)</option>' +
                '</select>' +
              '</div>'
            : '') +
          (isMacro || calcKey === 'maintenance' || calcKey === 'deficit' || calcKey === 'surplus'
            ? '<div class="form-group">' +
                '<label class="form-label" for="ex-select-goal">Goal</label>' +
                '<select id="ex-select-goal" class="select-field ex-goal" aria-label="Fitness Goal">' +
                  (calcKey === 'surplus'
                    ? '<option value="1">Maintain weight</option>' +
                      '<option value="1.10" selected>Lean Surplus (+10%)</option>' +
                      '<option value="1.15">Moderate Surplus (+15%)</option>' +
                      '<option value="1.20">Aggressive Surplus (+20%)</option>'
                    : calcKey === 'deficit'
                    ? '<option value="1">Maintain weight</option>' +
                      '<option value="0.85">Slow fat loss (−15%)</option>' +
                      '<option value="0.78" selected>Optimal fat loss (−22%)</option>' +
                      '<option value="0.70">Aggressive fat loss (−30%)</option>'
                    : '<option value="1" selected>Maintain weight</option>' +
                      '<option value="0.85">Slow fat loss (−15%)</option>' +
                      '<option value="0.78">Optimal fat loss (−22%)</option>' +
                      '<option value="0.70">Aggressive fat loss (−30%)</option>' +
                      '<option value="1.10">Lean bulk (+10%)</option>') +
                '</select>' +
              '</div>'
            : '') +
          (isMacro
            ? '<div class="form-group">' +
                '<label class="form-label" for="ex-select-preset">Macro Preset</label>' +
                '<select id="ex-select-preset" class="select-field ex-preset" aria-label="Macronutrient Preset">' +
                  '<option value="balanced" selected>Balanced (30/40/30)</option>' +
                  '<option value="high_protein">High Protein (2.2 g/kg)</option>' +
                  '<option value="low_carb">Low Carb</option>' +
                  '<option value="keto">Keto</option>' +
                '</select>' +
              '</div>'
            : '') +
          (isBurned
            ? '<div class="form-group">' +
                '<label class="form-label" for="ex-input-steps">Daily Steps</label>' +
                '<input type="number" id="ex-input-steps" class="input-field ex-steps" value="8000" step="500" min="0" inputmode="decimal" aria-label="Daily Steps">' +
              '</div>' +
              '<div class="form-group">' +
                '<label class="form-label" for="ex-input-workout">Workout Duration <span class="label-hint">min/day</span></label>' +
                '<input type="number" id="ex-input-workout" class="input-field ex-workout" value="45" step="5" min="0" inputmode="decimal" aria-label="Workout Duration">' +
              '</div>'
            : '') +
        '</div>' +
        '<div style="margin: 1.25rem 0 1rem;">' +
          '<button type="button" class="btn-primary ex-calc-btn" style="width:100%; padding: 0.85rem 1.5rem; font-size: 1.05rem; font-weight: 700; border-radius: 8px; cursor: pointer; background: var(--accent-rose); color: #fff; border: none; transition: transform 0.15s ease, background 0.15s ease;">' +
            (calcKey === 'surplus' ? 'Calculate My Weight Gain Calories' :
             calcKey === 'muscle' ? 'Calculate My Muscle Bulking Calories' :
             calcKey === 'deficit' ? 'Calculate My Calorie Deficit' :
             calcKey === 'bmr' ? 'Calculate My BMR' :
             calcKey === 'maintenance' ? 'Calculate My Maintenance Calories' :
             calcKey === 'macro' ? 'Calculate My Macros' :
             calcKey === 'burned' ? 'Calculate Calories Burned' : 'Calculate My Daily Calories') +
          '</button>' +
        '</div>' +
        '<div class="extras-result">' +
          '<div class="ex-result-label">' + (isMuscle ? 'Your Target Muscle Building Energy Intake' : 'Your Estimated Daily Calorie Needs') + '</div>' +
          '<div class="ex-result-value">—</div>' +
          '<div class="ex-result-formula"></div>' +
        '</div>' +
        '<div class="extras-breakdown"></div>' +
        '<div class="calculator-disclaimer" style="margin-top: 1.5rem; padding: 1rem; background: var(--bg-tertiary); border-left: 4px solid var(--accent-cyan); border-radius: 8px; font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">' +
          '<strong>Medical Disclaimer:</strong> This output is an estimate based on clinical energy expenditure formulas and does not constitute medical advice. Standard formulas cannot account for unique metabolic adaptation or non-exercise activity thermogenesis (NEAT) variations.' +
          '<br><br>' +
          '<a href="/how-we-calculate/" style="color: var(--accent-cyan); font-weight: 600; text-decoration: none;" data-link>View our complete mathematical methodology &rarr;</a>' +
        '</div>' +
      '</div>';

    var root = container.querySelector('.extras-calc');

    /* --- segmented toggles --- */
    root.querySelectorAll('[data-unit]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        root.querySelectorAll('[data-unit]').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var imperial = btn.getAttribute('data-unit') === 'imperial';
        root.querySelector('.ex-hunit').textContent = imperial ? 'in' : 'cm';
        root.querySelector('.ex-wunit').textContent = imperial ? 'lb' : 'kg';
        var hIn = root.querySelector('.ex-height');
        var wIn = root.querySelector('.ex-weight');
        if (imperial) {
          hIn.value = Math.round((parseFloat(hIn.value) || 175) / 2.54);
          wIn.value = Math.round((parseFloat(wIn.value) || 75) / 0.453592);
        } else {
          hIn.value = Math.round((parseFloat(hIn.value) || 69) * 2.54);
          wIn.value = Math.round((parseFloat(wIn.value) || 165) * 0.453592);
        }
        recalc();
      });
    });

    root.querySelectorAll('[data-gender]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        root.querySelectorAll('[data-gender]').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        recalc();
      });
    });

    root.querySelectorAll('.input-field, .select-field').forEach(function(el) {
      el.addEventListener('input', recalc);
      el.addEventListener('change', recalc);
    });

    var calcBtn = root.querySelector('.ex-calc-btn');
    if (calcBtn) {
      calcBtn.addEventListener('click', function() {
        recalc();
        var resEl = root.querySelector('.extras-result');
        if (resEl) resEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }

    function readInputs() {
      var inputs = {
        gender: root.querySelector('[data-gender].active').getAttribute('data-gender'),
        age: root.querySelector('.ex-age').value,
        height: root.querySelector('.ex-height').value,
        weight: root.querySelector('.ex-weight').value,
        activity: (root.querySelector('.ex-activity') || {}).value,
        bodyFat: (root.querySelector('.ex-bodyfat') || {}).value,
        goalPct: (root.querySelector('.ex-goal') || {}).value,
        macroPreset: (root.querySelector('.ex-preset') || {}).value,
        steps: (root.querySelector('.ex-steps') || {}).value,
        workoutMin: (root.querySelector('.ex-workout') || {}).value,
        experience: (root.querySelector('.ex-experience') || {}).value
      };
      var imperial = root.querySelector('[data-unit].active').getAttribute('data-unit') === 'imperial';
      inputs.imperial = imperial;
      return inputs;
    }

    function recalc() {
      var inputs = readInputs();
      var unit = inputs.imperial ? 'imperial' : 'metric';
      var result;
      try {
        result = ENGINES[calcKey](inputs, unit);
      } catch (err) {
        return;
      }
      root.querySelector('.ex-result-value').textContent =
        (typeof result.primary === 'number' ? result.primary.toLocaleString() : result.primary) +
        (result.unitLabel ? ' ' + result.unitLabel.split(' ')[0] : '');
      root.querySelector('.ex-result-formula').textContent = result.formulaName || '';

      // Breakdown rows
      var bd = root.querySelector('.extras-breakdown');
      var html = '';
      if (result.macroCards) {
        html += '<div class="macro-grid extras-macro-grid" style="margin-bottom:1.5rem;">' + result.macroCards.map(function(mc) {
          return '<div class="macro-card ' + mc.cls + '">' +
            '<div class="macro-grams">' + mc.grams + 'g</div>' +
            '<div class="macro-cals">' + esc(mc.name) + ' · ' + mc.cals.toLocaleString() + ' kcal (' + mc.pct + '%)</div>' +
          '</div>';
        }).join('') + '</div>';
      }
      if (result.rows && result.rows.length > 0) {
        html += result.rows.filter(function(r) { return r.show && r.value !== null && r.value !== undefined; })
          .map(function(r) {
            return '<div class="ex-row"><span class="ex-row-label">' + esc(r.label) + '</span>' +
                   '<span class="ex-row-value">' + esc(r.value) + '</span></div>';
          }).join('');
      }
      bd.innerHTML = html;
    }

    recalc();
  }

  /* ===================== Adaptive Calibration Lab Builder ===================== */
  function buildCalibrationLab(container) {
    var sampleData = (window.TDEECalibration && window.TDEECalibration.SAMPLE_DATA) || [
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
    ];

    container.innerHTML =
      '<div class="glass-card extras-calc" style="border-color: rgba(168, 85, 247, 0.35);">' +
        '<div class="card-header" style="flex-wrap: wrap; gap: 0.75rem;">' +
          '<div>' +
            '<span class="hero-badge" style="background: rgba(168,85,247,0.15); color: var(--accent-purple); border-color: rgba(168,85,247,0.3);">🔬 Signature Differentiator</span>' +
            '<h3 class="card-title" style="margin-top: 0.5rem;"><span class="card-title-icon">📊</span> Adaptive TDEE Calibration Lab</h3>' +
            '<p style="font-size: 0.9rem; color: var(--text-muted); margin: 0.25rem 0 0;">' +
              'Log daily calories and morning weight to calibrate your actual observed expenditure and eliminate hydration noise.' +
            '</p>' +
          '</div>' +
        '</div>' +
        '<div class="water-weight-explainer" style="margin: 1rem 0; padding: 0.85rem 1rem; background: var(--bg-tertiary); border-radius: 8px; border-left: 4px solid var(--accent-purple); font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">' +
          '💡 <strong>Why 14–28 Day Rolling Averages Defeat Water Weight:</strong> Daily scale fluctuations of 1–4 lbs are driven by water binding to muscle glycogen (~3–4g water per gram of carb), sodium shifts, and intestinal food mass. Comparing the rolling average of your first 7 days against your concluding 7 days neutralizes high-frequency hydration swings.' +
        '</div>' +
        '<div style="display:flex; gap:0.75rem; margin-bottom:1rem; flex-wrap:wrap; align-items:center;">' +
          '<button type="button" class="btn-primary cl-sample-btn" style="width:auto; padding: 0.55rem 1.25rem; font-size: 0.9rem; background: linear-gradient(135deg, var(--accent-purple), var(--accent-indigo)); border: none; cursor: pointer;">⚡ Fill 14-Day Sample Data (Instant Demo)</button>' +
          '<button type="button" class="btn-secondary cl-run-btn" style="width:auto; padding: 0.55rem 1.25rem; font-size: 0.9rem; font-weight: 700; cursor: pointer;">Calculate Adaptive TDEE</button>' +
          '<button type="button" class="btn-secondary cl-add-btn" style="width:auto; padding: 0.55rem 1rem; font-size: 0.9rem; cursor: pointer;">+ Add Day</button>' +
          '<button type="button" class="btn-secondary cl-clear-btn" style="width:auto; padding: 0.55rem 1rem; font-size: 0.9rem; color: var(--accent-rose); border-color: rgba(244,63,94,0.3); cursor: pointer;">Clear Data</button>' +
        '</div>' +
        '<div style="font-size: 0.8rem; color: var(--text-dim); margin-bottom: 1rem;">' +
          '🔒 <strong>Client-Side Local Privacy:</strong> All weight and calorie computations run locally in your browser. No personal health records are sent to any external server.' +
        '</div>' +
        '<div class="tracker-table-wrapper" style="max-height: 380px; overflow-y: auto;">' +
          '<table class="tracker-table" style="width: 100%;">' +
            '<thead>' +
              '<tr>' +
                '<th style="width: 20%;">Day</th>' +
                '<th style="width: 45%;">Daily Calories Eaten (kcal)</th>' +
                '<th style="width: 35%;">Morning Weight (kg)</th>' +
              '</tr>' +
            '</thead>' +
            '<tbody class="cl-table-body"></tbody>' +
          '</table>' +
        '</div>' +
        '<div class="cl-result-card calibration-result-card" style="margin-top: 1.25rem;">' +
          '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;">' +
            '<div>' +
              '<div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">Observed Real-World TDEE</div>' +
              '<div class="cl-observed-tdee" style="font-size:2rem; font-weight:900; color:var(--accent-purple);">2,545 kcal/day</div>' +
              '<div class="cl-formula-delta" style="font-size:0.85rem; font-weight:600; color:var(--accent-cyan); margin-top:0.25rem;">+95 kcal vs Formula Baseline</div>' +
            '</div>' +
            '<div>' +
              '<div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">Average Daily Intake</div>' +
              '<div class="cl-avg-cals" style="font-size:1.35rem; font-weight:700; color:#fff;">2,350 kcal/day</div>' +
              '<div style="font-size:0.8rem; color:var(--text-muted);">Logged across 14 days</div>' +
            '</div>' +
            '<div>' +
              '<div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">True Weight Trend Rate</div>' +
              '<div class="cl-weight-delta" style="font-size:1.35rem; font-weight:700; color:var(--accent-emerald);">-0.22 kg/week</div>' +
              '<div class="cl-confidence-badge" style="display:inline-block; margin-top:0.35rem; padding:0.2rem 0.5rem; background:rgba(16,185,129,0.15); color:var(--accent-emerald); border-radius:4px; font-size:0.75rem; font-weight:700;">High Confidence (14 Days)</div>' +
            '</div>' +
          '</div>' +
          '<div class="cl-summary-text" style="margin-top: 1rem; padding-top: 0.85rem; border-top: 1px solid var(--border-color); font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">' +
            'Analysis: Days 1–7 weight average was 78.46 kg; Days 8–14 average was 78.03 kg (-0.43 kg change). Caloric deficit: -242 kcal/day. Observed maintenance expenditure: <strong>2,545 kcal/day</strong>.' +
          '</div>' +
        '</div>' +
      '</div>';

    var tbody = container.querySelector('.cl-table-body');
    var currentEntries = JSON.parse(JSON.stringify(sampleData));

    function renderRows() {
      tbody.innerHTML = currentEntries.map(function(item, idx) {
        return '<tr>' +
          '<td style="font-weight:700; color:var(--accent-purple);">Day ' + (idx + 1) + '</td>' +
          '<td><input type="number" class="input-field cl-row-cals" data-idx="' + idx + '" value="' + (item.cals || '') + '" placeholder="e.g. 2350" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td>' +
          '<td><input type="number" step="0.1" class="input-field cl-row-weight" data-idx="' + idx + '" value="' + (item.weight || '') + '" placeholder="e.g. 78.5" style="padding:0.4rem 0.6rem; font-size:0.9rem;"></td>' +
        '</tr>';
      }).join('');

      tbody.querySelectorAll('.cl-row-cals').forEach(function(inp) {
        inp.addEventListener('input', function() {
          var idx = parseInt(inp.getAttribute('data-idx'), 10);
          currentEntries[idx].cals = parseFloat(inp.value) || 0;
          recalc();
        });
      });

      tbody.querySelectorAll('.cl-row-weight').forEach(function(inp) {
        inp.addEventListener('input', function() {
          var idx = parseInt(inp.getAttribute('data-idx'), 10);
          currentEntries[idx].weight = parseFloat(inp.value) || 0;
          recalc();
        });
      });
    }

    function recalc() {
      if (!window.TDEECalibration || !window.TDEECalibration.calibrateExpenditure) return;
      var res = window.TDEECalibration.calibrateExpenditure(currentEntries, 2450);
      var resCard = container.querySelector('.cl-result-card');
      if (res.error) {
        container.querySelector('.cl-summary-text').innerHTML = '<span style="color:var(--accent-rose);">' + res.error + '</span>';
        return;
      }
      container.querySelector('.cl-observed-tdee').textContent = res.observedTdee.toLocaleString() + ' kcal/day';
      var deltaPrefix = res.formulaDifference >= 0 ? '+' : '';
      container.querySelector('.cl-formula-delta').textContent = deltaPrefix + res.formulaDifference + ' kcal vs 2,450 kcal Baseline';
      container.querySelector('.cl-avg-cals').textContent = res.avgDailyCals.toLocaleString() + ' kcal/day';
      var weightPrefix = res.weightChangePerWeekKg >= 0 ? '+' : '';
      container.querySelector('.cl-weight-delta').textContent = weightPrefix + res.weightChangePerWeekKg + ' kg/week';
      container.querySelector('.cl-confidence-badge').textContent = res.confidence + ' Confidence (' + res.numDaysTracked + ' Days)';
      container.querySelector('.cl-summary-text').innerHTML =
        'Analysis: Days 1–' + Math.min(7, Math.floor(res.numDaysTracked / 2)) + ' average weight was ' + res.startAvgWeight + ' kg; concluding average was ' + res.endAvgWeight + ' kg (' + (res.totalWeightDeltaKg >= 0 ? '+' : '') + res.totalWeightDeltaKg + ' kg net delta). Energy imbalance: ' + Math.round((res.weightChangePerWeekKg * 7700) / 7) + ' kcal/day. Observed maintenance expenditure: <strong>' + res.observedTdee.toLocaleString() + ' kcal/day</strong>.';
    }

    renderRows();
    recalc();

    container.querySelector('.cl-sample-btn').addEventListener('click', function() {
      currentEntries = JSON.parse(JSON.stringify(sampleData));
      renderRows();
      recalc();
    });

    container.querySelector('.cl-add-btn').addEventListener('click', function() {
      var lastDay = currentEntries.length > 0 ? currentEntries[currentEntries.length - 1] : { day: 0, cals: 2300, weight: 77.8 };
      currentEntries.push({ day: currentEntries.length + 1, cals: lastDay.cals || 2300, weight: lastDay.weight || 77.8 });
      renderRows();
      recalc();
    });

    container.querySelector('.cl-clear-btn').addEventListener('click', function() {
      currentEntries = [
        { day: 1, cals: 0, weight: 0 },
        { day: 2, cals: 0, weight: 0 },
        { day: 3, cals: 0, weight: 0 },
        { day: 4, cals: 0, weight: 0 },
        { day: 5, cals: 0, weight: 0 },
        { day: 6, cals: 0, weight: 0 },
        { day: 7, cals: 0, weight: 0 }
      ];
      renderRows();
      recalc();
    });

    container.querySelector('.cl-run-btn').addEventListener('click', function() {
      recalc();
      var card = container.querySelector('.cl-result-card');
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  /* ===================== Lifter's Movement Questionnaire Builder ===================== */
  function buildQuestionnaireWizard(container) {
    container.innerHTML =
      '<div class="glass-card extras-calc" style="border-color: rgba(6, 182, 212, 0.35);">' +
        '<div class="card-header" style="flex-wrap: wrap; gap: 0.75rem;">' +
          '<div>' +
            '<span class="hero-badge" style="background: rgba(6,182,212,0.15); color: var(--accent-cyan); border-color: rgba(6,182,212,0.3);">⚡ Accurate Multiplier Finder</span>' +
            '<h3 class="card-title" style="margin-top: 0.5rem;"><span class="card-title-icon">🧭</span> 60-Second Movement Questionnaire for Lifters</h3>' +
            '<p style="font-size: 0.9rem; color: var(--text-muted); margin: 0.25rem 0 0;">' +
              'Isolate your occupational NEAT steps from your gym workout frequency to calculate your true Physical Activity Level (PAL).' +
            '</p>' +
          '</div>' +
        '</div>' +

        '<div class="quiz-step" style="margin-top: 1.25rem;">' +
          '<h4 style="font-size: 1.05rem; margin-bottom: 0.35rem; color: var(--accent-cyan);">Step 1: Daily Occupational Movement (NEAT Baseline)</h4>' +
          '<p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">How many steps do you take during a typical workday outside of structured gym exercise?</p>' +
          '<div class="options-grid" style="grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 0.75rem;">' +
            '<div class="option-card wizard-option qw-opt" data-group="steps" data-val="under_5k">' +
              '<div class="option-title">Under 5,000 steps</div>' +
              '<div class="option-desc">Desk job, remote work, driving, mostly seated.</div>' +
            '</div>' +
            '<div class="option-card wizard-option qw-opt selected" data-group="steps" data-val="5k_8k">' +
              '<div class="option-title">5,000 – 8,000 steps</div>' +
              '<div class="option-desc">Office worker with daily errands, light commuting, or lunch walk.</div>' +
            '</div>' +
            '<div class="option-card wizard-option qw-opt" data-group="steps" data-val="8k_12k">' +
              '<div class="option-title">8,000 – 12,000 steps</div>' +
              '<div class="option-desc">Active job: retail, teacher, hospitality, sales floor.</div>' +
            '</div>' +
            '<div class="option-card wizard-option qw-opt" data-group="steps" data-val="over_12k">' +
              '<div class="option-title">12,000+ steps</div>' +
              '<div class="option-desc">Physically demanding: nurse, construction, warehouse, trades.</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="quiz-step" style="margin-top: 1.5rem;">' +
          '<h4 style="font-size: 1.05rem; margin-bottom: 0.35rem; color: var(--accent-cyan);">Step 2: Structured Workout &amp; Lifting Frequency</h4>' +
          '<p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">How many days per week do you perform dedicated resistance or barbell training?</p>' +
          '<div class="options-grid" style="grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 0.75rem;">' +
            '<div class="option-card wizard-option qw-opt" data-group="workoutDays" data-val="0">' +
              '<div class="option-title">0 – 1 days / week</div>' +
              '<div class="option-desc">Little to no dedicated gym or strength sessions.</div>' +
            '</div>' +
            '<div class="option-card wizard-option qw-opt" data-group="workoutDays" data-val="2">' +
              '<div class="option-title">2 – 3 days / week</div>' +
              '<div class="option-desc">Consistent light-to-moderate training or full-body lifting.</div>' +
            '</div>' +
            '<div class="option-card wizard-option qw-opt selected" data-group="workoutDays" data-val="4">' +
              '<div class="option-title">4 – 5 days / week</div>' +
              '<div class="option-desc">Dedicated upper/lower split, PPL, or strength program.</div>' +
            '</div>' +
            '<div class="option-card wizard-option qw-opt" data-group="workoutDays" data-val="6">' +
              '<div class="option-title">6 – 7 days / week</div>' +
              '<div class="option-desc">High-frequency athletic training or two-a-days.</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="quiz-step" style="margin-top: 1.5rem;">' +
          '<h4 style="font-size: 1.05rem; margin-bottom: 0.35rem; color: var(--accent-cyan);">Step 3: Training Intensity &amp; Session Demands</h4>' +
          '<p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">What is the typical intensity of your workout sessions?</p>' +
          '<div class="options-grid" style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 0.75rem;">' +
            '<div class="option-card wizard-option qw-opt selected" data-group="intensity" data-val="moderate">' +
              '<div class="option-title">Moderate Intensity</div>' +
              '<div class="option-desc">Standard hypertrophy sets, 2–3 min rests, steady cardio.</div>' +
            '</div>' +
            '<div class="option-card wizard-option qw-opt" data-group="intensity" data-val="high">' +
              '<div class="option-title">High / Vigorous Intensity</div>' +
              '<div class="option-desc">Heavy compound powerlifting, CrossFit, sprints, HIIT circuits.</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="qw-result-box" style="margin-top: 1.5rem; padding: 1.25rem; background: rgba(6, 182, 212, 0.08); border: 1px solid var(--accent-cyan); border-radius: 12px;">' +
          '<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">' +
            '<div>' +
              '<div style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em;">Calculated Lifter Multiplier (PAL)</div>' +
              '<div class="qw-display-mult" style="font-size: 2.2rem; font-weight: 900; color: var(--accent-cyan);">1.510</div>' +
              '<div class="qw-display-summary" style="font-size: 0.9rem; color: var(--text-primary); font-weight: 600; margin-top: 0.25rem;">Moderately Active equivalent</div>' +
            '</div>' +
            '<div class="qw-shield-box" style="text-align: right; max-width: 320px;">' +
              '<div style="font-size: 0.8rem; text-transform: uppercase; color: var(--accent-emerald); font-weight: 700;">🛡️ Overestimation Avoided</div>' +
              '<div class="qw-shield-diff" style="font-size: 1.35rem; font-weight: 800; color: var(--accent-emerald);">385 kcal / day</div>' +
              '<div style="font-size: 0.78rem; color: var(--text-muted);">Saved vs picking "Very Active" (1.725) by mistake</div>' +
            '</div>' +
          '</div>' +
          '<div class="qw-formula-breakdown" style="margin-top: 1rem; padding-top: 0.85rem; border-top: 1px solid rgba(6,182,212,0.25); font-size: 0.85rem; color: var(--text-muted);">' +
            'Additive Model: Base (1.200) + Steps (+0.150) + Workouts (+0.160) + Intensity (+0.000) = <strong>1.510</strong>' +
          '</div>' +
        '</div>' +

        '<div style="margin-top: 1.5rem; padding: 1.25rem; background: var(--bg-tertiary); border-radius: 10px; border: 1px solid var(--border-color);">' +
          '<h4 style="margin: 0 0 0.75rem; font-size: 1rem; color: #fff;">Apply Multiplier to Your Body Metrics:</h4>' +
          '<div class="extras-form-grid" style="margin-bottom: 0.75rem;">' +
            '<div class="form-group">' +
              '<label class="form-label">Sex</label>' +
              '<div class="segmented-control" role="group">' +
                '<button type="button" class="segmented-btn active qw-gender" data-gender="male">Male</button>' +
                '<button type="button" class="segmented-btn qw-gender" data-gender="female">Female</button>' +
              '</div>' +
            '</div>' +
            '<div class="form-group">' +
              '<label class="form-label">Age <span class="label-hint">years</span></label>' +
              '<input type="number" class="input-field qw-input-age" value="28" min="15" max="90">' +
            '</div>' +
            '<div class="form-group">' +
              '<label class="form-label">Height <span class="label-hint">cm</span></label>' +
              '<input type="number" class="input-field qw-input-height" value="180" min="100" max="240">' +
            '</div>' +
            '<div class="form-group">' +
              '<label class="form-label">Weight <span class="label-hint">kg</span></label>' +
              '<input type="number" class="input-field qw-input-weight" value="80" min="30" max="250">' +
            '</div>' +
          '</div>' +
          '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; margin-top: 0.75rem;">' +
            '<div style="padding: 0.75rem; background: var(--bg-primary); border-radius: 6px; border: 1px solid var(--border-color);">' +
              '<div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Resting Floor (BMR)</div>' +
              '<div class="qw-out-bmr" style="font-size: 1.25rem; font-weight: 800; color: #fff;">1,790 kcal</div>' +
            '</div>' +
            '<div style="padding: 0.75rem; background: var(--bg-primary); border-radius: 6px; border: 1px solid var(--border-color);">' +
              '<div style="font-size: 0.75rem; color: var(--accent-cyan); text-transform: uppercase;">Your Calibrated TDEE</div>' +
              '<div class="qw-out-tdee" style="font-size: 1.25rem; font-weight: 800; color: var(--accent-cyan);">2,703 kcal</div>' +
            '</div>' +
            '<div style="padding: 0.75rem; background: var(--bg-primary); border-radius: 6px; border: 1px solid var(--border-color);">' +
              '<div style="font-size: 0.75rem; color: var(--accent-rose); text-transform: uppercase;">Flawed "Very Active" Guess</div>' +
              '<div class="qw-out-flawed" style="font-size: 1.25rem; font-weight: 800; color: var(--accent-rose);">3,088 kcal</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    var wizardAnswers = { steps: '5k_8k', workoutDays: '4', intensity: 'moderate' };

    function getSelected(group) {
      var sel = container.querySelector('.qw-opt.selected[data-group="' + group + '"]');
      return sel ? sel.getAttribute('data-val') : '';
    }

    container.querySelectorAll('.qw-opt').forEach(function(opt) {
      opt.addEventListener('click', function() {
        var group = opt.getAttribute('data-group');
        container.querySelectorAll('.qw-opt[data-group="' + group + '"]').forEach(function(o) {
          o.classList.remove('selected');
        });
        opt.classList.add('selected');
        recalc();
      });
    });

    container.querySelectorAll('.qw-gender').forEach(function(btn) {
      btn.addEventListener('click', function() {
        container.querySelectorAll('.qw-gender').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        recalc();
      });
    });

    container.querySelectorAll('.qw-input-age, .qw-input-height, .qw-input-weight').forEach(function(inp) {
      inp.addEventListener('input', recalc);
    });

    function recalc() {
      wizardAnswers.steps = getSelected('steps') || '5k_8k';
      wizardAnswers.workoutDays = getSelected('workoutDays') || '4';
      wizardAnswers.intensity = getSelected('intensity') || 'moderate';

      var mult = 1.200;
      var stepBonus = 0.15;
      if (wizardAnswers.steps === 'under_5k') stepBonus = 0.05;
      else if (wizardAnswers.steps === '5k_8k') stepBonus = 0.15;
      else if (wizardAnswers.steps === '8k_12k') stepBonus = 0.28;
      else if (wizardAnswers.steps === 'over_12k') stepBonus = 0.42;

      var freqBonus = (parseInt(wizardAnswers.workoutDays, 10) || 0) * 0.04;
      var intBonus = wizardAnswers.intensity === 'high' ? 0.08 : 0.00;

      mult = Math.round((1.200 + stepBonus + freqBonus + intBonus) * 1000) / 1000;
      mult = Math.min(1.95, Math.max(1.20, mult));

      container.querySelector('.qw-display-mult').textContent = mult.toFixed(3);

      var summaryText = 'Lightly Active baseline';
      if (mult < 1.35) summaryText = 'Sedentary to Lightly Active baseline';
      else if (mult < 1.55) summaryText = 'Moderately Active baseline';
      else if (mult < 1.70) summaryText = 'Active / High-Frequency baseline';
      else summaryText = 'Very Active / Demanding baseline';
      container.querySelector('.qw-display-summary').textContent = summaryText;

      container.querySelector('.qw-formula-breakdown').innerHTML =
        'Additive Model: Base (1.200) + Steps (+' + stepBonus.toFixed(3) + ') + Workouts (+' + freqBonus.toFixed(3) + ') + Intensity (+' + intBonus.toFixed(3) + ') = <strong>' + mult.toFixed(3) + '</strong>';

      // Body Metrics Application
      var genderBtn = container.querySelector('.qw-gender.active');
      var isMale = genderBtn ? genderBtn.getAttribute('data-gender') === 'male' : true;
      var age = parseFloat(container.querySelector('.qw-input-age').value) || 28;
      var hCm = parseFloat(container.querySelector('.qw-input-height').value) || 180;
      var wKg = parseFloat(container.querySelector('.qw-input-weight').value) || 80;

      var bmr = Math.round((10 * wKg) + (6.25 * hCm) - (5 * age) + (isMale ? 5 : -161));
      var calibTdee = Math.round(bmr * mult);
      var flawedTdee = Math.round(bmr * 1.725);
      var avoidedError = flawedTdee - calibTdee;

      container.querySelector('.qw-out-bmr').textContent = bmr.toLocaleString() + ' kcal';
      container.querySelector('.qw-out-tdee').textContent = calibTdee.toLocaleString() + ' kcal';
      container.querySelector('.qw-out-flawed').textContent = flawedTdee.toLocaleString() + ' kcal';

      var shieldEl = container.querySelector('.qw-shield-diff');
      if (avoidedError > 0) {
        shieldEl.textContent = avoidedError.toLocaleString() + ' kcal / day';
        shieldEl.style.color = 'var(--accent-emerald)';
      } else {
        shieldEl.textContent = 'Accurate Baseline';
        shieldEl.style.color = 'var(--accent-cyan)';
      }
    }

    recalc();
  }

  /* ===================== Rest & Training Day Macro Calculator Builder ===================== */
  function buildRestTrainingSplit(container) {
    container.innerHTML =
      '<div class="glass-card extras-calc" style="border-color: rgba(16, 185, 129, 0.35);">' +
        '<div class="card-header" style="flex-wrap: wrap; gap: 0.75rem;">' +
          '<div>' +
            '<span class="hero-badge" style="background: rgba(16,185,129,0.15); color: var(--accent-emerald); border-color: rgba(16,185,129,0.3);">⚡ Calorie &amp; Macro Cycling</span>' +
            '<h3 class="card-title" style="margin-top: 0.5rem;"><span class="card-title-icon">⚖️</span> TDEE Calculator With Rest &amp; Training Day Macros</h3>' +
            '<p style="font-size: 0.9rem; color: var(--text-muted); margin: 0.25rem 0 0;">' +
              'Split your calories and carbs between workout days and rest days while matching your exact weekly calorie target.' +
            '</p>' +
          '</div>' +
          '<div class="segmented-control" style="width:140px;">' +
            '<button type="button" class="segmented-btn active rts-unit" data-unit="metric">Metric</button>' +
            '<button type="button" class="segmented-btn rts-unit" data-unit="imperial">Imperial</button>' +
          '</div>' +
        '</div>' +

        '<div class="extras-form-grid">' +
          '<div class="form-group">' +
            '<label class="form-label">Sex</label>' +
            '<div class="segmented-control" role="group">' +
              '<button type="button" class="segmented-btn active rts-gender" data-gender="male">Male</button>' +
              '<button type="button" class="segmented-btn rts-gender" data-gender="female">Female</button>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="rts-age">Age <span class="label-hint">years</span></label>' +
            '<input type="number" id="rts-age" class="input-field rts-input-age" value="28" min="15" max="90">' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="rts-height">Height <span class="label-hint rts-hunit">cm</span></label>' +
            '<input type="number" id="rts-height" class="input-field rts-input-height" value="180" min="50" max="260">' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="rts-weight">Weight <span class="label-hint rts-wunit">kg</span></label>' +
            '<input type="number" id="rts-weight" class="input-field rts-input-weight" value="80" min="30" max="300">' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="rts-activity">Activity Baseline</label>' +
            '<select id="rts-activity" class="select-field rts-select-activity">' +
              '<option value="sedentary">Sedentary (desk job, low steps)</option>' +
              '<option value="lightly_active">Lightly Active (1-3 workouts/wk)</option>' +
              '<option value="moderately_active" selected>Moderately Active (3-5 workouts/wk)</option>' +
              '<option value="very_active">Very Active (6-7 intense sessions)</option>' +
            '</select>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label" for="rts-days">Training Schedule</label>' +
            '<select id="rts-days" class="select-field rts-select-days">' +
              '<option value="3">3 Training Days (4 Rest Days)</option>' +
              '<option value="4" selected>4 Training Days (3 Rest Days)</option>' +
              '<option value="5">5 Training Days (2 Rest Days)</option>' +
              '<option value="6">6 Training Days (1 Rest Day)</option>' +
            '</select>' +
          '</div>' +
          '<div class="form-group" style="grid-column: 1 / -1;">' +
            '<label class="form-label" for="rts-goal">Fitness Target / Goal</label>' +
            '<select id="rts-goal" class="select-field rts-select-goal">' +
              '<option value="1" selected>Maintain Weight (TDEE Baseline)</option>' +
              '<option value="0.85">Slow Fat Loss (-15% Weekly Deficit)</option>' +
              '<option value="0.78">Optimal Fat Loss (-22% Weekly Deficit)</option>' +
              '<option value="0.70">Aggressive Fat Loss (-30% Weekly Deficit)</option>' +
              '<option value="1.10">Lean Muscle Surplus (+10% Weekly Surplus)</option>' +
            '</select>' +
          '</div>' +
        '</div>' +

        '<div style="margin: 1rem 0;">' +
          '<button type="button" class="btn-primary rts-calc-btn" style="width:100%; padding: 0.85rem; font-size: 1.05rem; font-weight: 700; background: var(--accent-emerald); color: #fff; border: none; border-radius: 8px; cursor: pointer;">Calculate My Training &amp; Rest Day Macros</button>' +
        '</div>' +

        '<div class="rts-results" style="margin-top: 1.5rem;">' +
          '<div style="padding: 1rem; background: var(--bg-tertiary); border-radius: 8px; border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">' +
            '<div>' +
              '<div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Average Daily Target</div>' +
              '<div class="rts-avg-target" style="font-size: 1.6rem; font-weight: 900; color: #fff;">2,500 kcal/day</div>' +
            '</div>' +
            '<div>' +
              '<div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Weekly Energy Budget (TDEE &times; 7)</div>' +
              '<div class="rts-weekly-budget" style="font-size: 1.4rem; font-weight: 800; color: var(--accent-cyan);">17,500 kcal/week</div>' +
            '</div>' +
          '</div>' +

          '<div class="split-card" style="margin-top: 1.25rem;">' +
            '<div class="split-box training" style="border-left: 4px solid var(--accent-emerald);">' +
              '<div class="split-title" style="color: var(--accent-emerald); font-weight: 700;">🏋️‍♂️ Training Days (<span class="rts-disp-tdays">4</span>x/week)</div>' +
              '<div class="rts-train-cals split-val" style="color: var(--accent-emerald); font-size: 1.85rem; margin: 0.35rem 0;">2,720 kcal</div>' +
              '<div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.75rem;">+220 kcal workout fuel &amp; glycogen load</div>' +
              '<div class="macro-grid" style="grid-template-columns: 1fr; gap: 0.5rem;">' +
                '<div class="macro-card protein" style="padding: 0.6rem 0.75rem;">' +
                  '<div class="rts-train-protein" style="font-size: 1.1rem; font-weight: 800;">176g</div>' +
                  '<div style="font-size: 0.75rem; color: var(--text-muted);">Protein (2.2g/kg · 26%)</div>' +
                '</div>' +
                '<div class="macro-card carbs" style="padding: 0.6rem 0.75rem;">' +
                  '<div class="rts-train-carbs" style="font-size: 1.1rem; font-weight: 800;">352g</div>' +
                  '<div style="font-size: 0.75rem; color: var(--text-muted);">Carbohydrates (High Fuel · 52%)</div>' +
                '</div>' +
                '<div class="macro-card fat" style="padding: 0.6rem 0.75rem;">' +
                  '<div class="rts-train-fat" style="font-size: 1.1rem; font-weight: 800;">68g</div>' +
                  '<div style="font-size: 0.75rem; color: var(--text-muted);">Healthy Fats (Moderate · 22%)</div>' +
                '</div>' +
              '</div>' +
            '</div>' +

            '<div class="split-box rest" style="border-left: 4px solid var(--accent-amber);">' +
              '<div class="split-title" style="color: var(--accent-amber); font-weight: 700;">🛋️ Rest Days (<span class="rts-disp-rdays">3</span>x/week)</div>' +
              '<div class="rts-rest-cals split-val" style="color: var(--accent-amber); font-size: 1.85rem; margin: 0.35rem 0;">2,207 kcal</div>' +
              '<div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.75rem;">Balanced deficit for cellular repair &amp; fat burn</div>' +
              '<div class="macro-grid" style="grid-template-columns: 1fr; gap: 0.5rem;">' +
                '<div class="macro-card protein" style="padding: 0.6rem 0.75rem;">' +
                  '<div class="rts-rest-protein" style="font-size: 1.1rem; font-weight: 800;">176g</div>' +
                  '<div style="font-size: 0.75rem; color: var(--text-muted);">Protein (Identical 2.2g/kg · 32%)</div>' +
                '</div>' +
                '<div class="macro-card carbs" style="padding: 0.6rem 0.75rem;">' +
                  '<div class="rts-rest-carbs" style="font-size: 1.1rem; font-weight: 800;">188g</div>' +
                  '<div style="font-size: 0.75rem; color: var(--text-muted);">Carbohydrates (Lower Insulin · 34%)</div>' +
                '</div>' +
                '<div class="macro-card fat" style="padding: 0.6rem 0.75rem;">' +
                  '<div class="rts-rest-fat" style="font-size: 1.1rem; font-weight: 800;">83g</div>' +
                  '<div style="font-size: 0.75rem; color: var(--text-muted);">Healthy Fats (Elevated · 34%)</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="rts-budget-check" style="margin-top: 1.25rem; padding: 0.85rem 1rem; background: var(--bg-tertiary); border-radius: 8px; border-left: 4px solid var(--accent-emerald); font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">' +
            '✅ <strong>Weekly Conservation Check:</strong> (<span class="rts-check-tcount">4</span> &times; <span class="rts-check-tcals">2,720</span> kcal) + (<span class="rts-check-rcount">3</span> &times; <span class="rts-check-rcals">2,207</span> kcal) = <strong>17,501 kcal/week</strong>. Your weekly target is strictly maintained.' +
          '</div>' +
        '</div>' +
      '</div>';

    var unitBtns = container.querySelectorAll('.rts-unit');
    unitBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        unitBtns.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var imperial = btn.getAttribute('data-unit') === 'imperial';
        container.querySelector('.rts-hunit').textContent = imperial ? 'in' : 'cm';
        container.querySelector('.rts-wunit').textContent = imperial ? 'lb' : 'kg';
        var hInp = container.querySelector('.rts-input-height');
        var wInp = container.querySelector('.rts-input-weight');
        if (imperial) {
          hInp.value = Math.round((parseFloat(hInp.value) || 180) / 2.54);
          wInp.value = Math.round((parseFloat(wInp.value) || 80) / 0.453592);
        } else {
          hInp.value = Math.round((parseFloat(hInp.value) || 71) * 2.54);
          wInp.value = Math.round((parseFloat(wInp.value) || 176) * 0.453592);
        }
        recalc();
      });
    });

    var genderBtns = container.querySelectorAll('.rts-gender');
    genderBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        genderBtns.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        recalc();
      });
    });

    container.querySelectorAll('.rts-input-age, .rts-input-height, .rts-input-weight, .rts-select-activity, .rts-select-days, .rts-select-goal').forEach(function(el) {
      el.addEventListener('input', recalc);
      el.addEventListener('change', recalc);
    });

    var calcBtn = container.querySelector('.rts-calc-btn');
    if (calcBtn) {
      calcBtn.addEventListener('click', function() {
        recalc();
        var resEl = container.querySelector('.rts-results');
        if (resEl) resEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }

    function recalc() {
      var imperial = container.querySelector('.rts-unit.active').getAttribute('data-unit') === 'imperial';
      var isMale = container.querySelector('.rts-gender.active').getAttribute('data-gender') === 'male';
      var age = parseFloat(container.querySelector('.rts-input-age').value) || 28;
      var rawH = parseFloat(container.querySelector('.rts-input-height').value) || (imperial ? 71 : 180);
      var rawW = parseFloat(container.querySelector('.rts-input-weight').value) || (imperial ? 176 : 80);
      var activity = container.querySelector('.rts-select-activity').value || 'moderately_active';
      var tDays = parseInt(container.querySelector('.rts-select-days').value, 10) || 4;
      var goalPct = parseFloat(container.querySelector('.rts-select-goal').value) || 1.0;

      var hCm = imperial ? rawH * 2.54 : rawH;
      var wKg = imperial ? rawW * 0.453592 : rawW;

      var res = window.TDEECalculator.calculateTDEE({
        age: age, gender: isMale ? 'male' : 'female',
        heightCm: hCm, weightKg: wKg, activityKey: activity
      });

      var avgTarget = Math.round(res.tdee * goalPct);
      var weeklyBudget = avgTarget * 7;
      var rDays = 7 - tDays;

      var surplusPerTrainingDay = 220;
      var trainCals = Math.round(avgTarget + surplusPerTrainingDay);
      var restCals = Math.round((weeklyBudget - (trainCals * tDays)) / Math.max(1, rDays));

      // Constant Protein Target: 2.2 g/kg body weight
      var proteinGrams = Math.round(wKg * 2.2);
      var proteinCals = proteinGrams * 4;

      // Training Day: High Carb (~52%), Remainder Fat
      var trainCarbCals = Math.round(trainCals * 0.52);
      var trainCarbGrams = Math.round(trainCarbCals / 4);
      var trainFatCals = Math.max(0, trainCals - proteinCals - trainCarbCals);
      var trainFatGrams = Math.round(trainFatCals / 9);

      // Rest Day: Lower Carb (~34%), Higher Healthy Fat (~34%)
      var restCarbCals = Math.round(restCals * 0.34);
      var restCarbGrams = Math.round(restCarbCals / 4);
      var restFatCals = Math.max(0, restCals - proteinCals - restCarbCals);
      var restFatGrams = Math.round(restFatCals / 9);

      container.querySelector('.rts-avg-target').textContent = avgTarget.toLocaleString() + ' kcal/day';
      container.querySelector('.rts-weekly-budget').textContent = weeklyBudget.toLocaleString() + ' kcal/week';

      container.querySelector('.rts-disp-tdays').textContent = tDays;
      container.querySelector('.rts-disp-rdays').textContent = rDays;

      container.querySelector('.rts-train-cals').textContent = trainCals.toLocaleString() + ' kcal';
      container.querySelector('.rts-train-protein').textContent = proteinGrams + 'g';
      container.querySelector('.rts-train-carbs').textContent = trainCarbGrams + 'g';
      container.querySelector('.rts-train-fat').textContent = trainFatGrams + 'g';

      container.querySelector('.rts-rest-cals').textContent = restCals.toLocaleString() + ' kcal';
      container.querySelector('.rts-rest-protein').textContent = proteinGrams + 'g';
      container.querySelector('.rts-rest-carbs').textContent = restCarbGrams + 'g';
      container.querySelector('.rts-rest-fat').textContent = restFatGrams + 'g';

      container.querySelector('.rts-check-tcount').textContent = tDays;
      container.querySelector('.rts-check-tcals').textContent = trainCals.toLocaleString();
      container.querySelector('.rts-check-rcount').textContent = rDays;
      container.querySelector('.rts-check-rcals').textContent = restCals.toLocaleString();
    }

    recalc();
  }

  /* Mount points: router calls TDEEExtras.mount(path, container) */
  var ROUTE_MAP = {
    '/bmr-calculator/': 'bmr',
    '/maintenance-calorie-calculator/': 'maintenance',
    '/calorie-deficit-calculator/': 'deficit',
    '/calorie-surplus-calculator/': 'surplus',
    '/macro-calculator/': 'macro',
    '/calories-burned-calculator/': 'burned',
    '/tdee-for-weight-gain/': 'surplus',
    '/tdee-for-muscle-building/': 'muscle',
    '/blog/tdee-for-weight-loss/': 'deficit',
    '/blog/what-is-tdee/': 'maintenance',
    '/blog/how-to-calculate-tdee/': 'maintenance',
    '/blog/tdee-vs-bmr/': 'bmr',
    '/blog/mifflin-st-jeor-equation/': 'bmr',
    '/calibrate-tdee-weight-trends/': 'calibration_lab',
    '/accurate-activity-factor-questionnaire/': 'questionnaire_wizard',
    '/tdee-calculator-rest-training-day-macros/': 'rest_training_split',
    '/how-to-calibrate-tdee-with-weight-trends/': 'calibration_lab',
    '/activity-factor-questionnaire-for-lifting/': 'questionnaire_wizard',
    '/tdee-calculator-with-rest-and-training-day-macros/': 'rest_training_split'
  };

  function mount(path, container) {
    if (!path || !container) return false;
    var normPath = path;
    if (!normPath.startsWith('/')) normPath = '/' + normPath;
    if (!normPath.endsWith('/')) normPath = normPath + '/';
    
    var calcKey = ROUTE_MAP[normPath] || ROUTE_MAP[path];
    if (!calcKey) {
      for (var k in ROUTE_MAP) {
        if (normPath.endsWith(k) || k.endsWith(normPath)) {
          calcKey = ROUTE_MAP[k];
          break;
        }
      }
    }
    if (!calcKey) return false;

    if (calcKey === 'calibration_lab') {
      buildCalibrationLab(container);
      return true;
    }
    if (calcKey === 'questionnaire_wizard') {
      buildQuestionnaireWizard(container);
      return true;
    }
    if (calcKey === 'rest_training_split') {
      buildRestTrainingSplit(container);
      return true;
    }

    buildForm(container, calcKey);
    return true;
  }

  return { mount: mount, engines: ENGINES };
})();
