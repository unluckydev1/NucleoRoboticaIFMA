/* =========================================================
   MENU MOBILE
   ========================================================= */

(function () {
const teamThemes = {
  orion: {
    glow: 'rgba(46, 90, 136, .16)',
    palette: {
      '--bg': '#050A1F', '--bg-2': '#080F2A', '--bg-3': '#0D1833', '--card-hover': '#101E3C',
      '--bg-rgb': '5, 10, 31', '--ink': '#FFFFFF', '--muted': '#AAB6C8', '--on-accent': '#FFFFFF',
      '--accent': '#2E5A88', '--accent-2': '#6A7B92', '--accent-dim': '#1D3D61', '--accent-soft': '#9DB4D0',
      '--accent-rgb': '46, 90, 136', '--accent-2-rgb': '106, 123, 146', '--shadow-rgb': '0, 0, 0',
      '--line': '#172945', '--ifma-green': '#2E5A88', '--ifma-green-dark': '#1D3D61'
    }
  },
  nexa: {
    glow: 'rgba(144, 64, 208, .12)',
    palette: {
      '--bg': '#08090C', '--bg-2': '#0E1015', '--bg-3': '#13161C', '--card-hover': '#181C24',
      '--bg-rgb': '8, 9, 12', '--ink': '#FFFFFF', '--muted': '#A9AFBD', '--on-accent': '#08090C',
      '--accent': '#86D011', '--accent-2': '#A3E635', '--accent-dim': '#3F5E12', '--accent-soft': '#9040D0',
      '--accent-rgb': '134, 208, 17', '--accent-2-rgb': '163, 230, 53', '--shadow-rgb': '0, 0, 0',
      '--line': '#232731', '--ifma-green': '#86D011', '--ifma-green-dark': '#3F5E12'
    }
  }
};
const hasTeamTheme = (id) => Object.prototype.hasOwnProperty.call(teamThemes, id);

const params = new URLSearchParams(window.location.search);
const requestedContext = params.get('context');
const sourceTeam = hasTeamTheme(document.body.dataset.team)
  ? document.body.dataset.team
  : '';
let fixedTheme = '';

try {
  const storedTheme = window.localStorage.getItem('nucleo-theme-fixed');
  if (hasTeamTheme(storedTheme)) fixedTheme = storedTheme;
} catch (error) {
  /* O tema contextual padrão continua disponível sem armazenamento local. */
}

const contextTeam = sourceTeam
  ? ''
  : fixedTheme || (hasTeamTheme(requestedContext) ? requestedContext : '');

/* O contexto controla a camada visual; os filtros de equipe seguem independentes. */
if (contextTeam) {
  const theme = teamThemes[contextTeam];
  document.body.dataset.contextTeam = contextTeam;
  document.documentElement.style.setProperty('--context-accent', theme.palette['--accent']);
  document.documentElement.style.setProperty('--context-accent-strong', theme.palette['--accent-soft']);
  document.documentElement.style.setProperty('--context-accent-rgb', theme.palette['--accent-rgb']);
  document.documentElement.style.setProperty('--context-glow', theme.glow);
  Object.entries(theme.palette).forEach(([name, value]) => {
    document.documentElement.style.setProperty(name, value);
  });
}

function mountTeamMotif(teamId) {
  if (!teamId || document.body.dataset.team) return;
  const main = document.querySelector('main');
  if (!main) return;
  const host = main.querySelector('.page-head, .project-hero') || main.querySelector('.section');
  if (!host) return;

  host.classList.add('team-context-hero');
  const motif = document.createElement(teamId === 'orion' ? 'div' : 'canvas');
  motif.className = teamId === 'orion' ? 'starfield' : 'nx-circuit';
  motif.id = teamId === 'orion' ? 'starfield' : 'nx-circuit';
  motif.setAttribute('aria-hidden', 'true');
  host.prepend(motif);

  const script = document.createElement('script');
  script.src = `${document.body.dataset.root || ''}javascript/${teamId === 'orion' ? 'stars.js' : 'circuit.js'}`;
  document.body.appendChild(script);
}

mountTeamMotif(contextTeam);

const themePicker = document.querySelector('.theme-picker');
if (themePicker && !sourceTeam) {
  const themeButtons = [...themePicker.querySelectorAll('[data-theme-choice]')];
  let reloadTimer;

  if (fixedTheme) themePicker.dataset.indicatorPosition = fixedTheme;
  themePicker.dataset.selected = String(Boolean(fixedTheme));
  window.requestAnimationFrame(() => {
    themePicker.dataset.ready = 'true';
  });

  themeButtons.forEach((button) => {
    const theme = button.dataset.themeChoice;
    button.setAttribute('aria-pressed', String(theme === fixedTheme));
    button.addEventListener('click', () => {
      const nextTheme = fixedTheme === theme ? '' : theme;

      try {
        if (!nextTheme) {
          window.localStorage.removeItem('nucleo-theme-fixed');
        } else {
          window.localStorage.setItem('nucleo-theme-fixed', nextTheme);
        }
      } catch (error) {
        /* O tema contextual padrão permanece disponível sem armazenamento local. */
      }

      fixedTheme = nextTheme;
      themeButtons.forEach((themeButton) => {
        themeButton.setAttribute('aria-pressed', String(themeButton.dataset.themeChoice === nextTheme));
      });

      if (nextTheme) themePicker.dataset.indicatorPosition = nextTheme;
      themePicker.dataset.selected = String(Boolean(nextTheme));

      window.clearTimeout(reloadTimer);
      const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 260;
      reloadTimer = window.setTimeout(() => window.location.reload(), delay);
    });
  });
}

function addTeamContext(link, teamId) {
  const rawHref = link.getAttribute('href') || '';
  if (!rawHref || rawHref.startsWith('#') || /^(mailto:|tel:|javascript:)/i.test(rawHref)) return;

  try {
    const target = new URL(rawHref, window.location.href);
    if (target.origin !== window.location.origin || target.hash && target.pathname === window.location.pathname) return;
    const targetPage = target.pathname.split('/').pop().toLowerCase();
    if (targetPage === 'index.html' || targetPage === '') return;
    target.searchParams.set('context', teamId);
    link.href = target.href;
  } catch (error) {
    /* Links malformados ou esquemas locais desconhecidos permanecem intactos. */
  }
}

/* Inclui links já renderizados; o listener delegado também cobre os criados depois.
   O tema acompanha a navegação entre áreas e detalhes; voltar ao Núcleo (home)
   encerra o contexto e mantém a página inicial sempre neutra. */
const activeContext = contextTeam || sourceTeam;
if (activeContext) {
  document.querySelectorAll('a[href]').forEach((link) => addTeamContext(link, activeContext));
  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : event.target.parentElement;
    const link = target && target.closest('a[href]');
    if (link) addTeamContext(link, activeContext);
  }, true);
}

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
