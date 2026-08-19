---
id: thread-bound-book
name: Thread-Bound Book Page (线装书 版式)
tier: graphic
modes: [read, experience, persuade]
families: [paper, ink, thread]
rating: 3
grain: [product, flow, view]
platforms: [web, ios, android]
origin: the page furniture of Chinese thread-bound books (xianzhuang), Ming and Qing dynasties: banxin central column, yuwei fish-tail marks, border rules, folio numbers, and four-hole stab binding.
---

# Thread-Bound Book Page

## Form
A double-page leaf ruled into vertical columns by fine lines, a narrow central column (the banxin) carrying the book title, chapter, and folio number between two fish-tail marks, a heavier outer border framing the block, text running top-to-bottom and right-to-left, and a stitched spine of four holes tying the leaves.

## Spark
You open the book from what a Western reader would call the back, the leaf folds out so the banxin sits at the fore-edge, your eye drops down the first column at the right, and the fish-tail at the fold tells you exactly which chapter and page you are holding.

## System
- Palette/material: aged paper ground (warm off-white with a visible yellow trace, L 0.95, hue 85), printing ink as text (near-black, brown trace), one hairline border in the same ink at 0.5 opacity, vermilion only for punctuation circles and the collector's seal; no other color.
- Type/composition: vertical-rl text in a Song/Ming serif (Noto Serif SC / Source Han Serif), 8-10 columns per leaf, one column width is the unit; the banxin is a fixed narrow column with title top, folio bottom, fish-tail marks as the only ornament; Latin text rotates with the column or sits in a horizontal footnote strip.
- Topology/navigation: the book is the product, a leaf is a view, the chapter is a flow; the banxin is the persistent wayfinder (where am I, which page); turning leaves is horizontal paging right-to-left; a table of contents is its own leaf of chapter titles with folio numbers.
- Controls/state: a link is a column with a red circle punctuation at its head; current location is the filled fish-tail; selection is a red reading circle beside the column; an error is a red margin note (meipi) at the top of the column; empty is an unprinted leaf with the ruling and banxin intact, the folio number still counting.
- Responsive/motion: on a phone one leaf becomes one column-set of 3-4 columns with the banxin moved to the top edge as a horizontal strip; motion is the leaf turn, one horizontal translate at 250ms, and nothing else.

## Web leverage
`writing-mode: vertical-rl` with `text-orientation: mixed`, CSS multi-column ruled by `column-rule`, and horizontal `scroll-snap-type: x mandatory` so a leaf is a snap point and the banxin is a sticky column.

## Translation
Nav lives entirely in the banxin and a contents leaf; lists are columns, each item one column or one indented run; a table is a ruled grid inside the border with headers in the top cells; forms are labelled blank columns the visitor fills top-down; empty state is the unprinted leaf. Sits on classical (serif body, warm paper, restraint) with the world supplying vertical setting, the banxin wayfinder, right-to-left paging, and seal-red punctuation; broadsheets can carry it for a journal.

## Risks
Costume: a torn-paper texture and a stitched spine graphic with horizontal Western text inside. Fails for long Latin-only content (vertical Latin is unreadable at length) and for dense operate surfaces; fails a11y if vertical text is not real text. Slop if more than one red appears, or if the ruling is made into decorative borders instead of columns.
