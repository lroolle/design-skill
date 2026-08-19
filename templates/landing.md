# landing -- a brand surface whose first screen says what this is and for whom

## Job

Make a stranger understand what the product is, for whom, and why it
is worth a next step -- in one screen -- then let them take that step.
Seen once or twice per visitor, so it may spend expressiveness; but
the reader is deciding, not admiring, so every ounce spent must serve
the sentence. Brand surface end to end, with one product-shaped region
(the proof: a real screenshot, real numbers, real names) that must
behave like a product surface -- honest and dense.

## Protected functions

- The one-sentence statement of what the product is and for whom,
  readable at 390px without scrolling.
- The primary call to action: one verb, present in the first screen
  and once more at the end; never competing with a second primary.
- Proof that is real: screenshots of the actual product, numbers with
  sources, names of real customers or none. Invented proof is a
  behavioral fail (trustworthy representation), not a copy nit.
- Navigation to pricing, docs, sign-in -- small, present, out of the
  hero's way.
- Legal footer, contact, and the sign-in path for returning users.

## Structure

```
+------------------------------------------------------------------+
| wordmark              nav (3-5)                    sign in | CTA  |
+------------------------------------------------------------------+
| HERO  headline: what it is, for whom (one sentence)              |
|       dek: the one reason (one sentence)                          |
|       [ CTA verb ]  secondary text link                          |
|       proof image or none -- never a placeholder                  |
+------------------------------------------------------------------+
| PROOF   real screenshot / real numbers with source / real names   |
+------------------------------------------------------------------+
| HOW IT WORKS   2-4 steps, each a verb + one sentence + one image  |
|                (asymmetric: text one side, image the other)      |
+------------------------------------------------------------------+
| WHO IT IS FOR  1-3 concrete cases in the users' words             |
+------------------------------------------------------------------+
| CLOSE   the sentence again, differently; the CTA once more        |
+------------------------------------------------------------------+
| footer: full nav, legal, contact                                  |
+------------------------------------------------------------------+
```

Hierarchy: headline first (the display role at its largest), the CTA
second, the proof third. Nothing in the hero competes with the
sentence -- no animated backdrop, no three badges, no logo row.

Mobile: wordmark + CTA in the bar; headline, dek, CTA, proof; then
sections in order, one column, images below their text. The first
screen at 390px still holds headline + dek + CTA.

The signature moment lives in the hero: one orchestrated entrance
(title, dek, CTA in ~400ms) or one strong typographic or photographic
gesture -- one, not one per section.

## Settings

| Dial | Setting |
|---|---|
| ratio | 1.333 or 1.5 (brand-forward); the hero display compresses ~2:1 to mobile |
| density | airy 1.25-1.5 in the hero and closes; normal 1.0 in how-it-works; proof region at product density |
| color strategy | committed (one saturated color at 30-60%) or restrained with one drenched section; never full palette |
| motion budget | landing choreography: one hero sequence, one scroll-triggered fade per section, hover on the CTA; nothing continuous |
| container / measure | 72-84rem; prose blocks held to 60-70ch even inside wide sections |
| grid | 12 columns, asymmetric spans (7/5, 8/4); alternate the heavy side between sections; one deliberate void |
| nav | horizontal, 3-5 items, CTA at the right; on mobile a compact bar with CTA visible, menu behind a labeled button |
| section rhythm | varied gaps (3x internal, then 4-6x before the close); never the same gap everywhere |

## Directions

- **modernist** -- when the product's identity is confidence and
  clarity: giant headline as the picture, one signal color on the CTA,
  a grid with a void. Fits studios, serious tools, fashion.
- **nocturnes** -- products experienced in the dark or sold on
  atmosphere (music, film, games, creative tools): one light source
  anchoring the hero, gold sparks on dates and the CTA.
- **organic** -- food, wellness, craft, education: warm ground, natural
  photography, tone-step rhythm; expressiveness through material, not
  motion.
- **classical** -- publishing, heritage, restrained luxury: the
  headline in the same serif as the body, generous margins, the text
  as the design.
- **broadsheets** -- only for content-led launches (a publication, a
  research release, a changelog-as-launch) that really have heds and
  dates.
- **default** in product mode -- developer tools whose proof is the
  product itself: quiet chrome, the screenshot carries the page.

Trap: **broadsheets on a non-editorial product** (hairlines, zero
radius, numbered markers on a SaaS landing) is the third current AI
look; and the **SaaS-cream template** (off-white, one accent, hero
with subtitle and two buttons, three feature cards, logo row) is the
first reflex for any product landing -- name it in Sense.

## States

- loading: the hero renders from HTML immediately; images arrive with
  reserved space (no layout shift), fonts swap with size-adjusted
  fallbacks.
- empty: n/a for the page; the proof region without real proof is
  removed, not filled with placeholders.
- error: a failed newsletter or CTA submit says what failed inline
  and keeps the typed value.
- success: submit confirms in one sentence in place; no confetti, no
  modal.
- partial: a product region that depends on live data (status,
  pricing) shows a dated value or a plain "unavailable", never a
  spinner in the hero.
- first-run: this page IS first-run; there is no second-visit variant
  beyond a visible sign-in.

## Copy

The headline states what it is and for whom, in the users' words, in
one sentence -- not a slogan, not a category name. The dek gives the
one reason. Buttons are verbs that name the next step ("Start a
project", "Read the docs"), never "Get started" under a hero that has
not said what the product is. Proof numbers carry a source or a date.
No triadic slogans, no "elevate / seamless / reimagined".

Good: "Invoices for freelance translators -- send, chase, get paid in
one place." / [Send your first invoice]
Bad: "Elevate your workflow. Seamless. Powerful. Yours." / [Get
started]

## Verify

P0 (on top of the rubric):
- at 390px, without scrolling: headline + dek + CTA visible and the
  sentence readable in one pass
- exactly one primary CTA style; it appears in the hero and the close
- every proof element is real or removed (no lorem, no invented
  logos, no "10,000+ users" without a source)
- one hero moment; no continuous animation anywhere; reduced motion
  leaves the page complete and still
- no horizontal scroll at 390; images have reserved dimensions
- sign-in reachable from the bar at every width

P1:
- section gaps vary; no three-equal-card row; the heavy side of the
  grid alternates
- prose blocks under 70ch even in wide sections
- headline compresses ~2:1 to mobile without orphaned words
  (`text-wrap: balance`)
- device ration: one masthead device (the hero) + one section-label
  device; no eyebrow chips on every section

Widths: 390 / 768 / 1440. On a restyle count: words in the first
screen before/after, seconds-to-CTA (scroll distance), number of
distinct CTA styles, number of proof elements that are real.

## Failure modes

- **SaaS-cream template**: cream + accent + rounded cards + hero with
  subtitle and two buttons + three features + logo row. Competent,
  forgettable, and the first reflex.
- **Broadsheet costume**: editorial rules and numbered markers on a
  product with no stories.
- **Slogan hero**: the headline is a mood ("Build the future"), the
  product is explained in section four.
- **Invented proof**: fake logos, "trusted by 5,000 teams", stock
  avatars with names. A trust failure that reads as generated.
- **Scroll theater**: hijacked scroll, parallax, character-by-character
  reveals; the reader came to decide, not to watch.
- **Two primaries**: "Start free" and "Book a demo" styled the same,
  side by side, forever.
- **Pricing for plans that do not exist**: a three-tier table
  invented to fill a section.
- **Costume restyle**: the redesign photographs better and the
  sentence got vaguer, the CTA got smaller, or the proof got prettier
  and less true.
