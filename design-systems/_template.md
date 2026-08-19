# <name> -- <one-line feel>

<!-- A design system is a mechanism set, not a skin. Fill every
section; a section you cannot fill is a sign the language is not yet
decided. Target 150-220 lines. Add assets/tokens/<name>.css defining
every token in design-systems/README.md, and a row in that README.
A new system must differ from the existing ones on at least two axes
(type voice, density, color strategy, hierarchy topology, motion
physics); a palette swap is a re-seed, not a system. -->

## 1. Identity

<One paragraph: the feel, what it refuses, why it exists as its own
language.>

Scene: <one physical sentence -- a place, a light, a material>.

Fits: <territories and surface classes>.

Does not fit: <where it fails, and what to use instead>.

Anchors (mechanism, not skin): <two or three real-world mechanisms
described by what they do, not by brand name>.

## 2. Color

Seed hue <N> (<name>). Neutral tint <warm / cool / true>. Strategy
<restrained / committed / full / drenched> with the coverage rule.

| Token | Light | Dark |
|---|---|---|
| --bg / --surface / --surface-2 | | |
| --fg / --fg-2 / --fg-3 | | |
| --line / --line-strong | | |
| --accent / --accent-soft | | |
| --ok / --warn / --danger | hue offsets | |

Rules: <dark-mode redesign notes; what the accent may touch; semantic
placement; re-seed options and the re-seeds that must not happen>.

## 3. Type

| Role | Face (with fallback stack, license, source) | Notes |
|---|---|---|
| display | | |
| body / UI | | |
| mono | | |
| CJK | | |

Ratio, base, leading, tracking; the pairing axis or the one-family
rationale.

## 4. Space and density

Unit, density, section gap rule, container, measure.

## 5. Shape and surface

Radius (one) and derived scale; line weight; elevation model; texture.

## 6. Motion

Personality; micro / base / enter; easing; the budget (what may move
on this language's surfaces, and what never does).

## 7. Imagery and icons

Photography treatment; illustration; icon set + weight; data viz.

## 8. Components

Buttons, inputs, navigation, tables, cards, overlays -- their
character in this language, in one or two lines each.

## 9. Signature moves

1. <device> -- <why it reads as this language>
2. <device>
3. <device>

These are rationed: one masthead device + one section-label device
per page come from this list.

## 10. Voice

Register, sentence shape, what buttons say, what it never says.

## 11. Where it turns to slop

- <this language's own failure mode> -- <the sidestep>
- <overlap with one of the three current AI looks> -- <the sidestep>
- <the template version of this language> -- <the sidestep>

## 12. Tokens

Full file: `assets/tokens/<name>.css`. Key values:

```css
:root {
  --bg: ; --fg: ; --accent: ; --accent-fg: ; --line: ; --radius: ;
  --font-body: ; --font-mono: ;
  --dur-micro: ; --dur-base: ; --dur-enter: ; --ease-out: ;
}
```
