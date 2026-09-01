# teletext -- eight fixed colors on black

Provenance: BBC Ceefax pages, 1980s-2000s, as displayed on a CRT: the
eight teletext colors (black, red, green, yellow, blue, magenta, cyan,
white) at full saturation, phosphor-softened. Set by eye against
captures; dark-only.

## The irregularity

A palette with no ramp at all: eight fixed colors, no tints, no
steps. Hierarchy is done by which color, double height, and
background blocks. The "black" is CRT black (a dark blue-gray, 250),
the "white" is phosphor white (slightly cool, 220). The colors are
not perceptually equal -- yellow is far brighter than blue -- and
that inequality is the grammar: yellow headlines, cyan body, green
for good, red for bad.

## Inks

```
crt black    oklch(0.160 0.010 250)     --bg
block        oklch(0.200 0.010 250)     --surface        (a background block, same black)
block 2      oklch(0.250 0.012 250)     --surface-2
white        oklch(0.930 0.010 220)     --fg
cyan         oklch(0.850 0.120 200)     --fg-2           (body text on Ceefax is cyan)
dim          oklch(0.600 0.020 230)     --fg-3
rule         oklch(0.300 0.010 250)     --line
rule strong  oklch(0.450 0.015 250)     --line-strong
yellow       oklch(0.900 0.180 100)     --accent         (headlines, page numbers)
yellow block oklch(0.330 0.060 100)     --accent-soft
green        oklch(0.820 0.220 145)     --ok
red          oklch(0.600 0.240 28)      --danger
magenta      oklch(0.650 0.250 330)     --warn / --info alt
blue         oklch(0.450 0.220 265)     --info
```

## Must not become

Neon-terminal: no glow, no scanlines, no grid overlay. The colors are
flat and the layout is a 40x24 character cell grid; the moment the
type is not on the grid it is a costume.
