(()=>{
'use strict';
let homeScrollY=0;
let lastCategoryId='';
function install(){
  const root=document.getElementById('textbookLibrary');
  if(!root){setTimeout(install,120);return;}

  root.addEventListener('click',e=>{
    const cat=e.target.closest('.tb-cat');
    if(cat){
      homeScrollY=window.scrollY;
      lastCategoryId=cat.dataset.id||'';
      return;
    }

    const backHome=e.target.closest('[data-back="home"]');
    if(backHome){
      const restore=()=>{
        const target=lastCategoryId?root.querySelector(`.tb-cat[data-id="${lastCategoryId}"]`):null;
        if(target){
          const r=target.getBoundingClientRect();
          const visible=r.top>=72&&r.bottom<=window.innerHeight-20;
          if(!visible){
            target.scrollIntoView({block:'center',behavior:'auto'});
          }else{
            window.scrollTo({top:homeScrollY,behavior:'auto'});
          }
        }else{
          window.scrollTo({top:homeScrollY,behavior:'auto'});
        }
      };
      requestAnimationFrame(()=>requestAnimationFrame(restore));
      setTimeout(restore,80);
    }
  },true);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();