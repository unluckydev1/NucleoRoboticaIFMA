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
  if (project.image) {
    const image = el('img');
    image.src = project.image;
    image.alt = project.title;
    media.appendChild(image);
  } else {
    media.classList.add('project-art-placeholder');
    const mark = el('span', 'project-art-mark');
    mark.setAttribute('aria-hidden', 'true');
    media.append(mark, el('figcaption', '', project.title));
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
