#!/usr/bin/env node
// render-check.mjs -- the binding layer for what only a browser can see.
//
// check.sh greps source; it says so itself: it cannot see hierarchy,
// overflow, or a computed color. This tool renders the page and measures
// what the Review rubric used to leave to a reviewer's eye. Same grammar
// and the same honesty: a clean run is evidence, never proof -- it cannot
// see costume, composition, or whether the page answers its reader.
//
//   FAIL  exit 1; not done while any remains
//   WARN  named, counted, shipped only with a written reason in DESIGN.md
//
// Usage: node kit/render-check.mjs [--no-dark] [--no-focus] <page.html|url> ...
//
// Per page: 390x844 (overflow, tap targets), 1440x900 (contrast, type
// hierarchy, evidence width, focus visibility), reduced-motion emulation
// (settled frame), dark emulation (contrast again, theme authored).
// Colors resolve through a canvas fillStyle, never by parsing computed
// strings: Chromium serializes oklch() verbatim, and a parsed "0.165"
// read as a red channel returns every ratio as 1.00. That defect shipped
// once; the canvas is the regression test.
//
// Needs playwright (and its chromium) resolvable from the project or from
// this repo. Exit 2 when it is not; install with:
//   npm i -D playwright && npx playwright install chromium

import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { resolve as resolvePath } from 'node:path';
import { existsSync } from 'node:fs';

const args = process.argv.slice(2);
const noDark = args.includes('--no-dark');
const noFocus = args.includes('--no-focus');
const pages = args.filter(a => !a.startsWith('--'));
if (pages.length === 0) {
  console.error('render-check: no page given. Usage: node kit/render-check.mjs <page.html|url> ...');
  process.exit(2);
}

function loadPlaywright() {
  for (const base of [resolvePath(process.cwd(), 'noop.js'), import.meta.url]) {
    for (const name of ['playwright', 'playwright-core']) {
      try { return createRequire(base)(name); } catch { /* next */ }
    }
  }
  return null;
}
const pw = loadPlaywright();
if (!pw) {
  console.error('render-check: playwright not resolvable from here or the project.');
  console.error('  npm i -D playwright && npx playwright install chromium');
  process.exit(2);
}

let nfail = 0, nwarn = 0;
const fail = (name, msg, lines = []) => { console.log(`FAIL [${name}]: ${msg}`); show(lines); nfail++; };
const warn = (name, msg, lines = []) => { console.log(`WARN [${name}]: ${msg}`); show(lines); nwarn++; };
const show = (lines) => lines.slice(0, 8).forEach(l => console.log(`      ${l}`));

// Everything measured inside the page. Serialized once, shared by checks.
const inPage = () => {
  const cv = document.createElement('canvas');
  cv.width = cv.height = 1;
  const ctx = cv.getContext('2d', { willReadFrequently: true });
  const resolveColor = (str) => {
    // paint one pixel and read it back: the only conversion that holds
    // for every color syntax. Chromium serializes fillStyle for oklch()
    // VERBATIM, so parsing the string -- computed or fillStyle -- reads
    // "0.165" as a red channel and every ratio comes back 1.00.
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#123456'; ctx.fillStyle = str;
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2], d[3] / 255];
  };
  const canvasBase = () => {
    const probe = document.createElement('div');
    probe.style.cssText = 'background-color:Canvas;position:absolute;left:-9999px';
    document.documentElement.appendChild(probe);
    const c = resolveColor(getComputedStyle(probe).backgroundColor);
    probe.remove(); return c;
  };
  const over = (top, bottom) => {
    const a = top[3];
    return [top[0] * a + bottom[0] * (1 - a), top[1] * a + bottom[1] * (1 - a), top[2] * a + bottom[2] * (1 - a), 1];
  };
  // effective background: composite ancestor background-colors onto the
  // UA canvas; an ancestor background-image makes it unmeasurable.
  const effectiveBg = (el) => {
    const stack = [];
    for (let n = el; n; n = n.parentElement) {
      const s = getComputedStyle(n);
      if (s.backgroundImage !== 'none') return null;
      const c = resolveColor(s.backgroundColor);
      if (c[3] > 0) { stack.push(c); if (c[3] === 1) return stack.reduceRight(over); }
    }
    stack.push(canvasBase());
    return stack.reduceRight(over);
  };
  const lum = ([r, g, b]) => {
    const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const contrast = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
  const visible = (el) => {
    if (!el.getClientRects().length) return false;
    const s = getComputedStyle(el);
    return s.visibility !== 'hidden' && +s.opacity > 0.05;
  };
  const label = (el) => {
    const t = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 36);
    const id = el.id ? `#${el.id}` : (el.classList[0] ? `.${el.classList[0]}` : '');
    return `${el.tagName.toLowerCase()}${id} "${t}"`;
  };
  return { resolveColor, effectiveBg, contrast, visible, label, canvasBase, over };
};
const helpers = `(${inPage.toString()})()`;

const contrastCheck = `(() => {
  const H = ${helpers};
  const bad = [], out = { skipped: 0 };
  const els = [...document.querySelectorAll('body *')].filter(el =>
    [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()));
  for (const el of els.slice(0, 800)) {
    if (!H.visible(el)) continue;
    const s = getComputedStyle(el);
    const fg0 = H.resolveColor(s.color);
    const bg = H.effectiveBg(el);
    if (!bg) { out.skipped++; continue; }
    const fg = fg0[3] < 1 ? H.over(fg0, bg) : fg0;
    const size = parseFloat(s.fontSize), weight = +s.fontWeight || 400;
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const need = large ? 3 : 4.5;
    const r = H.contrast(fg, bg);
    if (r < need) bad.push(\`\${r.toFixed(2)}:1 (needs \${need}) \${H.label(el)}\`);
  }
  out.bad = [...new Set(bad)];
  out.bodyBg = H.effectiveBg(document.body) || H.canvasBase();
  return out;
})()`;

const structureCheck = `(() => {
  const H = ${helpers};
  const out = {};
  const heads = ['h1','h2','h3','h4','h5','h6']
    .map(t => [...document.querySelectorAll(t)].filter(H.visible))
    .filter(l => l.length)
    .map(l => ({ tag: l[0].tagName.toLowerCase(), size: parseFloat(getComputedStyle(l[0]).fontSize) }));
  out.flat = [];
  for (let i = 1; i < heads.length; i++) {
    const a = heads[i - 1], b = heads[i];
    if (a.size > b.size && a.size / b.size < 1.15)
      out.flat.push(\`\${a.tag} \${a.size}px vs \${b.tag} \${b.size}px (\${(a.size / b.size).toFixed(2)}x < 1.15)\`);
  }
  out.tables = [];
  for (const t of document.querySelectorAll('table')) {
    if (!H.visible(t)) continue;
    const p = t.parentElement; if (!p) continue;
    const ps = getComputedStyle(p);
    const avail = p.clientWidth - parseFloat(ps.paddingLeft) - parseFloat(ps.paddingRight);
    const w = t.getBoundingClientRect().width;
    if (avail - w > 120 && w < 0.7 * avail)
      out.tables.push(\`\${H.label(t)} \${Math.round(w)}px of \${Math.round(avail)}px available\`);
  }
  return out;
})()`;

const targetCheck = `(() => {
  const H = ${helpers};
  const small = [], tiny = [];
  const els = document.querySelectorAll('a[href], button, input:not([type=hidden]), select, textarea, [role=button], [role=link], [role=tab], [role=checkbox], [role=switch]');
  for (const el of els) {
    if (!H.visible(el)) continue;
    const s = getComputedStyle(el);
    const inline = s.display === 'inline' && el.parentElement &&
      (el.parentElement.textContent.trim().length > el.textContent.trim().length + 8);
    if (inline) continue; // links inside prose follow the text metric
    const r = el.getBoundingClientRect();
    const d = \`\${Math.round(r.width)}x\${Math.round(r.height)} \${H.label(el)}\`;
    if (r.width < 24 && r.height < 24) tiny.push(d);
    else if (r.width < 44 && r.height < 44) small.push(d);
  }
  return { small: [...new Set(small)], tiny: [...new Set(tiny)] };
})()`;

const prmCheck = `(() => {
  const loops = [];
  for (const a of document.getAnimations()) {
    const t = a.effect && a.effect.getTiming ? a.effect.getTiming() : {};
    if (a.playState === 'running' && t.iterations === Infinity && (t.duration || 0) > 20) {
      const el = a.effect && a.effect.target;
      loops.push((el && el.tagName ? el.tagName.toLowerCase() : 'anon') + (a.animationName ? ' ' + a.animationName : ''));
    }
  }
  return [...new Set(loops)];
})()`;

const rgbHex = (c) => c ? '#' + c.slice(0, 3).map(v => Math.round(v).toString(16).padStart(2, '0')).join('') : '?';
const isPure = (c) => c && ((c[0] > 253 && c[1] > 253 && c[2] > 253) || (c[0] < 2 && c[1] < 2 && c[2] < 2));

const toUrl = (p) => /^https?:\/\//.test(p) ? p : pathToFileURL(resolvePath(p)).href;
for (const p of pages) {
  if (!/^https?:\/\//.test(p) && !existsSync(p)) { console.error(`render-check: no such file: ${p}`); process.exit(2); }
}

let browser;
try { browser = await pw.chromium.launch(); }
catch (e) {
  console.error(`render-check: chromium did not launch: ${String(e.message).split('\n')[0]}`);
  console.error('  npx playwright install chromium');
  process.exit(2);
}

for (const target of pages) {
  const url = toUrl(target);
  const name = target.replace(/^.*\//, '');
  console.log(`-- ${target}`);

  // 390: overflow and tap targets, the phone reality
  const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mob.goto(url, { waitUntil: 'load' });
  await mob.evaluate(() => document.fonts.ready);
  await mob.waitForTimeout(300);
  const ow = await mob.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
  if (ow[0] > ow[1] + 1) fail('overflow', `${name}@390: horizontal scroll (${ow[0]}px content in ${ow[1]}px viewport)`);
  const tg = await mob.evaluate(targetCheck);
  if (tg.tiny.length) fail('target', `${name}@390: ${tg.tiny.length} interactive targets under 24px`, tg.tiny);
  if (tg.small.length) warn('target', `${name}@390: ${tg.small.length} interactive targets under 44px`, tg.small);
  await mob.close();

  // 1440 light: contrast, hierarchy, evidence width, focus
  const pg = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pg.emulateMedia({ colorScheme: 'light', reducedMotion: 'no-preference' });
  await pg.goto(url, { waitUntil: 'load' });
  await pg.evaluate(() => document.fonts.ready);
  await pg.waitForTimeout(300);

  const light = await pg.evaluate(contrastCheck);
  if (light.bad.length) fail('contrast', `${name} light: ${light.bad.length} text elements below the floor`, light.bad);
  if (light.skipped > 0) console.log(`      note: ${light.skipped} elements over background-image skipped (measure by eye)`);
  if (isPure(light.bodyBg)) fail('pure-ground', `${name} light: body renders on pure ${rgbHex(light.bodyBg)} -- ground was never authored`);

  const st = await pg.evaluate(structureCheck);
  if (st.flat.length) warn('flat-type', `${name}: adjacent heading levels within 1.15x`, st.flat);
  if (st.tables.length) warn('table-width', `${name}: evidence tables narrower than their room`, st.tables);

  if (!noFocus) {
    const focusResult = await (async () => {
      await pg.evaluate(() => {
        let i = 0;
        for (const el of document.querySelectorAll('a[href], button, input:not([type=hidden]), select, textarea, [tabindex]')) {
          el.dataset.rcIdx = String(i++);
          const s = getComputedStyle(el);
          el.dataset.rcBase = [s.outlineStyle, s.outlineWidth, s.boxShadow, s.borderColor, s.backgroundColor].join('|');
        }
      });
      const seen = new Set(); const unmarked = [];
      for (let i = 0; i < 10; i++) {
        await pg.keyboard.press('Tab');
        const r = await pg.evaluate(() => {
          const el = document.activeElement;
          if (!el || el === document.body || !el.dataset.rcIdx) return null;
          const s = getComputedStyle(el);
          const now = [s.outlineStyle, s.outlineWidth, s.boxShadow, s.borderColor, s.backgroundColor].join('|');
          const t = (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30);
          return { idx: el.dataset.rcIdx, changed: now !== el.dataset.rcBase, label: `${el.tagName.toLowerCase()} "${t}"` };
        });
        if (!r || seen.has(r.idx)) break;
        seen.add(r.idx);
        if (!r.changed) unmarked.push(r.label);
      }
      return { visited: seen.size, unmarked };
    })();
    if (focusResult.visited > 0 && focusResult.unmarked.length === focusResult.visited)
      fail('focus', `${name}: keyboard focus is invisible on every tab stop tried (${focusResult.visited})`);
    else if (focusResult.unmarked.length)
      warn('focus', `${name}: ${focusResult.unmarked.length}/${focusResult.visited} tab stops show no visible focus`, focusResult.unmarked);
  }

  // reduced motion: the frame must settle
  await pg.emulateMedia({ reducedMotion: 'reduce' });
  await pg.waitForTimeout(250);
  const loops = await pg.evaluate(prmCheck);
  if (loops.length) fail('prm-loop', `${name}: ${loops.length} infinite animations still running under reduced motion`, loops);

  // dark: authored, and holding the same floor
  if (!noDark) {
    await pg.emulateMedia({ colorScheme: 'dark', reducedMotion: 'no-preference' });
    await pg.waitForTimeout(250);
    const dark = await pg.evaluate(contrastCheck);
    if (dark.bad.length) fail('contrast', `${name} dark: ${dark.bad.length} text elements below the floor`, dark.bad);
    if (isPure(dark.bodyBg)) fail('pure-ground', `${name} dark: body renders on pure ${rgbHex(dark.bodyBg)}`);
    if (rgbHex(dark.bodyBg) === rgbHex(light.bodyBg))
      warn('theme', `${name}: dark scheme renders the same ground as light (${rgbHex(dark.bodyBg)}) -- dark not authored`);
  }
  await pg.close();
}

await browser.close();
console.log(`render-check: ${nfail} fail, ${nwarn} warn (${pages.length} page${pages.length === 1 ? '' : 's'})`);
process.exit(nfail === 0 ? 0 : 1);
