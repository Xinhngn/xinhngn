/**
 * JS chung, nhỏ, chạy mọi trang. Nội dung đã hiển thị sẵn bằng HTML; file này chỉ thêm chuyển động.
 * Hiệu ứng nặng (cách làm, desktop) chỉ tải khi phần đó sắp vào màn hình.
 */

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel) as NodeListOf<T>);

/* Giờ TP.HCM */
function clock() {
  const els = $$('[data-clock]');
  if (!els.length) return;
  const fmt = new Intl.DateTimeFormat('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const tick = () => { const t = fmt.format(new Date()); els.forEach((e) => (e.textContent = t)); };
  tick();
  setInterval(tick, 1000);
}

/* Hiện dần khi cuộn tới */
function reveal() {
  const items = $$('[data-reveal], [data-reveal-lines]');
  $$('[data-reveal-lines]').forEach((el) => el.querySelectorAll(':scope > span').forEach((s, i) => (s as HTMLElement).style.setProperty('--i', String(i))));
  if (reduce || !('IntersectionObserver' in window)) { items.forEach((e) => e.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  items.forEach((e) => io.observe(e));
}

/* --p: tiến độ cuộn 0 → 1 của từng phần có [data-progress] */
function progress() {
  const secs = $$('[data-progress]');
  if (!secs.length || reduce) return;
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    secs.forEach((s) => {
      const r = s.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) return;
      // 0 khi đỉnh phần ở đáy màn hình, 1 khi đỉnh đã đi được `f` màn hình (mặc định 0.65)
      const f = Number(s.dataset.progress) || 0.65;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * f)));
      s.style.setProperty('--p', p.toFixed(3));
    });
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
}

/* Bấm ảnh Xinh để đổi ảnh */
function faces() {
  const btn = document.querySelector<HTMLButtonElement>('[data-faces]');
  if (!btn) return;
  const list = JSON.parse(btn.dataset.faces || '[]') as { src: string; alt: string; label: string }[];
  const img = btn.querySelector<HTMLImageElement>('[data-face-img]')!;
  const label = btn.querySelector('[data-face-label]')!;
  let i = 0;
  btn.addEventListener('click', () => {
    i = (i + 1) % list.length;
    const f = list[i];
    const next = new Image();
    next.src = f.src;
    next.decode().catch(() => {}).finally(() => {
      img.src = f.src; img.alt = f.alt; label.textContent = f.label;
      btn.classList.remove('is-swap'); void btn.offsetWidth; btn.classList.add('is-swap');
    });
  });
  // tải trước ảnh kế tiếp khi rảnh
  const idle = (window as any).requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1500));
  idle(() => list.slice(1).forEach((f) => { const p = new Image(); p.src = f.src; }));
}

/* Dự án chọn lọc: rê / cuộn tới dòng nào thì thẻ bên phải đổi theo */
function selected() {
  const root = document.querySelector('[data-selected]');
  if (!root) return;
  const rows = $$<HTMLAnchorElement>('.sel__row', root);
  const cards = $$('.sel__card', root);
  const set = (i: number) => {
    rows.forEach((r, k) => r.classList.toggle('is-on', k === i));
    cards.forEach((c, k) => c.classList.toggle('is-on', k === i));
  };
  rows.forEach((r, i) => {
    r.addEventListener('mouseenter', () => set(i));
    r.addEventListener('focus', () => set(i));
  });
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((en) => en.forEach((e) => { if (e.isIntersecting) set(Number((e.target as HTMLElement).dataset.i)); }), { rootMargin: '-45% 0px -45% 0px' });
    rows.forEach((r) => io.observe(r));
  }
}

/* Footer: chữ đổi lần lượt như máy quay số */
function slot() {
  const el = document.querySelector<HTMLElement>('[data-slot]');
  if (!el || reduce) return;
  const words = JSON.parse(el.dataset.slot || '[]') as string[];
  let i = 0;
  const chars = '!<>-_/[]{}=+*^?#';
  setInterval(() => {
    if (document.hidden) return;
    i = (i + 1) % words.length;
    const target = words[i];
    let f = 0;
    const run = () => {
      f++;
      const done = Math.floor(f / 2);
      // hiện dần từng chữ, phía trước chỉ có 2 ký tự "quay số" cho gọn
      el.textContent = target.slice(0, done) + (done < target.length ? chars[f % chars.length] + chars[(f * 7) % chars.length] : '');
      if (done < target.length) requestAnimationFrame(run);
    };
    run();
  }, 2600);
}

/* Tải hiệu ứng nặng khi sắp cuộn tới */
function lazy() {
  const map: Record<string, () => Promise<{ default: (el: HTMLElement) => void }>> = {
    method: () => import('./method'),
    desktop: () => import('./desktop'),
  };
  const els = $$('[data-lazy]');
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target as HTMLElement;
      io.unobserve(el);
      map[el.dataset.lazy!]?.().then((m) => m.default(el));
    });
  }, { rootMargin: '600px 0px' });
  els.forEach((e) => io.observe(e));
}

/* Phím tắt */
function keys() {
  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target as HTMLElement;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    const go: Record<string, string> = { h: '/#top', d: '/du-an/', l: '/#lien-he' };
    const href = go[e.key.toLowerCase()];
    if (href) location.href = href;
  });
}

clock();
reveal();
progress();
faces();
selected();
slot();
lazy();
keys();
