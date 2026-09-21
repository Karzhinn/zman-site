/* ZMAN site — language toggle, mobile nav, reveal animation. No dependencies. */
(function () {
  'use strict';

  var STORAGE_KEY = 'zman-lang'; // 'ku' | 'en'
  var root = document.documentElement;

  function storedLang() {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'ku';
    } catch (e) {
      return 'ku';
    }
  }

  function applyLang(lang) {
    root.setAttribute('lang', lang === 'ku' ? 'ckb' : 'en');
    root.setAttribute('dir', lang === 'ku' ? 'rtl' : 'ltr');

    // Swap every element that carries bilingual text
    var nodes = document.querySelectorAll('[data-ku]');
    for (var i = 0; i < nodes.length; i++) {
      var text = nodes[i].getAttribute(lang === 'ku' ? 'data-ku' : 'data-en');
      if (text !== null) nodes[i].textContent = text;
    }

    // Bilingual alt text and aria-labels
    var alts = document.querySelectorAll('[data-alt-ku]');
    for (var a = 0; a < alts.length; a++) {
      alts[a].setAttribute('alt', alts[a].getAttribute(lang === 'ku' ? 'data-alt-ku' : 'data-alt-en') || '');
    }
    var arias = document.querySelectorAll('[data-aria-ku]');
    for (var r = 0; r < arias.length; r++) {
      arias[r].setAttribute('aria-label', arias[r].getAttribute(lang === 'ku' ? 'data-aria-ku' : 'data-aria-en') || '');
    }

    // Page title + meta description
    var body = document.body;
    var title = body.getAttribute('data-title-' + lang);
    if (title) document.title = title;
    var desc = body.getAttribute('data-desc-' + lang);
    var meta = document.querySelector('meta[name="description"]');
    if (desc && meta) meta.setAttribute('content', desc);

    // Toggle button shows the OTHER language's name
    var labels = document.querySelectorAll('.lang-toggle-label');
    for (var l = 0; l < labels.length; l++) {
      labels[l].textContent = lang === 'ku' ? 'English' : 'کوردی';
    }

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode */ }
  }

  var currentLang = storedLang();
  applyLang(currentLang);

  // --- Language toggle ---
  var toggles = document.querySelectorAll('.lang-toggle');
  for (var t = 0; t < toggles.length; t++) {
    toggles[t].addEventListener('click', function () {
      currentLang = currentLang === 'ku' ? 'en' : 'ku';
      applyLang(currentLang);
    });
  }

  // --- Mobile nav ---
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close the panel after choosing a link
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  // --- Scroll reveal (skipped when the user prefers reduced motion) ---
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealNodes = document.querySelectorAll('.reveal');
  if (!reduced && 'IntersectionObserver' in window && revealNodes.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealNodes.forEach(function (n) { io.observe(n); });
  } else {
    revealNodes.forEach(function (n) { n.classList.add('is-visible'); });
  }

  // --- Site alert / status bar (content lives in content/alerts.json, edited via /admin/) ---
  (function initAlerts() {
    var host = document.getElementById('site-alert');
    if (!host || !window.fetch) return;

    var DISMISS_KEY = 'zman-alert-dismissed';
    function dismissedIds() {
      try { return JSON.parse(localStorage.getItem(DISMISS_KEY)) || []; } catch (e) { return []; }
    }
    function rememberDismiss(id) {
      try {
        var arr = dismissedIds();
        if (arr.indexOf(id) === -1) { arr.push(id); }
        localStorage.setItem(DISMISS_KEY, JSON.stringify(arr));
      } catch (e) { /* private mode */ }
    }

    var SEV = { info: 1, success: 1, warning: 1, critical: 1 };
    var ICONS = {
      info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
      success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
      warning: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      critical: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
    };
    var CLOSE_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

    function pick(ku, en) { return (currentLang === 'ku' ? ku : en) || en || ku || ''; }

    function buildBar(a) {
      var sev = SEV[a.severity] ? a.severity : 'info';

      var bar = document.createElement('div');
      bar.className = 'site-alert-bar sev-' + sev;
      // warning/critical are assertive; info/success are polite
      bar.setAttribute('role', (sev === 'warning' || sev === 'critical') ? 'alert' : 'status');

      var inner = document.createElement('div');
      inner.className = 'site-alert-inner container';

      var icon = document.createElement('span');
      icon.className = 'site-alert-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML = ICONS[sev];
      inner.appendChild(icon);

      var msg = document.createElement('span');
      msg.className = 'site-alert-msg';
      if (a.message_ku) { msg.setAttribute('data-ku', a.message_ku); }
      if (a.message_en) { msg.setAttribute('data-en', a.message_en); }
      msg.textContent = pick(a.message_ku, a.message_en);
      inner.appendChild(msg);

      if (a.link_url) {
        var link = document.createElement('a');
        link.className = 'site-alert-link';
        link.href = a.link_url;
        if (/^https?:/i.test(a.link_url)) { link.target = '_blank'; link.rel = 'noopener'; }
        if (a.link_label_ku) { link.setAttribute('data-ku', a.link_label_ku); }
        if (a.link_label_en) { link.setAttribute('data-en', a.link_label_en); }
        link.textContent = pick(a.link_label_ku, a.link_label_en) || pick('کرتە بکە', 'Open');
        inner.appendChild(link);
      }

      if (a.dismissible) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'site-alert-close';
        btn.setAttribute('data-aria-ku', 'داخستنی ئاگاداری');
        btn.setAttribute('data-aria-en', 'Dismiss announcement');
        btn.setAttribute('aria-label', pick('داخستنی ئاگاداری', 'Dismiss announcement'));
        btn.innerHTML = CLOSE_ICON;
        btn.addEventListener('click', function () {
          if (a.id) { rememberDismiss(a.id); }
          if (bar.parentNode) { bar.parentNode.removeChild(bar); }
          if (!host.querySelector('.site-alert-bar')) { host.hidden = true; }
        });
        inner.appendChild(btn);
      }

      bar.appendChild(inner);
      return bar;
    }

    function render(list) {
      var dead = dismissedIds();
      host.innerHTML = '';
      var shown = 0;
      for (var i = 0; i < list.length; i++) {
        var a = list[i];
        if (!a || !a.active) { continue; }
        if (!a.message_ku && !a.message_en) { continue; }
        if (a.dismissible && a.id && dead.indexOf(a.id) !== -1) { continue; }
        host.appendChild(buildBar(a));
        shown++;
      }
      host.hidden = shown === 0;
    }

    var url = 'content/alerts.json?_=' + Math.floor(Date.now() / 60000); // light cache-buster
    fetch(url, { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data) { return; }
        render(Array.isArray(data) ? data : (data.alerts || []));
      })
      .catch(function () { /* no alert on failure — page stays clean */ });
  })();
})();
