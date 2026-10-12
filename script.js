// PRINCE JHA — PORTFOLIO JS

// Hide the navigation while scrolling down and reveal it while scrolling up.
const navbar = document.getElementById('navbar');
let previousScrollY = window.scrollY;
let navScrollFrame = false;

window.addEventListener('scroll', () => {
  if (navScrollFrame) return;
  navScrollFrame = true;
  window.requestAnimationFrame(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY <= 8 || currentScrollY < previousScrollY - 4) {
      navbar.classList.remove('nav-hidden');
    } else if (currentScrollY > previousScrollY + 4) {
      navbar.classList.add('nav-hidden');
    }
    previousScrollY = currentScrollY;
    navScrollFrame = false;
  });
}, { passive: true });

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
  '.hero-identity, .hero-right, .recent-posts, .about-grid, .edu-card, .skill-group, .project-card, .timeline-item, .achievements, .achieve-item, .contact-link, .contact-form, .section-label, .section-title, .contact-sub, .footer-inner > *'
);

revealEls.forEach(el => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = [...entry.target.parentElement.children].filter(el => el.classList.contains('reveal'));
        const order = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), Math.max(0, order) * 30);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}
