# docs -- a product surface for finding, reading, and copying the answer

## Job

Get a reader from a question to the answer and back to their editor
-- daily for the people who build on the product, once for the people
evaluating it. Product surface: the reader is working, not browsing.
Three things must be fast: finding (search, nav), reading (measure,
hierarchy, code), copying (code blocks that copy cleanly). Everything
else is chrome and should be quiet.

## Protected functions

- Search, always visible, keyboard-reachable.
- The navigation tree: the reader's map of the product; it stays put
  across pages.
- The content's hierarchy: headings that are anchorable, an
  on-this-page index, prev/next.
- Code blocks: language-labeled, copyable, not clipped at 390.
- Version / edition / language switch where the product has them.
- Links that look like links inside prose; external marked.

## Structure

```
+------------------------------------------------------------------+
| wordmark  docs      [ search ............ ]   version . theme . gh |
+------------------------------------------------------------------+
| NAV TREE        | CONTENT                        | ON THIS PAGE    |
|  section        |  breadcrumb                    |  h2             |
|   page *        |  H1                            |   h3            |
|   page          |  lead                          |  h2             |
|  section        |  H2                            |                 |
|   page          |  prose (65-70ch)               |                 |
|                 |  [code block   lang   copy]     |                 |
|                 |  note / warning (ruled)         |                 |
|                 |  prev <            > next       |                 |
+------------------------------------------------------------------+
| footer: edit this page . last updated . feedback                  |
+------------------------------------------------------------------+
```

Hierarchy: the H1 and lead first, the code second, the nav third.
The three columns collapse: at 768 the on-this-page index folds into
the top of the content (a disclosure), the nav becomes a labeled
drawer; at 390 one column, search in the bar, nav behind a labeled
"Menu" that shows the current section.

The signature moment, if any, is the code block: a first-class
object with its own rule, label and copy affordance -- not a gray box.

## Settings

| Dial | Setting |
|---|---|
| ratio | 1.25; base 1rem (1.0625rem for long-form guides) |
| density | normal 1.0 in content; dense 0.85 in the nav tree |
| color strategy | restrained; accent for links and the current nav item only; syntax highlighting from a small token-derived set, not a rainbow theme |
| motion budget | near zero: instant page nav, disclosure expands with a short height transition or none, copy confirmation 150ms |
| container / measure | content 65-70ch; code blocks may exceed measure with horizontal scroll inside the block |
| grid | 16rem nav / fluid content / 14rem index at 1440; content + index at 1024; one column below |
| nav | persistent tree with the current page marked by tone step + weight; section headers sticky inside the tree |
| headings | every h2/h3 anchorable with a visible-on-hover link; on-this-page tracks scroll position quietly |

## Directions

- **default** -- the native fit: quiet chrome, tone-step nav, mono
  for code and identifiers, underlined links.
- **classical** -- long-form guides and conceptual docs where reading
  is the task: serif body at 18px, generous measure, small caps for
  section labels; chrome in the UI face.
- **industry** -- API references and operational runbooks: dense,
  ruled, mono-forward tables of parameters, narrow uppercase labels.

Trap: **marketing chrome inside docs** -- a brand-system hero, a CTA
bar, gradient headers, testimonial sidebars. The reader is working;
the brand lives on the landing. Also a trap: nocturnes as the only
theme -- long reading wants light; offer dark as a theme.

## States

- loading: content renders from HTML; the nav tree is present on
  first paint; search results load in place under the field.
- empty: search with no results names the query and offers the three
  nearest sections; a new section with no pages says what is coming.
- error: a page that failed to load keeps the nav and offers the
  previous page; a failed copy says "Could not copy -- select the
  text" inline.
- success: copy confirms in the button label ("Copied") for 1.5s,
  then reverts; no toast.
- partial / stale: a page for an older version carries a dated banner
  at the top naming the current version with a link.
- first-run: the docs home is a short "start here" path of 3-5 links,
  then the tree; not a marketing page.

## Copy

Headings are tasks or nouns the reader searches for ("Authenticate
requests", "Rate limits"), not clever. The lead states what the page
covers and who needs it in two sentences. Notes and warnings say the
consequence ("Keys are shown once; store it now"). Buttons: "Copy",
"Edit this page", "Was this helpful?" with Yes / No as real verbs
("Yes, it helped" / "No, missing ..."). No "simply", no "just".

Good: "Rotate an API key -- Rotating invalidates the old key after
24 hours. Clients using it will start receiving 401."
Bad: "Key Management Made Easy! Simply click rotate to seamlessly ..."

## Verify

P0:
- keyboard-only: search reachable (a visible shortcut hint is fine,
  the path is visible too), nav tree traversable, every heading anchor
  focusable, code copy focusable
- code blocks at 390: scroll inside the block, no page-level
  horizontal scroll; language label and copy visible
- measure 65-70ch at 1440; no prose wider
- current page marked in the nav at every width; the tree does not
  reshuffle between pages
- version switch present where versions exist; stale pages bannered
- links underlined in prose; external links marked

P1:
- on-this-page index present at 1024+, folded into a disclosure below
- headings anchorable with hover link; heading hierarchy never skips a
  level
- syntax highlighting from a small token-derived set; readable in both
  themes
- prev/next carry page titles, not "Next >"
- the tree's section headers stick; the selected item is tone + weight,
  not an accent bar

Widths: 390 / 768 / 1440. On a restyle count: clicks from home to a
deep page, characters per line in prose, visible nav items at 1440,
code blocks that clip at 390.

## Failure modes

- **Marketing docs**: hero, CTA bar, gradient section headers -- the
  reader cannot find the code.
- **Gray-box code**: code as an unlabeled gray rectangle with no copy
  and a clipped right edge.
- **Hamburger at 1440**: the tree hidden behind an icon on desktop;
  the reader loses the map.
- **Accent-bar nav**: every current-state and every heading underlined
  in accent; the page shouts.
- **Rainbow syntax**: a highlighting theme with six saturated hues on
  a cream page.
- **Missing measure**: prose at 110ch on wide screens.
- **Version amnesia**: old-version pages with no banner and no way to
  the current one.
- **Tour instead of home**: an onboarding overlay over the docs home.
