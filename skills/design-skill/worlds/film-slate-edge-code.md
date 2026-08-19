---
id: film-slate-edge-code
name: Film Slate and Edge Code
tier: atmosphere
modes: [operate, experience, persuade]
families: [acetate-film, chalk-slate, workroom]
rating: 2
grain: [flow, view, region]
platforms: [web, ios, android]
origin: Clapperboard slates and 16/35mm edge-code (key numbers) printed along the sprocket margin, cutting-room logbooks and camera reports, 1930s-2000s
---

# Film Slate and Edge Code

## Form
Every take opens on a chalk slate stating production, scene, take, roll and date in fixed boxes, and every foot of film carries a printed key number along its margin, so any frame can be named, found and cut back to by its code.

## Spark
You snap the sticks on "Scene 12, take 3", and later in the cutting room you read 0041+07 off the margin, find the frame in the log, and splice exactly there.

## System
- Palette/material: dark slate or near-black acetate ground, chalk-white and edge-code white lettering, one yellow or orange for the current take or the selected frame, amber for leader; no other color.
- Type/composition: stencil or hand-written caps in the slate's boxed fields (SCENE, TAKE, ROLL, DATE), key numbers in a small mono along a thin margin strip, content banded in frame rows; boxes are fixed, values change.
- Topology/navigation: rolls contain scenes contain takes contain frames; movement is by code, the margin strip is the scrub bar, a detail is one frame enlarged with its code.
- Controls/state: a take in progress shows its slate, a selected frame lights its key number, a cut point is a mark on the margin; loading is leader with countdown numerals; empty is a blank slate with fields waiting; error is a take circled as NG in the log.
- Responsive/motion: narrow screens show the slate full width then one frame row; motion is the sticks closing and frames advancing, 24-per-second feel only when scrubbing, reduced motion steps.

## Web leverage
A horizontal frame strip with `scroll-snap` per frame, key numbers as addressable anchors in the URL, and a slate overlay driven by the same metadata as the strip.

## Translation
Nav is roll and scene, the slate's own fields. A list is the camera report log (scene, take, NG or print); a table is the log; a form is the slate with its boxed fields; a flow is takes in order. Empty state is a blank slate. Sits on nocturnes (dark room, one amber) or industry (codes, log discipline); the language supplies dark-mode tokens and motion law, the world supplies the slate fields, the edge-code addressing, and the margin-strip scrubber.

## Risks
Costume: sprocket holes as a border and a clapperboard icon. Fails for text-heavy and form-heavy operate work and for anything without sequence. Slop when film grain filters and light leaks replace the code system, or when the slate becomes a hero badge with lorem scene names.
