/* ─────────────────────────────────────────────
   CodaleSG – JavaScript: Nav, Scroll, Form
───────────────────────────────────────────── */

(function () {
  'use strict';

  /* ── NAV SCROLL EFFECT ── */
  const navHeader = document.getElementById('nav-header');

  function updateNav() {
    if (window.scrollY > 40) {
      navHeader.classList.add('scrolled');
    } else {
      navHeader.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── MOBILE NAV ── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileClose = document.getElementById('mobile-nav-close');

  function openMobileNav() {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openMobileNav);
  mobileClose.addEventListener('click', closeMobileNav);

  // Close on link click
  document.querySelectorAll('.mobile-nav-link, .mobile-cta').forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  // Close on backdrop click (outside nav panel)
  mobileNav.addEventListener('click', function (e) {
    if (e.target === mobileNav) closeMobileNav();
  });

  /* ── ACTIVE NAV LINK ON SCROLL ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function setActiveNavLink() {
    let currentId = '';
    sections.forEach(function (section) {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveNavLink, { passive: true });
  setActiveNavLink();

  /* ── SCROLL REVEAL ANIMATION ── */
  const revealEls = document.querySelectorAll(
    '.service-card, .advantage-item, .industry-card, .pillar, ' +
    '.about-visual, .about-text, .contact-info, .contact-form-wrap, ' +
    '.section-header, .hero-stats .stat'
  );

  revealEls.forEach(function (el, i) {
    el.classList.add('reveal');
    // Stagger children in grids
    const siblings = el.parentElement.children;
    const idx = Array.from(siblings).indexOf(el);
    if (idx > 0 && idx <= 5) {
      el.classList.add('reveal-delay-' + idx);
    }
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(function (el) {
    observer.observe(el);
  });

  /* ── CONTACT FORM ── */
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const formSubmit = document.getElementById('form-submit');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      const required = contactForm.querySelectorAll('[required]');
      let valid = true;
      required.forEach(function (field) {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#ef4444';
          valid = false;
        }
      });

      if (!valid) {
        formSuccess.style.color = '#ef4444';
        formSuccess.textContent = 'Please fill in all required fields.';
        return;
      }

      // Email validation
      const emailField = document.getElementById('femail');
      const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRx.test(emailField.value)) {
        emailField.style.borderColor = '#ef4444';
        formSuccess.style.color = '#ef4444';
        formSuccess.textContent = 'Please enter a valid email address.';
        return;
      }

      // Simulate submission
      formSubmit.disabled = true;
      formSubmit.querySelector('.btn-text').textContent = 'Sending…';

      setTimeout(function () {
        contactForm.reset();
        formSuccess.style.color = '#16a34a';
        formSuccess.textContent = '✓ Thank you! Your inquiry has been received. We will respond within 24 business hours.';
        formSubmit.disabled = false;
        formSubmit.querySelector('.btn-text').textContent = 'Become a Partner';
      }, 1200);
    });

    // Clear error state on input
    contactForm.querySelectorAll('input, textarea, select').forEach(function (field) {
      field.addEventListener('input', function () {
        field.style.borderColor = '';
        formSuccess.textContent = '';
      });
    });
  }

  /* ── SMOOTH SCROLL POLYFILL (href="#") ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const offset = navHeader.offsetHeight;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();
