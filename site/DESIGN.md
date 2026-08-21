# DESIGN.md -- design-skill site

The material contract for `site/`, written at finish from the built world.
It describes what the code does, not what the direction intended. If the code
and this file disagree, this file is wrong; rewrite it in the same commit that
changes the material.

Surface: one page, five sheets, live at `lroolle.com/design-skill`
(Cloudflare Worker + assets binding; see `deploy/`).
Mode: **persuade** (the product behind it is operate).
World: **patent-drawing-sheets** (`skills/design-skill/worlds/`).
Material: **default**, re-seeded (`site/tokens.css`).
Roll key: **666a7a49** -- `node scripts/roll.mjs --scope direction --mode persuade --candidates 7 --key 666a7a49`

## How this direction was arrived at

Seven grounded candidates were derived from the audience's own material (the
deal, the contact sheet, the review record, the random-digit table, the type
specimen, the lab notebook, the test bench). The roll assigned **#7, the test
bench**, and dealt three challengers:

| Challenger | Tier | Verdict | What it did |
|---|---|---|---|
| patent-drawing-sheets | graphic | **wins** both axes | became the build |
| garden-framed-view | interaction | declined | raise: one figure per viewport, with real empty field around it |
| sewing-pattern-sheet | atmosphere | declined | raise: one drawing re-inked by one control (FIG. 3) |

Patent drawing sheets beat the test bench on audience identification (a
skeptical engineer reads a parts drawing natively) and on product clarity (the
skill's own doctrine is *mechanism over skin*, and a patent sheet's whole
discipline is explaining by numeral, never by picture). The test bench also
lost points for being a rendering of `industry`, one of our own material
contracts -- material wearing a world's clothes, not a world.

## The world, as built

- **Ground.** Cool drafting paper, seed hue 250. The page ground (`--bg`,
  L 0.949) is the table; the sheet (`--surface`, L 0.988) lies on it inside a
  ruled `--line-strong` border. Dark is the same drawing reproduced as a
  photostat negative -- dark ground, white line -- not an inversion.
- **Line.** One uniform outline weight (`.ink`, 1.25px, `--line-strong`) and
  one lighter weight for leaders and hatching (`.hair`, 1px, `--fg-3`). No
  fills in any figure. `vector-effect: non-scaling-stroke` so the weight is
  constant however the sheet scales.
- **Accent.** Drafting-pencil red, hue 27, `--accent`. It appears in exactly
  four places: the assigned bar and ring, the WINS verdict, the primary
  action, and links. Nothing else on the page is coloured.
- **Numerals.** Every part carries a reference numeral on a leader; the
  numerals in the specification are live and light their part on hover and
  focus, with the paragraph washed in `--accent-soft`. Fourteen parts, fourteen
  numerals, one-to-one -- `scripts/validate.sh` does not check this, the
  binding is asserted by the markup (`data-part` / `data-ref`).
- **Type.** Archivo (OFL, width axis 75-112) draughts FIG. labels, reference
  numerals and every label; the width axis is the one section-label device.
  Spectral (OFL) sets the numbered specification. JetBrains Mono (OFL) sets the
  roll key and the commands. Noto Sans SC is the named CJK partner.
- **Corner.** `--radius: 0` everywhere. One corner language: none. The only
  rounded corners on the page are inside the FIG. 3 specimen, which renders
  another material contract's radius on purpose.
- **Motion.** One entrance: FIG. 1 draws itself in 1100ms, then its text and
  marks ink in. Nothing else moves except the instant highlight and the
  specimen re-ink. `prefers-reduced-motion` leaves the page complete and still.

## The sponsor band (SHEET 5, and the strip on every viewport)

Four seats, two tiers: one sold by the year, three by the month, on a founding
rate with a deadline the code enforces. The year seat is a brass plate on an
enamel board -- the tier is the material, not a label.

Composition rolled at surface scope, key **5849b9a3**, which dealt
`first-viewport-is-the-product-running` first: for an ad slot that means the
region must *demonstrate itself* rather than describe itself. Written back into
the deck as `stagings/sponsor-seats-as-a-numbered-plate.md`.

- **A different world, not an inverted one.** The first pass inverted the
  sheet's own values; that was the cheap version of a register break. The band
  now wears a second world outright -- `worlds/split-flap-departure-board.md`,
  matte enamel ground, hinged character cells with visible seams, one condensed
  uppercase grotesk, change that clatters. Nothing about it is borrowed from
  the drawing sheet, which is the point. It is a dark object in both themes,
  because a departure board is; it separates from an ink page by being a
  mounted panel with a lit top bezel and tile faces the page never has.
- **Four seats, all visible, always.** The loop moves a spotlight, never the
  contents. A sponsor is on screen 100% of the time rather than one cycle in
  four -- that is the product being sold, so it has to be true rather than
  claimed. `site/behaviour.mjs` asserts the band and the SHEET 5 plate render
  from the same array.
- **Two tiers, one array.** Seat 01 sells by the year and there is one of it;
  seats 02-04 sell by the month. The tier is a property of the seat (`TERM` in
  `site/sponsors.js`), so the strip, the plate, the terms table and the call to
  action are all derived and cannot disagree about what is for sale, on what
  term, at what price. Three-and-one is the whole inventory: a board that grows
  a fifth seat for a fifth buyer is a banner farm, and the scarcity the copy
  claims is only true because the array is the only source of a seat.
- **The founding rate is enforced, not decorated.** `FOUNDING_UNTIL` is a fixed
  instant; every price string on the page is `rateFor(term)`, which reads it.
  Past it the page quotes list and says the rate closed. There is no branch that
  extends it and reloading does not move it. A countdown that resets on load is
  the invented proof this page argues against, so the only way to earn the
  urgency was to let the code honour the deadline. What a founding sponsor buys
  is a lock rather than a discount -- the rate holds while they hold the seat.
- **Brass marks the tier, and only the tier.** The board is mounted in brass
  (the lit top bezel) and seat 01, the one sold by the year, is made of it: warm
  tile faces, a brass numeral, brass letters. The three month seats stay enamel.
  A hall board's reserved position is a plate rather than a painted cell, so the
  hierarchy is carried by material -- which means it survives a screenshot, a
  print, and a reader who skips the copy. Brass and red do not collide because
  they are different axes: brass is tier and never moves, red is state and
  always does. When the spotlight or the pointer lands on the year seat, red
  wins the numeral and the plate lifts to a brighter brass rather than to grey.
- **The brass hinge is the one inversion.** On the enamel seats the seam is
  darker than the tile: a shadow gap between two painted leaves. On brass it is
  lighter, because a metal edge catches the hall light instead of swallowing it.
  That single flip is what makes the plate read as metal rather than as a warm
  repaint, and it is a hairline, not a gradient over a resting surface. The
  flap-turn catch is one stop brighter on brass (2.7 against 2.2) for the same
  reason. Nothing glows at rest.
- **Brass never reaches the drawing sheet.** The rules are scoped to
  `.sponsors`. FIG. 5 renders the same four seats from the same array in the
  document's own hand -- ink, dashes, no metal -- and `behaviour.mjs` asserts
  the plate cells for the year and month seats share a background.
- **Measured, not eyeballed.** Brass letters on brass clear the 4.5:1 floor in
  both themes, sampled through a canvas round-trip because Chromium hands back
  the colour function verbatim and parsing the string lies. `behaviour.mjs`
  gates it.
- **The deadline is not painted red.** Red on this band marks state only. A
  countdown in `--board-live` would be a fourth status light next to the lit
  seat, the hovered seat and the action, which is what having no status light
  looks like. The clock is flap-white on enamel and earns its weight from
  position: mounted on the bezel, inside a rule, right of the seats. It is also
  the first element dropped below 62rem, because the band's hard rule outranks
  it (see below).
- **No number we cannot produce.** The page has no analytics, so it does not
  sell impressions. What it publishes to sponsors instead is the Worker's own
  request count -- the one figure this page can generate without watching
  anybody, and a commitment `deploy/` can actually keep.
- **The idle loop is the demo.** An open seat reads `[+]`; the loop clatters it
  through glyphs and settles it on a mark, then clatters it back. Every fourth
  beat the whole board runs left to right instead -- the hall clatter, every
  seat rewriting itself to what it already says, which is what a real board does
  when it refreshes. The shine is the mechanism: each flap brightens as it
  passes 90 degrees, the edge catching the hall light, rather than a gradient
  laid over a resting surface.
- **Two clocks.** The beat sequence is cancellable so stopping the loop stops
  the loop; individual cell turns are not, because a real board does not freeze
  a flap halfway and because a hover rewrite is not part of the loop. Getting
  this wrong made hover silently dead.
- **Hover and focus flip a seat to CLAIM**, and the reader beats the demo: if
  the loop happens to be filling the seat you arrive at, the demo is dropped
  and the seat answers the pointer.
- **Motion, governed.** Stops on pointer, on focus, on a backgrounded tab; does
  not exist under reduced motion, where the board is written in full, one seat
  stays filled, and nothing turns. The board is never flipped on load -- the
  world's own rule. Only `transform`, `opacity`, `filter` and colour animate.
- **One status colour.** Red marks state only: the seat the loop is on, the seat
  under the pointer, the one action. An earlier pass had four red `[+]` signs,
  which is four status lights and no status. A paying sponsor's mark is never
  repainted in it -- the spotlight lifts their tiles instead.
- **No borrowed logos.** The demo seat is tagged `specimen` for exactly as long
  as it is one. A name in that band is a public claim about somebody else's
  company; putting Anthropic or OpenAI there would be the invented proof this
  page argues against, and a trademark problem the moment money changes hands.
  Real sponsors are one array entry in `site/sponsors.js`.
- **The band may not outrank the page.** Hard rule, measured at every commit:
  the band's height must not push the page's own headline, reason and action
  below the fold at 390. It costs 52px there, and the dek steps down to pay for
  it.

## Tokens

`site/tokens.css` is the only place raw colour may live; `page.css` and
`page.js` spend from it. The file is `default` re-seeded, plus seven
`[data-spec="..."]` scopes that hold the real ground/ink/rule/accent/corner/
density of each shipped contract so FIG. 3 re-inks with the actual material.

The faces in FIG. 3 are **named, not loaded** -- this page ships two faces.
The figure caption says so; the readout prints the file each value came from.

## Deferred, with reasons

- **OWN-WORLD softened (P1, accepted).** The promise says "no fills". A patent
  drawing has no filled elements, and this page has exactly one: the primary
  action. A hairline outline button inside a page made of hairline rules does
  not read as the action. The world's grammar has no concept of "an action";
  the page adds one fill and spends it there. Recorded rather than hidden.
- **Fonts load from the Google Fonts CDN (P1).** The skill's own rule is
  self-hosted subset woff2 with size-adjusted fallbacks. The page carries no
  build step, so it carries no font binaries either. Now that it ships from a
  Worker with an assets binding, subsetting the four faces into `site/` and
  dropping the third-party `<link>` is a straight swap -- still open.
- **Prices are published, checkout is not (accepted).** A price is a decision,
  not a measurement, so quoting one is honest where quoting traffic would not
  be. `RATE`, `FOUNDING_UNTIL`, `TERM` and `CHECKOUT` are single constants at
  the top of `site/sponsors.js`. Stripe is still not live: `CHECKOUT` is null,
  so every seat link points at a real inbox and the terms say so in plain words
  rather than implying a card form that does not exist. Filling `CHECKOUT`
  switches every link to checkout and changes nothing else.
- **The clock ticks at minute resolution (accepted).** `setInterval` at 30s,
  displaying days/hours/minutes. A seconds digit would repaint forever for
  urgency this page does not need, and it would make every capture differ. The
  interval is deliberately outside the motion loop: the deadline is information,
  not decoration, so it keeps running under reduced motion and in a still tab.
- **The switch is a radiogroup without roving arrow keys (P2).** Tab reaches
  every option and `aria-checked` is correct; arrow-key roving is the polish
  that is missing.
- **Inline links inside running prose are 20-40px tall (accepted).** They are
  text, not controls. Every actual control clears 44px at 390 under a coarse
  pointer, verified by measurement.

## Evidence

- Captures at 390 / 768 / 1440, light and dark, entrance settled:
  `node site/capture.mjs`. Zero horizontal overflow, zero console errors.
- `bash skills/design-skill/assets/bans.sh site` -- clean, full tier.
- Contrast: 39 distinct text styles sampled per theme through a canvas
  conversion (Chromium serializes `oklch()` verbatim, so string parsing lies);
  0 below floor, lowest ratio 4.76 light / 4.89 dark.

## What this build changed in the skill

Using the skill on a real surface found defects in the skill itself and in this
page's earlier passes, all fixed:

1. `assets/bans.sh` read HTML numeric entities (`&#183;`) as three-digit hex
   and reported them as raw colour. Guarded with `(^|[^&])`.
2. `--fg-3` failed the 4.5:1 floor in all seven shipped token files (4.13:1
   light, 3.9:1 dark on `default`), while carrying captions, micro-labels,
   table headers and fine print. Re-solved to L 0.545 light / 0.600 dark, and
   `scripts/validate.sh` now gates it with a browser-free lightness proxy that
   was proven to trip on the old value.
3. The sponsor pass then surfaced two layout defects that predated it: the
   panning figure was a grid item without `min-width: 0`, and the FIG. 3
   readout printed an unbreakable file path into a fixed grid column. Together
   they widened the page at 360. Both fixed; overflow is now zero at 320, 360,
   390, 414, 768 and 1440.

## Synthetic content to replace

None. Every fact on the page is real: the roll key and its deal, the deck
counts (27 worlds, 12 stagings), the seven contracts, the token values in
FIG. 3, the install commands. The FIG. 3 specimen shows an invented incident
record (`Incident 4471`) as illustrative content -- it is labelled a specimen
by the figure and caption and describes no real system.

## What only eyes on a real device can check

Whether FIG. 1 is genuinely readable while panning on a phone in one hand, and
whether the entrance draw reads as a drawing being made rather than as a
loading state.
