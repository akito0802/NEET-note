(()=>{
'use strict';
if(window.__NEET_MENU_DEDUPE__)return;window.__NEET_MENU_DEDUPE__=true;
const style=document.createElement('style');
style.textContent=`
#menuOpenBtn,#open,#siteMenuOpenBtn,#openMenu,
.menu-button,.site-menu-button,.neet-menu-trigger,.neet-menu-open,.neet-menu-hamburger,
#sideMenu,#menuOverlay,#siteSideMenu,#siteMenuOverlay,
.neet-side-menu,.neet-menu-overlay,.neet-full-menu{
  display:none!important;
}
.ngm-btn,.ngm-menu,.ngm-overlay{display:grid}
.ngm-menu{display:block}
.ngm-overlay{display:block}
`;
document.head.appendChild(style);
const hideLegacy=()=>{
  document.querySelectorAll('#menuOpenBtn,#open,#siteMenuOpenBtn,#openMenu,.menu-button,.site-menu-button,.neet-menu-trigger,.neet-menu-open,.neet-menu-hamburger,#sideMenu,#menuOverlay,#siteSideMenu,#siteMenuOverlay,.neet-side-menu,.neet-menu-overlay,.neet-full-menu').forEach(el=>{
    if(el.classList.contains('ngm-btn')||el.classList.contains('ngm-menu')||el.classList.contains('ngm-overlay'))return;
    el.style.setProperty('display','none','important');
    el.setAttribute('aria-hidden','true');
  });
};
hideLegacy();
new MutationObserver(hideLegacy).observe(document.documentElement,{childList:true,subtree:true});
})();