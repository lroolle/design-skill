---
id: patent-drawing-sheets
name: Patent Drawing Sheets
tier: graphic
modes: [read, operate, persuade]
families: [paper, line-ink, engineering]
rating: 3
grain: [product, view, region]
platforms: [web, ios, android]
origin: Utility patent drawing sheets to USPTO and EPO drafting rules, late 19th century onward; FIG. numbering, reference numerals, section hatching
---

# Patent Drawing Sheets

## Form
A white sheet of numbered figures drawn in uniform black line, every part tagged with a reference numeral on a leader, section cuts hatched by material, and a specification that explains the drawing by numeral, never by picture.

## Spark
You find part 14 on FIG. 3, follow its leader line to the flange, and read in the text that 14 is the seal that solved the whole problem, and the object makes sense for the first time.

## System
- Palette/material: white paper ground, one black line weight for outlines and a lighter one for leaders and hatching, no fills, no color except an optional single highlight tint on the part under discussion.
- Type/composition: FIG. labels in a plain caps sans below each figure, reference numerals in the same face along leader lines, body text in a serif set in numbered paragraphs; figures fill sheets, text follows on its own pages.
- Topology/navigation: sheets in sequence, figures numbered across sheets, the text indexed by numeral; movement is numeral to figure and back, a detail is an exploded or sectional figure of the same numerals.
- Controls/state: hovering or focusing a numeral highlights its part and its text paragraph; loading shows the sheet frame and FIG. labels; empty is a sheet reading "no figures filed"; error is a numeral with no referent flagged in the highlight tint.
- Responsive/motion: narrow screens stack figure then its paragraphs; numerals stay tappable; motion is only the highlight, instant, and an optional draw-on of one figure at first view.

## Web leverage
Inline SVG figures whose parts carry `data-ref` numerals linked to text anchors, so hover and focus bind drawing and prose both ways with real markup.

## Translation
Nav is the sheet and figure index. A list is the numeral index; a table is the parts list (numeral, name, material). A form is a figure whose editable parts are numbered fields. Empty state is a blank sheet with a FIG. 1 label awaiting content. Sits on default (paper, rules, structure) or industry (line, data, dense) for operate surfaces; the language supplies tokens and UI chrome, the world supplies the numeral system, line discipline, and hatching.

## Risks
Costume: hatching and leaders as texture behind content that is not a drawing. Fails when there is nothing to draw (service with no mechanism) or when line art must carry photography's job. Slop when numerals decorate headings as 01 02 03 markers, or when the drawing is a stock isometric illustration rather than the product's own parts.
