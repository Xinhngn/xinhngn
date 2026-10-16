// XINH AI on the open screen (ref: millascope + Xinh's character handoff). The approved character
// render, cut out, plus a depth map, drawn with WebGL2: each pixel shifts by its depth as the pointer
// moves, so the head turns slightly toward the cursor and a soft light follows the same direction,
// while the eyes keep their straight-on contact. Draws only while something moves.

export interface Face { color: string; depth: string }

export interface Head3D {
  /** pointer position over the page, -1..1 on both axes */
  aim(x: number, y: number): void;
  /** swap to another face (index into the list given to mountHead3D) */
  show(i: number): void;
  stop(): void;
}

const VS = `#version 300 es
in vec2 p; out vec2 uv;
void main(){ uv = vec2(p.x * .5 + .5, .5 - p.y * .5); gl_Position = vec4(p, 0., 1.); }`;

// Fixed-point parallax: find the source pixel whose depth puts it under this one.
// Depth is pre-blurred, which keeps the iteration stable at the silhouette.
const FS = `#version 300 es
precision highp float;
in vec2 uv; out vec4 o;
uniform sampler2D tc, td; uniform vec2 m; uniform float amp, px;
void main(){
  vec2 q = uv;
  for (int i = 0; i < 6; i++){ float d = texture(td, q).r; q = uv - m * amp * (d - .38); }
  vec4 c = texture(tc, q);
  float d = texture(td, q).r;
  // normal from the depth map, lit from the pointer side
  float dx = texture(td, q + vec2(px, 0.)).r - texture(td, q - vec2(px, 0.)).r;
  float dy = texture(td, q + vec2(0., px)).r - texture(td, q - vec2(0., px)).r;
  vec3 n = normalize(vec3(-dx * 6., -dy * 6., 1.));
  vec3 L = normalize(vec3(m.x * .7, -m.y * .6 - .35, .9));
  float lam = clamp(dot(n, L), 0., 1.);
  vec3 col = c.rgb * (.95 + .12 * lam);
  // a pink rim where the head curves away
  float rim = pow(1. - clamp(n.z, 0., 1.), 1.6) * smoothstep(.05, .3, d);
  col += vec3(1., .8, .86) * rim * .18 * c.a;
  // gentle gloss on the closest surfaces
  col += vec3(1.) * pow(lam, 18.) * .06 * smoothstep(.55, .9, d);
  float a = c.a;
  o = vec4(col, a); // texture is premultiplied already
}`;

function load(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => { const im = new Image(); im.decoding = 'async'; im.onload = () => res(im); im.onerror = rej; im.src = src; });
}

export function mountHead3D(cv: HTMLCanvasElement, faces: Face[], onReady?: () => void): Head3D | null {
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
  const uM = U('m'), uAmp = U('amp'), uPx = U('px');
  gl.uniform1i(U('tc'), 0); gl.uniform1i(U('td'), 1);
  gl.uniform1f(uAmp, 0.05);
  gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  const tex = (im: HTMLImageElement) => {
    const t = gl.createTexture()!; gl.bindTexture(gl.TEXTURE_2D, t);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return t;
  };
  const set: { c: WebGLTexture; d: WebGLTexture; w: number }[] = [];
  let cur = 0, tx = 0, ty = 0, x = 0, y = 0, raf = 0, dead = false;

  const size = () => {
    const r = cv.getBoundingClientRect(), k = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(r.width * k)), h = Math.max(1, Math.round(r.height * k));
    if (cv.width !== w || cv.height !== h){ cv.width = w; cv.height = h; }
  };
  const draw = () => {
    const f = set[cur]; if (!f) return;
    size(); gl.viewport(0, 0, cv.width, cv.height);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, f.c);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, f.d);
    gl.uniform2f(uM, x, y); gl.uniform1f(uPx, 2 / f.w);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
  const frame = () => {
    raf = 0; if (dead) return;
    x += (tx - x) * 0.12; y += (ty - y) * 0.12;
    draw();
    if (Math.abs(tx - x) + Math.abs(ty - y) > 0.002) raf = requestAnimationFrame(frame);
  };
  const kick = () => { if (!raf && !dead) raf = requestAnimationFrame(frame); };

  Promise.all(faces.map(f => Promise.all([load(f.color), load(f.depth)]))).then(list => {
    if (dead) return;
    list.forEach(([c, d]) => set.push({ c: tex(c), d: tex(d), w: c.naturalWidth }));
    draw(); if (onReady) onReady();
  }).catch(() => { /* keep the plain image underneath */ });
  const ro = 'ResizeObserver' in window ? new ResizeObserver(() => kick()) : null;
  if (ro) ro.observe(cv);

  return {
    aim(nx, ny){ tx = Math.max(-1, Math.min(1, nx)); ty = Math.max(-1, Math.min(1, ny)); kick(); },
    show(i){ cur = ((i % faces.length) + faces.length) % faces.length; draw(); },
    stop(){ dead = true; if (raf) cancelAnimationFrame(raf); if (ro) ro.disconnect(); }
  };
}
