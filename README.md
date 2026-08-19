<div align="center">

# lroolle-design

**A design skill with taste built in: sense, direct, contract, build, critique.**

seven design languages as contracts · one token schema · a verdict that can say costume

<sub>status: private, pre-release -- the protocol and contracts are complete, the specimen and platform notes are being proven on real surfaces</sub>

</div>

---

Most agent-built interfaces are recognizable in three seconds: one
saturated sans, cream and terracotta or near-black and acid green, a
hero with two buttons and three feature cards, "Get started" before
the page has said what the product is. That is not a style problem;
it is a judgment problem. Nothing in a normal stack ever asks what
this thing wants to be, offers a real choice of language, writes the
choice down, or checks whether the result made the task easier.

This skill makes those four questions structural:

```text
> design a landing page for our log-search product

  sense    product surface behind it, brand surface in front; audience: SREs,
           daily; reflex to name: near-black + acid green "developer tool"
  direct   [A] default re-seeded steel  [B] industry, light-first  [C] nocturnes, gold
           recommend B: the product IS a control panel; brand page shows it honestly
  contract DESIGN.md + tokens/industry.css re-seeded hue 230 / accent orange
  build    landing.md recipe; first screen states the product in one sentence at 390
  critique 390/768/1440; bans clean; P1: accent on 6 things -> 3; self-diff named
```

Every phase ends on a condition the agent can check, and the last one
can fail the work.

## The loop

| Phase | Output | Done when |
|---|---|---|
| 1 Sense | a ten-line sense card: subject, job, audience, surface class, assets, protected functions, scene, the named reflex | reflex named |
| 2 Direct | 2-4 direction cards that differ on an axis, one recommended -- or one bound with a reason | direction bound |
| 3 Contract | `DESIGN.md` + `tokens.css` + `TASTE.md` + `bans.sh` in the repo | tokens exist and DESIGN.md describes exactly them |
| 4 Build | the surface, in the project's stack, every value a token | renders; every value traces to a token |
| 5 Critique | screenshots at three widths, bans, P0/P1/P2, verdict, self-diff | zero P0; self-diff names what changed |
| 6 Deliver | what, where, direction and rejects, deferred items, scars | handed over |

The gate in front of it sizes the work: a token tweak gets no
protocol; a throwaway page gets only the floor; a governed context
adopts its official system.

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

`assets/specimen.html` renders one specimen against any of them --
open it, switch systems, flip the theme, see the material before
choosing it.

## What is in the box

```text
lroolle-design-skill/
  SKILL.md                 the protocol: gate, laws, six phases, first-sense table, check
  design-systems/          seven contracts + token schema + _template
  references/              the craft layer, loaded by need:
    thinking  methods  patterns  anti-patterns  typography  fontbook
    color  palettes  motion  platforms  frameworks  sites  skills
  templates/               surface recipes: landing, dashboard, docs, editorial,
                           portfolio, app-shell, forms, deck (+ _template)
  assets/
    tokens/<system>.css    the token contract, light + dark, per system
    specimen.html          see any system rendered
    DESIGN.md.tmpl         the material contract a repo gets
    TASTE.md.tmpl          scars, seeded with the structural ones
    bans.sh                the grep-able scars, exit 1 on any
  scripts/validate.sh      the proof: schema, tokens, links, bans self-test
```

## Install

```bash
# any agent that reads SKILL.md folders
git clone https://github.com/lroolle/lroolle-design-skill ~/.claude/skills/lroolle-design
# or, once public
npx skills@latest add lroolle/lroolle-design-skill
```

Do not run this beside `kiln`, `taste`, or `design-system` from
lroolle/skills -- overlapping triggers fight over invocation. This
repo is the standalone all-in-one; that quartet is the modular one.

## Proof

```bash
./scripts/validate.sh
```

Frontmatter and body length; every relative link resolves; every
system has the twelve contract sections and a token file; every token
file defines every contract token on both themes with no pure
black/white and a reduced-motion rule; the specimen uses only defined
tokens and no raw color; `bans.sh` passes a clean fixture and trips on
a dirty one; ascii punctuation throughout.

## Doctrine

Taste is judgment anchored in evidence, exercised on behavior before
surfaces. References give coordinates, not answers. Constraint breeds
identity. Direction before detail; contract, then memory. The one
line under all of it: a change that makes the surface prettier and
the task harder must fail. `references/thinking.md` has the ten
beliefs; every rule in the repo traces to one.

## Lineage and license

Grown from the author's kiln / taste / animate-it / design-system
skills (lroolle/skills), which distilled the Apple Human Interface
Guidelines lineage, the anti-slop tooling of the impeccable and
taste-skill generation (Apache-2.0 / MIT), and the reference-library
practice. Ideas absorbed elsewhere are rewritten, not pasted; fonts
named are OFL, Fontshare-licensed, or system, and each entry says
which. MIT.
