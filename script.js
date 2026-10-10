// PRINCE JHA — PORTFOLIO JS

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const hoverCapableMenu = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
let navMenuCloseTimer;

function setNavMenuOpen(isOpen) {
  navLinks.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
}

function scheduleNavMenuClose() {
  clearTimeout(navMenuCloseTimer);
  navMenuCloseTimer = setTimeout(() => {
    if (!hamburger.matches(':hover') && !navLinks.matches(':hover')) setNavMenuOpen(false);
  }, 140);
}

hamburger.addEventListener('click', () => {
  clearTimeout(navMenuCloseTimer);
  setNavMenuOpen(!navLinks.classList.contains('open'));
});

if (hoverCapableMenu) {
  hamburger.addEventListener('mouseenter', () => {
    clearTimeout(navMenuCloseTimer);
    setNavMenuOpen(true);
  });
  hamburger.addEventListener('mouseleave', scheduleNavMenuClose);
  navLinks.addEventListener('mouseenter', () => {
    clearTimeout(navMenuCloseTimer);
    setNavMenuOpen(true);
  });
  navLinks.addEventListener('mouseleave', scheduleNavMenuClose);
}

// Close on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    clearTimeout(navMenuCloseTimer);
    setNavMenuOpen(false);
  });
});

document.addEventListener('pointerdown', (event) => {
  if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
    clearTimeout(navMenuCloseTimer);
    setNavMenuOpen(false);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navLinks.classList.contains('open')) {
    clearTimeout(navMenuCloseTimer);
    setNavMenuOpen(false);
    hamburger.focus();
  }
});

// ── NAVBAR SCROLL HIGHLIGHT ──
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');

function highlightNav() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top <= 80) current = sec.id;
  });
  links.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
}

window.addEventListener('scroll', highlightNav, { passive: true });

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll(
  '.about-grid, .edu-card, .skill-group, .project-card, .timeline-item, .achieve-item, .contact-link, .contact-form, .about-stats, .stat'
);

revealEls.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => io.observe(el));
