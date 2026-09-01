# organic -- humanist warm

The hand-made one. Warm oat ground, brown-black ink, a moss accent, a calligraphic serif over a humanist sans from the same hand, one radius, soft lines and tone steps, motion with a little weight. Scene: a kitchen table in morning light; linen, clay, something growing on the sill.
Fits: wellness, food, craft, education, community, hospitality -- anything whose promise is care.
Does not fit: dense operations tools, fintech, monitoring; warmth on a control panel reads as imprecision.

## Faces
- display: Alegreya 600 -- calligraphic old-style, low contrast, never a fashion serif
- body: Alegreya Sans -- one superfamily: serif x sans on structure
- mono: JetBrains Mono -- order numbers, dates in tables
- CJK partner: PingFang SC, Hiragino Sans GB, Noto Sans CJK SC for body; Noto Serif SC under display

## Dials
- ratio 1.333, base 1.0625rem
- density 1.1
- radius 0.5rem (sm 0.25rem chips and inputs, lg 1rem images and overlays)
- elevation: warm-tinted, subtle; shadow-1 on hover and popovers, shadow-2 overlays; nothing floats at rest
- motion weighted: micro 120ms, base 250ms, enter 400ms; `--ease-spring` `cubic-bezier(0.34, 1.3, 0.64, 1)` on one brand element per view

## Signature moves
- The hand-drawn rule: one SVG stroke with a slight waver as section divider; once per page.
- Layered paper: rhythm from `--bg` -> `--surface` -> `--surface-2`, sheets on a table.
- Round against square: rounded photo masks (`[data-mask]`) against square-set serif type.

## Turns to slop
- Wellness beige: all cream, low-contrast brown text. Warmth lives in ground and accent, not text.
- Blobs, mesh, clip art: leaf illustrations, emoji icons, pastel pills. One of each: illustration style, icon set, radius.
- Bounce everywhere: spring on one hero element on a brand surface; ease-out elsewhere.
- Cream + serif + terracotta: one hue away. Moss, plum or ochre accent, never terracotta; no italic hero, no mono microlabels.

Contract: `organic.css`.
