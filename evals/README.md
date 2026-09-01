# evals -- how a rule earns its place

The skill's rules are doctrine until a scenario round says otherwise.
This directory is the loop that turns doctrine into earned rules and
recurring corrections into material: the same loop Vercel ran to
build design.md (vercel.com/blog/how-our-agents-build-on-brand-pages-
with-design-md), adapted to a skill that rolls dice.

## Reference intake

Browsing a template or gallery is exposure, not evidence. Record a
shortlist under `intake/` from `_template.md`: name the exact mechanism,
what it costs the task, Keep / Change / Do not copy, the narrowest place
it might land, and the question a human must answer. A screenshot that
only proves the skin is not enough.

Intake status is `team-check`, `scenario-ready`, or `declined`. Nothing
in intake changes SKILL.md, a deck, a recipe, the kit, or a check. A
team-check may nominate a mechanism for a frozen scenario; only the
scenario's first attempt and comparison can earn it a landing. This
keeps a morning in galleries from quietly becoming doctrine.

## Scenario

A scenario freezes everything except the skill: the prompt verbatim,
the inputs, the viewports, the model, and the roll key. First
attempts only -- no rerolls, no enriching the prompt, answers to the
skill's own question round capped and recorded. A scenario without
frozen real inputs is not a scenario; do not write one until the
inputs exist.

Each scenario is one file in `scenarios/`, carrying its frozen block,
its rubric, what the skill must do unprompted, its stop rules, and
its run log. Run artifacts (the built pages, captures, check output)
go under `runs/`, which stays out of git; the durable record is the
run-log entry in the scenario file.

## Baseline

Before judging the skill, generate the same scenario with the skill
absent -- same prompt, model, viewport. Keep that output even when it
is rough. Without a before, "the skill helped" is a mood.

## Rounds and keys

A round generates every scenario against the current skill revision.
Run the affected scenarios before a doctrine change lands; at
milestones, blind-compare the new revision's outputs against the old
revision's and keep, revise, or revert.

The dice make one rule non-negotiable: **regression runs freeze the
roll key; diversity runs sweep it.** With the key frozen, the skill
revision is the only variable and a difference in output traces to
the guidance. With the key swept, the question changes to whether the
deck actually spreads (different worlds get built) and whether every
dealt world holds the floor. Never compare two runs that differ in
both key and revision.

## Counting

`kit/check.sh` and `kit/render-check.mjs` count named failures
mechanically; the with-skill vs without-skill counts on first
attempts are the headline number. The checks only see failures we
have already named, so a clean count says nothing about whether the
page is good -- the rubric and the blind comparison carry that. A
quality claim in the README needs a round behind it.

## Corrections

Every message after the prompt that changes the output is a
correction. Record each in the run log with:

- class: taste | truth | mechanics | scope
- severity: local (one region) | systemic (the mechanism or the
  whole page missed)
- mechanism-kept: did the first attempt preserve the product's
  central mechanism?

Correction count alone flatters: one systemic correction is not
"nearly one-shot". Report count with severity, always.

An accepted correction lands in the narrowest layer that can
consistently enforce it: judgment in SKILL.md or a reference,
reusable mechanics in the kit's CSS, anything mechanically checkable
in check.sh or render-check.mjs, harness defects in the scenario,
and a failure only one model exhibits stays in the run log until it
repeats. LEDGER.md records what landed where and which run earned it.

## Roster

- `scenarios/01-ds-site.md` -- persuade, one-shot site from a
  non-designer's five lines. Live; one run recorded.
- `intake/2026-09-01-template-scout.md` -- five template candidates
  from six libraries; awaiting the team's mechanism-level check.

Planned, unwritten until their inputs are frozen: operate (a dense
monitoring dashboard), read (an evidence-heavy decision report),
operate-zh (a daily-use Chinese product), match-brand (extend an
existing branded surface), and the negative scenarios where the
skill must do less -- a governed context it must not restyle, a
tweak inside an existing DESIGN.md, a throwaway on the floor kit.
The negative ones test the Gate, not the Build.
