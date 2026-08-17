(()=>{
'use strict';
if(window.__NEET_GLOBAL_MENU_LEFT_TOP__)return;
window.__NEET_GLOBAL_MENU_LEFT_TOP__=true;

const install=()=>{
  if(document.getElementById('ngm-left-top-style'))return;
  const style=document.createElement('style');
  style.id='ngm-left-top-style';
  style.textContent=`
    .ngm-btn{
      position:fixed!important;
      top:max(12px,env(safe-area-inset-top))!important;
      left:max(12px,env(safe-area-inset-left))!important;
      right:auto!important;
      bottom:auto!important;
      width:48px!important;
      height:48px!important;
      margin:0!important;
      z-index:39001!important;
      transform:none;
    }
    .ngm-btn:hover{transform:translateY(-1px)!important}
    @media(max-width:600px){
      .ngm-btn{
        top:max(10px,env(safe-area-inset-top))!important;
        left:max(10px,env(safe-area-inset-left))!important;
        width:44px!important;
        height:44px!important;
      }
    }
  `;
  document.head.appendChild(style);
};
install();
new MutationObserver(install).observe(document.documentElement,{childList:true,subtree:true});
})();