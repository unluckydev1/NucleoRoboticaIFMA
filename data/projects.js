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


    /* ===== Humanoide ÓRION ===== */
    { id: "robo-humanoide", teams: ["orion"], category: "Pesquisa", title: "Humanoide ÓRION", status: "Em desenvolvimento",
      description: "Humanoide de baixo custo com peças impressas em 3D, controle próprio, gêmeo digital e comandos por voz com IA. Já realiza movimentos básicos na bancada; a caminhada ainda está em desenvolvimento.",
      members: ["orion-marjorie", "orion-carol"],
      image: "assets/projetos/orion-humanoide/orion-humanoide-prototipo-e-gemeo-digital.jpg",
      imageAlt: "Protótipo físico do humanoide ÓRION ao lado do seu gêmeo digital",
      imageCaption: "ÓRION físico e sua representação virtual no Blender",
      imageWidth: 1800, imageHeight: 1200, link: "",
      text: [
        "O projeto desenvolve um robô humanoide acessível para pesquisa e ensino, construído por estudantes do IFMA Campus Santa Inês com peças desenhadas no Fusion 360 e impressas em 3D. A pesquisa é de Marjorie Pereira de Castro, com orientação de Ana Caroline Meireles Soares e colaboração do Grupo de Robótica ORION. O trabalho recebeu bolsa PIBITI do IFMA, pelo Edital PRPGI nº 09/2025.",
        "O protótipo tem oito servomotores nas pernas, sensor de movimento e controle por ESP32. A equipe criou o ServoTUI para ajustar motores e gravar movimentos, além de um gêmeo digital para testar ações antes de executá-las no robô."
      ],
      sections: [
        { layout: "split", side: "right", eyebrow: "Controle do robô", title: "Movimentos ajustados pelo ServoTUI",
          text: [
            "O ServoTUI, escrito em Python, permite mover cada motor, acompanhar o sensor de movimento e salvar ou repetir sequências. O programa também respeita os limites de cada motor e teve suas funções verificadas em 56 testes automatizados.",
            "Na eletrônica, a ESP32 envia os comandos a uma placa PCA9685, que controla os servomotores. Um sensor MPU-6050 acompanha a inclinação do tronco."
          ],
          images: [{ src: "assets/projetos/orion-humanoide/servotui-interface.png", caption: "Tela de controle dos motores e editor de movimentos do ServoTUI", width: 3016, height: 1084, fit: "natural" }] },

        { layout: "stats", eyebrow: "Resultados na bancada", title: "O que o ÓRION já consegue fazer",
          text: [
            "Preso por um cabo de segurança, o protótipo move cada junta, fica em pé, agacha e retorna à posição inicial. Em um teste, permaneceu agachado por cerca de quatro minutos sem cair.",
            "A caminhada e a transferência de peso para os lados ainda não funcionam no robô físico. Os números destacam as etapas que já foram demonstradas e verificadas."
          ],
          stats: [
            { value: "8", label: "servomotores instalados nas pernas" },
            { value: "4 min", label: "agachado em um dos testes na bancada" },
            { value: "56", label: "testes automatizados das funções do ServoTUI" }
          ] },

        { layout: "split", side: "right", eyebrow: "Simulação segura", title: "Gêmeo digital para testar a caminhada",
          text: [
            "A equipe montou no Blender uma cópia virtual baseada nas peças e no robô físico, e simulou sua dinâmica no MuJoCo. O mesmo controlador que prepara os movimentos pode ser exercitado no ambiente virtual antes de chegar ao protótipo.",
            "Na simulação, o humanoide inclinou o tronco, completou seis passos e permaneceu em pé após um pequeno empurrão. Esses resultados ainda não se repetem no robô físico, pois massa, folgas das peças e atrito da bancada afetam o equilíbrio real."
          ],
          images: [{ src: "assets/projetos/orion-humanoide/orion-humanoide-simulacao-mujoco.jpg", caption: "Inclinações e passos do gêmeo digital no MuJoCo", width: 1396, height: 476, fit: "natural" }] },

        { layout: "steps", eyebrow: "Interação e próximos passos", title: "Da voz ao movimento do robô",
          text: "O agente de voz envia o áudio ao Google Gemini e transforma o pedido em uma ação. Nos cinco comandos avaliados, reconheceu pedidos de movimento, respondeu a uma pergunta e desligou os motores ao ouvir “pare”. O teste foi feito sem o robô conectado; os comandos de movimento levaram mais de três segundos.",
          chips: ["ESP32", "Python", "Blender", "MuJoCo", "Google Gemini"],
          items: [
            { title: "Comando por voz", text: "O Gemini interpreta pedidos em português e propõe uma ação para o robô.", status: "Testado sem conexão ao robô" },
            { title: "Equilíbrio na ESP32", text: "Levar o controle de equilíbrio da simulação para a placa embarcada.", status: "Próxima etapa" },
            { title: "Caminhada física", text: "Calibrar os motores, montar os braços e continuar os testes de caminhada.", status: "Em desenvolvimento" }
          ],
          links: [{ label: "Baixar resumo expandido", href: "assets/projetos/orion-humanoide/resumo-expandido.docx" }] }
      ] },

    /* ===== Veículo autônomo ===== */
    { id: "carro-autonomo", teams: ["orion"], category: "Pesquisa", title: "Carro autônomo em miniatura", status: "Em desenvolvimento",
      description: "Protótipo em escala 1:10 que combina Raspberry Pi 4, direção Ackermann e câmera com redes neurais compactas para seguir faixas e reconhecer placas. Os modelos foram avaliados em simulação e no gêmeo digital do veículo.",
      members: ["orion-emilly", "orion-rynalde", "orion-pedro-hiago", "orion-carol"],
        image: "assets/projetos/carro-autonomo/carro-prototipo-e-gemeo-capa.jpg",
        imageAlt: "Protótipo físico e gêmeo digital do carro autônomo lado a lado",
        imageCaption: "Protótipo físico e sua representação no Gazebo",
        imageWidth: 700, imageHeight: 438, link: "",
      text: [
        "O projeto desenvolve percepção e controle para um carro autônomo em miniatura, com foco nas provas de pista e percurso urbano da FIRA. O protótipo físico usa chassi impresso em 3D, direção Ackermann, Raspberry Pi 4 e webcam Logitech C270.",
        "A pesquisa é de Emilly da Silva Machado Souza, Rynalde Gabriel Silva Serejo e Pedro Hiago Ferreira da Silva, com orientação de Ana Caroline Meireles Soares. O trabalho recebeu bolsa PIBITI do IFMA, pelo Edital PRPGI nº 09/2025. O foco técnico é criar modelos leves e aproximar a simulação das condições da câmera real."
      ],
      sections: [
        { layout: "steps", eyebrow: "Como foi desenvolvido", title: "Do cenário virtual à percepção do carro",
          text: "A equipe reproduziu no Gazebo com ROS 2 pistas e cruzamentos previstos no regulamento da FIRA. A simulação gera imagens rotuladas automaticamente e permite variar as condições de teste.",
          items: [
            { title: "Gerar cenários", text: "Pistas e cidades virtuais variam cores, iluminação e geometria para ampliar os casos de treinamento." },
            { title: "Treinar redes leves", text: "TangerinaLaneNet localiza as faixas; TangerinaSignNet reconhece placas. Os dois modelos usam quantização INT8." },
            { title: "Reproduzir a câmera", text: "O gêmeo digital aproxima a posição e o campo de visão da webcam Logitech C270 usada no protótipo." }
          ],
          chips: ["Gazebo", "ROS 2", "Raspberry Pi 4", "Logitech C270", "Redes neurais INT8"] },

        { layout: "stats", eyebrow: "Resultados em simulação", title: "Percepção compacta para pista e cidade",
          text: "Os modelos foram avaliados em CPU de desenvolvimento. Os resultados abaixo vêm de simulações e não representam medições de desempenho no Raspberry Pi.",
          stats: [
            { value: "98,6%", label: "placas reconhecidas em 1.616 imagens de validação" },
            { value: "5 contra 2", label: "percursos concluídos pela rede e pelo método clássico, em oito cenários adversos" },
            { value: "< 1 ms", label: "inferência por quadro na CPU de desenvolvimento" }
          ] },

        { layout: "split", side: "left", eyebrow: "Validação do gêmeo digital", title: "A câmera real mudou o resultado",
          text: [
            "O gêmeo digital reproduz o chassi, a direção e a posição da C270. Com a câmera simulada ajustada ao campo de visão real, a percepção adaptada completou os circuitos e os percursos urbanos de referência em simulação. O classificador de placas atingiu 98,58% de acerto em 1.616 placas nos mundos de validação.",
            "Nos oito cenários adversos, a rede de faixas teve menor erro lateral em sete e completou cinco percursos, contra dois com a abordagem clássica. O estudo mostra que a geometria da câmera precisa corresponder à do robô para transferir os modelos com mais fidelidade."
          ],
          images: [{ src: "assets/projetos/carro-autonomo/camera-c270-e-gemeo-digital.jpg", caption: "A câmera C270 real e a câmera correspondente no gêmeo digital", width: 897, height: 760, fit: "natural" }] },

        { layout: "steps", eyebrow: "Próximas etapas", title: "Levar os modelos ao carro físico",
          text: "O protótipo já participou da etapa regional da FIRA Brasil em Bacabal, em março de 2026, com navegação clássica. As redes neurais ainda não foram validadas no Raspberry Pi 4.",
          items: [
            { title: "Medir no Raspberry Pi", text: "Conferir o tempo de inferência e a estabilidade dos modelos no computador embarcado.", status: "Pendente" },
            { title: "Ajustar a percepção", text: "Validar a posição da câmera no protótipo e retreinar o classificador de placas para a C270.", status: "Pendente" },
            { title: "Desviar de obstáculos", text: "Implementar e avaliar essa capacidade antes de ampliar os testes físicos.", status: "Pendente" }
          ],
          links: [{ label: "Ler resumo expandido", href: "assets/projetos/carro-autonomo/resumo-expandido.pdf" }] }
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

