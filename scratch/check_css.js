const fs = require('fs');
const css = fs.readFileSync('css/styles.css', 'utf8');
const mediaMatches = [...css.matchAll(/@media[^{]+\{/gi)];
console.log('Total @media queries found:', mediaMatches.length);
mediaMatches.forEach(m => console.log(' ', m[0]));
