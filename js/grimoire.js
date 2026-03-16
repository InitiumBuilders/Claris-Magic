// ============================================
// GRIMOIRE.JS — Spell grid rendering + filtering
// ============================================

(function () {
  function getRatingBadge(rating) {
    const map = {
      built: { label: '🟢 BUILT', cls: 'badge-built' },
      buildable: { label: '🔵 BUILDABLE', cls: 'badge-buildable' },
      emerging: { label: '🟡 EMERGING', cls: 'badge-emerging' },
      arcane: { label: '🔴 ARCANE', cls: 'badge-arcane' },
    };
    const r = map[rating] || map.built;
    return `<span class="badge ${r.cls}" data-rating="${rating}">${r.label}</span>`;
  }

  function getSchoolBadge(school) {
    const map = {
      lux: { label: '✨ LUX', cls: 'badge-lux' },
      shadow: { label: '🌑 SHADOW', cls: 'badge-shadow' },
      motus: { label: '🌀 MOTUS', cls: 'badge-motus' },
      wicked: { label: '🔴 WICKED', cls: 'badge-wicked' },
      claw: { label: '🦅 CLAW', cls: 'badge-claw' },
    };
    const s = map[school] || map.lux;
    return `<span class="badge ${s.cls}">${s.label}</span>`;
  }

  function renderSpellCard(spell) {
    const schoolClass = `spell-${spell.school}`;
    return `
    <div class="spell-card ${schoolClass}" data-school="${spell.school}" data-rating="${spell.rating}" data-name="${spell.name.toLowerCase()}" data-desc="${(spell.desc + ' ' + spell.mapping).toLowerCase()}">
      <div class="spell-card-header">
        <div class="spell-name">${spell.name}</div>
        <div class="spell-badges">
          ${getRatingBadge(spell.rating)}
          ${getSchoolBadge(spell.school)}
        </div>
      </div>
      <p class="spell-desc">${spell.desc}</p>
      <div class="spell-mapping"><span>→ </span>${spell.mapping}</div>
    </div>
    `;
  }

  function getAllSpells() {
    if (!window.SPELLS) return [];
    const all = [];
    ['lux', 'shadow', 'motus', 'wicked', 'claw'].forEach(school => {
      (window.SPELLS[school] || []).forEach(s => all.push(s));
    });
    return all;
  }

  function initGrimoire() {
    const container = document.getElementById('spell-grid');
    const countEl = document.getElementById('spell-count');
    const searchInput = document.getElementById('spell-search');
    const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');

    if (!container) return;

    const allSpells = getAllSpells();
    let activeSchool = 'all';
    let activeRating = 'all';
    let searchQuery = '';

    // Read URL param for pre-filter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('school')) activeSchool = urlParams.get('school');

    function updateFilterButtons() {
      filterBtns.forEach(btn => {
        const type = btn.dataset.filterType;
        const val = btn.dataset.filter;
        btn.classList.remove('active', 'lux-active', 'shadow-active', 'motus-active', 'wicked-active');

        if (type === 'school' && val === activeSchool) {
          const cls = val === 'all' ? 'active' :
                     val === 'lux' ? 'lux-active' :
                     val === 'shadow' ? 'shadow-active' :
                     val === 'motus' ? 'motus-active' : 'wicked-active';
          btn.classList.add(cls);
        } else if (type === 'rating' && val === activeRating) {
          btn.classList.add('active');
        }
      });
    }

    function filterAndRender() {
      const filtered = allSpells.filter(s => {
        const schoolMatch = activeSchool === 'all' || s.school === activeSchool;
        const ratingMatch = activeRating === 'all' || s.rating === activeRating;
        const q = searchQuery.trim().toLowerCase();
        const textMatch = !q || s.name.toLowerCase().includes(q) ||
          s.desc.toLowerCase().includes(q) ||
          s.mapping.toLowerCase().includes(q) ||
          (s.category || '').toLowerCase().includes(q);
        return schoolMatch && ratingMatch && textMatch;
      });

      if (countEl) {
        countEl.textContent = `Showing ${filtered.length} of ${allSpells.length} spells`;
      }

      if (filtered.length === 0) {
        container.innerHTML = `<div class="no-results">No spells match your search. The magic has not been discovered yet.</div>`;
        return;
      }

      container.innerHTML = filtered.map(renderSpellCard).join('');
    }

    // Filter button events
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.filterType;
        const val = btn.dataset.filter;
        if (type === 'school') activeSchool = val;
        if (type === 'rating') activeRating = val;
        updateFilterButtons();
        filterAndRender();
      });
    });

    // Search
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        filterAndRender();
      });
    }

    updateFilterButtons();
    filterAndRender();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGrimoire);
  } else {
    initGrimoire();
  }
})();
