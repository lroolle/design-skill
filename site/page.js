/* design-skill site -- three behaviours, no dependencies.
 *  1. the numeral bind: a reference numeral and its part light together
 *  2. the material switch: one specimen, seven contracts
 *  3. theme, copy, and the housekeeping around them
 */
(function () {
  'use strict';

  // -- 1. the numeral bind ---------------------------------------------------
  function lit(n, on) {
    document.querySelectorAll('[data-ref="' + n + '"], [data-part="' + n + '"]')
      .forEach(function (el) { el.classList.toggle('is-lit', on); });
    var ref = document.querySelector('.ref[data-ref="' + n + '"]');
    if (ref) {
      var p = ref.closest('.spec__p');
      if (p) p.classList.toggle('is-lit', on);
    }
  }

  document.querySelectorAll('[data-ref]').forEach(function (el) {
    var n = el.getAttribute('data-ref');
    var on = function () { lit(n, true); };
    var off = function () { lit(n, false); };
    el.addEventListener('pointerenter', on);
    el.addEventListener('pointerleave', off);
    el.addEventListener('focus', on);
    el.addEventListener('blur', off);
    if (el.tagName.toLowerCase() === 'button') {
      // touch: no hover, so a tap holds the highlight until the next tap
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var already = el.classList.contains('is-lit');
        document.querySelectorAll('.is-lit').forEach(function (x) { x.classList.remove('is-lit'); });
        if (!already) lit(n, true);
      });
    }
  });

  // -- 2. the material switch -----------------------------------------------
  var CONTRACTS = {
    default:     ['assets/tokens/default.css',     'paper and ink; quiet, structural, system type',            'system-ui (never a tell)',      '0.25rem',  '1.0'],
    modernist:   ['assets/tokens/modernist.css',   'Swiss grid, grotesk, one signal colour, air',              'Switzer (Fontshare)',           '0',        '1.25'],
    classical:   ['assets/tokens/classical.css',   'book typography, warm paper, restraint',                   'EB Garamond (OFL)',             '0',        '1.15'],
    industry:    ['assets/tokens/industry.css',    'instrument panel: dense, ruled, mono data, safety accents','Archivo (OFL)',                 '0.125rem', '0.8'],
    organic:     ['assets/tokens/organic.css',     'humanist, warm, rounded, tactile',                         'Alegreya + Alegreya Sans (OFL)','0.5rem',   '1.1'],
    nocturnes:   ['assets/tokens/nocturnes.css',   'dark-first, one light source, blue-grey mists and gold',   'Schibsted Grotesk (OFL)',       '0.375rem', '1.0'],
    broadsheets: ['assets/tokens/broadsheets.css', 'newsroom hierarchy: hed, dek, columns, hairlines, photos', 'Source Serif 4 (OFL)',          '0',        '0.85']
  };

  var specimen = document.getElementById('specimen');
  var fields = ['ro-file', 'ro-line', 'ro-face', 'ro-radius', 'ro-density'].map(function (id) {
    return document.getElementById(id);
  });

  document.querySelectorAll('.switch button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var set = btn.getAttribute('data-set');
      var row = CONTRACTS[set];
      if (!specimen || !row) return;
      document.querySelectorAll('.switch button').forEach(function (b) {
        b.setAttribute('aria-checked', String(b === btn));
      });
      specimen.setAttribute('data-spec', set);
      row.forEach(function (v, i) { if (fields[i]) fields[i].textContent = v; });
    });
  });

  // -- a drawing that fits is not a drawing you can drag: say so only when true
  var panners = document.querySelectorAll('.fig--pan');
  function markPanning() {
    panners.forEach(function (f) {
      f.classList.toggle('is-panning', f.scrollWidth - f.clientWidth > 2);
    });
  }
  markPanning();
  addEventListener('resize', markPanning, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(markPanning);

  // -- 3. theme -------------------------------------------------------------
  var theme = document.getElementById('theme');
  var label = theme && theme.querySelector('.theme__label');
  function paint() {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (theme) theme.setAttribute('aria-pressed', String(dark));
    if (label) label.textContent = dark ? 'Positive' : 'Negative';
  }
  paint();
  if (theme) {
    theme.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('ds-theme', next); } catch (e) { /* private mode */ }
      paint();
    });
  }

  // -- copy -----------------------------------------------------------------
  document.querySelectorAll('[data-cmd]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-cmd');
      var done = function () {
        var was = btn.textContent;
        btn.textContent = 'Copied';
        btn.setAttribute('data-done', '1');
        setTimeout(function () { btn.textContent = was; btn.removeAttribute('data-done'); }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallback(text, done); });
      } else {
        fallback(text, done);
      }
    });
  });

  function fallback(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { /* the code is on screen anyway */ }
    document.body.removeChild(ta);
  }
})();
