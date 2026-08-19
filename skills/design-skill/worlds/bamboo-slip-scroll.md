---
id: bamboo-slip-scroll
name: Bamboo Slip Scroll (竹简)
tier: interaction
modes: [read, experience, operate]
families: [bamboo, cord, ink]
rating: 2
grain: [product, flow, view]
platforms: [web, ios, android]
origin: the bound bamboo-slip manuscripts (jiandu) of the Warring States through Jin periods: narrow slips each carrying one vertical column of characters, tied with two or three cords into a roll that opens from right to left and closes by rolling.
---

# Bamboo Slip Scroll

## Form
Dozens of narrow slips of equal length laid side by side, each carrying a single vertical column of brushed characters, two or three horizontal cords lacing the slips into one flexible sheet, a title written on the back of the first slip so it shows when rolled, the whole opening from the right and rolling closed from the left.

## Spark
You untie the cord and the roll relaxes, slips clacking against each other as you unroll it on the table from right to left, one column per slip, and when you have read enough you roll the left end back in and the title on the outermost slip faces up again.

## System
- Palette/material: bamboo ground (pale yellow-tan, L 0.84, hue 85) for each slip, a darker bamboo edge line between slips (L 0.70) as the only divider, ink black for text, cord brown (L 0.40) for the two or three horizontal lacing lines that cross every slip at fixed heights; red only for a single seal or the reading pointer.
- Type/composition: vertical-rl, one column per slip, a clerical or Song face, characters at a consistent module down the slip; the cords are real horizontal rules crossing the whole width at the same two or three y positions; slips are equal in width, so the layout is a strict column grid with no cells; the title sits on the back of slip one (a sticky leading tab).
- Topology/navigation: the product is a roll; a view is the slips currently unrolled; a flow is one text; navigation is unrolling (horizontal scroll right to left) and rolling up (return); a contents list is the first slips; a library is a shelf of rolled scrolls showing titles.
- Controls/state: the reading pointer is a red mark beside the current slip; a link is a slip with a cord knot at its top (hover tightens the knot, pressed pulls the slip forward); selected slips lift 2px off the table; disabled slips are blank bamboo; errors are a slip with the ink struck and a correction slip inserted beside it; loading is the roll still tied; empty is a roll of blank slips with the title slip only.
- Responsive/motion: on a phone slips become full-height columns scrolled horizontally, three to five visible; motion is the unroll (horizontal scroll with momentum) and the roll-up (a 300ms translate back), slips never animate individually except the lift.

## Web leverage
`writing-mode: vertical-rl` columns in a horizontal `scroll-snap` track scrolling right-to-left (`direction: rtl` on the track), `position: sticky` for the title slip, and CSS `column-rule` drawn as the slip edge with the cords as absolutely positioned full-width rules.

## Translation
Nav is the title slip and the shelf; a list is a run of slips, one item per slip; tables become a run of slips with the header on the first slip and cords aligning the rows; forms are blank slips the visitor fills top-down with the cords marking required lines; empty state is the tied roll. Sits on classical (serif, warmth, measure) or organic (natural material, weighted motion); the world supplies the one-column-per-slip grid, the cords as alignment, the right-to-left unroll, and the title-on-the-back tab. Carries long-form reading, timelines, transcripts, changelogs, anything sequential that is read slip by slip.

## Risks
Costume: a bamboo texture background with horizontal Western text; cords as decorative lines. Fails for Latin-heavy text at length (vertical Latin is unreadable) and for dense operate surfaces; a11y requires the columns be real text in DOM order and horizontal scrolling be keyboard-reachable. Slop if slips get wood-grain photographs, if more than one red appears, or if the unroll becomes a scroll-hijack.
