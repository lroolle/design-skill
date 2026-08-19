#!/usr/bin/env node
// capture.mjs -- evidence for the review, at the three widths the rubric names.
//
//   node site/capture.mjs [--out DIR] [--theme light|dark|both]
//
// Serves site/ on an ephemeral port, loads it in Chromium, waits for fonts and
// for the one entrance animation to settle, and writes full-page PNGs. A blank
// or half-loaded capture reviewed is a round wasted, so it also reports the
// rendered height and the horizontal overflow of each width.

import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { mkdirSync } from 'node:fs';
import { extname, join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const argv = (k, d) => { const i = args.indexOf(k); return i < 0 ? d : args[i + 1]; };
const outDir = resolve(argv('--out', join(here, '..', '.captures')));
const themes = argv('--theme', 'both') === 'both' ? ['light', 'dark'] : [argv('--theme', 'light')];
const WIDTHS = [390, 768, 1440];
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml' };

mkdirSync(outDir, { recursive: true });

const server = createServer(async (req, res) => {
  const path = (req.url || '/').split('?')[0];
  const file = join(here, path === '/' ? 'index.html' : path.replace(/^\/+/, ''));
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('not found');
  }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}/`;

const browser = await chromium.launch();
const report = [];

for (const theme of themes) {
  for (const width of WIDTHS) {
    const ctx = await browser.newContext({
      viewport: { width, height: Math.round(width * 0.72) + 300 },
      deviceScaleFactor: 2,
      colorScheme: theme,
    });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(String(e)));

    await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1600); // the one entrance move, settled

    const m = await page.evaluate(() => ({
      height: document.documentElement.scrollHeight,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1: (document.querySelector('h1') || {}).textContent?.trim().slice(0, 40),
      figs: document.querySelectorAll('figure svg, .specimen').length,
      seats: document.querySelectorAll('.sponsors .seat').length,
    }));

    const name = `${theme}-${width}.png`;
    await page.screenshot({ path: join(outDir, name), fullPage: true });
    report.push({ name, ...m, errors: errors.length ? errors : undefined });
    await ctx.close();
  }
}

await browser.close();
server.close();

for (const r of report) {
  const bad = r.overflow > 0 || !r.h1 || r.figs < 4 || r.seats !== 4;
  console.log(
    `${bad ? 'CHECK' : 'ok   '} ${r.name.padEnd(14)} h=${String(r.height).padStart(6)}px ` +
    `overflow=${r.overflow}px figures=${r.figs} seats=${r.seats}` + (r.errors ? `  errors=${r.errors.length}` : '')
  );
  if (r.errors) r.errors.forEach((e) => console.log(`        ${e}`));
}
console.log(`\ncaptures in ${outDir}`);
