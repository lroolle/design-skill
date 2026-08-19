# dashboard -- an all-day product surface where the table is the component

## Job

Let an operator, analyst, or owner see the state of something, spot
the anomaly, and act on it -- many times a day, often for hours.
Product surface entirely. Frequency is the whole brief: every pixel
of decoration is paid for on every glance, so density is a feature,
predictability is a feature, and quiet is a feature. The surface
earns its keep by how fast the eye finds the row that is wrong.

## Protected functions

- The data itself: the rows, the columns the user actually scans,
  the precision of the numbers. Never summarized away.
- Filters, sort, and search -- visible, not behind a menu.
- The anomaly path: from "something is off" to the row to the
  action, without a modal in between.
- Time context: what period is shown, when it was last updated.
- Column headers with units; the current view's name; the account /
  environment switch.

## Structure

```
+------------------------------------------------------------------+
| rail: nav (icons+labels)  | status strip: env . time . updated    |
|                           +---------------------------------------+
|                           | view title      [filters] [range] [+] |
|                           +---------------------------------------+
|                           | KPI  KPI  KPI  KPI   (above the data)  |
|                           +---------------------------------------+
|                           | TABLE: sticky header, units in headers |
|                           |  sort . filter . tabular numerals      |
|                           |  row hover = tone step               > |
|                           |  ...                                   |
|                           +---------------------------------------+
|                                         | side panel: row detail   |
+------------------------------------------------------------------+
```

Hierarchy: the table first (it is the reason the page exists), the
KPIs second (a summary above, showing worst case not averages), the
filters third. Charts sit beside or above the table, never instead of
it. Drill-down opens a side panel, keeping the table in view.

Mobile: status strip compressed to one line; KPIs as a horizontal
strip; the table becomes a list of rows with the 3-4 most-scanned
columns and the rest behind a labeled expand; filters behind a
labeled button that shows the active count; detail as a full sheet.

The signature moment is structural, not animated: the status strip
in mono, or the threshold lines on the charts.

## Settings

| Dial | Setting |
|---|---|
| ratio | 1.2-1.25; headings small, the data is the hierarchy |
| density | dense 0.85, packed 0.7 for trading / monitoring; base 0.9375rem |
| color strategy | restrained: accent for the primary action and selection only; semantic colors only on state; charts one highlighted series |
| motion budget | dashboard: skeleton -> content crossfade, values update in place (instant or number morph), row hover tone step, side panel slides 180ms; nothing continuous, no pulse |
| container / measure | full viewport with 16-24px gutters; prose (help, empty state) held to 60ch |
| grid | rail + content; KPI strip 4-6 cells; table full width; side panel 28-36rem |
| nav | persistent left rail with labels at 1440, collapsed icons+tooltips at 768 (labels on focus), bottom tabs or a labeled menu at 390 |
| numbers | tabular numerals everywhere; mono at packed density; units in headers; right-aligned |

## Directions

- **industry** -- the native fit: light-first steel, mono data,
  narrow uppercase labels, mechanical motion, thresholds as dashed
  lines, the status strip as signature.
- **default** -- when the product's other surfaces are default and the
  dashboard is one view among many: same tokens at dense density,
  tone-step rows, mono identifiers.
- **broadsheets** in product mode -- only for a data journalism or
  reporting surface where the "dashboard" is a dated report with
  heds; rare.

Trap: **nocturnes / dark-for-no-reason** -- a dark theme chosen
because dashboards "look serious" dark; eight hours of light-on-dark
reading is fatigue, and the glow-and-grid chrome is the developer AI
look. Offer dark as a user theme, design light-first. Also a trap:
any system whose default density is airy (modernist, organic) --
their air deletes rows.

## States

- loading: a skeleton that matches the table's column widths and row
  height; KPIs as dimmed placeholders with their labels already
  visible; never a centered spinner over the whole view.
- empty: the table region teaches -- what will appear here, the one
  action that populates it ("Connect a data source"), and a sample
  row labeled as sample if helpful. Filters that return nothing say
  so and offer to clear.
- error: inline in the region that failed, with the timestamp of the
  last good data still shown; the rest of the dashboard keeps working.
- success: an action on a row confirms in the row (tone flash 150ms,
  then the new value), or in a toast that names the object.
- partial / stale: the status strip shows "updated 3 min ago"; stale
  regions carry a dated note, not a spinner; live values that stop
  updating say so.
- first-run: the empty state above plus a three-step visible setup
  (connect, choose metrics, save view) -- not a tour overlay.

## Copy

Labels are nouns with units ("Latency p95, ms"); the view title names
the scope ("Orders -- last 7 days, EU"). Buttons are verbs on objects
("Export 240 rows", "Acknowledge alert"). Empty states: what goes
here + the one verb. Errors: what failed, since when, what to do
("Metrics feed unavailable since 14:02. Showing data to 14:01.
Retry"). No exclamation marks, no "Oops", no celebratory toasts.

Good: KPI "Error rate 0.42% (worst hour 1.9%, 03:00)".
Bad: KPI "Errors: Looking good!" with a green check and a sparkline
with no axis.

## Verify

P0:
- facts visible above the fold at 1440 before vs after a restyle:
  count them; fewer is a regression unless the brief removed them
- the table's primary columns readable without horizontal scroll at
  768; at 390 the list shows the 3-4 most-scanned columns, rest
  reachable
- filters and sort visible and labeled at every width; the active
  filter count shown when collapsed
- every number tabular; every column with a unit has it in the header
- semantic colors only on state; no decorative accent; no donut charts
  standing in for a table
- live values update in place with no pulse, no blink; reduced motion
  leaves the dashboard fully usable
- keyboard: rows focusable, sort reachable, side panel escapable

P1:
- KPIs show worst case alongside the average where anomalies matter
- status strip present (period, last updated, environment)
- row hover is a tone step, not a color; selected row distinct from
  hovered
- side panel keeps the table visible at 1440; full sheet at 390
- chart gridlines in the line token; one highlighted series; direct
  labels over legends

Widths: 390 / 768 / 1440. On a restyle count: rows visible above the
fold, facts above the fold, clicks from anomaly to action, filters
visible vs hidden.

## Failure modes

- **Metric cards ate the table**: four pretty aggregates replaced
  three hundred facts; the outlier averaged away. The canonical
  costume.
- **Donut dashboard**: a grid of ring charts and gauges with no axis,
  no unit, no table.
- **Dark HUD**: near-black, glow, dotted grid, acid accent -- chosen
  for looks, paid for in eye strain all day.
- **Modal drill-down**: every row opens a modal that hides the table.
- **Hidden filters**: filters behind a funnel icon with no count; the
  user cannot tell what they are looking at.
- **Decorative accent**: the accent on every icon and header so the
  one action disappears.
- **Proportional numbers**: columns that wobble because the numerals
  are not tabular.
- **The tour overlay**: first-run as a seven-step spotlight tour
  instead of an empty state that teaches.
