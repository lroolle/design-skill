---
id: stone-rubbing
name: Stone Rubbing (碑帖拓片)
tier: graphic
modes: [persuade, experience, read]
families: [stone, ink, paper]
rating: 3
grain: [view, region]
platforms: [web, ios, android]
origin: ink rubbings (taben) taken from inscribed stelae and cliff carvings, the model-book tradition from the Han stelae through the Qing epigraphy revival.
---

# Stone Rubbing

## Form
A sheet of black ink with the carved characters left as paper-white negative, the stone's chips and cracks showing as white flaws, a gridded inscription of equal columns, and a small red collector's seal in one corner breaking the monochrome.

## Spark
You tamp the damp paper into the cut strokes with the brush, pat ink over the whole face until the sheet goes black, and lift it to find the inscription glowing white out of the dark, every chip in the stone now a bright scar.

## System
- Palette/material: ink-black ground (L 0.14 with a cool blue-gray trace, never pure black), paper-white text and lines (L 0.93 warm), stone-gray at L 0.30 for secondary chrome, one vermilion seal as the sole accent; no gradients, no glow.
- Type/composition: text in a heavy Song or a kaishu/lishu-flavored serif at large sizes with wide letter-spacing, set in a visible column grid (equal squares), white on black; body copy on inner pages may invert to black on paper, with the rubbing reserved for heads and heroes; headings carry the stone's texture through a subtle white-noise mask, never a bevel.
- Topology/navigation: a view is one stele face; sections are separate stones in a sequence (a gallery of rubbings); navigation is a line of stone titles in white at the top edge, the current one chipped (underlined by a ragged white rule).
- Controls/state: buttons are carved white rectangles on black, pressed state fills the rectangle white with black text (the paper and ink swap), disabled is a faint gray outline like a worn carving, selection is a red seal at the item's corner, errors are a red seal-shaped badge with white text; loading is the ink spreading (a black wipe from one edge at 300ms).
- Responsive/motion: columns reduce from 8 to 3 on a phone but remain squares; motion is the tamp and lift: one wipe reveal per view, 300ms; nothing pulses.

## Web leverage
SVG `mask` or CSS `mask-image` with a grain texture so white strokes carry real stone flaws, `mix-blend-mode` to let text sit in the ink rather than on it, and the View Transitions API for the wipe between stones.

## Translation
Nav is the stone-title line; lists are columns of white entries in the grid; tables become the inscription grid with headers as the top row in larger squares; forms are white-outlined cells on black with a red seal marking the required one; empty state is an uncut stone, a black field with one white line saying what is not yet carved. Sits on nocturnes (dark-first, restraint, one accent) with the world supplying the negative-text logic, the square grid, and the seal; modernist can carry the light inner pages.

## Risks
Costume: a "grunge" texture on a normal dark SaaS page; ink splatter without the negative carving logic. Fails on dense operate surfaces (white-on-black at small sizes tires) and for long reading, which must invert to paper. Slop if glow, bevels, or more than one red enter, or if the stone texture is applied as a background image rather than as the mask that shapes the text.
