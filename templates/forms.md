# forms -- any task form: checkout, application, settings, wizard

## Job

Get the user through a task that needs their input -- correctly, once,
without losing what they typed. Frequency varies (a checkout once, a
settings page weekly, an ops form hourly), but the shape does not:
one column, labels above, groups of 3-6, inline validation, a verb
button, and a review step before anything irreversible. Product
surface always, even when it sits on a brand site: the user is
working, and every decoration is a distraction at the exact moment
they are most likely to make an error.

## Protected functions

- The fields themselves, their labels, their order, and the user's
  typed values -- preserved through every error, reload, and step.
- The primary action, verb-labeled, always reachable; the destructive
  or irreversible action apart from it.
- Validation that says what is wrong and how to fix it, at the field.
- Progress in multi-step forms: visible, resumable, reversible.
- The review step before irreversible submission (payment, deletion,
  publication).
- Accessibility of input: labels programmatically tied, input types
  and autocomplete set, keyboard order logical.

## Structure

```
+------------------------------------------------------------------+
| title: what this form does       (step 2 of 4: Shipping)          |
+------------------------------------------------------------------+
| GROUP heading (optional, one line of why)                         |
|  Label                                                           |
|  [ input ............................ ]   help text             |
|  Label                                                           |
|  [ input ............................ ]                          |
|  error: what is wrong and how to fix it  (under the field)       |
| ---- rule between groups ----                                    |
| GROUP heading                                                    |
|  Label   [ select v ]     Label   [ date ]                        |
|  ...                                                             |
+------------------------------------------------------------------+
| < Back                                 [ Continue to payment ]    |
|                                   (destructive: far left, quiet) |
+------------------------------------------------------------------+

REVIEW (before irreversible submit)
+------------------------------------------------------------------+
| Review your order                                                 |
|  group summary ......................................... Edit     |
|  group summary ......................................... Edit     |
|  total / consequence stated plainly                              |
| [ Pay 48.00 EUR ]                                                |
+------------------------------------------------------------------+
```

Hierarchy: the current group first, the primary action second, the
progress indicator third. No signature moment: the form's quality is
invisible -- it is the absence of friction.

Mobile: identical, one column already; the primary action stays
visible (sticky bottom bar with the verb) once the form is longer than
a screen; inputs get the right keyboard (`inputmode`, `type`).

## Settings

| Dial | Setting |
|---|---|
| ratio | 1.25; labels at base or one step down, never sub-12px |
| density | normal 1.0; field height 40-44px (44 on touch); groups separated by a rule and 2x the field gap |
| color strategy | restrained; accent only on the primary action and focus; danger only on errors and the destructive action; no decorative color |
| motion budget | feedback only: focus ring instant, error text appears 120ms, step change crossfade 180ms; no shake, no bounce |
| container / measure | form column 28-36rem; help text 50-60ch; never a two-column field grid except short paired fields (city / postcode) |
| grid | one column; paired short fields side by side only when both fit at 390 |
| nav | steps as a visible stepper with names; Back always available; Save-and-exit on long forms |
| validation | on blur for the field, on submit for the whole; never on every keystroke except format masks |

## Directions

- **default** -- the native fit: quiet fields, 1px line, tone-step
  focus container, mono for codes and numbers.
- **industry** -- ops and data entry: denser fields, mono numeric
  inputs with unit suffixes, narrow uppercase labels, keyboard-first
  tab order.
- **organic** -- consumer checkout, signup, bookings: warmer ground,
  slightly larger targets, the same discipline; warmth in the copy,
  not in decoration.

Trap: **placeholder-as-label** (the field name disappears the moment
the user types), **modal-first** (a form inside a modal inside a
modal), and **disabled submit with no reason** (the user cannot tell
what is missing). Also a trap: a brand system (modernist, nocturnes)
applied to the form -- giant type and air make a four-field form into
three screens.

## States

- loading: the form renders with labels before any data; prefilled
  values arrive into their fields, never after the user has started
  typing into them.
- empty: an optional section says "optional" in the heading, not in
  the placeholder; a form with nothing required yet says what to do
  first.
- error: at the field, under it, in the danger token, naming the fix;
  a summary at the top for forms longer than a screen, linking to the
  first error; values preserved.
- success: submit confirms what happened and what is next ("Order
  placed -- confirmation sent to a@b.c. Track it"); the button shows
  its working state in its own label ("Paying...") and is not
  clickable twice.
- partial / saved: long forms save drafts and say so ("Draft saved
  12:04"); on return, resume at the last step.
- first-run: a multi-step form shows all step names up front so the
  user knows the length; optional steps say so.

## Copy

Labels are nouns ("Postcode"), not questions; help text says the
format or why you ask ("We use this to calculate tax"). The primary
button is the verb plus the object or consequence ("Pay 48.00 EUR",
"Create account", "Continue to shipping") -- never "Submit", never
"Next". Errors say what and how ("Enter a postcode like 10115"), never
"Invalid input". Destructive confirmations name the consequence and
the object ("Delete project Orion and its 12 deployments").

Good: "Card number -- Enter the 16 digits on the front. [error] That
number is one digit short."
Bad: "Please enter valid information!" under a field whose label was
a placeholder that has now vanished.

## Verify

P0:
- every field has a visible label above it, tied programmatically;
  no placeholder as label
- values survive an error, a step back, a reload where the form is
  long
- primary action is a verb; disabled only with a visible reason, or
  enabled and validating on submit
- destructive action apart from the default, verb-labeled, with undo
  or a consequence-stating confirm
- errors at the field with a fix; summary links on long forms
- `type` / `inputmode` / `autocomplete` set; 44px targets on touch;
  keyboard order follows visual order
- review step before irreversible submit; double-submit prevented
- one column at 390 with no horizontal scroll; sticky action on long
  forms

P1:
- groups of 3-6 with a rule between; paired fields only when both fit
- validation on blur, not per keystroke
- step names visible; Back present; drafts saved on long forms
- working state in the button's own label
- help text under 60ch; no decorative color; no icons without labels
- CJK: input fonts name the CJK face; IME composition does not trigger
  validation mid-entry

Widths: 390 / 768 / 1440. On a restyle count: fields per screen,
taps to complete, errors the user can hit without a fix message
(must be zero), steps with no name.

## Failure modes

- **Placeholder labels**: the field name vanishes on focus; the user
  forgets what they are typing.
- **Disabled-with-no-reason**: a gray submit and no hint what is
  missing.
- **Modal form**: a form in a modal that loses everything on an
  accidental click outside.
- **Per-keystroke shouting**: red errors from the first character.
- **Two-column grid**: fields in a grid the eye cannot scan in order;
  tab order fights visual order.
- **"Submit" / "Next"**: buttons that do not say what happens.
- **No review**: payment or deletion one click from a half-read form.
- **Brand form**: giant type, airy spacing, a four-field form that
  takes three screens and a scroll reveal.
