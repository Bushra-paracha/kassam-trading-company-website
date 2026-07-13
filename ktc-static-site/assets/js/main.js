(() => {
  'use strict';

  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('nav-open', open);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      });
    });
  }

  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav] a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path) link.setAttribute('aria-current', 'page');
  });

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 })
    : null;

  document.querySelectorAll('.reveal').forEach((el) => {
    if (observer) observer.observe(el);
    else el.classList.add('is-visible');
  });

  document.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach((item) => item.classList.remove('btn-primary'));
      button.classList.add('btn-primary');
      document.querySelectorAll('[data-product]').forEach((card) => {
        const match = filter === 'all' || card.dataset.product === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });
})();
