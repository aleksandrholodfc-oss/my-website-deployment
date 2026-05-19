import { test, expect } from '@playwright/test';

test('homepage has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Федерация Холода/);
});

test('navigation works', async ({ page }) => {
  await page.goto('/');
  const aboutLink = page.locator('a[href="/about"]');
  if (await aboutLink.isVisible().catch(() => false)) {
    await aboutLink.click();
    await expect(page).toHaveURL(/.*about/);
  }
});
