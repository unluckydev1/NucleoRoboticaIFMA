# Scripts do site

As páginas usam um único `<script>` no HTML para carregar os arquivos necessários. O mapa de dependências fica em `loader.js`, separado em:

- `sharedData`: conteúdo organizado por assunto na pasta `data/`;
- `sharedCore`: utilitários e renderização usados em todas as páginas;
- `pages`: scripts específicos de cada página, na ordem em que precisam executar.

Para adicionar um script a uma página, inclua-o no fim da lista correspondente em `pages`. Preserve a ordem: dados antes da renderização, bibliotecas antes do script da página. O atributo `data-root` informa a pasta raiz para as páginas dentro de `equipes/`; `data-page` seleciona a lista específica.
