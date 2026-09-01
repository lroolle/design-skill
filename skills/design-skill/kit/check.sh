#!/usr/bin/env bash
# check.sh -- the binding layer. Mechanical, near-zero context, unskippable.
#
# Everything the craft references used to *advise* and a build under
# pressure used to skip, as grep. A clean run is evidence, not proof: it
# cannot see costume, hierarchy, or a missing empty state. Two tiers:
#   FAIL  exit 1; not done while any remains
#   WARN  named, counted, shipped only with a written reason in DESIGN.md
#
# Usage: kit/check.sh [--fast] [--zh|--no-zh] [--no-promise] [--tokens FILE] [DIR ...]
#   DIR          app/page code to scan (default: src/app src/components src/blocks src,
#                falling back to . when none exist; node_modules, dist, .git skipped)
#   --tokens     the token file (default: any tokens*.css / globals.css found)
#   --zh         force zh mode (auto when any html carries lang="zh|ja|ko")
#   --no-zh      never zh mode
#   --no-promise skip the promise/roll-key check (throwaway artifacts)
#   --fast       immediate tier only: raw color, palette classes, pure
#                black/white, layout transitions, urgency. Safe as an edit
#                hook. The full pass runs once at Review.
# Files under /ui/ (generator-managed component libraries) and the kit's
# own base.css are skipped: they are token-driven already.
set -uo pipefail
here=$(cd "$(dirname "$0")" && pwd)
fast=0; zh=auto; promise=1; tokens=""
dirs=()
while [ $# -gt 0 ]; do
  case "$1" in
    --fast) fast=1; shift ;;
    --zh) zh=1; shift ;;
    --no-zh) zh=0; shift ;;
    --no-promise) promise=0; shift ;;
    --tokens) tokens="$2"; shift 2 ;;
    -h|--help) sed -n 2,22p "$0"; exit 0 ;;
    *) dirs+=("$1"); shift ;;
  esac
done
[ ${#dirs[@]} -eq 0 ] && dirs=(src/app src/components src/blocks src)
existing=()
for d in "${dirs[@]}"; do [ -e "$d" ] && existing+=("$d"); done
[ ${#existing[@]} -eq 0 ] && existing=(.)

nfail=0; nwarn=0
fail() { echo "FAIL [$1]: $2"; nfail=$((nfail+1)); }
warn() { echo "WARN [$1]: $2"; nwarn=$((nwarn+1)); }
show() { [ -n "$1" ] && echo "$1" | head -${2:-12} | sed 's/^/      /'; }

# file lists
files() { find "${existing[@]}" -type f \( -name '*.html' -o -name '*.htm' -o -name '*.css' -o -name '*.scss' -o -name '*.js' -o -name '*.jsx' -o -name '*.ts' -o -name '*.tsx' -o -name '*.vue' -o -name '*.svelte' -o -name '*.astro' -o -name '*.mdx' \) \
  -not -path '*/node_modules/*' -not -path '*/.git/*' -not -path '*/dist/*' -not -path '*/build/*' -not -path '*/.next/*' -not -path '*/ui/*' -not -name 'base.css' -not -name 'fonts.*.css' -not -name '*.min.*' 2>/dev/null; }
markup() { files | grep -E '\.(html|htm|jsx|tsx|vue|svelte|astro|mdx)$'; }
allf=$(files)
[ -z "$allf" ] && { echo "check: nothing to scan in ${existing[*]}"; exit 2; }

# the token file: the only place a raw color may live
if [ -z "$tokens" ]; then
  tokens=$(echo "$allf" | grep -E '/(tokens[^/]*\.css|globals\.css)$' | head -1)
fi
tokens_re='(tokens[^/]*\.css|globals\.css)$'
[ -n "$tokens" ] && tokens_re="($(basename "$tokens")|tokens[^/]*\.css|globals\.css)$"
app=$(echo "$allf" | grep -vE "$tokens_re")
scan() { [ -n "$app" ] && echo "$app" | xargs grep -InE "$1" 2>/dev/null || true; }
scanP() { [ -n "$app" ] && echo "$app" | xargs grep -InP "$1" 2>/dev/null || true; }
count() { local n=0; [ -n "$app" ] && n=$(echo "$app" | xargs grep -IoE "$1" 2>/dev/null | wc -l | tr -d ' '); echo "${n:-0}"; }
# visible text of markup files, tags and attributes stripped, one line per source line
text() { for f in $(markup); do sed "s/<[^>]*>/ /g; s/^/$(basename "$f"):/" "$f"; done | grep -nP "$1" 2>/dev/null || true; }
# every css in scope including the kit's base.css (the zh scope lives there)
allcss() { { [ -n "$tokens" ] && echo "$tokens"; find "${existing[@]}" -type f -name '*.css' -not -path '*/node_modules/*' -not -path '*/dist/*' 2>/dev/null; } | sort -u; }

# zh mode: auto-detect from lang attributes
if [ "$zh" = auto ]; then
  zh=0
  markup | xargs grep -lE 'lang="?(zh|ja|ko)' 2>/dev/null | grep -q . && zh=1
fi

# ------------------------------------------------------------ fast tier
# 1. raw color outside the token file
out=$(scan '(^|[^&])(#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b)|\boklch\(|\brgba?\(|\bhsla?\(' | grep -vE 'getPropertyValue|^\S+:\s*//|/\*')
[ -n "$out" ] && { fail color "raw hex/oklch/rgb/hsl outside the token file"; show "$out"; }
# 2. raw utility palette classes
out=$(scan '\b(bg|text|border|ring|outline|from|to|via|fill|stroke)-(red|amber|orange|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|zinc|neutral|stone|gray)-[0-9]{2,3}\b')
[ -n "$out" ] && { fail palette "raw utility palette classes in app code"; show "$out"; }
# 3. pure black / white (print stylesheets excepted)
out=$(scan '#000000\b|#ffffff\b|#000\b|#fff\b|\b(bg|text|border)-(black|white)\b|oklch\(\s*[01](\.0+)?\s+0\s' | grep -v '@media print')
[ -n "$out" ] && { fail purity "pure black/white"; show "$out"; }
# 4. urgency kit
out=$(scan 'animate-(ping|pulse|bounce)|animation:[^;]*(pulse|blink|shake)')
[ -n "$out" ] && { fail urgency "urgency animations"; show "$out"; }
# 5. layout-property transitions
out=$(scan 'transition(-property)?:[^;]*\b(all|height|width|top|left|right|bottom|margin[a-z-]*|padding[a-z-]*)\b|transition-all\b')
[ -n "$out" ] && { fail layout-anim "transition on layout properties or transition-all"; show "$out"; }

if [ "$fast" -eq 0 ]; then
# ------------------------------------------------------------ full tier
# 6. side-stripe accent and gradient text
out=$(scan 'border-l-[2-9]|border-l-\[|border-left:\s*[2-9]px|bg-clip-text|background-clip:\s*text')
[ -n "$out" ] && { fail device "side-stripe accent or gradient text"; show "$out"; }
# 7. saturated faces carrying the identity
out=$(scan "(font-family|@import|fonts\.googleapis\.com|--font-display|--font-body)[^;]*(Inter\b|Poppins|Montserrat|Plus Jakarta|Playfair|Fraunces|Cormorant|Space Grotesk|Space Mono|Instrument Serif|DM Serif|Outfit\b|Manrope|Syne\b)")
[ -n "$out" ] && { fail font "saturated typeface in a font declaration or import (references/anti-patterns.md)"; show "$out"; }
# 8. fake content
out=$(scan '\bLorem ipsum\b|\bAcme\b|\bJohn Doe\b|\bJane Doe\b|\b99\.99%|placeholder\.com|via\.placeholder|unsplash\.com/photo|张三|李四')
[ -n "$out" ] && { fail fake "placeholder content"; show "$out"; }
# 9. emoji as UI
out=$(scanP '[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]')
[ -n "$out" ] && { fail emoji "emoji in UI source"; show "$out"; }
# 10. animation without reduced-motion
if [ -n "$(scan '@keyframes|animation:|transition:')" ] && ! grep -rIlE 'prefers-reduced-motion' "${existing[@]}" 2>/dev/null | grep -q .; then
  fail motion "animation present but no prefers-reduced-motion rule anywhere"
fi

# 11. the promise comment and the roll key
if [ "$promise" -eq 1 ] && [ -n "$(markup)" ]; then
  if ! markup | xargs grep -lE '\bTHESIS\b' 2>/dev/null | grep -q .; then
    fail promise "no promise comment (THESIS / OWN-WORLD / STORY / FIRST VIEWPORT / FORM) in any markup; --no-promise for a throwaway"
  else
    for b in OWN-WORLD STORY 'FIRST VIEWPORT' FORM; do
      markup | xargs grep -lE "\b$b\b" 2>/dev/null | grep -q . || fail promise "promise block $b missing"
    done
    # the FORM block may wrap; read it plus the two lines after it
    markup | xargs grep -hA2 -E '\bFORM\b' 2>/dev/null | grep -qE '\b[0-9a-f]{8}\b' || fail promise "FORM block carries no roll key (8 hex from scripts/roll.mjs)"
  fi
fi

# 12. the palette: a computed ramp, or the floor shipped as a look
if [ -n "$tokens" ] && [ -f "$tokens" ]; then
  root=$(awk '/^:root[[:space:]]*\{/{f=1} f{print} f&&/^\}/{exit}' "$tokens")
  lch() { grep -oE -- "--$1:[[:space:]]*oklch\([^)]*\)" <<< "$2" | head -1 | grep -oE '[0-9.]+ +[0-9.]+ +[0-9.]+' | head -1; }
  hues=""; chromas=""; n=0
  for t in bg surface surface-2 fg fg-2 fg-3 line line-strong; do
    v=$(lch "$t" "$root"); [ -z "$v" ] && continue
    n=$((n+1)); hues="$hues $(awk '{print $3}' <<< "$v")"; chromas="$chromas $(awk '{print $2}' <<< "$v")"
  done
  if [ "$n" -ge 6 ]; then
    hspread=$(tr ' ' '\n' <<< "$hues" | grep . | sort -n | awk 'NR==1{a=$1} {b=$1} END{print b-a}')
    cspread=$(tr ' ' '\n' <<< "$chromas" | grep . | sort -n | awk 'NR==1{a=$1} {b=$1} END{printf "%.4f", b-a}')
    if awk -v h="$hspread" -v c="$cspread" 'BEGIN{exit !(h<=2 && c<=0.002)}'; then
      warn ramp "neutrals are one hue at one chroma across $n lightnesses (hue spread $hspread, chroma spread $cspread): a computed ramp. Re-ink from specimens/palettes/ or the world card; real inks have irregular relationships"
    fi
    acc=$(lch accent "$root"); ah=$(awk '{print $3}' <<< "$acc")
    nh=$(tr ' ' '\n' <<< "$hues" | grep . | head -1)
    if [ -n "$ah" ] && [ -n "$nh" ] && awk -v a="$ah" -v b="$nh" -v h="$hspread" 'BEGIN{d=a-b; if(d<0)d=-d; exit !(d<=3 && h<=2)}'; then
      warn ramp "neutrals sit on the accent hue ($ah): the seed-hue ladder. Ground, ink and rule should be three materials"
    fi
  fi
  floor="$here/floor/tokens.css"
  if [ -f "$floor" ] && [ "$(cd "$(dirname "$tokens")" && pwd)/$(basename "$tokens")" != "$floor" ]; then
    froot=$(awk '/^:root[[:space:]]*\{/{f=1} f{print} f&&/^\}/{exit}' "$floor")
    same=0
    for t in bg surface surface-2 fg fg-2 fg-3 line line-strong accent; do
      [ -n "$(lch "$t" "$root")" ] && [ "$(lch "$t" "$root")" = "$(lch "$t" "$froot")" ] && same=$((same+1))
    done
    [ "$same" -ge 7 ] && warn floor "$same/9 palette tokens identical to kit/floor/tokens.css: the floor shipped as a look. Build must overwrite the palette"
  fi
else
  warn tokens "no token file found (tokens*.css / globals.css); pass --tokens FILE"
fi

# 13. layout reflexes: the generated-dashboard shape
micro=$(count 'text-transform:\s*uppercase|\buppercase\b.*\btracking-|\btracking-(wide|wider|widest)\b.*\buppercase\b|letter-spacing:\s*0\.(0[5-9]|[1-9])')
sticky=$(count '\bsticky\b')
cards=$(count '\brounded-(xl|2xl|3xl)\b|\bshadow-(md|lg|xl|2xl)\b|class="[^"]*\bcard\b|\.card\b')
twocol=$(count 'grid-template-columns:\s*(1fr\s+1fr|repeat\(\s*2|[12]fr\s+[12]fr|minmax\([^)]*\)\s+[0-9]+(px|rem))|\b(lg|md|xl):grid-cols-2\b|\bgrid-cols-\[[^]]*_[0-9]+(px|rem)\]')
band=$(count '\b(hero|band|full-bleed|w-screen)\b|100vw')
signals=0
[ "$micro" -ge 4 ] && signals=$((signals+1))
[ "$sticky" -ge 1 ] && [ "$cards" -ge 3 ] && signals=$((signals+1))
[ "$twocol" -ge 1 ] && [ "$band" -ge 1 ] && signals=$((signals+1))
[ "$micro" -ge 4 ] && warn devices "$micro uppercase-tracked micro-labels: device sprawl. One masthead device + one section-label device per page"
[ "$signals" -ge 2 ] && warn reflex "generated-dashboard shape ($signals/3 signals: micro-labels $micro, sticky+cards $sticky/$cards, band+2col $band/$twocol). Name the composition from decks/compositions/ or the world card instead"

# 14. zh mode
if [ "$zh" -eq 1 ]; then
  cjk_re='Noto (Sans|Serif) (SC|TC|HK|JP|KR|CJK)|Source Han|思源|LXGW|WenKai|霞鹜|Smiley Sans|得意黑|MiSans|HarmonyOS Sans|Douyin Sans|抖音|Sarasa|Maple Mono|PuHuiTi|普惠体|Zhuque|朱雀|Huiwen|汇文|Pretendard|BIZ UD|Zen Kaku|GenYo|LXGW Bright'
  face_files=$(find "${existing[@]}" public static assets fonts -type f \( -name '*.css' -o -name '*.html' \) -not -path '*/node_modules/*' 2>/dev/null | sort -u)
  hasface=$( [ -n "$face_files" ] && echo "$face_files" | xargs grep -lzP "@font-face[^}]*font-family:\s*['\"]?($cjk_re)" 2>/dev/null | head -1 || true)
  haslink=$(markup | xargs grep -hoE "<link[^>]*(rel=\"?stylesheet\"?)[^>]*>" 2>/dev/null | grep -iE 'noto-(sans|serif)-(sc|tc|jp|kr)|lxgw|wenkai|smiley|misans|harmonyos|sarasa|source-han' | head -1)
  hasgoogle=$(markup | xargs grep -hoE 'fonts\.googleapis\.com/css2?\?[^"]*' 2>/dev/null | grep -E 'Noto\+(Sans|Serif)\+(SC|TC|JP|KR)|LXGW' | head -1)
  if [ -z "$hasface" ] && [ -z "$haslink" ] && [ -z "$hasgoogle" ]; then
    fail zh-font "zh page with no CJK webfont: no @font-face for a CJK family, no fonts.sh stylesheet linked. A system stack hands the primary audience the fallback experience. kit/fonts.sh \"Noto Sans SC\" 400,700 public/fonts"
  elif [ -n "$hasgoogle" ] && [ -z "$hasface" ] && [ -z "$haslink" ]; then
    warn zh-font "CJK face loaded from Google Fonts at runtime; self-host it (kit/fonts.sh) -- fonts.googleapis.com is slow or blocked for the audience that reads Chinese"
  fi
  # leading and measure in zh scope: the :lang(zh) block if present, else :root
  lead=$(allcss | xargs cat 2>/dev/null | awk '/:lang\(zh/{f=1} f&&/--leading-body:/{print; exit} /^\}/{f=0}' | grep -oE '[0-9.]+' | head -1)
  [ -z "$lead" ] && [ -n "$tokens" ] && lead=$(grep -oE -- '--leading-body:\s*[0-9.]+' "$tokens" | head -1 | grep -oE '[0-9.]+$')
  if [ -n "$lead" ]; then
    awk -v v="$lead" 'BEGIN{exit !(v>=1.7)}' || fail zh-leading "CJK body leading $lead (< 1.7). Square glyphs need 1.7-1.8; set it in the :lang(zh) block"
  else
    warn zh-leading "could not find --leading-body for the zh scope; the floor's base.css sets it"
  fi
  meas=$(allcss | xargs cat 2>/dev/null | awk '/:lang\(zh/{f=1} f&&/--measure:/{print; exit} /^\}/{f=0}' | grep -oE '[0-9.]+' | head -1)
  [ -z "$meas" ] && [ -n "$tokens" ] && meas=$(grep -oE -- '--measure:\s*[0-9.]+' "$tokens" | head -1 | grep -oE '[0-9.]+$')
  if [ -n "$meas" ] && awk -v v="$meas" 'BEGIN{exit !(v>42)}'; then
    warn zh-measure "CJK measure $meas (> 40 characters): a wall of text. 30-40em in the :lang(zh) block"
  fi
  out=$(text '[\x{4E00}-\x{9FFF}][A-Za-z0-9]|[A-Za-z0-9][\x{4E00}-\x{9FFF}]')
  cnt=$(echo "$out" | grep -c . || true)
  if [ "$cnt" -gt 0 ]; then
    if grep -rqE 'text-autospace:\s*normal' "${existing[@]}" 2>/dev/null; then
      warn zh-spacing "$cnt lines with no space between CJK and Latin/digits; text-autospace is set but not every browser honors it -- write the space (盘古之白)"
    else
      warn zh-spacing "$cnt lines with no space between CJK and Latin/digits (盘古之白); write it, or set text-autospace: normal in the :lang(zh) block"
    fi
    show "$out" 6
  fi
  out=$(text '[\x{4E00}-\x{9FFF}][ \t]*[,.!?:;]([ \t]|$)')
  [ -n "$out" ] && { warn zh-punct "half-width punctuation after CJK text; use ，。！？：； (specimens/zh-voice.md)"; show "$out" 6; }
  out=$(text '！')
  [ -n "$out" ] && { warn zh-voice "exclamation marks in zh copy on a product surface; specimens/zh-voice.md rations them to zero"; show "$out" 4; }
  out=$(scanP '(font-style:\s*italic|\bitalic\b)' | grep -vE 'font-style:\s*normal')
  [ -n "$out" ] && { warn zh-italic "italic on a zh page: CJK has no italic; fake oblique smears strokes. Weight or 着重号 (text-emphasis)"; show "$out" 4; }
fi
fi # full tier

tier=full; [ "$fast" -eq 1 ] && tier=fast
mode=""; [ "$zh" = 1 ] && mode=" zh"
echo "check: $nfail fail, $nwarn warn [$tier$mode] (${existing[*]})"
[ "$nfail" -eq 0 ]
