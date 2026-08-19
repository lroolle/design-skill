# Patterns

Composable structural building blocks. Framework-agnostic and
language-agnostic: every design system in this repo is a particular
setting of these dials. Each pattern states the problem, the mechanic,
and how it composes with the others. Load for any build or structural
audit.

## Reading hierarchy: the type scale

Pick one ratio and commit; the ratio is the personality.

| Ratio | Name | Feel | Fits |
|---|---|---|---|
| 1.2 | minor third | quiet, dense | dashboards, tools, docs |
| 1.25 | major third | tight, data-friendly | product UI default |
| 1.333 | perfect fourth | balanced, editorial | content sites, marketing |
| 1.5 | perfect fifth | dramatic, brand-forward | portfolios, campaigns |

| Role | Size | Use |
|---|---|---|
| xs | base / ratio^2 | legal, timestamps, table meta |
| sm | base / ratio | captions, secondary labels |
| base | 1rem (16px; 17-18px for long reading) | body |
| lg | base * ratio | lead paragraph, subheads |
| xl .. 4xl | base * ratio^2 .. ^5 | headings, hero |

Rules that hold across systems:
- Body measure 60-75 characters (30-40 for CJK). Wider is not "airy",
  it is unreadable.
- Line-height falls as size rises: body 1.5-1.65, headings 1.1-1.2,
  display 1.0-1.05. CJK body 1.7-1.8.
- Adjacent levels differ by at least 1.2x; if squinting cannot tell
  two levels apart, merge them.
- Paragraph rhythm: space between OR first-line indent. Never both.
- Numbers in tables and dashboards: tabular figures
  (`font-variant-numeric: tabular-nums`), monospace when density <= 0.75.

## Vertical rhythm: the baseline grid

All vertical spacing is a multiple of the body line-height unit. Body
16px x 1.5 = 24px unit; margins, gaps, image heights snap to it.
Half-units for tight internal spacing. Section gaps 3-6 units.
Derive the unit from the body leading, not from a round number.

## Density

Information per viewport without losing hierarchy. Multiplies the
spacing scale and can shift the base size.

| Level | Multiplier | Base | Feel | Use |
|---|---|---|---|---|
| airy | 1.5 | 1.125rem | gallery, luxury | landing, portfolio |
| normal | 1.0 | 1rem | standard | most apps |
| dense | 0.85 | 0.9375rem | professional | dashboards, tools |
| packed | 0.7 | 0.875rem | cockpit | trading, monitoring, ops |

At dense: tabular or mono numerals everywhere. At packed: drop card
containers (use rules or divide-y), drop shadows and most radius,
sticky headers on every table. Density is a feature on product
surfaces -- never delete information to make a layout breathe;
summarize above the data, never instead of it.

## Composition: break the centered stack

The centered hero -> centered subtitle -> two centered buttons ->
three centered cards is the default of every generator. Alternatives:

- Split (60/40, 70/30): content one side, media or data the other.
  The wider zone carries the primary content.
- Offset grid: content column hugging one edge with a deliberate
  empty margin on the other.
- Editorial columns: 12-col grid, headline spanning 8, deck in 4,
  body in 6-7 with a marginal column for notes and figures.
- Asymmetric whitespace: emphasis by where the air is, not by size.

Mobile collapses to one column, primary content first in source order.
Centered is fine for modals, auth, error pages, and short manifestos
-- not as the skeleton of a whole site.

## Grouping without containers

Gestalt order: proximity > similarity > continuity > closure.
Whitespace groups faster than borders; borders faster than color.
So the ladder, cheapest first:

1. Space-separated: generous whitespace, no lines.
2. Rule-separated: 1px rules between groups.
3. Border-boxed: 1px border, minimal radius, no shadow.
4. Tone-stepped: a background step, no border.
5. Card: border + optional elevation. A card asserts "discrete,
   independent unit" -- reserve it for things that are.

Never nest cards in cards. Emphasis inside a group: tone step,
top rule, or type weight -- never a colored side stripe.

## Color commitment ladder

Decide the strategy before picking any hue.

| Strategy | Coverage | Default for |
|---|---|---|
| restrained | tinted neutrals + accent <= 10% of surface | product UI, docs |
| committed | one saturated color at 30-60% | brand pages, launches |
| full | 3-4 named roles | data viz, campaigns, editorial features |
| drenched | the surface IS the color | campaign heroes, posters |

Even at restrained, never pure gray: neutrals carry a trace of the
seed hue (OKLCH chroma 0.005-0.015). One accent. Semantic states
(error, warning, success, info) are hue offsets held in tokens, never
raw palette classes in app code.

## State communication

Every surface has five states; the happy path is one of them.

| State | Do | Not |
|---|---|---|
| loading | skeleton matching the loaded layout's dimensions | generic spinner, generic gray bars |
| empty | a composed surface that says what belongs here and how to add it | "No data" in gray |
| error | inline, at the failure point, in the user's vocabulary, with a next step | modal alert with a code |
| success | brief, dismissible, then get out of the way | persistent banner, confetti for routine ops |
| partial / stale | mark it (timestamp, "updating") | pretend it is fresh |

Skeletons that do not structurally match the loaded state are noise.
Empty states are design surfaces, not error messages.

## Progressive disclosure

| Tier | Behavior |
|---|---|
| P0 | always visible: primary content, primary action, status |
| P1 | visible by default, collapsible: secondary content, nav, meta |
| P2 | behind a labeled click: filters, settings, tertiary info |
| P3 | large-viewport only: supplementary, parallel comparisons |

This tier map IS the responsive strategy; breakpoints only implement
it. Disclosure controls are visible and labeled -- a bare "..." menu
hides, it does not disclose. Expanded content pushes down; it does not
overlay.

## Navigation

Working memory holds 4 +/- 1 chunks: nav ceiling 7 items, group
before you add an eighth. Primary destinations stay visible on every
viewport:

```
desktop   horizontal nav (5-7) or persistent sidebar
tablet    condensed horizontal (4-5 with labels) or collapsible sidebar
mobile    bottom tab bar (4-5, always visible) + "More"; not a hamburger
```

A hamburger hides 100% of navigation. Landmarks (nav, search, account)
stay put across state changes -- moving them forces the user to
rebuild their map.

## Forms

One column. Labels above fields (not placeholders as labels). Group
by task, 3-6 fields per group, a rule or heading between groups.
Inline validation on blur, error text under the field naming what to
do. Primary action verb-labeled ("Create project", not "Submit"),
destructive action spatially apart from the default. Long forms: a
visible stepper with named steps, progress preserved on back.

## Tables and data

Tabular numerals, right-aligned numbers, left-aligned text, units in
the header not the cells. Sticky header; row hover as a highlight
step, not a color. Density dense or packed. Sort and filter visible
and labeled. Empty and loading states designed. Summaries (totals,
worst case) above the table, never replacing it.

## Browser surfaces

The parts you did not draw still carry the design: text selection,
the caret, scrollbars, focus rings, underline offset and thickness,
`accent-color` on native controls, the numerals in tabular data. They
ship with browser defaults that belong to no design system, and they
are the cheapest signal that a page was built rather than assembled --
and the one most reliably skipped. Theme them from the tokens
(`::selection`, `caret-color`, `scrollbar-color`, `accent-color`,
`:focus-visible`, `font-variant-numeric`); the token files do this in
their base rules.

## Display-device ration

Emphasis devices -- uppercase tracked microlabels, sub-12px sizes,
letter-spacing variants, italic runs, colored eyebrows -- are spent
per page: **one masthead device + one section-label device**, chosen
once and reused. Devices repeated everywhere flatten emphasis into
texture; that texture is the "AI editorial" tell.
