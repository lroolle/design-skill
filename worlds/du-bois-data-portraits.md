---
id: du-bois-data-portraits
name: Du Bois Data Portraits
tier: graphic
modes: [persuade, read, experience]
families: [board, gouache, hand-lettering]
rating: 3
grain: [view, region]
platforms: [web, ios, android]
origin: Hand-drawn statistical plates by W. E. B. Du Bois and Atlanta University students for the Exposition Universelle, Paris 1900
---

# Du Bois Data Portraits

## Form
A board-sized plate where one dataset is drawn as a single bold shape -- a spiral bar, a stacked wedge, a bent line -- in saturated flat color on cream, with a hand-lettered caption that names the fact in full sentences.

## Spark
You stand in front of a plate where a bar runs out of room and folds back on itself in red, and you understand that the number was too large for the page before you read the label.

## System
- Palette/material: cream board ground, flat gouache fields in black, red, green, yellow, blue and brown at full saturation, no tints, no outlines; one plate commits to two or three of those colors and fills areas, never strokes.
- Type/composition: uppercase hand-lettered or a slab-serif caption centered above, data labels in the same small caps along the shapes, generous margin around one dominant figure; composition is one idea filling the plate, not a dashboard.
- Topology/navigation: a series of plates in a fixed order, each the next fact; movement is plate to plate, never scroll within a plate; a comparison is two plates side by side at equal size.
- Controls/state: selecting a segment names its value in the caption line; loading is the plate outline on cream; empty is the caption stating the fact is not yet known; error is the caption rewritten as a sentence about what failed.
- Responsive/motion: plates keep their aspect and scale down whole; captions re-wrap; motion is one fill drawing itself once at first view, never looping, and reduced motion shows it filled.

## Web leverage
SVG paths with stroke-dasharray fill animation for the bent and spiral shapes, with the data bound so the shape's length is the number, not an illustration of it.

## Translation
Nav is the plate index with fact titles. A list is a sequence of plates; a table is one plate per column compared at equal size. A form is a single quantity that redraws its plate live. Empty state is a captioned cream plate with the outline only. Sits best on classical (cream, generous margins, text as design) or modernist (flat, committed color); the language supplies the reading measure and neutrals, the world supplies the one-fact-per-plate rule, the folding shapes, and the full-sentence captions.

## Risks
Costume: the bent bar and saturated colors lifted onto a generic chart library with a legend. Fails on dense multi-series data and on operate surfaces that need many numbers at once. Slop when the captions become short labels, when colors are tinted, or when the plate grid becomes a card grid.
