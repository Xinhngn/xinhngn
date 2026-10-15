/**
 * JS chung, nhỏ, chạy mọi trang. Nội dung đã có sẵn trong HTML; file này chỉ thêm tương tác.
 * Phần nặng (WebGL nền mở đầu, GSAP cuộn) tải sau khi trang đã hiện, lúc trình duyệt rảnh.
 */

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));
const idle = (cb: () => void, t = 1200) => ('requestIdleCallback' in window ? (window as any).requestIdleCallback(cb, { timeout: t }) : setTimeout(cb, 200));

/* Giờ TP.HCM */
function clock() {
  const els = $$('[data-clock]');
  if (!els.length) return;
  const fmt = new Intl.DateTimeFormat('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const tick = () => { const t = fmt.format(new Date()); els.forEach((e) => (e.textContent = t)); };
  tick();
  setInterval(tick, 1000);
}

/* Hiện dần khi cuộn tới. Phần đang trong màn hình lúc tải thì hiện ngay. */
function reveal() {
  const items = $$('[data-rv]');
  const show = (e: Element) => e.classList.add('is-in');
  if (reduce || !('IntersectionObserver' in window)) { items.forEach(show); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { show(en.target); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  items.forEach((e) => io.observe(e));
  // lưới an toàn: không để chữ bị ẩn mãi nếu có lỗi
  setTimeout(() => items.forEach((e) => { if (e.getBoundingClientRect().top < innerHeight) show(e); }), 2500);
}

/* Menu ẩn khi cuộn xuống, hiện khi cuộn lên */
function nav() {
  const el = document.querySelector<HTMLElement>('[data-nav]');
  if (!el) return;
  let last = scrollY;
  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = scrollY;
      const menuOpen = el.querySelector('details[open]');
      el.classList.toggle('is-up', !menuOpen && y > last && y > 240);
      last = y;
      ticking = false;
    });
  }, { passive: true });
}

/* Bấm ảnh Xinh để đổi ảnh */
function faces() {
  const btn = document.querySelector<HTMLButtonElement>('[data-faces]');
  if (!btn) return;
  const list = JSON.parse(btn.dataset.faces || '[]') as { src: string; alt: string }[];
  const img = btn.querySelector<HTMLImageElement>('[data-face-img]')!;
  const n = btn.querySelector('[data-face-n]')!;
  let i = 0;
  btn.addEventListener('click', () => {
    i = (i + 1) % list.length;
    const f = list[i];
    const next = new Image();
    next.src = f.src;
    next.decode().catch(() => {}).finally(() => {
      img.src = f.src; img.alt = f.alt; n.textContent = String(i + 1);
      btn.classList.remove('is-swap'); void btn.offsetWidth; btn.classList.add('is-swap');
    });
  });
  idle(() => list.slice(1).forEach((f) => { const p = new Image(); p.src = f.src; }), 4000);
}

/* Footer: vai trò mục tiêu đổi lần lượt */
function roles() {
  const el = document.querySelector<HTMLElement>('[data-roles]');
  if (!el || reduce) return;
  const words = JSON.parse(el.dataset.roles || '[]') as string[];
  let i = 0;
  setInterval(() => {
    if (document.hidden) return;
    i = (i + 1) % words.length;
    el.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-6px)' }], { duration: 220, easing: 'ease-in' }).finished.then(() => {
      el.textContent = words[i];
      el.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.22,1,.36,1)' });
    });
  }, 2800);
}

/* Phím tắt: d = Dự án, h = về đầu, l = Liên hệ */
function keys() {
  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target as HTMLElement;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    const go: Record<string, string> = { h: '/#top', d: '/du-an/', l: '#lien-he' };
    const href = go[e.key.toLowerCase()];
    if (href) location.href = href;
  });
}

/* Tải phần nặng khi rảnh */
function heavy() {
  const field = document.querySelector<HTMLCanvasElement>('[data-field]');
  if (field) idle(() => import('./field').then((m) => m.default(field)), 800);
  if (!reduce) idle(() => import('./motion').then((m) => m.default()), 1500);
}

clock();
reveal();
nav();
faces();
roles();
keys();
heavy();
