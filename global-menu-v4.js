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
    const collapse=document.createElement('script');
    collapse.src=ROOT+'global-menu-collapse.js?v=20260817-1';
    collapse.defer=true;
    collapse.onload=()=>{
      if(document.querySelector('script[data-neet-menu-dedupe]'))return;
      const dedupe=document.createElement('script');
      dedupe.src=ROOT+'menu-dedupe.js?v=20260817-1';
      dedupe.defer=true;
      dedupe.dataset.neetMenuDedupe='1';
      document.head.appendChild(dedupe);
    };
    document.head.appendChild(collapse);
  };
  document.head.appendChild(menu);
};
document.head.appendChild(fix);
})();