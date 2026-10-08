/* Cátedra de Mecanismos — armado de páginas a partir de datos.js
   No hace falta editar este archivo para agregar contenido. */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const main = $("#main");
  const page = main ? main.dataset.page : "";
  const toolById = id => HERRAMIENTAS.find(h => h.id === id);
  const termById = id => GLOSARIO.find(g => g.id === id);
  const mat = id => MATERIAS.find(m => m.id === id);
  const unitOf = (mid, n) => { const m = mat(mid); return m && m.unidades.find(u => u.n === n); };
  const unitLink = (mid, n) => `unidad.html#${mid}-${n}`;
  const termUnit = (t, mid) => mid === "mecanismos" ? t.u : t[mid];
  const logo = parts => `${esc(parts[0])}<span>${esc(parts[1])}</span>`;
  const sortES = (a, b) => a.t.localeCompare(b.t, "es", { sensitivity: "base" });
  const letterOf = t => t.normalize("NFD").replace(/[̀-ͯ]/g, "").charAt(0).toUpperCase();
  const aula = m => (m && m.moodle) || SITIO.moodle;

  /* La materia elegida se recuerda en este navegador (si se puede) */
  const syncAula = mid => { const a = document.getElementById("navAula"); if (a) a.href = aula(mat(mid)); };
  const store = {
    get() { try { return localStorage.getItem("catedra-materia"); } catch (e) { return null; } },
    set(v) {
      try { localStorage.setItem("catedra-materia", v); } catch (e) { /* sin almacenamiento */ }
      syncAula(v);
    }
  };
  const hashMateria = () => { const h = location.hash.slice(1).split("-")[0]; return mat(h) ? h : null; };
  const currentMateria = () => hashMateria() || (mat(store.get()) ? store.get() : MATERIAS[0].id);

  /* ---------- Barra superior y pie ---------- */
  const NAV = [
    ["inicio", "index.html", "Inicio"],
    ["programa", "programa.html", "Programas"],
    ["apuntes", "apuntes.html", "Apuntes"],
    ["herramientas", "herramientas.html", "Herramientas"],
    ["glosario", "glosario.html", "Glosario"]
  ];
  const navPage = page === "unidad" ? "programa" : page;
  const header = document.createElement("header");
  header.className = "top";
  header.innerHTML = `<div class="wrap">
    <a class="brand" href="index.html"><b>MECANIS<span>MOS</span></b><small>Cátedra · Facultad de Ingeniería · UNSJ</small></a>
    <button class="menu-btn" id="menuBtn" type="button" aria-expanded="false" aria-controls="nav">Menú</button>
    <nav class="nav" id="nav" aria-label="Secciones">
      ${NAV.map(([id, href, txt]) => `<a href="${href}"${id === navPage ? ' aria-current="page"' : ""}>${txt}</a>`).join("")}
      <a class="ext" id="navAula" href="${esc(aula(mat(hashMateria() || store.get())))}" target="_blank" rel="noopener">Aula virtual</a>
    </nav></div>`;
  document.body.prepend(header);
  const menuBtn = $("#menuBtn"), nav = $("#nav");
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });

  const footer = document.createElement("footer");
  footer.className = "site-foot";
  footer.innerHTML = `<div class="wrap">
    <div><b>${esc(SITIO.universidad)}</b>${esc(SITIO.facultad)}<br><span class="chair">Cátedra ${esc(SITIO.catedra)}</span></div>
    <div class="right">${MATERIAS.map(m => `${esc(m.nombre)} · ${esc(m.carrera)}`).join("<br>")}<br>Desarrollo del sitio y las herramientas: ${esc(SITIO.desarrollo)}</div>
  </div>`;
  document.body.append(footer);

  /* ---------- Piezas comunes ---------- */
  const toolChips = h => MATERIAS.filter(m => (h.unidades[m.id] || []).length).map(m =>
    `<div class="chips"><span class="chip-label">${esc(m.nombre)}</span>${h.unidades[m.id].map(n =>
      `<a class="chip" href="${unitLink(m.id, n)}"><span class="mono">U${n}</span>${esc(unitOf(m.id, n).corto)}</a>`).join("")}</div>`).join("");

  const toolCard = h => `<article class="tool">
      <div><div class="logo">${logo(h.marca)}</div><div class="lema">${esc(h.lema)}</div></div>
      <p>${esc(h.descripcion)}</p>
      <ul>${h.funciones.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
      <div class="toolchips">${toolChips(h)}</div>
      <div class="foot"><a class="btn primary" href="${esc(h.archivo)}" target="_blank" rel="noopener">Abrir ${esc(h.nombre)}</a>${h.nota ? `<span class="note">${esc(h.nota)}</span>` : ""}</div>
    </article>`;

  const docItem = a => `<li><a class="doc" href="${esc(a.archivo)}" target="_blank" rel="noopener">
      <span class="ico">${esc(a.tipo || "PDF")}</span>
      <span style="min-width:0"><span class="t">${esc(a.titulo)}</span><br><span class="m">${esc(a.tipo || "PDF")}${a.paginas ? ` · ${a.paginas} págs.` : ""}</span></span>
      <span class="go">Abrir</span></a></li>`;

  const pageHead = (eyebrow, title, lead, extra) => `<div class="sheet"><div class="wrap pagehead">
      <span class="eyebrow">${eyebrow}</span><h1>${title}</h1>${lead ? `<p class="lead">${lead}</p>` : ""}${extra || ""}</div></div>`;

  /* Selector de materia (pestañas) */
  const switcher = (cur, label) => `<div class="switch" role="group" aria-label="${label || "Materia"}">${MATERIAS.map(m =>
    `<button type="button" data-m="${m.id}" aria-pressed="${m.id === cur}"><b>${esc(m.nombre)}</b><span>${esc(m.carrera)}</span></button>`).join("")}</div>`;
  const bindSwitch = (onChange) => {
    document.querySelectorAll(".switch").forEach(sw => sw.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      store.set(b.dataset.m);
      history.replaceState(null, "", "#" + b.dataset.m);
      onChange(b.dataset.m);
    }));
  };

  /* ---------- Páginas ---------- */
  const PAGES = {
    inicio() {
      const sample = ["ley-de-grashof", "centro-instantaneo", "poligono-de-velocidades", "coriolis", "evolvente", "ley-de-engrane", "movimiento-cicloidal", "transmision-por-correa", "junta-universal", "transmisibilidad"].map(termById).filter(Boolean);
      main.innerHTML = `
      <div class="sheet"><div class="wrap hero">
        <div>
          <span class="eyebrow">Cátedra</span>
          <h1>MECANIS<span>MOS</span></h1>
          <div class="inst"><b>${esc(SITIO.universidad)}</b><span>${esc(SITIO.facultad)}</span></div>
          <p class="lead">Apuntes, herramientas interactivas y glosario de las materias de la cátedra: mecanismos articulados planos, cinemática y cinética del cuerpo rígido, transmisión por contacto y levas.</p>
          <div class="cta"><a class="btn primary" href="#materias">Elegí tu materia</a><a class="btn" href="herramientas.html">Herramientas</a></div>
        </div>
        <figure class="fig" style="margin:0">
          <canvas id="linkage" width="800" height="600" aria-label="Cuadrilátero articulado manivela-balancín animado, con la curva de un punto del acoplador"></canvas>
          <figcaption><span>a 40 · b 110 · c 80 · d 100 mm</span><span>s + l = <b>150</b> ≤ p + q = <b>180</b> → manivela-balancín</span><span id="th2">θ₂ = 0°</span></figcaption>
        </figure>
      </div></div>
      <div class="wrap">
        <section class="section" id="materias">
          <div class="sec-head"><h2>Materias</h2></div>
          <div class="courses">${MATERIAS.map(m => `<article class="course">
            <span class="eyebrow">${esc(m.carrera)}</span>
            <h3>${esc(m.nombre)}</h3>
            <p class="muted">${esc(m.descripcion)}</p>
            <dl class="cmeta"><div><dt>Semestre</dt><dd>${esc(m.semestre)}</dd></div><div><dt>Código</dt><dd>${esc(m.codigo)}</dd></div><div><dt>Plan</dt><dd>${esc(m.plan)}</dd></div><div><dt>Carga</dt><dd>${esc(m.cargaTotal)}</dd></div></dl>
            <ol class="cunits">${m.unidades.map(u => `<li><a href="${unitLink(m.id, u.n)}"><span class="mono">U${u.n}</span>${esc(u.corto)}</a></li>`).join("")}</ol>
            <div class="cta"><a class="btn primary" data-m="${m.id}" href="programa.html#${m.id}">Programa</a><a class="btn" data-m="${m.id}" href="apuntes.html#${m.id}">Apuntes</a><a class="btn" data-m="${m.id}" href="${esc(aula(m))}" target="_blank" rel="noopener">Aula virtual ↗</a></div>
          </article>`).join("")}</div>
        </section>
        <section class="section">
          <div class="sec-head"><h2>Herramientas</h2><a href="herramientas.html">Ver todas</a></div>
          <div class="tools">${HERRAMIENTAS.map(toolCard).join("")}</div>
        </section>
        <section class="section">
          <div class="sec-head"><h2>Glosario</h2><a href="glosario.html">${GLOSARIO.length} términos</a></div>
          <div class="terms-mini">${sample.map(t => `<a href="glosario.html#${t.id}">${esc(t.t)}</a>`).join("")}</div>
        </section>
        <section class="section">
          <div class="sec-head"><h2>Equipo docente</h2></div>
          <div class="team">${EQUIPO.map(p => `<div class="person"><span class="cargo">${esc(p.cargo)}</span><b>${esc(p.nombre)}</b></div>`).join("")}</div>
        </section>
      </div>`;
      main.querySelectorAll("a[data-m]").forEach(a => a.addEventListener("click", () => store.set(a.dataset.m)));
      drawLinkage();
    },

    programa() {
      const render = mid => {
        const m = mat(mid);
        document.title = `Programa de ${m.nombre} · Cátedra Mecanismos`;
        syncAula(mid);
        const hasWeeks = m.semanas && m.unidades.every(u => u.semanas);
        const weeks = Array.from({ length: m.semanas || 0 }, (_, i) => i + 1);
        main.innerHTML = pageHead("Programas " + SITIO.anio, "Programa analítico", "", switcher(mid)) + `
        <div class="wrap">
          <section class="section">
            <div class="sec-head"><h2>${esc(m.nombre)}</h2>${m.archivo ? `<a href="${esc(m.archivo)}" target="_blank" rel="noopener">Planificación completa (PDF)</a>` : ""}</div>
            <dl class="datasheet" style="margin:0">
              <div><dt>Carrera</dt><dd>${esc(m.carrera)}</dd></div><div><dt>Código</dt><dd>${esc(m.codigo)}</dd></div>
              <div><dt>Plan</dt><dd>${esc(m.plan)}</dd></div><div><dt>Semestre</dt><dd>${esc(m.semestre)}</dd></div>
              <div><dt>Carga total</dt><dd>${esc(m.cargaTotal)}</dd></div><div><dt>Semanal</dt><dd>${esc(m.cargaSemanal)}</dd></div>
            </dl>
            <div>${m.unidades.map(u => `<div class="unit-block">
                <div class="side"><span class="n">${u.n}</span><span>${u.horas} h</span>${u.semanas ? `<span>sem. ${u.semanas.join(", ")}</span>` : ""}</div>
                <div><h3><a href="${unitLink(m.id, u.n)}">${esc(u.titulo)}</a></h3>
                  <ul class="topics">${u.temas.map(([n, t]) => `<li><span class="mono">${n}</span><span>${esc(t)}</span></li>`).join("")}</ul></div>
              </div>`).join("")}</div>
          </section>
          <section class="section">
            <div class="sec-head"><h2>Cronograma ${SITIO.anio}</h2></div>
            ${hasWeeks ? `<div class="gantt-wrap"><table class="gantt">
              <thead><tr><th>Semana</th>${weeks.map(w => `<th>${w}</th>`).join("")}</tr></thead>
              <tbody>${m.unidades.map(u => `<tr><td><a href="${unitLink(m.id, u.n)}" style="text-decoration:none">Unidad ${u.n}</a></td>${weeks.map(w => `<td class="${u.semanas.includes(w) ? "on" : ""}"></td>`).join("")}</tr>`).join("")}</tbody>
            </table></div>` : ""}
            <div class="pips">${m.fechas.map(p => `<div class="pip"><b>${esc(p.nombre)}</b><span>${esc(p.fecha)}</span></div>`).join("")}</div>
            ${m.horarios.length ? `<div class="hours">${m.horarios.map(h => `<div class="box"><h2>${esc(h.tipo)}</h2>${h.dias.map(d => `<p class="mono">${esc(d)}</p>`).join("")}</div>`).join("")}</div>` : ""}
          </section>
          <section class="section">
            <div class="sec-head"><h2>Evaluación</h2></div>
            <div class="prose"><p>${esc(m.evaluacion)}</p>
            <p class="muted">Las evaluaciones se rinden en el aula virtual. <a href="${esc(aula(m))}" target="_blank" rel="noopener">Ir al aula virtual ↗</a></p></div>
          </section>
        </div>`;
        bindSwitch(render);
      };
      render(currentMateria());
      window.addEventListener("hashchange", () => render(currentMateria()));
    },

    unidad() {
      const render = () => {
        const [mid0, n0] = location.hash.slice(1).split("-");
        const mid = mat(mid0) ? mid0 : currentMateria();
        const m = mat(mid);
        const u = unitOf(mid, parseInt(n0, 10)) || m.unidades[0];
        store.set(mid);
        document.title = `Unidad ${u.n} · ${m.nombre}`;
        const tools = HERRAMIENTAS.filter(h => (h.unidades[mid] || []).includes(u.n));
        const docs = APUNTES.filter(a => (a.materia === mid || a.materia === "ambas") && a.unidad === u.n);
        const terms = GLOSARIO.filter(g => termUnit(g, mid) === u.n).sort(sortES);
        const prev = unitOf(mid, u.n - 1), next = unitOf(mid, u.n + 1);
        main.innerHTML = pageHead(`<a href="programa.html#${mid}" style="text-decoration:none">${esc(m.nombre)}</a> · Unidad ${u.n} · ${u.horas} h`, esc(u.titulo), esc(u.resumen)) + `
        <div class="wrap">
          <section class="section two">
            <div style="display:flex;flex-direction:column;gap:14px;min-width:0">
              <h2 style="font-size:24px">Temas</h2>
              <ul class="topics">${u.temas.map(([k, t]) => `<li><span class="mono">${k}</span><span>${esc(t)}</span></li>`).join("")}</ul>
            </div>
            <div style="display:flex;flex-direction:column;gap:16px;min-width:0">
              <div class="box"><h2>Apuntes</h2>${docs.length ? `<ul class="docs">${docs.map(docItem).join("")}</ul>` : `<p class="empty">Todavía no hay apuntes cargados para esta unidad.</p>`}</div>
              ${tools.length ? `<div class="box"><h2>Herramientas</h2>${tools.map(h => `<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"><div><div style="font-weight:700;letter-spacing:.14em;font-size:20px" class="logo">${logo(h.marca)}</div><div class="muted" style="font-size:14px">${esc(h.lema)}</div></div><a class="btn primary small" href="${esc(h.archivo)}" target="_blank" rel="noopener">Abrir</a></div>`).join("")}</div>` : ""}
            </div>
          </section>
          ${terms.length ? `<section class="section"><div class="sec-head"><h2>Términos de la unidad</h2><a href="glosario.html#${mid}">Glosario de ${esc(m.nombre)}</a></div>
            <div class="terms-mini">${terms.map(t => `<a href="glosario.html#${t.id}">${esc(t.t)}</a>`).join("")}</div></section>` : ""}
          <section class="section"><nav class="pager" aria-label="Otras unidades">
            ${prev ? `<a href="${unitLink(mid, prev.n)}"><span>← Unidad ${prev.n}</span>${esc(prev.titulo)}</a>` : ""}
            ${next ? `<a class="next" href="${unitLink(mid, next.n)}"><span>Unidad ${next.n} →</span>${esc(next.titulo)}</a>` : ""}
          </nav></section>
        </div>`;
        window.scrollTo(0, 0);
      };
      window.addEventListener("hashchange", render);
      render();
    },

    herramientas() {
      main.innerHTML = pageHead("Herramientas digitales", "Herramientas",
        "Aplicaciones de la cátedra para trabajar los temas en la computadora. Se abren en el navegador, sin instalar ni descargar nada.") + `
      <div class="wrap"><section class="section"><div class="tools">${HERRAMIENTAS.map(toolCard).join("")}</div>
      <p class="muted" style="font-size:15px">Funcionan mejor en computadora, con Chrome, Edge o Firefox actualizados.</p></section></div>`;
    },

    apuntes() {
      const render = mid => {
        const m = mat(mid);
        const groups = [{ n: 0, titulo: "Material general" }].concat(m.unidades);
        syncAula(mid);
        const ofM = a => a.materia === mid || a.materia === "ambas";
        main.innerHTML = pageHead("Material de estudio", "Apuntes", "Apuntes desarrollados por la cátedra, ordenados por unidad.", switcher(mid)) + `
        <div class="wrap"><section class="section">${groups.map(g => {
          const docs = APUNTES.filter(a => ofM(a) && a.unidad === g.n);
          return `<div class="doc-group"><h3>${g.n ? `<span class="mono">U${g.n}</span><a href="${unitLink(mid, g.n)}" style="text-decoration:none">${esc(g.titulo)}</a>` : esc(g.titulo)}</h3>
            ${docs.length ? `<ul class="docs">${docs.map(docItem).join("")}</ul>` : `<p class="empty">Todavía no hay apuntes cargados.</p>`}</div>`;
        }).join("")}</section></div>`;
        bindSwitch(render);
      };
      render(currentMateria());
    },

    glosario() {
      const all = GLOSARIO.slice().sort(sortES);
      const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
      const h0 = location.hash.slice(1);
      let materia = mat(h0) ? h0 : "", unit = 0;
      main.innerHTML = pageHead("Glosario", "Términos de mecanismos",
        `${all.length} definiciones breves, vinculadas con las unidades de cada materia y con las herramientas donde se pueden ver en movimiento.`) + `
      <div class="wrap"><section class="section">
        <div class="gl-tools">
          <label class="search" for="q"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
            <input id="q" type="search" placeholder="Buscar un término o una palabra de la definición" autocomplete="off"></label>
          <div class="chips" id="mfilter" role="group" aria-label="Filtrar por materia"></div>
          <div class="chips" id="ufilter" role="group" aria-label="Filtrar por unidad"></div>
          <div class="letters" id="letters" aria-label="Índice alfabético"></div>
        </div>
        <div id="gl" class="gl-layout"></div>
      </section></div>`;
      const box = $("#gl"), q = $("#q"), mf = $("#mfilter"), uf = $("#ufilter"), lt = $("#letters");
      const norm = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
      const unitChips = t => MATERIAS.filter(m => termUnit(t, m.id)).map(m => {
        const n = termUnit(t, m.id), u = unitOf(m.id, n);
        return `<a class="chip" href="${unitLink(m.id, n)}" title="${esc(m.nombre)} · ${esc(u.titulo)}"><span class="mono">${m.sigla} U${n}</span>${esc(u.corto)}</a>`;
      }).join("");
      const drawFilters = () => {
        mf.innerHTML = `<button class="chip" type="button" data-m="" aria-pressed="${!materia}">Todas las materias</button>` +
          MATERIAS.map(m => `<button class="chip" type="button" data-m="${m.id}" aria-pressed="${materia === m.id}">${esc(m.nombre)}</button>`).join("");
        uf.hidden = !materia;
        if (materia) uf.innerHTML = `<button class="chip" type="button" data-u="0" aria-pressed="${!unit}">Todas las unidades</button>` +
          mat(materia).unidades.map(u => `<button class="chip" type="button" data-u="${u.n}" aria-pressed="${unit === u.n}"><span class="mono">U${u.n}</span>${esc(u.corto)}</button>`).join("");
      };
      const draw = () => {
        const query = norm(q.value.trim());
        const list = all.filter(t =>
          (!materia || termUnit(t, materia)) && (!unit || termUnit(t, materia) === unit) &&
          (!query || norm(t.t + " " + t.d.replace(/<[^>]+>/g, "")).includes(query)));
        const present = new Set(list.map(t => letterOf(t.t)));
        lt.innerHTML = letters.map(l => present.has(l) ? `<a href="#letra-${l}">${l}</a>` : `<span>${l}</span>`).join("");
        if (!list.length) { box.innerHTML = `<p class="noresults">No hay términos que coincidan con la búsqueda.</p>`; return; }
        let html = "", cur = "";
        for (const t of list) {
          const L = letterOf(t.t);
          if (L !== cur) { cur = L; html += `<div class="gl-letter" id="letra-${L}">${L}</div>`; }
          const app = t.app && toolById(t.app);
          html += `<article class="term" id="${t.id}">
            <div class="tmeta"><h3>${esc(t.t)}</h3><div class="chips">${unitChips(t)}</div></div>
            <div class="body">${t.f ? `<div class="formula">${esc(t.f)}</div>` : ""}<p>${t.d}</p>
              ${app ? `<a class="applink" href="${esc(app.archivo)}" target="_blank" rel="noopener">Verlo en ${esc(app.nombre)} ↗</a>` : ""}
              ${t.ver && t.ver.length ? `<p class="seealso">Ver también: ${t.ver.map(termById).filter(Boolean).map(r => `<a href="#${r.id}">${esc(r.t)}</a>`).join(", ")}</p>` : ""}
            </div></article>`;
        }
        box.innerHTML = html;
      };
      q.addEventListener("input", draw);
      mf.addEventListener("click", e => {
        const b = e.target.closest("button"); if (!b) return;
        materia = b.dataset.m; unit = 0; if (materia) store.set(materia);
        drawFilters(); draw();
      });
      uf.addEventListener("click", e => {
        const b = e.target.closest("button"); if (!b) return;
        unit = +b.dataset.u; drawFilters(); draw();
      });
      drawFilters(); draw();
      if (h0 && !materia) { const el = document.getElementById(h0); if (el) setTimeout(() => el.scrollIntoView(), 50); }
    }
  };

  /* ---------- Cuadrilátero animado de la portada ---------- */
  function drawLinkage() {
    const cv = $("#linkage"); if (!cv) return;
    const ctx = cv.getContext("2d");
    const a = 40, b = 110, c = 80, d = 100;          // manivela, acoplador, balancín, bastidor (mm)
    const pOff = 62, pAng = 38 * Math.PI / 180;       // punto del acoplador
    const solve = th => {
      const A = [a * Math.cos(th), a * Math.sin(th)];
      const dx = d - A[0], dy = -A[1], L = Math.hypot(dx, dy);
      const k = (b * b - c * c + L * L) / (2 * L), h = Math.sqrt(Math.max(0, b * b - k * k));
      const ux = dx / L, uy = dy / L;
      const B = [A[0] + k * ux - h * uy, A[1] + k * uy + h * ux];
      const ang = Math.atan2(B[1] - A[1], B[0] - A[0]) + pAng;
      const P = [A[0] + pOff * Math.cos(ang), A[1] + pOff * Math.sin(ang)];
      return { A, B, P };
    };
    const trace = []; for (let i = 0; i <= 360; i += 2) trace.push(solve(i * Math.PI / 180).P);
    const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    const W = cv.width, H = cv.height, S = 3.2, ox = 256, oy = 392;
    const X = p => ox + p[0] * S, Y = p => oy - p[1] * S;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let th = 0.9, last = 0;
    const out = $("#th2");
    function frame(t) {
      const dt = last ? Math.min(50, t - last) : 16; last = t;
      if (!reduce) th = (th + dt * 0.0011) % (2 * Math.PI);
      const C = { ink: css("--ink"), muted: css("--muted"), line: css("--line"), acc: css("--accent"), blue: css("--blue"), green: css("--green"), violet: css("--violet"), panel: css("--panel") };
      const { A, B, P } = solve(th);
      ctx.clearRect(0, 0, W, H);
      // bastidor
      ctx.setLineDash([6, 6]); ctx.strokeStyle = C.muted; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(X([0, 0]), Y([0, 0])); ctx.lineTo(X([d, 0]), Y([d, 0])); ctx.stroke(); ctx.setLineDash([]);
      // curva del acoplador
      ctx.strokeStyle = C.violet; ctx.globalAlpha = .55; ctx.lineWidth = 2;
      ctx.beginPath(); trace.forEach((p, i) => i ? ctx.lineTo(X(p), Y(p)) : ctx.moveTo(X(p), Y(p))); ctx.stroke(); ctx.globalAlpha = 1;
      // acoplador triangular
      ctx.fillStyle = C.blue; ctx.globalAlpha = .12;
      ctx.beginPath(); ctx.moveTo(X(A), Y(A)); ctx.lineTo(X(B), Y(B)); ctx.lineTo(X(P), Y(P)); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
      const bar = (p, q, col, w) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(X(p), Y(p)); ctx.lineTo(X(q), Y(q)); ctx.stroke(); };
      bar(A, P, C.blue, 2); bar(B, P, C.blue, 2);
      bar([0, 0], A, C.acc, 6); bar(A, B, C.blue, 6); bar([d, 0], B, C.green, 6);
      // apoyos fijos
      const ground = p => {
        const x = X(p), y = Y(p);
        ctx.strokeStyle = C.ink; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 14, y + 22); ctx.lineTo(x + 14, y + 22); ctx.closePath(); ctx.stroke();
        ctx.beginPath(); for (let i = -18; i <= 14; i += 7) { ctx.moveTo(x + i, y + 31); ctx.lineTo(x + i + 7, y + 23); } ctx.stroke();
      };
      ground([0, 0]); ground([d, 0]);
      const pin = (p, fill) => { ctx.beginPath(); ctx.arc(X(p), Y(p), 6.5, 0, 7); ctx.fillStyle = fill || C.panel; ctx.fill(); ctx.strokeStyle = C.ink; ctx.lineWidth = 2; ctx.stroke(); };
      pin([0, 0]); pin([d, 0]); pin(A); pin(B);
      ctx.beginPath(); ctx.arc(X(P), Y(P), 5, 0, 7); ctx.fillStyle = C.violet; ctx.fill();
      // rótulos
      ctx.fillStyle = C.muted; ctx.font = "500 20px 'JetBrains Mono', monospace";
      ctx.fillText("O₂", X([0, 0]) - 44, Y([0, 0]) + 8); ctx.fillText("O₄", X([d, 0]) + 22, Y([d, 0]) + 8);
      ctx.fillStyle = C.ink; ctx.fillText("A", X(A) + 12, Y(A) - 10); ctx.fillText("B", X(B) + 12, Y(B) - 10);
      ctx.fillStyle = C.violet; ctx.fillText("P", X(P) + 10, Y(P) - 10);
      if (out) out.textContent = `θ₂ = ${String(Math.round(th * 180 / Math.PI)).padStart(3, " ")}°`;
      if (!reduce) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if (PAGES[page]) PAGES[page]();
})();
