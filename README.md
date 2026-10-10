# Núcleo de Robótica — IFMA Campus Santa Inês

## Onde editar

- **Textos, integrantes, projetos, notícias, competições, conquistas e fotos:** `data/data.js`.
- **Identidade visual das equipes e navegação contextual:** `javascript/common.js`.
- **Aparência compartilhada e responsividade:** `styles/`.
- **Conteúdo fixo e estrutura das páginas:** arquivos HTML na raiz e em `equipes/`.

O site usa páginas compartilhadas. A página de competição recebe `competicao.html?c=id`; a de projeto recebe `projeto.html?p=id`. Ambas consultam os mesmos dados, sem duplicar uma página para cada equipe.

## Conteúdo em `data/data.js`

O arquivo é separado pelas listas `competitions`, `achievements`, `news`, `projects`, `gallery` e `members`. Os exemplos podem ser substituídos pelos dados reais. Os campos comuns são:

- `team` para um vínculo com equipe e `teams` para um ou vários vínculos;
- `id` para identificadores estáveis de projetos e competições;
- `image`, `src`, `photo` ou `images` para caminhos de imagem a partir da raiz do site;
- `settings.memberLimit` e `settings.galleryHomeLimit` para os limites exibidos na home e nas páginas de equipe;
- em `teams`, `page`, `logo`, `summary` e `effect` (`"stars"` ou `"circuit"`) montam os painéis da seção Equipes da home.

Competições aceitam `categories`, `year`, `images`, `text` e `members` (IDs de integrantes presentes). O deck de avatares usa os membros das equipes como demonstração quando a competição ainda não tem `members`. Projetos aceitam `category` (`Pesquisa`, `Ensino` ou `Extensão`) e também podem usar `members` para listar participantes específicos. Sem esse vínculo individual, o perfil mostra atividades associadas à equipe como referência. Integrantes usam `level` (`medio` ou `superior`) e `role` (texto ou lista de funções). Seus cartões abrem um perfil ampliado; `description` (ou `bio`), `photos` (lista de caminhos ou objetos `{ src, caption }`) e `socials` (rótulo e URL) são opcionais. Fotos da galeria usam `equipe` (uma equipe ou uma lista) e `year`.

Integrantes com `role` de coordenação ou capitania aparecem primeiro; os demais seguem ordem alfabética pelo nome, em todas as páginas.

Competições e projetos aceitam `sections`: blocos de texto + imagem com layouts variados (`split`, `banner`, `trio`, `mosaic`, `stats`, `text`), renderizados por `javascript/blocos.js` e `styles/blocos.css`. Imagem sem `src` vira espaço reservado com a legenda; basta preencher o caminho quando a foto existir. A sintaxe completa está no topo de `data/data.js`.

As pastas de fotos podem ser criadas dentro de `assets/` conforme forem necessárias, por exemplo `assets/projetos/` ou `assets/galeria/`. Caminhos vazios mostram um espaço reservado.

## Identidade visual e navegação

A home do núcleo permanece neutra. Ao sair da página de uma equipe, o tema correspondente acompanha os links internos pelas listagens e páginas de detalhe. Voltar ao Núcleo encerra o contexto. O parâmetro `context` guarda essa origem visual; filtros como `equipe` selecionam dados e não alteram o tema.

As paletas contextuais ficam centralizadas em `teamThemes`, em `javascript/common.js`. O mesmo contexto adiciona estrelas do Órion ou circuitos da NEXA ao cabeçalho da página. O CSS compartilhado está em `styles/base.css`; intervalos das estrelas cadentes ficam nas variáveis `--shooting-star-interval` e `--shooting-star-secondary-interval`, dentro de `.starfield`.

Para ajustar o campo de estrelas, edite `STAR_CONFIG` no início de `javascript/stars.js`. Para ajustar os circuitos, edite `CFG` no início de `javascript/circuit.js`. Os dois arquivos expõem `NUCLEO_FX.stars(elemento)` e `NUCLEO_FX.circuit(canvas)`, usados também pelos painéis da home.

## Movimento

- **Fileiras arrastáveis** (integrantes, notícias, projetos, galeria e fotos de competição) passam sozinhas, um item por vez e em loop, enquanto estão na tela. Qualquer rolagem do usuário (arrastar, tocar, bolinhas, setas) reinicia a contagem. Os tempos ficam em `autoPass`, em `javascript/widgets.js` (`interval` entre passadas, `resume` depois da interação).
- **Páginas de listagem** (integrantes, competições, galeria) fazem os itens surgirem em sequência ao abrir. O efeito é `.stagger-in` (`styles/base.css`), aplicado por `NUCLEO_DOM.stagger`.

## Estrutura do projeto

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Home neutra e seções do núcleo |
| `integrantes.html`, `competicoes.html`, `galeria.html` | Listagens e filtros |
| `competicao.html`, `projeto.html` | Detalhes dinâmicos |
| `tecnoarte.html` | Site do TecnoArte, aberto em nova aba a partir da página de projeto |
| `assets/tecnoarte/` | Imagens do mangá e marcas usadas pelo site do TecnoArte |
| `equipes/orion/`, `equipes/nexa/` | Páginas próprias das equipes e suas cores |
| `javascript/blocos.js`, `styles/blocos.css` | Blocos `sections` de competições e projetos |
| `javascript/render.js` | Renderização das listas a partir dos dados |
| `javascript/filters.js` | Criação e estado compartilhado dos filtros |
| `javascript/widgets.js` | Bolinhas de navegação, passada automática, visualizador de imagens e perfil ampliado |
| `javascript/equipes.js`, `styles/equipes.css` | Seção Equipes da home (painéis divididos por diagonal) |
| `javascript/common.js` | Menu, tema contextual e ano do rodapé |
| `styles/polish.css` | Acabamento visual dos estilos neutro, Órion e NEXA |

## Verificações

Os scripts são JavaScript simples, sem etapa de compilação. Para validar a sintaxe, rode `node --check` nos arquivos de `javascript/` e `data/`. Confira também se os caminhos das imagens preenchidos em `data/data.js` existem dentro da pasta do site.
