# Sites

Where to look, by what you are trying to do -- and what to *take* from
each. The discipline that makes this a catalog and not a mood board:

- **References give visual coordinates, not answers.** Copying a skin
  produces a worse copy of someone else's decision. For every
  reference, extract the mechanism -- why does this work, what does the
  motion redirect attention to, how does it degrade on a phone, why is
  the CTA there -- and write it into the brief as a constraint.
- **A reference whose beauty rides on assets you do not have** --
  photography, 3D, a licensed typeface, a motion-graphics budget -- is
  a trap. Note it and move on.
- **Award galleries are a boundary, not a baseline.** They reward
  expressive brand-campaign work; pulled onto a product surface it
  over-designs. Use them to see the edge of the space.
- **Galleries solve visual imagination, not effectiveness.** A pretty
  page carries no conversion data; some ugly pages convert better.
  Judge against the task, not the screenshot.

Every link below was checked live on 2026-08-19. Curated for authority
and function, not volume.

## Contents

| # | Section | Open it when you need to... |
|---|---|---|
| 0 | Design-system-first | decide whether to design from scratch at all |
| 1 | Durable judgment | give a UX decision a reason, not a picture |
| 2 | Agent-readable direction | find a written design contract to react to |
| 3 | Real product UI and flows | see how shipped products handle a flow or state |
| 4 | Broad taste and layout | find first-screen structure, section rhythm |
| 5 | Expressive boundary | see the edge of the space, for a brand surface |
| 6 | Specific interface details | pull one concrete pattern, not an identity |
| 7 | Components and blocks | implement fast, then re-skin to your tokens |
| 8 | Motion | pick an easing or study a transition |
| 9 | Color | build or verify a ramp |
| 10 | Type | choose a face and dodge the reflex |
| 11 | Icons | choose one set, one weight |
| 12 | Chinese-market references | design for zh products and audiences |

## 0. Design-system-first

Before inventing tokens, ask: does an official design system already
govern this context? If yes, that system *is* the material -- adopt
it. (frameworks.md has the adoption table and token mapping.)

| Source | What it is | Reach for it when |
|---|---|---|
| [GOV.UK Design System](https://design-system.service.gov.uk/) | the civic standard: forms, errors, task completion | government, regulated public service, anything legally expected to be accessible |
| [U.S. Web Design System](https://designsystem.digital.gov/) | U.S. federal system | U.S. public sector |
| [Shopify Polaris](https://polaris.shopify.com/) | the admin-embedded system | anything inside the Shopify admin |
| [GitHub Primer](https://primer.style/) | developer-facing product system | GitHub-adjacent tooling; dense data UI reference generally |
| [Material 3](https://m3.material.io/) | Android-first system | Android apps, explicitly Material products |
| [Apple HIG](https://developer.apple.com/design/human-interface-guidelines) | the native Apple contract | iOS / macOS / visionOS apps |
| [Atlassian Design System](https://atlassian.design/) | the Jira/Confluence system | Atlassian marketplace apps; a mature enterprise reference |
| [Ant Design](https://ant.design/) | the zh-market enterprise default | zh B2B and admin products; see section 12 |

## 1. Durable judgment

| Source | What it is | Reach for it when |
|---|---|---|
| [Laws of UX](https://lawsofux.com/) | Fitts, Hick, Jakob, Miller, Doherty, named | naming *why* a layout works |
| [Nielsen Norman Group](https://www.nngroup.com/) | usability research | you need evidence for a flow or pattern choice |
| [Refactoring UI](https://www.refactoringui.com/) | hierarchy, spacing, depth, for developers | a layout "feels off" and you cannot say why |
| [Practical Typography](https://practicaltypography.com/) (Butterick) | the four body-text choices -- size, leading, measure, face -- and composition rules, written for non-designers | setting long-form, docs, or print type; a sanity pass on quotes, dashes, spaces. Its "avoid system fonts" rule is print-era and sells his faces; fontbook.md wins. All rights reserved: take the rules, not the prose |
| [Inclusive Components](https://inclusive-components.design/) | accessible component patterns with state | building any menu, tab, toggle, disclosure |
| [Hobday: safe rules](https://anthonyhobday.com/sideprojects/saferules/) | visual design rules that rarely fail | a fast sanity pass on contrast, spacing, alignment |
| [Hobday: application visual design](https://anthonyhobday.com/sideprojects/quickstart/applicationvisualdesign) | product-surface visual design, end to end | styling an app screen, not a landing page |
| [Apple HIG archive, 1978-2014](https://archive.org/details/apple-hig) | the historical PDFs; the 1987 ten principles | settling a first-principles interaction question |
| [gingerbeardman/apple-human-interface-guidelines](https://github.com/gingerbeardman/apple-human-interface-guidelines) | every historical edition in one repo | the same, in git |

## 2. Agent-readable design direction

Written design contracts extracted from real sites. Caveat stated
loudly: extracted brand systems are coordinates requiring
verification, not permission to clone a brand. Take the *shape* of a
contract and the mechanisms; never the brand.

| Source | What it is | Mechanism to take |
|---|---|---|
| [Refero Styles](https://styles.refero.design/) | 2,000+ per-site design contracts with tokens tabs | how a real site's type/color/radius decisions cohere; "copy the system, not the website" |
| [TypeUI](https://www.typeui.sh/) | agent-facing type/design guidance, audits, prompts | a second opinion on a type system |
| [getdesign.md](https://getdesign.md/) | generates a design contract from a URL | a quick extraction to react to, then verify against the real site |
| [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) | a corpus of design contracts | studying the schema, not lifting a brand |
| [bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills) | list of design skills for agents | the landscape; see skills.md |

## 3. Real product UI and flows

The underrated corner. This is not inspiration -- it is *product
behavior evidence*: what the empty state says, how the paywall gates,
where the error lands. When an agent builds UI, what it lacks is
rarely button styling; it is flow judgment.

| Source | What it is | Mechanism to take |
|---|---|---|
| [Mobbin](https://mobbin.com/) | hundreds of thousands of shipped app screens, full flows, states, [copy-to-Figma](https://mobbin.com/changelog/2024-02-08-copy-to-figma) | onboarding steppers, empty/error/loading states, paywalls, settings |
| [Mobbin MCP](https://mobbin.com/mcp) | the same, reachable from an agent | pulling 3-5 real examples before building a flow |
| [Refero](https://refero.design/apps) | searchable real web + mobile UI in context | "how does X do settings" with the surrounding screen |
| [Nicelydone](https://nicelydone.club/) | complete SaaS flows, web | onboarding, billing, invite flows end to end |
| [SaaSFrame](https://www.saasframe.io/) | SaaS pages and flows by category | pricing, dashboards, changelogs as shipped |
| [Page Flows](https://pageflows.com/) | recorded user flows, video | the sequence, not the screenshot |
| [UI Sources](https://www.uisources.com/) | mobile app flows, video | native mobile patterns in motion |
| [Screenlane](https://screenlane.com/) | web + mobile UI shots by pattern | a quick pattern scan |

## 4. Broad taste and layout

| Source | What it is | Mechanism to take |
|---|---|---|
| [Land-book](https://land-book.com/) | hand-picked galleries: landing, portfolio, blog, commerce | first-screen structure, section rhythm, type pairing |
| [Recent](https://recent.design/) | tightly curated high-craft web (Godly redirects here) | where the ceiling of taste actually is right now |
| [SiteInspire](https://www.siteinspire.com/) | brand, studio, content sites by style/type | editorial layout, restraint; often photography-driven -- check |
| [Curated](https://curated.design/) | curated web design | composition and art direction |
| [Minimal Gallery](https://minimal.gallery/) | minimal sites | what restraint looks like when it is deliberate |
| [One Page Love](https://onepagelove.com/) | single-page sites + free templates | short-narrative structure for launches; skews heavy-JS -- check a11y |
| [Dead Simple Sites](https://deadsimplesites.com/) | very simple sites | the lower bound of decoration that still reads as designed |
| [Lapa Ninja](https://www.lapa.ninja/) | large landing-page volume | structural patterns at scale; filter hard |
| [Landingfolio](https://www.landingfolio.com/) | landing pages and components by section | one section type compared across many sites |
| [Dark Mode Design](https://www.darkmodedesign.com/) | dark-first sites | how dark grounds handle elevation and accent |

## 5. Expressive boundary

For brand surfaces, campaigns, portfolios, launches. Poor defaults for
tools used eight hours a day.

| Source | What it is | Mechanism to take |
|---|---|---|
| [Awwwards](https://www.awwwards.com/) | award gallery, annual trend reports | the creative edge and where the year's language is heading |
| [landing.love](https://www.landing.love/) | ~2,000 animated sites, full-page video | scroll reveals, hero motion -- *what attention shift each move serves* |
| [Framer gallery](https://www.framer.com/community/gallery/) | Framer sites and templates | interaction choreography; watch for template homogeneity |
| [React Bits](https://reactbits.dev/) | 100+ expressive React components | what an expressive component looks like; easy to overuse |
| [Codrops](https://tympanus.net/codrops/) | technique demos and tutorials | how an effect is actually built, with source |

## 6. Specific interface details

When the agent needs one concrete pattern rather than a whole identity.

| Source | What it is | Mechanism to take |
|---|---|---|
| [Design Spells](https://www.designspells.com/) | small moments of delight, collected | one earned micro-interaction, not ten |
| [Navbar Gallery](https://www.navbar.gallery/) | navigation bars | how nav handles 5-7 items, scroll, mobile |
| [Footer Design](https://www.footer.design/) | footers | the full section index done well |
| [UI Patterns](https://ui-patterns.com/) | named patterns with rationale | the name and the problem a pattern solves |
| [Component Gallery](https://component.gallery/) | components across design systems, by name | how 20 systems name and build the same control |
| [Checklist Design](https://www.checklist.design/) | per-page and per-component checklists | the states and fields you forgot |
| [Screenlane](https://screenlane.com/) | UI shots by pattern | same as section 3, by pattern |

## 7. Components and blocks

Components solve *speed*, not taste, and accelerate homogenization --
everyone copying the same hero/bento/spotlight lands on the template
look in three months. Adopt the structure, re-skin to your tokens,
delete the borrowed animation defaults. Prefer source-installed
components the agent can read and change.

| Source | What it is | Note |
|---|---|---|
| [shadcn/ui](https://ui.shadcn.com/) + [blocks](https://ui.shadcn.com/blocks) + [registry directory](https://ui.shadcn.com/docs/directory) | the token-driven primitive set most agents build on; the directory indexes hundreds of third-party registries | the durable base; review third-party registries before installing |
| [21st.dev](https://21st.dev/) | community React registry, AI-ready prompts | complete components and screens; quality varies, filter |
| [Agent Elements](https://agent-elements.21st.dev/docs) | components for chat, streaming, tool calls | agent interfaces specifically |
| [Amicro](https://amicro.vercel.app/) | MIT micro-transitions, shadcn-compatible | buttons, feedback, small state changes -- garnish, not foundation |
| [Motion Primitives](https://github.com/ibelick/motion-primitives) | restrained Motion + Tailwind primitives | the quietest motion library option |
| [ericts/ui](https://ui.ericts.com/) | a11y-aware motion patterns, reduced-motion hooks | adaptive drawers, animated height done right |
| [Origin UI](https://originui.com/) | large shadcn-compatible component set | form and data components fast |
| [Magic UI](https://magicui.design/) | expressive marketing components | brand surfaces only; strip the defaults |
| [Aceternity UI](https://ui.aceternity.com/) | React/Tailwind/Motion copy-paste | speeds implementation; heavy component smell -- unify under your tokens |
| [Tailwind Plus UI Blocks](https://tailwindcss.com/plus/ui-blocks) | the strongest paid implementation reference | layout and form blocks done carefully |
| [Flowbite Blocks](https://flowbite.com/blocks/) | broad block library | generic; for scaffolding only |
| [Vercel Templates](https://vercel.com/templates) | starter apps | scaffolds; inspect dependencies before adopting |

## 8. Motion

Deciding whether a thing should move and how is motion.md's job; these
find the reference or the curve.

| Source | What it is | Reach for it when |
|---|---|---|
| [landing.love](https://www.landing.love/) | animated sites with video capture | studying a hero or scroll sequence |
| [easings.net](https://easings.net/) | named curves, previewed | picking an easing that is not the default `ease` |
| [cubic-bezier.com](https://cubic-bezier.com/) | curve editor | tuning a custom curve and seeing it |
| [Motion](https://motion.dev/) | the React/JS animation library docs | layout animations, exit animations, springs |
| [Web Animations API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) | the platform API | programmatic animation with CSS performance |
| [animations.dev](https://animations.dev/) | a paid course on UI animation | a route for going deeper; no content is reproduced here |

## 9. Color

Color lives in the token layer. Reach for these when seeding a ramp,
not per component.

| Source | Where | Reach for it when |
|---|---|---|
| [OKLCH picker](https://oklch.com/) | oklch.com | building tokens in the same space the contract uses |
| [Radix Colors](https://www.radix-ui.com/colors) | radix-ui.com/colors | 12-step accessible scales, light + dark paired |
| [Realtime Colors](https://www.realtimecolors.com/) | realtimecolors.com | previewing a palette on a real UI before committing |
| [Huemint](https://huemint.com/) | huemint.com | a generated palette seeded by your hue -- a coordinate to react to |
| [Leonardo](https://leonardocolor.io/) | leonardocolor.io | contrast-driven ramps across a whole theme |
| [Accessible Palette](https://accessiblepalette.com/) | accessiblepalette.com | building a palette against a contrast target |
| [Colorbox](https://colorbox.io/) | colorbox.io | generating stepped scales with curves |
| [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) | webaim.org | verifying every text-on-surface pair -- the WCAG floor |
| [APCA Contrast Calculator](https://www.apcacontrast.com/) | apcacontrast.com | the perceptual model; better for dark themes and thin type |

## 10. Type

No gallery substitutes for judgment; the work is choosing a pairing
that is not the reflex and committing. fontbook.md is the curated
catalog; these are where to look beyond it.

| Source | What it is | Reach for it when |
|---|---|---|
| [Typewolf](https://www.typewolf.com/) | fonts in the wild, with pairings | "what does this face feel like in use" |
| [Fonts In Use](https://fontsinuse.com/) | typography indexed by industry and face | studying how a face behaves at scale |
| [Fontshare](https://www.fontshare.com/) | quality free-for-commercial faces | faces that are not on every generated page |
| [Google Fonts](https://fonts.google.com/) | ubiquitous and free | which is exactly why its top ten are saturated tells |
| [Modular Scale](https://www.modularscale.com/) | ratio calculator | deriving a type scale from a ratio and base |
| [Type Scale](https://typescale.com/) | scale previewer | seeing a scale rendered in a face |
| [Wakamai Fondue](https://wakamaifondue.com/) | font inspector | checking what features (smcp, onum, opsz) a file actually has |
| [Klim](https://klim.co.nz/) / [Commercial Type](https://commercialtype.com/) / [Swiss Typefaces](https://www.swisstypefaces.com/) / [Pangram Pangram](https://pangrampangram.com/) | paid foundries | when a budget exists and identity must not be free-font-guessable |

## 11. Icons

Browse via Iconify; commit to one set at one stroke weight. Icon +
label for anything abstract or multi-state.

| Source | What it is |
|---|---|
| [Iconify](https://iconify.design/) | one API over 150+ open sets -- browse everything, then pick one |
| [Lucide](https://lucide.dev/) | clean, consistent; shadcn default (reads as "shadcn app" untouched) |
| [Phosphor](https://phosphoricons.com/) | large set, six weights -- pick one and hold it |
| [Tabler](https://tabler.io/icons) | large outline set, 1.5-2 stroke |
| [Heroicons](https://heroicons.com/) | Tailwind's set, outline + solid |
| [Radix Icons](https://www.radix-ui.com/icons) | small crisp 15px set |
| [Material Symbols](https://fonts.google.com/icons) | variable weight/fill/grade; Android-native |

## 12. Chinese-market references

For zh products: pick and preload the CJK face first (typography.md),
and read the systems the audience already knows.

| Source | What it is | Reach for it when |
|---|---|---|
| [Ant Design](https://ant.design/) | the enterprise default | B2B, admin, back-office zh products |
| [Arco Design](https://arco.design/) | ByteDance's system | a modern alternative to Ant for product UI |
| [Semi Design](https://semi.design/) | ByteDance Douyin-side system | content and creator tools |
| [TDesign](https://tdesign.tencent.com/) | Tencent's system | enterprise and mini-program contexts |
| [Fusion Design](https://fusion.design/) | Alibaba's system | e-commerce and platform admin |
| [UI 中国](https://www.ui.cn/) | designer community and portfolios | the working vocabulary of zh product design |
| [站酷 ZCOOL](https://www.zcool.com.cn/) | the largest zh design community | brand and visual design at the top of the market |
| [花瓣 Huaban](https://huaban.com/) | image boards | collecting zh visual references by theme |
| [优设 UISDC](https://www.uisdc.com/) | design articles and tutorials | current zh practice and terminology |

## Using a reference in a brief

Decompose, do not imitate. For each reference the user cites ("make it
like X", a screenshot, a moodboard), write three lines:

- **Keep** -- the mechanism it contributes (why the hero works, what
  the rhythm does), as a constraint.
- **Change** -- what must differ here: density, assets, audience,
  platform, our tokens instead of theirs.
- **Do-not-copy** -- the skin: palette, font, the effect that rides on
  assets we lack, anything brand-identifying.

Tag every claim with its evidence: *observed* (you rendered or
inspected it), *provided* (the user said so), *inferred* (your guess).
Then write the acceptance criterion two engineers would verify
identically ("hero headline spans 8 of 12 columns, deck in 4, LCP
under 2.5s on 4G"). A brief that still contains a site name used as an
instruction has not been decomposed yet.
