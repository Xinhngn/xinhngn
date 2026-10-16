// XINH AI on the open screen (ref: millascope + Xinh's character handoff). The approved full-bun
// portrait, cut out, plus a depth map, drawn with WebGL2: each pixel shifts a little by its depth as the
// pointer moves, so the head turns slightly toward the cursor while the eyes keep their straight-on
// contact, and a soft studio key light follows the same direction. A small patch of closed eyes (made
// from the same portrait) is blended in for blinks and for the wink on click. Draws only while
// something moves.

export interface Head3DAssets {
  color: string;
  depth: string;
  /** closed-eyes patch and where it sits on the portrait, as fractions [x0, y0, x1, y1] */
  lids?: { src: string; rect: [number, number, number, number]; split: number };
}

export interface Head3D {
  /** pointer position relative to the head, -1..1 on both axes */
  aim(x: number, y: number): void;
  blink(): void;
  /** close one eye for a beat */
  wink(): void;
  stop(): void;
}

const VS = `#version 300 es
in vec2 p; out vec2 uv;
void main(){ uv = vec2(p.x * .5 + .5, .5 - p.y * .5); gl_Position = vec4(p, 0., 1.); }`;

// Fixed-point parallax: find the source pixel whose depth puts it under this one.
// Depth is blurred hard inside the silhouette so the face moves as one piece (no feature drags
// ahead of the rest and stretches it), which also keeps the iteration stable at the edge.
const FS = `#version 300 es
precision highp float;
in vec2 uv; out vec4 o;
uniform sampler2D tc, td, tl;
uniform vec2 m, fit; uniform float amp, px, split, lidA, lidB, hasLids; uniform vec4 rect;
void main(){
  // vertical travel kept small: a big up/down shift reads as a longer face
  // draw the portrait at its own proportions whatever the box does (letterbox, never stretch)
  vec2 st = (uv - .5) * fit + .5;
  if (st.x < 0. || st.x > 1. || st.y < 0. || st.y > 1.) { o = vec4(0.); return; }
  vec2 mm = vec2(m.x, m.y * .45), q = st;
  for (int i = 0; i < 5; i++){ float d = texture(td, q).r; q = st - mm * amp * (d - .45); }
  vec4 c = texture(tc, q);
  float d = texture(td, q).r;
  vec3 col = c.rgb;
  // closed eyes: blend the patch in, one side or both
  if (hasLids > .5 && q.x > rect.x && q.x < rect.z && q.y > rect.y && q.y < rect.w){
    vec2 lp = (q - rect.xy) / (rect.zw - rect.xy);
    float k = mix(lidA, lidB, smoothstep(split - .06, split + .06, lp.x));
    // feathered edges, so the patch never shows as a pasted box
    k *= smoothstep(0., .1, lp.x) * smoothstep(1., .9, lp.x) * smoothstep(0., .22, lp.y) * smoothstep(1., .78, lp.y);
    col = mix(col, texture(tl, lp).rgb * c.a, k);
  }
  // soft studio key from the pointer side, broad gradients only
  float dx = texture(td, q + vec2(px, 0.)).r - texture(td, q - vec2(px, 0.)).r;
  float dy = texture(td, q + vec2(0., px)).r - texture(td, q - vec2(0., px)).r;
  vec3 n = normalize(vec3(-dx * 5., -dy * 5., 1.));
  vec3 L = normalize(vec3(m.x * .6 - .25, -m.y * .5 - .45, .85));
  float lam = clamp(dot(n, L), 0., 1.);
  col *= .93 + .14 * lam;
  // warm rim where the head turns away from the light, so she sits in the room
  float rim = pow(1. - clamp(n.z, 0., 1.), 2.) * smoothstep(.04, .25, d) * clamp(-dot(n.xy, L.xy) * 2. + .3, 0., 1.);
  col += vec3(1., .9, .9) * rim * .16 * c.a;
  // light wrap: the blush of the room bleeds a little into her outline, and a soft grade toward the
  // scene's warm pink, so she sits in the space instead of looking cut out and pasted on
  float ab = 0.;
  for (int i = 0; i < 8; i++){ float an = float(i) * .785398; ab += texture(tc, q + vec2(cos(an), sin(an)) * px * 3.5).a; }
  ab /= 8.;
  float wrap = clamp(c.a * (1. - ab) * 1.8, 0., .6);
  col = mix(col, vec3(.99, .9, .93) * c.a, wrap);
  col = mix(col, col * vec3(1.03, .97, .99) + vec3(.025, .015, .02) * c.a, .55);
  o = vec4(col, c.a); // the texture is premultiplied already
}`;

function load(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => { const im = new Image(); im.decoding = 'async'; im.onload = () => res(im); im.onerror = rej; im.src = src; });
}

export function mountHead3D(cv: HTMLCanvasElement, a: Head3DAssets, onReady?: () => void): Head3D | null {
  const gl = cv.getContext('webgl2', { premultipliedAlpha: true, alpha: true, antialias: false });
  if (!gl) return null;
  const sh = (t: number, s: string) => { const x = gl.createShader(t)!; gl.shaderSource(x, s); gl.compileShader(x); return x; };
  const pr = gl.createProgram()!;
  gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
  gl.useProgram(pr);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = (n: string) => gl.getUniformLocation(pr, n);
  const uM = U('m'), uFit = U('fit'), uPx = U('px'), uA = U('lidA'), uB = U('lidB');
  gl.uniform1i(U('tc'), 0); gl.uniform1i(U('td'), 1); gl.uniform1i(U('tl'), 2);
  gl.uniform1f(U('amp'), 0.016);
  gl.uniform1f(U('hasLids'), 0);
  gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  const tex = (im: HTMLImageElement, unit: number, premul: boolean) => {
    const t = gl.createTexture()!; gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, premul);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  };
  let ready = false, tx = 0, ty = 0, x = 0, y = 0, raf = 0, dead = false, w = 1, ta = 1;
  let blinkAt = -1e9, winkAt = -1e9, nextBlink = performance.now() + 2600;

  const size = () => {
    const r = cv.getBoundingClientRect(), k = Math.min(window.devicePixelRatio || 1, 2);
    const cw = Math.max(1, Math.round(r.width * k)), ch = Math.max(1, Math.round(r.height * k));
    if (cv.width !== cw || cv.height !== ch){ cv.width = cw; cv.height = ch; }
  };
  // a lid closing then opening over `len` ms, holding shut for `hold` of it
  const lid = (now: number, at: number, len: number, hold: number) => {
    const k = (now - at) / len; if (k < 0 || k > 1) return 0;
    const e = (1 - hold) / 2; return Math.min(1, k / e, (1 - k) / e);
  };
  const draw = (now: number) => {
    if (!ready) return;
    size(); gl.viewport(0, 0, cv.width, cv.height);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    // a blink never lands inside a wink (that read as an extra closed-eye frame)
    const wk = lid(now, winkAt, 640, .5), b = now - winkAt < 760 ? 0 : lid(now, blinkAt, 150, .2);
    const ca = cv.width / cv.height;
    gl.uniform2f(uFit, ca > ta ? ca / ta : 1, ca > ta ? 1 : ta / ca);
    gl.uniform2f(uM, x, y); gl.uniform1f(uPx, 2 / w);
    gl.uniform1f(uA, Math.max(b, wk)); gl.uniform1f(uB, b);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
  const busy = (now: number) => Math.abs(tx - x) + Math.abs(ty - y) > 0.002 || now - blinkAt < 170 || now - winkAt < 660;
  const frame = (now: number) => {
    raf = 0; if (dead) return;
    x += (tx - x) * 0.12; y += (ty - y) * 0.12;
    draw(now);
    if (busy(now)) raf = requestAnimationFrame(frame);
  };
  const kick = () => { if (!raf && !dead) raf = requestAnimationFrame(frame); };
  // blinks keep coming while nothing else moves, without a loop running in between
  const tick = window.setInterval(() => {
    const now = performance.now();
    if (dead || document.hidden || !ready || now < nextBlink) return;
    blinkAt = now; nextBlink = now + 2800 + Math.random() * 2800; kick();
  }, 300);

  Promise.all([load(a.color), load(a.depth), a.lids ? load(a.lids.src) : Promise.resolve(null)]).then(([c, d, l]) => {
    if (dead) return;
    tex(c, 0, true); tex(d, 1, false); w = c.naturalWidth; ta = c.naturalWidth / c.naturalHeight;
    if (l && a.lids){
      tex(l, 2, false);
      const r = a.lids.rect; gl.uniform4f(U('rect'), r[0], r[1], r[2], r[3]);
      gl.uniform1f(U('split'), a.lids.split); gl.uniform1f(U('hasLids'), 1);
    }
    ready = true; draw(performance.now()); if (onReady) onReady();
  }).catch(() => { /* keep the plain image underneath */ });
  const ro = 'ResizeObserver' in window ? new ResizeObserver(() => kick()) : null;
  if (ro) ro.observe(cv);

  return {
    aim(nx, ny){ tx = Math.max(-1, Math.min(1, nx)); ty = Math.max(-1, Math.min(1, ny)); kick(); },
    blink(){ blinkAt = performance.now(); kick(); },
    wink(){ const now = performance.now(); winkAt = now; blinkAt = -1e9; nextBlink = now + 2200 + Math.random() * 1600; kick(); },
    stop(){ dead = true; if (raf) cancelAnimationFrame(raf); clearInterval(tick); if (ro) ro.disconnect(); }
  };
}
