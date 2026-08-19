# nocturnes -- dark-first, one light source

## 1. Identity

The night one. Blue-grey grounds with a visible tint -- mist, not
black -- a slightly warm gaslight white for text, gold used as sparks
rather than fills, one light source per view, surfaces that step
lighter as they rise, motion that arrives without hurry. It is
dark-first by contract, not dark-mode-as-afterthought: the light
theme exists for docs, settings and print, but the identity lives in
the dark. What separates it from every "dark SaaS" template is that
the darks are tinted, matte and mid-deep (L 0.15, not 0.05), and the
accent is warm metal, not neon.

Scene: a river at night in a painting; fog, gaslight, one gold spark
on the water.

Fits: music, film and streaming, events and nightlife, games, pro
creative tools (audio, video, 3D), automotive, dev-tool brand
surfaces, anything experienced in a dark room.

Does not fit: long-form reading, forms-heavy admin, print, daytime
utility. Where a product has those parts, ship them on the light
theme and keep the night for the stage.

Anchors (mechanism, not skin): a cinema's screening schedule (dark
room, one glowing thing, everything else recedes); a pro audio
workstation (matte panels, meters as the only bright elements); the
tonal painting the name comes from (near-values, one accent, fog as
structure).

## 2. Color

Seed hue 235 (blue-grey). Neutral tint cool, and **visible**: darks
carry C 0.020-0.030, which is what keeps them from collapsing into
neutral black. Strategy **restrained**: gold on < 5% of any view --
sparks: dots, underlines, dates, the one CTA.

| Token | Dark (primary) | Light ("day") |
|---|---|---|
| --bg | oklch(0.15 0.025 235) | oklch(0.96 0.012 235) |
| --surface | oklch(0.19 0.025 235) | oklch(0.94 0.012 235) |
| --surface-2 | oklch(0.23 0.025 235) | oklch(0.91 0.014 235) |
| --fg | oklch(0.91 0.010 80) | oklch(0.18 0.030 235) |
| --fg-2 | oklch(0.68 0.012 235) | oklch(0.42 0.025 235) |
| --fg-3 | oklch(0.52 0.012 235) | oklch(0.56 0.020 235) |
| --line | oklch(0.28 0.020 235) | oklch(0.86 0.014 235) |
| --line-strong | oklch(0.38 0.020 235) | oklch(0.74 0.016 235) |
| --accent | oklch(0.80 0.13 85) gold | oklch(0.52 0.12 70) brass |
| --accent-soft | oklch(0.28 0.05 85) | oklch(0.93 0.04 80) |
| --ok / --warn / --danger | hue 150 / 60 / 20 at C 0.12-0.16 | same hues, L -0.18 |

Rules: text is gaslight white (hue 80, L 0.91), never pure white, so
it sits warm against the cool ground. Warn sits at hue 60 (amber),
kept away from gold's 85, so a warning is never mistaken for the
accent. On the light theme gold fails contrast on mist; the accent
becomes brass at L 0.52 -- say so in DESIGN.md so nobody "fixes" it
back. Re-seed options: warm ember dark (hue 40 at L 0.15, accent
oklch(0.78 0.14 60)), green-black (hue 160, accent oklch(0.80 0.10
100)). Never re-seed to purple/indigo darks (hue 270-290) and never
to neon green or vermilion accents -- those are the two most
recognizable AI dark looks.

## 3. Type

| Role | Face | Notes |
|---|---|---|
| display | "Schibsted Grotesk", "Helvetica Neue", Arial, sans-serif -- 700, tracking -0.02em, leading 1.05 | crisp sharp cuts, tight in bold; not on any saturation list |
| body / UI | same family -- 450, leading 1.55, tracking +0.005em | dark-mode compensation baked in: weight +1 step, leading +0.05, tracking +0.005em |
| mono | "JetBrains Mono", ui-monospace, monospace | timetables, timestamps, durations, BPM |
| CJK | "Noto Sans SC" (system PingFang SC); zh brand surfaces may use MiSans or HarmonyOS Sans | CJK looks lighter on dark: +1 weight step or +5% size |

One family across weights (400-900 variable, OFL). Ratio 1.333, base
1rem. On the light theme, body drops back to 400 and tracking 0 --
the compensation is for light-on-dark only.

## 4. Space and density

Unit 4px scale, density 1.0. Container 80rem, measure 66ch. Section
rhythm comes from tone steps (the mist band), not from growing gaps.

## 5. Shape and surface

Radius **0.375rem** (6px); `-sm` 0.1875rem, `-lg` 0.75rem for
overlays. Line 1px at L 0.28. Elevation model: **surface lightness
carries elevation** -- higher = lighter, in 0.04 steps. `--shadow-1`
is an inset top highlight (`inset 0 1px 0 oklch(1 0 0 / 0.04)`) plus
a soft drop, so a raised panel reads as lit from above; `--shadow-2`
deeper for overlays. No glow except focus and the accent's hover
state. One radial gradient per view is allowed as **lighting** -- a
vignette anchoring the hero, `--surface` fading to `--bg` -- never as
a fill, never as a card background, never with a hue shift.

## 6. Motion

Personality **deliberate**: micro 150ms, base 300ms, enter 500ms, exit
~60% of enter, `--ease-out` for entrances, crossfades for content
swaps, no bounce. Accent hover = one brightness step at 150ms (the
spark catching). Page transitions crossfade. No scroll theatre, no
ambient motion; a slow vignette drift on a hero is the entire brand
budget, and reduced motion removes it.

## 7. Imagery and icons

Cinematic low-key photography; crushed blacks lifted to the ground's
lightness so the image never contains a pure black hole in the page.
Non-hero imagery duotoned in the seed hue. No illustration, no
line-art. Icons: Phosphor light or regular at 1.5px, one weight,
`--fg-2` at rest. Data viz: one gold series, the rest mist
(`--fg-2`, `--fg-3`) on `--surface`, gridlines `--line`, direct labels.

## 8. Components

- Buttons: 40px; primary = gold fill with dark text, once per view;
  secondary = 1px `--line-strong`; ghost = `--fg-2` text, `--fg` on
  hover. Radius token, weight 500, verbs.
- Inputs: `--surface`, 1px `--line`, focus = 2px gold ring at 2px
  offset. Labels above in `--fg-2` 500.
- Navigation: a top bar over the hero; on scroll it becomes
  `--surface` with a 1px line -- no blur, no transparency games.
- Cards: `--surface` with 1px `--line`; hover = one lightness step,
  never a glow, never a gradient border.
- Overlays: `--overlay` + `--shadow-2` + `--radius-lg`, backdrop dim
  at 0.5, no blur.
- Tables: ruled at `--line`, mono tabular numerals, sticky header on
  `--surface`.

## 9. Signature moves

1. **One light source** -- a single radial gradient anchoring the
   hero, lighting the composition from one point; everything else is
   matte.
2. **Gold sparks** -- accent as points, never areas: a dot before a
   live event, an underline, a date, the one CTA.
3. **The mist band** -- a full-width tinted section step (`--surface`)
   as the page's rhythm instead of gaps or rules.

## 10. Voice

Measured, low-volume, evocative but concrete ("Doors 8pm. Set at 9."),
no exclamation, no hype adjectives, no all-caps shouting. Buttons are
verbs. Numbers and times in mono.

## 11. Where it turns to slop

- **Neon on black.** Saturated green, cyan or magenta on a neutral
  L 0.05 ground -- the crypto reflex. Tinted L 0.15 darks, gold.
- **Purple gradient on dark.** The AI reflex; hue 270-290 anywhere in
  the ground or accent is a re-seed that must not happen.
- **Glass and glow.** Backdrop-blur cards, glowing borders, glow on
  every hover. Matte surfaces; elevation by lightness; glow only on
  focus and the accent's hover.
- **The dark SaaS template.** Dotted grid background, spotlight
  cursor, gradient-border cards, three feature tiles. One light
  source, no grid, no cursor effects, no tiles.
- **Near-black + acid green / vermilion.** The second current AI
  look. Sidestep: the ground is tinted and mid-deep, the accent is
  warm metal, the surfaces are matte, one light source, under 5%
  accent coverage.
- **Illegible mist.** `--fg-3` used for body copy; body stays `--fg`
  at L 0.91, and the compensation (450 / 1.55 / +0.005em) is not
  optional.

## 12. Tokens

Full file: `assets/tokens/nocturnes.css` -- dark-first: projects set
`data-theme="dark"` on `html` by default; `:root` still holds the
light theme by contract. Key values:

```css
[data-theme="dark"] {
  --bg: oklch(0.15 0.025 235);   --fg: oklch(0.91 0.010 80);
  --accent: oklch(0.80 0.13 85); --accent-fg: oklch(0.15 0.025 235);
  --line: oklch(0.28 0.020 235); --radius: 0.375rem;
  --font-display: "Schibsted Grotesk", "Helvetica Neue", Arial, sans-serif;
  --dur-micro: 150ms; --dur-base: 300ms; --dur-enter: 500ms;
  --shadow-1: inset 0 1px 0 oklch(1 0 0 / 0.04), 0 2px 8px oklch(0 0 0 / 0.30);
}
```
