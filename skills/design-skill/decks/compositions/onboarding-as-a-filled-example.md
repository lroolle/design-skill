---
id: onboarding-as-a-filled-example
name: Onboarding as a Filled-In Example
modes: [operate]
grain: flow
platforms: [web, ios, android]
rating: 3
---

# Onboarding as a Filled-In Example

## Form
A first-run flow staged as a complete, working example already filled in with honest sample data, where the user edits the example into their own thing instead of building from an empty form.

## Spark
You arrive and a project named "Example: weekly newsletter" is already there with three real-looking issues; you rename it, delete two issues, change the send day, and you are set up without ever meeting a blank field.

## Grammar
- Staging/hierarchy: the example owns the screen at full working size, labelled as an example once, at the top; the edit affordances on every field outrank any tour overlay.
- Sequence/attention: read the example, change what is wrong, notice what you did not know existed because it is already there; no step counter leads the eye.
- Controls/state: every sample value is editable in place and visibly marked synthetic until changed; finish is "keep" or "start blank"; states are example, partly yours, yours; leaving early keeps what you changed.
- Adaptation: phones show the example as a scrollable single column with a sticky "this is an example" line; keyboard tabs field to field; the sample data is labelled for screen readers.

## Web leverage
Optimistic in-place editing over a seeded record with per-field provenance (sample vs user), so the flow needs no wizard state machine.

## Fits
App-shell onboarding, forms-heavy setups, template adoption. The trap: an example whose data is invented claims or a named fake person (it becomes fake content), or a locked demo the user cannot actually edit (it becomes a tour).
