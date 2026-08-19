---
id: paired-couplets
name: Paired Couplets (春联 对联)
tier: graphic
modes: [persuade, experience, read]
families: [paper, ink, doorway]
rating: 2
grain: [view, region]
platforms: [web, ios, android]
origin: the paired vertical couplets (duilian, chunlian) pasted on either side of a doorway with a horizontal scroll above, on red paper in black or gold ink, a form codified in the Ming and still printed and brushed every lunar new year.
---

# Paired Couplets

## Form
Two tall narrow strips of red paper flanking a doorway, each carrying one line of a matched couplet written top-to-bottom in large brushed characters, equal in length and answering each other word for word, with a short horizontal strip across the lintel carrying a four-character summary, and the door itself between them.

## Spark
You brush the paste on the door frame, press the right-hand strip up first because the first line goes on the right, step back to check the two columns are level, and read the pair aloud, the second answering the first beat for beat, before pasting the four characters across the top.

## System
- Palette/material: vermilion-red paper as the ground of the couplet strips only (L 0.55, hue 28, committed), black or gold ink for the characters, the doorway between them in the page's own neutral (paper white or wood tone), and no other color; gold is reserved for the horizontal lintel strip or a single character.
- Type/composition: vertical-rl in a brush-flavored or heavy Song face at display size, one character per module down each strip; the two strips are equal height and width, symmetric about the door; the lintel strip is horizontal, four characters, right-to-left or left-to-right as declared once; everything between the strips is the content, set in a plain horizontal face; the pairing is the composition: two answering columns.
- Topology/navigation: a view is a doorway; the couplet is the frame and the door is the content; navigation is walking through (the door is the primary action) or moving to the next doorway along a wall; a set of views is a row of doors.
- Controls/state: the door is the primary call to action (the whole central panel, or a knocker-sized button in it); hover warms the door one step; pressed opens (the content slides in from behind the strips); the strips are persistent labels (left and right describe the two halves of the offer, answering each other); disabled is faded red paper (the couplets of last year, sun-bleached); errors are a white paper notice pasted over the door; empty is the bare door frame with strips unpasted (outline only).
- Responsive/motion: on a phone the two strips stack as a header pair (two short vertical strips side by side) with the door below; motion is the paste (a strip sliding down into place, 250ms) and the door opening (a single reveal); nothing else moves.

## Web leverage
`writing-mode: vertical-rl` with `text-orientation: upright` for the strips, a CSS grid of three columns (strip, door, strip) that collapses to a two-row header on narrow viewports, and a `view-transition` for the door opening.

## Translation
Nav is the row of doors; a list is a wall of doorways each with its pair; tables do not belong (route to a default surface behind the door); forms are the door panel, plain and horizontal, with the two strips naming what you are entering and what you will get; empty state is the unpasted frame. Sits on classical (warm paper, serif, restraint) or modernist (symmetry, air) with the world supplying the two-answering-columns structure, the one-committed-red rule, and the door as action. Carries any product whose pitch is a matched pair: before and after, problem and promise, two audiences, a comparison.

## Risks
Costume: red banners with gold text as a "festive" skin; random couplets as decoration. Fails for operate surfaces, for content that is not a pair, and for audiences who read no CJK unless the strips carry a real bilingual line; a11y requires the strips be real text. Slop if the red spreads beyond the strips, if more than one pair competes per view, or if the lintel gains ornament.
