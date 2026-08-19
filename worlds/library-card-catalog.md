---
id: library-card-catalog
name: Library Card Catalog
tier: interaction
modes: [operate, read]
families: [card-stock, oak-drawer, typewriter]
rating: 2
grain: [product, flow, view]
platforms: [web, ios, android]
origin: 3x5 inch catalog cards on the Library of Congress and Dewey systems, typed and rod-held in labelled oak drawers, 1870s-1990s
---

# Library Card Catalog

## Form
A wall of labelled drawers each holding hundreds of identical cards, every card a fixed typed layout -- call number top left, main entry, title, imprint, subject tracings at the foot -- filed in one alphabetical run you finger through.

## Spark
You pull the drawer marked Pas-Pei, walk your fingers past a hundred cards, stop at the one with the call number you need, and copy it onto the slip with the pencil on the string.

## System
- Palette/material: pale card stock ground, typewriter black text, red only for the call number or a "see also" cross-reference, drawer labels on brass-framed paper; no color fields.
- Type/composition: one typewriter mono face at one size, fields in fixed positions (call number top left, entry indented, tracings at the foot), drawer labels in caps; cards are identical in shape, content varies only in length.
- Topology/navigation: drawers are ranges of one ordered run, cards within are the records; movement is drawer then card, cross-references jump by "see" and "see also"; a detail is the card itself, full size.
- Controls/state: the current card is pulled forward, neighbors visible behind; a filter is a guide card inserted in the run; loading is a drawer with blank cards; empty is a drawer label with no cards; edited is a card with a typed correction line.
- Responsive/motion: narrow screens show the drawer label strip then one card at a time with previous and next; motion is the card pulling forward and the drawer sliding, short and linear, reduced motion cuts.

## Web leverage
A virtualized ordered list with `scroll-snap` cards and a sticky drawer-label header bound to the current alphabetical range, so thousands of records stay one continuous run.

## Translation
Nav is the drawer wall: ranges of the one index. A list is the run; a table is a card's fixed fields; a form is a blank card with its fields in the fixed positions; a search result is a guide card inserted where the match lives. Empty state is a labelled drawer with no cards. Sits on default or classical (paper, typewriter restraint); the language supplies chrome and type outside the card, the world supplies the fixed card layout, the drawer ranges, and see-also cross-references.

## Risks
Costume: a mono font and a card shadow on a normal list. Fails for records with images or rich text and for surfaces that need filtering by many facets at once. Slop when the drawer wall becomes a bento of cards or when see-also links become a tag cloud.
