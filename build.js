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

  // Hide Hero workspace
  updatedHtml = updatedHtml.replace(/<div id="hero-workspace">/, '<div id="hero-workspace" class="hidden">');

  const author = window.TDEEContent.author;
  const reviewer = window.TDEEContent.reviewer;
  const lastUpdated = window.TDEEContent.lastUpdated;

  const trustMetaHTML = `
      <div class="trust-meta" style="margin-bottom: 2rem; padding: 1rem; background: var(--bg-tertiary); border-radius: 8px; font-size: 0.9rem; border-left: 4px solid var(--accent-rose);">
        <div style="margin-bottom: 0.5rem;"><strong>✍️ Written by:</strong> ${author}</div>
        <div style="margin-bottom: 0.5rem;"><strong>🩺 Medically Reviewed by:</strong> ${reviewer}</div>
        <div><strong>📅 Last Updated:</strong> ${lastUpdated}</div>
      </div>
  `;

  // Inject the entire Silo container HTML before the hero workspace
  const siloContainerHTML = `
  <!-- Dynamic Container for SPA Silo Pages -->
  <div id="silo-container" class="container content-section">
    <div class="article-body">
      <span id="silo-category" class="hero-badge">${routeData.category || 'Guide'}</span>
      <h1 id="silo-title" style="margin: 1rem 0 1.5rem;">${routeData.h1 || routeData.title}</h1>
      ${trustMetaHTML}
      <div id="silo-calculator-mount"></div>
      <div id="silo-body" class="article-body">
${routeData.content}
      </div>
      <div style="margin-top:3rem; padding-top:1.5rem; border-top:1px solid var(--border-color);">
        <a href="/" class="btn-secondary">← Back to Main TDEE Calculator</a>
      </div>
    </div>
  </div>
  `;

  updatedHtml = updatedHtml.replace('<div id="hero-workspace" class="hidden">', siloContainerHTML + '\n  <div id="hero-workspace" class="hidden">');

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
