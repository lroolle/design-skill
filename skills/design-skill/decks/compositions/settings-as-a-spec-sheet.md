---
id: settings-as-a-spec-sheet
name: Settings as a Spec Sheet
modes: [operate]
grain: view
platforms: [web, ios, android]
rating: 2
---

# Settings as a Spec Sheet

## Form
A settings page staged as a printed specification sheet: every setting is a labelled line with its current value stated as a fact in a fixed column, grouped under ruled section heads, with a wide margin that carries the explanation and the consequences of each line.

## Spark
You read "Retention: 30 days" as a line on the sheet, tap it, the value becomes editable in its column, the margin beside it says what happens to old data, and the line resets to a printed fact when you are done.

## Grammar
- Staging/hierarchy: the sheet owns a single column of label-value lines; section rules group them; the margin note for the focused line outranks all others; no cards, no tabs inside the sheet.
- Sequence/attention: read down the sheet as facts, stop where a fact is wrong, edit in place, read the margin consequence, move on; save is per line or per section, stated.
- Controls/state: a line at rest shows its value as text; focused it becomes the matching control in the value column; states are saved, editing, pending, failed-with-reason; a dangerous line carries its consequence in the margin and confirms on the line, not in a modal.
- Adaptation: phones stack the margin note under the focused line and keep the value column right-aligned; keyboard moves line to line; screen readers hear label, value, and the note on focus.

## Web leverage
Inline edit controls swapped in on focus with optimistic per-line save and a margin region bound to the focused line via `aria-describedby`.

## Fits
App-shell settings, account and project configuration, admin preferences. The trap: settings that are really a wizard with dependencies between lines, or a sheet so long that sections need their own navigation and the single column becomes a scroll marathon.
