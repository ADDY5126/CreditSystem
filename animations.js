/* ============================================================
   TrustScore — GSAP Animations + ScrollTrigger
   Requires: gsap.min.js + ScrollTrigger.min.js (loaded before this)
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   UTILS
───────────────────────────────────────────── */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  console.log('TrustScore: Reduced motion off.');
} else {
  // Wait for full layout before setting up ScrollTrigger positions
  window.addEventListener('load', initAnimations);
}

function initAnimations() {

  /* ─────────────────────────────────────────────
     1. PAGE INTRO — navbar stagger → hero stagger
  ───────────────────────────────────────────── */

  // Hide everything before the timeline runs (no flash)
  gsap.set('.nav-logo, .nav-link, .btn-nav', { autoAlpha: 0, y: -30 });
  gsap.set('#heroBrandHeading', { autoAlpha: 0, y: -window.innerHeight * 0.6 });
  gsap.set('#heroTitle, #heroSubtitle, .hero-cta .btn-primary, .hero-cta .btn-secondary, .hero-visual .hero-img-frame', { autoAlpha: 0 });

  const masterTL = gsap.timeline({
    defaults: { ease: 'power3.out' },
    delay: 0.3
  });

  // ── Phase 1: Navbar items stagger down from top ──
  masterTL
    .to('.nav-logo', { autoAlpha: 1, y: 0, duration: 1.0 })
    .to('.nav-link', {
      autoAlpha: 1, y: 0, duration: 0.8,
      stagger: { amount: 0.5, from: 'start' }
    }, '-=0.6')
    .to('.btn-nav', { autoAlpha: 1, y: 0, duration: 0.8, ease: 'back.out(1.6)' }, '-=0.4')

  // ── Phase 2: TrustScore brand heading DROPS from top ──
    .to('#heroBrandHeading', {
      autoAlpha: 1, y: 0, duration: 1.8, ease: 'power4.out'
    }, '-=0.3')

  // ── Phase 3: Subtitle & hero tagline cascade ──
    .fromTo('#heroTitle',
      { autoAlpha: 0, y: 50 },
      { autoAlpha: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=1.0')
    .fromTo('#heroSubtitle',
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.8')
    .fromTo('.hero-cta .btn-primary',
      { autoAlpha: 0, y: 30, scale: 0.88 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: 'back.out(1.5)' }, '-=0.7')
    .fromTo('.hero-cta .btn-secondary',
      { autoAlpha: 0, y: 30, scale: 0.88 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.9, ease: 'back.out(1.5)' }, '-=0.7')

  // ── Phase 4: Chart fades up from below ──
    .fromTo('.hero-visual .hero-img-frame',
      { autoAlpha: 0, y: 80 },
      { autoAlpha: 1, y: 0, duration: 1.4, ease: 'power2.out' }, '-=1.0')
    .call(() => animateHeroChart());


  /* ─────────────────────────────────────────────
     HERO CHART — bar grow + line draw + labels
  ───────────────────────────────────────────── */
  function animateHeroChart() {
    const baseline = 310;
    const barDefs = [
      { id: 'cbar1', h: 72 },
      { id: 'cbar2', h: 116 },
      { id: 'cbar3', h: 158 },
      { id: 'cbar4', h: 200 },
      { id: 'cbar5', h: 236 }
    ];

    // Bars rise from baseline
    barDefs.forEach((bar, i) => {
      const el = document.getElementById(bar.id);
      if (!el) return;
      gsap.fromTo(el,
        { attr: { height: 0, y: baseline } },
        { attr: { height: bar.h, y: baseline - bar.h }, duration: 1.1, delay: i * 0.13, ease: 'power3.out' }
      );
    });

    // Draw trend line
    const line = document.getElementById('trendLine');
    if (line && line.getTotalLength) {
      const len = line.getTotalLength();
      gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(line, {
        strokeDashoffset: 0, duration: 1.7, delay: 0.55, ease: 'power2.inOut',
        onComplete() {
          // Arrow tip
          gsap.to('#chartArrow', { opacity: 1, duration: 0.3, ease: 'power2.out' });
          // Intersection dots
          gsap.to('.trend-dot', { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(2)' });
          // Score labels
          gsap.fromTo('.bar-label',
            { opacity: 0, y: 6 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
          );
        }
      });
    }
  }


  /* ─────────────────────────────────────────────
     2. PARALLAX — orbs + hero visual on scroll
  ───────────────────────────────────────────── */
  gsap.to('.orb-1', {
    scrollTrigger: { trigger: 'body', scrub: 2 },
    y: -180, ease: 'none'
  });
  gsap.to('.orb-2', {
    scrollTrigger: { trigger: 'body', scrub: 2 },
    y: 130, ease: 'none'
  });
  gsap.to('.orb-3', {
    scrollTrigger: { trigger: 'body', scrub: 1.5 },
    y: -80, x: 40, ease: 'none'
  });

  gsap.to('.hero-visual', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.8
    },
    y: -90, ease: 'none'
  });

  gsap.to('.hero-container', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2
    },
    y: -40, ease: 'none'
  });


  /* ─────────────────────────────────────────────
     3. STATS BANNER
  ───────────────────────────────────────────── */
  gsap.from('.stats-banner-item', {
    scrollTrigger: {
      trigger: '.stats-banner',
      start: 'top 88%',
      toggleActions: 'play none none reverse'
    },
    y: 45,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power2.out'
  });

  // Stats banner number counter
  gsap.from('.stats-banner-num', {
    scrollTrigger: {
      trigger: '.stats-banner',
      start: 'top 80%'
    },
    textContent: 0,
    duration: 0,
    onComplete: () => {}
  });


  // Helper: wire up pop-in for a section's tag → title → subtitle
  function sectionPopIn(sectionSel) {
    const section = document.querySelector(sectionSel);
    if (!section) return;
    const tag      = section.querySelector('.section-tag');
    const title    = section.querySelector('.section-title');
    const subtitle = section.querySelector('.section-subtitle');

    if (tag) {
      gsap.fromTo(tag,
        { autoAlpha: 0, scale: 0.6, y: 20 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(2)',
          scrollTrigger: { trigger: tag, start: 'top 92%', toggleActions: 'play none none reverse' } }
      );
    }
    if (title) {
      gsap.fromTo(title,
        { autoAlpha: 0, y: 60, scale: 0.88 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1.0, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: title, start: 'top 90%', toggleActions: 'play none none reverse' } }
      );
    }
    if (subtitle) {
      gsap.fromTo(subtitle,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: subtitle, start: 'top 88%', toggleActions: 'play none none reverse' } }
      );
    }
  }

  sectionPopIn('.features');

  // Each card gets its own ScrollTrigger — in on scroll-down, out on scroll-up
  gsap.utils.toArray('.feature-card').forEach((card) => {
    // Pure y-axis: avoids clipping by grid/section overflow
    gsap.fromTo(card,
      { autoAlpha: 0, y: 80, scale: 0.93 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 92%',
          end: 'top 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Icon pops in when card's top hits 85%
    const icon = card.querySelector('.feature-icon-wrap');
    if (icon) {
      gsap.fromTo(icon,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(2.5)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  });


  // Score bar fill animation in feature card
  ScrollTrigger.create({
    trigger: '.features-grid',
    start: 'top 70%',
    onEnter: () => {
      gsap.fromTo('.mini-score-bar .bar-fill',
        { width: '0%' },
        { width: '78%', duration: 1.5, ease: 'power3.out', delay: 0.8 }
      );
    }
  });


  sectionPopIn('.how-it-works');


  // Step cards fly in from bottom with slight overshoot
  gsap.from('.step-card', {
    scrollTrigger: {
      trigger: '.steps-grid',
      start: 'top 82%',
      toggleActions: 'play none none reverse'
    },
    y: 65,
    opacity: 0,
    duration: 0.85,
    stagger: 0.22,
    ease: 'back.out(1.3)'
  });

  // Step numbers scale in dramatically
  gsap.from('.step-number', {
    scrollTrigger: {
      trigger: '.steps-grid',
      start: 'top 78%'
    },
    scale: 2.5,
    opacity: 0,
    duration: 0.7,
    stagger: 0.22,
    delay: 0.15,
    ease: 'power3.out'
  });

  // Step icons bounce in
  gsap.from('.step-icon', {
    scrollTrigger: {
      trigger: '.steps-grid',
      start: 'top 74%'
    },
    scale: 0,
    rotation: -20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.22,
    delay: 0.3,
    ease: 'back.out(2.5)'
  });

  // Score factor bars animate upward from 0
  ScrollTrigger.create({
    trigger: '.score-factors',
    start: 'top 78%',
    onEnter: () => {
      const bars = document.querySelectorAll('.factor-bar');
      bars.forEach((bar, i) => {
        const targetH = bar.style.height || '60%';
        bar.style.height = '0%';
        gsap.to(bar, {
          height: targetH,
          duration: 1.3,
          delay: i * 0.12,
          ease: 'power3.out'
        });
      });
    }
  });

  // Factor items fade up
  gsap.from('.factor-item', {
    scrollTrigger: {
      trigger: '.score-factors',
      start: 'top 82%',
      toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
  });


  sectionPopIn('.platforms');


  // Platform cards rotate in elegantly
  const platformCards = gsap.utils.toArray('.platform-card');
  platformCards.forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: '.platforms-grid',
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      },
      y: 60,
      x: i === 0 ? -40 : i === 2 ? 40 : 0,
      opacity: 0,
      scale: 0.88,
      duration: 0.9,
      delay: i * 0.18,
      ease: 'back.out(1.4)'
    });
  });

  // Platform metric pills stagger in
  gsap.from('.pm-item', {
    scrollTrigger: {
      trigger: '.platforms-grid',
      start: 'top 65%'
    },
    x: -15,
    opacity: 0,
    duration: 0.45,
    stagger: 0.05,
    ease: 'power1.out'
  });

  // Platform logos pop
  gsap.from('.platform-logo', {
    scrollTrigger: {
      trigger: '.platforms-grid',
      start: 'top 75%'
    },
    scale: 0,
    opacity: 0,
    duration: 0.5,
    stagger: 0.18,
    ease: 'back.out(2.5)'
  });


  /* ─────────────────────────────────────────────
     7. CTA SECTION
  ───────────────────────────────────────────── */
  const ctaTL = gsap.timeline({
    scrollTrigger: {
      trigger: '.cta-section',
      start: 'top 78%',
      toggleActions: 'play none none reverse'
    }
  });

  ctaTL
    .from('.cta-section h2', {
      y: 65, opacity: 0, duration: 1, ease: 'power3.out'
    })
    .from('.cta-section p', {
      y: 45, opacity: 0, duration: 0.8
    }, '-=0.55')
    .from('.cta-buttons > *', {
      y: 30, opacity: 0, scale: 0.9, duration: 0.65, stagger: 0.18, ease: 'back.out(1.5)'
    }, '-=0.45');


  /* ─────────────────────────────────────────────
     8. SECTION TAGS (small pill labels) float in
  ───────────────────────────────────────────── */
  gsap.utils.toArray('.section-tag').forEach(tag => {
    gsap.from(tag, {
      scrollTrigger: {
        trigger: tag,
        start: 'top 88%'
      },
      y: 20,
      opacity: 0,
      scale: 0.85,
      duration: 0.6,
      ease: 'back.out(1.6)'
    });
  });


  // (Navbar is already handled by the masterTL above)


  /* ─────────────────────────────────────────────
     10. HOVER micro-interactions (not GSAP-dependent
         but using GSAP for smoother tweens than CSS)
  ───────────────────────────────────────────── */
  document.querySelectorAll('.feature-card, .step-card, .platform-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -6, duration: 0.3, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.inOut' });
    });
  });

  // Button pulse on hover
  document.querySelectorAll('.btn-primary, .btn-nav').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { scale: 1.04, duration: 0.25, ease: 'power1.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power1.inOut' });
    });
  });

  console.log('TrustScore GSAP Animations Initialized ✓');

  // Recalculate all trigger positions after full setup
  ScrollTrigger.refresh();
}
