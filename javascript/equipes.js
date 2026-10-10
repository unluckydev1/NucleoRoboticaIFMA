/* =========================================================
   SEÇÃO "EQUIPES" DA HOME

   Um painel por equipe, lidos de data/data.js (D.teams). Cada painel
   leva o efeito da própria equipe (NUCLEO_FX: estrelas ou circuitos).
   Os painéis surgem e os efeitos só rodam enquanto a seção está na tela.
   O destaque no hover é feito em styles/equipes.css.
   ========================================================= */

(function () {
  const D = window.NUCLEO_DATA;
  const host = document.querySelector('#eq-split');

  if (!D || !host) return;

  const { el } = window.NUCLEO_DOM;
  const root = document.body.dataset.root || '';
  const effects = window.NUCLEO_FX || {};

  function panel([id, team], index) {
    const link = el('a', 'eq-panel');
    link.href = root + team.page;
    link.dataset.team = id;
    link.style.setProperty('--team', team.color);

    const content = el('div', 'eq-content');
    const logo = el('img', 'eq-logo');
    logo.src = root + team.logo;
    logo.alt = '';
    content.append(
      logo,
      el('h3', '', team.name),
      el('p', '', team.summary),
      el('span', 'eq-cta', 'Conhecer a equipe')
    );

    const number = el('span', 'eq-index', String(index + 1).padStart(2, '0'));
    number.setAttribute('aria-hidden', 'true');

    link.append(number, content);

    if (effects[team.effect]) {
      const isCanvas = team.effect === 'circuit';
      const layer = el(isCanvas ? 'canvas' : 'div', isCanvas ? 'eq-effect' : 'eq-effect starfield');
      layer.setAttribute('aria-hidden', 'true');
      link.prepend(layer);
    }

    return link;
  }

  const entries = Object.entries(D.teams);
  entries.forEach((entry, index) => host.appendChild(panel(entry, index)));

  /* os efeitos medem o próprio elemento, então só entram depois que ele está na página */
  entries.forEach(([id, team]) => {
    const layer = host.querySelector(`[data-team="${id}"] .eq-effect`);
    if (layer) effects[team.effect](layer);
  });

  /* is-seen: entrada dos painéis (uma vez). is-live: efeitos animando. */
  function watch(visible) {
    host.classList.toggle('is-live', visible);
    if (visible) host.classList.add('is-seen');
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => watch(entry.isIntersecting), { threshold: 0.3 }).observe(host);
  } else {
    watch(true);
  }
})();
