# DESIGN.md -- design-skill site

The material contract for `site/`, written at finish from the built world.
It describes what the code does, not what the direction intended. If the code
and this file disagree, this file is wrong; rewrite it in the same commit that
changes the material.

Surface: one page, four sheets, live at `lroolle.com/design-skill`
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

Using the skill on a real surface found two defects in the skill itself, both
fixed in the same commit:

1. `assets/bans.sh` read HTML numeric entities (`&#183;`) as three-digit hex
   and reported them as raw colour. Guarded with `(^|[^&])`.
2. `--fg-3` failed the 4.5:1 floor in all seven shipped token files (4.13:1
   light, 3.9:1 dark on `default`), while carrying captions, micro-labels,
   table headers and fine print. Re-solved to L 0.545 light / 0.600 dark, and
   `scripts/validate.sh` now gates it with a browser-free lightness proxy that
   was proven to trip on the old value.

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
