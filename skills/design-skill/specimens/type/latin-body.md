# latin body -- prose, UI, light on dark

## Product UI

```css
body {
  font-family: "Public Sans", "Public Sans Fallback", system-ui, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  letter-spacing: 0;
}
small, .meta { font-size: 13px; line-height: 1.45; }
button, label { font-weight: 500; }
h2 { font-size: 20px; line-height: 1.25; font-weight: 600; }
h3 { font-size: 16px; line-height: 1.3; font-weight: 600; }
```

Three sizes in the UI (13 / 15 / 20) and two weights (400 / 600 with
500 on controls). A fourth size is a device and gets rationed.

## Long reading

```css
article {
  font-family: "Source Serif 4", "Source Serif 4 Fallback", Charter, Georgia, serif;
  font-size: 18px;
  line-height: 1.6;
  max-width: 66ch;
  font-optical-sizing: auto;
}
article p + p { margin-top: 1.1em; }      /* space-between OR indent */
article h2 { font-size: 26px; line-height: 1.2; margin: 2.2em 0 0.6em; }
article a { text-decoration-thickness: 1px; text-underline-offset: 0.16em; }
```

## Light on dark

```css
[data-theme="dark"] body {
  font-weight: 450;          /* variable faces; else 500 */
  letter-spacing: 0.01em;
  line-height: 1.55;
  color: oklch(0.91 0.01 88);   /* never white */
}
```

All three axes together; one alone reads wrong.
