/* =========================================================
   PÁGINA DE UMA COMPETIÇÃO  (competicao.html?c=ID)

   Esquerda: fotos da equipe (carrossel se houver mais de uma).
   Direita:  nome, equipes/ano/categorias, texto e conquistas.
   Tudo vem de data/data.js — não há um HTML por competição.
   ========================================================= */

(function () {
  const D = window.NUCLEO_DATA;
  const U = window.NUCLEO_UTIL;
  const { el } = window.NUCLEO_DOM;
  const box = document.querySelector('#comp-page');

  if (!D || !U || !box) return;

  const id = new URLSearchParams(location.search).get('c') || '';
  const c = U.compIndex[id];

  /* ---------- id inválido ---------- */

  if (!c) {
    document.title = 'Competição não encontrada · Núcleo de Robótica IFMA Santa Inês';

    const empty = el('div', 'empty');
    empty.appendChild(el('p', '', 'Não encontramos essa competição.'));

    const back = el('a', 'btn btn-primary', 'Ver todas as competições');
    back.href = 'competicoes.html';

    box.append(empty, el('div', 'section-cta'));
    box.lastChild.appendChild(back);
    return;
  }

  document.title = `${c.name} · Núcleo de Robótica IFMA Santa Inês`;


  /* ---------- galeria (esquerda) ---------- */

  function gallery() {
    const images = U.compImages(c);
    const wrap = el('div', 'cd-gallery');

    if (!images.length) {
      const ph = el('div', 'cd-empty');
      ph.append(el('strong', '', c.short || c.name), el('span', '', 'Fotos da equipe em breve'));
      wrap.appendChild(ph);
      return wrap;
    }

    const track = el('div', 'cd-track');
    track.tabIndex = 0;
    track.setAttribute('aria-label', 'Fotos da equipe');

    images.forEach((im, i) => {
      const fig = el('figure', 'cd-slide');
      const img = el('img');

      img.src = U.root + im.src;
      img.alt = im.caption || `${c.name} — foto ${i + 1}`;
      if (i > 0) img.loading = 'lazy';

      fig.appendChild(img);
      if (im.caption) fig.appendChild(el('figcaption', '', im.caption));
      track.appendChild(fig);
    });

    wrap.appendChild(track);

    if (images.length < 2) return wrap;

    U.dragScroll(track, { fade: false });

    const prev = el('button', 'cd-btn cd-prev', '‹');
    const next = el('button', 'cd-btn cd-next', '›');
    prev.type = next.type = 'button';
    prev.setAttribute('aria-label', 'Foto anterior');
    next.setAttribute('aria-label', 'Próxima foto');

    const dots = el('div', 'cd-dots');
    const dotEls = images.map((_, i) => {
      const d = el('button', 'cd-dot');
      d.type = 'button';
      d.setAttribute('aria-label', `Ir para a foto ${i + 1} de ${images.length}`);
      d.addEventListener('click', () =>
        track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' })
      );
      dots.appendChild(d);
      return d;
    });

    const go = (dir) =>
      track.scrollBy({ left: dir * track.clientWidth, behavior: 'smooth' });

    prev.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));

    function update() {
      if (!track.clientWidth) return;

      const i = Math.round(track.scrollLeft / track.clientWidth);

      dotEls.forEach((d, n) => {
        d.classList.toggle('is-active', n === i);
        n === i ? d.setAttribute('aria-current', 'true') : d.removeAttribute('aria-current');
      });

      prev.disabled = i <= 0;
      next.disabled = i >= images.length - 1;
    }

    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    });

    wrap.append(prev, next, dots);
    requestAnimationFrame(update);   // depois de entrar na página (precisa da largura)
    return wrap;
  }


  /* ---------- texto (direita) ---------- */

  function details() {
    const col = el('div', 'cd-text');

    col.appendChild(el('p', 'eyebrow', 'Competição'));
    col.appendChild(el('h1', '', c.name));

    /* equipes, ano e categorias */
    const meta = el('div', 'cd-meta');

    U.toArray(c.teams || c.team).forEach((tid) => {
      const t = D.teams[tid] || {};
      const chip = el('span', 'cd-chip');
      const dot = el('i');
      if (t.color) dot.style.setProperty('--dot', t.color);
      chip.append(dot, document.createTextNode(t.name || tid));
      meta.appendChild(chip);
    });

    U.compYears(c).forEach((y) => meta.appendChild(el('span', 'cd-chip', y)));

    U.compCategories(c).forEach((k) =>
      meta.appendChild(el('span', 'cd-chip cd-chip-cat', (D.categories || {})[k] || k))
    );

    if (meta.children.length) col.appendChild(meta);

    /* texto principal */
    const body = el('div', 'cd-body');
    const paragraphs = U.toArray(c.text || c.description || []).filter(Boolean);
    paragraphs.forEach((p) => body.appendChild(el('p', '', p)));
    col.appendChild(body);

    /* conquistas ligadas a esta competição */
    const wins = (D.achievements || []).filter((a) => a.competition === id);

    if (wins.length) {
      col.appendChild(el('h2', 'cd-sub', 'Conquistas'));

      const ul = el('ul', 'timeline');
      wins.forEach((a) => {
        const li = el('li');
        const content = el('div', 'tl-content');
        const dot = el('span', 'tl-dot');
        dot.setAttribute('aria-hidden', 'true');

        const label = [U.teamName(a.team), a.year].filter(Boolean).join(' · ');
        if (label) content.appendChild(el('small', '', label));
        content.appendChild(el('h3', '', a.title));
        if (a.description) content.appendChild(el('p', '', a.description));

        li.append(dot, content);
        ul.appendChild(li);
      });
      col.appendChild(ul);
    }

    return col;
  }

  box.append(gallery(), details());
})();
