/* =========================================================
   CARROSSEL DE COMPETIÇÕES
   ========================================================= */

const compTrack = document.querySelector('#comp-track');
const compPrev = document.querySelector('#comp-prev');
const compNext = document.querySelector('#comp-next');

if (compTrack) {
  /* A lista usa o mesmo arraste e controle de posição das outras fileiras. */
  window.NUCLEO_UTIL?.dragScroll(compTrack, { fade: false });
  window.NUCLEO_WIDGETS?.dots(compTrack, {
    host: compTrack.closest('.comp-slider')
  });


  /* ---------- botões anterior / próximo ---------- */

  function cardStep() {
    const card = compTrack.querySelector('.comp-card');
    const gap = parseFloat(getComputedStyle(compTrack).columnGap) || 0;
    return card ? card.offsetWidth + gap : 300;
  }

  compPrev?.addEventListener('click', () => {
    compTrack.scrollBy({ left: -cardStep(), behavior: 'smooth' });
  });

  compNext?.addEventListener('click', () => {
    compTrack.scrollBy({ left: cardStep(), behavior: 'smooth' });
  });


  /* ---------- desabilita setas nas pontas ---------- */

  function updateButtons() {
    const max = compTrack.scrollWidth - compTrack.clientWidth - 2;

    if (compPrev) compPrev.disabled = compTrack.scrollLeft <= 2;
    if (compNext) compNext.disabled = compTrack.scrollLeft >= max;
  }

  compTrack.addEventListener('scroll', updateButtons, { passive: true });
  window.addEventListener('resize', updateButtons);
  updateButtons();
}
