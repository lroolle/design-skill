# Scenario 01 -- the design-skill site, one-shot (persuade)

Can a five-line prompt from a non-designer produce a site with taste,
and how many corrections does it take, of what severity? This is the
acceptance question for the skill itself; the site is not worth more
than the skill it is supposed to prove.

## Frozen

- Prompt: verbatim below. Do not enrich it.
- Inputs: the repo itself (`deploy/` exists; `site/` starts empty).
- Viewports: capture at 390 / 768 / 1440.
- Roll key: `666a7a49` for regression runs (the key the shipped page
  prints). Diversity runs sweep the key and say so.
- Model and skill revision: recorded per run in the log below.

```
I build backend systems and I have no design background. Build the
official site for design-skill -- the agent skill in this repo that
lets people like me one-shot a site with taste. Static, no build,
lives at lroolle.com/design-skill behind the worker in deploy/.
Show the prompt that made the page. Four sponsor seats: one by the
year, three by the month, founding rate $200/yr and $20/mo locked
until 2026-10-19, no analytics. Chinese version too -- most of my
friends read Chinese. Make it fun, not corporate. Use design-skill.
```

## Rubric (in order)

1. A stranger can say what this is and for whom without scrolling.
2. They see the prompt that made the page and think "I could type
   that."
3. They install (`npx skills@latest add lroolle/design-skill`).
4. The sponsor seats are on the page with the terms in the prompt.

## Run protocol

- Fresh session, `make install` done, the skill installed, no other
  design skills active. Branch `site/one-shot`; `site/` empty.
- Paste the prompt. Nothing else. Answer the skill's question round
  (at most five) with one-line answers; those answers are not
  corrections.
- First attempt kept, no rerolls. Baseline runs use the same prompt
  with the skill absent.

### What counts as a correction

Any message after the prompt and the question round that changes the
output. Classify each: **taste** ("this looks generated", "the red
is too much") · **truth** (an invented claim, a wrong install line)
· **mechanics** (check.sh or render-check FAIL, broken link, fonts
not loading, layout broken at 390) · **scope** (built what the
prompt did not ask, skipped what it did). Add severity (local |
systemic) and whether the first attempt kept the central mechanism.
The total goes on the page, verbatim, next to the prompt: "built
from this prompt in N corrections". Zero is allowed to be false; a
made-up number is not allowed at all.

### What the skill must do unprompted

A correction on any of these counts *and* files a defect against the
skill: run the roll with `--subject` and build the assigned world or
say why not; start from `kit/house` and re-ink from a specimen or
the world card; write the promise as the first comment in the body;
self-host fonts via `kit/fonts.sh` with a real CJK face on the zh
page; `kit/check.sh site` clean of FAIL with warned reasons in
`site/DESIGN.md`; the zh page written in the `specimens/zh-voice.md`
register, not translated; no invented claims and sponsor terms as
given; fresh-context review before it says done; `DESIGN.md` written
from the built site; if the die is on the page, the page's deal
equals the CLI's on random keys.

### Stop rules

Two unattended review rounds, then a human looks. If corrections
pass 8, stop, file the defects, and fix the skill before finishing
the site. Deploy to a wrangler preview only; production is Eric's
call. Commit only on ship; privacy gate before every commit.

## Run log

### 2026-08-25 -- run 1, with skill

- Skill revision: the v0.2 material-over-method worktree, pre-commit
  (now `9ecdea8`). Model: not recorded in the repo; record it next
  time. The session ran in a separate demo workspace; the shipped
  `site/` predates this run (built 2026-08-19 by the v0.1 protocol,
  roll `666a7a49`, patent-drawing-sheets), and this run kept that
  world.
- Corrections: **1** -- scope, **systemic**. The roll only relit one
  card in the deck; the page stayed in the world it was built in.
  Fixed: a roll now re-renders the whole page into the world it
  draws, and six of the twenty-seven worlds have a skin. Landed in
  `scripts/roll.mjs` + `site/deal.js` (mechanism), not prose.
- Honest reading: one correction, but it was the mechanism -- this
  was not one-shot. "1 correction" without severity would flatter.
- Open items filed, not fixed in this record:
  - The page never prints the correction count the brief requires
    next to the prompt.
  - `render-check.mjs` (2026-09-01) reports nine `.ref` buttons at
    18x16 (under the 24px floor) and dark emulation rendering the
    light ground; `check.sh` warns 47 uppercase micro-labels. All
    three are the site's next pass.
