---
id: railway-timetable
name: Railway Timetable and Ticket (火车时刻表 硬座车票)
tier: graphic
modes: [operate, read]
families: [paper, ink, rubber-stamp]
rating: 3
grain: [product, view, region]
platforms: [web, ios, android]
origin: the printed Chinese railway timetable (lieche shikebiao) booklets and the small cardboard and red-paper tickets of the 1980s-2000s, dense train-number grids, station columns, arrival and departure times, and the red ink of the carriage stamp.
---

# Railway Timetable and Ticket

## Form
A booklet page of hairline-ruled grid, train numbers across the top (K-, T-, G-prefixed), stations down the side, arrival over departure in each cell in tabular figures, blanks as a short dash, and beside it the small ticket: origin and destination in large characters, a red carriage-and-seat stamp, a serial at the edge.

## Spark
You run your finger down the station column to your town, across to the one train that stops after noon, read "14:22" over "14:25", and the clerk slaps a red stamp on the thin ticket that tells you carriage 7, seat 43, hard seat.

## System
- Palette/material: thin off-white paper ground (L 0.96, hue 80), black ink for every figure and rule, one rubber-stamp red for the carriage/seat mark, the ticket's serial, and the "sold out" overprint; the ticket itself may be a pale red or pale blue paper stock as a region ground; nothing else colored.
- Type/composition: a condensed sans or narrow Hei for the grid (it must hold eight columns on a phone), tabular figures everywhere, station names in CJK with a small Latin or pinyin line beneath only where needed; headings are the train numbers in bold; the ticket uses two sizes only: the large station pair and the small everything-else.
- Topology/navigation: the product is the timetable; a view is a train (a column) or a station (a row); navigation is along a row or down a column, with the header row and first column sticky; a ticket is the confirmation view of one cell, a region.
- Controls/state: a cell is a link (hover draws a hairline box around it, pressed fills it pale red); selected row and column highlight as a cross; sold out is a red diagonal overprint; not-stopping is a dash; delayed is the time struck through with a corrected time beneath in red; loading is the grid with dashes; empty is a grid with stations and no trains and one line saying none run today.
- Responsive/motion: on a phone the grid pivots to one train per view (a vertical list of stations with times) and the sticky headers remain; motion is the stamp (the red mark pressing in at 120ms) and the cross-highlight; nothing else moves.

## Web leverage
A real `<table>` with `position: sticky` on both the header row and first column, `font-variant-numeric: tabular-nums`, and `overflow: auto` with an edge fade so the grid scrolls without losing its axes.

## Translation
Nav is the sticky axes; lists are rows; the table is the product; forms are the ticket counter (a pale panel, two large fields, one red stamp on submit); empty state is the grid of dashes. Sits on industry (dense, tabular, one signal color, mono figures) or broadsheets (hairlines, density 0.85); the world supplies the two-axis topology, the arrival-over-departure cell, the dash for absence, and the stamp. Carries schedules, release calendars, shift rosters, price matrices, any product that is a sparse two-axis grid.

## Risks
Costume: a stamp graphic and a ticket-stub cutout around a normal form. Fails when the data is not a grid, and a11y demands real table semantics, header scope, and the struck-through times to carry text equivalents. Slop if the red spreads beyond the stamp, if cells gain shadows or radius, or if the condensed face is replaced by a wide one that breaks the eight-column phone grid.
