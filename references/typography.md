# Typography

Type is 90% of interface design by area and most of its voice. This
file is the system: roles, scale, pairing, measure, rhythm, CJK, dark
mode, and the devices that get rationed. Choosing actual faces is
fontbook.md's job; this file tells you what to ask of them.

## Roles

Define three roles per project, name them, and use nothing else:

| Role | Carries | Typical setting |
|---|---|---|
| display | headlines, mastheads, hero, numbers-as-hero | 600-900, tighter tracking (-0.01 to -0.04em) at large sizes, leading 1.0-1.15 |
| body / UI | paragraphs, labels, controls, nav | 400-500, leading 1.5-1.65 (1.7-1.8 CJK), tracking 0 |
| mono / data | code, tabular numbers, IDs, timestamps, terminal | 400, tabular by nature, leading 1.4-1.5 |

Two roles can share a family (display = body at heavier weight); that
is often stronger than a weak pairing. A fourth "eyebrow/label" role
is a device, not a role -- see the ration below.

## Scale

One ratio, committed (patterns.md has the table): 1.2-1.25 for tools,
1.333 for content, 1.5 for brand. Base 16px for UI, 17-19px for long
reading. Fluid with per-role compression -- headlines compress ~2:1
from desktop to phone, body barely moves:

```css
--text-display: clamp(2rem, 1.2rem + 3vw, 4rem);
--text-body:    clamp(1rem, 0.96rem + 0.2vw, 1.125rem);
```

Adjacent levels differ by >= 1.2x. Four to five levels is plenty; a
seven-level scale is a sign nothing was decided.

## Pairing

Pair on one clear axis, or do not pair:

- structure: serif x sans (classical, broadsheets)
- construction: geometric x humanist (modernist display + humanist body)
- proportion: condensed x wide (industry, posters)
- one family across weights and optical sizes (default, industry)

Never two similar-but-not-identical faces (two grotesks, two
transitional serifs) -- tension without hierarchy. Test the pair at
the sizes it will actually be used, on the actual background, on a
phone.

## Measure, rhythm, alignment

- Measure 60-75 characters Latin, 30-40 CJK. Set `max-width` in `ch`
  on prose containers.
- Left-align body text (LTR). Centered text forces the eye to hunt
  for each line start; it is for short display runs only. Justified
  only with hyphenation and a wide enough measure.
- Vertical rhythm from the body leading unit (patterns.md).
- Paragraphs: space-between (UI, docs) or first-line indent
  (books, long-form); never both.
- Headings closer to what follows than to what precedes (space-above
  >= 2x space-below).

## Details that read as authored

- `font-variant-numeric: tabular-nums` in tables, timers, prices,
  dashboards; proportional in prose. `slashed-zero` in mono/data.
- Real quotes and apostrophes, real dashes, `&thinsp;` around em
  dashes where the face is tight; hanging punctuation on pull quotes.
- Optical size: use `font-optical-sizing: auto` on variable faces
  with an opsz axis; a text-optimized cut at 14px, a display cut at 64.
- Tracking: tighten display, never body; uppercase runs get +0.04 to
  +0.08em and are a rationed device.
- Weight steps: pick 2-3 weights and hold them; six weights on one
  page reads as indecision.
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.
- Underlines: `text-decoration-thickness` and `text-underline-offset`
  set deliberately; links in body get underlines, nav does not.

## Light on dark

Light text on dark grounds looks thinner and glows. Compensate on all
three axes, not one: weight +1 step (400 -> 450/500), letter-spacing
+0.01em, line-height +0.05. Reduce type chroma slightly; never pure
white text -- OKLCH L 90-94%.

## CJK

| Aspect | Latin | CJK |
|---|---|---|
| word separation | spaces | none; equidistant characters |
| body leading | 1.5-1.65 | 1.7-1.8 |
| measure | 60-75ch | 30-40 characters |
| emphasis | italic | weight, or emphasis dots; never fake italic |
| line breaking | between words | between characters, kinsoku rules |
| optical weight | -- | CJK looks lighter than Latin at equal weight; +1 step or +5-10% size |

Mixed CJK + Latin: half-width space between CJK and Latin/digits
(盘古之白), explicit CJK families in the stack after the Latin face,
punctuation from the CJK face (proportional or full-width, decided
once). A CJK-primary product picks and preloads the CJK display face
first, then finds a Latin face that harmonizes with its proportions;
Latin-first with an unpreloaded CJK fallback hands the primary
audience the fallback experience.

```css
font-family: "Your Latin", "PingFang SC", "Hiragino Sans GB",
             "Noto Sans CJK SC", "Microsoft YaHei", sans-serif;
```

## Loading and performance

Self-host, `woff2`, subset (Latin + the CJK ranges you use), preload
the display face and the primary CJK face, `font-display: swap` with
size-adjusted fallbacks (`size-adjust`, `ascent-override`) so swap
does not reflow. Variable fonts when three or more weights are used.
System stacks (`system-ui`, `-apple-system`, `ui-serif`,
`ui-monospace`) are underrated: instant, native, no saturation tell
-- the right default when performance beats personality.

## The device ration

Uppercase tracked eyebrows, sub-12px sizes, colored kickers, italic
runs, letter-spaced captions, numbered markers (01/02/03) -- each is
an emphasis device. Per page: one masthead device + one section-label
device, chosen once and reused; at most two sub-12px sizes. Repeated
devices flatten emphasis into texture, and that texture is the
current "AI editorial" tell.

## Hierarchy check

Squint at the page (or blur the screenshot). You should still see:
one thing first, two or three things second, everything else third.
If levels blur together, increase the ratio or merge levels; if the
eye has nowhere to land, the display role is underweight; if
everything shouts, devices were not rationed.
