# zh body -- prose and UI text

Set against a rendered page in Noto Sans SC and Noto Serif SC at 1x
and 2x, on the house paper. The numbers below are what looked right;
the reasons are in references/cjk.md.

## Product UI, Hei

```css
:lang(zh) body {
  font-family: "Public Sans", "Noto Sans SC", "PingFang SC", sans-serif;
  font-size: 15px;          /* 14 is the floor for read text; 16 in inputs on phones */
  line-height: 1.75;
  letter-spacing: 0;
}
:lang(zh) small, :lang(zh) .meta { font-size: 13px; line-height: 1.6; letter-spacing: 0.01em; }
:lang(zh) button, :lang(zh) label { font-weight: 500; }
```

At 15px / 1.75 a line of Hei is 26px tall; a 38em measure holds 37-38
characters. That is the width of one column of a printed timetable.

## Long reading, Song

```css
:lang(zh) article {
  font-family: "Source Serif 4", "Noto Serif SC", "Songti SC", serif;
  font-size: 17px;
  line-height: 1.8;
  max-width: 36em;
}
:lang(zh) article p { text-indent: 2em; margin: 0; }          /* indent OR space-between, never both */
:lang(zh) article p:first-of-type, :lang(zh) article h2 + p { text-indent: 0; }
:lang(zh) article em { font-style: normal; text-emphasis: filled dot; text-emphasis-position: under right; }
```

Song at 17px on a 0.96 L ground reads for an hour; at 15px it grays
out on a non-Retina screen. Indent is exactly two characters (`2em`).

## Warm, Kai

```css
:lang(zh) .letter {
  font-family: "Alegreya Sans", "LXGW WenKai", "LXGW WenKai TC", "Kaiti SC", serif;
  font-size: 18px;
  line-height: 1.85;
  max-width: 32em;
}
```

WenKai is lighter than Hei at equal size; +1px and +0.05 leading
compensates. Never below 16px.

## Dark ground

```css
[data-theme="dark"]:lang(zh) body { font-weight: 500; line-height: 1.8; }
```

CJK on dark loses its thin horizontals first. Weight before size.
