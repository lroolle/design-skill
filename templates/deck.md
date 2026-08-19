# deck -- slides and one-pagers: one idea per slide, the takeaway in the headline

## Job

Carry an argument to a room (or an inbox) one idea at a time, so that
a reader who sees only the headlines still gets the argument. Seen
once, often from the back of a room or on a phone in a mail client,
so the floor is legibility at distance and at small size; the budget
is spent on clarity of the one idea, never on transitions. Brand
surface for the title and section slides (the deck is a sample of the
presenter's judgment); product surface for every data and content
slide (they must be read and believed).

## Protected functions

- The headline of every slide: it states the takeaway, not the topic;
  the headlines alone read as the argument.
- The data: every chart with a source, an axis or direct labels, and
  a unit; numbers that survive a photo of the screen.
- Legibility at distance: 24pt minimum for body, 18pt for footnotes
  and sources, headline much larger; contrast at the floor and beyond.
- The grid: the same margins, the same title position, on every
  slide; nothing jumps between slides.
- Export fidelity: what is shown is what the PDF and PPTX contain;
  fonts embedded or system.

## Structure

```
TITLE                         SECTION DIVIDER
+---------------------------+  +---------------------------+
|                           |  |                           |
|  Title: the argument      |  |  2 . Section name         |
|  subtitle: for whom, date |  |  one line of what it shows|
|  presenter . org          |  |                           |
+---------------------------+  +---------------------------+

CONTENT (one idea)            DATA (one chart, one claim)
+---------------------------+  +---------------------------+
| Headline: the takeaway    |  | Headline: what the data   |
|                           |  |   shows, in words         |
| one figure / three lines  |  | [ chart, direct labels ]  |
|  / one table / one image  |  | annotation at the point   |
|                           |  |   that carries the claim  |
| source . footnote (18pt)  |  | source . unit . period    |
+---------------------------+  +---------------------------+

ONE-PAGER: the same slide grammar in portrait -- a headline
argument, three to five sections each with a takeaway heading,
one figure, a source line; no decoration.
```

Hierarchy: headline first, the one figure or table second, the source
third. The signature moment is the title slide and the section
dividers -- one typographic gesture, reused; content slides have
none.

No mobile collapse: a deck is fixed 16:9 (or a fixed portrait page),
and it must be legible when the whole slide is the size of a phone
screen -- which is why 24pt is the floor, not the target.

## Settings

| Dial | Setting |
|---|---|
| ratio | 1.5 (headline to body) with a large display step for titles; body 24-28pt, headline 40-56pt, title 64-96pt |
| density | airy: one idea, one figure, 3-5 lines max; white space is the structure |
| color strategy | restrained: one accent for the claim (the highlighted bar, the one underlined number); data colors from the semantic set, at most 3 series distinct; dark rooms -> nocturnes with its light text compensation |
| motion budget | cut or a 200ms fade between slides; no builds beyond revealing the one annotation; no motion inside slides; video only when it is the content |
| container / measure | 16:9 (1920x1080 design space), margins 5-6% of width, headline spans at most 80% width; body lines 45-60 characters |
| grid | 12 columns inside the margins; title at a fixed position; figure area fixed; source line fixed at the bottom |
| nav | slide numbers and section name in the footer at 18pt; a one-line agenda slide after the title |
| export | system fonts or embedded; images at 2x; PDF with text as text; PPTX with live text where possible; colors sRGB-checked |

## Directions

- **modernist** -- the native fit for pitches, talks, strategy: giant
  headline on white, one red element, a grid that never moves; data in
  black with one accent.
- **broadsheets** -- reports, research readouts, weekly updates with
  many figures: kicker / hed / dek structure per slide, columns,
  hairlines as structure, captioned figures.
- **nocturnes** -- dark rooms, keynotes, product reveals: tinted dark
  ground, gaslight text at 450 weight, gold on the one claim; the
  single light source on the title slide only.
- **classical** -- board papers, memos, one-pagers meant to be read:
  serif body at 24pt, generous margins, small caps section labels.

Trap: the **template deck** (stock theme, gradient title slide, a
logo on every slide, bullets as content) and **bullets-as-content**
(five bullets of topic fragments under a topic headline). Also a trap:
industry's packed density on slides -- tables that read at a desk do
not read from a chair.

## States

- loading: n/a; but images must be embedded, not linked, so the deck
  renders offline and in PPTX.
- empty: a slide with no idea is deleted, not filled; a section with
  no data says "no data yet for Q3" in the headline, honestly.
- error: a chart whose source is missing carries "source pending" at
  18pt rather than no source; never invent a number to fill an axis.
- success: n/a on the surface; the deliverable is the export that
  opens where it will be presented.
- partial: a draft deck says DRAFT in the footer of every slide and
  the date; a slide with a placeholder figure says so in the figure,
  not in a note.
- first-run: the title slide and the agenda slide are first-run; the
  agenda names the sections as takeaways.

## Copy

Headlines state the takeaway in one sentence ("Churn fell 3 points
after onboarding moved in-product"), not the topic ("Churn update").
Body is three to five lines of complete short sentences or a single
figure; bullets only for true lists, and then parallel and short.
Sources name the thing and the period. Section dividers name the
section and what it will show. No exclamation, no "exciting",
no title case in body.

Good: headline "Support load dropped 40% once the status page went
live" over one chart with the launch date annotated.
Bad: headline "Support Metrics" over five bullets: "Improved
efficiency. Better experience. Streamlined ops. Exciting results.
Next steps."

## Verify

P0:
- every headline states a takeaway; read the headlines alone -- the
  argument must hold
- body 24pt or larger; sources and footnotes 18pt or larger; no text
  smaller anywhere
- one idea per slide; one figure or table or image; 3-5 lines max
- every chart: source, unit, period, direct labels or an axis; the
  claim annotated on the chart
- contrast at or above the floor with the projector margin (text L
  difference well beyond the minimum; no mid-gray on white)
- margins and title position identical on every slide; footer with
  slide number and section
- no motion beyond cut or fade; no builds except the one annotation;
  no scrolling or auto-advancing text
- export opens with the same fonts, colors, and text-as-text

P1:
- title and section slides carry the one typographic gesture; content
  slides carry none
- at most one accent per slide; data series at most 3 distinct
- a one-line agenda slide; section dividers numbered and named
- images at 2x, embedded, no placeholder images, no stock
  illustration
- dark-room decks use nocturnes' weight and leading compensation

Sizes: view the deck at 100% and at phone width (the whole slide ~390
wide); print one slide as a letter/A4 page. On a restyle count: words
per slide, slides with a stated takeaway, charts with a source, font
sizes below 24pt (must be zero).

## Failure modes

- **Template deck**: stock theme, gradient title slide, logo on every
  slide, a different layout every time.
- **Bullets as content**: topic headline over five fragments; the
  argument is in the speaker's head.
- **The 11pt table**: a spreadsheet pasted onto a slide.
- **Chart without a claim**: a dashboard screenshot with no
  annotation, no source, a legend with six colors.
- **Transition theater**: wipes, zooms, builds on every line; the
  room watches motion instead of reading.
- **Mid-gray on white**: body text that reads on a laptop and
  disappears on a projector.
- **Linked images**: a deck that shows empty boxes on someone else's
  machine.
- **Two decks in one**: the pitch deck grammar used for the board
  paper that will be read, or the reading memo presented in a room.
