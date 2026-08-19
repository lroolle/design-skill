# Thinking

The beliefs everything else in this skill derives from. Load once to
calibrate; the operational rules live in SKILL.md, the design-system
contracts, and the other references. If a rule elsewhere ever seems
arbitrary, the reason is here.

## 1. Taste is judgment, not a look

Taste is judgment anchored in evidence, exercised on behavior before
surfaces. It is not a palette, not a font pairing, not "editorial" or
"brutalist". A look can be copied in an afternoon and becomes a
monoculture the moment it is known; judgment compounds.

The one-line test that falls out of this: **a change that makes the
surface prettier and the task harder must fail.** That failure has a
name -- costume -- and interfaces die of it looking their best. Every
verdict in this skill (better / different / costume) is that test
applied.

## 2. Behavior before surfaces

Forty years of interface history moved every visual trend and none of
the behavioral rules: visible state, disabled-not-hidden, object then
action, discoverable then fast, verbs on buttons, undo over
confirmation, modes visible and escapable, honest feedback,
trustworthy representation. The 1987 Apple guidelines listed ten
principles; nine were behavioral and "aesthetic integrity" was tenth,
defined as communication, not decoration.

So the order of judgment is fixed: what must not break (protected
functions), then behavior (invariants), then surfaces. A redesign that
violates the floor to look better is costume by definition. See
methods.md for the checklist form.

## 3. Evidence before opinion

Judge the thing, not its description. Render it, screenshot it, walk
the primary task path. Count what is countable -- facts above the fold
before and after, steps to complete the task, labels renamed or
dropped -- because counts turn "feels cleaner" into a claim someone
can check. Automated passes (linters, detectors, contrast checkers)
are evidence, never proof; a clean pass says nothing about whether the
design is strong.

## 4. Mechanism over skin

References give visual coordinates, not answers. Copying a hero's
gradient produces a worse copy of someone else's decision; extracting
*why the hero works* -- what the motion redirects attention to, how it
degrades on a phone, why the CTA sits there -- transfers. A brief that
still contains a site name used as an instruction ("like Linear") has
not been decomposed yet.

The same holds for the design systems in this repo: each is a
mechanism set (seed hue, type axis, radius, density, motion physics,
signature moves), not a skin. Re-seed it for identity; keep the
mechanism.

## 5. The convergence signal, and the second reflex

If the font, color, and layout could be guessed from the domain name
alone -- AI tool: purple gradient on dark; finance: navy and gold;
health: teal and white -- it is the first training-data reflex. Rework
until the answer is not obvious from the category.

Then check the replacement: is the alternative *also* predictable?
"Avoids purple, so editorial serif on warm black" is the second-order
reflex, and by now as recognizable as the first. Anti-slop is
adversarial; once a tell is known, the tell moves. This is why the
skill ships a method and re-seedable systems, not a house look, and
why the saturated-tell list (anti-patterns.md) is dated and expires.

## 6. Constraint breeds identity

Fewer choices made deliberately create more character than many
choices by default. One seed hue driving both themes, one radius, one
icon set at one weight, one masthead device and one section-label
device per page, one accent -- each constraint reads as intent. Every
place a framework default was inherited rather than decided reads as
accident, and accident reads as AI.

## 7. Brand surface, product surface

Before styling anything, name which surface you are on. On a brand
surface (landing, launch, campaign, portfolio) design IS the product
and expressiveness is load-bearing. On a product surface (dashboard,
settings, editor, admin) design serves the task; density is a feature
and expressiveness competes with it. Most taste failures are brand
moves applied to product surfaces -- the metric cards that hid the
table, the scroll theater on a settings page.

The variable that flips almost every call is frequency of use: a
one-time launch page can spend on spectacle; an eight-hour-a-day tool
wants quiet density and predictable behavior.

## 8. Direction before detail

Nothing good starts from a component. Sense the thing first (what is
this, for whom, how often, with what assets), then choose a direction
from genuinely different candidates, then lock it as a contract, then
build. Offering two to four directions is not indecision -- it is how
a stochastic system avoids landing on its first reflex, and how the
human gets to spend their judgment where it is worth most: on the
choice of language, not on pixel corrections after the fact.

## 9. Contract, then memory

A direction that lives only in a chat evaporates at the next session.
Write it down as DESIGN.md -- the material an agent reads before every
UI touch -- and let rejections accrete as scars in TASTE.md with their
*why*. Rules with whys adapt to new cases; naked bans fossilize into
style police, and an expired scar is the next purple gradient. A
contract that lies about what the code does is worse than none:
rewrite it in the same commit that changes the material.

## 10. Simplicity is clean logic, not thinness

Reduction is the default move: one strong idea over five average ones,
whitespace before borders before color, structure before shadow. But
simple does not mean thin. If a design looks simple because it ignores
the empty state, the error path, the phone, the keyboard user, or the
CJK reader, it is unfinished, not minimal. Ship the smallest thing
that fully solves one user's problem, and make it unmistakably
finished.
