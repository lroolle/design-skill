# site/

The page at `lroolle.com/design-skill`, designed by the skill in this repo.

Static: `index.html`, `tokens.css`, `page.css`, `page.js`, plus
`sponsors.css` / `sponsors.js` for the seats. No build step, no dependencies,
no framework.

**To sell a seat:** add one entry to `SPONSORS` in `site/sponsors.js` and set
`PRICE`. The band, the SHEET 5 plate, the seat count in the copy and the call
to action all follow from that array -- there is nowhere for them to disagree. Every asset path is relative, so the directory
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
# needs CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID; the token needs
# Zone > Workers Routes > Edit on lroolle.com for the route trigger
npx wrangler deploy -c deploy/wrangler.jsonc
```

Two triggers, both declared in `deploy/wrangler.jsonc` so a deploy reproduces
them:

| URL | What it is |
|---|---|
| https://lroolle.com/design-skill | the page |
| https://design-skill.1lm.workers.dev | the same worker, checkable without touching lroolle.com |

`site/.assetsignore` keeps the repo docs and the evidence scripts out of the
deployed bundle -- four files ship.

### Why a route and not a custom domain

`lroolle.com` is a Workers **Custom Domain** bound to a different worker
(`lroolle`, the Vite SPA). This page is deployed *beside* it: the path route
`lroolle.com/design-skill*` is more specific, so it claims that prefix and
leaves every other path on the SPA untouched. Verified after the change --
`lroolle.com/` returns bytes identical to its pre-change hash.

Do not edit the `lroolle` worker to add this page. Its source is not in this
repo, and the route makes editing it unnecessary.

Route propagation takes ~20s; a 404 immediately after deploying is lag, not a
misconfiguration.
