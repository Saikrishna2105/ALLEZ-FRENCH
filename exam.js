/*
 * Allez! French – A1 mock exam (DELF A1 format).
 *
 * Parts, in exam order, each out of 25:
 *   1. Listening  (20 min) – 4 recordings, each can be played twice.
 *   2. Reading    (30 min) – 4 documents.
 *   3. Writing    (30 min) – a form (auto-checked) and a postcard
 *                            (partly auto-checked, partly self-assessed).
 *   4. Speaking   – 3 parts as in the DELF, self-assessed with the official grid.
 * Pass: 50/100 or more and at least 5/25 in every part.
 *
 * Like learn.js: render() rebuilds #app from `st`; clicks use data-act.
 * Typing never triggers a re-render, so the keyboard stays open.
 */
(function () {
  'use strict';
  const X = window.A1_EXAM;
  const app = document.getElementById('app');
  const PARTS = [
    { id: 'listen', title: 'Listening', fr: 'Compréhension de l’oral', min: 20, icon: '🎧' },
    { id: 'read', title: 'Reading', fr: 'Compréhension des écrits', min: 30, icon: '📄' },
    { id: 'write', title: 'Writing', fr: 'Production écrite', min: 30, icon: '✍️' },
    { id: 'speak', title: 'Speaking', fr: 'Production orale', min: 0, icon: '🗣️' }
  ];

  /* ---------------- Helpers and storage ---------------- */

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k) || 'null') || d; } catch (e) { return d; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const dayKey = () => { const t = new Date(); return t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0'); };
  const addXp = (n) => { const o = load('allez_xp_v1', { total: 0, d: {} }); o.d = o.d || {}; o.total = (o.total || 0) + n; const k = dayKey(); o.d[k] = (o.d[k] || 0) + n; save('allez_xp_v1', o); };
  const addTime = (sec) => { const o = load('allez_time_v1', {}); o.d = o.d || {}; const k = dayKey(); o.d[k] = (o.d[k] || 0) + sec; save('allez_time_v1', o); };
  const fmtMin = (sec) => Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0');
  const BACK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
  const SPEAKER = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9zM16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>';

  /* ---------------- Speech ---------------- */

  const canSpeak = () => typeof speechSynthesis !== 'undefined' && typeof SpeechSynthesisUtterance !== 'undefined';
  let voices = []; const KEEP = []; let ttsAudio = null; let tok = 0;
  const loadVoices = () => { try { voices = speechSynthesis.getVoices() || []; } catch (e) {} };
  try { loadVoices(); speechSynthesis.addEventListener('voiceschanged', loadVoices); } catch (e) {}
  function sayText(text, who, cb) {
    let done = false, started = false, t2 = null;
    const fin = () => { if (done) return; done = true; clearTimeout(t1); clearTimeout(t2); if (cb) cb(); };
    const viaAudio = () => { if (done) return; try { const a = new Audio('https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=fr&q=' + encodeURIComponent(text.slice(0, 190))); ttsAudio = a; a.onended = fin; a.onerror = fin; const p = a.play(); if (p && p.catch) p.catch(fin); } catch (e) { fin(); } };
    const t1 = setTimeout(fin, 5000 + text.length * 120);
    if (!canSpeak()) { viaAudio(); return; }
    try {
      const fr = voices.filter((v) => String(v.lang).toLowerCase().replace('_', '-').startsWith('fr'));
      const u = new SpeechSynthesisUtterance(text); u.lang = 'fr-FR'; u.rate = 0.88;
      const v = who === 'B' && fr.length > 1 ? fr[1] : fr.find((x) => /fr-FR/i.test(x.lang)) || fr[0]; if (v) u.voice = v;
      if (who === 'B' && fr.length < 2) u.pitch = 1.25;
      KEEP.push(u); if (KEEP.length > 8) KEEP.shift();
      u.onstart = () => { started = true; }; u.onend = fin; u.onerror = () => { if (!started) viaAudio(); else fin(); };
      if (speechSynthesis.speaking || speechSynthesis.pending) speechSynthesis.cancel();
      try { speechSynthesis.resume(); } catch (e) {}
      speechSynthesis.speak(u);
      t2 = setTimeout(() => { if (!started && !done) { try { speechSynthesis.cancel(); } catch (e) {} viaAudio(); } }, 1800);
    } catch (e) { fin(); }
  }
  const stopSpeech = () => { tok++; try { if (canSpeak()) speechSynthesis.cancel(); } catch (e) {} try { if (ttsAudio) ttsAudio.pause(); } catch (e) {} };
  // Play several lines one after the other (dialogues), then call done().
  function playLines(lines, done) {
    const my = ++tok; let k = 0;
    const step = () => { if (my !== tok) return; if (k >= lines.length) { if (done) done(); return; } sayText(lines[k][1], lines[k][0], () => { k++; setTimeout(step, 500); }); };
    try { if (canSpeak()) speechSynthesis.cancel(); } catch (e) {}
    step();
  }
  const SRC = window.SpeechRecognition || window.webkitSpeechRecognition;

  /* ---------------- Exam state ---------------- */

  let st = null;          // the running exam
  let screen = 'intro';   // intro · part · results
  let timerIv = null;
  const history = load('allez_exam_v1', { attempts: [] });

  // Turn data questions into exam questions with options shuffled once.
  const mkQs = (docs) => docs.map((d) => d.q.map(([q, a, w, pts]) => ({ q, a, pts, opts: shuffle([a].concat(w.split('|'))), pick: null })));

  function startExam() {
    st = {
      part: 0, left: PARTS[0].min * 60, started: Date.now(),
      listen: mkQs(X.LISTENING), plays: X.LISTENING.map(() => 0), playing: -1,
      read: mkQs(X.READING),
      form: {}, msg: '', selfW: X.WRITING.message.selfCheck.map(() => false), showModel: false,
      grid: X.SPEAKING.grid.map(() => -1), heard: {}, listeningMic: null, showPhrases: false, cardShown: {},
      scores: [0, 0, 0, 0]
    };
    screen = 'part'; startTimer(); render(true);
  }

  function startTimer() {
    clearInterval(timerIv);
    if (!PARTS[st.part].min) return;
    timerIv = setInterval(() => {
      st.left = Math.max(0, st.left - 1);
      const el = document.getElementById('timer');
      if (el) { el.textContent = '⏱ ' + fmtMin(st.left); el.classList.toggle('low', st.left <= 120); }
      if (st.left === 0) { clearInterval(timerIv); alert('Time is up for this part. Moving on.'); finishPart(); }
    }, 1000);
  }

  /* ---------------- Scoring ---------------- */

  const mcScore = (groups) => groups.flat().reduce((s, x) => s + (x.pick === x.a ? x.pts : 0), 0);

  const DAYS = /(lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche|week-end|weekend)/i;
  const MONTHS = /(janvier|février|fevrier|mars|avril|mai|juin|juillet|août|aout|septembre|octobre|novembre|décembre|decembre)/i;
  // One point per form box with a sensible answer of the right kind.
  function formPoint(type, v) {
    v = (v || '').trim(); const letters = (v.match(/\p{L}/gu) || []).length;
    switch (type) {
      case 'name': return letters >= 2;
      case 'nationality': return letters >= 4 && !/\d/.test(v);
      // 12/03/1998, 12.03.98 or 12 mars 1998
      case 'date': return /\b\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{2,4}\b/.test(v) || (MONTHS.test(v) && /\d{4}/.test(v));
      case 'address': return /\d/.test(v) && letters >= 4;
      case 'word': return letters >= 3;
      case 'sentence': return v.split(/\s+/).filter((w) => /\p{L}/u.test(w)).length >= 3;
      case 'days': return DAYS.test(v);
    }
    return false;
  }
  const words = (t) => t.split(/\s+/).filter((w) => /\p{L}/u.test(w));
  // Postcard: 9 points checked automatically + 6 points self-assessed.
  function messageChecks(t) {
    const n = words(t).length;
    return [
      ['Length: 40 words or more (' + n + ' written)', n >= 40 ? 3 : n >= 30 ? 2 : n >= 20 ? 1 : 0, 3],
      ['Greeting (Salut, Cher…, Coucou…)', /^\s*(salut|bonjour|coucou|cher|chère|hello)/i.test(t) ? 1 : 0, 1],
      ['Goodbye (Bisous, À bientôt…)', /(bisous|bises|à bientôt|a bientot|amitiés|je t[’']embrasse|à plus|grosses bises)/i.test(t) ? 1 : 0, 1],
      ['Where you are', /\b(à|en|au|aux)\s+\p{Lu}|plage|montagne|mer|campagne|hôtel|camping/u.test(t) ? 1 : 0, 1],
      ['Who you are with', /\bavec\b/i.test(t) ? 1 : 0, 1],
      ['The weather', /(il fait|soleil|il pleut|pluie|chaud|froid|beau temps|neige|du vent|nuage)/i.test(t) ? 1 : 0, 1],
      ['What you do (at least 3 verbs with je / nous / on)', (t.match(/\b(je|j[’']|nous|on)\s*\p{L}+/giu) || []).length >= 3 ? 1 : 0, 1]
    ];
  }
  function writingScore() {
    const f = X.WRITING.form.fields.reduce((s, [k, , type]) => s + (formPoint(type, st.form[k]) ? 1 : 0), 0);
    const auto = messageChecks(st.msg).reduce((s, c) => s + c[1], 0);
    const self = X.WRITING.message.selfCheck.reduce((s, [, p], i) => s + (st.selfW[i] ? p : 0), 0);
    return { form: f, auto, self, total: f + auto + self };
  }
  // Speaking grid: Not yet = 0 · Partly = half · Yes = full.
  const speakScore = () => X.SPEAKING.grid.reduce((s, [, p], i) => s + (st.grid[i] === 2 ? p : st.grid[i] === 1 ? p / 2 : 0), 0);

  function finishPart() {
    clearInterval(timerIv); stopSpeech(); stopMic();
    const p = st.part;
    if (p === 0) st.scores[0] = mcScore(st.listen);
    if (p === 1) st.scores[1] = mcScore(st.read);
    if (p === 2) st.scores[2] = writingScore().total;
    if (p === 3) st.scores[3] = speakScore();
    if (p < 3) { st.part++; st.left = PARTS[st.part].min * 60; startTimer(); render(true); return; }
    // Done: save the attempt.
    const total = st.scores.reduce((a, b) => a + b, 0);
    const passed = total >= 50 && st.scores.every((s) => s >= 5);
    history.attempts.unshift({ date: dayKey(), scores: st.scores, total, passed });
    history.attempts = history.attempts.slice(0, 20);
    save('allez_exam_v1', history);
    addXp(Math.round(total / 2));
    addTime(Math.min(Math.round((Date.now() - st.started) / 1000), 3 * 3600));
    screen = 'results'; render(true);
  }

  /* ---------------- Microphone (speaking practice) ---------------- */

  let rec = null;
  function stopMic() { try { if (rec) rec.abort(); } catch (e) {} rec = null; if (st) st.listeningMic = null; }
  function toggleMic(key) {
    if (!SRC) return;
    if (st.listeningMic === key) { stopMic(); render(); return; }
    stopMic(); stopSpeech();
    try {
      rec = new SRC(); rec.lang = 'fr-FR'; rec.interimResults = false; rec.maxAlternatives = 1;
      rec.onresult = (e) => { st.heard[key] = e.results[0][0].transcript; render(); };
      rec.onerror = (e) => { st.heard[key] = e.error === 'not-allowed' ? '(The microphone is blocked. Just answer out loud.)' : '(I did not catch that. Try again.)'; st.listeningMic = null; render(); };
      rec.onend = () => { st.listeningMic = null; render(); };
      st.listeningMic = key; rec.start(); render();
    } catch (e) { st.listeningMic = null; }
  }

  /* ---------------- Views ---------------- */

  function render(top) {
    const sc = app.querySelector('.scroll'); const keep = !top && sc ? sc.scrollTop : 0;
    app.innerHTML = screen === 'intro' ? viewIntro() : screen === 'part' ? viewPart() : viewResults();
    const sc2 = app.querySelector('.scroll'); if (sc2) sc2.scrollTop = keep;
  }

  function viewIntro() {
    const last = history.attempts.slice(0, 5);
    return `<div class="scroll">
      <a class="back" href="learn.html">${BACK}Lessons</a>
      <div><div class="kicker">Practice exam</div>
      <div class="serif" style="font-size:36px;line-height:1.05;margin-top:6px">A1 mock exam</div>
      <div class="muted" style="font-size:15px;margin-top:8px;line-height:1.45">Built like the real DELF A1: four parts, each out of 25. Do it in one go, like on exam day, in a quiet place with headphones.</div></div>
      <div class="card">${PARTS.map((p, i) => `<div class="score-row"><span>${p.icon} ${i + 1}. ${p.title} <span class="muted" style="font-weight:500;font-size:13px">· ${p.fr}</span></span><span class="muted" style="font-size:13px">${p.min ? p.min + ' min' : '5–7 min'}</span></div>`).join('')}
        <div class="muted" style="font-size:13px;line-height:1.45;margin-top:10px">To pass the DELF you need <b style="color:#F3F1EA">50/100</b> or more <b style="color:#F3F1EA">and at least 5/25 in each part</b>. Below 5 in one part fails the exam, whatever the total.</div></div>
      <div class="card"><div style="font-weight:700;color:#C6F36B">How it is marked here</div>
        <div style="font-size:14px;line-height:1.5;margin-top:4px;color:#DDE3EE">Listening and reading are marked automatically. Writing: the form and part of the postcard are checked automatically, then you tick a short checklist. Speaking can’t be marked by an app, so you score yourself with the official grid. Each recording plays at most twice, as in the exam.</div></div>
      ${last.length ? `<div class="card"><div style="font-weight:700;margin-bottom:4px">Your last attempts</div>${last.map((a) => `<div class="score-row"><span>${a.date}</span><span>${a.total.toFixed(1).replace('.0', '')}/100 · ${a.passed ? '<span style="color:#7FE0A8">Pass</span>' : '<span style="color:#F28B82">Not yet</span>'}</span></div>`).join('')}</div>` : ''}
      <button class="btn" data-act="start">Start the exam</button>
    </div>`;
  }

  function header() {
    const P = PARTS[st.part];
    return `<div class="top" style="padding-bottom:4px">
      <button class="icon-btn" data-act="quit" aria-label="Leave the exam"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F3F1EA" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      <div style="font-weight:700">${P.icon} Part ${st.part + 1}/4 · ${P.title}</div>
      ${P.min ? `<div id="timer" class="timer ${st.left <= 120 ? 'low' : ''}">⏱ ${fmtMin(st.left)}</div>` : ''}
    </div>`;
  }

  const qBlock = (part, di, qs) => qs.map((x, qi) => `<div class="qrow"><div style="font-weight:700;font-size:16px">${esc(x.q)} <span class="muted" style="font-weight:500;font-size:12px">(${x.pts} pt${x.pts > 1 ? 's' : ''})</span></div>
      ${x.opts.map((o, oi) => `<button class="opt ${x.pick === o ? 'sel' : ''}" data-act="pick" data-part="${part}" data-d="${di}" data-q="${qi}" data-o="${oi}"><span style="flex:1">${esc(o)}</span></button>`).join('')}</div>`).join('');

  function viewPart() {
    const p = PARTS[st.part].id;
    let body = '';
    if (p === 'listen') {
      body = `<div class="muted" style="font-size:14px;line-height:1.45">Read the questions, then play the recording. You can play each one <b style="color:#F3F1EA">twice</b>, like in the exam. There is no text: only your ears.</div>` +
        X.LISTENING.map((d, di) => {
          const left = 2 - st.plays[di];
          return `<div class="card" style="display:flex;flex-direction:column;gap:12px"><div style="font-weight:700;color:#C6F36B">${esc(d.title)}</div><div class="muted" style="font-size:14px">${esc(d.intro)}</div>
            <button class="chip ${st.playing === di ? 'on' : ''}" data-act="playDoc" data-d="${di}" ${left <= 0 && st.playing !== di ? 'disabled style="opacity:.45"' : ''}>${st.playing === di ? '🔊 Playing…' : left > 0 ? '▶ Play (' + left + ' left)' : 'No plays left'}</button>
            ${qBlock('listen', di, st.listen[di])}</div>`;
        }).join('');
    } else if (p === 'read') {
      body = `<div class="muted" style="font-size:14px">Read each document and answer the questions.</div>` +
        X.READING.map((d, di) => `<div class="card" style="display:flex;flex-direction:column;gap:12px"><div style="font-weight:700;color:#C6F36B">${esc(d.title)}</div>
          <div class="doc ${d.kind}">${esc(d.text)}</div>${qBlock('read', di, st.read[di])}</div>`).join('');
    } else if (p === 'write') {
      const W = X.WRITING;
      body = `<div class="card" style="display:flex;flex-direction:column;gap:10px"><div style="font-weight:700;color:#C6F36B">Exercise 1 · The form</div><div class="muted" style="font-size:14px">${esc(W.form.intro)}</div>
          ${W.form.fields.map(([k, l]) => `<div class="field"><label for="f-${k}">${esc(l)}</label><input id="f-${k}" data-form="${k}" value="${esc(st.form[k] || '')}" autocomplete="off"></div>`).join('')}</div>
        <div class="card" style="display:flex;flex-direction:column;gap:10px"><div style="font-weight:700;color:#C6F36B">Exercise 2 · The postcard</div><div class="muted" style="font-size:14px;line-height:1.45">${esc(W.message.intro)}</div>
          <textarea data-msg="1" aria-label="Your postcard" placeholder="Salut … !">${esc(st.msg)}</textarea>
          <div class="muted" id="wc" style="font-size:13px">${words(st.msg).length} words</div>
          <div style="font-weight:700;font-size:14px;margin-top:4px">When you are done, check your own text honestly:</div>
          ${W.message.selfCheck.map(([t, pts], i) => `<button class="opt ${st.selfW[i] ? 'sel' : ''}" data-act="selfW" data-i="${i}" style="min-height:48px;font-size:15px"><span style="font-size:20px">${st.selfW[i] ? '☑' : '☐'}</span><span style="flex:1">${esc(t)} <span class="muted">(${pts} pts)</span></span></button>`).join('')}</div>`;
    } else {
      const S = X.SPEAKING;
      const mic = (key) => SRC ? `<button class="chip ${st.listeningMic === key ? 'on' : ''}" data-act="mic" data-k="${key}">${st.listeningMic === key ? '● Listening… tap to stop' : '🎤 Answer'}</button>` : '';
      const heard = (key) => st.heard[key] ? `<div class="muted" style="font-size:14px">I heard: “${esc(st.heard[key])}”</div>` : '';
      body = `<div class="muted" style="font-size:14px;line-height:1.45">${esc(S.prep)}</div>
        <div class="card" style="display:flex;flex-direction:column;gap:12px"><div style="font-weight:700;color:#C6F36B">Part 1 · Guided interview (about 1 min)</div><div class="muted" style="font-size:14px">The examiner asks about you. Listen and answer in full sentences.</div>
          ${S.interview.map((q, i) => `<div style="display:flex;flex-direction:column;gap:6px;border-top:1px solid #22344F;padding-top:10px"><div style="display:flex;align-items:center;gap:8px"><button class="icon-btn" data-act="sayQ" data-i="${i}" aria-label="Hear the question" style="color:#C6F36B">${SPEAKER}</button><span style="flex:1;font-weight:700">${esc(q)}</span></div><div style="display:flex;gap:8px">${mic('i' + i)}</div>${heard('i' + i)}</div>`).join('')}</div>
        <div class="card" style="display:flex;flex-direction:column;gap:12px"><div style="font-weight:700;color:#C6F36B">Part 2 · Asking questions (about 2 min)</div><div class="muted" style="font-size:14px">For each card, ask the examiner a question using the word. Then tap to see an example.</div>
          <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px">${S.cards.map(([w, ex], i) => `<button class="opt" data-act="card" data-i="${i}" style="flex-direction:column;align-items:flex-start;gap:4px;min-height:72px"><span class="serif" style="font-size:19px">${esc(w)}</span>${st.cardShown[i] ? `<span class="muted" style="font-size:13px">${esc(ex)}</span>` : '<span class="muted" style="font-size:12px">Tap for an example</span>'}</button>`).join('')}</div>
          <div style="display:flex;gap:8px">${mic('cards')}</div>${heard('cards')}</div>
        <div class="card" style="display:flex;flex-direction:column;gap:12px"><div style="font-weight:700;color:#C6F36B">Part 3 · Role play (about 2 min)</div><div style="font-size:15px;line-height:1.45">${esc(S.roleplay.task)}</div>
          <div class="muted" style="font-size:14px">Play both roles out loud, or ask a friend to be the shop assistant.</div>
          <button class="chip ${st.showPhrases ? 'on' : ''}" data-act="phrases" style="align-self:flex-start">${st.showPhrases ? 'Hide useful phrases' : 'Show useful phrases'}</button>
          ${st.showPhrases ? S.roleplay.phrases.map((ph, i) => `<div class="ex"><div class="fr" style="flex:1">${esc(ph)}</div><button class="icon-btn" data-act="sayP" data-i="${i}" aria-label="Hear it">${SPEAKER}</button></div>`).join('') : ''}</div>
        <div class="card" style="display:flex;flex-direction:column;gap:12px"><div style="font-weight:700;color:#C6F36B">Score yourself (official DELF A1 grid)</div>
          ${S.grid.map(([t, pts], i) => `<div><div style="font-size:15px">${esc(t)} <span class="muted">(${pts} pts)</span></div><div class="rate">${['Not yet', 'Partly', 'Yes'].map((l, v) => `<button class="chip ${st.grid[i] === v ? 'on' : ''}" data-act="grid" data-i="${i}" data-v="${v}">${l}</button>`).join('')}</div></div>`).join('')}</div>`;
    }
    const last = st.part === 3;
    const canFinish = !last || st.grid.every((g) => g >= 0);
    return header() + `<div class="scroll" style="padding-top:8px;padding-bottom:24px">${body}
      <button class="btn" data-act="finish" ${canFinish ? '' : 'disabled'}>${last ? (canFinish ? 'Finish the exam' : 'Score every line above to finish') : 'Finish this part →'}</button></div>`;
  }

  function viewResults() {
    const total = st.scores.reduce((a, b) => a + b, 0);
    const passed = total >= 50 && st.scores.every((s) => s >= 5);
    const fmt = (n) => (Math.round(n * 2) / 2).toString();
    const ws = writingScore();
    const review = (docs, groups, withText) => docs.map((d, di) => `<div class="card" style="display:flex;flex-direction:column;gap:8px"><div style="font-weight:700;color:#C6F36B">${esc(d.title)}</div>
        ${withText ? `<details><summary class="muted" style="cursor:pointer;font-size:14px">Show what was said</summary><div style="font-size:14px;line-height:1.5;margin-top:6px">${d.lines.map((l) => esc(l[1])).join('<br>')}</div></details>` : ''}
        ${groups[di].map((x) => `<div style="font-size:14px;line-height:1.4;border-top:1px solid #22344F;padding-top:6px"><b>${esc(x.q)}</b><br>${x.pick === x.a ? `<span style="color:#7FE0A8">✓ ${esc(x.a)}</span>` : `<span style="color:#F28B82">✗ ${x.pick ? esc(x.pick) : 'no answer'}</span> → <span style="color:#7FE0A8">${esc(x.a)}</span>`}</div>`).join('')}</div>`).join('');
    const bits = passed ? Array.from({ length: 22 }, (_, i) => `<span style="left:${(i * 37) % 96}%;font-size:${18 + (i % 4) * 6}px;animation-duration:${(2.4 + (i % 5) * 0.45).toFixed(2)}s;animation-delay:${((i * 0.17) % 1.6).toFixed(2)}s">${['🎉', '⭐', '🥐', '🇫🇷', '✨', '🏆'][i % 6]}</span>`).join('') : '';
    return `${passed ? `<div class="confetti" aria-hidden="true">${bits}</div>` : ''}<div class="scroll">
      <div style="font-size:56px;line-height:1">${passed ? '🏆' : '📚'}</div>
      <div class="kicker">${passed ? 'You would pass!' : 'Not yet, keep going'}</div>
      <div class="serif" style="font-size:48px;line-height:1">${fmt(total)}<span style="font-size:22px" class="muted"> / 100</span></div>
      <div class="muted" style="font-size:15px;line-height:1.45">${passed ? 'Above 50 with at least 5 in every part. Remember that writing and speaking were partly self-marked: a real examiner may be stricter.' : total >= 50 ? 'Your total is above 50, but one part is under 5/25, which fails the DELF. Work on that part first.' : 'You need 50/100 to pass. Look at the part with the lowest score and do the matching lessons again.'}</div>
      <div class="card">${PARTS.map((p, i) => `<div class="score-row"><span>${p.icon} ${p.title}</span><span style="color:${st.scores[i] < 5 ? '#F28B82' : '#F3F1EA'}">${fmt(st.scores[i])} / 25</span></div>`).join('')}
        <div class="muted" style="font-size:13px;margin-top:8px">Writing: form ${ws.form}/10 · postcard ${ws.auto + ws.self}/15 (${ws.auto}/9 checked automatically, ${ws.self}/6 self-check) · +${Math.round(total / 2)} XP</div></div>
      <div class="serif" style="font-size:22px;margin-top:6px">Review: listening</div>${review(X.LISTENING, st.listen, true)}
      <div class="serif" style="font-size:22px;margin-top:6px">Review: reading</div>${review(X.READING, st.read, false)}
      <div class="serif" style="font-size:22px;margin-top:6px">Review: writing</div>
      <div class="card" style="display:flex;flex-direction:column;gap:6px">${messageChecks(st.msg).map(([t, got, max]) => `<div style="font-size:14px">${got === max ? '<span style="color:#7FE0A8">✓</span>' : got ? '<span style="color:#FFD58A">~</span>' : '<span style="color:#F28B82">✗</span>'} ${esc(t)} · ${got}/${max}</div>`).join('')}
        <div style="font-weight:700;margin-top:8px">Model answer</div><div class="doc">${esc(X.WRITING.message.model)}</div></div>
      <button class="btn" data-act="again">Take the exam again</button>
      <a class="btn ghost" href="learn.html" style="display:flex;align-items:center;justify-content:center;text-decoration:none">Back to the lessons</a>
    </div>`;
  }

  /* ---------------- Events ---------------- */

  app.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]'); if (!b || b.disabled) return;
    const d = b.dataset;
    switch (d.act) {
      case 'start': case 'again': startExam(); break;
      case 'quit': if (confirm('Leave the exam? This attempt will not be saved.')) { clearInterval(timerIv); stopSpeech(); stopMic(); screen = 'intro'; render(true); } break;
      case 'pick': { const x = st[d.part][+d.d][+d.q]; x.pick = x.opts[+d.o]; render(); break; }
      case 'playDoc': {
        const i = +d.d;
        if (st.playing === i) break;
        if (st.plays[i] >= 2) break;
        st.plays[i]++; st.playing = i; render();
        playLines(X.LISTENING[i].lines, () => { st.playing = -1; render(); });
        break;
      }
      case 'selfW': st.selfW[+d.i] = !st.selfW[+d.i]; render(); break;
      case 'grid': st.grid[+d.i] = +d.v; render(); break;
      case 'sayQ': stopMic(); sayText(X.SPEAKING.interview[+d.i], 'B'); break;
      case 'sayP': sayText(X.SPEAKING.roleplay.phrases[+d.i], 'A'); break;
      case 'card': st.cardShown[+d.i] = !st.cardShown[+d.i]; render(); break;
      case 'phrases': st.showPhrases = !st.showPhrases; render(); break;
      case 'mic': toggleMic(d.k); break;
      case 'finish': if (st.part < 3 && !confirm('Finish this part? You can’t come back to it.')) break; finishPart(); break;
    }
  });
  // Typing updates the state without re-rendering (keeps focus and the keyboard).
  app.addEventListener('input', (e) => {
    const t = e.target;
    if (t.dataset.form) st.form[t.dataset.form] = t.value;
    if (t.dataset.msg) { st.msg = t.value; const wc = document.getElementById('wc'); if (wc) wc.textContent = words(t.value).length + ' words'; }
  });
  window.addEventListener('beforeunload', (e) => { if (screen === 'part') { e.preventDefault(); e.returnValue = ''; } });

  render(true);
})();
