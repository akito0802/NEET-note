(()=>{
'use strict';
function anchorLibrary(){
  const root=document.getElementById('textbookLibrary');
  if(!root)return;
  const top=root.getBoundingClientRect().top+window.scrollY-8;
  window.scrollTo({top,behavior:'smooth'});
}
function install(){
  const root=document.getElementById('textbookLibrary');
  if(!root){setTimeout(install,120);return;}
  root.addEventListener('click',e=>{
    const target=e.target.closest('.tb-cat,.tb-row,.tb-result,.tb-back');
    if(!target)return;
    setTimeout(anchorLibrary,20);
  });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();