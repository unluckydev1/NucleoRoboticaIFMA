/* =========================================================
   PÁGINA GALERIA — filtro por ANO (único filtro) sobre o carrossel
   O carrossel e o visualizador vêm de render.js / widgets.js;
   as fotos vêm de data/data.js (lista "gallery").
   Estado na URL: ?ano=2025
   ========================================================= */

(function () {
  const D = window.NUCLEO_DATA;
  const F = window.NUCLEO_FILTERS;
  const box = document.querySelector('[data-list="gallery"]');
  const filtersBox = document.querySelector('#filters');
  const noResults = document.querySelector('#no-results');

  if (!D || !F || !box || !filtersBox) return;

  const api = box._gallery;
  if (!api) return;

  const years = [...new Set(api.items.map((g) => String(g.year || '')).filter(Boolean))]
    .sort()
    .reverse();

  F.create(filtersBox, [
    {
      key: 'ano', label: 'Ano', all: 'Todos os anos',
      options: years.map((y) => ({ v: y, l: y }))
    }
  ], {
    noun: 'fotos',
    total: api.items.length,

    onChange(s) {
      const shown = api.apply((g) => !s.ano || String(g.year) === s.ano);
      if (noResults) noResults.hidden = shown > 0;
      return shown;
    }
  });
})();
