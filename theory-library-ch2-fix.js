(()=>{
'use strict';
let forcing=false;

function installStyle(){
  if(document.getElementById('tbCh2FixStyle'))return;
  const st=document.createElement('style');
  st.id='tbCh2FixStyle';
  st.textContent='#tbHome .tb-cat[data-id="major"]{position:relative;z-index:2;pointer-events:auto!important;touch-action:manipulation}';
  document.head.appendChild(st);
}

function handle(e){
  if(forcing)return;
  const card=e.target.closest?.('#tbHome .tb-cat[data-id="major"]');
  if(!card)return;
  const home=document.getElementById('tbHome');
  if(!home||home.hidden)return;
  const nativeOpen=card.onclick;
  if(typeof nativeOpen!=='function')return;

  // 第2編だけは既存のonclickをここから確実に実行する。
  // 他の後付け処理にclickが吸われても章を開けるようにする。
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  forcing=true;
  try{nativeOpen.call(card,e)}finally{forcing=false}
}

function install(){
  installStyle();
  document.addEventListener('click',handle,true);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
