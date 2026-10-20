/* Tiny runtime for the Allez! French app (renders <x-dc> templates). */
(function () {
  class DCLogic {
    constructor(props) { this.props = props || {}; this.state = {}; this._rt = null; }
    setState(p) {
      const prevState = this.state;
      this.state = Object.assign({}, prevState, typeof p === 'function' ? p(prevState) : p);
      if (this._rt) this._rt.update(prevState);
    }
  }
  window.DCLogic = DCLogic;

  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const get = (scope, path) => {
    path = path.trim();
    if (path === 'true') return true; if (path === 'false') return false;
    let v = scope;
    for (const k of path.split('.')) { if (v == null) return undefined; v = v[k]; }
    return v;
  };
  const HOLE = /\{\{([^}]*)\}\}/g;
  const VOID = new Set(['input', 'br', 'img', 'hr', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse']);
  const EVENTS = { onclick: 'click', onchange: 'change', oninput: 'input' };

  function boot() {
    const root = document.querySelector('x-dc');
    const scriptEl = document.querySelector('script[data-dc-script]');
    if (!root || !scriptEl) return;
    const helmet = root.querySelector('helmet');
    if (helmet) { Array.from(helmet.children).forEach((c) => document.head.appendChild(c)); helmet.remove(); }
    let defs = {};
    try { defs = JSON.parse(scriptEl.getAttribute('data-props') || '{}'); } catch (e) {}
    const props = {};
    Object.keys(defs).forEach((k) => { if (k[0] !== '$' && defs[k] && 'default' in defs[k]) props[k] = defs[k].default; });
    const Component = new Function('DCLogic', scriptEl.textContent + '\n;return Component;')(DCLogic);
    const tpl = document.createElement('div');
    tpl.innerHTML = root.innerHTML;
    root.innerHTML = '';
    root.style.display = 'block';
    const inst = new Component(props);
    let handlers = [];

    function attrs(el, scope) {
      let out = '';
      for (const a of Array.from(el.attributes)) {
        const n = a.name;
        if (n.startsWith('hint-') || n === 'list' || n === 'as' || n === 'value' && el.tagName === 'SC-IF') continue;
        if (EVENTS[n]) {
          const m = a.value.match(/^\s*\{\{([^}]*)\}\}\s*$/);
          const fn = m && get(scope, m[1]);
          if (typeof fn === 'function') { handlers.push(fn); out += ' data-h-' + EVENTS[n] + '="' + (handlers.length - 1) + '"'; }
          continue;
        }
        const whole = a.value.match(/^\s*\{\{([^}]*)\}\}\s*$/);
        if (whole) {
          const v = get(scope, whole[1]);
          if (n === 'disabled' || n === 'checked' || n === 'hidden') { if (v) out += ' ' + n; continue; }
          if (v === undefined || v === null || v === false && !n.startsWith('aria-')) continue;
          out += ' ' + n + '="' + esc(v) + '"';
        } else {
          out += ' ' + n + '="' + esc(a.value.replace(HOLE, (_, p) => { const v = get(scope, p); return v == null ? '' : v; })) + '"';
        }
      }
      return out;
    }
    function walk(node, scope) {
      if (node.nodeType === 3) return esc(node.nodeValue.replace(HOLE, (_, p) => { const v = get(scope, p); return v == null ? '' : v; })).replace(/&amp;(amp|lt|gt|quot);/g, '&$1;');
      if (node.nodeType !== 1) return '';
      const tag = node.tagName.toLowerCase();
      if (tag === 'sc-if') {
        const m = node.getAttribute('value').match(/\{\{([^}]*)\}\}/);
        return get(scope, m[1]) ? kids(node, scope) : '';
      }
      if (tag === 'sc-for') {
        const m = node.getAttribute('list').match(/\{\{([^}]*)\}\}/);
        const list = get(scope, m[1]) || []; const as = node.getAttribute('as') || 'item';
        let out = '';
        list.forEach((it, i) => { const s2 = Object.create(scope); s2[as] = it; s2.index = i; out += kids(node, s2); });
        return out;
      }
      const a = attrs(node, scope);
      if (VOID.has(tag) && !node.firstChild) return '<' + tag + a + (tag === 'input' || tag === 'br' || tag === 'img' || tag === 'hr' ? '>' : '/>');
      return '<' + tag + a + '>' + kids(node, scope) + '</' + tag + '>';
    }
    function kids(node, scope) { let o = ''; node.childNodes.forEach((c) => { o += walk(c, scope); }); return o; }

    function sync(oldN, newN) {
      if (oldN.nodeType === 3) { if (oldN.nodeValue !== newN.nodeValue) oldN.nodeValue = newN.nodeValue; return; }
      const oa = oldN.attributes, na = newN.attributes;
      for (let i = oa.length - 1; i >= 0; i--) { const n = oa[i].name; if (!newN.hasAttribute(n)) { oldN.removeAttribute(n); if (n === 'disabled') oldN.disabled = false; } }
      for (let i = 0; i < na.length; i++) {
        const n = na[i].name, v = na[i].value;
        if (oldN.getAttribute(n) !== v) {
          oldN.setAttribute(n, v);
          if (n === 'value' && 'value' in oldN) oldN.value = v;
        }
      }
      const oc = Array.from(oldN.childNodes), nc = Array.from(newN.childNodes);
      for (let i = 0; i < nc.length; i++) {
        if (i >= oc.length) { oldN.appendChild(nc[i].cloneNode(true)); continue; }
        const o = oc[i], n = nc[i];
        if (o.nodeType === n.nodeType && (o.nodeType === 3 || o.nodeName === n.nodeName)) sync(o, n);
        else oldN.replaceChild(n.cloneNode(true), o);
      }
      for (let i = oc.length - 1; i >= nc.length; i--) oldN.removeChild(oc[i]);
    }
    function render() {
      handlers = [];
      const vals = inst.renderVals();
      const scope = Object.assign({}, vals);
      const html = kids(tpl, scope);
      const tmp = document.createElement('div'); tmp.innerHTML = html;
      sync(root, tmp);
    }
    inst._rt = { update(prevState) { render(); try { inst.componentDidUpdate && inst.componentDidUpdate(inst.props, prevState); } catch (e) { console.error(e); } } };
    ['click', 'change', 'input'].forEach((ev) => root.addEventListener(ev, (e) => {
      const t = e.target.closest ? e.target.closest('[data-h-' + ev + ']') : null;
      if (!t) return;
      const fn = handlers[+t.getAttribute('data-h-' + ev)];
      if (fn) fn(e);
    }));
    render();
    try { inst.componentDidMount && inst.componentDidMount(); } catch (e) { console.error(e); }
    window.addEventListener('pagehide', () => { try { inst.componentWillUnmount && inst.componentWillUnmount(); } catch (e) {} });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
