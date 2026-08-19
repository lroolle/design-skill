#!/usr/bin/env node
// behaviour.mjs -- behaviour before surfaces. The captures show what the page
// looks like; this shows what it does. Exits non-zero on any failure.
//
//   node site/behaviour.mjs
//
// Needs Playwright's Chromium (`npx playwright install chromium`).

import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript' };
const server = createServer(async (req, res) => {
  const path = (req.url || '/').split('?')[0];
  const file = join(here, path === '/' ? 'index.html' : path.replace(/^\/+/, ''));
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'text/plain' });
    res.end(body);
  } catch { res.writeHead(404); res.end('not found'); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}/`;

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  permissions: ['clipboard-read', 'clipboard-write'],
});
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

await page.goto(base, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1400);

const ok = [], bad = [];
const t = (name, cond) => (cond ? ok : bad).push(name);

// the signature: a numeral and its part light together, both ways
await page.hover('.ref[data-ref="18"]');
await page.waitForTimeout(150);
t('hover 18 lights the die group', await page.evaluate(() => document.querySelector('[data-part="18"]').classList.contains('is-lit')));
t('hover 18 washes its paragraph', await page.evaluate(() => !!document.querySelector('.spec__p.is-lit')));
t('hover 18 lights the drawn numeral', await page.evaluate(() => document.querySelector('text[data-ref="18"]').classList.contains('is-lit')));
const strokeLit = await page.evaluate(() => getComputedStyle(document.querySelector('[data-part="18"] .ink')).stroke);
await page.mouse.move(0, 0); await page.waitForTimeout(150);
const strokeOff = await page.evaluate(() => getComputedStyle(document.querySelector('[data-part="18"] .ink')).stroke);
t('the drawn part actually changes stroke', strokeLit !== strokeOff);
t('unhover clears every highlight', await page.evaluate(() => document.querySelectorAll('.is-lit').length === 0));

await page.focus('.ref[data-ref="20"]'); await page.waitForTimeout(120);
t('keyboard focus lights part 20', await page.evaluate(() => document.querySelector('[data-part="20"]').classList.contains('is-lit')));
await page.evaluate(() => document.activeElement.blur()); await page.waitForTimeout(120);

// one specimen, seven materials
const before = await page.evaluate(() => getComputedStyle(document.querySelector('.specimen')).backgroundColor);
await page.click('.switch button[data-set="nocturnes"]'); await page.waitForTimeout(400);
t('switch re-inks the specimen', before !== await page.evaluate(() => getComputedStyle(document.querySelector('.specimen')).backgroundColor));
t('switch updates the readout file', (await page.textContent('#ro-file')).includes('nocturnes'));
t('switch moves aria-checked', await page.evaluate(() =>
  document.querySelector('.switch button[data-set="nocturnes"]').getAttribute('aria-checked') === 'true' &&
  document.querySelector('.switch button[data-set="default"]').getAttribute('aria-checked') === 'false'));

// the one action
await page.click('#copy'); await page.waitForTimeout(250);
t('copy writes the install line', (await page.evaluate(() => navigator.clipboard.readText())) === 'npx skills add lroolle/design-skill');
t('copy confirms in place', (await page.textContent('#copy')).trim() === 'Copied');

// the mode is visible, reversible and remembered
await page.click('#theme'); await page.waitForTimeout(250);
t('theme toggles', await page.evaluate(() => document.documentElement.getAttribute('data-theme') === 'dark'));
await page.reload({ waitUntil: 'networkidle' }); await page.waitForTimeout(400);
t('theme persists across reload', await page.evaluate(() => document.documentElement.getAttribute('data-theme') === 'dark'));

// reduced motion leaves the page complete and still
const ctx2 = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const page2 = await ctx2.newPage();
await page2.goto(base, { waitUntil: 'networkidle' }); await page2.waitForTimeout(400);
t('reduced motion: the drawing is fully inked', await page2.evaluate(() => {
  const cs = getComputedStyle(document.querySelector('.draw .ink'));
  return cs.strokeDashoffset === '0px' && parseFloat(getComputedStyle(document.querySelector('.draw text')).opacity) === 1;
}));

// --------------------------------------------------------------- the seats
// four seats, always present, never a carousel
t('four seats render', await page.evaluate(() => document.querySelectorAll('.sponsors .seat').length === 4));
t('every seat is a real link', await page.evaluate(() =>
  [...document.querySelectorAll('.sponsors .seat .seat__body')].every((a) => a.tagName === 'A' && a.href)));
t('each seat is a board of flap cells', await page.evaluate(() =>
  [...document.querySelectorAll('.sponsors .seat .board')].every((b) => b.querySelectorAll('.flap').length >= 5)));
t('an open seat shows [+]', await page.evaluate(() =>
  [...document.querySelectorAll('.sponsors .seat--open')].every((s) =>
    [...s.querySelectorAll('.flap__ch')].map((f) => f.textContent).join('').includes('[+]'))));
t('SHEET 5 plate matches the board', await page.evaluate(() =>
  document.querySelectorAll('#seatplate .seatplate__cell').length ===
  document.querySelectorAll('.sponsors .seat').length));
t('no borrowed brand is shown as a sponsor', await page.evaluate(() => {
  const txt = document.querySelector('.sponsors').textContent.toLowerCase();
  return !/anthropic|openai|claude|vercel|google/.test(txt);
}));
t('the board is written settled on load, not flipped', await page.evaluate(() =>
  document.querySelectorAll('.sponsors .flap.is-turn').length === 0));

// focusing or hovering an open seat flips it to CLAIM. Focus is asserted
// because it is deterministic and because keyboard parity is the floor;
// pointer is asserted after an explicit move away, so a stale cursor position
// left by an earlier step cannot make this pass or fail by accident.
const readsClaim = (n) => page.waitForFunction((seat) => {
  const s = document.querySelector(`.seat[data-seat="${seat}"]`);
  return [...s.querySelectorAll('.flap__ch')].map((f) => f.textContent).join('').includes('CLAIM');
}, n, { timeout: 8000 }).then(() => true, () => false);

await page.focus('.seat[data-seat="2"] .seat__body');
t('keyboard focus flips a seat to CLAIM', await readsClaim(2));
await page.evaluate(() => document.activeElement.blur());
await page.waitForTimeout(600);

await page.mouse.move(5, 700); await page.waitForTimeout(300);
await page.hover('.seat[data-seat="3"] .seat__body');
t('hover flips a seat to CLAIM', await readsClaim(3));
await page.mouse.move(5, 700); await page.waitForTimeout(700);

// the demo claims a seat and labels it a specimen while it does
await page.waitForSelector('.sponsors .seat--specimen', { timeout: 25000 });
t('the demo claims a seat', true);
t('the claimed seat reads the specimen mark', await page.evaluate(() =>
  [...document.querySelector('.seat--specimen').querySelectorAll('.flap__ch')]
    .map((f) => f.textContent).join('').includes('YOUR MARK')));
t('a claimed demo seat is tagged specimen', await page.evaluate(() => {
  const s = document.querySelector('.seat--specimen');
  return s && getComputedStyle(s.querySelector('.seat__tag')).opacity === '1';
}));
t('the specimen tag is inside the board, not clipped', await page.evaluate(() => {
  const b = document.querySelector('.sponsors').getBoundingClientRect();
  const g = document.querySelector('.seat--specimen .seat__tag').getBoundingClientRect();
  return g.top >= b.top - 0.5 && g.bottom <= b.bottom + 0.5;
}));

// good-citizen rules for anything that moves on its own
await page.hover('.sponsors__label'); await page.waitForTimeout(250);
t('pointing at the board stops it', await page.evaluate(() =>
  !document.getElementById('sponsors').classList.contains('is-running')));
await page.mouse.move(700, 700); await page.waitForTimeout(500);
t('leaving resumes it', await page.evaluate(() =>
  document.getElementById('sponsors').classList.contains('is-running')));

// sticky: it never scrolls away, which is the thing being sold
await page.evaluate(() => document.getElementById('sheet-4').scrollIntoView());
await page.waitForTimeout(500);
t('sticky: the board is still on screen after scrolling', await page.evaluate(() => {
  const r = document.getElementById('sponsors').getBoundingClientRect();
  return r.top >= -1 && r.bottom > 0;
}));
await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(500);

await page.evaluate(() => {
  Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
  document.dispatchEvent(new Event('visibilitychange'));
});
await page.waitForTimeout(300);
t('a backgrounded tab stops it', await page.evaluate(() =>
  !document.getElementById('sponsors').classList.contains('is-running')));
await page.evaluate(() => {
  Object.defineProperty(document, 'hidden', { configurable: true, get: () => false });
  document.dispatchEvent(new Event('visibilitychange'));
});
await page.waitForTimeout(500);
t('returning to the tab resumes it', await page.evaluate(() =>
  document.getElementById('sponsors').classList.contains('is-running')));

const ctx3 = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const page3 = await ctx3.newPage();
await page3.goto(base, { waitUntil: 'networkidle' }); await page3.waitForTimeout(1200);
t('reduced motion: the board never runs', await page3.evaluate(() =>
  !document.getElementById('sponsors').classList.contains('is-running')));
t('reduced motion: nothing is mid-turn', await page3.evaluate(() =>
  document.querySelectorAll('.sponsors .flap.is-turn').length === 0));
t('reduced motion: the offer is still complete, not blank', await page3.evaluate(() => {
  const filled = document.querySelector('.sponsors .seat--specimen');
  const cta = document.querySelector('.sponsors__cta');
  const reads = filled && [...filled.querySelectorAll('.flap__ch')].map((f) => f.textContent).join('').includes('YOUR MARK');
  return !!reads && !!cta && cta.textContent.trim().length > 0;
}));

ok.forEach((n) => console.log('ok    ' + n));
bad.forEach((n) => console.log('FAIL  ' + n));
if (errors.length) { console.log('FAIL  console/page errors: ' + errors.length); errors.slice(0, 5).forEach((e) => console.log('      ' + e)); }
else console.log('ok    no console or page errors');

await browser.close();
server.close();
process.exit(bad.length || errors.length ? 1 : 0);
