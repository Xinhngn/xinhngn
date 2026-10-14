import { expect, test } from '@playwright/test';

// Fonts come from Google; a blocked network in CI should not fail the build.
const ignorable = (msg: string) => /fonts\.(googleapis|gstatic)\.com|ERR_TUNNEL|net::ERR_/.test(msg);

test('boot screen loads with no JavaScript errors and no sideways scroll', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error' && !ignorable(m.text())) errors.push(m.text());
  });

  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/js/);
  await expect(page).toHaveTitle('XINH.OS');
  await page.waitForTimeout(1500);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow, 'page is wider than the screen').toBeLessThanOrEqual(1);
  expect(errors).toEqual([]);
});

test('images and the CV referenced by the page are served', async ({ page, request }) => {
  await page.goto('/');
  const urls = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLImageElement | HTMLAnchorElement>('img[src*="assets/"], a[href*="assets/"]')].map(
      (el) => (el instanceof HTMLImageElement ? el.src : el.href),
    ),
  );
  for (const url of new Set(urls)) {
    const res = await request.get(url);
    expect(res.status(), url).toBe(200);
  }
});
