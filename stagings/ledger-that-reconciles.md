---
id: ledger-that-reconciles
name: Ledger That Reconciles
modes: [operate]
grain: view
platforms: [web, ios, android]
rating: 3
---

# Ledger That Reconciles

## Form
A data-entry screen staged as a ledger whose totals, balances and checks re-run as you type, where every line shows its effect on the whole and the sheet itself tells you when it balances.

## Spark
You enter 1,240.00 against the invoice, the running balance in the margin ticks to zero, the row's check mark fills, and the footer reads RECONCILED before you reach for a button.

## Grammar
- Staging/hierarchy: the ledger rows own the view; totals and checks sit in a fixed margin and footer that never scroll away; the balance state is the largest signal on the screen.
- Sequence/attention: type, see the effect in the margin, move to the next line; an unbalanced state is visible at all times, never revealed on submit.
- Controls/state: every row is editable in place with tabular numerals; states are balanced, unbalanced by N, pending, locked; errors sit on the row that caused them with the amount off; commit is available only when balanced, and says what it will post.
- Adaptation: narrow screens keep the footer balance sticky and show one row expanded at a time; keyboard moves cell to cell with the margin announcing the running balance.

## Web leverage
Debounced recomputation of totals and constraint checks on every input with `aria-live` on the balance cell, so the sheet's state is always current and announced.

## Fits
Forms and dashboards for finance, inventory, scheduling, allocation -- anything with a sum that must close. The trap: a form with no invariant to reconcile, where the margin shows decorative totals nobody checks.
