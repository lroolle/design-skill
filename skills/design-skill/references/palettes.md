# Palettes

Palette cards: the seven system palettes (values identical to
`assets/tokens/<system>.css`) and a set of named coordinates for
re-seeding. A card is a coordinate to react to, not an answer -- pick
one, run it through the recipe in color.md, verify contrast, and the
result is yours. Card values are OKLCH `L C H`; light theme unless the
card says dark-first.

Card format: feel; seed hue + neutral tint; strategy; eight core
tokens (light); the four that move most in dark; semantic hues; which
systems it fits; the reflex it must not become.

## System palettes

### default -- ink and paper

Quiet, warm ground, cool mark. Seed 75 warm, neutral C 0.005-0.010.
Restrained.

```
bg 0.985 0.005 75   surface 0.965 0.006 75   fg 0.18 0.010 75   fg-2 0.42 0.010 75
line 0.88 0.008 75  accent 0.45 0.10 250     accent-fg 0.985 0.005 75   accent-soft 0.94 0.02 250
dark: bg 0.14 0.008 75   surface 0.17 0.009 75   fg 0.92 0.006 75   accent 0.72 0.09 250
semantic: ok 150 / warn 75 / danger 25 / info 250
```
Fits: default (and any product surface). Must not become: framework
gray (seed trace dropped), blue SaaS (accent creep).

### modernist -- white wall, one red word

Near-achromatic with a cool trace; one signal color. Seed 250, neutral
C 0.003-0.006. Committed on brand via the single red element;
restrained on product.

```
bg 0.975 0.003 250  surface 0.955 0.004 250  fg 0.13 0.005 250  fg-2 0.40 0.006 250
line 0.86 0.005 250 accent 0.55 0.21 28      accent-fg 0.975 0.003 250  accent-soft 0.94 0.03 28
dark: bg 0.14 0.005 250  surface 0.17 0.006 250  fg 0.93 0.004 250  accent 0.62 0.17 28
semantic: ok 150 / warn 75 / danger 25 (kept apart from accent by L and C) / info 250
```
Fits: modernist. Must not become: vermilion-on-black (keep the dark
ground at L 0.14 with its trace, accent C 0.17), red as a theme.

### classical -- oxblood library

Warm paper, warm ink, a deep red mark. Seed 80 warm (ink shifted to
60), neutral C 0.008-0.015. Restrained.

```
bg 0.975 0.008 80   surface 0.955 0.010 80   fg 0.20 0.015 60   fg-2 0.44 0.014 60
line 0.87 0.010 80  accent 0.42 0.12 20      accent-fg 0.975 0.008 80   accent-soft 0.94 0.02 20
dark: bg 0.16 0.010 60   surface 0.19 0.011 60   fg 0.90 0.008 80   accent 0.72 0.10 25
semantic: ok 160 / warn 75 / danger 25 (hotter and lighter than accent) / info 250
```
Fits: classical, broadsheets (re-seeded). Must not become: cream +
high-contrast serif + terracotta (oxblood is darker and redder; body
stays serif; no kickers).

### industry -- steel and safety orange

Light cool steel, one safety color. Seed 230 cool, neutral C
0.004-0.012. Restrained; the accent is a signal, used once per view.

```
bg 0.975 0.004 230  surface 0.955 0.005 230  fg 0.20 0.012 230  fg-2 0.45 0.010 230
line 0.87 0.008 230 accent 0.63 0.19 45      accent-fg 0.15 0.010 230   accent-soft 0.95 0.03 45
dark: bg 0.16 0.008 230  surface 0.19 0.009 230  fg 0.90 0.006 230  accent 0.72 0.17 50
semantic: ok 150 / warn 80 / danger 25 / info 240
```
Fits: industry, default (dense re-seed). Must not become: neon
terminal, near-black + acid green, orange paired with cream and serif.

### organic -- moss and oat

Oat ground, brown ink, moss mark. Seed 90 warm (ink at 60), neutral C
0.012-0.020. Restrained; committed via a drenched tone step on brand.

```
bg 0.975 0.012 90   surface 0.955 0.012 90   fg 0.24 0.020 60   fg-2 0.46 0.018 60
line 0.86 0.014 90  accent 0.46 0.09 145     accent-fg 0.975 0.012 90   accent-soft 0.93 0.03 130
dark: bg 0.17 0.012 70   surface 0.20 0.012 70   fg 0.92 0.010 85   accent 0.72 0.09 145
semantic: ok 150 (same family as accent, lighter and more saturated) / warn 75 / danger 25 / info 230
```
Fits: organic. Must not become: wellness beige (contrast too low),
cream + serif + terracotta (the accent is green, never clay).

### nocturnes -- gaslight (dark-first)

Blue-grey mist with a visible tint, gold sparks. Seed 235, neutral C
0.020-0.030 on darks. Restrained: gold on under 5% of any view.

```
dark (the default theme):
bg 0.15 0.025 235   surface 0.19 0.025 235   fg 0.91 0.010 80   fg-2 0.68 0.012 235
line 0.28 0.020 235 accent 0.80 0.13 85      accent-fg 0.15 0.025 235   accent-soft 0.28 0.05 85
day theme: bg 0.96 0.012 235  surface 0.94 0.012 235  fg 0.18 0.030 235  accent (brass) 0.52 0.12 70
semantic: ok 150 / warn 60 (amber, away from gold) / danger 20 / info 235
```
Fits: nocturnes. Must not become: purple gradient on dark, neon on
black, near-black + acid green or vermilion, glassmorphism.

### broadsheets -- newsprint

Near-white paper, ink, an editorial red signal. Seed 80, neutral C
0.004-0.008. Restrained: red under 5% (kickers, live tags, one CTA).

```
bg 0.985 0.004 80   surface 0.965 0.005 80   fg 0.16 0.008 80   fg-2 0.42 0.008 80
line 0.86 0.006 80  accent 0.50 0.19 25      accent-fg 0.985 0.004 80   accent-soft 0.95 0.03 25
dark: bg 0.15 0.006 80   surface 0.18 0.006 80   fg 0.92 0.005 80   accent 0.70 0.16 25
semantic: ok 150 / warn 75 / danger 25 (shares the accent hue; danger only in forms and destructive steps) / info 250
```
Fits: broadsheets, classical (re-seeded). Must not become: hairline
costume on non-editorial content, red as a theme, Medium-clone gray.

## Coordinate palettes for re-seeding

Named starting points that are not any system's default. Use them to
re-seed a system for identity; the recipe in color.md fills in the
rungs.

### slate and brass

Cool slate ground, warm brass mark -- the cool/warm contrast of ink
and paper, inverted. Seed 240 cool, C 0.006. Restrained.

```
bg 0.98 0.004 240   surface 0.96 0.005 240   fg 0.17 0.012 240   fg-2 0.42 0.010 240
line 0.87 0.008 240 accent 0.52 0.12 70      accent-fg 0.98 0.004 240   accent-soft 0.94 0.03 75
dark: bg 0.15 0.012 240  surface 0.18 0.012 240  fg 0.91 0.006 240  accent 0.78 0.12 80
semantic: ok 150 / warn 70 (kept lighter than accent) / danger 25 / info 240
```
Fits: default, industry, nocturnes (day). Must not become: navy and
gold (finance reflex) -- keep the slate light and the brass muted, not
saturated gold on navy.

### sea glass

Pale green-blue ground, deep teal mark. Seed 190, C 0.008. Restrained.
Handle with care: teal + white is the healthcare reflex; this only
works with a warm ink and a non-white ground.

```
bg 0.975 0.008 190  surface 0.955 0.010 190  fg 0.20 0.015 200   fg-2 0.44 0.012 200
line 0.87 0.010 190 accent 0.45 0.09 195     accent-fg 0.975 0.008 190  accent-soft 0.93 0.03 190
dark: bg 0.15 0.015 200  surface 0.18 0.015 200  fg 0.91 0.008 190  accent 0.74 0.09 190
semantic: ok 150 (kept apart from accent by hue and L) / warn 75 / danger 25 / info 240
```
Fits: organic, default. Must not become: teal + white clinic.

### plum and linen

Linen ground, plum mark. Seed 85 warm, C 0.010. Restrained; committed
via a plum band on brand.

```
bg 0.975 0.010 85   surface 0.955 0.011 85   fg 0.22 0.018 50   fg-2 0.45 0.015 50
line 0.87 0.010 85  accent 0.42 0.11 330     accent-fg 0.975 0.010 85   accent-soft 0.94 0.03 330
dark: bg 0.16 0.012 60   surface 0.19 0.012 60   fg 0.92 0.008 85   accent 0.72 0.10 330
semantic: ok 150 / warn 75 / danger 25 / info 250
```
Fits: organic, classical. Must not become: pastel lavender SaaS (the
plum is deep, L 0.42, not a tint).

### graphite and signal yellow

Warm graphite ground (dark-first), one hazard-yellow signal. Seed 60,
C 0.008 on darks. Restrained; the yellow is a mark, never a fill.

```
dark (default): bg 0.16 0.008 60   surface 0.19 0.008 60   fg 0.90 0.006 70   fg-2 0.68 0.008 70
line 0.28 0.010 60  accent 0.85 0.16 90      accent-fg 0.16 0.008 60    accent-soft 0.26 0.05 90
light: bg 0.975 0.005 70  surface 0.955 0.006 70  fg 0.18 0.010 60  accent (ochre) 0.58 0.14 80
semantic: ok 150 / warn 70 (kept darker than accent) / danger 25 / info 240
```
Fits: industry (control room), nocturnes (re-seed). Risky: yellow on
dark drifts toward the near-black + acid accent look if the ground
loses its warm trace or the accent turns green (hue < 100). Keep hue
85-95 and the ground at L 0.16.

### bottle green and cream

Warm cream ground, deep bottle-green mark. Seed 85, C 0.010.
Restrained.

```
bg 0.975 0.010 85   surface 0.955 0.011 85   fg 0.20 0.014 70   fg-2 0.44 0.012 70
line 0.87 0.010 85  accent 0.40 0.08 160     accent-fg 0.975 0.010 85   accent-soft 0.93 0.03 160
dark: bg 0.15 0.012 160  surface 0.18 0.012 160  fg 0.91 0.008 85   accent 0.72 0.09 160
semantic: ok 150 (L 0.55, C 0.12: lighter and brighter than accent) / warn 75 / danger 25 / info 250
```
Fits: classical, organic, broadsheets. Must not become: cream +
serif + terracotta (the mark is green) or the heritage-bank reflex
(no gold, no crest).

### ember on ink

Warm near-black ground, ember mark (dark-first). Seed 40, C 0.010 on
darks. Restrained; one light source allowed.

```
dark (default): bg 0.15 0.010 40   surface 0.18 0.010 40   fg 0.91 0.008 60   fg-2 0.68 0.010 50
line 0.28 0.012 40  accent 0.78 0.14 60      accent-fg 0.15 0.010 40    accent-soft 0.26 0.05 55
light: bg 0.975 0.008 60  surface 0.955 0.009 60  fg 0.18 0.012 40  accent 0.55 0.15 45
semantic: ok 150 / warn 80 (kept lighter and yellower than accent) / danger 20 / info 240
```
Fits: nocturnes (re-seed), industry (dark). Must not become: orange
neon on black -- the ember is L 0.78 and matte, the ground carries
warmth; and in light mode, not cream + terracotta (pair with a sans).

### cobalt and chalk

Chalk ground, one committed cobalt. Seed 250, C 0.004. Committed on
brand (cobalt bands), restrained on product.

```
bg 0.98 0.004 250   surface 0.96 0.005 250   fg 0.15 0.010 250   fg-2 0.42 0.008 250
line 0.87 0.006 250 accent 0.48 0.17 262     accent-fg 0.98 0.004 250   accent-soft 0.93 0.04 262
dark: bg 0.14 0.008 250  surface 0.17 0.009 250  fg 0.92 0.005 250  accent 0.74 0.13 262
semantic: ok 150 / warn 75 / danger 25 / info (= accent band, L 0.55 C 0.08)
```
Fits: modernist, default. Risky: hue 262 at C 0.17 sits one step from
the indigo/violet default of every UI framework. Hold the hue at
255-265, never 270+; never gradient it; chalk ground, never dark.

## Making a card for a new palette

1. Name it after two materials (ground and mark), not a mood.
2. Pick the seed hue and the neutral tint; set neutral chroma by how
   much the ground should show its hue (0.004 crisp, 0.012 warm).
3. Name the strategy before touching the accent.
4. Run the lightness ladder from color.md for the eight core tokens;
   write the accent at a fillable L (0.42-0.55) or a mark-only L
   (0.60-0.85) and choose accent-fg to clear 4.5:1.
5. Derive the dark four: ground at L 0.14-0.17 with the trace, accent
   lifted and desaturated.
6. Place semantic hues in their bands; move any that collide with the
   accent apart by L and C, and write down the rule.
7. Verify every text pair; list which systems it fits.
8. Name the reflex it must not become -- the domain cliche or the AI
   look it sits nearest -- and the one rule that keeps it away.
9. Render it in `assets/specimen.html` before adopting it.
10. If it is only a hue swap of an existing card, it is a re-seed, not a
    new card; do not add it.
