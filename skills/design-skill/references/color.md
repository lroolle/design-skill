# Color

The rules that keep a palette from turning into a theme. The palette
itself comes from a specimen (`specimens/palettes/`) or a world card,
never from a recipe: this file used to carry a derivation ladder --
one seed hue, fixed lightness rungs -- and it produced exactly the
computed ramp that reads as generated. `kit/check.sh` now warns on
that shape. Load this when re-inking a kit, verifying contrast, or
judging color use.

## Why OKLCH

Perceptually uniform: equal steps in L look equal, equal C at two
hues looks equally saturated, hue holds when lightness changes. That
is what makes an *observed* palette portable: you can write down what
you saw and it stays what you saw at every size. Ship it directly;
every current browser renders `oklch()`. Very old engines get a
`@supports not (color: oklch(0 0 0))` block with sRGB fallbacks in
the token file only, never per component.

## Specimens, not seeds

A real palette is several materials with independent provenance: a
paper, an ink, a pencil, a stamp. Their hues differ, their chromas
differ, their lightnesses are not evenly spaced. That irregularity is
what the eye reads as *this thing* rather than *a theme*. So:

- **Ground, ink, rule, accent are four decisions**, not one hue at
  four lightnesses. A neutral ramp on the accent hue is the seed
  ladder; a neutral ramp at one chroma is a generator's ramp; both
  warn in `check.sh`.
- **Every neutral carries chroma**, because paper and ink are never
  gray; but the chroma is the material's, not a formula's (paper
  0.008-0.030, carbon ink 0.006-0.012, pencil 0.006).
- **The soft accent is the material bleeding**, not the accent at high
  lightness: a stamp bleeding into paper is the paper's lightness
  with a little of the stamp's hue; a painted part has no tint at all
  (split-flap).
- **Dark is a different object**, not an inversion: a rubbing is ink
  ground and paper marks; a lit board is painted steel and cream
  letters. Choose the dark artifact, then observe it.
- **Re-inking** a system or a kit means replacing values with a
  specimen's, keeping the names, then re-checking the four contrast
  pairs. Shifting one hue by formula across all tokens is not
  re-inking; it is re-seeding, and it is what we stopped doing.

Making a new specimen: photograph the object in daylight, set values
by eye at 1x and 2x, write the irregularity before the numbers, name
the reflex it must not become. If it is only a hue swap of an
existing card, it is not a specimen.

## Strategy before hue

| Strategy | Coverage | Default for |
|---|---|---|
| restrained | inked neutrals; accent on <= 10% of any viewport (primary action, links, focus, selection) | product surfaces, docs, admin |
| committed | one color at 30-60% of a brand surface (a drenched band, a full-bleed section) | landing, launch, portfolio |
| full | 3-6 named inks held in tokens, each with a meaning | data viz, campaigns, editorial features, isotype and du-bois specimens |
| drenched | the surface IS the color; text and lines in the material's light or dark ink | posters, one section per site |

Product surfaces stay restrained. A brand surface may step up one
level in one place. The house kit is restrained with one stamp.

## Dark mode

- Elevation by surface lightness (+0.03-0.04 L per raised layer), not
  by shadow; shadows go near-invisible on dark grounds.
- Accent lifted and desaturated (C -15%); saturated color on dark
  halates.
- Text at L 0.90-0.92, never white; secondary at 0.68-0.72.
- Ground at L 0.14-0.18 with visible chroma, never 0.05 and never
  chroma 0.
- Images dimmed 10% or given a dark variant.
- Weight, tracking and leading compensated together (craft.md).

## Contrast

- WCAG AA: 4.5:1 body, 3:1 large text (>= 24px or 19px bold), UI
  parts, focus indicators. The legal floor; meet it everywhere.
- APCA to tune once WCAG passes: Lc 60+ body, 75+ small or thin, 45+
  large headings.
- Proxy while drafting: an OKLCH L difference of ~0.45-0.50 usually
  clears 4.5:1 for low-chroma pairs. `scripts/validate.sh` uses L <=
  0.56 (light) / >= 0.59 (dark) for `--fg-3` against the contract's
  grounds. Verify the real ratio before shipping.
- Pairs every time: fg / bg, fg-2 / bg, fg-2 / surface-2, accent-fg /
  accent, ok-warn-danger text on their soft tints, focus on bg and
  surface-2, fg-3 (placeholder, meta) on surface.

## Semantic set

| Token | Appears in | Never in |
|---|---|---|
| --ok / --ok-soft | success, valid fields, "up" | headings, decoration, buttons that are not confirmations |
| --warn / --warn-soft | warnings, degraded, unsaved | badges on routine items |
| --danger / --danger-soft | errors, invalid fields, the confirming step of a destructive action | the destructive button at rest, marketing |
| --info / --info-soft | notes, tips, neutral status | anything the accent already covers |

Semantic color travels with a word or an icon; color alone is not a
message. Semantic hues are inks from the same desk as the accent
(specimen cards name them); if one collides with the accent, separate
by L and C and write the rule down.

## Data viz

- Categorical: 4-6 inks with meanings (isotype) or pigments from one
  set (du-bois), at whatever lightness the material has; direct
  labels; beyond six, group. Not equal-L hues spaced around a wheel.
- Sequential: one ink, an L ramp from surface-2 to fg; never rainbow.
- Diverging: two inks through the paper at midpoint.
- Check in a deuteranopia / protanopia simulator; if two adjacent
  series collapse, change L or add a pattern.
- Gridlines in --line, axes text in --fg-2, plot ground = surface.

## Rules that read as intent

- **Count the accent** per viewport on a product surface: a handful.
  More is accent creep and the page turns into "blue SaaS".
- **Never pure black or white.** Off-black L 0.15-0.24; off-white L
  0.93-0.985; both carrying their material's chroma. Print is the one
  exception.
- **Tint the shadows** to the ink; a gray shadow on warm paper looks
  like dirt.
- **Gradients are lighting, not paint.** One radial vignette anchoring
  a hero is a light source; a linear fill, a two-stop button, or text
  clipped to a gradient is the costume every generator wears.
- **Semantic states from tokens only.** No raw palette classes in app
  code; the token file is the only place a color is written down.
  `kit/check.sh` fails on it.

## Checklist

- palette traceable to a specimen card or a world card, provenance
  line in DESIGN.md
- ground, ink, rule, accent: at least three materials, not one hue
- every neutral carries chroma; none pure
- strategy named before the inks were chosen
- accent count per viewport is a handful on product surfaces
- every text pair verified; accent-fg on accent >= 4.5:1
- dark theme is a second observed object, accent lifted and desaturated
- no gray shadow on a tinted ground; gradients only as one light source
- `kit/check.sh` clean of `ramp` and `floor` warnings, or the reason
  written down
