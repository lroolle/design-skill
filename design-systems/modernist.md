# modernist -- Swiss grid, grotesk, one signal color, air

## 1. Identity

The International Style on a screen: a strict grid, one grotesk
family carrying every role, near-achromatic ground with a cool trace,
and exactly one signal color per view. Hierarchy comes from scale and
position, not from decoration -- the headline is the picture, the
whitespace is the frame, and the single red element tells the eye
where to go. It reads as designed because everything that is not
content has been removed and what remains is placed with intent.

Scene: a white gallery wall, one red word.

Fits: studios, portfolios, architecture, fashion, museums,
manifestos, conference and event sites, brand surfaces of serious
products (the launch page in front of a quiet product surface).

Does not fit: dense product tools (unless density is set to 1.0 and
the rules kept), warm or cozy brands, anything that needs to feel
handmade. Modernist at density 1.25 in an admin panel is air the
user pays for with scrolling.

Anchors (mechanism, not skin): a Swiss poster's grid -- content
placed on a 12-column field with one deliberate void; a museum's
exhibition site where the typographic scale is the imagery; an
architecture studio's portfolio where photography runs full-bleed and
the type stays out of its way.

## 2. Color

Seed hue 250 at C 0.003-0.005: near-achromatic with a cool trace, so
white reads as gallery wall rather than framework white. Strategy
**committed** on brand surfaces via ONE signal color -- Swiss red
oklch(0.55 0.21 28) as the single accent (a rule, one word, the CTA)
-- and **restrained** on product surfaces where the accent shrinks to
focus, links, and the primary action.

| Token | Light | Dark |
|---|---|---|
| --bg | oklch(0.975 0.003 250) | oklch(0.14 0.005 250) |
| --surface | oklch(0.955 0.004 250) | oklch(0.17 0.006 250) |
| --surface-2 | oklch(0.925 0.005 250) | oklch(0.21 0.007 250) |
| --fg | oklch(0.13 0.005 250) | oklch(0.93 0.004 250) |
| --fg-2 | oklch(0.40 0.006 250) | oklch(0.70 0.005 250) |
| --fg-3 | oklch(0.56 0.006 250) | oklch(0.55 0.005 250) |
| --line | oklch(0.86 0.005 250) | oklch(0.27 0.007 250) |
| --line-strong | oklch(0.72 0.006 250) | oklch(0.38 0.008 250) |
| --accent | oklch(0.55 0.21 28) | oklch(0.62 0.17 28) |
| --accent-soft | oklch(0.94 0.03 28) | oklch(0.24 0.05 28) |
| --ok / --warn / --danger | hue 150 / 80 / 28 at C 0.10-0.16 | same hues, L +0.15, C -0.02 |

Rules: red appears once per view. A second red element demotes the
first. Danger shares the accent hue, so destructive actions on this
system use the filled red button and the word, never a red border.
Dark mode drifts toward the "vermilion on near-black" look if the
ground goes to L 0.05 neutral: keep the ground at L 0.13-0.15 with a
visible cool trace and drop accent chroma to ~0.17. Charts: fg
neutrals with one red series; never a palette.

## 3. Type

| Role | Face | Notes |
|---|---|---|
| display | Switzer 700-800, tracking -0.03em, leading 1.0-1.05 | same family as body; display is scale, not a second voice |
| body | `"Switzer", "Helvetica Neue", Helvetica, Arial, sans-serif` | free for commercial use, self-host; 400/500 |
| mono | `"JetBrains Mono", ui-monospace, Menlo, monospace` | dates, prices, specs -- content numbers only |
| CJK | `"Noto Sans SC", "Source Han Sans SC", "PingFang SC", "Hiragino Sans GB"` | a grotesk needs a plain, wide gothic partner; leading 1.7 |

Paid upgrades when the budget exists: Neue Haas Grotesk, Suisse Int'l,
GT America -- same role, better rhythm at display sizes. Ratio 1.5;
base 1.0625rem; body leading 1.5. Two weights on a page (400 + 700
or 500 + 800), never four. Uppercase tracked +0.06em labels are the
one label device and appear at most once per view.

## 4. Space and density

Unit 4px scale; density 1.25 on brand surfaces, 1.0 on product.
Container 84rem with wide margins; 12-column grid with asymmetric
spans (8/4, 7/5, 5/7) -- the centered 6/6 split is what everyone
else does. One deliberate void per page: a column or a band left
empty on purpose, so the air reads as composition and not as content
that failed to load. Measure 64ch.

## 5. Shape and surface

Radius **0**. Line 1px; the accent rule 2px. Elevation model: flat --
no shadows, no texture, no gradients. Surfaces differ by tone step
or by a rule; overlays are a `--surface` plane with a 1px line and
`--shadow-1` only where a dialog must separate from a busy photo.

## 6. Motion

Personality **snappy**: micro 100ms, base 180ms, enter 250ms, exit
~60% of enter, `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`.
Navigation is mechanical and instant -- pages cut, they do not
slide. Scroll natural. Budget: one orchestrated hero moment per site
(headline, then rule, then image; ~400ms total), hover on links,
overlays. Nothing else moves.

## 7. Imagery and icons

Photography high-contrast black and white, or full-bleed color that
the type stays out of. The typographic scale is the picture where no
photograph exists. No illustration. Navigation is typography only.
When an icon is unavoidable: Phosphor light at 1.25-1.5, one weight,
sized to the text. Data viz: rules, direct labels, one red series.

## 8. Components

- Buttons: rectangular, radius 0, height 44px on brand / 36px on
  product; sentence case 500 by default; the uppercase tracked label
  is the one device and is spent on the primary CTA if anywhere;
  primary = `--accent` fill with `--accent-fg`; secondary = 1px
  `--line-strong`; ghost = text with underline on hover.
- Inputs: 1px `--line`, radius 0, focus = 2px `--focus` outline;
  label above in `--fg-2`; no placeholder-as-label.
- Links: underline only -- 1px in `currentColor`, becoming a 2px
  `--accent` underline on hover. Nav links unadorned, current page in
  weight 700.
- Tables: 1px rules, no zebra, headers weight 700 sentence case,
  numbers in mono right-aligned.
- Cards: none. Groups are rule-separated grid cells; a grid of
  identical tiles is the tell this system exists to avoid.
- Overlays: full-height panels from the edge, 1px line, no radius.

## 9. Signature moves

1. **The headline as image** -- display at 4xl and above, hard left
   rag, tracking -0.03em, leading 1.0; the headline occupies the
   space a hero photograph would.
2. **The asymmetric grid with one void** -- 8/4 or 7/5 spans and one
   region left empty on purpose.
3. **The single red element** -- one rule, one word, or one button
   per view; everything else is grey scale.

## 10. Voice

Declarative. Terse. Present tense. One adjective at most, and only
when it is information. Sentence case everywhere; the one uppercase
label is a device, not a voice. Verbs on buttons. No exclamation.

## 11. Where it turns to slop

- **"Awwwards Swiss."** Giant text plus tiny mono metadata plus
  numbered markers 01/02/03 is a current tell. Numbers appear only
  when they are content: dates, prices, page numbers. Mono
  microlabels stay off the page.
- **The tile grid.** Twelve identical cells with the same image
  crop and the same label is a template. Vary spans, leave the void.
- **Red creep.** Two red elements per view and the system becomes
  a sale banner. Count them.
- **Decoration drift.** Glassmorphism, gradients, blurred blobs
  behind the headline -- each one is the grid apologizing.
- **The vermilion-on-black look (current AI look).** Dark mode with
  a neutral L 0.05 ground and full-chroma red is the near-black +
  acid accent cluster. Keep the cool trace, L 0.13-0.15, chroma
  ~0.17.
- **Broadsheet costume (current AI look).** Hairlines and zero
  radius are structural here, not costume: they hold a grid of
  real content. If the content is three feature blurbs, the rules
  are decorating emptiness -- use the void instead.

## 12. Tokens

Full file: `assets/tokens/modernist.css`. Key values:

```css
:root {
  --bg: oklch(0.975 0.003 250); --fg: oklch(0.13 0.005 250);
  --accent: oklch(0.55 0.21 28); --accent-fg: oklch(0.975 0.003 250);
  --line: oklch(0.86 0.005 250); --radius: 0;
  --font-body: "Switzer", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, Menlo, monospace;
  --tracking-display: -0.03em; --measure: 64ch;
  --dur-micro: 100ms; --dur-base: 180ms; --dur-enter: 250ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```
