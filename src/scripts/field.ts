/**
 * Nền mở đầu: các đường đồng mức gợn sóng (đề bài rối). Gần con trỏ, hoặc khi cuộn xuống,
 * các đường tự duỗi thẳng ("gỡ rối"). WebGL2 tự viết, không thư viện, ~3 KB.
 * Theo hướng dẫn design-on-the-flank: kiểm tra biên dịch shader, đổi cỡ theo phần tử,
 * giới hạn DPR, dừng khi khuất, mất context thì tắt, giảm chuyển động thì vẽ một khung tĩnh.
 */

const VERT = `#version 300 es
in vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPtr;
uniform float uNear;
uniform float uCalm;
uniform vec3 uA;
uniform vec3 uB;
out vec4 o;

vec2 h2(vec2 p){ p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3))); return -1.0 + 2.0 * fract(sin(p) * 43758.5453); }
float n2(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(dot(h2(i), f), dot(h2(i + vec2(1, 0)), f - vec2(1, 0)), u.x),
             mix(dot(h2(i + vec2(0, 1)), f - vec2(0, 1)), dot(h2(i + vec2(1, 1)), f - vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p){ float a = 0.5, s = 0.0; for (int k = 0; k < 4; k++){ s += a * n2(p); p *= 2.03; a *= 0.5; } return s; }

void main(){
  vec2 uv = gl_FragCoord.xy / uRes.y;
  float ax = gl_FragCoord.x / uRes.x;
  float t = uTime * 0.06;
  float chaos = fbm(uv * 1.35 + vec2(t, -t * 0.7)) * 1.6 + fbm(uv * 3.1 - t) * 0.35;
  vec2 ptr = uPtr / uRes.y;
  float near = smoothstep(0.42, 0.0, distance(uv, ptr)) * uNear;
  float order = clamp(uCalm + near, 0.0, 1.0);
  float f = uv.y * 1.1 + chaos * (1.0 - order);
  float g = f * 13.0;
  float w = fwidth(g);
  float line = 1.0 - smoothstep(0.6, 1.9, abs(fract(g) - 0.5) / max(w, 1e-4));
  float band = step(0.5, fract(g * 0.5));
  vec3 col = mix(uA, uB, smoothstep(0.0, 1.0, ax + chaos * 0.3));
  float side = 0.45 + 0.55 * smoothstep(0.1, 0.95, ax);
  float a = (line * 0.62 + band * 0.07) * side * (0.75 + 0.25 * order);
  o = vec4(col * a, a);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); gl.deleteShader(s); return null; }
  return s;
}

const hex = (h: string) => { const n = parseInt(h.replace('#', ''), 16); return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]; };

export default function field(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: 'low-power' });
  if (!gl) return;
  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return;
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.warn(gl.getProgramInfoLog(prog)); return; }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const u = (n: string) => gl.getUniformLocation(prog, n);
  const uRes = u('uRes'), uTime = u('uTime'), uPtr = u('uPtr'), uNear = u('uNear'), uCalm = u('uCalm');
  const css = getComputedStyle(document.documentElement);
  gl.uniform3fv(u('uA'), hex(css.getPropertyValue('--acc').trim() || '#c91f55'));
  gl.uniform3fv(u('uB'), hex(css.getPropertyValue('--acc-2').trim() || '#e24a7a'));
  gl.clearColor(0, 0, 0, 0);

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;
  const dpr = Math.min(devicePixelRatio || 1, coarse ? 1.25 : 1.5);
  const hero = canvas.parentElement as HTMLElement;

  // con trỏ làm mượt bằng lerp; trên điện thoại "điểm gỡ rối" tự trôi chậm
  const ptr = { x: 0, y: 0, tx: 0, ty: 0, near: 0, tnear: 0 };
  let w = 0, h = 0;
  const resize = () => {
    const r = canvas.getBoundingClientRect();
    if (!r.width || !r.height) return;
    w = Math.round(r.width * dpr); h = Math.round(r.height * dpr);
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
    if (!ptr.tx) { ptr.tx = ptr.x = w * 0.72; ptr.ty = ptr.y = h * 0.6; }
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    ptr.tx = (e.clientX - r.left) * dpr;
    ptr.ty = (r.bottom - e.clientY) * dpr;
    ptr.tnear = 1;
  };
  const onLeave = () => { ptr.tnear = 0; };
  hero.addEventListener('pointermove', onMove, { passive: true });
  hero.addEventListener('pointerleave', onLeave);

  let calm = 0;
  const onScroll = () => { calm = Math.min(1, Math.max(0, scrollY / (hero.offsetHeight * 0.8))); };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  let raf = 0, visible = true, lost = false;
  const t0 = performance.now();
  const draw = (now: number) => {
    const t = (now - t0) / 1000;
    if (coarse) { ptr.tx = w * (0.5 + 0.3 * Math.sin(t * 0.35)); ptr.ty = h * (0.45 + 0.2 * Math.cos(t * 0.27)); ptr.tnear = 0.85; }
    ptr.x += (ptr.tx - ptr.x) * 0.08; ptr.y += (ptr.ty - ptr.y) * 0.08; ptr.near += (ptr.tnear - ptr.near) * 0.05;
    gl.uniform2f(uRes, w, h);
    gl.uniform1f(uTime, reduce ? 12 : t + 12);
    gl.uniform2f(uPtr, ptr.x, ptr.y);
    gl.uniform1f(uNear, ptr.near);
    gl.uniform1f(uCalm, calm);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  const loop = (now: number) => {
    draw(now);
    raf = visible && !reduce && !lost ? requestAnimationFrame(loop) : 0;
  };
  const start = () => { if (!raf && !reduce && !lost) raf = requestAnimationFrame(loop); };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };

  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting && !document.hidden; visible ? start() : stop(); });
  io.observe(canvas);
  document.addEventListener('visibilitychange', () => { visible = !document.hidden; visible ? start() : stop(); });

  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); lost = true; stop(); canvas.classList.remove('is-on'); });

  draw(performance.now());
  canvas.classList.add('is-on');
  if (!reduce) start();
  else addEventListener('scroll', () => requestAnimationFrame(draw), { passive: true });
}
