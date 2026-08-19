---
id: split-flap-departure-board
name: Split-Flap Departure Board
tier: interaction
modes: [operate, read, experience]
families: [enamel-flap, hall-signage, mechanical]
rating: 3
grain: [view, region]
platforms: [web, ios, android]
origin: Solari di Udine electromechanical departure boards, railway and airport halls, 1950s-2000s, Italy and worldwide
---

# Split-Flap Departure Board

## Form
A black matte board of fixed-width character cells, each a stack of hinged flaps, arranged in rigid rows of time, destination, platform and remark, where the whole hall reads the same grid from forty meters and every change is heard before it is seen.

## Spark
You look up as the 17:42 row starts to clatter, flaps cascading through letters until DELAYED settles into the remarks column, and you know without reading the rest that your evening has changed.

## System
- Palette/material: matte near-black enamel as ground, flap-white and flap-yellow lettering as the only inks, one amber or red remark color held for status, no gradients and no glow; the grid's cell seams are part of the palette.
- Type/composition: one condensed uppercase grotesk per cell, every character in its own fixed cell, columns left-aligned by field with times in the leftmost column and remarks last; no variable-width text anywhere on the board.
- Topology/navigation: rows are records sorted by time, columns are fields, paging is the board replacing a full page of rows at once; a detail view is a row expanding into its own smaller board, never a modal.
- Controls/state: a value changing flips through intermediate glyphs then settles; pending is an empty cell row, cancelled is the row in the status color, stale is a row that has stopped refreshing and says so in its remark cell.
- Responsive/motion: narrow screens drop columns from the right (remark, then platform) and keep time plus destination; motion is only the flip, exponential settle, never on load for the whole board, and reduced motion cuts to the final glyph.

## Web leverage
A CSS-grid of `ch`-locked cells with per-character 3D flip transitions driven by a diff of old and new strings, so only the cells that changed animate and a screen reader gets the settled row.

## Translation
Nav is the board header: a short row of fields you can re-sort. Lists are boards; tables are the board itself with units in headers. Forms are a single row being edited cell by cell with the flip as commit feedback. Empty state is a board with one row reading NO DEPARTURES in the status color. Sits on industry (cell grid, mono data, mechanical motion) or nocturnes (dark hall, one amber accent); the language supplies tokens and chrome, the world supplies the cell grid, the flip, and the column discipline.

## Risks
Costume: a flip animation pasted on a normal table, or the whole page flipping on load. Fails when records have long free text (cells truncate) or when rows exceed a screenful (boards page, they do not scroll). Slop when the board becomes a hero gimmick with lorem destinations and the real product below looks nothing like it.
