# Craft

Type, structure, and motion, in one file, loaded at Build. The kit
already sets most of this (`kit/floor/base.css`); this is the judgment
the CSS cannot make for you. CJK has its own file (`cjk.md`); living
elements have theirs (`simulation.md`).

## Type

### Roles

Three per project, named, nothing else:

| Role | Carries | Setting |
|---|---|---|
| display | headlines, mastheads, numbers-as-hero | 600-900; tracking -0.01 to -0.04em at large sizes (Latin only); leading 1.0-1.15 (Latin), 1.3-1.4 (CJK) |
| body / UI | paragraphs, labels, controls, nav | 400-500; leading 1.5-1.65 (Latin), 1.7-1.8 (CJK); tracking 0 |
| mono / data | code, tabular numbers, IDs, timestamps | 400; tabular by nature; leading 1.4-1.5 |

Two roles may share a family (display = body at heavier weight); that
is usually stronger than a weak pairing. A fourth "eyebrow" role is a
device, not a role, and is rationed below.

### Scale

One ratio: 1.2 (tools, dense), 1.25 (product UI), 1.333 (content),
1.5 (brand). Base 16px UI, 17-19px long reading. Fluid with per-role
compression: headlines compress ~2:1 desktop to phone, body barely
moves. Adjacent levels differ by >= 1.2x; four or five levels is
plenty. `specimens/type/` has the real settings.

### Pairing

Pair on one axis or do not pair: structure (serif x sans),
construction (geometric x humanist), proportion (condensed x wide),
or one family across weights. Never two similar faces. Test at the
sizes and on the ground they will be used, on a phone.

### Faces

System stacks are never a tell. A webfont is earned by identity. The
saturated list (anti-patterns.md) is off the display role. Catalog,
by voice, all OFL or Fontshare unless marked:

- **grotesk / neo-grotesque**: Switzer (Fontshare; the modernist
  default), General Sans (Fontshare), Schibsted Grotesk (nocturnes
  default), Hanken Grotesk, Familjen Grotesk, Archivo (industry
  default; width axis is the label device), Public Sans (house; the
  civic face), Work Sans, Onest, Albert Sans. Paid: Neue Haas Grotesk,
  Suisse Int'l, GT America, Soehne, Untitled Sans.
- **humanist sans**: Source Sans 3 (classical / broadsheets chrome),
  Alegreya Sans (organic body), Atkinson Hyperlegible, PT Sans, Fira
  Sans, Karla, Cabin, Asap (width axis), Signika, Author (Fontshare),
  Ranade (Fontshare), system-ui.
- **geometric (the reflex lives here)**: Sora, Urbanist, Red Hat
  Display / Text, Rubik, Supreme (Fontshare). Paid: Futura PT, GT
  Walsheim (watch).
- **old-style / transitional serif**: EB Garamond (classical
  default; onum, smcp), Libre Caslon Text + Display, Spectral,
  Literata (opsz), Source Serif 4 (broadsheets default; opsz),
  Merriweather, PT Serif, Alegreya (organic display), Andada Pro,
  Cardo, Gambetta / Sentient / Erode (Fontshare). System: Charter,
  Iowan Old Style, Palatino, Georgia. Paid: Tiempos, Signifier,
  Freight Text, Lyon, Untitled Serif.
- **slab / display serif**: Zilla Slab, Bitter, Arvo, Young Serif,
  Boska (Fontshare).
- **condensed / poster**: Barlow + Condensed, Archivo Narrow, IBM
  Plex Sans Condensed, Oswald (newspaper kicker), Big Shoulders,
  Bebas Neue, Anton, Anybody (width axis), Tanker (Fontshare), Khand.
- **mono**: JetBrains Mono (the working default), Source Code Pro,
  Fira Code, Commit Mono (MIT, self-host), Martian Mono, Recursive
  (sans + mono in one file), Red Hat Mono, Sometype Mono, Azeret Mono,
  Fragment Mono. System: ui-monospace, SF Mono, Menlo, Consolas.
  Paid: Berkeley Mono, Operator Mono.
- **CJK**: cjk.md.

Recipes: system-ui 650 / 400 + ui-monospace (default); Switzer 800 /
400 + JetBrains Mono (modernist); EB Garamond 500 / 400, UI Source
Sans 3, Source Code Pro (classical); Archivo 600 (labels width 75) /
400 + JetBrains Mono (industry); Alegreya 600 / Alegreya Sans 400
(organic); Schibsted 700 / 450 + JetBrains Mono (nocturnes); Source
Serif 4 700 opsz 60 / 400, UI Source Sans 3 (broadsheets); Public
Sans 600 / 400 + JetBrains Mono + Noto Sans SC (house).

Licenses: OFL and MIT bundle; Fontshare (ITF) self-host, no
redistribution; vendor CJK faces have their own pages, re-read
before bundling. `kit/fonts.sh` self-hosts as slices.

### Details that read as authored

- `tabular-nums` in tables, timers, prices, dashboards; proportional
  in prose; `slashed-zero` in mono. The kit sets it on `table`,
  `time`, `[data-num]`, numeric inputs.
- Real quotes, apostrophes and dashes; one space between sentences;
  a real ellipsis; `&nbsp;` between a number and its unit; foot and
  inch marks straight.
- `font-optical-sizing: auto` on opsz faces; `text-wrap: balance` on
  headings, `pretty` on paragraphs (the kit does both).
- Tracking: tighten display (Latin), never body; uppercase runs get
  +0.04-0.08em and are a rationed device.
- Two or three weights, held. Six weights is indecision.
- Underlines decided: thickness and offset set; links underlined in
  prose, not in nav or tables (the house kit does this).
- Measure 60-75ch Latin, 30-40 characters CJK, in `ch` / `em` on
  the container. Left-align body; center only short display runs.
- Headings closer to what follows than what precedes (space-above
  >= 2x space-below). Paragraphs: space-between or first-line
  indent, never both.

### Light on dark

Light text on dark looks thinner and glows. Compensate on all three
axes: weight +1 step, letter-spacing +0.01em (Latin), line-height
+0.05; text at L 0.90-0.94; chroma down slightly. The kit's
`[data-theme="dark"] body` does the last two; weight is the face's.

### The device ration

Uppercase tracked eyebrows, sub-12px sizes, colored kickers, italic
runs, letter-spaced captions, numbered markers 01/02/03 -- each is
an emphasis device. Per page: **one masthead device + one
section-label device**, chosen once and reused; at most two sub-12px
sizes. Repeated devices flatten emphasis into texture, and that
texture is the current generated tell (`check.sh` counts it).

### Hierarchy check

Squint. One thing first, two or three second, everything else third.
Levels blur: raise the ratio or merge. Eye has nowhere to land: the
display role is underweight. Everything shouts: devices were not
rationed.

## Structure

### Rhythm and density

All vertical spacing is a multiple of the body leading unit (16 x
1.5 = 24px); half-units for tight internals; section gaps 3-6 units.
Density multiplies the space scale: airy 1.5 (gallery, luxury),
normal 1.0, dense 0.85 (dashboards, tools), packed 0.7 (ops,
trading). At dense, tabular or mono numerals everywhere; at packed,
drop card containers, shadows, most radius; sticky headers on every
table. Never delete information to make a layout breathe: summarize
above the data, never instead of it.

### Composition: break the stack

The centered hero -> centered subtitle -> two buttons -> three cards
is every generator's default, and so is its dashboard cousin:
masthead + full-bleed band + two columns + a sticky rail of stacked
cards with micro-labels (`check.sh` names it). The composition comes
from the deck (`decks/compositions/`, `decks/worlds/`), and when it
does not, from these: split 60/40 or 70/30 with the wider zone
carrying the primary content; an offset column hugging one edge with
a deliberate void; editorial 12-col with the headline on 8, the deck
on 4, body on 6-7 and a marginal column; emphasis by where the air
is. Mobile collapses to one column, primary content first in source
order. Centered is for modals, auth, error pages, short manifestos.

### Grouping without containers

Proximity > similarity > continuity > closure. Cheapest first:
space; 1px rules; a 1px border with minimal radius, no shadow; a
tone step; a card. A card asserts "discrete, independent unit";
reserve it for things that are. Never cards in cards. Emphasis
inside a group: tone step, top rule, weight -- never a colored side
stripe. The house kit's `.sheet` is a ruled region, not a card.

### States

Every surface has five: loading (a skeleton matching the loaded
layout; never a generic spinner), empty (a composed surface that
says what belongs here and the one verb; never "no data"), error
(inline at the failure point, in the user's words, with a next step),
success (brief, then gone), partial / stale (marked with a time).
Plus first-run. Skeletons that do not match the loaded state are
noise.

### Disclosure and navigation

Tiers are the responsive strategy: P0 always visible (primary
content, action, status), P1 visible and collapsible, P2 behind a
labeled click, P3 large-viewport only. Disclosure controls are
visible and labeled; expanded content pushes down. Nav: 7 items max,
group before an eighth; primary destinations visible on every
viewport (horizontal or sidebar; bottom tab bar on phones, not a
hamburger); landmarks stay put across states.

### Forms and tables

Forms: one column; labels above; group 3-6 fields under a rule;
inline validation on blur, error under the field naming what to do;
primary action a verb on an object; destructive apart from the
default; long forms with a visible named stepper. Tables: tabular
numerals, numbers right, text left, units in the header; sticky
header; row hover as a tone step; sort and filter visible and
labeled; summaries above, never instead.

### Browser surfaces

Selection, caret, scrollbar, focus ring, `accent-color`, underline
offset, `::marker`, tabular numerals: the parts you did not draw
still carry the design, and defaults there belong to no system. The
kit themes them; a project that overrides `base.css` re-themes them.

## Motion

### Gate

| Seen | Decision |
|---|---|
| 100+ times a day (shortcuts, palette, list nav) | none; feedback under 100ms |
| tens of times (hover, tab, dropdown) | 100-200ms, opacity / transform only |
| occasional (modal, drawer, toast, page) | 200-350ms |
| rare / first time (onboarding, empty, success once) | may carry delight, once |

Saying no is the most valuable outcome. Every motion communicates
one of: state, spatial origin, continuity, hierarchy, feedback,
progress. Maps to none: cut.

### Vocabulary and physics

Entrance / exit: fade, slide from its origin, scale 0.96 -> 1, clip
reveal; exits at 50-70% of the entrance. State: crossfade, morph,
instant. Feedback: press 0.97-0.98, lift 1px + shadow step, a brief
flash at the origin. Loading: skeleton, determinate bar, spinner last.

Personality sets the physics and is a token (`--motion-personality`):

| Personality | micro / base / enter | Easing | Systems |
|---|---|---|---|
| mechanical | 50 / 100-120 / 150-160ms or instant | linear, `steps()` | industry, broadsheets, house |
| snappy | 100 / 180 / 250ms | `cubic-bezier(0.16, 1, 0.3, 1)` | default, modernist |
| weighted | 120 / 250 / 400ms | spring 300 / 20-24 | organic |
| deliberate | 150 / 300 / 500ms | expo-out in, ease-in-out state | classical, nocturnes |

Never ease-in for UI. Built-in `ease` is too weak to read as
authored. UI stays under ~300ms; longer is brand choreography (one
per viewport, brand surfaces only), a living element with a model
card (simulation.md), or a mistake.

### Choreography and scroll

First to move = most important; 40-120ms between siblings in reading
order; batch past 8-10. Landing: one hero sequence (~400ms total),
one scroll-triggered fade per section, hover on the CTA -- the whole
budget. Product: skeleton -> crossfade 200ms, values update in place,
row hover tone step, panel slide 180ms; nothing continuous. Scroll is
the user's instrument: natural 1:1 almost always; snap only for
full-viewport brand sections; triggered entrances via
IntersectionObserver, fire once, already visible under reduced
motion; parallax sparingly; hijacked never.

### Implementation

CSS transitions for enter / exit / hover; `@keyframes` for fixed
sequences; Motion (framer) or WAAPI for layout-aware and
programmatic; springs for gestures; GSAP for brand choreography.
Product surfaces animate transform and opacity only; brand surfaces
may reach past them on purpose when measured smooth on a mid-range
phone. Never top / left / width / height / margin (height reveals:
`grid-template-rows: 0fr -> 1fr`). `will-change` only while
animating. z-index systematic: nav 10, dropdown 20, modal 30, toast
40. Durations and easings from `--dur-*` / `--ease-*`; a literal
`300ms ease` in app code is a defect.

### Reduced motion

Not `animation: none`: keep opacity and color changes, cut movement.
Fade + slide -> instant or <100ms fade; scroll reveal -> already
visible; state transition -> cut; skeleton pulse -> static; ambient
-> removed, or the settled still frame for a living element. The
kit's block does the mechanical part; the still frame is yours.

### Motion anti-patterns

Layout-property animation; bounce on non-playful surfaces; no
reduced-motion handling; one identical entrance on every section;
scroll listeners instead of IntersectionObserver; continuous motion
that is not status or a model that proves something; exits slower
than entrances; the urgency kit (pulse, tick, shake -- deadlines
render as dated facts). Dated tells: magnetic buttons,
character-by-character text, morphing blobs, Lottie hero
illustrations, scroll-hijacked storytelling, parallax as identity.
