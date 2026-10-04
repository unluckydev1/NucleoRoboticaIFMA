# Núcleo de Robótica — IFMA Campus Santa Inês

```
index.html              Home do núcleo (tema IFMA: verde/vermelho, fundo claro)
integrantes.html        Página única com todos os integrantes (filtros: equipe, nível, função)
competicoes.html        Todas as competições, em cartões (filtros: equipe, ano, categoria)
galeria.html            Galeria em grade (filtro só por ano); clicar na foto amplia
competicao.html         Página de UMA competição (?c=id): fotos em carrossel + texto + conquistas
equipes/orion/          Página do Robotic Órion  (orion.css = só as cores)
equipes/nexa/           Página da NEXA 404       (nexa.css  = só as cores)
styles/base.css         Estilos compartilhados (header, cards, carrossel, footer...)
styles/home.css         Cores e extras da home
styles/inner.css        Cabeçalho e filtros das páginas internas (Integrantes, Competições)
styles/integrantes.css  Cartões da página Integrantes
styles/competicoes.css  Cartões e página individual das competições
styles/secoes.css       Notícias, projetos, galeria e visualizador de fotos
javascript/common.js    Menu mobile + ano do rodapé (todas as páginas)
javascript/dom.js       Funções compartilhadas para elementos, listas e slugs
data/data.js            ÚNICO arquivo a editar: competições, conquistas, integrantes
javascript/render.js    Desenha as listas e filtra por equipe
javascript/filters.js   Filtros compartilhados (uma linha de seletores)
javascript/integrantes.js  Liga os filtros na página Integrantes
javascript/competicoes.js  Cartões + filtros da página Competições
javascript/competicao.js   Monta a página de uma competição (carrossel + texto)
javascript/carousel.js  Carrossel de competições (Órion)
javascript/widgets.js   Bolinhas de qualquer carrossel + visualizador de fotos (carrega antes de render.js)
javascript/galeria.js   Filtro por ano da página Galeria
javascript/circuit.js   Trilhas de circuito animadas (NEXA 404)
javascript/stars.js     Campo de estrelas (Órion)
assets/                 Imagens por equipe: orion/, nexa/
assets/competicoes/     Fotos das competições (referenciadas em data.js)
assets/noticias/        Fotos das notícias
assets/projetos/        Fotos dos projetos
assets/galeria/         Fotos da galeria
```
