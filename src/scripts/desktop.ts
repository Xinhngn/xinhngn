/**
 * Màn desktop XINH.OS: mở / đóng / kéo thả cửa sổ, bấm vào thì nổi lên trên.
 * Không JS thì cửa sổ vẫn mở được bằng link (#win-...) nhờ CSS :target.
 */

export default function init(section: HTMLElement) {
  const screen = section.querySelector<HTMLElement>('[data-desk]');
  if (!screen) return;
  const wins = Array.from(screen.querySelectorAll<HTMLElement>('[data-win]'));
  let z = 10;
  const front = (w: HTMLElement) => { w.style.zIndex = String(++z); };
  const isDesk = () => window.matchMedia('(min-width: 821px)').matches;

  const open = (id: string) => {
    const w = screen.querySelector<HTMLElement>(`#${id}`);
    if (!w) return;
    w.classList.add('is-open');
    front(w);
    w.animate([{ opacity: 0, transform: 'scale(0.92)' }, { opacity: 1, transform: 'none' }], { duration: 260, easing: 'cubic-bezier(.22,1,.36,1)' });
    if (!isDesk()) w.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  screen.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const opener = t.closest<HTMLElement>('[data-open]');
    if (opener) { e.preventDefault(); open(opener.dataset.open!); return; }
    const closer = t.closest<HTMLElement>('[data-close]');
    if (closer) { e.preventDefault(); closer.closest<HTMLElement>('[data-win]')?.classList.remove('is-open'); }
  });

  wins.forEach((w) => {
    w.addEventListener('pointerdown', () => front(w));
    const bar = w.querySelector<HTMLElement>('[data-grab]');
    if (!bar) return;
    let sx = 0, sy = 0, ox = 0, oy = 0, drag = false;
    bar.addEventListener('pointerdown', (e) => {
      if (!isDesk() || (e.target as HTMLElement).closest('a,button')) return;
      drag = true;
      bar.setPointerCapture(e.pointerId);
      const sr = screen.getBoundingClientRect(), wr = w.getBoundingClientRect();
      ox = wr.left - sr.left; oy = wr.top - sr.top; sx = e.clientX; sy = e.clientY;
      w.classList.add('is-drag');
    });
    bar.addEventListener('pointermove', (e) => {
      if (!drag) return;
      const sr = screen.getBoundingClientRect();
      const x = Math.min(sr.width - 80, Math.max(-w.offsetWidth + 80, ox + e.clientX - sx));
      const y = Math.min(sr.height - 40, Math.max(32, oy + e.clientY - sy));
      w.style.left = `${x}px`; w.style.top = `${y}px`;
    });
    const end = () => { drag = false; w.classList.remove('is-drag'); };
    bar.addEventListener('pointerup', end);
    bar.addEventListener('pointercancel', end);
  });
}
