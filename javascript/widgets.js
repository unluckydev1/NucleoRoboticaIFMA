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
    let activityResizeObserver = null;

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
      if (activityResizeObserver) activityResizeObserver.disconnect();
      activityResizeObserver = null;
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

  /* ---------- perfil ampliado de integrante ---------- */

  let profile = null;

  function memberProfile() {
    if (profile) return profile;

    let lastFocus = null;
    const root = el('div', 'member-profile');
    root.hidden = true;
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-labelledby', 'member-profile-name');

    const backdrop = el('button', 'member-profile-backdrop');
    backdrop.type = 'button';
    backdrop.setAttribute('aria-label', 'Fechar perfil');
    const panel = el('section', 'member-profile-panel');
    const close = el('button', 'member-profile-close', '×');
    close.type = 'button';
    close.setAttribute('aria-label', 'Fechar perfil');
    const content = el('div', 'member-profile-content');
    panel.appendChild(content);
    root.append(backdrop, panel);

    function shut() {
      root.hidden = true;
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    function open(member, options = {}) {
      if (!member) return;
      lastFocus = options.trigger || document.activeElement;
      const team = options.team || {};
      const level = options.level || '';
      const rootPath = options.root || '';
      const photos = [member.photo, ...(Array.isArray(member.photos) ? member.photos : [])]
        .filter(Boolean)
        .map((photo) => typeof photo === 'string' ? { src: photo } : photo);

      const teamColor = team.color || 'var(--accent)';
      panel.style.setProperty('--member-team-color', teamColor);
      content.replaceChildren();

      const main = el('div', 'member-profile-main');
      main.style.setProperty('--member-team-color', teamColor);
      main.dataset.team = member.team || '';
      main.appendChild(close);
      const hero = el('div', 'member-profile-hero');
      if (photos.length) {
        const image = el('img', 'member-profile-photo');
        image.src = rootPath + photos[0].src;
        image.alt = `Foto de ${member.name}`;
        hero.appendChild(image);
        if (photos.length > 1) {
          const more = el('button', 'member-profile-photo-more', `Ver fotos (${photos.length})`);
          more.type = 'button';
          more.addEventListener('click', () => lightbox().open(photos.map((photo) => ({
            src: rootPath + photo.src,
            caption: photo.caption || '',
            label: member.name
          }))));
          hero.appendChild(more);
        }
      } else {
        const initials = (member.name.match(/[\p{L}\p{N}]+/gu) || []).slice(0, 2).map((word) => word[0]).join('').toUpperCase();
        hero.appendChild(el('div', 'member-profile-initials', initials));
      }

      const details = el('div', 'member-profile-details');
      details.appendChild(el('p', 'member-profile-team', team.name || 'Integrante'));
      const name = el('h2', '', member.name);
      name.id = 'member-profile-name';
      details.appendChild(name);
      const meta = [level].filter(Boolean);
      if (meta.length) details.appendChild(el('p', 'member-profile-meta', meta.join(' · ')));
      hero.appendChild(details);
      main.appendChild(hero);

      const description = member.description || member.bio;
      if (description) main.appendChild(el('p', 'member-profile-description', description));

      const roles = Array.isArray(member.role) ? member.role : [member.role];
      if (roles.filter(Boolean).length) {
        const roleSection = el('section', 'member-profile-section');
        roleSection.appendChild(el('h3', '', 'Atuação'));
        const chips = el('div', 'member-profile-roles');
        roles.filter(Boolean).forEach((role) => chips.appendChild(el('span', '', role)));
        roleSection.appendChild(chips);
        main.appendChild(roleSection);
      }

      const socials = member.socials && typeof member.socials === 'object' ? Object.entries(member.socials) : [];
      const links = socials.filter(([, url]) => typeof url === 'string' && /^https?:\/\//i.test(url));
      const instagram = links.find(([label]) => label.toLowerCase() === 'instagram');
      if (instagram) {
        const instagramLink = el('a', 'member-profile-instagram');
        instagramLink.href = instagram[1];
        instagramLink.target = '_blank';
        instagramLink.rel = 'noopener noreferrer';
        instagramLink.setAttribute('aria-label', `Instagram de ${member.name}`);
        instagramLink.title = `Instagram de ${member.name}`;
        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        icon.setAttribute('viewBox', '0 0 24 24');
        icon.setAttribute('width', '21');
        icon.setAttribute('height', '21');
        icon.setAttribute('fill', 'none');
        icon.setAttribute('stroke', 'currentColor');
        icon.setAttribute('stroke-width', '1.7');
        icon.setAttribute('aria-hidden', 'true');
        const frame = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        frame.setAttribute('x', '3'); frame.setAttribute('y', '3');
        frame.setAttribute('width', '18'); frame.setAttribute('height', '18');
        frame.setAttribute('rx', '5');
        const lens = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        lens.setAttribute('cx', '12'); lens.setAttribute('cy', '12'); lens.setAttribute('r', '4');
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', '17.3'); dot.setAttribute('cy', '6.7'); dot.setAttribute('r', '1');
        icon.append(frame, lens, dot);
        instagramLink.appendChild(icon);
        main.appendChild(instagramLink);
      }
      if (links.length) {
        const socialSection = el('section', 'member-profile-section');
        socialSection.appendChild(el('h3', '', 'Redes sociais'));
        const socialLinks = el('div', 'member-profile-socials');
        links.forEach(([label, url]) => {
          if (label.toLowerCase() === 'instagram') return;
          const link = el('a', '', label);
          link.href = url;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          socialLinks.appendChild(link);
        });
        if (socialLinks.children.length) {
          socialSection.appendChild(socialLinks);
          main.appendChild(socialSection);
        }
      }

      content.appendChild(main);

      const activity = el('aside', 'member-profile-activity');
      activity.appendChild(el('h3', '', 'Competições e projetos'));
      const activities = options.activities || [];
      if (!activities.length) activity.appendChild(el('p', 'member-profile-activity-empty', 'Sem atividades cadastradas.'));
      else activities.forEach((item) => {
        const link = el('a', 'member-profile-activity-item');
        link.href = item.href;
        link.append(el('small', '', item.type), el('span', '', item.title));
        activity.appendChild(link);
      });
      content.appendChild(activity);
      const syncActivityHeight = () => {
        const cardHeight = main.getBoundingClientRect().height;
        if (!cardHeight) return;
        const mobileLimit = window.matchMedia('(max-width: 700px)').matches ? 230 : cardHeight;
        activity.style.height = `${Math.min(cardHeight, mobileLimit)}px`;
      };
      activity.addEventListener('focusin', () => activity.classList.add('is-expanded'));
      activity.addEventListener('focusout', (event) => {
        if (!activity.contains(event.relatedTarget)) activity.classList.remove('is-expanded');
      });
      activity.addEventListener('mouseenter', () => activity.classList.add('is-expanded'));
      activity.addEventListener('mouseleave', () => {
        if (!activity.querySelector(':focus')) activity.classList.remove('is-expanded');
      });

      if (!root.isConnected) document.body.appendChild(root);
      root.hidden = false;
      document.body.style.overflow = 'hidden';
      if ('ResizeObserver' in window) {
        activityResizeObserver = new ResizeObserver(syncActivityHeight);
        activityResizeObserver.observe(main);
      }
      requestAnimationFrame(syncActivityHeight);
      close.focus();
    }

    close.addEventListener('click', shut);
    backdrop.addEventListener('click', shut);
    document.addEventListener('keydown', (event) => {
      if (root.hidden) return;
      if (event.key === 'Escape') shut();
      if (event.key === 'Tab') {
        const focusable = Array.from(panel.querySelectorAll('a[href], button:not([disabled])'));
        if (!focusable.length) { event.preventDefault(); close.focus(); return; }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });

    profile = { open };
    return profile;
  }

  return { dots, lightbox, memberProfile };
})();
