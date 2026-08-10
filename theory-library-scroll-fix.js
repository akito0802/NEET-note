(()=>{
'use strict';
function install(){
  const root=document.getElementById('textbookLibrary');
  if(!root){setTimeout(install,100);return;}

  const selector='.tb-cat,.tb-row,.tb-result,.tb-back,[data-back="home"],[data-back="chapter"]';

  root.addEventListener('click',e=>{
    const target=e.target.closest(selector);
    if(!target)return;
    const y=window.scrollY;
    requestAnimationFrame(()=>{
      requestAnimationFrame(()=>{
        window.scrollTo({top:y,left:0,behavior:'auto'});
      });
    });
  },true);

  const level=root.querySelector('#tbLevel');
  if(level){
    level.addEventListener('change',()=>{
      const y=window.scrollY;
      requestAnimationFrame(()=>requestAnimationFrame(()=>window.scrollTo({top:y,left:0,behavior:'auto'})));
    },true);
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();