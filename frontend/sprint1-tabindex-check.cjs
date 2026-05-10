const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });

  // tabindex="-1" かつ aria-hidden がない要素を詳細に調べる
  const elements = await page.$$eval('[tabindex="-1"]', els => els.map(el => ({
    tag: el.tagName,
    text: el.textContent.trim().substring(0, 30),
    ariaHidden: el.getAttribute('aria-hidden'),
    role: el.getAttribute('role'),
    class: el.className ? el.className.substring(0, 40) : '',
    href: el.getAttribute('href') || '',
  })));

  console.log('tabindex="-1" 要素一覧:');
  elements.forEach((el, i) => {
    console.log(i + ': ' + JSON.stringify(el));
  });

  // これらの要素がモバイルメニュー内（aria-hidden="true"のコンテナ内）にあるか確認
  const mobileMenuHidden = await page.$$eval('#mobile-menu[aria-hidden="true"] [tabindex="-1"]', els => els.length);
  console.log('\nモバイルメニュー(aria-hidden=true)内のtabindex="-1"要素数: ' + mobileMenuHidden);

  await browser.close();
})();
