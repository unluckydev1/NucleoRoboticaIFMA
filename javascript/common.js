/* =========================================================
   MENU MOBILE
   ========================================================= */

const navToggle = document.querySelector('#nav-toggle');
const mainNav = document.querySelector('#main-nav');

if (navToggle && mainNav) {
  const navLinks = mainNav.querySelectorAll('a');

  function closeMenu() {
    mainNav.classList.remove('open');

    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu');
  }


  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');

    navToggle.setAttribute(
      'aria-expanded',
      String(isOpen)
    );

    navToggle.setAttribute(
      'aria-label',
      isOpen ? 'Fechar menu' : 'Abrir menu'
    );
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
