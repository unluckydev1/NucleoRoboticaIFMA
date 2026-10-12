# Núcleo de Robótica — IFMA Campus Santa Inês

## Onde editar

Os dados estão separados por assunto dentro de `data/`, para facilitar a manutenção sem procurar conteúdo em uma lista única:

- `teams.js`: equipes, níveis, modalidades e limites de exibição;
- `competitions.js`: competições e participações;
- `achievements.js`: conquistas;
- `news.js`: notícias;
- `projects.js`: projetos, textos, fotos e vídeos;
- `gallery.js`: galeria geral;
- `members.js`: integrantes.

Para incluir um item, copie um objeto do mesmo arquivo e ajuste os campos. As mídias usam caminhos relativos à pasta principal do site, por exemplo `assets/projetos/orion-turtle/foto.jpeg`. Inclua legendas e dimensões originais (`width` e `height`) nas fotos. Os vídeos usam controles e carregamento padrão do navegador.

Os módulos precisam continuar carregados antes dos scripts de renderização nos HTMLs. `data/data.js` é apenas um aviso de compatibilidade; edite os arquivos temáticos acima.

## Páginas e estilos

A página de competição recebe `competicao.html?c=id`; a de projeto recebe `projeto.html?p=id`. Ambas consultam os mesmos dados, sem duplicar uma página por item.

- `javascript/blocos.js` e `styles/blocos.css`: blocos de texto e imagem;
- `javascript/projeto.js` e `styles/tecnoarte-media.css`: página de projeto, carrossel e mídias;
- `javascript/common.js` e `styles/`: tema e aparência compartilhada;
- `tecnoarte.html`: site próprio do TecnoArte, aberto em outra aba a partir do projeto.

Competições e projetos aceitam `sections` com layouts `split`, `banner`, `trio`, `mosaic`, `stats` e `text`. Em projetos, `mediaGallery` reúne as fotos e os vídeos da seção de registros.


Os carrosséis compartilham os controles e indicadores definidos em styles/carousel.css; imagens permanecem inteiras dentro da moldura, sem cortes.
