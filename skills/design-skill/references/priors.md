# Priors

Rejections observed across our own builds, shipped with the skill
because they hold on almost every product. They are priors, not the
project's scars: a project's TASTE.md starts empty and earns its own
entries from its own rejections. Read this file at Review and before
any design verdict; when a prior fires again on your project, record
the project's own scar in TASTE.md with its evidence -- do not copy
these entries in.

Epistemic status, honestly: each entry was observed at least once in
a real build of ours, none has been through a scenario round. Expiry
conditions are kept exactly as a scar would carry them; an expired
prior is deleted, not softened.

## Metric cards replacing the data table

Why: the surface's primary task was scanning rows for anomalies;
aggregate cards cut the visible facts from hundreds to four and
averaged the outlier out of existence. Prettier, task impossible.
Reuse: on analyst and operator surfaces, summarize above the data,
never instead of it; summaries show worst case, not averages.
Expires: never (structural).

## Utility-palette breakout for semantic states

Why: one page carried the token red, a hardcoded red-50/200/700 sale
callout and amber star ratings -- three color systems, zero shared
meaning.
Reuse: semantic states derive from tokens only; `kit/check.sh`
enforces.
Expires: never (structural).

## Mixed corner languages

Why: 0-radius rules, pill CTAs, 8px alerts and 6px buttons on one
screen -- four corner languages over an untouched framework default.
Radius was never decided, only inherited.
Reuse: choosing a direction includes writing the radius token before
the first component; every corner speaks it.
Expires: never (structural).

## Device sprawl

Why: one uppercase-tracked eyebrow repeated ten times per page, five
sub-12px sizes, eight tracking values -- emphasis flattened into
texture, and that texture is the current generated-editorial tell.
Reuse: one masthead device + one section-label device per page; at
most two sub-12px sizes.
Expires: never (perceptual).

## The urgency kit

Why: pulsing dots, live countdowns and "on sale today" on a product
whose own brief said no cheap urgency; urgency devices spend trust to
buy attention.
Reuse: deadlines render as dated facts. No pulse, no tick, no exclaim.
Expires: if the primary task becomes time-critical AND the brief says
so.

## Achromatic dark mode on a tinted brand

Why: the dark theme dropped the seed hue to chroma-0 gray with pure
white cards -- a colder, different product at night, plus halation.
Reuse: dark is a second observed object with its own inks (a rubbing,
a lit board), never an inversion; never chroma 0, never #fff/#000;
dark elevation via surface lightness.
Expires: never (structural).

## Latin-first typography on a CJK-primary product

Why: the Latin display face hosted the identity while the CJK face was
a system stack -- the primary audience got the fallback experience,
excused as "a CJK webfont is 5-20 MB" (it is 150-400 KB of slices).
Reuse: CJK-primary products pick and self-host the CJK face first
(`kit/fonts.sh`); the Latin face harmonizes with it; `kit/check.sh`
fails a zh page without a CJK @font-face.
Expires: never (structural).

## A palette computed from one seed hue

Why: neutrals as one hue at nine lightnesses, accent on the same hue;
the page read as a theme, not a thing. Real inks have irregular
relationships.
Reuse: palettes come from a specimen with provenance
(`specimens/palettes/`) or a world card; ground, ink, rule and accent
are different materials; `check.sh` warns on a ramp.
Expires: never (perceptual).

## Copy that explains the layout to the reader

Why: "跨月连续排布：月份之间只有一条粗线，没有断行。" narrated the page
instead of serving the task -- the spec register on a 7 a.m. surface
(a 2026-08 zh calendar build).
Reuse: every string is read aloud as the person using it at that
moment; a sentence that explains the page is cut
(`specimens/zh-voice.md`).
Expires: never (voice).

## Icon-only multi-state controls

Why: theme and locale switchers as bare glyphs forced recognition of
state from the icon alone.
Reuse: icon-only is earned by binary universal actions (close,
search); multi-state controls carry labels.
Expires: never (behavioral).

## Template adoption without a route-and-mount audit

Why: a shipped site still rendered the chassis's demo pricing route,
unresolved i18n keys, and third-party widgets mounted in the root
layout -- chassis leakage read as generated within seconds.
Reuse: adoption ends with a route-and-mount audit; every demo route,
global mount and orphaned keyframe earns its place or dies.
Expires: never (structural).
