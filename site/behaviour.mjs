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

ok.forEach((n) => console.log('ok    ' + n));
bad.forEach((n) => console.log('FAIL  ' + n));
if (errors.length) { console.log('FAIL  console/page errors: ' + errors.length); errors.slice(0, 5).forEach((e) => console.log('      ' + e)); }
else console.log('ok    no console or page errors');

await browser.close();
server.close();
process.exit(bad.length || errors.length ? 1 : 0);
