# Fontbook

A curated catalog of faces an agent can choose from with judgment. Not
a dump: every row earned its place by being usable, correctly licensed,
and distinguishable from the training-data reflex. typography.md owns
the rules (roles, scale, pairing axes, CJK typesetting, the device
ration); this file owns the actual faces.

## How to use it

1. Decide the role first (display / body / mono / CJK partner) and the
   design system you are inside; the "Systems" column narrows the table
   to two or three rows.
2. If your reflex reaches for a saturated face (next section), look one
   row further. The reflex is not wrong because the face is bad; it is
   wrong because it is the answer everyone else's generator gave.
3. Verify the license before shipping: OFL and MIT allow bundling;
   Fontshare (ITF Free Font License) allows commercial use but requires
   self-hosting from your own copy and forbids redistribution; paid
   faces need a web license per domain or pageview tier.
4. Self-host woff2, subset (Latin plus the CJK ranges you use), preload
   the display face and the primary CJK face, `font-display: swap` with
   size-adjusted fallbacks so the swap does not reflow.
5. System stacks are always allowed and never a tell.

## Saturated faces (as of 2026-Q3, review 2026-12)

These carry the identity of so much generated output that using them
as the identity carrier reads as "made by a model". Fine as a body
workhorse inside a product; not as the display face or the brand.

| Class | Faces |
|---|---|
| sans | Inter, Roboto, Poppins, Montserrat, Open Sans, DM Sans, Plus Jakarta Sans, Outfit, Manrope, Space Grotesk, Syne |
| display serif | Playfair Display, Fraunces, Cormorant (all cuts), Newsreader, Lora, Crimson Pro / Crimson Text, DM Serif Display / Text, Instrument Serif |
| mono / techy | Space Mono, IBM Plex Mono as decoration |
| drifting toward saturation | Geist Sans / Geist Mono, Satoshi, IBM Plex family as identity, Bricolage Grotesque, Clash Display, Cabinet Grotesk, Instrument Sans |

Rule: a face on this list may set body copy in a product where nobody
will notice it; the moment it sets the headline or the wordmark it
becomes the tell. System fonts (`system-ui`, San Francisco, Segoe,
PingFang) are never a tell -- they read as native, not as generated.

## Catalog

Sources: OFL = SIL Open Font License, on Google Fonts unless noted;
Fontshare = ITF Free Font License; system = OS-bundled; paid = named
so a budget has a target. Systems: def = default, mod = modernist,
cla = classical, ind = industry, org = organic, noc = nocturnes,
bro = broadsheets.

### Grotesk / neo-grotesque

| Face | Voice | Weights / axes | Source | Pairs with | Systems | Notes |
|---|---|---|---|---|---|---|
| Switzer | Helvetica-class, neutral, crisp | 100-900 variable | Fontshare | itself; Source Serif 4 | mod | the modernist default; self-host |
| General Sans | rounder grotesk, friendly | 200-700 variable | Fontshare | Gambetta, Sentient | mod, def | softer than Switzer |
| Schibsted Grotesk | sharp cuts, tight bold, editorial | 400-900 variable | OFL | JetBrains Mono, Source Serif 4 | noc, mod | nocturnes default; from a news group's type program |
| Hanken Grotesk | quiet, slightly warm grotesk | 100-900 variable | OFL | Literata, EB Garamond | def, mod | good workhorse body |
| Familjen Grotesk | Swedish, geometric-leaning grotesk | 400-700 variable | OFL | Spectral | mod | small family, distinctive a/g |
| Archivo | DIN-flavored, engineered | 100-900, width 62-125 | OFL | JetBrains Mono, Archivo Narrow | ind | industry default; the width axis is the label device |
| Public Sans | civic, plain, dependable | 100-900 variable | OFL | Source Serif 4, Merriweather | def, ind | the US federal design system's face |
| Work Sans | optical-sized grotesk, warm at text sizes | 100-900 variable | OFL | Libre Caslon | def | tune tracking at display sizes |
| Figtree | friendly geometric-grotesk | 300-900 variable | OFL | Literata | def, org | approaching saturation in SaaS; watch |
| Onest | soft grotesk, wide | 100-900 variable | OFL | Source Serif 4 | def | Cyrillic support strong |
| Albert Sans | geometric-humanist hybrid | 100-900 variable | OFL | Andada Pro | org, def | rounded terminals, warm |
| Helvetica Neue | the reference grotesk | system (macOS) | system | anything serif | mod | fallback for Switzer; not on Windows |
| Arial | ubiquitous fallback | system | system | -- | -- | fallback only, never the identity |
| Neue Haas Grotesk | Helvetica as originally drawn | paid (Monotype) | paid | Tiempos | mod | the budget upgrade for modernist |
| Suisse Int'l | Swiss neo-grotesk, refined | paid (Swiss Typefaces) | paid | Suisse Works | mod | pairs inside its own superfamily |
| GT America | American grotesk meets Swiss | paid (Grilli Type) | paid | GT Sectra | mod, ind | width family |
| Soehne | Akzidenz lineage, quiet authority | paid (Klim) | paid | Tiempos, Signifier | mod, def | Soehne Mono for data |
| Untitled Sans | deliberately plain | paid (Klim) | paid | Untitled Serif | def | when "no voice" is the voice |

### Humanist sans

| Face | Voice | Weights / axes | Source | Pairs with | Systems | Notes |
|---|---|---|---|---|---|---|
| Source Sans 3 | clean humanist, UI-tested | 200-900 variable | OFL | Source Serif 4, Source Code Pro | cla, bro, def | classical/broadsheets UI chrome; superfamily |
| Alegreya Sans | calligraphic humanist, warm | 100-900 | OFL | Alegreya | org | organic body; shares skeleton with Alegreya |
| Atkinson Hyperlegible | legibility-first, distinct glyphs | 400, 700 (+ Next variable) | OFL | Source Serif 4 | def, ind | a11y contexts; slightly quirky |
| PT Sans | Russian humanist, sturdy | 400, 700 + narrow, caption | OFL | PT Serif | def, bro | complete text family |
| Fira Sans | Mozilla humanist, big family | 100-900 | OFL | Fira Code | def, ind | wide range of weights |
| Karla | quirky grotesk-humanist | 200-800 variable | OFL | Spectral, Merriweather | org, def | character without noise |
| Cabin | Gill-flavored humanist | 400-700 variable | OFL | Cardo | org | condensed cut available |
| Asap | rounded-terminal humanist | 100-900, width 75-125 | OFL | Alegreya | org, ind | width axis useful for labels |
| Signika | rounded, sign-like, clear | 300-700 variable | OFL | Merriweather | org, def | wayfinding feel |
| Merriweather Sans | sturdy humanist, screen-tuned | 300-800 variable | OFL | Merriweather | bro, def | pairs inside its family |
| Author | contemporary humanist, sharp | 200-700 variable | Fontshare | Sentient, Erode | def, org | distinctive italics |
| Ranade | rounded humanist, soft | 100-700 variable | Fontshare | Gambetta | org | rounded without becoming toy |
| system-ui / -apple-system | San Francisco on Apple, Segoe on Windows | system | system | ui-serif, ui-monospace | def | the default's body; native feel |

### Geometric sans (the reflex lives here; use with care)

| Face | Voice | Weights / axes | Source | Pairs with | Systems | Notes |
|---|---|---|---|---|---|---|
| Sora | wide geometric, techy | 100-800 variable | OFL | JetBrains Mono | noc | large x-height; display use |
| Urbanist | soft geometric, fashion-adjacent | 100-900 variable | OFL | Literata | noc, org | close to the reflex; commit or skip |
| Red Hat Display / Text | geometric with an optical text cut | 300-900 variable | OFL | Red Hat Mono | def, ind | Text cut is genuinely readable |
| Rubik | slightly rounded corners, warm geometric | 300-900 variable | OFL | Rubik Mono One | org | Hebrew/Arabic coverage |
| Chillax | relaxed geometric | 200-600 variable | Fontshare | Zodiak | org | good display, weak body |
| Supreme | grotesk-geometric hybrid | 100-800 variable | Fontshare | Boska | mod, def | one of Fontshare's most usable |
| Circular | the SaaS geometric | paid (Lineto) | paid | -- | -- | recognizable; likely a tell in 2026 |
| Futura PT | the geometric | paid (ParaType) | paid | Georgia | mod | display only |
| GT Walsheim | friendly geometric | paid (Grilli Type) | paid | GT Sectra | org, def | ubiquitous in startups; watch |

### Old-style / transitional serif

| Face | Voice | Weights / axes | Source | Pairs with | Systems | Notes |
|---|---|---|---|---|---|---|
| EB Garamond | Garamond revival, real italics, small caps | 400-800 variable | OFL | Source Sans 3, Source Code Pro | cla | classical default; enable onum/smcp; CJK partner Noto Serif SC |
| Libre Caslon Text + Display | English Caslon, sturdy | 400, 700 + italics; Display 400 | OFL | Work Sans, Public Sans | cla, bro | Display cut for 40px+ |
| Spectral | screen-first old-style, narrow | 200-800 | OFL | Karla, Familjen Grotesk | cla, bro | designed for long screen reading |
| Literata | book face with optical sizes | 200-900, opsz 7-72 | OFL | Hanken Grotesk, Figtree | cla | opsz makes it usable at UI sizes |
| Source Serif 4 | transitional, optical sizes, newsy | 200-900, opsz 8-60 | OFL | Source Sans 3, Source Code Pro | bro, cla | broadsheets default; superfamily |
| Merriweather | screen serif, large x-height | 300-900 variable, opsz | OFL | Merriweather Sans, Public Sans | bro | sturdy at small sizes |
| PT Serif | transitional, robust | 400, 700 + italics, caption | OFL | PT Sans | bro, cla | text-optimized caption cut |
| Alegreya | calligraphic old-style, warm | 400-900 | OFL | Alegreya Sans | org | organic display; not high-contrast |
| Andada Pro | slab-leaning transitional, warm | 400-840 variable | OFL | Albert Sans | org, cla | quiet slab feel |
| Cardo | scholarly, classical proportions | 400, 700, italic | OFL | Cabin | cla | Greek/Hebrew coverage |
| Gambetta | contemporary old-style | 300-700 variable | Fontshare | General Sans, Ranade | cla, org | modern but bookish |
| Sentient | soft transitional, contemporary | 200-700 variable | Fontshare | Author, General Sans | org, cla | friendly serif |
| Erode | angular transitional, editorial | 300-700 variable | Fontshare | Author | bro | sharper voice |
| Zodiak | high-contrast display serif | 300-900 variable | Fontshare | Chillax, Supreme | mod | display only; drifting toward the reflex |
| Charter | Bitstream transitional, screen classic | system (macOS/iOS) | system | system-ui | cla, bro | superb fallback and default |
| Iowan Old Style | Jenson-Venetian, warm | system (macOS/iOS) | system | system-ui | cla | book feel with zero load |
| Palatino | calligraphic old-style | system | system | system-ui | cla | fallback tier |
| Georgia | screen serif, robust | system | system | system-ui | bro, cla | fallback tier |
| Tiempos | contemporary transitional | paid (Klim) | paid | Soehne | bro, cla | the paid broadsheet |
| Signifier | brutal Fell revival | paid (Klim) | paid | Soehne | cla, mod | strong character |
| Freight Text | warm text serif with micro cut | paid (GarageFonts) | paid | Freight Sans | cla | complete optical range |
| Lyon | Granjon-based, editorial | paid (Commercial Type) | paid | Graphik | bro | magazine standard |
| Untitled Serif | plain serif, no mannerisms | paid (Klim) | paid | Untitled Sans | cla, def | quiet |

### Slab / display serif

| Face | Voice | Weights / axes | Source | Pairs with | Systems | Notes |
|---|---|---|---|---|---|---|
| Zilla Slab | Mozilla slab, friendly | 300-700 | OFL | Fira Sans | ind, org | headings and labels |
| Bitter | slab for screen text | 100-900 variable | OFL | Source Sans 3 | bro, org | reads well small |
| Arvo | geometric slab | 400, 700 | OFL | Work Sans | ind | display use |
| Young Serif | heavy old-style display | 400 | OFL | Hanken Grotesk | org, cla | one weight; earn its use |
| Gloock | high-contrast display | 400 | OFL | Switzer | mod | rarely; display only, close to the Didone reflex |
| Boska | sharp display serif | 200-900 variable | Fontshare | Supreme | mod | display |
| Melodrama | expressive display serif | 300-700 variable | Fontshare | General Sans | -- | drifting toward saturation |

### Condensed / poster

| Face | Voice | Weights / axes | Source | Pairs with | Systems | Notes |
|---|---|---|---|---|---|---|
| Barlow + Barlow Condensed | Californian grotesk, DIN-flavored | 100-900 + condensed, semi | OFL | JetBrains Mono | ind | complete width family |
| Archivo Narrow | the narrow cut of Archivo | 400-700 | OFL | Archivo | ind | prefer the Archivo width axis when variable |
| IBM Plex Sans Condensed | Plex, narrow | 100-700 | OFL | IBM Plex Mono | ind | Plex family is drifting; fine as labels |
| Oswald | Alternate Gothic revival | 200-700 variable | OFL | Source Serif 4 | bro | kicker/headline in a newspaper register |
| Big Shoulders | Chicago-industrial condensed | 100-900 variable | OFL | Source Sans 3 | ind, mod | display and text cuts |
| Bebas Neue | all-caps poster | 400 | OFL | Switzer | mod | caps only |
| Anton | heavy condensed impact | 400 | OFL | -- | mod | display only |
| Anybody | width-axis display | 100-900, width 50-150 | OFL | JetBrains Mono | mod, noc | one variable file, many voices |
| Tanker | heavy condensed display | 400 | Fontshare | Supreme | mod | poster |
| Khand | condensed, Devanagari + Latin | 300-700 | OFL | Source Sans 3 | ind | compact labels |

### Mono

| Face | Voice | Weights / axes | Source | Pairs with | Systems | Notes |
|---|---|---|---|---|---|---|
| JetBrains Mono | code-first, tall x-height, ligatures optional | 100-800 variable | OFL | Archivo, Schibsted Grotesk | ind, noc, mod, def | the working default for data |
| Source Code Pro | Adobe's code face, quiet | 200-900 variable | OFL | Source Sans 3, Source Serif 4 | bro, cla | superfamily member |
| Fira Code | Fira Mono + ligatures | 300-700 variable | OFL | Fira Sans | ind | ligatures off in tables |
| Commit Mono | neutral, spacing-tuned | 200-700 | MIT (self-host) | Switzer | mod, ind | not on Google Fonts; download from its site |
| Martian Mono | wide, techy, sci-fi-adjacent | 100-800, width 75-112 | OFL | Sora, Schibsted Grotesk | noc | distinctive; labels not code |
| Recursive | mono-to-sans + casual axes | 300-1000, MONO, CASL, slnt | OFL | itself | ind, def | one file, sans and mono |
| Red Hat Mono | matches Red Hat Text | 300-700 variable | OFL | Red Hat Text | def, ind | quiet |
| Sometype Mono | humanist mono, readable prose | 400-700 variable | OFL | Hanken Grotesk | def | good for long code comments |
| Azeret Mono | geometric mono, display-friendly | 100-900 variable | OFL | Sora | noc, mod | display and data |
| Fragment Mono | Helvetica-derived mono | 400 + italic | OFL | Switzer | mod | Swiss mono |
| Geist Mono | Vercel's mono | 100-900 variable | OFL | Geist | -- | drifting; the dev-tool tell |
| IBM Plex Mono | Plex mono | 100-700 | OFL | IBM Plex Sans | -- | fine for code blocks; not as decoration |
| ui-monospace / SF Mono / Menlo / Consolas / Cascadia | system monos | system | system | system-ui | def | zero load, native |
| Berkeley Mono | precise, warm engineering mono | paid | paid | Soehne | ind | budget upgrade for industry |
| Operator Mono | typewriter-italic mono | paid (H&Co) | paid | -- | -- | editors love it; display risk |

### CJK

Harmony rule: grotesk Latin pairs with a Hei/Gothic (Noto Sans SC,
Source Han Sans, MiSans); old-style serif pairs with a Song/Ming (Noto
Serif SC, Source Han Serif); humanist and calligraphic Latin pairs with
a Kai (LXGW WenKai) or a soft Hei. Match stroke contrast and x-height,
not names.

| Face | Voice | Weights / axes | Source | Harmonizes with | Systems | Notes |
|---|---|---|---|---|---|---|
| Noto Sans SC / Source Han Sans 思源黑体 | modern Hei, complete | 100-900 | OFL | Switzer, Archivo, Schibsted, system-ui | def, mod, ind, noc | same design under two names; huge; subset |
| Noto Serif SC / Source Han Serif 思源宋体 | modern Song/Ming | 200-900 | OFL | EB Garamond, Source Serif 4, Alegreya | cla, bro, org | headline and long text |
| LXGW WenKai 霞鹜文楷 | Kai, handwritten warmth | 300-700 | OFL | Alegreya Sans, Author, Karla | org, cla | literary, brand surfaces |
| LXGW Bright | Kai-Hei hybrid, screen text | 400 | OFL | Hanken Grotesk | org, def | quieter WenKai |
| Smiley Sans 得意黑 | oblique display Hei | 400 | OFL | Switzer, Anybody | mod, noc | display only; kinetic |
| Zhuque Fangsong 朱雀仿宋 | Fangsong, formal | 400 | OFL | EB Garamond | cla | documents, heritage |
| Huiwen-Mincho 汇文明朝体 | Mincho with old-style flavor | 400 | OFL | Libre Caslon | cla, bro | editorial |
| Alibaba PuHuiTi 阿里巴巴普惠体 | corporate Hei, wide weights | 100-900 | free for commercial (own license) | Public Sans, Source Sans 3 | def, ind | check the current license text before bundling |
| HarmonyOS Sans | UI Hei, clean | 100-900 | free (own license) | Archivo, Public Sans | ind, def | zh product UI |
| MiSans | UI Hei, rounded-neutral | 100-900 | free (own license) | Schibsted, General Sans | noc, def | zh product UI |
| Douyin Sans 抖音美好体 | display Hei with character | 400 | free (own license) | Anybody | noc | display |
| Sarasa Gothic 更纱黑体 | mono CJK + Iosevka Latin | 200-800 | OFL | itself | ind | terminals, code with CJK |
| Maple Mono | rounded mono with CJK | 200-800 | OFL | itself | ind, def | code with CJK comments |
| PingFang SC | Apple system Hei | system | system | system-ui | def | the default's CJK partner on Apple |
| Hiragino Sans GB | Apple/older system Hei | system | system | system-ui | def | fallback |
| Microsoft YaHei | Windows system Hei | system | system | Segoe UI | def | fallback |
| Noto Sans TC / Source Han Sans TC, GenYoGothic | Traditional Chinese Hei | 100-900 | OFL | grotesks | all | TC partners |
| Noto Sans JP, BIZ UDPGothic, Zen Kaku Gothic | Japanese Gothic | varies | OFL | grotesks, humanist | all | JP partners |
| Noto Sans KR, Pretendard | Korean Gothic | 100-900 | OFL | grotesks, system-ui | all | Pretendard also covers Latin well |

## Pairing recipes

| Display | Body | Mono | Axis of contrast | Feel | Systems |
|---|---|---|---|---|---|
| system-ui 650 | system-ui 400 | ui-monospace | one family, weight | quiet, native, instant | default |
| Source Sans 3 700 | Source Sans 3 400 | Source Code Pro | one family, weight | plain workhorse with a webfont | default |
| Switzer 800 | Switzer 400 | JetBrains Mono | one family, scale | Swiss, grid, air | modernist |
| Neue Haas Grotesk 75 | Neue Haas Grotesk 55 | Fragment Mono | one family, scale | the paid modernist | modernist |
| EB Garamond 500 | EB Garamond 400 (UI: Source Sans 3) | Source Code Pro | serif text x sans chrome | book, reading room | classical |
| Libre Caslon Display | Spectral | Source Code Pro | display serif x text serif | English, literary | classical |
| Archivo 600 (labels: width 75) | Archivo 400 | JetBrains Mono | width, sans x mono | instrument panel | industry |
| Recursive 700 (sans axis) | Recursive 400 | Recursive (mono axis) | one variable file | engineering, unified | industry |
| Alegreya 600 | Alegreya Sans 400 | ui-monospace | serif x sans, shared skeleton | warm, hand-made | organic |
| Andada Pro 700 | Albert Sans 400 | ui-monospace | slab-serif x humanist sans | warm, sturdy | organic |
| Schibsted Grotesk 700 | Schibsted Grotesk 450 | JetBrains Mono | one family, weight | crisp, low light | nocturnes |
| Sora 700 | Hanken Grotesk 400 | Martian Mono | wide geometric x quiet grotesk | cinematic, techy | nocturnes |
| Source Serif 4 700 (opsz 60) | Source Serif 4 400 (UI: Source Sans 3) | Source Code Pro | serif hed x sans chrome, one superfamily | newsroom | broadsheets |
| Tiempos Headline | Tiempos Text (UI: Soehne) | Soehne Mono | the paid newsroom | magazine | broadsheets |
| Noto Sans SC 700 + Switzer | Noto Sans SC 400 + Switzer | JetBrains Mono + Sarasa | Hei-first, grotesk partner | zh product, modern | default, modernist, industry |
| Noto Serif SC 600 + EB Garamond | Noto Serif SC 400 + EB Garamond | Source Code Pro | Song-first, old-style partner | zh reading, heritage | classical, broadsheets |
| LXGW WenKai 700 + Alegreya | LXGW WenKai 400 + Alegreya Sans | Maple Mono | Kai-first, calligraphic partner | zh brand, warm | organic |

CJK-first recipes list the CJK face first on purpose: it is preloaded
first and the Latin face is chosen to sit inside its proportions.

## Where to look further

- Google Fonts -- https://fonts.google.com/ -- OFL faces; filter by
  variable axes and language coverage; the top ten are the reflex.
- Fontshare -- https://www.fontshare.com/ -- ITF Free Font License;
  self-host, do not redistribute.
- Fonts In Use -- https://fontsinuse.com/ -- how a face behaves at
  scale, indexed by industry and typeface.
- Typewolf -- https://www.typewolf.com/ -- faces in the wild with
  pairings; the fastest "what does this feel like" check.
- Paid tiers -- Klim https://klim.co.nz/ , Commercial Type
  https://commercialtype.com/ , Swiss Typefaces
  https://www.swisstypefaces.com/ -- when the budget exists, these are
  where identity comes from.
- Chinese free fonts -- https://github.com/wordshub/free-font (a
  maintained list of commercially usable CJK faces with license notes),
  the Noto CJK repo https://github.com/googlefonts/noto-cjk , and LXGW
  https://github.com/lxgw/LxgwWenKai . Re-read the license page of any
  vendor face (Alibaba, Huawei, Xiaomi, ByteDance) before bundling; the
  terms have changed before.
