# Systems

A system is a material contract: one css file with fixed token names,
component geometry, and a card saying what the css cannot. The css is
the truth. A palette and font swap is not a system; it must visibly
change at least one working base in `../kit/bases/` without changing
that base's protected task.

| System | One line | Reach for it when |
|---|---|---|
| [default](default.md) | paper and ink; quiet, structural, system type | product surfaces, docs, admin, anything without a brand brief |
| [modernist](modernist.md) | Swiss grid, grotesk, one signal color, air | studios, portfolios, architecture, fashion, museums, manifestos |
| [classical](classical.md) | book typography, warm paper, restraint | publishing, essays, heritage brands, wine, universities, law |
| [industry](industry.md) | instrument panel: dense, ruled, mono data, safety accents | dashboards, monitoring, ops, logistics, hardware, admin back-office |
| [organic](organic.md) | humanist, warm, rounded, tactile, hand-made | wellness, food, craft, education, community, hospitality |
| [nocturnes](nocturnes.md) | dark-first, one light source, blue-grey mists and gold sparks | music, film, events, games, pro creative tools, automotive |
| [broadsheets](broadsheets.md) | newsroom hierarchy: hed, dek, columns, hairlines, real photos | news, magazines, newsletters, blogs, changelogs, research |

## Token contract

```
/* surfaces */         --bg  --surface  --surface-2  --overlay
/* text */             --fg  --fg-2  --fg-3
/* lines */            --line  --line-strong
/* accent */           --accent  --accent-hover  --accent-fg  --accent-soft
/* semantic */         --ok  --warn  --danger  --info   (+ --ok-soft etc.)
/* focus */            --focus
/* type faces */       --font-display  --font-body  --font-mono  --font-cjk
/* type scale */       --text-xs  --text-sm  --text-base  --text-lg
                       --text-xl  --text-2xl  --text-3xl  --text-4xl
/* type metrics */     --leading-body  --leading-tight  --tracking-display
                       --measure
/* space */            --space-1 .. --space-12   (unit * scale * density)
/* shape */            --radius  --radius-sm  --radius-lg  --line-w
/* elevation */        --shadow-1  --shadow-2   (tinted to the seed)
/* motion */           --dur-micro  --dur-base  --dur-enter
                       --ease-out  --ease-in-out  --ease-subtle
/* layout */           --container  --container-wide
/* component geometry */ --system-control-height  --system-control-pad
                       --system-panel-fill  --system-panel-border
                       --system-media-radius  --system-label-transform
                       --system-label-tracking  --system-heading-weight
                       --system-row-height  --system-shell-gap
                       --system-rail-size
```

Optional extras a system may add on top, always with a fallback in
app code (`var(--font-ui, var(--font-body))`): `--font-ui` (chrome
face when body is a serif: classical, broadsheets), `--font-cjk-ui`,
`--ease-spring` (organic, brand surfaces only), `--weight-body` /
`--tracking-body` (nocturnes' light-on-dark compensation). Extras are
documented in that system's card and nowhere else.

## Invariants

- OKLCH; palettes come from observed specimens (`specimens/palettes/`) or a world card, then re-inked into a system.
- Every neutral has chroma > 0; both themes authored. Dark is a redesign, never an inversion; never pure black or white.
- Semantic states are tokens, never palette classes.
- `--fg-3` carries text: 4.5:1 against `--bg` (proxy: L <= 0.56 light, >= 0.59 dark).
- One radius; structure before shadow.
- Type pairs on one axis, CJK partner named; `--motion-personality` stated.
- Component geometry is explicit. If two systems produce the same
  controls, regions, rows, labels, rails, and media edges, one is only a
  re-ink and must be deleted.

## Extending

Copy a card and its css.
Define every token.
Differ on two axes, or it is a re-ink, not a system.
Name one affinity base and prove the task survives at 390 and 1440.

## Under a world

On persuade and experience surfaces a world (`decks/worlds/`) sits above and supplies what the page argues; the system supplies tokens and component character. On operate and read surfaces, system plus composition (`decks/compositions/`) often carries the whole surface.
