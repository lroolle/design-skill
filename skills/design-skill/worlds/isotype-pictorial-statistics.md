---
id: isotype-pictorial-statistics
name: Isotype Pictorial Statistics
tier: graphic
modes: [persuade, read, operate]
families: [paper, flat-ink, pictogram]
rating: 3
grain: [view, region]
platforms: [web, ios, android]
origin: Vienna Method / Isotype charts by Otto Neurath, Marie Neurath and Gerd Arntz, Gesellschafts- und Wirtschaftsmuseum, Vienna 1925-1934, then Isotype Institute, Oxford
---

# Isotype Pictorial Statistics

## Form
A chart made of repeated flat pictograms where quantity is counted, not scaled: one figure stands for a fixed number, rows of figures read left to right like text, and a short caption states the unit.

## Spark
You count the little workers in the 1930 row against the 1910 row and get the ratio before you read a single number, because the page made you count.

## System
- Palette/material: off-white paper ground, black figure ink, one or two flat spot colors that carry meaning (red for one category, blue for another), no tints and no shading; color is a category, never decoration.
- Type/composition: a plain sans caption above each chart stating subject and unit ("each figure = 1 million tons"); figures sit on a baseline grid in rows, rows labelled at the left in the same sans; no axes, no gridlines.
- Topology/navigation: a page is a sequence of charts each answering one question; movement is from chart to chart, a comparison is two rows sharing a baseline, a detail is a row's figures becoming a finer unit.
- Controls/state: a filter removes or adds figures so the count visibly changes; loading shows grey outlined figures at the expected count; empty shows the caption and zero figures with the unit line kept; error is a crossed figure in the status color with a one-line reason.
- Responsive/motion: rows wrap at a fixed figures-per-row on narrow screens with the unit line repeated; motion is figures appearing in reading order once, then still; no bars growing, no counters.

## Web leverage
An inline SVG sprite of one pictogram repeated by `<use>` from a data-bound count, with CSS grid rows sized by the unit, so the chart is real markup a screen reader can total.

## Translation
Nav is a list of questions, each a chart title. Lists are charts; a table is a matrix of figure rows with the unit in the header. A form is a quantity field whose figures update as you type. Empty state is a zero-figure row that explains the unit. Sits best on modernist (flat, grid, sans, one signal color) or default in product mode; the language supplies type and neutrals, the world supplies the counting rule, the pictogram set, and the caption discipline.

## Risks
Costume: pictograms as decoration beside ordinary bar charts, or emoji standing in for drawn figures. Fails when quantities span orders of magnitude (counting breaks) or when categories exceed the two or three flat colors. Slop when figures are scaled instead of counted, or when an icon set from a library replaces a drawn, consistent pictogram family.
