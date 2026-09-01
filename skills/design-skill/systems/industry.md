# industry -- instrument panel

An instrument, not a brochure. Light-first cool steel neutrals, 1px rules and tone steps, one grotesk with a narrow width for labels, monospace for every number, safety orange on the one thing you must not miss. It fills the viewport, keeps its landmarks still, updates values in place. Scene: an engineering drawing on a light table; a control room at shift change.
Fits: dashboards, monitoring, ops and incident tooling, logistics, hardware consoles, admin back-office, data-heavy internal tools.
Does not fit: brand campaigns, wellness, editorial, anything meant to be remembered rather than read.

## Faces
- display: same as body at 600 -- headings are small here
- body: Archivo -- variable weight and width; labels at `font-stretch: 75%`, uppercase, +0.06em
- mono: JetBrains Mono -- numbers, IDs, logs, timestamps, tables
- CJK partner: Noto Sans SC, PingFang SC, Hiragino Sans GB -- gothic with grotesk

## Dials
- ratio 1.2, base 0.9375rem
- density 0.8 (0.7 packed for monitoring walls)
- radius 0.125rem (sm 0.0625rem, lg 0.25rem)
- elevation: none on regions; shadow-1 on side panels and menus
- motion mechanical: micro 50ms, base 100ms, enter 150ms; every easing linear; values update in place, nothing pulses

## Base proof
Run dashboard and app-shell. More rows must fit without losing targets, the population must outrank summaries, and landmarks may not move as values change.

## Signature moves
- The status strip: a 1px-ruled bar of live states in mono; always visible, never animated.
- Mono data columns with unit headers and dashed threshold lines; the outlier shows because everything else aligns.
- Narrow-width uppercase labels as the single label device: region headers, table headers, form legends.

## Turns to slop
- Neon terminal: near-black, acid green, scanlines, glow. Light-first steel; if dark, cool trace, orange not green, matte.
- Cyber HUD: corner brackets, hexagons, radar rings. Instruments do not decorate.
- KPI cards replacing the table: summaries above the data, never instead of it.
- Everything a modal: detail and edit belong in a side panel; the table stays visible.

Contract: `industry.css`.
