#!/usr/bin/env node
// deal-check.mjs -- the page's die is the CLI's die.
//
// Loads the pure part of site/deal.js (the roll, ported) under node's
// WebCrypto and deals N random keys through it and through
// scripts/roll.mjs; any disagreement fails. This is the proof behind
// FIG. 2's caption: the same key gives the same hand on the page and in
// the terminal.
//
//   node site/deal-check.mjs [N=24]

import { webcrypto } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const N = parseInt(process.argv[2] || '24', 10);

// deck.js assigns to window.*; give it one
const win = {};
new Function('window', readFileSync(join(here, 'deck.js'), 'utf8'))(win);

// the pure part of deal.js: from the parameter block to newKey(); no DOM touched
const src = readFileSync(join(here, 'deal.js'), 'utf8');
const start = src.indexOf('  var P = {');
const end = src.indexOf('  function newKey()');
if (start < 0 || end < 0) { console.error('deal.js layout changed; update deal-check.mjs'); process.exit(2); }
const body = src.slice(start, end).replace(/^\s*var deck = window\.DESIGN_SKILL_DECK;\n/m, '').replace(/^\s*if \(!deck \|\| !window\.crypto.*\n/m, '');
const deal = new Function('deck', 'TextEncoder', 'crypto', 'matchMedia', body + '; return deal;')(
  win.DESIGN_SKILL_DECK, TextEncoder, webcrypto, () => ({ matches: false }));

let bad = 0;
const keys = ['666a7a49'];
while (keys.length < N) keys.push([...webcrypto.getRandomValues(new Uint8Array(4))].map(b => b.toString(16).padStart(2, '0')).join(''));
for (const key of keys) {
  const cli = JSON.parse(execFileSync('node', [join(root, 'skills/design-skill/scripts/roll.mjs'), '--scope', 'direction', '--mode', 'persuade', '--candidates', '7', '--key', key, '--json'], { encoding: 'utf8' }));
  const web = await deal(key);
  // the CLI's assignment is {kind, index|id} since the affinity pool; the page deals without a
  // subject, so only the index form can occur here
  const cliAssigned = cli.assigned && cli.assigned.kind === 'yours' ? cli.assigned.index : cli.assigned && cli.assigned.id;
  const a = JSON.stringify({ assigned: cliAssigned, ids: cli.challengers.map(c => c.id) });
  const b = JSON.stringify({ assigned: web.assigned, ids: web.challengers.map(c => c.id) });
  if (a !== b) { bad++; console.log(`MISMATCH ${key}\n  cli  ${a}\n  page ${b}`); }
}
console.log(`${keys.length - bad}/${keys.length} keys agree between site/deal.js and scripts/roll.mjs`);
process.exit(bad ? 1 : 0);
