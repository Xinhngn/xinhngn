// Lists visible sections/windows that are taller than a phone screen (393x690 and 375x620).
// Usage: node tools/fit.mjs ["css selector for blocks"]
import { openPage } from './lib.mjs';

const SELECTOR = process.argv[2] || 'section, .win, [role="dialog"], main > *';
const SIZES = [{ width: 393, height: 690 }, { width: 375, height: 620 }];

for (const size of SIZES) {
  const { browser, page } = await openPage({ ...size, isMobile: true, hasTouch: true });
  const tall = await page.evaluate(({ sel, h }) => [...document.querySelectorAll(sel)]
    .filter((el) => el.offsetParent !== null)
    .map((el) => ({ el, r: el.getBoundingClientRect() }))
    .filter(({ r }) => r.height > h)
    .map(({ el, r }) => ({ block: el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.classList.length ? '.' + [...el.classList].slice(0, 2).join('.') : ''), height: Math.round(r.height) })),
  { sel: SELECTOR, h: size.height });
  console.log(`${size.width}x${size.height}: ${tall.length} block(s) taller than the screen`);
  for (const t of tall) console.log(`  ${t.block}: ${t.height}px`);
  await browser.close();
}
