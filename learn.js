/*
 * Allez! French – Lessons tab (the A1 course path).
 *
 * Screens: home (course path) · lesson · dialogue · trainer · quiz · result.
 * Plain JS: render() rebuilds #app from `state`; clicks are handled through
 * data-act attributes (event delegation). Progress and XP are saved in
 * localStorage; profiles.js keeps them separate per learner.
 */
(function () {
  'use strict';
  const { LESSONS, DIALOGUES, CAN_DO } = window.A1;
  const app = document.getElementById('app');

  /* ---------------- Course path ---------------- */

  // Recommended order: grammar, with a dialogue or trainer after the lessons it uses.
  const PATH = ['L:etre', 'L:avoir', 'D:meet', 'L:articles', 'L:adjectives', 'L:er', 'T:num', 'L:negation', 'L:questions', 'D:cafe',
    'L:aller', 'D:directions', 'L:countries', 'L:possessives', 'L:cest', 'L:partitive', 'D:bakery', 'L:faire', 'L:time', 'T:time',
    'L:reflexive', 'D:hotel', 'L:future', 'D:invite', 'L:past', 'L:imperative', 'D:doctor', 'L:writing', 'D:sms'];
  const TRAINERS = {
    num: { title: 'Numbers trainer', icon: '🔢', goal: 'Hear and read numbers, prices and years until they are automatic.' },
    time: { title: 'Clock trainer', icon: '🕒', goal: 'Understand the time, the way French people say it.' }
  };
  const byId = (list, id) => list.find((x) => x.id === id);
  const itemOf = (key) => {
    const [t, id] = key.split(':');
    if (t === 'L') return { key, type: 'L', id, title: byId(LESSONS, id).title, tag: 'Grammar', cls: 'g' };
    if (t === 'D') { const d = byId(DIALOGUES, id); return { key, type: 'D', id, title: d.icon + ' ' + d.title, tag: 'Listen', cls: 'd' }; }
    return { key, type: 'T', id, title: TRAINERS[id].icon + ' ' + TRAINERS[id].title, tag: 'Trainer', cls: 't' };
  };

  /* ---------------- Storage ---------------- */

  const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k) || 'null') || d; } catch (e) { return d; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const dayKey = () => { const t = new Date(); return t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0'); };
  let progress = load('allez_learn_v1', { best: {} }); // best[key] = best score in %
  const addXp = (n) => { const o = load('allez_xp_v1', { total: 0, d: {} }); o.d = o.d || {}; o.total = (o.total || 0) + n; const k = dayKey(); o.d[k] = (o.d[k] || 0) + n; save('allez_xp_v1', o); };
  const xpToday = () => (load('allez_xp_v1', { d: {} }).d || {})[dayKey()] || 0;
  // Study time, shared with the Study log on the Words tab.
  let pendingSec = 0, lastAct = Date.now();
  ['pointerdown', 'keydown', 'touchstart'].forEach((e) => document.addEventListener(e, () => { lastAct = Date.now(); }, true));
  setInterval(() => {
    if (document.visibilityState !== 'hidden' && Date.now() - lastAct < 60000 && state.screen !== 'home') pendingSec++;
    if (pendingSec >= 10) flushTime();
  }, 1000);
  function flushTime() {
    if (!pendingSec) return;
    const o = load('allez_time_v1', {}); o.d = o.d || {}; const k = dayKey(); o.d[k] = (o.d[k] || 0) + pendingSec; pendingSec = 0; save('allez_time_v1', o);
  }
  window.addEventListener('pagehide', flushTime);

  /* ---------------- Helpers ---------------- */

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const SPEAKER = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9zM16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>';
  const BACK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';

  /* ---------------- Speech (same approach as the other tabs) ---------------- */

  const canSpeak = () => typeof speechSynthesis !== 'undefined' && typeof SpeechSynthesisUtterance !== 'undefined';
  let voices = []; const KEEP = []; let ttsAudio = null; let speakTok = 0;
  const loadVoices = () => { try { voices = speechSynthesis.getVoices() || []; } catch (e) {} };
  try { loadVoices(); speechSynthesis.addEventListener('voiceschanged', loadVoices); } catch (e) {}
  const frVoices = () => voices.filter((v) => String(v.lang).toLowerCase().replace('_', '-').startsWith('fr'));
  function sayText(text, opts, cb) {
    opts = opts || {};
    let done = false, started = false;
    const fin = () => { if (done) return; done = true; clearTimeout(t1); clearTimeout(t2); if (cb) cb(); };
    const viaAudio = () => {
      if (done) return;
      try { if (ttsAudio) ttsAudio.pause(); const a = new Audio('https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=fr&q=' + encodeURIComponent(text)); ttsAudio = a; a.onended = fin; a.onerror = fin; const p = a.play(); if (p && p.catch) p.catch(fin); } catch (e) { fin(); }
    };
    const t1 = setTimeout(fin, 4000 + text.length * 140);
    let t2 = null;
    if (!canSpeak()) { viaAudio(); return; }
    try {
      const u = new SpeechSynthesisUtterance(text); u.lang = 'fr-FR'; u.rate = opts.rate || 0.9;
      const fv = frVoices();
      // Two speakers in dialogues: a second French voice if there is one, otherwise a higher pitch.
      const v = opts.voice === 'B' && fv.length > 1 ? fv[1] : fv.find((x) => /fr-FR/i.test(x.lang)) || fv[0];
      if (v) u.voice = v;
      if (opts.voice === 'B' && fv.length < 2) u.pitch = 1.25;
      KEEP.push(u); if (KEEP.length > 8) KEEP.shift();
      u.onstart = () => { started = true; }; u.onend = fin; u.onerror = () => { if (!started) viaAudio(); else fin(); };
      if (speechSynthesis.speaking || speechSynthesis.pending) speechSynthesis.cancel();
      try { speechSynthesis.resume(); } catch (e) {}
      speechSynthesis.speak(u);
      t2 = setTimeout(() => { if (!started && !done) { try { speechSynthesis.cancel(); } catch (e) {} viaAudio(); } }, 1800);
    } catch (e) { fin(); }
  }
  const say = (text, opts) => { speakTok++; sayText(text, opts); };
  const stopSpeech = () => { speakTok++; try { if (canSpeak()) speechSynthesis.cancel(); } catch (e) {} try { if (ttsAudio) ttsAudio.pause(); } catch (e) {} };

  /* ---------------- Sound effects ---------------- */

  let AC = null;
  const tone = (seq) => {
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)(); if (AC.state === 'suspended') AC.resume();
      let t = AC.currentTime;
      seq.forEach(([f, d, type]) => { const o = AC.createOscillator(), g = AC.createGain(); o.type = type || 'sine'; o.frequency.value = f; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.2, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + d); o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + d + 0.02); t += d * 0.8; });
    } catch (e) {}
  };
  const SFX = { ok: () => tone([[660, 0.1], [990, 0.16]]), bad: () => tone([[200, 0.22, 'triangle']]), win: () => tone([[523, 0.12], [659, 0.12], [784, 0.12], [1047, 0.32]]) };

  /* ---------------- French numbers and time ---------------- */

  const UNITS = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
  const TENS = { 2: 'vingt', 3: 'trente', 4: 'quarante', 5: 'cinquante', 6: 'soixante' };
  function below100(n) {
    if (n < 20) return UNITS[n];
    if (n < 70) { const t = Math.floor(n / 10), u = n % 10; return TENS[t] + (u === 0 ? '' : u === 1 ? ' et un' : '-' + UNITS[u]); }
    if (n < 80) return n === 71 ? 'soixante et onze' : 'soixante-' + UNITS[n - 60];
    if (n === 80) return 'quatre-vingts';
    return 'quatre-vingt-' + UNITS[n - 80];
  }
  function numFr(n) {
    if (n < 100) return below100(n);
    if (n < 1000) { const h = Math.floor(n / 100), r = n % 100; const hs = h === 1 ? 'cent' : UNITS[h] + ' cent' + (r === 0 ? 's' : ''); return r ? hs + ' ' + below100(r) : hs; }
    const th = Math.floor(n / 1000), r = n % 1000; const ts = th === 1 ? 'mille' : numFr(th) + ' mille';
    return r ? ts + ' ' + numFr(r) : ts;
  }
  const HOURS = ['minuit', 'une heure', 'deux heures', 'trois heures', 'quatre heures', 'cinq heures', 'six heures', 'sept heures', 'huit heures', 'neuf heures', 'dix heures', 'onze heures', 'midi'];
  // Spoken time on a 12-hour clock: h 0–23, m multiple of 5.
  function timeFr(h, m) {
    let hh = h % 12; if (h === 12) hh = 12; if (h === 0) hh = 0;
    let word = (x) => HOURS[x];
    if (m <= 30) {
      const base = word(hh === 0 && h === 12 ? 12 : hh);
      if (m === 0) return base;
      if (m === 15) return base + ' et quart';
      if (m === 30) return base + (hh === 0 || hh === 12 ? ' et demi' : ' et demie');
      return base + ' ' + numFr(m);
    }
    const nh = (h + 1) % 24; let nx = nh % 12; if (nh === 12) nx = 12;
    const base = word(nx);
    return base + (m === 45 ? ' moins le quart' : ' moins ' + numFr(60 - m));
  }
  const clock = (h, m) => (m === 0 && h === 12 ? '12:00 noon' : m === 0 && h === 0 ? '12:00 midnight' : (h % 12 === 0 ? 12 : h % 12) + ':' + String(m).padStart(2, '0') + (h < 12 ? ' am' : ' pm'));

  /* ---------------- Quiz builders ---------------- */

  // Item: { prompt, sub, options[], answer, sayFirst, sayAfter, kind: 'pick'|'num' }
  function lessonQuiz(L) {
    return shuffle(L.q).map(([prompt, answer, wrong, hint]) => {
      // The sentence to read aloud after answering: gap filled, (hints) and "7:15 =" removed.
      const filled = prompt.includes('___') ? prompt.replace('___', answer).replace(/\s*\([^)]*\)/g, '').replace(/^.*=\s*/, '').replace(/\s+([.?!])$/, '$1').trim() : null;
      const frenchSentence = /[.!?,]$/.test(answer) && /^[A-ZÀ-ÖÉ]/.test(answer);
      return { kind: 'pick', prompt, sub: hint || '', options: shuffle([answer].concat(wrong.split('|'))), answer, sayAfter: filled || (frenchSentence ? answer : '') };
    });
  }
  function dialogueQuiz(D) {
    return D.q.map(([q, a, w]) => ({ kind: 'pick', prompt: q, sub: '', options: shuffle([a].concat(w.split('|'))), answer: a, sayAfter: '' }));
  }
  const NUM_RANGES = { a: [0, 20], b: [21, 69], c: [70, 99], d: [100, 2030] };
  function numberQuiz(range) {
    const [lo, hi] = NUM_RANGES[range];
    const pickN = () => (range === 'd' && Math.random() < 0.4 ? rnd(1950, 2030) : rnd(lo, hi));
    const items = [];
    const used = new Set();
    while (items.length < 10) {
      const n = pickN(); if (used.has(n)) continue; used.add(n);
      if (items.length % 2 === 0) {
        items.push({ kind: 'num', prompt: 'Listen and type the number', sub: 'Tap the speaker to hear it again.', answer: String(n), sayFirst: numFr(n), sayAfter: numFr(n), reveal: n + ' = ' + numFr(n) });
      } else {
        // Wrong options are close numbers, the classic traps (70/60, 80/20, 90/10…).
        const near = new Set();
        [n + 1, n - 1, n + 10, n - 10, n + 20, n - 20].filter((x) => x >= lo && x <= hi && x !== n).forEach((x) => near.add(x));
        const wrong = shuffle(Array.from(near)).slice(0, 3);
        while (wrong.length < 3) { const x = rnd(lo, hi); if (x !== n && !wrong.includes(x)) wrong.push(x); }
        items.push({ kind: 'pick', prompt: String(n), sub: 'Which is the French for this number?', options: shuffle([numFr(n)].concat(wrong.map(numFr))), answer: numFr(n), sayAfter: numFr(n) });
      }
    }
    return items;
  }
  function timeQuiz() {
    const items = [];
    for (let i = 0; i < 10; i++) {
      const h = rnd(0, 23), m = rnd(0, 11) * 5;
      const ans = clock(h, m);
      const wrongs = new Set();
      // Traps: the hour before/after (moins!), and :15 / :45 confusion.
      [[h + 1, m], [h - 1, m], [h, (m + 30) % 60], [h, 60 - m === 60 ? 30 : 60 - m]].forEach(([a, b]) => { const c = clock((a + 24) % 24, b); if (c !== ans) wrongs.add(c); });
      while (wrongs.size < 3) { const c = clock(rnd(0, 23), rnd(0, 11) * 5); if (c !== ans) wrongs.add(c); }
      const spoken = 'Il est ' + timeFr(h, m) + '.';
      const listen = i % 2 === 0;
      items.push({ kind: 'pick', prompt: listen ? 'What time is it?' : spoken, sub: listen ? 'Listen. Tap the speaker to hear it again.' : 'Pick the time.', options: shuffle([ans].concat(Array.from(wrongs).slice(0, 3))), answer: ans, sayFirst: listen ? spoken : '', sayAfter: spoken, reveal: spoken });
    }
    return items;
  }

  /* ---------------- State and actions ---------------- */

  const state = { screen: 'home', key: null, showEn: false, hideText: false, playing: -1, range: 'a', quiz: null };

  function open(key) { stopSpeech(); Object.assign(state, { screen: key[0] === 'L' ? 'lesson' : key[0] === 'D' ? 'dialogue' : 'trainer', key, showEn: false, hideText: false, playing: -1 }); render(true); }
  function goHome() { stopSpeech(); flushTime(); Object.assign(state, { screen: 'home', key: null, quiz: null }); render(true); }

  function startQuiz(items) {
    stopSpeech();
    state.quiz = { items, i: 0, right: 0, xp: 0, combo: 0, best: 0, pick: null, typed: '', checked: false, ok: false };
    state.screen = 'quiz'; render(true); autoSay();
  }
  function autoSay() { const it = curItem(); if (it && it.sayFirst) setTimeout(() => say(it.sayFirst, { rate: 0.85 }), 250); }
  const curItem = () => state.quiz && state.quiz.items[state.quiz.i];

  function check() {
    const q = state.quiz, it = curItem(); if (!it || q.checked) return;
    const given = it.kind === 'num' ? q.typed.replace(/\D/g, '') : q.pick;
    if (!given) return;
    q.checked = true; q.ok = given === it.answer;
    if (q.ok) { q.right++; q.combo++; q.best = Math.max(q.best, q.combo); const g = 10 + (q.combo >= 3 ? 5 : 0); q.xp += g; q.gain = g; addXp(g); SFX.ok(); }
    else { q.combo = 0; q.gain = 0; SFX.bad(); }
    if (it.sayAfter) say(it.sayAfter, { rate: 0.9 });
    render();
  }
  function next() {
    const q = state.quiz; q.i++; Object.assign(q, { pick: null, typed: '', checked: false, ok: false });
    if (q.i >= q.items.length) {
      const pct = Math.round((q.right / q.items.length) * 100);
      progress.best[state.key] = Math.max(progress.best[state.key] || 0, pct); save('allez_learn_v1', progress);
      flushTime(); SFX.win(); state.screen = 'result'; render(true); return;
    }
    render(true); autoSay();
  }
  function playDialogue() {
    const D = byId(DIALOGUES, state.key.slice(2));
    if (state.playing >= 0) { stopSpeech(); state.playing = -1; render(); return; }
    const tok = ++speakTok; let k = 0;
    const step = () => {
      if (tok !== speakTok) return;
      if (k >= D.lines.length) { state.playing = -1; render(); return; }
      state.playing = k; render();
      const el = document.getElementById('line-' + k); if (el && el.scrollIntoView) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
      sayText(D.lines[k][1], { voice: D.lines[k][0], rate: 0.88 }, () => { k++; setTimeout(step, 450); });
    };
    try { if (canSpeak()) speechSynthesis.cancel(); } catch (e) {}
    step();
  }
  const nextKey = () => PATH.find((k) => !(progress.best[k] >= 60));

  /* ---------------- Rendering ---------------- */

  function render(scrollTop) {
    const html = state.screen === 'home' ? viewHome() : state.screen === 'lesson' ? viewLesson() : state.screen === 'dialogue' ? viewDialogue()
      : state.screen === 'trainer' ? viewTrainer() : state.screen === 'quiz' ? viewQuiz() : viewResult();
    const sc = app.querySelector('.scroll'); const keep = !scrollTop && sc ? sc.scrollTop : 0;
    app.innerHTML = html;
    const sc2 = app.querySelector('.scroll'); if (sc2) sc2.scrollTop = keep;
    const inp = app.querySelector('.num-in'); if (inp && !state.quiz.checked) inp.focus({ preventScroll: true });
  }

  function viewHome() {
    const done = PATH.filter((k) => progress.best[k] >= 60).length;
    const nk = nextKey();
    const xp = xpToday();
    const steps = PATH.map((k, i) => {
      const it = itemOf(k), best = progress.best[k];
      const cls = best >= 60 ? 'done' : k === nk ? 'next' : '';
      return `<button class="step ${cls}" data-act="open" data-key="${k}">
        <span class="num">${best >= 60 ? '✓' : i + 1}</span>
        <span style="flex:1;min-width:0"><span style="display:block;font-weight:700;font-size:16px;line-height:1.25">${esc(it.title)}</span>
        <span style="display:flex;gap:6px;align-items:center;margin-top:4px"><span class="tag ${it.cls}">${it.tag}</span>${best !== undefined ? `<span class="muted" style="font-size:12px">Best ${best}%</span>` : ''}</span></span>
      </button>`;
    }).join('');
    return `<div class="scroll">
      <div><div class="kicker">The A1 course</div>
      <div class="serif" style="font-size:36px;line-height:1.05;margin-top:6px">Lessons</div>
      <div class="muted" style="font-size:15px;margin-top:8px;line-height:1.4">Grammar explained simply, real conversations to listen to, and trainers for numbers and time. Follow the path from 1 to ${PATH.length}.</div></div>
      <div class="card" style="display:flex;flex-direction:column;gap:10px">
        <div style="display:flex;justify-content:space-between;font-weight:700"><span>Course progress</span><span>${done} / ${PATH.length}</span></div>
        <div class="bar"><div style="width:${Math.round((done / PATH.length) * 100)}%"></div></div>
        <div class="muted" style="font-size:13px">A step counts as done from 60%. XP today: ${xp}. Every right answer here also counts for your streak.</div>
        ${nk ? `<button class="btn" data-act="open" data-key="${nk}">Continue: ${esc(itemOf(nk).title)}</button>` : '<div style="font-weight:700;color:#7FE0A8">Course complete. Bravo ! Keep reviewing words every day.</div>'}
      </div>
      <a href="exam.html" class="card" style="display:flex;align-items:center;gap:12px;text-decoration:none;color:inherit;border:2px solid #FFD58A">
        <span style="font-size:34px">🏁</span><span style="flex:1"><span class="serif" style="display:block;font-size:19px">A1 mock exam</span><span class="muted" style="display:block;font-size:13px;margin-top:2px">Test yourself like the real DELF A1: listening, reading, writing, speaking.</span></span><span style="color:#FFD58A;font-weight:700">Go ›</span></a>
      <div style="display:flex;flex-direction:column;gap:10px">${steps}</div>
      <div class="card"><div class="serif" style="font-size:19px;margin-bottom:6px">What A1 means</div>
        <div class="muted" style="font-size:14px;line-height:1.45;margin-bottom:8px">A1 is the first level of the Common European Framework (CEFR), the scale used by the DELF exam. At the end of A1 you can:</div>
        <ul style="margin:0;padding-left:20px;font-size:14px;line-height:1.5">${CAN_DO.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
        <div class="muted" style="font-size:13px;line-height:1.45;margin-top:10px">To cover A1: do this path, learn the words on the Words tab, build sentences in Sentence Lab, and master the alphabet. Courses usually plan 60 to 100 hours for A1.</div>
      </div>
    </div>`;
  }

  const backBtn = (label) => `<button class="back" data-act="home">${BACK}${esc(label || 'All lessons')}</button>`;

  function viewLesson() {
    const L = byId(LESSONS, state.key.slice(2));
    return `<div class="scroll">
      ${backBtn()}
      <div><span class="tag g">Grammar</span><div class="serif" style="font-size:28px;line-height:1.1;margin-top:8px">${esc(L.title)}</div>
      <div class="muted" style="font-size:15px;margin-top:6px">${esc(L.goal)}</div></div>
      ${L.cards.map(([t, b]) => `<div class="card"><div style="font-weight:700;color:#C6F36B;font-size:16px">${esc(t)}</div><div style="font-size:15px;line-height:1.5;margin-top:4px;color:#DDE3EE">${esc(b)}</div></div>`).join('')}
      <div><div style="font-size:13px;font-weight:700;color:#A9B4C6;margin-bottom:6px">Examples: tap to hear</div>
      <div class="card" style="padding:4px">${L.ex.map(([fr, en], i) => `<div class="ex"><div style="flex:1"><div class="fr">${esc(fr)}</div><div class="en">${esc(en)}</div></div><button class="icon-btn" data-act="say" data-i="${i}" aria-label="Hear: ${esc(fr)}">${SPEAKER}</button></div>`).join('')}</div></div>
      <button class="btn" data-act="quizLesson">Practice: ${L.q.length} questions</button>
    </div>`;
  }

  function viewDialogue() {
    const D = byId(DIALOGUES, state.key.slice(2));
    const bubbles = D.lines.map(([who, fr, en], i) => `<button id="line-${i}" class="bubble ${who} ${state.playing === i ? 'hot' : ''}" data-act="sayLine" data-i="${i}">
        <div class="${state.hideText ? 'blur' : ''}">${esc(fr)}</div>${state.showEn ? `<div class="en">${esc(en)}</div>` : ''}</button>`).join('');
    return `<div class="scroll">
      ${backBtn()}
      <div><span class="tag d">Listen and read</span><div class="serif" style="font-size:28px;line-height:1.1;margin-top:8px">${esc(D.icon + ' ' + D.title)}</div>
      <div class="muted" style="font-size:14px;margin-top:6px;line-height:1.4">Best way: hide the text and listen first. Then read it, then answer the questions. Tap a line to hear it alone.</div></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="chip ${state.playing >= 0 ? 'on' : ''}" data-act="play">${state.playing >= 0 ? '■ Stop' : '▶ Play all'}</button>
        <button class="chip ${state.hideText ? 'on' : ''}" data-act="hideText">Hide text</button>
        <button class="chip ${state.showEn ? 'on' : ''}" data-act="showEn">English</button>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">${bubbles}</div>
      <button class="btn" data-act="quizDialogue">Answer ${D.q.length} questions</button>
    </div>`;
  }

  function viewTrainer() {
    const id = state.key.slice(2), T = TRAINERS[id];
    let body = '';
    if (id === 'num') {
      const R = [['a', '0–20'], ['b', '21–69'], ['c', '70–99'], ['d', '100+ and years']];
      body = `<div class="card"><div style="font-weight:700;color:#C6F36B">How French numbers work</div><div style="font-size:15px;line-height:1.5;margin-top:4px;color:#DDE3EE">
        0–16 are single words, 17–19 are “ten-seven, ten-eight, ten-nine”. 21, 31… use “et un”: vingt et un. 70 = soixante-dix (60 + 10), 71 = soixante et onze, 80 = quatre-vingts (4 × 20), 90 = quatre-vingt-dix (4 × 20 + 10). 100 = cent, 200 = deux cents, 1000 = mille. Years: 2025 = deux mille vingt-cinq.</div></div>
        <div style="font-size:13px;font-weight:700;color:#A9B4C6">Choose a range</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">${R.map(([k, l]) => `<button class="chip ${state.range === k ? 'on' : ''}" data-act="range" data-r="${k}">${l}</button>`).join('')}</div>
        <div class="card" style="padding:4px">${[7, 16, 21, 70, 71, 80, 91, 100, 1999].map((n) => `<div class="ex"><div style="flex:1"><div class="fr">${n}</div><div class="en">${numFr(n)}</div></div><button class="icon-btn" data-act="sayNum" data-n="${n}" aria-label="Hear ${n}">${SPEAKER}</button></div>`).join('')}</div>
        <button class="btn" data-act="quizNum">Start: 10 numbers</button>`;
    } else {
      body = `<div class="card"><div style="font-weight:700;color:#C6F36B">How French people say the time</div><div style="font-size:15px;line-height:1.5;margin-top:4px;color:#DDE3EE">
        Il est + hour + heure(s). Then: et quart (:15), et demie (:30), moins le quart (:45 → next hour), moins dix (:50 → next hour). midi = noon, minuit = midnight. Timetables use 24 h: dix-huit heures trente = 18:30.</div></div>
        <div class="card" style="padding:4px">${[[8, 0], [9, 15], [10, 30], [11, 45], [12, 0], [15, 50], [0, 0]].map(([h, m]) => `<div class="ex"><div style="flex:1"><div class="fr">${clock(h, m)}</div><div class="en">Il est ${timeFr(h, m)}.</div></div><button class="icon-btn" data-act="sayTime" data-h="${h}" data-m="${m}" aria-label="Hear ${clock(h, m)}">${SPEAKER}</button></div>`).join('')}</div>
        <button class="btn" data-act="quizTime">Start: 10 times</button>`;
    }
    return `<div class="scroll">${backBtn()}
      <div><span class="tag t">Trainer</span><div class="serif" style="font-size:28px;line-height:1.1;margin-top:8px">${esc(T.icon + ' ' + T.title)}</div>
      <div class="muted" style="font-size:15px;margin-top:6px">${esc(T.goal)}</div></div>${body}</div>`;
  }

  function promptHtml(p) {
    // Show "___" as a styled blank.
    return esc(p).replace('___', '<span class="gap">&nbsp;?&nbsp;</span>');
  }

  function viewQuiz() {
    const q = state.quiz, it = curItem(), n = q.items.length;
    const pct = Math.round(((q.i + (q.checked ? 1 : 0)) / n) * 100);
    const showSpeaker = !!it.sayFirst;
    const isDialogue = state.key[0] === 'D';
    let answerUi;
    if (it.kind === 'num') {
      answerUi = `<input class="num-in" inputmode="numeric" autocomplete="off" aria-label="Type the number" value="${esc(q.typed)}" data-input="typed" ${q.checked ? 'disabled' : ''} placeholder="e.g. 75">`;
    } else {
      answerUi = it.options.map((o, i) => {
        let cls = '';
        if (q.checked) cls = o === it.answer ? 'right' : o === q.pick ? 'wrong' : '';
        else if (o === q.pick) cls = 'sel';
        return `<button class="opt ${cls}" data-act="pick" data-i="${i}"><span style="width:28px;height:28px;border-radius:8px;border:1.5px solid #3A4F70;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex:none">${'ABCD'[i]}</span><span style="flex:1">${esc(o)}</span></button>`;
      }).join('');
    }
    const canCheck = it.kind === 'num' ? q.typed.replace(/\D/g, '').length > 0 : q.pick !== null;
    const fb = q.checked
      ? `<div class="fb ${q.ok ? 'ok' : 'no'}"><div class="serif" style="font-size:20px">${q.ok ? 'Bien joué ! +' + q.gain + ' XP' + (q.combo >= 3 ? ' 🔥' : '') : 'Not quite.'}</div>
         <div style="font-size:15px">${q.ok ? esc(it.reveal || it.sayAfter || '') : 'Answer: ' + esc(it.kind === 'num' ? it.reveal : it.answer) + (it.sayAfter && it.kind !== 'num' && it.sayAfter !== it.answer ? ' · ' + esc(it.sayAfter) : '')}</div>
         <button class="btn" data-act="next" style="${q.ok ? '' : 'background:#F28B82;box-shadow:0 4px 0 #B3261E'}">Continue</button></div>`
      : `<div class="fb"><button class="btn" data-act="check" ${canCheck ? '' : 'disabled'}>Check</button></div>`;
    return `<div class="top"><button class="icon-btn" data-act="quit" aria-label="Quit"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F3F1EA" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
        <div class="bar" style="flex:1;height:12px"><div style="width:${pct}%"></div></div><div style="font-weight:700;font-size:14px;min-width:46px;text-align:right">${Math.min(q.i + 1, n)}/${n}</div></div>
      <div class="scroll" style="padding-top:8px">
        <div style="display:flex;align-items:center;gap:8px;min-height:26px">${isDialogue ? `<button class="chip" data-act="play">${state.playing >= 0 ? '■ Stop' : '▶ Hear the dialogue again'}</button>` : ''}${q.combo >= 2 ? `<span class="combo" style="margin-left:auto">🔥 ${q.combo} in a row</span>` : ''}</div>
        <div style="display:flex;align-items:center;gap:10px">
          <div style="flex:1"><div class="serif" style="font-size:${it.prompt.length > 40 ? 22 : 28}px;line-height:1.2">${promptHtml(it.prompt)}</div>
          ${it.sub ? `<div class="muted" style="font-size:14px;margin-top:6px">${esc(it.sub)}</div>` : ''}</div>
          ${showSpeaker ? `<button class="icon-btn" data-act="replay" aria-label="Hear it again" style="width:56px;height:56px;border:2px solid #C6F36B;color:#C6F36B;border-radius:16px">${SPEAKER}</button>` : ''}
        </div>
        <div style="display:flex;flex-direction:column;gap:10px">${answerUi}</div>
      </div>${fb}`;
  }

  function viewResult() {
    const q = state.quiz, n = q.items.length, pct = Math.round((q.right / n) * 100);
    const nk = nextKey();
    const good = pct >= 60;
    const bits = good ? Array.from({ length: 22 }, (_, i) => `<span style="left:${(i * 37) % 96}%;font-size:${18 + (i % 4) * 6}px;animation-duration:${(2.4 + (i % 5) * 0.45).toFixed(2)}s;animation-delay:${((i * 0.17) % 1.6).toFixed(2)}s">${['🎉', '⭐', '🥐', '🇫🇷', '✨', '🔥'][i % 6]}</span>`).join('') : '';
    return `${good ? `<div class="confetti" aria-hidden="true">${bits}</div>` : ''}<div class="scroll" style="padding-top:72px">
      <div style="font-size:56px;line-height:1">${good ? '🎉' : '💪'}</div>
      <div class="kicker">${good ? 'Step complete!' : 'Almost there'}</div>
      <div class="serif" style="font-size:44px;line-height:1.05">${q.right} / ${n}</div>
      <div class="muted" style="font-size:16px">${pct}% correct. ${good ? 'This step is marked done.' : 'Get 60% to complete this step. Read the explanation again and retry.'}</div>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px">
        <div class="card"><div style="font-size:12px;font-weight:700;color:#C6F36B">XP earned</div><div class="serif" style="font-size:26px">+${q.xp}</div></div>
        <div class="card"><div style="font-size:12px;font-weight:700;color:#A9B4C6">Best combo</div><div class="serif" style="font-size:26px">${q.best}</div></div>
      </div>
      ${nk && good ? `<button class="btn" data-act="open" data-key="${nk}">Next: ${esc(itemOf(nk).title)}</button>` : ''}
      <button class="btn ghost" data-act="retry">Try again</button>
      <button class="btn ghost" data-act="home">All lessons</button>
    </div>`;
  }

  /* ---------------- Events ---------------- */

  app.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const act = b.dataset.act;
    const key = state.key;
    switch (act) {
      case 'open': open(b.dataset.key); break;
      case 'home': goHome(); break;
      case 'say': say(byId(LESSONS, key.slice(2)).ex[+b.dataset.i][0]); break;
      case 'sayLine': { const D = byId(DIALOGUES, key.slice(2)); const l = D.lines[+b.dataset.i]; say(l[1], { voice: l[0] }); break; }
      case 'sayNum': say(numFr(+b.dataset.n)); break;
      case 'sayTime': say('Il est ' + timeFr(+b.dataset.h, +b.dataset.m) + '.'); break;
      case 'play': playDialogue(); break;
      case 'hideText': state.hideText = !state.hideText; render(); break;
      case 'showEn': state.showEn = !state.showEn; render(); break;
      case 'range': state.range = b.dataset.r; render(); break;
      case 'quizLesson': startQuiz(lessonQuiz(byId(LESSONS, key.slice(2)))); break;
      case 'quizDialogue': state.playing = -1; startQuiz(dialogueQuiz(byId(DIALOGUES, key.slice(2)))); break;
      case 'quizNum': startQuiz(numberQuiz(state.range)); break;
      case 'quizTime': startQuiz(timeQuiz()); break;
      case 'pick': if (!state.quiz.checked) { state.quiz.pick = curItem().options[+b.dataset.i]; render(); } break;
      case 'replay': { const it = curItem(); if (it.sayFirst) say(it.sayFirst, { rate: 0.8 }); break; }
      case 'check': check(); break;
      case 'next': next(); break;
      case 'quit': stopSpeech(); open(key); break;
      case 'retry': if (key[0] === 'L') startQuiz(lessonQuiz(byId(LESSONS, key.slice(2)))); else if (key[0] === 'D') startQuiz(dialogueQuiz(byId(DIALOGUES, key.slice(2)))); else startQuiz(key === 'T:num' ? numberQuiz(state.range) : timeQuiz()); break;
    }
  });
  app.addEventListener('input', (e) => {
    if (e.target.dataset.input === 'typed') {
      state.quiz.typed = e.target.value;
      // Update only the Check button, so typing isn't interrupted by a re-render.
      const btn = app.querySelector('[data-act="check"]'); if (btn) btn.disabled = !e.target.value.replace(/\D/g, '');
    }
  });
  app.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' || state.screen !== 'quiz') return;
    e.preventDefault();
    if (state.quiz.checked) next(); else check();
  });

  render(true);
})();
