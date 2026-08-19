# Anti-patterns

Two kinds, kept apart on purpose. **Permanent** anti-patterns are
structural failures of perception or behavior; they do not expire.
**Zeitgeist** tells are the current training-data reflexes; they are
dated, versioned, and they move -- once a tell is known, it migrates.
Anti-slop is adversarial. Do not turn a tell into a permanent ban: an
expired ban is the next monoculture.

Enforcement column: `grep` = `assets/bans.sh` can catch it
mechanically (evidence, never proof); `eye` = needs a screenshot or a
read of the rendered thing; `count` = count occurrences per viewport.

## Permanent

| Anti-pattern | What it is | Do instead | Enforce |
|---|---|---|---|
| Convergence signal | font, color and layout guessable from the domain name alone | rework until the category does not predict the answer; then check the alternative is not also predictable | eye |
| Costume | prettier surface, harder task; protected function dropped | verdict protocol; count facts/steps before vs after | count |
| Container inception | cards in cards, modals on modals | space, then rules, then tone, then card | grep (nested card classes), eye |
| Flat type hierarchy | adjacent levels within 1.15x (14/15/16/18) | ratio >= 1.2, merge levels | eye |
| Side-stripe accent | `border-left` > 1px colored as emphasis | full border, tone step, or weight | grep |
| Gradient text | `background-clip: text` | one solid color | grep |
| Shadow inflation | everything floats; pure-black shadows | shadow only where elevation means something, tinted | grep (rgba(0,0,0), eye |
| Modal-first | interrupt for things inline could carry | inline expansion, slide-over, disclosure | eye |
| Decoration without information | meshes, blobs, patterns, glass that explain nothing | ask what it helps the user understand; delete if nothing | eye |
| Pure black / white | #000, #fff, oklch(0 0 0), oklch(1 0 0) | off-black L 0.10-0.16, off-white L 0.96-0.985, seed-tinted | grep |
| Emoji as UI | emoji in headings, buttons, labels, nav, icons | one icon set, one weight, or nothing | grep |
| Raw palette in app code | `text-red-500`, `#e11d48` in components | semantic tokens only | grep |
| Two corner languages | mixed radii on one surface (pill CTA, 8px cards, 0 rules) | one radius token, derived scale | grep, eye |
| Device sprawl | eyebrows, microlabels, tracking variants repeated everywhere | one masthead device + one section-label device per page | count |
| Accent creep | accent on badges, icons, headings, borders, backgrounds | accent = primary action, links, focus, selection | count |
| Urgency kit | pulsing dots, countdowns, shaking CTAs, "only 3 left" | dated facts, plain | grep (animate-pulse/ping), eye |
| Missing states | only the happy path designed | loading, empty, error, success, partial designed | eye |
| Placeholder as label | placeholder text carrying the field's name | label above the field | grep, eye |
| Hover-gated function | something reachable only on hover | tap/keyboard path exists | eye |
| No focus, no reduced motion | invisible focus; motion ignores the OS setting | :focus-visible ring; PRM block | grep |
| Layout-property animation | animating top/left/width/height/margin | transform + opacity | grep |
| Fake content | John Doe, Acme, lorem, "99.99%", stock avatars, invented logos | real or honestly labelled sample data; real names of real things | grep (lorem, Acme, John Doe), eye |
| Uncaptioned imagery | photos with no caption/credit on editorial surfaces | caption + credit; alt text everywhere | eye |
| Hard offset shadow | `box-shadow: 4px 4px 0` as a depth system outside a world that chose it | depth with offset + soft blur, or none | grep, eye |
| Glow halo | zero-offset colored shadow as decoration | offset + blur; glow only on focus or a named light source | grep, eye |
| Geometric occlusion mask | circle/polygon/radial cutout approximating a photographic edge | an alpha matte from the image, or a cut-out asset, or omit | eye |
| Sketchy SVG for pictures | doodle-style scenes, feTurbulence grain standing in for illustration | real illustration or none; SVG stays for geometry and diagrams | eye |
| Stripes and grid backgrounds | repeating-linear-gradient stripes, two-axis grid overlays with no canvas under them | a surface textured only from the subject's world | grep, eye |
| Mono as costume | monospace for "technical" rather than code, data, measurement | mono for code, numbers, IDs only | eye |
| System display face on an own-world page | the platform sans as the display voice of a committed world | source and self-host a face whose character matches; system stacks are for product chrome and the quiet default | eye |
| Template bones | a committed skin over the standard marketing grid (hero, three cards, logo row) | the world's own topology; the first viewport is a thesis | eye |
| Framework default inherited | radius, shadow, ring, font never decided -- shipped as installed | every dimension decided in DESIGN.md | eye |

## Zeitgeist -- 2026-Q3

**Version 2026-Q3. Updated 2026-08-19. Review 2026-12-01.** Entries
here read as generated output because they appear in a large share of
it. They are tells when they carry the identity; a workhorse body font
inside a considered system is not a tell.

### The three current AI looks

If a design lands on one of these without a brief-specific reason, it
is the reflex -- first or second order.

1. **Cream, serif, terracotta.** Warm off-white ground, high-contrast
   serif display (often italic), terracotta or rust accent, small mono
   or uppercase eyebrows, hairline rules. The "tasteful" reflex.
2. **Near-black, acid accent.** Neutral near-black ground, one acid
   green or vermilion accent, mono labels, glow, dotted-grid
   background, spotlight cursor. The "developer" reflex.
3. **Broadsheet costume.** Hairline rules, zero radius, numbered
   markers 01/02/03, serif headline, editorial layout -- on content
   that has no stories, bylines or dates. The "editorial" reflex.

A bookish, warm, family or child-facing subject does not license
cream and serif: book cloth, thread, jackets, endpapers and shelf
ephemera span the whole saturated spectrum, and cream paper is the
smallest corner of it. A pinned world pins the world, not its softest
rendition. Energy is not the enemy of trust: a brief's "no hype, no
gamification" rules out those devices, not exuberance.

Sidestep by mechanism, not by picking a fourth look: classical keeps
serif as body text with oxblood not terracotta; nocturnes tints the
dark and uses gold sparks not acid fills; broadsheets is used only for
editorial content with real hierarchy and photos; default keeps a sans
display and an ink accent. Then run the self-diff: would I have made
this for any similar brief? Name what you changed.

### Saturated faces

Maintained in `fontbook.md` (dated). Short form: Inter, Roboto,
Poppins, Montserrat, Open Sans, DM Sans, Plus Jakarta, Outfit,
Manrope, Space Grotesk/Mono, Syne; display Playfair, Fraunces,
Cormorant, Newsreader, Lora, Crimson, DM Serif, Instrument
Serif/Sans; drifting: Geist, Satoshi, IBM Plex as identity, Bricolage,
Clash, Cabinet Grotesk. System fonts are never a tell.

### Saturated aesthetic lanes

- Editorial-typographic (see look 1 and 3): italic serif headline,
  lowercase tracked metadata, three rule-separated columns, no imagery.
- SaaS-cream: off-white + one accent + rounded cards + a hero with a
  subtitle and two buttons + three feature cards + a logo row.
- Neon-terminal / cyber HUD (see look 2): CRT scanlines, glow, grid.
- Glass-on-gradient: blurred glass cards over a purple-blue mesh.
- Bento-everything: a bento grid as the answer to every layout.

### Saturated domain-color reflexes

| Domain | Reflex | Sidestep |
|---|---|---|
| AI / ML | purple-violet gradient on dark | anything else; ink, moss, brass, steel |
| Crypto / fintech | neon on black; navy + gold | paper and ink; steel; classical oxblood |
| Healthcare | teal + white | oat + moss; ink; classical |
| Finance | navy + gold | broadsheets; modernist; classical |
| Education | blue + orange | default; organic; classical |
| Food | warm + script font | modernist; industry; organic without script |
| Real estate | dark blue + gold | organic; gallery-modernist |
| Developer tools | near-black + acid green | default; industry light-first; nocturnes gold |
| Wellness | beige + sage + serif italic | organic with real contrast; classical |

### Saturated components

Hero-metric template (big number, small label, three stats); three
equal feature cards with icon tiles; eyebrow chips ("NEW", "v2.0");
gradient-border cards; blinking status dot ("All systems operational");
testimonial carousels with stock avatars; "trusted by" rows of
invented logos; pricing tables for plans that do not exist; bento
grids as default; numbered markers as decoration; spotlight cursor;
dotted-grid backgrounds; magnetic buttons; character-by-character text
reveal; morphing blobs; Lottie hero illustrations; scroll-hijacked
storytelling; parallax as identity.

### Saturated copy

Elevate, seamless, robust, delve, empower, unleash, next-gen,
game-changer, cutting-edge, innovative, revolutionize, streamline,
leverage (verb), curate, synergy, holistic, ecosystem, supercharge,
"built for the modern X", "the future of X", "X reimagined". Also:
triadic rhythm everywhere ("fast, simple, and secure"), negation
pivots ("not just X, but Y"), and exclamation marks on product
surfaces. Buttons that say "Get started" under a hero that has not
said what the product is.

## Update procedure

1. Quarterly: review a sample of generated output across the common
   generators; patterns in a large share of one category enter the
   zeitgeist tables.
2. Entries older than 18 months that no longer dominate leave. Do not
   promote a zeitgeist entry to permanent unless it fails a perceptual
   or behavioral principle.
3. Only this file's zeitgeist half and `fontbook.md`'s saturated list
   change. Principles, patterns, and design-system contracts stay.
