# editorial -- an article, post, newsletter issue, or changelog entry built to be read

## Job

Carry a reader from headline to the last paragraph with the least
friction, and tell them in the first three lines whether this is for
them. Seen once per piece, but a publication is visited repeatedly,
so the shape must be stable across pieces. Mostly a brand surface
(the publication's identity is the type), with product-surface
obligations inside the text: navigation back to the index, dates,
authorship, the ability to find the next thing.

## Protected functions

- The headline, the dek, the byline, the date -- the reader's four
  facts, in that order, before any image.
- The text's measure and hierarchy: it must be readable for twenty
  minutes.
- Images with captions and credits; figures readable at 390.
- Navigation back to the publication and forward to the next piece
  (end of piece, not a sidebar).
- Permalinks, anchors to sections in long pieces, the share / save
  actions once, at the end.
- For changelogs: the version, the date, and what changed, in that
  order, every entry.

## Structure

```
+------------------------------------------------------------------+
| masthead / publication name        sections .......   search      |
+------------------------------------------------------------------+
|            kicker (section label)                                 |
|            HEADLINE (display, tight)                              |
|            dek: what this piece adds, one or two sentences        |
|            byline . date . reading time                           |
+------------------------------------------------------------------+
|  [ lead image, full width of the text column or wider ]          |
|  caption -- credit                                                |
+------------------------------------------------------------------+
|   margin     |  TEXT 60-66ch, 17-19px                | sidenotes  |
|   (empty or  |  h2 every 4-8 paragraphs               | / figure   |
|   figure)    |  pull quote with a rule                | refs on    |
|              |  [ inline figure + caption ]           | wide only  |
|              |  ...                                   |            |
+------------------------------------------------------------------+
|  end: author note . share/save once . related (3, ruled, no cards)|
+------------------------------------------------------------------+
| footer: full section index . subscribe . legal                    |
+------------------------------------------------------------------+
```

Hierarchy: headline, then dek, then the text. The lead image is
third; it never sits above the headline. Sidenotes and figure
references live in the margin at 1440, become inline at 768, stay
inline at 390. The masthead is the publication's one masthead device.

Mobile: masthead compressed, sections behind a labeled menu or a
horizontally scrollable bar with edge fade; headline stack; image;
text one column; end block.

The signature moment is typographic: the hed/dek/byline stack itself,
or the first paragraph's treatment (a drop cap in classical, a
kicker rule in broadsheets) -- one device, reused on every piece.

## Settings

| Dial | Setting |
|---|---|
| ratio | 1.333 (1.414 for classical long-form) |
| density | normal 1.0 in text; 0.85 on the index and in the end block |
| color strategy | restrained; links in the text ink-underlined or one quiet accent; semantic only on notices |
| motion budget | editorial: title fades in or nothing; no scroll reveals; hover lift on linked pieces at the end; instant nav |
| container / measure | text 60-66ch at 17-19px; figures may break to 80-90ch; container 72-80rem |
| grid | one text column with a marginal column on wide; 12-col on the index (lede 2x) |
| nav | masthead + section bar; back-to-index always one click; next piece at the end |
| rhythm | h2 every 4-8 paragraphs; paragraph space OR indent, never both; pull quote at most once per screen |

## Directions

- **broadsheets** -- news, magazines, newsletters with many pieces and
  sections: kicker / hed / dek / byline, column rules, size as
  importance on the index, real photos with credits.
- **classical** -- essays, long-form, personal publishing, reports:
  serif body at 18px, small caps section labels, one drop cap,
  generous margins, the text as the design.
- **default** -- changelogs, engineering blogs, docs-adjacent posts:
  quiet chrome, system type, mono for versions and code; the date
  and version as the stack.

Trap: the **Medium clone** (centered 700px column, 21px sans, gray
text, a clap button) and the **AI editorial look** (italic serif
hero, lowercase tracked mono metadata, hairline-boxed cards for
related posts, numbered markers). Both are reflexes for "article";
name them in Sense.

## States

- loading: text renders from HTML; images reserve their aspect box;
  fonts swap with size-adjusted fallbacks so the measure does not
  jump.
- empty: an index with no pieces yet says what is coming and when,
  and offers subscribe; a tag page with nothing says so in a sentence.
- error: a missing piece (404) offers the index and the three most
  recent pieces, in the publication's voice.
- success: subscribe confirms inline in one sentence; share copies a
  link and says "Link copied" in place.
- partial: a piece with a correction carries a dated correction note
  at the top or bottom, never silently edited; a live piece says
  "updated 14:20".
- first-run: the index is first-run; the lede package tells the new
  reader what the publication covers.

## Copy

Headlines are declarative and specific; they say what happened or
what the piece argues, not a topic ("Why our cache fell over on
Tuesday", not "Caching"). Deks add information the headline did not
carry, never hype. Bylines are real names; dates are absolute. Pull
quotes are sentences from the text. Changelog entries: version, date,
then "Added / Changed / Fixed" with objects, not adjectives. No
clickbait, no "you won't believe", no exclamation.

Good: "v2.4 -- 2026-08-12. Added: bulk export for invoices. Fixed:
PDF dates rendered in UTC."
Bad: "Exciting new updates are here! We've made things better than
ever."

## Verify

P0:
- headline, dek, byline, date visible before the lead image at 390
- text measure 60-66ch at 1440; base 17-19px; body leading 1.5-1.65
  (1.7-1.8 CJK)
- every image has a caption and credit (or an explicit none); figures
  readable at 390 without horizontal scroll
- back to index one click at every width; next piece at the end
- no scroll-triggered reveals; reduced motion leaves the piece
  complete
- links in text visibly links

P1:
- one masthead device + one section-label device across the whole
  publication; no eyebrow chips
- pull quotes at most one per screen; h2 rhythm 4-8 paragraphs
- related pieces at the end as a ruled list, not a card carousel
- sidenotes in the margin at 1440, inline below
- index: lede package with size hierarchy, not a uniform grid of
  identical cards
- corrections visible and dated

Widths: 390 / 768 / 1440. On a restyle count: facts in the headline
stack, characters per line, images with captions vs without, clicks
to the next piece, distinct devices used per page.

## Failure modes

- **Medium clone**: centered sans column, gray text, claps.
- **AI editorial**: italic serif hero + mono microlabels + hairline
  cards + 01/02/03 markers on a post about a product launch.
- **Image before headline**: a full-bleed hero photo with the title
  somewhere below the fold.
- **Card-grid index**: three identical cards per row, every piece the
  same size -- no hierarchy of importance.
- **Uncaptioned photos**: images with no caption, no credit, no alt.
- **Reading-progress theater**: a progress bar, a sticky share rail, a
  floating subscribe drawer -- chrome that follows the reader.
- **Sidebar carousel**: related posts in a rotating sidebar the reader
  never finishes.
- **Fake bylines**: "Team" or "Admin" or a placeholder name; a date
  that is "2 days ago" forever.
