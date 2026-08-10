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
  .neet-theory-nav-group.library-group .tab{min-width:150px;justify-content:center;background:#fff}
  .neet-theory-nav-group.library-group .tab.active{background:var(--accent,#8b6f47)}
  #library{position:relative}
  #library>.grid{padding-top:2px}
  .neet-library-intro{border:1px solid #d8c9b5!important;background:#fff9ef!important}
  .neet-library-intro h2{margin-bottom:5px!important}
  .neet-library-intro p{margin:0;color:#685a48;font-size:.78rem;line-height:1.62}
  #neetUnifiedTheory{margin-top:0!important;grid-column:1/-1}
  #library #neetUnifiedTheory{box-shadow:var(--shadow,0 10px 28px rgba(80,60,30,.07))}
  .neet-guide-grid a{cursor:pointer}
  @media(max-width:760px){.neet-theory-nav-shell{grid-template-columns:1fr}.neet-theory-nav-group.library-group .tab{min-width:0;width:100%}}
  `;
  document.head.appendChild(s);
}

function splitTopNavigation(){
  const tabs=document.querySelector('nav.tabs');
  if(!tabs||tabs.dataset.neetSplit==='1')return;
  const buttons=[...tabs.querySelectorAll('.tab')];
  const lib=buttons.find(b=>b.dataset.tab==='library');
  const assist=buttons.filter(b=>b!==lib);
  if(!lib||!assist.length)return;

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
  library.innerHTML='<span class="neet-theory-nav-label">📚 読んで学ぶ</span>';
  const libraryTabs=document.createElement('div');
  libraryTabs.className='tabs';
  libraryTabs.appendChild(lib);
  library.appendChild(libraryTabs);

  tabs.replaceWith(shell);
  shell.append(tools,library);
  shell.dataset.neetSplit='1';
}

function prepareLibraryPane(){
  const pane=document.getElementById('library');
  const grid=pane?.querySelector(':scope > .grid');
  if(!pane||!grid)return;
  if(!grid.querySelector('.neet-library-intro')){
    const intro=document.createElement('section');
    intro.className='card wide neet-library-intro';
    intro.innerHTML='<h2>📚 理論ライブラリ <span class="hint">アシスト機能とは別エリア</span></h2><p>ここは分析や候補生成をする場所ではなく、理論を読んで理解するための専用エリア。PDFベースのコア理論と、コード辞典から統合したコード構成・ボイシング・モード・作曲理論をまとめて確認できるよ。</p>';
    grid.prepend(intro);
  }
}

function moveUnifiedLibrary(){
  const pane=document.getElementById('library');
  const grid=pane?.querySelector(':scope > .grid');
  const unified=document.getElementById('neetUnifiedTheory');
  if(!grid||!unified)return false;
  if(unified.parentElement!==grid)grid.appendChild(unified);
  unified.querySelector('.neet-original-link')?.remove();
  const h=unified.querySelector('h2');
  if(h)h.textContent='📚 統合理論ライブラリ';
  return true;
}

function fixGuideLinks(){
  document.querySelectorAll('.neet-guide-grid a').forEach(a=>{
    a.removeAttribute('href');
    a.setAttribute('role','button');
    a.setAttribute('tabindex','0');
    const openLibrary=()=>document.querySelector('.tab[data-tab="library"]')?.click();
    a.onclick=e=>{e.preventDefault();openLibrary();window.scrollTo({top:0,behavior:'smooth'})};
    a.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openLibrary()}};
  });
}

function run(){
  installStyles();
  splitTopNavigation();
  prepareLibraryPane();
  fixGuideLinks();
  if(moveUnifiedLibrary())return;
  const obs=new MutationObserver(()=>{
    fixGuideLinks();
    if(moveUnifiedLibrary())obs.disconnect();
  });
  obs.observe(document.body,{childList:true,subtree:true});
  setTimeout(()=>obs.disconnect(),10000);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();