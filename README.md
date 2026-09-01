<div align="center">

# design-skill

**A design skill that ships material, not advice: kit, roll, promise, build, check.**

two kits that start correct · a deck of worlds that enters the roll · observed palettes with provenance · a zh mode one attribute flips · a check that fails

<sub>v0.2.0 -- rewritten material-first after a full build shipped the ritual and skipped the craft; the acceptance rebuild is next</sub>

</div>

---

Most agent-built interfaces are recognizable in three seconds: one
saturated sans, cream and terracotta or near-black and acid green, a
hero with two buttons and three feature cards, "Get started" before
the page has said what the product is. That is not a style problem;
it is a judgment problem. Nothing in a normal stack ever asks what
this thing wants to be, offers a real choice of language, writes the
choice down, or checks whether the result made the task easier.

This skill makes those questions structural, and it learned the hard
way that structure is not enough. Version 0.1 had the protocol and
81,000 words of craft, and a real build shipped the ceremony and
skipped the craft: a Chinese calendar on a system font stack, a palette
computed from one seed hue, a sticky rail of cards. The material was
in the repo; nothing made it bind. So 0.2 inverts the priority. A
build starts by copying a kit that is already correct. A palette comes
from an observed specimen with a provenance, never a formula. The deck
of born-designed worlds does not just challenge the model's ideas; a
card whose subject matches the brief enters the roll as a candidate.
Chinese is a mode one `lang` attribute flips. And `kit/check.sh` fails
what the references used to only recommend.

```text
> design a landing page for our log-search product

  sense    mode: persuade (the product behind it is operate); audience: SREs, daily;
           rut named: near-black + acid green "developer tool", and its opposite
  direct   seven grounded candidates from the SRE's world (runbooks, pager rotas,
           incident timelines, terminal session logs, airport status boards, ...)
           roll 3f9a2c1e -> ASSIGNED #3 "incident timeline as the first viewport";
           challengers dealt: metro-diagram (competitive: a line diagram carries the
           timeline's topology), garden-framed-view (declined, donates the one framed
           view per viewport), olympic-pictogram-program (declined, donates one stroke)
  build    kit/house copied in, re-inked from specimens/palettes/timetable-paper;
           THESIS / OWN-WORLD / STORY / FIRST VIEWPORT / FORM in the body's first comment;
           landing.md recipe; the first viewport IS a live incident timeline on real data;
           kit/check.sh: 0 fail, 1 warn (reflex, reason written)
  review   fresh context; captures compared against the world card and the palette
           specimen; promise kept 4/5, FIRST VIEWPORT softened -> fix; resolved; self-diff named
```

Every phase ends on a condition the agent can check, and `check.sh`
can fail the work without reading a word of it.

## Why a backend engineer built this

I write backends. I can read a query plan and I cannot draw. For years
that meant every interface I shipped wore someone else's defaults, and
every interface an agent built for me came back as the same saturated
sans, the same hero with two buttons and three feature cards --
competent, anonymous, and in some ways worse than what it replaced,
because now it *looked* finished.

The bet in this repo is that most of what reads as taste is not a hand.
It is a sequence you can run: refuse to let the model rank its own
ideas, deal it a form it would never have retrieved, make it write the
choice down before it builds, and hand the render to a reviewer that is
allowed to say no. Do that and the output stops being average -- because
average is exactly what ranking your own ideas produces.

You do not need an eye to start. You need a protocol that will not let
you skip the parts an eye would have caught.


## The loop

| Phase | Output | Done when |
|---|---|---|
| 1 Sense | a sense card: subject, job, mode, invention level, audience, assets, protected functions, scene, the named reflex | mode and reflex named |
| 2 Direct | seven grounded candidates; `roll.mjs --subject "<brief>"` builds a pool of those plus the deck cards whose affinity matches, assigns one, deals challengers; fuse, verdict, present one committed direction + the hand + the standing exit | direction bound, hand named |
| 3 Build | `kit/floor` or `kit/house` copied in and re-inked from a specimen or the world card; the five-block promise in the artifact; the recipe; every atom committed; `kit/check.sh` | renders; check clean of FAIL; promise in with its roll key |
| 4 Review | captures compared against the named specimen and world card; fresh-context reviewer: promise audit, floor, P0/P1/P2; recapture / rebuild / fix / ship; DESIGN.md written from the built surface | ship; scope of the verdict stated; self-diff named |

The gate in front of it sizes the work: a token tweak gets a lookup
and `check.sh --fast`; a throwaway page gets the floor kit; a governed
context adopts its official system. Material is never skipped.

## Kits, specimens, decks

`kit/floor` is correct without a look: every token on both themes,
browser surfaces themed, tabular numerals, focus, reduced motion, and
a real CJK webfont wired through `kit/fonts.sh` (Noto Sans SC arrives
as 73 unicode-range slices; a page fetches the handful it uses). A
build must overwrite its palette; `check.sh` warns when it did not.
`kit/house` is our aesthetic as an executable default: ink on paper,
administrative register, CJK-native, rules instead of boxes, one
cinnabar stamp -- read off the deck below and the house doctrine, not
invented.

`specimens/palettes/` replaces the seed-hue recipe with ten observed
palettes -- timetable paper, almanac leaf, stone rubbing, nautical
chart, patent sheet, Du Bois plates, isotype, split-flap, thread-bound
book, teletext -- each naming its artifact, its inks, and the
irregularity a ramp cannot make. `specimens/type/` has real settings
at real sizes; `specimens/zh-voice.md` is the Chinese copy register
the old skill never had.

`decks/worlds/` holds 27 born-designed graphic systems with five system
rules each, a spark, the browser technique they ask for, an honest
rating, and now subject affinity tags so `roll.mjs --subject` can put
`almanac-tear-off` in the pool for an almanac. A third are ours and
the big catalogs lack them: movable-type formes, thread-bound page
furniture, stone rubbings, almanac tear-offs, metro diagrams, railway
timetables, paired couplets, bamboo-slip scrolls. `decks/compositions/`
dresses any world at surface scope; `decks/recipes/` holds the eight
surface recipes.

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

Each is one CSS file (`systems/<name>.css`) and a 300-word card; the
prose that used to restate the CSS is gone. A system is bound when a
world names one; the kits are where a build starts otherwise.

## What is in the box

One repo, one skill. Everything an agent loads lives under
`skills/design-skill/`; everything above it is packaging.

```text
design-skill/
  README.md  LICENSE  llms.txt        repo surface
  .claude-plugin/                     plugin.json + marketplace.json (Claude Code plugin)
  .github/workflows/validate.yml      the proof, on every push
  scripts/validate.sh                 the proof: packaging, links, kits, tokens, check.sh self-test, decks, dice, site sync
  site/                               lroolle.com/design-skill, designed by the skill (DESIGN.md inside)
  deploy/                             wrangler config + the base-path worker for site/
  skills/design-skill/                <- the installed unit
    SKILL.md                the protocol: gate, modes, laws, four phases, check, map
    kit/                    the product
      floor/                tokens, base (browser surfaces + the :lang(zh) block), fonts.zh, fonts.latin
      house/                tokens with provenance, base, components (ledger, spec sheet, stamp, fields, void)
      check.sh              FAIL/WARN: the binding layer
      fonts.sh              self-host any face as unicode-range slices
    specimens/              palettes/ (ten observed, with provenance), type/ (real settings), zh-voice.md
    decks/                  worlds/ (27, affinity-tagged), compositions/ (14), recipes/ (8)
    scripts/roll.mjs        the dice: pool = your candidates + affine deck cards; challengers; deterministic by key
    systems/                seven material contracts as css + a 300-word card each + the token schema
    references/             thinking  craft  cjk  color  simulation  anti-patterns  platforms
    assets/                 DESIGN.md.tmpl, TASTE.md.tmpl, primitives/ (working behavior models)
```

## Install

```bash
# skills CLI -- Claude Code, Codex, Cursor, OpenCode, and 50 more agents
npx skills@latest add lroolle/design-skill

# Claude Code plugin marketplace
/plugin marketplace add lroolle/design-skill
/plugin install design-skill@lroolle

# or from a clone: real copies into ~/.claude/skills and ~/.agents/skills
git clone https://github.com/lroolle/design-skill && cd design-skill
make install            # make deps / validate / check DIR=src / uninstall
```

`make install` manages only this skill: it mirrors the payload,
lists what it added, updated and removed, and reports older installs
of design-skill left under a previous name (`PURGE=1` removes them).
Other skills in the same roots are never touched.

## The skill used on itself

`site/` is the page at [lroolle.com/design-skill](https://lroolle.com/design-skill),
built by running this protocol end to end. The roll key is printed in the
title block; the promise it was audited against is the first comment in the
body of `site/index.html`. I drew none of it: the die picked the direction,
the deck dealt the challengers, the promise was written before the first line
of CSS, and the review sent the page back once before it shipped.
`site/DESIGN.md` records what was bound, what was
deferred and why, and the two defects the run found in the skill itself -- a
false positive on HTML numeric entities in the check (then `bans.sh`, now
`kit/check.sh`), and `--fg-3` failing the 4.5:1 floor in all seven token
files. Both fixed, the second now gated by `validate.sh`. The die on that page is running: `site/deal.js` is
`scripts/roll.mjs` ported to the browser over the same deck, so the key you
type into FIG. 2 deals the hand the CLI deals -- `validate.sh` proves it on
random keys every push. It is the first living element built against
`references/simulation.md`.

## Proof

```bash
./scripts/validate.sh
```

Packaging and every relative link; SKILL.md stays under a word budget
so the protocol cannot grow back into a method; every system has a
card and a css; every token file (seven systems, both kits) defines
every contract token on both themes with no pure black/white and
`--fg-3` clearing the contrast proxy; the floor wires a CJK webfont
and the house tokens carry provenance; `check.sh` passes a clean
fixture, trips a dirty one, fails a zh page on a system stack, warns on
a computed ramp and on the floor shipped unchanged; every world card
carries affinity tags and a `zh` flag, every recipe its sections, every
palette specimen its provenance and irregularity; `roll.mjs` is
deterministic, pulls `almanac-tear-off` into the pool for an almanac
brief, and assigns deck cards a real share of keys; the page's die
equals the CLI's; ascii punctuation outside the CJK references.

## Doctrine

Taste is judgment anchored in evidence, exercised on behavior before
surfaces. References give coordinates, not answers. Constraint breeds
identity. Direction before detail; contract, then memory. The asset
is the model, not the render: a change should be a parameter, a swap,
a diff -- so anything that runs by itself is built as a world that
generates its frames (`references/simulation.md`), never as keyframes.
The one line under all of it: a change that makes the surface prettier and
the task harder must fail. `references/thinking.md` inside the skill
has the twelve beliefs; every rule in the repo traces to one.

## Sponsors

The page carries four seats on a split-flap board: one sold by the year,
three by the month. Founding rate until **2026-10-19** -- $200 the year
(list $600), $20 the month (list $60) -- and it is a lock, not an
introductory month: claim a seat before that date and the rate holds for
as long as you hold it.

No analytics run on that page, so there are no impression numbers to
quote and none will be invented. What sponsors get instead is the
Worker's own request count, sent out monthly, undressed.
[The seats, and the whole of the terms](https://lroolle.com/design-skill#sheet-5)
&middot; [claim one](https://github.com/lroolle/design-skill/issues/new?title=Sponsor+seat).

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
