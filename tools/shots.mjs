// Screenshots at several scroll positions on phone + desktop, joined into one contact sheet per size
// (tools/out/shots-<size>.png) for a quick visual review.
// Usage: node tools/shots.mjs [stops=6]
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { OUT, VIEWPORTS, openPage, scroller, scrollInfo, scrollTo } from './lib.mjs';

const STOPS = Number(process.argv[2] || 6);

for (const [name, vp] of Object.entries(VIEWPORTS)) {
  const { browser, page, errors } = await openPage(vp);
  const sel = await scroller(page);
  const info = await scrollInfo(page, sel);
  const max = Math.max(0, info.height - info.view);
  const shots = [];
  for (let i = 0; i < STOPS; i++) {
    const y = STOPS === 1 ? 0 : Math.round((max * i) / (STOPS - 1));
    await scrollTo(page, sel, y);
    await page.waitForTimeout(500);
    shots.push((await page.screenshot({ type: 'png' })).toString('base64'));
  }
  // Join the shots in the browser itself so no image library is needed.
  const sheet = await page.evaluate(async ({ shots, label }) => {
    const imgs = await Promise.all(shots.map((s) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.src = 'data:image/png;base64,' + s; })));
    const cols = Math.min(imgs.length, 3), rows = Math.ceil(imgs.length / cols), w = imgs[0].width, h = imgs[0].height, pad = 12;
    const c = document.createElement('canvas'); c.width = cols * (w + pad) + pad; c.height = rows * (h + pad) + pad + 40;
    const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height);
    g.fillStyle = '#111'; g.font = '24px monospace'; g.fillText(label, pad, 30);
    imgs.forEach((im, k) => g.drawImage(im, pad + (k % cols) * (w + pad), 40 + pad + Math.floor(k / cols) * (h + pad)));
    return c.toDataURL('image/png').split(',')[1];
  }, { shots, label: `${name} · ${STOPS} stops · scroll ${max}px` });
  const file = resolve(OUT, `shots-${name}.png`);
  writeFileSync(file, Buffer.from(sheet, 'base64'));
  console.log(`${name}: ${file}${errors.length ? `  JS errors: ${errors.join(' | ')}` : ''}`);
  await browser.close();
}
