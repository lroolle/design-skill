---
id: sewing-pattern-sheet
name: Sewing Pattern Sheet
tier: atmosphere
modes: [operate, experience, persuade]
families: [tissue-paper, printed-line, workroom]
rating: 2
grain: [flow, view]
platforms: [web, ios, android]
origin: Printed tissue pattern sheets and instruction leaflets from Butterick, McCall's, Vogue and Burda, 1920s onward; nested size lines, grain arrows, notches, cutting layouts
---

# Sewing Pattern Sheet

## Form
A large tissue sheet crowded with overlapping garment pieces outlined in nested size lines, each piece carrying a number, a grain arrow, notches, dots and a "cut 2" instruction, and a leaflet that shows which pieces lie on the folded fabric and how.

## Spark
You trace size 12 around piece 7, line the grain arrow up with the selvedge, clip the notches, and the flat tissue suddenly promises a sleeve.

## System
- Palette/material: pale tissue or kraft ground, black printed outlines with sizes as nested dashed and solid line styles, red or blue for one set of marks (grain arrows or fold lines), no fills; fabric and notions appear only as flat photographs on the leaflet.
- Type/composition: piece numbers large in a plain sans inside each piece, instructions small along edges rotated to the piece, size keys and the cutting layout diagram boxed on the leaflet; pieces nest and overlap deliberately.
- Topology/navigation: pieces are the units, the cutting layout is the map, the leaflet is the ordered sequence of steps; movement is piece to piece or step to step, a detail is one piece with its marks.
- Controls/state: a chosen size bolds its line and greys the others; a piece placed on the layout is filled lightly; a step done is checked on the leaflet; loading is the sheet outlines at one line weight; empty is a blank sheet with the size key only.
- Responsive/motion: the sheet pans and zooms, the leaflet stacks steps; motion is the size line switching and a piece sliding into its layout position, short, reduced motion cuts.

## Web leverage
SVG pattern pieces with per-size path variants toggled by one control and a draggable cutting-layout canvas that snaps pieces to the grain, with the leaflet as an ordered checklist bound to the same piece ids.

## Translation
Nav is the leaflet steps and the piece index. A list is the pieces list (number, cut count, fabric); a table is the size chart; a form is the size and fabric-width choice that redraws the layout; a flow is the leaflet's steps. Empty state is the blank sheet with the key. Sits on organic (kraft, warm, hand-made) or default; the language supplies warmth and chrome, the world supplies nested-size lines, grain arrows, notches, and the layout map.

## Risks
Costume: dashed lines and a grain arrow as decoration on a page with no pieces or steps. Fails for abstract software with nothing to lay out, and on tiny screens where nested lines blur. Slop when the tissue ground becomes generic cream and the marks become icons, or when the leaflet is a wizard with a progress bar.
