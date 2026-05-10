const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  // TEST 1: ヒーロー表示速度
  try {
    const page = await browser.newPage();
    const startTime = Date.now();
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
    const loadTime = Date.now() - startTime;
    const heroText = await page.textContent('h1').catch(() => null);
    const hasHero = heroText && heroText.includes('日本語で伝えるだけで');
    results.push({
      test: 'ヒーロー表示速度',
      pass: hasHero && loadTime < 3000,
      detail: 'ロード時間: ' + loadTime + 'ms, h1テキスト: "' + (heroText ? heroText.substring(0,50) : 'なし') + '"',
    });

    // TEST 2: CTA ボタン /select リンク
    const allLinks = await page.$$eval('a', links => links.map(l => ({ href: l.getAttribute('href'), text: l.textContent.trim().substring(0,30) })));
    const selectLink = allLinks.find(l => l.href && l.href.includes('/select'));
    results.push({
      test: 'CTA ボタン /select リンク存在',
      pass: !!selectLink,
      detail: selectLink ? 'リンク発見: "' + selectLink.text + '"' : '見つからず。全リンク: ' + JSON.stringify(allLinks.slice(0,8)),
    });

    if (selectLink) {
      await page.click('a[href="/select"]');
      await page.waitForURL('**/select', { timeout: 3000 }).catch(() => {});
      const currentUrl = page.url();
      results.push({
        test: 'CTA クリック -> /select 遷移',
        pass: currentUrl.includes('/select'),
        detail: '遷移後URL: ' + currentUrl,
      });
    }
    await page.close();
  } catch (e) {
    results.push({ test: 'ヒーロー/CTA テスト', pass: false, detail: 'エラー: ' + e.message });
  }

  // TEST 3: ナビゲーション
  try {
    const page = await browser.newPage();
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
    const navLinks = await page.$$eval('nav a', links => links.map(l => ({ href: l.getAttribute('href'), text: l.textContent.trim().substring(0,20) })));
    const hasPricing = navLinks.some(l => l.href && l.href.includes('pricing'));
    const hasLogin = navLinks.some(l => l.href && l.href.includes('login'));
    results.push({
      test: 'ナビゲーションリンク確認',
      pass: hasPricing && hasLogin,
      detail: JSON.stringify(navLinks),
    });

    if (hasPricing) {
      await page.click('nav a[href="/pricing"]');
      await page.waitForURL('**/pricing', { timeout: 3000 }).catch(() => {});
      results.push({
        test: 'ナビ料金 -> /pricing 遷移',
        pass: page.url().includes('/pricing'),
        detail: 'URL: ' + page.url(),
      });
    }
    await page.close();
  } catch (e) {
    results.push({ test: 'ナビゲーションテスト', pass: false, detail: 'エラー: ' + e.message });
  }

  // TEST 4: 料金ページ 4プラン
  try {
    const page = await browser.newPage();
    await page.goto('http://localhost:5173/pricing', { waitUntil: 'domcontentloaded' });
    const pageText = await page.textContent('body');
    const hasFree = pageText.includes('Free');
    const hasHobby = pageText.includes('Hobby');
    const hasCreator = pageText.includes('Creator');
    const hasPro = pageText.includes('Pro');
    const hasTable = await page.$('table') !== null;
    results.push({
      test: '料金ページ 4プランカード',
      pass: hasFree && hasHobby && hasCreator && hasPro,
      detail: 'Free:' + hasFree + ', Hobby:' + hasHobby + ', Creator:' + hasCreator + ', Pro:' + hasPro,
    });
    results.push({
      test: '料金ページ 比較表(table要素)',
      pass: hasTable,
      detail: 'table要素の存在: ' + hasTable,
    });
    await page.close();
  } catch (e) {
    results.push({ test: '料金ページテスト', pass: false, detail: 'エラー: ' + e.message });
  }

  // TEST 5: スマホ幅(375px)横スクロールチェック
  const pagesToCheck = [
    { url: 'http://localhost:5173/', name: 'ランディング' },
    { url: 'http://localhost:5173/pricing', name: '料金' },
    { url: 'http://localhost:5173/select', name: 'アイテム選択' },
  ];
  for (const p of pagesToCheck) {
    try {
      const page = await browser.newPage();
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(p.url, { waitUntil: 'domcontentloaded' });
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      results.push({
        test: 'スマホ375px横スクロール: ' + p.name,
        pass: scrollWidth <= clientWidth,
        detail: 'scrollWidth=' + scrollWidth + ', clientWidth=' + clientWidth,
      });
      await page.close();
    } catch (e) {
      results.push({ test: 'スマホ375pxテスト: ' + p.name, pass: false, detail: 'エラー: ' + e.message });
    }
  }

  // TEST 6: フッターリンク
  try {
    const page = await browser.newPage();
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
    const footerLinks = await page.$$eval('footer a', links => links.map(l => ({ href: l.getAttribute('href'), text: l.textContent.trim().substring(0,20) })));
    const hasTerms = footerLinks.some(l => (l.href && l.href.includes('terms')) || l.text.includes('利用規約'));
    const hasPrivacy = footerLinks.some(l => (l.href && l.href.includes('privacy')) || l.text.includes('プライバシー'));
    const hasAbout = footerLinks.some(l => (l.href && l.href.includes('about')) || l.text.includes('運営'));
    results.push({
      test: 'フッターリンク（利用規約/プライバシー/運営情報）',
      pass: hasTerms && hasPrivacy && hasAbout,
      detail: 'Terms:' + hasTerms + ', Privacy:' + hasPrivacy + ', About:' + hasAbout + ' リンク: ' + JSON.stringify(footerLinks.slice(0,8)),
    });

    if (hasTerms) {
      await page.click('footer a[href="/terms"]');
      await page.waitForURL('**/terms', { timeout: 3000 }).catch(() => {});
      results.push({
        test: 'フッター利用規約リンク遷移',
        pass: page.url().includes('terms'),
        detail: 'URL: ' + page.url(),
      });
    }
    await page.close();
  } catch (e) {
    results.push({ test: 'フッターテスト', pass: false, detail: 'エラー: ' + e.message });
  }

  // TEST 7: ハンバーガーメニュー（375px）
  try {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
    const hamburger = await page.$('button[aria-expanded], nav button');
    const hamburgerExists = hamburger !== null;
    results.push({
      test: 'ハンバーガーメニューボタン存在',
      pass: hamburgerExists,
      detail: hamburgerExists ? '存在する' : '見つからない',
    });

    if (hamburger) {
      await hamburger.click();
      await page.waitForTimeout(400);
      const ariaExpanded = await hamburger.getAttribute('aria-expanded');
      results.push({
        test: 'ハンバーガーメニュー開閉(aria-expanded)',
        pass: ariaExpanded === 'true',
        detail: 'aria-expanded: ' + ariaExpanded,
      });
    }
    await page.close();
  } catch (e) {
    results.push({ test: 'ハンバーガーテスト', pass: false, detail: 'エラー: ' + e.message });
  }

  // TEST 8: コンソールエラー確認
  try {
    const page = await browser.newPage();
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    results.push({
      test: 'ランディング コンソールエラーなし',
      pass: consoleErrors.length === 0,
      detail: consoleErrors.length > 0 ? 'エラー: ' + consoleErrors.join(' | ') : 'エラーなし',
    });
    await page.close();
  } catch (e) {
    results.push({ test: 'コンソールエラーテスト', pass: false, detail: 'エラー: ' + e.message });
  }

  // TEST 9: 料金ページ コンソールエラー
  try {
    const page = await browser.newPage();
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    await page.goto('http://localhost:5173/pricing', { waitUntil: 'networkidle' });
    results.push({
      test: '料金ページ コンソールエラーなし',
      pass: consoleErrors.length === 0,
      detail: consoleErrors.length > 0 ? 'エラー: ' + consoleErrors.join(' | ') : 'エラーなし',
    });
    await page.close();
  } catch (e) {
    results.push({ test: '料金ページコンソールエラーテスト', pass: false, detail: 'エラー: ' + e.message });
  }

  // TEST 10: 404ページ フォールバック
  try {
    const page = await browser.newPage();
    await page.goto('http://localhost:5173/nonexistent-page-xyz', { waitUntil: 'domcontentloaded' });
    const pageText = await page.textContent('body');
    const has404Content = pageText.includes('見つかりません') || pageText.includes('404') || pageText.includes('存在しない');
    results.push({
      test: '404フォールバックページ',
      pass: has404Content,
      detail: '先頭200文字: "' + pageText.substring(0,200) + '"',
    });
    await page.close();
  } catch (e) {
    results.push({ test: '404テスト', pass: false, detail: 'エラー: ' + e.message });
  }

  await browser.close();

  console.log('=== Sprint 1 テスト結果 ===');
  let passCount = 0;
  let failCount = 0;
  results.forEach(r => {
    const status = r.pass ? 'PASS' : 'FAIL';
    if (r.pass) passCount++; else failCount++;
    console.log('[' + status + '] ' + r.test);
    console.log('  -> ' + r.detail);
  });
  console.log('\n合計: ' + passCount + ' PASS / ' + failCount + ' FAIL');
  process.exit(failCount > 0 ? 1 : 0);
})();
