# Worlds

A **world** is a born-designed graphic system: a way of putting things
on a surface that a culture already produced, reviewed, and used --
a thread-bound book's page furniture, a stone rubbing, a split-flap
departure board, a patent drawing sheet. Each carries five system
rules (palette/material, type/composition, topology/navigation,
controls/state, responsive/motion), a spark, and the browser
technique it asks for. It is a *concept*, not a material: the seven
design systems in `design-systems/` supply tokens and component
character *under* a world; the world supplies what the page argues.

Why a deck at all. Left alone, a model derives candidate directions,
ranks them by its own resonance, and builds #1 -- and that ranking is
deterministic, so every run in a category ships the same one or two
concepts. Menus do not help: a taste function (model or human) picks
the safest card. Two things move it: **dice that assign the index**
(`scripts/roll.mjs`) and **foreign forms dealt as challengers** from a
pool the model would not have retrieved. Challengers lose to strong
cultural material and win over thin categories (developer tools,
SaaS) -- which is the intended shape.

## What qualifies

- Derived from produced 2D artifacts with a graphic system a reader
  could name: page furniture, notation, signage, instrument faces,
  tickets, charts, games. Not a mood ("warm", "brutal"), not a material
  ("paper", "neon"), not a brand, not a colonized aesthetic
  (glassmorphism, Frutiger Aero, vaporwave, neon-cyberpunk).
- **Argues or performs.** After one viewport a visitor can say what
  the page is *doing*. Tasteful restraint and pure notation do not
  survive review however good their pedigree; they are what the
  material layer already provides.
- Translates to an interface: navigation, lists, tables, forms, and
  empty states can be named inside it.
- Honest about cultural facts. A safer true sentence beats an
  invented vivid one.

## Tiers, ratings, and the deal

| Field | Values | Used for |
|---|---|---|
| tier | graphic / interaction / atmosphere | graphic maps to interface almost directly; interaction carries physics; atmosphere needs the largest translation. Every direction roll deals one of each so a directly usable system is always on the table. |
| modes | persuade / operate / read / experience | filter: a world marked for persuade and experience is not dealt to an operate surface |
| rating | 1 / 2 / 3 | our honest review: 3 = flagship (double odds), 2 = plays, 1 = seed (sits out unless the pool is thin) |
| grain | product / flow / view / region | how much product it can compose |
| platforms | web / ios / android | hard filter |
| families | 1-3 material families | the derivation check: a candidate list that shares one family stopped too early |

The deck is small and honest -- a few dozen cards, authored and rated
by us, grown one world per real project. A catalog of hundreds is a
product; a deck of twenty strong cards that argue is a skill. Our
edge is the half the large catalogs lack: East-Asian born-designed
systems (movable type formes, thread-bound page furniture, stone
rubbings, almanac pages, metro diagrams, couplets), beside the
instrument, print, and wayfinding systems everyone shares.

## Authoring

Copy `_template.md`. Write the Form as the artifact-as-system, the
Spark as one physical second-person moment, the five System rules as
interface-usable sentences (what is ground, what is ink, what is the
one accent, how one moves between units, what states look like, what
happens on a phone), the Web leverage as a technique a static
imitation cannot fake, the Translation as nav/list/table/form/empty
inside it plus the design system it sits on best, and the Risks as
where it becomes costume. Rate it after building with it once; a
world nobody has built with is rating 1 until it earns more.

Files: one world per `<id>.md`; `scripts/roll.mjs` reads the
frontmatter, `scripts/validate.sh` checks the schema.
