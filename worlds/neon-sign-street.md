---
id: neon-sign-street
name: Neon Sign Street (香港霓虹招牌)
tier: atmosphere
modes: [persuade, experience]
families: [neon, night, enamel]
rating: 2
grain: [view, region]
platforms: [web, ios, android]
origin: the vertical and projecting neon shop signs of Hong Kong streets, 1950s-2000s, with bold calligraphic or Hei characters bent in tube, stacked top-to-bottom and cantilevered over the road.
---

# Neon Sign Street

## Form
A night street where dozens of vertical signs cantilever from both sides, each a tall rectangle carrying a shop name in three to five large characters stacked top-to-bottom, tube colors limited to one or two per sign, the signs overlapping in depth so the street reads as layered columns of light over a dark wet road.

## Spark
You look up from the tram stop and the signs stack into the distance, a red pawnbroker, a green ginseng shop, a white-and-blue mahjong parlour, each one a vertical word you read top-down, and the nearest tube hums and flickers once.

## System
- Palette/material: tinted night ground (L 0.15, cool or warm trace, never neutral black), wet-asphalt gray for surfaces (L 0.22), tube colors as the only chroma: one per sign, drawn from a short set (vermilion, jade green, cobalt, amber), white tube for body text; glow is real and limited to the tube stroke itself (a soft outer blur of the same hue), never a page-wide haze.
- Type/composition: vertical-rl stacked CJK characters in a bold Hei or brush-flavored face at display sizes, Latin rotated or set horizontally in a small strip beneath the sign; composition is columns of signs at different depths, the nearest largest and sharpest, the far ones smaller and lower contrast; body text lives on the dark road surface in plain white, not in tube.
- Topology/navigation: the street is the product; each sign is a section or destination; navigation is walking along (horizontal progression) and looking up (vertical within a sign); a menu is a row of small signs on the street edge.
- Controls/state: a button is a sign fragment (one or two characters in tube on dark), hover brightens the tube one step, pressed flickers once then holds, disabled is an unlit tube (gray outline of the glyph), selected is the sign fully lit while neighbours dim; errors are a red tube character with a white caption; empty is a dark street with one unlit sign and a caption.
- Responsive/motion: on a phone signs stack vertically in one column at near depth; motion is the tube flicker on first light (one 400ms flicker, then steady), hover brightening, and a slow depth parallax on wide screens only; never continuous flicker.

## Web leverage
`writing-mode: vertical-rl` for the stacked characters, layered `text-shadow` or SVG filter glow bound to the tube stroke only, `translateZ`-style depth layers via transforms, and `prefers-reduced-motion` removing flicker and parallax.

## Translation
Nav is a row of small signs; lists are signs in a column, each item a short tube label; tables do not belong in the street (route them to a dark default surface with tube accents only in headers); forms are a lit counter window, a plain white-on-dark panel framed by one sign; empty state is the unlit sign. Sits on nocturnes (tinted darks, gold sparks logic, one light source) with the world supplying the vertical tube type, the depth stack, and the per-sign single color; nocturnes supplies the surfaces, body type, and restraint.

## Risks
Costume: neon text effect on a normal landing page, glow on every element, the cyberpunk reflex. Fails for operate surfaces and long reading (tube type at length is unreadable), and for audiences who read no CJK unless the Latin strip is real. Slop if more than two tube colors share a sign, if the page gains a purple haze, or if the flicker loops.
