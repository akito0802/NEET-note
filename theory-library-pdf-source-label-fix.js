(()=>{
'use strict';
function fix(){
 const reader=document.getElementById('tbReader');
 if(!reader)return;
 const crumb=reader.querySelector('#tbReaderHead .tb-breadcrumb')?.textContent||'';
 if(!crumb.includes('第16編'))return;
 const source=reader.querySelector('#tbReaderBody .gm-source');
 if(source){
  source.classList.remove('gm-source-web');
  const tag=source.querySelector('span');
  const label=source.querySelector('b');
  if(tag)tag.textContent='GENERAL MUSIC SOURCE';
  if(label)label.textContent='『一般音楽論』第六編 本文を要約・再構成';
 }
 const refs=reader.querySelector('#tbReaderBody .gm-refs b');
 if(refs)refs.textContent='PDF参照箇所';
}
function install(){
 const reader=document.getElementById('tbReader');
 if(!reader){setTimeout(install,120);return}
 new MutationObserver(fix).observe(reader,{childList:true,subtree:true,characterData:true});
 fix();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();