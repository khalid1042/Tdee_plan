const fs = require('fs');
const path = require('path');

const newContentHTML = `
        <p class="lead-paragraph">Finding reliable <strong>Diet Advice</strong> can feel harder than eating healthy. One source says to avoid carbs, another promotes high protein, while social media recommends a different diet every week. As a result, choosing what to eat can become confusing, especially when your goal is better health or weight management.</p>

        <p>A better approach is to build a balanced eating pattern around nutrient-dense foods, sensible portions, personal preferences, and your daily energy needs. The current Dietary Guidelines for Americans, 2025–2030, emphasize protein foods, dairy, vegetables, fruits, healthy fats, and whole grains while recommending less highly processed food, added sugar, excess sodium, and refined carbohydrates.</p>

        <h2>What Is Healthy Eating?</h2>
        <p>Healthy eating means regularly choosing different foods that provide the nutrients and energy your body needs. Therefore, it does not require a perfect menu or eliminating every food you enjoy.</p>
        <p>Instead, a healthy eating pattern can include vegetables, fruits, protein foods, whole grains, dairy or suitable alternatives, and healthy fats. Moreover, your choices can reflect your budget, culture, preferences, schedule, and individual needs.</p>

        <h2>The Fundamentals of Healthy Eating</h2>
        <p>A balanced diet starts with variety. Different foods provide different nutrients, so relying heavily on one food group can make it harder to meet your nutritional needs.</p>

        <h3>Protein Foods</h3>
        <p>Protein foods include eggs, fish, poultry, lean meats, beans, lentils, nuts, seeds, and soy foods. Including a protein source regularly can make meals more satisfying while helping you meet your nutritional needs.</p>

        <h3>Fiber-Rich Foods</h3>
        <p>Fiber is found in vegetables, fruits, whole grains, legumes, nuts, and seeds. It supports digestive health and can help you feel full.</p>
        <p>For example, choose oatmeal at breakfast, beans or lentils with meals, whole-grain bread, vegetables, or whole fruit as snacks.</p>

        <h3>Fruits and Vegetables</h3>
        <p>Try to include different types and colors of fruits and vegetables throughout the week. Fresh, frozen, and suitable canned options can all fit into a healthy eating pattern.</p>
        <p>Furthermore, whole fruit can provide fiber that many fruit drinks do not provide. Adding berries to oatmeal, spinach to eggs, or vegetables to sandwiches can make this habit easier.</p>

        <h3>Whole Grains</h3>
        <p>Whole grains can provide fiber and other nutrients. Oats, brown rice, whole-grain bread, and other whole-grain foods can fit into balanced meals.</p>

        <h2>The Facts on Fat</h2>
        <p>Dietary fat is not automatically unhealthy. Your body needs fat, and some foods provide essential fatty acids.</p>
        <p>Instead of treating every type of fat the same, focus on the overall quality of your food choices. Nuts, seeds, fish, avocado, and plant oils can provide unsaturated fats.</p>
        <p>Meanwhile, foods high in saturated fat should be limited within an overall healthy eating pattern. The goal is balance rather than labeling every food as simply "good" or "bad."</p>

        <h2>The Facts on Sugar</h2>
        <p>Total sugar and added sugar are different. Total sugars include naturally occurring sugars in foods such as fruit and milk. Added sugars are added during processing or preparation.</p>
        <p>Consequently, check the <strong>Added Sugars</strong> line when reading a Nutrition Facts label. The FDA lists 50 grams as the Daily Value for added sugars based on a 2,000-calorie diet.</p>
        <p>This does not mean every person should consume exactly 50 grams. Individual calorie needs differ, so use the Daily Value mainly as a label-reading reference.</p>

        <h2>A Healthy Eating Pattern</h2>
        <p>A practical meal can combine several food groups.</p>
        <div class="table-responsive" style="margin-bottom: 2rem;">
          <table class="styled-table">
            <thead>
              <tr>
                <th>Meal Component</th>
                <th>Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Protein</td>
                <td>Eggs, fish, chicken, beans, lentils</td>
              </tr>
              <tr>
                <td>Vegetables or fruit</td>
                <td>Broccoli, spinach, berries, oranges</td>
              </tr>
              <tr>
                <td>Whole grains or carbohydrates</td>
                <td>Oats, brown rice, potatoes, whole-grain bread</td>
              </tr>
              <tr>
                <td>Healthy fats</td>
                <td>Nuts, seeds, avocado, plant oils</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>This framework is flexible rather than a strict prescription. Therefore, portions and food choices can change according to your calorie needs, activity level, preferences, and goals.</p>

        <h2>Healthy Diets, Calories, and TDEE</h2>
        <p>Healthy food choices matter. However, calorie intake also matters because calories provide energy.</p>
        <p>Your daily energy needs can vary because of factors such as age, body size, sex, and physical activity. Consequently, two people can have different calorie needs even when they eat similar foods.</p>
        <p><strong>TDEE</strong>, or Total Daily Energy Expenditure, is an estimate of the energy your body uses during a typical day. It reflects resting energy needs, physical activity, and other energy expenditure.</p>
        <p>Therefore, a <a href="/" style="color: var(--accent-cyan); font-weight: bold; text-decoration: none;">TDEE calculator</a> can provide a useful starting estimate when your goal involves weight loss, weight maintenance, or weight gain. Nevertheless, the result is an estimate rather than a direct measurement of your metabolism.</p>

        <h2>Making the Switch to a Healthy Diet</h2>
        <p>Changing everything at once can make healthy eating difficult to maintain. Instead, begin with a few realistic changes.</p>
        <p>For example, add vegetables to one meal, include protein regularly, choose whole fruit for some snacks, drink water more often, and replace some refined grains with whole grains.</p>
        <p>Over time, repeated small changes can become normal habits. As a result, healthy eating becomes easier to maintain without following extreme rules.</p>

        <h2>Setting Yourself Up for Success</h2>
        <p>Planning can make healthy choices easier, especially when your schedule is busy.</p>
        <p>Before shopping, prepare a simple grocery list. Keep practical foods available, such as eggs, oats, beans, fruit, vegetables, yogurt, and whole grains.</p>
        <p>Frozen vegetables can also reduce preparation time. Likewise, simple meals such as eggs with whole-grain toast and fruit, yogurt with berries and nuts, or rice with beans and vegetables can provide convenient options.</p>

        <h2>Moderation: Important to Healthy Eating</h2>
        <p>Healthy eating does not require fear of individual foods. A dessert, favorite snack, or restaurant meal does not automatically ruin your overall eating pattern.</p>
        <p>Instead, consider how a food fits into your diet as a whole. This approach can make healthy habits more flexible and sustainable.</p>
        <p>The goal is not perfection. Rather, focus on what you do consistently.</p>

        <h2>It's Not Just What You Eat, but When You Eat</h2>
        <p>Meal timing can differ between people. Some prefer three larger meals, while others prefer smaller meals and snacks.</p>
        <p>Your schedule, hunger, activity, and preferences can all affect your eating routine. Therefore, avoid rigid meal-timing rules unless they are appropriate for your individual situation.</p>
        <p>Focus first on food quality, portions, overall energy intake, and consistency.</p>

        <h2>Add More Fruit and Vegetables to Your Diet</h2>
        <p>Increasing fruit and vegetable intake does not require complicated recipes.</p>
        <p>Try adding:</p>
        <ul>
          <li>Spinach to eggs</li>
          <li>Berries to oatmeal</li>
          <li>Vegetables to sandwiches</li>
          <li>Beans to salads</li>
          <li>Frozen vegetables to rice or pasta</li>
          <li>Fruit as a snack</li>
        </ul>
        <p>Additionally, using different colors can increase variety. Fresh, frozen, and suitable canned produce can all be useful choices.</p>

        <h3>How to Make Vegetables Tasty</h3>
        <p>Vegetables do not have to be plain. Try roasting, grilling, steaming, or sautéing them.</p>
        <p>Furthermore, herbs, spices, garlic, lemon, and other seasonings can improve flavor. Simple preparation can make vegetables easier to enjoy regularly.</p>

        <h2>Healthy Cooking</h2>
        <p>Cooking at home can make ingredients and portions easier to manage.</p>
        <p>Simple cooking methods include:</p>
        <ul>
          <li>Baking</li>
          <li>Roasting</li>
          <li>Grilling</li>
          <li>Steaming</li>
          <li>Sautéing</li>
        </ul>
        <p>Use a variety of vegetables, protein foods, whole grains, and healthy fats. At the same time, avoid relying heavily on ingredients that add excessive sodium, added sugar, or saturated fat.</p>

        <h2>Healthy Menus and Shopping Strategies</h2>
        <p>A simple grocery plan can prevent random food choices. Before shopping, decide which protein foods, vegetables, fruits, grains, and other foods you need.</p>
        <p>For a limited budget, compare prices, use seasonal produce, choose frozen vegetables when practical, and include affordable foods such as beans, lentils, oats, eggs, and whole grains.</p>
        <p>When buying packaged foods, use the Nutrition Facts label instead of relying only on marketing claims.</p>

        <h3>How to Read a Nutrition Facts Label</h3>
        <p>Start with the <strong>serving size</strong>. It tells you the amount used for the nutrition information on the label. However, it is not a recommendation for how much you should eat.</p>
        <p>Your <strong>portion size</strong> is the amount you actually choose to consume. One package can also contain multiple servings.</p>
        <p>Next, check:</p>
        <ul>
          <li>Calories</li>
          <li>Protein</li>
          <li>Dietary fiber</li>
          <li>Saturated fat</li>
          <li>Sodium</li>
          <li>Total sugars</li>
          <li>Added sugars</li>
        </ul>
        <p>The FDA considers 5% Daily Value or less to be low and 20% or more to be high for an individual nutrient.</p>

        <h2>Hydration and Healthy Eating</h2>
        <p>Water is an important part of a healthy lifestyle. Fluid needs can vary according to activity, environment, diet, and individual circumstances.</p>
        <p>Therefore, drink water regularly and pay attention to your body's signals, especially during physical activity or hot weather. There is no single fluid target that fits every person.</p>

        <h2>Eating Healthy When Busy</h2>
        <p>A busy schedule does not mean every meal needs to come from a restaurant.</p>
        <p>Keep simple ingredients available so you can prepare food quickly. Eggs, yogurt, oats, fruit, vegetables, beans, canned fish, and whole grains can support quick meals.</p>
        <p>For example, an egg and vegetable sandwich can work for breakfast, while rice, beans, and vegetables can make a simple lunch or dinner.</p>

        <h2>Eating Healthy at Restaurants</h2>
        <p>Restaurant meals can still fit into a balanced eating pattern.</p>
        <p>Check the menu before ordering when possible. Choose meals that include protein and vegetables, and consider grilled, baked, or steamed options when suitable.</p>
        <p>Portions can also be larger than what you normally eat. Therefore, eating slowly, sharing a meal, or saving part for later can help you manage the amount you consume.</p>

        <h2>What's a Fad Diet?</h2>
        <p>A fad diet usually promotes an extreme or restrictive approach and may promise unusually fast results.</p>
        <p>Be cautious when a diet:</p>
        <ul>
          <li>Promises dramatic results quickly</li>
          <li>Eliminates major food groups without a clear reason</li>
          <li>Promotes a "miracle" food</li>
          <li>Relies mainly on testimonials</li>
          <li>Uses one study as proof</li>
          <li>Requires expensive products or supplements</li>
        </ul>
        <p>Reliable nutrition advice should explain evidence, limitations, and individual differences.</p>

        <h2>Why Fad Diets Can Be a Problem</h2>
        <p>Highly restrictive diets can be difficult to maintain. They may also remove foods or food groups without considering a person's nutritional needs.</p>
        <p>Consequently, a diet that looks attractive for a few weeks may not be practical for long-term use.</p>
        <p>A sustainable eating pattern should fit your lifestyle rather than force you to follow rules that you cannot maintain.</p>

        <h2>How to Safely Lose Weight</h2>
        <p>For most people, sustained weight loss requires an energy deficit over time. However, the appropriate calorie target differs between individuals.</p>
        <p>A TDEE estimate can provide useful context for understanding daily energy expenditure. Nevertheless, it should not be treated as an exact measurement.</p>
        <p>Short-term changes on the scale can also reflect water, glycogen, digestive contents, and other factors. Therefore, a daily weight change does not necessarily represent a change in body fat.</p>
        <p>Avoid extreme restrictions and guaranteed-result claims. If you have a medical condition, take medications affected by diet, are pregnant or breastfeeding, or have specific nutritional needs, seek individualized guidance from a qualified healthcare professional.</p>

        <h2>Nutritional Supplements</h2>
        <p>Supplements may be useful for specific nutritional needs. However, they should not replace a varied eating pattern.</p>
        <p>If you believe you need a supplement because of a deficiency, medical condition, medication, or dietary restriction, discuss it with a qualified healthcare professional.</p>

        <h2>Your Personalized Healthy Eating Pattern</h2>
        <p>Useful <strong>Diet Advice</strong> should fit your real life.</p>
        <p>Consider:</p>
        <ul>
          <li>Your health or weight goal</li>
          <li>Estimated calorie needs</li>
          <li>Activity level</li>
          <li>Food preferences</li>
          <li>Budget</li>
          <li>Cooking skills</li>
          <li>Work or school schedule</li>
          <li>Cultural food choices</li>
          <li>Individual nutritional needs</li>
        </ul>
        <p>There is no single meal plan that works exactly the same way for everyone. Instead, build an eating pattern that is nutritious, realistic, and sustainable.</p>

        <h2>Frequently Asked Questions</h2>
        <div class="faq-container">
          <div class="faq-item">
            <h3 class="faq-question">What is the best Diet Advice for healthy eating?</h3>
            <p>There is no single diet that works exactly the same way for everyone. A healthy eating pattern generally includes a variety of nutrient-dense foods while considering personal needs, preferences, budget, and lifestyle.</p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">How many calories should I eat each day?</h3>
            <p>Your calorie needs depend on factors such as age, body size, sex, and activity level. A <a href="/" style="color: var(--accent-cyan); font-weight: bold; text-decoration: none;">TDEE calculator</a> can estimate your daily energy expenditure, but the result should be treated as a starting estimate rather than an exact measurement.</p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">Can I eat sugar and still have a healthy diet?</h3>
            <p>Yes. Eating some foods that contain sugar does not automatically make your entire diet unhealthy. However, it is useful to distinguish naturally occurring sugar from added sugar and limit excessive added sugar.</p>
          </div>
          <div class="faq-item">
            <h3 class="faq-question">Is a calorie deficit necessary for weight loss?</h3>
            <p>For most people, sustained weight loss requires an energy deficit over time. However, the appropriate approach varies between individuals. Extreme calorie restriction is not necessary for building a healthy eating pattern.</p>
          </div>
        </div>

        <h2>Final Thoughts</h2>
        <p>Good <strong>Diet Advice</strong> should make healthy eating easier, not create unnecessary fear around food. Focus on variety, nutrient-dense foods, protein, fiber-rich choices, fruits, vegetables, whole grains, suitable portions, and reasonable limits on added sugar, excess sodium, and highly processed foods.</p>
        <p>From a practical perspective, consistency matters more than chasing every new diet trend. Understanding your estimated energy needs, including <a href="/" style="color: var(--accent-cyan); font-weight: bold; text-decoration: none;">TDEE</a>, can provide useful context for weight-related goals. Still, a calculator is only a starting estimate. When medical conditions or specific nutritional needs are involved, qualified professional guidance is the appropriate next step.</p>
`;

const contentPath = path.join(__dirname, 'js', 'content.js');
let fileContent = fs.readFileSync(contentPath, 'utf8');

const routeStartIndex = fileContent.indexOf("'/diet-advice/': {");
if (routeStartIndex === -1) {
  console.error("Could not find '/diet-advice/': { in content.js");
  process.exit(1);
}

const contentPropStartIndex = fileContent.indexOf("content: \`", routeStartIndex);
if (contentPropStartIndex === -1) {
  console.error("Could not find content property for /diet-advice/");
  process.exit(1);
}

// Find the end of the content string (the closing backtick that is followed by a comma or brace)
// In content.js, we expect it to end with \n    `\n  }
const contentPropEndIndex = fileContent.indexOf("\`", contentPropStartIndex + 15);
if (contentPropEndIndex === -1) {
  console.error("Could not find end of content property");
  process.exit(1);
}

const beforeContent = fileContent.substring(0, contentPropStartIndex + 10); 
const afterContent = fileContent.substring(contentPropEndIndex);

fileContent = beforeContent + '\\n' + newContentHTML + '\\n      ' + afterContent;

fs.writeFileSync(contentPath, fileContent, 'utf8');
console.log('Successfully replaced /diet-advice/ content');
