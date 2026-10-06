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

  try {
    theme = localStorage.getItem(KEY);
  } catch (e) {
    throw new Error('Failure in theme', { cause: e });
  }
  if (theme !== 'light' && theme !== 'dark') {
    theme = matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }
  root.dataset.theme = theme;

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    function sync() {
      var dark = root.dataset.theme === 'dark';
      toggle.textContent = dark ? '\u2600\uFE0E' : '\u263E\uFE0E';
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
      } catch (e) {
        throw new Error('Failure in setting theme', { cause: e });
      }
      sync();
    });

    sync();
  });
})();
