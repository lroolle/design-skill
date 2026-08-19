# app-shell -- the product frame: navigation, account, search, settings, auth, onboarding

## Job

Hold every product surface in a frame the user stops noticing: where
am I, where can I go, who am I signed in as, how do I find things,
how do I change my settings. Used all day by everyone who uses the
product; the frame is the most-seen and least-looked-at surface, so
predictability outranks everything -- landmarks stay put, commands
stay visible, nothing moves under the user's hand. Product surface
entirely; auth and onboarding are product surfaces too, not marketing.

## Protected functions

- Primary navigation: every top-level destination visible at every
  width; the current location marked.
- Account: who is signed in, which workspace / environment, sign out
  -- one click.
- Search / command palette: a visible path plus the fast path.
- Notifications and status: visible state, dismissible, never
  modal.
- Settings: findable, sectioned, with an honest save model.
- Auth: sign in, sign up, reset, in one column with one action each;
  the user's typed values survive errors.
- Onboarding: a visible stepper the user can leave and come back to.

## Structure

```
DESKTOP (1440)
+------------------------------------------------------------------+
| sidebar                 | top bar: breadcrumb ... [search] (?) @  |
|  wordmark / workspace v +---------------------------------------+
|  destination *          |                                         |
|  destination            |   CONTENT (another recipe lives here)   |
|  destination            |                                         |
|  ...                    |                                         |
|  ---                    |                                         |
|  settings               |                                         |
|  account                |                                         |
+------------------------------------------------------------------+

SETTINGS                               AUTH
+-----------------------------------+   +------------------------+
| settings nav | Section title      |   | wordmark               |
|  general *   | one column, groups |   | Sign in                |
|  members     | of 3-6 fields      |   | email                  |
|  billing     | [ Save changes ]   |   | password    (show)     |
|  api         | (or autosave +     |   | [ Sign in ]            |
|              |  "Saved 12:04")    |   | forgot . create        |
+-----------------------------------+   +------------------------+

ONBOARDING: a visible stepper (1 Connect . 2 Invite . 3 First thing)
with "Skip for now" on every step; progress preserved.
```

Hierarchy: the content first (the frame recedes), the current
location second, the primary action of the content third. The frame
never has a signature moment; its whole virtue is being unremarkable
and exact.

Mobile (390): a top bar with wordmark, search, account; primary
destinations in a bottom tab bar (4 + "More"), never a hamburger that
hides everything; settings one column with the settings nav as a
list page; auth unchanged (it was already one column).

Tablet (768): sidebar collapses to icons + labels-on-focus, or a
labeled drawer; bottom tabs acceptable.

## Settings

| Dial | Setting |
|---|---|
| ratio | 1.25; the frame's type one step smaller than content body |
| density | dense 0.85 in the sidebar and top bar; content sets its own |
| color strategy | restrained; the current nav item by tone step + weight; accent only on the primary action and focus; notifications by semantic token only |
| motion budget | frame: sidebar collapse 180ms, palette open 150ms, toast 200ms in / 120ms out; page nav instant; nothing continuous |
| container / measure | sidebar 15-17rem; settings column 40-44rem; auth card 24-26rem |
| grid | sidebar + fluid content; settings nav + one column |
| nav | persistent sidebar at 1440, icons or drawer at 768, bottom tabs at 390; the order of destinations never changes by state |
| commands | palette opens from a visible button and a shortcut; every palette command also exists in a menu |

## Directions

- **default** -- the native frame: quiet chrome, tone-step current
  item, mono for IDs and environments, underlined links in settings
  help text.
- **industry** -- ops and data products: denser rail, status strip in
  the top bar (environment, time, connection), narrow labels.

Trap: **nocturnes chrome on daytime tools** -- a dark sidebar and
glow on a product used in a lit office all day; offer dark as a user
theme, not the frame's identity. Also traps: the **hamburger at
1440**, and **hidden commands** (actions only in a right-click or a
shortcut with no visible path).

## States

- loading: the frame renders immediately with the user's name and
  nav; content regions skeleton independently; never a full-screen
  spinner after first paint.
- empty: a workspace with nothing yet shows the sidebar with the
  destinations present (not hidden until "unlocked") and a content
  empty state that teaches the first action.
- error: a failed save keeps the form values and says what failed
  inline; a lost connection is a status in the top bar, not a modal.
- success: save confirms in place ("Saved 12:04") or in a toast that
  names the object; sign-in lands on the last page, not the home.
- partial: permission-limited users see commands disabled with a
  reason on hover/focus, not removed; a degraded service shows a
  status chip with a link.
- first-run: onboarding as a visible stepper inside the frame (the
  nav already there, dimmed where not yet usable), each step
  skippable, progress kept.

## Copy

Destinations are nouns ("Projects", "Members", "Billing"); the
current one is marked, not restated. Settings sections name the
object and the save model ("Changes save automatically" or a "Save
changes" button -- one model per page). Auth buttons are the action
("Sign in", "Create account", "Send reset link"); errors name the
field and the fix ("We could not find that email. Check it or create
an account"). Disabled commands carry their reason ("Export --
available on Team plans"). Onboarding steps are verbs ("Connect a
repository"), and the skip says "Skip for now".

Good: "Saved 12:04 -- Members can now see billing."
Bad: "Success! Your awesome settings have been updated!!"

## Verify

P0:
- every top-level destination visible at 390 (bottom tabs + More),
  768, 1440; current location marked; order stable across pages
- account and sign-out one click; workspace / environment visible
- search or palette reachable by a visible control and by keyboard;
  every palette command exists in a visible menu
- settings: one save model per page; values survive an error; a
  destructive action apart from the default and verb-labeled
- auth: one column, one primary action, typed values preserved on
  error, password reveal, reset path visible
- disabled commands visible with a reason; nothing removed by
  permission without a trace
- keyboard: sidebar traversable, palette escapable, focus visible
- reduced motion: palette and toasts still work, instantly

P1:
- sidebar collapse and toast durations within budget; nothing pulses
  (notification badges are static counts)
- onboarding stepper visible, skippable, resumable
- notification center dismissible per item and all; never a modal
- frame type one step smaller than content; tone-step current item
  (no accent bar, no pill)
- mono for IDs, keys, environments

Widths: 390 / 768 / 1440. On a restyle count: destinations visible
without a click, clicks to sign-out, clicks to the most-used setting,
commands reachable only by shortcut (must be zero).

## Failure modes

- **Hamburger at 1440**: the whole product hidden behind three lines
  on a desktop.
- **Hidden commands**: actions only in right-click menus or
  shortcuts; power for the few, confusion for the rest.
- **Nocturnes chrome**: dark glowing sidebar on a spreadsheet-like
  tool; fatigue dressed as seriousness.
- **Modal everything**: settings, confirmations, and notifications
  all as modals stacked on modals.
- **Moving landmarks**: the nav reorders by recency or hides items by
  permission; the user's map breaks weekly.
- **Marketing auth**: a sign-in page with a hero, testimonials, and
  two CTAs; the user wants one field.
- **Tour overlay onboarding**: a seven-step spotlight that blocks the
  product instead of a stepper inside it.
- **Two save models**: one settings page autosaves, the next needs a
  button; the user cannot tell if anything stuck.
