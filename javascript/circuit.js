/* =========================================================
   NEXA 404 — TRILHAS DE CIRCUITO
   Trilhas de placa (retas com "dobras" de 45°) em verde e roxo,
   com pulsos de dados que correm por elas. Efeito próprio da
   NEXA; o campo de estrelas é só do Robotic Órion.

   Camada fixa (trilhas) é desenhada uma vez; só os pulsos animam.
   Pausa fora da tela / aba escondida; respeita "reduzir movimento".
   ========================================================= */

(function () {
  const canvas = document.querySelector('#nx-circuit');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const CFG = {
    cell: 26,                 // malha em px
    density: 14000,           // px² por trilha (menor = mais trilhas)
    segments: [5, 12],        // segmentos por trilha
    speed: [70, 140],         // px/s dos pulsos
    pulseLength: [50, 110],   // comprimento do pulso em px
    wait: [0.3, 3.5],         // pausa (s) entre uma passagem e outra
    purpleShare: 0.3,         // fatia de trilhas roxas
    green: '134, 208, 17',
    purple: '144, 64, 208'
  };

  /* direções: 0=L 1=SE 2=S 3=SO 4=O 5=NO 6=N 7=NE */
  const DIRS = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];

  const rnd = (a, b) => a + Math.random() * (b - a);
  const int = (a, b) => Math.floor(rnd(a, b + 1));

  let w = 0;
  let h = 0;
  let dpr = 1;
  let base = null;
  let traces = [];
  let pulses = [];
  let running = false;
  let visible = true;
  let last = 0;


  /* ---------- trilhas ---------- */

  function makeTrace(cols, rows) {
    let x = int(0, cols);
    let y = int(0, rows);
    let dir = int(0, 3) * 2;                  // começa reta (L, S, O ou N)
    const pts = [[x, y]];
    const n = int(CFG.segments[0], CFG.segments[1]);

    for (let i = 0; i < n; i++) {
      let d;
      let run;

      if (i % 2 === 0) {                      // trecho reto
        d = dir;
        run = int(2, 5);
      } else {                                // dobra de 45° e volta
        d = (dir + (Math.random() < 0.5 ? 1 : 7)) % 8;
        run = int(1, 2);
        if (Math.random() < 0.25) dir = (dir + (Math.random() < 0.5 ? 2 : 6)) % 8;
      }

      const nx = x + DIRS[d][0] * run;
      const ny = y + DIRS[d][1] * run;
      if (nx < 0 || ny < 0 || nx > cols || ny > rows) break;

      x = nx;
      y = ny;
      pts.push([x, y]);
    }

    if (pts.length < 3) return null;

    const px = pts.map(([a, b]) => [a * CFG.cell, b * CFG.cell]);
    const cum = [0];
    for (let i = 1; i < px.length; i++) {
      cum.push(cum[i - 1] + Math.hypot(px[i][0] - px[i - 1][0], px[i][1] - px[i - 1][1]));
    }

    return {
      pts: px,
      cum,
      total: cum[cum.length - 1],
      color: Math.random() < CFG.purpleShare ? CFG.purple : CFG.green
    };
  }

  function strokePath(t, a, b) {
    a = Math.max(a, 0);
    b = Math.min(b, t.total);
    if (b <= a) return false;

    ctx.beginPath();
    let started = false;

    for (let i = 0; i < t.pts.length - 1; i++) {
      const s0 = t.cum[i];
      const s1 = t.cum[i + 1];
      if (s1 < a) continue;
      if (s0 > b) break;

      const len = s1 - s0 || 1;
      const k0 = (Math.max(a, s0) - s0) / len;
      const k1 = (Math.min(b, s1) - s0) / len;
      const [x0, y0] = t.pts[i];
      const [x1, y1] = t.pts[i + 1];

      if (!started) {
        ctx.moveTo(x0 + (x1 - x0) * k0, y0 + (y1 - y0) * k0);
        started = true;
      }
      ctx.lineTo(x0 + (x1 - x0) * k1, y0 + (y1 - y0) * k1);
    }

    ctx.stroke();
    return true;
  }

  function pointAt(t, s) {
    for (let i = 0; i < t.pts.length - 1; i++) {
      if (s <= t.cum[i + 1]) {
        const k = (s - t.cum[i]) / (t.cum[i + 1] - t.cum[i] || 1);
        const [x0, y0] = t.pts[i];
        const [x1, y1] = t.pts[i + 1];
        return [x0 + (x1 - x0) * k, y0 + (y1 - y0) * k];
      }
    }
    return t.pts[t.pts.length - 1];
  }


  /* ---------- montagem (no início e ao redimensionar) ---------- */

  function build() {
    const r = canvas.getBoundingClientRect();
    w = Math.max(1, Math.round(r.width));
    h = Math.max(1, Math.round(r.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = w * dpr;
    canvas.height = h * dpr;

    const cols = Math.floor(w / CFG.cell);
    const rows = Math.floor(h / CFG.cell);
    const count = Math.max(8, Math.floor((w * h) / CFG.density));

    traces = [];
    for (let i = 0, tries = 0; traces.length < count && tries < count * 6; i++, tries++) {
      const t = makeTrace(cols, rows);
      if (t) traces.push(t);
    }

    /* camada fixa: trilhas + pontos de solda nas pontas */
    base = document.createElement('canvas');
    base.width = canvas.width;
    base.height = canvas.height;

    const b = base.getContext('2d');
    b.scale(dpr, dpr);
    b.lineCap = 'round';
    b.lineJoin = 'round';

    traces.forEach((t) => {
      b.strokeStyle = `rgba(${t.color}, 0.14)`;
      b.lineWidth = 1;
      b.beginPath();
      t.pts.forEach(([x, y], i) => (i ? b.lineTo(x, y) : b.moveTo(x, y)));
      b.stroke();

      [t.pts[0], t.pts[t.pts.length - 1]].forEach(([x, y]) => {
        b.strokeStyle = `rgba(${t.color}, 0.38)`;
        b.beginPath();
        b.arc(x, y, 3, 0, Math.PI * 2);
        b.stroke();

        b.fillStyle = `rgba(${t.color}, 0.5)`;
        b.beginPath();
        b.arc(x, y, 1, 0, Math.PI * 2);
        b.fill();
      });
    });

    /* pulsos: uns 60% das trilhas ganham um */
    pulses = traces
      .filter(() => Math.random() < 0.6)
      .map((t) => ({
        t,
        s: -rnd(0, 3) * CFG.speed[1],
        v: rnd(CFG.speed[0], CFG.speed[1]),
        len: rnd(CFG.pulseLength[0], CFG.pulseLength[1])
      }));

    draw();
  }


  /* ---------- desenho ---------- */

  function draw() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(base, 0, 0, w, h);

    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    pulses.forEach((p) => {
      const tail = p.s - p.len;
      if (p.s < 0 || tail > p.t.total) return;

      ctx.strokeStyle = `rgba(${p.t.color}, 0.10)`;
      ctx.lineWidth = 6;
      strokePath(p.t, tail, p.s);

      ctx.strokeStyle = `rgba(${p.t.color}, 0.30)`;
      ctx.lineWidth = 3;
      strokePath(p.t, tail + p.len * 0.3, p.s);

      ctx.strokeStyle = `rgba(${p.t.color}, 0.95)`;
      ctx.lineWidth = 1.6;
      strokePath(p.t, tail + p.len * 0.65, p.s);

      if (p.s <= p.t.total) {
        const [x, y] = pointAt(p.t, p.s);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    ctx.globalCompositeOperation = 'source-over';
  }

  function tick(now) {
    if (!running) return;

    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    pulses.forEach((p) => {
      p.s += p.v * dt;
      if (p.s - p.len > p.t.total) {          // terminou: espera e recomeça
        p.s = -rnd(CFG.wait[0], CFG.wait[1]) * p.v;
        p.v = rnd(CFG.speed[0], CFG.speed[1]);
      }
    });

    draw();
    requestAnimationFrame(tick);
  }

  function start() {
    if (running || reduceMotion || !visible || document.hidden) return;
    running = true;
    last = performance.now();
    requestAnimationFrame(tick);
  }

  function stop() {
    running = false;
  }


  /* ---------- liga ---------- */

  build();

  if (reduceMotion) {
    /* sem movimento: um quadro fixo com alguns pulsos parados */
    pulses.forEach((p) => { p.s = p.t.total * rnd(0.2, 0.9); });
    draw();
    return;
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      visible ? start() : stop();
    }).observe(canvas);
  }

  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  let timer;
  if ('ResizeObserver' in window) {
    let first = true;
    new ResizeObserver(() => {
      if (first) { first = false; return; }
      clearTimeout(timer);
      timer = setTimeout(build, 150);
    }).observe(canvas);
  }

  start();
})();
