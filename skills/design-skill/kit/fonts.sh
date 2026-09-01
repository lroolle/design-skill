#!/usr/bin/env bash
# fonts.sh -- self-host a webfont as unicode-range slices, CJK included.
#
# The "a CJK webfont is 5-20 MB" excuse is false: Google Fonts already
# serves Noto Sans SC / Noto Serif SC / LXGW WenKai TC split into ~100
# unicode-range slices of 30-120 KB each, and a browser fetches only the
# slices a page uses. This script pulls that split down so the project
# owns the files (no third-party request at runtime), rewrites the css to
# relative paths, and prints the <link> line to add.
#
#   kit/fonts.sh "Noto Sans SC" 400,700 public/fonts
#   kit/fonts.sh "Noto Serif SC" 400,600 public/fonts
#   kit/fonts.sh "LXGW WenKai TC" 400 public/fonts
#   kit/fonts.sh "Source Sans 3" 400,600 public/fonts
#
# Output: <outdir>/<slug>.css (the @font-face blocks, src rewritten to
# <slug>/NN.woff2) and <outdir>/<slug>/*.woff2. Idempotent; re-run to
# refresh. Needs curl only.
#
# Licenses: everything on Google Fonts is OFL or similar, bundling is
# allowed. Faces NOT on Google Fonts (Smiley Sans, MiSans, HarmonyOS
# Sans, Source Han from Adobe's repo) are downloaded from their vendor
# and sliced with fonttools:
#   uvx --from fonttools pyftsubset Face.ttf --unicodes-file=ranges.txt \
#       --flavor=woff2 --output-file=face-NN.woff2
# and written into the same @font-face + unicode-range shape as below.
set -euo pipefail

# ---- route B: slice a vendor ttf/otf into unicode-range woff2 files ----
#   kit/fonts.sh --slice Face.ttf "Family Name" 400 public/fonts
# 40 slices: Latin + punctuation + fullwidth forms first, then the CJK
# Unified block in 32 even chunks (~650 codepoints, 150-400 KB each), then
# Ext-A, symbols, kana, hangul. A page fetches only the chunks it touches.
# Needs uv (uvx fonttools with brotli).
if [ "${1:-}" = "--slice" ]; then
  src=${2:?ttf/otf path}; family=${3:?family name}; weight=${4:-400}; out=${5:-public/fonts}
  slug=$(printf '%s' "$family" | tr 'A-Z' 'a-z' | tr -c 'a-z0-9\n' '-' | sed 's/-*$//; s/^-*//')
  mkdir -p "$out/$slug"
  ranges=("U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
          "U+3000-303F,U+FF00-FFEF,U+2E80-2EFF,U+2F00-2FDF,U+3100-312F,U+31C0-31EF,U+FE10-FE1F,U+FE30-FE4F")
  for i in $(seq 0 31); do
    a=$((0x4E00 + i*656)); b=$((a + 655)); [ $i -eq 31 ] && b=$((0x9FFF))
    ranges+=("$(printf 'U+%04X-%04X' $a $b)")
  done
  ranges+=("U+3400-4DBF" "U+2500-25FF,U+2600-26FF,U+2190-21FF,U+2200-22FF,U+3200-33FF" "U+3040-30FF,U+31F0-31FF" "U+AC00-D7AF,U+1100-11FF,U+3130-318F" "U+20000-2A6DF")
  css="$out/$slug.css"
  printf '/* %s -- self-hosted unicode-range slices, cut by kit/fonts.sh --slice. Check the vendor license before shipping. */\n' "$family" > "$css"
  n=0
  for r in "${ranges[@]}"; do
    n=$((n+1)); f=$(printf '%02d.woff2' "$n")
    if uvx --quiet --from 'fonttools[woff]' pyftsubset "$src" --unicodes="$r" --flavor=woff2 --no-hinting --layout-features='*' --output-file="$out/$slug/$f" 2>/dev/null && [ -s "$out/$slug/$f" ]; then
      printf '@font-face {\n  font-family: "%s";\n  font-style: normal;\n  font-weight: %s;\n  font-display: swap;\n  src: url(%s/%s) format("woff2");\n  unicode-range: %s;\n}\n' "$family" "$weight" "$slug" "$f" "$r" >> "$css"
    else
      rm -f "$out/$slug/$f"
    fi
  done
  size=$(du -sk "$out/$slug" | cut -f1)
  echo "fonts.sh: $family -> $css  ($(ls "$out/$slug" | wc -l | tr -d ' ') slices, ${size} KB on disk)"
  echo "  <link rel=\"stylesheet\" href=\"/fonts/$slug.css\">"
  exit 0
fi

family=${1:-}
weights=${2:-400}
out=${3:-public/fonts}
[ -z "$family" ] && { sed -n 2,24p "$0"; exit 2; }

slug=$(printf '%s' "$family" | tr 'A-Z' 'a-z' | tr -c 'a-z0-9\n' '-' | sed 's/-*$//; s/^-*//')
q=$(printf '%s' "$family" | sed 's/ /+/g')
w=$(printf '%s' "$weights" | tr ',' ';')
url="https://fonts.googleapis.com/css2?family=${q}:wght@${w}&display=swap"
ua='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36'

mkdir -p "$out/$slug"
css=$(curl -fsSL -A "$ua" "$url") || { echo "fonts.sh: could not fetch $url" >&2; exit 1; }
grep -q '@font-face' <<< "$css" || { echo "fonts.sh: no @font-face in response; is '$family' on Google Fonts?" >&2; exit 1; }

n=0
: > "$out/$slug.css"
printf '/* %s -- self-hosted unicode-range slices, fetched by kit/fonts.sh. OFL. */\n' "$family" >> "$out/$slug.css"
# one @font-face block per line group; rewrite src as we go
block=""
while IFS= read -r line; do
  block+="$line"$'\n'
  if [[ "$line" == "}" ]]; then
    src=$(grep -oE 'https://[^)]+\.woff2' <<< "$block" | head -1)
    if [ -n "$src" ]; then
      n=$((n+1)); f=$(printf '%02d.woff2' "$n")
      [ -s "$out/$slug/$f" ] || curl -fsSL -A "$ua" "$src" -o "$out/$slug/$f"
      block=$(sed "s#url($src)#url($slug/$f)#" <<< "$block")
    fi
    printf '%s\n' "$block" >> "$out/$slug.css"
    block=""
  fi
done <<< "$css"

size=$(du -sk "$out/$slug" | cut -f1)
echo "fonts.sh: $family -> $out/$slug.css  ($n slices, ${size} KB on disk; a page loads only the slices it uses)"
echo "  <link rel=\"stylesheet\" href=\"/fonts/$slug.css\">"
echo "  font-family: \"$family\", ...;   /* keep a system CJK face after it in the stack */"
