---
id: olympic-pictogram-program
name: Games Pictogram Program
tier: atmosphere
modes: [operate, persuade, experience]
families: [printed-signage, pictogram, color-program]
rating: 2
grain: [product, view]
platforms: [web, ios, android]
origin: Otl Aicher's visual identity and pictogram program for the Munich 1972 Olympic Games; wayfinding, tickets, posters and uniforms on one grid and one color scale
---

# Games Pictogram Program

## Form
A whole event run on one program: stick-figure pictograms built on a 45-degree grid, a scale of light blues and greens with silver and orange accents assigned by venue and function, and a strict grid carrying signs, tickets, timetables and posters alike.

## Spark
You follow the light-blue signs with the swimmer pictogram through the park, your ticket is the same blue, and the timetable at the pool uses the same figure, so you never ask where you are.

## System
- Palette/material: a cool scale (light blue, green, silver, white) as grounds and a small set of warm accents (orange, dark blue) assigned to functions; every color means a venue or a role; no black as a field, dark grey as text.
- Type/composition: one grotesk in few weights, lowercase-led, pictograms and type on the same square grid with generous module spacing; signs read as colored fields with one pictogram and one word.
- Topology/navigation: venues and functions own colors, pictograms own activities, the grid owns every artifact; movement is following a color and a figure, a detail is a timetable on the same module.
- Controls/state: a selected venue is its field color, disabled is the figure at half tone, loading is an empty colored field, empty is a field with a pictogram and "no events", error is the orange accent field with one line.
- Responsive/motion: the module grid reflows by whole modules; pictograms scale in steps; motion is a field sliding in on the grid and nothing continuous, reduced motion cuts.

## Web leverage
An SVG pictogram family drawn on one 45-degree grid and a CSS grid locked to the same module, with colors as role tokens bound to data so the program stays one system across pages.

## Translation
Nav is a row of colored fields each with a pictogram and a word. A list is a timetable on the module; a table is a schedule grid; a form is a field set with one pictogram per group; empty state is a colored field with the figure. Sits on modernist (grid, grotesk, committed color) or default; the language supplies type and neutrals, the world supplies the role-color program, the pictogram family, and the module.

## Risks
Costume: stick-figure icons from a library on a page with no program behind them, or the colors as a random palette. Fails where there are no roles or places to assign colors to, and for long reading. Slop when the program becomes a rainbow of badges or when pictograms decorate headings as icon tiles.
