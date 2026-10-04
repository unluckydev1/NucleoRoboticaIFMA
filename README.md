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

Nova equipe: copie `equipes/nexa/`, troque as variáveis do `.css` e adicione um card em `index.html`.

## Adicionar competições, conquistas e integrantes

Edite só `data/data.js`. Cada item tem `team` (`"orion"` ou `"nexa"`).
A home mostra tudo; cada página de equipe mostra só os itens dela.
Competição de duas equipes: `teams: ["orion", "nexa"]`.

### Integrantes
Cada integrante tem `team`, `level` (`"medio"` ou `"superior"`) e `role`
(texto ou lista). Os filtros da página Integrantes são gerados sozinhos a
partir desses campos: uma função nova em `role` já vira um botão de filtro.
Clicar num integrante (home ou página da equipe) abre `integrantes.html`
rolando até ele; o botão "Conheça todos os integrantes" abre tudo na home e
só a equipe correspondente nas páginas das equipes.

### Limite de integrantes (home e páginas das equipes)
`settings.memberLimit` em `data.js` define o máximo mostrado fora da página
Integrantes (padrão 8). A lista é uma fileira que se arrasta (mouse) ou
desliza (toque); o botão "ver todos" leva à página completa. Na home, as
equipes se alternam para o corte não deixar uma de fora. Para uma lista
específica: `<div data-list="members" data-limit="6">`.

### Competições (cada uma tem página própria)
A página vem do `data.js`; não é preciso criar HTML. Campos de cada
competição: `id`, `teams`, `short`, `name`, `description`, `categories`,
`year`, `images`, `text` (detalhes no topo do `data.js`).

- Clicar numa competição ou conquista (home, páginas das equipes, listagem)
  abre `competicao.html?c=ID`. Em uma conquista, o campo `competition: "ID"`
  faz o vínculo; as conquistas dela também aparecem na página da competição.
- `images`: caminhos a partir da raiz (ex.: `assets/competicoes/obr-1.jpg`).
  Mais de uma foto vira carrossel; sem foto, aparece um espaço reservado.
- Cada edição pode ser uma entrada própria (ex.: "OBR 2025" e "OBR 2026"),
  com `year` e `categories` diferentes, o que alimenta os filtros.
- Os filtros de ano e categoria só mostram valores que existem nos dados:
  o filtro de **ano** aparece assim que alguma competição tiver `year`.
  Categorias possíveis: lista `categories` em `data.js`.

### Notícias, projetos e galeria
Tudo mora em `data.js` (listas `news`, `projects` e `gallery`), em qualquer página
em que apareça; o HTML só diz onde mostrar (`<div data-list="news"></div>`).
Os itens que vêm no arquivo são exemplos: troque pelos reais. Sem `image`/`src`,
aparece um espaço reservado. A galeria é uma coleção em grade na página Galeria e um carrossel na home; a home mostra as primeiras
`settings.galleryHomeLimit` fotos e a página Galeria mostra todas, filtradas só por ano.

### Carrosséis
Nenhum carrossel "gruda" (sem scroll-snap) e todos têm bolinhas de posição.
Fileiras novas: `NUCLEO_WIDGETS.dots(trilho, { host })` (widgets.js) já cria as bolinhas.

Projetos aceitam `id` único; cada cartão abre `projeto.html?p=id`. Fotos da lista `gallery` aceitam `equipe: "orion"`, `equipe: "nexa"` ou `equipe: ["orion", "nexa"]`; cada página de equipe exibe as fotos marcadas para ela. A home usa a logo em `assets/logo-nucleo.png`.
Os cartões de notícias mostram o texto summary e o visualizador exibe título e resumo junto à imagem. Em cada projeto, category aceita Pesquisa, Ensino ou Extensão e aparece no cartão e na página dedicada.
