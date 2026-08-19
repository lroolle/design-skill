#!/usr/bin/env node
// roll.mjs -- the dice the model cannot roll for itself.
//
// Left alone, a model ranks its own candidate directions and builds #1,
// and that ranking is deterministic: every run in a category ships the
// same one or two concepts. Offering it a menu does not help; a taste
// function picks the safest card. So the index is ASSIGNED from outside:
//
//   assigned    which entry of the model's own resonance-ordered shortlist
//               gets built (never an ungrounded entry; it only refuses the
//               argmax rut)
//   challengers foreign forms dealt from worlds/ (one per tier: graphic,
//               interaction, atmosphere) or stagings/ (three, by grain),
//               weighted by our rating (3 = double odds, 1 = sits out unless
//               the pool is thin), filtered by mode and platform
//   reroll      round n of the same key: everything rounds 0..n-1 dealt is
//               excluded, so one key reproduces the whole chain
//
// Deterministic: same key + same flags = same deal, on any machine.
// No network, no dependencies, reads only this repo's worlds/ and stagings/.
//
// Usage:
//   node scripts/roll.mjs --scope direction --mode persuade --candidates 7
//   node scripts/roll.mjs --scope surface --mode operate --grain view
//   node scripts/roll.mjs --scope direction --mode read --key 3f9a2c1e --reroll 1
//   node scripts/roll.mjs ... --register bolder|safer|plain   (presentation only)
//   node scripts/roll.mjs ... --platform ios                  (hard filter)
//   node scripts/roll.mjs ... --json
//
// Exit 0 always when the decks parse; the deal is advice, the protocol in
// SKILL.md says what to do with it.

import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const args = parseArgs(process.argv.slice(2));

const scope = args.scope || 'direction';
const mode = args.mode || null;
const grain = args.grain || null;
const platform = args.platform || 'web';
const candidates = Math.max(1, parseInt(args.candidates || '7', 10));
const reroll = Math.max(0, parseInt(args.reroll || '0', 10));
const register = args.register || 'plain';
const key = args.key || createHash('sha256').update(String(Date.now()) + Math.random()).digest('hex').slice(0, 8);
const TIERS = ['graphic', 'interaction', 'atmosphere'];

if (!['direction', 'surface'].includes(scope)) die(`--scope must be direction or surface`);
if (mode && !['persuade', 'operate', 'read', 'experience'].includes(mode)) die(`--mode must be persuade|operate|read|experience`);
if (!['plain', 'safer', 'bolder'].includes(register)) die(`--register must be plain|safer|bolder`);

const worlds = readDeck(join(root, 'worlds'));
const stagings = readDeck(join(root, 'stagings'));

// --- assigned index: rank 0..N-1 by digest, excluding earlier rounds ---
const usedIdx = new Set();
let assigned = -1;
for (let round = 0; round <= reroll; round++) {
  const ranked = rank([...Array(candidates).keys()].filter(i => !usedIdx.has(i)), `${key}:${round}:idx`, i => String(i));
  assigned = ranked.length ? ranked[0] : -1;
  if (assigned >= 0) usedIdx.add(assigned);
}

// --- challengers ---
const usedIds = new Set();
let hand = [];
for (let round = 0; round <= reroll; round++) {
  hand = [];
  if (scope === 'direction') {
    for (const tier of TIERS) {
      const pool = worlds.filter(w => w.tier === tier && fits(w) && !usedIds.has(w.id));
      const pick = weightedPick(pool, `${key}:${round}:world:${tier}`);
      if (pick) hand.push(pick);
    }
  } else {
    const pool = stagings.filter(s => fits(s) && !usedIds.has(s.id));
    const atGrain = grain ? pool.filter(s => s.grain === grain) : pool;
    const rest = pool.filter(s => !atGrain.includes(s));
    const ordered = [...weightedOrder(atGrain, `${key}:${round}:staging:grain`), ...weightedOrder(rest, `${key}:${round}:staging:rest`)];
    hand = ordered.slice(0, 3);
  }
  hand.forEach(h => usedIds.add(h.id));
}

const result = {
  key, scope, mode, grain, platform, reroll, register, candidates,
  assigned: assigned < 0 ? null : assigned + 1,
  challengers: hand.map(h => ({ id: h.id, name: h.name, tier: h.tier || null, grain: h.grain || null, rating: h.rating, file: h.file })),
  deck: { worlds: worlds.length, stagings: stagings.length },
};

if (args.json) { console.log(JSON.stringify(result, null, 2)); process.exit(0); }

console.log(`ROLL ${key}  scope=${scope}  mode=${mode || 'any'}  platform=${platform}${grain ? `  grain=${grain}` : ''}  round=${reroll}  register=${register}`);
console.log('');
if (scope === 'direction') {
  console.log(`ASSIGNED: candidate #${result.assigned} of your ${candidates} resonance-ordered grounded directions.`);
  console.log(`  Build this one unless a human present chooses otherwise. A re-roll (--reroll ${reroll + 1}) excludes it.`);
} else {
  console.log(`STAGINGS: the three compositions below reach the table; the world stays fixed.`);
}
console.log('');
console.log(hand.length ? 'CHALLENGERS:' : 'CHALLENGERS: none (deck empty for this mode/platform) -- assignment-only roll.');
for (const h of hand) {
  console.log(`  - ${h.name}  [${h.tier || h.grain}  rating ${h.rating}]  ${h.file}`);
}
console.log('');
console.log('WHAT TO DO (methods.md, Direct):');
if (scope === 'direction') {
  console.log('  1. Read each challenger file. Fuse it with the product first: the world supplies form and');
  console.log('     system grammar, the product supplies every fact; clarity wins conflicts.');
  console.log('  2. Weigh each fused challenger against the ASSIGNED direction on exactly two axes:');
  console.log('     audience identification, product clarity. Verdict per challenger: wins (beats it on');
  console.log('     both -> becomes the build candidate), competitive (holds one -> full alternate),');
  console.log('     declined (loses both -> still donates one discipline the assigned direction lacks).');
  console.log('  3. Present ONE direction fully committed, raised by what it beat; your own top pick as');
  console.log('     one card only if it is not the assigned one; the category standard as the quiet exit.');
  if (register === 'bolder') console.log('  REGISTER bolder: the dealt foreign forms are the whole hand; first dealt leads.');
  if (register === 'safer') console.log('  REGISTER safer: spend this hand unseen; present your conventional grounded candidates plus the canon.');
} else {
  console.log('  1. Read each staging. Dress it in the established world; the material does not change.');
  console.log('  2. Present the three as equal cards; a human locks one, or the first dealt builds.');
}
console.log('');
console.log(`Reproduce: node scripts/roll.mjs --scope ${scope}${mode ? ` --mode ${mode}` : ''}${grain ? ` --grain ${grain}` : ''} --platform ${platform} --candidates ${candidates} --key ${key} --reroll ${reroll}`);

// ---------------------------------------------------------------- helpers
function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const k = a.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) out[k] = true; else { out[k] = next; i++; }
  }
  return out;
}
function die(msg) { console.error(`roll: ${msg}`); process.exit(2); }
function digest(s) { return createHash('sha256').update(s).digest('hex'); }
function rank(items, salt, idFor) {
  return items.map(it => ({ it, d: digest(`${salt}:${idFor(it)}`) })).sort((a, b) => (a.d < b.d ? 1 : a.d > b.d ? -1 : 0)).map(x => x.it);
}
function tickets(entry) { return entry.rating >= 3 ? 2 : entry.rating === 2 ? 1 : 0; }
function weightedOrder(pool, salt) {
  let eligible = pool.filter(e => tickets(e) > 0);
  if (eligible.length < 3) eligible = pool; // thin pool: everyone plays
  const expanded = [];
  for (const e of eligible) for (let t = 0; t < Math.max(1, tickets(e)); t++) expanded.push({ e, t });
  const seen = new Set();
  return rank(expanded, salt, x => `${x.e.id}#${x.t}`).map(x => x.e).filter(e => (seen.has(e.id) ? false : (seen.add(e.id), true)));
}
function weightedPick(pool, salt) { return weightedOrder(pool, salt)[0] || null; }
function fits(entry) {
  if (mode && Array.isArray(entry.modes) && entry.modes.length && !entry.modes.includes(mode)) return false;
  if (platform && Array.isArray(entry.platforms) && entry.platforms.length && !entry.platforms.includes(platform)) return false;
  return true;
}
function readDeck(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter(f => f.endsWith('.md') && !f.startsWith('_') && f !== 'README.md').map(f => {
    const fm = frontmatter(readFileSync(join(dir, f), 'utf8'));
    return { ...fm, id: fm.id || f.replace(/\.md$/, ''), name: fm.name || fm.id || f, rating: parseInt(fm.rating || '2', 10), file: join(dir.replace(root + '/', ''), f) };
  });
}
function frontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  const out = {};
  if (!m) return out;
  for (const line of m[1].split('\n')) {
    const mm = line.match(/^([a-zA-Z_-]+):\s*(.*?)\s*(#.*)?$/);
    if (!mm) continue;
    let v = mm[2].trim();
    if (v.startsWith('[') && v.endsWith(']')) v = v.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean);
    out[mm[1]] = v;
  }
  return out;
}
