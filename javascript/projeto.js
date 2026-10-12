(function () {
  const data = window.NUCLEO_DATA;
  const { el, slug, toArray, arrowButton } = window.NUCLEO_DOM;
  const id = new URLSearchParams(location.search).get('p');
  const project = (data.projects || []).find((item) => (item.id || slug(item.title)) === id);
  const title = document.getElementById('project-title');

  if (!project) {
    title.textContent = 'Projeto não encontrado';
    document.getElementById('project-description').textContent =
      'Este projeto não está disponível. Volte à lista para conhecer os projetos do núcleo.';
    document.title = 'Projeto não encontrado · Núcleo de Robótica IFMA';
    return;
  }

  title.textContent = project.title;
  if (project.id === 'tecnoarte') document.body.classList.add('project-tecnoarte');
  document.title = `${project.title} · Núcleo de Robótica IFMA`;
  document.querySelector('meta[name="description"]').content =
    project.description || `Conheça ${project.title}, projeto do Núcleo de Robótica do IFMA.`;

  const teams = toArray(project.teams || project.team).filter(Boolean);
  document.getElementById('project-teams').textContent = teams
    .map((team) => data.teams[team]?.name || team)
    .join(' · ');
  document.getElementById('project-category').textContent = project.category || '';
  document.getElementById('project-status').textContent = project.status || '';
  if (project.id === 'robo-resgate') {
    const download = el('a', 'btn btn-primary project-download-link', 'Baixar resumo expandido (DOCX)');
    download.href = `${document.body.dataset.root || ''}assets/projetos/orion-turtle/resumo_expandido.docx`;
    download.download = 'resumo_expandido.docx';
    document.querySelector('.project-meta')?.after(download);
  }
  document.getElementById('project-lead').textContent = project.description ||
    'Uma iniciativa que transforma ideias em experiências práticas de robótica, tecnologia e colaboração.';

  const description = document.getElementById('project-description');
  const paragraphs = Array.isArray(project.text)
    ? project.text
    : [project.description || 'Mais informações sobre este projeto serão adicionadas em breve.'];
  paragraphs.forEach((text) => description.appendChild(el('p', '', text)));

  const memberList = document.getElementById('project-members');
  if (memberList && window.NUCLEO_UTIL) {
    window.NUCLEO_UTIL.memberDeck(memberList, project.teams || project.team, {
      memberIds: project.members,
      expandable: true
    });
  }

  const media = document.getElementById('project-image');
  const mediaGallery = toArray(project.mediaGallery).filter(Boolean);
  const allGalleryPhotos = mediaGallery.filter((item) => item.type !== 'video' && item.src);
  const galleryPhotos = allGalleryPhotos.filter((item) => !item.featured);
  const video = mediaGallery.find((item) => item.type === 'video' && item.src);
  const lightboxPhotos = galleryPhotos.map((item) => ({
    src: new URL(`${document.body.dataset.root || ''}${item.src}`, document.baseURI).href,
    caption: item.caption || '',
    label: `${project.title} · ${project.category || 'Projeto'}`
  }));
  if (project.image) {
    const image = el('img');
    image.src = `${document.body.dataset.root || ''}${project.image}`;
    image.alt = project.imageAlt || project.title;
    image.decoding = 'async';
    if (project.imageWidth && project.imageHeight) {
      image.width = project.imageWidth;
      image.height = project.imageHeight;
    }
    const featured = allGalleryPhotos.find((item) => item.src === project.image);
    if (featured?.width && featured?.height) {
      image.width = featured.width;
      image.height = featured.height;
    }
    const openImage = () => {
      if (window.NUCLEO_WIDGETS?.lightbox) {
        const inGallery = galleryPhotos.some((item) => item.src === project.image);
        const items = inGallery ? lightboxPhotos : [{ src: image.src, caption: project.imageCaption || image.alt }];
        const index = inGallery ? galleryPhotos.findIndex((item) => item.src === project.image) : 0;
        window.NUCLEO_WIDGETS.lightbox().open(items, index);
      } else {
        window.open(image.src, '_blank', 'noopener');
      }
    };
    const zoom = el('button', 'project-feature-zoom');
    zoom.type = 'button';
    zoom.setAttribute('aria-label', `Ampliar imagem: ${image.alt}`);
    zoom.appendChild(image);
    zoom.addEventListener('click', openImage);
    media.appendChild(zoom);
    if (project.imageCaption) {
      media.classList.add('project-media-captioned');
      media.appendChild(el('figcaption', 'project-feature-caption', project.imageCaption));
    }
    if (project.id === 'tecnoarte') media.classList.add('project-media-natural');
  } else {
    media.classList.add('project-art-placeholder');
    const mark = el('span', 'project-art-mark');
    mark.setAttribute('aria-hidden', 'true');
    media.append(mark, el('figcaption', '', project.placeholder || project.title));
  }

  if (project.teamFeature) {
    const feature = el('section', 'project-team-feature');
    feature.id = 'equipe-em-campo';
    const image = el('img');
    const imageUrl = new URL(`${document.body.dataset.root || ''}${project.teamFeature.src}`, document.baseURI).href;
    image.src = imageUrl;
    image.alt = project.teamFeature.alt || project.teamFeature.caption || 'Equipe do projeto';
    image.loading = 'lazy';
    image.decoding = 'async';
    if (project.teamFeature.width && project.teamFeature.height) {
      image.width = project.teamFeature.width;
      image.height = project.teamFeature.height;
    }
    const photo = el('button', 'project-team-photo project-team-media-item');
    photo.type = 'button';
    photo.setAttribute('aria-label', `Ampliar foto: ${image.alt}`);
    photo.appendChild(image);
    photo.addEventListener('click', () => window.NUCLEO_WIDGETS?.lightbox?.().open([{
      src: imageUrl, caption: project.teamFeature.caption || '', label: project.title
    }], 0));
    const copy = el('div', 'project-team-copy');
    const heading = el('div', 'project-team-heading');
    const headingCopy = el('div');
    headingCopy.append(el('p', 'eyebrow', 'OBR · Equipe em campo'), el('h2', '', 'Órion Saiph e Orion Turtle'));
    const obrLink = el('a', 'project-team-obr-link');
    obrLink.href = `${document.body.dataset.root || ''}${project.teamFeature.link || 'competicao.html?c=obr'}`;
    obrLink.setAttribute('aria-label', 'Ver a página da competição OBR 2026');
    obrLink.append(el('span', '', 'OBR'), el('small', '', '2026'));
    heading.append(headingCopy, obrLink);
    copy.append(heading, el('p', '', project.teamFeature.caption || 'Equipe e robô na competição.'));
    const mediaRow = el('div', 'project-team-media');
    const photoFigure = el('figure', 'project-team-media-card project-team-photo-card');
    photoFigure.append(photo, el('figcaption', '', project.teamFeature.caption || 'Equipe Órion Saiph na OBR'));
    mediaRow.appendChild(photoFigure);
    if (project.teamFeature.video?.src) {
      const videoFigure = el('figure', 'project-team-media-card project-team-video');
      const player = el('video');
      player.controls = true;
      player.playsInline = true;
      const source = el('source');
      source.src = new URL(`${document.body.dataset.root || ''}${project.teamFeature.video.src}`, document.baseURI).href;
      source.type = project.teamFeature.video.mime || 'video/mp4';
      player.appendChild(source);
      player.appendChild(el('p', '', 'Seu navegador não conseguiu reproduzir o vídeo.'));
      videoFigure.append(player, el('figcaption', '', project.teamFeature.video.caption || 'Registro da equipe na OBR'));
      mediaRow.appendChild(videoFigure);
    }
    feature.append(copy, mediaRow);
    document.querySelector('.project-layout')?.after(feature);
  }

  const blocks = document.getElementById('project-blocks');
  if (blocks && window.NUCLEO_BLOCKS && project.sections) {
    window.NUCLEO_BLOCKS.render(blocks, project.sections);
    window.NUCLEO_MOTION?.reveal(blocks);
  }

  if (blocks && mediaGallery.length) {
    const gallery = el('section', 'project-media-gallery');
    const useCarousel = ['robo-resgate', 'tecnoarte'].includes(project.id);
    if (useCarousel) gallery.classList.add('project-media-gallery-carousel');
    gallery.setAttribute('aria-labelledby', 'project-media-title');
    const heading = el('div', 'project-media-heading');
    heading.append(
      el('p', 'eyebrow', project.category === 'Extensão' ? 'Registros da extensão' : 'Registros do projeto'),
      el('h2', '', project.mediaGalleryTitle || 'Fotos e vídeos do projeto')
    );
    heading.appendChild(el('p', '', project.mediaGalleryDescription || 'Fotos e vídeos das atividades e do desenvolvimento do projeto.'));
    gallery.appendChild(heading);
    const title = heading.querySelector('h2');
    title.id = 'project-media-title';

    function photoFigure(item) {
      const figure = el('figure', 'project-media-card');
      const button = el('button', 'project-media-zoom');
      button.type = 'button';
      button.setAttribute('aria-label', `Ampliar imagem: ${item.caption || 'registro do projeto'}`);
      const image = el('img');
      image.src = `${document.body.dataset.root || ''}${item.src}`;
      image.alt = item.alt || item.caption || `Registro do projeto ${project.title}`;
      image.loading = 'lazy';
      image.decoding = 'async';
      if (item.width && item.height) {
        image.width = item.width;
        image.height = item.height;
        if (item.height > item.width) figure.classList.add('is-portrait');
      }
      button.appendChild(image);
      button.addEventListener('click', () => window.NUCLEO_WIDGETS?.lightbox?.().open(lightboxPhotos, galleryPhotos.indexOf(item)));
      figure.append(button, el('figcaption', '', item.caption || 'Atividade do projeto'));
      return figure;
    }

    function videoFigure(item) {
      const figure = el('figure', 'project-media-video');
      const player = el('video');
      player.controls = true;
      player.playsInline = true;
      const source = el('source');
      source.src = new URL(`${document.body.dataset.root || ''}${item.src}`, document.baseURI).href;
      source.type = item.mime || 'video/mp4';
      player.appendChild(source);
      player.appendChild(el('p', '', 'Seu navegador não conseguiu reproduzir o vídeo.'));
      figure.append(player, el('figcaption', '', item.caption || `Vídeo do projeto ${project.title}`));
      return figure;
    }

    if (useCarousel) {
      const slider = el('div', 'comp-slider project-media-slider');
      const carousel = el('div', 'comp-carousel project-media-carousel');
      const track = el('div', 'comp-track project-media-track');
      track.tabIndex = 0;
      track.setAttribute('aria-label', `Fotos e vídeos de ${project.title}`);
      const slides = mediaGallery.filter((item) => item.type === 'video' || (item.src && !item.featured));
      slides.forEach((item) => {
        const figure = item.type === 'video' ? videoFigure(item) : photoFigure(item);
        figure.classList.add('project-media-slide');
        track.appendChild(figure);
      });
      const previous = arrowButton('comp-btn', 'prev', 'Foto anterior');
      const next = arrowButton('comp-btn', 'next', 'Próxima foto');
      const update = () => {
        const index = Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / track.clientWidth)));
        previous.disabled = index === 0;
        next.disabled = index >= slides.length - 1;
      };
      previous.addEventListener('click', () => track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' }));
      next.addEventListener('click', () => track.scrollBy({ left: track.clientWidth, behavior: 'smooth' }));
      track.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update);
      carousel.append(previous, track, next);
      slider.appendChild(carousel);
      gallery.appendChild(slider);
      window.NUCLEO_WIDGETS?.dots(track, { host: slider });
      window.NUCLEO_UTIL?.dragScroll(track, { fade: false });
      requestAnimationFrame(update);
    } else {
      const grid = el('div', 'project-media-masonry');
      galleryPhotos.filter((item) => !item.featured).forEach((item) => grid.appendChild(photoFigure(item)));
      if (grid.children.length) gallery.appendChild(grid);
      if (video) gallery.appendChild(videoFigure(video));
    }
    blocks.appendChild(gallery);
    window.NUCLEO_MOTION?.reveal(gallery);
  }

  const related = document.getElementById('related-projects');
  (data.projects || []).filter((item) => item !== project).slice(0, 2).forEach((item) => {
    const link = el('a', 'project-related-card');
    link.href = `projeto.html?p=${encodeURIComponent(item.id || slug(item.title))}`;
    link.append(
      el('strong', '', item.title),
      el('span', '', item.description || 'Conheça esta iniciativa do núcleo.'),
      el('i', '', 'Explorar projeto')
    );
    related.appendChild(link);
  });
})();
