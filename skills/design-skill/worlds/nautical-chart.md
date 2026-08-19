---
id: nautical-chart
name: Nautical Chart
tier: graphic
modes: [operate, read, experience]
families: [paper, printed-map, instrument]
rating: 3
grain: [product, view]
platforms: [web, ios, android]
origin: Admiralty and NOAA paper charts, 19th-20th century; soundings, depth tints, compass rose, light characteristics, chart corrections by hand
---

# Nautical Chart

## Form
A sheet where water is the subject and land is the margin: depth soundings as small italic figures dotted across white and pale blue tints, a compass rose, buoys and lights as abbreviated symbols with their timing in text, and a title block stating datum, scale and edition.

## Spark
You lay the parallel rule from the compass rose to the headland, read 7 over the shoal and 23 past it, note the light "Fl(2) 10s", and you know exactly where not to go at night.

## System
- Palette/material: white for deep water, two or three pale blue depth tints, buff for land, black for soundings and symbols, magenta reserved for lights, cautions and corrections; nothing else is colored.
- Type/composition: soundings in small italic figures, names in upright caps tracked along coastlines, the title block in a serif with the datum and scale lines; composition is the water area full-bleed with the legend in a margin box.
- Topology/navigation: one continuous chart panned and zoomed; neighboring charts referenced at the edges; detail is a larger-scale inset of a harbor boxed on the parent chart.
- Controls/state: a waypoint is a marked cross with a label; hazards and changes are magenta; loading is the graticule with tints only; empty is water with a title block saying "no soundings"; stale is a correction date in the title block highlighted.
- Responsive/motion: the chart keeps its scale and pans; legend collapses to a tab; motion is only pan and zoom inertia and a light's flash timed to its real characteristic, optional and reducible.

## Web leverage
A tiled canvas or vector map layer with depth tints as real data and soundings as positioned text, with a light's `Fl(2) 10s` rendered as a timed animation driven by its characteristic string.

## Translation
Nav is the chart index and the title block. A list is a buoy list (symbol, position, characteristic); a table is the tide table set in the margin style. A form is the title block's fields. Empty state is tints and graticule with no soundings. Sits on default or industry for operate (soundings are data), nocturnes for a night-mode variant (dim chart, magenta lights); the language supplies chrome and dark mode, the world supplies the tint ladder, magenta as caution, and sounding typography.

## Risks
Costume: a compass rose and blue tints behind a product that has no map. Fails for non-spatial products and for very dense interactive data off the map. Slop when magenta becomes a brand accent everywhere, or when a stock map tile set replaces the chart's own tint and symbol rules.
