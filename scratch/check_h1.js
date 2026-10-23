const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
console.log('Homepage H1 matches count:', matches.length);
matches.forEach((m, i) => console.log(`H1 [${i}]: ${m[0]}`));
