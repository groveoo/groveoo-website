// =============================================
// ARMORY AI AGENCY — MAIN JAVASCRIPT
// Scroll reveals, nav, hamburger, interactions
// =============================================

(function () {
  'use strict';

  // ─── DOM READY ─────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initScrollReveal();
    initHamburger();
    initServiceCardMouse();
    initFAQ();
    initPricingToggle();
    initProjectFilter();
    initFormInteractions();
    initCursorGlow();
    initPageProgress();
    initCountUpAnimations();
    initWorkCardHover();
    initTickerPause();
    initProductTabs();
  });

  // ─── NAVBAR ────────────────────────────────
  function initNav() {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    const handleScroll = () => {
      const scrolled = window.scrollY > 40;
      nav.classList.toggle('scrolled', scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on load

    // Set active nav link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // ─── HAMBURGER / MOBILE MENU ───────────────
  function initHamburger() {
    const btn = document.getElementById('hamburger');
    const overlay = document.getElementById('mobileOverlay');
    if (!btn || !overlay) return;

    btn.addEventListener('click', () => {
      const open = btn.classList.toggle('open');
      overlay.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on link click
    overlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        btn.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on overlay background click
    overlay.addEventListener('click', e => {
      if (e.target === overlay) {
        btn.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ─── SCROLL REVEAL (IntersectionObserver) ──
  function initScrollReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    });

    els.forEach(el => observer.observe(el));
  }

  // ─── SERVICE CARD MOUSE GLOW ───────────────
  function initServiceCardMouse() {
    document.querySelectorAll('.feature-card, .service-card-hover').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mx', `${x}%`);
        card.style.setProperty('--my', `${y}%`);
      });
    });
  }

  // ─── FAQ ACCORDION ─────────────────────────
  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');

        // Close all
        document.querySelectorAll('.faq-item.open').forEach(openItem => {
          openItem.classList.remove('open');
        });

        // Toggle clicked
        if (!isOpen) item.classList.add('open');
      });
    });

    // Open first by default
    const first = document.querySelector('.faq-item');
    if (first) first.classList.add('open');
  }

  // ─── PRICING TOGGLE ────────────────────────
  function initPricingToggle() {
    const track = document.querySelector('.toggle-track');
    if (!track) return;

    let isAnnual = false;
    const prices = {
      monthly: document.querySelectorAll('[data-monthly]'),
      annual: document.querySelectorAll('[data-annual]'),
    };

    track.addEventListener('click', () => {
      isAnnual = !isAnnual;
      track.classList.toggle('on', isAnnual);

      document.querySelectorAll('.pricing-toggle-label').forEach((lbl, i) => {
        lbl.classList.toggle('active', isAnnual ? i === 1 : i === 0);
      });

      // Animate price change
      document.querySelectorAll('.pricing-price').forEach(el => {
        const monthly = el.dataset.monthly;
        const annual = el.dataset.annual;
        if (!monthly || !annual) return;

        el.style.transition = 'opacity 0.2s';
        el.style.opacity = '0';
        setTimeout(() => {
          el.querySelector('.price-amount').textContent = isAnnual ? annual : monthly;
          el.style.opacity = '1';
        }, 200);
      });
    });

    // Set initial active label
    document.querySelector('.pricing-toggle-label')?.classList.add('active');
  }

  // ─── PRODUCT TABS ──────────────────────────
  function initProductTabs() {
    const tabs = document.querySelectorAll('.product-tab');
    const panels = document.querySelectorAll('.product-panel');
    if (!tabs.length || !panels.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        
        // Add active to clicked
        tab.classList.add('active');
        const targetId = tab.dataset.target;
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) targetPanel.classList.add('active');
      });
    });
  }

  // ─── PROJECT FILTER ────────────────────────
  function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        document.querySelectorAll('.project-card, .work-card[data-category]').forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.opacity = '1';
            card.style.transform = '';
            card.style.pointerEvents = '';
          } else {
            card.style.opacity = '0.3';
            card.style.transform = 'scale(0.97)';
            card.style.pointerEvents = 'none';
          }
        });
      });
    });
  }

  // ─── FORM INTERACTIONS ─────────────────────
  function initFormInteractions() {
    const form = document.querySelector('.contact-form form, #contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('.form-submit');
      if (!submitBtn) return;

      // Simulate submission
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      await new Promise(r => setTimeout(r, 1800));

      submitBtn.textContent = '✓ Message Sent';
      submitBtn.style.background = '#1a1a1a';

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        form.reset();
      }, 3000);
    });

    // Label float effect
    form.querySelectorAll('.form-input, .form-textarea').forEach(input => {
      input.addEventListener('focus', () => {
        input.closest('.form-group')?.classList.add('focused');
      });
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.closest('.form-group')?.classList.remove('focused');
        }
      });
    });
  }

  // ─── CURSOR GLOW (desktop only) ───────────
  function initCursorGlow() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.style.cssText = `
      position: fixed;
      width: 300px; height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0,153,255,0.045) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
      transform: translate(-50%, -50%);
      transition: left 0.06s, top 0.06s;
      will-change: left, top;
    `;
    document.body.appendChild(glow);

    let rafId;
    let mouseX = 0, mouseY = 0;

    window.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function updateGlow() {
      glow.style.left = mouseX + 'px';
      glow.style.top = mouseY + 'px';
      rafId = requestAnimationFrame(updateGlow);
    }
    updateGlow();
  }

  // ─── PAGE PROGRESS BAR ────────────────────
  function initPageProgress() {
    const bar = document.createElement('div');
    bar.className = 'page-progress';
    document.body.insertAdjacentElement('afterbegin', bar);

    const update = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const prog = docH > 0 ? (window.scrollY / docH) * 100 : 0;
      bar.style.width = prog + '%';
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // ─── COUNT-UP ANIMATION ───────────────────
  function initCountUpAnimations() {
    const countEls = document.querySelectorAll('[data-count]');
    if (!countEls.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const duration = 1600;
        const start = performance.now();

        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          const current = Math.round(eased * target * 10) / 10;
          el.textContent = prefix + (Number.isInteger(target) ? Math.round(current) : current.toFixed(1)) + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    countEls.forEach(el => observer.observe(el));
  }

  // ─── WORK CARD HOVER (tilt effect) ────────
  function initWorkCardHover() {
    document.querySelectorAll('.work-card, .project-card, .article-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        card.style.transform = `translateY(-4px) rotateX(${-dy * 2}deg) rotateY(${dx * 2}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.32s, box-shadow 0.32s';
        setTimeout(() => { card.style.transition = ''; }, 400);
      });
    });
  }

  // ─── TICKER PAUSE ON HOVER ────────────────
  function initTickerPause() {
    document.querySelectorAll('.ticker-inner, .marquee-inner').forEach(ticker => {
      ticker.addEventListener('mouseenter', () => {
        ticker.style.animationPlayState = 'paused';
      });
      ticker.addEventListener('mouseleave', () => {
        ticker.style.animationPlayState = 'running';
      });
    });
  }

  // ─── SMOOTH PAGE TRANSITIONS ──────────────
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;

    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.22s ease';
      setTimeout(() => { window.location.href = href; }, 220);
    });
  });

  // Fade in on page load
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.35s ease';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.style.opacity = '1';
      });
    });
  });

})();
