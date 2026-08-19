---
name: lroolle-design
description: >-
  Design instrument for any user-facing surface, with taste built in:
  sense the brief, offer two to four genuinely different design
  directions, lock one as a DESIGN.md contract with tokens, build
  against it, critique with evidence. Fires on four branches:
  designing or restyling a site, app, page, deck, or component
  ("design a landing page for X", "make this dashboard look right",
  "give me options"); choosing a design language, typeface, or
  palette for a product; auditing or rescuing an interface that
  looks generic or AI-made; and installing a design system
  (DESIGN.md + tokens + bans) into a repo. Motion, copy, color, and
  typography are covered inside. A throwaway page with no product
  life needs only the floor, not the ceremony.
---

# lroolle-design

Sense first, then direction, then contract, then pixels. Every
surface this skill touches ends with a language it can name, tokens it
can grep, and a verdict it can defend. The one-line test under all of
it: **a change that makes the surface prettier and the task harder
must fail** -- that failure is costume, and interfaces die of it
looking their best. Load [references/thinking.md](references/thinking.md)
once to calibrate on why; the rest of this file is what to do.

## Gate

Size the task before spending anything on it.

| Situation | Move |
|---|---|
| Tweak inside a repo that has DESIGN.md | Look the token up, make the change, run the Check. No protocol. |
| Repo has DESIGN.md; a new surface to build | Sense (short) -> Build -> Critique. Direction is already bound. |
| No DESIGN.md; a product with life ahead of it | Full protocol, 1 through 6. |
| "What direction / give me options / what fonts, what palette" | Sense -> Direct. Stop and hand over the cards. |
| Audit, critique, or rescue of an existing interface | Critique first; if the language itself is wrong, Direct, then Build. |
| An existing brand or site to match | Sense -> Contract via brand extraction (methods.md); Direct is skipped -- identity wins. |
| A governed context (government, a platform's admin, a native OS) | Adopt the official system (frameworks.md); use ours only for what it leaves undecided. |
| Throwaway artifact, no product life | Skip the contract; keep the laws and the P0 checks. |

Ceremony scales with stakes. A dashboard for eight-hour-a-day use
gets the full protocol; a one-time launch page gets Direct and Build;
a settings tweak gets a token lookup.

## Laws

Always on, in every mode. Each has its why in the references; here
they are the rules.

- **Brand or product?** Name the surface class before styling. Brand
  surfaces spend expressiveness; product surfaces spend density.
  Most taste failures are brand moves on product surfaces.
- **Behavior before surfaces.** The behavioral floor (methods.md)
  outranks every visual choice; a redesign that breaks it is costume.
- **One seed hue, OKLCH, both themes.** Neutrals carry a trace of it;
  dark mode is a redesign, not an inversion; never pure black or
  white; semantic states are token offsets, never raw palette classes.
- **Decide every dimension once.** One radius, one icon set at one
  weight, one accent, one masthead device and one section-label
  device per page. A framework default shipped undecided reads as
  accident, and accident reads as generated.
- **Structure before shadow, space before border, border before
  color.** Cards are for discrete objects, never containers of
  containers.
- **Five states, three widths, one keyboard.** Loading, empty, error,
  success, partial; 390 / 768 / 1440; focus visible, reduced motion
  honored, contrast at the floor.
- **Real copy is design material.** Verbs on buttons, sentence case,
  the user's vocabulary, no fake names, numbers, or logos.
- **Convergence check, then the second reflex.** If the domain
  predicts the look, rework; then check the replacement is not also
  predictable. The three current AI looks and the dated tells live in
  [references/anti-patterns.md](references/anti-patterns.md).
- **Mechanism over skin.** References give coordinates, not answers;
  systems are re-seeded, not copied.

## Protocol

### 1. Sense

Read the brief, the repo, the existing site. Write the sense card
(methods.md): subject, the surface's single job, audience and
frequency, brand or product, platform, assets on hand, constraints,
protected functions, one physical scene sentence, and the named
reflex for this territory (table below). If more than two lines had
to be inferred and the product has life, ask at most five questions,
each carrying your inferred default so "yes, go" is a valid answer,
and always one of them: explore directions, or decide for me?

Done when: the sense card is written and the reflex is named.

### 2. Direct

From [design-systems/](design-systems/README.md), propose two to four
directions that differ on an axis (type voice, density, color
strategy, hierarchy, motion physics), not on palette. Each is a
direction card (methods.md): system + re-seed, why it fits this sense,
signature move, costs, material line, reflex check, two mechanism
anchors. Recommend one. When a human is exploring, hand the cards
over and wait; when the brief is clear or the run is autonomous, bind
the recommended one and say why in one line. Existing brand: extract
instead of choosing.

Done when: one direction is bound with a stated reason and the
rejected ones are named.

### 3. Contract

Write the material down so it survives the session:

- `DESIGN.md` at the repo root from
  [assets/DESIGN.md.tmpl](assets/DESIGN.md.tmpl), filled from the
  bound system's contract and re-seeded for identity: surface
  classification, protected functions, the material table, device
  ration, bans, behavioral floor.
- Tokens: copy `assets/tokens/<system>.css`, adjust seed, accent and
  faces; wire it into the stack (frameworks.md has the Tailwind /
  shadcn / native mappings). Every color, size, and duration in app
  code resolves to a token.
- `TASTE.md` from [assets/TASTE.md.tmpl](assets/TASTE.md.tmpl);
  `assets/bans.sh` into the repo's scripts, pointed at the UI dirs.
- One line in `AGENTS.md` / `CLAUDE.md`: read DESIGN.md before any UI
  touch, TASTE.md holds prior rulings, run bans.sh before shipping.

For a single-file artifact (a page, a deck), the contract is the
`:root` token block inside the file plus a five-line header comment
naming the direction -- no repo ceremony.

Done when: the tokens exist and DESIGN.md describes exactly them. A
contract that lies about the code is worse than none.

### 4. Build

State the plan before code: a ten-line ASCII sketch of regions,
hierarchy (what is first, second, third), where the one signature
moment lives, and where each state renders. Then build in the
project's stack against the contract, reaching for:

- [templates/](templates/README.md) for the surface's recipe (landing,
  dashboard, docs, editorial, portfolio, app shell, forms, deck);
- [references/patterns.md](references/patterns.md) for structure;
  [typography.md](references/typography.md), [color.md](references/color.md),
  [motion.md](references/motion.md) when the build touches them;
- [platforms.md](references/platforms.md) when the surface is not
  desktop web; [fontbook.md](references/fontbook.md) and
  [palettes.md](references/palettes.md) when re-seeding.

Every color via token, no raw values outside the token file; real
copy; all five states; responsive by content tier, not by breakpoint
reflex; keyboard, focus, reduced motion baked in from the first
component.

Done when: the surface renders in the project's stack and every
color, type, space, and duration value traces to a token.

### 5. Critique

Evidence first: render and screenshot at 390 / 768 / 1440 when the
environment can; otherwise read the rendered code and say so. Run
`bans.sh`. Then the rubric in methods.md: P0 (any = not done), P1
(fix or defer with a reason), P2 (polish). For a restyle, add the
verdict against the previous state -- better / different / costume --
with a mechanism behind every sentence. Close with the self-diff:
would I have produced this for any similar brief? Name what you
changed. Two passes is normal; the second removes one accessory.

Done when: zero P0, P1 handled, verdict stated, self-diff named.

### 6. Deliver

Hand over in this order: what was built and where; the direction
bound and the ones rejected; the contract's location; deferred P1/P2
with reasons; scars written on any rejection; one line on what only
eyes on a real device can check. If the material changed during the
build, DESIGN.md changed in the same commit.

## First sense by territory

The reflex column is what the domain predicts -- name it in Sense so
Direct can sidestep it. Candidates are starting points, not
assignments; adopt an official system where one governs.

| Territory | Reflex to name | Candidate directions |
|---|---|---|
| SaaS product surface, admin, settings | Tailwind-indigo SaaS-cream; near-black dev | default; industry; broadsheets (product mode) |
| Developer tool, API, infra | near-black + acid green; purple gradient | default; industry (light-first); nocturnes (gold) |
| Dashboard, monitoring, ops, logistics | dark HUD with donut charts | industry; default (dense) |
| Docs, knowledge base | generic docs template | default; classical (long-form); industry (reference) |
| News, magazine, newsletter, blog, changelog | Medium clone; broadsheet costume | broadsheets; classical; modernist |
| Portfolio, studio, agency, architecture | scroll theater; giant text + mono | modernist; nocturnes; organic |
| E-commerce, fashion / luxury | dark + gold; Didone | modernist; classical; nocturnes |
| E-commerce, food / craft / home | script font + warm | organic; modernist; broadsheets |
| Fintech consumer / finance | navy + gold; neon crypto | default; classical; modernist |
| Health, wellness, care | teal + white; beige + sage italic | organic (real contrast); default; classical |
| Education, courses, community | blue + orange | default; organic; classical |
| Music, film, events, games, nightlife | neon on black | nocturnes; modernist |
| Hardware, industrial, automotive | dark HUD; carbon fiber | industry; modernist; nocturnes |
| Government, civic, regulated | -- | adopt GOV.UK / USWDS / local system |
| Personal site, essay, manifesto | editorial serif italic | classical; modernist; default |
| Deck, one-pager, report | template deck | modernist; broadsheets; nocturnes (dark rooms) |
| Chinese-market product | Latin-first identity, CJK as fallback | any, CJK face chosen and preloaded first (typography.md) |

## Check

Smash the delivered work if any survive:

- a behavioral-floor fail, or a protected function dropped
- a token file that exists but the surface uses raw hex, palette
  classes, two corner languages, or a shadow the tokens do not define
- pure black or white anywhere; neutrals with chroma 0
- one of the three current AI looks with no brief-specific reason;
  or a font from the saturated list carrying the identity
- fake content (lorem, Acme, John Doe, invented metrics or logos)
- a state missing; horizontal scroll at 390; a target under 44px on
  touch; focus invisible; motion that ignores reduced-motion
- device sprawl (more than one masthead + one section-label device
  per page); accent on more than a handful of things per viewport
- direction never stated, or stated as a site name ("like Linear")
- a restyle shipped as "better" with no counted evidence
- DESIGN.md describing tokens the code does not use
- competent but forgettable: the self-diff found nothing changed
  from the default. That is the one this skill exists to fail.

## Repository map

| Path | Holds | Load when |
|---|---|---|
| [design-systems/](design-systems/README.md) | seven language contracts + token schema + template | Direct, Contract |
| [references/thinking.md](references/thinking.md) | the doctrine | once, to calibrate |
| [references/methods.md](references/methods.md) | sense card, direction cards, decomposition, extraction, floor, verdict, rubric, scars | Sense, Direct, Critique |
| [references/patterns.md](references/patterns.md) | structural building blocks | Build |
| [references/anti-patterns.md](references/anti-patterns.md) | permanent + dated tells, the three AI looks | Sense, Critique |
| [references/typography.md](references/typography.md) / [fontbook.md](references/fontbook.md) | type system / the faces | Build, re-seed |
| [references/color.md](references/color.md) / [palettes.md](references/palettes.md) | color system / palette cards | Contract, re-seed |
| [references/motion.md](references/motion.md) | what should move and how to move it | Build with motion |
| [references/platforms.md](references/platforms.md) | what changes per platform | non-desktop-web surfaces |
| [references/frameworks.md](references/frameworks.md) | official systems to adopt; stack wiring | Contract, governed contexts |
| [references/sites.md](references/sites.md) | reference sites by function | Sense with references, Direct anchors |
| [references/skills.md](references/skills.md) | prior art and method | never on an operational path |
| [templates/](templates/README.md) | surface recipes | Build |
| [assets/](assets/) | DESIGN.md / TASTE.md templates, bans.sh, tokens per system, specimen page | Contract, Critique |

## Lineage

Grown from our own kiln (generate), taste (judge), animate-it (move)
and design-system (install) skills, which distilled the Apple Human
Interface Guidelines lineage, the anti-slop tooling of the
impeccable / taste-skill generation (Apache-2.0 / MIT), and the
reference-library practice of feeding agents visual coordinates. The
brief -> directions -> contract -> build -> critique loop is the
industry's current shape; the contracts, the seven languages, and the
verdict are ours.
