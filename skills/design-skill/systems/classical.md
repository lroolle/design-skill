# classical -- book typography

A book, set well, on a screen. One old-style serif carries text and headings; measure, margins and leading do the design; small caps and old-style figures do the emphasis. Warm paper, warm ink, one oxblood accent used like a printer's second color. Scene: a reading room at four in the afternoon; paper, brass, quiet.
Fits: publishing, essays, heritage brands, wine, universities, law, restrained luxury.
Does not fit: dashboards, developer tools, anything dense or fast.

## Faces
- display: same face as body at 500 -- Garamond bold is a whisper heavier, never 800
- body: EB Garamond -- real italics, `onum`, `smcp`
- ui (`--font-ui`): Source Sans 3 -- controls should not read as prose
- mono: Source Code Pro -- citations, ISBNs, code in an essay
- CJK partner: Noto Serif SC, Songti SC for text; `--font-cjk-ui` Noto Sans SC for chrome

## Dials
- ratio 1.333, base 1.125rem
- density 1.15
- radius 0 (sm 0.125rem on inputs only, lg 0)
- elevation: flat -- overlays sit on `--surface` with a 1px line
- motion deliberate: micro 150ms, base 300ms, enter 500ms; a book does not animate

## Signature moves
- Small caps and old-style figures in running text, set the way a printer would.
- The measure: text IS the design; one column, 62ch, margins generous even on a phone.
- One drop cap on the opening paragraph; small caps as the section-label device.

## Turns to slop
- Cream + high-contrast serif + terracotta: serif as costume over a sans body, italic hero. Here the body IS the serif; oxblood, not terracotta; Garamond, not Didone.
- Wedding-invitation drift: script faces, gold, ornaments, centered everything.
- Academic grey: drop the warm paper and it becomes a PDF.
- Broadsheet costume: a grid of hairline boxes holding feature blurbs is not a book.

Contract: `classical.css`.
