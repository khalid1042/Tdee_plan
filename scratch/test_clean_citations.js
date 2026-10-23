const fs = require('fs');
const path = require('path');

const contentJsPath = path.join(__dirname, '..', 'js', 'content.js');
const indexHtmlPath = path.join(__dirname, '..', 'index.html');

let contentJs = fs.readFileSync(contentJsPath, 'utf8');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

function cleanLinks(html) {
  // Replace pubmed and ncbi links with clean URLs and target="_blank" rel="noopener noreferrer"
  return html.replace(/<a\s+([^>]*?)href=(["'])(https?:\/\/(?:www\.)?(?:pubmed\.ncbi\.nlm\.nih\.gov|ncbi\.nlm\.nih\.gov)[^"']*?)\2([^>]*?)>([\s\S]*?)<\/a>/gi, (match, before, quote, rawUrl, after, innerText) => {
    // 1. Clean URL: remove utm_source, remove ?dopt=Abstract if before utm, etc.
    let cleanUrl = rawUrl;
    try {
      const urlObj = new URL(rawUrl);
      urlObj.searchParams.delete('utm_source');
      urlObj.searchParams.delete('utm_medium');
      urlObj.searchParams.delete('utm_campaign');
      urlObj.searchParams.delete('dopt');
      cleanUrl = urlObj.toString();
      // If trailing '?' remains, clean it
      cleanUrl = cleanUrl.replace(/\?$/, '');
    } catch (e) {
      // fallback manual regex clean
      cleanUrl = rawUrl.replace(/\?utm_source=[^&"']*/g, '').replace(/&utm_source=[^&"']*/g, '');
    }

    // 2. Parse title or other attributes from before/after
    const otherAttrs = (before + ' ' + after)
      .replace(/target=(["'])_blank\1/gi, '')
      .replace(/rel=(["'])[^"']*\1/gi, '')
      .replace(/\s+/g, ' ')
      .trim();

    const attrsStr = otherAttrs ? ` ${otherAttrs}` : '';
    return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer"${attrsStr}>${innerText}</a>`;
  });
}

const cleanedContent = cleanLinks(contentJs);
const cleanedIndex = cleanLinks(indexHtml);

console.log('Original content length:', contentJs.length, 'Cleaned length:', cleanedContent.length);
console.log('Original index length:', indexHtml.length, 'Cleaned length:', cleanedIndex.length);

// Audit cleaned content
const aRegex = /<a\s+[^>]*href=["']([^"']*(?:pubmed|ncbi)[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
let m;
let hasUtm = 0;
let missingSec = 0;
while ((m = aRegex.exec(cleanedContent)) !== null) {
  if (m[1].includes('utm_source')) hasUtm++;
  if (!m[0].includes('rel="noopener noreferrer"') || !m[0].includes('target="_blank"')) missingSec++;
}
console.log('Content.js remaining UTM:', hasUtm, 'Missing rel/target:', missingSec);

hasUtm = 0;
missingSec = 0;
while ((m = aRegex.exec(cleanedIndex)) !== null) {
  if (m[1].includes('utm_source')) hasUtm++;
  if (!m[0].includes('rel="noopener noreferrer"') || !m[0].includes('target="_blank"')) missingSec++;
}
console.log('Index.html remaining UTM:', hasUtm, 'Missing rel/target:', missingSec);
