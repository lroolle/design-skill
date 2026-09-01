# data table -- the ledger at 13px

An operator reads this for hours. Everything below is about the eye
finding the wrong row fast.

```css
.ledger {
  font-family: "Public Sans", system-ui, sans-serif;
  font-size: 13px;
  line-height: 1.4;
  font-variant-numeric: tabular-nums slashed-zero;
  border-collapse: collapse;
}
.ledger th { font-weight: 600; text-align: start; padding: 6px 10px; border-bottom: 2px solid var(--fg); position: sticky; top: 0; background: var(--bg); }
.ledger th[data-unit]::after { content: ", " attr(data-unit); font-weight: 400; color: var(--fg-2); }
.ledger td { padding: 5px 10px; border-bottom: 1px solid var(--line); vertical-align: baseline; }
.ledger td[data-num] { text-align: end; font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 12.5px; }
.ledger td[data-id] { font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 12px; color: var(--fg-2); }
.ledger tbody tr:hover td { background: var(--surface); }
.ledger .worst { color: var(--danger); font-weight: 600; }
```

- Row height 30px at 13px / 1.4 + 5px padding: 24 rows per 720px.
- Numbers right-aligned in the mono at 12.5px so a column of 7-digit
  values does not wobble; units in the header, never in the cells.
- IDs and hashes in the mono at 12px in the second ink.
- The summary row shows the worst case, not the average, and sits
  above the table when the table scrolls.
- zh tables: `:lang(zh) .ledger { font-size: 13px; line-height: 1.5; }`
  -- the same size, more leading; headers are 2-4 character nouns.
