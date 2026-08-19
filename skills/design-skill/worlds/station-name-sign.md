---
id: station-name-sign
name: Station Name Sign (駅名標)
tier: graphic
modes: [operate, read]
families: [enamel, signage, wayfinding]
rating: 3
grain: [flow, view, region]
platforms: [web, ios, android]
origin: the platform station name boards (ekimeihyo) of Japanese railways, JR and private lines, 1950s-present: the current station large in kanji with kana and romaji beneath, the previous and next stations at each side with arrows, one line-color band.
---

# Station Name Sign

## Form
A wide white enamel board with the current station's name large in the center, its readings in smaller scripts beneath, the previous station at the left edge and the next at the right edge with arrows pointing the way, a single colored band carrying the line's color (and sometimes the station number in a circle), bolted to a post at eye level on the platform.

## Spark
The train slows, you see the board glide past the window, the big name in the middle tells you where you are, the small name on the right with its arrow tells you where you are going next, and the green band confirms it is still your line.

## System
- Palette/material: white enamel ground (L 0.97, cool trace), near-black for all names (L 0.15), one line color as a horizontal band (10-15% of the board height) and as the station-number disc; arrows in the same near-black; nothing else colored.
- Type/composition: three-tier name stack: the current name largest in a bold gothic sans (kanji/CJK), a reading in a smaller sans beneath, a Latin transliteration smallest; flanking names at roughly a third of the main size with arrows; strict horizontal symmetry about the center; everything aligns to the band; numbers in a circle use tabular figures.
- Topology/navigation: the product is a line; a view is a station; navigation is previous and next, always visible at the edges; the band tells which flow you are in; a transfer shows as a second small disc in another color; a line map is a strip of these boards reduced to discs and names.
- Controls/state: previous and next are the primary controls (the edge names with arrows, hover underlines, pressed slides the board one station); the current station is the center and is never a link; disabled is a grayed edge name with no arrow (end of line); an error is a red-bordered notice panel beneath the board; loading is the board with the band and empty name fields; empty is a board with only the band and "terminus".
- Responsive/motion: on a phone the board keeps its three-part structure but the flanking names shrink to arrows with one line each; motion is the board sliding one station width at 250ms ease-out; nothing else moves.

## Web leverage
A CSS grid of three columns (prev, current, next) locked to the band, `<ruby>`/`<rt>` for readings stacked on the name, and `scroll-snap` or a keyed transition so the board advances one station per action with the new name entering from the travel direction.

## Translation
Nav is prev/next plus the line strip; a list is a column of boards at reduced size, one per step; tables become the timetable panel under the board (plain, tabular); forms are a notice panel under the board with the band as the only color; empty state is the terminus board. Sits on default (system sans, quiet) or industry (precise, tabular) with the world supplying the three-part name stack, the edge-arrow navigation, and the one-band color. Carries any stepped flow: onboarding steps, wizards, release trains, document sections, a carousel that respects its reader.

## Risks
Costume: a colored stripe under a heading with no prev/next logic; "Japanese signage" as a font choice. Fails when steps are not linear and when more than two or three line colors must coexist on one board; a11y requires the flanking names be real links with direction words, and ruby text be real. Slop if the band becomes a gradient, the enamel gains a bevel, or the board gains a drop shadow.
