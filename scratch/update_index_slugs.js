const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

const replacements = [
  ['/how-to-calibrate-tdee-with-weight-trends/', '/calibrate-tdee-weight-trends/'],
  ['/activity-factor-questionnaire-for-lifting/', '/accurate-activity-factor-questionnaire/'],
  ['/tdee-calculator-with-rest-and-training-day-macros/', '/tdee-calculator-rest-training-day-macros/']
];

replacements.forEach(([oldSlug, newSlug]) => {
  const count = indexHtml.split(oldSlug).length - 1;
  indexHtml = indexHtml.split(oldSlug).join(newSlug);
  console.log(`Replaced ${count} occurrences of ${oldSlug} with ${newSlug}`);
});

fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('Successfully updated index.html with new feature slugs!');
