# Methods

The procedures SKILL.md's phases call. Each is short enough to run
from memory after one reading; load this file when a phase needs its
exact form: the sense card, direction cards, reference decomposition,
brand extraction, the behavioral floor, the verdict, the critique
rubric, scars, and the handover.

## Sense card

Written before any design decision, ten lines or fewer. If the brief
does not settle a line, infer it and mark it `(inferred)`.

```
subject:      what this is, concretely (one noun phrase, no adjectives)
job:          the single thing the surface must make happen
audience:     who, and how often they will see it (once / weekly / daily / all day)
surface:      brand | product | mixed (name which regions are which)
platform:     web marketing / web app / docs / mobile / desktop / deck / ...
assets:       photography? illustration? data? none? (a design that rides on
              assets you do not have is a trap)
constraints:  performance, a11y floor, CJK/i18n, existing brand, stack, deadline
protected:    functions that must not break: task path, information actually
              read, labels, nav, legal, conversion path
scene:        one physical sentence: what does this thing want to be
reflex:       the first-order reflex for this domain (see anti-patterns.md),
              named so it can be sidestepped
```

If more than two lines had to be inferred and the surface has product
life, ask -- at most five questions, each carrying your inferred
default so that "yes, go" is a valid answer, and one of them always:
"explore two to four directions, or decide for me?"

## Direction cards

Two to four, when the brief is open or the human is exploring; one
bound with a stated reason when the brief is clear or the run is
autonomous. Directions differ on an axis -- type voice, density, color
strategy, hierarchy topology, motion physics -- not on palette. Same
system re-seeded twice is one direction.

```
[A] <system> re-seeded as "<one-line feel>"
    why here:   how it serves the sense card's job and audience
    signature:  the one device that makes it recognizable on this product
    costs:      what it gives up (density, warmth, speed, expressiveness)
    material:   display / body / mono; seed hue; accent; radius; motion
    reflex:     first-order? second-order? or genuinely off-axis?
    anchors:    2 mechanisms from real references (not "like X")
```

Stable IDs (A, B, C) so the human can mix ("B's grid with A's type").
Order from closest-to-expectation to furthest, and recommend one --
a menu without a recommendation offloads the judgment the skill
exists to supply. Mid-flight, prefer tweaking the bound direction
(re-seed, swap a face, adjust density) over multiplying options.

## Reference decomposition

For each reference the brief cites ("like Linear", a screenshot, an
inspiration list), write three lines and an evidence tag:

```
<reference>   [observed | provided | inferred]
  keep:        the mechanism that transfers (why the hero works; what the
               motion redirects attention to; how it degrades on mobile)
  change:      what must differ here (density, assets, audience, brand)
  do not copy: the skin, the palette, the type -- and any beauty that rides
               on assets we do not have
```

Then the acceptance criterion two engineers would verify identically
("first screen states what the product is in one sentence at 390px
without scrolling"). A brief still containing a site name used as an
instruction has not been decomposed.

## Brand extraction (existing product or site)

Measure, do not guess. From the live site or the codebase:

1. Colors: collect every rendered color, rank by painted area, map the
   top ones onto the token roles (bg, surface, fg, line, accent,
   semantic). Values that had to be inferred get `(inferred)`.
2. Type: `@font-face` names and the computed families on h1/p/code;
   sizes and weights on the four most common text styles.
3. Shape: the radii and border widths actually used; the elevation
   model in use.
4. Motion: durations and easings on the most common transitions.
5. Voice: five real strings from buttons, empty states, errors.
6. Save logo candidates and 4-6 hero images filtered by rendered size;
   never redraw a logo.

If the site blocks automated access, stop and ask for exports rather
than working around it. Write the result as DESIGN.md with every
inferred value marked; identity preservation wins over our systems --
use them only for what the brand leaves undecided.

## Behavioral floor

Checked before surfaces, on every verdict and every critique. Each
is pass / fail / n-a.

1. Visible state -- what exists, what is selected, what mode you are
   in; landmarks stay put across states.
2. Disabled, not hidden -- unavailable commands stay visible, dimmed,
   with a discoverable reason.
3. Object first, then action -- show the thing, then what can be done
   to it; bulk actions have a visible target set.
4. Discoverable first, fast second -- every shortcut has a visible
   path.
5. Verbs on buttons -- "Delete 3 files", never Yes/No/OK; destructive
   apart from the default.
6. Undo over confirmation -- reversibility for routine actions; confirm
   only the genuinely irreversible and say why.
7. Modes visible, temporary, escapable -- and never blocking save or
   quit.
8. Honest feedback, user's vocabulary -- acknowledge input at once;
   errors say what failed and what to do next.
9. Trustworthy representation -- previews match results, counts match
   reality, the visible state never lies to look tidier.
10. Keyboard and assistive parity -- focus visible and ordered, names
    on controls, contrast at the floor, reduced motion honored.

A change that fails one of these to look better is costume by
definition.

## Verdict

For any change, restyle or redesign. Ceremony scales: a label change
gets Evidence and Verdict in two sentences; a revenue path gets all
five.

1. Stakes -- brand or product surface; the protected-function list.
2. Evidence -- render, screenshot, walk the task path; count facts
   above the fold, steps to complete, labels renamed or dropped,
   before vs after. Automated passes are evidence, not proof.
3. Behavior -- the floor above, marked.
4. Verdict -- **better** (task easier or equal, protected functions
   intact, at least one named mechanism improved) / **different**
   (taste swapped, nothing gained -- say so) / **costume** (prettier,
   harder). Every sentence carries its mechanism ("nav went from 7 to
   4 by grouping billing"), never a bare adjective. When contested,
   present both steelmen and name the variable that decides.
5. Scar -- on rejection only.

## Critique rubric

Run on the rendered thing (screenshots at 390 / 768 / 1440 when the
environment can render; otherwise a disciplined read of the code with
that limitation stated). Grade the worst sustained band, not the
average. Two passes is normal.

**P0 -- not done while any remains**
- a behavioral-floor fail
- a protected function dropped
- pure black/white, raw hex/palette class outside tokens, two corner
  languages (`bans.sh` catches these)
- unreadable contrast on any text; missing focus; motion ignoring
  reduced-motion
- fake content shipped (lorem, Acme, John Doe, invented metrics/logos)
- horizontal scroll or clipped content at 390px; touch targets < 44px
- a state missing (loading, empty, error) on a surface that has it
- one of the three current AI looks with no brief-specific reason

**P1 -- fix now or defer with a written reason**
- device sprawl (count > 1 masthead + 1 section-label device)
- accent creep (count uses per viewport)
- flat hierarchy at squint; measure > 75ch; centered body text
- boxing (cards where rules/space would do); shadow inflation
- motion budget exceeded for the surface class; any layout-property
  animation
- imagery without caption/alt on editorial surfaces
- copy in the saturated register; buttons without verbs
- CJK: no named CJK face, leading < 1.7, no spacing between CJK and
  Latin

**P2 -- polish**
- tabular numerals missing in tables; underline offset/thickness
  undecided; heading `text-wrap: balance`
- dark-mode weight/leading compensation absent
- section rhythm uniform (same gap everywhere)
- the one signature move absent -- competent but forgettable

Close with the **self-diff**: "for any similar brief, would I have
produced this?" Name what you changed against your own default and
why. If nothing, you have not designed yet.

## Scars

Rejections are the most expensive signal a project produces and by
default they evaporate. One scar per real rejection in `TASTE.md`:

```
## <date> rejected: <what>
Why: <the mechanism -- what got harder, what the count showed>
Reuse: <the rule that generalizes>
Expires: <the condition under which this scar should be deleted>
```

Read TASTE.md before any verdict; delete a scar the moment its expiry
condition arrives. A scar without a why is a ban, and bans fossilize.

## Handover

What Deliver hands back, in this order: what was built and where; the
direction bound and the ones rejected, each in one line; the contract
location (DESIGN.md, tokens, TASTE.md, bans.sh); the P1/P2 deferred
with reasons; the scars written; and one line on what to check with
eyes that this session could not (a real device, real data, a real
reader).
