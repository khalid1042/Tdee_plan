export default async function run(page, ui) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('file:///C:/Users/HP%20840%20G3/Desktop/Tdee_plan/index.html');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'mobile-final.png', fullPage: true });
  const wide = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('*').forEach(el => {
      if (el.scrollWidth > el.clientWidth + 5 && el.clientWidth > 0 && getComputedStyle(el).overflowX === 'visible') {
        out.push({ el: el.tagName + '.' + el.className, w: el.scrollWidth, text: (el.textContent || '').slice(0, 40) });
      }
    });
    return out.slice(0, 12);
  });
  return wide;
}

