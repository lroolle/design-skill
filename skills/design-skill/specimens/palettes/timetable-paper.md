# timetable paper -- offset stock, carbon ink, pencil rule, seal-paste stamp

Provenance: a 1980s Chinese railway timetable booklet (列车时刻表), open
on a desk; the red carriage stamp on a hard-seat ticket beside it.
Values set by eye, daylight, 1x and 2x. This is the house kit's light
theme (`kit/house/tokens.css`).

## The irregularity

Four materials, four hues. The paper is warm (88); the ink is carbon
black, which is cool (255) -- black ink is never the paper's hue. The
rules were drawn in pencil, graphite, a third warm-gray hue (60), and
they are lighter than a diluted ink would be. The one chroma is
seal-paste cinnabar (32), stamped, so its soft tint is the paper where
the stamp bled, not the red at high lightness.

## Inks

```
paper        oklch(0.960 0.010 88)      --bg
paper toned  oklch(0.935 0.011 88)      --surface        (more chroma when screened, not less)
paper heavy  oklch(0.900 0.012 85)      --surface-2
carbon ink   oklch(0.210 0.010 255)     --fg
half press   oklch(0.450 0.008 250)     --fg-2
faint press  oklch(0.550 0.006 240)     --fg-3           (clears 4.5:1 on paper)
pencil       oklch(0.800 0.006 60)      --line
pencil hard  oklch(0.620 0.008 60)      --line-strong
cinnabar     oklch(0.550 0.190 32)      --accent
bleed        oklch(0.930 0.035 35)      --accent-soft
verdigris    oklch(0.520 0.090 165)     --ok
gamboge      oklch(0.700 0.140 85)      --warn
pen blue     oklch(0.480 0.090 250)     --info
```

Danger is the cinnabar darker and hotter (0.470 0.200 25), used only
in forms and the confirming step; the accent and the danger share a
material on purpose, as the stamp and the void stamp do.

## Must not become

Cream + serif + terracotta: the paper is grayer than cream, the ink
is cooler than any serif page, and the red is a stamp, not an accent
color. Keep the sans; keep the red under 3% of any viewport.
