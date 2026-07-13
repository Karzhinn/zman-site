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
})();
