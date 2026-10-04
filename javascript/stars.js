/* =========================================================
   CAMPO DE ESTRELAS
   ========================================================= */

/*
 * Configurações visuais das estrelas.
 */

const STAR_CONFIG = {

  // Quanto maior, menos estrelas.
  density: 9000,

  // Tamanho mínimo e máximo em pixels.
  minSize: 1,
  maxSize: 2,

  // Variação máxima da opacidade.
  // Ex.: 0.45 = a estrela pode variar bastante de brilho.
  opacityAmplitude: 0.75,

  // Duração do piscar em segundos.
  // Ex.: 2 a 5 segundos por ciclo.
  twinkleSpeed: [2, 3],

  // Porcentagem de estrelas que se movimentam.
  movingPercentage: 0.4,

  // Amplitude máxima do movimento em pixels.
  movementAmplitude: 20,

  // Duração do movimento em segundos.
  movementSpeed: [10, 20]
};


const starfield = document.querySelector('#starfield');

if (starfield) {
  let lastWidth = 0;
  let lastHeight = 0;
  let resizeTimer;


  function createStars() {
    const { width, height } =
      starfield.getBoundingClientRect();


    if (
      lastWidth !== 0 &&
      Math.abs(width - lastWidth) < 120 &&
      Math.abs(height - lastHeight) < 80
    ) {
      return;
    }


    lastWidth = width;
    lastHeight = height;


    const area = width * height;

    const starCount =
      Math.floor(area / STAR_CONFIG.density);


    const fragment =
      document.createDocumentFragment();


    for (let i = 0; i < starCount; i++) {
      const star =
        document.createElement('span');

      star.classList.add('star');


      /* ---------- posição ---------- */

      star.style.left =
        `${Math.random() * 100}%`;

      star.style.top =
        `${Math.random() * 100}%`;


      /* ---------- tamanho ---------- */

      const size =
        STAR_CONFIG.minSize +
        Math.random() *
        (
          STAR_CONFIG.maxSize -
          STAR_CONFIG.minSize
        );

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;


      /* ---------- brilho ---------- */

      const opacity =
        0.4 +
        Math.random() * 0.4;

      star.style.setProperty(
        '--opacity',
        opacity
      );

      star.style.setProperty(
        '--opacity-min',
        Math.max(
          opacity -
          STAR_CONFIG.opacityAmplitude,
          0.05
        )
      );

      star.style.setProperty(
        '--opacity-max',
        Math.min(
          opacity +
          STAR_CONFIG.opacityAmplitude,
          1
        )
      );


      /* ---------- velocidade do brilho ---------- */

      const twinkleDuration =
        STAR_CONFIG.twinkleSpeed[0] +
        Math.random() *
        (
          STAR_CONFIG.twinkleSpeed[1] -
          STAR_CONFIG.twinkleSpeed[0]
        );

      star.style.setProperty(
        '--twinkle-duration',
        `${twinkleDuration}s`
      );

      star.style.setProperty(
        '--twinkle-delay',
        `${Math.random() * -4}s`
      );


      /* ---------- movimento ---------- */

      if (
        Math.random() <
        STAR_CONFIG.movingPercentage
      ) {
        star.classList.add('moving');


        const driftX =
          (
            Math.random() * 2 - 1
          ) *
          STAR_CONFIG.movementAmplitude;


        const driftY =
          (
            Math.random() * 2 - 1
          ) *
          STAR_CONFIG.movementAmplitude;


        star.style.setProperty(
          '--drift-x-start',
          `${-driftX}px`
        );

        star.style.setProperty(
          '--drift-y-start',
          `${-driftY}px`
        );

        star.style.setProperty(
          '--drift-x-end',
          `${driftX}px`
        );

        star.style.setProperty(
          '--drift-y-end',
          `${driftY}px`
        );


        const driftDuration =
          STAR_CONFIG.movementSpeed[0] +
          Math.random() *
          (
            STAR_CONFIG.movementSpeed[1] -
            STAR_CONFIG.movementSpeed[0]
          );

        star.style.setProperty(
          '--drift-duration',
          `${driftDuration}s`
        );

        star.style.setProperty(
          '--drift-delay',
          `${Math.random() * -15}s`
        );
      }


      fragment.appendChild(star);
    }


    starfield.replaceChildren(fragment);
  }


  createStars();


  /* ---------- redimensionamento ---------- */

  const resizeObserver =
    new ResizeObserver(() => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(
        createStars,
        150
      );
    });


  resizeObserver.observe(starfield);
}
