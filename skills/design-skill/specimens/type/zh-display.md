# zh display -- headlines, hero numerals, vertical runs

## Headline, Hei

```css
:lang(zh) h1 {
  font-family: "Noto Sans SC", "PingFang SC", sans-serif;
  font-weight: 700;
  font-size: clamp(28px, 2.4vw + 18px, 44px);
  line-height: 1.3;
  letter-spacing: 0;         /* never negative on CJK */
  text-wrap: balance;
}
:lang(zh) h1 + p { font-size: 18px; line-height: 1.7; color: var(--fg-2); }
```

A zh headline is rarely more than 12 characters; at 44px that is a
528px run, which is why zh heroes read as calmer than Latin ones. Do
not compensate with a bigger size; compensate with a numeral or a rule.

## The numeral as hero (almanac, timetable, ledger)

```css
.leaf-number {
  font-family: "JetBrains Mono", "Sarasa Mono SC", monospace;   /* or a condensed Song for the almanac */
  font-weight: 700;
  font-size: clamp(96px, 30vh, 240px);
  line-height: 0.9;
  font-variant-numeric: tabular-nums lining-nums;
  letter-spacing: -0.02em;   /* digits may be tightened; the CJK beside them may not */
}
.leaf-number + .leaf-lunar { font-size: 18px; line-height: 1.6; margin-top: 8px; }
```

## Display face, kinetic

```css
:lang(zh) .display {
  font-family: "Smiley Sans", "Noto Sans SC", sans-serif;   /* Smiley is oblique by design; do not add skew */
  font-size: clamp(40px, 6vw, 96px);
  line-height: 1.1;
}
```

Display only. Body in Smiley Sans is unreadable past three lines.

## Vertical

```css
.vertical {
  writing-mode: vertical-rl;
  text-orientation: mixed;   /* Latin rotates, CJK stays upright */
  font-family: "Noto Serif SC", "Songti SC", serif;
  font-size: 20px;
  line-height: 1.9;          /* becomes column gap */
  letter-spacing: 0.05em;    /* vertical runs want a little air between characters */
  height: 24em;              /* the column length; text wraps into the next column leftward */
}
.vertical:lang(zh) { font-feature-settings: "vert", "vrt2"; }
```

Couplets (paired-couplets), spines (thread-bound-book), and mastheads.
Punctuation must come from a face with `vert` forms or it lies on its
side; Noto Serif SC and Noto Sans SC have them.
