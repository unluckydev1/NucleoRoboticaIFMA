/* =========================================================
   PÁGINA COMPETIÇÕES — grade de cartões + filtros (equipe, ano, categoria)

   Lê data/data.js (lista "competitions"). Cada cartão leva a
   competicao.html?c=ID. Estado na URL: ?equipe=orion&ano=2025&categoria=sumo
   ========================================================= */

(function () {
  const D = window.NUCLEO_DATA;
  const U = window.NUCLEO_UTIL;
  const F = window.NUCLEO_FILTERS;
  const { el, stagger } = window.NUCLEO_DOM;
  const grid = document.querySelector('#comp-grid');
  const filtersBox = document.querySelector('#filters');
  const noResults = document.querySelector('#no-results');

  if (!D || !U || !F || !grid || !filtersBox) return;

  const comps = U.byYearDesc(D.competitions || []);   // mais recentes primeiro
  const pageSize = U.limitOf('competitionsPageSize', 12);
  let limit = pageSize;
  const cats = D.categories || {};

  /* ---------- cartão: foto em cima; Nome / Categoria embaixo ---------- */

  function card(c) {
    const a = el('article', 'cp-card');
    const link = el('a', 'cp-main-link');
    link.href = U.compHref(c);
    link.setAttribute('aria-label', `${c.name} — ver detalhes`);

    const media = el('div', 'cp-media');
    const cover = c.cover || (U.compImages(c)[0] || {}).src;

    if (cover) {
      const img = el('img');
      img.src = U.root + cover;
      img.alt = '';
      img.loading = 'lazy';
      media.appendChild(img);
    } else {
      media.appendChild(el('div', 'cp-ph', c.short || c.name));
    }

    const info = el('div', 'cp-info');

    const rows = [
      ['Nome', c.short || c.name],
      ['Categoria', U.compCategories(c).map((k) => cats[k] || k).join(', ') || '—']
    ];
    const years = U.compYears(c);
    if (years.length) rows.push(['Ano', years.join(' · ')]);

    rows.forEach(([k, v]) => {
      const row = el('div', 'cp-row');
      row.append(el('b', '', k), el('span', '', v));
      info.appendChild(row);
    });

    link.title = c.name;
    link.append(media, info);
    a.appendChild(link);
    U.memberDeck(a, c.teams || c.team, { memberIds: c.members });
    return a;
  }

  const items = comps.map((c) => {
    const node = card(c);
    grid.appendChild(node);
    return { c, node };
  });

  stagger(grid);

  /* "Mostrar mais": a lista cresce de pouco em pouco, em vez de uma parede de cartões */
  const moreBtn = el('button', 'btn btn-ghost list-more-btn', 'Mostrar mais');
  moreBtn.type = 'button';
  moreBtn.hidden = true;
  grid.insertAdjacentElement('afterend', moreBtn);
  moreBtn.addEventListener('click', () => {
    limit += pageSize;
    refresh();
  });

  let matches = [];

  function refresh() {
    matches.forEach(({ node }, i) => { node.hidden = i >= limit; });
    const rest = matches.length - limit;
    moreBtn.hidden = rest <= 0;
    moreBtn.textContent = `Mostrar mais (${Math.max(rest, 0)} ${rest === 1 ? 'restante' : 'restantes'})`;
  }


  /* ---------- filtros ---------- */

  const usedCats = new Set(comps.flatMap(U.compCategories));
  const years = [...new Set(comps.flatMap(U.compYears))].sort().reverse();

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
      key: 'categoria', label: 'Categoria', all: 'Todas as categorias',
      /* só as categorias que alguma competição realmente usa */
      options: Object.entries(cats)
        .filter(([k]) => usedCats.has(k))
        .map(([v, l]) => ({ v, l }))
    }
  ];

  F.create(filtersBox, groups, {
    noun: 'competições',
    total: items.length,

    onChange(s) {
      limit = pageSize;
      matches = [];

      items.forEach(({ c, node }) => {
        const ok =
          (!s.equipe || U.toArray(c.teams || c.team).includes(s.equipe)) &&
          (!s.ano || U.compYears(c).includes(s.ano)) &&
          (!s.categoria || U.compCategories(c).includes(s.categoria));

        node.hidden = true;
        if (ok) matches.push({ c, node });
      });

      refresh();
      if (noResults) noResults.hidden = matches.length > 0;
      return matches.length;
    }
  });
})();
