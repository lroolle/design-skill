# Motion

Motion is a communication channel, like color or size. Motion that
communicates nothing is noise, and noise on a product surface costs
attention every single time it plays. This file covers both halves:
what should move and why (design), and how to make it move correctly
(implementation). Load when a build has any motion, or when motion
"feels wrong".

## Gate: should it move at all?

| How often the user sees it | Decision |
|---|---|
| 100+ times a day (shortcuts, command palette, list nav) | no animation; focus rings and highlights under 100ms are feedback, not ceremony |
| tens of times a day (hover, tab switch, dropdown) | minimal: 100-200ms, opacity/transform only |
| occasional (modal, drawer, toast, page transition) | standard motion, 200-350ms |
| rare / first-time (onboarding, empty state, success once) | may carry delight -- once |

Saying no is the most valuable outcome of this gate. Every design
system in this repo sets a motion budget; the quiet ones (default,
industry, broadsheets) spend almost nothing.

## Six signals

Every UI motion communicates one of these; if it maps to none, cut it.

| Signal | Tells the user | Example |
|---|---|---|
| state | something changed | toggle, success mark |
| spatial origin | where a thing lives | drawer from the edge it belongs to |
| continuity | same object, new form | card expanding to detail |
| hierarchy | this matters more | stagger: first to move = most important |
| feedback | input received | press, hover lift |
| progress | system is working | skeleton, determinate bar |

## Vocabulary

Finite. Every animation is one of these or a composition.

- Entrance/exit: fade (appearance), slide (origin), scale 0.96->1
  (emergence), reveal via clip (containment). Exits run at 50-70% of
  the entrance duration -- the user asked for it to go.
- State: crossfade (A->B), morph (same object), instant (deliberate
  discontinuity).
- Feedback: press scale 0.97-0.98 on :active; lift 1px + shadow step
  on hover; brief highlight flash at the action's origin.
- Loading: skeleton matching layout, determinate progress, spinner as
  last resort.

## Physics: four personalities

Same vocabulary, different physics -- this is where a design system's
character enters motion.

| Personality | Micro / transition / entrance | Easing | Character | Systems |
|---|---|---|---|---|
| mechanical | 50 / 100 / 150ms or instant | linear, step-end | machine, no pretense | industry, broadsheets |
| snappy | 100 / 180 / 250ms | `cubic-bezier(0.16, 1, 0.3, 1)` | precision tool, respects time | default, modernist |
| weighted | 120 / 250 / 400ms | spring(300, 20-24) | physical mass, settles | organic |
| deliberate | 150 / 300 / 500ms | expo-out in, ease-in-out state | confident, watch me arrive | classical, nocturnes |

Easing tokens worth defining once per project:

```css
--ease-out:    cubic-bezier(0.16, 1, 0.3, 1);     /* entrances, most UI */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);   /* moving/morphing on screen */
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);    /* sheets, drawers */
--ease-subtle: cubic-bezier(0.25, 0.1, 0.25, 1);  /* hover, color */
```

Never ease-in for UI: it starts slow at the exact moment the user is
watching hardest. Built-in `ease` is too weak to feel authored.

## Duration table

| Element | Duration | Why |
|---|---|---|
| press / feedback | 100-160ms | must feel synchronous with the finger |
| tooltip, small popover | 125-200ms | instant, but trackable |
| dropdown, select, menu | 150-250ms | the user is deciding; motion aids orientation |
| modal, drawer, sheet | 200-400ms | large enough to need coherent motion |
| page / view transition | 250-350ms | continuity, not a show |
| exit (anything) | 50-70% of its entrance | dismissal was requested |

UI stays under ~300ms. Anything longer is either brand choreography
(one per viewport, on a brand surface) or a mistake.

## Stagger and choreography

First to move = most important. Delay 40-120ms between siblings,
direction follows reading order, max 8-10 items then batch. Parent
and children share a render tree so the choreography can be
coordinated and interrupted.

By template:
- editorial: title fades 300ms, body is simply there; hover lift on
  linked cards; instant nav between articles.
- product/dashboard: skeleton -> content crossfade 200ms; number
  morph or instant swap; row highlight on hover; slide-in details.
- landing: one orchestrated sequence per viewport (title -> subtitle
  -> CTA, ~400ms total); one scroll-triggered fade per section; that
  is the whole budget.

## Scroll

Scroll is the user's primary navigation instrument.

| Model | When | Risk |
|---|---|---|
| natural 1:1 | almost always | none |
| snap | full-viewport sections on brand surfaces | feels locked |
| triggered entrance | content-heavy brand pages | over-animation |
| parallax | very sparingly | distraction, motion sickness |
| hijacked | never | steals navigation |

Triggered entrances: IntersectionObserver (never scroll listeners),
threshold 0.1-0.2, fire once, and under `prefers-reduced-motion`
content is simply already visible.

## Implementation

| Situation | Use | Why |
|---|---|---|
| predetermined enter/exit/hover | CSS transitions | off main thread for transform/opacity; interruptible and retargetable |
| keyframe sequence | CSS @keyframes | declarative; restarts from zero, so not for rapid re-triggers |
| conditional / layout-aware | Motion (framer) or the platform's animation API | composable, layout animations, exit animations |
| gesture with momentum | spring physics | interruptible, keeps velocity |
| programmatic with CSS perf | WAAPI | hardware path with JS control |

Rules:
- Animate only transform and opacity. Never top/left/width/height/
  margin. Height reveals: grid-template-rows 0fr->1fr or measure once
  and animate transform.
- `will-change` only while animating; remove after.
- Continuous background effects on `position: fixed; pointer-events:
  none` layers.
- Systematic z-index: nav 10, dropdown 20, modal 30, toast 40.
- React continuous animation: MotionValue outside the render cycle;
  never useState per frame.
- Springs: stiffness 200-400, damping 20-30 for UI; overshoot only on
  playful surfaces.

## Reduced motion

`prefers-reduced-motion` is not `animation: none`. Keep opacity and
color changes; cut movement.

| Full | Reduced |
|---|---|
| fade + slide entrance | instant, or <100ms fade |
| scroll-triggered reveal | already visible |
| state transition | instant cut |
| skeleton pulse | static skeleton |
| ambient / continuous | removed |
| color / opacity feedback | kept |

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Motion anti-patterns (permanent)

- animating layout properties
- bounce/elastic easing on non-playful interfaces
- no reduced-motion handling
- uniform entrance (everything identical = no hierarchy)
- scroll listeners instead of IntersectionObserver
- continuous animation on anything that is not status
- exit slower than entrance
- the urgency kit: pulsing dots, ticking countdowns, shaking CTAs --
  deadlines render as dated facts

Saturated motion tells (dated; see anti-patterns.md for expiry):
magnetic cursor buttons, character-by-character hero text, morphing
blob backgrounds, Lottie hero illustrations, scroll-hijacked
storytelling, parallax as identity.
