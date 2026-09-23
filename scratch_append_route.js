const fs = require('fs');
const path = require('path');

const newRoute = `
    ,
    '/diet-advice/': {
      title: 'Diet Advice for Healthy Weight Management | TDEE Calculator',
      metaDescription: 'Get practical diet advice for healthy weight management, including TDEE, calories, protein, balanced meals, food choices, weight loss and weight gain guidance.',
      category: 'Diet & Nutrition',
      h1: 'Diet Advice for Healthy Weight Management',
      content: \`
        <p class="lead-paragraph">TDEE estimates how much energy a person may use each day, while the food you eat provides the energy and nutrients required to fuel that expenditure.</p>
        <p>You can use your TDEE as a valuable starting point when thinking about calorie intake, while recognizing that actual metabolic needs vary from person to person.</p>
        
        <div style="margin: 2rem 0; display: flex; gap: 1rem; flex-wrap: wrap;">
          <a href="/" class="btn-primary" style="flex: 1; text-align: center; white-space: nowrap;">Calculate My TDEE</a>
          <a href="/calorie-deficit-calculator/" class="btn-secondary" style="flex: 1; text-align: center; white-space: nowrap;">Calculate My Calorie Deficit</a>
        </div>

        <div id="tdee-integration-block" style="display: none; background: var(--bg-tertiary); border-left: 4px solid var(--accent-cyan); padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
          <h3 style="margin-top: 0; margin-bottom: 0.5rem;">Your Estimated TDEE</h3>
          <div style="font-size: 2.2rem; font-weight: 900; color: var(--accent-cyan); margin-bottom: 0.5rem;"><span id="tdee-integration-val"></span> kcal/day</div>
          <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted);">Use this <strong>starting calorie estimate</strong> as a baseline for your diet planning.</p>
        </div>

        <h2>How TDEE Affects Your Diet</h2>
        <p><strong>TDEE = estimated daily energy expenditure.</strong> It represents the total calories your body burns in a day.</p>
        <ul>
          <li><strong>Eating around maintenance needs</strong> &rarr; your weight may remain relatively stable over time.</li>
          <li><strong>Eating below energy needs</strong> &rarr; your weight may decrease over time.</li>
          <li><strong>Eating above energy needs</strong> &rarr; your weight may increase over time.</li>
        </ul>
        <div class="takeaway-callout-box">
          <p><strong>Important:</strong> Make it clear that TDEE is an estimate. Do not claim that a calculated number is your exact metabolic requirement.</p>
        </div>

        <h2>Goal-Based Diet Advice</h2>
        
        <div class="about-calculator-card">
          <h3>Weight Loss</h3>
          <p>Losing weight requires a calorie deficit. Focus on nutrient-dense foods, adequate protein, vegetables, fruits, and fiber. Maintaining portion awareness, engaging in physical activity, prioritizing sleep, and practicing consistency are key.</p>
          <p>Avoid crash diets or extreme calorie restriction. Gradual weight loss (about 1&ndash;2 pounds per week) is generally more sustainable and likely to be maintained than faster loss.</p>
          <p style="font-size: 0.85rem; color: var(--text-muted);"><a href="https://www.cdc.gov/healthy-weight-growth/losing-weight/index.html" target="_blank" rel="noopener">CDC Guidance on Losing Weight</a></p>
        </div>

        <div class="about-calculator-card">
          <h3>Weight Maintenance</h3>
          <p>To maintain your weight, focus on eating around your actual maintenance needs. Build balanced meals with adequate protein and fiber-rich foods. Maintain regular physical activity, consistent habits, and monitor your long-term trends.</p>
          <p>Remember that your TDEE is only a starting estimate and your maintenance needs may shift over time.</p>
        </div>

        <div class="about-calculator-card">
          <h3>Weight Gain</h3>
          <p>Healthy weight gain requires a moderate calorie surplus. Focus on nutrient-dense foods providing adequate protein, carbohydrates, and healthy fats. Combine this with resistance training where appropriate for gradual progress.</p>
          <p>Do not encourage excessive junk food; focus on quality nutrients.</p>
        </div>

        <h2>What Is a Healthy Diet?</h2>
        <p>Healthy eating involves variety, balance, and adequate nutrients. A healthy pattern covers vegetables, fruits, whole grains, protein foods, healthy fats, dairy (or suitable alternatives), fiber, and water.</p>
        <p>Current evidence-based guidance highlights these elements while recommending limits on added sugars, sodium, saturated fats, and highly processed foods.</p>
        <p style="font-size: 0.85rem; color: var(--text-muted);"><a href="https://www.cdc.gov/healthy-weight-growth/healthy-eating/index.html" target="_blank" rel="noopener">CDC Guidance on Healthy Eating</a></p>

        <div class="table-responsive">
          <table class="styled-table">
            <thead>
              <tr>
                <th>Food Group</th>
                <th>Examples</th>
                <th>Main Benefits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Protein</strong></td>
                <td>Eggs, chicken, fish, beans, lentils, yogurt</td>
                <td>Protein and satiety</td>
              </tr>
              <tr>
                <td><strong>Vegetables</strong></td>
                <td>Spinach, broccoli, carrots, peppers</td>
                <td>Fiber and micronutrients</td>
              </tr>
              <tr>
                <td><strong>Fruits</strong></td>
                <td>Apples, oranges, berries, bananas</td>
                <td>Fiber and micronutrients</td>
              </tr>
              <tr>
                <td><strong>Whole grains</strong></td>
                <td>Oats, brown rice, whole-grain bread</td>
                <td>Carbohydrates and fiber</td>
              </tr>
              <tr>
                <td><strong>Healthy fats</strong></td>
                <td>Nuts, seeds, olive oil, avocado</td>
                <td>Energy and essential fats</td>
              </tr>
              <tr>
                <td><strong>Dairy/alternatives</strong></td>
                <td>Milk, yogurt, fortified alternatives</td>
                <td>Protein and nutrients</td>
              </tr>
              <tr>
                <td><strong>Water</strong></td>
                <td>Water and unsweetened drinks</td>
                <td>Hydration</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Foods and Drinks to Limit</h2>
        <p>An overall dietary pattern is what matters. You do not need to completely eliminate every less-nutritious food, but it is wise to limit:</p>
        <ul>
          <li>Sugar-sweetened beverages</li>
          <li>Foods high in added sugar</li>
          <li>Excessive sodium</li>
          <li>Foods high in saturated fat</li>
          <li>Highly processed foods</li>
          <li>Frequent high-calorie snacks</li>
          <li>Excessive alcohol (where relevant)</li>
        </ul>

        <h2>Build a Balanced Meal</h2>
        <div class="glass-card" style="padding: 1.5rem; margin-bottom: 2rem;">
          <div class="extras-form-grid" style="grid-template-columns: 1fr 1fr;">
            <div class="form-group">
              <label class="form-label">Protein</label>
              <select id="meal-protein" class="select-field">
                <option value="Chicken">Chicken</option>
                <option value="Eggs">Eggs</option>
                <option value="Fish">Fish</option>
                <option value="Beans">Beans</option>
                <option value="Lentils">Lentils</option>
                <option value="Tofu">Tofu</option>
                <option value="Yogurt">Yogurt</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Carbohydrate</label>
              <select id="meal-carb" class="select-field">
                <option value="Rice">Rice</option>
                <option value="Oats">Oats</option>
                <option value="Potatoes">Potatoes</option>
                <option value="Whole-grain bread">Whole-grain bread</option>
                <option value="Whole-grain pasta">Whole-grain pasta</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Vegetables</label>
              <select id="meal-veg" class="select-field">
                <option value="Broccoli">Broccoli</option>
                <option value="Spinach">Spinach</option>
                <option value="Carrots">Carrots</option>
                <option value="Peppers">Peppers</option>
                <option value="Mixed vegetables">Mixed vegetables</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Fruit (Optional)</label>
              <select id="meal-fruit" class="select-field">
                <option value="None">None</option>
                <option value="Apple">Apple</option>
                <option value="Banana">Banana</option>
                <option value="Orange">Orange</option>
                <option value="Berries">Berries</option>
              </select>
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
              <label class="form-label">Healthy Fat</label>
              <select id="meal-fat" class="select-field">
                <option value="Olive oil">Olive oil</option>
                <option value="Nuts">Nuts</option>
                <option value="Seeds">Seeds</option>
                <option value="Avocado">Avocado</option>
              </select>
            </div>
          </div>
          <button id="btn-build-meal" class="btn-primary" style="margin-top: 1rem; width: 100%;">Generate Meal Idea</button>
          
          <div id="meal-idea-result" style="display: none; margin-top: 1.5rem; padding: 1rem; background: var(--bg-primary); border-radius: 8px; border: 1px solid var(--border-color);">
            <h4 style="margin-top: 0; color: var(--accent-cyan);">Your Balanced Meal Idea:</h4>
            <p id="meal-idea-text" style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem;"></p>
            <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);"><em>Note: This is a general meal idea, not a medical diet plan.</em></p>
          </div>
        </div>

        <h2>Example Day of Balanced Eating</h2>
        <div class="worked-example-card">
          <p class="calc-step-line"><strong>Breakfast:</strong> Eggs + whole-grain toast + fruit</p>
          <p class="calc-step-line"><strong>Lunch:</strong> Chicken + rice + vegetables</p>
          <p class="calc-step-line"><strong>Snack:</strong> Greek yogurt + fruit + nuts</p>
          <p class="calc-step-line"><strong>Dinner:</strong> Fish or beans + potatoes/whole grains + vegetables</p>
          <div style="margin-top: 1rem; padding: 0.5rem; background: rgba(239, 35, 60, 0.1); border-radius: 4px; border-left: 3px solid var(--accent-rose);">
            <p style="margin: 0; font-size: 0.85rem; color: var(--text-main);"><strong>Example only — this is not a personalized medical diet plan.</strong></p>
          </div>
        </div>

        <h2>Understanding Protein, Carbohydrates and Fats</h2>
        <p>Individual macro needs vary. Use our <a href="/macro-calculator/">Macro Calculator</a> to explore distributions.</p>
        <ul>
          <li><strong>Protein:</strong> Found in eggs, chicken, fish, dairy, beans, lentils, soy, nuts, and seeds.</li>
          <li><strong>Carbohydrates:</strong> Found in oats, rice, potatoes, fruit, vegetables, beans, and whole grains.</li>
          <li><strong>Fats:</strong> Found in olive oil, nuts, seeds, avocado, and fish.</li>
        </ul>

        <h2>Why Fiber Matters</h2>
        <p>Fiber-rich foods can support digestive health and may help with fullness. Great sources include vegetables, fruits, beans, lentils, whole grains, nuts, and seeds.</p>

        <h2>Water and Hydration</h2>
        <p>Drink water regularly, as it is an excellent replacement for sugary drinks. Remember that hydration needs differ per individual; your physical activity and environmental conditions directly affect your fluid needs. There is no single exact amount everyone must drink.</p>

        <h2>Common Diet Mistakes</h2>
        <ol>
          <li>Using an unrealistic calorie target</li>
          <li>Cutting calories too aggressively</li>
          <li>Ignoring protein</li>
          <li>Ignoring fiber</li>
          <li>Drinking many liquid calories</li>
          <li>Ignoring portion sizes</li>
          <li>Following extreme diets</li>
          <li>Expecting instant results</li>
          <li>Judging progress from one day's weight</li>
          <li>Changing too many habits at once</li>
        </ol>

        <h2>Diet and Physical Activity Work Together</h2>
        <p>Energy intake and physical activity both affect energy balance. The CDC recommends adults get at least <strong>150 minutes of moderate-intensity aerobic activity per week</strong> and <strong>muscle-strengthening activity on at least 2 days per week</strong>.</p>
        <p>You can estimate activity burn with our <a href="/calories-burned-calculator/">Calories Burned Calculator</a>.</p>
        <p style="font-size: 0.85rem; color: var(--text-muted);"><a href="https://www.cdc.gov/healthy-weight-growth/physical-activity/index.html" target="_blank" rel="noopener">CDC Guidance on Physical Activity</a></p>

        <h2>Sleep and Healthy Weight</h2>
        <p>Weight management is influenced by more than food alone. Sleep, physical activity, stress management, and consistent eating habits all play roles in your overall health and metabolic balance.</p>

        <h2>When Should You Talk to a Doctor or Dietitian?</h2>
        <p>Seek professional guidance if you:</p>
        <ul>
          <li>have diabetes, kidney disease, or heart disease</li>
          <li>are pregnant or breastfeeding</li>
          <li>take medications affecting appetite or weight</li>
          <li>have a history of an eating disorder</li>
          <li>have unexplained weight loss or weight gain</li>
          <li>have significant digestive symptoms</li>
          <li>need a therapeutic diet</li>
          <li>are unsure whether a calorie deficit is appropriate</li>
        </ul>
        <p>Consult a doctor, registered dietitian, or qualified healthcare professional for individualized advice.</p>

        <h2>Evidence-Based Diet Information</h2>
        <p>This information is gathered from established health authorities and scientific consensus. It is provided for general education.</p>

        <h2>Get General Diet Guidance</h2>
        <div class="glass-card" style="padding: 1.5rem; margin-bottom: 2rem;">
          <div class="extras-form-grid" style="grid-template-columns: 1fr 1fr;">
            <div class="form-group">
              <label class="form-label">Goal</label>
              <select id="guidance-goal" class="select-field">
                <option value="loss">Weight Loss</option>
                <option value="maintain">Weight Maintenance</option>
                <option value="gain">Weight Gain</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Dietary Preference</label>
              <select id="guidance-pref" class="select-field">
                <option value="none">No preference</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="high-protein">High-protein</option>
                <option value="mediterranean">Mediterranean-style</option>
              </select>
            </div>
          </div>
          <button id="btn-get-guidance" class="btn-primary" style="margin-top: 1rem; width: 100%;">Get General Guidance Overview</button>
          
          <div id="guidance-result" style="display: none; margin-top: 1.5rem; padding: 1rem; background: var(--bg-tertiary); border-radius: 8px;">
            <h3 style="margin-top: 0; color: var(--text-main);">Your Nutrition Overview</h3>
            <div id="guidance-tdee-display" style="display: none; font-size: 1.1rem; font-weight: bold; margin-bottom: 0.5rem; color: var(--accent-cyan);">Estimated TDEE: <span id="guidance-tdee-val"></span> kcal</div>
            <p><strong>Goal:</strong> <span id="guidance-goal-val"></span></p>
            <p><strong>General Calorie Direction:</strong> <span id="guidance-cal-dir"></span></p>
            <p><strong>Food Priorities:</strong> <span id="guidance-priorities"></span></p>
            <p><strong>Protein Examples:</strong> <span id="guidance-protein"></span></p>
            <p><strong>Fiber Examples:</strong> <span id="guidance-fiber"></span></p>
            <div style="margin-top: 1rem; padding: 0.5rem; background: rgba(239, 35, 60, 0.1); border-radius: 4px; border-left: 3px solid var(--accent-rose);">
              <p style="margin: 0; font-size: 0.85rem; color: var(--text-main);"><strong>General educational guidance &mdash; not personalized medical advice.</strong></p>
            </div>
          </div>
        </div>

        <h2>Frequently Asked Questions</h2>
        <div class="faq-container">
          <div class="faq-item">
            <h3 class="faq-question">What is the best diet for weight loss?</h3>
            <p>There is no single "best" diet. The most effective diet is one that creates a sustainable calorie deficit while providing adequate protein, nutrients, and foods you actually enjoy eating long-term.</p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">How many calories should I eat based on my TDEE?</h3>
            <p>To lose weight, you generally eat fewer calories than your TDEE (e.g., a 15-20% deficit). To maintain, you eat around your TDEE. To gain, you eat in a moderate surplus (e.g., 10-15% above TDEE).</p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">Can I use TDEE to plan my diet?</h3>
            <p>Yes, your TDEE is an excellent starting point for estimating how much food your body needs daily.</p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">What should I eat to lose weight?</h3>
            <p>Prioritize nutrient-dense foods like lean proteins, vegetables, fruits, and whole grains. They help keep you full and satisfied while eating in a calorie deficit.</p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">What foods are high in protein?</h3>
            <p>Excellent sources include poultry, fish, eggs, dairy, beans, lentils, tofu, and lean meats.</p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">How can I build a balanced meal?</h3>
            <p>A good rule of thumb is filling half your plate with vegetables or fruits, a quarter with lean protein, and a quarter with complex carbohydrates, adding a small amount of healthy fats.</p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">Should I completely avoid carbohydrates?</h3>
            <p>No, carbohydrates are your body's preferred energy source. Focus on high-quality complex carbohydrates like oats, quinoa, and sweet potatoes rather than highly processed sugars.</p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">How much of a calorie deficit should I use?</h3>
            <p>A moderate deficit of 300 to 500 calories below your TDEE is generally recommended for sustainable, gradual weight loss.</p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">Can I eat my favorite foods while losing weight?</h3>
            <p>Yes! No food is inherently "off-limits." Portion awareness and fitting your favorite foods into an overall balanced dietary pattern is completely fine.</p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">When should I talk to a doctor about my diet?</h3>
            <p>If you have medical conditions (like diabetes), take medications, are pregnant, or have a history of disordered eating, you should consult a professional.</p>
          </div>
        </div>

        <h2>Start With Your TDEE</h2>
        <p>Your calorie needs are a starting point. Calculate your TDEE, choose your goal, and use the result to better understand your daily energy needs.</p>
        <div style="margin-top: 1.5rem; margin-bottom: 3rem;">
          <a href="/" class="btn-primary" style="display: inline-block;">Calculate My TDEE</a>
        </div>

        <div class="calculator-disclaimer" style="margin-top: 2rem; padding: 1.5rem; background: var(--bg-tertiary); border-left: 4px solid var(--accent-rose); border-radius: 8px; font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">
          <strong>Disclaimer:</strong> This website provides general educational information about calories, TDEE, nutrition, and healthy eating. It is not medical advice and does not diagnose, treat, or prevent any disease. TDEE and calorie calculations are estimates and may not reflect your individual energy needs. Consult a qualified healthcare professional or registered dietitian for personalized nutrition advice, especially if you are pregnant, breastfeeding, taking medication, managing a medical condition, or have a history of an eating disorder.
        </div>

        <script>
          document.addEventListener('DOMContentLoaded', function() {
            // TDEE Integration
            var savedTdee = localStorage.getItem('tdee_last_result');
            if (savedTdee) {
              var tdeeBlock = document.getElementById('tdee-integration-block');
              var tdeeVal = document.getElementById('tdee-integration-val');
              if (tdeeBlock && tdeeVal) {
                tdeeVal.textContent = parseFloat(savedTdee).toLocaleString();
                tdeeBlock.style.display = 'block';
              }
            }

            // Meal Builder Logic
            var btnMeal = document.getElementById('btn-build-meal');
            if (btnMeal) {
              btnMeal.addEventListener('click', function() {
                var p = document.getElementById('meal-protein').value;
                var c = document.getElementById('meal-carb').value;
                var v = document.getElementById('meal-veg').value;
                var f = document.getElementById('meal-fruit').value;
                var fat = document.getElementById('meal-fat').value;
                
                var mealStr = p + " with " + c + " and " + v + ", prepared with a touch of " + fat.toLowerCase();
                if (f !== 'None') mealStr += " and a side of " + f.toLowerCase();
                mealStr += ".";
                
                document.getElementById('meal-idea-text').textContent = mealStr;
                document.getElementById('meal-idea-result').style.display = 'block';
              });
            }

            // Guidance Tool Logic
            var btnGuide = document.getElementById('btn-get-guidance');
            if (btnGuide) {
              btnGuide.addEventListener('click', function() {
                var goal = document.getElementById('guidance-goal').value;
                var pref = document.getElementById('guidance-pref').value;
                
                var calDir = "Maintain your current TDEE estimate.";
                var goalLabel = "Weight Maintenance";
                if (goal === 'loss') {
                  calDir = "Eat slightly below your estimated TDEE (moderate deficit).";
                  goalLabel = "Weight Loss";
                } else if (goal === 'gain') {
                  calDir = "Eat slightly above your estimated TDEE (moderate surplus).";
                  goalLabel = "Weight Gain";
                }

                var proteinEx = "Chicken, Fish, Eggs, Greek Yogurt, Beans, Tofu";
                var fiberEx = "Mixed vegetables, whole grains, fruits";
                var priorities = "Focus on balance, adequate protein, and hydration.";

                if (pref === 'vegetarian') {
                  proteinEx = "Eggs, Greek Yogurt, Beans, Lentils, Tofu, Tempeh";
                  priorities = "Ensure diverse plant protein sources and B12 awareness.";
                } else if (pref === 'vegan') {
                  proteinEx = "Lentils, Black Beans, Tofu, Tempeh, Seitan, Edamame";
                  priorities = "Diverse plant proteins, fortified foods (B12/Iron/Calcium).";
                } else if (pref === 'high-protein') {
                  priorities = "High satiety meals, muscle retention support.";
                } else if (pref === 'mediterranean') {
                  proteinEx = "Fish, Seafood, Poultry, Legumes";
                  fiberEx = "Leafy greens, tomatoes, whole grains, nuts";
                  priorities = "Healthy fats (olive oil, avocado), lean proteins, whole foods.";
                }

                document.getElementById('guidance-goal-val').textContent = goalLabel;
                document.getElementById('guidance-cal-dir').textContent = calDir;
                document.getElementById('guidance-priorities').textContent = priorities;
                document.getElementById('guidance-protein').textContent = proteinEx;
                document.getElementById('guidance-fiber').textContent = fiberEx;
                
                var savedTdee = localStorage.getItem('tdee_last_result');
                if (savedTdee) {
                  document.getElementById('guidance-tdee-display').style.display = 'block';
                  document.getElementById('guidance-tdee-val').textContent = parseFloat(savedTdee).toLocaleString();
                }

                document.getElementById('guidance-result').style.display = 'block';
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
  console.log('Successfully appended /diet-advice/ route to content.js');
} else {
  console.error('Could not find insertion point in content.js');
}
