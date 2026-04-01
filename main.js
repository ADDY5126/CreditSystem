/* ============================================================
   TrustTrack — Main JavaScript (Landing Page)
   ============================================================ */

// ---------- Navbar Scroll Effect ----------
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ---------- Mobile Menu ----------
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

// ---------- Animated Counter ----------
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ---------- Intersection Observer ----------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      entry.target.classList.remove('hidden');
      // Counter animation
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .step-card, .platform-card, .stat-item, .stats-banner-item').forEach(el => {
  el.classList.add('hidden');
  observer.observe(el);
});

// Animate hero stats immediately
document.querySelectorAll('.hero-stats [data-target]').forEach(el => {
  el.classList.remove('hidden');
  animateCounter(el);
});

// ---------- Bar fill animation on scroll ----------
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.factor-bar').forEach(b => {
        b.style.height = b.style.height; // trigger reflow
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.score-factors').forEach(el => barObserver.observe(el));

// ---------- Smooth anchor scrolling ----------
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      mobileMenu?.classList.remove('open');
    }
  });
});

console.log('TrustTrack Landing Page Loaded ✓');
