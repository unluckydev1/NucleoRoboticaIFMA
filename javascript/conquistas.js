/* =========================================================
   PÁGINA CONQUISTAS — histórico completo, agrupado por ano

   Lê data/data.js (lista "achievements"). Filtros: equipe, ano e
   competição. Mostra uma "página" por vez (settings.achievementsPageSize)
   com botão "Mostrar mais". Estado na URL: ?equipe=orion&ano=2025&competicao=obr
   ========================================================= */

(function () {
  const D = window.NUCLEO_DATA;
  const U = window.NUCLEO_UTIL;
  const F = window.NUCLEO_FILTERS;
  const { el } = window.NUCLEO_DOM;
  const host = document.querySelector('#ach-list');
  const filtersBox = document.querySelector('#filters');
  const noResults = document.querySelector('#no-results');

  if (!D || !U || !F || !host || !filtersBox) return;

  const all = U.byYearDesc(D.achievements || []);   // mais recentes primeiro
  const pageSize = U.limitOf('achievementsPageSize', 10);
  let limit = pageSize;
  let matches = all;

  const moreBtn = el('button', 'btn btn-ghost list-more-btn', 'Mostrar mais');
  moreBtn.type = 'button';
  moreBtn.hidden = true;
  host.insertAdjacentElement('afterend', moreBtn);
  moreBtn.addEventListener('click', () => {
    limit += pageSize;
    render();
  });

  /* desenha os `limit` primeiros resultados, com um título por ano */
  function render() {
    host.replaceChildren();
    const shown = matches.slice(0, limit);
    let list = null;
    let current = null;

    shown.forEach((a) => {
      const year = U.latestYear(a) || '';
      if (list === null || year !== current) {
        current = year;
        const group = el('section', 'ach-year');
        group.appendChild(el('h2', 'ach-year-title', year ? String(year) : 'Sem data'));
        list = el('ul', 'timeline');
        group.appendChild(list);
        host.appendChild(group);
      }
      list.appendChild(U.achievementItem(a, { showTeam: true }));
    });

    const rest = matches.length - shown.length;
    moreBtn.hidden = rest <= 0;
    moreBtn.textContent = `Mostrar mais (${Math.max(rest, 0)} ${rest === 1 ? 'restante' : 'restantes'})`;
  }

  /* ---------- filtros ---------- */

  const years = [...new Set(all.map(U.latestYear).filter(Boolean))].sort().reverse().map(String);
  const usedComps = [...new Set(all.map((a) => a.competition).filter((id) => U.compIndex[id]))];

  const groups = [
    {
      key: 'equipe', label: 'Equipe', all: 'Todas as equipes',
      options: Object.entries(D.teams).map(([v, t]) => ({ v, l: t.name }))
    },
    {
      key: 'ano', label: 'Ano', all: 'Todos os anos',
      options: years.map((y) => ({ v: y, l: y }))
    },
    {
      key: 'competicao', label: 'Competição', all: 'Todas as competições',
      options: usedComps.map((id) => ({ v: id, l: U.compIndex[id].short || U.compIndex[id].name }))
    }
  ];

  F.create(filtersBox, groups, {
    noun: 'conquistas',
    total: all.length,

    onChange(s) {
      limit = pageSize;
      matches = all.filter((a) =>
        (!s.equipe || U.toArray(a.team || a.teams || []).includes(s.equipe)) &&
        (!s.ano || String(U.latestYear(a)) === s.ano) &&
        (!s.competicao || a.competition === s.competicao)
      );

      render();
      if (noResults) noResults.hidden = matches.length > 0;
      return matches.length;
    }
  });
})();
