# classical -- book typography, warm paper, restraint

## 1. Identity

A book, set well, on a screen. One old-style serif carries the text
and the headings; the measure, the margins, and the leading do the
design; small caps and old-style figures do the emphasis. Warm paper,
warm ink, one dark accent used the way a printer used a second color
-- rarely, and always meaning something. Nothing here is fast, and
that is the point: this system asks the reader to sit down.

Scene: a reading room at four in the afternoon; paper, brass, quiet.

Fits: publishing, essays, long-form personal sites, heritage brands,
wine and spirits, universities, law and finance heritage, book
stores, restrained luxury.

Does not fit: dashboards, developer tools, anything dense or fast.
A settings page in Garamond is a costume; the product surface behind
a classical brand surface uses `default`.

Anchors (mechanism, not skin): a well-printed trade paperback -- one
column, 62 characters, running heads, folios; a university press
website where the essay is the page; a wine estate's site where the
label typography sets the whole tone and the photography is warm.

## 2. Color

Seed hue 80 (warm paper), ink at hue 60. Strategy **restrained**:
paper, ink, hairlines, and one accent -- oxblood oklch(0.42 0.12 20),
darker and redder than any terracotta -- on links, the primary
action, and small-caps section labels.

| Token | Light | Dark |
|---|---|---|
| --bg | oklch(0.975 0.008 80) | oklch(0.16 0.010 60) |
| --surface | oklch(0.955 0.010 80) | oklch(0.19 0.011 60) |
| --surface-2 | oklch(0.925 0.012 80) | oklch(0.23 0.012 60) |
| --fg | oklch(0.20 0.015 60) | oklch(0.90 0.008 80) |
| --fg-2 | oklch(0.44 0.014 60) | oklch(0.70 0.010 80) |
| --fg-3 | oklch(0.58 0.012 60) | oklch(0.56 0.010 80) |
| --line | oklch(0.87 0.010 80) | oklch(0.28 0.012 60) |
| --line-strong | oklch(0.74 0.012 80) | oklch(0.38 0.014 60) |
| --accent | oklch(0.42 0.12 20) | oklch(0.72 0.10 25) |
| --accent-soft | oklch(0.94 0.02 20) | oklch(0.25 0.04 20) |
| --ok / --warn / --danger | hue 155 / 80 / 25 at C 0.09-0.14 | same hues, L +0.16, C -0.02 |

Re-seed options that keep the mechanism: bottle green oklch(0.40
0.08 160), lapis oklch(0.42 0.12 260). Dark mode is leather, not
night: warm dark ground at hue 60, text at L 0.90, accent lifted.
Semantic colors appear only in validation and status; the page has no
badges. Charts: ink, two greys, one accent -- annotated, not colored.

## 3. Type

| Role | Face | Notes |
|---|---|---|
| display | EB Garamond 500-600, tracking 0 to -0.005em | same face as body; Garamond bold is a whisper heavier, never 800 |
| body | `"EB Garamond", "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif` | OFL, variable, real italics; `onum` in prose, `smcp` for small caps |
| UI chrome | `"Source Sans 3", system-ui, sans-serif` | buttons, inputs, nav labels, table headers -- a humanist sans keeps controls from looking like prose |
| mono | `"Source Code Pro", ui-monospace, Menlo, monospace` | rare: citations, ISBNs, code in an essay |
| CJK | `"Noto Serif SC", "Source Han Serif SC", "Songti SC", serif` for text; `"Noto Sans SC", "PingFang SC"` for chrome | a literary alternative for zh: LXGW WenKai (OFL) |

Ratio 1.333 (1.414 on brand surfaces); base 1.125rem (18px); body
leading 1.6; measure 62ch. Small caps tracked +0.06em. Old-style
figures in running text, lining and tabular figures in tables.
Italic is the emphasis in prose; weight is the emphasis in chrome.

## 4. Space and density

Unit 4px scale, density 1.15. Generous margins: prose in a single
column of 62ch, with a marginal column for notes and figures on wide
screens (grid 8/4). Section gap 3-4x the paragraph gap. Container
64rem; wide 80rem for galleries.

## 5. Shape and surface

Radius **0**; `-sm` 2px permitted on inputs only. Line 1px hairlines;
a centered 1px rule (short, `--line-strong`) divides sections.
Elevation flat, no shadows; overlays sit on `--surface` with a 1px
line. Optional paper texture at 0.02 opacity on brand surfaces only,
never behind a form.

## 6. Motion

Personality **deliberate** and minimal: micro 150ms, base 300ms,
enter 500ms, `--ease-in-out` for state, `--ease-out` for the one
page fade. Budget: page fade on load, hover on links, overlays. No
scroll reveals, no stagger, no parallax -- a book does not animate.

## 7. Imagery and icons

Photography warm-toned or duotone in ink and paper; engraving,
etching, or single-weight line illustration; woodcut initials if the
brand earns them. Icons: Phosphor thin at 1.25, or none -- text
labels do the work. Data viz editorial: annotated directly, lining
serif numerals, hairline axes, one accent series.

## 8. Components

- Buttons: rectangular, Source Sans 3 500, sentence case (small caps
  in Garamond for a brand-surface primary), 1px `--line-strong`;
  filled `--accent` only for the one primary per view; height 40px.
- Inputs: 1px box, `--radius-sm`, Source Sans 3; label above in
  small caps `--fg-2`; focus 2px `--focus` outline.
- Navigation: a masthead in Garamond, a 1px rule, then a single row
  of text links; current item in `--accent`, no pills, no bars.
- Tables: hairline rules, Source Sans 3 headers, lining tabular
  figures, no zebra.
- Cards: none. Content lives in the column; a boxed group is a
  sidebar note with a top rule.
- Pull quotes hang into the margin, Garamond italic, no quote marks
  as decoration.
- Overlays: a centered `--surface` plane, 1px line, `--radius` 0.

## 9. Signature moves

1. **Small caps and old-style figures in running text** -- names,
   acronyms, and numbers set the way a printer would set them.
2. **The measure** -- text IS the design: one column, 62ch, generous
   margins that stay generous on a phone.
3. **One drop cap** on the opening paragraph (the masthead device);
   small caps as the section-label device. Nothing else.

## 10. Voice

Complete sentences. No fragments, no exclamation, no lists where a
paragraph would do. Unhurried and precise. Buttons still carry verbs
("Read the essay", "Reserve a table"); labels are nouns.

## 11. Where it turns to slop

- **The cream + high-contrast serif + terracotta look (current AI
  look).** The tell is serif-as-headline-costume over a sans body,
  an italic hero, terracotta buttons, mono microlabels, hairline
  boxed cards. Sidestep: the body IS the serif; the accent is
  oxblood, not terracotta; no italic hero; no uppercase kickers or
  mono labels; Garamond and old-style, not Didone, Playfair, or
  Cormorant.
- **Wedding-invitation drift.** Script faces, gold, ornaments,
  centered everything. One serif, left-aligned text, no ornament.
- **Academic grey.** Drop the warm paper and it becomes a PDF.
  Neutrals keep C 0.008-0.015 at hue 80.
- **Medium-clone sameness.** Big serif title, avatar row, clap
  button. The measure and the small caps are what make this
  classical rather than a blog theme.
- **Broadsheet costume (current AI look).** Hairlines and zero radius
  are structural in a book column; a grid of hairline boxes holding
  feature blurbs is not a book, it is the tell.

## 12. Tokens

Full file: `assets/tokens/classical.css`. Key values:

```css
:root {
  --bg: oklch(0.975 0.008 80); --fg: oklch(0.20 0.015 60);
  --accent: oklch(0.42 0.12 20); --accent-fg: oklch(0.975 0.008 80);
  --line: oklch(0.87 0.010 80); --radius: 0; --radius-sm: 0.125rem;
  --font-body: "EB Garamond", "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif;
  --font-ui: "Source Sans 3", system-ui, sans-serif;
  --text-base: 1.125rem; --leading-body: 1.6; --measure: 62ch;
  --dur-micro: 150ms; --dur-base: 300ms; --dur-enter: 500ms;
}
```
