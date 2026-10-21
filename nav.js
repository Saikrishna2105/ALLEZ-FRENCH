/* Bottom tab bar shared by all pages */
(function () {
  var TABS = [['index.html', 'Words', '📚'], ['sentences.html', 'Sentences', '💬'], ['alphabet.html', 'Alphabet', '🔤']];
  var path = location.pathname.split('/').pop() || 'index.html';
  var css = 'x-dc>div{height:calc(100vh - 64px)!important;height:calc(100dvh - 64px - env(safe-area-inset-bottom))!important}' +
    'html,body{background:#0E1A2B!important}' +
    '#tabbar{position:fixed;left:0;right:0;bottom:0;z-index:40;height:calc(64px + env(safe-area-inset-bottom));padding-bottom:env(safe-area-inset-bottom);background:#0B1422;border-top:1px solid #22344F;display:flex;justify-content:center}' +
    '#tabbar .in{display:flex;width:100%;max-width:520px}' +
    '#tabbar a{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;text-decoration:none;color:#8B9AB3;font:700 12px "DM Sans",system-ui,sans-serif}' +
    '#tabbar a span.i{font-size:22px;line-height:1;filter:grayscale(1);opacity:.7}' +
    '#tabbar a.on{color:#C6F36B}#tabbar a.on span.i{filter:none;opacity:1}';
  function add() {
    if (document.getElementById('tabbar')) return;
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var n = document.createElement('nav'); n.id = 'tabbar'; n.setAttribute('aria-label', 'Sections');
    n.innerHTML = '<div class="in">' + TABS.map(function (t) { return '<a href="' + t[0] + '" class="' + (t[0] === path ? 'on' : '') + '"' + (t[0] === path ? ' aria-current="page"' : '') + '><span class="i">' + t[2] + '</span>' + t[1] + '</a>'; }).join('') + '</div>';
    document.body.appendChild(n);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', add); else add();
})();
