---
id: sponsor-seats-as-a-numbered-plate
name: Sponsor Seats as a Numbered Plate
modes: [persuade]
grain: region
platforms: [web]
rating: 2
---

# Sponsor Seats as a Numbered Plate

## Form
An advertising region staged as a small fixed set of numbered seats, all of them visible at once in a band that breaks register with the rest of the surface, where an unsold seat is drawn as a dashed frame that is still an honest offer and the region's idle animation is a demonstration of the purchase itself rather than a rotation of what is being sold.

## Spark
You see four frames, three of them dashed and empty, and while you are reading something else a crosshair crosses to one of them, presses, and the dashes close into a solid line as a mark inks in -- and you understand exactly what buying that space would do, without a word of copy.

## Grammar
- Staging/hierarchy: a scarce, countable set of seats (three to six, never "and more") laid out at equal weight in one band; the band inverts the surface's own value -- ink where the page is paper -- so it reads as something laid *on* the document rather than drawn into it; the count is stated, the scarcity is real, and there is no second tier.
- Sequence/attention: every seat is visible at all times and the motion moves only a spotlight, never the contents; a sold seat is on screen 100% of the time rather than one cycle in N, which is the region's whole value proposition and must be true, not claimed; an empty seat carries its own call to action, so vacancy sells instead of embarrassing.
- Controls/state: taken (solid frame, the sponsor's name set in the surface's own face, `rel="sponsored"`), open (dashed frame, marching dashes, label switches to the verb on hover and focus), demonstrating (a seat filling with a mark that is tagged `specimen` for exactly as long as it is one), and sold out (the loop degrades to a quiet spotlight over the sponsors). Never a borrowed logo standing in for a sponsor you do not have.
- Adaptation: on a phone the band holds one row and the sold seats take the width while open seats shrink to their numbers, because an ellipsised sponsor name is worth nothing to either party; the band's height is capped by a hard rule -- it may not push the surface's own primary action below the fold at 390. Motion stops on pointer, on focus, on a backgrounded tab, and does not exist at all under reduced motion, where one seat stays filled so the offer still reads.

## Web leverage
One SVG rect per seat with `pathLength="100"`, so "dashed" and "solid" are the same two-number `stroke-dasharray` and the frame can close by interpolation rather than by swapping a border style; the seats and the full-size plate render from one array, so the band and the sales copy can never disagree about what is for sale.

## Fits
Landing, docs and editorial surfaces that carry sponsorship directly rather than through an ad network, and any region selling a countable scarce slot (seats, slots, plots, shelf space). The traps: a carousel that hides the thing people paid for; a placeholder logo of a company that has not agreed, which is invented proof and a trademark problem the moment money changes hands; an invented price where "on enquiry" is the truth; and a band that grows until it outranks the surface's own reason for existing.
