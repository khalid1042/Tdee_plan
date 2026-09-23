const fs = require('fs');
const path = require('path');

const newRoute = `
    ,
    '/daily-diet-plan/': {
      title: 'Daily Diet Plan for a Healthy Life | TDEE Calculator',
      metaDescription: 'Create a balanced daily diet plan with healthy breakfast, lunch, dinner, snacks, hydration and calorie-based meal ideas for your health and fitness goals.',
      category: 'Diet & Nutrition',
      h1: 'Daily Diet Plan for a Healthy Life',
      content: \`
        <p class="lead-paragraph">A healthy daily diet plan can help organize meals, improve food variety, and make it easier to meet energy and nutrient needs. Keep in mind that calorie requirements differ from person to person.</p>
        
        <div style="margin: 2rem 0; display: flex; gap: 1rem; flex-wrap: wrap;">
          <a href="/" class="btn-primary" style="flex: 1; text-align: center; white-space: nowrap;">Calculate My TDEE</a>
          <a href="/macro-calculator/" class="btn-secondary" style="flex: 1; text-align: center; white-space: nowrap;">Build My Macros</a>
        </div>

        <h2>Example Healthy Daily Diet Plan</h2>
        <div class="glass-card" style="margin-bottom: 2rem; border-top: 4px solid var(--accent-cyan);">
          <div class="timeline-step">
            <h4 style="margin: 0 0 0.25rem; color: var(--text-main);">Morning</h4>
            <p style="margin: 0; color: var(--text-muted); font-size: 0.95rem;">Water + breakfast</p>
          </div>
          <div class="timeline-step" style="margin-top: 1rem;">
            <h4 style="margin: 0 0 0.25rem; color: var(--text-main);">Breakfast</h4>
            <p style="margin: 0 0 0.5rem; color: var(--text-muted); font-size: 0.95rem;">Protein + whole-grain carbohydrate + fruit</p>
            <p style="margin: 0; font-weight: 600; font-size: 0.95rem;"><span style="color: var(--accent-purple);">Example:</span> Eggs + oats + banana</p>
          </div>
          <div class="timeline-step" style="margin-top: 1rem;">
            <h4 style="margin: 0 0 0.25rem; color: var(--text-main);">Mid-Morning Snack</h4>
            <p style="margin: 0 0 0.5rem; color: var(--text-muted); font-size: 0.95rem;">Fruit + yogurt or nuts</p>
          </div>
          <div class="timeline-step" style="margin-top: 1rem;">
            <h4 style="margin: 0 0 0.25rem; color: var(--text-main);">Lunch</h4>
            <p style="margin: 0 0 0.5rem; color: var(--text-muted); font-size: 0.95rem;">Protein + vegetables + whole-grain carbohydrate</p>
            <p style="margin: 0; font-weight: 600; font-size: 0.95rem;"><span style="color: var(--accent-purple);">Example:</span> Chicken + rice + vegetables</p>
          </div>
          <div class="timeline-step" style="margin-top: 1rem;">
            <h4 style="margin: 0 0 0.25rem; color: var(--text-main);">Afternoon Snack</h4>
            <p style="margin: 0 0 0.5rem; color: var(--text-muted); font-size: 0.95rem;">Fruit + yogurt/nuts</p>
          </div>
          <div class="timeline-step" style="margin-top: 1rem;">
            <h4 style="margin: 0 0 0.25rem; color: var(--text-main);">Dinner</h4>
            <p style="margin: 0 0 0.5rem; color: var(--text-muted); font-size: 0.95rem;">Protein + vegetables + carbohydrate</p>
            <p style="margin: 0; font-weight: 600; font-size: 0.95rem;"><span style="color: var(--accent-purple);">Example:</span> Fish + potatoes + vegetables</p>
          </div>
          <div class="timeline-step" style="margin-top: 1rem;">
            <h4 style="margin: 0 0 0.25rem; color: var(--text-main);">Evening</h4>
            <p style="margin: 0; color: var(--text-muted); font-size: 0.95rem;">Water or a suitable unsweetened drink.</p>
          </div>
          
          <div style="margin-top: 1.5rem; padding: 0.75rem; background: rgba(239, 35, 60, 0.1); border-radius: 6px; border-left: 3px solid var(--accent-rose);">
            <p style="margin: 0; font-size: 0.85rem; color: var(--text-main);"><strong>Example meal plan only. Food needs vary by person.</strong></p>
          </div>
        </div>

        <h2>Daily Meal Schedule</h2>
        <p>A simple way to visualize your day is this timeline pattern:</p>
        <div style="background: var(--bg-tertiary); padding: 1.5rem; border-radius: 8px; text-align: center; font-weight: 800; font-size: 1.2rem; color: var(--accent-cyan); margin-bottom: 1.5rem;">
          Breakfast &rarr; Snack &rarr; Lunch &rarr; Snack &rarr; Dinner
        </div>
        <p>This does not imply that everyone must eat exactly five meals. Meal frequency can vary according to your preference, schedule, culture, hunger, and individual needs.</p>

        <h2>How to Build a Daily Diet Plan Using Your TDEE</h2>
        <div class="worked-example-card">
          <ol style="margin: 0; padding-left: 1.25rem;">
            <li style="margin-bottom: 0.5rem;"><strong>Calculate your estimated TDEE.</strong></li>
            <li style="margin-bottom: 0.5rem;"><strong>Select your goal</strong> (loss, maintain, or gain).</li>
            <li style="margin-bottom: 0.5rem;"><strong>Determine an appropriate calorie starting point.</strong></li>
            <li style="margin-bottom: 0.5rem;"><strong>Build meals around nutrient-dense foods.</strong></li>
            <li style="margin-bottom: 0.5rem;"><strong>Include protein throughout the day.</strong></li>
            <li style="margin-bottom: 0.5rem;"><strong>Include vegetables and fruits.</strong></li>
            <li style="margin-bottom: 0.5rem;"><strong>Choose appropriate carbohydrate sources.</strong></li>
            <li style="margin-bottom: 0.5rem;"><strong>Include healthy fats.</strong></li>
            <li style="margin-bottom: 0.5rem;"><strong>Adjust portions based on calorie needs.</strong></li>
            <li style="margin-bottom: 0;"><strong>Monitor long-term progress and adjust when appropriate.</strong></li>
          </ol>
        </div>
        <p><em>Important: Treat your TDEE as an <strong>estimated calorie needs</strong> baseline or a <strong>starting calorie target</strong>, rather than the exact calories you must eat.</em></p>
        <div style="margin-top: 1rem; margin-bottom: 2rem;">
          <a href="/" class="btn-primary" style="display: inline-block;">Calculate Your TDEE</a>
        </div>

        <h2>Daily Diet Plan for Weight Loss</h2>
        <p>For weight loss, a calorie deficit is required. Focus on protein-rich foods, vegetables, fruit, and fiber-rich foods while being mindful of appropriate portions. Whole grains, water, and regular physical activity are also essential.</p>
        <div class="takeaway-callout-box">
          <p>Avoid crash diets or starvation-level calorie intake. Do not expect extreme, rapid weight loss; sustainable pacing is key.</p>
        </div>
        <div style="margin-bottom: 2rem;">
          <a href="/calorie-deficit-calculator/" class="btn-secondary" style="display: inline-block;">Calculate Your Calorie Deficit</a>
        </div>

        <h2>Daily Diet Plan for Weight Maintenance</h2>
        <p>To organize meals around estimated maintenance calories, emphasize flexibility and consistency. A great foundational structure looks like this:</p>
        <ul>
          <li><strong>Breakfast:</strong> Protein + whole grain + fruit</li>
          <li><strong>Lunch:</strong> Protein + vegetables + carbohydrate</li>
          <li><strong>Snack:</strong> Fruit + yogurt/nuts</li>
          <li><strong>Dinner:</strong> Protein + vegetables + carbohydrate</li>
        </ul>

        <h2>Daily Diet Plan for Healthy Weight Gain</h2>
        <p>A calorie surplus is required for weight gain. Focus on nutrient-dense calorie sources providing adequate protein, carbohydrates, and healthy fats. Maintain regular meals and incorporate resistance training where appropriate to support lean mass.</p>
        <p>Avoid relying on excessive junk food for surplus calories.</p>
        <div style="margin-bottom: 2rem;">
          <a href="/calorie-surplus-calculator/" class="btn-secondary" style="display: inline-block;">Calculate Calorie Surplus</a>
        </div>

        <h2>Healthy Breakfast Ideas</h2>
        <p>Adjust portion sizes according to your individual energy needs.</p>
        <div class="options-grid">
          <div class="option-card" style="cursor: default;">
            <div class="option-title">Option 1</div>
            <div class="option-desc">Eggs + whole-grain toast + fruit</div>
          </div>
          <div class="option-card" style="cursor: default;">
            <div class="option-title">Option 2</div>
            <div class="option-desc">Oatmeal + yogurt + berries + nuts</div>
          </div>
          <div class="option-card" style="cursor: default;">
            <div class="option-title">Option 3</div>
            <div class="option-desc">Greek yogurt + fruit + oats</div>
          </div>
          <div class="option-card" style="cursor: default;">
            <div class="option-title">Option 4</div>
            <div class="option-desc">Vegetable omelet + whole-grain toast</div>
          </div>
          <div class="option-card" style="cursor: default;">
            <div class="option-title">Option 5</div>
            <div class="option-desc">Oats + banana + nuts/seeds</div>
          </div>
        </div>

        <h2 style="margin-top: 2rem;">Healthy Lunch Ideas</h2>
        <ul>
          <li>Chicken + rice + vegetables</li>
          <li>Fish + potatoes + salad</li>
          <li>Lentils + whole-grain bread + vegetables (Vegetarian)</li>
          <li>Beans + rice + vegetables (Vegetarian)</li>
          <li>Tofu + rice + mixed vegetables (Vegan)</li>
          <li>Chicken wrap + salad + fruit</li>
        </ul>

        <h2>Healthy Dinner Ideas</h2>
        <ul>
          <li>Fish + potatoes + vegetables</li>
          <li>Chicken + brown rice + vegetables</li>
          <li>Lentils + rice + salad</li>
          <li>Beans + whole grains + vegetables</li>
          <li>Tofu + vegetables + rice</li>
        </ul>

        <h2>Healthy Snack Ideas</h2>
        <p>Snacks are optional and depend on individual hunger, your schedule, and your calorie needs.</p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
          <span class="hero-badge" style="background: var(--bg-tertiary);">Fruit</span>
          <span class="hero-badge" style="background: var(--bg-tertiary);">Yogurt</span>
          <span class="hero-badge" style="background: var(--bg-tertiary);">Nuts</span>
          <span class="hero-badge" style="background: var(--bg-tertiary);">Seeds</span>
          <span class="hero-badge" style="background: var(--bg-tertiary);">Boiled eggs</span>
          <span class="hero-badge" style="background: var(--bg-tertiary);">Vegetables with hummus</span>
          <span class="hero-badge" style="background: var(--bg-tertiary);">Whole-grain toast</span>
          <span class="hero-badge" style="background: var(--bg-tertiary);">Fruit with yogurt</span>
        </div>

        <h2>Daily Healthy Eating Checklist</h2>
        <div class="glass-card" style="margin-bottom: 2rem;">
          <p style="margin-top: 0;"><strong>Your daily nutrition checklist:</strong> (Check off items as you go)</p>
          <div id="interactive-checklist" style="display: grid; gap: 0.75rem;">
            <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer; user-select: none;">
              <input type="checkbox" style="width: 20px; height: 20px; cursor: pointer;">
              <span>Protein source</span>
            </label>
            <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer; user-select: none;">
              <input type="checkbox" style="width: 20px; height: 20px; cursor: pointer;">
              <span>Vegetables</span>
            </label>
            <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer; user-select: none;">
              <input type="checkbox" style="width: 20px; height: 20px; cursor: pointer;">
              <span>Fruit</span>
            </label>
            <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer; user-select: none;">
              <input type="checkbox" style="width: 20px; height: 20px; cursor: pointer;">
              <span>Whole grains or other carbohydrate source</span>
            </label>
            <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer; user-select: none;">
              <input type="checkbox" style="width: 20px; height: 20px; cursor: pointer;">
              <span>Healthy fats</span>
            </label>
            <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer; user-select: none;">
              <input type="checkbox" style="width: 20px; height: 20px; cursor: pointer;">
              <span>Fiber-rich foods</span>
            </label>
            <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer; user-select: none;">
              <input type="checkbox" style="width: 20px; height: 20px; cursor: pointer;">
              <span>Water</span>
            </label>
            <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer; user-select: none;">
              <input type="checkbox" style="width: 20px; height: 20px; cursor: pointer;">
              <span>Physical activity</span>
            </label>
            <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer; user-select: none;">
              <input type="checkbox" style="width: 20px; height: 20px; cursor: pointer;">
              <span>Adequate sleep</span>
            </label>
          </div>
          <p style="margin: 1rem 0 0; font-size: 0.85rem; color: var(--text-muted);"><em>Note: Missing one item does not mean your diet is unhealthy. This is for general self-tracking, not a medical score.</em></p>
        </div>

        <h2>Build Your Daily Diet Plan</h2>
        <div class="glass-card" style="margin-bottom: 2rem;">
          <div class="extras-form-grid" style="grid-template-columns: 1fr 1fr;">
            <div class="form-group">
              <label class="form-label">Goal</label>
              <select id="builder-goal" class="select-field">
                <option value="loss">Weight loss</option>
                <option value="maintain" selected>Maintenance</option>
                <option value="gain">Weight gain</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Dietary Preference</label>
              <select id="builder-pref" class="select-field">
                <option value="none">No preference</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="high-protein">High-protein</option>
                <option value="mediterranean">Mediterranean-style</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Meals Frequency</label>
              <select id="builder-meals" class="select-field">
                <option value="3_snacks" selected>3 meals + snacks</option>
                <option value="2">2 meals</option>
                <option value="3">3 meals</option>
                <option value="4">4 meals</option>
                <option value="5">5 smaller meals</option>
              </select>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">These are organizational choices, not medical requirements.</div>
            </div>
            <div class="form-group">
              <label class="form-label">Estimated TDEE (kcal)</label>
              <input type="number" id="builder-tdee" class="input-field" placeholder="e.g. 2400">
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;"><a href="/" style="color: var(--accent-cyan); text-decoration: none;">Calculate TDEE</a></div>
            </div>
          </div>
          
          <button id="btn-generate-plan" class="btn-primary" style="margin-top: 1rem; width: 100%;">Generate Meal Plan Ideas</button>
          
          <div id="plan-error-msg" style="display: none; margin-top: 1rem; padding: 1rem; background: rgba(244,63,94,0.1); border-left: 4px solid var(--accent-rose); border-radius: 4px; color: #fff;">
            <strong>For a diet related to a medical condition, pregnancy, medication, or other specific health needs, consult a doctor or registered dietitian.</strong>
          </div>

          <div id="plan-result" style="display: none; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
            <h3 style="margin-top: 0; color: var(--accent-cyan);">Your Custom Meal Plan Framework</h3>
            <p style="margin: 0 0 1rem; font-size: 0.9rem; color: var(--text-muted);">Adjust portions of the foods below to meet your <span id="res-tdee-target" style="font-weight: bold; color: #fff;"></span> calorie target.</p>
            
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <div class="timeline-step">
                <h4 style="margin: 0; color: var(--text-main);">Breakfast Idea</h4>
                <p id="res-breakfast" style="margin: 0.25rem 0 0; color: var(--text-muted);"></p>
              </div>
              <div class="timeline-step">
                <h4 style="margin: 0; color: var(--text-main);">Lunch Idea</h4>
                <p id="res-lunch" style="margin: 0.25rem 0 0; color: var(--text-muted);"></p>
              </div>
              <div class="timeline-step">
                <h4 style="margin: 0; color: var(--text-main);">Dinner Idea</h4>
                <p id="res-dinner" style="margin: 0.25rem 0 0; color: var(--text-muted);"></p>
              </div>
              <div id="res-snack-container" class="timeline-step" style="display: none;">
                <h4 style="margin: 0; color: var(--text-main);">Snack Idea</h4>
                <p id="res-snack" style="margin: 0.25rem 0 0; color: var(--text-muted);"></p>
              </div>
            </div>

            <div style="margin-top: 2rem; padding: 1rem; background: var(--bg-tertiary); border-radius: 8px;">
              <h4 style="margin-top: 0; margin-bottom: 0.75rem;">Suggested Food Options for Your Preference:</h4>
              <p style="margin: 0 0 0.5rem;"><strong>Protein:</strong> <span id="res-proteins" style="color: var(--text-muted);"></span></p>
              <p style="margin: 0 0 0.5rem;"><strong>Vegetables:</strong> <span id="res-vegs" style="color: var(--text-muted);"></span></p>
              <p style="margin: 0;"><strong>Fruits:</strong> <span id="res-fruits" style="color: var(--text-muted);"></span></p>
            </div>
            
            <div style="margin-top: 1.5rem;">
              <h4 style="margin: 0 0 0.75rem;">Example Calorie Distribution</h4>
              <p style="margin: 0 0 0.5rem; font-size: 0.9rem; color: var(--text-muted);"><strong>These percentages are examples, not requirements.</strong></p>
              <div id="res-distribution" style="font-size: 0.95rem;"></div>
            </div>
          </div>
        </div>

        <h2>Plan Your Meals Around Your Macros</h2>
        <p>Understanding your macronutrient distribution can help structure meals:</p>
        <ul>
          <li><strong>Protein:</strong> Essential for muscle retention and satiety.</li>
          <li><strong>Carbohydrates:</strong> Primary energy source, includes fiber.</li>
          <li><strong>Fat:</strong> Essential for hormone function and nutrient absorption.</li>
        </ul>
        <div style="margin-bottom: 2rem;">
          <a href="/macro-calculator/" class="btn-primary" style="display: inline-block;">Calculate My Macros</a>
        </div>

        <h2>Understanding Portions</h2>
        <p>Portion needs vary based on energy needs and individual circumstances. Avoid strict "hand-size" or "plate-size" rules that claim to work perfectly for every person, but visual estimates can be a helpful starting point.</p>
        <ul>
          <li>A protein portion</li>
          <li>A carbohydrate portion</li>
          <li>A vegetable portion</li>
          <li>A fruit portion</li>
          <li>A fat portion</li>
        </ul>

        <h2>Hydration Throughout the Day</h2>
        <p>Drink water regularly and choose water instead of sugary beverages when appropriate. Hydration needs vary; activity and environmental conditions directly affect fluid needs. There is no single identical number of liters every person must drink.</p>

        <h2>Foods to Include in a Healthy Daily Diet</h2>
        <p>Evidence-based guidelines suggest prioritizing:</p>
        <ul>
          <li>Vegetables and fruits</li>
          <li>Whole grains and legumes</li>
          <li>Lean or plant-based protein sources</li>
          <li>Nuts, seeds, and healthy fats</li>
          <li>Suitable dairy or fortified alternatives</li>
        </ul>

        <h2>Foods and Drinks to Limit</h2>
        <p>You do not need to completely eliminate individual foods, but it is wise to limit:</p>
        <ul>
          <li>Sugary drinks and foods high in added sugar</li>
          <li>Excessive sodium</li>
          <li>Foods high in saturated fat</li>
          <li>Highly processed foods</li>
          <li>Frequent high-calorie snacks</li>
          <li>Excessive alcohol where relevant</li>
        </ul>

        <h2>One-Day Example Table</h2>
        <div class="table-responsive" style="margin-bottom: 2rem;">
          <table class="styled-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Meal</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Morning</strong></td>
                <td>Breakfast</td>
                <td>Eggs + oats + fruit</td>
              </tr>
              <tr>
                <td><strong>Mid-morning</strong></td>
                <td>Snack</td>
                <td>Yogurt + fruit</td>
              </tr>
              <tr>
                <td><strong>Afternoon</strong></td>
                <td>Lunch</td>
                <td>Chicken + rice + vegetables</td>
              </tr>
              <tr>
                <td><strong>Evening</strong></td>
                <td>Snack</td>
                <td>Nuts + fruit</td>
              </tr>
              <tr>
                <td><strong>Night</strong></td>
                <td>Dinner</td>
                <td>Fish/beans + potatoes + vegetables</td>
              </tr>
            </tbody>
          </table>
          <p style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-muted);"><strong>This is a general example and should be adjusted according to individual energy needs and preferences.</strong></p>
        </div>

        <h2>How to Plan Your Meals for the Week</h2>
        <ol>
          <li>Choose several protein sources.</li>
          <li>Select vegetables and fruits.</li>
          <li>Choose carbohydrate sources and healthy fats.</li>
          <li>Prepare some foods in advance.</li>
          <li>Create flexible meal combinations rather than rigid structures.</li>
          <li>Keep convenient healthy options available.</li>
        </ol>

        <h2>Simple Meal Prep Tips</h2>
        <p>Meal prep doesn't require an overly complicated system:</p>
        <ul>
          <li>Cook grains (like rice or quinoa) in batches.</li>
          <li>Prepare vegetables and protein sources ahead of time.</li>
          <li>Portion snacks and keep fruit visible.</li>
          <li>Prepare simple breakfasts (like overnight oats).</li>
          <li>Use leftovers safely and keep meals flexible.</li>
        </ul>

        <h2>Healthy Eating on a Budget</h2>
        <p>Healthy eating does not always require expensive foods. Affordable staples include:</p>
        <ul>
          <li>Oats, rice, potatoes, and whole grains</li>
          <li>Eggs, beans, and lentils</li>
          <li>Seasonal vegetables and fruits</li>
          <li>Canned/frozen vegetables (where appropriate)</li>
          <li>Yogurt</li>
        </ul>

        <h2>Daily Diet Plans for Different Preferences</h2>
        <p>There are many ways to eat well. Whether you prefer a vegetarian, vegan, high-protein, Mediterranean-style, or no specific dietary preference, adapt your meals to your lifestyle. No single preference is medically superior for everyone. For highly restrictive diets, consider checking nutritional adequacy with a qualified professional.</p>

        <h2>Simple Daily Diet Plan for Beginners</h2>
        <div class="worked-example-card" style="margin-bottom: 2rem;">
          <p class="calc-step-line"><strong>Breakfast:</strong> Protein + whole grain + fruit</p>
          <p class="calc-step-line"><strong>Lunch:</strong> Protein + vegetables + carbohydrate</p>
          <p class="calc-step-line"><strong>Snack:</strong> Fruit + yogurt/nuts</p>
          <p class="calc-step-line"><strong>Dinner:</strong> Protein + vegetables + carbohydrate</p>
          <p class="calc-step-line"><strong>Drinks:</strong> Mostly water and suitable unsweetened beverages</p>
          <p style="margin-top: 1rem; font-size: 0.85rem; color: var(--text-muted);">Modify this basic framework according to your preferences and calorie needs.</p>
        </div>

        <h2>Common Daily Diet Plan Mistakes</h2>
        <ol>
          <li>Making the plan too restrictive.</li>
          <li>Eating too little.</li>
          <li>Ignoring protein, vegetables, or fiber.</li>
          <li>Drinking too many sugary drinks.</li>
          <li>Following someone else's exact calorie plan.</li>
          <li>Making every meal complicated.</li>
          <li>Expecting perfect consistency.</li>
          <li>Changing the plan too frequently.</li>
        </ol>

        <div class="glass-card" style="margin: 2rem 0; padding: 1.5rem; text-align: center; border: 1px solid var(--accent-purple);">
          <h3 style="margin-top: 0;">Explore Our Calculators</h3>
          <p><strong>Not sure how many calories you need?</strong> <br><a href="/" style="color: var(--accent-cyan); font-weight: bold;">&rarr; Calculate Your TDEE</a></p>
          <p><strong>Want to create a weight-loss target?</strong> <br><a href="/calorie-deficit-calculator/" style="color: var(--accent-cyan); font-weight: bold;">&rarr; Calculate Your Calorie Deficit</a></p>
          <p><strong>Want to understand your macros?</strong> <br><a href="/macro-calculator/" style="color: var(--accent-cyan); font-weight: bold;">&rarr; Calculate Your Macros</a></p>
          <p style="margin-bottom: 0;"><strong>Want to estimate maintenance?</strong> <br><a href="/maintenance-calorie-calculator/" style="color: var(--accent-cyan); font-weight: bold;">&rarr; Calculate Maintenance Calories</a></p>
        </div>

        <h2>Frequently Asked Questions</h2>
        <div class="faq-container">
          <div class="faq-item">
            <h3 class="faq-question">What should I eat in a day to stay healthy?</h3>
            <p>Focus on a balance of protein, vegetables, fruits, whole grains, and healthy fats. Stay hydrated with water and limit highly processed foods and sugary drinks.</p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">What is a healthy daily diet plan?</h3>
            <p>A healthy plan is one that meets your energy needs, provides essential nutrients, aligns with your preferences, and is sustainable long-term without feeling overly restrictive.</p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">How many meals should I eat per day?</h3>
            <p>Meal frequency is highly personal. Whether you eat 2, 3, 4, or 5 meals a day, total daily calorie and nutrient intake matters most.</p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">Can I create a daily diet plan using my TDEE?</h3>
            <p>Yes. Your TDEE provides a strong baseline estimate to help you structure your daily calorie targets for loss, maintenance, or gain.</p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">What should I eat for breakfast?</h3>
            <p>A mix of protein and complex carbohydrates, such as eggs and oatmeal, or Greek yogurt with berries, provides lasting energy.</p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">What should I eat for lunch?</h3>
            <p>Aim for lean protein, vegetables, and complex carbs—like a chicken salad, or lentils with rice and vegetables.</p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">What should I eat for dinner?</h3>
            <p>A balanced plate of protein, vegetables, and carbohydrates—like baked fish or beans with potatoes and a side salad.</p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">What are healthy snacks?</h3>
            <p>Fruit, nuts, seeds, yogurt, and vegetables with hummus are all excellent, nutrient-dense snack choices.</p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">Can I use a daily diet plan for weight loss?</h3>
            <p>Yes. Simply adjust portion sizes to create a moderate calorie deficit based on your TDEE, ensuring you maintain adequate protein and fiber.</p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">Can I create a diet plan for weight gain?</h3>
            <p>Yes. Focus on a moderate calorie surplus using nutrient-dense foods (healthy fats, extra protein, and complex carbs) rather than relying strictly on junk food.</p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">How do I create a calorie-based meal plan?</h3>
            <p>Calculate your TDEE, decide on your calorie goal, and divide those calories across your preferred number of daily meals.</p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">Do I need to follow the same meal plan every day?</h3>
            <p>No. Variety is beneficial for nutrient intake and prevents diet fatigue. Mix and match different proteins, vegetables, and carbs based on the same flexible structure.</p>
          </div>
        </div>

        <h2>Build a Daily Diet Plan Around Your Needs</h2>
        <p>Your daily meals should fit your energy needs, preferences, schedule, and goals. Start by estimating your TDEE, then use that information to create a practical eating plan that works for you.</p>
        <div style="margin-top: 1.5rem; margin-bottom: 2rem;">
          <a href="/" class="btn-primary" style="display: inline-block;">Calculate My TDEE</a>
        </div>

        <div class="calculator-disclaimer" style="margin-top: 2rem; padding: 1.5rem; background: var(--bg-tertiary); border-left: 4px solid var(--accent-rose); border-radius: 8px; font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">
          <strong>Disclaimer:</strong> This website provides general educational information about healthy eating, calories, TDEE, meal planning, and nutrition. It is not medical advice and does not diagnose, treat, or prevent any disease. Example meal plans are not personalized medical diets. Your calorie and nutrition needs can vary based on your health, activity level, age, medications, and other individual factors. Consult a qualified healthcare professional or registered dietitian for personalized nutrition advice.
        </div>

        <script>
          document.addEventListener('DOMContentLoaded', function() {
            // Pre-fill TDEE from localStorage if available
            var savedTdee = localStorage.getItem('tdee_last_result');
            var tdeeInput = document.getElementById('builder-tdee');
            if (savedTdee && tdeeInput) {
              tdeeInput.value = parseFloat(savedTdee).toFixed(0);
            }

            var btnPlan = document.getElementById('btn-generate-plan');
            if (btnPlan) {
              btnPlan.addEventListener('click', function() {
                var goal = document.getElementById('builder-goal').value;
                var pref = document.getElementById('builder-pref').value;
                var meals = document.getElementById('builder-meals').value;
                var tdeeVal = parseInt(document.getElementById('builder-tdee').value, 10);
                
                var errorMsg = document.getElementById('plan-error-msg');
                var resultBlock = document.getElementById('plan-result');
                
                errorMsg.style.display = 'none';
                
                // Extremely low calorie check trigger Safety warning
                if (tdeeVal && ( (goal === 'loss' && tdeeVal < 1400) || tdeeVal < 1000 )) {
                   errorMsg.style.display = 'block';
                   resultBlock.style.display = 'none';
                   return;
                }
                
                var targetStr = "Maintenance";
                if (tdeeVal && !isNaN(tdeeVal)) {
                  if (goal === 'loss') targetStr = "~" + (tdeeVal - 500) + " (Deficit)";
                  else if (goal === 'gain') targetStr = "~" + (tdeeVal + 300) + " (Surplus)";
                  else targetStr = "~" + tdeeVal + " (Maintenance)";
                } else {
                  if (goal === 'loss') targetStr = "Deficit";
                  else if (goal === 'gain') targetStr = "Surplus";
                }
                document.getElementById('res-tdee-target').textContent = targetStr;
                
                var bIdea = "Eggs, whole-grain toast, and a piece of fruit.";
                var lIdea = "Chicken breast, brown rice, and steamed broccoli.";
                var dIdea = "Baked fish, roasted potatoes, and a mixed side salad.";
                var sIdea = "Greek yogurt with mixed berries and a handful of almonds.";
                
                var proteins = "Chicken, turkey, fish, eggs, greek yogurt, lean beef.";
                var vegs = "Spinach, broccoli, carrots, bell peppers, tomatoes.";
                var fruits = "Apples, bananas, berries, oranges, melon.";
                
                if (pref === 'vegetarian') {
                  bIdea = "Oatmeal with greek yogurt, chia seeds, and berries.";
                  lIdea = "Lentil soup with whole-grain bread and a side salad.";
                  dIdea = "Black bean and cheese burrito with a large side of mixed vegetables.";
                  sIdea = "Cottage cheese with pineapple chunks or mixed nuts.";
                  proteins = "Eggs, dairy, beans, lentils, tofu, tempeh, edamame.";
                } else if (pref === 'vegan') {
                  bIdea = "Oatmeal made with soy milk, topped with walnuts and sliced banana.";
                  lIdea = "Quinoa bowl with chickpeas, roasted sweet potato, and tahini dressing.";
                  dIdea = "Tofu stir-fry with brown rice, snap peas, carrots, and broccoli.";
                  sIdea = "Apple slices with peanut butter or a handful of mixed nuts.";
                  proteins = "Tofu, tempeh, lentils, chickpeas, black beans, seitan.";
                } else if (pref === 'high-protein') {
                  bIdea = "High-protein egg white and whole egg scramble, turkey bacon, and berries.";
                  lIdea = "Large chicken breast salad with quinoa and vinaigrette.";
                  dIdea = "Lean steak or salmon with roasted asparagus and a baked potato.";
                  sIdea = "Protein shake or Greek yogurt with protein powder mixed in.";
                } else if (pref === 'mediterranean') {
                  bIdea = "Whole-grain toast with smashed avocado, a poached egg, and tomato slices.";
                  lIdea = "Greek salad with cucumbers, tomatoes, feta, olives, and grilled chicken.";
                  dIdea = "Baked salmon with quinoa, zucchini, and a drizzle of olive oil.";
                  sIdea = "Hummus with carrot sticks and cucumber rounds.";
                  proteins = "Fish, seafood, poultry, eggs, dairy in moderation, legumes.";
                  vegs = "Leafy greens, tomatoes, cucumbers, eggplant, zucchini.";
                }
                
                document.getElementById('res-breakfast').textContent = bIdea;
                document.getElementById('res-lunch').textContent = lIdea;
                document.getElementById('res-dinner').textContent = dIdea;
                
                var snackContainer = document.getElementById('res-snack-container');
                var distribution = document.getElementById('res-distribution');
                
                if (meals === '3_snacks') {
                  document.getElementById('res-snack').textContent = sIdea;
                  snackContainer.style.display = 'block';
                  distribution.innerHTML = "Breakfast: 25% | Lunch: 30% | Snack: 10% | Dinner: 35%";
                } else if (meals === '2') {
                  snackContainer.style.display = 'none';
                  distribution.innerHTML = "Meal 1 (Late Breakfast/Lunch): 45% | Meal 2 (Dinner): 55%";
                } else if (meals === '3') {
                  snackContainer.style.display = 'none';
                  distribution.innerHTML = "Breakfast: 30% | Lunch: 35% | Dinner: 35%";
                } else if (meals === '4') {
                  document.getElementById('res-snack').textContent = sIdea;
                  snackContainer.style.display = 'block';
                  distribution.innerHTML = "Breakfast: 25% | Lunch: 25% | Afternoon Meal: 25% | Dinner: 25%";
                } else if (meals === '5') {
                  document.getElementById('res-snack').textContent = sIdea;
                  snackContainer.style.display = 'block';
                  distribution.innerHTML = "Meal 1: 20% | Meal 2: 20% | Meal 3: 20% | Meal 4: 20% | Meal 5: 20%";
                }
                
                document.getElementById('res-proteins').textContent = proteins;
                document.getElementById('res-vegs').textContent = vegs;
                document.getElementById('res-fruits').textContent = fruits;

                resultBlock.style.display = 'block';
              });
            }
          });
        </script>
      \`
    }
`;

const contentPath = path.join(__dirname, 'js', 'content.js');
let fileContent = fs.readFileSync(contentPath, 'utf8');

// Insert the new route right before the final closing braces `  }\n};`
const insertionPoint = fileContent.lastIndexOf('  }\n};');
if (insertionPoint !== -1) {
  fileContent = fileContent.slice(0, insertionPoint) + newRoute + fileContent.slice(insertionPoint);
  fs.writeFileSync(contentPath, fileContent, 'utf8');
  console.log('Successfully appended /daily-diet-plan/ route to content.js');
} else {
  console.error('Could not find insertion point in content.js');
}
