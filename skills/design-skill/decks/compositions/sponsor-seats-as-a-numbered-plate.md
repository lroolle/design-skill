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
An advertising region staged as a small fixed set of numbered seats, all of them visible at once in a band that breaks register with the rest of the surface -- ideally by wearing a different world entirely -- where an unsold seat is a visibly empty, visibly fillable field rather than a hidden one, and the region's idle animation is a demonstration of the purchase itself rather than a rotation of what is being sold.

## Spark
You see four fields, three of them holding nothing but a [+], and while you are reading something else one of them fills -- and you understand exactly what buying that space would do, without a word of copy.

## Grammar
- Staging/hierarchy: a scarce, countable set of seats (three to six, never "and more") laid out at equal weight in one band; the band breaks register with the surface hard enough to read as something laid *on* the document rather than drawn into it -- inverting the value is the cheap version, dressing the band in a different world is the strong one; the count is stated, the scarcity is real, and there is no second tier.
- Sequence/attention: every seat is visible at all times and the motion moves only a spotlight, never the contents; a sold seat is on screen 100% of the time rather than one cycle in N, which is the region's whole value proposition and must be true, not claimed; an empty seat carries its own call to action, so vacancy sells instead of embarrassing.
- Controls/state: taken (a filled field, the sponsor's name set in the band's own face, `rel="sponsored"`), open (an empty field carrying `[+]`, switching to the verb on hover and focus), demonstrating (a seat filling with a mark tagged `specimen` for exactly as long as it is one), and sold out (the loop degrades to a quiet spotlight over the sponsors). Never a borrowed logo standing in for a sponsor you do not have. The status colour is spent on state -- the seat the loop is on, the seat under the pointer, the one action -- and never repaints a paying sponsor's mark.
- Adaptation: on a phone the band holds one row and the field sizes to its content -- open seats shrink to `[+]`, a sold seat keeps the room its name needs -- because an ellipsised sponsor name is worth nothing to either party; secondary furniture (seat numbers, the long form of the action) drops before the names do; the band's height is capped by a hard rule -- it may not push the surface's own primary action below the fold at 390. Motion stops on pointer, on focus, on a backgrounded tab, and does not exist at all under reduced motion, where one seat stays filled so the offer still reads.

## Web leverage
The fill is animated by the band's own world rather than by a generic transition: dressed in split-flap the field is per-character cells that clatter and settle, dressed in a drawing world it is a dashed `stroke-dasharray` closing by interpolation at `pathLength="100"`. The seats and the full-size plate render from one array, so the band and the sales copy can never disagree about what is for sale.

## Fits
Landing, docs and editorial surfaces that carry sponsorship directly rather than through an ad network, and any region selling a countable scarce slot (seats, slots, plots, shelf space). The traps: a carousel that hides the thing people paid for; a placeholder logo of a company that has not agreed, which is invented proof and a trademark problem the moment money changes hands; an invented price where "on enquiry" is the truth; and a band that grows until it outranks the surface's own reason for existing.
