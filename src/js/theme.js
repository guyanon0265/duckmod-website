/*
 * Classic (non-module) script, loaded synchronously in <head> on every page.
 * It must stay non-module: module scripts are deferred and can run after the
 * first paint, which would flash the wrong theme.
 */
(function () {
  'use strict';

  var KEY = 'dm-theme';
  var root = document.documentElement;
  var theme = 'dark';

  try {
    if (localStorage.getItem(KEY) === 'light') theme = 'light';
  } catch (e) {}

  root.dataset.theme = theme;

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    function sync() {
      var dark = root.dataset.theme === 'dark';
      toggle.textContent = dark ? 'Dark' : 'Light';
      toggle.setAttribute(
        'aria-label',
        dark ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }

    toggle.addEventListener('click', function () {
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try {
        localStorage.setItem(KEY, next);
      } catch (e) {}
      sync();
    });

    sync();
  });
})();
