/* =========================================================
   BLOCOS DE TEXTO + IMAGEM  (campo "sections" do data.js)

   Usado pelas páginas de competição e de projeto. Cada bloco é um
   objeto e escolhe o próprio layout, para a página não ficar repetitiva:

     layout: "split"   texto de um lado, 1 imagem do outro (side: "left" | "right")
             "banner"  imagem larga no topo, texto em duas colunas embaixo
             "trio"    texto em cima, 3 imagens lado a lado
             "mosaic"  texto + 1 imagem grande e 2 menores
             "duo"     texto + 2 imagens lado a lado
             "stats"   números em destaque (stats) + texto, imagem opcional
             "text"    só texto, coluna única
     eyebrow:  linha pequena acima do título ("2026 · São Luís")
     title:    título do bloco
     text:     "parágrafo"  ou  ["parágrafo 1", "parágrafo 2"]
     images:   ["caminho.jpg", { src: "caminho.jpg", caption: "Legenda" }, { caption: "Foto da equipe" }]
               Sem "src", aparece um espaço reservado com a legenda.
     stats:    [{ value: "288", label: "pontos" }]
     members:  ["orion-lucas"]  (opcional; mostra os avatares dos integrantes do bloco)
     links:    [{ label: "Ler o mangá", href: "assets/..." }]  (opcional)
     chips:    ["1º lugar", "Sumô"]  (opcional; etiquetas de resultado)
   ========================================================= */

window.NUCLEO_BLOCKS = (function () {
  const { el, toArray } = window.NUCLEO_DOM;
  const W = window.NUCLEO_WIDGETS;
  const root = document.body.dataset.root || '';

  const asImage = (i) => (typeof i === 'string' ? { src: i, caption: '' } : (i || {}));

  /* quantas imagens cada layout pede (completa com espaços reservados) */
  const SLOTS = { split: 1, banner: 1, trio: 3, mosaic: 3, duo: 2, stats: 1, text: 0 };

  function figure(image, index, all, label) {
    const fig = el('figure', 'blk-fig');

    if (image.fit === 'contain') fig.classList.add('fit-contain');
    if (image.src) {
      const img = el('img');
      img.src = root + image.src;
      img.alt = image.caption || label || '';
      img.loading = 'lazy';
      img.decoding = 'async';
      fig.appendChild(img);

      if (W && W.lightbox) {
        fig.classList.add('is-zoomable');
        fig.tabIndex = 0;
        fig.setAttribute('role', 'button');
        fig.setAttribute('aria-label', `Ampliar foto${image.caption ? `: ${image.caption}` : ''}`);
        const open = () => W.lightbox().open(
          all.filter((i) => i.src).map((i) => ({ src: root + i.src, caption: i.caption || '', label })),
          Math.max(0, all.filter((i) => i.src).indexOf(image))
        );
        fig.addEventListener('click', open);
        fig.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
        });
      }
    } else {
      fig.classList.add('is-placeholder');
      const mark = el('span', 'blk-ph-mark');
      mark.setAttribute('aria-hidden', 'true');
      fig.append(mark, el('span', 'blk-ph-text', image.caption || 'Foto em breve'));
      return fig;
    }

    if (image.caption) fig.appendChild(el('figcaption', '', image.caption));
    return fig;
  }

  function copy(block, extra) {
    const box = el('div', 'blk-copy');
    if (block.eyebrow) box.appendChild(el('p', 'blk-eyebrow', block.eyebrow));
    if (block.title) box.appendChild(el('h2', 'blk-title', block.title));

    if (block.chips && block.chips.length) {
      const row = el('div', 'blk-chips');
      toArray(block.chips).forEach((c) => row.appendChild(el('span', 'blk-chip', c)));
      box.appendChild(row);
    }

    const body = el('div', 'blk-text');
    toArray(block.text || []).filter(Boolean).forEach((p) => body.appendChild(el('p', '', p)));
    if (body.children.length) box.appendChild(body);

    if (block.members && block.members.length && window.NUCLEO_UTIL) {
      const people = el('div', 'blk-people');
      people.appendChild(el('span', 'blk-people-label', 'Quem participou'));
      window.NUCLEO_UTIL.memberDeck(people, [], { memberIds: block.members, limit: 7, expandable: true });
      if (people.querySelector('.member-deck')) box.appendChild(people);
    }

    if (extra) box.appendChild(extra);

    if (block.links && block.links.length) {
      const row = el('div', 'blk-links');
      block.links.forEach((l) => {
        const a = el('a', l.featured ? 'btn btn-featured' : 'btn btn-primary', l.label);
        a.href = /^https?:/.test(l.href) ? l.href : root + l.href;
        if (/\.docx?$/i.test(l.href)) a.setAttribute('download', '');
        if (l.newTab || /^https?:|\.pdf$/i.test(l.href)) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
        row.appendChild(a);
      });
      box.appendChild(row);
    }

    return box;
  }

  function statsRow(stats) {
    const row = el('dl', 'blk-statlist');
    stats.forEach((s) => {
      const item = el('div', 'blk-stat');
      item.append(el('dd', '', s.value), el('dt', '', s.label));
      row.appendChild(item);
    });
    return row;
  }

  function videoFigure(media) {
    const fig = el('figure', 'blk-video');
    const preview = el('button', 'video-preview');
    preview.type = 'button';
    preview.dataset.videoPreview = '';
    preview.setAttribute('aria-label', `Reproduzir vídeo: ${media.caption || 'vídeo da competição'}`);
    if (media.poster) {
      const img = el('img');
      img.src = root + media.poster;
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      preview.appendChild(img);
    }
    preview.appendChild(el('span', 'video-preview-play', '▶'));
    const video = el('video');
    video.controls = true;
    video.playsInline = true;
    video.preload = 'none';
    video.hidden = true;
    const source = el('source');
    source.dataset.src = root + media.src;
    source.type = media.mime || 'video/mp4';
    video.appendChild(source);
    fig.append(preview, video);
    if (media.caption) fig.appendChild(el('figcaption', '', media.caption));
    return fig;
  }

  function block(b, i) {
    const layout = SLOTS[b.layout] !== undefined ? b.layout : 'split';
    const sec = el('section', `blk blk-l-${layout}`);
    if (layout === 'split') sec.classList.add(b.side === 'left' ? 'is-left' : 'is-right');
    if (b.title) sec.setAttribute('aria-label', b.title);

    const given = toArray(b.images || []).filter((x) => x !== undefined && x !== null).map(asImage);
    const slots = Math.max(SLOTS[layout], 0);
    const images = given.slice(0, slots || given.length);
    while (images.length < slots) images.push({ src: '', caption: '' });

    const label = b.eyebrow || b.title || '';
    const figs = images.map((im, n) => figure(im, n, images, label));

    if (layout === 'text') {
      sec.appendChild(copy(b));
    } else if (layout === 'banner') {
      sec.append(figs[0], copy(b));
    } else if (layout === 'trio' || layout === 'duo') {
      const row = el('div', 'blk-row');
      figs.forEach((f) => row.appendChild(f));
      sec.append(copy(b), row);
    } else if (layout === 'mosaic') {
      const grid = el('div', 'blk-grid');
      figs.forEach((f) => grid.appendChild(f));
      sec.append(copy(b), grid);
    } else if (layout === 'stats') {
      const stats = statsRow(toArray(b.stats || []).filter(Boolean));
      sec.append(copy(b, stats), figs[0]);
    } else {
      /* split: a ordem no DOM é sempre texto -> imagem; o CSS inverte com .is-left */
      sec.append(copy(b), figs[0]);
    }

    if (b.video && b.video.src) sec.appendChild(videoFigure(b.video));

    sec.style.setProperty('--i', i);
    return sec;
  }

  /* host: elemento que recebe os blocos; sections: lista de objetos */
  function render(host, sections) {
    const list = toArray(sections || []).filter(Boolean);
    if (!host || !list.length) return null;
    const wrap = el('div', 'blk-stack');
    list.forEach((b, i) => wrap.appendChild(block(b, i)));
    host.appendChild(wrap);
    return wrap;
  }

  return Object.freeze({ render });
})();
