// ============================================
// EASTER-EGGS.JS — Hidden magic for the curious
// ============================================

(function () {
  // ---- 1. Claris Sigil — click 7 times ----
  let sigilClicks = 0;
  let sigilTimeout = null;

  function initSigilEasterEgg() {
    document.addEventListener('click', (e) => {
      const sigil = e.target.closest('#claris-sigil, .claris-avatar');
      if (!sigil) return;

      sigilClicks++;
      clearTimeout(sigilTimeout);
      sigilTimeout = setTimeout(() => { sigilClicks = 0; }, 3000);

      if (sigilClicks >= 7) {
        sigilClicks = 0;
        showFlashMessage('⚔️ THE GUARDIAN WATCHES ⚔️', 2000);
      }
    });
  }

  function showFlashMessage(text, duration = 2000) {
    let overlay = document.getElementById('flash-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'flash-overlay';
      overlay.className = 'flash-overlay';
      overlay.innerHTML = `<div class="flash-message"></div>`;
      document.body.appendChild(overlay);

      overlay.addEventListener('click', () => {
        overlay.classList.remove('show');
      });
    }

    overlay.querySelector('.flash-message').textContent = text;
    overlay.classList.add('show');
    setTimeout(() => overlay.classList.remove('show'), duration);
  }

  // ---- 2. Type "motus" anywhere ----
  let typedBuffer = '';
  const MOTUS_WORD = 'motus';

  function initMotusTyping() {
    document.addEventListener('keydown', (e) => {
      // Ignore when typing in inputs
      if (e.target.matches('input, textarea, select')) return;

      typedBuffer += e.key.toLowerCase();
      if (typedBuffer.length > MOTUS_WORD.length) {
        typedBuffer = typedBuffer.slice(-MOTUS_WORD.length);
      }

      if (typedBuffer === MOTUS_WORD) {
        typedBuffer = '';
        showRuneAnimation();
      }
    });
  }

  function showRuneAnimation() {
    let overlay = document.getElementById('rune-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'rune-overlay';
      overlay.className = 'rune-overlay';
      overlay.innerHTML = `<div class="rune-circle"></div>`;
      document.body.appendChild(overlay);
    }

    overlay.classList.add('show');
    setTimeout(() => overlay.classList.remove('show'), 2000);
  }

  // ---- 3. Hover 🔴 ARCANE for 3 seconds ----
  function initArcaneTooltips() {
    let arcaneTimeout = null;

    document.addEventListener('mouseover', (e) => {
      const arcaneEl = e.target.closest('[data-rating="arcane"], .badge-arcane');
      if (!arcaneEl) return;

      const spellCard = arcaneEl.closest('.spell-card, .wicked-card, .wicked-rating');
      if (!spellCard) return;

      arcaneTimeout = setTimeout(() => {
        let tip = spellCard.querySelector('.arcane-tooltip');
        if (!tip) {
          tip = document.createElement('div');
          tip.className = 'arcane-tooltip';
          tip.textContent = 'Perhaps in your lifetime, mage...';
          // Position relative to card
          spellCard.style.position = 'relative';
          spellCard.appendChild(tip);
        }
        tip.style.opacity = '1';
      }, 3000);
    });

    document.addEventListener('mouseout', (e) => {
      const arcaneEl = e.target.closest('[data-rating="arcane"], .badge-arcane');
      if (!arcaneEl) return;

      clearTimeout(arcaneTimeout);
      const spellCard = arcaneEl.closest('.spell-card, .wicked-card, .wicked-rating');
      if (spellCard) {
        const tip = spellCard.querySelector('.arcane-tooltip');
        if (tip) tip.style.opacity = '0';
      }
    });
  }

  // ---- 4. Footer fox click ----
  function initFooterFox() {
    document.addEventListener('click', (e) => {
      const fox = e.target.closest('#footer-fox');
      if (!fox) return;

      showFlashMessage('🦊 Ember was here. The fox sees everything.', 3000);
    });
  }

  // ---- 5. Submit page "I am the archmage" ----
  function initArchmageConfetti() {
    document.addEventListener('input', (e) => {
      if (!e.target.matches('textarea, #spell-desc')) return;
      if (e.target.value.toLowerCase().includes('i am the archmage')) {
        triggerConfetti();
      }
    });
  }

  function triggerConfetti() {
    const colors = ['#ffd700', '#b829ff', '#00ffcc', '#ff4444', '#ffffff'];
    const count = 80;

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-particle';

      const color = colors[Math.floor(Math.random() * colors.length)];
      const x = Math.random() * 100;
      const dur = (Math.random() * 2 + 1.5).toFixed(1);
      const rot = (Math.random() * 1440 - 720).toFixed(0);
      const size = (Math.random() * 8 + 4).toFixed(0);
      const delay = (Math.random() * 0.5).toFixed(2);

      el.style.cssText = `
        left: ${x}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        --dur: ${dur}s;
        --rot: ${rot}deg;
        animation-delay: ${delay}s;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      `;

      document.body.appendChild(el);
      setTimeout(() => el.remove(), (parseFloat(dur) + parseFloat(delay) + 0.1) * 1000);
    }
  }

  // ---- 6. Tab title cycling runes ----
  function initTitleCycling() {
    const runes = ['ᚠ', 'ᚱ', 'ᚨ', 'ᚷ', 'ᛁ', 'ᛗ', 'ᛟ', 'ᚦ', 'ᛉ', 'ᚲ'];
    const originalTitle = document.title;
    let index = 0;

    setInterval(() => {
      const rune = runes[index % runes.length];
      document.title = `${rune} ${originalTitle} ${rune}`;
      index++;

      // Reset to original every few cycles
      if (index % (runes.length * 2) === 0) {
        document.title = originalTitle;
      }
    }, 10000);
  }

  // ---- 7. Right-click custom context menu ----
  function initContextMenu() {
    let menuEl = null;
    let hideTimeout = null;

    document.addEventListener('contextmenu', (e) => {
      // Create menu element if needed
      if (!menuEl) {
        menuEl = document.createElement('div');
        menuEl.className = 'custom-context-menu';
        menuEl.textContent = '⚔️ The Grimoire cannot be copied. It must be earned.';
        document.body.appendChild(menuEl);
      }

      // Position it
      menuEl.style.left = `${Math.min(e.clientX, window.innerWidth - 350)}px`;
      menuEl.style.top = `${Math.min(e.clientY - 40, window.innerHeight - 60)}px`;
      menuEl.classList.add('show');

      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => menuEl.classList.remove('show'), 1500);

      // Let the real context menu appear too
    });
  }

  // ---- 8. Grimoire bottom scroll secret ----
  function initGrimoireSecret() {
    const secretEl = document.querySelector('.grimoire-bottom-secret');
    if (!secretEl) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          secretEl.classList.add('revealed');
          observer.unobserve(secretEl);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(secretEl);
  }

  // ---- 9. Konami Code → God Mode Matrix Rain ----
  function initKonamiCode() {
    const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let konamiIdx = 0;

    document.addEventListener('keydown', (e) => {
      const expected = KONAMI[konamiIdx];
      if (e.key === expected) {
        konamiIdx++;
        if (konamiIdx === KONAMI.length) {
          konamiIdx = 0;
          triggerGodMode();
        }
      } else {
        konamiIdx = e.key === KONAMI[0] ? 1 : 0;
      }
    });
  }

  function triggerGodMode() {
    let overlay = document.getElementById('godmode-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'godmode-overlay';
      overlay.style.cssText = `
        position:fixed; inset:0; z-index:99999;
        background:rgba(0,0,0,0.92);
        display:flex; flex-direction:column;
        align-items:center; justify-content:center;
        font-family:monospace; overflow:hidden;
        opacity:0; transition:opacity 0.3s;
        pointer-events:none;
      `;

      const canvas = document.createElement('canvas');
      canvas.id = 'matrix-canvas';
      canvas.style.cssText = 'position:absolute; inset:0; width:100%; height:100%;';
      overlay.appendChild(canvas);

      const msg = document.createElement('div');
      msg.style.cssText = `
        position:relative; z-index:2;
        font-size:clamp(1.5rem,4vw,3rem);
        color:#00ff41; font-weight:bold;
        text-shadow:0 0 20px #00ff41, 0 0 40px #00ff41;
        text-align:center; letter-spacing:0.1em;
        font-family:'Fira Code',monospace;
      `;
      msg.innerHTML = '⚡ CHEAT CODE ACTIVATED ⚡<br><span style="font-size:0.6em;opacity:0.8;">GOD MODE</span>';
      overlay.appendChild(msg);
      document.body.appendChild(overlay);
    }

    overlay.style.opacity = '1';

    // Matrix rain
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ᚠᚱᚨᚷᛁᛗᛟ';
    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);

    let animId;
    function drawMatrix() {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff41';
      ctx.font = fontSize + 'px monospace';
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      animId = requestAnimationFrame(drawMatrix);
    }
    drawMatrix();

    setTimeout(() => {
      overlay.style.opacity = '0';
      setTimeout(() => {
        cancelAnimationFrame(animId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }, 300);
    }, 3000);
  }

  // ---- 10. Double-click spell name → "Spell memorized" ----
  function initSpellMemorize() {
    document.addEventListener('dblclick', (e) => {
      const nameEl = e.target.closest('.spell-name, .wicked-spell-name, .claw-spell-name, h3.spell-name, [class*="spell-name"]');
      if (!nameEl) return;

      nameEl.style.transition = 'color 0.2s, text-shadow 0.2s';
      nameEl.style.color = '#fff';
      nameEl.style.textShadow = '0 0 20px #ffd700, 0 0 40px #ffd700';

      let tip = document.createElement('div');
      tip.textContent = 'Spell memorized';
      tip.style.cssText = `
        position:absolute; background:rgba(255,215,0,0.15);
        border:1px solid rgba(255,215,0,0.4);
        color:var(--lux-gold,#ffd700); padding:0.25rem 0.6rem;
        border-radius:6px; font-size:0.75rem; font-family:monospace;
        white-space:nowrap; z-index:999; pointer-events:none;
        animation: fadeUp 1.2s ease forwards;
      `;
      // Position tooltip
      const rect = nameEl.getBoundingClientRect();
      tip.style.top = (rect.top + window.scrollY - 30) + 'px';
      tip.style.left = rect.left + 'px';
      tip.style.position = 'fixed';
      tip.style.top = (rect.top - 30) + 'px';
      document.body.appendChild(tip);

      setTimeout(() => {
        nameEl.style.color = '';
        nameEl.style.textShadow = '';
        tip.remove();
      }, 1200);
    });
  }

  // ---- 11. Resources page: triple-click tool name ----
  function initTripleClickTool() {
    const isResources = window.location.pathname.includes('resources');
    if (!isResources) return;

    const clickMap = new WeakMap();

    document.addEventListener('click', (e) => {
      const nameEl = e.target.closest('.resource-name');
      if (!nameEl) return;

      const now = Date.now();
      const data = clickMap.get(nameEl) || { count: 0, last: 0 };
      if (now - data.last < 500) {
        data.count++;
      } else {
        data.count = 1;
      }
      data.last = now;
      clickMap.set(nameEl, data);

      if (data.count >= 3) {
        data.count = 0;
        clickMap.set(nameEl, data);

        let tip = document.createElement('div');
        tip.textContent = "A mage's favorite tool requires no incantation. Just practice.";
        tip.style.cssText = `
          position:fixed; background:rgba(0,255,204,0.1);
          border:1px solid rgba(0,255,204,0.3); color:#00ffcc;
          padding:0.4rem 0.8rem; border-radius:8px;
          font-size:0.8rem; font-style:italic; font-family:monospace;
          z-index:999; pointer-events:none; max-width:280px;
          box-shadow:0 4px 16px rgba(0,255,204,0.15);
        `;
        const rect = nameEl.getBoundingClientRect();
        tip.style.top = (rect.bottom + 8) + 'px';
        tip.style.left = Math.min(rect.left, window.innerWidth - 300) + 'px';
        document.body.appendChild(tip);
        setTimeout(() => tip.remove(), 2500);
      }
    });
  }

  function init() {
    initSigilEasterEgg();
    initMotusTyping();
    initArcaneTooltips();
    initFooterFox();
    initArchmageConfetti();
    initTitleCycling();
    initContextMenu();
    initGrimoireSecret();
    initKonamiCode();
    initSpellMemorize();
    initTripleClickTool();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
