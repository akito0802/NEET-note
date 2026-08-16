(()=>{
'use strict';
function install(){
  const root=document.getElementById('textbookLibrary');
  if(!root){setTimeout(install,120);return;}
  if(root.dataset.inlineReaderFixed==='4')return;
  root.dataset.inlineReaderFixed='4';

  const map={
    tbChapter:'tbReader',
    tbMelodyChapter:'tbMelodyReader',
    tbArrangementChapter:'tbArrangementReader',
    tbSoundChapter:'tbSoundReader',
    tbTuningChapter:'tbTuningReader',
    tbStyleHistoryChapter:'tbStyleHistoryReader'
  };
  const chapterNoById={
    tbMelodyChapter:17,
    tbArrangementChapter:18,
    tbSoundChapter:19,
    tbTuningChapter:20,
    tbStyleHistoryChapter:21
  };
  const chapters=Object.keys(map);
  const openState=new WeakMap();

  function sourceChapter(row){
    for(const id of chapters){
      const el=document.getElementById(id);
      if(el&&el.contains(row))return el;
    }
    return null;
  }
  function chapterNo(ch){
    if(!ch)return 0;
    if(chapterNoById[ch.id])return chapterNoById[ch.id];
    const head=ch.querySelector('#tbChapterHead,.tb-ch-title')||ch;
    const m=(head.textContent||'').match(/第\s*(\d+)\s*編/);
    return m?Number(m[1]):0;
  }
  function readerFor(row){
    const ch=sourceChapter(row);
    return ch?document.getElementById(map[ch.id]):null;
  }
  function parts(reader){
    if(!reader)return{};
    return{
      head:reader.querySelector('[id$="ReaderHead"]')||reader.querySelector('#tbReaderHead'),
      body:reader.querySelector('[id$="ReaderBody"]')||reader.querySelector('#tbReaderBody')
    };
  }
  function realScroll(fn,y){
    if(typeof fn!=='function')return;
    try{fn.call(window,{top:y,behavior:'auto'});}catch(_){
      try{fn.call(window,0,y);}catch(__){}
    }
  }
  function keepRowAtSamePlace(row,state){
    if(!state||state.no<13||!Number.isFinite(state.top))return;
    const nowTop=row.getBoundingClientRect().top;
    if(!Number.isFinite(nowTop))return;
    const target=Math.max(0,window.scrollY+nowTop-state.top);
    realScroll(state.originalScrollTo,target);
  }
  function closeInline(row,ch,box){
    const top=row.getBoundingClientRect().top;
    const y=window.scrollY;
    const reader=readerFor(row);
    if(box)box.remove();
    row.classList.remove('is-open');
    ch.hidden=false;
    ch.classList.remove('tb-inline-keep-chapter');
    if(reader)reader.hidden=true;
    requestAnimationFrame(()=>{
      const now=row.getBoundingClientRect().top;
      const target=Number.isFinite(top)&&Number.isFinite(now)?Math.max(0,window.scrollY+now-top):y;
      try{window.scrollTo({top:target,behavior:'auto'})}catch(_){window.scrollTo(0,target)}
    });
  }

  // Capture: remember the tapped lesson's exact viewport position before native readers run.
  root.addEventListener('click',e=>{
    const row=e.target.closest('.tb-row');
    if(!row)return;
    const ch=sourceChapter(row);
    if(!ch)return;

    const existing=row.nextElementSibling;
    if(existing&&existing.classList.contains('tb-inline-reader')){
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      closeInline(row,ch,existing);
      return;
    }

    const original=window.scrollTo;
    openState.set(row,{
      y:window.scrollY,
      top:row.getBoundingClientRect().top,
      no:chapterNo(ch),
      originalScrollTo:original
    });
    ch.classList.add('tb-inline-keep-chapter');

    // Absorb each chapter's native top() while the click is being handled.
    try{
      window.scrollTo=function(){return undefined;};
      queueMicrotask(()=>{try{window.scrollTo=original}catch(_){}});
    }catch(_){ }
  },true);

  // Bubble: native handlers have generated the lesson body; inline it under the tapped row.
  root.addEventListener('click',e=>{
    const row=e.target.closest('.tb-row');
    if(!row)return;
    const ch=sourceChapter(row);
    if(!ch)return;
    const state=openState.get(row)||{
      y:window.scrollY,
      top:row.getBoundingClientRect().top,
      no:chapterNo(ch),
      originalScrollTo:window.scrollTo
    };

    root.querySelectorAll('.tb-inline-reader').forEach(x=>x.remove());
    root.querySelectorAll('.tb-row.is-open').forEach(x=>x.classList.remove('is-open'));

    const reader=readerFor(row);
    const {head,body}=parts(reader);
    if(!reader||!body){
      ch.hidden=false;
      ch.classList.remove('tb-inline-keep-chapter');
      openState.delete(row);
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
    ch.hidden=false;
    ch.classList.remove('tb-inline-keep-chapter');

    if(state.no>=13){
      // Chapters 13-21: keep the tapped row at exactly the same viewport height.
      keepRowAtSamePlace(row,state);
      requestAnimationFrame(()=>keepRowAtSamePlace(row,state));
      requestAnimationFrame(()=>requestAnimationFrame(()=>keepRowAtSamePlace(row,state)));
      setTimeout(()=>keepRowAtSamePlace(row,state),80);
    }else{
      // Preserve the existing chapters 1-12 behavior.
      realScroll(state.originalScrollTo,state.y);
    }
    openState.delete(row);

    box.querySelector('.tb-inline-close').onclick=ev=>{
      ev.preventDefault();
      ev.stopPropagation();
      closeInline(row,ch,box);
    };
  },false);

  const st=document.createElement('style');
  st.textContent=`.tb-inline-keep-chapter[hidden]{display:block!important}.tb-inline-reader{margin:0 0 10px;padding:15px;border:1px solid var(--line);border-top:0;border-radius:0 0 14px 14px;background:#fff;box-shadow:0 8px 20px rgba(80,60,30,.06)}.tb-row.is-open{background:#fffaf2;border-radius:12px 12px 0 0}.tb-inline-head .tb-breadcrumb{margin-top:0}.tb-inline-head h2{margin:4px 0 12px;font-size:1.12rem}.tb-inline-body{line-height:1.75}.tb-inline-body p,.tb-inline-body li,.tb-inline-body dd{font-size:.84rem;line-height:1.75}.tb-inline-body h3,.tb-inline-body h4{color:var(--accent);margin:16px 0 6px}.tb-inline-body ul{padding-left:1.25rem}.tb-inline-empty{padding:12px;color:var(--muted);background:var(--soft);border-radius:10px}.tb-inline-close{width:100%;margin-top:12px;padding:10px;border:1px solid var(--line);border-radius:10px;background:var(--soft);color:var(--accent);font-weight:900}@media(max-width:650px){.tb-inline-reader{padding:13px}.tb-inline-head h2{font-size:1.05rem}}`;
  document.head.appendChild(st);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(install,160));else setTimeout(install,160);
})();
