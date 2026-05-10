const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  const outputDir = path.resolve(__dirname);

  const pages = [
    { url: 'http://localhost:5173/', file: 'landing.png' },
    { url: 'http://localhost:5173/pricing', file: 'pricing.png' },
    { url: 'http://localhost:5173/select', file: 'select.png' },
    { url: 'http://localhost:5173/chat/bifold-wallet', file: 'chat.png' },
  ];

  for (const { url, file } of pages) {
    console.log(`Capturing ${url} -> ${file}`);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outputDir, file), fullPage: false });
    console.log(`Saved: ${file}`);
  }

  await browser.close();
  console.log('All screenshots captured.');
})();
