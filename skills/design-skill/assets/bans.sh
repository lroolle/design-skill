#!/usr/bin/env bash
# bans.sh -- deterministic checks that encode scars.
# A clean run is evidence, not proof: it cannot see costume, hierarchy,
# or a missing empty state. Pair it with the critique rubric on the
# rendered thing. Exit 1 if any ban trips.
#
# Usage: bans.sh [--fast] [--tokens FILE] [DIR ...]
#   DIR      app/page code to scan (default: src/app src/components src/blocks)
#   --tokens the token file; it is the only place raw colors may live
#            (default: any file named tokens*.css or globals.css is skipped)
#   --fast   the immediate tier only (raw color, palette classes, pure
#            black/white, layout transitions): safe to run on every edit
#            or as an edit hook. The full pass runs once at Review -- a
#            steady nag stream of copy-level findings makes a model timid,
#            so the rest waits for the end.
# Point it at app code, not at a generator-managed component library
# (paths containing /ui/ are skipped; they are token-driven already).

set -uo pipefail
tokens_glob='tokens.*\.css|tokens\.css|globals\.css'
fast=0
dirs=()
while [ $# -gt 0 ]; do
  case "$1" in
    --fast) fast=1; shift ;;
    --tokens) tokens_glob="$(basename "$2")"; shift 2 ;;
    *) dirs+=("$1"); shift ;;
  esac
done
[ ${#dirs[@]} -eq 0 ] && dirs=(src/app src/components src/blocks)
existing=()
for d in "${dirs[@]}"; do [ -e "$d" ] && existing+=("$d"); done
if [ ${#existing[@]} -eq 0 ]; then echo "bans: no such dirs: ${dirs[*]}"; exit 2; fi

fail=0
hit() { echo "DEFECT [$1]: $2"; fail=1; }
scan() { grep -rInE "$1" "${existing[@]}" 2>/dev/null | grep -v '/ui/' | grep -vE "$tokens_glob" || true; }

# 1. Raw color outside the token file. Color lives in tokens so both
#    themes stay coherent; a hex in a component is a color dark mode
#    cannot reach, and a grep cannot audit.
out=$(scan '#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b|\boklch\(|\brgba?\(|\bhsla?\(')
[ -n "$out" ] && { hit color "raw hex/oklch/rgb/hsl outside the token file"; echo "$out" | head -20; }

# 2. Raw utility palette classes. Semantic states derive from tokens;
#    token-red + red-600 + amber-400 on one page is three color systems.
out=$(scan '\b(bg|text|border|ring|outline|from|to|via|fill|stroke)-(red|amber|orange|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|zinc|neutral|stone|gray)-[0-9]{2,3}\b')
[ -n "$out" ] && { hit palette "raw utility palette classes in app code"; echo "$out" | head -20; }

# 3. Pure black / white. Halation and dead neutrals; the seed trace is
#    what makes a system read as decided.
out=$(scan '#000000\b|#ffffff\b|#000\b|#fff\b|\b(bg|text|border)-(black|white)\b|oklch\(\s*[01](\.0+)?\s+0\s')
[ -n "$out" ] && { hit purity "pure black/white"; echo "$out" | head -20; }

# 4. Urgency kit. Pulsing, pinging, bouncing spend trust to buy
#    attention; deadlines render as dated facts.
out=$(scan 'animate-(ping|pulse|bounce)|animation:[^;]*(pulse|blink|shake)')
[ -n "$out" ] && { hit urgency "urgency animations"; echo "$out" | head -20; }

# 5. Layout-property transitions. Only transform and opacity stay off
#    the main thread; animating height/top/margin janks and reflows.
out=$(scan 'transition(-property)?:[^;]*\b(all|height|width|top|left|right|bottom|margin[a-z-]*|padding[a-z-]*)\b|transition-all\b')
[ -n "$out" ] && { hit layout-anim "transition on layout properties or transition-all"; echo "$out" | head -20; }

if [ "$fast" -eq 0 ]; then
# 6. Side-stripe accent and gradient text. Imported emphasis devices
#    that add weight without meaning.
out=$(scan 'border-l-[2-9]|border-l-\[|border-left:\s*[2-9]px|bg-clip-text|background-clip:\s*text')
[ -n "$out" ] && { hit device "side-stripe accent or gradient text"; echo "$out" | head -20; }

# 7. Saturated faces carrying the identity (font-family declarations
#    and font imports). Body workhorse use inside a decided system is a
#    judgment call; a display declaration is the tell.
out=$(scan "(font-family|@import|fonts\.googleapis\.com)[^;\n]*(Inter\b|Poppins|Montserrat|Plus Jakarta|Playfair|Fraunces|Cormorant|Space Grotesk|Space Mono|Instrument Serif|DM Serif)")
[ -n "$out" ] && { hit font "saturated typeface in a font declaration or import"; echo "$out" | head -20; }

# 8. Fake content. Placeholder people, companies, numbers and text read
#    as generated within seconds.
out=$(scan '\bLorem ipsum\b|\bAcme\b|\bJohn Doe\b|\bJane Doe\b|\b99\.99%|placeholder\.com|via\.placeholder|unsplash\.com/photo')
[ -n "$out" ] && { hit fake "placeholder content"; echo "$out" | head -20; }

# 9. Emoji in UI strings (headings, buttons, labels). One icon set, one
#    weight, or nothing.
out=$(grep -rInP '[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]' "${existing[@]}" 2>/dev/null | grep -v '/ui/' | grep -vE '\.(md|json|txt)$' || true)
[ -n "$out" ] && { hit emoji "emoji in UI source"; echo "$out" | head -20; }

# 10. Missing reduced-motion handling when animation exists.
if grep -rIlE '@keyframes|animation:|transition:' "${existing[@]}" 2>/dev/null | grep -v '/ui/' | grep -q .; then
  if ! grep -rIlE 'prefers-reduced-motion' "${existing[@]}" . 2>/dev/null | grep -q .; then
    hit motion "animation present but no prefers-reduced-motion rule anywhere"
  fi
fi

fi # deferred tier

tier=full; [ "$fast" -eq 1 ] && tier=fast
if [ "$fail" -eq 0 ]; then echo "bans: clean [$tier tier] (${existing[*]})"; fi
exit "$fail"
