#!/usr/bin/env bash
# validate.sh -- the proof behind the README's claims.
#
# Repo layout checks (packaging: skills/<name>/SKILL.md, plugin manifests)
# then skill checks (frontmatter, links, kits, systems, tokens, check.sh
# self-test, decks, recipes, dice, site sync). Exit non-zero on any
# failure. No dependencies beyond bash, grep, awk, and -- for the dice
# and the site -- node.
set -uo pipefail
ROOT=$(cd "$(dirname "$0")/.." && pwd)
cd "$ROOT"
SKILL_DIR=skills/design-skill
SKILL_NAME=design-skill
fail=0
ok()   { printf 'ok    %s\n' "$1"; }
bad()  { printf 'FAIL  %s\n' "$1"; fail=1; }

# 0. Packaging: what `npx skills add` and Claude Code plugins look for
[ -f "$SKILL_DIR/SKILL.md" ] && ok "skill at $SKILL_DIR/SKILL.md" || bad "no SKILL.md at $SKILL_DIR"
[ -f SKILL.md ] && bad "a root SKILL.md shadows skills/ discovery -- remove it" || ok "no root SKILL.md"
for f in README.md LICENSE llms.txt .claude-plugin/plugin.json .claude-plugin/marketplace.json; do
  [ -f "$f" ] && ok "repo asset $f" || bad "missing repo asset $f"
done
if command -v node >/dev/null 2>&1; then
  for f in .claude-plugin/plugin.json .claude-plugin/marketplace.json; do
    node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))" 2>/dev/null \
      && ok "$f parses" || bad "$f is not valid JSON"
  done
  pn=$(node -e "console.log(JSON.parse(require('fs').readFileSync('.claude-plugin/plugin.json','utf8')).name)" 2>/dev/null)
  [ "$pn" = "$SKILL_NAME" ] && ok "plugin.json name = $pn" || bad "plugin.json name is '$pn', expected $SKILL_NAME"
fi

# 0b. Root-level markdown links resolve
rootbroken=""
for f in README.md llms.txt; do
  while IFS= read -r link; do
    [ -z "$link" ] && continue
    case "$link" in http://*|https://*|mailto:*) continue ;; esac
    [ -e "$link" ] || rootbroken="$rootbroken $f->$link"
  done < <(grep -oE '\]\(([^)#]+)(#[^)]*)?\)' "$f" | sed -E 's/^\]\(//; s/\)$//; s/#.*$//')
done
[ -z "$rootbroken" ] && ok "root links resolve" || bad "root links broken:$rootbroken"

cd "$SKILL_DIR"

# 1. SKILL.md
name=$(awk '/^name:/{print $2; exit}' SKILL.md)
[ "$name" = "$SKILL_NAME" ] && ok "frontmatter name = $name" || bad "frontmatter name is '$name', expected $SKILL_NAME"
[ "$name" = "$(basename "$PWD")" ] && ok "name matches directory" || bad "name '$name' != directory '$(basename "$PWD")'"
grep -q '^license:' SKILL.md && ok "frontmatter license" || bad "frontmatter has no license"
lines=$(wc -l < SKILL.md)
[ "$lines" -le 400 ] && ok "SKILL.md $lines lines (<= 400)" || bad "SKILL.md $lines lines (> 400)"
words=$(wc -w < SKILL.md)
[ "$words" -le 2600 ] && ok "SKILL.md $words words (<= 2600)" || bad "SKILL.md $words words (> 2600): the protocol is growing back into a method"
desc=$(awk '/^description:/{f=1; next} f && /^[a-z]+:/{exit} f && /^---/{exit} f {gsub(/^ +| +$/, ""); printf "%s ", $0}' SKILL.md)
[ ${#desc} -le 1024 ] && ok "description ${#desc} chars (<= 1024)" || bad "description ${#desc} chars (> 1024)"
for p in kit/README.md kit/check.sh kit/fonts.sh kit/floor/tokens.css kit/floor/base.css kit/floor/fonts.zh.css kit/floor/fonts.latin.css kit/house/tokens.css kit/house/base.css kit/house/components.css \
         specimens/palettes/README.md specimens/type/README.md specimens/zh-voice.md decks/worlds/_template.md decks/compositions/_template.md decks/recipes/_template.md \
         scripts/roll.mjs systems/README.md references/thinking.md references/craft.md references/cjk.md references/color.md references/simulation.md references/anti-patterns.md references/priors.md references/platforms.md \
         assets/primitives/README.md assets/DESIGN.md.tmpl assets/TASTE.md.tmpl; do
  [ -e "$p" ] || bad "SKILL.md map target missing: $p"
done
ok "map targets exist"
grep -q 'kit/check.sh' SKILL.md && grep -q -- '--subject' SKILL.md && ok "SKILL.md binds check.sh and the affinity roll" || bad "SKILL.md does not mention kit/check.sh and --subject"

# 2. Relative links resolve (markdown files only; skip http and anchors)
rm -f /tmp/.lds_broken
while IFS= read -r f; do
  dir=$(dirname "$f")
  grep -oE '\]\(([^)#]+)(#[^)]*)?\)' "$f" | sed -E 's/^\]\(//; s/\)$//; s/#.*$//' | while IFS= read -r link; do
    [ -z "$link" ] && continue
    case "$link" in http://*|https://*|mailto:*) continue ;; esac
    if [ ! -e "$dir/$link" ] && [ ! -e "$link" ]; then
      echo "      broken link in $f -> $link"; echo 1 > /tmp/.lds_broken
    fi
  done
done < <(find . -name '*.md' -not -path './.git/*' -not -path './node_modules/*')
if [ -f /tmp/.lds_broken ]; then rm -f /tmp/.lds_broken; bad "relative links"; else ok "relative links resolve"; fi

# 2b. No references to paths that no longer exist
stale=$(grep -rnE 'design-systems/|assets/tokens/|assets/bans\.sh|references/(methods|patterns|typography|motion|fontbook|palettes|frameworks|sites|skills)\.md|specimen\.html|(^|[^/a-z-])(worlds|stagings|templates)/' --include='*.md' --include='*.css' --include='*.js' --include='*.mjs' --include='*.sh' --include='*.tmpl' --include='*.html' . 2>/dev/null | grep -v '^./decks/\(worlds\|compositions\)/[^:]*:.*decks/' | grep -vE 'validate|\.git/' | grep -vE 'decks/(worlds|compositions|recipes)/' | head -5)
[ -z "$stale" ] && ok "no stale pre-rewrite paths" || { bad "stale paths"; echo "$stale" | sed 's/^/      /'; }

# 3. Systems: a card + a css per system, README row, card size
for css in systems/*.css; do
  n=$(basename "$css" .css); miss=""
  [ -f "systems/$n.md" ] || miss="$miss card"
  for h in "## Faces" "## Dials" "## Signature moves" "## Turns to slop"; do grep -qF "$h" "systems/$n.md" 2>/dev/null || miss="$miss '$h'"; done
  w=$(wc -w < "systems/$n.md" 2>/dev/null || echo 0); [ "$w" -le 360 ] || miss="$miss card-${w}w(>360)"
  grep -qF "[$n]($n.md)" systems/README.md || miss="$miss README-row"
  grep -q -- '--motion-personality:' "$css" || miss="$miss motion-personality"
  [ -z "$miss" ] && ok "system $n" || bad "system $n missing:$miss"
done

# 4. Token contract: every token on :root and [data-theme="dark"], in systems/*.css and both kits
tokens=(bg surface surface-2 overlay fg fg-2 fg-3 line line-strong accent accent-hover accent-fg accent-soft ok warn danger info focus font-display font-body font-mono font-cjk text-xs text-sm text-base text-lg text-xl text-2xl text-3xl text-4xl leading-body leading-tight tracking-display measure space-1 space-2 space-3 space-4 space-5 space-6 space-7 space-8 space-9 space-10 space-11 space-12 radius radius-sm radius-lg line-w shadow-1 shadow-2 dur-micro dur-base dur-enter ease-out ease-in-out ease-subtle container container-wide)
themed=(bg surface surface-2 overlay fg fg-2 fg-3 line line-strong accent accent-hover accent-fg accent-soft ok warn danger info focus shadow-1 shadow-2)
for css in systems/*.css kit/floor/tokens.css kit/house/tokens.css; do
  miss=""
  root=$(awk '/^:root[[:space:]]*\{/{f=1} f{print} f&&/^\}/{exit}' "$css")
  dark=$(awk '/^\[data-theme="dark"\][[:space:]]*\{/{f=1} f{print} f&&/^\}/{exit}' "$css")
  for t in "${tokens[@]}"; do grep -qE "^\s*--$t:" <<< "$root" || miss="$miss --$t"; done
  for t in "${themed[@]}"; do grep -qE "^\s*--$t:" <<< "$dark" || miss="$miss dark:--$t"; done
  grep -qE '#(000000|ffffff|000|fff)\b' "$css" && miss="$miss pure-black/white"
  lroot=$(grep -oE -- '--fg-3:[[:space:]]*oklch\([0-9.]+' <<< "$root" | grep -oE '[0-9.]+$')
  ldark=$(grep -oE -- '--fg-3:[[:space:]]*oklch\([0-9.]+' <<< "$dark" | grep -oE '[0-9.]+$')
  awk -v v="$lroot" 'BEGIN{exit !(v!="" && v<=0.56)}' || miss="$miss fg-3-light-contrast($lroot)"
  awk -v v="$ldark" 'BEGIN{exit !(v!="" && v>=0.59)}' || miss="$miss fg-3-dark-contrast($ldark)"
  [ -z "$miss" ] && ok "tokens $css" || bad "tokens $css missing:$miss"
done
grep -q 'prefers-reduced-motion' kit/floor/base.css && grep -q ':lang(zh)' kit/floor/base.css && grep -q 'text-emphasis' kit/floor/base.css \
  && ok "floor base: reduced motion + zh mode" || bad "kit/floor/base.css lacks reduced-motion or the :lang(zh) block"
grep -q '@font-face' kit/floor/fonts.zh.css && grep -qE 'Noto (Sans|Serif) SC' kit/floor/tokens.css && ok "floor wires a CJK webfont" || bad "floor does not wire a CJK webfont"
grep -qiE 'provenance' kit/house/tokens.css && ok "house tokens carry provenance" || bad "kit/house/tokens.css has no provenance comment"
[ -x kit/check.sh ] && [ -x kit/fonts.sh ] && ok "kit scripts executable" || bad "kit/check.sh or kit/fonts.sh not executable"

# 5. check.sh self-test: clean passes, dirty trips (incl. zh), floor warns
CHECK="$PWD/kit/check.sh"
tmp=$(mktemp -d); mkdir -p "$tmp/clean/src" "$tmp/dirty/src" "$tmp/zh/src" "$tmp/zh/public/fonts"
cat > "$tmp/clean/src/page.css" <<'EOF'
.x { color: var(--fg); background: var(--bg); transition: opacity var(--dur-base) var(--ease-out); }
@media (prefers-reduced-motion: reduce) { .x { transition: none; } }
EOF
cat > "$tmp/clean/src/index.html" <<'EOF'
<html lang="en"><body><!-- THESIS a OWN-WORLD b STORY c FIRST VIEWPORT d FORM roll 3f9a2c1e --></body></html>
EOF
cp kit/house/tokens.css "$tmp/clean/src/tokens.css"
cat > "$tmp/dirty/src/page.tsx" <<'EOF'
<div className="text-red-500 border-l-4 animate-pulse" style={{color:'#ffffff'}}>Acme Lorem ipsum</div>
EOF
cat > "$tmp/zh/src/tokens.css" <<'EOF'
:root { --bg: oklch(0.98 0.01 250); --surface: oklch(0.96 0.01 250); --surface-2: oklch(0.93 0.01 250); --fg: oklch(0.18 0.01 250); --fg-2: oklch(0.44 0.01 250); --fg-3: oklch(0.56 0.01 250); --line: oklch(0.87 0.01 250); --line-strong: oklch(0.75 0.01 250); --accent: oklch(0.5 0.15 251); --leading-body: 1.5; --measure: 68ch; }
EOF
cat > "$tmp/zh/src/index.html" <<'EOF'
<html lang="zh-Hans"><body><p>今天是8月24日, 宜出行!</p></body></html>
EOF
if (cd "$tmp/clean" && bash "$CHECK" src >/dev/null); then ok "check.sh: clean fixture passes"; else bad "check.sh flags a clean fixture"; fi
if (cd "$tmp/dirty" && bash "$CHECK" --no-promise src >/dev/null); then bad "check.sh misses a dirty fixture"; else ok "check.sh: dirty fixture trips"; fi
zhout=$(cd "$tmp/zh" && bash "$CHECK" --no-promise src 2>&1)
grep -q 'FAIL \[zh-font\]' <<< "$zhout" && grep -q 'FAIL \[zh-leading\]' <<< "$zhout" && grep -q 'WARN \[ramp\]' <<< "$zhout" && grep -q 'WARN \[zh-punct\]' <<< "$zhout" \
  && ok "check.sh: zh fixture trips font, leading, ramp, punctuation" || { bad "check.sh zh fixture"; echo "$zhout" | head -8 | sed 's/^/      /'; }
mkdir -p "$tmp/floor/src"; cp kit/floor/tokens.css "$tmp/floor/src/tokens.css"; cp "$tmp/clean/src/index.html" "$tmp/floor/src/"
floorout=$(cd "$tmp/floor" && bash "$CHECK" src 2>&1)
grep -q 'WARN \[floor\]' <<< "$floorout" && ok "check.sh: floor shipped unchanged warns" || bad "check.sh does not warn on the floor palette"
rm -rf "$tmp"

# 6. Forbidden names (WIP rule) and non-ascii punctuation (CJK references excepted)
cd "$ROOT"
if grep -rniE 'open-design|opendesign' . --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=demo --exclude=validate.sh -q; then bad "forbidden name present"; else ok "no forbidden names"; fi
if grep -rnP '[\x{2014}\x{2013}\x{2018}\x{2019}\x{201C}\x{201D}]' . --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=demo --include='*.md' --include='*.css' --include='*.sh' --exclude=cjk.md --exclude=zh-voice.md --exclude=TASTE.md.tmpl -q; then
  bad "typographic dashes/quotes in source (use ascii)"; grep -rnP '[\x{2014}\x{2013}\x{2018}\x{2019}\x{201C}\x{201D}]' . --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=demo --include='*.md' --include='*.css' --include='*.sh' --exclude=cjk.md --exclude=zh-voice.md --exclude=TASTE.md.tmpl | head -5
else ok "ascii punctuation (cjk.md, zh-voice.md, TASTE.md.tmpl carry CJK punctuation by design)"; fi
cd "$SKILL_DIR"

# 7. Decks: worlds (with affinity + zh) and compositions; recipes keep their sections
for deck in worlds compositions; do
  n=0; bad_files=""
  for f in decks/"$deck"/*.md; do
    b=$(basename "$f"); case "$b" in README.md|_template.md) continue ;; esac
    n=$((n+1)); miss=""
    head -1 "$f" | grep -q '^---$' || miss="$miss frontmatter"
    for k in id name modes rating platforms; do grep -qE "^$k:" "$f" || miss="$miss $k"; done
    if [ "$deck" = worlds ]; then
      for k in tier families grain origin affinity zh; do grep -qE "^$k:" "$f" || miss="$miss $k"; done
      grep -qE '^tier: (graphic|interaction|atmosphere)' "$f" || miss="$miss tier-value"
      grep -qE '^zh: (true|false)$' "$f" || miss="$miss zh-value"
      na=$(grep -E '^affinity:' "$f" | tr ',' '\n' | wc -l); [ "$na" -ge 8 ] || miss="$miss affinity<8"
      for h in "## Form" "## Spark" "## System" "## Web leverage" "## Translation" "## Risks"; do grep -qF "$h" "$f" || miss="$miss '$h'"; done
      for r in "Palette/material:" "Type/composition:" "Topology/navigation:" "Controls/state:" "Responsive/motion:"; do grep -qF "$r" "$f" || miss="$miss $r"; done
    else
      grep -qE '^grain: (product|flow|view|region)$' "$f" || miss="$miss grain-single"
      for h in "## Form" "## Spark" "## Grammar" "## Web leverage" "## Fits"; do grep -qF "$h" "$f" || miss="$miss '$h'"; done
      for r in "Staging/hierarchy:" "Sequence/attention:" "Controls/state:" "Adaptation:"; do grep -qF "$r" "$f" || miss="$miss $r"; done
    fi
    grep -qE '^rating: [123]$' "$f" || miss="$miss rating-value"
    idv=$(awk -F': ' '/^id:/{print $2; exit}' "$f"); [ "$idv" = "${b%.md}" ] || miss="$miss id!=filename"
    [ -n "$miss" ] && bad_files="$bad_files
      $b:$miss"
  done
  if [ -z "$bad_files" ]; then ok "$deck: $n cards, schema complete"; else bad "$deck schema"; printf "$bad_files
"; fi
done
zhn=$(grep -l '^zh: true' decks/worlds/*.md | wc -l | tr -d ' '); [ "$zhn" -ge 8 ] && ok "worlds: $zhn CJK cards" || bad "worlds: only $zhn CJK cards"
for f in decks/recipes/*.md; do
  b=$(basename "$f"); case "$b" in _template.md) continue ;; esac
  miss=""; for h in "## Job" "## Protected functions" "## The standing exit" "## Settings" "## States" "## Copy" "## Verify" "## Failure modes"; do grep -qF "$h" "$f" || miss="$miss '$h'"; done
  grep -qF "## Directions" "$f" && miss="$miss has-Directions"
  [ -z "$miss" ] && ok "recipe ${b%.md}" || bad "recipe $b:$miss"
done
for f in specimens/palettes/*.md; do
  b=$(basename "$f"); case "$b" in README.md) continue ;; esac
  grep -qE '^Provenance:' "$f" && grep -qF '## The irregularity' "$f" && grep -qF '## Must not become' "$f" && grep -q 'oklch(' "$f" \
    || bad "palette specimen $b lacks provenance / irregularity / must-not-become / values"
done
ok "palette specimens carry provenance and irregularity"

# 8. The dice: deterministic; the deck enters the pool by affinity; surface scope
if command -v node >/dev/null 2>&1; then
  node --check kit/render-check.mjs 2>/dev/null && ok "render-check.mjs parses" || bad "render-check.mjs does not parse"
  a=$(node scripts/roll.mjs --scope direction --mode persuade --candidates 7 --subject "docs for a payments api" --key 3f9a2c1e --json | tr -d ' \n')
  b=$(node scripts/roll.mjs --scope direction --mode persuade --candidates 7 --subject "docs for a payments api" --key 3f9a2c1e --json | tr -d ' \n')
  [ "$a" = "$b" ] && [ -n "$a" ] && ok "roll.mjs deterministic for a fixed key" || bad "roll.mjs not deterministic"
  r=$(node scripts/roll.mjs --scope direction --mode operate --candidates 7 --subject "chinese calendar app daily almanac 黄历" --key 3f9a2c1e --json)
  grep -q '"affine"' <<< "$r" && grep -q 'almanac-tear-off' <<< "$r" && ok "roll.mjs: almanac brief pulls almanac-tear-off into the pool" || bad "roll.mjs affinity pool"
  hit=0; for i in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20; do
    node scripts/roll.mjs --scope direction --mode operate --candidates 7 --subject "chinese calendar app daily almanac" --key $(printf '%08x' $i) --json | grep -q '"kind": "deck"' && hit=$((hit+1)); done
  [ "$hit" -ge 2 ] && ok "roll.mjs: deck cards get assigned ($hit/20 keys)" || bad "roll.mjs: deck never assigned ($hit/20)"
  r=$(node scripts/roll.mjs --scope direction --mode persuade --candidates 7 --subject "x" --key 3f9a2c1e --reroll 1 --json)
  grep -q '"reroll": 1' <<< "$r" && ok "roll.mjs reroll" || bad "roll.mjs reroll"
  s2=$(node scripts/roll.mjs --scope surface --mode operate --grain view --key 3f9a2c1e --json)
  grep -q 'decks/compositions/' <<< "$s2" && ok "roll.mjs surface scope deals compositions" || bad "roll.mjs surface scope"
  node scripts/roll.mjs --scope direction --mode read --key 3f9a2c1e | grep -q 'WARNING: no --subject' && ok "roll.mjs warns without --subject" || bad "roll.mjs silent without --subject"
else
  echo "skip  node not found; roll.mjs untested"
fi

# 9. The page's die is the CLI's die
cd "$ROOT"
if command -v node >/dev/null 2>&1 && [ -f site/deck.mjs ] && [ -f site/deal-check.mjs ]; then
  node site/deck.mjs --check >/dev/null 2>&1 && ok "site/deck.js in sync with the decks" || bad "site/deck.js out of date: node site/deck.mjs"
  out=$(node site/deal-check.mjs 12 2>&1); [ $? -eq 0 ] && ok "site/deal.js: $out" || { bad "site/deal.js disagrees with roll.mjs"; echo "$out" | head -5; }
else
  echo "skip  site has no deck.mjs / deal-check.mjs yet; parity checks resume when a die is on the page"
fi

exit "$fail"
