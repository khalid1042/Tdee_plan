const fs = require('fs');
const path = require('path');

const contentJsPath = path.join(__dirname, '..', 'js', 'content.js');
const indexHtmlPath = path.join(__dirname, '..', 'index.html');

let contentJs = fs.readFileSync(contentJsPath, 'utf8');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

function cleanCitationLink(match, before, quote, rawUrl, after, innerText) {
  let cleanUrl = rawUrl;
  try {
    const urlObj = new URL(rawUrl);
    urlObj.searchParams.delete('utm_source');
    urlObj.searchParams.delete('utm_medium');
    urlObj.searchParams.delete('utm_campaign');
    urlObj.searchParams.delete('dopt');
    urlObj.searchParams.delete('report');
    cleanUrl = urlObj.toString();
    cleanUrl = cleanUrl.replace(/\?$/, '');
  } catch (e) {
    cleanUrl = rawUrl.replace(/\?utm_source=[^&"']*/g, '').replace(/&utm_source=[^&"']*/g, '');
  }

  // Ensure clean trailing slash for pubmed articles if it was just /2305711
  cleanUrl = cleanUrl.replace(/(\/pubmed\.ncbi\.nlm\.nih\.gov\/\d+)$/, '$1/');

  // Keep title attribute if present
  let titleAttr = '';
  const titleMatch = (before + ' ' + after).match(/title=(["'])([\s\S]*?)\1/i);
  if (titleMatch) {
    titleAttr = ` title="${titleMatch[2]}"`;
  }

  return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer"${titleAttr}>${innerText}</a>`;
}

function processContent(html) {
  return html.replace(/<a\s+([^>]*?)href=(["'])(https?:\/\/(?:www\.)?(?:pubmed\.ncbi\.nlm\.nih\.gov|ncbi\.nlm\.nih\.gov)[^"']*?)\2([^>]*?)>([\s\S]*?)<\/a>/gi, cleanCitationLink);
}

contentJs = processContent(contentJs);
indexHtml = processContent(indexHtml);

// Also polish the calculator-disclaimer in index.html
const oldCalcDisclaimerRegex = /<!-- E-E-A-T Medical Disclaimer & Methodology Link -->[\s\S]*?<!-- Goal Simulator Card -->/;
const newCalcDisclaimer = `<!-- E-E-A-T Medical Disclaimer & Methodology Link -->
          <div class="calculator-disclaimer">
            <div class="disclaimer-tag">⚖️ Clinical &amp; Medical Disclaimer</div>
            <p style="margin: 0 0 0.5rem; color: var(--text-muted); line-height: 1.55;">
              <strong>Informational Estimation:</strong> Output calculations are estimates derived from clinical resting metabolic rate equations (Mifflin-St Jeor and Katch-McArdle) and do not constitute individualized medical, dietary, or healthcare advice. Static formulas cannot account for individual endocrine variations, metabolic adaptation, or NEAT variance.
            </p>
            <a href="/how-we-calculate/" style="color: var(--accent-cyan); font-weight: 600; text-decoration: underline; font-size: 0.86rem;" data-link>Explore our complete evidence-based calculation methodology &rarr;</a>
          </div>

          <!-- Goal Simulator Card -->`;

if (oldCalcDisclaimerRegex.test(indexHtml)) {
  indexHtml = indexHtml.replace(oldCalcDisclaimerRegex, newCalcDisclaimer);
  console.log('Successfully replaced calculator-disclaimer in index.html');
} else {
  console.warn('Could not find oldCalcDisclaimerRegex in index.html');
}

fs.writeFileSync(contentJsPath, contentJs, 'utf8');
fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');

console.log('Successfully applied clean citations and disclaimers to content.js and index.html!');
