// Xinh's 3D character on the open screen (v21): a glossy "porcelain toy" head raymarched from
// signed distance fields in one WebGL2 shader. No model files, no three.js. The head turns a little
// and the eyes look straight at the viewer, then follow the pointer; it blinks on its own and winks
// on click. Draws only while something moves.

export interface Avatar3D {
  /** pointer position relative to the head, -1..1 on both axes (y grows downward) */
  aim(x: number, y: number): void;
  wink(): void;
  stop(): void;
}

const VS = `#version 300 es
in vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`;

const FS = `#version 300 es
precision highp float;
out vec4 o;
uniform vec2 res; uniform vec2 gaze; uniform vec2 turn; uniform float blink; uniform float wink;
float sdE(vec3 p, vec3 r){ float k0=length(p/r), k1=length(p/(r*r)); return k0*(k0-1.)/k1; }
float smin(float a,float b,float k){ float h=clamp(.5+.5*(b-a)/k,0.,1.); return mix(b,a,h)-k*h*(1.-h); }
float smax(float a,float b,float k){ return -smin(-a,-b,k); }
float sdCap(vec3 p, vec3 a, vec3 b, float r){ vec3 pa=p-a, ba=b-a; float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.); return length(pa-ba*h)-r; }
mat2 rot(float a){ float c=cos(a),s=sin(a); return mat2(c,-s,s,c); }
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
const vec3 EL=vec3(-.205,.03,.415), ER=vec3(.205,.03,.415); const float EYR=.122;
// lid opening: above upLine and below loLine is covered. xo = outward x (positive towards outer corner)
float upLine(float xo, float cl){ return mix(.034 - 2.3*xo*xo + .3*xo, -.085, cl); }
float loLine(float xo){ return -.066 + 1.5*xo*xo + .14*xo; }
float lid(vec3 p, vec3 c, float cl){
  vec3 q=p-c; float xo = c.x<0. ? -q.x : q.x;
  float sh=abs(length(q)-.13)-mix(.004,.009,smoothstep(-.04,.04,q.y));
  float open = min(upLine(xo,cl)-q.y, q.y-loLine(xo)); // >0 inside the opening
  return max(sh, open);
}
float headD(vec3 p, out float lipD){
  vec3 q=p; float x=abs(q.x); vec3 qs=vec3(x,q.yz);
  float d=sdE(q-vec3(0,.16,-.04),vec3(.6,.64,.62));
  // face: one egg that narrows smoothly to a small chin
  vec3 qf=q; float ty=-(q.y+.05); float tp=.5*(ty+sqrt(ty*ty+.004)); qf.x*=1.+1.6*tp*tp+.45*tp; qf.z*=1.+.25*tp;
  d=smin(d,sdE(qf-vec3(0,-.08,.1),vec3(.47,.53,.49)),.18);
  // soft cheek apples
  d=smin(d,sdE(qs-vec3(.235,-.12,.37),vec3(.14,.09,.12)),.13);
  // brow ridge + eye sockets
  d=smin(d,sdE(q-vec3(0,.19,.45),vec3(.38,.06,.1)),.12);
  d=smax(d,-sdE(qs-vec3(.205,.03,.52),vec3(.15,.09,.1)),.05);
  // nose
  float n=sdCap(q,vec3(0,.02,.56),vec3(0,-.165,.655),.028);
  n=smin(n,length(q-vec3(0,-.175,.645))-.042,.04);
  n=smin(n,length(qs-vec3(.046,-.195,.6))-.028,.03);
  d=smin(d,n,.06);
  d=smax(d,-sdE(qs-vec3(.03,-.222,.628),vec3(.017,.01,.02)),.012);
  // philtrum
  d=smax(d,-sdCap(q,vec3(0,-.245,.635),vec3(0,-.3,.612),.011),.025);
  // lips, a smirk: the right corner lifts
  vec3 qm=q; qm.y-= 1.4*q.x*q.x + .22*q.x; qm.z+=.012;
  float lu=sdE(qm-vec3(0,-.335,.555),vec3(.082,.018,.032));
  lu=smin(lu,sdE(vec3(abs(qm.x),qm.yz)-vec3(.026,-.32,.567),vec3(.04,.017,.03)),.018);
  float ll=sdE(qm-vec3(0,-.366,.548),vec3(.068,.027,.038));
  lipD=min(lu,ll);
  d=smin(d,lipD,.045);
  d=smax(d,-sdE(qm-vec3(0,-.35,.59),vec3(.088,.0035,.05)),.004);
  // smirk dimple on the lifted side
  d=smax(d,-(length(q-vec3(.115,-.322,.53))-.012),.02);
  // ears
  d=smin(d,sdE(qs-vec3(.585,-.03,-.03),vec3(.06,.13,.09)),.05);
  // lids
  d=smin(d,min(lid(p,EL,max(blink,wink)),lid(p,ER,blink)),.012);
  return d;
}
float hairD(vec3 p){
  vec3 q=p; float x=abs(q.x);
  float cap=sdE(q-vec3(0,.2,-.04),vec3(.66,.75,.69));
  float fc=sdE(q-vec3(0,-.22,.56),vec3(.45,.62,.5));
  cap=smax(cap,-fc,.05);
  // curtains swooping from the part over the temples
  float cl=sdCap(vec3(x,q.yz),vec3(.28,.45,.42),vec3(.55,-.62,.2),.1);
  cl=smin(cl,sdCap(vec3(x,q.yz),vec3(.5,-.42,.22),vec3(.6,-.7,.1),.085),.08);
  float back=sdE(q-vec3(0,-.12,-.2),vec3(.68,.72,.5));
  float h=smin(cap,cl,.1); h=smin(h,back,.15);
  h=smax(h,sdE(q-vec3(0,-.05,-.02),vec3(.78,.86,.8)),.1);
  // keep the space under the chin open, so the head floats
  h=smax(h,-sdE(q-vec3(0,-.78,.28),vec3(.4,.34,.55)),.08);
  // the side hair hugs the face so turning never shows a gap
  h=smin(h,sdE(vec3(abs(q.x),q.yz)-vec3(.44,-.12,.12),vec3(.12,.42,.3)),.1);
  h=smax(h,-fc*1.,.0);
  // centre part
  h+= .012*exp(-q.x*q.x/.0008)*smoothstep(.25,.55,q.y)*smoothstep(-.3,.2,q.z);
  // broad sculpted strands
  float ang=atan(q.x,q.z+.25);
  h+= .011*sin(ang*16.+q.y*2.5+sin(q.y*3.)*.8);
  return h;
}
float cutY(vec3 q){ return .2+.17*q.z; }
float beanieD(vec3 p){
  vec3 q=p; q.xy=rot(.1)*q.xy;
  float b=sdE(q-vec3(0,.2,-.05),vec3(.69,.76,.71));
  float pl=cutY(q)-q.y;               // >0 below the cuff edge
  b=smax(b,pl,.03);
  // rolled cuff: a thicker band just above the edge
  float band=abs(q.y-cutY(q)-.075)-.075;
  float cuff=smax(sdE(q-vec3(0,.2,-.05),vec3(.72,.78,.74)),band,.03);
  cuff=smax(cuff,pl,.02);
  return smin(b,cuff,.02);
}
float silverD(vec3 p){
  vec3 h=vec3(abs(p.x),p.yz)-vec3(.6,-.25,.06);
  return length(vec2(length(h.yz)-.065,h.x))-.012;
}
float lipG;
vec2 map(vec3 p){
  p.xz=rot(turn.x)*p.xz; p.yz=rot(turn.y)*p.yz;
  float ld; float f=headD(p,ld); lipG=ld; vec2 r=vec2(f,1.);
  float nk=sdCap(p,vec3(0,-.35,.0),vec3(0,-1.1,-.05),.18);
  if(nk<r.x) r=vec2(nk,7.);
  float bn=beanieD(p);
  float h=smax(hairD(p),-bn+.004,.01); if(h<r.x) r=vec2(h,2.);
  float e=min(length(p-EL)-EYR,length(p-ER)-EYR); if(e<r.x) r=vec2(e,3.);
  float s=silverD(p); if(s<r.x) r=vec2(s,5.);
  if(bn<r.x) r=vec2(bn,6.);
  if (r.y==1. && lipG<r.x+.006 && p.y<-.3 && p.y>-.43 && abs(p.x)<.13) r.y=4.;
  return r;
}
vec3 nrm(vec3 p){ vec2 e=vec2(.0012,0); return normalize(vec3(map(p+e.xyy).x-map(p-e.xyy).x,map(p+e.yxy).x-map(p-e.yxy).x,map(p+e.yyx).x-map(p-e.yyx).x)); }
float ao(vec3 p, vec3 n){ float a=0., s=1.; for(int i=1;i<=5;i++){ float h=.025*float(i); a+=(h-map(p+n*h).x)*s; s*=.7; } return clamp(1.-a*3.5,0.,1.); }
vec3 local(vec3 p){ p.xz=rot(turn.x)*p.xz; p.yz=rot(turn.y)*p.yz; return p; }
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*res)/res.y;
  vec3 ro=vec3(0,.05,6.), rd=normalize(vec3(uv,-2.85));
  // bounding sphere: skip the empty corners and start each ray at the head
  vec3 oc=ro-vec3(0,.03,0); float bb=dot(oc,rd), cc=dot(oc,oc)-1.2*1.2, disc=bb*bb-cc;
  if(disc<0.){ o=vec4(0); return; }
  float t=max(-bb-sqrt(disc),0.), tEnd=-bb+sqrt(disc), md=1e9, tm=t; vec2 h=vec2(1e9,0.), hm=h; bool hit=false;
  for(int i=0;i<110;i++){ vec3 p=ro+rd*t; h=map(p); if(h.x/t<md){md=h.x/t; tm=t; hm=h;} if(h.x<.0006){hit=true;break;} t+=h.x*.85; if(t>tEnd) break; }
  float px=1.5/res.y;
  if(!hit){ float a=1.-smoothstep(0.,px*.9,md); if(a<.01){o=vec4(0);return;} }
  if(!hit){ t=tm; h=hm; }
  vec3 p=ro+rd*t, n=nrm(p), v=-rd, pl=local(p);
  vec3 L=normalize(vec3(-.55,.6,.7)), F=normalize(vec3(.8,.05,.5)), R=normalize(vec3(.2,.5,-.9));
  float dif=max(dot(n,L),0.), wrap=max((dot(n,L)+.25)/1.25,0.), fil=max(dot(n,F),0.)*.6, rim=pow(max(dot(n,R),0.),2.)*.0;
  float occ=ao(p,n);
  vec3 H=normalize(L+v); float nh=max(dot(n,H),0.), fr=pow(1.-max(dot(n,v),0.),4.);
  vec3 sky=vec3(.62,.75,.95), rimC=vec3(1.,.6,.78);
  vec3 col; float id=h.y;
  if (id<1.5){
    vec3 qs=vec3(abs(pl.x),pl.yz);
    vec3 base=vec3(1.,.79,.68);
    // blush + nose tip + freckles
    vec3 cb=(qs-vec3(.27,-.15,.42))*vec3(1.,1.5,1.); base=mix(base,vec3(1.,.6,.62),.42*exp(-dot(cb,cb)/.012));
    vec3 nt=pl-vec3(0,-.18,.66); base=mix(base,vec3(1.,.62,.62),.3*exp(-dot(nt,nt)/.004));
    vec2 fg=pl.xy*90.; float fz=hash(floor(fg)); float fd=length(fract(fg)-.5);
    float frArea=exp(-dot((qs-vec3(.16,-.13,.5))*vec3(1.,1.8,1.),(qs-vec3(.16,-.13,.5))*vec3(1.,1.8,1.))/.012);
    base=mix(base,vec3(.78,.45,.36),step(.8,fz)*smoothstep(.3,.15,fd)*frArea*.7);
    // brows: the left one raised (mischief)
    float side=pl.x<0.?1.:0.;
    float by=.195+side*.03-1.6*(qs.x-.2)*(qs.x-.2)+ (qs.x-.2)*(.12-side*.1);
    float brow=smoothstep(.02,.004,abs(qs.y-by)-(.017-.05*max(qs.x-.2,0.)))*smoothstep(.36,.3,qs.x)*smoothstep(.06,.1,qs.x)*step(.3,qs.z);
    base=mix(base,vec3(.2,.12,.09),.9*brow);
    // eyeliner on the lid edge + a wing
    vec3 c=pl.x<0.?EL:ER; vec3 ql=pl-c; float xo=pl.x<0.?-ql.x:ql.x; float cl=pl.x<0.?max(blink,wink):blink;
    float ul=upLine(xo,cl); float onLid=step(length(ql),.15)*step(-.02,ql.z);
    float liner=smoothstep(.016,.004,abs(ql.y-ul-.008))*onLid*step(-.1,xo);
    vec2 wa=vec2(.085,ul-.005), wb=vec2(.15,.06); vec2 pq=vec2(xo,ql.y); vec2 pa=pq-wa, ba=wb-wa; float hh=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);
    float wing=smoothstep(.012*(1.-hh)+.002,.0,length(pa-ba*hh))*step(.2,ql.z+.2);
    base=mix(base,vec3(.06,.03,.03),max(liner,wing*.95)); float matte=1.-.85*max(brow,max(liner,wing));
    // eyeshadow
    float es=exp(-pow((ql.y-ul-.03)/.03,2.))*smoothstep(.17,.1,length(ql.xz))*step(0.,ql.z);
    base=mix(base,vec3(.93,.55,.55),.35*es);
    vec3 sss=vec3(1.,.4,.3)*(wrap-dif)*.55;
    col=base*(wrap*vec3(1.,.95,.9)*1.1+sss)+base*fil*vec3(1.,.82,.86)*.45+base*vec3(1.,.85,.85)*.16;
    col*=mix(.55,1.,occ);
    col+=vec3(1.)*(pow(nh,30.)*.5+pow(nh,260.)*1.2)*occ*matte; vec3 H2=normalize(F+v); col+=vec3(1.,.9,.95)*pow(max(dot(n,H2),0.),90.)*.35*occ*matte;
    col+=rimC*fr*.35;
  } else if (id<2.5){
    vec3 base=vec3(.13,.075,.06);
    col=base*(.25+dif*.95)*mix(.4,1.,occ)+base*fil*.4;
    vec3 T=normalize(vec3(0,1,0)-n*n.y);
    float th=dot(T,H); float an=pow(sqrt(max(1.-th*th,0.)),80.);
    col+=vec3(.9,.75,.7)*(pow(nh,60.)*.55+an*.25)*occ;
    col+=rimC*fr*.3;
  } else if (id<3.5){
    vec3 c=pl.x<0.?EL:ER; vec3 d=normalize(pl-c);
    vec3 g=normalize(vec3(gaze.x*.5,gaze.y*.4,1.));
    float a=acos(clamp(dot(d,g),-1.,1.));
    float ang=atan(d.y,d.x);
    vec3 ir=mix(vec3(.55,.32,.18),vec3(.2,.1,.06),smoothstep(.12,.5,a));
    ir*=.85+.25*sin(ang*40.)*smoothstep(.16,.3,a);
    vec3 e=mix(ir,vec3(1.,.99,.98),smoothstep(.52,.56,a));
    e=mix(vec3(.08,.04,.03),e,smoothstep(.0,.05,abs(a-.54))*.7+.3*step(.54,a));
    e=mix(vec3(.015),e,smoothstep(.18,.21,a));
    // lid shadow on the eyeball
    vec3 ql=pl-c; float xo=pl.x<0.?-ql.x:ql.x; float cl=pl.x<0.?max(blink,wink):blink;
    float lsh=smoothstep(-.03,.01,ql.y-upLine(xo,cl)+.03);
    col=e*(.55+.65*wrap)*mix(1.,.5,lsh);
    col+=vec3(1.)*(pow(nh,600.)*3.+pow(nh,90.)*.25)+sky*fr*.3;
  } else if (id<4.5){
    vec3 base=mix(vec3(.93,.48,.52),vec3(.82,.33,.4),smoothstep(-.33,-.38,pl.y));
    col=base*(wrap*1.05+.15)+base*fil*.3;
    col*=mix(.6,1.,occ);
    col+=vec3(1.)*(pow(nh,70.)*.9+pow(nh,400.)*1.)+rimC*fr*.2;
  } else if (id>6.5){
    vec3 base=vec3(1.,.74,.64);
    col=base*(.12+.4*wrap)*mix(.3,1.,occ)*smoothstep(-.9,-.55,pl.y);
  } else if (id>5.5){
    // fuzzy knit beanie in brand pink, ribbed cuff
    float cy=pl.y-cutY(pl); float ang=atan(pl.x,pl.z);
    float rib=step(cy,.15)*(.5+.5*sin(ang*70.));
    vec2 fq=vec2(ang*60.,pl.y*55.); float fz=hash(floor(fq))*.5+hash(floor(fq*2.3))*.5;
    vec3 nn=normalize(n+vec3(fz-.5,hash(floor(fq*1.7))-.5,0.)*.35);
    float dd=max(dot(nn,L),0.), ww=max((dot(nn,L)+.5)/1.5,0.);
    vec3 base=vec3(1.,.5,.72)*(.85+.15*fz)*(1.-.18*rib);
    col=base*(.2+ww*.95)*mix(.5,1.,occ)+base*fil*.35;
    col+=vec3(1.,.85,.92)*pow(1.-max(dot(n,v),0.),2.)*.35; // peach fuzz on the silhouette
  } else {
    vec3 r=reflect(rd,n);
    col=mix(vec3(.45,.48,.58),vec3(1.),smoothstep(-.3,.7,r.y))*(.55+.6*dif)+vec3(1.)*pow(nh,120.)*1.5;
  }
  col=1.-exp(-col*1.85);
  col=pow(col,vec3(.95));
  float a=1.;
  if(!hit) a=1.-smoothstep(0.,px*.9,md);
  if(id>6.5) a*=smoothstep(-.84,-.6,pl.y);
  o=vec4(col*a,a);
}`;

export function mountAvatar3D(cv: HTMLCanvasElement, opts: { maxDpr?: number; onReady?: () => void } = {}): Avatar3D | null {
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
  const uRes = U('res'), uGaze = U('gaze'), uTurn = U('turn'), uBlink = U('blink'), uWink = U('wink');

  const maxDpr = opts.maxDpr ?? 1.5;
  let tx = 0, ty = 0, x = 0, y = 0, raf = 0, dead = false, ready = false;
  let blinkAt = 0, winkAt = -1e9, nextBlink = performance.now() + 2200;

  const size = () => {
    const r = cv.getBoundingClientRect(), k = Math.min(window.devicePixelRatio || 1, maxDpr);
    const w = Math.max(1, Math.round(r.width * k)), h = Math.max(1, Math.round(r.height * k));
    if (cv.width !== w || cv.height !== h){ cv.width = w; cv.height = h; }
  };
  // a lid closing then opening: 0 → 1 → 0 over `len` ms
  const lid = (now: number, at: number, len: number) => { const k = (now - at) / len; return k < 0 || k > 1 ? 0 : Math.sin(k * Math.PI); };
  const draw = (now: number) => {
    size(); gl.viewport(0, 0, cv.width, cv.height);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(uRes, cv.width, cv.height);
    // eyes do most of the following, the head turns a little with them
    gl.uniform2f(uGaze, x * .9, -y * .8);
    gl.uniform2f(uTurn, -x * .26, y * .14);
    gl.uniform1f(uBlink, lid(now, blinkAt, 170));
    // the wink closes fast, holds a beat, then opens
    const wk = (now - winkAt) / 700;
    gl.uniform1f(uWink, wk < 0 || wk > 1 ? 0 : Math.min(1, wk / .2, (1 - wk) / .3));
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
  const busy = (now: number) => Math.abs(tx - x) + Math.abs(ty - y) > 0.002 || now - blinkAt < 190 || now - winkAt < 760;
  const frame = (now: number) => {
    raf = 0; if (dead) return;
    if (now > nextBlink){ blinkAt = now; nextBlink = now + 2600 + Math.random() * 2600; }
    x += (tx - x) * 0.14; y += (ty - y) * 0.14;
    draw(now);
    if (busy(now)) raf = requestAnimationFrame(frame);
  };
  const kick = () => { if (!raf && !dead) raf = requestAnimationFrame(frame); };
  // blinking keeps going while nothing else moves, without a loop running in between
  const tick = window.setInterval(() => { if (!dead && !document.hidden && performance.now() > nextBlink) kick(); }, 400);

  draw(performance.now());
  // the first frame compiles on some GPUs; reveal the canvas on the next one
  requestAnimationFrame(() => { if (dead) return; ready = true; if (opts.onReady) opts.onReady(); });
  const ro = 'ResizeObserver' in window ? new ResizeObserver(() => kick()) : null;
  if (ro) ro.observe(cv);

  return {
    aim(nx, ny){ tx = Math.max(-1, Math.min(1, nx)); ty = Math.max(-1, Math.min(1, ny)); if (ready) kick(); },
    wink(){ winkAt = performance.now(); kick(); },
    stop(){ dead = true; if (raf) cancelAnimationFrame(raf); clearInterval(tick); if (ro) ro.disconnect(); }
  };
}
