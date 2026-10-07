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

// FAQ Extractor Helper
function extractFaqsFromContent(content) {
  const faqs = [];
  if (!content) return faqs;

  const faqHeaderIdx = content.search(/<h2[^>]*>[\s\S]*?Frequently Asked Questions[\s\S]*?<\/h2>/i);
  let searchSpace = content;
  if (faqHeaderIdx !== -1) {
    searchSpace = content.substring(faqHeaderIdx);
  }

  // Pattern 1: <details><summary>Q</summary>...<p>A</p>...</details>
  const detailsRegex = /<details[\s\S]*?<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi;
  let match;
  while ((match = detailsRegex.exec(searchSpace)) !== null) {
    const question = match[1].replace(/<[^>]+>/g, '').trim();
    const answer = match[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }
  if (faqs.length > 0) return faqs;

  // Pattern 2: faq-item with h3 & p
  const itemRegex = /<div class="faq-item">[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/gi;
  while ((match = itemRegex.exec(searchSpace)) !== null) {
    const question = match[1].replace(/<[^>]+>/g, '').trim();
    const answer = match[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }
  if (faqs.length > 0) return faqs;

  // Pattern 3: <h3>Q</h3> <p>A</p>
  const h3pRegex = /<h3[^>]*>([\s\S]*?)<\/h3>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/gi;
  while ((match = h3pRegex.exec(searchSpace)) !== null) {
    const question = match[1].replace(/<[^>]+>/g, '').trim();
    const answer = match[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (question && answer && (question.includes('?') || faqHeaderIdx !== -1)) {
      faqs.push({ question, answer });
    }
  }

  return faqs;
}

// 3. Helper to replace metadata in HTML string
function updateHtmlForRoute(html, route, routeData) {
  let updatedHtml = html;
  const slug = route.replace(/^\/|\/$/g, '').replace(/\//g, '-');
  const ogImageFilename = slug ? `og-${slug}.png` : 'mobile-final.png';
  const ogImageUrl = `https://tdeecalculater.com/images/${ogImageFilename}`;

  // Update Title
  updatedHtml = updatedHtml.replace(/<title>.*<\/title>/, `<title>${routeData.title}</title>`);
  
  // Update Meta Description
  updatedHtml = updatedHtml.replace(/<meta name="description"\s+content="[^"]*">/, `<meta name="description" content="${routeData.metaDescription}">`);
  
  // Update OG Title, Description, and Image
  updatedHtml = updatedHtml.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${routeData.title}">`);
  updatedHtml = updatedHtml.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${routeData.metaDescription}">`);
  updatedHtml = updatedHtml.replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${ogImageUrl}">`);

  // Update Twitter Title, Description, and Image
  updatedHtml = updatedHtml.replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${routeData.title}">`);
  updatedHtml = updatedHtml.replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${routeData.metaDescription}">`);
  updatedHtml = updatedHtml.replace(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${ogImageUrl}">`);

  // Update Canonical URL and OG URL
  updatedHtml = updatedHtml.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="https://tdeecalculater.com${route}">`);
  updatedHtml = updatedHtml.replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="https://tdeecalculater.com${route}">`);

  const author = window.TDEEContent.author || 'Dr. Michael Chen, PhD in Nutritional Sciences';
  const reviewer = window.TDEEContent.reviewer || 'Dr. Sarah Jenkins, MD, Board Certified Endocrinologist';
  const lastUpdated = window.TDEEContent.lastUpdated || '2026-10-02';

  const trustMetaHTML = `
      <div class="trust-meta" style="margin-bottom: 2rem; padding: 1rem; background: var(--bg-tertiary); border-radius: 8px; font-size: 0.9rem; border-left: 4px solid var(--accent-rose);">
        <div style="margin-bottom: 0.5rem;"><strong>✍️ Written by:</strong> ${author}</div>
        <div style="margin-bottom: 0.5rem;"><strong>🩺 Medically Reviewed by:</strong> ${reviewer}</div>
        <div><strong>📅 Last Updated:</strong> ${lastUpdated}</div>
      </div>
  `;

  // Inject the Silo container HTML
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

  // PROMPT 2 FIX: Remove hidden #hero-workspace div completely from subpages so no duplicate homepage content exists in DOM!
  updatedHtml = updatedHtml.replace(/<div id="hero-workspace">[\s\S]*?<\/div>\s*<\/div>\s*(?=\s*<!-- Footer|\s*<footer)/, siloContainerHTML + '\n');
  if (updatedHtml.includes('<div id="hero-workspace">')) {
    // Fallback replace if footer pattern matched differently
    updatedHtml = updatedHtml.replace(/<div id="hero-workspace">[\s\S]*?<\/div>\s*<\/div>/, siloContainerHTML);
  }

  // Inject Route-Specific Structured Data (JSON-LD)
  const isArticlePage = route.startsWith('/blog/') || route === '/tdee-for-weight-gain/' || route === '/tdee-for-muscle-building/' || route === '/weight-gain/' || route === '/tdee-calculator-for-women-to-gain-weight/' || route === '/how-we-calculate/' || route === '/about/';
  const isCalcPage = route.includes('calculator');
  const fullUrl = `https://tdeecalculater.com${route}`;
  const pageTitle = (routeData.h1 || routeData.title);
  const pageDesc = routeData.metaDescription || '';
  const categoryName = routeData.category || (route.includes('calculator') ? 'Calculators' : 'TDEE Guides');

  const graphNodes = [
    {
      "@type": "WebSite",
      "@id": "https://tdeecalculater.com/#website",
      "url": "https://tdeecalculater.com/",
      "name": "TDEE Calculator",
      "inLanguage": "en-US"
    },
    {
      "@type": "Organization",
      "@id": "https://tdeecalculater.com/#organization",
      "name": "TDEE Calculator",
      "url": "https://tdeecalculater.com/"
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${fullUrl}#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://tdeecalculater.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": categoryName,
          "item": fullUrl
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": pageTitle,
          "item": fullUrl
        }
      ]
    }
  ];

  if (isCalcPage || !isArticlePage) {
    graphNodes.push({
      "@type": "WebApplication",
      "@id": `${fullUrl}#webapp`,
      "name": pageTitle,
      "url": fullUrl,
      "applicationCategory": "HealthApplication",
      "operatingSystem": "All",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    });
  }

  // PROMPT 1 FIX: Add Article node to every guide/article page
  if (isArticlePage) {
    graphNodes.push({
      "@type": "Article",
      "@id": `${fullUrl}#article`,
      "isPartOf": { "@id": "https://tdeecalculater.com/#website" },
      "headline": pageTitle,
      "description": pageDesc,
      "mainEntityOfPage": fullUrl,
      "datePublished": "2026-10-02",
      "dateModified": "2026-10-02",
      "author": {
        "@type": "Person",
        "name": "Dr. Michael Chen, PhD in Nutritional Sciences"
      },
      "reviewedBy": {
        "@type": "Person",
        "name": "Dr. Sarah Jenkins, MD, Board Certified Endocrinologist"
      },
      "publisher": { "@id": "https://tdeecalculater.com/#organization" },
      "image": ogImageUrl
    });
  }

  // PROMPT 1 FIX: Add FAQPage node for all visible FAQs on page
  const extractedFaqs = extractFaqsFromContent(routeData.content);
  if (extractedFaqs.length > 0) {
    graphNodes.push({
      "@type": "FAQPage",
      "@id": `${fullUrl}#faq`,
      "mainEntity": extractedFaqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    });
  }

  const routeJsonLd = {
    "@context": "https://schema.org",
    "@graph": graphNodes
  };

  updatedHtml = updatedHtml.replace(/<!-- JSON-LD Structured Data Schema -->[\s\S]*?<\/script>/, `<!-- JSON-LD Structured Data Schema -->\n  <script type="application/ld+json">\n  ${JSON.stringify(routeJsonLd, null, 4)}\n  </script>`);

  return updatedHtml;
}

// 4. Generate static files for each route
for (const [route, routeData] of Object.entries(routes)) {
  if (route === '/') continue; // Homepage is handled by main index.html

  const dirPath = path.join(__dirname, route);
  fs.mkdirSync(dirPath, { recursive: true });

  const routeHtml = updateHtmlForRoute(indexHtml, route, routeData);
  const filePath = path.join(dirPath, 'index.html');
  fs.writeFileSync(filePath, routeHtml, 'utf-8');
  
  console.log(`Generated static file for route: ${route}`);
}

console.log('Static pre-rendering complete!');
