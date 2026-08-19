---
id: movable-type-forme
name: Movable-Type Forme (活字印刷)
tier: graphic
modes: [persuade, read, experience]
families: [paper, ink, metal]
rating: 3
grain: [product, view, region]
platforms: [web, ios, android]
origin: locked type formes and pulled proof sheets of Chinese movable-type printing, from Bi Sheng's clay types (11th c.) through metal-type shops of the 19th-20th c.
---

# Movable-Type Forme

## Form
A locked rectangular forme where every character sits in its own equal cell of a strict grid, furniture and quoins holding the block square, and a proof sheet pulled from it that carries the grid as faint impressions, ink of uneven weight, and a red proofreader's mark where a sort was wrong.

## Spark
You thumb a sort from the case, drop it into the line, feel it seat against its neighbours, lock the forme with a turn of the key, roll ink across the face, and peel a proof where one inverted character stares back at you upside down.

## System
- Palette/material: proof-paper ground (warm off-white, L 0.96, hue 80), printing ink as the only text color (near-black with a brown trace), vermilion proofreader's red as the single accent, metal gray only for chrome that represents the forme itself.
- Type/composition: one square module for everything: a CJK character is one cell, Latin sets in half-cells, line-height equals the cell, the grid is visible as faint cell rules at 0.06 contrast; headings are the same face at a larger cell multiple (2x, 3x), never a second family; slight ink-weight variance is permitted on display only.
- Topology/navigation: the page is one forme; sections are locked blocks separated by furniture (blank cells, never lines); navigation is a column of set characters down the right edge (vertical-rl) like a folio label; one forme per view, a view change is a new pull.
- Controls/state: a control is a sort in a cell, pressed state is the impression (inset 1px, darker ink), disabled is an unlinked blank sort (outline only), selection is a red proofreader's circle, errors are a red mark in the margin beside the line, loading is the ink not yet pulled (cells present, glyphs at 0.2 opacity).
- Responsive/motion: the module shrinks, never the grid logic: phones set 14-16 cells across; motion is the pull, one vertical reveal of a block at 200ms, and the impression on press; nothing else moves.

## Web leverage
A CSS grid locked to one `--cell` unit with `writing-mode: vertical-rl` for the folio column, `font-variant-east-asian` and `text-spacing-trim` for true square setting, and a `::before` cell-rule layer so the grid is drawn, not faked with borders.

## Translation
Nav is the vertical folio column; lists are lines of set characters with the bullet as a blank cell; tables are the forme's natural state, each datum in its cells, headers set 2x; forms are blanks in the forme (underlined empty cells) filled by the visitor; empty state is an unlocked forme with the furniture showing and one line of red telling what is missing. Sits best on classical (it supplies the paper warmth and serif body) or default (quiet chrome); the world supplies the module grid, the folio nav, the impression states, and the single red.

## Risks
Costume: a woodblock texture and "stamped" filters without the cell grid; fake ink bleed on every glyph. Fails where density must exceed one datum per cell (dense ops tables) and for audiences who read no CJK, where the grid can read as a spreadsheet unless Latin is set in true half-cells. Slop if the red is used for anything beyond proof marks, or if the grid rules are made visible at high contrast.
