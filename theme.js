(() => {
  const storageKey = 'prince-portfolio-theme';
  const root = document.documentElement;
  const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
  const labels = { system: 'System', light: 'Light', dark: 'Dark' };
  let selectedTheme = 'system';

  try {
    const savedTheme = localStorage.getItem(storageKey);
    if (Object.hasOwn(labels, savedTheme)) selectedTheme = savedTheme;
  } catch (_) {
    // Keep the system default when browser storage is unavailable.
  }

  function applyTheme() {
    const dark = selectedTheme === 'dark' ||
      (selectedTheme === 'system' && systemPreference.matches);
    root.dataset.theme = dark ? 'dark' : 'light';
    root.style.colorScheme = dark ? 'dark' : 'light';
  }

  applyTheme();
  systemPreference.addEventListener?.('change', () => {
    if (selectedTheme === 'system') applyTheme();
  });

  document.addEventListener('DOMContentLoaded', () => {
    const control = document.querySelector('.theme-control');
    if (!control) return;

    const trigger = control.querySelector('.theme-trigger');
    const options = [...control.querySelectorAll('[data-theme-choice]')];

    function setMenuOpen(open) {
      control.classList.toggle('is-open', open);
      trigger.setAttribute('aria-expanded', String(open));
    }

    function refreshMenu() {
      const label = labels[selectedTheme];
      control.querySelector('.theme-current').textContent = label;
      trigger.setAttribute('aria-label', `Color theme: ${label}`);
      options.forEach((option) => {
        option.setAttribute('aria-pressed', String(option.dataset.themeChoice === selectedTheme));
      });
    }

    control.addEventListener('mouseenter', () => setMenuOpen(true));
    control.addEventListener('mouseleave', () => setMenuOpen(false));
    trigger.addEventListener('click', () => {
      setMenuOpen(control.matches(':hover') || !control.classList.contains('is-open'));
    });
    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setMenuOpen(true);
        options[0]?.focus();
      }
    });
    control.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        trigger.focus();
      }
    });

    options.forEach((option) => {
      option.addEventListener('click', () => {
        selectedTheme = option.dataset.themeChoice;
        try {
          localStorage.setItem(storageKey, selectedTheme);
        } catch (_) {
          // The current page still switches even if the choice cannot be saved.
        }
        applyTheme();
        refreshMenu();
        setMenuOpen(control.matches(':hover'));
        trigger.focus();
      });
    });

    document.addEventListener('pointerdown', (event) => {
      if (!control.contains(event.target)) setMenuOpen(false);
    });

    refreshMenu();
  });
})();
