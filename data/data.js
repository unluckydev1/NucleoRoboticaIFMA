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

   Blocos de texto + imagem (campo "sections", em competições e projetos):
     Cada bloco escolhe o próprio layout e aparece abaixo do texto principal da página.
     layout:   "split" (texto + 1 imagem; side: "left" ou "right"), "banner" (imagem larga +
               texto em colunas), "trio" (3 imagens em fileira), "mosaic" (1 grande + 2 menores),
               "stats" (números em destaque), "text" (só texto)
     eyebrow, title, text (texto ou lista de parágrafos), chips: ["1º lugar"],
     images:   ["assets/competicoes/obr/foto.jpg", { src: "...", caption: "Legenda" }, { caption: "Foto: equipe no pódio" }]
               Item SEM "src" vira espaço reservado com a legenda — é só preencher "src" quando tiver a foto.
     stats:    [{ value: "288", label: "pontos" }]       (layout "stats")
     members:  ["orion-davy"]   (IDs de integrantes; mostra os avatares do bloco)
     links:    [{ label: "Ler o mangá", href: "assets/..." }]
     Detalhes e exemplos em javascript/blocos.js.

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
     mediaGallery: [{ src, caption, width, height }, { type: "video", src, caption, mime }]
                (opcional; imagens abrem ampliadas e preservam proporção)
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
    sumo:                  "Sumô",
    labirinto:             "Labirinto",
    artistica:             "Artística",
    resgate:               "Resgate",
    "drc-explorer":        "DRC-Explorer",
    "cabo-de-guerra":      "Cabo de Guerra",
    "missao-impossivel":   "Missão Impossível",
    maratona:              "Maratona (seguidor de linha)",
    "seguidor-obstaculos": "Seguidor de linha com obstáculos",
    "desafio-surpresa":    "Desafio Surpresa",
    "registro-midia":     "Registro de Mídia",
    prototipo:             "Protótipo"
  },

  /* Grupos usados somente no filtro. As competições continuam exibindo
     cada modalidade pelo nome oficial cadastrado acima. */
  categoryGroups: {
    resgate: "resgates-em-arena",
    "drc-explorer": "resgates-em-arena",
    "missao-impossivel": "desafios-surpresas",
    "desafio-surpresa": "desafios-surpresas",
    maratona: "seguidores-linha",
    "seguidor-obstaculos": "seguidores-linha"
  },
  categoryGroupLabels: {
    "resgates-em-arena": "Resgates em arena",
    "desafios-surpresas": "Desafios surpresas",
    "seguidores-linha": "Seguidores de linha"
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


  /* ---------- COMPETIÇÕES ----------
     Cada competição tem uma página só, com um bloco ("sections") por edição.
     Os "members" do topo são a soma de todas as edições; cada bloco lista os seus. */
  competitions: [

    /* ===== OBR ===== */
    { id: "obr", teams: ["orion"], short: "OBR", name: "OBR — Olimpíada Brasileira de Robótica",
      description: "Maior olimpíada de robótica do país. Disputamos a etapa estadual do Maranhão, em São Luís, em Robótica Artística e em Resgate.",
      categories: ["artistica", "resgate"], year: ["2025", "2026"], images: [],
      members: ["orion-davy", "orion-lara", "orion-felipe", "orion-guilherme", "orion-ezequiel", "orion-lucas", "orion-leonardo", "orion-gabi", "orion-carol"],
      text: [
        "A Olimpíada Brasileira de Robótica (OBR) é gratuita e aberta a estudantes do ensino fundamental, médio e técnico integrado de todo o país. Na modalidade prática, as equipes disputam a Robótica de Resgate, em que um robô autônomo resgata vítimas em um cenário simulado de desastre, e a Robótica Artística, em que o robô autônomo participa de uma apresentação de teatro, dança, mágica ou show.",
        "As equipes passam por etapas regionais e estaduais, e as melhores avançam para a final nacional, em João Pessoa (PB). O núcleo compete no Maranhão com duas frentes: a Órion Rígel, na parte artística, e a Órion Saiph, no resgate."
      ],
      sections: [
        { layout: "banner", eyebrow: "2026 · Etapa estadual · São Luís · 3 e 4 de agosto",
          title: "Rígel é campeã estadual e vai ao nacional",
          chips: ["1º lugar", "Robótica Artística", "Classificada para o nacional"],
          text: [
            "A equipe Robotic Órion Rígel (Davy, Lara, Gabi e Leonardo) conquistou o 1º lugar em Robótica Artística e garantiu a vaga para a etapa nacional da OBR, em João Pessoa (PB).",
            "No Resgate, a Órion Saiph terminou em 13º lugar com o robô Orion Turtle. A delegação teve ainda Lucas, Ezequiel, Felipe e Guilherme, com o professor Luis Alberto e a coordenação da Carol."
          ],
          images: [{ caption: "Foto: equipe Rígel no pódio da OBR estadual 2026" }],
          members: ["orion-davy", "orion-lara", "orion-gabi", "orion-leonardo", "orion-lucas", "orion-ezequiel", "orion-felipe", "orion-guilherme", "orion-carol"] },

        { layout: "stats", eyebrow: "Resgate · 2025 → 2026", title: "A evolução do Orion Turtle",
          text: "O mesmo robô, reprojetado entre uma etapa e outra, mais que dobrou a pontuação: de uma arena média em 2025 para a arena difícil em 2026.",
          stats: [
            { value: "120", label: "pontos em 2025 (arena média)" },
            { value: "288", label: "pontos em 2026 (arena difícil)" },
            { value: "+140%", label: "de desempenho" },
            { value: "13º", label: "lugar na estadual de 2026" }
          ],
          images: [{ src: "assets/competicoes/obr/obr-orion-turtle-equipe-01.jpeg", caption: "Equipe Órion Saiph e Orion Turtle na OBR", width: 1404, height: 936 }],
          links: [{ label: "Conhecer o projeto do robô", href: "projeto.html?p=robo-resgate" }] },

        { layout: "split", side: "left", eyebrow: "2025 · Etapa estadual · São Luís · 28 e 29 de agosto",
          title: "O ponto de partida",
          text: [
            "Em 2025 levamos duas equipes. A Órion Estrelas (Rígel), na Performance Artística, ficou em 4º lugar. A Órion Saiph, no Resgate, terminou em 22º.",
            "Foi a base do ciclo de evolução que, no ano seguinte, levou o núcleo ao topo do pódio artístico."
          ],
          images: [{ caption: "Foto: equipes na OBR estadual 2025" }],
          members: ["orion-davy", "orion-lara", "orion-felipe", "orion-guilherme", "orion-ezequiel", "orion-carol"] }
      ] },


    /* ===== MRC Brasil + Robosummit ===== */
    { id: "robosummit", teams: ["orion", "nexa"], short: "MRC · Robosummit", name: "MRC Brasil — Robosummit (Nacional)",
      description: "Etapa nacional da Minoan Robotsports Competition no Brasil, junto à Robosummit, em Angra dos Reis (RJ). Cinco pódios da Órion.",
      categories: ["sumo", "labirinto", "maratona", "desafio-surpresa", "seguidor-obstaculos"], year: "2026", images: [],
      members: ["orion-davy", "orion-lucas", "orion-pedro-hiago", "nexa-saulo", "nexa-israelly", "nexa-filipe-bispo", "nexa-paulo-ryan", "orion-carol"],
      text: [
        "A Minoan Robotsports Competition (MRC) é uma competição de robótica esportiva de origem grega: a sua olimpíada global já reuniu equipes de 34 países em Creta. No Brasil, a etapa nacional acontece junto à Robosummit.",
        "Em 2026, em Angra dos Reis (RJ), a Órion disputou provas do ensino médio e superior, com Pedro Hiago na equipe do superior. A NEXA 404 também representou o núcleo na categoria universitária."
      ],
      sections: [
        { layout: "stats", eyebrow: "2026 · Angra dos Reis (RJ)", title: "Cinco pódios no nacional",
          text: "A Órion conquistou cinco pódios na mesma viagem, entre labirinto, maratona de seguidores de linha, desafio surpresa e sumô.",
          stats: [
            { value: "5", label: "pódios" },
            { value: "2", label: "primeiros lugares" },
            { value: "2", label: "equipes: Órion e NEXA" }
          ],
          images: [{ caption: "Foto: delegação do núcleo em Angra dos Reis" }] },
          { layout: "split", side: "left", eyebrow: "NEXA 404 · categoria universitária", title: "NEXA representa o núcleo",
          chips: ["Sumô · universitário", "Labirinto · universitário", "Seguidor de linha · universitário"],
          text: [
            "A NEXA 404 participou do Sumô e do Labirinto universitários na MRC, além de Seguidor de linha na etapa da Robosummit.",
            "A equipe integrou a delegação do IFMA em Angra dos Reis junto à Órion."
          ],
          images: [{ caption: "Foto da NEXA 404 nas provas universitárias · registro a inserir" }],
          members: ["nexa-saulo", "nexa-israelly", "nexa-filipe-bispo", "nexa-paulo-ryan"] },

        { layout: "trio", eyebrow: "Órion · ensino médio e superior", title: "Labirinto, maratona e desafio surpresa",
          chips: ["1º Labirinto · nível médio MRC","1º Sumô · nível Superior MRC", "3º Labirinto Robosummit", "3º Maratona", "2º Desafio Surpresa"],
          text: [
            "Davy e Lucas, no médio, e o capitão Pedro Hiago, no superior, levaram a Órion a cinco pódios: 1º lugar no Labirinto MRC do nível médio, 1º lugar no Sumô universitário, 3º lugar no Labirinto da Robosummit, 3º lugar na Maratona (corrida de seguidores de linha da MRC) e 2º lugar no Desafio Surpresa.",
            "A equipe ainda participou da prova de Seguidor de linha com obstáculos da Robosummit."
          ],
          images: [{ caption: "Foto: robô no labirinto" }, { caption: "Foto: maratona de seguidores de linha" }, { caption: "Foto: desafio surpresa" }],
          members: ["orion-davy", "orion-lucas", "orion-pedro-hiago", "orion-carol"] },

        { layout: "split", side: "right", eyebrow: "Órion · MRC Brasil", title: "Dois primeiros lugares!",
          chips: ["1º Sumô universitário", "1º Labirinto · nível médio"],
          text: [
            "conquistamos o 1º lugar no Sumô universitário e no Labirinto do nível médio.",
            "Davy e Lucas disputaram o Labirinto no ensino médio. A equipe também competiu em outras modalidades da MRC e da Robosummit."
          ],
          images: [{ caption: "Foto da Órion no MRC · Sumô universitário" }],
        },
      ] },


    /* ===== OMR / MOVIEMA ===== */
    { id: "omr", teams: ["orion", "nexa"], short: "OMR · Moviema", name: "OMR — Olimpíada Moviema de Robótica",
      description: "Olimpíada do IEMA, em São Luís, para estudantes da educação básica ao ensino superior. Em 2026, ouro no sumô com a NEXA e prata em Registro de Mídia com a Órion.",
      categories: ["sumo", "resgate", "registro-midia"], year: "2026", images: [],
      members: ["orion-davy", "orion-lara", "orion-leonardo", "orion-lucas", "orion-felipe", "orion-ezequiel", "orion-ivylle", "orion-marjorie", "orion-bruna", "nexa-saulo", "nexa-israelly", "nexa-filipe-bispo", "nexa-paulo-ryan", "orion-carol"],
      text: [
        "A Olimpíada Moviema de Robótica é organizada pelo Instituto Estadual de Educação, Ciência e Tecnologia do Maranhão (IEMA) e reúne estudantes da educação básica ao ensino superior, de escolas públicas e privadas. Combina teoria e prática, com foco em programação, design, estratégia e inovação.",
        "As provas são Resgate Simples, Sumô, Cabo de Guerra e Registro do Evento. Em 2026, na 2ª edição, em São Luís, o núcleo foi com as duas equipes."
      ],
      sections: [
        { layout: "split", side: "right", eyebrow: "NEXA 404 · superior", title: "NEXA conquista o sumô",
          chips: ["1º lugar", "Sumô"],
          text: "Saulo, Israelly, Filipe Bispo e Paulo Ryan levaram a NEXA ao 1º lugar na prova de Sumô.",
          images: [{ caption: "Foto: NEXA 404 no pódio do sumô" }],
          members: ["nexa-saulo", "nexa-israelly", "nexa-filipe-bispo", "nexa-paulo-ryan"] },

        { layout: "stats", eyebrow: "2026 · 2ª edição · São Luís", title: "Ouro no sumô e prata em mídia",
          text: "Treze estudantes das duas equipes, do ensino médio ao superior, representaram o núcleo na competição.",
          stats: [
            { value: "1º", label: "Sumô — NEXA 404" },
            { value: "2º", label: "Registro de Mídia — Órion" },
            { value: "13", label: "estudantes em competição" }
          ],
          images: [{ caption: "Foto: equipes do núcleo na OMR 2026" }] },

        { layout: "split", side: "left", eyebrow: "Órion · médio e superior", title: "Registro de mídia, resgate e sumô",
          chips: ["2º lugar", "Registro de Mídia"],
          text: [
            "No ensino médio, Davy, Lara, Leo, Lucas, Felipe, Ezequiel e Ivylle fizeram a cobertura do evento, que rendeu o 2º lugar em Registro de Mídia. No superior, Marjorie e Bruna completaram a delegação.",
            "A Órion também participou das provas de Resgate e de Sumô, no médio e no superior."
          ],
          images: [{ caption: "Foto: equipe de mídia da Órion" }],
          video: { src: "assets/competicoes/omr/omr-sumo-medio-orion.mp4", poster: "assets/projetos/orion-turtle/orion-turtle-frontal.jpeg", mime: "video/mp4", caption: "Prova de Sumô · Órion, ensino médio · OMR 2026" },
          members: ["orion-davy", "orion-lara", "orion-leonardo", "orion-lucas", "orion-felipe", "orion-ezequiel", "orion-ivylle", "orion-marjorie", "orion-bruna"] },

      ] },


    /* ===== FIRA ===== */
    { id: "fira", teams: ["orion"], short: "FIRA", name: "FIRA RoboWorld Cup — Maranhão",
      description: "Etapas estaduais da FIRA RoboWorld Cup, torneio internacional de robótica educacional. Pódios em Cabo de Guerra (2025) e DRC-Explorer (2026).",
      categories: ["cabo-de-guerra", "drc-explorer", "missao-impossivel"], year: ["2025", "2026"], images: [],
      members: ["orion-davy", "orion-lara", "orion-felipe", "orion-guilherme", "orion-ezequiel", "orion-lucas", "orion-leonardo", "orion-carol"],
      text: [
        "A FIRA RoboWorld Cup é apontada como o maior torneio de robótica do mundo; em 2024, São Luís foi a primeira cidade brasileira a sediar a etapa internacional. No Maranhão, as etapas estaduais selecionam as equipes para a fase nacional e para o campeonato internacional.",
        "O núcleo disputou a etapa estadual nos dois anos e, em 2025, também o desafio online Missão Impossível."
      ],
      sections: [
        { layout: "mosaic", eyebrow: "2026 · Etapa estadual · Bacabal", title: "3º lugar no DRC-Explorer",
          chips: ["3º lugar", "DRC-Explorer", "Desafio surpresa"],
          text: [
            "Em março de 2026, o campus da UFMA em Bacabal recebeu a competição, que reuniu equipes de nove estados e de 32 cidades maranhenses nas modalidades DRC-Explorer, Cliff Hanger e Cabo de Guerra de Robôs.",
            "Davy, Lara, Leo e Lucas conquistaram o 3º lugar no DRC-Explorer e ainda encararam o desafio surpresa, a Missão Impossível."
          ],
          images: [{ caption: "Foto: robô DRC-Explorer" }, { caption: "Foto: equipe em Bacabal" }, { caption: "Foto: desafio surpresa" }],
          members: ["orion-davy", "orion-lara", "orion-leonardo", "orion-lucas", "orion-carol"] },

        { layout: "split", side: "right", eyebrow: "2025 · Etapa estadual · São Luís · 23 e 24 de maio", title: "Cabo de Guerra: 3º lugar no grupo 1",
          chips: ["3º lugar", "Cabo de Guerra", "Grupo 1 (baterias)"],
          text: [
            "A etapa estadual de 2025, realizada pelo IEMA no Golden Shopping Calhau, reuniu 166 equipes de todo o Maranhão.",
            "A Robotic Órion Saiph competiu no Cabo de Guerra de robôs e terminou em 3º lugar no grupo 1 (baterias)."
          ],
          images: [{ caption: "Foto: robô de Cabo de Guerra" }],
          members: ["orion-davy", "orion-lara", "orion-felipe", "orion-guilherme", "orion-ezequiel", "orion-carol"] },

        { layout: "text", eyebrow: "2025 · FIRA Online · 5 a 7 de setembro", title: "Missão Impossível",
          text: "Em setembro de 2025, a Órion Saiph participou do desafio online Missão Impossível. Não houve colocação a registrar. Em 2026, na etapa de Bacabal, a equipe voltou a enfrentar o desafio surpresa, a Missão Impossível." }
      ] },


    /* ===== Universo IFMA ===== */
    { id: "universo-ifma", teams: ["orion"], short: "Universo IFMA", name: "Universo IFMA",
      description: "Evento de inovação do Instituto Federal do Maranhão. Em 2025, a Órion Rígel foi campeã da Performance Artística.",
      categories: ["artistica"], year: "2025", images: [],
      members: ["orion-davy", "orion-lara", "orion-felipe", "orion-guilherme", "orion-ezequiel", "orion-carol"],
      text: [
        "O Universo IFMA é um evento do Instituto Federal do Maranhão, organizado pela Agência IFMA de Inovação, que estimula ideias inovadoras, pesquisa aplicada e empreendedorismo por meio de competições e exposições científicas, com uma mostra de robótica entre as atividades.",
        "Em 2025, a Robotic Órion Rígel disputou a Performance Artística."
      ],
      sections: [
        { layout: "banner", eyebrow: "2025 · 11 a 13 de novembro", title: "Rígel é ouro na Performance Artística",
          chips: ["1º lugar", "Performance Artística"],
          text: [
            "Davy, Lara, Felipe, Guilherme e Ezequiel, com a coordenação da Carol, levaram a Robotic Órion Rígel ao 1º lugar na Performance Artística.",
            "No ano seguinte, a Rígel repetiria o ouro na etapa estadual da OBR."
          ],
          images: [{ caption: "Foto: apresentação da Rígel no Universo IFMA" }],
          members: ["orion-davy", "orion-lara", "orion-felipe", "orion-guilherme", "orion-ezequiel", "orion-carol"] }
      ] },


    /* ===== LNR ===== */
    { id: "lnr", teams: ["orion"], short: "LNR", name: "LNR — Liga Nacional de Robótica",
      description: "Competição em que a Órion Rígel foi campeã da Performance Artística, em dezembro de 2025.",
      categories: ["artistica"], year: "2025", images: [],
      members: ["orion-davy", "orion-lara", "orion-felipe", "orion-guilherme", "orion-ezequiel", "orion-carol"],
      text: [
        "A LNR foi uma das últimas competições de 2025 do núcleo. A Robotic Órion Rígel competiu na Performance Artística, de 1 a 3 de dezembro, e levou o 1º lugar.",
        "Foi o segundo ouro artístico em menos de um mês, depois do Universo IFMA."
      ],
      sections: [
        { layout: "split", side: "left", eyebrow: "2025 · 1 a 3 de dezembro", title: "Segundo ouro artístico do ano",
          chips: ["1º lugar", "Performance Artística"],
          text: "A Rígel repetiu a boa fase da apresentação artística, com robô autônomo em cena, e terminou a competição no topo do pódio.",
          images: [{ caption: "Foto: Rígel na LNR 2025" }],
          members: ["orion-davy", "orion-lara", "orion-felipe", "orion-guilherme", "orion-ezequiel", "orion-carol"] }
      ] },


    /* ===== Prêmio Porto do Itaqui ===== */
    { id: "porto-itaqui", teams: ["orion"], short: "Prêmio Porto Itaqui", name: "Prêmio Porto do Itaqui",
      description: "Premiação do Governo do Maranhão para projetos de inovação nos setores portuário, marítimo e logístico. A Órion participou com um protótipo.",
      categories: ["prototipo"], year: "2025", images: [],
      members: ["orion-davy", "orion-lara", "orion-felipe", "orion-guilherme", "orion-ezequiel", "orion-carol"],
      text: [
        "O Prêmio Porto do Itaqui é uma premiação do Governo do Maranhão, em parceria entre a Empresa Maranhense de Administração Portuária (EMAP) e a Fapema, que incentiva trabalhos de inovação nos setores portuário, marítimo e logístico. Podem participar estudantes, pesquisadores, inventores e empresas do estado.",
        "O núcleo participou apresentando um protótipo."
      ],
      sections: [
        { layout: "split", side: "right", eyebrow: "2025 · Protótipo", title: "Da bancada à premiação",
          text: "A Órion apresentou um protótipo na premiação. Em breve, mais detalhes e fotos.",
          images: [{ caption: "Foto: protótipo apresentado no Prêmio Porto do Itaqui" }] }
      ] }
  ],


  /* ---------- CONQUISTAS (só pódios; a ordem aqui é a ordem na tela, do ano mais novo ao mais antigo) ---------- */
  achievements: [

    /* ----- 2026 ----- */
    { team: "orion", competition: "obr", year: "2026", place: 1, featured: true,
      title: "1º lugar — Robótica Artística, OBR Maranhão 2026",
      description: "Rígel (Davy, Lara, Gabi e Leonardo) campeã estadual em São Luís e classificada para a etapa nacional, em João Pessoa (PB)." },

    { team: "orion", competition: "robosummit", year: "2026", place: 1, featured: true,
      title: "1º lugar — Labirinto, MRC Brasil",
      description: "Conquista da Órion no nacional, em Angra dos Reis (RJ)." },

    { team: "orion", competition: "robosummit", year: "2026", place: 1, featured: true,
      title: "1º lugar — Sumô universitário, MRC Brasil · Robosummit",
      description: "Vitória da Órion na categoria universitária, em Angra dos Reis (RJ)." },

    { team: "nexa", competition: "omr", year: "2026", place: 1, featured: true,
      title: "1º lugar — Sumô, Olimpíada Moviema de Robótica",
      description: "NEXA 404 campeã do sumô na 2ª OMR, em São Luís." },

    { team: "orion", competition: "robosummit", year: "2026", place: 2,
      title: "2º lugar — Desafio Surpresa, MRC Brasil",
      description: "Pódio da Órion no nacional, em Angra dos Reis (RJ)." },

    { team: "orion", competition: "omr", year: "2026", place: 2,
      title: "2º lugar — Registro de Mídia, Olimpíada Moviema de Robótica",
      description: "Cobertura do evento feita pela equipe Órion, em São Luís." },

    { team: "orion", competition: "robosummit", year: "2026", place: 3,
      title: "3º lugar — Labirinto, Robosummit",
      description: "Terceira colocação da Órion na prova da Robosummit." },

    { team: "orion", competition: "robosummit", year: "2026", place: 3,
      title: "3º lugar — Maratona (corrida de seguidores de linha), MRC Brasil",
      description: "Pódio da Órion na maratona de seguidores de linha." },

    { team: "orion", competition: "fira", year: "2026", place: 3,
      title: "3º lugar — DRC-Explorer, FIRA Estadual 2026",
      description: "Davy, Lara, Leo e Lucas no pódio da etapa de Bacabal." },

    /* ----- 2025 ----- */
    { team: "orion", competition: "lnr", year: "2025", place: 1, featured: true,
      title: "1º lugar — Performance Artística, LNR 2025",
      description: "Robotic Órion Rígel campeã, de 1 a 3 de dezembro." },

    { team: "orion", competition: "universo-ifma", year: "2025", place: 1, featured: true,
      title: "1º lugar — Performance Artística, Universo IFMA 2025",
      description: "Robotic Órion Rígel campeã, de 11 a 13 de novembro." },

    { team: "orion", competition: "fira", year: "2025", place: 3,
      title: "3º lugar (grupo 1, baterias) — Cabo de Guerra, FIRA Estadual 2025",
      description: "Robotic Órion Saiph na etapa estadual, em São Luís." }
  ],


  /* ---------- NOTÍCIAS (a ordem aqui é a ordem na tela) ---------- */
  news: [
    { date: "2026-08-04", title: "Rígel é campeã estadual de Robótica Artística e vai ao nacional da OBR",
      summary: "A equipe Robotic Órion Rígel conquistou o 1º lugar na etapa estadual, em São Luís, e garantiu a vaga para a final nacional, em João Pessoa (PB).",
      image: "", link: "" },

    { date: "2026", title: "Núcleo volta de Angra dos Reis com cinco pódios",
      summary: "Na MRC Brasil e na Robosummit, a Órion conquistou cinco pódios, incluindo dois primeiros lugares.",
      image: "", link: "" },

    { date: "2025-12-03", title: "Órion Rígel é ouro na Performance Artística da LNR",
      summary: "O título veio menos de um mês depois do primeiro lugar no Universo IFMA.",
      image: "", link: "" },

    { date: "2025-11-13", title: "Universo IFMA: 1º lugar na Performance Artística",
      summary: "Davy, Lara, Felipe, Guilherme e Ezequiel apresentaram a Rígel e levaram o ouro.",
      image: "", link: "" }
  ],


  /* ---------- PROJETOS ---------- */
  projects: [

    /* ===== Robô de Resgate ===== */
    { id: "robo-resgate", teams: ["orion"], category: "Pesquisa", title: "Robô de Resgate — Orion Turtle", status: "Em andamento",
      description: "Robô autônomo de resgate usado na OBR e planejado para outras competições, com visão computacional, eletrônica embarcada e impressão 3D.",
      members: ["orion-felipe", "orion-guilherme", "orion-ezequiel", "orion-carol"],
      image: "assets/projetos/orion-turtle/orion-turtle-frontal.jpeg", imageAlt: "Vista frontal do robô Orion Turtle, com chassi azul e sensores", imageCaption: "Orion Turtle · protótipo de resgate",
      mediaGalleryTitle: "Fotos e vídeos do Orion Turtle",
      mediaGalleryDescription: "Fotos da equipe e do Orion Turtle na OBR, um detalhe da garra e registros em vídeo do projeto.",
      mediaGallery: [
        { src: "assets/projetos/orion-turtle/orion-turtle-frontal.jpeg", caption: "Vista frontal do protótipo Orion Turtle", width: 1600, height: 1200, featured: true },
        { src: "assets/projetos/orion-turtle/orion-turtle-garra.jpeg", caption: "Protótipo com garra articulada para manipulação de objetos", width: 768, height: 1365 },
        { src: "assets/competicoes/obr/obr-orion-turtle-equipe-01.jpeg", caption: "Equipe Órion Saiph com o Orion Turtle durante a OBR · registro 1", width: 1404, height: 936 },
        { src: "assets/competicoes/obr/obr-orion-turtle-equipe-02.jpeg", caption: "Equipe Órion Saiph com o Orion Turtle durante a OBR · registro 2", width: 1404, height: 936 },
        { type: "video", src: "assets/projetos/orion-turtle/orion-turtle-registro.mp4", poster: "assets/projetos/orion-turtle/orion-turtle-frontal.jpeg", caption: "Registro em vídeo do desenvolvimento do Orion Turtle", mime: "video/mp4" }
      ],
      link: "",
      text: [
        "O Orion Turtle é um robô autônomo para locomoção em terrenos irregulares, navegação sobre linhas e manipulação de objetos em ambientes de resgate simulado. O projeto de pesquisa é conduzido por Felipe e Guilherme, com o voluntário Ezequiel e a orientação da professora Ana Caroline Meireles Soares (Carol).",
        "Ele foi desenvolvido no IFMA Campus Santa Inês com bolsas PIBITI (Edital PRPGI Nº 08/2025 — PIBITI Ensino Médio 2025/2026, CNPq/IFMA). A ideia é usá-lo na OBR e em outras competições de resgate."
      ],
      sections: [
        { layout: "text", eyebrow: "Publicação", title: "Resumo expandido",
          text: [
            "O trabalho apresenta o desenvolvimento e a validação experimental do Orion Turtle, um robô autônomo para locomoção em terrenos irregulares, navegação determinística e manipulação de objetos por padrões de cor. O protótipo combina tração por esteiras, controle ESP32-S3 com FreeRTOS e sensores para navegação e resgate. Na OBR Maranhão, passou de 120 pontos em arena média (2025) para 288 pontos em arena difícil (2026), avançando da 27ª para a 13ª posição estadual.",
            "Autores: Luiz Felipe Nascimento Leal, Pedro Guilherme Mendes Sousa, Ezequiel Araujo Nascimento e Ana Caroline Meireles Soares."
          ],
          links: [] },
        { layout: "stats", eyebrow: "Ficha técnica", title: "Orion Turtle em números",
          text: "Do primeiro modelo, com rodas, à tração por esteiras: quatro iterações de engenharia até a versão que foi para a arena.",
          stats: [
            { value: "4", label: "motores JGY-370 com encoders" },
            { value: "8", label: "sensores infravermelhos QRE1113" },
            { value: "2", label: "núcleos de processamento (ESP32-S3)" },
            { value: "7", label: "meses de modelagem 3D no Fusion 360" }
          ],
          images: [{ src: "assets/projetos/orion-turtle/orion-turtle-montagem.jpeg", caption: "Montagem e integração dos componentes eletrônicos do Orion Turtle", width: 1500, height: 1000 }] },

        { layout: "split", side: "left", eyebrow: "Mecânica e impressão 3D", title: "Esteiras, garra e chassi impresso",
          text: [
            "O chassi modular foi modelado no Autodesk Fusion 360 e impresso em PLA numa Creality Ender 3 V3 SE. A tração por esteiras contínuas, acionadas por quatro motores com redução metálica, eliminou o escorregamento nas rampas da arena.",
            "Para recolher as vítimas, a garra articulada evoluiu da versão 1.0 até a v2.2, com servomotores metálicos."
          ],
          images: [{ src: "assets/projetos/orion-turtle/orion-turtle-FUSION.jpeg", caption: "Modelo do Orion Turtle desenvolvido no Autodesk Fusion 360", width: 1600, height: 1200 }] },

        { layout: "split", side: "right", eyebrow: "Eletrônica e programação", title: "Dois núcleos, nenhuma leitura perdida",
          text: [
            "O controle roda em um ESP32-S3 com FreeRTOS: a leitura dos sensores de cor TCS34725 fica em um núcleo, e a navegação, em outro. Um semáforo mutex protege o barramento I2C compartilhado.",
            "A detecção de cores usa normalização fotométrica para reconhecer o verde (cruzamentos) e o vermelho (parada). Bibliotecas próprias cuidam dos motores e dos sensores infravermelhos."
          ],
          chips: ["ESP32-S3", "FreeRTOS", "C++", "Sensores de cor e ToF"],
          images: [{ src: "assets/projetos/orion-turtle/orion-turtle-programacao.jpeg", caption: "Programação e preparação dos testes do Orion Turtle", width: 1500, height: 1000 }] },

        { layout: "split", side: "right", eyebrow: "Na arena", title: "De 120 a 288 pontos",
          chips: ["+140% de desempenho", "13º lugar na OBR 2026"],
          text: [
            "Na OBR Maranhão, o robô passou de 120 pontos em 2025 (arena média) para 288 pontos em 2026 (arena difícil), o que dá um ganho de 140%.",
            "O desempenho foi descrito no resumo expandido “Protótipo robótico autônomo para locomoção e manipulação de objetos aplicado à robótica educacional”."
          ],
          links: [{ label: "Ver a OBR", href: "competicao.html?c=obr" }],
          images: [{ src: "assets/projetos/orion-turtle/orion-turtle-teste-arena.jpeg", caption: "Orion Turtle durante teste de navegação em arena", width: 1500, height: 1000 }] },

        { layout: "text", eyebrow: "Próximos passos", title: "Visão computacional e outras competições",
          text: "A equipe pretende embarcar visão computacional em uma ESP32-S3 CAM, com comunicação sem fio ESP-NOW, para identificar vítimas em três dimensões, e levar o robô a outras etapas de competições de resgate." }
      ] },


    /* ===== Robô Humanoide ===== */
    { id: "robo-humanoide", teams: ["orion"], category: "Pesquisa", title: "Robô Humanoide", status: "Em andamento",
      description: "Projeto de pesquisa do ensino superior para desenvolver um robô humanoide.",
      members: ["orion-pedro-hiago", "orion-marjorie", "orion-rynalde", "orion-emilly", "orion-geovanna"],
      image: "", link: "",
      text: [
        "O Robô Humanoide é um projeto de pesquisa do ensino superior da Órion, conduzido por Pedro Hiago (capitão da equipe), Marjorie, Rynalde, Emilly e Geovanna.",
        "O projeto está em desenvolvimento, e as informações técnicas serão publicadas aqui."
      ],
      sections: [
        { layout: "split", side: "right", eyebrow: "Pesquisa", title: "Um robô com forma humana",
          text: "Em breve, mais detalhes sobre o projeto: estrutura, articulações, eletrônica e o que a equipe já testou.",
          images: [{ caption: "Foto: protótipo do robô humanoide" }] },

        { layout: "trio", eyebrow: "Bastidores", title: "Do desenho ao protótipo",
          text: "Espaço para as imagens do processo: modelagem, montagem e testes.",
          images: [{ caption: "Foto: modelagem" }, { caption: "Foto: montagem" }, { caption: "Foto: testes" }] }
      ] },


    /* ===== TecnoArte ===== */
    { id: "tecnoarte", teams: ["orion"], category: "Extensão", title: "TecnoArte — O Despertar da Programação", status: "Em andamento",
      description: "Mangá educativo que ensina lógica de programação com raízes indígenas e aulas presenciais no IFMA Campus Santa Inês, com a participação de crianças e jovens da aldeia Guajajara próxima ao campus.",
      members: ["orion-carol", "orion-bruna", "orion-marjorie", "orion-davy", "orion-lucas", "orion-leonardo", "orion-ivylle", "orion-rynalde", "orion-angelo", "orion-ellen-cavalcante", "orion-ryan-kallebe", "orion-luis-alberto"],
      image: "assets/tecnoarte/media/aula-2026-09-24-03.webp", imageAlt: "Encontro do projeto no IFMA Campus Santa Inês", imageCaption: "Encontro do projeto · 24 set. 2026", placeholder: "Registros das atividades de extensão", link: "",
      mediaGalleryTitle: "Encontros na escola",
      mediaGalleryDescription: "As crianças e os jovens da comunidade Guajajara vêm ao IFMA Campus Santa Inês para participar das aulas e atividades do projeto.",
      mediaGallery: [
          { src: "assets/tecnoarte/media/aula-2026-09-17-01.webp", caption: "Registro do projeto no IFMA Campus Santa Inês · 17 set. 2026", width: 1800, height: 2400 },
          { src: "assets/tecnoarte/media/aula-2026-09-17-02.webp", caption: "Registro do projeto no IFMA Campus Santa Inês · 17 set. 2026", width: 2400, height: 1800 },
          { src: "assets/tecnoarte/media/aula-2026-09-22-01.webp", caption: "Registro do projeto no IFMA Campus Santa Inês · 22 set. 2026", width: 2400, height: 1594 },
          { src: "assets/tecnoarte/media/aula-2026-09-22-02.webp", caption: "Registro do projeto no IFMA Campus Santa Inês · 22 set. 2026", width: 2400, height: 1594 },
          { src: "assets/tecnoarte/media/aula-2026-09-22-03.webp", caption: "Registro do projeto no IFMA Campus Santa Inês · 22 set. 2026", width: 2400, height: 1594 },
          { src: "assets/tecnoarte/media/aula-2026-09-22-04.webp", caption: "Registro do projeto no IFMA Campus Santa Inês · 22 set. 2026", width: 2400, height: 1594 },
          { src: "assets/tecnoarte/media/aula-2026-09-22-05.webp", caption: "Registro do projeto no IFMA Campus Santa Inês · 22 set. 2026", width: 1280, height: 850 },
          { src: "assets/tecnoarte/media/aula-2026-09-24-01.webp", caption: "Registro do projeto no IFMA Campus Santa Inês · 24 set. 2026", width: 1351, height: 2400 },
          { src: "assets/tecnoarte/media/aula-2026-09-24-02.webp", caption: "Registro do projeto no IFMA Campus Santa Inês · 24 set. 2026", width: 1351, height: 2400 },
          { src: "assets/tecnoarte/media/aula-2026-09-24-03.webp", caption: "Registro do projeto no IFMA Campus Santa Inês · 24 set. 2026", width: 2400, height: 1351 , featured: true },
          { src: "assets/tecnoarte/media/aula-2026-10-08-01.webp", caption: "Registro do projeto no IFMA Campus Santa Inês · 8 out. 2026", width: 2400, height: 1350 },
          { src: "assets/tecnoarte/media/aula-2026-10-08-02.webp", caption: "Registro do projeto no IFMA Campus Santa Inês · 8 out. 2026", width: 2400, height: 1351 },
          { src: "assets/tecnoarte/media/aula-2026-10-08-03.webp", caption: "Registro do projeto no IFMA Campus Santa Inês · 8 out. 2026", width: 2400, height: 1350 },
          { type: "video", src: "assets/tecnoarte/media/atividade-2026-09-17.mp4", caption: "Registro em vídeo de atividade do projeto no IFMA Campus Santa Inês · 17 set. 2026", mime: "video/mp4" }
      ],
      text: [
        "O TecnoArte: Robótica, Programação e Cultura por meio de Mangás Educativos é um projeto de extensão do IFMA — Campus Santa Inês que aproxima o pensamento computacional de contextos culturais indígenas, pelo caminho da narrativa, da ilustração e de situações da vida na aldeia.",
        "Em duas fases (2025 e 2026), crianças e jovens da aldeia Guajajara próxima ao campus vêm ao IFMA Campus Santa Inês para participar de aulas presenciais. Os estudantes do Núcleo preparam e conduzem as atividades de programação e robótica, apoiadas pelo mangá educacional. O projeto está ligado ao ODS 4 — Educação de Qualidade."
      ],
      sections: [
        { layout: "text", eyebrow: "O mangá", title: "Ciência da computação contada ao redor do fogo",
          text: [
            "O mangá acompanha Tapixi, Zahy e Tàmuz, personagens da Aldeia Januária, na Terra Indígena Rio Pindaré. Linguagem, entrada e saída de dados, variáveis, condições, laços de repetição e funções aparecem pelas situações da natureza e pelos saberes da aldeia.",
            "A capa e a ilustração são de Cristiano Caragiu Viana Guajajara Júnior."
          ],
          links: [
            { label: "Ler o mangá na Editora IFMA", href: "https://editora.ifma.edu.br/index.php/edifma/catalog/book/139" },
            { label: "Visitar o site do TecnoArte", href: "tecnoarte.html", featured: true, newTab: true }
          ] },

        { layout: "text", eyebrow: "A história", title: "O Eco das Sementes Douradas",
          text: [
            "O primeiro capítulo apresenta a ideia de linguagem e o ciclo de entrada, processamento e saída pela metáfora das sementes.",
            "Os capítulos seguintes relacionam cada conceito de programação a acontecimentos da história: a ordem do plantio é a sequência, e as estações que se repetem são os laços de repetição."
          ] },

        { layout: "text", eyebrow: "Extensão", title: "A aldeia vem à escola",
          chips: ["IFMA Campus Santa Inês", "Comunidade Guajajara", "2025 · 2026"],
          text: [
            "Nas duas fases do projeto, crianças e jovens da aldeia Guajajara próxima ao campus vêm ao IFMA Campus Santa Inês para participar das aulas presenciais.",
            "Os estudantes do Núcleo planejam e conduzem atividades de programação e robótica na escola. O mangá serve de ponto de partida para práticas e exercícios construídos pela equipe."
          ] },

      ] }
  ],


  /* ---------- GALERIA (espaços reservados: preencha "src" quando tiver a foto) ---------- */
  gallery: [
    { year: "2026", equipe: ["orion"], caption: "OBR Maranhão 2026 — Rígel no pódio", src: "" },
    { year: "2026", equipe: ["orion", "nexa"], caption: "MRC Brasil · Robosummit — Angra dos Reis", src: "" },
    { year: "2026", equipe: ["orion", "nexa"], caption: "Olimpíada Moviema de Robótica — São Luís", src: "" },
    { year: "2026", equipe: ["orion"], caption: "FIRA Estadual 2026 — Bacabal", src: "" },
    { year: "2025", equipe: ["orion"], caption: "LNR 2025 — Performance Artística", src: "" },
    { year: "2025", equipe: ["orion"], caption: "Universo IFMA 2025 — Performance Artística", src: "" },
    { year: "2025", equipe: ["orion"], caption: "FIRA Estadual 2025 — Cabo de Guerra", src: "" }
  ],


  /* ---------- INTEGRANTES ---------- */
  members: [
    /* --- Órion · médio --- */
    { id: "orion-lucas", team: "orion", level: "medio", name: "Lucas", role: "Programação", photo: "assets/orion/members/lucas.png", socials: { Instagram: "https://www.instagram.com/lucas.yyp/" } },
    { id: "orion-davy", team: "orion", level: "medio", name: "Davy", role: ["Montagem", "Programação", "Mídia"], photo: "assets/orion/members/davy.png", socials: { Instagram: "https://www.instagram.com/davyxcosta/" } },
    { id: "orion-felipe", team: "orion", level: "medio", name: "Felipe", role: ["Mecânica", "Montagem", "Eletrônica"], photo: "assets/orion/members/felipe.png", socials: { Instagram: "https://www.instagram.com/philyppe.nleal/" } },
    { id: "orion-guilherme", team: "orion", level: "medio", name: "Guilherme", role: ["Programação", "Montagem", "Eletrônica"], photo: "assets/orion/members/guilherme.png", socials: { Instagram: "https://www.instagram.com/pg.mendess/" } },
    { id: "orion-lara", team: "orion", level: "medio", name: "Lara", role: ["Figurino e ornamentação artística", "Mídia"], photo: "assets/orion/members/lara.png", socials: { Instagram: "https://www.instagram.com/lara.jansen._/" } },
    { id: "orion-ezequiel", team: "orion", level: "medio", name: "Ezequiel", role: "Mecânica", photo: "assets/orion/members/ezequiel.png" },
    { id: "orion-leonardo", team: "orion", level: "medio", name: "Leonardo “Leo”", role: "Montagem", photo: "assets/orion/members/leonardo.png" },
    { id: "orion-gabi", team: "orion", level: "medio", name: "Gabi", role: "Integrante" },
    { id: "orion-ivylle", team: "orion", level: "medio", name: "Ivylle", role: "Integrante" },

    /* --- Órion · superior --- */
    { id: "orion-carol", team: "orion", level: "superior", name: "Carol Meireles", role: "Coordenação", photo: "assets/orion/members/carol.png", socials: { Instagram: "https://www.instagram.com/anacarolmeireles_/" } },
    { id: "orion-pedro-hiago", team: "orion", level: "superior", name: "Pedro Hiago", role: "Capitão" },
    { id: "orion-marjorie", team: "orion", level: "superior", name: "Marjorie", role: ["Programação", "Mídia"], photo: "assets/orion/members/marjorie.png", socials: { Instagram: "https://www.instagram.com/eng.marjoriecastro/" } },
    { id: "orion-bruna", team: "orion", level: "superior", name: "Bruna", role: "Integrante" },
    { id: "orion-rynalde", team: "orion", level: "superior", name: "Rynalde", role: "Integrante" },
    { id: "orion-emilly", team: "orion", level: "superior", name: "Emilly", role: "Integrante" },
    { id: "orion-geovanna", team: "orion", level: "superior", name: "Geovanna", role: "Integrante" },
    { id: "orion-angelo", team: "orion", name: "Angelo", role: "Aulas e formação" },
    { id: "orion-ellen-cavalcante", team: "orion", name: "Ellen Cavalcante", role: "Aulas e formação" },
    { id: "orion-ryan-kallebe", team: "orion", name: "Ryan Kallebe", role: "Aulas e formação" },
    { id: "orion-luis-alberto", team: "orion", name: "Luis Alberto", role: "Professor" },

    /* --- NEXA 404 · superior --- */
    { id: "nexa-saulo", team: "nexa", level: "superior", name: "Saulo", role: "Integrante" },
    { id: "nexa-israelly", team: "nexa", level: "superior", name: "Israelly", role: "Integrante" },
    { id: "nexa-filipe-bispo", team: "nexa", level: "superior", name: "Filipe Bispo", role: "Integrante" },
    { id: "nexa-paulo-ryan", team: "nexa", level: "superior", name: "Paulo Ryan", role: "Integrante" }
  ]
};
