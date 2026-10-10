(function () {
  const data = window.NUCLEO_DATA;
  const { el, slug, toArray } = window.NUCLEO_DOM;
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
  const galleryPhotos = mediaGallery.filter((item) => item.type !== 'video' && item.src);
  const lightboxPhotos = galleryPhotos.map((item) => ({
    src: new URL(`${document.body.dataset.root || ''}${item.src}`, document.baseURI).href,
    caption: item.caption || '',
    label: 'TecnoArte · Extensão'
  }));
  if (project.image) {
    const image = el('img');
    image.src = `${document.body.dataset.root || ''}${project.image}`;
    image.alt = project.imageAlt || project.title;
    const featured = galleryPhotos.find((item) => item.src === project.image);
    if (featured?.width && featured?.height) {
      image.width = featured.width;
      image.height = featured.height;
    }
    const openImage = () => {
      if (window.NUCLEO_WIDGETS?.lightbox) {
        const items = lightboxPhotos.length ? lightboxPhotos : [{ src: image.src, caption: image.alt }];
        const index = Math.max(0, galleryPhotos.findIndex((item) => item.src === project.image));
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
    if (project.imageCaption) media.appendChild(el('figcaption', 'project-feature-caption', project.imageCaption));
    if (project.id === 'tecnoarte') media.classList.add('project-media-natural');
  } else {
    media.classList.add('project-art-placeholder');
    const mark = el('span', 'project-art-mark');
    mark.setAttribute('aria-hidden', 'true');
    media.append(mark, el('figcaption', '', project.placeholder || project.title));
  }

  const blocks = document.getElementById('project-blocks');
  if (blocks && window.NUCLEO_BLOCKS && project.sections) {
    window.NUCLEO_BLOCKS.render(blocks, project.sections);
    window.NUCLEO_MOTION?.reveal(blocks);
  }

  if (blocks && mediaGallery.length) {
    const gallery = el('section', 'project-media-gallery');
    gallery.setAttribute('aria-labelledby', 'project-media-title');
    const heading = el('div', 'project-media-heading');
    heading.append(
      el('p', 'eyebrow', 'Registros da extensão'),
      el('h2', '', 'Encontros na escola')
    );
    heading.appendChild(el('p', '', 'As crianças e os jovens da comunidade Guajajara vêm ao IFMA Campus Santa Inês para participar das aulas e atividades do projeto.'));
    gallery.appendChild(heading);
    const title = heading.querySelector('h2');
    title.id = 'project-media-title';

    const grid = el('div', 'project-media-masonry');
    galleryPhotos.filter((item) => !item.featured).forEach((item) => {
      const figure = el('figure', 'project-media-card');
      const button = el('button', 'project-media-zoom');
      button.type = 'button';
      button.setAttribute('aria-label', `Ampliar imagem: ${item.caption || 'registro do projeto'}`);
      const image = el('img');
      image.src = `${document.body.dataset.root || ''}${item.src}`;
      image.alt = item.alt || item.caption || 'Registro do projeto TecnoArte';
      image.loading = 'lazy';
      if (item.width && item.height) {
        image.width = item.width;
        image.height = item.height;
      }
      button.appendChild(image);
      button.addEventListener('click', () => window.NUCLEO_WIDGETS?.lightbox?.().open(lightboxPhotos, galleryPhotos.indexOf(item)));
      figure.append(button, el('figcaption', '', item.caption || 'Atividade do projeto'));
      grid.appendChild(figure);
    });
    if (grid.children.length) gallery.appendChild(grid);

    const video = mediaGallery.find((item) => item.type === 'video' && item.src);
    if (video) {
      const figure = el('figure', 'project-media-video');
      const player = el('video');
      player.controls = true;
      player.playsInline = true;
      player.preload = 'metadata';
      const source = el('source');
      source.src = new URL(`${document.body.dataset.root || ''}${video.src}`, document.baseURI).href;
      source.type = video.mime || 'video/mp4';
      player.appendChild(source);
      player.appendChild(el('p', '', 'Seu navegador não conseguiu reproduzir o vídeo.'));
      figure.append(player, el('figcaption', '', video.caption || 'Vídeo da atividade de extensão'));
      gallery.appendChild(figure);
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
