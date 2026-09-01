# du bois plates -- gouache on board, hand-mixed

Provenance: the statistical plates by W. E. B. Du Bois and Atlanta
University students, Paris 1900, gouache and ink on board (Library of
Congress scans). Set by eye against the scans; the boards have
yellowed, the pigments have not.

## The irregularity

A full palette, and every color is a pigment, not a hue step: the red
is a vermilion (28), the yellow is an ochre-gold (85), the green is a
blue-green (170), the blue is a Prussian (255), the brown is umber
(55), the pink is the red let down with white (20, lighter, less
chroma). They are not equally spaced on a wheel and not at equal
lightness; the plates read as one set because they are all matte
gouache on the same board. Text is ink black, board is cream-yellowed.

## Inks

```
board        oklch(0.930 0.030 88)      --bg
board toned  oklch(0.900 0.032 86)      --surface
board deep   oklch(0.860 0.035 84)      --surface-2
ink          oklch(0.220 0.012 70)      --fg
ink light    oklch(0.450 0.012 70)      --fg-2
ink faint    oklch(0.550 0.010 70)      --fg-3
pencil       oklch(0.780 0.020 86)      --line
ink rule     oklch(0.220 0.012 70)      --line-strong
vermilion    oklch(0.580 0.200 28)      --accent  / series 1
ochre gold   oklch(0.780 0.150 85)      series 2
blue-green   oklch(0.600 0.110 170)     series 3
prussian     oklch(0.400 0.100 255)     series 4
umber        oklch(0.450 0.070 55)      series 5
pink         oklch(0.800 0.090 20)      series 6
```

Strategy: full. Six named series, held in tokens as `--series-1..6`
(extras, documented in DESIGN.md), used only for data. Chrome stays
board and ink.

## Must not become

A "vintage infographic" filter over a modern chart: the plates are
hand-lettered, the bars are cut and spiraled by hand, the data is
real. Reach for this when the data is the argument and the surface
can afford handwork; otherwise isotype.
