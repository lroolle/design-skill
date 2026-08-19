# Skills

Prior art and method: the agent-native design tooling this practice
learned from. Read these for the *method* -- contract files, direction
options, deterministic detectors, the anti-slop framing -- not to lift
text. Nothing here is loaded on an operational path; it is disclosed
lineage so the reasoning behind this skill can be audited. All repo
links checked 2026-08-19.

| Repo | License | What it is | What to study |
|---|---|---|---|
| [anthropics/skills](https://github.com/anthropics/skills) -- [frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | Apache-2.0 | Anthropic's open design-quality skill | the two-pass process: write a compact token plan (named colors, type roles, ASCII layout, one signature), then critique it against "the generic default you would produce for any similar page" before building; the calibration move of naming the *current* AI looks rather than a static font ban; copy as design material |
| [anthropics/skills](https://github.com/anthropics/skills) -- [theme-factory](https://github.com/anthropics/skills/tree/main/skills/theme-factory) | Apache-2.0 | ten named themes as a tiny schema | the user gate (show, ask, wait, apply) and how small a theme record can be: four swatches with roles, two type roles, a best-for line |
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | Apache-2.0 | one skill, many commands, browser iteration, detector rules | the four modes (persuade / operate / read / experience); PRODUCT.md / DESIGN.md context files; color strategy chosen before colors; the physical "scene sentence"; the two-altitude reflex check; automated output is evidence, not proof; and its 2026 research on model variance -- menus revert to argmax, dice must assign, a concept prior about two ideas deep, commit-then-clarify, promise accountability via a separate reviewer -- which our Direct and Review phases follow with our own decks |
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | MIT | portable anti-slop frontend skill | dials (variance / motion / density) as an explicit tunable API; the placeholder-content bans ("John Doe", "Acme", invented percentages); and the cautionary side -- where a font allowlist and a mandated component style become the next monoculture |
| [NextLevelBuilder/ui-ux-pro-max-skill](https://github.com/NextLevelBuilder/ui-ux-pro-max-skill) | MIT | queryable CSV datasets (styles, palettes, pairings, UX rules) | structured rows with Do / Don't / code-good / code-bad are agent-friendly; and the cautionary side -- industry-to-style rules ("SaaS -> glass + trust blue") encode exactly the first-order reflex |
| [lroolle/skills](https://github.com/lroolle/skills) -- kiln, taste, animate-it, design-system | Apache-2.0 | our own modular quartet | the layer-by-durability engine (principles never change, patterns rarely, materials per project, templates per aesthetic, zeitgeist dated), the verdict protocol (better / different / costume), scars as memory, the install-a-contract method. This skill descends from them |
| [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) | MIT | a corpus of design contracts extracted from sites | the schema of a written contract; the hazard of cloning a brand's prose |
| [Refero Styles](https://styles.refero.design/) | web | 2,000+ per-site design contracts | the one-line poetic style name as a handle ("a midnight precision instrument"); "copy the system, not the website" |

## What this skill keeps, and what it refuses

Kept, rewritten in our voice and shape:

- brief before code, as a capped, prefilled set of questions;
- two to four directions that differ on an axis, bound by default and
  shown when the user is exploring;
- a contract file the agent reads before every UI touch, with tokens
  that are real CSS;
- rejections written down as scars with their why;
- critique with evidence (screenshots, counts, detectors) and a verdict
  vocabulary that names costume;
- anti-slop as a dated list that expires, plus the self-diff question
  "would I have made this for any similar brief?".

Refused, because each produces the next monoculture or sprawl:

- a house look (a font allowlist, a mandated component style);
- command explosions and whole-skill forks per aesthetic -- a new
  aesthetic is a design-system file here, not a new skill;
- trend encyclopedias and thousand-row font dumps;
- industry-to-style lookup tables;
- verification by self-report alone.

## Installing beside other design skills

This repo is the standalone, all-in-one design skill. Do not install
it alongside lroolle/skills' kiln, taste, or design-system in the
same agent: their descriptions fire on the same situations ("design
this surface", "is this better?", "give this repo a design system"),
and overlapping triggers fight over invocation -- the loser is
predictability. Pick one: this repo when you want one folder that
carries the whole practice; the quartet when you want the modular
pieces and already use them. animate-it is compatible either way
(motion.md here covers the design half; animate-it goes deeper on
implementation).
