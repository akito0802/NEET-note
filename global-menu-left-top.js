(()=>{
'use strict';
// V2 guard intentionally differs from the legacy guard so an older cached
// right-positioning script cannot prevent this corrective pass from running.
if(window.__NEET_GLOBAL_MENU_LEFT_TOP_V2__)return;
window.__NEET_GLOBAL_MENU_LEFT_TOP_V2__=true;

const styleId='ngm-left-top-style-v2';
const installStyle=()=>{
  if(document.getElementById(styleId))return;
  const style=document.createElement('style');
  style.id=styleId;
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
      transform:none!important;
    }
    .ngm-btn:hover{transform:translateY(-1px)!important}
    @media(max-width:600px){
      .ngm-btn{
        top:max(10px,env(safe-area-inset-top))!important;
        left:max(10px,env(safe-area-inset-left))!important;
        right:auto!important;
        width:44px!important;
        height:44px!important;
      }
    }
  `;
  document.head.appendChild(style);
};

const pinLeft=()=>{
  const mobile=window.innerWidth<=600;
  document.querySelectorAll('.ngm-btn').forEach(btn=>{
    btn.style.setProperty('position','fixed','important');
    btn.style.setProperty('top',mobile?'max(10px,env(safe-area-inset-top))':'max(12px,env(safe-area-inset-top))','important');
    btn.style.setProperty('left',mobile?'max(10px,env(safe-area-inset-left))':'max(12px,env(safe-area-inset-left))','important');
    btn.style.setProperty('right','auto','important');
    btn.style.setProperty('bottom','auto','important');
  });
};

const apply=()=>{installStyle();pinLeft();};
apply();
new MutationObserver(apply).observe(document.documentElement,{childList:true,subtree:true});
window.addEventListener('resize',pinLeft,{passive:true});
setTimeout(apply,0);
setTimeout(apply,250);
setTimeout(apply,1000);
})();