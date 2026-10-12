/* Conteúdo do site: competitions. Edite esta lista para atualizar os dados relacionados. */
window.NUCLEO_DATA = window.NUCLEO_DATA || {};
window.NUCLEO_DATA.competitions = [

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
  ];

