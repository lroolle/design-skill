---
id: changelog-as-a-scrubbed-timeline
name: Changelog as a Scrubbed Timeline
modes: [read]
grain: view
platforms: [web, ios, android]
rating: 2
---

# Changelog as a Scrubbed Timeline

## Form
A release history staged as one horizontal time axis you scrub, where the release under the cursor expands into its notes and the product surface beside it shows what that version looked like, so reading the changelog is moving through time.

## Spark
You drag the handle back three months, the notes swap to 2.3, the screenshot beside them shows the old sidebar, and you see exactly when the thing you miss disappeared.

## Grammar
- Staging/hierarchy: the time axis owns the top edge with version ticks; the selected release's notes own the main column; the version's surface (screenshot or live) sits beside at smaller scale; the current release is marked.
- Sequence/attention: scrub, stop, read; ticks are weighted by release size so the eye lands on the big ones; breaking changes carry a mark on the axis.
- Controls/state: scrubbing moves by release, not by pixel; each version is a URL; states are selected, current, prerelease, yanked; keyboard arrows step releases; a release with no notes says so.
- Adaptation: phones turn the axis into a vertical rail with the notes below and the surface image collapsed under a toggle; reduced motion swaps notes without sliding.

## Web leverage
A `scroll-snap` or pointer-driven axis bound to a release list with per-version anchors in the URL and lazy-loaded version surfaces.

## Fits
Editorial changelogs, release pages, docs "what's new". The trap: products with a handful of releases (an axis with three ticks is a list in costume) or notes so long that scrubbing hides more than it reveals.
