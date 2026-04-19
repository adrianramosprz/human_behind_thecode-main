/* ══════════════════════════════════════════
   script.js — CV Portfolio (Gamer Edition)
   Funcionalidades:
   · Spotlight que sigue al cursor
   · IntersectionObserver para nav activo
   · Smooth-scroll en nav links
   · Hamburger toggle (mobile)
   · Skill XP bars animation on scroll
   · Card entrance animations
   · Card mouse-tilt (projects)
   · Header scroll-state class
══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── 1. SPOTLIGHT EFFECT ─── */
  const spotlight = document.getElementById('spotlight');

  function updateSpotlight(e) {
    if (!spotlight) return;
    spotlight.style.setProperty('--mouse-x', e.clientX + 'px');
    spotlight.style.setProperty('--mouse-y', e.clientY + 'px');
  }

  document.addEventListener('mousemove', updateSpotlight, { passive: true });

  document.addEventListener('mouseleave', () => {
    if (spotlight) spotlight.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    if (spotlight) spotlight.style.opacity = '1';
  });

  /* ─── 2. HEADER SCROLL STATE ─── */
  const header = document.getElementById('site-header');

  window.addEventListener('scroll', () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ─── 3. ACTIVE NAV via IntersectionObserver ─── */
  const sections  = document.querySelectorAll('#about, #experience, #projects');
  const navLinks  = document.querySelectorAll('.nav-link');

  function setActiveNav(id) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === '#' + id) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'true');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  if (sections.length > 0 && navLinks.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveNav(entry.target.id);
      });
    }, {
      root: null,
      rootMargin: '-70px 0px -60% 0px',
      threshold: 0,
    });

    sections.forEach(s => sectionObserver.observe(s));
    setActiveNav('about');
  }

  /* ─── 4. SMOOTH-SCROLL on nav links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', href);

      /* Close mobile nav if open */
      if (headerNav && headerNav.classList.contains('open')) {
        closeMobileNav();
      }
    });
  });

  /* ─── 5. HAMBURGER TOGGLE ─── */
  const navToggle = document.getElementById('nav-toggle');
  const headerNav = document.getElementById('header-nav');

  function openMobileNav() {
    headerNav.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Cerrar menú de navegación');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    headerNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menú de navegación');
    document.body.style.overflow = '';
  }

  navToggle?.addEventListener('click', () => {
    const isOpen = headerNav.classList.contains('open');
    isOpen ? closeMobileNav() : openMobileNav();
  });

  /* Close on Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && headerNav?.classList.contains('open')) {
      closeMobileNav();
      navToggle?.focus();
    }
  });

  /* ─── 6. SKILL XP BARS — animate on scroll ─── */
  const skillFills = document.querySelectorAll('.skill-fill');

  if (skillFills.length) {
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          /* Small stagger per bar */
          const bars = entry.target.querySelectorAll('.skill-fill');
          bars.forEach((bar, i) => {
            setTimeout(() => bar.classList.add('animated'), i * 100);
          });
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    const skillPanel = document.getElementById('skill-bars');
    if (skillPanel) barObserver.observe(skillPanel);
  }

  /* ─── 7. ENTRANCE ANIMATIONS (fade-in-up) ─── */
  function addEntranceAnimations() {
    const style = document.createElement('style');
    style.textContent = `
      .hero-content,
      .hero-boot,
      .hero-name,
      .hero-role,
      .hero-tagline,
      .hero-cta {
        opacity: 0;
        animation: fadeInUp 0.65s var(--ease-out) forwards;
      }
      .hero-boot    { animation-delay: 0.05s; }
      .hero-name    { animation-delay: 0.18s; }
      .hero-role    { animation-delay: 0.28s; }
      .hero-tagline { animation-delay: 0.38s; }
      .hero-cta     { animation-delay: 0.5s; }

      .exp-card,
      .project-card {
        opacity: 0;
        animation: fadeInUp 0.55s var(--ease-out) forwards;
        animation-play-state: paused;
      }
      .exp-card.visible,
      .project-card.visible {
        animation-play-state: running;
      }
    `;
    document.head.appendChild(style);
  }

  function observeCards() {
    const cards = document.querySelectorAll('.exp-card, .project-card');
    if (!cards.length) return;

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = (idx * 75) + 'ms';
          entry.target.classList.add('visible');
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => cardObserver.observe(card));
  }

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    addEntranceAnimations();
    requestAnimationFrame(() => requestAnimationFrame(observeCards));
  }

  /* ─── 8. CARD MOUSE-TILT (project cards only) ─── */
  function addMouseTilt() {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x =  (e.clientX - rect.left) / rect.width  - 0.5;
        const y =  (e.clientY - rect.top)  / rect.height - 0.5;
        const rotX = -(y * 3.5).toFixed(2);
        const rotY =   (x * 3.5).toFixed(2);
        card.style.transform =
          `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-3px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    addMouseTilt();
  }

})();
