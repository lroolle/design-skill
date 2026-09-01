# almanac leaf -- newsprint, black, vermilion

Provenance: a daily tear-off almanac page (黄历 / 通胜), Hong Kong or
Guangdong print, 1990s, thin newsprint, two inks. Set by eye against
three leaves; the paper varies by a full step between printers, the
inks do not.

## The irregularity

Two inks only, and the paper is a third thing. The black is not quite
black: cheap letterpress on absorbent stock reads as a dark warm gray
(0.24, hue 70). The vermilion is a printing red, orange-leaning (30),
and it is used at full strength or not at all -- there is no pink tint
on an almanac; "soft red" is the red at 100% on a smaller area. Gray
is the paper showing through a halftone, so `--fg-3` is a screen of
the black, same hue.

## Inks

```
newsprint    oklch(0.950 0.012 82)      --bg
newsprint 2  oklch(0.920 0.013 80)      --surface        (a second sheet behind)
stub         oklch(0.880 0.014 78)      --surface-2      (the torn stubs, older paper)
black        oklch(0.240 0.012 70)      --fg
black screen oklch(0.470 0.010 70)      --fg-2
black light  oklch(0.550 0.008 70)      --fg-3
perforation  oklch(0.780 0.010 78)      --line           (a dotted rule, drawn as dots)
rule         oklch(0.600 0.010 72)      --line-strong
vermilion    oklch(0.560 0.200 30)      --accent         (also the numeral on holidays)
vermilion sm oklch(0.560 0.200 30)      --accent-soft    (same ink, smaller area; or paper 0.94 0.03 35 if a tint is unavoidable)
```

Semantic: the almanac has two states, 宜 and 忌, red and black; that is
the whole semantic set. If a product needs ok/warn, ok is the red
(auspicious), warn is a black rubber stamp across the region.

## Must not become

A big numeral with lunar flavor text on a SaaS card. The dense
two-column grid under the numeral is the world; the red as a brand
color is the costume.
