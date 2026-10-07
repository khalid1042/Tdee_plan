const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const OUTPUT_DIR = path.join(__dirname, 'images');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Read routes from content.js
const window = {};
eval(fs.readFileSync('./js/content.js', 'utf8'));
const routes = window.TDEEContent.routes;

(async () => {
  console.log("Launching Edge browser for OG image generation...");
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1200,
    height: 630,
    deviceScaleFactor: 2
  });

  for (const [route, data] of Object.entries(routes)) {
    const slug = route.replace(/^\/|\/$/g, '').replace(/\//g, '-');
    if (!slug) continue; // Skip homepage, keep mobile-final.png as fallback

    const title = data.h1 || data.title;
    const category = data.category || (route.includes('calculator') ? 'Calculator' : 'TDEE Guide');
    const filename = `og-${slug}.png`;
    const outputPath = path.join(OUTPUT_DIR, filename);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            width: 1200px;
            height: 630px;
            background: #0b0f19;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            color: #f8fafc;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 60px 70px;
            position: relative;
            overflow: hidden;
          }
          .bg-glow-1 {
            position: absolute;
            top: -100px;
            right: -100px;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(6,182,212,0.25) 0%, rgba(0,0,0,0) 70%);
            border-radius: 50%;
          }
          .bg-glow-2 {
            position: absolute;
            bottom: -150px;
            left: -100px;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(244,63,94,0.2) 0%, rgba(0,0,0,0) 70%);
            border-radius: 50%;
          }
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            z-index: 10;
          }
          .brand {
            display: flex;
            align-items: center;
            gap: 14px;
          }
          .logo-icon {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #06b6d4, #3b82f6);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 26px;
            color: #fff;
            box-shadow: 0 4px 20px rgba(6,182,212,0.4);
          }
          .logo-text {
            font-size: 28px;
            font-weight: 800;
            letter-spacing: -0.02em;
            color: #fff;
          }
          .logo-text span { color: #06b6d4; }
          .badge {
            background: rgba(6, 182, 212, 0.15);
            border: 1px solid rgba(6, 182, 212, 0.4);
            color: #38bdf8;
            padding: 8px 20px;
            border-radius: 30px;
            font-size: 16px;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }
          .content {
            z-index: 10;
            max-width: 1000px;
            margin-top: 20px;
          }
          .title {
            font-size: 50px;
            font-weight: 900;
            line-height: 1.2;
            letter-spacing: -0.03em;
            background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 20px;
          }
          .footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            z-index: 10;
            border-top: 1px solid rgba(255,255,255,0.1);
            padding-top: 24px;
          }
          .footer-text {
            font-size: 18px;
            color: #94a3b8;
            font-weight: 500;
          }
          .domain {
            font-size: 20px;
            font-weight: 700;
            color: #38bdf8;
          }
        </style>
      </head>
      <body>
        <div class="bg-glow-1"></div>
        <div class="bg-glow-2"></div>
        <div class="header">
          <div class="brand">
            <div class="logo-icon">T</div>
            <div class="logo-text">TDEE<span>Calculator</span></div>
          </div>
          <div class="badge">${category}</div>
        </div>
        <div class="content">
          <div class="title">${title}</div>
        </div>
        <div class="footer">
          <div class="footer-text">Evidence-Based Expenditure &amp; Metabolic Science</div>
          <div class="domain">tdeecalculater.com</div>
        </div>
      </body>
      </html>
    `;

    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });
    await new Promise(resolve => setTimeout(resolve, 100)); // brief wait for rendering
    await page.screenshot({ path: outputPath, type: 'png' });
    console.log(`Generated OG image: ${filename}`);
  }

  await browser.close();
  console.log("All OG social share images generated successfully!");
})();
