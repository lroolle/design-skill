# Design systems

Each file here is a **design language written as a contract**: a
parameter set (seed hue, color strategy, type roles, ratio, density,
radius, surface model, motion physics, imagery, signature moves,
voice) plus the ways that language turns to slop. A design system is
a mechanism, not a skin -- re-seed the hue, swap a face, keep the
mechanism. Every system compiles to the same token names, so an
agent can switch languages by swapping one CSS file and lint any
surface with one grep.

| System | One line | Reach for it when |
|---|---|---|
| [default](default.md) | paper and ink; quiet, structural, system type | product surfaces, docs, admin, anything without a brand brief |
| [modernist](modernist.md) | Swiss grid, grotesk, one signal color, air | studios, portfolios, architecture, fashion, museums, manifestos |
| [classical](classical.md) | book typography, warm paper, restraint | publishing, essays, heritage brands, wine, universities, law |
| [industry](industry.md) | instrument panel: dense, ruled, mono data, safety accents | dashboards, monitoring, ops, logistics, hardware, admin back-office |
| [organic](organic.md) | humanist, warm, rounded, tactile, hand-made | wellness, food, craft, education, community, hospitality |
| [nocturnes](nocturnes.md) | dark-first, one light source, blue-grey mists and gold sparks | music, film, events, games, pro creative tools, automotive |
| [broadsheets](broadsheets.md) | newsroom hierarchy: hed, dek, columns, hairlines, real photos | news, magazines, newsletters, blogs, changelogs, research |

Extending: copy [_template.md](_template.md), fill every section, add
a `assets/tokens/<name>.css` that defines every token in the contract
below, add a row here. A new system must differ from the existing
seven on at least two axes (type voice, density, color strategy,
hierarchy topology, motion physics) -- a palette swap is a re-seed,
not a new system.

## Material under a world

These are the *material* layer. On persuade and experience surfaces a
**world** (`worlds/`) sits above: it supplies what the page argues --
topology, the first viewport, the signature interaction, the native
motion -- and the design system underneath supplies tokens, type roles,
component character and the behavioral floor. A world's palette
re-seeds the system it sits on; the world card's Translation section
names which system fits. On operate and read surfaces the material
layer often carries the whole surface and a staging (`stagings/`)
supplies the composition.

## Choosing

Match the system to the **primary task and territory**, then re-seed
for identity. Product surfaces want restraint and density (default,
industry, broadsheets); brand surfaces may spend expressiveness
(modernist, nocturnes, organic, classical). When two fit, take the one
whose default density matches the task, not the one that photographs
best. When an official design system already governs the context
(government, a platform's admin, a native OS), adopt that -- see
`references/frameworks.md` -- and use these only for what it leaves
undecided.

Never bind a system by domain reflex ("finance -> classical navy").
The first-sense table in SKILL.md exists to name the reflex so the
direction phase can sidestep it.

## Contract schema

Every system file has these sections, in this order. An agent writing
DESIGN.md for a project copies the same order.

```
1. Identity          feel in one paragraph; a physical scene sentence;
                     territory (fits / does not fit); 2-3 named anchors
2. Color             seed hue, neutral tint, strategy; light + dark token
                     table; semantic offsets; rules
3. Type              display / body / mono / CJK partner faces with
                     fallbacks; ratio, base, leading; rules
4. Space and density base unit, density, section gaps, container, measure
5. Shape and surface radius (one), border weight, elevation model, texture
6. Motion            personality, durations, easing, budget
7. Imagery and icons photography treatment, illustration, icon set + weight,
                     data viz
8. Components        the character of buttons, inputs, nav, tables, cards,
                     overlays in this language
9. Signature moves   2-3 rationed devices that make it recognizable
10. Voice            copy tone: verbs, register, what it never says
11. Where it turns   this language's own failure modes; overlap with the
    to slop          current AI looks and the sidestep
12. Tokens           the key values, and the pointer to assets/tokens/<name>.css
```

## Token contract

Fixed names, identical across systems, defined in
`assets/tokens/<system>.css`. Light values on `:root`, dark values on
`[data-theme="dark"]` (and mirrored under `prefers-color-scheme` when
the project has no toggle). App code uses only these; raw hex/oklch
outside the token file is a defect (`assets/bans.sh` greps for it).

```
/* surfaces */         --bg  --surface  --surface-2  --overlay
/* text */             --fg  --fg-2  --fg-3
/* lines */            --line  --line-strong
/* accent */           --accent  --accent-hover  --accent-fg  --accent-soft
/* semantic */         --ok  --warn  --danger  --info   (+ --ok-soft etc.)
/* focus */            --focus
/* type faces */       --font-display  --font-body  --font-mono  --font-cjk
/* type scale */       --text-xs  --text-sm  --text-base  --text-lg
                       --text-xl  --text-2xl  --text-3xl  --text-4xl
/* type metrics */     --leading-body  --leading-tight  --tracking-display
                       --measure
/* space */            --space-1 .. --space-12   (unit * scale * density)
/* shape */            --radius  --radius-sm  --radius-lg  --line-w
/* elevation */        --shadow-1  --shadow-2   (tinted to the seed)
/* motion */           --dur-micro  --dur-base  --dur-enter
                       --ease-out  --ease-in-out  --ease-subtle
/* layout */           --container  --container-wide
```

Optional extras a system may add on top, always with a fallback in
app code (`var(--font-ui, var(--font-body))`): `--font-ui` (chrome
face when body is a serif: classical, broadsheets), `--font-cjk-ui`,
`--ease-spring` (organic, brand surfaces only), `--weight-body` /
`--tracking-body` (nocturnes' light-on-dark compensation). Extras are
documented in that system's section 12 and nowhere else.

Derivation invariants every token file obeys:

- **OKLCH, one seed hue.** Surfaces, text, lines and accent all carry
  a trace of the seed (chroma 0.004-0.015 on neutrals). Both themes
  derive from it; dark is a redesign (surface lightness carries
  elevation, accent chroma drops ~15%), never an inversion; never
  chroma 0, never pure black or white.
- **Semantic states are hue offsets from the seed**, held in tokens.
- **One radius**, decided before the first component; `-sm`/`-lg`
  derive from it. One corner language per surface.
- **Structure before shadow**: 1px lines and tone steps first; shadows
  only where elevation carries meaning, tinted to the seed.
- **Type pairs on one axis** or runs one family across weights;
  the CJK partner is named, not left to fallback.
- **One icon set, one stroke weight.**
- **Motion budget is part of the material**: durations and easings
  are tokens; the personality (mechanical / snappy / weighted /
  deliberate) is stated.

`assets/specimen.html` renders one specimen page against any token
file, so a system can be seen before it is chosen.
