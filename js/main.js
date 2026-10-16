/* ==========================================================
   Vina Sabrina — Portfolio · interactions & transitions
   Pure JS, no dependencies.
   ========================================================== */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const EASE_IO = 'cubic-bezier(.76,0,.24,1)';
  const EASE_OUT = 'cubic-bezier(.22,1,.36,1)';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const body = document.body;

  /* ---------------- Toast ---------------- */
  const toastEl = $('#toast');
  let toastT;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove('show'), 2800);
  }

  /* ---------------- Profile photo (optional) ---------------- */
  const photo = $('#photo');
  if (window.CONFIG && CONFIG.photo) {
    photo.onerror = () => photo.remove();
    photo.src = CONFIG.photo;
  } else photo.remove();

  /* ---------------- Word-mask text split ---------------- */
  function splitWords(el, base = 0, step = 70) {
    if (el.dataset.splitDone) return;
    el.dataset.splitDone = '1';
    const text = el.textContent.trim();
    if (!el.hasAttribute('aria-label')) el.setAttribute('aria-label', text);
    el.innerHTML = text.split(/\s+/).map((w, i) =>
      `<span class="w" aria-hidden="true"><span class="wi" style="--d:${base + i * step}">${esc(w)}</span></span>`).join(' ');
  }
  $$('[data-split]').forEach(el => splitWords(el, 0, 110));
  $$('[data-split-lines]').forEach(el => splitWords(el, 0, 60));

  /* ---------------- Column wipe transition ---------------- */
  const wipeEl = $('#wipe');
  const COLS = 6;
  for (let i = 0; i < COLS; i++) wipeEl.appendChild(document.createElement('i'));
  const bars = $$('i', wipeEl);
  let wiping = false;

  /** Covers the screen with blue columns, runs `mid`, then reveals again. */
  async function wipe(mid) {
    if (reduce) { await mid(); return; }
    if (wiping) { await mid(); return; }
    wiping = true; body.classList.add('wiping');
    const dur = 620, stagger = 55;
    bars.forEach(b => b.style.transformOrigin = 'bottom');
    const cover = bars.map((b, i) => b.animate([{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }],
      { duration: dur, delay: i * stagger, easing: EASE_IO, fill: 'forwards' }).finished);
    await Promise.all(cover);
    await mid();
    await wait(80);
    bars.forEach(b => b.style.transformOrigin = 'top');
    const reveal = bars.map((b, i) => b.animate([{ transform: 'scaleY(1)' }, { transform: 'scaleY(0)' }],
      { duration: dur, delay: (COLS - 1 - i) * stagger, easing: EASE_IO, fill: 'forwards' }).finished);
    await Promise.all(reveal);
    bars.forEach(b => { b.getAnimations().forEach(a => a.cancel()); b.style.transform = 'scaleY(0)'; });
    body.classList.remove('wiping'); wiping = false;
  }

  /* ---------------- Preloader → hero ---------------- */
  const pl = $('#preloader'), plCount = $('#plCount'), plBar = $('#plBar');
  const hero = $('#hero');
  let loaded = document.readyState === 'complete';
  if (!loaded) addEventListener('load', () => loaded = true);
  const fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready.catch(() => {}) : Promise.resolve();
  Promise.race([fontsReady, wait(2500)]);

  function startHero() {
    hero.classList.add('in');
    $$('.hero-title [data-split]', hero).forEach((el, i) => {
      $$('.wi', el).forEach((w, j) => w.style.setProperty('--d', 200 + i * 160 + j * 60));
      el.classList.add('split-in');
    });
  }

  async function runPreloader() {
    const t0 = performance.now(), minMs = reduce ? 200 : 1900;
    await new Promise(res => {
      (function tick(now) {
        const t = clamp((now - t0) / minMs, 0, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const v = Math.round(eased * 100);
        plCount.textContent = v;
        plBar.style.transform = `scaleX(${eased})`;
        if (t < 1 || !loaded) {
          if (t >= 1 && !loaded) { plCount.textContent = 99; }
          requestAnimationFrame(tick);
        } else res();
      })(t0);
    });
    await wipe(async () => {
      pl.remove();
      body.classList.remove('is-loading');
      window.scrollTo(0, 0);
    });
    startHero();
  }
  window.scrollTo(0, 0);
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  requestAnimationFrame(() => requestAnimationFrame(runPreloader));

  /* ---------------- Footer year ---------------- */
  $('#year').textContent = new Date().getFullYear();

  /* ---------------- Build project cards ---------------- */
  const stack = $('#stack');
  const P = window.PROJECTS || [];
  stack.innerHTML = P.map((p, i) => `
    <article class="pcard" style="--i:${i}" data-index="${i}" data-cursor="Open" tabindex="0" role="button" aria-label="Open case study: ${esc(p.title)}">
      <div class="pcard-body">
        <div class="pcard-no">${esc(p.no)}</div>
        <div class="pcard-tag">${esc(p.tag)}</div>
        <h3>${esc(p.title)}</h3>
        <p class="short">${esc(p.short)}</p>
        <ul class="pills">${p.chips.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
        <div class="pcard-foot">
          <div class="hl"><b>${esc(p.highlight.v)}</b><span>${esc(p.highlight.l)}</span></div>
          <span class="btn btn-sm magnetic" aria-hidden="true"><span>View case study</span><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
        </div>
      </div>
      <div class="pcard-media">
        <div class="win"><div class="win-bar"><i></i><i></i><i></i></div>
          <img src="${esc(p.thumb)}" alt="${esc(p.title)} — artifact preview" loading="lazy" class="${p.thumbPos ? 'pos-' + p.thumbPos : ''}"></div>
      </div>
    </article>`).join('');
  const cards = $$('.pcard', stack);

  /* ---------------- Header: hide/show, active link ---------------- */
  const header = $('#header');
  let lastY = 0;
  const navLinks = $$('.nav a');
  const sections = ['work', 'experience', 'certificates', 'contact'].map(id => $('#' + id));

  /* ---------------- Jump links with column wipe ---------------- */
  const menu = $('#menu'), burger = $('#burger');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
    body.classList.toggle('no-scroll', open);
  }
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));

  function targetY(hash) {
    if (hash === '#top' || hash === '#') return 0;
    const el = $(hash);
    return el ? el.getBoundingClientRect().top + scrollY - (hash === '#about' ? 0 : 70) : null;
  }
  $$('[data-jump]').forEach(a => a.addEventListener('click', e => {
    const hash = a.getAttribute('href');
    const y = targetY(hash);
    if (y === null) return;
    e.preventDefault();
    const wasOpen = menu.classList.contains('open');
    if (reduce) { setMenu(false); scrollTo(0, y); return; }
    wipe(async () => {
      if (wasOpen) setMenu(false);
      header.classList.remove('hide');
      scrollTo(0, targetY(hash));
      await wait(60);
    });
  }));

  /* ---------------- Reveal observers ---------------- */
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target;
    el.classList.add('in');
    if (el.matches('[data-split-lines]')) el.classList.add('split-in');
    if (el.matches('[data-count]')) countUp(el);
    io.unobserve(el);
  }), { threshold: .18, rootMargin: '0px 0px -6% 0px' });
  $$('[data-reveal],[data-split-lines]').forEach(el => io.observe(el));
  $$('[data-stagger]').forEach(el => {
    [...el.children].forEach((c, i) => c.style.setProperty('--i', i));
    io.observe(el);
    $$('[data-count]', el).forEach(c => io.observe(c));
  });

  function countUp(el) {
    const end = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0);
    if (reduce) { el.textContent = end.toFixed(dec); return; }
    const t0 = performance.now(), dur = 1800;
    (function f(now) {
      const t = clamp((now - t0) / dur, 0, 1);
      el.textContent = (end * (1 - Math.pow(1 - t, 4))).toFixed(dec);
      if (t < 1) requestAnimationFrame(f);
    })(t0);
  }

  /* Certificate ring = real progress through the bootcamp (Jun 1 → Dec 31, 2026) */
  const ring = $('#ringFg');
  const ringIO = new IntersectionObserver(([en]) => {
    if (!en.isIntersecting) return;
    const s = new Date('2026-06-01'), e = new Date('2026-12-31');
    const pr = clamp((Date.now() - s) / (e - s), .04, 1);
    ring.style.transition = reduce ? 'none' : 'stroke-dashoffset 2s ' + EASE_OUT;
    ring.style.strokeDashoffset = 327 * (1 - pr);
    ringIO.disconnect();
  }, { threshold: .4 });
  ringIO.observe(ring);

  /* ---------------- Marquee (speeds up with scroll velocity) ---------------- */
  let marqueeAnim = null;
  if (!reduce) {
    const track = $('#marquee');
    marqueeAnim = track.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }],
      { duration: 38000, iterations: Infinity, easing: 'linear' });
  }

  /* ---------------- Tilt on portrait + magnetic buttons + cursor ---------------- */
  const portrait = $('#portrait');
  if (finePointer && !reduce) {
    portrait.addEventListener('mousemove', e => {
      const r = portrait.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      portrait.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
    });
    portrait.addEventListener('mouseleave', () => portrait.style.transform = '');

    document.addEventListener('mousemove', e => {
      const m = e.target.closest && e.target.closest('.magnetic');
      $$('.magnetic').forEach(b => { if (b !== m) b.style.transform = ''; });
      if (!m) return;
      const r = m.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      m.style.transform = `translate(${dx * .22}px,${dy * .3}px)`;
    });
    document.addEventListener('mouseleave', () => $$('.magnetic').forEach(b => b.style.transform = ''));
  }

  const cursor = $('#cursor'), cursorLabel = $('#cursorLabel');
  let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
  if (finePointer) {
    body.classList.add('has-cursor');
    document.addEventListener('mousemove', e => {
      tx = e.clientX; ty = e.clientY; cursor.classList.add('show');
      const lab = e.target.closest && e.target.closest('[data-cursor]');
      const hov = e.target.closest && e.target.closest('a,button,[role=button],figure,input');
      cursor.classList.toggle('label', !!lab);
      cursor.classList.toggle('hover', !!hov && !lab);
      cursorLabel.textContent = lab ? lab.dataset.cursor : '';
    });
    document.addEventListener('mouseleave', () => cursor.classList.remove('show'));
  }

  /* ---------------- Single rAF loop: progress, parallax, stack, timeline ---------------- */
  const progress = $('#progress');
  const orbs = $$('.orb');
  const tl = $('#timeline'), tlFill = $('.tl-line span');
  let lastScroll = scrollY, vel = 0;

  function frame() {
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    /* header */
    header.classList.toggle('scrolled', y > 24);
    if (!menu.classList.contains('open') && !wiping) {
      if (y > lastY + 4 && y > 300) header.classList.add('hide');
      else if (y < lastY - 4 || y < 300) header.classList.remove('hide');
    }
    if (Math.abs(y - lastY) > 4) lastY = y;
    let cur = null;
    sections.forEach(s => { if (s && s.getBoundingClientRect().top < innerHeight * .4) cur = s.id; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));

    /* velocity → marquee speed */
    vel = lerp(vel, y - lastScroll, .12); lastScroll = y;
    if (marqueeAnim) marqueeAnim.playbackRate = 1 + clamp(Math.abs(vel) * .35, 0, 8);

    if (!reduce) {
      /* parallax orbs */
      orbs.forEach((o, i) => o.style.translate = `0 ${y * (i ? -.08 : .12)}px`);

      /* stacked project cards: previous card recedes as the next slides over it */
      cards.forEach((c, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const stick = parseFloat(getComputedStyle(c).top) || 90;
        const d = next.getBoundingClientRect().top - stick;
        const p = clamp(1 - d / (innerHeight * .75), 0, 1);
        c.style.transform = p > 0 ? `scale(${1 - p * .055})` : '';
        c.classList.toggle('dim', p > .5);
      });
    }

    /* timeline line draw */
    if (tl && tlFill) {
      const r = tl.getBoundingClientRect();
      tlFill.style.transform = `scaleY(${clamp((innerHeight * .6 - r.top) / r.height, 0, 1)})`;
    }

    /* cursor easing */
    if (finePointer) {
      cx = lerp(cx, tx, .22); cy = lerp(cy, ty, .22);
      cursor.style.transform = `translate3d(${cx}px,${cy}px,0) translate(-50%,-50%)`;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ============================================================
     CASE STUDY OVERLAY — circular ripple transition
     ============================================================ */
  const csBlue = $('#csBlue'), cs = $('#cs'), csInner = $('#csInner'), csScroll = $('#csScroll');
  const csClose = $('#csClose'), csProg = $('#csProg'), csCount = $('#csCount');
  const lightbox = $('#lightbox');
  let csIndex = -1, csOpen = false, csBusy = false, lastFocus = null;
  const R = () => Math.hypot(innerWidth, innerHeight) * 1.05;

  function docHref(key) { return (window.CONFIG && CONFIG.docs && CONFIG.docs[key]) || ''; }

  function renderSection(s, d) {
    const title = s.title ? `<h2>${esc(s.title)}</h2>` : '';
    const intro = s.intro ? `<p class="intro">${esc(s.intro)}</p>` : '';
    const note = s.note ? `<p class="cs-note">${esc(s.note)}</p>` : '';
    let inner = '';
    switch (s.type) {
      case 'stats':
        inner = `${title}<div class="cs-stats">${s.items.map(i => `<div class="cs-stat"><b>${esc(i.v)}</b><strong>${esc(i.l)}</strong>${i.d ? `<span>${esc(i.d)}</span>` : ''}</div>`).join('')}</div>${note}`; break;
      case 'steps':
        inner = `${title}${intro}<div class="cs-steps">${s.items.map(i => `<div class="cs-step"><div><h3>${esc(i.t)}</h3><p>${esc(i.d)}</p></div></div>`).join('')}</div>`; break;
      case 'compare':
        inner = `${title}<div class="tbl-wrap"><table class="tbl"><thead><tr>${s.head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${s.rows.map(r => `<tr>${r.map((c, k) => `<td class="${k === 2 ? 'to' : ''}">${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`; break;
      case 'table':
        inner = `${title}<div class="tbl-wrap"><table class="tbl"><thead><tr>${s.head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${s.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>${note}`; break;
      case 'cards':
        inner = `${title}<div class="cs-cards">${s.items.map(i => `<div class="cs-card"><h3>${esc(i.t)}</h3><p>${esc(i.d)}</p></div>`).join('')}</div>${note}`; break;
      case 'features':
        inner = `${title}${intro}<div class="cs-feat">${s.items.map((i, k) => `<div class="cs-f"><i>${k + 1}</i><div><h3>${esc(i.t)}</h3><p>${esc(i.d)}</p><div class="out"><b>Expected outcome:</b> ${esc(i.o)}</div></div></div>`).join('')}</div>`; break;
      case 'okr':
        inner = `${title}<div class="cs-okr">${s.objectives.map((o, k) => `<div class="okr-o"><h3><small>Objective ${k + 1}</small>${esc(o.o)}</h3>${o.krs.map(r => `<div class="okr-kr"><b>${esc(r.m)}</b><span class="t">${esc(r.t)}</span><p>${esc(r.d)}</p></div>`).join('')}</div>`).join('')}</div>`; break;
      case 'callout':
        inner = `<div class="cs-callout"><b>${esc(s.title)}</b><p>${esc(s.text)}</p></div>`; break;
      case 'note':
        inner = `<p class="cs-note" style="font-size:.95rem;border-left:3px solid var(--line);padding-left:1rem;margin:0">${esc(s.text)}</p>`; break;
      case 'split':
        inner = `<div class="cs-split">${[s.left, s.right].map(c => `<div class="cs-col"><span class="k">${esc(c.kicker)}</span><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p><div class="mini-stats">${c.stats.map(t => `<div><b>${esc(t.v)}</b><span>${esc(t.l)}</span></div>`).join('')}</div><ul>${c.list.map(l => `<li>${esc(l)}</li>`).join('')}</ul></div>`).join('')}</div>`; break;
      case 'gallery':
        inner = `${title}<div class="cs-gal">${s.items.map(i => `<figure class="${i.wide ? 'wide' : ''}" data-zoom="${esc(i.src)}" data-cursor="Zoom"><div class="shot"><img src="${esc(i.src)}" alt="${esc(i.cap)}" loading="lazy"></div><figcaption>${esc(i.cap)}</figcaption></figure>`).join('')}</div>`; break;
    }
    return `<section class="cs-sec cs-r">${inner}</section>`;
  }

  function renderCase(i) {
    const p = P[i];
    const prev = P[i - 1], nextP = P[i + 1];
    const docs = (p.docs || []).map(d => {
      const href = docHref(d.key);
      return `<a class="btn magnetic" href="${esc(href || '#')}" ${href ? 'target="_blank" rel="noopener"' : 'data-missing="1"'}><span>${esc(d.label)}</span><svg viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9"/></svg></a>`;
    }).join('');
    csInner.innerHTML = `
      <div class="cs-hero">
        <span class="tag cs-rise" style="--d:0">${esc(p.tag)}</span>
        <h1 id="csTitle" class="cs-rise" style="--d:90">${esc(p.title)}</h1>
        <dl class="cs-meta cs-rise" style="--d:180">${p.meta.map(m => `<div><dt>${esc(m[0])}</dt><dd>${esc(m[1])}</dd></div>`).join('')}</dl>
        <p class="cs-problem cs-rise" style="--d:270"><b>Problem</b>${esc(p.problem)}</p>
      </div>
      ${p.sections.map(s => renderSection(s)).join('')}
      ${p.next ? `<section class="cs-sec cs-r cs-next"><div class="cs-callout"><b>If I kept going</b><p>${esc(p.next)}</p></div></section>` : ''}
      ${docs ? `<div class="cs-docs cs-r cs-sec" style="margin-top:40px">${docs}</div>` : ''}
      <nav class="cs-nav" aria-label="Case studies">
        <button ${prev ? '' : 'disabled'} data-go="${i - 1}"><small>← Previous</small><span>${prev ? esc(prev.title) : ''}</span></button>
        <button ${nextP ? '' : 'disabled'} data-go="${i + 1}"><small>Next →</small><span>${nextP ? esc(nextP.title) : ''}</span></button>
      </nav>`;
    csCount.textContent = `${String(i + 1).padStart(2, '0')} / ${String(P.length).padStart(2, '0')}`;
    csScroll.scrollTop = 0;
    csProg.style.transform = 'scaleX(0)';
    observeCs();
  }

  let csIO;
  function observeCs() {
    if (csIO) csIO.disconnect();
    csIO = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); csIO.unobserve(en.target); }
    }), { root: csScroll, threshold: .12, rootMargin: '0px 0px -5% 0px' });
    $$('.cs-r', csInner).forEach(el => csIO.observe(el));
  }

  async function openCase(i, x, y) {
    if (csBusy || csOpen) return;
    csBusy = true; csOpen = true; csIndex = i; lastFocus = document.activeElement;
    cursor.classList.remove('label', 'hover'); cursorLabel.textContent = '';
    renderCase(i);
    body.classList.add('no-scroll');
    cs.setAttribute('aria-hidden', 'false');
    const from = `circle(0px at ${x}px ${y}px)`, to = `circle(${R()}px at ${x}px ${y}px)`;
    if (reduce) {
      csBlue.classList.add('on'); cs.classList.add('on');
      csBlue.style.clipPath = 'none'; cs.style.clipPath = 'none';
    } else {
      csBlue.classList.add('on'); cs.classList.add('on');
      const a = csBlue.animate([{ clipPath: from }, { clipPath: to }], { duration: 850, easing: EASE_IO, fill: 'forwards' });
      const b = cs.animate([{ clipPath: from }, { clipPath: to }], { duration: 900, delay: 200, easing: EASE_IO, fill: 'forwards' });
      await Promise.all([a.finished, b.finished]);
      csBlue.style.clipPath = 'none'; cs.style.clipPath = 'none';
      [a, b].forEach(an => an.cancel());
    }
    csBusy = false;
    csClose.focus({ preventScroll: true });
  }

  async function closeCase() {
    if (csBusy || !csOpen) return;
    csBusy = true;
    cursor.classList.remove('label', 'hover'); cursorLabel.textContent = '';
    const r = csClose.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const full = `circle(${R()}px at ${x}px ${y}px)`, none = `circle(0px at ${x}px ${y}px)`;
    if (!reduce) {
      cs.style.clipPath = full; csBlue.style.clipPath = full;
      const b = cs.animate([{ clipPath: full }, { clipPath: none }], { duration: 750, easing: EASE_IO, fill: 'forwards' });
      const a = csBlue.animate([{ clipPath: full }, { clipPath: none }], { duration: 750, delay: 150, easing: EASE_IO, fill: 'forwards' });
      await Promise.all([a.finished, b.finished]);
      [a, b].forEach(an => an.cancel());
    }
    cs.style.clipPath = ''; csBlue.style.clipPath = '';
    cs.classList.remove('on'); csBlue.classList.remove('on');
    cs.setAttribute('aria-hidden', 'true');
    body.classList.remove('no-scroll');
    csOpen = false; csBusy = false;
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  /** Switch case study inside the overlay with a short blue sweep */
  async function switchCase(i) {
    if (csBusy || i < 0 || i >= P.length) return;
    csBusy = true;
    if (!reduce) {
      const sweep = csBlue;
      sweep.style.clipPath = 'inset(0 0 0 100%)';
      sweep.style.zIndex = '965';
      const a = sweep.animate([{ clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0)' }], { duration: 520, easing: EASE_IO, fill: 'forwards' });
      await a.finished;
      csIndex = i; renderCase(i);
      const b = sweep.animate([{ clipPath: 'inset(0 0 0 0)' }, { clipPath: 'inset(0 100% 0 0)' }], { duration: 560, easing: EASE_IO, fill: 'forwards' });
      await b.finished;
      [a, b].forEach(an => an.cancel());
      sweep.style.clipPath = 'none'; sweep.style.zIndex = '';
    } else { csIndex = i; renderCase(i); }
    csBusy = false;
  }

  cards.forEach(c => {
    const open = e => {
      const r = c.getBoundingClientRect();
      const x = e.clientX || r.left + r.width / 2, y = e.clientY || r.top + r.height / 2;
      openCase(+c.dataset.index, x, y);
    };
    c.addEventListener('click', open);
    c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(e); } });
  });
  csClose.addEventListener('click', closeCase);
  csInner.addEventListener('click', e => {
    const go = e.target.closest('[data-go]');
    if (go) { switchCase(+go.dataset.go); return; }
    const z = e.target.closest('[data-zoom]');
    if (z) { openLightbox(z.dataset.zoom, $('img', z).alt); return; }
    const miss = e.target.closest('[data-missing]');
    if (miss) { e.preventDefault(); toast('This link isn’t set yet — add it in js/data.js (CONFIG.docs).'); }
  });
  csScroll.addEventListener('scroll', () => {
    const m = csScroll.scrollHeight - csScroll.clientHeight;
    csProg.style.transform = `scaleX(${m > 0 ? csScroll.scrollTop / m : 0})`;
  }, { passive: true });

  /* ---------------- Lightbox ---------------- */
  function openLightbox(src, alt) {
    const img = $('img', lightbox);
    img.src = src; img.alt = alt || '';
    lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false');
  }
  function closeLightbox() { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden', 'true'); }
  lightbox.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (lightbox.classList.contains('open')) closeLightbox();
    else if (csOpen) closeCase();
    else if (menu.classList.contains('open')) setMenu(false);
  });

  /* ---------------- Contact buttons ---------------- */
  const li = $('#linkedinBtn'), em = $('#emailBtn');
  const cfg = window.CONFIG || {};
  if (cfg.linkedin) { li.href = cfg.linkedin; li.target = '_blank'; li.rel = 'noopener'; }
  else li.addEventListener('click', e => { e.preventDefault(); toast('LinkedIn link isn’t set yet — add it in js/data.js (CONFIG.linkedin).'); });
  if (cfg.email) em.href = 'mailto:' + cfg.email;
  else em.addEventListener('click', e => { e.preventDefault(); toast('Email isn’t set yet — add it in js/data.js (CONFIG.email).'); });
})();
