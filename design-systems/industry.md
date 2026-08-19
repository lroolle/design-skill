# industry -- instrument panel: dense, ruled, mono data, safety accents

## 1. Identity

An instrument, not a brochure. Light-first cool steel neutrals, 1px
rules and tone steps for structure, one grotesk family with a narrow
width for labels, monospace for every number, and safety orange used
the way a factory uses it: on the one thing you must not miss. It
fills the viewport, keeps its landmarks still, and updates values in
place without ceremony. It is built for the person who looks at it
for eight hours and needs to spot the one row that is wrong.

Scene: an engineering drawing on a light table; a control room at
shift change.

Fits: dashboards, monitoring, ops and incident tooling, logistics,
hardware and IoT consoles, admin back-office, fintech operations,
developer tools' product surfaces, data-heavy internal tools.

Does not fit: brand campaigns, wellness, editorial, anything whose
job is to be remembered rather than read. Its brand surface, if it
needs one, borrows `modernist` or `default`.

Anchors (mechanism, not skin): an aircraft cockpit's annunciator
panel (states in a fixed grid, one alarm color); a spreadsheet that
a trader trusts (mono numerals, units in headers, nothing rounded
away); an industrial designer's control layout where every dial is
labeled in the same narrow capitals.

## 2. Color

Seed hue 230 (cool steel), neutrals C 0.004-0.008, light-first.
Strategy **restrained**: steel and ink, with safety orange
oklch(0.63 0.19 45) as the single accent -- the primary action, the
selected row, the threshold that matters. Semantic hues are held in
tokens and used only for state.

| Token | Light | Dark |
|---|---|---|
| --bg | oklch(0.975 0.004 230) | oklch(0.16 0.008 230) |
| --surface | oklch(0.955 0.005 230) | oklch(0.19 0.009 230) |
| --surface-2 | oklch(0.925 0.006 230) | oklch(0.23 0.010 230) |
| --fg | oklch(0.20 0.012 230) | oklch(0.90 0.006 230) |
| --fg-2 | oklch(0.45 0.010 230) | oklch(0.70 0.008 230) |
| --fg-3 | oklch(0.60 0.008 230) | oklch(0.55 0.008 230) |
| --line | oklch(0.87 0.008 230) | oklch(0.28 0.010 230) |
| --line-strong | oklch(0.74 0.010 230) | oklch(0.38 0.012 230) |
| --accent | oklch(0.63 0.19 45) | oklch(0.72 0.17 50) |
| --accent-fg | oklch(0.15 0.010 230) | oklch(0.15 0.010 230) |
| --accent-soft | oklch(0.95 0.03 45) | oklch(0.26 0.05 45) |
| --ok / --warn / --danger / --info | 0.55 0.12 150 / 0.72 0.15 80 / 0.55 0.19 25 / 0.50 0.09 240 | L +0.15, C -0.02 |

Rules: accent-fg is dark ink on orange -- white on orange fails
contrast. Dark mode is a control room, not a terminal: ground at L
0.16 with the steel trace, elevation by surface step, orange lifted.
Re-seed options: hazard yellow oklch(0.80 0.16 85) for marks, steel
blue oklch(0.45 0.10 240), signal green oklch(0.62 0.15 145) -- with
the warning that green on near-black is a current AI look. Charts:
gridlines in `--line`, one highlighted series in accent, thresholds
dashed in `--warn`/`--danger`, the rest `--fg-3`.

## 3. Type

| Role | Face | Notes |
|---|---|---|
| display | Archivo 600, tracking -0.01em | display is a weight; headings are small here |
| body | `"Archivo", "Helvetica Neue", Arial, sans-serif` | OFL, variable weight and width 62-125 |
| labels | Archivo at `font-stretch: 75%`, uppercase, +0.06em, 0.75rem | the one label device; the narrow width earns its place in dense headers |
| mono | `"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace` | ALL data: numbers, IDs, logs, timestamps, code |
| CJK | `"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei"` | zh-first products may prefer MiSans or HarmonyOS Sans; leading 1.6 |

Ratio 1.2; base 0.9375rem (15px); leading 1.45. Tabular, slashed-zero
numerals everywhere a number appears. Two weights: 400 and 600.

## 4. Space and density

Unit 4px scale, density 0.8; packed 0.7 for trading and monitoring
walls (base drops to 0.875rem, cards drop entirely). Container 100%
with 16-24px gutters -- dashboards fill the viewport. Section gap 2x
the row gap; the page is a set of ruled regions, not a scroll of
sections. Measure 72ch for the rare paragraph.

## 5. Shape and surface

Radius **0.125rem** (2px). Line 1px; tone steps for grouping; no
shadows except `--shadow-1` on side panels and menus; no texture, no
gradients. Every region has a header row with a rule under it.

## 6. Motion

Personality **mechanical**: micro 50ms, base 100ms, enter 150ms,
linear or step-end. Instant navigation, no entrance animation, no
stagger. Live values update in place -- a number changes, the row
does not flash, nothing pulses. Reduced motion is the default
posture, not a media query fallback.

## 7. Imagery and icons

None, or schematics and diagrams drawn in `--fg-2` lines. Icons:
Phosphor regular 1.5 or Tabler 1.5 -- one set, one weight, always
beside a label for anything with more than two states. Data viz
dense: direct labels, gridlines, sparklines inside table cells,
thresholds as dashed lines, no donuts.

## 8. Components

- Buttons: compact 32px, rectangular, weight 500; secondary (1px
  `--line-strong`) is the default; the filled orange primary appears
  once per view; destructive = `--danger` fill on the confirming step.
- Inputs: 1px `--line`, 32px, mono for numeric fields, units as
  suffix labels inside the field frame; focus 2px `--focus`.
- Navigation: a left rail with a 1px line, narrow-width uppercase
  section labels, plus a top status bar (see signature moves).
- Tables: the primary component. Sticky header, mono tabular numerals
  right-aligned, units in headers not cells, row hover = one tone
  step, selected row = `--accent-soft`, zebra optional at packed
  density, summaries (totals, worst case) ABOVE the table.
- Cards: only for KPI tiles, and KPIs sit above the table, never
  instead of it.
- Overlays: side panels from the right for detail and edit; modals
  only for irreversible confirmations.

## 9. Signature moves

1. **The status strip** -- a 1px-ruled bar of live states in mono:
   system time, environment, connection, last sync. Always visible,
   never animated.
2. **Mono data columns** with unit headers and dashed threshold
   lines; the eye finds the outlier because everything else aligns.
3. **Narrow-width uppercase labels** as the single label device --
   region headers, table headers, form legends, and nothing else.

## 10. Voice

Terse and exact. Units and timestamps on everything. No marketing,
no reassurance ("All good!"), no invented precision. Errors name the
component, the value, and the next action. Numbers are never rounded
away from the precision the operator needs.

## 11. Where it turns to slop

- **Neon terminal.** Near-black ground, acid green or vermilion
  text, CRT scanlines, glow -- the current AI look for "developer".
  Sidestep: light-first steel; if dark, L 0.16 with a cool trace,
  orange not green, matte surfaces.
- **Cyber HUD.** Corner brackets, hexagons, animated radar rings.
  Instruments do not decorate.
- **Donut dashboards and colored left borders.** Four KPI cards each
  with a stripe and a ring chart is a template, not a console.
- **Invented metrics and fake tickers.** "99.99% uptime" with a
  pulsing dot; scrolling logs that scroll for effect.
- **KPI cards replacing the table.** Summaries above the data, never
  instead of it -- the metric-cards scar.
- **Everything a modal.** Detail and edit belong in a side panel; the
  table stays visible.
- **Broadsheet costume (current AI look).** Hairlines and near-zero
  radius are load-bearing here because they rule real data. If a
  page is three paragraphs and a hero, the rules are costume; use
  `default`.

## 12. Tokens

Full file: `assets/tokens/industry.css`. Key values:

```css
:root {
  --bg: oklch(0.975 0.004 230); --fg: oklch(0.20 0.012 230);
  --accent: oklch(0.63 0.19 45); --accent-fg: oklch(0.15 0.010 230);
  --line: oklch(0.87 0.008 230); --radius: 0.125rem; --density: 0.8;
  --font-body: "Archivo", "Helvetica Neue", Arial, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;
  --text-base: 0.9375rem; --leading-body: 1.45; --measure: 72ch;
  --dur-micro: 50ms; --dur-base: 100ms; --dur-enter: 150ms;
  --ease-out: linear; --container: 100%;
}
```
