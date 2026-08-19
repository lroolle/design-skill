---
id: teletext-page-grid
name: Teletext Page Grid
tier: interaction
modes: [read, operate, experience]
families: [crt-screen, broadcast, cell-grid]
rating: 2
grain: [product, view]
platforms: [web, ios, android]
origin: Ceefax (BBC, 1974-2012) and ORACLE/Teletext UK, and European teletext services; 40x24 character pages, three-digit page numbers, Fastext colored keys
---

# Teletext Page Grid

## Form
A black screen of 40 columns by 24 rows of chunky block characters in seven saturated colors, every service a three-digit page number, a header row with the page, service and clock, and four colored words on the bottom row that are the only navigation.

## Spark
You type 302, the rows paint in from the top as the page cycles round, and the football scores land in yellow on black exactly where they were yesterday.

## System
- Palette/material: a broadcast-black ground: the one world that argues for the darkest floor the material allows (render it at the token file's dark --bg, L 0.12-0.14, never #000, so halation and dead neutrals stay out), the seven broadcast colors (white, yellow, cyan, green, magenta, red, blue) at full saturation as text and block graphics, no tints, no anti-aliasing.
- Type/composition: one fixed cell grid, a bitmap-feel mono face, headings as double-height rows, block-graphic rules drawn from cells; everything aligns to the cell, column widths are counts.
- Topology/navigation: pages by number, sub-pages cycling in sequence, the four Fastext colors as four fixed next-page links, an index page at 100; movement is typing a number or pressing a color.
- Controls/state: a loading page paints row by row; a missing page shows the header with "page not found"; a live value updates its cells; selection is a cell inverted; no hover exists.
- Responsive/motion: the 40x24 grid scales whole to fit width, never reflows; motion is row-by-row paint and sub-page cycle, and reduced motion paints at once.

## Web leverage
A `ch`-and-`lh` locked CSS grid with a real bitmap web font, block graphics as a sextant glyph set, and page routing by number in the URL so every page is addressable.

## Translation
Nav is the index page and the four colored words. A list is a numbered page of rows; a table is columns counted in cells; a form is a row of fields filled cell by cell. Empty state is a page header with one row of text. Sits on industry (cell grid, mono, mechanical) or nocturnes (dark, one bright accent); the language supplies chrome outside the grid, the world supplies the cell law, the seven colors, page numbers, and Fastext navigation.

## Risks
Costume: a mono font and colored text over a normal responsive page. Fails for long prose, photography, and dense forms. Slop when it becomes "retro terminal" with CRT scanline filters and glow, or when the cell grid is abandoned the moment content gets awkward.
