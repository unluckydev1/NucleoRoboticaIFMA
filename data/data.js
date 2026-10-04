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
     level: "medio" ou "superior"   (os níveis ficam em "levels" abaixo)
     role:  "Programação"           (uma função)
            ["Coordenação", "Mecânica"]   (mais de uma função)
     photo: "assets/membros/ana.jpg"  (opcional; caminho a partir da raiz
            do site. Sem foto, aparecem as iniciais sobre a cor da equipe)

   Competição (cada uma ganha a própria página: competicao.html?c=ID):
     id:         "obr"   (curto, sem espaço/acentos; é o que liga tudo)
     teams:      ["orion"]  ou  ["orion", "nexa"]
     categories: ["sumo", "artistica"]   (chaves de "categories" abaixo)
     year:       "2025"  ou  ["2024", "2025"]   (opcional; alimenta o filtro de ano)
     images:     ["assets/competicoes/obr-1.jpg",
                  { src: "assets/competicoes/obr-2.jpg", caption: "Equipe na OBR" }]
                 (fotos da equipe; mais de uma vira carrossel. Sem foto,
                  a página mostra um espaço reservado)
     text:       "Texto da página"  ou  ["parágrafo 1", "parágrafo 2"]
                 (se faltar, usa "description")
   Conquista:
     competition: "obr"   (id da competição; o título vira link para a página dela)

   Notícia (lista "news"; aparece na home):
     date:    "2026-09-20"   (ano-mês-dia)
     title, summary
     image:   "assets/noticias/foto.jpg"   (opcional; sem foto, espaço reservado)
     link:    "https://..."   (opcional; com link o cartão inteiro vira clicável)
   Projeto (lista "projects"; aparece na home):
     id:      "projeto-x"  (único; abre projeto.html?p=projeto-x)
     category: "Pesquisa", "Ensino" ou "Extensão" (opcional; aparece no cartão e na página do projeto)
     teams:   ["orion"]  ou  ["orion", "nexa"]   (opcional)
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
    orion: { name: "Robotic Órion", color: "#2E5A88", ink: "#FFFFFF" },
    nexa:  { name: "NEXA 404",      color: "#86D011", ink: "#08090C" }
  },   /* color = cor do avatar; ink = cor das iniciais */

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
    galleryHomeLimit: 8
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
      categories: [], year: "", images: [] }
  ],


  /* ---------- CONQUISTAS (a ordem aqui é a ordem na tela) ---------- */
  achievements: [
    { team: "orion", competition: "obr", year: "", title: "1º lugar — OBR Etapa Maranhão",
      description: "Categoria performance artística." },

    { team: "orion", competition: "robosummit", year: "", title: "Classificação nacional — MRC Brasil Robosummit",
      description: "Equipe representou o campus na etapa nacional da competição." },

    { team: "nexa", competition: "robosummit", year: "", title: "1º lugar — Sumô, categoria universitária",
      description: "Premiação conquistada na Robosummit." }   /* confirmar edição e ano */
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
    { team: "orion", level: "superior", name: "Nome do coordenador", role: "Coordenação" },
    { team: "orion", level: "medio",    name: "Nome do integrante",  role: "Mecânica" },
    { team: "orion", level: "medio",    name: "Nome do integrante",  role: "Eletrônica" },
    { team: "orion", level: "superior", name: "Nome do integrante",  role: "Programação" },
    { team: "orion", level: "medio",    name: "Nome do integrante",  role: "Marketing" },

    { team: "nexa",  level: "superior", name: "Nome do coordenador", role: "Coordenação" },
    { team: "nexa",  level: "superior", name: "Nome do integrante",  role: "Mecânica" },
    { team: "nexa",  level: "medio",    name: "Nome do integrante",  role: "Eletrônica" },
    { team: "nexa",  level: "superior", name: "Nome do integrante",  role: ["Programação", "Marketing"] },
    { team: "nexa",  level: "medio",    name: "Nome do integrante",  role: "Marketing" }
  ]
};
