const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });

  try {
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // Check if Header logo is visible
    const logo = await page.locator('header img[alt="Федерация Холода"]');
    await logo.waitFor({ state: 'visible' });
    console.log('Header logo is visible');

    // Check if phone number is present in Header
    const phone = await page.locator('header').getByText('+7 (914) 8866774');
    const isPhoneVisible = await phone.isVisible();
    console.log('Phone in header visible:', isPhoneVisible);

    await page.screenshot({ path: 'final_home_mobile.png' });

    // Scroll to bottom to check Footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    const footerPhone = await page.locator('footer').getByText('+7 (914) 8866774');
    console.log('Phone in footer visible:', await footerPhone.isVisible());

    await page.screenshot({ path: 'final_footer_mobile.png' });

  } catch (error) {
    console.error('Verification failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
