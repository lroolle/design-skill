# Color

The color system: how every token in `assets/tokens/*.css` is derived,
and the rules that keep a palette from turning into a theme. Load when
seeding or re-seeding a system, verifying a ramp, or judging color use.
palettes.md holds the finished cards; this file holds the recipe.

## Why OKLCH

OKLCH is perceptually uniform: equal steps in L look like equal steps,
the same C at two hues looks equally saturated, and hue does not shift
when you change lightness. That is what makes a *derived* palette
possible -- you can write "text at L 0.18, ground at L 0.985" once and
re-seed the hue without re-tuning every value by eye. It also reaches
the wide gamut of modern displays. Ship it directly; every current
browser renders `oklch()`. If a project must support very old engines,
add a `@supports not (color: oklch(0 0 0))` block with sRGB fallbacks
for the token file only -- never per component.

## Derivation recipe

One seed hue drives everything. Chroma on neutrals is tiny but never
zero: that trace is what makes a gray read as *this product's* gray.

1. **Seed** -- pick the hue (0-360) and the neutral tint (warm: hue in
   the 60-90 band; cool: 220-250; a brand hue: its own). Neutral chroma
   0.004-0.015 -- the warmer or moodier the system, the higher.
2. **Lightness ladder** -- surfaces, text and lines are the seed at
   fixed lightness rungs:

   | Token | Light | Dark |
   |---|---|---|
   | --bg | 0.975-0.985 | 0.14-0.16 |
   | --surface | 0.955-0.965 | 0.17-0.19 |
   | --surface-2 | 0.925-0.935 | 0.21-0.23 |
   | --overlay | = bg (with shadow) | 0.19-0.21 |
   | --fg | 0.13-0.24 | 0.90-0.92 |
   | --fg-2 | 0.42-0.46 | 0.68-0.70 |
   | --fg-3 | 0.56-0.60 | 0.52-0.55 |
   | --line | 0.86-0.88 | 0.26-0.28 |
   | --line-strong | 0.74-0.76 | 0.36-0.38 |

   The dark column is not the light column inverted: rungs sit at
   different distances because dark grounds need more separation
   between surface steps (elevation lives there) and less between text
   levels (light text glows).
3. **Accent** -- one hue, chroma set by strategy (below). Light: L
   0.42-0.55 for a fillable accent with light text on it, or L 0.60-0.80
   for a mark-only accent with dark text on it. Dark: lift L by
   0.15-0.27 and drop C by ~15% -- saturated color on a dark ground
   halates. `--accent-fg` is whichever of bg/fg gives 4.5:1 on the
   accent; `--accent-soft` is the accent hue at surface lightness with
   C 0.02-0.05, for selection and tinted callouts.
4. **Semantic** -- hue offsets, not new colors: ok in the 145-155 band,
   warn 60-80, danger 20-28, info near the accent or 235-250, each at
   L 0.50-0.55 (light) / 0.68-0.72 (dark) with a `-soft` tint. If the
   accent already sits in one of those bands, keep the semantic in the
   band but separate it by L and C so meaning survives.
5. **Focus** -- the accent hue at higher C, one step lighter than the
   accent; visible on every surface at 3:1.
6. **Shadows** -- the fg color at 5-10% alpha for light themes, black at
   25-40% for dark; never a neutral gray shadow on a tinted ground.

## Strategies

Decide before picking a hue; the strategy is what changes, not the
palette.

| Strategy | Coverage | Default for |
|---|---|---|
| restrained | tinted neutrals; accent on <= 10% of any viewport (primary action, links, focus, selection) | product surfaces, docs, admin |
| committed | one saturated color at 30-60% of a brand surface (a drenched hero band, a full-bleed section) | landing, launch, portfolio |
| full | 3-4 named roles held in tokens | data viz, campaigns, editorial features |
| drenched | the surface IS the color; text and lines in the seed's light or dark rung | posters, campaign heroes, one section per site |

Product surfaces stay restrained. A brand surface may step up one
level in one place; a whole site at drenched is a poster, not a site.

## Dark mode is a redesign

- Elevation by surface lightness (each raised layer +0.03-0.04 L), not
  by shadow; shadows go near-invisible on dark grounds.
- Accent lifted and desaturated (C -15%); pure saturated color on dark
  vibrates.
- Text at L 0.90-0.92, never white; secondary text at 0.68-0.70.
- Images dimmed 10% (`filter: brightness(0.9)`) or given a dark
  variant; full-brightness photography jars.
- Ground at L 0.14-0.16 with the seed's trace, never L 0.05 and never
  chroma 0: black-black flattens depth and every color on it looks
  neon.

## Contrast floors

- WCAG AA: 4.5:1 for body text, 3:1 for large text (>= 24px, or 19px
  bold) and for UI parts and focus indicators. This is the legal floor;
  meet it everywhere.
- APCA models perception better (polarity, font size, weight): aim Lc
  60+ for body, Lc 75+ for small or thin text, Lc 45+ for large
  headings. Use APCA to *tune* once WCAG passes; use WCAG to *comply*.
- Fast proxy: an OKLCH L difference of ~0.45-0.50 between text and
  ground usually clears 4.5:1 for neutral-ish colors. It is a proxy for
  drafting, not a check -- chroma and hue move the real ratio. Verify
  every text-on-surface pair with a checker before shipping.
- Pairs to check every time: fg on bg, fg-2 on bg, fg-2 on surface-2,
  accent-fg on accent, ok/warn/danger text on their soft tints, focus
  ring on bg and on surface-2, placeholder (fg-3) on surface.

## The semantic set

| Token | Appears in | Never in |
|---|---|---|
| --ok / --ok-soft | success states, valid fields, "up" statuses | headings, decoration, buttons that are not confirmations |
| --warn / --warn-soft | warnings, degraded states, unsaved-changes notes | attention-grabbing badges on routine items |
| --danger / --danger-soft | errors, invalid fields, the confirming step of a destructive action | the destructive button at rest, marketing |
| --info / --info-soft | notes, tips, neutral status | anything the accent already covers |

Semantic color always travels with a word or an icon; color alone is
not a message.

## Data viz

- Categorical: 5-7 hues at equal L (0.55-0.65 light / 0.70-0.78 dark)
  and equal C (0.10-0.14), spaced around the wheel starting from the
  seed; the highlighted series is the accent, context series are
  fg-3. Beyond 7 categories, group.
- Sequential: one hue, an L ramp from surface-2 to fg, C rising then
  falling; never a rainbow.
- Diverging: two hues (the accent and its complement or the danger
  hue) through a neutral midpoint at surface lightness.
- Check every palette in a deuteranopia/protanopia simulator; if two
  adjacent series collapse, change L or add a pattern/label. Direct
  labels beat legends.
- Gridlines in --line, axes text in fg-2, plot ground = surface.

## Rules that read as intent

- **Count the accent.** Occurrences of the accent per viewport on a
  product surface: a handful (primary action, a couple of links,
  focus, selection). More than that is accent creep and the page turns
  into "blue SaaS" or "orange SaaS".
- **Never pure black or white.** #000 on #fff halates and reads as
  unfinished; pure white grounds kill the neutral tint that ties the
  palette together. Off-black L 0.13-0.20; off-white L 0.975-0.985;
  both carrying the seed.
- **Tint the shadows.** A gray shadow on a warm ground looks like dirt.
- **Gradients are lighting, not paint.** One radial vignette anchoring
  a hero is a light source; a linear gradient as fill, a two-stop
  "trust gradient" on a button, or a gradient clipped to text is the
  costume every generator wears. Never on text.
- **Semantic states from tokens only.** No raw palette classes
  (`text-red-500`, `bg-amber-50`) in app code; the token file is the
  only place a hue is written down. `assets/bans.sh` greps for it.

## Worked example: re-seeding default

default is hue 75 (warm paper) with accent hue 250 (ink blue). A
garden-tools product wants moss ground and a clay accent -- seed 150,
accent 30. Six tokens change; everything else stays on the ladder:

```css
/* before (default)                    after (seed 150, accent 30) */
--bg:      oklch(0.985 0.005 75);      --bg:      oklch(0.985 0.006 150);
--fg:      oklch(0.18 0.010 75);       --fg:      oklch(0.18 0.012 150);
--line:    oklch(0.88 0.008 75);       --line:    oklch(0.88 0.010 150);
--accent:  oklch(0.45 0.10 250);       --accent:  oklch(0.50 0.13 30);
--accent-soft: oklch(0.94 0.02 250);   --accent-soft: oklch(0.94 0.03 30);
--focus:   oklch(0.55 0.14 250);       --focus:   oklch(0.60 0.16 30);
```

Then re-check: danger (hue 25) now sits next to the accent (hue 30) --
move danger to L 0.50 C 0.19 so it is visibly hotter than the accent's
0.50/0.13, and confirm accent-fg still clears 4.5:1 on the new accent.
Surfaces, fg-2/fg-3, line-strong, ok/warn/info follow the ladder
automatically because they are written in terms of the seed.

## Checklist

- one seed hue; every neutral carries its trace (C > 0)
- strategy named before the hue was picked
- accent count per viewport is a handful on product surfaces
- accent-fg on accent >= 4.5:1; every text pair verified
- semantic hues in their bands, distinct from the accent by L or C
- dark theme derived by the dark ladder, accent lifted and desaturated
- no #000, no #fff, no gray shadow on a tinted ground
- gradients only as one light source, never as fill or on text
- no raw palette classes or hex outside the token file
- data-viz palettes at equal L/C, checked for color-vision deficiency
