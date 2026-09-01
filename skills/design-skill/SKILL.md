---
name: design-skill
description: >-
  Design instrument for any user-facing surface, material first: start
  from a kit that is already correct (tokens, browser surfaces, a real
  CJK webfont wired), roll a direction where curated worlds compete
  with your own candidates by subject affinity, write the promise into
  the artifact, build, and let kit/check.sh bind what the references
  only used to advise. Fires on four branches: designing or restyling a
  site, app, page, deck, or component ("design a landing page for X",
  "make this dashboard look right", "give me options"); choosing a
  design language, typeface, or palette; auditing or rescuing an
  interface that looks generic or AI-made; and installing a design
  system (kit + DESIGN.md + check) into a repo. Chinese-market surfaces
  get a zh mode (faces, rhythm, punctuation, copy register) that one
  lang attribute flips. A throwaway page needs only the floor.
license: MIT
metadata:
  version: "0.2.0"
  homepage: https://github.com/lroolle/design-skill
---

# design-skill

Material over method. A build starts by copying a kit and editing it,
not by reading advice and writing CSS from memory; a direction comes
from dice rolled over a pool the curated deck has entered; the
promise is written into the artifact; and `kit/check.sh` fails what
the craft used to only recommend. Two tests under everything: **a
change that makes the surface prettier and the task harder must
fail** (costume), and **if someone could guess the look from the
category alone -- or from category plus avoidance -- it is not
designed yet** (the reflex). [references/thinking.md](references/thinking.md)
is the why; the rest of this file is what to do. Every path here is
relative to this skill's directory.

## Gate

| Situation | Move |
|---|---|
| Tweak inside a repo that has DESIGN.md | look the token up, change it, `kit/check.sh --fast` |
| Extend an existing surface | inherit its world and composition; resolve only the new content; `check.sh` |
| New surface inside an established world | Sense -> Direct at surface scope -> Build -> Review |
| New product, or a replacement world | all four phases, Direct at direction scope |
| "Give me options / what fonts / what palette" | Sense -> Direct; hand over the hand |
| Audit, critique, rescue | Review first; if the world is wrong, Direct, then Build |
| An existing brand to match | Sense -> extract (below); identity wins; no direction round |
| Governed context (government, a platform's admin, native OS) | adopt the official system (kit/README.md); ours only for what it leaves undecided |
| Throwaway artifact | floor kit; `check.sh --no-promise`; still no system stack on a zh page |

Ceremony scales with stakes; material does not. Every branch starts
from `kit/`.

## Modes

Name the mode of the *surface in hand* before anything else:
**persuade** (decide and act: landing, pricing, launch; full
expressiveness, commit then clarify), **operate** (complete a task:
app, dashboard, settings; density is a feature; expression in the
details, never over state), **read** (understand: docs, articles;
measure, rhythm, quiet hierarchy), **experience** (be inside the
work: portfolio, gallery; the work leads).

## Laws

- **Behavior before surfaces.** Visible state, disabled not hidden,
  object then action, discoverable then fast, verbs on buttons, undo
  over confirmation, modes visible and escapable, honest feedback,
  trustworthy representation, keyboard and assistive parity. A
  redesign that breaks one is costume.
- **Palette from a specimen, never from a seed.** Ground, ink, rule
  and accent are different materials with a provenance
  (`specimens/palettes/`, or the world card). Both themes authored;
  never pure black or white; semantic states are tokens.
- **Decide every dimension once.** One radius, one icon set at one
  weight, one accent, one masthead device and one section-label
  device per page. An inherited default reads as accident.
- **Structure before shadow, space before border, border before
  color.** Rules, not boxes; cards only for discrete objects.
- **Real copy is design material.** Claims are uninventable;
  synthetic content is labelled. zh copy follows
  `specimens/zh-voice.md`.
- **zh is a mode, not a checkbox.** `<html lang="zh-Hans">` flips
  faces, leading, measure, punctuation, emphasis; a self-hosted CJK
  face is required (`kit/fonts.sh`); the check enforces it.
- **Mechanism over skin.** Worlds and systems are fused with the
  product, never copied; references give coordinates, not answers.
- **Commit, then clarify** on persuade and experience surfaces.
- **Calibration.** Three looks cluster regardless of subject: cream +
  serif + terracotta; near-black + acid accent; broadsheet hairlines +
  italic serif + tracked mono. Landing in one without a brief-specific
  reason means the self-check failed. A bookish or warm subject does
  not license cream and serif.

## Protocol

### 1. Sense

Read the brief, the repo, the existing site. Write the sense card,
twelve lines or fewer, `(inferred)` where the brief was silent:

```
subject / job / mode / invention (extend | surface-in-world | new-world | redesign | match-brand | governed)
audience + frequency / platform / assets on hand / constraints (perf, zh, brand, stack)
protected: the functions that must not break
scene: one physical sentence -- who, where, under what light (decides light or dark)
reflex: the page this category always ships, and its predictable opposite
```

More than two inferred lines on a product with life: one round of at
most five questions, each carrying your default so "yes, go" is a
valid answer, one of them always "explore directions, or decide for
me?". Never ask for CSS values or aesthetic lanes. Matching an
existing brand: measure, do not guess -- colors by painted area onto
token roles, computed families on h1 / p / code, radii and elevation
actually used, five real strings; `(inferred)` on anything not
measured.

Done when the mode, the invention level and the reflex are named.

### 2. Direct

**Surface scope** (world established): derive five to seven
materially different structures from the content and task; run
`node scripts/roll.mjs --scope surface --mode <mode> --grain <grain>`;
the three dealt compositions reach the table as equal cards; a human
locks one, an autonomous run builds the first dealt.

**Direction scope** (new or replacement world):

1. One sentence each: the product's mechanism; the audience's real
   scene; its cultural home; what this surface must prove. Write the
   rut down and keep it off the list: the category's default page,
   its predictable opposite, the literal reading of any metaphor in
   the brief.
2. Seven concrete graphic systems, artifacts, places or rituals the
   audience knows by heart, each with one line on why it can carry
   the mechanism, ordered by resonance, at least three material
   families. Each becomes a complete direction: a reusable visual
   world joined to a concrete first-surface experience.
3. `node scripts/roll.mjs --scope direction --mode <mode> --candidates
   7 --subject "<the brief in ten words, zh terms included>"`. No
   substitute, no skip, no code on a new world before the roll. With
   `--subject`, deck cards whose affinity matches **enter the pool**
   and compete with your seven; the assignment may name your
   candidate #k or a deck card. `--list --subject` shows the scoring.
   Challengers are dealt from the rest of the deck (graphic,
   interaction, atmosphere). Fuse each with the product before
   judging: the world supplies form and grammar, the product every
   fact, clarity wins conflicts. Verdict on two axes, audience
   identification and product clarity: **wins** (both; it builds),
   **competitive** (one; a full alternate), **declined** (neither;
   still donates one discipline as a named raise, never its clothes).
4. Present **one** direction fully committed: world, first viewport,
   visitor path, signature interaction (named as a model, not an
   effect), reach, honest risk. Beside it: winning and competitive
   challengers as alternates; declined ones in one row; your own top
   pick as one card if it was not assigned; and the standing exit --
   the category standard played straight, never recommended. Re-roll
   in three registers (plain, safer, bolder) is the user's steering;
   re-roll on your own only on named factual grounds. A user-pinned
   world beats the roll, and pins the world, not its softest rendition.

Done when one direction is bound with verdicts and raises written.

### 3. Build

Start from material. Copy `kit/floor/` (correct, no look) or
`kit/house/` (ours: ink on paper, administrative register,
CJK-native, rules not boxes) into the project; pick the system whose
dials fit (`systems/`) if the world names one; **re-ink the palette
from a specimen or the world card** (the floor palette warns when
shipped); on a zh product run `kit/fonts.sh` and set `lang`. Wire it
(kit/README.md). Then:

- **The promise**, first comment in the body, five blocks under 150
  words: THESIS (the one idea; the arrangement it refuses), OWN-WORLD
  (palette and component language, recognizable with content
  removed), STORY (what the visitor understands, believes, does),
  FIRST VIEWPORT (the exact composition), FORM (the world or
  candidate, the pool size, the roll key). A block that reads like a
  mood is not decided. `check.sh` fails without it.
- A ten-line ASCII sketch of regions and hierarchy before code; the
  recipe for the surface kind (`decks/recipes/`); the craft
  (`references/craft.md`) when a call is open; `cjk.md` on zh;
  `simulation.md` for anything that runs (model card first, six
  layers, skin from tokens, a settled frame under reduced motion;
  `assets/primitives/` has working models).
- The first viewport is a thesis, not a header. Commit every atom in
  the world's vocabulary; author the assets at production fidelity
  and label the synthetic; build the world's web leverage, not a
  static imitation; pace the scroll; theme the browser surfaces (the
  kit does); every value a token; all five states; keyboard and
  reduced motion baked in.
- `kit/check.sh --fast src` after edits; the full pass before Review.
  Warnings ship only with a reason in DESIGN.md.

Done when it renders in the project's stack, `check.sh` is clean of
FAIL, and the promise is in the artifact with its roll key.

### 4. Review

Evidence first: render and capture at 390 / 768 / 1440 from the top,
motion settled; open every capture and confirm it shows what its
name claims. Then **compare the render against the named specimen or
world card**, not against your memory of one: the palette card's
inks, the world's five system rules, the type specimen's settings.
This is the one step that touches layout convergence directly; it
runs here, once, because a browser on every edit is too expensive to
be reliable.

The review runs in a **fresh context** when the harness has
subagents; without them, step fully out of the build context and say
so. Pass it: the request, the promise, the captures, the `check.sh`
output, the world or specimen card, and this order:

0. evidence valid, or **recapture**;
1. promise audit: each block kept / softened / broken; template bones
   (a committed skin over the standard grid, or the generated-dashboard
   shape) is broken;
2. behavioral floor, pass / fail per law;
3. rubric, graded on the worst sustained band --
   **P0**: a floor fail; a promise block broken; anything `check.sh`
   fails; contrast below 4.5:1; a state missing; horizontal scroll at
   390; targets under 44px; invented claims; one of the three
   calibration looks with no reason; a system stack on a zh page.
   **P1**: a promise block softened; any `check.sh` warning without a
   written reason; device sprawl; flat hierarchy at squint; measure
   over 75ch / 40 characters; browser surfaces at defaults; motion
   over budget; a living element with no model card; zh copy in the
   spec or marketing register.
   **P2**: tabular numerals missing in a table; underline offset
   undecided; dark-mode compensation absent; uniform section rhythm;
   the signature move present but timid.

Four dispositions: **recapture**, **rebuild** (a named region broke
the promise; rebuild, then a full review), **fix** (batch, recapture,
score each resolved / partial / unresolved), **ship**. Two rounds
unattended. Report the verdict at its actual scope. Then the
self-diff: for any similar brief, would I have produced this? Name
what changed. If nothing, it is not designed.

On ship: write `DESIGN.md` from `assets/DESIGN.md.tmpl` **from the
built surface** (ground truth over intention, provenance of the
palette, every `check.sh` warning with its reason), `TASTE.md` from
its template, one line in `AGENTS.md` / `CLAUDE.md` pointing at both
and at `kit/check.sh`. Hand over: what was built and where; the world
or candidate, pool and roll key, the hand rejected; deferred P1/P2
with reasons; scars on any rejection; synthetic content to replace;
one line on what only eyes on a device can check.

## Check

Smash the work if any survive:

- a behavioral-floor fail, or a protected function dropped
- `kit/check.sh` reporting FAIL, or a WARN with no written reason
- code on a new world before the roll; a roll without `--subject`
  on a direction-scope brief; a direction presented as a ranked list
- a palette with no provenance, or the floor palette shipped
- a zh page on a system stack; leading under 1.7; copy that explains
  the layout to the reader
- a promise block softened or broken; template bones or the
  generated-dashboard shape under a committed skin
- one of the three calibration looks with no brief-specific reason
- a review inside the build transcript when subagents existed; a
  "pass" claimed wider than the verdict
- DESIGN.md describing tokens or a layout the code does not have
- competent but forgettable: the self-diff found nothing. That is the
  one this skill exists to fail.

## Map

| Path | Holds | Load when |
|---|---|---|
| [kit/](kit/README.md) | floor and house kits, `check.sh`, `fonts.sh`; wiring by stack; governed systems | Build, always |
| [specimens/palettes/](specimens/palettes/README.md) | observed palettes with provenance and their irregularity | Build (re-ink), Review |
| [specimens/type/](specimens/type/README.md) | real settings at real sizes: zh body, zh display, Latin body, the ledger | Build |
| [specimens/zh-voice.md](specimens/zh-voice.md) | Chinese copy register | any zh surface |
| [decks/worlds/](decks/worlds/_template.md) | 27 born-designed graphic systems, affinity-tagged; enter the roll | Direct |
| [decks/compositions/](decks/compositions/_template.md) | 14 compositions for surface-scope rolls | Direct (surface scope) |
| [decks/recipes/](decks/recipes/_template.md) | 8 surface recipes: landing, dashboard, docs, editorial, portfolio, app-shell, forms, deck | Build |
| [scripts/roll.mjs](scripts/roll.mjs) | the dice: pool = your candidates + affine deck cards; challengers; deterministic by key | Direct |
| [systems/](systems/README.md) | seven material contracts as CSS, a 300-word card each, the token schema | Build, when the world names one |
| [references/thinking.md](references/thinking.md) | the doctrine | once |
| [references/craft.md](references/craft.md) | type, structure, motion | Build |
| [references/cjk.md](references/cjk.md) | the zh mode: faces, rhythm, punctuation, loading | any zh surface |
| [references/color.md](references/color.md) | specimens not seeds; strategy; dark; contrast; data viz | re-ink, Review |
| [references/simulation.md](references/simulation.md) · [assets/primitives/](assets/primitives/README.md) | living elements: model card, six layers, working models | Build with anything that runs |
| [references/anti-patterns.md](references/anti-patterns.md) | permanent tells and the dated ones | Sense, Review |
| [references/platforms.md](references/platforms.md) | per-platform rules off desktop web | non-web |
| [assets/](assets/) | DESIGN.md and TASTE.md templates | ship |

## Lineage

Grown from our kiln, taste, animate-it and design-system skills; the
direction mechanics (dice that assign, challengers from a curated
deck, the promise audited by a separate reviewer) follow the
impeccable project's 2026 research (Apache-2.0) and Anthropic's
frontend-design skill's self-critique move, rewritten with our decks
and our CJK half of the world. The 2026-08 rewrite moved the skill
from method to material after a full build shipped the ritual and
skipped the craft; `kit/`, `specimens/` and the affinity roll are the
answer to that.
