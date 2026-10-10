/* Carrega o arquivo só depois de uma ação explícita e troca a capa pelo player. */
document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-video-preview]');
  if (!button) return;

  const figure = button.closest('figure');
  const video = figure && figure.querySelector('video');
  const source = video && video.querySelector('source[data-src]');
  if (!video || !source) return;

  source.src = source.dataset.src;
  source.removeAttribute('data-src');
  video.hidden = false;
  button.remove();
  video.load();
  video.play().catch(() => {});
});
