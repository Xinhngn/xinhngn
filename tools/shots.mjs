// Chụp ảnh trang trên desktop và điện thoại. Cần bản preview đang chạy (npm run preview).
// Dùng: node tools/shots.mjs [baseUrl]  → ảnh ra tools/out/
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const base = process.argv[2] || 'http://localhost:4321';
const pages = ['/', '/du-an/', '/du-an/msb/', '/du-an/digimi-bvbank/'];
const views = { desktop: { width: 1440, height: 900 }, phone: { width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 } };

await mkdir('tools/out', { recursive: true });
const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
for (const [name, vp] of Object.entries(views)) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: !!vp.isMobile, deviceScaleFactor: vp.deviceScaleFactor || 1 });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: 'networkidle' });
    // cuộn hết trang để các phần hiện ra
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(400);
    const file = `tools/out/${name}${p.replace(/\//g, '_') || '_home'}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log('✓', file);
  }
  await ctx.close();
}
await browser.close();
