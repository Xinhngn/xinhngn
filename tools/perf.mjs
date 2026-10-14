// Time to first content, long tasks that block the browser, and frames per second at rest and while scrolling.
// Chromium numbers are a guide only: always also try a real phone, especially an iPhone (Safari).
// Usage: node tools/perf.mjs
import { VIEWPORTS, openPage, scroller, scrollInfo } from './lib.mjs';

async function fps(page, ms, during) {
  return page.evaluate(async ({ ms, during }) => {
    let frames = 0, run = true;
    const tick = () => { frames++; if (run) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
    if (during) {
      const el = during === 'doc' ? document.scrollingElement : document.querySelector(during);
      const t0 = performance.now();
      const step = () => { const t = performance.now() - t0; if (t < ms) { el.scrollTop = (el.scrollHeight - el.clientHeight) * (t / ms); requestAnimationFrame(step); } };
      requestAnimationFrame(step);
    }
    await new Promise((r) => setTimeout(r, ms));
    run = false;
    return Math.round((frames * 1000) / ms);
  }, { ms, during });
}

for (const [name, vp] of Object.entries(VIEWPORTS)) {
  const { browser, page, errors } = await openPage(vp);
  await page.evaluate(() => { window.__long = []; new PerformanceObserver((l) => window.__long.push(...l.getEntries().map((e) => e.duration))).observe({ type: 'longtask', buffered: true }); });
  await page.waitForTimeout(1500);
  const paint = await page.evaluate(() => {
    const p = performance.getEntriesByType('paint').find((e) => e.name === 'first-contentful-paint');
    return p ? Math.round(p.startTime) : null;
  });
  const sel = await scroller(page);
  const { height, view } = await scrollInfo(page, sel);
  const idle = await fps(page, 2000);
  const scrolling = height > view + 4 ? await fps(page, 3000, sel || 'doc') : null;
  const long = await page.evaluate(() => window.__long);
  console.log(`${name}: first content ${paint}ms · long tasks ${long.length} (longest ${Math.round(Math.max(0, ...long))}ms) · fps idle ${idle}` +
    (scrolling !== null ? ` · fps scrolling ${scrolling}` : ' · nothing to scroll') + (errors.length ? ` · JS errors: ${errors.length}` : ''));
  await browser.close();
}
