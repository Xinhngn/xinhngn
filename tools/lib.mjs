// Shared helpers for the page-check scripts in tools/.
// Run them against the production build: `npm run build && npx vite preview` (port 5175),
// or point BASE_URL at any other server. Output goes to tools/out/ (git-ignored).
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

export const BASE_URL = process.env.BASE_URL || 'http://localhost:5175/';
export const OUT = resolve(import.meta.dirname, 'out');
mkdirSync(OUT, { recursive: true });

export const VIEWPORTS = {
  desktop: { width: 1366, height: 860 },
  phone: { width: 393, height: 852, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
};

export async function openPage(viewport, { reducedMotion = 'no-preference' } = {}) {
  const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM || undefined });
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height },
    isMobile: !!viewport.isMobile, hasTouch: !!viewport.hasTouch, deviceScaleFactor: viewport.deviceScaleFactor || 1, reducedMotion });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(BASE_URL, { waitUntil: 'load' });
  await page.waitForTimeout(800);
  // XINH.OS opens on a boot screen that covers the page. Click past it first
  // (default: the "Story" button). START='' keeps the boot screen; START='<selector>' clicks something else.
  const start = process.env.START ?? '[data-mode="story"]';
  if (start) {
    const btn = page.locator(start).first();
    if (await btn.isVisible().catch(() => false)) { await btn.click(); await page.waitForTimeout(1200); }
  }
  return { browser, page, errors };
}

/** The element that actually scrolls: the document, or the biggest scrolling container. */
export async function scroller(page) {
  return page.evaluate(() => {
    const doc = document.scrollingElement;
    if (doc.scrollHeight > doc.clientHeight + 4) return null;
    let best = null, bestH = 0;
    for (const el of document.querySelectorAll('*')) {
      const s = getComputedStyle(el);
      if (/(auto|scroll)/.test(s.overflowY) && el.scrollHeight > el.clientHeight + 4 && el.clientHeight > bestH) { best = el; bestH = el.clientHeight; }
    }
    if (best) { best.setAttribute('data-check-scroller', ''); return '[data-check-scroller]'; }
    return null;
  });
}

export async function scrollInfo(page, sel) {
  return page.evaluate((sel) => {
    const el = sel ? document.querySelector(sel) : document.scrollingElement;
    return { top: el.scrollTop, height: el.scrollHeight, view: el.clientHeight };
  }, sel);
}

export async function scrollTo(page, sel, y) {
  await page.evaluate(([sel, y]) => {
    const el = sel ? document.querySelector(sel) : document.scrollingElement;
    el.scrollTo({ top: y, behavior: 'instant' });
  }, [sel, y]);
}

export const median = (xs) => { const s = [...xs].sort((a, b) => a - b); return s.length ? s[Math.floor(s.length / 2)] : 0; };
