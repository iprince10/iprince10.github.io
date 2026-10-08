const menuButton = document.getElementById('hamburger');
const menuLinks = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const isOpen = menuLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

menuLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
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
