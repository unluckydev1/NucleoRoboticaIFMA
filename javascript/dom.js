/* Utilitários mínimos do DOM compartilhados pelos scripts do site. */
window.NUCLEO_DOM = (() => {
  function el(tag, className = '', text = '') {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function slug(value) {
    return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  const toArray = (value) => (Array.isArray(value) ? value : [value]);

  return Object.freeze({ el, slug, toArray });
})();
