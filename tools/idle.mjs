// For pages with canvas effects: while the page sits still, does any canvas change size?
// A canvas that resizes clears itself, which shows as a black flash.
// Usage: node tools/idle.mjs [seconds=5]
import { VIEWPORTS, openPage } from './lib.mjs';

const SECONDS = Number(process.argv[2] || 5);

for (const [name, vp] of Object.entries(VIEWPORTS)) {
  const { browser, page } = await openPage(vp);
  const result = await page.evaluate(async (ms) => {
    const canvases = [...document.querySelectorAll('canvas')];
    const sizes = canvases.map((c) => `${c.width}x${c.height}`);
    const changes = canvases.map(() => 0);
    const t0 = performance.now();
    await new Promise((done) => {
      const check = () => {
        canvases.forEach((c, i) => { const s = `${c.width}x${c.height}`; if (s !== sizes[i]) { changes[i]++; sizes[i] = s; } });
        if (performance.now() - t0 < ms) requestAnimationFrame(check); else done();
      };
      requestAnimationFrame(check);
    });
    return canvases.map((c, i) => ({ canvas: c.id || c.className || `canvas ${i + 1}`, size: sizes[i], resizes: changes[i] }));
  }, SECONDS * 1000);
  if (!result.length) console.log(`${name}: no canvas on the page`);
  for (const r of result) console.log(`${name}: ${r.canvas} ${r.size} — ${r.resizes ? `resized ${r.resizes}x while idle (flash risk)` : 'stable'}`);
  await browser.close();
}
