/* point-cloud -- a depth-sorted dot cloud that says which kind of work is running.
 *
 * The busy indicator for agent surfaces: not "something is happening" but
 * "this kind of thing is happening". One model, four silhouettes, ink and
 * physics both resolved from the design contract it is dropped into.
 *
 * model card
 *   proves:      work is running, and which kind -- searching, threading,
 *                combining, converging -- without a word of copy
 *   objects:     n dots on a unit shell; each carries a seed and a phase
 *   state:       per dot: position (x,y,z in unit space), relative radius,
 *                alpha, accent flag. No velocity: see "kinematic, honestly".
 *   constraints: dots stay on or inside the shell; forms move them along it
 *   forces:      none. Position is a closed-form function of (seed, t).
 *   inputs:      time; the contract (--fg, --accent, --motion-personality);
 *                form name; pixel size. Idle behaviour is the whole behaviour --
 *                it never waits for a pointer.
 *   rules:       form picks the geometry; personality picks how time advances
 *   skin:        depth -> radius + alpha; --fg for the body, --accent for the
 *                few dots doing the work
 *   params:      count, spin, tilt, dotR, depth -- all in PARAMS below
 *   fallback:    prefers-reduced-motion renders one settled frame and stops;
 *                off-screen and hidden-tab both park the loop
 *
 * kinematic, honestly
 *   simulation.md asks for a model rather than authored frames. This is a
 *   model in that sense -- a field you sample at t, from which the frames
 *   fall out -- but it is kinematic, not dynamical: nothing here integrates a
 *   force. That is the right trade for a 20px indicator that must loop
 *   forever and cost nothing. When a surface needs give, mass or response,
 *   reach for a primitive that actually integrates.
 *
 * Mechanism (orthographic projection, painter sort, depth->radius+brightness,
 * Fibonacci distribution) is standard graphics practice. Rebuilt here from the
 * mechanism after reading Jakub Antalik & Alex Brinza's thinking-orbs (MIT,
 * github.com/Jakubantalik/thinking-orbs), which is the reference that proved
 * the idea; the forms, the tuning rule and the contract binding are ours.
 * See references/simulation.md, "Sources, and the license step".
 */

/* ---------------------------------------------------------------- parameters
 * Every named number lives here. Nothing below reads a literal. */

const PARAMS = {
  shell:  0.82,  // fraction of the box the cloud fills; the rest is breathing room
  rBase:  0.55,  // dot radius at the far pole, in px at size 64
  rDepth: 1.35,  // extra radius at the near pole
  aFar:   0.18,  // alpha at the far pole
  aSpan:  0.72,  // extra alpha at the near pole
  rMin:   0.35,  // never draw a dot smaller than this, or it stops existing
  tilt:   0.32,  // fixed pitch, radians. A little, so it reads as a volume.

  // The size rule. A point cloud does not scale by scaling -- shrink it
  // uniformly and it turns to grey mush. Two exponents, measured against a
  // 64px reference, replace a per-state-per-size lookup table:
  countPow:  1.20,  // count falls FASTER than size  (20px -> ~25% of the dots)
  radiusPow: 0.25,  // radius falls SLOWER than size (20px -> ~75% of the radius)
  speedPow:  0.35,  // small orbs need a faster turn to read as moving
  refSize:   64,
};

const FORMS = {
  scan:   { count: 220, spin: 0.55, sweep: 0.70, band: 0.22 },
  orbit:  { count: 168, spin: 0.75, rings: 3, ghostA: 0.38 },
  braid:  { count: 210, spin: 0.30, strands: 3, turns: 2.2, ghost: 0.34 },
  settle: { count: 200, spin: 0.45, breath: 0.55, maxFlat: 0.80, flatFloor: 0.80 },
};

/* Physics from the contract. simulation.md: a living element whose physics
 * disagree with the system's motion personality reads as a pasted demo.
 * `mechanical` is the one that proves the binding is real -- under industry or
 * broadsheets the cloud STEPS instead of gliding. */
const PERSONALITY = {
  mechanical: { rate: 1.00, steps: 14,   swing: 0,    amp: 0.75 },
  snappy:     { rate: 1.15, steps: 0,    swing: 0,    amp: 1.00 },
  weighted:   { rate: 0.80, steps: 0,    swing: 0.16, amp: 1.25 },
  deliberate: { rate: 0.55, steps: 0,    swing: 0.05, amp: 0.80 },
};

/* --------------------------------------------------------------------- model
 * Pure geometry. No canvas, no tokens, no time source. */

/** Deterministic pseudo-random in [0,1). The shader idiom; stable across runs
 *  so a capture is reproducible. */
const hash = (a, b) => {
  const n = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return n - Math.floor(n);
};

/** Fibonacci sphere: n points spread evenly over a unit sphere, no clumping at
 *  the poles the way a lat/lon grid does. */
const fib = (i, n) => {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - 2 * (i + 0.5) / n;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const a = i * golden;
  return [r * Math.cos(a), y, r * Math.sin(a)];
};

/** Orthographic projector. No perspective divide -- deliberately. Depth is
 *  carried by radius and alpha alone, which is what makes it read as ink
 *  rather than as a 3D render. */
const projector = (yaw, pitch) => {
  const sy = Math.sin(yaw), cy = Math.cos(yaw);
  const sp = Math.sin(pitch), cp = Math.cos(pitch);
  return (x, y, z) => {
    const px = x * cy + z * sy;
    const pz = -x * sy + z * cy;
    return [px, y * cp - pz * sp, y * sp + pz * cp];
  };
};

const lerp = (a, b, t) => a + (b - a) * t;

/* ------------------------------------------------------------------ behavior
 * Each form is (t, count, p) -> dots in unit space. A form's whole job is to
 * say something different from the other three at a glance. */

const BEHAVIOR = {
  /* Sweeping a space. A bright latitude band travels the sphere. */
  scan(t, count, p) {
    const dots = [];
    const bandY = Math.sin(t * p.sweep);
    for (let i = 0; i < count; i++) {
      const [x, y, z] = fib(i, count);
      const near = Math.max(0, 1 - Math.abs(y - bandY) / p.band);
      dots.push({ x, y, z, r: 0.55 + 0.9 * near, a: 0.30 + 0.70 * near, accent: near > 0.45 });
    }
    return dots;
  },

  /* Several threads in flight. Faint rings, one bright body running each. */
  orbit(t, count, p) {
    const dots = [];
    const ghosts = Math.max(6, Math.floor(count / p.rings));
    for (let k = 0; k < p.rings; k++) {
      // A stable tilted plane per ring, from two orthonormal basis vectors.
      // The axis is kept away from vertical: a ring whose axis points up is
      // seen edge-on at our pitch and reads as a line, not an orbit.
      const th = (0.22 + 0.56 * hash(k, 1.7)) * Math.PI, ph = hash(k, 5.2) * Math.PI * 2;
      const ax = [Math.cos(ph) * Math.sin(th), Math.cos(th), Math.sin(ph) * Math.sin(th)];
      const up = Math.abs(ax[1]) > 0.9 ? [1, 0, 0] : [0, 1, 0];
      const b1 = norm(cross(ax, up)), b2 = cross(ax, b1);
      const dir = hash(k, 8.9) > 0.5 ? 1 : -1;
      const rad = 0.62 + 0.30 * hash(k, 3.3);

      for (let i = 0; i < ghosts; i++) {
        const a = i / ghosts * Math.PI * 2;
        const [x, y, z] = onPlane(b1, b2, a, rad);
        dots.push({ x, y, z, r: 0.42, a: p.ghostA, accent: false });
      }
      const a = t * p.spin * dir + k * 2.1;
      const [x, y, z] = onPlane(b1, b2, a, rad);
      dots.push({ x, y, z, r: 2.4, a: 1, accent: true });
      // a short comet tail, so direction is legible
      for (let j = 1; j <= 4; j++) {
        const [tx, ty, tz] = onPlane(b1, b2, a - dir * j * 0.13, rad);
        dots.push({ x: tx, y: ty, z: tz, r: 1.9 - j * 0.32, a: 0.7 - j * 0.15, accent: true });
      }
    }
    return dots;
  },

  /* Combining. Strands helix along the vertical axis through a faint volume. */
  braid(t, count, p) {
    const dots = [];
    const ghosts = Math.floor(count * p.ghost);
    for (let i = 0; i < ghosts; i++) {
      const [x, y, z] = fib(i, ghosts);
      dots.push({ x: x * 0.94, y: y * 0.94, z: z * 0.94, r: 0.4, a: 0.16, accent: false });
    }
    const per = Math.max(8, Math.floor((count - ghosts) / p.strands));
    for (let s = 0; s < p.strands; s++) {
      const phase = s / p.strands * Math.PI * 2;
      for (let i = 0; i < per; i++) {
        const u = (i / (per - 1)) * 2 - 1;         // -1..1 up the axis
        const ring = Math.sqrt(Math.max(0, 1 - u * u)); // hug the shell
        const a = u * Math.PI * p.turns + phase + t * p.spin;
        // fade the strand out at the poles so it does not pinch
        const edge = Math.min(1, (1 - Math.abs(u)) / 0.14);
        dots.push({
          x: Math.cos(a) * ring, y: u, z: Math.sin(a) * ring,
          r: 0.85, a: edge, accent: s === 0,
        });
      }
    }
    return dots;
  },

  /* Converging. The shell breathes between a sphere and a thick band.
   * It deliberately never flattens all the way: a fully collapsed cloud piles
   * every dot onto one circle, which draws as a solid ring -- heavy, and mute
   * at 20px. Capping the collapse keeps the volume readable. */
  settle(t, count, p) {
    const dots = [];
    // Stay collapsed and breathe within that, rather than swinging back to a
    // full sphere: a form that spends half its cycle looking like `braid` is
    // not a second form. At a glance this is always a lens, never a ball.
    const pulse = (1 + Math.sin(t * p.breath)) / 2;
    const b = p.maxFlat * (p.flatFloor + (1 - p.flatFloor) * pulse);
    for (let i = 0; i < count; i++) {
      const [x, y, z] = fib(i, count);
      const flat = Math.hypot(x, z) || 1e-6;
      // target: the same dot pushed out toward the equator, keeping its own
      // longitude so the density stays even instead of spiking at the seam
      const tx = x / flat, tz = z / flat;
      dots.push({
        x: lerp(x, tx, b), y: y * (1 - b * 0.82), z: lerp(z, tz, b),
        r: 0.6 + 0.35 * b, a: 0.5 + 0.4 * b, accent: false,
      });
    }
    return dots;
  },
};

const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const norm = (v) => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1e-6;
  return [v[0] / l, v[1] / l, v[2] / l];
};
const onPlane = (b1, b2, a, r) => [
  (b1[0] * Math.cos(a) + b2[0] * Math.sin(a)) * r,
  (b1[1] * Math.cos(a) + b2[1] * Math.sin(a)) * r,
  (b1[2] * Math.cos(a) + b2[2] * Math.sin(a)) * r,
];

/* --------------------------------------------------------------------- input
 * Where the numbers come from: the clock, and the contract on the element. */

/** Read the design contract off the element. Called at mount and on theme
 *  change -- never bake a colour into a canvas call. */
function readContract(el) {
  const cs = getComputedStyle(el);
  const pick = (n, f) => (cs.getPropertyValue(n).trim() || f);
  const name = pick('--motion-personality', 'snappy');
  return {
    fg: pick('--fg', '#111'),
    accent: pick('--accent', pick('--fg', '#111')),
    physics: PERSONALITY[name] || PERSONALITY.snappy,
    personality: PERSONALITY[name] ? name : 'snappy',
  };
}

/** The personality's grip on the clock. Mechanical quantises it: the cloud
 *  steps through fixed positions instead of gliding. */
function advance(t, physics) {
  let u = t * physics.rate;
  if (physics.steps) u = Math.floor(u * physics.steps / (Math.PI * 2)) * (Math.PI * 2) / physics.steps;
  else if (physics.swing) u += physics.swing * Math.sin(u * 0.9);
  return u;
}

/* ------------------------------------------------------------ skin+renderer
 * Depth becomes radius and alpha; canvas 2D draws back to front. */

function draw(ctx, dots, size, ink, scale) {
  const half = size / 2;
  const reach = half * PARAMS.shell;
  ctx.clearRect(0, 0, size, size);
  // painter's algorithm: far dots first, so near dots overlap them
  dots.sort((a, b) => a.z - b.z);
  for (const d of dots) {
    const depth = (d.z + 1) / 2;                       // 0 far, 1 near
    const r = Math.max(
      PARAMS.rMin,
      (PARAMS.rBase + PARAMS.rDepth * depth) * d.r * scale.radius,
    );
    const a = (PARAMS.aFar + PARAMS.aSpan * depth) * d.a;
    if (a < 0.02) continue;
    ctx.fillStyle = d.accent ? ink.accent : ink.fg;
    ctx.globalAlpha = Math.min(1, a);
    ctx.beginPath();
    ctx.arc(half + d.x * reach, half - d.y * reach, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

/* ----------------------------------------------------------------- mounting */

/** The size rule, in one place. See PARAMS.countPow / radiusPow / speedPow. */
function scaleFor(size) {
  const k = size / PARAMS.refSize;
  return {
    count: Math.pow(k, PARAMS.countPow),
    radius: Math.pow(k, PARAMS.radiusPow),
    speed: Math.pow(1 / k, PARAMS.speedPow),
  };
}

/**
 * mount(canvas, opts) -> { setForm, setSize, setSpeed, refresh, destroy }
 *
 * opts: { form: 'scan'|'orbit'|'braid'|'settle', size: px, speed: 1, label }
 * The canvas carries no semantics of its own -- give it a name and let the
 * surrounding status region carry the words.
 */
export function mount(canvas, opts = {}) {
  const ctx = canvas.getContext('2d');
  let form = opts.form && BEHAVIOR[opts.form] ? opts.form : 'scan';
  let size = opts.size || PARAMS.refSize;
  let speed = opts.speed ?? 1;
  let ink = readContract(canvas);
  let raf = 0, t0 = 0, visible = true, running = false;

  const still = window.matchMedia('(prefers-reduced-motion: reduce)');

  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', opts.label || `${form} indicator`);

  function resize() {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function frame(now) {
    if (!t0) t0 = now;
    render((now - t0) / 1000);
    raf = requestAnimationFrame(frame);
  }

  function render(seconds) {
    const p = { ...FORMS[form] };
    const scale = scaleFor(size);
    const count = Math.max(12, Math.round(p.count * scale.count));
    const t = advance(seconds * speed * scale.speed, ink.physics) ;
    const dots = BEHAVIOR[form](t, count, p);
    const proj = projector(t * p.spin * 0.55, PARAMS.tilt);
    const amp = ink.physics.amp;
    for (const d of dots) {
      const [x, y, z] = proj(d.x * amp, d.y * amp, d.z * amp);
      d.x = x; d.y = y; d.z = z;
    }
    draw(ctx, dots, size, ink, scale);
  }

  /** The floor: a settled still frame, never a blank. */
  function settleFrame() { render(1.2); }

  function start() {
    if (running || still.matches || !visible) return;
    running = true; t0 = 0;
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf), raf = 0;
  }

  const onVis = () => (document.hidden ? stop() : start());
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        visible ? start() : stop();
      })
    : null;

  resize();
  settleFrame();                       // first paint already has the composition
  io ? io.observe(canvas) : start();
  document.addEventListener('visibilitychange', onVis);
  still.addEventListener('change', () => (still.matches ? (stop(), settleFrame()) : start()));

  return {
    setForm(next) {
      if (!BEHAVIOR[next]) return;
      form = next;
      canvas.setAttribute('aria-label', opts.label || `${form} indicator`);
      if (!running) settleFrame();
    },
    setSize(next) { size = next; resize(); if (!running) settleFrame(); },
    setSpeed(next) { speed = next; },
    /** Call on theme change so the cloud flips with the page. */
    refresh() { ink = readContract(canvas); if (!running) settleFrame(); },
    destroy() {
      stop();
      io && io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    },
  };
}

export const forms = Object.keys(BEHAVIOR);
export { PARAMS, FORMS, PERSONALITY };
