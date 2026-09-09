/**
 * Main Application Orchestrator, UI Event Listeners, State Management & SPA Router.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Global State
  var state = {
    unit: 'metric', // 'metric' or 'imperial'
    gender: 'male',
    age: 28,
    heightCm: 175,
    weightKg: 75,
    bodyFat: '',
    activityKey: 'moderately_active',
    customMultiplier: null,
    trainingDays: 4,
    activeGoal: 'maintain',
    macroPreset: 'balanced',
    currentRoute: '/',
    calibrationEntries: []
  };

  // DOM Elements
  var unitBtnMetric = document.getElementById('unit-metric');
  var unitBtnImperial = document.getElementById('unit-imperial');
  var genderBtnMale = document.getElementById('gender-male');
  var genderBtnFemale = document.getElementById('gender-female');

  var inputAge = document.getElementById('input-age');
  var inputHeight = document.getElementById('input-height');
  var inputWeight = document.getElementById('input-weight');
  var inputBodyFat = document.getElementById('input-bodyfat');
  var selectActivity = document.getElementById('select-activity');

  var heightUnitLabel = document.getElementById('height-unit-label');
  var weightUnitLabel = document.getElementById('weight-unit-label');

  // Outputs
  var displayTdee = document.getElementById('display-tdee');
  var displayBmr = document.getElementById('display-bmr');
  var displayFormula = document.getElementById('display-formula');
  var displayMinRange = document.getElementById('display-min-range');
  var displayMaxRange = document.getElementById('display-max-range');

  var targetCalNum = document.getElementById('target-cal-num');
  var targetPaceText = document.getElementById('target-pace-text');

  var valTrainingCals = document.getElementById('val-training-cals');
  var valRestCals = document.getElementById('val-rest-cals');

  var gramProtein = document.getElementById('gram-protein');
  var gramCarbs = document.getElementById('gram-carbs');
  var gramFat = document.getElementById('gram-fat');

  var inputExtraSteps = document.getElementById('input-extra-steps');
  var displaySimExtraBurn = document.getElementById('display-sim-extra-burn');
  var displaySimNewTdee = document.getElementById('display-sim-new-tdee');

  // Router Elements
  var heroWorkspace = document.getElementById('hero-workspace');
  var siloContainer = document.getElementById('silo-container');
  var siloCategory = document.getElementById('silo-category');
  var siloTitle = document.getElementById('silo-title');
  var siloBody = document.getElementById('silo-body');

  /* ==========================================================================
     1. ROUTING & NAVIGATION SYSTEM
     ========================================================================== */
  function navigateTo(path) {
    state.currentRoute = path;
    window.history.pushState({}, '', path);
    renderRoute(path);
  }

  function renderRoute(path) {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    var routeData = window.TDEEContent.routes[path];

    if (path === '/' || !routeData) {
      // Show Homepage Calculator Workspace
      heroWorkspace.classList.remove('hidden');
      siloContainer.classList.add('hidden');
      document.title = 'TDEE Calculator — Total Daily Energy Expenditure & Adaptive Calibrator';
    } else {
      // Show Silo Content Article
      heroWorkspace.classList.add('hidden');
      siloContainer.classList.remove('hidden');

      siloCategory.textContent = routeData.category || 'Guide';
      siloTitle.textContent = routeData.h1 || routeData.title;
      siloBody.innerHTML = routeData.content;
      document.title = routeData.title;

      // Update meta description
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', routeData.metaDescription || '');

      // Mount interactive calculator on silo pages that have one
      var calcMount = document.getElementById('silo-calculator-mount');
      if (calcMount && window.TDEEExtras) {
        window.TDEEExtras.mount(path, calcMount);
      }
    }
  }

  // Intercept click on internal links for smooth SPA navigation
  document.addEventListener('click', function(e) {
    var target = e.target.closest('a');
    if (target && target.getAttribute('href') && target.getAttribute('href').startsWith('/')) {
      e.preventDefault();
      var href = target.getAttribute('href');
      navigateTo(href);
    }
  });

  window.addEventListener('popstate', function() {
    renderRoute(window.location.pathname);
  });

  // Exposed for deep-link rendering in environments where pushState is blocked (file://)
  window.TDEERenderRoute = renderRoute;

  /* ==========================================================================
     2. CORE RECALCULATION & UI UPDATE
     ========================================================================== */
  function updateCalculation() {
    // Read Inputs
    state.age = parseFloat(inputAge.value) || 28;

    var heightVal = parseFloat(inputHeight.value) || 175;
    var weightVal = parseFloat(inputWeight.value) || 75;

    // Unit Conversion to metric internally
    if (state.unit === 'imperial') {
      state.heightCm = heightVal * 2.54;
      state.weightKg = weightVal * 0.453592;
    } else {
      state.heightCm = heightVal;
      state.weightKg = weightVal;
    }

    state.bodyFat = inputBodyFat.value;
    state.activityKey = selectActivity.value;

    // Calculate TDEE
    var calcResult = window.TDEECalculator.calculateTDEE({
      age: state.age,
      gender: state.gender,
      heightCm: state.heightCm,
      weightKg: state.weightKg,
      bodyFat: state.bodyFat,
      activityKey: state.activityKey,
      customMultiplier: state.customMultiplier
    });

    // Update Main Hero Output
    displayTdee.textContent = calcResult.tdee.toLocaleString();
    displayBmr.textContent = calcResult.bmr.toLocaleString();
    displayFormula.textContent = calcResult.formulaName;
    displayMinRange.textContent = calcResult.minRange.toLocaleString() + ' kcal';
    displayMaxRange.textContent = calcResult.maxRange.toLocaleString() + ' kcal';

    // Update Goals & Targets
    var goals = window.TDEECalculator.calculateGoals(calcResult.tdee, state.weightKg);
    var activeGoalObj = goals[state.activeGoal] || goals.maintain;
    targetCalNum.textContent = activeGoalObj.calories.toLocaleString() + ' kcal/day';
    targetPaceText.textContent = activeGoalObj.paceText;

    // Update Rest vs Training Split
    var split = window.TDEECalculator.calculateRestTrainingSplit(activeGoalObj.calories, state.trainingDays);
    valTrainingCals.textContent = split.trainingDayCals.toLocaleString() + ' kcal';
    valRestCals.textContent = split.restDayCals.toLocaleString() + ' kcal';

    // Update Macros
    var macros = window.TDEECalculator.calculateMacros(activeGoalObj.calories, state.weightKg, state.macroPreset);
    gramProtein.textContent = macros.protein.grams + 'g (' + macros.protein.pct + '%)';
    gramCarbs.textContent = macros.carbs.grams + 'g (' + macros.carbs.pct + '%)';
    gramFat.textContent = macros.fat.grams + 'g (' + macros.fat.pct + '%)';

    // Update Activity Scenario Simulator
    var extraSteps = parseInt(inputExtraSteps.value) || 3000;
    var sim = window.TDEECalculator.simulateStepIncrease(calcResult.tdee, extraSteps);
    displaySimExtraBurn.textContent = '+' + sim.extraBurn + ' kcal/day';
    displaySimNewTdee.textContent = sim.newTdee.toLocaleString() + ' kcal/day';
  }

  /* ==========================================================================
     3. FORM CONTROLS & EVENT LISTENERS
     ========================================================================== */
  // Unit Toggle
  unitBtnMetric.addEventListener('click', function() {
    if (state.unit === 'imperial') {
      state.unit = 'metric';
      unitBtnMetric.classList.add('active');
      unitBtnImperial.classList.remove('active');
      heightUnitLabel.textContent = 'cm';
      weightUnitLabel.textContent = 'kg';
      // Convert values visually
      inputHeight.value = Math.round(parseFloat(inputHeight.value) * 2.54);
      inputWeight.value = Math.round(parseFloat(inputWeight.value) * 0.453592);
      updateCalculation();
    }
  });

  unitBtnImperial.addEventListener('click', function() {
    if (state.unit === 'metric') {
      state.unit = 'imperial';
      unitBtnImperial.classList.add('active');
      unitBtnMetric.classList.remove('active');
      heightUnitLabel.textContent = 'in';
      weightUnitLabel.textContent = 'lbs';
      // Convert values visually
      inputHeight.value = Math.round(parseFloat(inputHeight.value) / 2.54);
      inputWeight.value = Math.round(parseFloat(inputWeight.value) / 0.453592);
      updateCalculation();
    }
  });

  // Gender Toggle
  genderBtnMale.addEventListener('click', function() {
    state.gender = 'male';
    genderBtnMale.classList.add('active');
    genderBtnFemale.classList.remove('active');
    updateCalculation();
  });

  genderBtnFemale.addEventListener('click', function() {
    state.gender = 'female';
    genderBtnFemale.classList.add('active');
    genderBtnMale.classList.remove('active');
    updateCalculation();
  });

  // Live Input Observers
  [inputAge, inputHeight, inputWeight, inputBodyFat, selectActivity, inputExtraSteps].forEach(function(elem) {
    if (elem) {
      elem.addEventListener('input', updateCalculation);
      elem.addEventListener('change', updateCalculation);
    }
  });

  // Goal Tab Buttons
  var goalTabs = document.querySelectorAll('.goal-tab-btn');
  goalTabs.forEach(function(btn) {
    btn.addEventListener('click', function() {
      goalTabs.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      state.activeGoal = btn.getAttribute('data-goal');
      updateCalculation();
    });
  });

  // Macro Presets
  var macroSelect = document.getElementById('select-macro-preset');
  if (macroSelect) {
    macroSelect.addEventListener('change', function() {
      state.macroPreset = macroSelect.value;
      updateCalculation();
    });
  }

  /* ==========================================================================
     4. ACTIVITY LEVEL SMART WIZARD
     ========================================================================== */
  var btnStartWizard = document.getElementById('btn-start-wizard');
  var wizardStep1 = document.getElementById('wizard-step-1');
  var wizardStep2 = document.getElementById('wizard-step-2');
  var wizardResult = document.getElementById('wizard-result');
  var displayWizardMult = document.getElementById('display-wizard-mult');
  var btnApplyWizard = document.getElementById('btn-apply-wizard');

  var wizardAnswers = { steps: '5k_8k', workoutDays: 3, intensity: 'moderate' };

  if (btnStartWizard) {
    btnStartWizard.addEventListener('click', function() {
      wizardStep1.classList.add('active');
      btnStartWizard.classList.add('hidden');
    });
  }

  // Wizard Option Cards
  document.querySelectorAll('.wizard-option').forEach(function(card) {
    card.addEventListener('click', function() {
      var group = card.getAttribute('data-group');
      var val = card.getAttribute('data-val');

      // Unselect siblings
      card.parentElement.querySelectorAll('.wizard-option').forEach(function(c) {
        c.classList.remove('selected');
      });
      card.classList.add('selected');
      wizardAnswers[group] = val;

      // Auto advance or calculate
      var score = window.TDEECalculator.calculateWizardMultiplier(wizardAnswers);
      state.customMultiplier = score;
      displayWizardMult.textContent = score.toFixed(2);
      wizardResult.classList.remove('hidden');
    });
  });

  if (btnApplyWizard) {
    btnApplyWizard.addEventListener('click', function() {
      updateCalculation();
      alert('Custom activity multiplier of ' + state.customMultiplier + ' applied to your TDEE!');
    });
  }

  /* ==========================================================================
     5. REAL-WORLD TDEE CALIBRATION LAB (Signature Differentiator)
     ========================================================================== */
  var btnLoadSampleData = document.getElementById('btn-load-sample-data');
  var btnRunCalibration = document.getElementById('btn-run-calibration');
  var tableBody = document.getElementById('tracker-table-body');
  var calibrationOutput = document.getElementById('calibration-output');

  function renderTrackerTable(entries) {
    tableBody.innerHTML = '';
    entries.forEach(function(row, idx) {
      var tr = document.createElement('tr');
      tr.innerHTML = '<td>Day ' + row.day + '</td>' +
        '<td><input type="number" class="cal-input" data-idx="' + idx + '" value="' + row.cals + '"> kcal</td>' +
        '<td><input type="number" step="0.1" class="weight-input" data-idx="' + idx + '" value="' + row.weight + '"> kg</td>';
      tableBody.appendChild(tr);
    });

    // Wire input edits
    tableBody.querySelectorAll('.cal-input').forEach(function(inp) {
      inp.addEventListener('change', function() {
        var idx = parseInt(inp.getAttribute('data-idx'));
        state.calibrationEntries[idx].cals = parseFloat(inp.value) || 0;
      });
    });
    tableBody.querySelectorAll('.weight-input').forEach(function(inp) {
      inp.addEventListener('change', function() {
        var idx = parseInt(inp.getAttribute('data-idx'));
        state.calibrationEntries[idx].weight = parseFloat(inp.value) || 0;
      });
    });
  }

  if (btnLoadSampleData) {
    btnLoadSampleData.addEventListener('click', function() {
      state.calibrationEntries = JSON.parse(JSON.stringify(window.TDEECalibration.SAMPLE_DATA));
      renderTrackerTable(state.calibrationEntries);
      btnRunCalibration.click();
    });
  }

  if (btnRunCalibration) {
    btnRunCalibration.addEventListener('click', function() {
      // Auto-load sample data if user hasn't entered any entries yet
      if (!state.calibrationEntries || state.calibrationEntries.length === 0) {
        state.calibrationEntries = JSON.parse(JSON.stringify(window.TDEECalibration.SAMPLE_DATA));
        renderTrackerTable(state.calibrationEntries);
      }

      var currentFormulaTdee = parseInt(displayTdee.textContent.replace(/,/g, '')) || 2450;
      var result = window.TDEECalibration.calibrateExpenditure(state.calibrationEntries, currentFormulaTdee);

      if (result.error) {
        // Show error inline instead of alert
        calibrationOutput.classList.remove('hidden');
        calibrationOutput.innerHTML = '<div style="text-align:center;padding:1.5rem;color:var(--accent-amber);">' +
          '<p style="font-size:1.1rem;font-weight:700;">⚠️ ' + result.error + '</p>' +
          '<p style="color:var(--text-muted);font-size:0.9rem;">Click "Fill 14-Day Sample Data" above to try a quick demo.</p></div>';
        return;
      }

      // Restore the result card layout and populate
      calibrationOutput.innerHTML = '' +
        '<div>' +
          '<div style="font-size:0.8rem; text-transform:uppercase; color:var(--text-muted);">Observed Real-World TDEE</div>' +
          '<div id="calib-observed-tdee" style="font-size:2.2rem; font-weight:900; color:var(--accent-purple);"></div>' +
        '</div>' +
        '<div>' +
          '<div style="font-size:0.8rem; text-transform:uppercase; color:var(--text-muted);">Average Daily Intake</div>' +
          '<div id="calib-avg-cals" style="font-size:1.4rem; font-weight:700; color:#fff;"></div>' +
        '</div>' +
        '<div>' +
          '<div style="font-size:0.8rem; text-transform:uppercase; color:var(--text-muted);">Weight Change Rate</div>' +
          '<div id="calib-weight-delta" style="font-size:1.4rem; font-weight:700; color:var(--accent-emerald);"></div>' +
        '</div>' +
        '<div>' +
          '<div style="font-size:0.8rem; text-transform:uppercase; color:var(--text-muted);">Calibration Confidence</div>' +
          '<div id="calib-confidence" style="font-size:0.95rem; font-weight:600; color:var(--text-main);"></div>' +
        '</div>';

      calibrationOutput.classList.remove('hidden');
      document.getElementById('calib-observed-tdee').textContent = result.observedTdee.toLocaleString() + ' kcal/day';
      document.getElementById('calib-avg-cals').textContent = result.avgDailyCals.toLocaleString() + ' kcal';
      document.getElementById('calib-weight-delta').textContent = (result.weightChangePerWeekKg > 0 ? '+' : '') + result.weightChangePerWeekKg + ' kg/week';
      document.getElementById('calib-confidence').textContent = result.confidence + ' — ' + result.confidenceReason;
    });
  }

  /* ==========================================================================
     6. "WHY AM I NOT LOSING WEIGHT?" DIAGNOSTIC WIZARD
     ========================================================================== */
  var btnRunDiagnostic = document.getElementById('btn-run-diagnostic');
  var diagnosticResult = document.getElementById('diagnostic-result');

  function safeGetValue(id, fallback) {
    var el = document.getElementById(id);
    return el ? el.value : (fallback || '');
  }

  if (btnRunDiagnostic) {
    btnRunDiagnostic.addEventListener('click', function() {
      var diagAnswers = {
        duration: safeGetValue('diag-duration', '14_28'),
        weighing: safeGetValue('diag-weighing', 'scale'),
        hiddenCals: safeGetValue('diag-hiddencals', 'yes'),
        weekends: safeGetValue('diag-weekends', 'tracked'),
        neat: safeGetValue('diag-neat', 'same'),
        soreness: safeGetValue('diag-soreness', 'no'),
        stress: safeGetValue('diag-stress', 'low')
      };

      var report = window.TDEEDiagnostic.diagnosePlateau(diagAnswers);
      diagnosticResult.classList.remove('hidden');

      var html = '<h3 style="margin-bottom:1rem;">Diagnostic Analysis (' + report.totalIssues + ' Potential Drivers Identified)</h3>';

      report.issues.forEach(function(iss) {
        html += '<div style="background:var(--bg-tertiary); border-left:4px solid var(--accent-rose); padding:1rem; border-radius:8px; margin-bottom:1rem;">' +
          '<h4 style="color:var(--text-main);">' + iss.title + '</h4>' +
          '<p style="font-size:0.9rem; margin:0.4rem 0;">' + iss.explanation + '</p>' +
          '<p style="font-size:0.88rem; color:var(--accent-cyan); font-weight:600;">Fix: ' + iss.recommendation + '</p>' +
          '</div>';
      });

      if (report.keyTakeaways.length > 0) {
        html += '<p style="color:var(--accent-emerald); font-weight:600;">' + report.keyTakeaways[0] + '</p>';
      }

      diagnosticResult.innerHTML = html;
    });
  }

  // Accordions for FAQ
  document.querySelectorAll('.faq-question').forEach(function(q) {
    q.addEventListener('click', function() {
      var item = q.parentElement;
      item.classList.toggle('open');
    });
  });

  // Initialize
  updateCalculation();
  renderRoute(window.location.pathname);
});

/* ==========================================================================
   Mobile Navigation: hamburger toggle + touch-friendly dropdowns
   ========================================================================== */
(function() {
  var toggle = document.getElementById('nav-toggle');
  var header = document.querySelector('.header');

  if (toggle && header) {
    toggle.addEventListener('click', function() {
      var open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Close the menu when a nav link is tapped
    header.querySelectorAll('.nav-link, .dropdown-item').forEach(function(link) {
      link.addEventListener('click', function() {
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Touch devices can't hover: first tap opens the dropdown, second tap follows
  var isTouch = window.matchMedia('(hover: none)').matches;
  if (isTouch) {
    document.querySelectorAll('.nav-dropdown > .nav-link').forEach(function(trigger) {
      trigger.addEventListener('click', function(e) {
        var dropdown = trigger.parentElement;
        if (!dropdown.classList.contains('touch-open')) {
          e.preventDefault();
          e.stopPropagation();
          // close others
          document.querySelectorAll('.nav-dropdown.touch-open').forEach(function(d) {
            if (d !== dropdown) d.classList.remove('touch-open');
          });
          dropdown.classList.add('touch-open');
        }
      });
    });
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.nav-dropdown')) {
        document.querySelectorAll('.nav-dropdown.touch-open').forEach(function(d) {
          d.classList.remove('touch-open');
        });
      }
    });
  }
})();
