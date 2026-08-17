(()=>{
'use strict';
if(window.__NEET_MENU_V4_LOADER__)return;
window.__NEET_MENU_V4_LOADER__=true;
const ROOT='https://akito0802.github.io/NEET-note/';
const fix=document.createElement('script');
fix.src=ROOT+'home-route-fix.js?v=20260817-1';
fix.defer=true;
fix.onload=()=>{
  const menu=document.createElement('script');
  menu.src=ROOT+'global-menu.js?v=20260817-1';
  menu.defer=true;
  menu.onload=()=>{
    const compact=document.createElement('script');
    compact.src=ROOT+'global-menu-compact-width.js?v=20260817-1';
    compact.defer=true;
    compact.onload=()=>{
      const leftTop=document.createElement('script');
      leftTop.src=ROOT+'global-menu-left-top.js?v=20260817-1';
      leftTop.defer=true;
      leftTop.onload=()=>{
        if(document.querySelector('script[data-neet-menu-dedupe]'))return;
        const dedupe=document.createElement('script');
        dedupe.src=ROOT+'menu-dedupe.js?v=20260817-1';
        dedupe.defer=true;
        dedupe.dataset.neetMenuDedupe='1';
        document.head.appendChild(dedupe);
      };
      document.head.appendChild(leftTop);
    };
    document.head.appendChild(compact);
  };
  document.head.appendChild(menu);
};
document.head.appendChild(fix);
})();