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

  /* Seta dos botões de carrossel, desenhada em SVG. direction: 'prev' | 'next'. */
  function chevron(direction) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    path.setAttribute('d', direction === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7');
    svg.appendChild(path);
    return svg;
  }

  /* Botão de carrossel com a seta desenhada. */
  function arrowButton(className, direction, label) {
    const button = el('button', className);
    button.type = 'button';
    button.setAttribute('aria-label', label);
    button.appendChild(chevron(direction));
    return button;
  }

  /* Faz os filhos do contêiner surgirem em sequência (CSS: .stagger-in). */
  function stagger(container) {
    Array.from(container.children).forEach((child, i) => child.style.setProperty('--i', i));
    container.classList.add('stagger-in');
  }

  return Object.freeze({ el, slug, toArray, chevron, arrowButton, stagger });
})();
