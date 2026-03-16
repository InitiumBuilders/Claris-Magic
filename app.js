// ============================================================
// MOTUS MAGIC SYSTEM — Claris AI Cybersecurity Grimoire
// Interactive JS — particles, filters, reality check, scroll fx
// ============================================================

// ── Particle System ──
(function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const colors = [
    'rgba(184,41,255,',
    'rgba(0,255,204,',
    'rgba(255,215,0,',
    'rgba(255,107,53,',
    'rgba(255,255,255,'
  ];

  function createParticle() {
    const p = document.createElement('div');
    p.className = 'particle';
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 12 + 8;
    const delay = Math.random() * 8;
    const startX = Math.random() * 100;
    const drift = (Math.random() - 0.5) * 200;
    const opacity = Math.random() * 0.5 + 0.2;

    p.style.cssText = `
      left: ${startX}%;
      width: ${size}px;
      height: ${size}px;
      background: ${color}${opacity});
      box-shadow: 0 0 ${size * 2}px ${color}0.8);
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      --drift: ${drift}px;
    `;

    container.appendChild(p);
    setTimeout(() => p.remove(), (duration + delay) * 1000);
  }

  // Create initial batch
  for (let i = 0; i < 25; i++) createParticle();
  setInterval(createParticle, 600);
})();

// ── Nav scroll effect ──
(function initNav() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

// ── Fade-in on scroll (Intersection Observer) ──
(function initScrollFade() {
  const cards = document.querySelectorAll('.spell-card, .school-card, .ability-card, .reality-tier, .school-grimoire-section');
  if (!('IntersectionObserver' in window)) {
    cards.forEach(c => c.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('fade-in', 'visible');
        obs.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

  cards.forEach(c => {
    c.classList.add('fade-in');
    obs.observe(c);
  });
})();

// ── Grimoire Filter System ──
(function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const spellCards = document.querySelectorAll('.spell-card');
  const schoolSections = document.querySelectorAll('.school-grimoire-section');

  let activeSchool = 'all';
  let activeBuild = null;

  function applyFilters() {
    spellCards.forEach(card => {
      const school = card.dataset.school;
      const build = card.dataset.build;

      const schoolMatch = activeSchool === 'all' || school === activeSchool;
      const buildMatch = !activeBuild || build === activeBuild;

      if (schoolMatch && buildMatch) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });

    // Hide empty school sections
    schoolSections.forEach(section => {
      const visibleCards = section.querySelectorAll('.spell-card:not(.hidden)');
      section.style.display = visibleCards.length > 0 ? '' : 'none';
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      if (['all', 'lux', 'dark', 'motus'].includes(filter)) {
        // School filter
        document.querySelectorAll('.filter-btn[data-filter="all"], .filter-btn[data-filter="lux"], .filter-btn[data-filter="dark"], .filter-btn[data-filter="motus"]')
          .forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeSchool = filter;
      } else {
        // Build filter — toggle
        if (activeBuild === filter) {
          activeBuild = null;
          btn.classList.remove('active');
        } else {
          document.querySelectorAll('.filter-btn[data-filter="built"], .filter-btn[data-filter="buildable"], .filter-btn[data-filter="emerging"]')
            .forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          activeBuild = filter;
        }
      }

      applyFilters();
    });
  });
})();

// ── Reality Check — Populate Spell Lists ──
(function initRealityCheck() {
  const spells = {
    built: [
      { name: 'Ward of the Perimeter', school: 'lux' },
      { name: 'Shield of Zero Trust', school: 'lux' },
      { name: 'Sanctum Seal', school: 'lux' },
      { name: 'Veil of Transit', school: 'lux' },
      { name: 'Beacon of Anomaly', school: 'lux' },
      { name: 'Restoration Rite', school: 'lux' },
      { name: 'Circle of Least Privilege', school: 'lux' },
      { name: 'Mirror of Deception', school: 'lux' },
      { name: 'Glyph of Authentication', school: 'lux' },
      { name: 'Aura of Compliance', school: 'lux' },
      { name: 'Chrono Seal', school: 'lux' },
      { name: 'Purification Rite', school: 'lux' },
      { name: 'Shadow Walk', school: 'dark' },
      { name: 'Curse Reversal', school: 'dark' },
      { name: 'Void Gaze', school: 'dark' },
      { name: 'Soul Bind', school: 'dark' },
      { name: 'Poison Oracle', school: 'dark' },
      { name: 'Eclipse Protocol', school: 'dark' },
      { name: 'Blood Pact Audit', school: 'dark' },
      { name: 'Obsidian Eye', school: 'dark' },
      { name: 'Flow State', school: 'motus' },
      { name: 'Pattern Weave', school: 'motus' },
    ],
    buildable: [
      { name: 'Whisper Net', school: 'lux' },
      { name: 'Hex Trace', school: 'dark' },
      { name: 'Phantom Hunt', school: 'dark' },
      { name: 'Necromancy of Dead Process', school: 'dark' },
      { name: 'Serpent\'s Tongue', school: 'dark' },
      { name: 'Wraith Trap', school: 'dark' },
      { name: 'Shift of Shape', school: 'motus' },
      { name: 'Temporal Sight', school: 'motus' },
      { name: 'Cascade Break', school: 'motus' },
      { name: 'Evolution Sigil', school: 'motus' },
      { name: 'Resonance Lock', school: 'motus' },
      { name: 'Chaos Communion', school: 'motus' },
      { name: 'Living Grimoire', school: 'motus' },
      { name: 'Outlier Sense', school: 'motus' },
    ],
    emerging: [
      { name: 'Emergence Ward', school: 'motus' },
      { name: 'Fractal Shield', school: 'motus' },
      { name: 'Mycelium Network', school: 'motus' },
    ],
  };

  function renderList(containerId, countId, items) {
    const container = document.getElementById(containerId);
    const countEl = document.getElementById(countId);
    if (!container) return;

    countEl && (countEl.textContent = `${items.length} Spells`);

    items.forEach(({ name, school }) => {
      const div = document.createElement('div');
      div.className = 'tier-spell-item';
      div.innerHTML = `
        <span>${name}</span>
        <span class="spell-school-dot ${school}-dot" title="${school.charAt(0).toUpperCase() + school.slice(1)}"></span>
      `;
      container.appendChild(div);
    });
  }

  renderList('built-list', 'built-count', spells.built);
  renderList('buildable-list', 'buildable-count', spells.buildable);
  renderList('emerging-list', 'emerging-count', spells.emerging);
})();

// ── Smooth anchor scroll with offset for fixed nav ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Rune stagger animation ──
document.querySelectorAll('.hero-rune').forEach((rune, i) => {
  rune.style.animationDelay = `${i * -4}s`;
});
