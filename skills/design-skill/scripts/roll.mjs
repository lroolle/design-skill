#!/usr/bin/env node
// roll.mjs -- the dice the model cannot roll for itself.
//
// Left alone, a model ranks its own candidate directions and builds #1,
// and that ranking is deterministic: every run in a category ships the
// same one or two concepts. A menu does not help; a taste function picks
// the safest card. So the index is ASSIGNED from outside. And -- the
// change that matters -- the deck is no longer only a challenger: cards
// whose subject affinity matches the brief ENTER THE CANDIDATE POOL and
// compete for the assignment on equal terms with the model's own prose.
// For a Chinese almanac, almanac-tear-off and thread-bound-book are
// candidates, not visitors. That is what stops the output collapsing to
// the model's prior.
//
//   pool        the model's N resonance-ordered candidates (indices 1..N)
//               + up to --pool deck cards whose affinity matches --subject
//               (weighted by rating: 3 = double odds, 1 = sits out unless thin)
//   assigned    one entry of the pool: "your candidate #k" or "deck: <id>"
//   challengers foreign forms dealt from the rest of the deck (one per tier)
//               or, at surface scope, three compositions by grain
//   reroll      round n of the same key: everything rounds 0..n-1 dealt is
//               excluded, so one key reproduces the whole chain
//
// Deterministic: same key + same flags = same deal, on any machine.
// No network, no dependencies, reads only decks/worlds and decks/compositions.
//
// Usage:
//   node scripts/roll.mjs --scope direction --mode persuade --candidates 7 --subject "chinese calendar app, daily almanac"
//   node scripts/roll.mjs --scope direction --mode read --zh --subject "docs for a payments api"
//   node scripts/roll.mjs --scope surface --mode operate --grain view
//   node scripts/roll.mjs ... --key 3f9a2c1e --reroll 1
//   node scripts/roll.mjs ... --register bolder|safer|plain   (presentation only)
//   node scripts/roll.mjs ... --platform ios                  (hard filter)
//   node scripts/roll.mjs --list --subject "..."              (score the deck, no roll)
//   node scripts/roll.mjs ... --json
//
// Exit 0 when the decks parse; the deal is advice, SKILL.md says what to
// do with it. Without --subject the deck cannot enter the pool and the
// roll says so: that is the old behavior, and it is a warning now.

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
const poolMax = Math.max(0, parseInt(args.pool || '3', 10));
const reroll = Math.max(0, parseInt(args.reroll || '0', 10));
const register = args.register || 'plain';
const subject = typeof args.subject === 'string' ? args.subject : '';
const zh = !!args.zh || /[一-鿿]/.test(subject);
const key = args.key || createHash('sha256').update(String(Date.now()) + Math.random()).digest('hex').slice(0, 8);
const TIERS = ['graphic', 'interaction', 'atmosphere'];

if (!['direction', 'surface'].includes(scope)) die(`--scope must be direction or surface`);
if (mode && !['persuade', 'operate', 'read', 'experience'].includes(mode)) die(`--mode must be persuade|operate|read|experience`);
if (!['plain', 'safer', 'bolder'].includes(register)) die(`--register must be plain|safer|bolder`);

const worlds = readDeck(join(root, 'decks', 'worlds'));
const compositions = readDeck(join(root, 'decks', 'compositions'));

// --- affinity: which deck cards the brief is actually about ---
const terms = tokenize(subject);
for (const w of worlds) w.score = affinity(w, terms);
const affine = worlds.filter(w => fits(w) && w.score > 0).sort((a, b) => b.score * b.rating - a.score * a.rating || a.id.localeCompare(b.id));

if (args.list) {
  console.log(`AFFINITY for "${subject}"${zh ? '  [zh]' : ''}`);
  for (const w of (terms.length ? affine : worlds)) console.log(`  ${String(w.score).padStart(2)}  ${w.id.padEnd(30)} rating ${w.rating}  ${w.tier}  ${w.zh ? 'zh' : '  '}  ${w.file}`);
  if (terms.length && !affine.length) console.log('  (no card matches; the deck stays a challenger this round)');
  process.exit(0);
}

// --- the pool: model candidates + matched deck cards, then the assignment ---
// a card enters the pool on a real match (score >= 2), never on the zh bonus alone
const deckPool = scope === 'direction' ? affine.filter(w => w.score >= 2).slice(0, poolMax) : [];
const pool = [
  ...[...Array(candidates).keys()].map(i => ({ kind: 'yours', idx: i + 1, id: `c${i + 1}`, rating: 2 })),
  ...deckPool.map(w => ({ kind: 'deck', id: w.id, name: w.name, rating: w.rating, file: w.file, score: w.score })),
];
const usedIds = new Set();
let assigned = null;
for (let round = 0; round <= reroll; round++) {
  const open = pool.filter(p => !usedIds.has(p.id));
  // no deck card in the pool: the original index rank, so a key deals the same
  // assignment it always did (and the same as the page's port in site/deal.js)
  assigned = deckPool.length
    ? weightedPick(open, `${key}:${round}:assign`) || null
    : rank(open, `${key}:${round}:idx`, p => String(p.idx - 1))[0] || null;
  if (assigned) usedIds.add(assigned.id);
}

// --- challengers: the rest of the deck, one per tier ---
let hand = [];
for (let round = 0; round <= reroll; round++) {
  hand = [];
  if (scope === 'direction') {
    for (const tier of TIERS) {
      const p = worlds.filter(w => w.tier === tier && fits(w) && !usedIds.has(w.id));
      const pick = weightedPick(p, `${key}:${round}:world:${tier}`);
      if (pick) hand.push(pick);
    }
  } else {
    const p = compositions.filter(s => fits(s) && !usedIds.has(s.id));
    const atGrain = grain ? p.filter(s => s.grain === grain) : p;
    const rest = p.filter(s => !atGrain.includes(s));
    hand = [...weightedOrder(atGrain, `${key}:${round}:comp:grain`), ...weightedOrder(rest, `${key}:${round}:comp:rest`)].slice(0, 3);
  }
  hand.forEach(h => usedIds.add(h.id));
}

const result = {
  key, scope, mode, grain, platform, reroll, register, candidates, subject: subject || null, zh,
  pool: pool.map(p => p.kind === 'yours' ? { kind: 'yours', index: p.idx } : { kind: 'deck', id: p.id, rating: p.rating, score: p.score, file: p.file }),
  assigned: assigned ? (assigned.kind === 'yours' ? { kind: 'yours', index: assigned.idx } : { kind: 'deck', id: assigned.id, name: assigned.name, file: assigned.file }) : null,
  challengers: hand.map(h => ({ id: h.id, name: h.name, tier: h.tier || null, grain: h.grain || null, rating: h.rating, zh: !!h.zh, file: h.file })),
  deck: { worlds: worlds.length, compositions: compositions.length, affine: affine.map(w => w.id) },
};

if (args.json) { console.log(JSON.stringify(result, null, 2)); process.exit(0); }

console.log(`ROLL ${key}  scope=${scope}  mode=${mode || 'any'}  platform=${platform}${grain ? `  grain=${grain}` : ''}${zh ? '  zh' : ''}  round=${reroll}  register=${register}`);
console.log('');
if (scope === 'direction') {
  if (!terms.length) console.log('WARNING: no --subject, so the deck could not enter the pool. Pass the brief in a few words next time;\n         a roll over your own candidates only cannot leave your prior.\n');
  else if (!deckPool.length) console.log(`POOL: your ${candidates} candidates. No deck card matches "${subject}" -- the deck stays a challenger this round.\n`);
  else console.log(`POOL: your ${candidates} candidates + ${deckPool.length} from the deck by affinity: ${deckPool.map(w => `${w.id} (${w.score})`).join(', ')}\n`);
  if (assigned?.kind === 'deck') {
    console.log(`ASSIGNED: deck card ${assigned.id}  --  ${assigned.file}`);
    console.log(`  Build this world. Read the card; it supplies form and system grammar, the product supplies every fact.`);
  } else if (assigned) {
    console.log(`ASSIGNED: your candidate #${assigned.idx} of ${candidates}.`);
    console.log(`  Build this one unless a human present chooses otherwise. A re-roll (--reroll ${reroll + 1}) excludes it.`);
  }
} else {
  console.log(`COMPOSITIONS: the three below reach the table; the world stays fixed.`);
}
console.log('');
console.log(hand.length ? 'CHALLENGERS:' : 'CHALLENGERS: none (deck empty for this mode/platform).');
for (const h of hand) console.log(`  - ${h.name}  [${h.tier || h.grain}  rating ${h.rating}${h.zh ? '  zh' : ''}]  ${h.file}`);
console.log('');
console.log('WHAT TO DO (SKILL.md, Direct):');
if (scope === 'direction') {
  console.log('  1. Read each challenger. Fuse it with the product first: the world supplies form and');
  console.log('     system grammar, the product supplies every fact; clarity wins conflicts.');
  console.log('  2. Weigh each fused challenger against the ASSIGNED direction on two axes: audience');
  console.log('     identification, product clarity. wins (both) -> it builds; competitive (one) -> alternate;');
  console.log('     declined (neither) -> it still donates one discipline, written in as a named raise.');
  console.log('  3. Present ONE direction fully committed; the category standard as the quiet exit.');
  if (register === 'bolder') console.log('  REGISTER bolder: the dealt foreign forms are the whole hand; first dealt leads.');
  if (register === 'safer') console.log('  REGISTER safer: spend this hand unseen; present your conventional grounded candidates plus the canon.');
} else {
  console.log('  1. Read each composition. Dress it in the established world; the material does not change.');
  console.log('  2. Present the three as equal cards; a human locks one, or the first dealt builds.');
}
console.log('');
console.log(`Reproduce: node scripts/roll.mjs --scope ${scope}${mode ? ` --mode ${mode}` : ''}${grain ? ` --grain ${grain}` : ''} --platform ${platform} --candidates ${candidates}${subject ? ` --subject ${JSON.stringify(subject)}` : ''}${args.zh ? ' --zh' : ''} --key ${key} --reroll ${reroll}`);
console.log(`Promise FORM line: "<world or candidate>, pool ${pool.length}, roll ${key}"`);

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
// subject -> terms: latin words (lowercase, singular-ish), hyphen phrases kept, CJK runs kept whole and as bigrams
function tokenize(s) {
  const out = new Set();
  for (const m of s.toLowerCase().match(/[a-z0-9][a-z0-9-]*/g) || []) {
    out.add(m); if (m.endsWith('s') && m.length > 3) out.add(m.slice(0, -1));
    for (const part of m.split('-')) if (part.length > 2) out.add(part);
  }
  for (const run of s.match(/[一-鿿]+/g) || []) {
    out.add(run);
    for (let i = 0; i + 1 < run.length; i++) out.add(run.slice(i, i + 2));
  }
  return [...out];
}
function affinity(card, terms) {
  if (!terms.length) return 0;
  const bag = new Set();
  for (const a of (Array.isArray(card.affinity) ? card.affinity : [])) {
    const k = String(a).toLowerCase(); bag.add(k);
    for (const part of k.split('-')) if (part.length > 2) bag.add(part);
    if (k.endsWith('s') && k.length > 3) bag.add(k.slice(0, -1));
  }
  let score = 0;
  for (const t of terms) if (bag.has(t)) score += 1;
  // CJK: a term contained in any affinity word, or vice versa, counts
  for (const t of terms) if (/[一-鿿]/.test(t)) for (const b of bag) if (/[一-鿿]/.test(b) && (b.includes(t) || t.includes(b))) { score += 1; break; }
  if (zh && card.zh) score += 1;   // a zh brief lifts the CJK half of the deck by one
  return score;
}
function readDeck(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter(f => f.endsWith('.md') && !f.startsWith('_') && f !== 'README.md').sort().map(f => {
    const fm = frontmatter(readFileSync(join(dir, f), 'utf8'));
    return { ...fm, id: fm.id || f.replace(/\.md$/, ''), name: fm.name || fm.id || f, rating: parseInt(fm.rating || '2', 10), zh: String(fm.zh) === 'true', file: join(dir.replace(root + '/', ''), f) };
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
