/* =========================================================
   WIDGETS COMPARTILHADOS (carregar ANTES de render.js)

   NUCLEO_WIDGETS.dots(trilho, { host })
     Bolinhas de posição para QUALQUER carrossel/fileira rolável.
     Os itens são os filhos do trilho (os que estiverem com
     [hidden] são ignorados). Devolve { refresh() }.

   NUCLEO_WIDGETS.lightbox().open(lista, indice)
     Visualizador em tela cheia para ampliar fotos.
     lista = [{ src, caption, label }]  (sem src = espaço reservado)
   ========================================================= */

window.NUCLEO_WIDGETS = (function () {
  const { el } = window.NUCLEO_DOM;


  /* ---------- bolinhas ---------- */

  function dots(track, opts = {}) {
    const MAX_VISIBLE = 5;   // máximo de bolinhas na tela
    const SLOT = 16;         // largura de cada bolinha (igual ao CSS)

    const box = el('div', 'comp-dots');
    const strip = el('div', 'comp-dots-strip');
    box.setAttribute('aria-label', 'Posição no carrossel');
    box.appendChild(strip);

    if (opts.host) opts.host.appendChild(box);
    else track.insertAdjacentElement('afterend', box);

    let buttons = [];
    let total = 0;

    const items = () => Array.from(track.children).filter((n) => !n.hidden);

    function step() {
      const first = items()[0];
      if (!first) return 1;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return first.offsetWidth + gap || 1;
    }

    function current() {
      const max = track.scrollWidth - track.clientWidth - 2;
      if (max > 0 && track.scrollLeft >= max) return total - 1;
      return Math.max(0, Math.min(total - 1, Math.round(track.scrollLeft / step())));
    }

    function build() {
      strip.replaceChildren();
      total = items().length;

      buttons = Array.from({ length: total }, (_, i) => {
        const b = el('button', 'comp-dot');
        b.type = 'button';
        b.setAttribute('aria-label', `Ir para o item ${i + 1} de ${total}`);
        b.addEventListener('click', () =>
          track.scrollTo({ left: i * step(), behavior: 'smooth' })
        );
        strip.appendChild(b);
        return b;
      });

      box.style.width = `${Math.min(MAX_VISIBLE, total) * SLOT}px`;
    }

    function update() {
      /* sem o que rolar, não há o que mostrar */
      const scrollable = track.scrollWidth - track.clientWidth > 2;
      box.hidden = total < 2 || !scrollable;
      if (box.hidden) return;

      const visible = Math.min(MAX_VISIBLE, total);
      const active = current();
      const start = Math.max(0, Math.min(active - Math.floor(visible / 2), total - visible));
      const end = start + visible - 1;

      strip.style.transform = `translateX(${-start * SLOT}px)`;

      buttons.forEach((b, i) => {
        const outside = i < start || i > end;
        const edge = (i === start && start > 0) || (i === end && end < total - 1);

        b.classList.toggle('is-active', i === active);
        b.classList.toggle('is-hidden', outside);
        b.classList.toggle('is-edge', !outside && edge && i !== active);
        b.tabIndex = outside ? -1 : 0;

        if (i === active) b.setAttribute('aria-current', 'true');
        else b.removeAttribute('aria-current');
      });
    }

    function refresh() {
      build();
      update();
    }

    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    if ('ResizeObserver' in window) new ResizeObserver(update).observe(track);

    refresh();
    return { refresh };
  }


  /* ---------- ampliar fotos ---------- */

  let lb = null;

  function lightbox() {
    if (lb) return lb;

    let list = [];
    let index = 0;
    let lastFocus = null;

    const root = el('div', 'lb');
    root.hidden = true;
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-label', 'Visualizador de fotos');

    const backdrop = el('div', 'lb-backdrop');
    const fig = el('figure', 'lb-fig');
    const stage = el('div', 'lb-stage');
    const cap = el('figcaption', 'lb-cap');
    fig.append(stage, cap);

    const close = el('button', 'lb-btn lb-close', '×');
    const prev = el('button', 'lb-btn lb-prev', '‹');
    const next = el('button', 'lb-btn lb-next', '›');
    [close, prev, next].forEach((b) => { b.type = 'button'; });
    close.setAttribute('aria-label', 'Fechar');
    prev.setAttribute('aria-label', 'Foto anterior');
    next.setAttribute('aria-label', 'Próxima foto');

    root.append(backdrop, fig, close, prev, next);

    function show(i) {
      index = (i + list.length) % list.length;
      const it = list[index];

      stage.replaceChildren();

      if (it.src) {
        const img = el('img');
        img.src = it.src;
        img.alt = it.caption || '';
        stage.appendChild(img);
      } else {
        const ph = el('div', 'lb-ph');
        ph.append(el('strong', '', it.caption || 'Imagem'), el('span', '', 'Imagem não disponível'));
        stage.appendChild(ph);
      }

      cap.replaceChildren();
      const line = [it.label, `${index + 1} / ${list.length}`].filter(Boolean).join(' · ');
      cap.appendChild(el('small', '', line));
      if (it.caption) cap.appendChild(document.createTextNode(it.caption));

      prev.hidden = next.hidden = list.length < 2;
    }

    function open(items, i = 0) {
      if (!items.length) return;
      list = items;
      lastFocus = document.activeElement;

      if (!root.isConnected) document.body.appendChild(root);

      show(i);
      root.hidden = false;
      document.body.style.overflow = 'hidden';
      close.focus();
    }

    function shut() {
      root.hidden = true;
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    close.addEventListener('click', shut);
    backdrop.addEventListener('click', shut);
    prev.addEventListener('click', () => show(index - 1));
    next.addEventListener('click', () => show(index + 1));

    document.addEventListener('keydown', (e) => {
      if (root.hidden) return;

      if (e.key === 'Escape') shut();
      else if (e.key === 'ArrowLeft' && list.length > 1) show(index - 1);
      else if (e.key === 'ArrowRight' && list.length > 1) show(index + 1);
      else if (e.key === 'Tab') {
        /* mantém o foco dentro do visualizador */
        const f = [close, prev, next].filter((b) => !b.hidden);
        const first = f[0];
        const last = f[f.length - 1];

        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    lb = { open };
    return lb;
  }

  return { dots, lightbox };
})();
