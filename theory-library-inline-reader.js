(()=>{
'use strict';
function install(){
  const root=document.getElementById('textbookLibrary');
  if(!root){setTimeout(install,120);return;}
  root.addEventListener('click',e=>{
    const row=e.target.closest('.tb-row');
    if(!row)return;
    e.preventDefault();
    e.stopImmediatePropagation();
    const old=row.nextElementSibling;
    if(old&&old.classList.contains('tb-inline-reader')){old.remove();row.classList.remove('is-open');return;}
    root.querySelectorAll('.tb-inline-reader').forEach(x=>x.remove());
    root.querySelectorAll('.tb-row.is-open').forEach(x=>x.classList.remove('is-open'));
    const y=window.scrollY;
    if(typeof row.onclick==='function') row.onclick.call(row,e);
    const reader=root.querySelector('#tbReader');
    const chapter=root.querySelector('#tbChapter');
    const body=root.querySelector('#tbReaderBody');
    const head=root.querySelector('#tbReaderHead');
    if(!body||!head)return;
    const box=document.createElement('div');
    box.className='tb-inline-reader';
    box.innerHTML=`<div class="tb-inline-head">${head.innerHTML}</div><div class="tb-inline-body">${body.innerHTML}</div><button class="tb-inline-close" type="button">閉じる</button>`;
    row.insertAdjacentElement('afterend',box);
    row.classList.add('is-open');
    if(reader)reader.hidden=true;
    if(chapter)chapter.hidden=false;
    window.scrollTo({top:y,behavior:'auto'});
    box.querySelector('.tb-inline-close').onclick=()=>{box.remove();row.classList.remove('is-open')};
  },true);
  root.addEventListener('click',e=>{
    const cat=e.target.closest('.tb-cat');
    if(!cat)return;
    const y=window.scrollY;
    setTimeout(()=>window.scrollTo({top:y,behavior:'auto'}),0);
  },true);
  const st=document.createElement('style');
  st.textContent=`.tb-inline-reader{margin:0 0 10px;padding:15px;border:1px solid var(--line);border-top:0;border-radius:0 0 14px 14px;background:#fff;box-shadow:0 8px 20px rgba(80,60,30,.06)}.tb-row.is-open{background:#fffaf2;border-radius:12px 12px 0 0}.tb-inline-head .tb-breadcrumb{margin-top:0}.tb-inline-head h2{margin:4px 0 12px;font-size:1.12rem}.tb-inline-body{line-height:1.75}.tb-inline-body p,.tb-inline-body li,.tb-inline-body dd{font-size:.84rem;line-height:1.75}.tb-inline-body h4{color:var(--accent);margin:16px 0 6px}.tb-inline-close{width:100%;margin-top:12px;padding:10px;border:1px solid var(--line);border-radius:10px;background:var(--soft);color:var(--accent);font-weight:900}@media(max-width:650px){.tb-inline-reader{padding:13px}.tb-inline-head h2{font-size:1.05rem}}`;
  document.head.appendChild(st);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(install,160));else setTimeout(install,160);
})();