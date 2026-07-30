(() => {
  'use strict';
  const STORAGE_KEY = 'neet-note-theme';
  const root = document.documentElement;
  const metaTheme = document.querySelector('meta[name="theme-color"]');

  const preferredTheme = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    if (metaTheme) metaTheme.setAttribute('content', theme === 'dark' ? '#141311' : '#d9c7a8');
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      const dark = theme === 'dark';
      button.innerHTML = `<span aria-hidden="true">${dark ? '☀️' : '🌙'}</span><span>${dark ? 'ライトモード' : 'ダークモード'}</span>`;
      button.setAttribute('aria-label', dark ? 'ライトモードに切り替える' : 'ダークモードに切り替える');
      button.setAttribute('aria-pressed', String(dark));
    });
  };

  applyTheme(preferredTheme());

  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-theme-toggle]');
    if (!button) return;
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    if (!localStorage.getItem(STORAGE_KEY)) applyTheme(event.matches ? 'dark' : 'light');
  });
})();
