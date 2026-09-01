# nocturnes -- dark-first

The night one. Blue-grey grounds with a visible tint, gold as sparks rather than fills, one light source per view, surfaces stepping lighter as they rise. Dark-first by contract: the identity lives in `[data-theme="dark"]`. Scene: a river at night in a painting; fog, gaslight, one gold spark on the water.
Fits: music, film, events, games, pro creative tools, automotive, anything seen in a dark room.
Does not fit: long-form reading, forms-heavy admin, print, daytime utility -- ship those on the light theme.

## Faces
- display: Schibsted Grotesk 700 -- crisp cuts, tight in bold
- body: same family; dark runs `--weight-body` 450 and `--tracking-body` 0.005em (light-on-dark compensation), light 400 and 0
- mono: JetBrains Mono -- timestamps, durations, BPM
- CJK partner: PingFang SC, Hiragino Sans GB, Noto Sans CJK SC -- gothic partner

## Dials
- ratio 1.333, base 1rem
- density 1
- radius 0.375rem (sm 0.1875rem, lg 0.75rem overlays)
- elevation: surface lightness carries elevation; shadow-1 is an inset top highlight plus a soft neutral drop, shadow-2 deeper; no glow except focus and accent hover
- motion deliberate: micro 150ms, base 300ms, enter 500ms; crossfades, no bounce

## Signature moves
- One light source: a single radial gradient anchoring the hero (`[data-light-source]`); everything else matte.
- Gold sparks: accent as points, never areas -- a dot, an underline, a date, the one CTA.
- The mist band: a full-width `--surface` step as the page's rhythm instead of gaps or rules.

## Turns to slop
- Neon on black: saturated green, cyan or magenta on neutral near-black. Tinted mid-deep darks, gold.
- Purple gradient on dark: hue 270-290 anywhere in ground or accent is the AI reflex.
- Glass and glow: backdrop-blur cards, glowing borders, glow on every hover. Matte; elevation by lightness.
- The dark SaaS template: dotted grid, spotlight cursor, gradient-border cards, three feature tiles.

Contract: `nocturnes.css`.
