/* deal.js -- the direction mechanism, running. One model, two figures.
 *
 * MODEL CARD (skills/design-skill/references/simulation.md)
 *   proves:      the die is real. The same eight hex characters produce the
 *                same assigned index and the same three challengers here and in
 *                `node scripts/roll.mjs`; left alone the page never deals the
 *                same hand twice, and the tally under FIG. 2 shows the index
 *                spreading instead of collapsing on #1.
 *   objects:     one key (8 hex), seven candidate slots, the worlds deck
 *                (site/deck.js, generated from the same files the CLI reads),
 *                three dealt cards, a pointer per figure, a tally of seven.
 *   state:       key, deal {assigned, challengers}, tally[7], count, source;
 *                per pointer: x, v, target; per key cell: settle time.
 *   constraints: one card per tier; mode and platform filters; an assigned
 *                index is always one of the seven grounded slots.
 *   forces:      a critically damped spring pulls each pointer to its slot;
 *                key cells spin hex glyphs until their settle time passes.
 *   inputs:      a key typed into the bench (FIG. 2), the roll buttons, or
 *                nothing -- idle, the page rolls a fresh key every IDLE_MS
 *                while a figure is on screen, holds while a pointer or focus
 *                is on a figure, and rests REST_MS after a visitor acts.
 *   rules:       roll -> sha256 ranks -> assigned + hand (the CLI's algorithm,
 *                line for line); tally[assigned] += 1; page key shows the real
 *                verdicts, any other key is UNJUDGED.
 *   skin:        the drawing's own ink: tokens via CSS classes, no colour here.
 *   params:      the block below, including the two figures' slot geometry.
 *                CANDIDATES is the rule's; the SVGs draw seven slots, so
 *                changing it means redrawing the rack and the scale.
 *   fallback:    reduced motion or no JS: the deal that built this page,
 *                key 666a7a49, already in the markup; rolls still work, cut.
 */
(function () {
  'use strict';

  // ---- parameters ---------------------------------------------------------
  var P = {
    CANDIDATES: 7,
    MODE: 'persuade',
    PLATFORM: 'web',
    PAGE_KEY: '666a7a49',
    IDLE_MS: 12000,       // between unattended rolls
    REST_MS: 40000,       // pause after a visitor acts; reading a figure also rests it
    FIRST_MS: 2500,       // grace after load before the first unattended roll
    SLOT1: { x0: 138, dx: 12 },   // FIG. 1 rack: slot 1 x, pitch (the SVG's geometry)
    SLOT2: { x0: 30, dx: 40 },    // FIG. 2 scale: slot 1 x, pitch
    SPRING_K: 260,        // pointer stiffness; damping is critical
    SPIN_MS: 380,         // how long a key cell spins
    SPIN_STAGGER: 28,     // per cell, left to right
    TIERS: ['graphic', 'interaction', 'atmosphere']
  };

  var deck = window.DESIGN_SKILL_DECK;
  if (!deck || !window.crypto || !crypto.subtle) return; // the markup is the still frame
  var reduced = matchMedia('(prefers-reduced-motion: reduce)');

  // ---- rule: the roll, ported from scripts/roll.mjs ------------------------
  function sha(s) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)).then(function (h) {
      var b = new Uint8Array(h), out = '';
      for (var i = 0; i < b.length; i++) out += (b[i] < 16 ? '0' : '') + b[i].toString(16);
      return out;
    });
  }
  function rank(items, salt, idFor) {
    return Promise.all(items.map(function (it) { return sha(salt + ':' + idFor(it)); })).then(function (ds) {
      return items.map(function (it, i) { return { it: it, d: ds[i] }; })
        .sort(function (a, b) { return a.d < b.d ? 1 : a.d > b.d ? -1 : 0; })
        .map(function (x) { return x.it; });
    });
  }
  function tickets(e) { return e.rating >= 3 ? 2 : e.rating === 2 ? 1 : 0; }
  function fits(e) {
    if (e.modes && e.modes.length && e.modes.indexOf(P.MODE) < 0) return false;
    if (e.platforms && e.platforms.length && e.platforms.indexOf(P.PLATFORM) < 0) return false;
    return true;
  }
  function weightedOrder(pool, salt) {
    var eligible = pool.filter(function (e) { return tickets(e) > 0; });
    if (eligible.length < 3) eligible = pool;
    var expanded = [];
    eligible.forEach(function (e) { for (var t = 0; t < Math.max(1, tickets(e)); t++) expanded.push({ e: e, t: t }); });
    return rank(expanded, salt, function (x) { return x.e.id + '#' + x.t; }).then(function (ordered) {
      var seen = {}, out = [];
      ordered.forEach(function (x) { if (!seen[x.e.id]) { seen[x.e.id] = 1; out.push(x.e); } });
      return out;
    });
  }
  function deal(key) {
    var idx = []; for (var i = 0; i < P.CANDIDATES; i++) idx.push(i);
    return rank(idx, key + ':0:idx', String).then(function (ranked) {
      var assigned = ranked[0] + 1;
      return Promise.all(P.TIERS.map(function (tier) {
        var pool = deck.worlds.filter(function (w) { return w.tier === tier && fits(w); });
        return weightedOrder(pool, key + ':0:world:' + tier).then(function (o) { return o[0] || null; });
      })).then(function (hand) {
        return { key: key, assigned: assigned, challengers: hand.filter(Boolean) };
      });
    });
  }
  function newKey() {
    var b = new Uint8Array(4); crypto.getRandomValues(b);
    var s = ''; for (var i = 0; i < 4; i++) s += (b[i] < 16 ? '0' : '') + b[i].toString(16);
    return s;
  }

  // ---- model ----------------------------------------------------------------
  var state = { key: P.PAGE_KEY, deal: null, tally: [0, 0, 0, 0, 0, 0, 0], count: 0, source: 'page' };
  var lastRoll = 0, lastTouch = 0, rolling = false;
  function roll(key, source) {
    key = String(key || '').toLowerCase();
    if (!/^[0-9a-f]{8}$/.test(key) || rolling) return Promise.resolve(false);
    rolling = true;
    return deal(key).then(function (d) {
      state.key = key; state.deal = d; state.source = source;
      if (source !== 'page') { state.tally[d.assigned - 1] += 1; state.count += 1; }
      lastRoll = performance.now();
      if (source === 'visitor') lastTouch = lastRoll;
      rolling = false;
      render(source);
      return true;
    }, function () { rolling = false; return false; });
  }

  // ---- motion: one spring, shared ------------------------------------------
  var springs = [], spins = [], raf = 0, lastT = 0;
  function spring(x) { var s = { x: x, v: 0, t: x }; springs.push(s); return s; }
  function settle(s, target) { s.t = target; if (reduced.matches) { s.x = target; s.v = 0; if (s.apply) s.apply(target); } wake(); }
  function spinKey(cells, final) {
    var now = performance.now();
    var sp = { cells: cells, final: final, until: [] };
    if (reduced.matches) { cells.forEach(function (el) { el.textContent = final; }); return; }
    for (var i = 0; i < 8; i++) sp.until[i] = now + P.SPIN_MS + i * P.SPIN_STAGGER;
    spins.push(sp); wake();
  }
  function wake() { if (!raf) { lastT = performance.now(); raf = requestAnimationFrame(frame); } }
  function frame(now) {
    var dt = Math.min(0.05, (now - lastT) / 1000); lastT = now;
    var live = false, c = 2 * Math.sqrt(P.SPRING_K);
    springs.forEach(function (s) {
      var dx = s.x - s.t;
      if (Math.abs(dx) < 0.05 && Math.abs(s.v) < 0.5) { s.x = s.t; s.v = 0; }
      else { s.v += (-P.SPRING_K * dx - c * s.v) * dt; s.x += s.v * dt; live = true; }
      if (s.apply) s.apply(s.x);
    });
    spins = spins.filter(function (sp) {
      var out = '', spinning = false;
      for (var i = 0; i < 8; i++) {
        if (now < sp.until[i]) { out += HEX[(Math.random() * 16) | 0]; spinning = true; } else out += sp.final[i];
      }
      sp.cells.forEach(function (el) { el.textContent = out; });
      if (spinning) live = true;
      return spinning;
    });
    raf = live ? requestAnimationFrame(frame) : 0;
  }
  var HEX = '0123456789abcdef';

  // ---- renderers: two figures, one state -----------------------------------
  function shortName(w) { return w.name.replace(/\s*\(.*\)\s*$/, ''); }
  function twoLines(name) {
    var words = name.split(' '), a = '', b = '';
    words.forEach(function (w) { if (!b && (a + ' ' + w).trim().length <= 16) a = (a + ' ' + w).trim(); else b = (b + ' ' + w).trim(); });
    return [a, b];
  }
  function sentence(d) {
    return 'Roll ' + d.key + ': candidate #' + d.assigned + ' of ' + P.CANDIDATES + ' assigned; dealt ' +
      d.challengers.map(shortName).join(', ') + '.';
  }

  // FIG. 1 -- the die and the rack over station two
  var f1 = {
    key: document.querySelectorAll('[data-deal="key"][data-fig="1"]'),
    pointer: document.querySelector('[data-deal="pointer"][data-fig="1"]'),
    readout: document.querySelector('[data-deal="readout"][data-fig="1"]')
  };
  var f1Slot = function (i) { return P.SLOT1.x0 + (i - 1) * P.SLOT1.dx; };
  var s1 = spring(f1Slot(7));
  s1.apply = function (x) { if (f1.pointer) f1.pointer.setAttribute('transform', 'translate(' + (+x.toFixed(2)) + ' 0)'); };

  // FIG. 2 -- the bench
  var f2 = {
    key: document.querySelectorAll('[data-deal="key"][data-fig="2"]'),
    pointer: document.querySelector('[data-deal="pointer"][data-fig="2"]'),
    ticks: document.querySelectorAll('[data-deal="tick"]'),
    names: document.querySelectorAll('[data-deal="name"]'),
    verdicts: document.querySelectorAll('[data-deal="verdict"]'),
    tally: document.querySelectorAll('[data-deal="tally"]'),
    count: document.querySelector('[data-deal="count"]'),
    cmd: document.querySelector('[data-deal="cmd"]'),
    desc: document.getElementById('fig-2-d'),
    input: document.querySelector('[data-deal="input"]'),
    live: document.querySelector('[data-deal="live"]')
  };
  var f2Slot = function (i) { return P.SLOT2.x0 + (i - 1) * P.SLOT2.dx; };
  var s2 = spring(f2Slot(7));
  s2.apply = function (x) { if (f2.pointer) f2.pointer.setAttribute('transform', 'translate(' + (+x.toFixed(2)) + ' 0)'); };

  function render(source) {
    var d = state.deal; if (!d) return;
    var keyCells = Array.prototype.slice.call(f1.key).concat(Array.prototype.slice.call(f2.key));
    if (source === 'page') {
      // the markup already shows this deal: take the positions, no travel, no spin
      s1.x = s1.t = f1Slot(d.assigned); s2.x = s2.t = f2Slot(d.assigned);
      s1.apply(s1.x); s2.apply(s2.x);
      keyCells.forEach(function (el) { el.textContent = d.key; });
    } else {
      settle(s1, f1Slot(d.assigned)); settle(s2, f2Slot(d.assigned));
      spinKey(keyCells, d.key);
    }
    if (f1.readout) f1.readout.textContent = sentence(d);
    f2.ticks.forEach(function (t, i) { t.classList.toggle('numeral--lit', i + 1 === d.assigned); });
    d.challengers.forEach(function (w, i) {
      var lines = twoLines(shortName(w));
      var a = f2.names[i * 2], b = f2.names[i * 2 + 1];
      if (a) a.textContent = lines[0]; if (b) b.textContent = lines[1];
      var v = f2.verdicts[i];
      if (v) {
        if (d.key === P.PAGE_KEY) { v.textContent = i === 0 ? 'WINS \u2014 BUILT' : 'DECLINED'; v.classList.toggle('verdict--win', i === 0); }
        else { v.textContent = 'RATING ' + w.rating + ' \u00b7 UNJUDGED'; v.classList.remove('verdict--win'); }
      }
    });
    f2.tally.forEach(function (t, i) { t.textContent = state.tally[i] ? String(state.tally[i]) : '·'; });
    if (f2.count) f2.count.textContent = state.count ? state.count + (state.count === 1 ? ' DEAL' : ' DEALS') + ' THIS VISIT' : 'TALLY OF THIS VISIT';
    if (f2.cmd) f2.cmd.textContent = 'node scripts/roll.mjs --scope direction --mode persuade --candidates 7 --key ' + d.key;
    if (f2.input && document.activeElement !== f2.input) f2.input.value = d.key;
    if (f2.desc) f2.desc.textContent = 'Detail of the die and the deck, running. ' + sentence(d);
    if (f2.live && source === 'visitor') f2.live.textContent = sentence(d);
  }

  // ---- inputs -----------------------------------------------------------------
  document.querySelectorAll('[data-roll]').forEach(function (btn) {
    btn.addEventListener('click', function () { roll(newKey(), 'visitor'); });
  });
  var form = document.querySelector('[data-deal="form"]');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = f2.input ? f2.input.value.trim().toLowerCase() : '';
    if (!/^[0-9a-f]{8}$/.test(v)) { if (f2.input) f2.input.setCustomValidity('eight hex characters'); form.reportValidity(); return; }
    if (f2.input) f2.input.setCustomValidity('');
    roll(v, 'visitor');
  });
  if (f2.input) f2.input.addEventListener('input', function () { f2.input.setCustomValidity(''); lastTouch = performance.now(); });

  // idle: the mechanism runs unattended while a figure is on screen
  var visible = {};
  var figs = document.querySelectorAll('#fig-1, #fig-2');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { visible[e.target.id] = e.isIntersecting; }); }, { threshold: 0.2 });
    figs.forEach(function (f) { io.observe(f); });
  } else { figs.forEach(function (f) { visible[f.id] = true; }); }
  function anyVisible() { for (var k in visible) if (visible[k]) return true; return false; }
  // reading is acting: a pointer over a figure, or focus inside it, holds the deal
  var reading = 0;
  figs.forEach(function (f) {
    f.addEventListener('pointerenter', function () { reading++; });
    f.addEventListener('pointerleave', function () { reading = Math.max(0, reading - 1); lastTouch = performance.now(); });
    f.addEventListener('focusin', function () { reading++; });
    f.addEventListener('focusout', function () { reading = Math.max(0, reading - 1); lastTouch = performance.now(); });
  });
  setInterval(function () {
    if (reduced.matches || document.hidden || !anyVisible() || reading > 0) return;
    var now = performance.now();
    if (now - lastTouch < P.REST_MS) return;
    if (now - lastRoll < P.IDLE_MS) return;
    roll(newKey(), 'idle');
  }, 500);

  var size = document.querySelector('[data-deal="decksize"]');
  if (size) size.textContent = deck.worlds.length + ' worlds \u00b7 ' + deck.stagings + ' stagings';

  // ---- start: the page's own deal, so the readouts agree with the markup ----
  roll(P.PAGE_KEY, 'page');
  // the first unattended roll waits a full idle period after the page is read in
  lastRoll = performance.now() + P.FIRST_MS;

  // exposed for behaviour.mjs, the proof script -- not an API
  window.__deal = { roll: roll, deal: deal, state: state, params: P };
})();
