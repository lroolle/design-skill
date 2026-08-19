---
id: stamp-sheet
name: Stamp and Coupon Sheet (邮票 粮票 整版)
tier: graphic
modes: [persuade, operate, experience]
families: [paper, perforation, engraving]
rating: 2
grain: [view, region]
platforms: [web, ios, android]
origin: full printed sheets of Chinese postage stamps and ration coupons (liangpiao, 1955-1993), a perforated grid of identical units each carrying a denomination, a serial, a small engraved image, and a margin with plate numbers and color bars.
---

# Stamp and Coupon Sheet

## Form
A sheet of identical small rectangles separated by lines of perforation holes, each unit carrying a denomination numeral, an issuing authority, a tiny engraved picture, and a serial, the margin around the block printing the plate number, color registration bars, and the sheet's count, the whole thing meant to be torn one unit at a time.

## Spark
You fold the sheet along the perforation, tear off one stamp with the holes leaving a soft ragged edge, lick it, and press it into the corner of the envelope where the denomination is now the only thing that matters.

## System
- Palette/material: off-white sheet ground (L 0.96), one or two engraving inks per issue (a blue-black, a brown, a green, or the famous red) used as both picture and text, perforation holes as the ground showing through (small circles), the margin in plain black; a single issue never uses more than two inks.
- Type/composition: a strict module of equal units in a grid (for example 5 by 10), each unit a fixed aspect; inside the unit, the denomination is the largest element, the issuer the smallest; engraved line-art in one ink; the margin carries the metadata in a tiny tabular sans; the grid is the composition.
- Topology/navigation: the sheet is a collection; a unit is an item; a view is a sheet or a block of units; navigation is across the grid, and tearing is selection; a series of issues is a row of sheets.
- Controls/state: a unit is a button; hover lifts it 1px along its perforation, pressed tears it out (it detaches with a ragged edge and sits apart); selected units are torn; disabled units are cancelled with a black postmark circle; an error is a red overprint across the unit; loading is a sheet of blank units with holes; empty is a margin with no block and the count reading zero.
- Responsive/motion: the grid reflows by whole units (columns drop from 10 to 4 to 2) without changing the unit's aspect; motion is the tear (a 200ms detach along the perforation line) and the postmark stamp (120ms); nothing loops.

## Web leverage
A CSS grid with gaps that are the perforation rows, `mask-image` with a radial-gradient dot pattern to cut real holes, and the View Transitions API or FLIP to animate a unit tearing out and moving to a selection tray.

## Translation
Nav is the issue row (sheets side by side); a list is a block of units; tables become a sheet where each unit is a row's card with the denomination as the key figure; forms are the margin: plain fields beside the block; empty state is the empty margin. Sits on default (quiet grid, paper) or broadsheets (engraving, hairlines) with the world supplying the perforation module, the one-or-two-ink rule, the denomination hierarchy, and the tear-as-select interaction. Carries catalogs, pricing units, credits, tickets, any collection of equal small things.

## Risks
Costume: a zigzag border on cards; "stamp" as a badge graphic. Fails when items are not equal in kind, and when the unit must hold more than four facts; a11y requires each unit be a labelled button and the holes be decoration only. Slop if more than two inks enter, if units get drop shadows, or if the perforation becomes a solid dashed border.
