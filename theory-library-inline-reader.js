(()=>{
'use strict';
function install(){
  const root=document.getElementById('textbookLibrary');
  if(!root){setTimeout(install,120);return;}
  if(root.dataset.inlineReaderFixed==='1')return;
  root.dataset.inlineReaderFixed='1';

  const readerIds=['tbReader','tbMelodyReader','tbArrangementReader','tbSoundReader','tbTuningReader','tbStyleHistoryReader'];
  const chapterIds=['tbChapter','tbMelodyChapter','tbArrangementChapter','tbSoundChapter','tbTuningChapter','tbStyleHistoryChapter'];

  function visibleReader(){
    for(const id of readerIds){
      const el=document.getElementById(id);
      if(el&&!el.hidden)return el;
    }
    return null;
  }
  function readerParts(reader){
    if(!reader)return{};
    const head=reader.querySelector('[id$="ReaderHead"]')||reader.querySelector('#tbReaderHead');
    const body=reader.querySelector('[id$="ReaderBody"]')||reader.querySelector('#tbReaderBody');
    return{head,body};
  }
  function restoreChapter(row){
    chapterIds.forEach(id=>{const el=document.getElementById(id);if(el)el.hidden=true;});
    const chapter=row.closest('#tbChapter,#tbMelodyChapter,#tbArrangementChapter,#tbSoundChapter,#tbTuningChapter,#tbStyleHistoryChapter');
    if(chapter)chapter.hidden=false;
  }

  // 本来のReader処理は各項目を開く時に window.scrollTo({top:0}) を呼ぶ。
  // iPhoneで一瞬ページ上部へ飛ぶため、行クリックの処理中だけscrollToを抑止する。
  root.addEventListener('click',e=>{
    const row=e.target.closest('.tb-row');
    if(!row)return;
    const y=window.scrollY;
    const original=window.scrollTo;
    let active=true;
    try{
      window.scrollTo=function(){
        if(active)return;
        return original.apply(window,arguments);
      };
    }catch(_){ }
    setTimeout(()=>{
      active=false;
      try{window.scrollTo=original}catch(_){ }
      try{original.call(window,{top:y,behavior:'auto'})}catch(_){window.scrollTo(0,y)}
    },0);
  },true);

  root.addEventListener('click',e=>{
    const row=e.target.closest('.tb-row');
    if(!row)return;

    const already=row.nextElementSibling;
    if(already&&already.classList.contains('tb-inline-reader')){
      e.preventDefault();
      e.stopPropagation();
      already.remove();
      row.classList.remove('is-open');
      return;
    }

    const y=window.scrollY;
    root.querySelectorAll('.tb-inline-reader').forEach(x=>x.remove());
    root.querySelectorAll('.tb-row.is-open').forEach(x=>x.classList.remove('is-open'));

    // 行自身の本来のclickハンドラがReader本文を生成した後に、同じ位置へインライン表示する。
    setTimeout(()=>{
      const reader=visibleReader();
      const {head,body}=readerParts(reader);
      if(!reader||!body){
        restoreChapter(row);
        window.scrollTo({top:y,behavior:'auto'});
        return;
      }

      const box=document.createElement('div');
      box.className='tb-inline-reader';
      const headHtml=head?.innerHTML||'';
      const bodyHtml=body.innerHTML||'<p class="tb-inline-empty">本文を読み込めませんでした。</p>';
      box.innerHTML=`<div class="tb-inline-head">${headHtml}</div><div class="tb-inline-body">${bodyHtml}</div><button class="tb-inline-close" type="button">閉じる</button>`;
      row.insertAdjacentElement('afterend',box);
      row.classList.add('is-open');
      reader.hidden=true;
      restoreChapter(row);
      window.scrollTo({top:y,behavior:'auto'});
      box.querySelector('.tb-inline-close').onclick=ev=>{
        ev.preventDefault();ev.stopPropagation();
        box.remove();row.classList.remove('is-open');
      };
    },0);
  },false);

  root.addEventListener('click',e=>{
    const cat=e.target.closest('.tb-cat,.tb-catx');
    if(!cat)return;
    const y=window.scrollY;
    setTimeout(()=>window.scrollTo({top:y,behavior:'auto'}),0);
  },true);

  const st=document.createElement('style');
  st.textContent=`.tb-inline-reader{margin:0 0 10px;padding:15px;border:1px solid var(--line);border-top:0;border-radius:0 0 14px 14px;background:#fff;box-shadow:0 8px 20px rgba(80,60,30,.06)}.tb-row.is-open{background:#fffaf2;border-radius:12px 12px 0 0}.tb-inline-head .tb-breadcrumb{margin-top:0}.tb-inline-head h2{margin:4px 0 12px;font-size:1.12rem}.tb-inline-body{line-height:1.75}.tb-inline-body p,.tb-inline-body li,.tb-inline-body dd{font-size:.84rem;line-height:1.75}.tb-inline-body h3,.tb-inline-body h4{color:var(--accent);margin:16px 0 6px}.tb-inline-body ul{padding-left:1.25rem}.tb-inline-empty{padding:12px;color:var(--muted);background:var(--soft);border-radius:10px}.tb-inline-close{width:100%;margin-top:12px;padding:10px;border:1px solid var(--line);border-radius:10px;background:var(--soft);color:var(--accent);font-weight:900}@media(max-width:650px){.tb-inline-reader{padding:13px}.tb-inline-head h2{font-size:1.05rem}}`;
  document.head.appendChild(st);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(install,160));else setTimeout(install,160);
})();