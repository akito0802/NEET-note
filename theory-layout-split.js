(()=>{
'use strict';
if(window.__NEET_THEORY_LAYOUT_SPLIT__)return;window.__NEET_THEORY_LAYOUT_SPLIT__=true;

function installStyles(){
  if(document.getElementById('neet-theory-layout-split-style'))return;
  const s=document.createElement('style');
  s.id='neet-theory-layout-split-style';
  s.textContent=`
  .neet-theory-nav-shell{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end;margin:2px 0 14px}
  .neet-theory-nav-group{min-width:0;padding:10px;border:1px solid var(--line,#ded6c9);border-radius:16px;background:rgba(255,253,248,.72)}
  .neet-theory-nav-group.library-group{background:#fff9ef;border-color:#d8c9b5}
  .neet-theory-nav-label{display:block;margin:0 0 7px 3px;color:var(--muted,#71695f);font-size:.66rem;font-weight:950;letter-spacing:.08em}
  .neet-theory-nav-group .tabs{margin:0;padding:0;overflow-x:auto}
  .neet-library-link{display:flex;align-items:center;justify-content:center;min-height:40px;padding:9px 14px;border:1px solid var(--accent,#8b6f47);border-radius:999px;background:var(--accent,#8b6f47);color:#fff;text-decoration:none;font-weight:850;white-space:nowrap}
  @media(max-width:760px){.neet-theory-nav-shell{grid-template-columns:1fr}.neet-library-link{width:100%}}
  `;
  document.head.appendChild(s);
}

function splitTopNavigation(){
  const tabs=document.querySelector('nav.tabs');
  if(!tabs||tabs.dataset.neetSplit==='1')return;
  const buttons=[...tabs.querySelectorAll('.tab')];
  const lib=buttons.find(b=>b.dataset.tab==='library');
  const assist=buttons.filter(b=>b!==lib);
  if(!assist.length)return;

  lib?.remove();
  document.getElementById('library')?.remove();

  const shell=document.createElement('div');
  shell.className='neet-theory-nav-shell';
  const tools=document.createElement('div');
  tools.className='neet-theory-nav-group';
  tools.innerHTML='<span class="neet-theory-nav-label">🧠 アシストツール</span>';
  const toolsTabs=document.createElement('div');
  toolsTabs.className='tabs';
  assist.forEach(b=>toolsTabs.appendChild(b));
  tools.appendChild(toolsTabs);

  const library=document.createElement('div');
  library.className='neet-theory-nav-group library-group';
  library.innerHTML='<span class="neet-theory-nav-label">📚 理論を読む</span><a class="neet-library-link" href="theory-library.html">統合理論ライブラリ →</a>';

  tabs.replaceWith(shell);
  shell.append(tools,library);
  shell.dataset.neetSplit='1';
}

function removeInjectedLibrary(){
  document.getElementById('neetUnifiedTheory')?.remove();
  document.getElementById('neetQuickGlossary')?.remove();
  document.getElementById('library')?.remove();
  document.querySelector('.tab[data-tab="library"]')?.remove();
}

function fixGuideLinks(){
  document.querySelectorAll('.neet-guide-grid a').forEach(a=>{
    a.href='theory-library.html';
    a.removeAttribute('role');
    a.removeAttribute('tabindex');
    a.onclick=null;
    a.onkeydown=null;
  });
}

function run(){
  installStyles();
  splitTopNavigation();
  removeInjectedLibrary();
  fixGuideLinks();
  const obs=new MutationObserver(()=>{removeInjectedLibrary();fixGuideLinks()});
  obs.observe(document.body,{childList:true,subtree:true});
  setTimeout(()=>obs.disconnect(),10000);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();