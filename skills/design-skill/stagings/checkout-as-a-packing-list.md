---
id: checkout-as-a-packing-list
name: Checkout as a Packing List
modes: [operate]
grain: flow
platforms: [web, ios, android]
rating: 2
---

# Checkout as a Packing List

## Form
A checkout or multi-step submission staged as one packing list on a single sheet: every item the order needs (address, payment, delivery window, consent) is a line that checks itself as it is satisfied, in any order, and the sheet states what is still missing.

## Spark
You paste your address and the line ticks, pick a delivery window and it ticks, and the only open line says "payment", so you fill it and the total at the foot turns from grey to the pay button.

## Grammar
- Staging/hierarchy: the list owns the view with the running total and the one pay action pinned at the foot; open lines outrank ticked ones by weight; the order contents sit in a margin, not a separate page.
- Sequence/attention: the eye scans for the open line, satisfies it, returns to the foot; no step numbers force an order; the sheet is the progress.
- Controls/state: each line is a collapsed field group that opens in place; states per line are open, satisfied, error with the reason on the line; the pay action is disabled with the missing lines named beside it, never hidden; editing a satisfied line reopens only that line.
- Adaptation: phones keep the total and action sticky at the bottom with lines above; keyboard moves to the first open line; screen readers hear the count of open lines.

## Web leverage
Per-line validation with a derived readiness state driving one action, and in-place expansion with `details`-like semantics so the sheet stays a single form.

## Fits
Forms: checkout, applications, multi-part submissions, setup that needs several facts. The trap: flows with a real dependency order (payment after a quote that depends on address) where any-order is a lie, and single-field forms where the sheet is empty theatre.
