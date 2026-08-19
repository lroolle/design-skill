---
id: go-record
name: Go Board and Game Record (围棋 棋谱)
tier: interaction
modes: [operate, read, experience]
families: [wood, stone, board-game]
rating: 3
grain: [product, view, region]
platforms: [web, ios, android]
origin: the 19x19 go board (weiqi) with its nine star points, and the printed game record (qipu) that numbers every stone in play order, from Tang-Song manuals to modern kifu diagrams.
---

# Go Board and Game Record

## Form
A 19x19 grid of thin lines on a warm wood field with nine small star points, black and white stones sitting on the intersections (never in the cells), and the printed record where each stone carries a small numeral so that a whole game can be read as a sequence from one still diagram.

## Spark
You set the stone down on the intersection with a click, the record hand writes "47" on it, and looking at the diagram afterward you can replay the entire game by following the numbers, the shape of the fight visible at a glance.

## System
- Palette/material: kaya-wood ground (warm tan, L 0.80, hue 75) for the board surface, or paper white for the printed record; board lines in dark brown-black at 1px; stones are two values only, black (L 0.12) and white (L 0.96) with a soft contact shadow; one vermilion accent for the last-played mark or the current move; no other color.
- Type/composition: numerals inside stones in a tabular sans, small but crisp; labels are coordinates along two edges (letters across, numbers down); the grid is square, always; text outside the board is quiet and left-aligned in the margin; headings never sit on the board.
- Topology/navigation: the product is the board; a view is one position; time is the move number, navigated by a slider or prev/next; a region is a group; branches (variations) are small secondary diagrams beside the main one.
- Controls/state: placing is the primary action (tap an intersection, a ghost stone previews, tap again commits); the last move carries the red mark; captured stones lift off with a short fade; disabled intersections are not highlighted; errors are an illegal-move ghost that does not settle (it fades out in place); loading is an empty board with star points; empty state is the empty board, which is complete by nature.
- Responsive/motion: the board scales as a square to the smaller viewport dimension; coordinates hide below 360px; motion is stone placement (60ms settle), capture fade (200ms), and the move slider scrubbing the position; nothing decorative.

## Web leverage
A CSS grid of intersections (not cells) with stones absolutely positioned on line crossings, an SVG board that scales without blur, and a URL-carried move number so any position is a shareable address.

## Translation
Nav is the move slider and variation tabs; a list is the move list (numbered, two columns, black and white alternating); tables are the game record (move, player, coordinate); forms are the margin: a plain left-aligned panel; empty state is the empty board. Sits on default (quiet, tabular) or industry (dense record tables) with the world supplying the intersection grid, the two-value stone logic, the numbered-stone timeline, and the single red mark. Beyond games, the mechanism carries any timeline-on-a-map product: commits on a grid, edits on a layout, sensors on a plan.

## Risks
Costume: a board texture behind unrelated content; stones as bullet points. Fails when the data has no positional grid, and a11y demands every intersection be a focusable button with a coordinate name. Slop if stones gain gradients and highlights, if colors beyond black, white, and one red appear, or if the board is rendered as a raster that blurs.
