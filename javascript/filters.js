/* =========================================================
   FILTROS COMPARTILHADOS (Integrantes e Competições)

   Uma linha de seletores compactos + contagem + "limpar".
   Uso:
     const f = NUCLEO_FILTERS.create(caixa, grupos, {
       noun: 'integrantes', total: 10,
       onChange(state) { ...mostra/esconde...; return quantosAparecem; }
     });

   grupo = { key, label, all, options: [{ v, l }] }
   Grupos sem opções são ignorados (ex.: ano, enquanto nenhuma
   competição tiver "year" preenchido).
   Estado na URL: ?equipe=orion&ano=2025 ...
   ========================================================= */

window.NUCLEO_FILTERS = (function () {

  function create(box, allGroups, opts) {
    const groups = allGroups.filter((g) => g.options.length);
    const state = {};
    const selects = {};
    const wraps = {};

    const params = new URLSearchParams(location.search);

    /* lê a URL (valores inválidos são ignorados) */
    groups.forEach((g) => {
      const v = params.get(g.key) || '';
      state[g.key] = g.options.some((o) => o.v === v) ? v : '';
    });

    /* seletores */
    groups.forEach((g) => {
      const wrap = document.createElement('label');
      wrap.className = 'f-select';

      const sel = document.createElement('select');
      sel.setAttribute('aria-label', `Filtrar por ${g.label.toLowerCase()}`);

      [{ v: '', l: g.all }, ...g.options].forEach((o) => {
        const opt = document.createElement('option');
        opt.value = o.v;
        opt.textContent = o.l;
        sel.appendChild(opt);
      });

      sel.value = state[g.key];
      sel.addEventListener('change', () => {
        state[g.key] = sel.value;
        apply(true);
      });

      wrap.appendChild(sel);
      box.appendChild(wrap);

      selects[g.key] = sel;
      wraps[g.key] = wrap;
    });

    /* contagem + limpar */
    const status = document.createElement('div');
    status.className = 'f-status';

    const count = document.createElement('span');
    count.setAttribute('aria-live', 'polite');

    const clear = document.createElement('button');
    clear.type = 'button';
    clear.className = 'f-clear';
    clear.textContent = 'Limpar';
    clear.addEventListener('click', () => reset(true));

    status.append(count, clear);
    box.appendChild(status);


    function apply(updateUrl) {
      const shown = opts.onChange(state);
      const active = groups.some((g) => state[g.key]);

      groups.forEach((g) => {
        wraps[g.key].classList.toggle('is-active', Boolean(state[g.key]));
      });

      count.textContent = `${shown} de ${opts.total} ${opts.noun}`;
      clear.hidden = !active;

      if (updateUrl) {
        const q = new URLSearchParams();
        groups.forEach((g) => state[g.key] && q.set(g.key, state[g.key]));
        const context = params.get('context');
        if (context) q.set('context', context);

        /* em file:// alguns navegadores bloqueiam; o filtro segue funcionando */
        try {
          history.replaceState(null, '', location.pathname + (q.toString() ? `?${q}` : ''));
        } catch (e) { /* ignora */ }
      }
    }

    function reset(updateUrl) {
      groups.forEach((g) => {
        state[g.key] = '';
        selects[g.key].value = '';
      });
      apply(updateUrl);
    }

    apply(false);

    return { state, reset };
  }

  return { create };
})();
