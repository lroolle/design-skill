# default -- paper and ink

## 1. Identity

The quiet one. Warm paper ground, ink text, one restrained ink-blue
accent, system type set with care, structure from 1px rules and tone
steps, motion spent only on feedback. It is not neutral: it has a
point of view -- warmth, structure, restraint -- so a product that
ships it unchanged still reads as decided rather than defaulted. It
fires when there is no brand brief, and it is what a product surface
should look like while the brand surface is still being argued about.

Scene: a well-lit desk, good paper, a fountain pen; nothing on it that
is not used.

Fits: product surfaces (dashboards, settings, editors, admin, auth),
documentation, developer products, internal tools, MVPs that must look
finished without a brand budget.

Does not fit: campaigns, portfolios, launches -- anything that must be
remembered for how it looked. Spend a brand system there and keep this
for the product behind it.

Anchors (mechanism, not skin): a well-run code-hosting product's
repository pages (density, rules, tabular data that stays legible for
eight hours); good API documentation (structure over decoration, code
as first-class content); the system apps of a desktop OS (system type,
quiet chrome, the content is the color).

## 2. Color

Seed hue 75 (warm paper). Neutral tint warm. Strategy **restrained**:
tinted neutrals, accent on <= 10% of any viewport (primary action,
links, focus, selection). Accent hue 250 (ink blue) at low chroma --
paper and ink, warm ground and cool mark.

| Token | Light | Dark |
|---|---|---|
| --bg | oklch(0.985 0.005 75) | oklch(0.14 0.008 75) |
| --surface | oklch(0.965 0.006 75) | oklch(0.17 0.009 75) |
| --surface-2 | oklch(0.935 0.008 75) | oklch(0.21 0.010 75) |
| --fg | oklch(0.18 0.010 75) | oklch(0.92 0.006 75) |
| --fg-2 | oklch(0.42 0.010 75) | oklch(0.70 0.008 75) |
| --fg-3 | oklch(0.58 0.010 75) | oklch(0.55 0.008 75) |
| --line | oklch(0.88 0.008 75) | oklch(0.26 0.010 75) |
| --line-strong | oklch(0.76 0.010 75) | oklch(0.36 0.012 75) |
| --accent | oklch(0.45 0.10 250) | oklch(0.72 0.09 250) |
| --accent-soft | oklch(0.94 0.02 250) | oklch(0.24 0.03 250) |
| --ok / --warn / --danger | hue 150 / 75 / 25 at C 0.10-0.16 | same hues, L +0.16, C -0.02 |

Rules: dark mode is a redesign -- elevation by surface lightness,
accent lifted and slightly desaturated, text at L 0.92 not white.
Semantic colors appear only in semantic places (status, validation,
destructive confirm), never as decoration. Charts: accent + semantic
hues + two neutrals; never a rainbow.

## 3. Type

| Role | Face | Notes |
|---|---|---|
| display | same as body, 600-650, tracking -0.01em | display is a weight, not a second face |
| body | `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | native, instant, no saturation tell |
| mono | `ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace` | IDs, timestamps, code, tabular data |
| CJK | `"PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Microsoft YaHei"` | named in the stack after the Latin face; leading 1.7 for CJK body |

When a webfont is wanted for identity, pick ONE humanist or grotesk
text family with a real text cut (see fontbook.md, class "workhorse")
and keep display = body at heavier weight. Ratio 1.25; base 1rem
(0.9375rem when density is dense); body leading 1.5, headings 1.2,
tabular numerals in every table and count.

## 4. Space and density

Unit 4px scale (0.25rem steps to 16rem), density 1.0; dense product
views may run 0.85 with base 0.9375rem. Section gap 3x the largest
internal gap. Container 72rem, wide 90rem, measure 68ch for prose.

## 5. Shape and surface

Radius **0.25rem** (4px); `-sm` 2px, `-lg` 8px reserved for overlays.
Line 1px. Elevation model: flat -- surfaces differ by tone step or a
line; `--shadow-1` for popovers, `--shadow-2` for dialogs, both tinted
to the seed. No texture. No gradients.

## 6. Motion

Personality **snappy**: micro 100ms, base 180ms, enter 240ms, exit
~60% of enter, `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`. Budget:
feedback (press, focus, hover), overlays (fade + 4px slide), content
swaps (crossfade). Page navigation instant. No scroll effects, no
ambient motion, no stagger outside a first-run empty state.

## 7. Imagery and icons

Photography rare; when present, honest product screenshots with a 1px
line and `--radius`, no drop-shadow theatre, dimmed 10% in dark mode.
Illustration none, or single-weight line art in `--fg-2`. Icons: one
outline set (Lucide or Phosphor regular) at 1.5px, sized 16/20 to the
text they sit beside, never a second set. Data viz minimal: gridlines
in `--line`, one highlighted series in `--accent`, the rest `--fg-3`.

## 8. Components

- Buttons: primary = `--accent` fill, `--accent-fg` text; secondary =
  `--surface` with `--line`; ghost = text only; destructive uses
  `--danger` only on the confirming step. Height 36px, radius token,
  weight 500, verb labels.
- Inputs: `--surface`, 1px `--line`, focus = 2px `--focus` ring at 2px
  offset (no glow, no inner shadow). Labels above; help below; error
  text under the field in `--danger`.
- Navigation: sidebar or top bar with a 1px line; active item = tone
  step (`--surface-2`) + weight 500, not an accent bar and not a pill.
- Tables: dense, `--line` rules, sticky header, tabular numerals, row
  hover = one tone step, summaries above the table.
- Cards: only for discrete independent objects; groups of content use
  rules and space. Never a card inside a card.
- Overlays: `--overlay` + `--shadow-2`, `--radius-lg`, 1px `--line`;
  dialogs 32rem max, sheets from the edge they belong to.

## 9. Signature moves

1. **Tone-step emphasis** -- regions differ by `--surface` steps, so a
   page reads as layered paper rather than boxed cards.
2. **Mono for identifiers** -- IDs, hashes, timestamps, counts render
   in `--font-mono` at 0.9em: instantly scannable, quietly technical.
3. **The honest link** -- body links underlined, `text-underline-offset
   0.15em`, thickness 1px, in `--accent`; nav links unadorned.

## 10. Voice

Plain and specific. Sentence case everywhere. Verbs on buttons
("Create project", "Delete 3 files"). Numbers carry units. Errors say
what failed and what to do next in the user's words. No exclamation
marks, no marketing adjectives on product surfaces, no emoji.

## 11. Where it turns to slop

- **Framework gray.** Drop the seed trace and it collapses into a
  zinc/slate template. Neutrals keep C 0.005-0.010 at the seed hue.
- **Accent creep.** Accent on badges, icons, headings, and borders
  turns it into "blue SaaS". Accent = primary action, links, focus,
  selection. Count uses per viewport; more than a handful is creep.
- **Boxing.** Every group in a bordered card, cards in cards, a
  shadow on each. Reach for space, then rules, then tone, then card.
- **The cream-serif drift.** Adding a serif display and a terracotta
  accent lands it in the most recognizable current AI look. Keep the
  sans display; if re-seeding warm, re-seed the ground, not the accent.
- **System face as the voice of a committed world.** The system stack
  is right for product chrome and for this quiet default; the moment a
  persuade or experience surface binds a world, source and self-host a
  face whose character matches it -- the closest installed font is a
  failure there, not a fallback.
- **Sameness across products.** The fix is not more decoration; it is
  a re-seed (hue, accent, one webfont) plus one product-specific
  signature move.

## 12. Tokens

Full file: `assets/tokens/default.css`. Key values:

```css
:root {
  --bg: oklch(0.985 0.005 75);   --fg: oklch(0.18 0.01 75);
  --accent: oklch(0.45 0.10 250); --accent-fg: oklch(0.985 0.005 75);
  --line: oklch(0.88 0.008 75);   --radius: 0.25rem;
  --font-body: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-mono: ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
  --dur-micro: 100ms; --dur-base: 180ms; --dur-enter: 240ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```
