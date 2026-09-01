# isotype -- flat ink, four colors, counted pictograms

Provenance: Vienna Method / Isotype charts, Neurath and Arntz,
1925-1934, printed flat colors. Set by eye against reproductions of
the Gesellschaft und Wirtschaft atlas.

## The irregularity

Flat inks with fixed meanings, not a categorical palette: black for
the counted thing, red for the emphasized or the human, blue for
water/transport, green for land/agriculture, and a yellow-brown for
industry. The red is a warm printing red (30); the blue is a mid
cobalt (250) at lower chroma than a screen blue; the green is
yellow-leaning (140). The paper is a cool cream (85, low chroma).

## Inks

```
paper        oklch(0.960 0.008 85)      --bg
paper toned  oklch(0.930 0.009 85)      --surface
paper deep   oklch(0.895 0.010 85)      --surface-2
black        oklch(0.200 0.008 80)      --fg
black 60%    oklch(0.450 0.008 80)      --fg-2
black 40%    oklch(0.550 0.006 80)      --fg-3
rule         oklch(0.810 0.008 85)      --line
rule heavy   oklch(0.200 0.008 80)      --line-strong
red          oklch(0.580 0.190 30)      --accent   / people, emphasis
blue         oklch(0.520 0.120 250)     --info     / water, transport
green        oklch(0.560 0.120 140)     --ok       / land
ochre        oklch(0.700 0.130 80)      --warn     / industry
```

Data viz: one pictogram = one quantity; rows, not scaled sizes;
direct labels; the four inks by meaning, never by series index.

## Must not become

A rainbow categorical palette with icons. The inks mean things; a
fifth series is grouped into one of the four or the chart is not an
isotype.
