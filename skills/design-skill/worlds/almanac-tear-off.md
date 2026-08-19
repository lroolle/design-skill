---
id: almanac-tear-off
name: Almanac Tear-Off Page (黄历 日历 撕页)
tier: graphic
modes: [operate, read, persuade]
families: [paper, ink, rubber-stamp]
rating: 3
grain: [view, region, flow]
platforms: [web, ios, android]
origin: the daily tear-off wall calendar (rili) and its almanac page, 20th-century China and Hong Kong: one day per leaf, large numeral, lunar date, solar term, auspicious and inauspicious activities, in red and black on thin paper.
---

# Almanac Tear-Off Page

## Form
A small thin leaf carrying one enormous numeral at the center, the weekday and month above, the lunar date and solar term beside it, and below a dense grid of tiny text: suitable and unsuitable activities, directions, hours, all in two inks, red for the auspicious and black for everything else, hung on a nail with the torn stubs of past days still showing.

## Spark
You reach up in the morning, tear yesterday off along the perforation with one pull, and today's big red "15" is already telling you it is a Sunday, the Waking of Insects, and a fine day to move house but not to dig a well.

## System
- Palette/material: thin newsprint ground (L 0.95, hue 80, slightly gray), black ink for all neutral text, a single vermilion red for the numeral on holidays, for "suitable" rows, and for one stamp; a fine perforation line of gray dots at the top edge; nothing else.
- Type/composition: one giant numeral (a condensed Song or a bold sans) filling the upper half, a strict hierarchy underneath with the smallest text at 11-12px in dense two-column tables; everything centered on the leaf's axis because it hangs from a nail; dates in tabular numerals, labels in CJK or small caps Latin.
- Topology/navigation: the product is a stack of days; a view is one leaf; navigation is tearing (advance) and peeling back (previous), the stubs at the top showing how far you have come; a month view is the leaves laid out in a grid of small numerals.
- Controls/state: the primary action is the tear (a swipe or a button styled as the perforated edge); states are printed, torn (leaf sliding up and away), and the stub (a thin strip of the leaf left behind); errors are a black rubber stamp across the leaf ("void"), warnings are the inauspicious rows; empty is a blank leaf with the numeral as a gray outline.
- Responsive/motion: the leaf is already phone-shaped; on wide screens it hangs centered with the stubs visible and the month grid beside it; motion is the tear, one 300ms translate-up with a slight rotation, and the stub settling; nothing loops.

## Web leverage
`clip-path` or an SVG perforation mask on the tear edge, a `touch-action: pan-y` swipe driving the tear transform, and `font-variant-numeric: tabular-nums` with a true CJK-Latin mixed hierarchy.

## Translation
Nav is the stack (tear/peel, month grid); a list is the dense two-column activity table, red for yes, black for no; tables are native, the almanac is a table; forms are small labeled cells in the lower grid; empty state is the outlined numeral. Sits on broadsheets (density 0.85, newsprint, hairline rules, real hierarchy) or industry (dense, tabular, one red); the world supplies the one-day-one-leaf topology, the giant numeral, the two-ink code, and the tear.

## Risks
Costume: a big numeral with "lunar date" flavor text and no dense grid underneath; red everywhere. Fails when content has no daily grain, and a11y demands the 11px rows be real text with sufficient contrast and a zoom path. Slop if the tear animation is made playful (bounce, confetti) or the red becomes a brand color rather than the auspicious code.
