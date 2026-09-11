/* Theme switching for hio-mitos.github.io.
 *
 * The site follows the visitor's system setting by default. Clicking the toggle
 * overrides that for this browser only; the choice is remembered in
 * localStorage under "theme" and applies across every page on the site.
 *
 * Load this in <head> WITHOUT defer, so the stored theme is applied before the
 * page paints and there is no flash of the wrong palette.
 */
(function () {
  var KEY = 'theme';
  var root = document.documentElement;

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function remember(value) {
    try { localStorage.setItem(KEY, value); } catch (e) { /* private mode */ }
  }

  var saved = stored();
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function currentIsDark() {
    var explicit = root.getAttribute('data-theme');
    if (explicit) return explicit === 'dark';
    return systemPrefersDark();
  }

  function build() {
    if (document.querySelector('.theme-toggle')) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'theme-toggle';
    btn.innerHTML =
      '<svg class="icon-sun" viewBox="0 0 24 24" aria-hidden="true">' +
        '<circle cx="12" cy="12" r="4.2"/>' +
        '<path d="M12 2.4v2.2M12 19.4v2.2M4.2 12H2M22 12h-2.2' +
              'M5.9 5.9 4.4 4.4M19.6 19.6l-1.5-1.5M18.1 5.9l1.5-1.5M4.4 19.6l1.5-1.5"/>' +
      '</svg>' +
      '<svg class="icon-moon" viewBox="0 0 24 24" aria-hidden="true">' +
        '<path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2z"/>' +
      '</svg>';

    function label() {
      var next = currentIsDark() ? 'light' : 'dark';
      btn.setAttribute('aria-label', 'Switch to ' + next + ' theme');
      btn.setAttribute('title', 'Switch to ' + next + ' theme');
    }
    label();

    btn.addEventListener('click', function () {
      var next = currentIsDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      remember(next);
      label();
    });

    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }

  /* If the visitor has never chosen, keep following the system as it changes. */
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function () {
      if (!stored()) {
        root.removeAttribute('data-theme');
        var b = document.querySelector('.theme-toggle');
        if (b) {
          var next = currentIsDark() ? 'light' : 'dark';
          b.setAttribute('aria-label', 'Switch to ' + next + ' theme');
          b.setAttribute('title', 'Switch to ' + next + ' theme');
        }
      }
    };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }
})();
