/* =========================================================
   DADOS DO SITE — é o ÚNICO arquivo que você precisa editar
   para adicionar competições, conquistas e integrantes.

   Como funciona:
   • Cada item tem o campo "team" (ou "teams") com o id da equipe:
       "orion"  ou  "nexa"
   • A página inicial mostra TUDO, sem filtro.
   • A página de cada equipe mostra só os itens dela.
   • Para adicionar: copie uma linha/bloco, cole abaixo do último
     item da mesma lista (com vírgula no fim) e troque os textos.
   • Para remover: apague o bloco.

   Competição de mais de uma equipe:  teams: ["orion", "nexa"]
   Integrante:
     id: "orion-lucas"             (opcional; referência estável em competições)
     level: "medio" ou "superior"   (os níveis ficam em "levels" abaixo)
     role:  "Programação"           (uma função)
            ["Coordenação", "Mecânica"]   (mais de uma função)
     photo: "assets/membros/ana.jpg"  (opcional; caminho a partir da raiz
            do site. Sem foto, aparecem as iniciais sobre a cor da equipe)
     description: "Apresentação do integrante" (opcional)
     photos: ["assets/membros/ana-evento.jpg"] (opcional; fotos extras)
     socials: { Instagram: "https://...", GitHub: "https://..." } (opcional)

   Competição (cada uma ganha a própria página: competicao.html?c=ID):
     id:         "obr"   (curto, sem espaço/acentos; é o que liga tudo)
     teams:      ["orion"]  ou  ["orion", "nexa"]
     categories: ["sumo", "artistica"]   (chaves de "categories" abaixo)
     members: ["orion-lucas"] (opcional; IDs de integrantes presentes. Sem este
              campo, a galeria de avatares usa como demonstração os membros das equipes)
     year:       "2025"  ou  ["2024", "2025"]   (opcional; alimenta o filtro de ano)
     images:     ["assets/competicoes/obr-1.jpg",
                  { src: "assets/competicoes/obr-2.jpg", caption: "Equipe na OBR" }]
                 (fotos da equipe; mais de uma vira carrossel. Sem foto,
                  a página mostra um espaço reservado)
     text:       "Texto da página"  ou  ["parágrafo 1", "parágrafo 2"]
                 (se faltar, usa "description")
   Conquista:
     competition: "obr"   (id da competição; o título vira link para a página dela)
     year:     "2026"     (recomendado: ordena do mais novo ao mais antigo e alimenta o filtro)
     place:    1, 2 ou 3  (opcional; cor do marcador: ouro, prata, bronze)
     featured: true       (opcional; destaque. Home e páginas das equipes mostram os
                           destaques mais recentes; sem nenhum destaque, mostram os mais recentes)
   Como a lista cresce sem virar bagunça:
     • Home e equipes mostram só uma amostra (limites em "settings" abaixo) e um
       link "Ver todas". O histórico completo, com filtros e "mostrar mais",
       fica em conquistas.html e competicoes.html.
     • Tudo é ordenado pelo ano (mais novo primeiro); item sem ano vai para o fim.
     • Exemplos de teste estão marcados com "EXEMPLO" — apague-os ao colocar os reais.

   Notícia (lista "news"; aparece na home):
     date:    "2026-09-20"   (ano-mês-dia)
     title, summary
     image:   "assets/noticias/foto.jpg"   (opcional; sem foto, espaço reservado)
     link:    "https://..."   (opcional; com link o cartão inteiro vira clicável)
   Projeto (lista "projects"; aparece na home):
     id:      "projeto-x"  (único; abre projeto.html?p=projeto-x)
     category: "Pesquisa", "Ensino" ou "Extensão" (opcional; aparece no cartão e na página do projeto)
     teams:   ["orion"]  ou  ["orion", "nexa"]   (opcional)
     members: ["orion-lucas"] (opcional; integrantes específicos do projeto)
     title, description
     status:  "Em andamento"   (opcional)
     image:   "assets/projetos/foto.jpg"   (opcional)
     link:    "https://..."   (opcional)
   Foto da galeria (lista "gallery"; carrossel na home + página galeria.html):
     equipe:  "orion", "nexa" ou ["orion", "nexa"] (opcional; define em quais galerias de equipe aparece)
     year:    "2026"   (único filtro da página Galeria)
     src:     "assets/galeria/foto.jpg"   (sem src, aparece um espaço reservado)
     caption: "Legenda da foto"

   REGRA: tudo que aparece no site (textos de seções, fotos, listas) mora
   AQUI, em data.js, em qualquer página em que apareça. Os HTMLs só dizem
   onde mostrar: <div data-list="news|projects|gallery"></div>
   ========================================================= */

window.NUCLEO_DATA = {

  /* ---------- equipes (só mexa se criar uma equipe nova) ---------- */
  teams: {
    orion: {
      name: "Robotic Órion", color: "#2E5A88", ink: "#FFFFFF",
      page: "equipes/orion/index.html", logo: "assets/orion/logo_roundness.png", effect: "stars",
      summary: "Robótica e programação. Mecânica, eletrônica e código para competir da OBR à Robosummit."
    },
    nexa: {
      name: "NEXA 404", color: "#86D011", ink: "#08090C",
      page: "equipes/nexa/index.html", logo: "assets/nexa/logo.png", effect: "circuit",
      summary: "Robótica competitiva universitária, guiada por engenharia, inovação e inclusão."
    }
  },   /* color = cor do avatar; ink = cor das iniciais.
          page, logo, summary e effect ("stars" ou "circuit") montam o painel da seção Equipes da home */

  /* ---------- níveis de ensino (usados no filtro) ---------- */
  levels: {
    medio:    "Médio",
    superior: "Superior"
  },

  /* ---------- categorias de competição (usadas no filtro) ---------- */
  categories: {
    sumo:           "Sumô",
    labirinto:      "Labirinto",
    artistica:      "Artística",
    resgate:        "Resgate",
    "drc-explorer": "DRC-Explorer"
  },

  /* ---------- ajustes ---------- */
  settings: {
    /* máximo de integrantes na home e nas páginas das equipes.
       Passou disso: arrastar a lista ou clicar em "ver todos". */
    memberLimit: 8,

    /* quantas fotos a home mostra no carrossel (a página Galeria mostra todas) */
    galleryHomeLimit: 8,

    /* competições: etiquetas na home / cartões na página da equipe / por "página" em competicoes.html */
    competitionsHomeLimit: 10,
    competitionsTeamLimit: 8,
    competitionsPageSize: 12,

    /* conquistas: itens na home / na página da equipe / por "página" em conquistas.html */
    achievementsHomeLimit: 6,
    achievementsTeamLimit: 5,
    achievementsPageSize: 10
  },


  /* ---------- COMPETIÇÕES ---------- */
  competitions: [
    { id: "obr", teams: ["orion"], short: "OBR", name: "OBR — Olimpíada Brasileira de Robótica",
      description: "Participamos das provas teórica e prática da OBR, levando estudantes do campus para a competição nacional.",
      categories: ["artistica"], year: "", images: [] },

    { id: "robosummit", teams: ["orion", "nexa"], short: "Robosummit", name: "MRC Brasil — Robosummit",
      description: "Competição realizada junto à etapa nacional do MINOAN ROBOTSPORTS COMPETITION Brasil.",
      categories: ["sumo"], year: "", images: [] },

    { id: "fira", teams: ["orion"], short: "FIRA", name: "FIRA",
      description: "Competição de robótica de alcance internacional, na qual testamos nossos projetos contra equipes de diversos lugares.",
      categories: [], year: "", images: [] },

    { id: "omr", teams: ["orion"], short: "OMR", name: "OMR — Olimpíada Moviema de Robótica",
      description: "Etapa estadual que reúne estudantes maranhenses e aproxima a robótica da comunidade escolar.",
      categories: [], year: "", images: [] },

    { id: "universo-ifma", teams: ["orion"], short: "Universo IFMA", name: "Universo IFMA",
      description: "Evento do Instituto Federal do Maranhão onde apresentamos nossos projetos e trocamos experiências com outros campi.",
      categories: [], year: "", images: [] },

    { id: "lnr", teams: ["orion"], short: "LNR", name: "LNR — Liga Nacional de Robótica",
      description: "Competição nacional em que medimos forças com equipes de todo o país.",
      categories: [], year: "", images: [] },

    { id: "porto-itaqui", teams: ["orion"], short: "Prêmio Porto Itaqui", name: "Prêmio Porto Itaqui",
      description: "Premiação voltada a projetos de ciência e inovação, na qual apresentamos nosso trabalho.",
      categories: [], year: "", images: [] },

    /* ----- EXEMPLOS (apague ao cadastrar as competições reais) ----- */
    { id: "ex-torneio-regional", teams: ["orion"], short: "Torneio Regional", name: "EXEMPLO — Torneio Regional de Robótica",
      description: "Competição de exemplo: etapa regional com provas de seguidor de linha e resgate.",
      categories: ["labirinto", "resgate"], year: ["2025", "2026"], images: [] },

    { id: "ex-copa-sumo", teams: ["nexa"], short: "Copa de Sumô", name: "EXEMPLO — Copa Nordeste de Sumô",
      description: "Competição de exemplo: confrontos de sumô de robôs entre equipes universitárias.",
      categories: ["sumo"], year: "2026", images: [] },

    { id: "ex-mostra-tecnica", teams: ["orion", "nexa"], short: "Mostra Técnica", name: "EXEMPLO — Mostra Técnica de Robótica",
      description: "Competição de exemplo: apresentação de projetos para uma banca avaliadora.",
      categories: ["artistica"], year: "2025", images: [] },

    { id: "ex-desafio-explorer", teams: ["nexa"], short: "Desafio Explorer", name: "EXEMPLO — Desafio DRC-Explorer",
      description: "Competição de exemplo: robôs exploradores em terreno com obstáculos.",
      categories: ["drc-explorer"], year: "2024", images: [] },

    { id: "ex-feira-ciencias", teams: ["orion"], short: "Feira de Ciências", name: "EXEMPLO — Feira Estadual de Ciências",
      description: "Competição de exemplo: exposição de projetos de ciência e tecnologia.",
      categories: [], year: "2024", images: [] }
  ],


  /* ---------- CONQUISTAS (a ordem aqui é a ordem na tela) ---------- */
  achievements: [
    { team: "orion", competition: "obr", year: "", title: "1º lugar — OBR Etapa Maranhão",
      description: "Categoria performance artística." },

    { team: "orion", competition: "robosummit", year: "", title: "Classificação nacional — MRC Brasil Robosummit",
      description: "Equipe representou o campus na etapa nacional da competição." },

    { team: "nexa", competition: "robosummit", year: "", title: "1º lugar — Sumô, categoria universitária",
      description: "Premiação conquistada na Robosummit." },   /* confirmar edição e ano */

    /* ----- EXEMPLOS (apague ao cadastrar as conquistas reais) ----- */
    { team: "nexa", competition: "ex-copa-sumo", year: "2026", place: 2, featured: true,
      title: "EXEMPLO — 2º lugar na Copa Nordeste de Sumô",
      description: "Conquista de exemplo: vice-campeonato na categoria universitária." },

    { team: "orion", competition: "ex-torneio-regional", year: "2026", place: 1, featured: true,
      title: "EXEMPLO — 1º lugar no Torneio Regional, prova de resgate",
      description: "Conquista de exemplo: melhor pontuação entre as equipes do ensino médio." },

    { team: "orion", competition: "ex-torneio-regional", year: "2025", place: 3,
      title: "EXEMPLO — 3º lugar no Torneio Regional, labirinto",
      description: "Conquista de exemplo: terceira colocação na prova de labirinto." },

    { team: "orion", competition: "ex-mostra-tecnica", year: "2025", featured: true,
      title: "EXEMPLO — Prêmio de melhor projeto na Mostra Técnica",
      description: "Conquista de exemplo: reconhecimento da banca avaliadora." },

    { team: "nexa", competition: "ex-mostra-tecnica", year: "2025",
      title: "EXEMPLO — Menção honrosa na Mostra Técnica",
      description: "Conquista de exemplo: destaque em inovação e inclusão." },

    { team: "nexa", competition: "ex-desafio-explorer", year: "2024", place: 1, featured: true,
      title: "EXEMPLO — Campeã do Desafio DRC-Explorer",
      description: "Conquista de exemplo: melhor tempo no percurso com obstáculos." },

    { team: "orion", competition: "ex-feira-ciencias", year: "2024",
      title: "EXEMPLO — Classificação para a etapa nacional da Feira de Ciências",
      description: "Conquista de exemplo: projeto selecionado entre os finalistas estaduais." },

    { team: "orion", competition: "ex-feira-ciencias", year: "2023", place: 2,
      title: "EXEMPLO — 2º lugar na Feira Estadual de Ciências",
      description: "Conquista de exemplo: categoria robótica educacional." }
  ],


  /* ---------- NOTÍCIAS (exemplos: troque pelos reais) ---------- */
  news: [
    { date: "2026-09-20", title: "Título da notícia de exemplo",
      summary: "Resumo curto da notícia. Substitua este texto pelo conteúdo real.",
      image: "", link: "" },

    { date: "2026-08-05", title: "Outra notícia de exemplo",
      summary: "Use este espaço para novidades do núcleo, resultados e eventos.",
      image: "", link: "" },

    { date: "2026-06-12", title: "Mais uma notícia de exemplo",
      summary: "Adicione a foto em assets/noticias/ e informe o caminho em \"image\".",
      image: "", link: "" }
  ],


  /* ---------- PROJETOS (exemplos: troque pelos reais) ---------- */
  projects: [
    { id: "projeto-orion", teams: ["orion"], category: "Ensino", title: "Projeto de exemplo A", status: "Em andamento",
      description: "Descrição curta do projeto: o que é, para que serve e quem participa.",
      image: "", link: "" },

    { id: "projeto-nexa", teams: ["nexa"], category: "Pesquisa", title: "Projeto de exemplo B", status: "Concluído",
      description: "Descrição curta do projeto. Informe a foto em \"image\" quando tiver.",
      image: "", link: "" },

    { id: "projeto-conjunto", teams: ["orion", "nexa"], category: "Extensão", title: "Projeto de exemplo C", status: "Em andamento",
      description: "Projeto feito em conjunto pelas duas equipes.",
      image: "", link: "" }
  ],


  /* ---------- GALERIA (exemplos: troque pelas fotos reais) ---------- */
  gallery: [
    { year: "2026", equipe: ["orion"], caption: "Foto de exemplo 1", src: "" },
    { year: "2026", equipe: ["nexa"], caption: "Foto de exemplo 2", src: "" },
    { year: "2026", equipe: ["orion", "nexa"], caption: "Foto de exemplo 3", src: "" },
    { year: "2025", caption: "Foto de exemplo 4", src: "" },
    { year: "2025", caption: "Foto de exemplo 5", src: "" },
    { year: "2025", caption: "Foto de exemplo 6", src: "" },
    { year: "2024", caption: "Foto de exemplo 7", src: "" },
    { year: "2024", caption: "Foto de exemplo 8", src: "" }
  ],


  /* ---------- INTEGRANTES ---------- */
  members: [
    { team: "orion", level: "medio", name: "Lucas", role: "Programação", photo: "assets/orion/members/lucas.png", socials: { Instagram: "https://www.instagram.com/lucas.yyp/" } },
    { team: "orion", level: "medio", name: "Davy", role: ["Montagem", "Programação", "Mídia"], photo: "assets/orion/members/davy.png", socials: { Instagram: "https://www.instagram.com/davyxcosta/" } },
    { team: "orion", level: "medio", name: "Felipe", role: ["Mecânica", "Montagem", "Eletrônica"], photo: "assets/orion/members/felipe.png", socials: { Instagram: "https://www.instagram.com/philyppe.nleal/" } },
    { team: "orion", level: "medio", name: "Guilherme", role: ["Programação", "Montagem", "Eletrônica"], photo: "assets/orion/members/guilherme.png", socials: { Instagram: "https://www.instagram.com/pg.mendess/" } },
    { team: "orion", level: "medio", name: "Lara", role: ["Figurino e ornamentação artística", "Mídia"], photo: "assets/orion/members/lara.png", socials: { Instagram: "https://www.instagram.com/lara.jansen._/" } },
    { team: "orion", level: "medio", name: "Ezequiel", role: "Mecânica", photo: "assets/orion/members/ezequiel.png" },
    { team: "orion", level: "medio", name: "Leonardo “Leo”", role: "Montagem", photo: "assets/orion/members/leonardo.png" },
    { team: "orion", level: "superior", name: "Carol Meireles", role: "Coordenação", photo: "assets/orion/members/carol.png", socials: { Instagram: "https://www.instagram.com/anacarolmeireles_/" } },
    { team: "orion", level: "superior", name: "Marjorie", role: ["Programação","Mídia"], photo: "assets/orion/members/marjorie.png", socials: { Instagram: "https://www.instagram.com/eng.marjoriecastro/" } },

    { team: "nexa", level: "superior", name: "Nome do coordenador", role: "Coordenação" },
    { team: "nexa", level: "superior", name: "Nome do integrante", role: "Mecânica" },
    { team: "nexa", level: "medio",    name: "Nome do integrante", role: "Eletrônica" },
    { team: "nexa", level: "superior", name: "Nome do integrante", role: ["Programação", "Marketing"] },
    { team: "nexa", level: "medio",    name: "Nome do integrante", role: "Marketing" }
  ]
};
