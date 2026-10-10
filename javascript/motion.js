/* =========================================================
   MOVIMENTO (motion.js)
   - marca blocos para entrarem suavemente ao rolar (data-reveal)
   - dá sombra ao cabeçalho depois que a página rola
   Listas geradas (data-list) e o painel de equipes têm animação própria.
   ========================================================= */

(function () {
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- cabeçalho ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (reduce || !('IntersectionObserver' in window)) return;

  /* ---------- entrada ao rolar ---------- */
  const SKIP = '[data-list], .eq-split, .rise, script, style';
  const targets = [];

  document.querySelectorAll('main .section > .wrap, main .section > .wrap > .about-grid').forEach((box) => {
    Array.from(box.children).forEach((node) => {
      if (node.matches(SKIP) || node.classList.contains('about-grid')) return;
      targets.push(node);
    });
  });
  document.querySelectorAll('main .about-grid > *, main .pillars > *').forEach((n) => targets.push(n));

  const list = Array.from(new Set(targets));
  if (!list.length) return;

  root.classList.add('js-motion');

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const node = entry.target;
      node.classList.add('is-in');
      io.unobserve(node);
      /* terminada a entrada, o elemento volta ao estilo normal (hover livre) */
      window.setTimeout(() => {
        node.removeAttribute('data-reveal');
        node.classList.remove('is-in');
        node.style.removeProperty('--rd');
      }, 1300);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  list.forEach((node, i) => {
    node.setAttribute('data-reveal', '');
    /* itens vizinhos entram com um pequeno atraso entre si */
    const siblings = node.parentElement ? Array.from(node.parentElement.children).filter((c) => list.includes(c)) : [];
    node.style.setProperty('--rd', `${Math.min(siblings.indexOf(node), 4) * 70}ms`);
    io.observe(node);
  });
})();
