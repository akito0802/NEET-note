(()=>{
'use strict';
if(window.__NEET_MENU_DEDUPE__)return;
window.__NEET_MENU_DEDUPE__=true;

const ROOT='https://akito0802.github.io/NEET-note/';
const TOP_URL=ROOT+'?home=current';
const style=document.createElement('style');
style.id='neet-menu-dedupe-style';
style.textContent=`
#menuOpenBtn,#open,#siteMenuOpenBtn,#openMenu,#menuBtn,#hamburgerBtn,
.menu-button,.site-menu-button,.neet-menu-trigger,.neet-menu-open,.neet-menu-hamburger,.n4-trigger,
button[aria-label*="メニューを開く"]:not(.ngm-btn),
#sideMenu,#menuOverlay,#siteSideMenu,#siteMenuOverlay,
.neet-side-menu,.neet-menu-overlay,.neet-full-menu{display:none!important}
.ngm-btn{display:grid!important}.ngm-menu,.ngm-overlay{display:block!important}
.neet-top-return{position:fixed;left:max(12px,env(safe-area-inset-left));bottom:max(14px,env(safe-area-inset-bottom));z-index:38990;display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:44px;padding:0 14px;border:1px solid rgba(154,117,73,.28);border-radius:999px;background:rgba(255,250,242,.95);color:#704a25;box-shadow:0 8px 24px rgba(89,62,31,.16);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,"Hiragino Sans","Yu Gothic",sans-serif;font-size:.78rem;font-weight:900;line-height:1}.neet-top-return .neet-top-return-icon{font-size:1.08rem;line-height:1}.neet-top-return:hover{transform:translateY(-1px);box-shadow:0 10px 26px rgba(89,62,31,.22)}html[data-theme="dark"] .neet-top-return{background:rgba(48,42,35,.96);border-color:#514438;color:#f4d7ad}@media(max-width:480px){.neet-top-return{width:46px;height:46px;min-height:46px;padding:0;border-radius:50%}.neet-top-return-label{display:none}}
`;
document.head.appendChild(style);

const legacySelector='#menuOpenBtn,#open,#siteMenuOpenBtn,#openMenu,#menuBtn,#hamburgerBtn,.menu-button,.site-menu-button,.neet-menu-trigger,.neet-menu-open,.neet-menu-hamburger,.n4-trigger,button[aria-label*="メニューを開く"],#sideMenu,#menuOverlay,#siteSideMenu,#siteMenuOverlay,.neet-side-menu,.neet-menu-overlay,.neet-full-menu';

const hideLegacy=()=>{
  document.querySelectorAll(legacySelector).forEach(el=>{
    if(el.classList.contains('ngm-btn')||el.classList.contains('ngm-menu')||el.classList.contains('ngm-overlay')||el.closest('.ngm-menu'))return;
    el.style.setProperty('display','none','important');
    el.setAttribute('aria-hidden','true');
  });
  const keepOne=selector=>{const nodes=[...document.querySelectorAll(selector)];nodes.slice(1).forEach(node=>node.remove())};
  keepOne('.ngm-btn');
  keepOne('.ngm-menu');
  keepOne('.ngm-overlay');
};

const ensureTopButton=()=>{
  let button=document.querySelector('.neet-top-return,.ngm-top-return');
  if(!button){
    button=document.createElement('a');
    button.className='neet-top-return';
    button.setAttribute('aria-label','NEETNOTEトップへ戻る');
    button.innerHTML='<span class="neet-top-return-icon" aria-hidden="true">⌂</span><span class="neet-top-return-label">トップへ戻る</span>';
    document.body.appendChild(button);
  }
  button.classList.add('neet-top-return');
  button.href=TOP_URL;
  button.onclick=e=>{e.preventDefault();window.location.assign(TOP_URL)};
  return button;
};

const apply=()=>{hideLegacy();ensureTopButton()};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
new MutationObserver(apply).observe(document.documentElement,{childList:true,subtree:true});
})();