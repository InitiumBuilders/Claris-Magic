// ============================================
// PARTICLES.JS — Star field + rune particles
// ============================================

(function () {
  // Page theme color (each page can set window.PAGE_THEME)
  const PAGE_THEMES = {
    'index.html': { color: 'purple', starColor: 'star-purple' },
    'grimoire.html': { color: 'gold', starColor: 'star-gold' },
    'wicked.html': { color: 'ember', starColor: 'star-ember' },
    'claris.html': { color: 'purple', starColor: 'star-purple' },
    'resources.html': { color: 'teal', starColor: 'star-teal' },
    'submit.html': { color: 'purple', starColor: 'star-purple' },
    'about.html': { color: 'teal', starColor: 'star-teal' },
  };

  function getCurrentTheme() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    return PAGE_THEMES[page] || PAGE_THEMES['index.html'];
  }

  function createStarField() {
    const container = document.createElement('div');
    container.className = 'stars';
    container.setAttribute('aria-hidden', 'true');

    const theme = getCurrentTheme();
    const STAR_COUNT = 120;

    for (let i = 0; i < STAR_COUNT; i++) {
      const star = document.createElement('div');
      star.className = 'star';

      // Some stars get color
      const roll = Math.random();
      if (roll < 0.15) {
        star.classList.add(theme.starColor);
      }

      const size = Math.random() * 2.5 + 0.5;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const dur = (Math.random() * 4 + 2).toFixed(1);
      const delay = (Math.random() * 5).toFixed(1);
      const minOp = (Math.random() * 0.1 + 0.05).toFixed(2);
      const maxOp = (Math.random() * 0.5 + 0.3).toFixed(2);

      star.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        --dur: ${dur}s;
        --delay: -${delay}s;
        --min-op: ${minOp};
        --max-op: ${maxOp};
      `;

      container.appendChild(star);
    }

    document.body.insertBefore(container, document.body.firstChild);
  }

  function createRuneParticles() {
    const runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛞ', 'ᛟ'];
    const colors = [
      'rgba(184,41,255,0.12)',
      'rgba(0,255,204,0.08)',
      'rgba(255,215,0,0.07)',
    ];

    const RUNE_COUNT = 18;

    for (let i = 0; i < RUNE_COUNT; i++) {
      const el = document.createElement('div');
      el.className = 'rune-particle';
      el.textContent = runes[Math.floor(Math.random() * runes.length)];

      const x = Math.random() * 100;
      const dur = (Math.random() * 30 + 20).toFixed(0);
      const delay = (Math.random() * -40).toFixed(0);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = (Math.random() * 0.8 + 0.7).toFixed(1);

      el.style.cssText = `
        left: ${x}%;
        --dur: ${dur}s;
        --delay: ${delay}s;
        --rune-color: ${color};
        font-size: ${size}rem;
      `;

      document.body.appendChild(el);
    }
  }

  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  function init() {
    createStarField();
    createRuneParticles();
    setTimeout(initScrollReveal, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
