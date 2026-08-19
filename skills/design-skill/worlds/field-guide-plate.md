---
id: field-guide-plate
name: Field Guide Plate
tier: graphic
modes: [read, operate, persuade]
families: [paper, gouache-plate, reference-book]
rating: 3
grain: [product, view, region]
platforms: [web, ios, android]
origin: Bird and plant field guides with facing-page plates, arrows to field marks, keys and range maps, Peterson 1934 onward, Collins, Kaufman
---

# Field Guide Plate

## Form
A facing-page system where the right page is a plate of specimens painted at comparable size on a plain ground with small arrows to the marks that tell them apart, and the left page is the key: name, measurements, voice, habitat, and a thumbnail range map per specimen.

## Spark
You flip to the warbler plate, see four near-identical birds with arrows at the wing bar and eye ring, read "9 in." on the facing page, and finally tell them apart.

## System
- Palette/material: plain off-white or pale grey ground on the plate, specimens in full natural color, black arrows and labels; the key page is black text on paper with a two-color range map (breeding, wintering).
- Type/composition: species name bold, Latin in italic, measurements and voice in a small serif in fixed order per entry; plate specimens aligned in rows of comparable items, arrows short and straight; plate and key always at equal height.
- Topology/navigation: families in a fixed taxonomic order, each a plate-plus-key spread; movement is spread to spread, a comparison is the plate itself, a detail is one specimen enlarged with its key entry.
- Controls/state: selecting a specimen bolds its key entry and lights its arrows; a filter greys non-matching specimens on the plate; loading shows empty plate rows and key lines; empty is a plate with the family name and "no specimens"; error is a key entry marked "unconfirmed".
- Responsive/motion: narrow screens stack plate above key with the selected specimen's key pinned; motion is only the highlight and a crossfade between spreads, reduced motion cuts.

## Web leverage
A two-pane layout with `scroll-snap` spreads, specimen images on a shared scale via a known unit per pixel, and arrows as positioned SVG bound to the key entry's anchor.

## Translation
Nav is the family index, a taxonomy. A list is the key page; a table is the key set in columns; a form is a key entry being edited with its specimen beside it. Empty state is the family header with an empty plate. Sits on classical (book typography, paper) or default for operate catalogs (product catalogs, component libraries, SKU comparison); the language supplies measure and type, the world supplies the plate-and-key split, the arrow-to-field-mark device, and comparable-scale rule.

## Risks
Costume: arrows and italic Latin on things that are not comparable specimens. Fails when items cannot be shown at a shared scale or have no distinguishing marks. Slop when the plate is a card grid with images, or the key becomes a spec table with no arrows tying it to the picture.
