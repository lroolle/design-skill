<div align="center">

# design-skill

**A design skill with taste built in: sense, roll, promise, build, review.**

seven material languages · a deck of worlds the dice deal from · one token schema · a reviewer that can say costume

<sub>v0.1.0 -- the protocol, contracts and decks are complete; the specimen and platform notes are being proven on real surfaces</sub>

</div>

---

Most agent-built interfaces are recognizable in three seconds: one
saturated sans, cream and terracotta or near-black and acid green, a
hero with two buttons and three feature cards, "Get started" before
the page has said what the product is. That is not a style problem;
it is a judgment problem. Nothing in a normal stack ever asks what
this thing wants to be, offers a real choice of language, writes the
choice down, or checks whether the result made the task easier.

This skill makes those questions structural -- and it knows the one
thing prompting cannot fix: a model ranks its own ideas and builds #1
every run, and a menu just hands the choice to a taste function that
picks the safest card. So the index is assigned by dice, foreign forms
are dealt in from a deck of born-designed graphic systems, the chosen
world is written into the artifact as a five-block promise, and a
fresh-context reviewer checks the render against it.

```text
> design a landing page for our log-search product

  sense    mode: persuade (the product behind it is operate); audience: SREs, daily;
           rut named: near-black + acid green "developer tool", and its opposite
  direct   seven grounded candidates from the SRE's world (runbooks, pager rotas,
           incident timelines, terminal session logs, airport status boards, ...)
           roll 3f9a2c1e -> ASSIGNED #3 "incident timeline as the first viewport";
           challengers dealt: stone-rubbing (declined, donates total ink commitment),
           split-flap-departure-board (competitive), almanac-tear-off (declined)
  promise  THESIS / OWN-WORLD / STORY / FIRST VIEWPORT / FORM, in the body's first comment
  contract tokens/industry.css re-seeded to the world's palette; DESIGN.md written at finish
  build    landing.md recipe; the first viewport IS a live incident timeline on real data
  review   fresh context; evidence valid; promise kept 4/5, FIRST VIEWPORT softened ->
           fix; verdict pass: resolved; self-diff named
```

Every phase ends on a condition the agent can check, and the last one
can fail the work.

## The loop

| Phase | Output | Done when |
|---|---|---|
| 1 Sense | a sense card: subject, job, mode, invention level, audience, assets, protected functions, scene, the named reflex | mode and reflex named |
| 2 Direct | seven grounded candidates; `roll.mjs` assigns one and deals challengers from `worlds/` (or stagings at surface scope); fuse, verdict, present one committed direction + the hand + the standing exit | direction bound, hand named |
| 3 Contract | the five-block promise in the artifact; tokens re-seeded; `TASTE.md` + `bans.sh` in the repo | promise in, tokens exist |
| 4 Build | first viewport as thesis, every atom committed, assets authored, browser surfaces themed, every value a token | renders; every value traces to a token |
| 5 Review | captures validated; fresh-context reviewer: promise audit, floor, P0/P1/P2; recapture / rebuild / fix / ship | ship; scope of the verdict stated; self-diff named |
| 6 Deliver | DESIGN.md from the built world; what, where, roll key, rejects, deferred, scars, synthetic list | handed over |

The gate in front of it sizes the work: a token tweak gets no
protocol; a throwaway page gets only the floor; a governed context
adopts its official system.

## Worlds and stagings

Inside the skill, `worlds/` holds our deck: born-designed graphic
systems with five system rules each (palette/material, type/composition,
topology/navigation, controls/state, responsive/motion), a spark, the
browser technique they ask for, and an honest rating. Our half of the
world that the big catalogs lack -- movable-type formes, thread-bound
page furniture, stone rubbings, almanac tear-offs, metro diagrams,
railway timetables, paired couplets, bamboo-slip scrolls -- beside the
instrument, print and wayfinding systems everyone shares. `stagings/`
holds compositions that dress in any world, for surface-scope rolls.
Small and honest, grown one card per real project.

## Seven languages

Each is a contract, not a skin: seed hue, strategy, type roles,
ratio, density, radius, elevation, motion physics, imagery, component
character, three rationed signature moves, voice, and the ways that
language turns to slop. All compile to the same token names.

| System | One line | Reach for it when |
|---|---|---|
| default | paper and ink; quiet, structural, system type | product surfaces, docs, admin, no brand brief |
| modernist | Swiss grid, grotesk, one signal color, air | studios, portfolios, architecture, fashion, museums |
| classical | book typography, warm paper, restraint | publishing, essays, heritage, wine, universities |
| industry | instrument panel: dense, ruled, mono data, safety accents | dashboards, monitoring, ops, hardware, admin |
| organic | humanist, warm, rounded, tactile | wellness, food, craft, education, community |
| nocturnes | dark-first, one light source, blue-grey mists and gold sparks | music, film, events, games, pro creative tools |
| broadsheets | newsroom hierarchy: hed, dek, columns, hairlines, real photos | news, magazines, newsletters, changelogs |

`skills/design-skill/assets/specimen.html` renders one specimen
against any of them -- open it, switch systems, flip the theme, see
the material before choosing it.

## What is in the box

One repo, one skill. Everything an agent loads lives under
`skills/design-skill/`; everything above it is packaging.

```text
design-skill/
  README.md  LICENSE  llms.txt        repo surface
  .claude-plugin/                     plugin.json + marketplace.json (Claude Code plugin)
  .github/workflows/validate.yml      the proof, on every push
  scripts/validate.sh                 the proof: schema, tokens, links, decks, roll, bans self-test
  site/                               lroolle.com/design-skill, designed by the skill (DESIGN.md inside)
  deploy/                             wrangler config + the base-path worker for site/
  skills/design-skill/                <- the installed unit
    SKILL.md                the protocol: gate, modes, laws, six phases, first-sense table, check
    worlds/                 the challenger deck (born-designed graphic systems) + README + _template
    stagings/               compositions that dress in any world + README + _template
    scripts/roll.mjs        the dice: assigned index + dealt challengers, deterministic by key
    design-systems/         seven material contracts + token schema + _template
    references/             the craft layer, loaded by need:
      thinking  methods  patterns  anti-patterns  typography  fontbook
      color  palettes  motion  platforms  frameworks  sites  skills
    templates/              surface recipes: landing, dashboard, docs, editorial,
                            portfolio, app-shell, forms, deck (+ _template)
    assets/
      tokens/<system>.css   the token contract, light + dark, per system
      specimen.html         see any system rendered
      DESIGN.md.tmpl        the material contract a repo gets
      TASTE.md.tmpl         scars, seeded with the structural ones
      bans.sh               the grep-able scars, exit 1 on any
```

## Install

```bash
# skills CLI -- Claude Code, Codex, Cursor, OpenCode, and 50 more agents
npx skills@latest add lroolle/design-skill

# Claude Code plugin marketplace
/plugin marketplace add lroolle/design-skill
/plugin install design-skill@lroolle

# or by hand, into any agent that reads SKILL.md folders
git clone https://github.com/lroolle/design-skill /tmp/design-skill
cp -R /tmp/design-skill/skills/design-skill ~/.claude/skills/design-skill
cp -R /tmp/design-skill/skills/design-skill ~/.agents/skills/design-skill
```

Do not run this beside `kiln`, `taste`, or `design-system` from
lroolle/skills -- overlapping triggers fight over invocation. This
repo is the standalone all-in-one; that quartet is the modular one.

## The skill used on itself

`site/` is the page at [lroolle.com/design-skill](https://lroolle.com/design-skill),
built by running this protocol end to end. The roll key is printed in the
title block; the promise it was audited against is the first comment in the
body of `site/index.html`; It is live at
[design-skill.1lm.workers.dev](https://design-skill.1lm.workers.dev).
`site/DESIGN.md` records what was bound, what was
deferred and why, and the two defects the run found in the skill itself -- a
`bans.sh` false positive on HTML numeric entities, and `--fg-3` failing the
4.5:1 floor in all seven token files. Both fixed, the second now gated by
`validate.sh`.

## Proof

```bash
./scripts/validate.sh
```

Frontmatter and body length; every relative link resolves; every
system has the twelve contract sections and a token file; every token
file defines every contract token on both themes with no pure
black/white and a reduced-motion rule; the specimen uses only defined
tokens and no raw color; every world and staging card carries the full
schema; `roll.mjs` is deterministic for a fixed key and re-rolls; `bans.sh`
passes a clean fixture and trips on a dirty one; ascii punctuation.

## Doctrine

Taste is judgment anchored in evidence, exercised on behavior before
surfaces. References give coordinates, not answers. Constraint breeds
identity. Direction before detail; contract, then memory. The one
line under all of it: a change that makes the surface prettier and
the task harder must fail. `references/thinking.md` inside the skill
has the eleven beliefs; every rule in the repo traces to one.

## Lineage and license

Grown from the author's kiln / taste / animate-it / design-system
skills (lroolle/skills), which distilled the Apple Human Interface
Guidelines lineage and the reference-library practice. The direction
mechanics -- dice that assign, challengers from a curated deck,
fuse-then-verdict, the standing exit, the five-block promise audited by
a separate reviewer -- follow the measured findings published by the
impeccable project (Apache-2.0) in 2026; the decks, the languages, the
token contract and the CJK half of the world are ours. Ideas absorbed
are rewritten, not pasted; fonts named are OFL, Fontshare-licensed, or
system, and each entry says which. MIT.
