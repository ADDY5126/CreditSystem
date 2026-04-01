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
  // Skip all animations for accessibility
  console.log('TrustScore: Reduced motion detected, skipping animations.');
} else {
  initAnimations();
}

function initAnimations() {

  /* ─────────────────────────────────────────────
     1. HERO ENTRANCE — timeline on page load
  ───────────────────────────────────────────── */
  const heroTL = gsap.timeline({
    defaults: { ease: 'power3.out' },
    delay: 0.15
  });

  heroTL
    .from('.hero-title', {
      y: 80, opacity: 0, duration: 1.1,
      clearProps: 'all'
    })
    .from('.hero-subtitle', {
      y: 50, opacity: 0, duration: 0.85
    }, '-=0.65')
    .from('.hero-cta .btn-primary', {
      y: 30, opacity: 0, duration: 0.6, scale: 0.95
    }, '-=0.55')
    .from('.hero-cta .btn-secondary', {
      y: 30, opacity: 0, duration: 0.6, scale: 0.95
    }, '-=0.48')
    .from('.hero-stats .stat-item', {
      y: 24, opacity: 0, duration: 0.5, stagger: 0.12
    }, '-=0.45')
    .from('.hero-stats .stat-divider', {
      scaleY: 0, opacity: 0, duration: 0.4, stagger: 0.1
    }, '-=0.5')
    .from('.hero-visual .hero-img-frame', {
      x: 80, opacity: 0, duration: 1.1, ease: 'power2.out'
    }, '-=1.3')
    .from('.hero-visual .score-card', {
      y: 40, opacity: 0, duration: 0.8, scale: 0.92, ease: 'back.out(1.4)'
    }, '-=0.7')
    .from('.hero-visual .mini-card', {
      scale: 0.75, opacity: 0, duration: 0.55, stagger: 0.22, ease: 'back.out(1.6)'
    }, '-=0.5');


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


  /* ─────────────────────────────────────────────
     4. FEATURES SECTION
  ───────────────────────────────────────────── */
  gsap.from('.features .section-header', {
    scrollTrigger: {
      trigger: '.features',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    y: 55,
    opacity: 0,
    duration: 0.95,
    ease: 'power2.out'
  });

  // Cards appear with stagger, alternating direction
  const featureCards = gsap.utils.toArray('.feature-card');
  gsap.from(featureCards, {
    scrollTrigger: {
      trigger: '.features-grid',
      start: 'top 82%',
      toggleActions: 'play none none reverse'
    },
    y: 70,
    opacity: 0,
    duration: 0.75,
    stagger: {
      amount: 0.85,
      from: 'start',
      ease: 'power1.inOut'
    },
    ease: 'power2.out'
  });

  // Feature icon wraps pop in
  gsap.from('.feature-icon-wrap', {
    scrollTrigger: {
      trigger: '.features-grid',
      start: 'top 75%'
    },
    scale: 0,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'back.out(2)'
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


  /* ─────────────────────────────────────────────
     5. HOW IT WORKS SECTION
  ───────────────────────────────────────────── */
  gsap.from('.how-it-works .section-header', {
    scrollTrigger: {
      trigger: '.how-it-works',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    y: 55,
    opacity: 0,
    duration: 0.95,
    ease: 'power2.out'
  });

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


  /* ─────────────────────────────────────────────
     6. PLATFORMS SECTION
  ───────────────────────────────────────────── */
  gsap.from('.platforms .section-header', {
    scrollTrigger: {
      trigger: '.platforms',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    y: 55,
    opacity: 0,
    duration: 0.95,
    ease: 'power2.out'
  });

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


  /* ─────────────────────────────────────────────
     9. NAVBAR — subtle intro slide down
  ───────────────────────────────────────────── */
  gsap.from('.navbar', {
    y: -100,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out'
  });


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
}
