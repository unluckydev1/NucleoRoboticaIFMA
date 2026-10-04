/* =========================================================
   CARROSSEL DE COMPETIÇÕES
   ========================================================= */

const compTrack = document.querySelector('#comp-track');
const compPrev = document.querySelector('#comp-prev');
const compNext = document.querySelector('#comp-next');

if (compTrack) {
  let isDown = false;
  let startX = 0;
  let startScroll = 0;

  /* ---------- arrastar com o mouse ----------
     Os cards são links: só vira arraste depois de mover alguns pixels,
     e o clique logo após soltar é ignorado (não abre a competição). */

  let dragging = false;
  let pid = null;
  let blockClick = false;

  compTrack.addEventListener('dragstart', (e) => e.preventDefault());

  compTrack.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;   // toque usa rolagem nativa

    isDown = true;
    dragging = false;
    startX = e.clientX;
    startScroll = compTrack.scrollLeft;
    pid = e.pointerId;
  });

  compTrack.addEventListener('pointermove', (e) => {
    if (!isDown) return;

    const dx = e.clientX - startX;

    if (!dragging) {
      if (Math.abs(dx) < 6) return;

      dragging = true;
      compTrack.classList.add('dragging');
      compTrack.setPointerCapture(pid);
    }

    compTrack.scrollLeft = startScroll - dx;
  });

  function stopDrag() {
    if (!isDown) return;

    isDown = false;

    if (dragging) {
      dragging = false;
      compTrack.classList.remove('dragging');

      try { compTrack.releasePointerCapture(pid); } catch (e) { /* ignora */ }

      blockClick = true;
      setTimeout(() => { blockClick = false; }, 0);
    }
  }

  compTrack.addEventListener('pointerup', stopDrag);
  compTrack.addEventListener('pointercancel', stopDrag);
  compTrack.addEventListener('pointerleave', stopDrag);

  compTrack.addEventListener('click', (e) => {
    if (blockClick) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);


  /* ---------- botões anterior / próximo ---------- */

  function cardStep() {
    const card = compTrack.querySelector('.comp-card');
    return card ? card.offsetWidth + 18 : 300;
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
/* =========================================================
   BOLINHAS DO CARROSSEL
   ========================================================= */

const dotsBox = document.querySelector('#comp-dots');
const dotsStrip = document.querySelector('#comp-dots-strip');

if (compTrack && dotsBox && dotsStrip) {

  const MAX_VISIBLE = 5;   // máximo de bolinhas na tela
  const DOT_SLOT = 16;     // largura de cada bolinha (igual ao CSS)

  const cards = compTrack.querySelectorAll('.comp-card');
  const total = cards.length;
  const visible = Math.min(MAX_VISIBLE, total);

  dotsBox.style.width = `${visible * DOT_SLOT}px`;


  /* ---------- cria as bolinhas ---------- */

  const dots = Array.from(cards, (card, i) => {
    const dot = document.createElement('button');

    dot.type = 'button';
    dot.className = 'comp-dot';
    dot.setAttribute('aria-label', `Ir para a competição ${i + 1} de ${total}`);

    dot.addEventListener('click', () => {
      compTrack.scrollTo({ left: i * stepSize(), behavior: 'smooth' });
    });

    dotsStrip.appendChild(dot);
    return dot;
  });


  function stepSize() {
    return cards[0].offsetWidth + 18;   // largura do card + gap
  }


  /* ---------- descobre o card atual ---------- */

  function currentIndex() {
    const max = compTrack.scrollWidth - compTrack.clientWidth - 2;

    // no fim da lista o último card nunca chega ao início do trilho
    if (compTrack.scrollLeft >= max) return total - 1;

    return Math.min(
      total - 1,
      Math.round(compTrack.scrollLeft / stepSize())
    );
  }


  /* ---------- atualiza a janela de bolinhas ---------- */

  function updateDots() {
    const active = currentIndex();

    // início da janela, mantendo a ativa o mais centralizada possível
    const start = Math.max(
      0,
      Math.min(active - Math.floor(visible / 2), total - visible)
    );

    const end = start + visible - 1;

    dotsStrip.style.transform = `translateX(${-start * DOT_SLOT}px)`;

    dots.forEach((dot, i) => {
      const outside = i < start || i > end;

      // pontas pequenas só quando ainda há mais bolinhas além delas
      const edge =
        (i === start && start > 0) ||
        (i === end && end < total - 1);

      dot.classList.toggle('is-active', i === active);
      dot.classList.toggle('is-hidden', outside);
      dot.classList.toggle('is-edge', !outside && edge && i !== active);

      if (i === active) {
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.removeAttribute('aria-current');
      }
    });
  }


  compTrack.addEventListener('scroll', updateDots, { passive: true });
  window.addEventListener('resize', updateDots);
  updateDots();
}