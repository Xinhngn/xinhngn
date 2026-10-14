// Scrolls in small steps, compares each frame with the previous one and reports places where the
// picture "jumps": the change is >= 3x the median of nearby steps AND >= 2.5% of the screen.
// Usage: node tools/scan-jumps.mjs [stepPx=80]  (40 is finer but takes several minutes)
import { PNG } from 'playwright-core/lib/utilsBundle';
import { VIEWPORTS, median, openPage, scroller, scrollInfo, scrollTo } from './lib.mjs';

const STEP = Number(process.argv[2] || 80);

function diffRatio(a, b) {
  const A = PNG.sync.read(a), B = PNG.sync.read(b);
  let changed = 0;
  for (let i = 0; i < A.data.length; i += 16) { // every 4th pixel is enough
    if (Math.abs(A.data[i] - B.data[i]) + Math.abs(A.data[i + 1] - B.data[i + 1]) + Math.abs(A.data[i + 2] - B.data[i + 2]) > 48) changed++;
  }
  return changed / (A.data.length / 16);
}

for (const [name, vp] of Object.entries(VIEWPORTS)) {
  const { browser, page } = await openPage(vp, { reducedMotion: 'reduce' }); // keep ambient animation out of the diff
  const sel = await scroller(page);
  const { height, view } = await scrollInfo(page, sel);
  const ys = [], diffs = [];
  let prev = await page.screenshot({ scale: 'css' });
  for (let y = STEP; y <= height - view; y += STEP) {
    await scrollTo(page, sel, y);
    await page.waitForTimeout(120);
    const cur = await page.screenshot({ scale: 'css' });
    ys.push(y); diffs.push(diffRatio(prev, cur)); prev = cur;
  }
  const jumps = diffs.flatMap((d, i) => {
    const near = median(diffs.slice(Math.max(0, i - 4), i).concat(diffs.slice(i + 1, i + 5)));
    return d >= 0.025 && d >= 3 * Math.max(near, 0.001) ? [{ y: ys[i], change: (d * 100).toFixed(1) + '%', nearby: (near * 100).toFixed(1) + '%' }] : [];
  });
  console.log(`${name}: ${ys.length} steps of ${STEP}px, ${jumps.length} jump(s)`);
  for (const j of jumps) console.log(`  at ${j.y}px: ${j.change} changed (nearby median ${j.nearby})`);
  await browser.close();
}
