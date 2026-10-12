/* Conteúdo do site: projects. Edite esta lista para atualizar os dados relacionados. */
window.NUCLEO_DATA = window.NUCLEO_DATA || {};
window.NUCLEO_DATA.projects = [

    /* ===== Robô de Resgate ===== */
    { id: "robo-resgate", teams: ["orion"], category: "Pesquisa", title: "Robô de Resgate: Orion Turtle", status: "Em andamento",
      description: "Robô autônomo de resgate da Órion, desenvolvido com tração por esteiras, navegação por linha e uma garra articulada para manipular objetos.",
      members: ["orion-felipe", "orion-guilherme", "orion-ezequiel", "orion-carol"],
      image: "assets/projetos/orion-turtle/orion-turtle-frontal.jpeg",
      imageAlt: "Orion Turtle visto de frente, com sensores e estrutura de resgate",
      imageCaption: "Orion Turtle, robô de resgate desenvolvido pela equipe Órion Saiph",
      imageWidth: 1600, imageHeight: 1200,
      teamFeature: {
        src: "assets/competicoes/obr/obr-orion-turtle-equipe-01.jpeg",
        alt: "Os integrantes da equipe Órion Saiph apresentam o Orion Turtle durante a OBR",
        caption: "Órion Saiph e Orion Turtle, OBR 2025",
        width: 1404, height: 936,
        link: "competicao.html?c=obr",
        video: {
          src: "assets/projetos/orion-turtle/orion-turtle-seguidor-resgate-obr-2025.mp4",
          mime: "video/mp4",
          caption: "Orion Turtle segue a linha durante a prova de Resgate, OBR 2025"
        }
      },
      mediaGalleryTitle: "Fotos e vídeos do Orion Turtle",
      mediaGalleryDescription: "Registros do projeto, da montagem à navegação do Orion Turtle na arena.",
      mediaGallery: [
        { src: "assets/projetos/orion-turtle/orion-turtle-garra-frontal.jpeg", caption: "Orion Turtle com a garra articulada", width: 1600, height: 1200 },
        { src: "assets/projetos/orion-turtle/orion-turtle-integracao-eletronica.jpeg", caption: "Integração dos componentes e cabeamento do robô", width: 1500, height: 1000 },
        { src: "assets/projetos/orion-turtle/orion-turtle-teste-seguidor-resgate.jpeg", caption: "Teste de navegação por linha na arena de resgate", width: 1500, height: 1000 },
        { src: "assets/projetos/orion-turtle/orion-turtle-modelagem-fusion.jpeg", caption: "Modelagem do Orion Turtle no Fusion 360", width: 1600, height: 900 },
        { src: "assets/projetos/orion-turtle/orion-turtle-tracao-esteiras.jpeg", caption: "Detalhe do conjunto de tração e esteiras", width: 1600, height: 900 },
        { src: "assets/projetos/orion-turtle/orion-turtle-prototipo-sensores.jpeg", caption: "Protótipo de resgate com sensores e garra", width: 1599, height: 899 },
      ],
      link: "",
      text: [
        "O Orion Turtle é um robô autônomo para locomoção em terrenos irregulares, navegação sobre linhas e manipulação de objetos em ambientes de resgate simulado. O projeto de pesquisa é conduzido por Felipe e Guilherme, com o voluntário Ezequiel e a orientação da professora Ana Caroline Meireles Soares (Carol).",
        "Ele foi desenvolvido no IFMA Campus Santa Inês com bolsas PIBITI (Edital PRPGI Nº 08/2025: PIBITI Ensino Médio 2025/2026, CNPq/IFMA). A ideia é usá-lo na OBR e em outras competições de resgate."
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
          images: [{ src: "assets/projetos/orion-turtle/orion-turtle-FUSION.jpeg", caption: "Modelo do Orion Turtle desenvolvido no Autodesk Fusion 360", width: 1600, height: 900 }] },

        { layout: "split", side: "right", eyebrow: "Eletrônica e programação", title: "Dois núcleos",
          text: [
            "O controle roda em um ESP32-S3 com FreeRTOS: a leitura dos sensores de cor TCS34725 fica em um núcleo, e a navegação, em outro. Um semáforo mutex protege o barramento I2C compartilhado.",
            "A detecção de cores usa normalização fotométrica para reconhecer o verde (cruzamentos) e o vermelho (parada). Bibliotecas próprias cuidam dos motores e dos sensores infravermelhos."
          ],
          chips: ["ESP32-S3", "FreeRTOS", "C++", "Sensores de cor e ToF"],
          images: [{ src: "assets/projetos/orion-turtle/orion-turtle-programacao.jpeg", caption: "Programação e preparação dos testes do Orion Turtle", width: 1500, height: 1000 }] },

        { layout: "split", side: "right", eyebrow: "OBR, Resgate", title: "De 120 a 288 pontos",
          chips: ["+140% de desempenho", "13º lugar na OBR 2026"],
          text: [
            "Na OBR Maranhão, o robô passou de 120 pontos em 2025 (arena média) para 288 pontos em 2026 (arena difícil), o que dá um ganho de 140%.",
            "O desempenho foi descrito no resumo expandido “Protótipo robótico autônomo para locomoção e manipulação de objetos aplicado à robótica educacional”."
          ],
          images: [{ src: "assets/projetos/orion-turtle/orion-turtle-teste-arena.jpeg", caption: "Orion Turtle durante teste de navegação em arena", width: 1500, height: 1000 }] },

        { layout: "split", side: "left", eyebrow: "Próximos passos", title: "Visão computacional e outras competições",
          text: "A equipe pretende embarcar visão computacional em uma ESP32-S3 CAM, com comunicação sem fio ESP-NOW, para identificar vítimas em três dimensões, e levar o robô a outras etapas de competições de resgate.",
          images: [{ src: "assets/projetos/orion-turtle/ezequiel-trabalhando-no-orion-turtle.jpeg", caption: "Ezequiel ajusta o Orion Turtle durante o desenvolvimento do robô", width: 1500, height: 1000, fit: "natural" }] }
      ] },


    /* ===== Robô Humanoide ===== */
    { id: "robo-humanoide", teams: ["orion"], category: "Pesquisa", title: "Robô Humanoide", status: "Em andamento",
      description: "Projeto de pesquisa da Órion, em desenvolvimento por estudantes do ensino superior do IFMA Campus Santa Inês.",
      members: ["orion-pedro-hiago", "orion-marjorie", "orion-rynalde", "orion-emilly", "orion-geovanna"],
      image: "", link: "",
      text: [
        "O projeto de pesquisa reúne Pedro Hiago, Marjorie, Rynalde, Emilly e Geovanna, estudantes do ensino superior da Órion.",
        "A equipe está desenvolvendo o robô. Esta página será atualizada conforme novas etapas e informações do projeto forem documentadas."
      ],
      sections: [
        { layout: "split", side: "right", eyebrow: "Pesquisa em andamento", title: "Desenvolvimento do robô humanoide",
          text: "A equipe está trabalhando no projeto. Detalhes sobre estrutura, articulações e testes serão acrescentados quando estiverem documentados.",
          images: [{ caption: "Registro do desenvolvimento do robô humanoide" }] },

        { layout: "trio", eyebrow: "Etapas do projeto", title: "Modelagem, montagem e testes",
          text: "Os registros desta seção serão incluídos à medida que a equipe documentar as etapas do desenvolvimento.",
          images: [{ caption: "Registro da modelagem" }, { caption: "Registro da montagem" }, { caption: "Registro dos testes" }] }
      ] },


    /* ===== TecnoArte ===== */
    { id: "tecnoarte", teams: ["orion"], category: "Extensão", title: "TecnoArte: O Despertar da Programação", status: "Em andamento",
      description: "Mangá educativo que ensina lógica de programação com raízes indígenas e aulas presenciais no IFMA Campus Santa Inês, com a participação de crianças e jovens da aldeia Guajajara próxima ao campus.",
      members: ["orion-carol", "orion-bruna", "orion-marjorie", "orion-davy", "orion-lucas", "orion-leonardo", "orion-ivylle", "orion-rynalde", "orion-angelo", "orion-ellen-cavalcante", "orion-ryan-kallebe", "orion-luis-alberto"],
      image: "assets/tecnoarte/media/aula-2026-09-24-03.webp", imageAlt: "Encontro do projeto no IFMA Campus Santa Inês", imageCaption: "Encontro do projeto, 24 set. 2026", placeholder: "Registros das atividades de extensão", link: "",
      mediaGalleryTitle: "Encontros na escola",
      mediaGalleryDescription: "As crianças e os jovens da comunidade Guajajara vêm ao IFMA Campus Santa Inês para participar das aulas e atividades do projeto.",
      mediaGallery: [
          { src: "assets/tecnoarte/media/aula-2026-09-17-02.webp", caption: "Registro do projeto no IFMA Campus Santa Inês, 17 set. 2026", width: 2400, height: 1800 },
          { src: "assets/tecnoarte/media/aula-2026-09-22-01.webp", caption: "Registro do projeto no IFMA Campus Santa Inês, 22 set. 2026", width: 2400, height: 1594 },
          { src: "assets/tecnoarte/media/aula-2026-09-22-03.webp", caption: "Registro do projeto no IFMA Campus Santa Inês, 22 set. 2026", width: 2400, height: 1594 },
          { src: "assets/tecnoarte/media/aula-2026-09-22-04.webp", caption: "Registro do projeto no IFMA Campus Santa Inês, 22 set. 2026", width: 2400, height: 1594 },
          { src: "assets/tecnoarte/media/aula-2026-09-22-05.webp", caption: "Registro do projeto no IFMA Campus Santa Inês, 22 set. 2026", width: 1280, height: 850 },
          { src: "assets/tecnoarte/media/aula-2026-09-24-03.webp", caption: "Registro do projeto no IFMA Campus Santa Inês, 24 set. 2026", width: 2400, height: 1351 , featured: true },
          { src: "assets/tecnoarte/media/aula-2026-10-08-01.webp", caption: "Registro do projeto no IFMA Campus Santa Inês, 8 out. 2026", width: 2400, height: 1350 },
          { src: "assets/tecnoarte/media/aula-2026-10-08-03.webp", caption: "Registro do projeto no IFMA Campus Santa Inês, 8 out. 2026", width: 2400, height: 1350 },
          { type: "video", src: "assets/tecnoarte/media/atividade-2026-09-17.mp4", caption: "Registro em vídeo de atividade do projeto no IFMA Campus Santa Inês, 17 set. 2026", mime: "video/mp4" }
      ],
      text: [
        "O TecnoArte: Robótica, Programação e Cultura por meio de Mangás Educativos é um projeto de extensão do IFMA Campus Santa Inês que aproxima o pensamento computacional de contextos culturais indígenas, pelo caminho da narrativa, da ilustração e de situações da vida na aldeia.",
        "Em duas fases (2025 e 2026), crianças e jovens da aldeia Guajajara próxima ao campus vêm ao IFMA Campus Santa Inês para participar de aulas presenciais. Os estudantes do Núcleo preparam e conduzem as atividades de programação e robótica, apoiadas pelo mangá educacional. O projeto está ligado ao ODS 4: Educação de Qualidade."
      ],
      sections: [
        { layout: "text", presentation: "editorial", eyebrow: "O mangá", title: "Ciência da computação contada ao redor do fogo",
          text: [
            "O mangá acompanha Tapixi, Zahy e Tàmuz, personagens da Aldeia Januária, na Terra Indígena Rio Pindaré. Linguagem, entrada e saída de dados, variáveis, condições, laços de repetição e funções aparecem pelas situações da natureza e pelos saberes da aldeia.",
            "A capa e a ilustração são de Cristiano Caragiu Viana Guajajara Júnior."
          ],
          links: [
            { label: "Ler o mangá na Editora IFMA", href: "https://editora.ifma.edu.br/index.php/edifma/catalog/book/139" },
            { label: "Visitar o site do TecnoArte", href: "tecnoarte.html", featured: true, newTab: true }
          ] },

        { layout: "split", side: "right", eyebrow: "A história", title: "O Eco das Sementes Douradas",
          text: [
            "O primeiro capítulo apresenta a ideia de linguagem e o ciclo de entrada, processamento e saída pela metáfora das sementes.",
            "Os capítulos seguintes relacionam cada conceito de programação a acontecimentos da história: a ordem do plantio é a sequência, e as estações que se repetem são os laços de repetição."
          ],
          images: [{ src: "assets/tecnoarte/media/aula-2026-09-22-03.webp", caption: "Encontro dos estudantes durante as atividades do TecnoArte", width: 2400, height: 1594, fit: "natural" }] },

        { layout: "split", side: "left", eyebrow: "Extensão", title: "A aldeia vem à escola",
          chips: ["IFMA Campus Santa Inês", "Comunidade Guajajara", "2025, 2026"],
          text: [
            "Nas duas fases do projeto, crianças e jovens da aldeia Guajajara próxima ao campus vêm ao IFMA Campus Santa Inês para participar das aulas presenciais.",
            "Os estudantes do Núcleo planejam e conduzem atividades de programação e robótica na escola. O mangá serve de ponto de partida para práticas e exercícios construídos pela equipe."
          ],
          images: [{ src: "assets/tecnoarte/media/aula-2026-09-22-02.webp", caption: "Educadora conduz uma atividade com estudantes no IFMA, 22 set. 2026", width: 2400, height: 1594, fit: "natural" }] },

        { layout: "split", side: "right", eyebrow: "Aprendizagem prática", title: "Programação feita em conjunto",
          text: [
            "Nas oficinas, crianças e jovens experimentam os conceitos de programação diretamente nos computadores, enquanto os estudantes do Núcleo acompanham as atividades e ajudam a transformar cada etapa em descoberta.",
            "A prática aproxima o conteúdo do mangá da criação de soluções e da troca entre os participantes."
          ],
          images: [{ src: "assets/tecnoarte/media/aula-2026-10-08-02.webp", caption: "Estudantes praticam programação com acompanhamento da equipe, 8 out. 2026", width: 2400, height: 1351, fit: "natural" }] },

      ] }
  ];

