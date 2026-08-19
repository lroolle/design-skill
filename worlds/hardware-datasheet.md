---
id: hardware-datasheet
name: Hardware Datasheet
tier: graphic
modes: [read, operate, persuade]
families: [paper, engineering-print, table]
rating: 3
grain: [product, view, region]
platforms: [web, ios, android]
origin: Semiconductor and component datasheets, Texas Instruments, Philips, Analog Devices, 1960s onward; pinout diagrams, absolute maximum ratings, timing diagrams, typical application circuits
---

# Hardware Datasheet

## Form
A white document opening with a features list and a pinout diagram, then tables of absolute maximum ratings and electrical characteristics with min, typ, max and unit columns, timing diagrams with labelled intervals, and a typical application schematic, every figure and table numbered.

## Spark
You flip to page 3, read Vcc max 5.5 V in the absolute maximum table, check the timing diagram for tSU = 20 ns, and wire it up knowing exactly what will and will not survive.

## System
- Palette/material: white ground, black line and text, one light grey for table rules and shading, a single accent (often the vendor's one color) reserved for the part number header and warnings; no fills in figures.
- Type/composition: a plain sans for tables and labels, part number large in the header, tables with symbol, parameter, conditions, min, typ, max, unit columns in that order; figures boxed with numbered captions below.
- Topology/navigation: a fixed section order (features, pinout, ratings, characteristics, timing, application, package); movement is by section and by figure or table number; a detail is the figure at full width.
- Controls/state: a parameter row highlights with its conditions; a value out of range is flagged in the accent; loading is the table skeleton with units kept; empty is a table with "not specified"; preliminary data is stamped PRELIMINARY in the header.
- Responsive/motion: tables become stacked parameter blocks keeping min/typ/max on one line; pinouts rotate to portrait; no motion except an optional timing-diagram cursor on scrub.

## Web leverage
HTML tables with real `<thead>` units and `tabular-nums`, inline SVG pinouts whose pins link to their parameter rows, and a timing diagram as SVG with a scrubbable cursor showing interval values.

## Translation
Nav is the section list. A list is a features list; a table is the datasheet table itself (symbol, parameter, conditions, min, typ, max, unit); a form is a parameter table with editable typ cells; empty state is the table frame with units and "not specified". Sits on industry (dense, ruled, mono numerals) or default; the language supplies tokens and motion, the world supplies the section order, the min/typ/max discipline, numbered figures, and the one-warning-color rule.

## Risks
Costume: a pinout graphic on a product that has no pins and a table styled like a datasheet for marketing claims. Fails for narrative content and image-led products. Slop when the accent spreads to buttons and badges, or when the tables lose their units and conditions and become a pricing grid.
