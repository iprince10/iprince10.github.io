// PRINCE JHA — PORTFOLIO JS

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
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

// js changes
