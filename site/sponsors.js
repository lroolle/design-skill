/* The seats -- four sponsor slots, always on screen, never a carousel.
 *
 * The one design decision that drives everything here: all four seats are
 * visible at all times. The rotation moves a spotlight, it does not swap
 * content. A sponsor who buys a seat is on screen 100% of the time, not 25%
 * of it, and nothing they paid for is ever hidden behind a timer.
 *
 * The ambient loop demonstrates the mechanism instead of describing it: a
 * drafting cursor crosses to an open seat, presses, and the dashed frame
 * closes into a solid line as a mark inks in. That is exactly what buying a
 * seat looks like, which is the only honest way to advertise an ad slot.
 *
 * ---------------------------------------------------------------------------
 * TO SELL A SEAT: add an entry to SPONSORS and set PRICE. Nothing else.
 * ---------------------------------------------------------------------------
 */
(function () {
  'use strict';

  var SEAT_COUNT = 4;

  /* Real sponsors only. A name here is a public claim that this company pays
     for the seat, so an aspirational logo is not a placeholder, it is a false
     statement about someone else's brand. Empty is honest; empty also sells.
     Shape: { seat: 1, name: 'Company', url: 'https://…', since: '2026' } */
  var SPONSORS = [];

  /* Set this when Stripe is live; until then the call to action says what is
     actually true and points at a real inbox. */
  var PRICE = null;   // e.g. { amount: '$480', period: 'year', url: 'https://buy.stripe.com/…' }

  var ENQUIRE = 'https://github.com/lroolle/design-skill/issues/new?title=Sponsor+seat&body=Which+seat,+and+who+for%3F';

  /* The mark shown while demonstrating what a filled seat looks like. It is
     tagged SPECIMEN in the UI on purpose: a specimen is a real thing shown as
     an example, which is what this is, and it is never mistaken for a sponsor. */
  var SPECIMEN = 'Your mark here';

  var band = document.getElementById('sponsors');
  if (!band) return;

  var seatsEl = band.querySelector('.seats');
  var cursor = band.querySelector('.sponsors__cursor');
  var cta = band.querySelector('.sponsors__cta');
  var reduced = matchMedia('(prefers-reduced-motion: reduce)');

  // ---------------------------------------------------------------- render

  function seatData(n) {
    for (var i = 0; i < SPONSORS.length; i++) if (SPONSORS[i].seat === n) return SPONSORS[i];
    return null;
  }

  function render() {
    seatsEl.innerHTML = '';
    for (var n = 1; n <= SEAT_COUNT; n++) {
      var s = seatData(n);
      var li = document.createElement('li');
      li.className = 'seat ' + (s ? 'seat--taken' : 'seat--open');
      li.setAttribute('data-seat', String(n));

      li.innerHTML =
        '<svg class="seat__frame" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">' +
          '<rect class="seat__rect" x="0.5" y="0.5" width="99" height="39" pathLength="100"></rect>' +
        '</svg>' +
        '<span class="seat__tag" aria-hidden="true">specimen</span>';

      var body = document.createElement('a');
      body.className = 'seat__body';
      body.href = s ? s.url : (PRICE && PRICE.url ? PRICE.url : ENQUIRE);
      if (s) { body.rel = 'sponsored noopener'; body.target = '_blank'; }
      body.innerHTML =
        '<span class="seat__no">' + String(n).padStart(2, '0') + '</span>' +
        (s
          ? '<span class="seat__name">' + esc(s.name) + '</span>'
          : '<span class="seat__open"><span class="at-rest">Open</span>' +
            '<span class="on-hover">Claim</span></span>');
      body.setAttribute('aria-label', s
        ? 'Seat ' + n + ', sponsored by ' + s.name
        : 'Seat ' + n + ' is open. Claim it.');
      li.appendChild(body);
      seatsEl.appendChild(li);
    }

    var open = SEAT_COUNT - SPONSORS.length;
    var label = band.querySelector('.sponsors__label');
    if (label) {
      label.innerHTML = open === 0
        ? '<b>Four seats</b><span> on this sheet</span>'
        : '<b>' + word(open) + (open === 1 ? ' seat' : ' seats') + ' open</b><span> on this sheet</span>';
    }
    if (cta) {
      cta.href = PRICE && PRICE.url ? PRICE.url : ENQUIRE;
      cta.textContent = PRICE ? 'Claim a seat / ' + PRICE.amount + ' a ' + PRICE.period : 'Claim a seat';
    }
    paintPlate(open);
  }

  function word(n) { return ['No', 'One', 'Two', 'Three', 'Four'][n] || String(n); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }

  // SHEET 5 draws the same four seats large, so the band and the plate can
  // never disagree about what is for sale.
  function paintPlate(open) {
    var plate = document.getElementById('seatplate');
    if (!plate) return;
    plate.innerHTML = '';
    for (var n = 1; n <= SEAT_COUNT; n++) {
      var s = seatData(n);
      var cell = document.createElement('div');
      cell.className = 'seatplate__cell seat ' + (s ? 'seat--taken' : 'seat--open');
      cell.innerHTML =
        '<svg class="seat__frame" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">' +
          '<rect class="seat__rect" x="0.5" y="0.5" width="99" height="39" pathLength="100"></rect>' +
        '</svg>' +
        '<span class="seatplate__no">' + String(n).padStart(2, '0') + '</span>' +
        '<span class="seatplate__state">' + (s ? esc(s.name) : 'Open') + '</span>';
      plate.appendChild(cell);
    }
    var count = document.getElementById('seats-open');
    if (count) count.textContent = open === 0 ? 'none' : word(open).toLowerCase();
  }

  render();

  // ------------------------------------------------------- the ambient loop

  var seats = function () { return [].slice.call(seatsEl.querySelectorAll('.seat')); };
  var timer = null;
  var step = 0;
  var running = false;

  function openSeats() { return seats().filter(function (s) { return s.classList.contains('seat--open'); }); }

  function clearDemo() {
    seats().forEach(function (s) {
      // the still, reduced-motion specimen is state, not an animation frame:
      // stop() must not strip it or the offer renders blank for that reader
      if (s.dataset.static === '1') return;
      s.classList.remove('seat--lit', 'seat--specimen');
      if (s.classList.contains('seat--specimen')) s.classList.remove('seat--taken');
      var name = s.querySelector('.seat__name');
      var openLabel = s.querySelector('.seat__open');
      if (s.dataset.wasOpen === '1') {
        s.classList.remove('seat--taken');
        s.classList.add('seat--open');
        if (name) name.replaceWith(openLabelFor(s.getAttribute('data-seat')));
        delete s.dataset.wasOpen;
      }
      void openLabel;
    });
    if (cursor) cursor.classList.remove('is-visible', 'is-pressing');
  }

  function openLabelFor(n) {
    void n;
    var el = document.createElement('span');
    el.className = 'seat__open';
    el.innerHTML = '<span class="at-rest">Open</span><span class="on-hover">Claim</span>';
    return el;
  }

  function mk(tag, cls, text) {
    var el = document.createElement(tag);
    el.className = cls;
    el.textContent = text;
    return el;
  }

  /* One beat: cross to a seat, press, ink a specimen mark in, hold, lift out.
     Everything moves with transform and opacity only. */
  function beat() {
    var open = openSeats();
    if (!open.length) { spotlightOnly(); return; }

    var target = open[step % open.length];
    step++;

    var bandBox = band.getBoundingClientRect();
    var box = target.getBoundingClientRect();
    var x = box.left - bandBox.left + box.width / 2;
    var y = box.top - bandBox.top + box.height / 2;

    if (cursor) {
      // place it at the call to action with no transition, then let it travel:
      // the demo starts from the button the reader would actually press
      var from = cta ? cta.getBoundingClientRect() : box;
      cursor.classList.add('is-placing');
      cursor.style.transform = 'translate(' +
        Math.round(from.left - bandBox.left + from.width / 2) + 'px, ' +
        Math.round(from.top - bandBox.top + from.height / 2) + 'px)';
      void cursor.offsetWidth;                       // commit the placement
      cursor.classList.remove('is-placing');
      cursor.classList.add('is-visible');
      requestAnimationFrame(function () {
        cursor.style.transform = 'translate(' + Math.round(x) + 'px, ' + Math.round(y) + 'px)';
      });
    }
    target.classList.add('seat--lit');

    // press, once it has arrived
    after(820, function () {
      if (!running) return;
      if (cursor) { cursor.classList.add('is-pressing'); }
      after(260, function () {
        if (!running) return;
        // the seat fills: dashes close, the mark inks in, the tag says specimen
        target.dataset.wasOpen = '1';
        target.classList.remove('seat--open');
        target.classList.add('seat--taken', 'seat--specimen');
        var openLabel = target.querySelector('.seat__open');
        if (openLabel) openLabel.replaceWith(mk('span', 'seat__name', SPECIMEN));
        if (cursor) cursor.classList.remove('is-pressing');
        // the cursor did its job; it leaves so the mark stands on its own
        after(420, function () { if (running && cursor) cursor.classList.remove('is-visible'); });

        after(3200, function () {
          if (!running) return;
          if (cursor) cursor.classList.remove('is-visible');
          clearDemo();
          timer = setTimeout(beat, 700);
        });
      });
    });
  }

  // every seat sold: the loop becomes a quiet spotlight over the sponsors
  function spotlightOnly() {
    var all = seats();
    if (!all.length) return;
    all.forEach(function (s) { s.classList.remove('seat--lit'); });
    all[step % all.length].classList.add('seat--lit');
    step++;
    timer = setTimeout(spotlightOnly, 2600);
  }

  var pending = [];
  function after(ms, fn) { pending.push(setTimeout(fn, ms)); }

  function start() {
    if (running || reduced.matches) return;
    running = true;
    band.classList.add('is-running');
    timer = setTimeout(beat, 900);
  }

  function stop() {
    running = false;
    band.classList.remove('is-running');
    clearTimeout(timer);
    pending.forEach(clearTimeout);
    pending = [];
    clearDemo();
  }

  /* Good-citizen rules for anything that moves on its own:
     - never while the reader is pointing at it or tabbing through it
     - never while it is off screen
     - never while the tab is in the background
     - never at all if the reader asked for reduced motion */
  band.addEventListener('pointerenter', stop);
  band.addEventListener('pointerleave', function () { if (visible && !document.hidden) start(); });
  band.addEventListener('focusin', stop);
  band.addEventListener('focusout', function () { if (visible && !document.hidden) start(); });

  var visible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible && !document.hidden) start(); else stop();
    }, { threshold: 0.4 }).observe(band);
  } else {
    start();
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else if (visible) start();
  });

  reduced.addEventListener('change', function () {
    if (reduced.matches) { stop(); settleStatic(); } else { start(); }
  });

  // still, but never empty: a reader who asked for no motion still sees what a
  // filled seat looks like, and it stays put.
  function settleStatic() {
    if (!reduced.matches) return;
    if (seatsEl.querySelector('[data-static="1"]')) return;
    var first = openSeats()[0];
    if (!first) return;
    first.dataset.static = '1';
    first.classList.remove('seat--open');
    first.classList.add('seat--taken', 'seat--specimen');
    var lbl = first.querySelector('.seat__open');
    if (lbl) lbl.replaceWith(mk('span', 'seat__name', SPECIMEN));
  }
  settleStatic();
})();
