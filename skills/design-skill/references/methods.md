# Methods

The procedures SKILL.md's phases call. Load this file when a phase
needs its exact form: the sense card, the ask discipline, candidate
derivation, the roll and the verdicts, the hand, reference
decomposition, brand extraction, the behavioral floor, the promise,
the review (order, rubric, dispositions), scars, and the handover.

## Sense card

Written before any design decision, twelve lines or fewer. If the
brief does not settle a line, infer it and mark it `(inferred)`.

```
subject:      what this is, concretely (one noun phrase, no adjectives)
job:          the single thing the surface must make happen
mode:         persuade | operate | read | experience (this surface, not the project)
invention:    extend | surface-in-world | new-world | redesign | match-brand | governed
audience:     who, and how often they see it (once / weekly / daily / all day)
platform:     web / web app / docs / ios / android / desktop / deck / ...
assets:       photography? illustration? data? none? (beauty that rides on assets
              you do not have is a trap)
constraints:  performance, CJK/i18n, existing brand, stack, deadline
protected:    functions that must not break: task path, information actually
              read, labels, nav, legal, conversion path
scene:        one physical sentence: who uses this, where, under what light
              (this decides light or dark; category never does)
reflex:       the page this category always ships, and its predictable opposite
```

## The ask

One round, at most five questions, only when more than two lines were
inferred and the product has life. Each question carries your inferred
default so "yes, go" is a valid answer. Ask product truth by mode --
persuade: who must act, what they should believe, which real proof
earns it; operate: the task, the states, the frequency; read: the
reader's question, the source material, the wayfinding; experience:
what leads, how exploration unfolds -- plus what success looks like,
what must stay untouched, and what would make a polished result feel
wrong. Always include: explore directions, or decide for me? Never ask
for CSS values, colors, typefaces, or canned aesthetic lanes; those get
decided with the surface. A fact read from the repo is a hypothesis,
not consent; an unanswered probe is disclosed in your first reply.

## Candidate derivation (direction scope)

1. One sentence each: the product's unique mechanism; the audience's
   real scene; its cultural home; what this first surface must prove.
2. The rut, written down and kept off the list: the page this category
   always ships, its predictable opposite, and the literal reading of
   any metaphor the brief itself supplies (spend at most one candidate
   on that reading).
3. Seven concrete graphic systems, artifacts, places or rituals the
   audience knows by heart -- its notation, publications, identity
   programs, data graphics, interfaces, as much as its physical objects
   -- each with one line on why it resonates and can carry the
   mechanism. Order by resonance. Near-duplicates count once. When more
   than three share a material family, the derivation stopped at the
   subject's most obvious artifact: dig until three families.
4. Each becomes a complete direction: a reusable visual world joined to
   a concrete first-surface experience, viable at full scale with the
   assets and budget in hand. A candidate that fails on truth is
   replaced before the roll, never rescued by it.

## The roll

`node scripts/roll.mjs --scope direction --mode <mode> --candidates 7`
(surface scope: `--scope surface --mode <mode> --grain
product|flow|view|region`). It prints a key, the assigned index, and
the dealt challengers. Same key reproduces the deal; `--reroll n`
excludes everything earlier rounds dealt.

Why outside dice: a model ranks its own candidates and builds #1, and
the ranking is deterministic, so every run in a category ships the same
one or two concepts; a menu does not help, because a taste function
(model or human) picks the safest card. The assignment refuses the
argmax; it never chooses an ungrounded entry. Challengers exist because
candidate lists go deep for culturally rooted products and shallow for
monoculture categories (developer tools, SaaS); foreign forms lose to
strong material and win over thin lists, which is the intended shape.

### Fusion and verdicts

For each dealt challenger, read its card, then **fuse** it with the
product before judging: the world supplies form and system grammar,
the product supplies every fact, clarity wins conflicts. Weigh the
fused challenger against the assigned direction on exactly two axes --
audience identification, product clarity -- and give a verdict before
any borrowing:

- **wins** -- beats the assigned direction on both; it becomes the
  build candidate.
- **competitive** -- holds one axis; a full alternate in the hand.
- **declined** -- loses both; still donates one discipline the assigned
  direction lacks (a palette's total commitment, a grid's density
  courage, a form's structural honesty), written into the direction as
  a named raise -- "raise from <world>: <discipline>" -- never its
  clothes. A lifted motif is a costume note, not a raise. One world
  owns the page.

### The hand

Present one direction fully committed and already raised: world, first
viewport, visitor path, signature interaction, cross-surface reach,
honest risk. Then:

- winning and competitive challengers as full alternates with one-line
  cases;
- declined challengers in a compact row with verdict and what was kept;
- your own top-ranked candidate as one card, only when it is not the
  assigned one, with its familiarity named honestly -- never two, never
  a ranked list, never in the lead position;
- the standing exit: the category standard played straight, one quiet
  card, never recommended, never weighed against the roll. When the
  user takes it, convention becomes the commitment: ask which two or
  three products it should sit beside, make their craft the bar, and
  execute the canon at full fidelity without smuggled quirk.
- re-roll in three registers -- plain (fresh hand), safer (your
  conventional grounded candidates plus the canon), bolder (the foreign
  forms only, first dealt leads). The register is the user's steering.
  After two consecutive re-rolls ask what quality is missing.

A human present chooses; an autonomous run builds the assigned
direction and says so. Re-roll on your own only on named factual
grounds (the assigned direction cannot carry the product's truth);
taste is never grounds. A user- or brief-pinned world beats the roll
-- and pins the world, not its softest rendition.

## Reference decomposition

For each reference the brief cites ("like Linear", a screenshot, an
inspiration list), three lines and an evidence tag:

```
<reference>   [observed | provided | inferred]
  keep:        the mechanism that transfers
  change:      what must differ here (density, assets, audience, brand)
  do not copy: the skin, the palette, the type; beauty that rides on assets we lack
```

Then the acceptance criterion two engineers would verify identically.
A brief still containing a site name used as an instruction has not
been decomposed.

## Brand extraction (existing product or site)

Measure, do not guess: colors ranked by painted area and mapped onto
token roles; `@font-face` names and the computed families on h1 / p /
code; the radii, border widths and elevation model actually used;
durations and easings on the common transitions; five real strings
from buttons, empty states and errors; logo candidates and hero images
filtered by rendered size (never redraw a logo). Values that had to be
inferred get `(inferred)`. If the site blocks automated access, stop
and ask for exports. Identity preservation wins over our decks; use
them only for what the brand leaves undecided.

## Behavioral floor

Checked before surfaces, on every review. Pass / fail / n-a.

1. Visible state -- what exists, what is selected, what mode you are
   in; landmarks stay put across states.
2. Disabled, not hidden.
3. Object first, then action; bulk actions have a visible target set.
4. Discoverable first, fast second.
5. Verbs on buttons; destructive apart from the default.
6. Undo over confirmation; confirm only the irreversible, and say why.
7. Modes visible, temporary, escapable; never blocking save or quit.
8. Honest feedback in the user's vocabulary.
9. Trustworthy representation -- previews match results, counts match
   reality.
10. Keyboard and assistive parity -- focus visible and ordered, names
    on controls, contrast at the floor, reduced motion honored.

## The promise

The direction written into the artifact as the first comment in the
body: **five audited blocks** plus one unaudited FINISH line, under
150 words total, surviving the production build.

```
THESIS          the one idea this surface owns; the category arrangement it refuses
OWN-WORLD       palette and component language, recognizable with all content removed
STORY           what the visitor understands, believes, and does
FIRST VIEWPORT  the exact composition: what is where, at what scale, where the action sits
FORM            the chosen world, its position on your list, the roll key
--
FINISH          "unreviewed is unfinished: this build ends with the review,
                the verdict, and DESIGN.md"   <- a standing note, not audited
```

If a block reads like a mood, the direction is not decided. Grep the
built output for the roll key after the first production build; a
promise the build erased is a promise nobody can audit.

## Medium gate (Build)

Before building each region, name its medium by what it shows, not by
what the stack makes easy: HTML/CSS/SVG geometry; a project asset; a
produced raster; a sourced photo; an icon library; canvas/WebGL; an
accepted omission. A human figure, a product object, machinery, or any
material with lighting and depth is raster whatever the stack; a CSS
gradient is not a texture; a geometric mask is not a contour. Every
produced or sourced raster carries its provenance (prompt or origin).

## Review

### Evidence

Captures at 390 / 768 / 1440 (plus the user's viewport when known),
from the document top, entrance motion settled or disabled. Open every
capture and confirm it shows what its name claims: no blank or black
regions, no wrong section behind a right filename, no half-loaded
state. Run `bans.sh` (full) once; fix what is mechanical. When a pixel
tool exists, sample the ground, the dominant field and the accent from
the 1440 capture and set each against its token: a difference with a
color name (warmer, grayer, darker) is drift to fix; a few digits of
render noise are the same color.

### Who reviews

A fresh context when the harness has subagents: no forked transcript.
Pass it the request, the promise comment, the captures, the bans
findings, the world card, the design-system contract, and this section.
Without subagents, step fully out of the build context and run the
same order in-thread, disclosed in one line.

### Order

0. Evidence valid? If not: **recapture**, and nothing reviewed binds.
1. Promise audit -- each block kept / softened / broken in the render,
   roll key present; then template bones: a committed skin over a
   standard marketing grid (hero, three cards, logo row) is broken.
2. Behavioral floor.
3. Rubric, graded on the worst sustained band, not the average.

### Rubric

**P0 -- not done while any remains**
- a behavioral-floor fail; a protected function dropped
- a promise block broken; template bones under a committed skin
- pure black/white; raw hex or palette class outside tokens; two
  corner languages; a shadow the tokens do not define
- contrast below the floor on any text; focus invisible; motion that
  ignores reduced-motion
- invented claims; fake names, metrics, logos; unlabelled synthetic
  content where a visitor could mistake it
- horizontal scroll or clipped content at 390; touch targets under 44px
- a state missing on a surface that has it
- one of the three calibration looks with no brief-specific reason; a
  system display face as the voice of an own-world page

**P1 -- fix now or defer with a written reason**
- a promise block softened (the record says "subtle" where the
  direction said committed; a texture buried under a wash)
- device sprawl; accent creep; flat hierarchy at squint; measure over
  75ch; centered body text
- boxing; shadow inflation; zero-offset glow halos; hard offset shadows
  outside a world that chose them
- browser surfaces at defaults (selection, caret, scrollbar, focus
  ring, underline offset, tabular numerals)
- motion budget exceeded; layout-property animation; one identical
  entrance on every section
- imagery without caption/alt on editorial surfaces; a geometric mask
  standing in for a contour; sketchy SVG standing in for a picture
- copy in the saturated register; buttons without verbs
- CJK: no named CJK face, leading under 1.7, no spacing between CJK
  and Latin

**P2 -- polish**
- tabular numerals missing in tables; underline offset undecided;
  heading balance; dark-mode weight/leading compensation absent;
  uniform section rhythm; the signature move present but timid

### Dispositions

Exactly four: **recapture** (the evidence failed, not the build);
**rebuild** (a named region broke the promise wholesale -- rebuild it,
then a full review, never a verdict pass); **fix** (batch the material
fixes, rebuild once, recapture the same viewports, send back for a
verdict scoring each fix resolved / partial / unresolved -- a recapture
measures positions and overflow, not whether a fix reached the quality
named); **ship**. Two rounds is the unattended budget; a human may fund
more. Report the verdict at its actual scope: "three fixes scored
resolved" is not "no material issues remain". User evidence against a
ship (their screenshot, a named mismatch) outranks every capture you
made and reopens a full review.

### Self-diff

Last: for any similar brief, would I have produced this? Name what you
changed against your own default and why. If nothing, you have not
designed yet.

## Scars

One scar per real rejection in `TASTE.md`:

```
## <date> rejected: <what>
Why: <the mechanism -- what got harder, what the count showed>
Reuse: <the rule that generalizes>
Expires: <the condition under which this scar should be deleted>
```

A scar without a why is a ban, and bans fossilize. Delete a scar the
moment its expiry condition arrives.

## Handover

On a new world, DESIGN.md is written now from the built world -- ground
truth over intention, and never canonizing a floor refusal the build
still carries. Then, in order: what was built and where; the world
bound, the roll key, the hand rejected; the contract's location;
deferred P1/P2 with reasons; scars written; the synthetic content to
replace, listed; one line on what only eyes on a real device can check.
