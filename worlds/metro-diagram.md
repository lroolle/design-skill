---
id: metro-diagram
name: Metro Line Diagram (地铁线路图)
tier: graphic
modes: [operate, read, persuade]
families: [wayfinding, enamel, signage]
rating: 3
grain: [product, flow, view]
platforms: [web, ios, android]
origin: the schematic network maps of the Shanghai and Beijing metro systems (1990s-present), descended from the diagrammatic tradition: numbered colored lines at 45-degree angles, interchange rings, bilingual station names.
---

# Metro Line Diagram

## Form
A white field carrying a dozen thick colored lines at strict 0, 45, and 90-degree angles, each line numbered in a colored disc, stations as small ticks on the line, interchanges as white rings where lines cross, every station named in Chinese with English beneath, and a legend that is the list of lines.

## Spark
You stand at the car door, find the red disc of your line, trace it with a finger to the ring where it meets the blue, count four ticks past that, and the station name lights on the strip above the door as the train pulls in.

## System
- Palette/material: white or off-white ground (L 0.98), one fixed saturated hue per line (a palette of 10-16 distinguishable hues at equal lightness, named by number), dark gray for station names and ticks, white rings with a dark outline for interchanges; the line colors are the entire palette, nothing else is colored.
- Type/composition: a bilingual pair at every station: CJK name in a clear Hei sans above, Latin in a smaller sans beneath, set horizontally and never rotated; the diagram geometry is the composition: lines at 45-degree increments, equal tick spacing regardless of real distance, the legend as a column of numbered discs.
- Topology/navigation: the product is a network; each colored line is a flow (a sequence of views), each station is a view, interchanges are where flows share a view; navigation is following a line, and the current station is the lit one; a site map is literally the diagram.
- Controls/state: a link is a station tick (hover draws a ring, pressed fills the tick with the line color), the current station is a filled tick with a halo, disabled is a dashed gray segment (line under construction), an error is a segment drawn in a hatched gray with a notice, loading is the line drawing itself along its path, empty is a single station with its name and no connections yet.
- Responsive/motion: on a phone the diagram becomes the line strip above the door: one line, horizontal or vertical, the current station centered, interchanges as colored discs beside the tick; motion is the line drawing (stroke-dashoffset, 400ms) and the current-station halo; nothing else moves.

## Web leverage
SVG paths with `stroke-dasharray` draw-on, a fixed 45-degree geometry grid, `<title>` and focusable station groups for keyboard navigation, and an accessible linear list that mirrors the diagram for screen readers.

## Translation
Nav is the legend (numbered discs) and the line strip; a list is a line strip with ticks; tables are a station table keyed by line color in the first column; forms are a station dialog (white card at the tick); empty state is the lone station. Sits on industry (light-first, precise, tabular) or default (quiet chrome) with the world supplying the line-color palette, the tick-and-ring vocabulary, the 45-degree geometry, and the bilingual name stack. Beyond transit, it carries any product that is a network of steps: pipelines, onboarding, release trains, dependency graphs.

## Risks
Costume: colored lines as decoration with no stations; the diagram as a hero image. Fails when the product has no sequence or network, and when more than ~16 lines are needed (colors stop being distinguishable); a11y requires the linear mirror and never color-only meaning. Slop if lines bend freely, if station names rotate, or if the palette is replaced by a gradient.
