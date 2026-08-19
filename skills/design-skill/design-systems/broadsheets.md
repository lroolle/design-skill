# broadsheets -- newsroom hierarchy

## 1. Identity

The editorial one. Newsprint ground, ink, one editorial red used as a
signal, a serif for headlines and long-form over a sans for the
chrome, columns divided by hairlines, importance told by size, real
photographs with captions. Its whole mechanism is **hierarchy of
stories**: kicker, hed, dek, byline, dateline, and a grid where the
lede is twice the size of everything else. That mechanism only exists
when there are stories -- so the gate is content, not taste: use this
system when the surface has heds, bylines and dates. On anything else
its rules and zero radius are costume, and that costume is now the
third most recognizable AI look.

Scene: a newsroom at deadline; the front page laid out on the desk.

Fits: news, magazines, newsletters, blogs, changelogs and release
notes, research publications, company journals, the announcement
surfaces of docs.

Does not fit: dashboards, tools, campaigns, product pages, anything
without stories. If it has no byline and no date, pick default,
modernist or classical.

Anchors (mechanism, not skin): a serious daily's front page (lede
package, section rule, size as importance); a long-form magazine
online (measure, deck, photo with credit); a well-kept changelog
(dated entries, declarative heds, no hype).

## 2. Color

Seed hue 80 (newsprint). Neutral tint barely warm (C 0.004-0.008).
Strategy **restrained**: editorial red under 5% of a view -- kickers,
live tags, the subscribe CTA. Links are ink, underlined; red is a
signal, never the theme.

| Token | Light | Dark |
|---|---|---|
| --bg | oklch(0.985 0.004 80) | oklch(0.15 0.006 80) |
| --surface | oklch(0.965 0.005 80) | oklch(0.18 0.006 80) |
| --surface-2 | oklch(0.94 0.006 80) | oklch(0.22 0.007 80) |
| --fg | oklch(0.16 0.008 80) | oklch(0.92 0.005 80) |
| --fg-2 | oklch(0.42 0.008 80) | oklch(0.70 0.006 80) |
| --fg-3 | oklch(0.56 0.008 80) | oklch(0.55 0.006 80) |
| --line | oklch(0.86 0.006 80) | oklch(0.27 0.008 80) |
| --line-strong | oklch(0.16 0.008 80) = ink | oklch(0.92 0.005 80) |
| --accent | oklch(0.50 0.19 25) | oklch(0.70 0.16 25) |
| --accent-soft | oklch(0.95 0.03 25) | oklch(0.24 0.05 25) |
| --ok / --warn / --danger | hue 150 / 75 / 25 at C 0.10-0.19 | same hues, L +0.16 |

Rules: `--line-strong` is ink, because the 2px section rule is drawn
in ink, not gray. `--danger` shares the accent's hue; they stay apart
by place -- danger appears only in forms and destructive confirms,
the accent only in kickers, live tags and the one CTA -- never both
in the same block. Dark mode is a warm ink ground, photos dimmed 10%.

## 3. Type

One superfamily, all OFL, so serif, sans and mono share proportions:

| Role | Face | Notes |
|---|---|---|
| display | "Source Serif 4", Charter, Georgia, "Times New Roman", serif -- 600-700, opsz display cut at 3xl+, tracking -0.015em, leading 1.05 | headlines |
| body | "Source Serif 4" text opsz -- 400, 1.0625rem, leading 1.55 | long-form; the newspaper reads in serif |
| ui | "Source Sans 3", system-ui, sans-serif -- 400/600 | kickers, bylines, nav, buttons, captions; extra token `--font-ui` |
| mono | "Source Code Pro", ui-monospace, monospace | datelines, times, data tables |
| CJK | "Noto Serif SC" (headlines, body), "Noto Sans SC" (UI) | leading 1.75 for CJK body |

Ratio 1.333, base 1.0625rem, measure 64ch. The kicker is Source Sans
3 600 at 0.75rem, uppercase, tracked +0.08em -- and it is **the**
section-label device: no other uppercase tracked runs on the page.
Old-style figures in prose, lining in tables and datelines.

## 4. Space and density

Unit 4px scale, density 0.85 -- newsprint is dense; air is spent
between packages, not inside them. Container 80rem, 12-column grid
with column dividers drawn as 1px rules. Section gap = one 2px rule
plus one unit above the next section name.

## 5. Shape and surface

Radius **0**; `-sm` 0.125rem on form controls only. Line 1px
hairlines are structural: column dividers, between stories, under
bylines. A 2px ink rule under a section name is the masthead device.
Elevation flat, no shadow anywhere; the menu sheet uses `--overlay`
with a 1px line.

## 6. Motion

Personality **mechanical**: micro 80ms, base 150ms, enter 200ms,
linear or `--ease-subtle`. Instant navigation, no scroll reveals, no
stagger, no hover lift. The whole budget: image crossfade on gallery
change, and the menu sheet opening. Reduced motion changes nothing
visible, which is the point.

## 7. Imagery and icons

Real photography with a caption and a credit -- an image without a
caption is a defect, because in this language the caption is part of
the story. Crops 3:2 and 16:9; editorial illustration for opinion
pieces only. Icons: Phosphor regular at 1.5px, used sparingly
(search, menu, share). Data viz editorial: annotated, direct labels,
no legends, serif lining numerals, one highlighted series in accent.

## 8. Components

- Masthead + section bar: wordmark, date in mono, then a horizontal
  bar of all sections -- all visible on desktop, horizontally
  scrollable with an edge fade on mobile, never collapsed to a menu.
- Story blocks are **not cards**: hed / dek / byline / timestamp
  stacks separated by rules; the image, when present, sits above or
  beside, captioned.
- The lede package: one story at 2x (image, hed at 3xl, dek) plus a
  rail of smaller stories, rule-separated.
- Buttons: rectangular, Source Sans 3 600, small (32px), ink line or
  ink fill; the accent fill only on the subscribe CTA.
- Forms: inline newsletter signup, ruled input with an ink underline,
  one button. Errors in `--danger` under the field.
- Tables: ruled, lining figures, `--font-ui` headers.
- Pull quotes: serif at lg, a 2px ink rule above.
- Footer: the full section index in `--font-ui`, ruled columns.

## 9. Signature moves

1. **The hed/dek/dateline stack** -- a fixed hierarchy: kicker (sans,
   uppercase, tracked, small), headline (serif 700, tight), dek
   (serif 400 at lg), byline + timestamp (sans sm; the time in mono).
2. **Story-size hierarchy** -- the grid tells importance by size:
   lede 2x, secondaries 1x, briefs as a rule-separated list. Never
   three identical tiles.
3. **The 2px section rule** -- an ink rule under each section name,
   the one masthead device on the page.

## 10. Voice

Declarative headlines in the present tense; deks that add information
the hed did not carry, never hype; bylines and datelines on
everything; corrections appended, not hidden. No clickbait, no
exclamation, no "you won't believe". Active verbs. Buttons still
verbs ("Subscribe", "Read the report").

## 11. Where it turns to slop

- **The broadsheet costume.** Hairlines and zero radius on content
  that has no stories -- a SaaS pricing page dressed as a newspaper.
  This is the third current AI look. Sidestep: the gate in section 1;
  no heds and dates, no broadsheets.
- **The italic serif hero.** A giant italic serif headline over a
  cream ground with mono microlabels is the same costume in a
  different cut. Headlines are upright 700; the kicker is the only
  small device; there are no mono labels outside datelines.
- **Numbered markers.** 01 / 02 / 03 as decoration. Numbers here are
  dates, times, editions.
- **Three identical story cards.** A uniform grid says nothing about
  importance. Build a lede package.
- **Fake newsroom.** "John Doe" bylines, lorem heds, stock photos
  without credits, invented dates. Real bylines, real dates, real
  captions, or the system does not apply.
- **Red as theme.** Red nav, red buttons, red rules everywhere. Red
  is a signal under 5%; the theme is ink on newsprint.
- **Everything a card.** Boxing each story kills the rule-and-size
  hierarchy that is the whole point.

## 12. Tokens

Full file: `assets/tokens/broadsheets.css`. This file adds one extra
token, `--font-ui` (the sans for chrome), defaulting to
`var(--font-body)` where a project does not want a second face. Key
values:

```css
:root {
  --bg: oklch(0.985 0.004 80);  --fg: oklch(0.16 0.008 80);
  --accent: oklch(0.50 0.19 25); --line: oklch(0.86 0.006 80);
  --line-strong: oklch(0.16 0.008 80); --radius: 0;
  --font-display: "Source Serif 4", Charter, Georgia, serif;
  --font-body: "Source Serif 4", Charter, Georgia, serif;
  --font-ui: "Source Sans 3", system-ui, sans-serif;
  --density: 0.85;
  --dur-micro: 80ms; --dur-base: 150ms; --dur-enter: 200ms;
}
```
