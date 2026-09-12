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
    return {
      primary: res.tdee,
      unitLabel: 'kcal/day to maintain weight',
      formulaName: res.formula,
      rows: [
        { label: 'BMR (resting burn)', value: res.bmr + ' kcal', show: true },
        { label: 'Activity multiplier applied', value: '×' + res.multiplier, show: true },
        { label: 'Likely real-world range', value: res.minRange + ' – ' + res.maxRange + ' kcal', show: true }
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
    var leanBulkCals = Math.round(res.tdee * 1.10);
    var moderateSurplusCals = Math.round(res.tdee * 1.15);
    var aggressiveSurplusCals = Math.round(res.tdee * 1.20);
    return {
      primary: leanBulkCals,
      unitLabel: 'kcal/day target for lean muscle gain',
      formulaName: 'Based on ' + res.formula,
      rows: [
        { label: 'Maintenance (TDEE)', value: res.tdee + ' kcal', show: true },
        { label: 'Lean Surplus (+10%) · +0.2 kg/wk', value: leanBulkCals + ' kcal', show: true },
        { label: 'Moderate Surplus (+15%) · +0.35 kg/wk', value: moderateSurplusCals + ' kcal', show: true },
        { label: 'Aggressive Surplus (+20%) · +0.5 kg/wk', value: aggressiveSurplusCals + ' kcal', show: true }
      ]
    };
  }

  var ENGINES = {
    bmr: bmrCalc,
    maintenance: maintenanceCalc,
    deficit: deficitCalc,
    surplus: surplusCalc,
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

    container.innerHTML =
      '<div class="glass-card extras-calc">' +
        '<div class="card-header">' +
          '<h3 class="card-title"><span class="card-title-icon">🧮</span> Calculator</h3>' +
          '<div class="segmented-control" style="width:140px;">' +
            '<button type="button" class="segmented-btn active" data-unit="metric">Metric</button>' +
            '<button type="button" class="segmented-btn" data-unit="imperial">Imperial</button>' +
          '</div>' +
        '</div>' +
        '<div class="extras-form-grid">' +
          '<div class="form-group">' +
            '<label class="form-label">Sex</label>' +
            '<div class="segmented-control">' +
              '<button type="button" class="segmented-btn active" data-gender="male">Male</button>' +
              '<button type="button" class="segmented-btn" data-gender="female">Female</button>' +
            '</div>' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label">Age <span class="label-hint">years</span></label>' +
            '<input type="number" class="input-field ex-age" value="28" min="15" max="90">' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label">Height <span class="label-hint ex-hunit">cm</span></label>' +
            '<input type="number" class="input-field ex-height" value="175" min="50" max="260">' +
          '</div>' +
          '<div class="form-group">' +
            '<label class="form-label">Weight <span class="label-hint ex-wunit">kg</span></label>' +
            '<input type="number" class="input-field ex-weight" value="75" min="30" max="300">' +
          '</div>' +
          (isBmr
            ? '<div class="form-group">' +
                '<label class="form-label">Body Fat % <span class="label-hint">(Optional — Katch-McArdle)</span></label>' +
                '<input type="number" class="input-field ex-bodyfat" placeholder="e.g. 18" min="3" max="60">' +
              '</div>'
            : '') +
          (!isBmr
            ? '<div class="form-group">' +
                '<label class="form-label">Activity Level</label>' +
                '<select class="select-field ex-activity">' +
                  '<option value="sedentary">Sedentary (desk job, little exercise)</option>' +
                  '<option value="lightly_active">Lightly Active (1-3 workouts/wk)</option>' +
                  '<option value="moderately_active" selected>Moderately Active (3-5 workouts/wk)</option>' +
                  '<option value="very_active">Very Active (6-7 intense workouts)</option>' +
                  '<option value="extra_active">Extra Active (physical job + training)</option>' +
                '</select>' +
              '</div>'
            : '') +
          (isMacro
            ? '<div class="form-group">' +
                '<label class="form-label">Goal</label>' +
                '<select class="select-field ex-goal">' +
                  '<option value="1">Maintain weight</option>' +
                  '<option value="0.85">Slow fat loss (−15%)</option>' +
                  '<option value="0.78">Optimal fat loss (−22%)</option>' +
                  '<option value="1.10">Lean bulk (+10%)</option>' +
                '</select>' +
              '</div>' +
              '<div class="form-group">' +
                '<label class="form-label">Macro Preset</label>' +
                '<select class="select-field ex-preset">' +
                  '<option value="balanced" selected>Balanced (30/40/30)</option>' +
                  '<option value="high_protein">High Protein (2.2 g/kg)</option>' +
                  '<option value="low_carb">Low Carb</option>' +
                  '<option value="keto">Keto</option>' +
                '</select>' +
              '</div>'
            : '') +
          (isBurned
            ? '<div class="form-group">' +
                '<label class="form-label">Daily Steps</label>' +
                '<input type="number" class="input-field ex-steps" value="8000" step="500" min="0">' +
              '</div>' +
              '<div class="form-group">' +
                '<label class="form-label">Workout Duration <span class="label-hint">min/day</span></label>' +
                '<input type="number" class="input-field ex-workout" value="45" step="5" min="0">' +
              '</div>'
            : '') +
        '</div>' +
        '<div class="extras-result">' +
          '<div class="ex-result-label">Your Result</div>' +
          '<div class="ex-result-value">—</div>' +
          '<div class="ex-result-formula"></div>' +
        '</div>' +
        '<div class="extras-breakdown"></div>' +
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
        workoutMin: (root.querySelector('.ex-workout') || {}).value
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
      if (result.macroCards) {
        bd.innerHTML = '<div class="macro-grid extras-macro-grid">' + result.macroCards.map(function(mc) {
          return '<div class="macro-card ' + mc.cls + '">' +
            '<div class="macro-grams">' + mc.grams + 'g</div>' +
            '<div class="macro-cals">' + esc(mc.name) + ' · ' + mc.cals.toLocaleString() + ' kcal (' + mc.pct + '%)</div>' +
          '</div>';
        }).join('') + '</div>';
      } else {
        bd.innerHTML = result.rows.filter(function(r) { return r.show && r.value !== null && r.value !== undefined; })
          .map(function(r) {
            return '<div class="ex-row"><span class="ex-row-label">' + esc(r.label) + '</span>' +
                   '<span class="ex-row-value">' + esc(r.value) + '</span></div>';
          }).join('');
      }
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
    '/calories-burned-calculator/': 'burned'
  };

  function mount(path, container) {
    var calcKey = ROUTE_MAP[path];
    if (!calcKey || !container) return false;
    buildForm(container, calcKey);
    return true;
  }

  return { mount: mount, engines: ENGINES };
})();
