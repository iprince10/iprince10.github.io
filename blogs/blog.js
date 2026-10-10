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

const menuButton = document.getElementById('hamburger');
const menuLinks = document.querySelector('.nav-links');
const hoverCapableMenu = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
let navMenuCloseTimer;

function setNavMenuOpen(isOpen) {
  menuLinks.classList.toggle('open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
}

function scheduleNavMenuClose() {
  clearTimeout(navMenuCloseTimer);
  navMenuCloseTimer = setTimeout(() => {
    if (!menuButton.matches(':hover') && !menuLinks.matches(':hover')) setNavMenuOpen(false);
  }, 140);
}

menuButton.addEventListener('click', () => {
  clearTimeout(navMenuCloseTimer);
  if (hoverCapableMenu && menuButton.matches(':hover')) {
    setNavMenuOpen(true);
    return;
  }
  setNavMenuOpen(!menuLinks.classList.contains('open'));
});

if (hoverCapableMenu) {
  menuButton.addEventListener('mouseenter', () => {
    clearTimeout(navMenuCloseTimer);
    setNavMenuOpen(true);
  });
  menuButton.addEventListener('mouseleave', scheduleNavMenuClose);
  menuLinks.addEventListener('mouseenter', () => {
    clearTimeout(navMenuCloseTimer);
    setNavMenuOpen(true);
  });
  menuLinks.addEventListener('mouseleave', scheduleNavMenuClose);
}

menuLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    clearTimeout(navMenuCloseTimer);
    setNavMenuOpen(false);
  });
});

const revealItems = document.querySelectorAll(
  '.blog-heading > *, .post-listing, .article-header > *, .article-content > *, .blog-footer'
);

if ('IntersectionObserver' in window) {
  revealItems.forEach((item) => item.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), index * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}
