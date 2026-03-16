// ============================================
// NAVIGATION.JS — Nav, mobile menu, active states
// ============================================

(function () {
  function initNavigation() {
    const nav = document.querySelector('.nav');
    const hamburger = document.querySelector('.nav-hamburger');
    const mobileNav = document.querySelector('.nav-mobile');

    // Scroll effect
    if (nav) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }, { passive: true });
    }

    // Hamburger toggle
    if (hamburger && mobileNav) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open');
      });

      // Close on link click
      mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('open');
          mobileNav.classList.remove('open');
        });
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileNav.contains(e.target)) {
          hamburger.classList.remove('open');
          mobileNav.classList.remove('open');
        }
      });
    }

    // Active link highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .nav-mobile-links a').forEach(link => {
      const linkPath = link.getAttribute('href') || '';
      if (
        linkPath === currentPath ||
        (currentPath === '' && linkPath === 'index.html') ||
        (currentPath === 'index.html' && linkPath === 'index.html')
      ) {
        link.classList.add('active');
      }
    });
  }

  // Inject shared nav HTML
  function injectNav() {
    const navEl = document.getElementById('nav-placeholder');
    if (!navEl) return;

    navEl.innerHTML = `
    <nav class="nav">
      <div class="nav-inner">
        <a href="index.html" class="nav-logo">
          <span class="sigil" id="claris-sigil" title="Click 7 times...">🔮</span>
          <span>Claris Magic</span>
        </a>
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="grimoire.html">Grimoire</a></li>
          <li><a href="wicked.html">Wicked Problems</a></li>
          <li><a href="claris.html">Claris AI</a></li>
          <li><a href="resources.html">Resources</a></li>
          <li><a href="tips.html">⚡ Tips</a></li>
          <li><a href="claw.html" style="color:#ff5555;">🦞 Claw Magic</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="submit.html" class="nav-cta">Submit Spell</a></li>
        </ul>
        <button class="nav-hamburger" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
    <nav class="nav-mobile">
      <ul class="nav-mobile-links">
        <li><a href="index.html">🏠 Home</a></li>
        <li><a href="grimoire.html">📖 Grimoire</a></li>
        <li><a href="wicked.html">🔴 Wicked Problems</a></li>
        <li><a href="claris.html">🔍 Claris AI</a></li>
        <li><a href="resources.html">📚 Resources</a></li>
        <li><a href="tips.html">⚡ Tips & Hacks</a></li>
        <li><a href="claw.html" style="color:#ff5555;">🦞 Claw Magic</a></li>

        <li><a href="about.html">✨ About</a></li>
        <li><a href="submit.html">✍️ Submit a Spell</a></li>
      </ul>
    </nav>
    `;

    initNavigation();
  }

  // Inject shared footer HTML
  function injectFooter() {
    const footerEl = document.getElementById('footer-placeholder');
    if (!footerEl) return;

    footerEl.innerHTML = `
    <footer class="footer">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>🔮 The Motus Magic System</h3>
          <p>Claris AI's Cybersecurity Grimoire. Mapping the ancient art of security to the language of magic — because mages were always just engineers who refused to be boring.</p>
          <br>
          <p style="font-size:0.8rem; color: var(--text-muted);">An open source project by Initium Builders & AVARI.</p>
        </div>
        <div class="footer-col">
          <h4>The Grimoire</h4>
          <ul>
            <li><a href="grimoire.html">All Spells</a></li>
            <li><a href="grimoire.html?school=lux">✨ Lux Lore</a></li>
            <li><a href="grimoire.html?school=shadow">🌑 Dark Arts</a></li>
            <li><a href="grimoire.html?school=motus">🌀 Motus Magic</a></li>
            <li><a href="wicked.html">🔴 Wicked Problems</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Learn</h4>
          <ul>
            <li><a href="resources.html">Free Resources</a></li>
            <li><a href="tips.html">⚡ Tips & Hacks</a></li>
            <li><a href="resources.html#training">Training Platforms</a></li>
            <li><a href="resources.html#tools">Free Tools</a></li>
            <li><a href="claris.html">Claris AI</a></li>
            <li><a href="about.html">About</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contribute</h4>
          <ul>
            <li><a href="submit.html">Submit a Spell</a></li>
            <li><a href="https://github.com/initium-builders/claris-magic" target="_blank" rel="noopener">GitHub</a></li>
            <li><a href="CONTRIBUTING.md" target="_blank">Contributing Guide</a></li>
            <li><a href="LICENSE" target="_blank">MIT License</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 Initium Builders · Claris AI · AVARI 🔥 · MIT License</p>
        <p>Built with 🔮 and genuine belief that security should be beautiful.</p>
        <span class="footer-fox" id="footer-fox" title="...">🦊</span>
      </div>
    </footer>
    `;
  }

  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectNav();
      injectFooter();
    });
  } else {
    injectNav();
    injectFooter();
  }
})();
