---
id: instrument-face-dial
name: Instrument Face
tier: interaction
modes: [operate, experience]
families: [anodized-metal, instrument, control-panel]
rating: 3
grain: [view, region]
platforms: [web, ios, android]
origin: Braun audio and measurement faceplates under Dieter Rams and Dietrich Lubs, 1958-1990s; laboratory panel meters and HP/Tektronix bench instruments
---

# Instrument Face

## Form
A flat metal or grey plastic face where every control is a dial, slider or key with printed scale marks and one word of label, one control in the only color, and a single readout window showing one value at a time.

## Spark
You turn the knob a quarter detent, hear the click, watch the needle settle on 4.5, and the one green key under your finger is obviously the thing to press.

## System
- Palette/material: pale grey or anodized silver face ground, dark grey legends, black scale ticks, one saturated control color (green, orange or yellow) used exactly once per face, readout in a dim window with bright digits; no shadows beyond the control's own.
- Type/composition: small caps sans legends under or beside each control, scale ticks with sparse numerals, the readout in a mono or seven-segment face; controls on a strict grid with more air around the important dial.
- Topology/navigation: one face per task, functions live as physical controls in a grid grouped by row; moving between tasks is switching faces; continuous values own dials, discrete values own keys.
- Controls/state: a dial shows its value by pointer angle and detent, an active key lights, a readout updates one value at a time; loading is the readout blank; error is the readout showing a code and the related legend lit; disabled is a control greyed, not removed.
- Responsive/motion: the grid reflows by whole control units, never fractional; motion is detent snap on dials and key travel on press, 80-120ms, no entrances.

## Web leverage
A drag-driven rotary with pointer capture, `steps()` detents and full keyboard parity, with `:active` key travel via transform and a readout bound to the same value as the control.

## Translation
Nav is the face selector row. A list is a row of readouts; a table is a panel of labelled readouts in a grid; a form is the face itself, each field a control with its scale. Empty state is a face with all readouts blank and one legend saying what to set first. Sits on industry (instrument grid, mono data, mechanical motion) or modernist (silver, one signal color); the language supplies tokens, the world supplies the one-color rule, control physics, and one-value-at-a-time readouts.

## Risks
Costume: skeuomorphic knobs with drop shadows on a page that is mostly text. Fails when the task needs many values visible at once or long text. Slop when every control gets a color, when dials decorate stats that are not adjustable, or when the readout becomes a dashboard of cards.
