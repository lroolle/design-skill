# primitives

Working behavior models, not presets and not effects. Each one is a
single behavior with its parameters exposed, written so it can be
re-skinned into any world and re-parameterized into any product.

`references/simulation.md` holds the doctrine -- the model card, the
six layers, the solvers, the floor. This directory holds the models
that follow it. Load a primitive when a build has something that runs
and one of these is the behavior it needs; otherwise implement from
the doctrine.

| Primitive | Says | Renderer | Cost |
|---|---|---|---|
| [point-cloud](point-cloud.js) · [specimen](point-cloud.html) | which kind of work is running: searching, threading, combining, converging | canvas 2D | ~200 dots, one rAF; parks off-screen |

## What a primitive owes

- **The model card in its header.** Ten lines. If a line will not
  fill, the thing is not designed yet.
- **The six layers kept apart** in the source, even in one file:
  model, behavior, parameters, input, skin, renderer. The test is
  three one-sentence variants that each touch one layer.
- **Every named number in one block.** A literal buried in draw code
  is a parameter that does not exist.
- **Ink from the contract**, read with `getComputedStyle` at mount
  and on theme change. Never a baked hex; dark mode is a re-lit skin,
  not a second implementation.
- **Physics from the personality.** `--motion-personality` is
  `mechanical | snappy | weighted | deliberate`. A model that glides
  under `industry` reads as a pasted demo, however well it simulates.
- **The floor.** `prefers-reduced-motion` renders the settled still
  frame -- same composition, no loop, never a blank. Park off-screen
  (IntersectionObserver) and in a hidden tab.
- **A name and a text alternative.** Canvas carries no semantics;
  the words live in the surrounding region.
- **Provenance**, if anything came from outside. Read the license of
  the specific source, take the mechanism, rewrite it into the six
  layers, and record where it came from -- in the file header and in
  the project's DESIGN.md. Visible source is not permission, and an
  MIT licence is permission to copy, not a reason to.

## Adding one

Pick the behavior from simulation.md's primitives table that has no
model here yet and that a real surface needed. Write the model card
first. Build it to the list above, add a specimen page that switches
across `../../systems/*.css`, and add a row to the table.

One caution the table cannot carry: a primitive is worth adding when
a surface must *prove* something with it. A model that proves nothing
is canvas wallpaper with better engineering.
