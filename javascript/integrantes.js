/* =========================================================
   PÁGINA INTEGRANTES — filtros (equipe, nível, função)

   Os cartões já foram desenhados por render.js.
   Aqui só ligamos os filtros (filters.js) e mostramos/escondemos cartões.
   Estado na URL:  ?equipe=orion&nivel=medio&funcao=Marketing
   ========================================================= */

(function () {
  const D = window.NUCLEO_DATA;
  const U = window.NUCLEO_UTIL;
  const F = window.NUCLEO_FILTERS;
  const filtersBox = document.querySelector('#filters');
  const list = document.querySelector('[data-list="members"]');

  if (!D || !U || !F || !filtersBox || !list) return;

  const cards = Array.from(list.querySelectorAll('.mem-card'));
  const noResults = document.querySelector('#no-results');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const roles = [...new Set((D.members || []).flatMap(U.roles))];

  const groups = [
    {
      key: 'equipe', label: 'Equipe', all: 'Todas as equipes',
      options: Object.entries(D.teams).map(([v, t]) => ({ v, l: t.name }))
    },
    {
      key: 'nivel', label: 'Nível', all: 'Todos os níveis',
      options: Object.entries(D.levels || {}).map(([v, l]) => ({ v, l }))
    },
    {
      key: 'funcao', label: 'Função', all: 'Todas as funções',
      options: roles.map((r) => ({ v: r, l: r }))
    }
  ];

  const filters = F.create(filtersBox, groups, {
    noun: 'integrantes',
    total: cards.length,

    onChange(s) {
      let shown = 0;

      cards.forEach((c) => {
        const ok =
          (!s.equipe || c.dataset.team === s.equipe) &&
          (!s.nivel || c.dataset.level === s.nivel) &&
          (!s.funcao || c.dataset.roles.split('|').includes(s.funcao));

        c.hidden = !ok;
        if (ok) shown++;
      });

      if (noResults) noResults.hidden = shown > 0;
      return shown;
    }
  });


  /* ---------- vai até o integrante clicado (#id) ---------- */

  function goToMember() {
    const id = decodeURIComponent(location.hash.slice(1));
    const target = id && document.getElementById(id);

    if (!target || !target.classList.contains('mem-card')) return;

    if (target.hidden) filters.reset(false);

    setTimeout(() => {
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      target.classList.add('is-target');
      setTimeout(() => target.classList.remove('is-target'), 3200);
    }, 80);
  }

  goToMember();
  window.addEventListener('hashchange', goToMember);
})();
