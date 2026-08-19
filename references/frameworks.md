# Frameworks

Two halves. First, the official design systems you **adopt** when a
context is governed -- the highest-leverage check in the whole skill,
because most "design from scratch" in a governed context is wasted or
wrong. Second, how to **install the token contract** into the stacks
you actually build with, so the material is real code, not prose.

Load when seeding a material in a governed context, or when wiring
tokens into a project's framework.

## A. Official design systems to adopt

The rule: **an official system is the material.** Adopt it whole --
its components, a11y contract, spacing, type. Use our design-systems
only for what it leaves undecided: density choice within its range,
imagery treatment, voice, the handful of brand surfaces it does not
cover. Never recreate it by hand "in our style"; that is a worse copy
with no a11y contract.

| System | Where | When it governs | How our tokens relate |
|---|---|---|---|
| GOV.UK Design System | [design-system.service.gov.uk](https://design-system.service.gov.uk/) | UK government, regulated public service; the reference for forms and errors anywhere | defer entirely; do not re-token |
| U.S. Web Design System | [designsystem.digital.gov](https://designsystem.digital.gov/) | U.S. federal and many state/local | defer; USWDS has its own token layer and Public Sans |
| Shopify Polaris | [polaris.shopify.com](https://polaris.shopify.com/) | apps embedded in the Shopify admin | defer; Polaris tokens are the material |
| GitHub Primer | [primer.style](https://primer.style/) | GitHub-adjacent developer tooling | defer; Primer's dense data UI is also a good reference for industry |
| Material 3 | [m3.material.io](https://m3.material.io/) | Android-first; explicitly Material products | defer; map our seed to M3's dynamic color source, or override it (platforms.md) |
| Apple HIG | [developer.apple.com/design](https://developer.apple.com/design/human-interface-guidelines) | native iOS / macOS / visionOS | system components + Dynamic Type; our tokens supply only color and brand surfaces |
| Fluent 2 | [fluent2.microsoft.design](https://fluent2.microsoft.design/) | Windows, Microsoft 365 add-ins, Teams apps | defer |
| Atlassian Design System | [atlassian.design](https://atlassian.design/) | Jira / Confluence marketplace apps | defer |
| IBM Carbon | [carbondesignsystem.com](https://carbondesignsystem.com/) | IBM products; a strong enterprise reference | defer; Carbon's grid and data table are good industry references |
| Adobe Spectrum | [spectrum.adobe.com](https://spectrum.adobe.com/) | Adobe plugins and extensions | defer |
| Ant Design | [ant.design](https://ant.design/) | zh enterprise / admin products where users expect it | adopt; re-seed its primary from our seed hue only |
| Arco Design | [arco.design](https://arco.design/) | ByteDance-ecosystem products; a modern zh alternative | adopt or use as component base under our tokens |
| Semi Design | [semi.design](https://semi.design/) | creator and content tools in the Douyin side | same |
| TDesign | [tdesign.tencent.com](https://tdesign.tencent.com/) | Tencent ecosystem, mini-programs | same |

An **aesthetic** -- glassmorphism, brutalism, editorial, dark-tech --
is not a design system: no official package, no components, no a11y
contract. Adopt an official system; seed one of our design-systems for
an aesthetic.

## B. Installing the token contract

The contract (design-systems/README.md) is one CSS file per system
with fixed names. Everything below maps those names onto a stack; the
names never change, so bans.sh and the specimen keep working.

### Plain CSS (canonical)

```html
<link rel="stylesheet" href="/tokens/default.css">
```

```css
.card { background: var(--surface); border: var(--line-w) solid var(--line);
        border-radius: var(--radius); padding: var(--space-5); }
```

Dark: set `data-theme="dark"` on `<html>` from a toggle, or wrap the
dark block in `@media (prefers-color-scheme: dark)` when there is no
toggle. This works everywhere; every other stack below is a mapping
onto this.

### Tailwind v4

Map the contract into `@theme` so utilities carry our names. Keep the
token file as the source of truth and reference it with `var()` so
theme switching stays a one-attribute change:

```css
@import "tailwindcss";
@import "./tokens/default.css";

@theme inline {
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-surface-2: var(--surface-2);
  --color-fg: var(--fg);
  --color-fg-2: var(--fg-2);
  --color-line: var(--line);
  --color-accent: var(--accent);
  --color-accent-fg: var(--accent-fg);
  --color-accent-soft: var(--accent-soft);
  --color-ok: var(--ok);
  --color-warn: var(--warn);
  --color-danger: var(--danger);
  --font-display: var(--font-display);
  --font-body: var(--font-body);
  --font-mono: var(--font-mono);
  --radius-md: var(--radius);
  --radius-sm: var(--radius-sm);
  --radius-lg: var(--radius-lg);
  --ease-out: var(--ease-out);
}
```

Then `bg-surface text-fg border-line rounded-md font-body`. The
Tailwind palette classes (`bg-red-500`, `text-zinc-400`) remain
available -- `bans.sh` greps for them in app code, because semantic
states come from tokens. See [Tailwind theme docs](https://tailwindcss.com/docs/theme).

### shadcn/ui

shadcn reads its own variable names. Alias ours onto theirs once in
`globals.css`; `components/ui/` is generator-managed and exempt from
the bans.

| shadcn variable | our token |
|---|---|
| `--background` / `--foreground` | `--bg` / `--fg` |
| `--card` / `--card-foreground` | `--surface` / `--fg` |
| `--popover` / `--popover-foreground` | `--overlay` / `--fg` |
| `--primary` / `--primary-foreground` | `--accent` / `--accent-fg` |
| `--secondary` / `--secondary-foreground` | `--surface-2` / `--fg` |
| `--muted` / `--muted-foreground` | `--surface-2` / `--fg-2` |
| `--accent` / `--accent-foreground` | `--accent-soft` / `--fg` |
| `--destructive` | `--danger` |
| `--border` / `--input` | `--line` / `--line-strong` |
| `--ring` | `--focus` |
| `--radius` | `--radius` |
| `--chart-1..5` | `--accent`, `--ok`, `--warn`, `--info`, `--fg-3` |

Note shadcn's `--accent` is a hover tint, not a brand accent; the
table above keeps the semantics straight. Docs:
[theming](https://ui.shadcn.com/docs/theming), [components.json](https://ui.shadcn.com/docs/components-json).

### Next.js / React, Astro, Vite

- [Next.js](https://nextjs.org/): import the token file in the root
  layout; CSS modules or Tailwind on top; the theme attribute set in a
  tiny inline script before paint to avoid a flash.
- [Astro](https://astro.build/): import in the base layout; scoped
  styles use `var()` freely; zero JS unless a toggle exists.
- [Vite](https://vite.dev/) vanilla: import in `main.css`; nothing else
  needed.

Fonts: self-host `woff2` under `/fonts`, `@font-face` in the token
file or beside it, `font-display: swap` with `size-adjust` fallbacks,
preload the display face and the CJK face (typography.md).

### Native: SwiftUI, Android, React Native, Flutter

The names survive; the container changes.

- SwiftUI: colors live in an asset catalog (light/dark variants per
  token name). OKLCH must be converted to sRGB (or Display P3) values
  first -- do it once with a tool, never by eye. Type uses Dynamic Type
  text styles instead of our scale; our ratio informs which styles map
  to which roles. See [Color](https://developer.apple.com/documentation/swiftui/color)
  and [HIG typography](https://developer.apple.com/design/human-interface-guidelines/typography).
- Android / Material 3: feed the seed hue as the dynamic color source
  or define a static scheme from our tokens; Material's type scale
  replaces ours (platforms.md).
- [React Native](https://reactnative.dev/): no CSS variables. Export
  the contract as a JS object (`tokens.default.ts`) with light/dark
  maps and read via a theme context; keep the same key names.
- [Flutter](https://docs.flutter.dev/cookbook/design/themes): map onto
  `ThemeData` / `ColorScheme` with the same names in a `Tokens` class.

### Cross-platform: design tokens JSON and Figma

For teams shipping web + native + design files, the token file can be
generated from one JSON source in the
[W3C design tokens format](https://tr.designtokens.org/format/):

```json
{
  "color": {
    "bg":     { "$type": "color", "$value": "oklch(0.985 0.005 75)" },
    "accent": { "$type": "color", "$value": "oklch(0.45 0.10 250)" }
  },
  "radius": { "md": { "$type": "dimension", "$value": "0.25rem" } }
}
```

Figma variables import from this shape (see
[Figma variables](https://help.figma.com/hc/en-us/articles/15145852043927)).
Keep the CSS file as the rendered truth; regenerate, never hand-edit
both.

### Edit-time hook (optional)

`assets/bans.sh --fast` is safe to run on every edit: it checks only the
immediate tier (raw color outside tokens, palette classes, pure
black/white, urgency classes, layout transitions). Wire it as a
post-edit hook in the agent harness and let the full pass run once at
Review -- a steady stream of copy-level findings on every edit makes a
model timid, which is the opposite of what the floor is for. Claude
Code example (`.claude/settings.json`):

```json
{
  "hooks": {
    "PostToolUse": [
      { "matcher": "Edit|Write",
        "hooks": [ { "type": "command",
                     "command": "bash scripts/bans.sh --fast src/app src/components 2>&1 | tail -20" } ] }
    ]
  }
}
```

The hook advises; it never blocks. A finding that is wrong gets a
scar with a reason in TASTE.md, not a silent regex edit.

### Motion libraries

Order of preference (motion.md has the why):

1. CSS transitions and `@keyframes` -- interruptible, off main thread
   for transform/opacity. Default for all UI motion.
2. [Motion](https://motion.dev/) for React -- layout animations, exit
   animations, springs, gestures.
3. [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
   -- programmatic control with CSS performance, no dependency.
4. [GSAP](https://gsap.com/) -- timelines and scroll choreography on
   brand surfaces; free for all use since 3.13 ([release note](https://gsap.com/blog/3-13/)).
5. [Rive](https://rive.app/) / Lottie -- vector animation assets.
   Caveat: hero Lottie illustrations are a template tell; use for
   icons and stateful illustrations, respect reduced motion manually
   (neither honors it for you).

Whatever the library, durations and easings come from the tokens
(`--dur-*`, `--ease-*`); a hardcoded `300ms ease` in app code is a
defect.
