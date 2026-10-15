// Chụp ảnh trang trên desktop 1440×900 và điện thoại 390. Cần bản preview đang chạy.
// Dùng: PW_CHROMIUM="<đường dẫn Chrome>" node tools/shots.mjs [baseUrl] → ảnh ra tools/out/
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const base = process.argv[2] || 'http://localhost:4321';
const pages = (process.argv[3] || '/,/du-an/,/du-an/msb/').split(',');
const views = { desktop: { width: 1440, height: 900 }, phone: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } };

await mkdir('tools/out', { recursive: true });
const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM, args: ['--use-angle=metal'] } : {});
for (const [name, vp] of Object.entries(views)) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: !!vp.isMobile, hasTouch: !!vp.hasTouch, deviceScaleFactor: vp.deviceScaleFactor || 1 });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1800);
    const slug = p === '/' ? 'home' : p.replace(/\//g, '_').replace(/^_|_$/g, '');
    await page.screenshot({ path: `tools/out/${name}-${slug}-0.jpg`, quality: 82 });
    // cuộn từng màn để chụp theo đúng chuyển động
    const H = await page.evaluate(() => document.documentElement.scrollHeight);
    let i = 1;
    for (let y = vp.height; y < H; y += vp.height) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(900);
      await page.screenshot({ path: `tools/out/${name}-${slug}-${i++}.jpg`, quality: 82 });
    }
    console.log('✓', name, p, i, 'ảnh');
  }
  await ctx.close();
}
await browser.close();
