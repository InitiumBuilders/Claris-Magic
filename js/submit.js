// ============================================
// SUBMIT.JS — Community spell submissions via localStorage
// ============================================

(function () {
  const STORAGE_KEY = 'claris_community_spells';

  function getSubmissions() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveSubmission(spell) {
    const submissions = getSubmissions();
    submissions.unshift(spell);
    // Keep max 50
    if (submissions.length > 50) submissions.splice(50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function getRatingLabel(rating) {
    const map = { built: '🟢 BUILT', buildable: '🔵 BUILDABLE', emerging: '🟡 EMERGING', arcane: '🔴 ARCANE' };
    return map[rating] || rating;
  }

  function getSchoolLabel(school) {
    const map = { lux: '✨ Lux Lore', shadow: '🌑 Dark Arts', motus: '🌀 Motus Magic', wicked: '🔴 Wicked', claw: '🦅 Claw Magic' };
    return map[school] || school;
  }

  function renderCommunitySpells() {
    const container = document.getElementById('community-spells');
    if (!container) return;

    const submissions = getSubmissions();

    if (submissions.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding: 2rem; color: var(--text-muted); font-style: italic;">
          No community spells yet. Be the first mage to submit one.
        </div>
      `;
      return;
    }

    container.innerHTML = submissions.map(s => `
      <div class="community-spell-card">
        <div class="spell-name">${escapeHtml(s.name)}</div>
        <div style="display:flex; gap:0.35rem; margin-bottom:0.5rem; flex-wrap:wrap;">
          <span class="badge badge-${s.school === 'wicked' ? 'wicked' : s.school === 'lux' ? 'lux' : s.school === 'shadow' ? 'shadow' : 'motus'}">${getSchoolLabel(s.school)}</span>
          <span class="badge badge-${s.rating}">${getRatingLabel(s.rating)}</span>
        </div>
        <p style="font-size:0.875rem; color:var(--text-secondary); margin:0 0 0.5rem;">${escapeHtml(s.desc)}</p>
        <div class="spell-mapping"><span>→ </span>${escapeHtml(s.mapping || 'Unknown mapping')}</div>
        <div class="community-meta">Submitted ${formatDate(s.submittedAt)} · Anonymous mage</div>
      </div>
    `).join('');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function initSubmitForm() {
    const form = document.getElementById('spell-submit-form');
    const successEl = document.getElementById('submit-success');
    const submitAnotherBtn = document.getElementById('submit-another');

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const spell = {
        name: form.querySelector('#spell-name').value.trim(),
        school: form.querySelector('#spell-school').value,
        rating: form.querySelector('#spell-rating').value,
        mapping: form.querySelector('#spell-mapping').value.trim(),
        desc: form.querySelector('#spell-desc').value.trim(),
        submittedAt: new Date().toISOString(),
      };

      if (!spell.name || !spell.desc) {
        alert('Please fill in the spell name and description.');
        return;
      }

      saveSubmission(spell);

      form.style.display = 'none';
      if (successEl) successEl.style.display = 'block';
      renderCommunitySpells();
    });

    if (submitAnotherBtn) {
      submitAnotherBtn.addEventListener('click', () => {
        form.reset();
        form.style.display = 'block';
        if (successEl) successEl.style.display = 'none';
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initSubmitForm();
      renderCommunitySpells();
    });
  } else {
    initSubmitForm();
    renderCommunitySpells();
  }
})();
