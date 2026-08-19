#!/usr/bin/env bash
# validate.sh -- the proof behind the README's claims.
#
# Repo layout checks (packaging: skills/<name>/SKILL.md, plugin manifests)
# then skill checks (frontmatter, links, systems, tokens, specimen, bans,
# decks, dice). Exit non-zero on any failure. No dependencies beyond bash,
# grep, awk, and -- for the dice -- node.
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

# 0b. Root-level markdown links (README, llms.txt) resolve
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
[ "$lines" -le 500 ] && ok "SKILL.md $lines lines (<= 500)" || bad "SKILL.md $lines lines (> 500)"
desc=$(awk '/^description:/{f=1; next} f && /^[a-z]+:/{exit} f && /^---/{exit} f {gsub(/^ +| +$/, ""); printf "%s ", $0}' SKILL.md)
[ ${#desc} -le 1024 ] && ok "description ${#desc} chars (<= 1024)" || bad "description ${#desc} chars (> 1024)"

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

# 3. Design systems: 12 sections + token file + README row
sections=("## 1. Identity" "## 2. Color" "## 3. Type" "## 4. Space and density" "## 5. Shape and surface" "## 6. Motion" "## 7. Imagery and icons" "## 8. Components" "## 9. Signature moves" "## 10. Voice" "## 11. Where it turns to slop" "## 12. Tokens")
for f in design-systems/*.md; do
  n=$(basename "$f" .md)
  case "$n" in README|_template) continue ;; esac
  miss=""
  for s in "${sections[@]}"; do grep -qF "$s" "$f" || miss="$miss | $s"; done
  [ -f "assets/tokens/$n.css" ] || miss="$miss | tokens css"
  grep -qF "[$n]($n.md)" design-systems/README.md || miss="$miss | README row"
  [ -z "$miss" ] && ok "system $n" || bad "system $n missing:$miss"
done

# 4. Token contract: every token defined on :root and [data-theme="dark"]
tokens=(bg surface surface-2 overlay fg fg-2 fg-3 line line-strong accent accent-hover accent-fg accent-soft ok warn danger info focus font-display font-body font-mono font-cjk text-xs text-sm text-base text-lg text-xl text-2xl text-3xl text-4xl leading-body leading-tight tracking-display measure space-1 space-2 space-3 space-4 space-5 space-6 space-7 space-8 space-9 space-10 space-11 space-12 radius radius-sm radius-lg line-w shadow-1 shadow-2 dur-micro dur-base dur-enter ease-out ease-in-out ease-subtle container container-wide)
themed=(bg surface surface-2 overlay fg fg-2 fg-3 line line-strong accent accent-hover accent-fg accent-soft ok warn danger info focus shadow-1 shadow-2)
for css in assets/tokens/*.css; do
  miss=""
  root=$(awk '/^:root[[:space:]]*\{/{f=1} f{print} f&&/^\}/{exit}' "$css")
  dark=$(awk '/^\[data-theme="dark"\][[:space:]]*\{/{f=1} f{print} f&&/^\}/{exit}' "$css")
  for t in "${tokens[@]}"; do grep -qE "^\s*--$t:" <<< "$root" || miss="$miss --$t"; done
  for t in "${themed[@]}"; do grep -qE "^\s*--$t:" <<< "$dark" || miss="$miss dark:--$t"; done
  grep -qE '#(000000|ffffff|000|fff)\b' "$css" && miss="$miss pure-black/white"
  grep -q 'prefers-reduced-motion' "$css" || miss="$miss reduced-motion"
  # --fg-3 carries body-size text (captions, micro-labels, fine print), so it
  # has to clear 4.5:1. Lightness is a browser-free proxy for the real ratio
  # against these files' ground lightnesses; see design-systems/README.md.
  lroot=$(grep -oE -- '--fg-3:[[:space:]]*oklch\([0-9.]+' <<< "$root" | grep -oE '[0-9.]+$')
  ldark=$(grep -oE -- '--fg-3:[[:space:]]*oklch\([0-9.]+' <<< "$dark" | grep -oE '[0-9.]+$')
  awk -v v="$lroot" 'BEGIN{exit !(v!="" && v<=0.56)}' || miss="$miss fg-3-light-contrast($lroot)"
  awk -v v="$ldark" 'BEGIN{exit !(v!="" && v>=0.59)}' || miss="$miss fg-3-dark-contrast($ldark)"
  [ -z "$miss" ] && ok "tokens $(basename "$css")" || bad "tokens $(basename "$css") missing:$miss"
done

# 5. Specimen uses only defined tokens (extras must carry a fallback)
if [ -f assets/specimen.html ]; then
  miss=""
  for v in $(grep -oE 'var\(--[a-z0-9-]+' assets/specimen.html | sed 's/var(--//' | grep -vE -- '-$' | sort -u); do
    defined=1
    for css in assets/tokens/*.css; do grep -qE -- "--$v:" "$css" || defined=0; done
    if [ "$defined" -eq 0 ]; then
      grep -qE "var\(--$v,\s*var\(" assets/specimen.html || miss="$miss --$v"
    fi
  done
  [ -z "$miss" ] && ok "specimen tokens" || bad "specimen uses undefined tokens without fallback:$miss"
  raw=$(grep -nE '#[0-9a-fA-F]{6}\b|oklch\(|rgba?\(' assets/specimen.html | grep -vE 'getPropertyValue|//|/\*' | wc -l)
  [ "$raw" -eq 0 ] && ok "specimen has no raw colors" || bad "specimen has $raw raw color lines"
fi

# 6. bans.sh self-test: clean fixture passes, dirty fixture trips
BANS="$PWD/assets/bans.sh"
tmp=$(mktemp -d); mkdir -p "$tmp/clean/app" "$tmp/dirty/app"
cat > "$tmp/clean/app/page.css" <<'EOF'
.x { color: var(--fg); background: var(--bg); transition: opacity var(--dur-base) var(--ease-out); }
@media (prefers-reduced-motion: reduce) { .x { transition: none; } }
EOF
cat > "$tmp/dirty/app/page.tsx" <<'EOF'
<div className="text-red-500 border-l-4 animate-pulse" style={{color:'#ffffff'}}>Acme Lorem ipsum</div>
EOF
if (cd "$tmp/clean" && bash "$BANS" app >/dev/null); then ok "bans.sh clean fixture"; else bad "bans.sh flags a clean fixture"; fi
if (cd "$tmp/dirty" && bash "$BANS" app >/dev/null); then bad "bans.sh misses a dirty fixture"; else ok "bans.sh trips on dirty fixture"; fi
rm -rf "$tmp"

# 7. Forbidden names (WIP rule) and non-ascii outside CJK samples
cd "$ROOT"
if grep -rniE 'open-design|opendesign' . --exclude-dir=.git --exclude=validate.sh -q; then bad "forbidden name present"; else ok "no forbidden names"; fi
if grep -rnP '[\x{2014}\x{2013}\x{2018}\x{2019}\x{201C}\x{201D}]' . --exclude-dir=.git --include='*.md' --include='*.css' --include='*.sh' -q; then
  bad "typographic dashes/quotes in source (use ascii)"; grep -rnP '[\x{2014}\x{2013}\x{2018}\x{2019}\x{201C}\x{201D}]' . --exclude-dir=.git --include='*.md' --include='*.css' --include='*.sh' | head -5
else ok "ascii punctuation"; fi
cd "$SKILL_DIR"

# 8. Decks: worlds/ and stagings/ frontmatter + sections; roll.mjs deterministic
for deck in worlds stagings; do
  n=0; bad_files=""
  for f in "$deck"/*.md; do
    b=$(basename "$f"); case "$b" in README.md|_template.md) continue ;; esac
    n=$((n+1)); miss=""
    head -1 "$f" | grep -q '^---$' || miss="$miss frontmatter"
    for k in id name modes rating platforms; do grep -qE "^$k:" "$f" || miss="$miss $k"; done
    if [ "$deck" = worlds ]; then
      for k in tier families grain origin; do grep -qE "^$k:" "$f" || miss="$miss $k"; done
      grep -qE '^tier: (graphic|interaction|atmosphere)' "$f" || miss="$miss tier-value"
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
if command -v node >/dev/null 2>&1; then
  a=$(node scripts/roll.mjs --scope direction --mode persuade --candidates 7 --key 3f9a2c1e --json | tr -d ' \n')
  b=$(node scripts/roll.mjs --scope direction --mode persuade --candidates 7 --key 3f9a2c1e --json | tr -d ' \n')
  [ "$a" = "$b" ] && [ -n "$a" ] && ok "roll.mjs deterministic for a fixed key" || bad "roll.mjs not deterministic"
  r=$(node scripts/roll.mjs --scope direction --mode persuade --candidates 7 --key 3f9a2c1e --reroll 1 --json)
  grep -q '"reroll": 1' <<< "$r" && ok "roll.mjs reroll" || bad "roll.mjs reroll"
  s2=$(node scripts/roll.mjs --scope surface --mode operate --grain view --key 3f9a2c1e --json)
  grep -q '"challengers"' <<< "$s2" && ok "roll.mjs surface scope" || bad "roll.mjs surface scope"
else
  echo "skip  node not found; roll.mjs untested"
fi

exit "$fail"
