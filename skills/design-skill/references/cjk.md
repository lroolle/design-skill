# CJK -- the zh mode

One flag flips everything: `<html lang="zh-Hans">`. `kit/floor/base.css`
carries the CSS, `kit/check.sh` binds it, `specimens/zh-voice.md` owns
the words. This file is the why, and the choices the CSS cannot make
for you: which face, which pairing, which punctuation set, what the
build must not do. Load it once per zh product; the defaults are
already in the kit.

## The failure this mode exists to end

A zh build under pressure ships `font-family: "Latin Face", "PingFang
SC", "Microsoft YaHei"` and calls it done. The Latin face carries the
identity; the primary audience gets whatever the OS has: PingFang on a
Mac, YaHei on Windows, Droid Sans Fallback or nothing on Linux and old
Android. The excuse is "a CJK webfont is 5-20 MB". It is false:
`kit/fonts.sh "Noto Sans SC" 400` pulls 73 unicode-range slices, ~1.9
MB on disk, and a page fetches only the 4-10 slices its text touches.
`check.sh` fails a zh page with no CJK `@font-face`. There is no
setting to turn that off; use `lang="en"` if the page is not Chinese.

## Faces

Hei (黑体) is the grotesk; Song / Ming (宋体, 明朝) is the serif; Kai
(楷体) is the humanist hand; Fangsong (仿宋) is the formal document
face. Pair by stroke contrast and x-height, never by name.

| Role | Face | Pairs with (Latin) | Notes |
|---|---|---|---|
| Hei, product UI | Noto Sans SC / Source Han Sans 思源黑体 (OFL) | Switzer, Archivo, Public Sans, Schibsted, system-ui | the same design under two names; the safe first choice |
| Hei, product UI, vendor | HarmonyOS Sans, MiSans, Alibaba PuHuiTi 普惠体 (free, own license) | Public Sans, Source Sans 3 | re-read the vendor license before bundling; slice with `fonts.sh --slice` |
| Song, long reading | Noto Serif SC / Source Han Serif 思源宋体 (OFL) | EB Garamond, Source Serif 4, Literata | headline and body of anything longer than a paragraph |
| Song, editorial | Huiwen-Mincho 汇文明朝体 (OFL) | Libre Caslon | old-style flavor |
| Kai, warm | LXGW WenKai 霞鹜文楷 (OFL); LXGW Bright for text | Alegreya, Author, Karla | literary, brand, children; on Google Fonts as "LXGW WenKai TC" (covers SC glyphs) |
| Fangsong, formal | Zhuque Fangsong 朱雀仿宋 (OFL) | EB Garamond | documents, heritage, government register |
| Display | Smiley Sans 得意黑 (OFL), Douyin Sans 抖音美好体 | Anybody, Switzer | display only; kinetic oblique; never body |
| Mono with CJK | Sarasa Mono SC 更纱黑体, Maple Mono (OFL) | themselves | code and tables that mix scripts |
| TC | Noto Sans / Serif TC, GenYoGothic | grotesks | Traditional; different glyph forms, not a fallback for SC |
| JP | Noto Sans JP, BIZ UDPGothic, Zen Kaku Gothic | grotesks, humanist | kana proportions differ; do not serve SC to ja |
| KR | Pretendard, Noto Sans KR | Pretendard covers Latin well | |
| System | PingFang SC, HarmonyOS Sans SC, Hiragino Sans GB, Microsoft YaHei, Songti SC, SimSun | -- | after the webfont in the stack, never instead of it |

Rule of order: a CJK-first product picks the CJK face **first**, then a
Latin face that sits inside its proportions (Noto Sans SC is wide and
low-contrast; Switzer or Public Sans fit; a high-contrast Didone does
not). Latin-first with a CJK fallback is the wrong order on a zh page.

Recipes that work: Noto Sans SC 700 / 400 + Switzer + Sarasa Mono (zh
product); Noto Serif SC 600 / 400 + EB Garamond + Source Code Pro (zh
reading, heritage); LXGW WenKai 700 / 400 + Alegreya Sans + Maple Mono
(zh brand, warm); Smiley Sans display over Noto Sans SC body (zh
persuade, kinetic).

## Rhythm and measure

| | Latin | CJK |
|---|---|---|
| body leading | 1.5-1.65 | **1.7-1.8** |
| heading leading | 1.0-1.15 | 1.3-1.4 |
| measure | 60-75ch | **30-40 characters** (`38em`) |
| display tracking | -0.01 to -0.04em | **0**; negative tracking collides strokes |
| body tracking | 0 | 0; a little positive (0.02em) at 12-13px |
| weight | 400 | CJK reads lighter at equal weight: 500 body on dark, 600 headings |
| emphasis | italic | weight, or 着重号 (`text-emphasis: filled dot`); never fake italic |
| word separation | spaces | none; equidistant squares |
| line breaking | between words | between any two characters, under 避头尾 (kinsoku): `line-break: strict` |
| paragraph | space-between or indent | either; indent is `text-indent: 2em`, two characters, never 1.5 |

Small sizes: CJK below 13px loses strokes on non-Retina screens; 14px
is the floor for anything read, 12px for table meta only, and only in
a Hei.

## Punctuation

Decide once per product and hold it:

- **Full-width set**, always, in zh text: `，。！？：；、` and `「」` or
  `“”`. `，` after a Chinese word, never `,`. `check.sh` warns on
  half-width punctuation following CJK.
- **Quotes**: Simplified mainland practice is `“”` and `‘’`;
  Traditional and a literary register use `「」` and `『』`. Pick one
  set per product.
- **Numbers**: Arabic digits for dates, counts, prices, times (`8 月
  24 日`, `¥1,280`); Chinese numerals for idiom and titles (`三个`,
  `第一章`). Percent and units follow the digit with no space (`30%`,
  `5km` is wrong: `5 km`).
- **Spacing (盘古之白)**: a half-width space between CJK and Latin
  letters or digits: `使用 CSS 写`, `2026 年`. `text-autospace: normal`
  does it in browsers that support it; write the space anyway so the
  copy is right in every renderer and in a screen reader.
- **Trim**: `text-spacing-trim: space-first` (Chromium) removes the
  built-in half-space of a full-width bracket at a line start;
  `hanging-punctuation: allow-end` (WebKit) lets `。` hang. Both are in
  the kit; neither is required.
- **Ellipsis** is `……` (two), **dash** is `——` (two); exclamation marks
  on a product surface: none.

## Layout that is native

- Vertical text (`writing-mode: vertical-rl`) is real material for
  couplets, spines, mastheads, poetry; the kit does not turn it on, a
  world card does (paired-couplets, thread-bound-book). It needs
  `text-orientation: mixed` and a face with `vert` features.
- Tables carry CJK better than prose: a zh operate surface leans on
  the ledger, the spec sheet, the timetable grid. Column headers are
  2-4 character nouns, units after a comma.
- Buttons are 2-4 characters (`保存`, `新建项目`, `删除 3 项`); labels are
  nouns; a Latin word in a zh button is a lapse unless it is a proper
  name.
- Dark on light for reading; long zh reading on a dark ground needs
  weight 500 and leading 1.8, or it grays out.
- Mixed pages (zh product, Latin code) set code in a CJK-aware mono so
  comments do not fall to a second face.

## Anti-patterns

| Tell | Why it reads as generated | Do |
|---|---|---|
| Latin display face carrying the identity, CJK on the system stack | the audience gets the fallback experience | CJK face first, self-hosted, sliced |
| leading 1.5, measure 68ch on zh prose | a wall; the eye cannot find the next line | 1.75, 38em (the kit's `:lang(zh)` block) |
| fake italic on CJK | strokes smear; no CJK face has an italic | weight or emphasis dots |
| negative tracking on a zh headline | strokes touch; reads as a template with the copy swapped | tracking 0 |
| half-width `,` `.` `!` in zh copy | translation residue | full-width set |
| `2026年8月` with no spaces, or spaces around full-width punctuation | the un-polished zh page | 盘古之白 between scripts; none around `，。` |
| Chinese copy that describes the layout to the reader | 说明书腔; the writer explaining the page instead of the task | zh-voice.md |
| Simplified glyphs served to a Traditional audience (or JP) | wrong forms, wrong kana | per-locale face via `:lang(zh-Hant)`, `:lang(ja)` |
| uppercase-tracked Latin micro-labels on a zh page | the device does not exist in Chinese; it reads as a foreign template | weight and a rule (house kit's `.label`) |
| `！` and `～` for warmth | the marketing register | zh-voice.md |

## Loading

`kit/fonts.sh` for anything on Google Fonts; `kit/fonts.sh --slice` for
a vendor ttf. `font-display: swap` with the metric fallback in
`fonts.zh.css` so the swap does not reflow. No preload for a sliced
CJK face. One weight of the body face and one of the display face is
enough; variable CJK fonts are 20 MB before slicing and rarely worth
it. Test the first paint on a phone with the cache cleared: the CJK
text should arrive within the same second as the Latin.
