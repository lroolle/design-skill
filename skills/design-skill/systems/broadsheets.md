# broadsheets -- newsroom hierarchy

The editorial one. Newsprint, ink, one editorial red as a signal, serif headlines over sans chrome, hairline columns, importance told by size, real photographs. The mechanism is hierarchy of stories; the gate is content. Scene: a newsroom at deadline; the front page laid out on the desk.
Fits: news, magazines, newsletters, blogs, changelogs and release notes, research publications.
Does not fit: anything without a byline and a date.

## Faces
- display: Source Serif 4 at 700, optical sizing on -- headlines upright, tight
- body: same face at 400 -- the newspaper reads in serif
- ui (`--font-ui`): Source Sans 3 -- chrome, kickers, bylines, captions
- mono: Source Code Pro -- datelines, times, data
- CJK partner: Noto Serif SC, Songti SC for text; Noto Sans SC under chrome -- one superfamily, shared proportions

## Dials
- ratio 1.333, base 1.0625rem
- density 0.85
- radius 0 (sm 0.125rem on form controls only, lg 0)
- elevation: flat, shadows `none`; hairlines and the 2px ink rule do the structure
- motion mechanical: micro 80ms, base 150ms, enter 200ms; ease-in-out linear; budget: image crossfade, menu sheet

## Signature moves
- The hed/dek/dateline stack: kicker (sans, uppercase, tracked), hed (serif 700), dek (serif), byline and time (sans, time in mono).
- Story-size hierarchy: lede 2x, secondaries 1x, briefs as a rule-separated list.
- The 2px section rule (`[data-section-rule]`): the one masthead device.

## Turns to slop
- The broadsheet costume: hairlines and zero radius on content with no stories. No heds and dates, no broadsheets.
- Italic serif hero with mono microlabels: headlines are upright 700; the kicker is the only small device.
- Three identical story cards: a uniform grid says nothing about importance. Build a lede package.
- Fake newsroom, red as theme: lorem heds, uncredited stock, red nav. Real bylines and dates; red under 5%.

Contract: `broadsheets.css`.
