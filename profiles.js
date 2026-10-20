/* Profiles: "Who's learning?" picker. Each profile has its own saved progress on this device. */
(function () {
  var PK = 'allez_profiles', AK = 'allez_active', KEYS = ['allez_vocab_v3', 'allez_sent_v1', 'allez_time_v1'];
  var AV = [['🦊', '#F4A261'], ['🐼', '#8D99AE'], ['🐸', '#7FC97F'], ['🐙', '#C77DFF'], ['🦄', '#F28BC0'], ['🐯', '#F6BD60'], ['🐧', '#4EA8DE'], ['🦁', '#E9C46A'], ['🐰', '#F5CAC3'], ['🐳', '#48CAE4']];
  var ls = window.localStorage, rawGet = ls.getItem.bind(ls), rawSet = ls.setItem.bind(ls), rawRem = ls.removeItem.bind(ls);
  function list() { try { return JSON.parse(rawGet(PK) || '[]') || []; } catch (e) { return []; } }
  function save(l) { try { rawSet(PK, JSON.stringify(l)); } catch (e) {} }
  function active() { try { return sessionStorage.getItem(AK) || ''; } catch (e) { return ''; } }
  function setActive(id) { try { sessionStorage.setItem(AK, id); } catch (e) {} }
  function ns(id) { var g = Storage.prototype.getItem, s = Storage.prototype.setItem, r = Storage.prototype.removeItem;
    var map = function (k) { return KEYS.indexOf(k) >= 0 ? 'p:' + id + ':' + k : k; };
    Storage.prototype.getItem = function (k) { return g.call(this, this === ls ? map(k) : k); };
    Storage.prototype.setItem = function (k, v) { return s.call(this, this === ls ? map(k) : k, v); };
    Storage.prototype.removeItem = function (k) { return r.call(this, this === ls ? map(k) : k); }; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function start(id) { setActive(id); ns(id); var me = list().filter(function (p) { return p.id === id; })[0]; window.__profile = me;
    var ov = document.getElementById('pf-ov'); if (ov) ov.remove(); chip(me); if (window.__dcStart) window.__dcStart(); }
  function chip(me) {
    var b = document.createElement('button'); b.setAttribute('aria-label', 'Switch profile. Now: ' + me.name);
    b.style.cssText = 'position:fixed;top:10px;left:12px;z-index:50;height:36px;min-width:36px;padding:0 10px 0 4px;border:0;border-radius:999px;display:flex;align-items:center;gap:6px;background:rgba(20,33,61,.92);color:#fff;font:700 13px system-ui,sans-serif;cursor:pointer';
    b.innerHTML = '<span style="width:28px;height:28px;border-radius:50%;background:' + AV[me.av][1] + ';display:flex;align-items:center;justify-content:center;font-size:17px">' + AV[me.av][0] + '</span><span style="max-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + esc(me.name) + '</span>';
    b.onclick = function () { try { sessionStorage.removeItem(AK); } catch (e) {} location.reload(); };
    document.body.appendChild(b);
  }
  var CSS = '#pf-ov{position:fixed;inset:0;z-index:100;background:#0E1A2B;color:#F3F1EA;font-family:"DM Sans",system-ui,sans-serif;overflow-y:auto;display:flex;flex-direction:column;align-items:center;padding:56px 20px 40px;box-sizing:border-box}' +
    '#pf-ov h1{font-family:Fraunces,Georgia,serif;font-size:32px;margin:0 0 6px;text-align:center}#pf-ov p{color:#A9B4C6;margin:0 0 26px;text-align:center}' +
    '.pf-g{display:grid;grid-template-columns:repeat(2,minmax(0,150px));gap:22px;justify-content:center}' +
    '.pf-c{background:none;border:0;color:inherit;font:inherit;display:flex;flex-direction:column;align-items:center;gap:10px;cursor:pointer;padding:6px}' +
    '.pf-a{width:104px;height:104px;border-radius:22px;display:flex;align-items:center;justify-content:center;font-size:58px;transition:transform .2s;animation:pfb 3.2s ease-in-out infinite}' +
    '.pf-c:active .pf-a,.pf-c:hover .pf-a{transform:scale(1.1) rotate(-4deg)}.pf-c:nth-child(2n) .pf-a{animation-delay:.5s}.pf-c:nth-child(3n) .pf-a{animation-delay:1s}' +
    '@keyframes pfb{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}' +
    '.pf-n{font-weight:700;font-size:17px;max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    '.pf-add .pf-a{background:#172A44;border:2px dashed #3A4F70;color:#C6F36B;font-size:44px;animation:none}' +
    '.pf-in{width:100%;max-width:340px;box-sizing:border-box;min-height:52px;border-radius:14px;border:2px solid #3A4F70;background:#172A44;color:#F3F1EA;font-size:18px;padding:0 16px;margin-bottom:12px;font-family:inherit}' +
    '.pf-ch{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;max-width:340px;width:100%;margin:6px 0 18px}' +
    '.pf-ch button{aspect-ratio:1;border-radius:14px;border:3px solid transparent;font-size:28px;cursor:pointer}.pf-ch button.on{border-color:#C6F36B;transform:scale(1.08)}' +
    '.pf-bt{width:100%;max-width:340px;min-height:52px;border-radius:14px;border:0;background:#C6F36B;color:#0E1A2B;font-weight:700;font-size:17px;cursor:pointer;margin-bottom:10px}.pf-bt.g{background:transparent;color:#F3F1EA;border:1.5px solid #3A4F70}';
  function show() {
    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    var ov = document.createElement('div'); ov.id = 'pf-ov'; document.body.appendChild(ov);
    function picker() {
      var ps = list();
      if (!ps.length) return form(true);
      ov.innerHTML = '<h1>Who is learning?</h1><p>Tap your name. Your progress stays on this device.</p><div class="pf-g">' +
        ps.map(function (p) { return '<button class="pf-c" data-id="' + p.id + '"><span class="pf-a" style="background:' + AV[p.av][1] + '">' + AV[p.av][0] + '</span><span class="pf-n">' + esc(p.name) + '</span></button>'; }).join('') +
        '<button class="pf-c pf-add" data-add="1"><span class="pf-a">+</span><span class="pf-n">Add profile</span></button></div>';
      ov.querySelectorAll('.pf-c').forEach(function (b) { b.onclick = function () { if (b.getAttribute('data-add')) form(false); else start(b.getAttribute('data-id')); }; });
    }
    function form(first) {
      var av = Math.floor(Math.random() * AV.length);
      ov.innerHTML = '<h1>' + (first ? 'Welcome!' : 'New profile') + '</h1><p>Who is learning French?</p>' +
        '<input class="pf-in" id="pf-name" maxlength="20" placeholder="Name" autocomplete="off">' +
        '<input class="pf-in" id="pf-age" type="number" inputmode="numeric" min="3" max="99" placeholder="Age (optional)">' +
        '<div class="pf-ch">' + AV.map(function (a, i) { return '<button type="button" data-i="' + i + '" style="background:' + a[1] + '" class="' + (i === av ? 'on' : '') + '">' + a[0] + '</button>'; }).join('') + '</div>' +
        '<button class="pf-bt" id="pf-go">Start learning</button>' + (first ? '' : '<button class="pf-bt g" id="pf-back">Back</button>');
      ov.querySelectorAll('.pf-ch button').forEach(function (b) { b.onclick = function () { av = +b.getAttribute('data-i'); ov.querySelectorAll('.pf-ch button').forEach(function (x) { x.className = ''; }); b.className = 'on'; }; });
      var back = document.getElementById('pf-back'); if (back) back.onclick = picker;
      document.getElementById('pf-go').onclick = function () {
        var name = document.getElementById('pf-name').value.trim(); if (!name) { document.getElementById('pf-name').focus(); return; }
        var ps = list(), id = 'u' + Date.now().toString(36), age = document.getElementById('pf-age').value;
        if (!ps.length) { KEYS.forEach(function (k) { var v = rawGet(k); if (v) rawSet('p:' + id + ':' + k, v); }); } /* first profile keeps any progress saved before profiles existed */
        ps.push({ id: id, name: name, age: age, av: av }); save(ps); start(id);
      };
    }
    picker();
  }
  window.__dcHold = true;
  var hs = document.createElement('style'); hs.textContent = 'x-dc{display:none}'; document.head.appendChild(hs);
  function go() { var id = active(), me = list().filter(function (p) { return p.id === id; })[0]; if (me) { ns(id); window.__profile = me; document.addEventListener('DOMContentLoaded', function () { chip(me); }); if (document.readyState !== 'loading') chip(me); window.__dcHold = false; } else document.addEventListener('DOMContentLoaded', show); if (document.readyState !== 'loading' && !me) show(); }
  go();
})();
