# default -- paper and ink

The quiet one: warm paper ground, ink text, one restrained ink-blue accent, system type set with care, structure from 1px rules and tone steps. Scene: a well-lit desk, good paper, a fountain pen; nothing on it that is not used.
Fits: product surfaces (dashboards, settings, editors, admin, auth), docs, developer products, internal tools.
Does not fit: campaigns, portfolios, launches -- anything that must be remembered for how it looked.

## Faces
- display: same as body, heavier weight -- display is a weight, not a second face
- body: system-ui stack (Segoe UI, Roboto, Helvetica Neue, Arial) -- native, no saturation tell
- mono: ui-monospace stack (SF Mono, Menlo, Consolas) -- IDs, timestamps, code, tabular data
- CJK partner: PingFang SC, Hiragino Sans GB, Noto Sans CJK SC, Microsoft YaHei -- sans with sans

## Dials
- ratio 1.25, base 1rem
- density 1
- radius 0.25rem (sm 0.125rem, lg 0.5rem)
- elevation: flat -- tone steps and 1px lines; shadow-1 popovers, shadow-2 dialogs, tinted to the seed
- motion snappy: micro 100ms, base 180ms, enter 240ms; ease-out `cubic-bezier(0.16, 1, 0.3, 1)`

## Signature moves
- Tone-step emphasis: regions differ by `--surface` steps; layered paper, not boxed cards.
- Mono for identifiers: IDs, hashes, timestamps, counts in `--font-mono` at 0.9em.
- The honest link: body links underlined, 1px, offset 0.15em, in `--accent`; nav links unadorned.

## Turns to slop
- Framework gray: drop the seed trace and it is a zinc/slate template. Neutrals keep their chroma.
- Accent creep: accent on badges, icons, headings, borders is "blue SaaS". Accent = primary action, links, focus, selection.
- Boxing: every group a bordered card, cards in cards. Space, then rules, then tone, then card.
- Cream-serif drift: serif display plus terracotta accent is the most recognizable AI look. Keep the sans display; on a committed world, self-host a matching face.

Contract: `default.css`.
