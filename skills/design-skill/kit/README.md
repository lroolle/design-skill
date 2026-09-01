# kit -- start from material

The product of this skill. A build begins by copying one of these two
kits into the project and editing it, not by reading advice and then
writing CSS from memory. What binds is what you start from.

```
kit/
  floor/    correct but without a look. Build MUST overwrite palette + composition.
    tokens.css       every contract token, both themes, a real CJK face wired
    base.css         browser surfaces, focus, numerals, print, the zh mode (:lang)
    fonts.zh.css     the CJK webfont routes and metric fallbacks
    fonts.latin.css  Latin webfont fallbacks, when one is earned
  house/    our aesthetic; usually kept. Ink on paper, administrative register,
            CJK-native, rules not boxes, one cinnabar stamp.
    tokens.css       observed palette with provenance and irregular relationships
    base.css         the sheet, the running head, ruled headings, zh voice
    components.css   ledger, spec sheet, stamp, fields, void, tabs, dialog, notes
  check.sh  the binding layer: FAIL/WARN, near-zero context, unskippable
  fonts.sh  self-host any face as unicode-range slices (Google or vendor ttf)
```

## Which kit

| Situation | Kit | Then |
|---|---|---|
| Our own product, tool, doc, admin, report | house | keep; re-ink only if the world card demands |
| A client or brand with its own identity | floor | re-ink from the brand's measured values (SKILL.md, extraction) |
| A world rolled from the deck | floor or house | re-ink from the world card's palette line; compose from its topology |
| Throwaway page | floor | `check.sh --no-promise`; still no system stack on a zh page |
| A governed context (see below) | neither | adopt the official system; the kit supplies only what it leaves undecided |

Load order: `tokens.css` -> `floor/base.css` -> (`house/base.css` ->
`house/components.css`) -> the project's own CSS. The floor's base is
always in the stack: it is the floor.

## The zh switch

`<html lang="zh-Hans">` (or `zh-Hant`, `ja`, `ko`) flips, together, in
`floor/base.css`: the face stack to a real webfont, leading to 1.75,
measure to 38em, `line-break: strict`, punctuation trim, emphasis dots
instead of italic, zero display tracking. `check.sh` auto-detects the
attribute and starts requiring a CJK `@font-face`. Copy register is
`specimens/zh-voice.md`; the reasons are `references/cjk.md`.

```
kit/fonts.sh "Noto Sans SC" 400,700 public/fonts      # 70-120 slices, page loads what it uses
<link rel="stylesheet" href="/fonts/noto-sans-sc.css">
```

## Wiring by stack

Plain CSS: link the files in order; dark via `data-theme="dark"` on
`<html>` or a `prefers-color-scheme` mirror. Tailwind v4: `@import` the
token file, then `@theme inline { --color-bg: var(--bg); ... }` so
utilities carry the names; palette classes stay banned. shadcn: alias
in `globals.css` (`--background: var(--bg)`, `--primary: var(--accent)`,
`--ring: var(--focus)`, `--border: var(--line)`, `--muted-foreground:
var(--fg-2)`); `components/ui/` is exempt from `check.sh`. Next / Astro /
Vite: import in the root layout; set the theme attribute in an inline
script before paint. React Native / Flutter: export the same names as a
JS object or a `Tokens` class, OKLCH converted to sRGB once with a tool.
Motion libraries read `--dur-*` and `--ease-*`; a literal `300ms ease`
in app code is a defect.

Edit hook: `kit/check.sh --fast src` after every write; the full pass
once at Review. The hook advises; it never blocks.

## Governed contexts: adopt, do not restyle

An official system is the material. GOV.UK, USWDS, Polaris (Shopify
admin), Primer (GitHub), Material 3 (Android), Apple HIG (iOS / macOS),
Fluent 2 (Windows, Teams), Atlassian, Carbon (IBM), Spectrum (Adobe);
in zh enterprise: Ant Design, Arco, Semi, TDesign, Fusion. Adopt whole
-- components, a11y contract, spacing, type -- and use the kit only for
density inside its range, imagery, voice, and the brand surfaces it does
not cover. An aesthetic (glass, brutalism, editorial) is not a system:
no package, no components, no a11y contract.

## check.sh

```
kit/check.sh [--fast] [--zh|--no-zh] [--no-promise] [--tokens FILE] [DIR ...]
```

FAIL: raw color outside tokens; palette classes; pure black/white;
urgency animation; layout-property transitions; side-stripe or gradient
text; a saturated face in a font declaration; placeholder content; emoji
as UI; animation with no reduced-motion rule; no promise comment or no
roll key in FORM; zh with no CJK `@font-face`; zh leading under 1.7.

WARN: neutrals as one hue at one chroma (a computed ramp); neutrals on
the accent hue (the seed ladder); the floor palette shipped unchanged;
uppercase-tracked micro-label sprawl; the generated-dashboard shape
(masthead + band + 2-col + sticky card rail); zh measure over 40; CJK
without a space before Latin or digits; half-width punctuation after
CJK; exclamation marks; italic on a zh page.

Warnings ship only with a reason written in DESIGN.md. The layout
reflexes warn rather than fail because a heuristic that blocks gets
disabled; a heuristic that names the shape gets read.
