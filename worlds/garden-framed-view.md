---
id: garden-framed-view
name: Garden Framed View (苏州园林 漏窗框景)
tier: interaction
modes: [experience, persuade]
families: [whitewash, stone, lattice]
rating: 2
grain: [product, flow, view]
platforms: [web, ios, android]
origin: the leak windows (louchuang), moon gates, and framed scenes (jiejing, borrowed scenery) of Suzhou classical gardens, Ming-Qing, as documented in Yuan Ye (1634).
---

# Garden Framed View

## Form
A white wall pierced by lattice windows and one moon gate, each opening a framed fragment of the scene beyond (a rock, a branch, a further window), so that the garden is never seen whole but revealed as a sequence of composed views along a winding path.

## Spark
You turn the corridor, the whitewashed wall blocks everything, then a round opening at chest height gives you one pine branch against gray sky, and three steps later a cracked-ice lattice breaks the same pond into twenty small pictures.

## System
- Palette/material: whitewash ground (L 0.96, faint warm trace), charcoal-gray roof-tile and stone for lines and text (L 0.25, cool trace), pond-green and branch-brown only inside the framed scene (imagery), no accent outside the frames; the frame itself is always the wall color cut away.
- Type/composition: a humanist sans or a light Song serif, small and quiet, set beside the frames never over them; the composition is wall, opening, scene: large fields of empty wall, one opening per viewport placed off-center, text as a caption stone; the lattice pattern (cracked ice, hexagons) is a real repeating geometry, used as a mask, never as a background tile.
- Topology/navigation: the product is a garden walked along one path; a view is one framed scene; navigation is the path, a horizontal progression with the next opening half-visible at the edge; a site map is the garden plan, a line-drawn layout with the openings marked.
- Controls/state: a link is an opening, hover widens the frame slightly (the moon gate growing by 2%), pressed walks you through (the scene fills the viewport); selected is the opening you are standing in; disabled is a window bricked over (wall-color fill with the lattice ghosted); empty is a window onto bare wall with one caption stone saying what will be planted.
- Responsive/motion: on a phone the wall is the full width and openings stack vertically with a scroll-snap per scene; motion is the walk: a 350ms ease-out reveal as the next frame enters, and a parallax of the scene inside the frame only, never of the wall.

## Web leverage
`clip-path` and SVG masks for moon-gate and lattice openings over real imagery, `scroll-snap` per scene, and `position: sticky` walls with the scene scrolling inside the opening so the framing is structural, not a picture of a frame.

## Translation
Nav is the path with the next opening peeking in; a list is a corridor of small windows each framing one item; tables do not belong here (route them to a default surface); forms are a single opening per field, the path advancing as each is filled; empty state is the bricked window with a caption. Sits on organic (warmth, calm) or modernist (white wall, air) with the world supplying the frame-as-navigation, the one-opening-per-viewport rule, and the caption-stone type; the language supplies fonts and chrome.

## Risks
Costume: a moon-gate border around a normal hero image, lattice as wallpaper. Fails for operate surfaces, for anything needing many items visible at once, and for users without imagery (an empty frame is nothing); a11y demands every masked image be a real image with alt. Slop if the wall gains texture, the frames gain shadows, or more than one opening competes per viewport.
