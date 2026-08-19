# site/

The page at `lroolle.com/design-skill`, designed by the skill in this repo.

Static: `index.html`, `tokens.css`, `page.css`, `page.js`. No build step, no
dependencies, no framework. Every asset path is relative, so the directory
works at any base path -- `/`, `/design-skill/`, or anywhere else.

- [DESIGN.md](DESIGN.md) -- the material contract, written at finish from the
  built world: what the roll dealt, what was bound, what was deferred and why,
  and the two defects this build found in the skill itself.
- The promise the render was audited against is the first comment in the body
  of `index.html`.

## Run it

```bash
python3 -m http.server -d site 8000    # then open http://localhost:8000
```

## Prove it

```bash
bash skills/design-skill/assets/bans.sh site   # the grep-able scars
node site/behaviour.mjs                        # what the page does
node site/capture.mjs                          # 390 / 768 / 1440, light + dark
```

`behaviour.mjs` exercises the numeral bind (hover and keyboard), the material
switch, the copy path, theme persistence and reduced motion, and fails on any
console error. Behaviour before surfaces: the captures show what the page looks
like, this shows what it does.

`capture.mjs` needs Playwright's Chromium (`npx playwright install chromium`).
It reports rendered height, horizontal overflow and console errors per width,
and writes PNGs to `.captures/` (gitignored) -- a capture reviewed unseen is a
round wasted.

## Deploy

The page is a Cloudflare Worker with a static-assets binding. `deploy/worker.js`
is the only file that knows about the base path: it strips `/design-skill`
before handing the request to the assets binding, so the same build serves
correctly at a site root *and* at the path, and nothing in `site/` hard-codes
either.

```bash
# needs CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID
npx wrangler deploy -c deploy/wrangler.jsonc
```

Live now at **https://design-skill.1lm.workers.dev** (both `/` and
`/design-skill/` serve the page). `site/.assetsignore` keeps the repo docs and
the evidence scripts out of the deployed bundle.

### The last step, lroolle.com/design-skill

lroolle.com is served by a separate Worker (`lroolle`, a Vite SPA with its own
assets). This page is deployed *beside* it, not into it, so nothing about the
existing site changes. It needs one route:

```
lroolle.com/design-skill*   ->   design-skill
```

Cloudflare resolves the most specific route first, so this takes precedence
over the SPA's `lroolle.com/*` without touching it. Add it either way:

```bash
# API -- needs a token with Zone > Workers Routes > Edit on lroolle.com
npx wrangler deploy -c deploy/wrangler.jsonc --route 'lroolle.com/design-skill*'
```

or in the dashboard: **Workers & Pages -> design-skill -> Settings -> Domains
& Routes -> Add route**.
