# Templates

A template is a **surface recipe**: the shape of one kind of artifact
-- how it is structured, what it must protect, how it is judged --
independent of the language it is dressed in. A design system
(`design-systems/`) is the **material**; a template is the **shape**.
Build = one shape + one material. Keeping them apart is what lets a
dashboard be default today and industry tomorrow without rewriting
its structure, and what lets the same broadsheets material dress a
newsletter and a changelog.

| Recipe | One line | Best-fit systems |
|---|---|---|
| [landing](landing.md) | brand surface; first screen says what and for whom; proof, how, one CTA | modernist, nocturnes, organic, classical; broadsheets for content-led launches; default for dev tools |
| [dashboard](dashboard.md) | all-day product surface; the table is the component; KPIs above the data | industry, default |
| [docs](docs.md) | nav / content / on-this-page; code first-class; search always visible | default, classical (guides), industry (API reference) |
| [editorial](editorial.md) | article, blog, newsletter, changelog; hed / dek / byline / date; images captioned | broadsheets, classical, default |
| [portfolio](portfolio.md) | work first, index-style; project pages tell problem and outcome | modernist, nocturnes, organic, classical |
| [app-shell](app-shell.md) | the product frame: nav, account, search, palette, settings, auth, onboarding | default, industry |
| [forms](forms.md) | any task form: one column, labels above, inline validation, verb button | default, industry, organic (consumer) |
| [deck](deck.md) | slides and one-pagers: one idea per slide, takeaway headlines, 24pt floor | modernist, broadsheets, nocturnes (dark rooms), classical (reports) |

## Using a recipe in Build

1. Open the recipe for the surface. If none matches, the surface is
   probably two recipes (a landing with a form; an app shell holding a
   dashboard) -- compose them, primary recipe first.
2. State the plan before code: a ten-line ASCII sketch of regions,
   the hierarchy (first / second / third), where the one signature
   moment lives, and where each state renders. The recipe's Structure
   section is the starting sketch; adapt it to the sense card, do not
   paste it.
3. Build against the bound design system's tokens; the recipe's
   Settings section says which dials that material must be turned to
   for this surface (density, ratio, motion budget, measure).
4. Run the recipe's Verify items on top of the rubric in
   `references/methods.md`. The Failure modes section is the diagnosis
   list when a review says "something is off".

## Adding a recipe

Copy [_template.md](_template.md) and fill every section. A new recipe
must be a **distinct surface job** -- a different primary task, user
frequency, or protected-function set -- not a variant of an existing
one (a pricing page is a landing region; a settings page is app-shell;
a checkout is forms). If two recipes would share Structure and
Protected functions, it is one recipe with a note.

Each recipe stays language-agnostic: no token values, no font names,
no hues. Those belong to the design system; the recipe names the
dials and the directions that fit.

## Modes

Each recipe names its mode (SKILL.md): landing, pricing and deck are
persuade; dashboard, app-shell and forms are operate; docs and editorial
are read; portfolio is experience. A world from `worlds/` dresses the
persuade and experience recipes; a staging from `stagings/` composes the
operate and read ones. The recipe is the shape; the mode sets how much
expressiveness the shape may spend.
