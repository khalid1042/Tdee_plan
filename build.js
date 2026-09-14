const fs = require('fs');
const path = require('path');

console.log('Starting static pre-rendering...');

// 1. Read index.html template
const indexPath = path.join(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf-8');

// 2. Read and parse content.js
const contentJsPath = path.join(__dirname, 'js', 'content.js');
const contentJs = fs.readFileSync(contentJsPath, 'utf-8');

// Mock window to execute content.js in node
const window = {};
eval(contentJs);

if (!window.TDEEContent || !window.TDEEContent.routes) {
  console.error('Failed to parse TDEEContent from content.js');
  process.exit(1);
}

const routes = window.TDEEContent.routes;

// 3. Helper to replace metadata in HTML string
function updateHtmlForRoute(html, route, routeData) {
  let updatedHtml = html;
  
  // Update Title
  updatedHtml = updatedHtml.replace(/<title>.*<\/title>/, `<title>${routeData.title}</title>`);
  
  // Update Meta Description
  updatedHtml = updatedHtml.replace(/<meta name="description"\s+content="[^"]*">/, `<meta name="description" content="${routeData.metaDescription}">`);
  
  // Update OG Title and Description
  updatedHtml = updatedHtml.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${routeData.title}">`);
  updatedHtml = updatedHtml.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${routeData.metaDescription}">`);
  
  // Update Twitter Title and Description
  updatedHtml = updatedHtml.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${routeData.title}">`);
  updatedHtml = updatedHtml.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${routeData.metaDescription}">`);

  // Update Canonical URL
  updatedHtml = updatedHtml.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="https://tdeecalculator.com${route}">`);

  // Show Silo container, hide Hero workspace
  updatedHtml = updatedHtml.replace(/<div id="hero-workspace">/, '<div id="hero-workspace" class="hidden">');
  updatedHtml = updatedHtml.replace(/<div id="silo-container" class="hidden">/, '<div id="silo-container">');

  // Inject Silo Content
  const categoryStr = `<h2 id="silo-category" class="silo-category">Guide</h2>`;
  updatedHtml = updatedHtml.replace(categoryStr, `<h2 id="silo-category" class="silo-category">${routeData.category || 'Guide'}</h2>`);
  
  const titleStr = `<h1 id="silo-title" class="silo-title">Topic Title</h1>`;
  updatedHtml = updatedHtml.replace(titleStr, `<h1 id="silo-title" class="silo-title">${routeData.h1 || routeData.title}</h1>`);
  
  // Replace the empty silo-body with the actual content
  const bodyStart = '<div id="silo-body" class="article-body">';
  const bodyRegex = new RegExp(`(<div id="silo-body" class="article-body">)[\\s\\S]*?(</div>\\s*<!-- \\/silo-body -->)`);
  updatedHtml = updatedHtml.replace(bodyRegex, `$1\n${routeData.content}\n$2`);

  return updatedHtml;
}

// 4. Generate static files for each route
for (const [route, routeData] of Object.entries(routes)) {
  if (route === '/') continue; // Homepage is handled by the main index.html

  // Create directory path (e.g. '/bmr-calculator/' -> 'bmr-calculator')
  const dirPath = path.join(__dirname, route);
  
  // Ensure directory exists
  fs.mkdirSync(dirPath, { recursive: true });

  // Generate HTML
  const routeHtml = updateHtmlForRoute(indexHtml, route, routeData);

  // Write to index.html in the created directory
  const filePath = path.join(dirPath, 'index.html');
  fs.writeFileSync(filePath, routeHtml, 'utf-8');
  
  console.log(`Generated static file for route: ${route}`);
}

console.log('Static pre-rendering complete!');
