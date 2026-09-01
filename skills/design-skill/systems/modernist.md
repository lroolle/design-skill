# modernist -- Swiss grid

The International Style on a screen: a strict grid, one grotesk family carrying every role, near-achromatic ground with a cool trace, one signal color per view. Hierarchy comes from scale and position; the headline is the picture, the whitespace the frame. Scene: a white gallery wall, one red word.
Fits: studios, portfolios, architecture, fashion, museums, manifestos, brand surfaces of quiet products.
Does not fit: dense product tools (unless `--density: 1`), warm or cozy brands, anything handmade.

## Faces
- display: Switzer 700, tracking -0.03em -- same family; display is scale, not a second voice
- body: Switzer -- self-host; two weights per page, never four
- mono: JetBrains Mono -- content numbers only: dates, prices, specs
- CJK partner: Noto Sans SC, Source Han Sans SC, PingFang SC -- a plain wide gothic for a grotesk

## Dials
- ratio 1.5, base 1.0625rem
- density 1.25 brand, 1 product
- radius 0 (sm 0, lg 0)
- elevation: flat -- no shadows, texture or gradients; shadow-1 only where a dialog must part from a photo
- motion snappy: micro 100ms, base 180ms, enter 250ms; navigation cuts; one hero moment per site

## Base proof
Run landing and portfolio. Scale, void, and one signal must reorganize attention; if only the red changes, the contract failed.

## Signature moves
- The headline as image: display at 4xl and above, hard left rag, where a hero photo would sit.
- The asymmetric grid with one void: 8/4 or 7/5 spans, one region left empty on purpose.
- The single red element: one rule, word or button per view; everything else grey scale.

## Turns to slop
- "Awwwards Swiss": giant text, tiny mono metadata, 01/02/03 markers. Numbers only when they are content.
- The tile grid: twelve identical cells. Vary spans, leave the void.
- Red creep: two red elements per view is a sale banner. Count them.
- Vermilion on black: a neutral L 0.05 ground with full-chroma red. Dark keeps the cool trace at L 0.13-0.15.

Contract: `modernist.css`.
