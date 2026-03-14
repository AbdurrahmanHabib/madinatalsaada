/* ==========================================================================
   MADINAT AL SAADA - MAIN JAVASCRIPT
   Vanilla JS, no dependencies. ~4KB minified.
   ========================================================================== */

'use strict';

document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------------------------------------------------
     1. MOBILE MENU TOGGLE
     ----------------------------------------------------------------------- */
  var toggle = document.querySelector('.navbar__toggle');
  var mobileNav = document.querySelector('.navbar__mobile');

  function closeMobile() {
    if (!toggle || !mobileNav) return;
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
  }

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobile);
    });

    document.addEventListener('click', function (e) {
      if (!mobileNav.classList.contains('is-open')) return;
      if (!mobileNav.contains(e.target) && !toggle.contains(e.target)) {
        closeMobile();
      }
    });
  }

  /* -----------------------------------------------------------------------
     2. NAVBAR SCROLL EFFECT
     ----------------------------------------------------------------------- */
  var navbar = document.querySelector('.navbar');

  function onScroll() {
    if (!navbar) return;
    navbar.classList.toggle('is-scrolled', window.scrollY > 20);
  }

  if (navbar) {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* -----------------------------------------------------------------------
     3. FAQ ACCORDION (native <details>, single-open)
     ----------------------------------------------------------------------- */
  document.querySelectorAll('.faq-list').forEach(function (list) {
    list.addEventListener('toggle', function (e) {
      if (!e.target.open) return;
      list.querySelectorAll('details[open]').forEach(function (d) {
        if (d !== e.target) d.removeAttribute('open');
      });
    }, true);
  });

  /* -----------------------------------------------------------------------
     4. STAT COUNTER ANIMATION
     ----------------------------------------------------------------------- */
  var statEls = document.querySelectorAll('.stat__number');

  function animateCount(el) {
    var end = parseInt(el.getAttribute('data-count'), 10);
    if (!end) return;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1500;
    var start = performance.now();

    function step(now) {
      var t = Math.min((now - start) / duration, 1);
      // ease-out quad
      t = t * (2 - t);
      el.textContent = Math.floor(t * end) + suffix;
      if (t < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  if (statEls.length && 'IntersectionObserver' in window) {
    var statObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statEls.forEach(function (el) { statObs.observe(el); });
  }

  /* -----------------------------------------------------------------------
     5. CONTACT FORM SUBMISSION (Web3Forms)
     ----------------------------------------------------------------------- */
  var form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var btn = form.querySelector('[type="submit"]');
      var successEl = form.querySelector('.form-success');
      var errorEl = form.querySelector('.form-error');

      if (successEl) successEl.style.display = 'none';
      if (errorEl) errorEl.style.display = 'none';
      if (btn) btn.disabled = true;

      var data = {};
      new FormData(form).forEach(function (v, k) { data[k] = v; });

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (res) { return res.json(); })
        .then(function (json) {
          if (json.success) {
            if (successEl) successEl.style.display = 'block';
            form.reset();
          } else {
            if (errorEl) errorEl.style.display = 'block';
          }
        })
        .catch(function () {
          if (errorEl) errorEl.style.display = 'block';
        })
        .finally(function () {
          if (btn) btn.disabled = false;
        });
    });
  }

  /* -----------------------------------------------------------------------
     6. SCROLL REVEAL
     ----------------------------------------------------------------------- */
  var revealEls = document.querySelectorAll('[data-reveal]');

  if (revealEls.length && 'IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(function (el) { revealObs.observe(el); });
  }

  /* -----------------------------------------------------------------------
     7. SMOOTH SCROLL FOR ANCHOR LINKS
     ----------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;

      var target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      var offset = navbar ? navbar.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });

      closeMobile();
    });
  });

  /* -----------------------------------------------------------------------
     8. CURRENT YEAR
     ----------------------------------------------------------------------- */
  document.querySelectorAll('.current-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

});
