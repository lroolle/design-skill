# portfolio -- a brand surface for a person or studio, where the work goes first

## Job

Show the work to someone deciding whether to hire, commission, or
follow -- and let them judge it from the work itself in under a
minute. Seen once or a few times per visitor. Brand surface: the site
is itself a sample of the maker's taste, so restraint and finish carry
more weight than on any other surface. But the visitor is evaluating,
so the index must be fast and the project pages must tell the truth
about what was done.

## Protected functions

- The work index: every project reachable in one click, with a real
  image and a real title.
- Project pages: what the problem was, what was made, what the
  outcome was, the maker's role -- real images, real dates.
- Who this is and how to reach them: about and contact one click
  from anywhere.
- Image quality and load: the work must look like the work; no
  cropping that hides it, no lazy placeholders that stay.
- Links to the live thing, the repo, the publication where they exist.

## Structure

```
INDEX
+------------------------------------------------------------------+
| name / studio          work . about . contact        (one line)   |
+------------------------------------------------------------------+
| one sentence: what the maker does, for whom (optional, short)     |
+------------------------------------------------------------------+
| WORK INDEX                                                       |
|  [ project image ]  title . year . one line       (asymmetric,    |
|        [ project image ]  title . year             varied sizes)  |
|  [ project image ]  title . year                                  |
|  ... or a ruled list: title . client . year . medium              |
+------------------------------------------------------------------+
| footer: contact . social . colophon (type, built with)            |
+------------------------------------------------------------------+

PROJECT
+------------------------------------------------------------------+
| <- work                                                          |
| TITLE                 client . year . role . medium              |
| the problem, in two or three sentences                           |
| [ image ]  caption                                               |
| what was made / decided, with images interleaved                 |
| outcome: what happened, with a number if there is one            |
| next project ->                                                  |
+------------------------------------------------------------------+
```

Hierarchy on the index: the work images first, titles second, the
name third. On a project page: the title and problem first, the
images second, the outcome third. The signature moment is one
typographic or compositional gesture on the index -- the giant
headline as image, a deliberate void, a ruled list of uncommon
discipline -- one, repeated nowhere else.

Mobile: name + menu; one-sentence line; work index one column,
images full width, titles beneath; project pages one column with
images full width and captions beneath.

## Settings

| Dial | Setting |
|---|---|
| ratio | 1.5 on the index (brand-forward), 1.333 on project pages |
| density | airy 1.25-1.5 on the index; normal 1.0 on project pages; the text on a project page keeps measure |
| color strategy | restrained: the work carries the color; one signal color at most; near-achromatic ground so images read true |
| motion budget | one hero moment on the index at most; image crossfade on hover is enough; project pages instant; no scroll theater |
| container / measure | index up to 90rem; project text 60-70ch; images may exceed measure |
| grid | 12 columns; asymmetric image sizes that reflect importance; or a strict ruled list |
| nav | three links and the name; no hamburger at 1440; contact visible in the footer of every page |
| images | true aspect ratios, reserved boxes, captions on project pages; dark-mode dimming only if the work allows it |

## Directions

- **modernist** -- the native fit for studios, architecture, design,
  photography: near-achromatic ground, grotesk, giant title as the
  picture, asymmetric grid with a void, one red element.
- **nocturnes** -- film, music, motion, game art: dark tinted ground
  that lets luminous work glow, one light source in the hero, gold
  for dates and the CTA.
- **organic** -- makers of physical things, ceramics, textiles, food:
  warm ground, natural-light photography, rounded photo masks against
  square type.
- **classical** -- writers, typographers, illustrators with a heritage
  register: serif body, generous margins, small caps for metadata,
  the index as a ruled list.

Trap: **scroll theater** (hijacked scroll, parallax, text that
assembles itself) and **"Awwwards Swiss"** (giant headline + tiny
mono metadata + 01/02/03 markers + magnetic cursor) -- both are the
current reflexes for "portfolio", and both put the site in front of
the work.

## States

- loading: the index renders titles from HTML immediately; images
  arrive into reserved boxes; no blur-up that stays blurred on slow
  networks -- a tone-step box until the real image lands.
- empty: a section with no projects yet ("Writing") is not linked
  until it has content; a filter that matches nothing says so.
- error: a broken image shows its caption and alt in the box, not an
  icon; a missing project page offers the index.
- success: a contact form confirms in one sentence in place; a copied
  email says "Copied".
- partial: a project still under NDA shows title, year, role, and a
  sentence, labeled as such -- not a locked-card tease.
- first-run: the index is first-run; the one-sentence line tells a
  stranger what they are looking at.

## Copy

The one-sentence line says what the maker does and for whom, plainly
("Brand and type design for publishers and small museums"). Project
titles are the project's real name. Each project page answers
problem / made / outcome / role in the maker's own voice, first
person, past tense, concrete nouns. Captions say what the image shows.
No "passionate", no "crafting experiences", no "let's create
something amazing together".

Good: "Redrew the wayfinding system for a 12-platform station;
signage reads at 40m in both scripts. Role: type and layout, 2025."
Bad: "A passion project exploring the intersection of design and
human experience."

## Verify

P0:
- every project reachable in one click from the index; every index
  image real and its true aspect
- about and contact one click from every page
- project pages state problem, made, outcome, role; dates absolute
- no scroll hijack; no continuous animation; reduced motion leaves
  the index complete
- images readable at 390 without horizontal scroll; captions present
  on project pages
- contrast of titles over images (if any overlay) at the floor, or no
  overlay

P1:
- one signature gesture on the index, none on project pages
- index sizes reflect importance (or a deliberately uniform ruled
  list) -- not a card grid with identical tiles
- the ground is near-achromatic or the system's quiet ground so the
  work's color reads true
- colophon names the type and the build
- dark mode, if offered, tested against the work's images

Widths: 390 / 768 / 1440. On a restyle count: clicks to any project,
seconds to the first real image, number of distinct devices on the
index, words before the first image on a project page.

## Failure modes

- **Awwwards Swiss**: giant headline, tiny mono metadata, numbered
  markers, magnetic cursor -- the site is the portfolio piece and the
  work is a thumbnail.
- **Scroll theater**: parallax, pinned sections, text assembling
  itself; the visitor cannot get to the work.
- **Card grid**: identical tiles with hover zoom and a gradient
  overlay; no hierarchy.
- **Blur-up forever**: lazy placeholders that never resolve on a
  slow connection.
- **Teaser pages**: project pages that show images and say nothing
  about problem, role, or outcome.
- **Hidden contact**: contact only on a dedicated page behind a
  hamburger.
- **Template voice**: "I craft delightful experiences" -- the one
  place a portfolio must not sound like every other.
- **Mood-board ground**: a saturated or gradient background that
  recolors the work.
