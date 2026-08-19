---
name: lroolle-design
description: >-
  Design instrument for any user-facing surface, with taste built in:
  sense the brief, derive grounded directions and let dice assign
  one (with foreign-form challengers from a worlds deck), lock it as
  a written promise plus a DESIGN.md token contract, build with full
  commitment, then review the render against the promise. Fires on
  four branches: designing or restyling a site, app, page, deck, or
  component ("design a landing page for X", "make this dashboard look
  right", "give me options"); choosing a design language, typeface,
  or palette for a product; auditing or rescuing an interface that
  looks generic or AI-made; and installing a design system
  (DESIGN.md + tokens + bans) into a repo. Motion, copy, color, and
  typography are covered inside. A throwaway page with no product
  life needs only the floor, not the ceremony.
---

# lroolle-design

Sense first, then a direction the dice chose from grounded
candidates, then a promise written down, then pixels that keep it.
Every surface this skill touches ends with a world it can name,
tokens it can grep, and a verdict it can defend. Two tests under all
of it: **a change that makes the surface prettier and the task harder
must fail** (costume); and **if someone could guess the look from the
category alone -- or from category plus avoidance -- it is not
designed yet** (the reflex). Load
[references/thinking.md](references/thinking.md) once to calibrate on
why; the rest of this file is what to do.

## Gate

Size the task before spending anything on it.

| Situation | Move |
|---|---|
| Tweak inside a repo that has DESIGN.md | Look the token up, make the change, run the Check. No protocol. |
| Extend an existing surface (a section, state, component) | Inherit its world and composition; resolve only the new content and hierarchy. No direction round. |
| Whole new surface inside an established world | Sense -> Direct at *surface scope* (stagings, world fixed) -> Build -> Review. |
| New product, or a replacement visual world | Full protocol, 1 through 6, Direct at *direction scope*. |
| "What direction / give me options / what fonts, what palette" | Sense -> Direct. Stop and hand over the hand. |
| Audit, critique, or rescue of an existing interface | Review first; if the world itself is wrong, Direct, then Build. |
| An existing brand or site to match | Sense -> Contract via brand extraction (methods.md); identity wins, no direction round. |
| A governed context (government, a platform's admin, a native OS) | Adopt the official system (frameworks.md); use ours only for what it leaves undecided. |
| Throwaway artifact, no product life | Skip the contract; keep the laws and the P0 checks. |

Ceremony scales with stakes. A dashboard for eight-hour-a-day use
gets the full protocol; a one-time launch page gets Direct and Build;
a settings tweak gets a token lookup.

## Modes

Name the mode of the *surface in hand* (not the project) before
anything else; it decides what success looks like and how much
expressiveness is allowed. A tool's landing page is persuade though
the tool is operate; a fashion house's docs are read.

| Mode | The visitor comes to | Design's job | Expressiveness |
|---|---|---|---|
| persuade | decide and act (landing, pricing, campaign, launch) | be the product: intelligible offer, visible action, proof only this product can show | full; commit, then clarify |
| operate | complete a task (app, dashboard, editor, admin, settings) | serve the task; density is a feature; native expectations | in the details, never over state or affordance |
| read | understand (docs, articles, guides, changelogs) | comprehension and wayfinding: measure, rhythm, quiet hierarchy | restrained |
| experience | be inside the work (portfolio, gallery, showcase) | the work leads; the interface recedes | the work's, not the chrome's |

## Laws

Always on, in every mode.

- **Behavior before surfaces.** The behavioral floor (methods.md)
  outranks every visual choice; a redesign that breaks it is costume.
- **One seed hue, OKLCH, both themes.** Neutrals carry a trace of it;
  dark mode is a redesign, not an inversion; never pure black or
  white; semantic states are token offsets, never raw palette classes.
  Light or dark comes from the use scene (who, where, under what
  light), never from the category.
- **Decide every dimension once.** One radius, one icon set at one
  weight, one accent, one masthead device and one section-label
  device per page. A framework default shipped undecided reads as
  accident, and accident reads as generated.
- **Color strategy before colors.** Restrained (the default for operate
  and read), committed, full, drenched -- at page scale, fields that
  own regions, not accents sprinkled on neutral.
- **Structure before shadow, space before border, border before
  color.** Cards are for discrete objects, never containers of
  containers.
- **Real copy is design material.** Verbs on buttons, sentence case,
  the user's vocabulary. Claims are uninventable (prices, customers,
  benchmarks, capabilities); illustrative content is authorable at full
  fidelity and labelled synthetic where a visitor could mistake it.
- **Mechanism over skin.** References give coordinates, not answers;
  worlds and design systems are fused with the product, never copied.
- **Commit, then clarify.** On persuade and experience surfaces, land
  the first build fully committed to the chosen world and make it
  clear afterwards; filtering ambition before building is the
  timidity reflex wearing honesty's clothes.
- **Calibration.** Three looks cluster regardless of subject: cream
  ground + high-contrast serif + terracotta; near-black + one acid
  accent + glow; broadsheet hairlines + italic serif + tracked mono
  labels. All legitimate when the brief calls for them; where the
  aesthetic is free, landing in one means the self-check failed. A
  bookish, warm, or child-facing subject does not license cream and
  serif -- book cloth, thread, jackets and endpapers span the whole
  spectrum. Your own measured prior for such subjects is cream, italic
  serif and lamplight: treat that first palette as already spent.

## Protocol

### 1. Sense

Read the brief, the repo, the existing site. Decide what is already
true: redesign (preserve truth and content, replace the world),
established world (inherit and document it), incomplete brand
(preserve confirmed assets, expand with the user), or no visual
authority (create a world). Write the sense card (methods.md):
subject, the surface's single job, mode, audience and frequency,
platform, assets on hand, constraints, protected functions, one
physical scene sentence, and the named reflex for this territory
(table below). If more than two lines had to be inferred and the
product has life, ask one round of at most five questions, each
carrying your inferred default so "yes, go" is a valid answer, and
one of them always: explore directions, or decide for me? Never ask
for CSS values or canned aesthetic lanes; colors and type get decided
with the surface, not before it.

Done when: the sense card is written, the mode is named, the
invention level is decided, and the reflex is named.

### 2. Direct

**Surface scope** (world established): derive five to seven materially
different structures from the content, task and behavior, ordered by
resonance; run `node scripts/roll.mjs --scope surface --mode <mode>
--grain <grain>`; the three dealt stagings reach the table as equal
cards; a human locks one, an autonomous run builds the first dealt.

**Direction scope** (new or replacement world):

1. Name the product's unique mechanism in one sentence, the audience's
   real scene, its cultural home, and what this first surface must
   prove. Write down the page this category always ships and its
   predictable opposite; both are the rut and stay off the list. A
   brief that paints its own picture (a product name, a metaphor) adds
   its literal reading to the rut: spend at most one candidate on it.
2. From that cultural world, list **seven** concrete graphic systems,
   artifacts, places or rituals the audience knows by heart -- its
   notation, publications, identity programs, data graphics and
   interfaces as much as its physical objects -- each with one line on
   why it resonates and can carry the mechanism, ordered by resonance.
   When more than three share one material family, the derivation
   stopped at the obvious artifact; dig until at least three families.
3. Turn each into a complete direction: a reusable visual world joined
   to a concrete first-surface experience, viable at full scale with
   the assets and budget in hand.
4. Run `node scripts/roll.mjs --scope direction --mode <mode>
   --candidates 7`. No substitute, no skip: writing artifact code on a
   new world before the roll has assigned an index is a protocol
   violation whatever the time pressure -- the roll is what keeps every
   run from converging on the category default. It assigns the
   candidate to build and deals **challengers** from `worlds/` (one
   graphic, one interaction, one atmosphere). Fuse each challenger
   before judging it: the world supplies form and system grammar, the
   product supplies every fact, clarity wins conflicts. Weigh each
   fused challenger against the assigned direction on exactly two
   axes, audience identification and product clarity: **wins** (both;
   becomes the build candidate), **competitive** (one; a full
   alternate), **declined** (neither; still donates the one discipline
   the assigned direction lacks -- a palette's total commitment, a
   grid's density courage -- written into the direction as a named
   raise, never its clothes).
5. Present **one** direction fully committed and already raised:
   world, first viewport, visitor path, signature interaction,
   cross-surface reach, honest risk. Beside it: winning and
   competitive challengers as full alternates; declined ones demoted
   to a compact row with their verdict; your own top-ranked candidate
   as one card (never two, never a ranked list) when it is not the
   assigned one, with its familiarity named honestly; and the
   **standing exit** -- the category standard played straight, the
   user's door, never recommended, never softened. Offer re-roll in
   three registers (plain, safer, bolder); the register is the user's
   steering, never yours to pre-select. Re-roll on your own only on
   named factual grounds; taste is never grounds. A human present
   chooses; an autonomous run builds the assigned direction and says
   so. A user- or brief-pinned world beats the roll, always -- but it
   pins the world, not its softest rendition.

Done when: one direction is bound with its verdicts and raises
written, and the rejected hand is named.

### 3. Contract

Write the decision down in two places, because two things must
survive the session: the *promise* and the *material*.

- **The promise**, in the artifact's opening comment as the first
  child of the body, five blocks under 150 words: THESIS (the one idea
  this surface owns and the category arrangement it refuses),
  OWN-WORLD (palette and component language, recognizable with all
  content removed), STORY (what the visitor understands, believes,
  does), FIRST VIEWPORT (the exact composition, what is where at what
  scale, where the action sits), FORM (the chosen world, its position
  on your list, the roll key). If a block reads like a mood the
  direction is not decided yet. The review audits the render against
  these blocks.
- **The material**: `assets/tokens/<system>.css` for the design system
  the world sits on, re-seeded to the world's palette; wired into the
  stack (frameworks.md). `DESIGN.md` from
  [assets/DESIGN.md.tmpl](assets/DESIGN.md.tmpl) -- on a new world,
  written at *finish* from the built world, so it describes reality
  instead of defending intention; on an extension, untouched.
  `TASTE.md` from [assets/TASTE.md.tmpl](assets/TASTE.md.tmpl);
  `assets/bans.sh` into the repo; one line in `AGENTS.md` /
  `CLAUDE.md` pointing at both.

For a single-file artifact the promise comment plus a `:root` token
block is the whole contract.

Done when: the promise is in the artifact, the tokens exist, and the
promise's FORM block carries the roll key.

### 4. Build

State the plan before code: a ten-line ASCII sketch of regions,
hierarchy, where the signature moment lives, where each state
renders. Then build in the project's stack against the contract, with
[templates/](templates/README.md) for the surface recipe,
[references/patterns.md](references/patterns.md) for structure,
typography / color / motion when touched, platforms.md off desktop
web. Laws of the build:

- **The first viewport is a thesis, not a header.** Demonstrate the
  mechanism at the scale the form has in life; never trap the concept
  in a standard hero shell. If someone left after one viewport, what
  would they describe an hour later? A mood means it has not committed.
- **Commit every atom.** Nav, buttons, inputs, links rebuilt in the
  world's vocabulary; a stock component inside a committed world is a
  lapse. Build the assigned direction, not a safer interpretation.
- **Prove, do not claim.** Show the subject doing its job; sections
  that restate a claim add length, not substance.
- **Author the assets; never substitute chrome.** Names, entries,
  covers, textures at production fidelity, labelled synthetic; a
  gradient or icon tile where an authored asset belongs is the gap
  wearing chrome.
- **Build the world's web leverage** -- the technique it names (mask,
  writing-mode, view transitions, canvas), not a static imitation.
- **Theme the browser surfaces.** Selection, caret, scrollbar, focus
  ring, underline offset, tabular numerals -- the parts you did not
  draw still carry the design; defaults there belong to no system.
- **Pace the scroll like a studio.** Vary density, scale, image and
  quiet inside one grammar; one spacing rhythm; more space above a
  heading than below; a real close.
- Every color, size and duration a token; all five states; responsive
  by content tier; keyboard and reduced motion baked in, not bolted.

Done when: the surface renders in the project's stack and every value
traces to a token.

### 5. Review

Evidence first: render and capture at 390 / 768 / 1440 (plus the
user's viewport when known), from the document top, entrance motion
settled; open every capture and confirm it shows what its name
claims -- a blank or half-loaded capture reviewed is a round wasted.
Run `bans.sh`; fix what is mechanical.

Then the review, and it runs in a **fresh context** when the harness
has subagents -- no forked transcript, because a reviewer that
inherits your optimism inherits your framing. Pass it: the request,
the promise comment, the captures, the bans findings, the world card,
and the rubric in methods.md. Its order is fixed: (1) **promise
audit** -- each of the five blocks kept, softened, or broken in the
render, and the template-bones check (a committed skin over a
standard marketing grid is broken); (2) behavioral floor; (3) the
P0/P1/P2 rubric, graded on the worst sustained band. It returns one of
four dispositions: **recapture** (evidence failed, not the build),
**rebuild** (a named region broke the promise wholesale; rebuild, then
a full review), **fix** (batch the material fixes, recapture, send
back for a verdict scoring each resolved / partial / unresolved), or
**ship**. Two rounds is the unattended budget; a human may fund more.
Without subagents, step fully out of the build context and run the
same order in-thread, disclosed in one line. Then the self-diff: for
any similar brief, would I have produced this? Name what changed.

Done when: the disposition is ship, the verdict is stated at its
actual scope ("three fixes scored resolved" is not "no issues
remain"), and the self-diff is named.

### 6. Deliver

On a new world, write `DESIGN.md` now, from the built world, ground
truth over intention. Hand over in this order: what was built and
where; the world bound, the roll key, and the hand rejected; the
contract's location; deferred P1/P2 with reasons; scars written on any
rejection; the list of synthetic content to replace; one line on what
only eyes on a real device can check.

## First sense by territory

The reflex column is what the domain predicts -- name it in Sense so
Direct keeps it off the list. Candidates are starting points for the
*material*; the world comes from the roll.

| Territory | Reflex to name | Material candidates |
|---|---|---|
| SaaS product surface, admin, settings | indigo SaaS-cream; near-black dev | default; industry; broadsheets (product mode) |
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
| Chinese-market product | Latin-first identity, CJK as fallback | any, CJK face chosen and preloaded first; worlds/ carries our CJK systems |

## Check

Smash the delivered work if any survive:

- a behavioral-floor fail, or a protected function dropped
- a promise block softened or broken in the render; template bones
  under a committed skin
- code written on a new world before the roll ran, or a direction
  presented as a ranked lineup
- a token file that exists but the surface uses raw hex, palette
  classes, two corner languages, or a shadow the tokens do not define
- pure black or white anywhere; neutrals with chroma 0
- one of the three calibration looks with no brief-specific reason; a
  system display face as the voice of an own-world page; a saturated
  face carrying the identity
- invented claims; fake names, metrics, logos; synthetic content
  unlabelled where a visitor could mistake it
- a state missing; horizontal scroll at 390; a target under 44px on
  touch; focus invisible; motion that ignores reduced-motion
- browser surfaces left at defaults on a committed world
- device sprawl; accent on more than a handful of things per viewport
- a review conducted inside the build transcript when subagents
  existed; a "pass" claimed at wider scope than the verdict covered
- DESIGN.md describing tokens or a layout the code does not have
- competent but forgettable: the self-diff found nothing changed from
  the default. That is the one this skill exists to fail.

## Repository map

| Path | Holds | Load when |
|---|---|---|
| [worlds/](worlds/README.md) | the challenger deck: born-designed graphic systems with five system rules | Direct (direction scope), via roll.mjs |
| [stagings/](stagings/README.md) | compositions that dress in any world | Direct (surface scope), via roll.mjs |
| [scripts/roll.mjs](scripts/roll.mjs) | the dice: assigned index + dealt challengers, deterministic by key | Direct |
| [design-systems/](design-systems/README.md) | seven material contracts + token schema + template | Contract |
| [references/thinking.md](references/thinking.md) | the doctrine | once |
| [references/methods.md](references/methods.md) | sense card, derivation, fusion and verdicts, extraction, floor, promise, review rubric and dispositions, scars | Sense, Direct, Review |
| [references/patterns.md](references/patterns.md) · [typography.md](references/typography.md) · [color.md](references/color.md) · [motion.md](references/motion.md) | the craft | Build |
| [references/anti-patterns.md](references/anti-patterns.md) | permanent + dated tells, the calibration looks | Sense, Review |
| [references/fontbook.md](references/fontbook.md) · [palettes.md](references/palettes.md) | faces, palette cards | re-seed |
| [references/platforms.md](references/platforms.md) · [frameworks.md](references/frameworks.md) | per-platform rules; official systems; stack wiring; edit hooks | non-web, governed, wiring |
| [references/sites.md](references/sites.md) · [skills.md](references/skills.md) | references by function; prior art | Sense; never operational |
| [templates/](templates/README.md) | surface recipes | Build |
| [assets/](assets/) | DESIGN.md / TASTE.md templates, bans.sh, tokens, specimen | Contract, Review |

## Lineage

Grown from our own kiln, taste, animate-it and design-system skills
(the Apple HIG lineage, the costume verdict, the material kits). The
direction mechanics -- dice that assign, challengers from a curated
deck, fuse-then-verdict, the standing exit, the five-block promise
audited by a separate reviewer -- follow the measured findings of the
impeccable project's 2026 research (Apache-2.0), rewritten here with
our own decks, our own languages, and our CJK half of the world.
