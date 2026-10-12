/* Conteúdo do site: teams. Edite esta lista para atualizar os dados relacionados. */
window.NUCLEO_DATA = window.NUCLEO_DATA || {};
window.NUCLEO_DATA.teams = {
    orion: {
      name: "Robotic Órion", color: "#2E5A88", ink: "#FFFFFF",
      page: "equipes/orion/index.html", logo: "assets/orion/logo_roundness.png", effect: "stars",
      summary: "Estudantes do IFMA que projetam, constroem e programam robôs para desafios como a OBR, a MRC Brasil e a Robosummit."
    },
    nexa: {
      name: "NEXA 404", color: "#86D011", ink: "#08090C",
      page: "equipes/nexa/index.html", logo: "assets/nexa/logo.png", effect: "circuit",
      summary: "Equipe universitária do IFMA dedicada à robótica competitiva, à engenharia e à criação de soluções inclusivas."
    }
  };

window.NUCLEO_DATA.levels = {
    medio:    "Médio",
    superior: "Superior"
  };

window.NUCLEO_DATA.categories = {
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
  };

window.NUCLEO_DATA.categoryGroups = {
    resgate: "resgates-em-arena",
    "drc-explorer": "resgates-em-arena",
    "missao-impossivel": "desafios-surpresas",
    "desafio-surpresa": "desafios-surpresas",
    maratona: "seguidores-linha",
    "seguidor-obstaculos": "seguidores-linha"
  };

window.NUCLEO_DATA.categoryGroupLabels = {
    "resgates-em-arena": "Resgates em arena",
    "desafios-surpresas": "Desafios surpresas",
    "seguidores-linha": "Seguidores de linha"
  };

window.NUCLEO_DATA.settings = {
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
  };

