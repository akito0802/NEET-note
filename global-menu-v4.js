(()=>{
'use strict';
if(window.__NEET_MENU_V4_LOADER__)return;
window.__NEET_MENU_V4_LOADER__=true;
const ROOT='https://akito0802.github.io/NEET-note/';

// 五度圏・長調→短調の2ページだけに、既存のNEETNOTEトップボタンと同じUIを追加。
// DOM監視は使わず、読み込み時に一度だけ生成する。
const localTopPages=new Set(['/NEET-note/circle-of-fifths.html','/NEET-note/major-to-minor-lab.html']);
if(localTopPages.has(location.pathname)){
  const style=document.createElement('style');
  style.id='local-top-return-style';
  style.textContent=`
.local-top-return{position:fixed;left:max(12px,env(safe-area-inset-left));bottom:max(14px,env(safe-area-inset-bottom));z-index:38990;display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:44px;padding:0 14px;border:1px solid rgba(154,117,73,.28);border-radius:999px;background:rgba(255,250,242,.95);color:#704a25;box-shadow:0 8px 24px rgba(89,62,31,.16);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);text-decoration:none;font-size:.78rem;font-weight:900;line-height:1;font-family:-apple-system,BlinkMacSystemFont,"Hiragino Sans","Yu Gothic",sans-serif;transition:.18s transform,.18s box-shadow}
.local-top-return:hover{transform:translateY(-1px);box-shadow:0 10px 26px rgba(89,62,31,.22)}
.local-top-return-icon{font-size:1.08rem}
html[data-theme="dark"] .local-top-return{background:rgba(48,42,35,.94);color:#e0b77f;border-color:#514438}
@media(max-width:600px){.local-top-return{width:46px;height:46px;min-height:46px;padding:0;border-radius:50%}.local-top-return-label{display:none}}
`;
  document.head.appendChild(style);

  const addLocalTop=()=>{
    if(document.querySelector('.local-top-return'))return;
    const a=document.createElement('a');
    a.className='local-top-return';
    a.href=ROOT+'home.html';
    a.setAttribute('aria-label','NEETNOTEのトップに戻る');
    a.innerHTML='<span class="local-top-return-icon" aria-hidden="true">⌂</span><span class="local-top-return-label">トップ</span>';
    document.body.appendChild(a);
  };
  if(document.body)addLocalTop();
  else document.addEventListener('DOMContentLoaded',addLocalTop,{once:true});
}

// 転調メーカーの右下↑は、古いページ本体がキャッシュされていても
// この always-fresh ローダー側から必ず作り直す。
if(location.pathname==='/NEET-note/modulation-route.html'){
  const installModulationScrollButton=()=>{
    document.querySelectorAll('#modScrollTop,#modScrollTopFresh').forEach(el=>el.remove());
    if(!document.getElementById('modulation-scroll-fresh-style')){
      const style=document.createElement('style');
      style.id='modulation-scroll-fresh-style';
      style.textContent=`
#modScrollTopFresh{position:fixed;right:max(14px,env(safe-area-inset-right));bottom:max(18px,calc(env(safe-area-inset-bottom) + 18px));z-index:39020;display:none;align-items:center;justify-content:center;gap:7px;min-height:46px;padding:0 15px;border:1px solid rgba(154,117,73,.28);border-radius:999px;background:rgba(255,250,242,.97);color:#704a25;box-shadow:0 9px 26px rgba(89,62,31,.18);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);font:inherit;font-size:.78rem;font-weight:900;cursor:pointer}
#modScrollTopFresh.show{display:inline-flex}
html[data-theme="dark"] #modScrollTopFresh{background:rgba(48,42,35,.96);color:#e0b77f;border-color:#514438}
@media(max-width:600px){#modScrollTopFresh{right:max(14px,env(safe-area-inset-right));bottom:max(82px,calc(env(safe-area-inset-bottom) + 82px));min-height:46px;padding:0 13px;font-size:.72rem}}
`;
      document.head.appendChild(style);
    }
    const btn=document.createElement('button');
    btn.id='modScrollTopFresh';
    btn.type='button';
    btn.setAttribute('aria-label','理論ライブラリの検索欄へ戻る');
    btn.innerHTML='<span aria-hidden="true">↑</span><span>検索へ</span>';
    const sync=()=>btn.classList.toggle('show',window.scrollY>420);
    btn.addEventListener('click',e=>{
      e.preventDefault();
      e.stopPropagation();
      const library=document.getElementById('libraryView');
      const inLibrary=library && !library.hidden;
      const target=inLibrary
        ? (document.getElementById('librarySearchTop') || document.querySelector('#libraryView .ml-toolbar'))
        : document.getElementById('makerView');
      if(!target)return;
      const y=target.getBoundingClientRect().top+window.scrollY-8;
      window.scrollTo({top:Math.max(0,y),behavior:'smooth'});
    });
    document.body.appendChild(btn);
    window.addEventListener('scroll',sync,{passive:true});
    sync();
  };
  if(document.body)installModulationScrollButton();
  else document.addEventListener('DOMContentLoaded',installModulationScrollButton,{once:true});
}

function installAdvancedMenu(){
  if(window.NEETAdvancedTheoryLinks){window.NEETAdvancedTheoryLinks.installMenu();return}
  if(document.querySelector('script[data-neet-advanced-theory]'))return;
  const advanced=document.createElement('script');
  advanced.src=ROOT+'advanced-theory-links.js?v=20260820-modhub1';
  advanced.defer=true;
  advanced.dataset.neetAdvancedTheory='1';
  advanced.onload=()=>window.NEETAdvancedTheoryLinks?.installMenu();
  document.head.appendChild(advanced);
}

const fix=document.createElement('script');
fix.src=ROOT+'home-route-fix.js?v=20260818-2';
fix.defer=true;
fix.onload=()=>{
  const menu=document.createElement('script');
  menu.src=ROOT+'global-menu.js?v=20260819-safe1';
  menu.defer=true;
  menu.onload=()=>{
    installAdvancedMenu();
    const compact=document.createElement('script');
    compact.src=ROOT+'global-menu-compact-width.js?v=20260817-1';
    compact.defer=true;
    compact.onload=()=>{
      const corner=document.createElement('script');
      corner.src=ROOT+'global-menu-left-top.js?v=20260818-2';
      corner.defer=true;
      corner.onload=()=>{
        if(document.querySelector('script[data-neet-menu-dedupe]'))return;
        const dedupe=document.createElement('script');
        dedupe.src=ROOT+'menu-dedupe.js?v=20260818-3';
        dedupe.defer=true;
        dedupe.dataset.neetMenuDedupe='1';
        document.head.appendChild(dedupe);
      };
      document.head.appendChild(corner);
    };
    document.head.appendChild(compact);
  };
  document.head.appendChild(menu);
};
document.head.appendChild(fix);
})();