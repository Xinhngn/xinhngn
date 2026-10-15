/**
 * Cách làm 4 bước: một hình nét chạy theo chuột trên đường kẻ, qua mỗi bước thì đổi dạng và xoay,
 * để lại vệt mờ. Tự viết, không thư viện, để trang nhẹ. Chỉ chạy trên máy có chuột.
 */

const N = 24; // số điểm của mỗi hình, để biến dạng mượt
const TAU = Math.PI * 2;

type Pt = [number, number];

// Lấy N điểm cách đều trên một đa giác đều k cạnh (k = 0 là hình tròn)
function shape(k: number, r = 50, rot = -Math.PI / 2): Pt[] {
  const pts: Pt[] = [];
  for (let i = 0; i < N; i++) {
    const t = i / N;
    if (k === 0) { const a = rot + t * TAU; pts.push([60 + r * Math.cos(a), 60 + r * Math.sin(a)]); continue; }
    const seg = Math.floor(t * k), f = t * k - seg;
    const a1 = rot + (seg / k) * TAU, a2 = rot + ((seg + 1) / k) * TAU;
    pts.push([60 + r * (Math.cos(a1) * (1 - f) + Math.cos(a2) * f), 60 + r * (Math.sin(a1) * (1 - f) + Math.sin(a2) * f)]);
  }
  return pts;
}

// Làm rõ (tròn, còn mơ hồ) → Cấu trúc (vuông) → Triển khai (tam giác, có hướng) → Kết quả (ngôi sao 6 cánh gọn → lục giác)
const SHAPES: Pt[][] = [shape(0), shape(4), shape(3), shape(6)];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const toAttr = (p: Pt[]) => p.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

function at(progress: number): Pt[] {
  const seg = Math.min(SHAPES.length - 2, Math.floor(progress * (SHAPES.length - 1)));
  const t = progress * (SHAPES.length - 1) - seg;
  const e = t * t * (3 - 2 * t);
  return SHAPES[seg].map(([x, y], i) => [lerp(x, SHAPES[seg + 1][i][0], e), lerp(y, SHAPES[seg + 1][i][1], e)] as Pt);
}

export default function init(section: HTMLElement) {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stage = section.querySelector<HTMLElement>('.method__stage');
  const rail = section.querySelector<HTMLElement>('.method__rail');
  const svg = section.querySelector<SVGSVGElement>('[data-shape]');
  if (!stage || !rail || !svg || !fine || reduce) return;
  const poly = svg.querySelector('polygon')!;

  let target = 0, cur = 0, raf = 0, lastStep = -1;
  poly.setAttribute('points', toAttr(SHAPES[0]));

  const trail = (step: number) => {
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.classList.add('trail');
    clone.removeAttribute('data-shape');
    clone.querySelector('polygon')!.setAttribute('points', toAttr(SHAPES[step]));
    clone.style.transform = `translateX(${(rail.clientWidth - svg.clientWidth) * (step / (SHAPES.length - 1))}px) rotate(${step * 90}deg)`;
    rail.appendChild(clone);
    requestAnimationFrame(() => (clone.style.opacity = '0.35'));
    setTimeout(() => (clone.style.opacity = '0'), 700);
    setTimeout(() => clone.remove(), 2000);
  };

  const loop = () => {
    cur += (target - cur) * 0.18;
    const w = rail.clientWidth - svg.clientWidth;
    svg.style.transform = `translateX(${cur * w}px) rotate(${cur * 270}deg)`;
    poly.setAttribute('points', toAttr(at(cur)));
    const step = Math.round(cur * (SHAPES.length - 1));
    if (step !== lastStep && Math.abs(cur * (SHAPES.length - 1) - step) < 0.06) { if (lastStep !== -1) trail(step); lastStep = step; }
    raf = Math.abs(target - cur) > 0.0005 ? requestAnimationFrame(loop) : 0;
  };

  stage.addEventListener('pointermove', (e) => {
    const r = rail.getBoundingClientRect();
    target = Math.min(1, Math.max(0, (e.clientX - r.left - svg.clientWidth / 2) / (r.width - svg.clientWidth)));
    stage.classList.add('is-live');
    if (!raf) raf = requestAnimationFrame(loop);
  });
  stage.addEventListener('pointerleave', () => stage.classList.remove('is-live'));
}
