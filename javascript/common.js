/* =========================================================
   MENU MOBILE
   ========================================================= */

(function () {
const navToggle = document.querySelector('#nav-toggle');
const mainNav = document.querySelector('#main-nav');

if (navToggle && mainNav) {
  const navLinks = mainNav.querySelectorAll('a');

  function closeMenu() {
    mainNav.classList.remove('open');

    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu');
  }


  function toggleMenu() {
    const isOpen = mainNav.classList.toggle('open');

    navToggle.setAttribute(
      'aria-expanded',
      String(isOpen)
    );

    navToggle.setAttribute(
      'aria-label',
      isOpen ? 'Fechar menu' : 'Abrir menu'
    );
  }

  /* pointerup responde ao toque físico sem depender do click sintetizado
     que alguns navegadores móveis atrasam ou descartam. */
  navToggle.addEventListener('pointerup', (event) => {
    if (event.button === 0) {
      event.preventDefault();
      toggleMenu();
    }
  });

  navToggle.addEventListener('click', (event) => {
    /* pointerup já alternou; click detail 0 cobre acionamento pelo teclado. */
    if (event.detail === 0) toggleMenu();
  });


  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });


  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });


  /*
   * Se a janela passar novamente para desktop,
   * garante que o menu mobile não fique aberto.
   */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) {
      closeMenu();
    }
  });
}


/* =========================================================
   ANO DO FOOTER
   ========================================================= */

const yearElement = document.querySelector('#year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
})();
