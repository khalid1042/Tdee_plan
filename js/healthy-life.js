/**
 * Healthy Food and Healthy Life Interactive Module
 * Includes:
 * 1. Interactive Daily Meal Planner
 * 2. Daily Healthy Habit Checklist
 * 3. Meal Idea Explorer with Dynamic Filters
 */

window.TDEEHealthyLife = (function() {
  'use strict';

  /* ==========================================
     DATASETS
     ========================================== */

  var BUILTIN_MEALS = {
    breakfast: [
      "Oatmeal with Fresh Berries, Chia Seeds & Honey",
      "Avocado & Poached Egg Toast on Whole Grain Sourdough",
      "Greek Yogurt Parfait with Granola & Mixed Berries",
      "Spinach, Mushroom & Egg White Scramble",
      "Banana Peanut Butter Protein Smoothie Bowl",
      "Whole Grain Pancakes with Fresh Fruit"
    ],
    lunch: [
      "Grilled Chicken Quinoa & Roasted Veggie Bowl",
      "Mediterranean Whole Wheat Turkey & Hummus Wrap",
      "Wild Salmon & Mixed Greens Salad with Olive Oil Vinaigrette",
      "Hearty Lentil & Vegetable Soup with Whole Grain Roll",
      "Chickpea, Cucumber & Feta Salad Plate",
      "Tuna Salad Sandwich on Whole Wheat with Sprouts"
    ],
    dinner: [
      "Baked Herb Salmon with Sweet Potato Mash & Asparagus",
      "Lean Beef & Broccoli Brown Rice Stir-Fry",
      "Tofu & Mixed Vegetable Curry with Jasmine Rice",
      "Turkey Meatballs with Whole Wheat Pasta & Marinara",
      "Grilled Lemon Herb Chicken Breast with Steamed Veggies",
      "Roasted Veggie & Black Bean Enchilada Bake"
    ],
    snack: [
      "Apple Slices with Natural Almond Butter",
      "Handful of Raw Walnuts & Dried Cranberries",
      "Hummus with Crunchy Cucumber & Carrot Sticks",
      "Low-Fat Cottage Cheese with Pineapple Chunks",
      "Hard-Boiled Eggs with a Pinch of Sea Salt",
      "Edamame Pods with Sea Salt & Sesame"
    ]
  };

  var HABITS = [
    { id: 'habit-1', title: 'Eat Nutritious Whole Foods', desc: 'Focus on unprocessed whole foods like vegetables, fruits, legumes, and lean proteins.' },
    { id: 'habit-2', title: 'Include Fruits or Vegetables', desc: 'Aim to feature at least one colorful fruit or vegetable in every meal.' },
    { id: 'habit-3', title: 'Drink Water Regularly', desc: 'Stay adequately hydrated with 8+ cups (2 liters) of water throughout the day.' },
    { id: 'habit-4', title: 'Complete Physical Activity', desc: 'Engage in at least 30 minutes of brisk walking, exercise, or active movement.' },
    { id: 'habit-5', title: 'Take Relaxation & Stress Breaks', desc: 'Dedicate 10-15 minutes to deep breathing, stretching, or quiet relaxation.' },
    { id: 'habit-6', title: 'Follow a Restful Sleep Routine', desc: 'Maintain consistent sleep timing and aim for 7-9 hours of quality sleep.' }
  ];

  var MEAL_IDEAS = [
    {
      id: 'm1',
      title: 'Quinoa & Grilled Chicken Power Bowl',
      category: 'Lunch',
      tags: ['High-Protein', 'Balanced'],
      prepTime: '20 mins',
      desc: 'Fluffy quinoa topped with herb-marinated grilled chicken breast, roasted sweet potatoes, steamed broccoli, and a light lemon tahini dressing.',
      ingredients: ['1/2 cup Quinoa', '150g Chicken Breast', 'Sweet Potato', 'Broccoli', 'Lemon Tahini Dressing']
    },
    {
      id: 'm2',
      title: 'Greek Yogurt & Berry Chia Parfait',
      category: 'Breakfast',
      tags: ['Vegetarian', 'High-Protein'],
      prepTime: '10 mins',
      desc: 'Layered unsweetened Greek yogurt with fresh blueberries, raspberries, chia seeds, and a sprinkle of rolled oats and honey.',
      ingredients: ['200g Greek Yogurt', 'Fresh Blueberries', '1 tbsp Chia Seeds', 'Rolled Oats', 'Honey']
    },
    {
      id: 'm3',
      title: 'Baked Herb Salmon with Asparagus',
      category: 'Dinner',
      tags: ['High-Protein', 'Balanced'],
      prepTime: '25 mins',
      desc: 'Wild-caught salmon fillet seasoned with dill, garlic, and lemon, baked alongside tender asparagus spears and roasted baby potatoes.',
      ingredients: ['180g Salmon Fillet', 'Bunch of Asparagus', 'Baby Potatoes', 'Olive Oil', 'Garlic & Lemon']
    },
    {
      id: 'm4',
      title: 'Avocado & Everything Spice Egg Toast',
      category: 'Breakfast',
      tags: ['Vegetarian', 'Quick'],
      prepTime: '10 mins',
      desc: 'Toasted whole grain sourdough spread with mashed ripe avocado, topped with two soft-poached eggs and a pinch of chili flakes.',
      ingredients: ['2 Slices Whole Grain Bread', '1/2 Ripe Avocado', '2 Eggs', 'Everything Bagel Seasoning']
    },
    {
      id: 'm5',
      title: 'Mediterranean Chickpea & Cucumber Salad',
      category: 'Lunch',
      tags: ['Vegetarian', 'High-Fiber'],
      prepTime: '15 mins',
      desc: 'Crisp cucumber cubes, cherry tomatoes, red onion, kalamata olives, and rinsed chickpeas tossed in olive oil and lemon juice with crumbled feta.',
      ingredients: ['1 can Chickpeas', 'Cucumber', 'Cherry Tomatoes', 'Feta Cheese', 'Extra Virgin Olive Oil']
    },
    {
      id: 'm6',
      title: 'Tofu & Mixed Veggie Thai Curry',
      category: 'Dinner',
      tags: ['Vegetarian', 'High-Protein'],
      prepTime: '30 mins',
      desc: 'Firm pan-seared tofu cubes simmered with bell peppers, snap peas, and spinach in a fragrant coconut milk green curry sauce over jasmine rice.',
      ingredients: ['200g Extra Firm Tofu', 'Mixed Bell Peppers', 'Snap Peas', 'Coconut Milk', 'Green Curry Paste', 'Jasmine Rice']
    },
    {
      id: 'm7',
      title: 'Apple Slices with Natural Almond Butter',
      category: 'Snacks',
      tags: ['Vegetarian', 'Quick'],
      prepTime: '5 mins',
      desc: 'Crisp Honeycrisp apple slices paired with 2 tablespoons of 100% natural almond butter and a light dust of cinnamon.',
      ingredients: ['1 Crisp Apple', '2 tbsp Almond Butter', 'Ground Cinnamon']
    },
    {
      id: 'm8',
      title: 'Turkey & Spinach Whole Wheat Wrap',
      category: 'Lunch',
      tags: ['High-Protein', 'Balanced'],
      prepTime: '10 mins',
      desc: 'Sliced roasted turkey breast wrapped in a whole wheat tortilla with fresh baby spinach, sliced tomato, cucumber, and light hummus.',
      ingredients: ['Whole Wheat Tortilla', '120g Roasted Turkey', 'Baby Spinach', 'Tomato & Cucumber', 'Hummus']
    },
    {
      id: 'm9',
      title: 'Spinach & Mushroom Egg White Scramble',
      category: 'Breakfast',
      tags: ['High-Protein', 'Low-Fat'],
      prepTime: '12 mins',
      desc: 'Fluffy egg whites scrambled with sliced button mushrooms, fresh baby spinach, and cherry tomatoes, served with a slice of whole grain toast.',
      ingredients: ['4 Egg Whites + 1 Whole Egg', 'Sliced Mushrooms', 'Fresh Spinach', '1 Slice Whole Grain Toast']
    },
    {
      id: 'm10',
      title: 'Lean Beef & Broccoli Brown Rice Bowl',
      category: 'Dinner',
      tags: ['High-Protein', 'Balanced'],
      prepTime: '25 mins',
      desc: 'Tender strips of lean flank steak stir-fried with fresh broccoli florets, ginger, garlic, and low-sodium tamari sauce over warm brown rice.',
      ingredients: ['150g Flank Steak', 'Broccoli Florets', 'Low-Sodium Soy/Tamari', 'Garlic & Ginger', 'Brown Rice']
    },
    {
      id: 'm11',
      title: 'Hummus & Raw Veggie Snack Plate',
      category: 'Snacks',
      tags: ['Vegetarian', 'High-Fiber'],
      prepTime: '5 mins',
      desc: 'Creamy garlic hummus served with a vibrant array of crunchy sliced carrots, cucumber rounds, celery sticks, and bell pepper strips.',
      ingredients: ['1/3 cup Hummus', 'Carrot Sticks', 'Cucumber Rounds', 'Bell Pepper Strips']
    },
    {
      id: 'm12',
      title: 'Cottage Cheese & Pineapple Delight',
      category: 'Snacks',
      tags: ['High-Protein', 'Quick'],
      prepTime: '3 mins',
      desc: 'Protein-dense low-fat cottage cheese topped with juicy fresh pineapple chunks and a sprinkle of sunflower seeds.',
      ingredients: ['1 cup Low-Fat Cottage Cheese', '1/2 cup Fresh Pineapple', '1 tbsp Sunflower Seeds']
    }
  ];

  /* ==========================================
     FEATURE 1: INTERACTIVE DAILY MEAL PLANNER
     ========================================== */

  var plannerState = {
    breakfast: { selected: '', custom: '' },
    lunch: { selected: '', custom: '' },
    dinner: { selected: '', custom: '' },
    snack: { selected: '', custom: '' }
  };

  function initMealPlanner() {
    var mountEl = document.getElementById('interactive-meal-planner');
    if (!mountEl) return;

    renderPlannerUI(mountEl);
  }

  function renderPlannerUI(container) {
    var html = `
      <div class="planner-card glass-card">
        <div class="card-header">
          <h3 class="card-title"><span class="card-title-icon">🥗</span> Interactive Daily Meal Planner</h3>
          <span class="hero-badge" style="margin:0;">Customizable</span>
        </div>
        <p style="margin-bottom:1.5rem;">Select your preferred healthy options for each meal or enter your own custom dishes to build your balanced daily meal plan.</p>

        <div class="planner-grid">
          <!-- Meal Inputs -->
          <div class="planner-form-col">

            <!-- Breakfast Slot -->
            <div class="meal-slot-group">
              <label class="form-label" for="planner-breakfast-select">🌅 Breakfast Option</label>
              <select id="planner-breakfast-select" class="select-field meal-select" data-slot="breakfast">
                <option value="">-- Choose Breakfast Idea --</option>
                ${BUILTIN_MEALS.breakfast.map(m => `<option value="${m}">${m}</option>`).join('')}
                <option value="__custom__">✏️ Custom Breakfast Name...</option>
              </select>
              <input type="text" id="planner-breakfast-custom" class="input-field meal-custom hidden" placeholder="Enter custom breakfast..." style="margin-top:0.5rem;" data-slot="breakfast">
            </div>

            <!-- Lunch Slot -->
            <div class="meal-slot-group">
              <label class="form-label" for="planner-lunch-select">☀️ Lunch Option</label>
              <select id="planner-lunch-select" class="select-field meal-select" data-slot="lunch">
                <option value="">-- Choose Lunch Idea --</option>
                ${BUILTIN_MEALS.lunch.map(m => `<option value="${m}">${m}</option>`).join('')}
                <option value="__custom__">✏️ Custom Lunch Name...</option>
              </select>
              <input type="text" id="planner-lunch-custom" class="input-field meal-custom hidden" placeholder="Enter custom lunch..." style="margin-top:0.5rem;" data-slot="lunch">
            </div>

            <!-- Dinner Slot -->
            <div class="meal-slot-group">
              <label class="form-label" for="planner-dinner-select">🌙 Dinner Option</label>
              <select id="planner-dinner-select" class="select-field meal-select" data-slot="dinner">
                <option value="">-- Choose Dinner Idea --</option>
                ${BUILTIN_MEALS.dinner.map(m => `<option value="${m}">${m}</option>`).join('')}
                <option value="__custom__">✏️ Custom Dinner Name...</option>
              </select>
              <input type="text" id="planner-dinner-custom" class="input-field meal-custom hidden" placeholder="Enter custom dinner..." style="margin-top:0.5rem;" data-slot="dinner">
            </div>

            <!-- Snack Slot -->
            <div class="meal-slot-group">
              <label class="form-label" for="planner-snack-select">🍎 Snack Option</label>
              <select id="planner-snack-select" class="select-field meal-select" data-slot="snack">
                <option value="">-- Choose Snack Idea --</option>
                ${BUILTIN_MEALS.snack.map(m => `<option value="${m}">${m}</option>`).join('')}
                <option value="__custom__">✏️ Custom Snack Name...</option>
              </select>
              <input type="text" id="planner-snack-custom" class="input-field meal-custom hidden" placeholder="Enter custom snack..." style="margin-top:0.5rem;" data-slot="snack">
            </div>

          </div>

          <!-- Live Summary Display -->
          <div class="planner-summary-col">
            <div class="summary-box">
              <h4 style="margin-bottom:1rem; color:var(--accent-cyan); display:flex; align-items:center; justify-content:space-between;">
                <span>📋 Your Meal Plan Summary</span>
                <span id="plan-status-badge" style="font-size:0.75rem; padding:0.2rem 0.6rem; border-radius:12px; background:rgba(56,189,248,0.15); color:var(--accent-cyan);">In Progress</span>
              </h4>

              <div id="planner-summary-list" class="summary-items-container">
                <!-- Dynamic Items Inserted Here -->
              </div>

              <!-- Planner Action Buttons -->
              <div class="planner-actions">
                <button type="button" id="btn-copy-plan" class="btn-secondary" style="flex:1;">📋 Copy Plan</button>
                <button type="button" id="btn-print-plan" class="btn-secondary" style="flex:1;">🖨️ Print Plan</button>
                <button type="button" id="btn-reset-plan" class="btn-secondary" style="color:var(--accent-rose); border-color:rgba(244,63,94,0.3);">🗑️ Reset</button>
              </div>

              <!-- Toast Feedback -->
              <div id="planner-toast" class="toast-feedback hidden"></div>
            </div>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    bindPlannerEvents(container);
    updatePlannerSummary();
  }

  function bindPlannerEvents(container) {
    container.querySelectorAll('.meal-select').forEach(function(select) {
      select.addEventListener('change', function() {
        var slot = select.getAttribute('data-slot');
        var customInput = container.querySelector(`.meal-custom[data-slot="${slot}"]`);

        if (select.value === '__custom__') {
          if (customInput) customInput.classList.remove('hidden');
          plannerState[slot].selected = '__custom__';
        } else {
          if (customInput) customInput.classList.add('hidden');
          plannerState[slot].selected = select.value;
        }
        updatePlannerSummary();
      });
    });

    container.querySelectorAll('.meal-custom').forEach(function(input) {
      input.addEventListener('input', function() {
        var slot = input.getAttribute('data-slot');
        plannerState[slot].custom = input.value;
        updatePlannerSummary();
      });
    });

    // Action Buttons
    var btnReset = container.querySelector('#btn-reset-plan');
    if (btnReset) {
      btnReset.addEventListener('click', function() {
        plannerState = {
          breakfast: { selected: '', custom: '' },
          lunch: { selected: '', custom: '' },
          dinner: { selected: '', custom: '' },
          snack: { selected: '', custom: '' }
        };
        container.querySelectorAll('.meal-select').forEach(s => s.value = '');
        container.querySelectorAll('.meal-custom').forEach(i => { i.value = ''; i.classList.add('hidden'); });
        updatePlannerSummary();
        showToast('Meal plan has been reset.');
      });
    }

    var btnPrint = container.querySelector('#btn-print-plan');
    if (btnPrint) {
      btnPrint.addEventListener('click', function() {
        window.print();
      });
    }

    var btnCopy = container.querySelector('#btn-copy-plan');
    if (btnCopy) {
      btnCopy.addEventListener('click', function() {
        var text = generatePlanText();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function() {
            showToast('✓ Meal plan copied to clipboard!');
          }).catch(function() {
            fallbackCopy(text);
          });
        } else {
          fallbackCopy(text);
        }
      });
    }
  }

  function fallbackCopy(text) {
    try {
      var textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      showToast('✓ Meal plan copied to clipboard!');
    } catch (err) {
      showToast('Failed to copy. Please copy manually.');
    }
  }

  function getSlotText(slot) {
    var obj = plannerState[slot];
    if (!obj.selected) return 'Not selected yet';
    if (obj.selected === '__custom__') return obj.custom.trim() || 'Custom meal (unspecified)';
    return obj.selected;
  }

  function updatePlannerSummary() {
    var summaryContainer = document.getElementById('planner-summary-list');
    var badge = document.getElementById('plan-status-badge');
    if (!summaryContainer) return;

    var slots = [
      { key: 'breakfast', label: 'Sunrise Breakfast', icon: '🌅' },
      { key: 'lunch', label: 'Midday Lunch', icon: '☀️' },
      { key: 'dinner', label: 'Evening Dinner', icon: '🌙' },
      { key: 'snack', label: 'Nutritious Snack', icon: '🍎' }
    ];

    var selectedCount = 0;

    var html = slots.map(function(s) {
      var mealText = getSlotText(s.key);
      var isFilled = mealText !== 'Not selected yet';
      if (isFilled) selectedCount++;

      return `
        <div class="summary-slot-card ${isFilled ? 'filled' : 'empty'}">
          <div class="summary-slot-header">
            <span class="slot-icon">${s.icon}</span>
            <span class="slot-title">${s.label}</span>
            ${isFilled ? `<button type="button" class="btn-remove-meal" data-slot="${s.key}" title="Clear this meal">&times;</button>` : ''}
          </div>
          <div class="summary-slot-content ${isFilled ? 'text-main' : 'text-dim'}">
            ${mealText}
          </div>
        </div>
      `;
    }).join('');

    summaryContainer.innerHTML = html;

    if (badge) {
      if (selectedCount === 4) {
        badge.textContent = 'Complete Plan (4/4)';
        badge.style.background = 'rgba(16,185,129,0.2)';
        badge.style.color = 'var(--accent-emerald)';
      } else if (selectedCount > 0) {
        badge.textContent = `Building (${selectedCount}/4)`;
        badge.style.background = 'rgba(56,189,248,0.15)';
        badge.style.color = 'var(--accent-cyan)';
      } else {
        badge.textContent = 'Empty Plan';
        badge.style.background = 'rgba(255,255,255,0.05)';
        badge.style.color = 'var(--text-dim)';
      }
    }

    // Attach individual remove button handlers
    summaryContainer.querySelectorAll('.btn-remove-meal').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var slot = btn.getAttribute('data-slot');
        plannerState[slot] = { selected: '', custom: '' };
        var select = document.querySelector(`.meal-select[data-slot="${slot}"]`);
        var custom = document.querySelector(`.meal-custom[data-slot="${slot}"]`);
        if (select) select.value = '';
        if (custom) { custom.value = ''; custom.classList.add('hidden'); }
        updatePlannerSummary();
      });
    });
  }

  function generatePlanText() {
    return `=== My Daily Healthy Meal Plan ===\n` +
      `Breakfast: ${getSlotText('breakfast')}\n` +
      `Lunch: ${getSlotText('lunch')}\n` +
      `Dinner: ${getSlotText('dinner')}\n` +
      `Snack: ${getSlotText('snack')}\n` +
      `Created via TDEE Plan - Healthy Food & Life Guide`;
  }

  function showToast(msg) {
    var toast = document.getElementById('planner-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove('hidden');
    toast.classList.add('show');
    setTimeout(function() {
      toast.classList.remove('show');
      toast.classList.add('hidden');
    }, 3000);
  }

  /* ==========================================
     FEATURE 2: DAILY HEALTHY HABIT CHECKLIST
     ========================================== */

  var checkedHabits = {};

  function initHabitChecklist() {
    var mountEl = document.getElementById('interactive-habit-checklist');
    if (!mountEl) return;

    renderHabitUI(mountEl);
  }

  function renderHabitUI(container) {
    var total = HABITS.length;

    var html = `
      <div class="habit-card glass-card">
        <div class="card-header">
          <h3 class="card-title"><span class="card-title-icon">✅</span> Daily Healthy Habit Tracker</h3>
          <button type="button" id="btn-reset-habits" class="btn-secondary" style="font-size:0.8rem; padding:0.3rem 0.8rem;">Reset All</button>
        </div>
        <p style="margin-bottom:1.5rem;">Track your key daily actions for a balanced, vibrant lifestyle. Check off each habit as you complete it throughout your day.</p>

        <!-- Progress Indicator -->
        <div class="habit-progress-box">
          <div class="progress-info-row">
            <span class="progress-status-text" id="habit-count-display">0 of ${total} completed</span>
            <span class="progress-percentage-text" id="habit-pct-display">0%</span>
          </div>
          <div class="progress-track">
            <div id="habit-progress-bar" class="progress-fill" style="width: 0%;"></div>
          </div>
          <div id="habit-motivation-msg" class="habit-motivation">🌟 Ready to start your healthy day? Check off habits as you complete them!</div>
        </div>

        <!-- Checkbox Grid -->
        <div class="habit-items-grid">
          ${HABITS.map(function(h) {
            return `
              <div class="habit-item-card" data-id="${h.id}">
                <label class="habit-label">
                  <input type="checkbox" class="habit-checkbox" data-id="${h.id}">
                  <span class="custom-checkbox"></span>
                  <div class="habit-text">
                    <div class="habit-title">${h.title}</div>
                    <div class="habit-desc">${h.desc}</div>
                  </div>
                </label>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    container.innerHTML = html;
    bindHabitEvents(container);
    updateHabitProgress();
  }

  function bindHabitEvents(container) {
    container.querySelectorAll('.habit-checkbox').forEach(function(cb) {
      cb.addEventListener('change', function() {
        var id = cb.getAttribute('data-id');
        checkedHabits[id] = cb.checked;

        var parentCard = container.querySelector(`.habit-item-card[data-id="${id}"]`);
        if (parentCard) {
          if (cb.checked) parentCard.classList.add('completed');
          else parentCard.classList.remove('completed');
        }

        updateHabitProgress();
      });
    });

    var btnReset = container.querySelector('#btn-reset-habits');
    if (btnReset) {
      btnReset.addEventListener('click', function() {
        checkedHabits = {};
        container.querySelectorAll('.habit-checkbox').forEach(cb => { cb.checked = false; });
        container.querySelectorAll('.habit-item-card').forEach(c => { c.classList.remove('completed'); });
        updateHabitProgress();
      });
    }
  }

  function updateHabitProgress() {
    var total = HABITS.length;
    var completed = 0;
    HABITS.forEach(function(h) {
      if (checkedHabits[h.id]) completed++;
    });

    var pct = Math.round((completed / total) * 100);

    var countDisplay = document.getElementById('habit-count-display');
    var pctDisplay = document.getElementById('habit-pct-display');
    var progressBar = document.getElementById('habit-progress-bar');
    var msgDisplay = document.getElementById('habit-motivation-msg');

    if (countDisplay) countDisplay.textContent = `${completed} of ${total} completed`;
    if (pctDisplay) pctDisplay.textContent = `${pct}%`;
    if (progressBar) progressBar.style.width = `${pct}%`;

    if (msgDisplay) {
      if (pct === 0) {
        msgDisplay.textContent = '🌟 Ready to start your healthy day? Check off habits as you complete them!';
        msgDisplay.style.color = 'var(--text-muted)';
      } else if (pct <= 33) {
        msgDisplay.textContent = '🌱 Off to a great start! Every positive choice counts.';
        msgDisplay.style.color = 'var(--accent-cyan)';
      } else if (pct <= 66) {
        msgDisplay.textContent = '⚡ Great momentum! You are over halfway to a healthy day.';
        msgDisplay.style.color = 'var(--accent-indigo)';
      } else if (pct < 100) {
        msgDisplay.textContent = '🔥 Fantastic progress! Just a couple more habits to complete.';
        msgDisplay.style.color = 'var(--accent-amber)';
      } else {
        msgDisplay.textContent = '🎉 Outstanding! You completed 100% of your daily healthy habits today!';
        msgDisplay.style.color = 'var(--accent-emerald)';
      }
    }
  }

  /* ==========================================
     FEATURE 3: MEAL IDEA EXPLORER
     ========================================== */

  var activeCategoryFilter = 'All';

  function initMealExplorer() {
    var mountEl = document.getElementById('meal-idea-explorer');
    if (!mountEl) return;

    renderExplorerUI(mountEl);
  }

  function renderExplorerUI(container) {
    var categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Vegetarian', 'High-Protein'];

    var html = `
      <div class="explorer-card glass-card">
        <div class="card-header" style="flex-wrap:wrap; gap:1rem;">
          <div>
            <h3 class="card-title"><span class="card-title-icon">💡</span> Meal Idea Explorer</h3>
            <p style="font-size:0.9rem; color:var(--text-muted); margin:0;">Filter nutritious meal concepts by category or diet type.</p>
          </div>
          <button type="button" id="btn-another-idea" class="btn-primary" style="width:auto; margin:0; padding:0.5rem 1.25rem; font-size:0.9rem;">
            🎲 Show Another Idea
          </button>
        </div>

        <!-- Filter Chips -->
        <div class="explorer-filters-row">
          ${categories.map(cat => `
            <button type="button" class="filter-chip ${cat === activeCategoryFilter ? 'active' : ''}" data-cat="${cat}">
              ${cat}
            </button>
          `).join('')}
        </div>

        <!-- Spotlight Featured Idea Container -->
        <div id="spotlight-idea-box" class="spotlight-idea-card">
          <!-- Populated by JS -->
        </div>

        <!-- Grid of Filtered Ideas -->
        <div id="explorer-ideas-grid" class="ideas-grid">
          <!-- Populated by JS -->
        </div>
      </div>
    `;

    container.innerHTML = html;
    bindExplorerEvents(container);
    renderFilteredIdeas();
  }

  function bindExplorerEvents(container) {
    container.querySelectorAll('.filter-chip').forEach(function(chip) {
      chip.addEventListener('click', function() {
        container.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeCategoryFilter = chip.getAttribute('data-cat');
        renderFilteredIdeas();
      });
    });

    var btnAnother = container.querySelector('#btn-another-idea');
    if (btnAnother) {
      btnAnother.addEventListener('click', function() {
        spotlightRandomIdea();
      });
    }
  }

  function getFilteredMeals() {
    if (activeCategoryFilter === 'All') return MEAL_IDEAS;
    if (activeCategoryFilter === 'Vegetarian' || activeCategoryFilter === 'High-Protein') {
      return MEAL_IDEAS.filter(m => m.tags.includes(activeCategoryFilter));
    }
    return MEAL_IDEAS.filter(m => m.category.toLowerCase() === activeCategoryFilter.toLowerCase());
  }

  function renderFilteredIdeas() {
    var grid = document.getElementById('explorer-ideas-grid');
    if (!grid) return;

    var filtered = getFilteredMeals();

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state-box">
          <div style="font-size:2.5rem; margin-bottom:0.5rem;">🥗</div>
          <h4>No meal ideas found for "${activeCategoryFilter}"</h4>
          <p>Try choosing another category or selecting "All" to view all available ideas.</p>
        </div>
      `;
      var spotlight = document.getElementById('spotlight-idea-box');
      if (spotlight) spotlight.innerHTML = '';
      return;
    }

    // Default spotlight to first item
    renderSpotlight(filtered[0]);

    // Render remaining or all in grid
    var gridHtml = filtered.map(function(m) {
      return `
        <div class="idea-card">
          <div class="idea-header">
            <span class="idea-category-tag">${m.category}</span>
            <span class="idea-time">⏱️ ${m.prepTime}</span>
          </div>
          <h4 class="idea-title">${m.title}</h4>
          <p class="idea-desc">${m.desc}</p>
          <div class="idea-tags">
            ${m.tags.map(t => `<span class="idea-tag">${t}</span>`).join('')}
          </div>
        </div>
      `;
    }).join('');

    grid.innerHTML = gridHtml;
  }

  function renderSpotlight(meal) {
    var spotlight = document.getElementById('spotlight-idea-box');
    if (!spotlight || !meal) return;

    spotlight.innerHTML = `
      <div class="spotlight-content">
        <div class="spotlight-badge">⭐ Featured Recommendation</div>
        <h3 class="spotlight-title">${meal.title}</h3>
        <p class="spotlight-desc">${meal.desc}</p>
        <div class="spotlight-ingredients">
          <strong>Key Ingredients:</strong> ${meal.ingredients.join(' • ')}
        </div>
      </div>
    `;
    spotlight.classList.add('highlight-pulse');
    setTimeout(function() { spotlight.classList.remove('highlight-pulse'); }, 600);
  }

  function spotlightRandomIdea() {
    var filtered = getFilteredMeals();
    if (filtered.length === 0) return;
    var randomIndex = Math.floor(Math.random() * filtered.length);
    renderSpotlight(filtered[randomIndex]);
  }

  /* ==========================================
     INITIALIZER & LIFECYCLE
     ========================================== */

  function initAll() {
    initMealPlanner();
    initHabitChecklist();
    initMealExplorer();
  }

  // Auto-init if DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    setTimeout(initAll, 50);
  }

  return {
    init: initAll,
    initMealPlanner: initMealPlanner,
    initHabitChecklist: initHabitChecklist,
    initMealExplorer: initMealExplorer
  };
})();
