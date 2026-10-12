/* Carregador organizado por página: mantenha aqui a ordem das dependências. */
(async function () {
  const tag = document.currentScript;
  const root = tag?.dataset.root || '';
  const page = tag?.dataset.page || '';
  const sharedData = [
    'data/teams.js',
    'data/competitions.js',
    'data/achievements.js',
    'data/news.js',
    'data/projects.js',
    'data/gallery.js',
    'data/members.js'
  ];
  const sharedCore = [
    'javascript/dom.js',
    ...sharedData,
    'javascript/widgets.js',
    'javascript/render.js'
  ];
  const pages = {
    home: ['javascript/stars.js', 'javascript/circuit.js', 'javascript/equipes.js', 'javascript/common.js', 'javascript/motion.js'],
    competition: ['javascript/blocos.js', 'javascript/common.js', 'javascript/motion.js', 'javascript/competicao.js'],
    competitions: ['javascript/common.js', 'javascript/motion.js', 'javascript/filters.js', 'javascript/competicoes.js'],
    achievements: ['javascript/common.js', 'javascript/motion.js', 'javascript/filters.js', 'javascript/conquistas.js'],
    gallery: ['javascript/common.js', 'javascript/motion.js', 'javascript/filters.js', 'javascript/galeria.js'],
    members: ['javascript/common.js', 'javascript/motion.js', 'javascript/filters.js', 'javascript/integrantes.js'],
    project: ['javascript/blocos.js', 'javascript/common.js', 'javascript/motion.js', 'javascript/projeto.js'],
    nexa: ['javascript/common.js', 'javascript/motion.js', 'javascript/circuit.js', 'javascript/carousel.js'],
    orion: ['javascript/common.js', 'javascript/motion.js', 'javascript/stars.js', 'javascript/carousel.js']
  };

  async function load(path) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `${root}${path}`;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Não foi possível carregar ${path}`));
      document.body.appendChild(script);
    });
  }

  try {
    for (const path of [...sharedCore, ...(pages[page] || [])]) await load(path);
  } catch (error) {
    console.error('Falha ao iniciar os scripts desta página.', error);
  }
})();
