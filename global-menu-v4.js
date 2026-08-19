(()=>{
'use strict';
if(window.__NEET_MENU_V4_LOADER__)return;
window.__NEET_MENU_V4_LOADER__=true;
const ROOT='https://akito0802.github.io/NEET-note/';

// 五度圏・長調→短調の2ページだけに専用のトップボタンを追加。
// DOM監視は使わず、読み込み時に一度だけ生成する。
const localTopPages=new Set(['/NEET-note/circle-of-fifths.html','/NEET-note/major-to-minor-lab.html']);
if(localTopPages.has(location.pathname)){
  const addLocalTop=()=>{
    if(document.querySelector('.local-top-return'))return;
    const a=document.createElement('a');
    a.className='local-top-return';
    a.href=ROOT+'home.html';
    a.setAttribute('aria-label','NEETNOTEのトップに戻る');
    a.innerHTML='<span aria-hidden="true">⌂</span><span>トップ</span>';
    a.style.cssText='position:fixed;left:max(12px,env(safe-area-inset-left));bottom:max(14px,env(safe-area-inset-bottom));z-index:38000;display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:46px;padding:0 14px;border:1px solid rgba(154,117,73,.28);border-radius:999px;background:rgba(255,250,242,.96);color:#704a25;box-shadow:0 8px 24px rgba(89,62,31,.16);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);text-decoration:none;font-size:.78rem;font-weight:900;line-height:1;font-family:-apple-system,BlinkMacSystemFont,"Hiragino Sans","Yu Gothic",sans-serif';
    document.body.appendChild(a);
  };
  if(document.body)addLocalTop();
  else document.addEventListener('DOMContentLoaded',addLocalTop,{once:true});
}

const fix=document.createElement('script');
fix.src=ROOT+'home-route-fix.js?v=20260818-2';
fix.defer=true;
fix.onload=()=>{
  const menu=document.createElement('script');
  menu.src=ROOT+'global-menu.js?v=20260819-safe1';
  menu.defer=true;
  menu.onload=()=>{
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