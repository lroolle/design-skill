# organic -- humanist, warm, rounded, tactile

## 1. Identity

The hand-made one. Warm oat ground, brown-black ink, a moss accent,
a calligraphic serif over a humanist sans from the same hand, rounded
corners that all speak one radius, structure from soft lines and tone
steps like layered paper, motion with a little weight to it. It reads
as something a person made with their hands, without pretending to be
a craft fair -- the warmth comes from proportion, contrast and
restraint, not from clip art.

Scene: a kitchen table in morning light; linen, clay, something
growing on the sill.

Fits: wellness, food and drink, craft and makers, education, community
and non-profits, hospitality, gardening, personal brands, family
products -- anything whose promise is care.

Does not fit: dense operations tools, fintech, monitoring, anything
that must feel precise and cold. Warmth on a control panel reads as
imprecision.

Anchors (mechanism, not skin): a good independent grocer's site
(photography does the selling, type stays out of its way); a
well-made cookbook (measure, margins, one accent, real pictures); a
community school's enrolment pages (forms that feel like a person
wrote them).

## 2. Color

Seed hue 90 (oat/straw). Neutral tint warm, warmer than default
(C 0.010-0.014) so the ground reads as paper, not gray. Strategy
**restrained**: tinted neutrals and one moss accent on <= 10% of a
view. Brand heroes may go committed via a drenched tone step (a whole
section on `--surface-2` or a deeper oat), never via saturated fills.

| Token | Light | Dark ("soil") |
|---|---|---|
| --bg | oklch(0.975 0.012 90) | oklch(0.17 0.012 70) |
| --surface | oklch(0.955 0.012 90) | oklch(0.20 0.012 70) |
| --surface-2 | oklch(0.925 0.014 90) | oklch(0.24 0.014 70) |
| --fg | oklch(0.24 0.020 60) | oklch(0.92 0.010 85) |
| --fg-2 | oklch(0.46 0.018 60) | oklch(0.72 0.010 85) |
| --fg-3 | oklch(0.60 0.016 60) | oklch(0.56 0.010 85) |
| --line | oklch(0.86 0.014 90) | oklch(0.28 0.012 70) |
| --line-strong | oklch(0.74 0.016 90) | oklch(0.38 0.014 70) |
| --accent | oklch(0.46 0.09 145) | oklch(0.72 0.09 145) |
| --accent-soft | oklch(0.93 0.03 130) | oklch(0.26 0.04 145) |
| --ok / --warn / --danger | hue 150 / 75 / 25 at C 0.12-0.17 | same hues, L +0.16, C -0.02 |

Rules: `--ok` shares the accent's green family at higher lightness and
chroma; that is acceptable here because in this language green means
"good" and the accent is used only for actions, so the two never sit
in the same slot. Re-seed options for identity: ochre
oklch(0.62 0.13 80), plum oklch(0.42 0.11 330), lake
oklch(0.50 0.10 210). Do not re-seed the accent to clay or terracotta
(hue 35-45): warm paper plus a serif plus terracotta is the most
recognizable current AI look, and this system sits one hue away from
it. Dark mode is a redesign: soil ground, lifted moss, text at L 0.92.

## 3. Type

| Role | Face | Notes |
|---|---|---|
| display | "Alegreya", Georgia, serif -- 600, tracking -0.01em, leading 1.1 | calligraphic old-style with real italics; low contrast, so it never reads as a fashion serif |
| body / UI | "Alegreya Sans", system-ui, sans-serif -- 400/500 | humanist, open, comfortable at 17px |
| mono | "JetBrains Mono", ui-monospace, monospace | rarely used: order numbers, dates in tables |
| CJK | "Noto Sans SC" (UI/body), "Noto Serif SC" (display); "LXGW WenKai" for a hand-written feel on brand surfaces | leading 1.75 for CJK body |

Alegreya and Alegreya Sans are one superfamily from one designer: the
serif and the sans share skeleton, x-height and rhythm, so the pairing
contrasts on structure (serif x sans) while agreeing on everything
else -- the strongest kind of pairing, and immune to the
similar-but-not-identical trap. Ratio 1.333, base 1.0625rem, body
leading 1.6, headings 1.1. Old-style figures in prose (`onum`), lining
in tables. Fonts are OFL; self-host woff2.

## 4. Space and density

Unit 4px scale, density 1.1 -- a little more air than default, never
airy to the point of emptiness. Section gap 3x the largest internal
gap; sections alternate tone steps rather than gaps grow. Container
76rem, measure 66ch.

## 5. Shape and surface

Radius **0.5rem** (8px), the one corner language; `-sm` 0.25rem for
chips and inputs, `-lg` 1rem for images and overlays only. Line 1px,
soft (L 0.86). Elevation subtle: `--shadow-1` warm-tinted at 0.06 for
raised cards on hover and popovers, `--shadow-2` for overlays; nothing
floats at rest. Optional grain on brand surfaces only: an SVG
`feTurbulence` noise overlay at 0.03 opacity, `position: fixed;
pointer-events: none; mix-blend-mode: multiply` -- felt, not seen.

## 6. Motion

Personality **weighted**: micro 120ms, base 250ms, enter 400ms, exit
~60% of enter. Entrances `--ease-out`; a spring curve
`cubic-bezier(0.34, 1.3, 0.64, 1)` is allowed on brand surfaces only
(one hero element, one CTA hover), never on product surfaces. Gentle
stagger (60ms) on a first-run empty state, then never again. Hover =
lift 1px + shadow-1. No ambient motion, no scroll theatre.

## 7. Imagery and icons

Natural-light photography: warm, slightly desaturated, never HDR,
never stock smiles; people's hands doing things. Rounded masks at
`--radius-lg` on photos only. Illustration: single-weight hand-drawn
line in `--fg-2`, one style per product. Icons: Phosphor regular at
1.5px, one set, 20px beside 17px text. Data viz soft: few series,
rounded line caps, `--accent` + ochre + `--fg-3`, direct labels.

## 8. Components

- Buttons: `--radius` (8px, not pills), 40px tall, generous horizontal
  padding (1.25rem); primary = moss fill with paper text; secondary =
  1px `--line-strong`; ghost = accent text. Weight 500, verbs.
- Inputs: `--surface`, 1px soft line, `--radius`, focus = 2px moss
  ring at 2px offset; labels above in 500; help text in `--fg-2`.
- Navigation: a simple top bar -- wordmark left, 4-5 links, one CTA;
  on mobile a bottom tab bar or a full-width sheet, not a hamburger
  hiding everything.
- Cards: allowed for discrete things (recipes, classes, products):
  1px soft line, no shadow at rest, tone step + shadow-1 on hover,
  image at `--radius-lg` inside. Groups of text use rules and space.
- Overlays: `--overlay` + `--shadow-2` + `--radius-lg`; sheets from
  the bottom on touch.
- Tables: rare; soft rules, lining figures, row hover one tone step.

## 9. Signature moves

1. **The hand-drawn rule** -- an SVG stroke (2px, slight waver, in
   `--fg-3` or `--accent`) as the section divider or an underline
   under the one section heading; rationed to one use per page as
   the section-label device.
2. **Layered paper** -- section rhythm from tone steps (`--bg` ->
   `--surface` -> `--surface-2`), so a page reads as sheets laid on
   a table rather than boxes on a grid.
3. **Round against square** -- rounded photo masks set against
   square-set serif type; the contrast is the character.

## 10. Voice

Warm and human, first-person plural ("we bake on Tuesdays"), concrete
nouns over adjectives, sentence case, no hype, no emoji, no
exclamation. Buttons are still verbs ("Reserve a table"). Errors
sound like a person helping, not a form scolding.

## 11. Where it turns to slop

- **Wellness beige.** All cream, low-contrast brown text, nothing
  legible. `--fg` stays at L 0.24; the warmth is in the ground and
  the accent, not in the text.
- **Blobs and mesh.** Amorphous blob backgrounds, gradient mesh,
  floating shapes. Structure comes from tone steps and one hand-drawn
  rule.
- **Clip art.** Script fonts, leaf and sprout illustrations, emoji as
  icons, pastel rainbows, everything a pill. One line-illustration
  style, one icon set, one radius, one accent.
- **Bounce everywhere.** Elastic easing on every hover reads as a toy.
  Spring on one hero element on a brand surface; ease-out elsewhere.
- **The rounded-geometric template.** Rounded geometric sans (the
  Nunito/Quicksand look) plus pastel plus pills is a template, not
  warmth. The warmth here is calligraphic-humanist type.
- **The cream + serif + terracotta look.** This system is one hue
  from it. Sidestep: moss, plum or ochre accent -- never terracotta;
  a calligraphic low-contrast display, never Didone; real contrast;
  no italic serif hero; no mono microlabels or uppercase kickers.

## 12. Tokens

Full file: `assets/tokens/organic.css`. Key values:

```css
:root {
  --bg: oklch(0.975 0.012 90);   --fg: oklch(0.24 0.02 60);
  --accent: oklch(0.46 0.09 145); --accent-fg: oklch(0.975 0.012 90);
  --line: oklch(0.86 0.014 90);   --radius: 0.5rem; --radius-lg: 1rem;
  --font-display: "Alegreya", Georgia, serif;
  --font-body: "Alegreya Sans", system-ui, sans-serif;
  --dur-micro: 120ms; --dur-base: 250ms; --dur-enter: 400ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```
