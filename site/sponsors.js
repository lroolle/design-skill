/* The seats -- four sponsor slots on a split-flap departure board.
 *
 * Two decisions drive everything here.
 *
 * 1. All four seats are on the board at all times. The loop moves a spotlight,
 *    it never swaps contents. A sponsor is on screen 100% of the time rather
 *    than one cycle in four, which is the thing being sold, so it is built
 *    that way rather than claimed.
 *
 * 2. The idle loop demonstrates the purchase instead of describing it: a [+]
 *    cell clatters through glyphs and settles on a mark. That is what buying a
 *    seat does, shown rather than written, which is the only honest way to
 *    advertise an ad slot.
 *
 * 3. The board sells two things, not one. Seat 01 goes by the year and there is
 *    one of it; seats 02-04 go by the month. The tier is a property of the
 *    seat, so the strip, the plate on SHEET 5, the terms and the call to action
 *    cannot disagree about what is for sale or what it costs.
 *
 * 4. The founding rate has a real deadline that this file enforces. It is a
 *    constant instant; the copy is derived from it. Past it the page quotes
 *    list. Reloading does not move it.
 *
 * ---------------------------------------------------------------------------
 * TO SELL A SEAT: add an entry to SPONSORS. To change the offer, edit RATE,
 * FOUNDING_UNTIL or CHECKOUT. Nothing else.
 * ---------------------------------------------------------------------------
 */
(function () {
  'use strict';

  var SEAT_COUNT = 4;

  /* The seats are not interchangeable, and the difference is the product.
     Seat 01 is sold by the year -- one company holds the head of the board for
     twelve months and there is no second one. Seats 02, 03 and 04 are sold by
     the month. Three and one is the entire inventory: a board that grows a
     fifth seat when a fifth buyer turns up is a banner farm, and the scarcity
     printed on this page is only real because this array is the one place a
     seat can come from. */
  var TERM = { 1: 'year', 2: 'month', 3: 'month', 4: 'month' };

  /* Real sponsors only. A name on this board is a public claim that the company
     pays for the seat, so an aspirational logo is not a placeholder -- it is a
     false statement about someone else's brand, and a trademark problem the
     moment money changes hands. Empty is honest; empty also sells.
     Shape: { seat: 1, name: 'Company', url: 'https://...', since: '2026' } */
  var SPONSORS = [];

  /* Two rates and one deadline, all of them real.

     FOUNDING_UNTIL is a fixed instant, not a window that restarts on each
     visit. Past it this file quotes list and says the founding rate closed --
     the clock on SHEET 5 reads this constant and nothing else, and there is no
     branch anywhere that extends it. A countdown that resets when you reload
     is exactly the invented proof this page was built to argue against, so the
     only way to keep the claim honest was to let the code enforce it.

     What a founding sponsor buys is not a discount, it is a lock: the founding
     rate holds for as long as they hold the seat, renewals included. */
  var RATE = {
    year:  { list: '$600', founding: '$200' },
    month: { list: '$60',  founding: '$20'  }
  };
  var FOUNDING_UNTIL = Date.parse('2026-10-19T00:00:00Z');

  /* Set each to a checkout URL when Stripe is live. Until then the call to
     action points at a real inbox -- the price above is true either way. */
  var CHECKOUT = { year: null, month: null };

  var ENQUIRE = 'https://github.com/lroolle/design-skill/issues/new?title=Sponsor+seat&body=Which+seat,+and+who+for%3F';

  function founding() { return Date.now() < FOUNDING_UNTIL; }
  function rateFor(term) {
    var r = RATE[term];
    return founding() ? r.founding : r.list;
  }
  function linkFor(n) {
    var s = seatData(n);
    if (s) return s.url;
    return CHECKOUT[TERM[n]] || (ENQUIRE + '&seat=' + n);
  }

  /* Shown while demonstrating what a filled seat looks like, and tagged
     SPECIMEN in the UI for exactly as long as it is one. */
  var SPECIMEN = 'YOUR MARK';
  var VACANT = '[+]';
  var GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+-.';

  var band = document.getElementById('sponsors');
  if (!band) return;

  var seatsEl = band.querySelector('.seats');
  var cta = band.querySelector('.sponsors__cta');
  var reduced = matchMedia('(prefers-reduced-motion: reduce)');

  // ------------------------------------------------------------ flap engine

  function turn(flap, ch) {
    var face = flap.firstChild;
    if (reduced.matches) { face.textContent = ch; face.classList.toggle('is-plus', ch === '+' || ch === '[' || ch === ']'); return; }
    flap.classList.add('is-turn');
    setTimeout(function () {
      face.textContent = ch;
      face.classList.toggle('is-plus', ch === '+' || ch === '[' || ch === ']');
    }, 58);
    setTimeout(function () { flap.classList.remove('is-turn'); }, 122);
  }

  /* Two clocks on purpose. `later` schedules the beat sequence and is
     cancellable, because stopping the loop must stop the loop. Cell turns use
     a plain timeout and always finish, because a real board does not freeze a
     flap halfway, and because a hover rewrite is not part of the loop. */
  var pending = [];
  function later(ms, fn) { var id = setTimeout(fn, ms); pending.push(id); return id; }
  function clearPending() { pending.forEach(clearTimeout); pending = []; }

  /* One cell clatters through n glyphs and settles. The stagger across a row is
     what makes it read as a board rather than n independent animations. */
  function rollCell(flap, finalCh, steps, delay) {
    if (reduced.matches) { turn(flap, finalCh); return; }
    var i = 0;
    function tick() {
      if (i < steps) {
        turn(flap, GLYPHS.charAt((i * 7 + flap.cellIndex * 5 + steps * 3) % GLYPHS.length));
        i++;
        setTimeout(tick, 64);
      } else {
        turn(flap, finalCh);
      }
    }
    setTimeout(tick, delay);
  }

  /* Write a string across a seat's board, centred, clattering only the cells
     whose glyph actually changes -- a real board does not turn a flap that is
     already showing the right letter. */
  function write(seat, text, opts) {
    opts = opts || {};
    ensureCells(seat, fieldFor(text));
    var cells = [].slice.call(seat.querySelectorAll('.flap'));
    if (!cells.length) return 0;
    var t = String(text).toUpperCase();
    var pad = Math.max(0, Math.floor((cells.length - t.length) / 2));
    var padded = new Array(pad + 1).join(' ') + t;
    var last = 0;
    cells.forEach(function (flap, i) {
      flap.cellIndex = i;
      var ch = padded.charAt(i) || ' ';
      if (flap.firstChild.textContent === ch && !opts.force) return;
      var delay = (opts.stagger === undefined ? 34 : opts.stagger) * i + (opts.delay || 0);
      var steps = opts.steps === undefined ? 2 + (i % 3) : opts.steps;
      rollCell(flap, ch, steps, delay);
      last = Math.max(last, delay + steps * 64 + 130);
    });
    seat.dataset.text = t;
    return last;
  }

  // ---------------------------------------------------------------- render

  function seatData(n) {
    for (var i = 0; i < SPONSORS.length; i++) if (SPONSORS[i].seat === n) return SPONSORS[i];
    return null;
  }

  /* Cells are measured, not guessed. On a wide hall every seat gets the same
     uniform field, which is what makes it read as one board. As it narrows the
     field sizes to its content instead: an open seat shrinks to [+] and a sold
     one keeps the room its name needs. The board opening up to receive a name
     is a real thing a real board does. */
  function fieldFor(text) {
    var w = band.clientWidth || 1024;
    /* Raised when the deadline strip joined the bezel: the board sizes itself
       to the hall, and the hall now has one more fixture in it. */
    if (w >= 1180) return 12;
    if (w >= 860) return 10;
    var t = String(text).length;
    return Math.max(3, Math.min(t + 1, w < 560 ? 10 : 11));
  }

  function ensureCells(seat, n) {
    var board = seat.querySelector('.board');
    if (!board || board.children.length === n) return;
    board.innerHTML = buildBoard(n);
  }

  function buildBoard(n) {
    var html = '';
    for (var i = 0; i < n; i++) html += '<span class="flap"><span class="flap__ch"> </span></span>';
    return html;
  }

  function render() {
    seatsEl.innerHTML = '';
    for (var n = 1; n <= SEAT_COUNT; n++) {
      var s = seatData(n);
      var li = document.createElement('li');
      li.className = 'seat ' + (s ? 'seat--taken' : 'seat--open');
      li.setAttribute('data-seat', String(n));
      if (s) li.dataset.sold = '1';

      var term = TERM[n];
      li.setAttribute('data-term', term);

      var a = document.createElement('a');
      a.className = 'seat__body';
      a.href = linkFor(n);
      if (s) { a.rel = 'sponsored noopener'; a.target = '_blank'; }
      /* The term mark rides with the seat number and disappears with it on a
         narrow board -- the tier is useful context, never the headline. */
      a.innerHTML =
        '<span class="seat__no">' + String(n).padStart(2, '0') +
          '<span class="seat__term">' + (term === 'year' ? 'YR' : 'MO') + '</span>' +
        '</span>' +
        '<span class="board" aria-hidden="true">' + buildBoard(fieldFor(s ? s.name : VACANT)) + '</span>' +
        '<span class="visually-hidden">' +
          (s
            ? 'Seat ' + n + ', the ' + term + 'ly seat, sponsored by ' + esc(s.name)
            : 'Seat ' + n + ' is open, sold by the ' + term + ' at ' + rateFor(term) + '. Claim it.') +
        '</span>';
      li.appendChild(a);

      var tag = document.createElement('span');
      tag.className = 'seat__tag';
      tag.setAttribute('aria-hidden', 'true');
      tag.textContent = 'specimen';
      li.appendChild(tag);

      seatsEl.appendChild(li);

      // the board is written settled on load, never flipped -- the world's rule
      write(li, s ? s.name : VACANT, { steps: 0, stagger: 0 });
    }
    paintLabel();
    paintPlate();
    paintClock();
    wireHover();
  }

  // --------------------------------------------------- the founding deadline

  /* One instant, read in four places: the strip on the board, the rate line and
     the clock on SHEET 5, and the two price cells in the terms. When it passes,
     every one of them says so and the quoted price becomes list -- there is no
     branch here that can extend it, and reloading does not move it. An offer
     whose deadline the code does not honour is the invented proof this page
     exists to argue against, so the deadline is a constant and the copy is
     derived from it rather than the other way round. */

  var UNTIL_ISO = new Date(FOUNDING_UNTIL).toISOString().slice(0, 10);
  var bandClock = band.querySelector('.sponsors__clock');

  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function remaining() {
    var ms = FOUNDING_UNTIL - Date.now();
    if (ms <= 0) return null;
    var mins = Math.floor(ms / 60000);
    return { d: Math.floor(mins / 1440), h: Math.floor((mins % 1440) / 60), m: mins % 60 };
  }
  function setText(id, html) { var el = document.getElementById(id); if (el) el.innerHTML = html; }

  function paintClock() {
    var r = remaining();
    var stamp = '<time datetime="' + UNTIL_ISO + '">' + UNTIL_ISO + '</time>';

    if (bandClock) {
      /* Day resolution on the bezel, minute resolution on SHEET 5. A band that
         repaints a minute digit next to a headline is asking to be watched
         instead of read, and the hall has no width to spare for the colons. */
      bandClock.textContent = r
        ? 'Founding rate \u00b7 ' + (r.d > 0 ? r.d + 'd left' : r.h + 'h left')
        : 'Founding rate closed';
      bandClock.classList.toggle('is-closed', !r);
    }

    setText('founding-rate', r
      ? 'The year seat is <b>' + RATE.year.founding + '</b> rather than ' + RATE.year.list +
        ', a month seat <b>' + RATE.month.founding + '</b> rather than ' + RATE.month.list + '.'
      : 'The year seat is <b>' + RATE.year.list + '</b>, a month seat <b>' + RATE.month.list + '</b>.');

    setText('founding-clock', r
      ? '<b data-mono>' + r.d + 'd ' + pad2(r.h) + 'h ' + pad2(r.m) + 'm</b> remaining \u2014 the rate closes ' + stamp + '.'
      : 'The founding rate closed on ' + stamp + '. These are list prices.');

    setText('founding-note', r
      ? 'Claim a seat before then and that rate is <b>locked for as long as you hold the seat</b>, renewals included. It is not an introductory month.'
      : 'Founding sponsors who claimed before ' + UNTIL_ISO + ' keep their rate for as long as they hold the seat.');

    setText('term-year', rateFor('year') + ' the year' + (r ? ' <span class="was">(list ' + RATE.year.list + ')</span>' : ''));
    setText('term-month', rateFor('month') + ' the month' + (r ? ' <span class="was">(list ' + RATE.month.list + ')</span>' : ''));
  }

  /* Minute resolution, so the page is not repainting a seconds digit forever.
     The interval is cleared with nothing else -- it is the only timer here that
     is allowed to outlive the motion loop, because the deadline is information,
     not decoration, and it stays true under reduced motion and in a still tab. */
  setInterval(paintClock, 30000);

  function paintLabel() {
    var open = SEAT_COUNT - SPONSORS.length;
    var label = band.querySelector('.sponsors__label');
    if (label) {
      /* The label says the count and stops. Which seat is a year and which is a
         month is written on the seats themselves -- a band that also spells it
         out in words is claiming what the board is already showing, and the
         words are what push the hall into overflow. */
      label.innerHTML = open === 0
        ? '<b>Four seats</b><span> on this sheet</span>'
        : '<b>' + word(open) + (open === 1 ? ' seat' : ' seats') + ' open</b>';
    }
    /* The call to action quotes the cheapest door, which is a month seat. It is
       the true price at the instant it is read: rateFor() consults the clock. */
    if (cta) {
      cta.href = CHECKOUT.month || (ENQUIRE + '&seat=2');
      var long = cta.querySelector('.cta-long');
      var short = cta.querySelector('.cta-short');
      if (long) long.textContent = 'Claim a seat / ' + rateFor('month') + ' a month';
      if (short) short.textContent = rateFor('month') + '/mo';
    }
  }

  function word(n) { return ['No', 'One', 'Two', 'Three', 'Four'][n] || String(n); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }

  // SHEET 5 draws the same four seats in the page's own hand, from the same
  // array, so the board and the sales copy can never disagree.
  function paintPlate() {
    var plate = document.getElementById('seatplate');
    if (!plate) return;
    plate.innerHTML = '';
    for (var n = 1; n <= SEAT_COUNT; n++) {
      var s = seatData(n);
      var cell = document.createElement('div');
      cell.className = 'seatplate__cell seat ' + (s ? 'seat--taken' : 'seat--open');
      var term = TERM[n];
      cell.setAttribute('data-term', term);
      cell.innerHTML =
        '<svg class="seat__frame" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">' +
          '<rect class="seat__rect" x="0.5" y="0.5" width="99" height="39" pathLength="100"></rect>' +
        '</svg>' +
        '<span class="seatplate__no">' + String(n).padStart(2, '0') + '</span>' +
        '<span class="seatplate__state">' + (s ? esc(s.name) : VACANT) + '</span>' +
        '<span class="seatplate__term">' + (term === 'year' ? 'by the year' : 'by the month') +
          ' \u00b7 ' + rateFor(term) + '</span>';
      plate.appendChild(cell);
    }
    var count = document.getElementById('seats-open');
    var open = SEAT_COUNT - SPONSORS.length;
    if (count) count.textContent = open === 0 ? 'none' : word(open).toLowerCase();
  }

  // hovering an open seat flips it to CLAIM -- the affordance is the mechanism
  /* Hovering an open seat flips it to CLAIM: the affordance is the mechanism.
     If the idle demo happens to be filling that seat when you arrive, the
     reader wins -- the demo is dropped and the seat answers the pointer. */
  function wireHover() {
    seats().forEach(function (seat) {
      if (seat.dataset.sold === '1' || seat.dataset.static === '1') return;
      var enter = function () {
        seat.classList.remove('seat--lit', 'seat--specimen');
        if (seat.dataset.wasOpen === '1') {
          seat.classList.remove('seat--taken');
          seat.classList.add('seat--open');
          delete seat.dataset.wasOpen;
        }
        write(seat, 'CLAIM', { steps: 1, stagger: 22 });
      };
      var leave = function () { write(seat, VACANT, { steps: 1, stagger: 22 }); };
      seat.addEventListener('pointerenter', enter);
      seat.addEventListener('pointerleave', leave);
      seat.addEventListener('focusin', enter);
      seat.addEventListener('focusout', leave);
    });
  }

  render();

  // ------------------------------------------------------- the ambient loop

  function seats() { return [].slice.call(seatsEl.querySelectorAll('.seat')); }
  function openSeats() { return seats().filter(function (s) { return s.classList.contains('seat--open'); }); }

  var timer = null;
  var step = 0;
  var running = false;

  function resetSeat(seat) {
    if (seat.dataset.static === '1') return;   // the reduced-motion specimen stays put
    seat.classList.remove('seat--lit', 'seat--specimen');
    if (seat.dataset.wasOpen === '1') {
      seat.classList.remove('seat--taken');
      seat.classList.add('seat--open');
      delete seat.dataset.wasOpen;
      write(seat, VACANT, { steps: 2, stagger: 26 });
    }
  }

  /* One beat: a [+] clatters into a mark, holds, and clatters back. Every
     fourth beat the whole board runs instead -- the hall clatter, left to
     right, every seat rewriting itself to what it already says. That is the
     board showing off, and it is what a real one does when it refreshes. */
  function beat() {
    if (!running) return;
    step++;

    if (step % 4 === 0) { wholeBoardRuns(); return; }

    var open = openSeats();
    if (!open.length) { spotlight(); return; }

    var target = open[step % open.length];
    target.classList.add('seat--lit');

    var settle = write(target, SPECIMEN, { steps: 5, stagger: 40, force: true });
    target.dataset.wasOpen = '1';
    target.classList.remove('seat--open');
    target.classList.add('seat--taken');

    later(settle, function () {
      if (!running) return;
      target.classList.add('seat--specimen');
      later(2600, function () {
        if (!running) return;
        target.classList.remove('seat--specimen');
        resetSeat(target);
        timer = later(900, beat);
      });
    });
  }

  function wholeBoardRuns() {
    var all = seats();
    var longest = 0;
    all.forEach(function (seat, i) {
      var text = seat.dataset.text || VACANT;
      longest = Math.max(longest, write(seat, text, { steps: 4, stagger: 30, delay: i * 130, force: true }));
    });
    timer = later(longest + 1100, beat);
  }

  function spotlight() {
    var all = seats();
    all.forEach(function (s) { s.classList.remove('seat--lit'); });
    all[step % all.length].classList.add('seat--lit');
    timer = later(2600, beat);
  }

  function start() {
    if (running || reduced.matches) return;
    running = true;
    band.classList.add('is-running');
    timer = later(1400, beat);
  }

  function stop() {
    running = false;
    band.classList.remove('is-running');
    clearTimeout(timer);
    clearPending();
    seats().forEach(resetSeat);
  }

  /* Good-citizen rules for anything that moves on its own: never while the
     reader is pointing at it or tabbing through it, never while the tab is in
     the background, never at all under reduced motion. The board is sticky, so
     it does not scroll away -- the observer is a safety net, not the mechanism. */
  band.addEventListener('pointerenter', stop);
  band.addEventListener('pointerleave', function () { if (visible && !document.hidden) start(); });
  band.addEventListener('focusin', stop);
  band.addEventListener('focusout', function () { if (visible && !document.hidden) start(); });

  var visible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible && !document.hidden) start(); else stop();
    }, { threshold: 0.3 }).observe(band);
  } else {
    start();
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else if (visible) start();
  });

  // still, but never empty: a reader who asked for no motion still sees what a
  // filled seat looks like, and it stays put
  function settleStatic() {
    if (!reduced.matches) return;
    if (seatsEl.querySelector('[data-static="1"]')) return;
    var first = openSeats()[0];
    if (!first) return;
    first.dataset.static = '1';
    first.classList.remove('seat--open');
    first.classList.add('seat--taken', 'seat--specimen');
    write(first, SPECIMEN, { steps: 0, stagger: 0 });
  }
  settleStatic();

  reduced.addEventListener('change', function () {
    if (reduced.matches) { stop(); settleStatic(); } else { start(); }
  });

  // the board rebuilds when the hall changes width and the field size moves
  var lastField = fieldFor(VACANT);
  addEventListener('resize', function () {
    var next = fieldFor(VACANT);
    if (next === lastField) return;
    lastField = next;
    stop();
    render();
    if (visible && !document.hidden) start();
  }, { passive: true });
})();
