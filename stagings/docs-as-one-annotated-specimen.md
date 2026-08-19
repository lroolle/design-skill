---
id: docs-as-one-annotated-specimen
name: Docs as One Annotated Specimen
modes: [read, operate]
grain: product
platforms: [web]
rating: 2
---

# Docs as One Annotated Specimen

## Form
A documentation site staged as a single working example of the product, annotated in the margin: the specimen is live and real, every concept in the docs is a callout pinned to the place in the specimen where it applies, and reading is walking the specimen.

## Spark
You land on the docs and the product is already running in front of you; you hover the thing you do not understand, the margin note for exactly that part opens, and the code that made it sits one line below.

## Grammar
- Staging/hierarchy: the specimen owns the center at working size; annotations own a margin column keyed by number; the concept index is the annotation list itself.
- Sequence/attention: attention starts on the specimen, moves to a callout, then to its code; the reader never leaves the working example to read about it.
- Controls/state: a callout selected highlights its region in the specimen and reveals its code; search jumps to the callout; a concept without a place in the specimen is a flagged gap; states are idle, focused callout, code open.
- Adaptation: narrow screens stack specimen above annotations with the highlighted region scrolled into view; keyboard walks callouts in number order; print emits specimen screenshot plus numbered notes.

## Web leverage
An embedded live instance with region anchors mapped to margin notes, code blocks bound to the same ids, and a scroll-synced highlight between the two columns.

## Fits
Docs for UI libraries, design systems, editors, and any product whose surface can be shown live. The trap: API references with nothing visual to annotate, where the specimen becomes a decorative screenshot and the docs revert to prose with a picture.
