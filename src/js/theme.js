/*
 * Classic (non-module) script, loaded synchronously in <head> on every page.
 * It must stay non-module: module scripts are deferred and can run after the
 * first paint, which would flash the wrong theme.
 */
(function () {
  'use strict';

  var KEY = 'dm-theme';
  var root = document.documentElement;
  var theme;

  /* 1. Set the theme immediately, before the page is painted. */
  try {
    theme = localStorage.getItem(KEY);
  } catch (e) {}
  if (theme !== 'light' && theme !== 'dark') {
    theme = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  root.dataset.theme = theme;

  /* 2. Once the button exists, wire up the toggle. */
  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    function sync() {
      var dark = root.dataset.theme === 'dark';
      toggle.textContent = dark ? '\u2600\uFE0E' : '\u263E\uFE0E';
      toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
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
