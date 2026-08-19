# Platforms

The design system stays the same; the platform changes density,
targets, navigation, type sizes, motion budget, and what to verify.
Load when the surface is anything other than desktop web, or when one
product spans several platforms and must stay one product.

The invariant across all of them: the user's goal does not change when
the screen shrinks or the medium changes. Content priority tiers
(P0 always visible, P1 collapsible, P2 on demand, P3 large-viewport
only -- patterns.md) are the portable strategy; everything below is
how each platform implements it.

## Web: marketing and brand surfaces

- Density airy to normal (1.25-1.5 on brand, 1.0 in pricing tables
  and docs links). One orchestrated motion moment per viewport; scroll
  stays natural.
- Navigation: 5-7 items, one CTA; sticky only if it is thin.
- Type: display compresses ~2:1 to mobile; body 1.0625-1.125rem.
- Verify: LCP under 2.5s, no layout shift from fonts, hero readable
  at 360px, keyboard focus visible on every link, reduced motion
  leaves content visible, real copy (no placeholder names, no
  invented metrics).
- Systems: modernist, nocturnes, organic, classical; default for
  docs-like marketing.

## Web: product and app surfaces

- Density normal to dense (1.0-0.85; 0.75 for ops). Expressiveness
  competes with the task -- spend it nowhere except the empty state.
- Navigation: sidebar or top bar that never moves; bottom tab bar on
  mobile widths; command palette as the *fast* path beside the
  *discoverable* one.
- Type: 14-16px UI, tabular numerals in every table, 1.2-1.25 ratio.
- Motion: feedback and overlays only; page changes instant.
- Verify: all five states per view (loading, empty, error, success,
  partial), keyboard path through the primary task, 44px touch
  targets on touch widths, tables usable at 768px (sticky header,
  horizontal scroll with a visible edge), dark theme with tinted
  neutrals.
- Systems: default, industry, broadsheets (for content-heavy apps).

## Docs sites

- Density normal; measure 60-72ch; code blocks full width of the
  measure with a mono face at 0.9em.
- Navigation: left tree (collapsible), right "on this page", top
  search -- all three visible at >= 1280px; on mobile a single menu
  plus in-page anchors.
- Type: 1.0625rem body, 1.25-1.333 ratio, headings with anchor links.
- Motion: none beyond menu open and theme switch.
- Verify: every heading is linkable, code copy works, search
  keyboard-reachable, print stylesheet exists, CJK docs use the CJK
  leading (1.7-1.8).
- Systems: default, industry (API references), classical (long
  explanatory docs), broadsheets (changelogs).

## Mobile web

- Density normal; 44px targets, 8px between adjacent targets.
- Navigation: bottom tab bar for 4-5 primary destinations, not a
  hamburger; sheets from the bottom for actions.
- Type: never below 16px in inputs (iOS zooms otherwise); headlines
  1.75-2rem.
- Motion: shorter than desktop by 20-30%; no hover-dependent reveals
  (hover enhances, never gates).
- Verify: `100dvh` not `100vh`; safe-area insets respected; no
  horizontal scroll at 360/390/430; tap targets; forms with correct
  `inputmode` and `autocomplete`.
- Systems: any; density and targets matter more than language.

## Native iOS

Adopt the HIG; our tokens supply color and the brand surfaces.

- System components (navigation bars, tab bars, sheets, lists,
  context menus) over custom; SF and SF Pro Rounded/Serif via Dynamic
  Type -- our ratio maps roles to text styles, it does not replace
  them.
- 44pt minimum targets; safe areas; no hover; haptics on state
  changes the user caused, never on arrival animations.
- Navigation: tab bar (3-5) + navigation stacks; sheets for focused
  tasks; swipe back always works.
- Motion: system transitions; custom motion only inside content.
- Verify: Dynamic Type at the largest accessibility size still lays
  out; VoiceOver labels on every control; Dark Mode with tinted
  grounds; reduced motion via the system setting.
- Systems: default (product), nocturnes (media), organic (lifestyle)
  -- all expressed through system components.

## Native Android

Adopt Material 3; our seed drives the color scheme.

- 48dp targets; edge-to-edge with insets; navigation bar (3-5) /
  navigation rail on tablets / drawer for more; FAB only for the one
  primary create action.
- Dynamic color: accept it for personal utilities (the user chose
  their wallpaper); override with a static scheme from our seed when
  brand identity is load-bearing or the product is a brand surface.
- Type: Material type scale; our ratio informs role mapping.
- Verify: TalkBack labels, large font scaling, predictive back,
  adaptive layouts at compact/medium/expanded widths.
- Systems: same as iOS; the language lives in color and imagery, the
  components are Material's.

## Desktop apps

- Density dense (0.85); keyboard-first: every action reachable by
  keyboard, menus and shortcuts as the fast path beside visible
  controls; shortcuts do not animate.
- Navigation: sidebar + toolbar + status bar; resizable panes with
  remembered sizes; window resizing down to ~900px must not break.
- Type: 13-14px UI; system UI font by default (macOS and Windows
  users feel a foreign UI font immediately).
- Native title bars and menus unless there is a strong reason; in
  Electron/Tauri, use native menus, native file dialogs, and the
  system accent only where the OS expects it; test on both OSes
  because metrics differ.
- Motion: near zero; panel toggles 100-150ms.
- Verify: full keyboard traversal, focus rings, high-contrast mode
  (forced colors: borders survive, backgrounds do not), scaling at
  125%/150%.
- Systems: default, industry.

## Slides and decks

- 16:9; one idea per slide; the headline states the takeaway, the body
  supports it.
- Type: 24pt minimum on body, 40-60pt headlines, 2-3 sizes per deck;
  left-aligned; no paragraph longer than three lines.
- Contrast high; one accent; charts with direct labels and the
  takeaway in the title.
- Motion: nearly zero -- builds only when they sequence an argument;
  no transitions between slides.
- Verify: legible from the back of a room (shrink to 25% and read
  it), every slide has one job, speaker notes carry the detail.
- Systems: modernist (the natural deck language), broadsheets (text
  and data heavy decks), nocturnes (keynote in a dark room). Export
  our tokens as 4-6 named colors plus two type roles.

## Documents, PDF, print

- Body 11-12pt serif, leading 1.4-1.5, measure 60-66 characters,
  margins generous (20-25mm); headings closer to what follows.
- Page breaks: `break-inside: avoid` on headings, figures, tables;
  running headers and page numbers.
- Print override: black text on white, backgrounds removed, links
  printed as URLs after the text, navigation hidden.
- Verify: render to PDF and read it; check widows/orphans, table
  headers repeating, images under 300dpi are fine for screen but not
  for print.
- Systems: classical (books, reports), broadsheets (newsletters,
  research), modernist (one-pagers).

## Email

- Tables for layout, inline styles, 600px single column, images with
  alt text and declared sizes; no webfonts guaranteed -- system
  stacks that degrade to Georgia/Arial gracefully.
- Dark mode: `color-scheme` meta and `@media (prefers-color-scheme:
  dark)` where supported; test in at least one client that inverts.
- One CTA as a real button (padded link), 44px tall; plain-text
  alternative always.
- Verify: renders in a webmail, a desktop client, and a phone;
  preheader text set; images off still reads.
- Systems: default (product mail), broadsheets (newsletters),
  classical (long-form letters).

## CLI and TUI

- Monospace only; respect the terminal's palette: 16-color as the
  floor, 256 and truecolor as enhancement. Semantic roles map onto
  the 16 (ok = green, warn = yellow, danger = red, accent = the
  terminal's blue or magenta) -- never hardcode 24-bit brand colors
  that ignore the user's theme.
- Respect `NO_COLOR` ([no-color.org](https://no-color.org/)) and
  `TERM=dumb`; pipe-safe output (no color when not a TTY).
- Density by alignment: columns aligned, numbers right-aligned,
  units in headers; tables over prose.
- Motion: spinners and progress bars only; no animated banners.
- Verify: output readable in light and dark terminals, at 80 columns,
  with colors off; errors name the next action.
- Systems: industry (mechanism), default (voice).

## Data visualization

- Categorical: 5-7 hues at equal lightness and chroma, seeded from
  our hue offsets; sequential: one hue, lightness ramp; diverging: two
  hues through a neutral. Check with a colorblind simulator.
- Direct labels over legends; annotate the point that matters; title
  states the takeaway; gridlines in `--line`, axes in `--fg-3`.
- Small multiples beat one overloaded chart; sparklines in tables.
- Motion: transitions between states only when they preserve object
  identity (a bar growing, not redrawing).
- Verify: tabular numerals, units, a text alternative, still readable
  in grayscale.
- Systems: industry (dense), broadsheets (editorial, annotated),
  default (product dashboards).

## Agent and chat interfaces

- Streaming text: stable measure, no reflow of earlier messages,
  code blocks with copy; the cursor/caret as the only live element.
- Tool-call blocks: collapsed by default with a one-line summary
  (verb + object + status), expandable; show the object first, then
  the action (the object-first invariant -- the user must see the
  file, record, or operation before approving a change to it).
- Message density: compact; timestamps on hover/secondary; the input
  pinned and always reachable; keyboard submit discoverable.
- Motion: none on text arrival beyond the caret; status changes
  crossfade.
- Verify: long sessions stay scrollable and fast, interrupted
  streams show state honestly, errors and retries are visible and
  labeled, reduced motion removes any shimmer.
- Systems: default (the quiet one), industry (developer-facing
  agent consoles), nocturnes (creative tools).
