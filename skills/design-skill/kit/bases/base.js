(function () {
  'use strict';

  var systems = ['default', 'modernist', 'classical', 'industry', 'organic', 'nocturnes', 'broadsheets'];
  var root = document.documentElement;
  var link = document.getElementById('system-css');
  var query = new URLSearchParams(location.search);
  var initial = query.get('system') || root.getAttribute('data-default-system') || 'default';
  if (!systems.includes(initial)) initial = 'default';

  function setSystem(name) {
    if (!systems.includes(name)) return;
    if (link) link.href = '../../systems/' + name + '.css';
    root.setAttribute('data-system', name);
    document.querySelectorAll('[data-system-picker]').forEach(function (picker) {
      picker.value = name;
    });
  }

  setSystem(initial);

  document.querySelectorAll('[data-system-picker]').forEach(function (picker) {
    picker.addEventListener('change', function () {
      setSystem(picker.value);
      var next = new URL(location.href);
      next.searchParams.set('system', picker.value);
      history.replaceState(null, '', next);
    });
  });

  document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
    button.addEventListener('click', function () {
      var dark = root.getAttribute('data-theme') === 'dark';
      root.setAttribute('data-theme', dark ? 'light' : 'dark');
      button.setAttribute('aria-pressed', String(!dark));
      button.textContent = dark ? 'Dark' : 'Light';
    });
  });

  document.querySelectorAll('[data-select-row]').forEach(function (row) {
    row.addEventListener('click', function () {
      var table = row.closest('table');
      if (table) table.querySelectorAll('[data-select-row]').forEach(function (candidate) {
        candidate.setAttribute('aria-selected', String(candidate === row));
      });
    });
  });
})();
