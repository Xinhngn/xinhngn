/**
 * Chuyển động theo cuộn (GSAP + ScrollTrigger). Tải lúc rảnh, chỉ khi người xem không chọn giảm chuyển động.
 * Theo hướng dẫn GSAP trong design-on-the-flank: chỉ transform/opacity, scrub HOẶC toggleActions,
 * tạo trigger theo thứ tự trên trang, dùng matchMedia cho màn rộng/hẹp, refresh sau khi font tải xong.
 * Mọi nội dung đã đọc được trước khi file này chạy; ở đây chỉ làm đẹp.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const q = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const qa = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));

export default function motion() {
  const mm = gsap.matchMedia();

  mm.add({ wide: '(min-width: 1024px)', mid: '(min-width: 861px)' }, (ctx) => {
    const { wide, mid } = ctx.conditions as Record<string, boolean>;

    /* Mở đầu: chữ lớn trôi lên nhẹ khi rời màn hình */
    const hero = q('.hero');
    if (hero) {
      gsap.to('.hero__title', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero__face', { y: -80, rotate: -4, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    }

    /* Lời hứa: từng chữ sáng dần theo cuộn */
    const promise = q('[data-promise]');
    if (promise) {
      const words = qa('.w', promise);
      gsap.fromTo(words, { '--o': 0.14 }, { '--o': 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: promise, start: 'top 75%', end: 'center 45%', scrub: 0.6 } });
    }

    /* Đề bài: thẻ rơi lệch, cuộn tới thì tự xếp thẳng */
    const brief = q('[data-brief]');
    if (brief) {
      const cards = qa('.brief__card', brief);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: q('.brief__cards', brief), start: 'top 85%', end: mid ? 'bottom 70%' : 'top 30%', scrub: 0.8,
          onUpdate: (st) => cards.forEach((c, i) => c.classList.toggle('is-set', st.progress > 0.55 + i * 0.08)),
        },
      });
      cards.forEach((c, i) => {
        const s = i % 2 ? 1 : -1;
        tl.from(c, { x: (mid ? 90 : 26) * s * (1 + (i % 3) * 0.4), y: 40 + i * 14, rotate: s * (5 + (i % 3) * 3), ease: 'power2.out' }, i * 0.06);
      });
    }

    /* Cách làm: đường gợn sóng duỗi thẳng; màn rộng thì ghim và trượt ngang qua 4 bước */
    const method = q('[data-method]');
    if (method) {
      const path = q<SVGPathElement>('[data-wave]', method)!;
      const W = Number(path.dataset.w) || 1600;
      const state = { amp: 46 };
      const render = () => {
        let d = 'M0 60';
        for (let x = 0; x <= W; x += 20) d += ` L${x} ${(60 + Math.sin(x / 47) * state.amp * Math.sin(x / 310 + 1)).toFixed(1)}`;
        path.setAttribute('d', d);
      };
      if (wide) {
        method.classList.add('is-h');
        const pin = q('.method__pin', method)!;
        const track = q('.method__track', method)!;
        const dist = () => Math.max(0, track.scrollWidth - pin.clientWidth);
        const tl = gsap.timeline({ scrollTrigger: { trigger: pin, start: 'top top', end: () => `+=${dist() + innerHeight * 0.4}`, pin: true, scrub: 0.8, invalidateOnRefresh: true } });
        tl.to(track, { x: () => -dist(), ease: 'none' }, 0).to(state, { amp: 0, ease: 'none', onUpdate: render }, 0);
        qa('.method__step', method).forEach((s) => gsap.from(qa('.method__k, .method__d', s), { opacity: 0.15, ease: 'none', scrollTrigger: { trigger: s, containerAnimation: tl.getChildren()[0] as gsap.core.Tween, start: 'left 80%', end: 'left 45%', scrub: true } }));
        return () => method.classList.remove('is-h');
      }
      gsap.to(state, { amp: 0, ease: 'none', onUpdate: render, scrollTrigger: { trigger: method, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 } });
    }
  });

  mm.add('(min-width: 0px)', () => {
    /* Hành trình: thanh thời gian dài ra theo ngày thật */
    qa('.gantt__row').forEach((row) => {
      gsap.from(q('.gantt__track i', row), { scaleX: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: row, start: 'top 80%', toggleActions: 'play none none none' } });
    });

    /* Bằng chứng: đếm số */
    qa<HTMLElement>('[data-count]').forEach((el) => {
      const end = Number(el.dataset.count);
      const o = { v: 0 };
      gsap.to(o, { v: end, duration: 1.6, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }, onUpdate: () => { el.textContent = String(Math.round(o.v)); } });
    });

    /* Cách hợp tác: hai phiếu nghiêng rồi đứng thẳng */
    qa('[data-ticket]').forEach((t, i) => {
      gsap.from(t, { y: 90, rotateX: 18, rotateZ: i ? 3 : -3, ease: 'power2.out', scrollTrigger: { trigger: t, start: 'top 95%', end: 'top 55%', scrub: 0.7 } });
    });

    /* Kết: "say hi!" mọc lên theo từng chữ */
    const say = qa('.foot__say span');
    if (say.length) gsap.from(say, { yPercent: 70, rotate: (i) => (i % 2 ? 8 : -8), stagger: 0.05, ease: 'power3.out', scrollTrigger: { trigger: '.foot__say', start: 'top 100%', end: 'bottom 85%', scrub: 0.8 } });
  });

  /* Dự án chọn lọc: thẻ kính theo con trỏ */
  mm.add('(hover: hover) and (min-width: 900px)', () => {
    const root = q('[data-selected]');
    const float = q('[data-float]');
    if (!root || !float) return;
    const cards = qa('.sel__card', float);
    const xTo = gsap.quickTo(float, 'x', { duration: 0.55, ease: 'power3' });
    const yTo = gsap.quickTo(float, 'y', { duration: 0.55, ease: 'power3' });
    const move = (e: PointerEvent) => { xTo(e.clientX + 170); yTo(e.clientY); };
    const rows = qa<HTMLElement>('.sel__row', root);
    const enter = (i: number) => { cards.forEach((c, k) => c.classList.toggle('is-on', k === i)); float.classList.add('is-on'); gsap.to(float, { scale: 1, duration: 0.4, ease: 'back.out(1.6)' }); };
    const leave = () => { float.classList.remove('is-on'); gsap.to(float, { scale: 0.85, duration: 0.3 }); };
    gsap.set(float, { xPercent: -50, yPercent: -50, scale: 0.85 });
    const offs: Array<() => void> = [];
    rows.forEach((r, i) => {
      const on = () => enter(i);
      r.addEventListener('pointerenter', on);
      offs.push(() => r.removeEventListener('pointerenter', on));
    });
    root.addEventListener('pointermove', move);
    root.addEventListener('pointerleave', leave);
    return () => { offs.forEach((f) => f()); root.removeEventListener('pointermove', move); root.removeEventListener('pointerleave', leave); };
  });

  /* Nút hút nhẹ theo con trỏ */
  mm.add('(hover: hover)', () => {
    const offs: Array<() => void> = [];
    qa<HTMLElement>('[data-magnet]').forEach((b) => {
      const xTo = gsap.quickTo(b, 'x', { duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      const yTo = gsap.quickTo(b, 'y', { duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      const move = (e: PointerEvent) => { const r = b.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * 0.25); yTo((e.clientY - r.top - r.height / 2) * 0.35); };
      const out = () => { xTo(0); yTo(0); };
      b.addEventListener('pointermove', move);
      b.addEventListener('pointerleave', out);
      offs.push(() => { b.removeEventListener('pointermove', move); b.removeEventListener('pointerleave', out); });
    });
    return () => offs.forEach((f) => f());
  });

  // đo lại sau khi font và ảnh đã tải
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}
