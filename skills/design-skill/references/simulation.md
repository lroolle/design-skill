# Simulation

Living elements: the part of a surface that runs by itself -- the
first viewport demonstrating the mechanism, the signature interaction,
a diagram that computes, an atmosphere that drifts. motion.md governs
transitions (a drawer opening, a toast arriving); this file governs
anything that *keeps going*, *responds*, or *varies*. Its one rule:

**Do not animate the frames. Define the world that generates them.**

A transition is authored as a timeline: at 0ms this, at 250ms that.
A living element authored the same way -- "at 2.3s the membrane dips
14px" -- is brittle, unresponsive, and every variant is a re-author.
Authored as a model -- objects with state, constraints between them,
forces and inputs acting on them, rules for what happens at the
limits -- the frames emerge, the thing answers the pointer, and
"butterflies become musical notes" is a sprite swap. This is
procedural / simulation-driven animation, the common ground of game
engines, generative art, and physics-based motion design; in an age
when writing the code is cheap, the scarce skill is designing the
model. Load this file when a build has anything that runs.

## Gate: does this surface earn a living element?

| Mode | Earns one when | Budget |
|---|---|---|
| persuade | the first viewport must *prove* the mechanism and a screenshot cannot; the signature interaction is the product's own physics | one per surface, in the first viewport or the signature moment |
| experience | the work itself is the thing that runs | the work's, not the chrome's |
| read | a concept is better computed than drawn (a solver, a distribution, a queue); the reader can poke it | one per concept, inline, paused until in view |
| operate | status only: live data, progress, a gauge | none as decoration; a model on an all-day tool is theater |

Frequency still rules (motion.md): a thing seen a hundred times a day
earns nothing. A living element that explains nothing is decoration
without information (anti-patterns.md), however well it simulates.
Before building one, answer in one line each: what does it *prove*;
why *this* model and not another (a membrane that tears says load
and fragility; a particle cloud says volume; a flock says
coordination); what would a visitor describe an hour later.

## Timeline or model

| Author as a timeline (motion.md) | Author as a model (this file) |
|---|---|
| enter, exit, state change, feedback | anything continuous, looping, or responding |
| fixed choreography with a known end | behavior with a rule and no fixed end |
| "title, then dek, then CTA, 400ms" | "particles, a field, a pointer, a spawn rule" |
| CSS transitions / keyframes / WAAPI | a loop: integrate, constrain, draw |

Both can share one surface. The split-flap board (worlds/) is a model
(cells with a target glyph and a settle rule) whose each flip is a
transition. When in doubt: if you catch yourself writing seconds and
pixels for a thing that should react, you are on the wrong side.

## The model card

Write it before code, beside the promise comment or in the region's
own header comment. Ten lines; if a line will not fill, the element
is not designed yet.

```
proves:      what the visitor understands because this runs (one sentence)
objects:     the things in the world (particles, cells, bodies, glyphs) and how many
state:       per object: position, velocity, phase, target, age, ...
constraints: what holds things together or apart (distance, pin, bounds, grid)
forces:      what acts on them (gravity, wind, a field, a spring to the pointer)
inputs:      pointer / scroll / time / data / audio / keyboard; the idle behavior when none
rules:       thresholds and events: spawn, die, tear, settle, wrap, collide
skin:        how state becomes ink: shape, size, tokens used (--fg, --accent, --line)
params:      the handful a person could change in one sentence (count, stiffness, wind)
fallback:    reduced motion / no JS / off-screen / phone: the settled still frame
```

## Six layers, kept apart

"Change one variable" is not a property of code; it is a property of
an architecture that separated the layers. Keep these six apart in the
source even when the whole thing is one file:

| Layer | Owns | The swap it makes cheap |
|---|---|---|
| model | objects, state, integration, constraints | a membrane becomes a rope |
| behavior | rules, thresholds, events, lifecycle | tears at 1.6x strain instead of 1.3x |
| parameters | the named numbers, in one block | 20 becomes 80; stiff becomes slack |
| input | where the forces come from | pointer becomes audio, scroll, live data |
| skin | how state becomes ink; sprite, stroke, color tokens | butterfly becomes note; light becomes dark |
| renderer | DOM, SVG, canvas 2D, WebGL, or an offline frame render | 16:9 becomes 9:16; a page becomes a video |

The test: name three variants a visitor could ask for in one sentence
each and check that each touches one layer. If geometry, collision
radius, draw code and spawn logic live in one function, the
"variable" the brief promised does not exist yet. Every variant is
then a diff -- branch, revert, compare -- which is the real advantage
of code over rendered video: the asset is the model, not the pixels.

## Primitives

Behavior primitives are what to collect -- not presets, not effects: a
working model of one behavior, with its parameters exposed, that can
be re-skinned into any world. Each row below is one such model;
implement it from the description or fork a reference sketch under
its license (see Sources), then rewrite it into the six layers.

| Primitive | Generates | Core model | Parameters | Reads as | Cost |
|---|---|---|---|---|---|
| particles + forces | drift, rain, sparks, emergence | position, velocity; sum forces; integrate; lifetime | count, gravity, drag, emit rate, life | volume, energy, flow | low; thousands on canvas |
| flow field | coherent drift, ink in water, wind | a vector per cell from noise or a function; particles follow it | scale, speed, octaves, evolution rate | direction, atmosphere | low |
| flock (boids) | schooling, swarming, crowd | separation, alignment, cohesion within a radius | count, radii, weights, max speed | coordination, many-as-one | medium (neighbor search) |
| spring and rope | sway, drag, hang, snap back | chain of points; distance constraints; gravity; pin | segments, stiffness, damping, pin points | mass, tether, pull | low |
| cloth / membrane | sag, ripple, wrap, tear | grid of particles; stretch + shear + bend constraints; pins; tear threshold | resolution, compliance, substeps, tear strain | fragility under load, skin, surface | medium |
| soft body | squish, bounce, breathe | closed chain + pressure or shape matching | volume, stiffness, damping | life, give | medium |
| fracture | shatter, crack, break apart | pre-cut cells (Voronoi) released on impact; rigid pieces | cell count, impulse, friction | breaking, threshold, release | medium |
| reaction-diffusion | spots, stripes, coral, labyrinths | two fields, Gray-Scott update per cell | feed, kill, diffusion rates | growth, organic pattern | medium-high (full-grid update) |
| cellular automaton | growth, decay, texture | grid state + neighborhood rule per step | rule, density, step rate | life, rules, emergence | low |
| wave / Chladni | standing patterns, ripples | field driven by a source; particles settle to nodes | frequency, modes, damping | resonance, settling | medium |
| IK chain | reach, follow, tail, limb | joints solved toward a target (FABRIK / CCD) | links, lengths, target | intention, a creature | low |
| mechanical state machine | split-flap, counter, gauge, shutter | discrete states; stepped transition; settle | step time, overshoot, sequence | machinery, certainty | low |
| physical type | letters that hang, fall, drift, tear | glyphs as bodies in any model above | the model's, plus the text | the word as a thing | model-dependent |
| ambient drift | slow breathing, a light that moves | noise-driven offsets at very low frequency | amplitude, period | stillness, weather, life in the room | low |

Three questions order the table: which primitive *says* what this
surface must prove (a schooling flock on an orchestration tool; a
membrane that tears on a load-testing tool; a counter that settles on
a billing page); which the budget can run on a mid-range phone at the
count the idea needs; which the world's material can skin without
looking pasted (worlds/ cards name their own motion).

## Solvers, honestly

| Approach | How | Good for | Watch |
|---|---|---|---|
| Verlet integration | store current and previous position; next = 2p - p_prev + a*dt^2; constraints by moving points directly | ropes, chains, cloth, most creative-coding physics | damping and constraints by iteration count; fine for visuals, not for measured physics |
| Mass-spring + forces | F = -k*x - c*v per spring; semi-implicit Euler | bounce, soft type, anything "springy" | stiff springs blow up at large dt: substep, clamp dt, or go position-based |
| PBD / XPBD | project positions to satisfy constraints; XPBD adds compliance (inverse stiffness) and a per-constraint multiplier so stiffness stops depending on timestep and iteration count | interactive deformables: cloth, membranes, soft bodies, ropes with many constraints | the sim does not tear by itself -- tearing is a rule you write (strain over threshold removes the constraint, update the mesh); p5.js or canvas is the pencil, not the engine; the solver is yours or a library's |
| A physics library (matter.js, Rapier, cannon-es) | rigid bodies, collisions, joints | fracture, stacking, anything rigid | a library demo pasted in reads as costume; re-skin and re-parameterize |

Mass-spring with implicit integration and enough substeps is as stable
as anything; XPBD is simply the easier road to stable, tunable,
interactive deformables, which is why cloth and soft bodies favor it.
Reference: Macklin, Mueller, Chentanez, *XPBD: Position-Based
Simulation of Compliant Constrained Dynamics* (2016).

Loop discipline, whatever the solver:

- fixed timestep with substeps; accumulate real time, clamp the
  accumulator so a backgrounded tab does not explode on return
- seed every random with a stored key so a capture is reproducible
  and a reviewer can see what you saw
- pause when off-screen (IntersectionObserver) and when
  `document.hidden`; resume from the settled state, not from zero
- cap counts by viewport tier (390 / 768 / 1440) and by
  `devicePixelRatio`; measure one frame on a phone before shipping

## Renderer by count and material

| Renderer | Comfortable count | Reach for it when |
|---|---|---|
| DOM + CSS transforms | up to ~50 elements | the objects are real UI (cells, cards, glyphs) that must stay accessible and themeable |
| SVG | hundreds | geometry, diagrams, physical type; crisp at any scale; CSS-styleable with tokens |
| canvas 2D (plain or p5.js) | thousands | particles, fields, cloth; pixels are cheap, DOM is not |
| WebGL (three.js, regl, shaders) | tens of thousands, 3D, per-pixel fields | reaction-diffusion, fluids, flocks at scale, depth |
| offline frame render (Remotion and the like) | any | the deliverable is a video or a reel; the model renders deterministic frames per time code |

Canvas and WebGL carry no semantics: give the element an accessible
name and a text alternative saying what it shows, and keep any
interactive control (a slider, a reset) in the DOM.

## Physics by personality

The design system's motion personality (motion.md) sets the physics
of its living elements; a mismatch reads as a pasted demo.

| Personality | Living-element physics | Example |
|---|---|---|
| mechanical (industry, broadsheets) | discrete states, stepped motion, exponential settle, no fluids | split-flap, counters, a gauge needle |
| snappy (default, modernist) | damped springs, high stiffness, short settle, few bodies | a chart that re-sorts, a grid that packs |
| weighted (organic) | mass, gravity, drag; things hang and swing | rope, cloth, soft type |
| deliberate (classical, nocturnes) | slow fields, long periods, low amplitude; atmosphere | flow field, ambient drift, Chladni |

## Skin from the contract

The model draws with the tokens: `--fg`, `--fg-3`, `--accent`,
`--line`, the surface lightness steps; sizes from the space scale;
any transition inside it from `--dur-*` and `--ease-*`. Read them with
`getComputedStyle` at start and on theme change so the element flips
with the page; never bake a hex into a canvas call. Dark mode is a
redesign here too: the same model, a re-lit skin (lower chroma, light
source decided). The skin is the design system's; the model is the
world's; the parameters are the product's.

## Inputs and the idle state

Choose the one input that proves the mechanism -- pointer for
"touch it", scroll for "as you go deeper", real data for "this is
live", time for "it breathes", audio for a music surface. A
pointer-only model is a hover-gated function on touch and keyboard:
every living element needs an idle behavior that shows the mechanism
unattended, and any control a keyboard can reach.

## The floor

- `prefers-reduced-motion`: the element renders its settled still
  frame -- same composition, same information, no loop; not removed,
  not a blank
- no JS / slow device: the same still frame as a static layer under
  the canvas, so the first paint already has the composition
- it never pushes the offer or the action below the fold at 390; the
  model scales down before the sentence does
- honest content: a model running on data shows labelled data; a
  "live" label on a canned loop is an invented claim
- one measured frame budget on a mid-range phone; drop counts, not the
  idea
- focus, selection and scrollbars still themed behind it; the canvas
  is a region of the page, not a page of its own

## Sources, and the license step

Behavior primitives are a library you grow -- open sketches, your own
past elements, the vibe-motion style per-behavior skills. Three rules
when taking from outside: read the license of the *specific sketch*
(OpenProcessing lets authors pick, including all rights reserved;
visible source is not permission); take the mechanism and rewrite it
into the six layers, never paste a demo; record provenance in
DESIGN.md beside the raster provenance (methods.md, medium gate).

| Source | What it is | Take |
|---|---|---|
| [The Nature of Code](https://natureofcode.com/) (Shiffman) | the creative-coding physics book, free online: vectors, forces, oscillation, particles, autonomous agents, CA, fractals, physics libraries | the models, in p5.js, with the reasoning |
| [Ten Minute Physics](https://matthias-research.github.io/pages/tenMinutePhysics/index.html) (Mueller) | short tutorials with runnable JS: XPBD, cloth, soft bodies, self-collision, fluids | a working XPBD cloth in one file to read, not to paste |
| [XPBD paper](https://matthias-research.github.io/pages/publications/XPBD.pdf) | Macklin, Mueller, Chentanez 2016 | compliance, why stiffness stops depending on dt |
| [OpenProcessing](https://openprocessing.org/) | a million open creative-coding sketches, forkable | search by behavior (cloth, verlet, boids, flow field, fracture, reaction diffusion); check the sketch's license first |
| [p5.js](https://p5js.org/) | the creative-coding canvas library | the drawing and input layer; bring your own solver |
| [Remotion](https://www.remotion.dev/) | React programs that render deterministic video frames | when the deliverable is a video, not a page |
| [vibe-motion](https://github.com/vibe-motion) | "prompts -> code -> motion graphics": per-behavior agent skills, scaffolds, an SRT-to-shots pipeline | the shape of a behavior skill: physical parameters, seamless loop, deterministic export (skills.md) |

## Anti-patterns

| Anti-pattern | What it is | Do instead |
|---|---|---|
| hand-keyed world | a responding or looping element authored as seconds and pixels | the model card; a loop that integrates and constrains |
| canvas wallpaper | particles, constellations, blobs, noise grain that prove nothing | delete, or pick the primitive that says what the surface must prove |
| pasted demo | a library example in its own palette and defaults inside a committed world | re-skin from tokens, re-parameterize, rename |
| fused layers | geometry, behavior, draw and spawn in one function | six layers; three one-sentence variants as the test |
| pointer-only life | nothing happens until hovered | an idle behavior; a keyboard-reachable control |
| unbounded sim | one count for every device; no pause off-screen | count by tier, IntersectionObserver, `document.hidden` |
| fluid physics on a mechanical system | springs and cloth inside industry or broadsheets | the personality's physics (stepped, settle) |
| living element on an all-day tool | a model running on an operate surface for atmosphere | status only; spend the budget on persuade and experience |
| "live" on a loop | a canned animation labelled as real | label synthetic; or run it on data |
| reduced-motion blank | the region disappears under `prefers-reduced-motion` | the settled still frame |

## The three scarcities

Writing the loop is the cheap part now. What the model cannot supply
is what you have seen (the visual prior a taste library builds --
static images that already look as if they move), what you can
abstract (the primitive under the image: this is a field, this is a
membrane, this is a flock), and what you decide to express (why this
model, here, for this product). The technique makes the butterfly
fly; taste decides that it should be a butterfly; the story decides
why it flies now. No amount of simulation turns a surface with
nothing to prove into one that argues -- "it's the story, stupid"
(Jobs on Pixar, 1996). Build the model last; decide what it proves
first.
