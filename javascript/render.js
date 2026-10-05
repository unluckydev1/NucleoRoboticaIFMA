/* =========================================================
   RENDERIZAÇÃO DAS LISTAS (lê data/data.js)

   Uso no HTML:  <div data-list="competitions"></div>
                 <div data-list="achievements"></div>
                 <div data-list="members"></div>
                 <div data-list="news"></div>
                 <div data-list="projects"></div>
                 <div data-list="gallery"></div>

   <body data-team="orion"> filtra pela equipe.
   Sem data-team (home) mostra tudo.
   ========================================================= */

(function () {
  const D = window.NUCLEO_DATA;
  const dom = window.NUCLEO_DOM;

  if (!D || !dom) {
    console.error('Não foi possível iniciar as listas: carregue data/data.js e javascript/dom.js antes de render.js.');
    return;
  }

  const W = window.NUCLEO_WIDGETS;
  const { el, slug, toArray } = dom;

  const team = document.body.dataset.team || null;
  const root = document.body.dataset.root || '';

  const teamName = (id) => (D.teams[id] ? D.teams[id].name : id);

  const toRoles = (m) => toArray(m.role || []);

  function isTeamLead(member) {
    return toRoles(member).some((role) => {
      const normalized = String(role).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      return /\bcoorden|\bcapita(?:o)?\b/.test(normalized);
    });
  }

  function compareMembers(a, b) {
    const leadershipOrder = Number(isTeamLead(b)) - Number(isTeamLead(a));
    if (leadershipOrder) return leadershipOrder;

    const nameOrder = String(a.name || '').localeCompare(String(b.name || ''), 'pt-BR', { sensitivity: 'base' });
    if (nameOrder) return nameOrder;

    return teamName(a.team).localeCompare(teamName(b.team), 'pt-BR', { sensitivity: 'base' });
  }

  function roleIcons(member) {
    const areas = [
      { keys: ['mecan', 'montag'], label: 'Mecânica e montagem', file: 'iconMec.svg' },
      { keys: ['eletron'], label: 'Eletrônica', file: 'iconEletro.svg' },
      { keys: ['program'], label: 'Programação', file: 'iconProgram.svg' },
      { keys: ['figurino', 'ornament'], label: 'Arte e figurino', file: 'iconGest.svg' },
      { keys: ['coordena', 'gest', 'marketing', 'comunica', 'midia', 'media'], label: 'Gestão e mídia', file: 'iconGest.svg' }
    ];
    const roles = toRoles(member).map((role) => String(role).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase());
    let mainArea = null;
    for (const role of roles) {
      mainArea = areas.find((area) => area.keys.some((key) => role.includes(key)));
      if (mainArea) break;
    }
    if (!mainArea) return null;

    const badge = el('span', 'member-role-icon');
    const teamColors = D.teams[member.team] || {};
    badge.style.setProperty('--role-icon-bg', teamColors.color || '#2E5A88');
    badge.setAttribute('role', 'img');
    badge.setAttribute('aria-label', `Cargo principal: ${mainArea.label}`);
    badge.title = `Cargo principal: ${mainArea.label}`;
    const img = el('img');
    img.src = `${root}assets/orion/areas/${mainArea.file}`;
    img.alt = '';
    if (/^#?(fff|ffffff)$/i.test(teamColors.ink || '')) img.style.filter = 'brightness(0) invert(1)';
    badge.appendChild(img);
    return badge;
  }

  /* id único de cada integrante (mesma regra em todas as páginas,
     por isso o link "integrantes.html#id" sempre acha o cartão) */
  const memberId = new Map();
  const seen = {};

  (D.members || []).forEach((m) => {
    const base = m.id || slug(`${m.team}-${m.name}`);
    seen[base] = (seen[base] || 0) + 1;
    memberId.set(m, seen[base] > 1 ? `${base}-${seen[base]}` : base);
  });
  const memberIndex = new Map([...memberId].map(([member, id]) => [id, member]));

  /* id único de cada competição (o mesmo usado em competicao.html?c=id) */
  const compId = new Map();
  const compIndex = {};

  (D.competitions || []).forEach((c) => {
    const id = c.id || slug(c.short || c.name);
    if (compIndex[id]) console.warn(`Competição com id repetido "${id}":`, c);
    compId.set(c, id);
    compIndex[id] = c;
  });

  const compHref = (c) =>
    `${root}competicao.html?c=${encodeURIComponent(compId.get(c))}`;

  const compYears = (c) => toArray(c.year || []).filter(Boolean).map(String);
  const compCategories = (c) => toArray(c.categories || []).filter(Boolean);

  /* fotos: aceita "caminho.jpg" ou { src, caption } */
  const compImages = (c) =>
    toArray(c.images || []).filter(Boolean).map((i) =>
      typeof i === 'string' ? { src: i, caption: '' } : i
    );

  /* arrastar com o mouse (toque usa a rolagem nativa) + dica de que há mais */
  function dragScroll(track, { fade = true } = {}) {
    let down = false;
    let drag = false;
    let startX = 0;
    let startScroll = 0;
    let pid = null;
    let block = false;

    track.classList.add('drag-row');
    track.addEventListener('dragstart', (e) => e.preventDefault());

    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true;
      drag = false;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      pid = e.pointerId;
    });

    track.addEventListener('pointermove', (e) => {
      if (!down) return;
      const dx = e.clientX - startX;

      /* só vira arraste depois de mover um pouco; um clique simples segue o link */
      if (!drag) {
        if (Math.abs(dx) < 6) return;
        drag = true;
        track.classList.add('dragging');
        track.setPointerCapture(pid);
      }
      track.scrollLeft = startScroll - dx;
    });

    function end() {
      if (!down) return;
      down = false;

      if (drag) {
        drag = false;
        track.classList.remove('dragging');
        try { track.releasePointerCapture(pid); } catch (e) { /* ignora */ }

        /* o clique que vem logo após soltar não deve abrir o link */
        block = true;
        setTimeout(() => { block = false; }, 0);
      }
    }

    ['pointerup', 'pointercancel', 'pointerleave'].forEach((n) =>
      track.addEventListener(n, end)
    );

    track.addEventListener('click', (e) => {
      if (block) { e.preventDefault(); e.stopPropagation(); }
    }, true);

    function hint() {
      const max = track.scrollWidth - track.clientWidth - 2;
      const more = max > 0;
      const atStart = track.scrollLeft <= 2;
      const atEnd = track.scrollLeft >= max;

      /* há mais do que cabe: o CSS deixa o próximo item "espiar" */
      track.classList.toggle('is-overflow', more);

      track.dataset.fade = !more ? '' : atStart ? 'end' : atEnd ? 'start' : 'both';
    }

    /* galerias com setas/bolinhas próprias passam { fade: false } */
    if (fade) {
      track.addEventListener('scroll', hint, { passive: true });
      window.addEventListener('resize', hint);
      requestAnimationFrame(hint);
    }
  }

  window.NUCLEO_UTIL = {
    roles: toRoles, toArray, teamName, slug, root,
    compId, compIndex, compHref, compYears, compCategories, compImages,
    dragScroll, memberDeck
  };

  function emptyState(message) {
    const box = el('div', 'empty');
    box.appendChild(el('p', '', message));
    return box;
  }

  /* filtra pela equipe da página e avisa se o id da equipe estiver errado */
  function pick(list) {
    return list.filter((item) => {
      const ids = toArray(item.teams || item.team || item.equipe || []).filter(Boolean);

      ids.forEach((id) => {
        if (!D.teams[id]) {
          console.warn(`Equipe desconhecida "${id}" em:`, item);
        }
      });

      return !team || ids.includes(team);
    });
  }


  /* ---------- competições ---------- */

  function competitionCard(c) {
    const card = el('article', 'comp-card');
    const link = el('a', 'comp-card-link');
    link.href = compHref(c);
    link.append(el('h3', '', c.name), el('p', '', c.description || ''), el('span', 'comp-more', 'Ver detalhes →'));
    card.appendChild(link);
    return card;
  }

  function renderCompetitions(box, items) {
    if (!items.length) {
      box.appendChild(emptyState('Em atualização.'));
      return;
    }

    /* home: etiquetas simples (cada uma leva à página da competição) */
    if (!team) {
      const ul = el('ul', 'chips');

      items.forEach((c) => {
        const li = el('li');
        const a = el('a', '', c.short || c.name);

        a.href = compHref(c);
        a.title = c.name;

        li.appendChild(a);
        ul.appendChild(li);
      });

      box.appendChild(ul);
      return;
    }

    /* equipe: poucos itens = grade; muitos = carrossel */
    if (items.length <= 3) {
      const grid = el('div', 'comp-list');
      items.forEach((c) => grid.appendChild(competitionCard(c)));
      box.appendChild(grid);
      return;
    }

    const slider = el('div', 'comp-slider');
    const carousel = el('div', 'comp-carousel');
    const previous = el('button', 'comp-btn', '‹');
    const track = el('div', 'comp-track');
    const next = el('button', 'comp-btn', '›');

    previous.type = next.type = 'button';
    previous.id = 'comp-prev';
    next.id = 'comp-next';
    previous.setAttribute('aria-label', 'Competição anterior');
    next.setAttribute('aria-label', 'Próxima competição');
    track.id = 'comp-track';
    track.tabIndex = 0;
    track.setAttribute('aria-label', 'Lista de competições, arraste para ver mais');

    carousel.append(previous, track, next);
    slider.appendChild(carousel);
    box.replaceChildren(slider);

    items.forEach((c) => track.appendChild(competitionCard(c)));
  }


  /* ---------- conquistas ---------- */

  function renderAchievements(box, items, opts = {}) {
    if (!items.length) {
      box.appendChild(emptyState('Em atualização.'));
      return;
    }

    const ul = el('ul', 'timeline');

    items.forEach((a) => {
      const li = el('li');
      const content = el('div', 'tl-content');

      const dot = el('span', 'tl-dot');
      dot.setAttribute('aria-hidden', 'true');

      /* home mostra a equipe; página da equipe mostra só o ano */
      const label = [team ? '' : teamName(a.team), a.year]
        .filter(Boolean)
        .join(' · ');

      if (label) content.appendChild(el('small', '', label));

      const h3 = el('h3');
      const comp = a.competition && compIndex[a.competition];

      if (a.competition && !comp) {
        console.warn(`Competição desconhecida "${a.competition}" em:`, a);
      }

      /* linka para a competição, exceto na própria página dela */
      if (comp && !opts.noLinks) {
        const link = el('a', 'tl-link', a.title);
        link.href = compHref(comp);
        h3.appendChild(link);
      } else {
        h3.textContent = a.title;
      }

      content.appendChild(h3);
      if (a.description) content.appendChild(el('p', '', a.description));

      li.append(dot, content);
      ul.appendChild(li);
    });

    box.appendChild(ul);
  }


  /* ---------- integrantes ---------- */

  /* avatar: fundo = cor da equipe; sem foto, mostra as iniciais */
  function avatar(m) {
    const t = D.teams[m.team] || {};
    const box = el('div', 'avatar');

    box.dataset.team = m.team;
    if (t.color) box.style.setProperty('--av-bg', t.color);
    if (t.ink) box.style.setProperty('--av-ink', t.ink);

    if (m.photo) {
      const img = el('img');
      img.src = root + m.photo;
      img.alt = '';
      img.loading = 'lazy';
      box.appendChild(img);
    } else {
      const initials = (m.name.match(/[\p{L}\p{N}]+/gu) || [])
        .slice(0, 2).map((w) => w[0]).join('').toUpperCase();
      box.appendChild(el('span', 'initials', initials));
    }

    return box;
  }

  function openMemberProfile(member, trigger) {
    if (!W || !W.memberProfile) return;
    const memberTeams = toArray(member.teams || member.team);
    const memberKey = memberId.get(member);
    const belongsToActivity = (item) => {
      const ids = toArray(item.teams || item.team).filter(Boolean);
      return Array.isArray(item.members) && item.members.length
        ? item.members.includes(memberKey)
        : ids.some((id) => memberTeams.includes(id));
    };
    const activities = [
      ...(D.competitions || []).filter(belongsToActivity)
        .map((item) => ({ type: 'Competição', title: item.short || item.name, href: `${root}competicao.html?c=${encodeURIComponent(compId.get(item))}` })),
      ...(D.projects || []).filter(belongsToActivity)
        .map((item) => ({ type: 'Projeto', title: item.title, href: `${root}projeto.html?p=${encodeURIComponent(item.id || slug(item.title))}` }))
    ];
    W.memberProfile().open(member, {
      trigger,
      team: D.teams[member.team] || {},
      level: (D.levels || {})[member.level] || '',
      root,
      activities
    });
  }

  function memberDeck(host, teams, { limit = 5, memberIds = [], expandable = false } = {}) {
    if (!host) return;
    const teamIds = toArray(teams).filter(Boolean);
    const explicitMembers = toArray(memberIds).filter(Boolean).map((id) => memberIndex.get(id)).filter(Boolean);
    const members = (explicitMembers.length ? explicitMembers : (D.members || []).filter((member) => teamIds.includes(member.team)))
      .slice().sort(compareMembers);
    if (!members.length) return;

    const deck = el('div', 'member-deck');
    deck.setAttribute('aria-label', 'Integrantes das equipes participantes');
    const buttons = members.map((member, index) => {
      const button = el('button', 'member-deck-button');
      button.type = 'button';
      button.dataset.team = member.team || '';
      button.title = `Ver perfil de ${member.name}`;
      button.setAttribute('aria-label', `Ver perfil de ${member.name}`);
      button.hidden = index >= limit;
      button.appendChild(avatar(member));
      button.addEventListener('click', () => openMemberProfile(member, button));
      deck.appendChild(button);
      return button;
    });
    if (members.length > limit) {
      const hiddenCount = members.length - limit;
      const more = el(expandable ? 'button' : 'span', 'member-deck-more', `+${hiddenCount}`);
      if (expandable) {
        more.type = 'button';
        more.setAttribute('aria-expanded', 'false');
        more.setAttribute('aria-label', `Mostrar mais ${hiddenCount} integrantes`);
        more.title = 'Mostrar integrantes que não couberam';
        more.addEventListener('click', () => {
          const expanded = more.getAttribute('aria-expanded') !== 'true';
          more.setAttribute('aria-expanded', String(expanded));
          more.setAttribute('aria-label', expanded ? 'Recolher integrantes' : `Mostrar mais ${hiddenCount} integrantes`);
          more.title = expanded ? 'Recolher integrantes' : 'Mostrar integrantes que não couberam';
          more.textContent = expanded ? '−' : `+${hiddenCount}`;
          deck.classList.toggle('is-expanded', expanded);
          buttons.slice(limit).forEach((button) => { button.hidden = !expanded; });
        });
      } else {
        more.setAttribute('aria-label', `Mais ${hiddenCount} integrantes`);
        more.title = `Mais ${hiddenCount} integrantes`;
      }
      deck.appendChild(more);
    }
    host.appendChild(deck);
  }

  function renderMembers(box, items) {
    if (!items.length) {
      box.appendChild(emptyState('Em atualização.'));
      return;
    }

    const orderedItems = [...items].sort(compareMembers);

    /* página "Integrantes": diretório completo (o filtro fica em integrantes.js) */
    if (box.dataset.view === 'directory') {
      const grid = el('div', 'mem-grid');

      orderedItems.forEach((m) => {
        const card = el('article', 'mem-card');
        const t = D.teams[m.team] || {};
        const level = (D.levels || {})[m.level];

        card.id = memberId.get(m);
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-haspopup', 'dialog');
        card.setAttribute('aria-label', `Ver perfil de ${m.name}`);
        card.addEventListener('click', () => openMemberProfile(m, card));
        card.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openMemberProfile(m, card);
          }
        });
        card.dataset.team = m.team;
        card.dataset.level = m.level || '';
        card.dataset.roles = toRoles(m).join('|');

        const info = el('div', 'mem-info');
        info.appendChild(el('h3', '', m.name));
        info.appendChild(el('p', 'mem-role', toRoles(m).join(' · ')));
        info.appendChild(el('p', 'mem-meta', [t.name, level].filter(Boolean).join(' · ')));

        card.append(avatar(m), info);
        const icons = roleIcons(m);
        if (icons) card.appendChild(icons);
        grid.appendChild(card);
      });

      box.appendChild(grid);
      return;
    }

    /* home e páginas das equipes: cartões que levam ao integrante.
       Há um limite (settings.memberLimit ou data-limit): o que passar
       dele fica fora; a lista é arrastável e o botão "ver todos" leva à
       página completa. Na home, as equipes se alternam para que o corte
       não deixe uma delas de fora. */
    const limit =
      Number(box.dataset.limit) || (D.settings || {}).memberLimit || 8;

    const grid = el('div', 'team-grid');

    orderedItems.slice(0, limit).forEach((m) => {
      const href =
        `${root}integrantes.html${team ? `?equipe=${team}` : ''}#${memberId.get(m)}`;

      const card = el('a', 'team-card');
      card.href = href;
      card.setAttribute('aria-label', `Ver ${m.name} em Integrantes`);
      card.setAttribute('aria-haspopup', 'dialog');
      card.addEventListener('click', (event) => {
        event.preventDefault();
        openMemberProfile(m, card);
      });

      const role = toRoles(m).join(' · ');
      card.append(
        avatar(m),
        el('h3', '', m.name),
        el('span', '', team ? role : `${role} · ${teamName(m.team)}`)
      );
      const icon = team ? roleIcons(m) : null;
      if (icon) card.appendChild(icon);
      grid.appendChild(card);
    });

    box.appendChild(grid);
    dragScroll(grid);
    if (W) W.dots(grid, { host: box });
  }

  /* ---------- notícias, projetos e galeria ---------- */

  function fmtDate(s) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || ''));
    if (!m) return s || '';
    return new Date(+m[1], +m[2] - 1, +m[3])
      .toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  /* imagem ou espaço reservado (sem "image" no data.js) */
  function media(cls, src, label) {
    const box = el('div', cls);

    if (src) {
      const img = el('img');
      img.src = root + src;
      img.alt = '';
      img.loading = 'lazy';
      box.appendChild(img);
    } else {
      box.appendChild(el('div', 'ph-tile', label));
    }

    return box;
  }

  function renderNews(box, items) {
    if (!items.length) {
      box.appendChild(emptyState('Em breve: novidades do núcleo e das equipes.'));
      return;
    }

    const grid = el('div', 'news-grid');

    items.forEach((n) => {
      const card = el('article', 'news-card');
      card.tabIndex = 0;
      card.setAttribute('role', 'group');
      card.setAttribute('aria-label', `Ampliar notícia: ${n.title}`);

      const body = el('div', 'news-body');
      if (n.date) body.appendChild(el('span', 'news-date', fmtDate(n.date)));
      body.appendChild(el('h3', '', n.title));
      if (n.summary) body.appendChild(el('p', '', n.summary));
      body.appendChild(el('span', 'card-more', 'Ampliar notícia ↗'));

      card.append(media('news-media', n.image, 'Notícia'), body);
      const enlarge = () => {
        if (!W) return;
        const caption = [n.title, n.summary].filter(Boolean).join('\n\n');
        W.lightbox().open([{ src: n.image ? root + n.image : '', caption, label: fmtDate(n.date) }]);
      };
      card.addEventListener('click', enlarge);
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); enlarge(); }
      });
      if (n.link) {
        const external = el('a', 'news-external', 'Abrir notícia completa ↗');
        external.href = n.link;
        external.target = '_blank';
        external.rel = 'noopener noreferrer';
        external.addEventListener('click', (event) => event.stopPropagation());
        card.appendChild(external);
      }
      grid.appendChild(card);
    });

    box.appendChild(grid);
  }

  function renderProjects(box, items) {
    if (!items.length) {
      box.appendChild(emptyState('Em breve: os projetos das equipes aparecerão aqui.'));
      return;
    }

    const grid = el('div', 'proj-grid');

    items.forEach((p) => {
      const card = el('a', 'proj-card');
      const projectId = p.id || slug(p.title);
      card.href = `${root}projeto.html?p=${encodeURIComponent(projectId)}`;
      card.setAttribute('aria-label', `Conheça o projeto ${p.title}`);

      const body = el('div', 'proj-body');
      body.appendChild(el('h3', '', p.title));
      if (p.description) body.appendChild(el('p', '', p.description));

      const tags = el('div', 'proj-tags');
      if (p.category) tags.appendChild(el('span', 'proj-tag proj-category', p.category));
      toArray(p.teams || p.team || []).filter(Boolean).forEach((id) => {
        const t = D.teams[id] || {};
        const tag = el('span', 'proj-tag');
        const dot = el('i');
        if (t.color) dot.style.setProperty('--dot', t.color);
        tag.append(dot, document.createTextNode(t.name || id));
        tags.appendChild(tag);
      });
      if (p.status) tags.appendChild(el('span', 'proj-tag proj-status', p.status));
      if (tags.children.length) body.appendChild(tags);

      card.append(media('proj-media', p.image, 'Projeto'), body, el('span', 'card-more', 'Ver projeto →'));
      grid.appendChild(card);
    });

    box.appendChild(grid);
  }

  /* galeria: na página Galeria há uma coleção em grade; nos demais
     pontos há um carrossel. Clicar numa foto amplia. Na home só as primeiras
     (settings.galleryHomeLimit). O filtro por ano fica em galeria.js,
     que usa box._gallery.apply(). */
  function renderGallery(box, items) {
    if (!items.length) {
      box.appendChild(emptyState('Em breve: fotos das competições e dos bastidores.'));
      return;
    }

    const page = box.dataset.view === 'page';
    const limit = page
      ? Infinity
      : Number(box.dataset.limit) || (D.settings || {}).galleryHomeLimit || 8;

    const shown = items.slice(0, limit);

    const slider = page ? null : el('div', 'comp-slider');
    const carousel = page ? null : el('div', 'comp-carousel');
    const prev = page ? null : el('button', 'comp-btn', '‹');
    const next = page ? null : el('button', 'comp-btn', '›');
    const track = el('div', page ? 'gallery-collection' : 'gal-track');
    track.setAttribute('aria-label', page ? 'Coleção de fotos' : 'Galeria de fotos, arraste para ver mais');

    if (!page) {
      prev.type = next.type = 'button';
      prev.setAttribute('aria-label', 'Fotos anteriores');
      next.setAttribute('aria-label', 'Próximas fotos');
    }

    const nodes = shown.map((g) => {
      const item = el('button', 'gal-item');
      item.type = 'button';
      item.setAttribute('aria-label', `Ampliar foto${g.caption ? `: ${g.caption}` : ''}`);

      const m = media('gal-media', g.src, g.caption || 'Foto');
      m.appendChild(el('span', 'gal-zoom', 'Ampliar'));

      const cap = el('div', 'gal-cap');
      if (g.year) cap.appendChild(el('span', 'gal-year', g.year));
      if (g.caption) cap.appendChild(el('span', 'gal-text', g.caption));

      item.append(m, cap);
      track.appendChild(item);
      return { item: g, node: item };
    });

    if (page) box.appendChild(track);
    else {
      carousel.append(prev, track, next);
      slider.appendChild(carousel);
      box.appendChild(slider);
      dragScroll(track, { fade: false });
    }

    const visible = () => nodes.filter((n) => !n.node.hidden);

    function step() {
      const first = visible()[0];
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return first ? first.node.offsetWidth + gap : 300;
    }

    if (!page) {
      prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
      next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    }

    function arrows() {
      if (page) return;
      const max = track.scrollWidth - track.clientWidth - 2;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max;
    }

    if (!page) {
      track.addEventListener('scroll', arrows, { passive: true });
      window.addEventListener('resize', arrows);
    }

    const dots = !page && W ? W.dots(track, { host: slider }) : null;

    /* clicar numa foto: abre o visualizador na lista que está visível */
    track.addEventListener('click', (e) => {
      const hit = e.target.closest('.gal-item');
      if (!hit || !W) return;

      const list = visible();
      const idx = list.findIndex((n) => n.node === hit);

      W.lightbox().open(
        list.map(({ item: g }) => ({
          src: g.src ? root + g.src : '',
          caption: g.caption || '',
          label: g.year || ''
        })),
        Math.max(0, idx)
      );
    });

    function refresh() {
      if (!page) track.scrollLeft = 0;
      if (dots) dots.refresh();
      arrows();
    }

    /* mostra só o que passa no teste; devolve quantos ficaram */
    function apply(test) {
      nodes.forEach(({ item, node }) => { node.hidden = !test(item); });
      refresh();
      return visible().length;
    }

    box._gallery = { items: nodes.map((n) => n.item), apply, refresh };
    requestAnimationFrame(arrows);

    /* na home, leva à página completa */
    if (!page) {
      const cta = el('div', 'section-cta');
      const a = el('a', 'btn btn-primary', 'Ver galeria completa');
      a.href = `${root}galeria.html`;
      cta.appendChild(a);
      box.appendChild(cta);
    }
  }

  /* ---------- liga tudo ---------- */

  const renderers = {
    competitions: renderCompetitions,
    achievements: renderAchievements,
    members: renderMembers,
    news: renderNews,
    projects: renderProjects,
    gallery: renderGallery
  };

  document.querySelectorAll('[data-list]').forEach((box) => {
    const name = box.dataset.list;

    if (!renderers[name] || !D[name]) {
      console.warn(`Lista desconhecida: "${name}"`);
      return;
    }

    const list = name === 'gallery' && team
      ? D.gallery.filter((item) => toArray(item.equipe || []).includes(team))
      : pick(D[name]);
    try {
      renderers[name](box, list);
    } catch (error) {
      console.error(`Falha ao renderizar a lista "${name}".`, error);
      box.replaceChildren(emptyState('Não foi possível carregar esta seção. Atualize a página.'));
    }
  });
})();
