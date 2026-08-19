# Stagings

A **staging** is a composition or interaction idea that can be dressed
in any world and any design system: how a screen is staged, how
attention sequences, how controls and states behave, how it adapts.
Where a world answers "what does this page argue", a staging answers
"how is this screen arranged so the task happens" -- an exemplar with
its proof sheet for bulk edits, altitude-as-commitment navigation, a
commit that needs visible tension, a landing whose first viewport is
the product running.

Stagings are what the roll deals at **surface scope**: the world is
already settled, so every card visualizes composition, not identity.
`node scripts/roll.mjs --scope surface --mode <mode> --grain <grain>`
deals three, matching the requested grain first (product / flow /
view / region: a docs site, an onboarding flow, a landing page and a
data table are four different amounts of product) and topping up from
the rest. A human locks one; an autonomous run builds the first dealt.

Fields: `modes` (filter), `grain` (one value; preference), `platforms`
(hard filter -- a staging that needs hover or a pointer does not
survive a phone), `rating` (3 doubles the odds; 1 sits out unless the
pool is thin). Author with `_template.md`; `scripts/validate.sh`
checks the schema. Rate after building with it once.
