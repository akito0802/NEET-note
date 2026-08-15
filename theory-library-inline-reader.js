(()=>{
'use strict';
function install(){
  const root=document.getElementById('textbookLibrary');
  if(!root){setTimeout(install,120);return;}
  if(root.dataset.inlineReaderFixed==='2')return;
  root.dataset.inlineReaderFixed='2';

  const map={
    tbChapter:'tbReader',
    tbMelodyChapter:'tbMelodyReader',
    tbArrangementChapter:'tbArrangementReader',
    tbSoundChapter:'tbSoundReader',
    tbTuningChapter:'tbTuningReader',
    tbStyleHistoryChapter:'tbStyleHistoryReader'
  };
  const chapters=Object.keys(map);

  function sourceChapter(row){
    for(const id of chapters){const el=document.getElementById(id);if(el&&el.contains(row))return el;}
    return null;
  }
  function readerFor(row){
    const ch=sourceChapter(row);return ch?document.getElementById(map[ch.id]):null;
  }
  function parts(reader){
    if(!reader)return{};
    return{
      head:reader.querySelector('[id$="ReaderHead"]')||reader.querySelector('#tbReaderHead'),
      body:reader.querySelector('[id$="ReaderBody"]')||reader.querySelector('#tbReaderBody')
    };
  }

  // capture段階で現在位置と元章を保持する。
  // 元のshowReaderがchapter.hidden=trueにしてもCSSで一覧を消さず、レイアウトを維持する。
  root.addEventListener('click',e=>{
    const row=e.target.closest('.tb-row');
    if(!row)return;
    const ch=sourceChapter(row);
    if(!ch)return;
    row.dataset.inlineY=String(window.scrollY);
    ch.classList.add('tb-inline-keep-chapter');

    // 各Reader内の top() が呼ぶscrollToを、このクリック処理中だけ吸収する。
    const original=window.scrollTo;
    try{
      window.scrollTo=function(){ return undefined; };
      queueMicrotask(()=>{ try{window.scrollTo=original}catch(_){ } });
    }catch(_){ }
  },true);

  // bubble段階では各行の本来のonclick/addEventListenerが既に本文を生成済み。
  // setTimeoutを使わず同じイベント内でインライン化するため、上へ飛ぶフレームを作らない。
  root.addEventListener('click',e=>{
    const row=e.target.closest('.tb-row');
    if(!row)return;
    const ch=sourceChapter(row);
    if(!ch)return;

    const existing=row.nextElementSibling;
    if(existing&&existing.classList.contains('tb-inline-reader')){
      e.preventDefault();
      existing.remove();
      row.classList.remove('is-open');
      ch.hidden=false;
      ch.classList.remove('tb-inline-keep-chapter');
      return;
    }

    root.querySelectorAll('.tb-inline-reader').forEach(x=>x.remove());
    root.querySelectorAll('.tb-row.is-open').forEach(x=>x.classList.remove('is-open'));

    const reader=readerFor(row);
    const {head,body}=parts(reader);
    if(!reader||!body){
      ch.hidden=false;
      ch.classList.remove('tb-inline-keep-chapter');
      return;
    }

    const box=document.createElement('div');
    box.className='tb-inline-reader';
    const headHtml=head?.innerHTML||'';
    const bodyHtml=body.innerHTML||'<p class="tb-inline-empty">本文を読み込めませんでした。</p>';
    box.innerHTML=`<div class="tb-inline-head">${headHtml}</div><div class="tb-inline-body">${bodyHtml}</div><button class="tb-inline-close" type="button">閉じる</button>`;
    row.insertAdjacentElement('afterend',box);
    row.classList.add('is-open');

    // 元Readerは表示せず、一覧を即時復元。ここまで同一イベント内なのでレイアウトが上へ潰れない。
    reader.hidden=true;
    ch.hidden=false;
    ch.classList.remove('tb-inline-keep-chapter');

    // Safariがネイティブスクロールを先に処理した場合も、paint前に同じ位置へ戻す。
    const y=Number(row.dataset.inlineY||window.scrollY);
    try{window.scrollTo(0,y)}catch(_){ }
    delete row.dataset.inlineY;

    box.querySelector('.tb-inline-close').onclick=ev=>{
      ev.preventDefault();ev.stopPropagation();
      box.remove();row.classList.remove('is-open');
    };
  },false);

  root.addEventListener('click',e=>{
    const cat=e.target.closest('.tb-cat,.tb-catx');
    if(!cat)return;
    // カテゴリ移動は従来仕様を維持。
  },true);

  const st=document.createElement('style');
  st.textContent=`.tb-inline-keep-chapter[hidden]{display:block!important}.tb-inline-reader{margin:0 0 10px;padding:15px;border:1px solid var(--line);border-top:0;border-radius:0 0 14px 14px;background:#fff;box-shadow:0 8px 20px rgba(80,60,30,.06)}.tb-row.is-open{background:#fffaf2;border-radius:12px 12px 0 0}.tb-inline-head .tb-breadcrumb{margin-top:0}.tb-inline-head h2{margin:4px 0 12px;font-size:1.12rem}.tb-inline-body{line-height:1.75}.tb-inline-body p,.tb-inline-body li,.tb-inline-body dd{font-size:.84rem;line-height:1.75}.tb-inline-body h3,.tb-inline-body h4{color:var(--accent);margin:16px 0 6px}.tb-inline-body ul{padding-left:1.25rem}.tb-inline-empty{padding:12px;color:var(--muted);background:var(--soft);border-radius:10px}.tb-inline-close{width:100%;margin-top:12px;padding:10px;border:1px solid var(--line);border-radius:10px;background:var(--soft);color:var(--accent);font-weight:900}@media(max-width:650px){.tb-inline-reader{padding:13px}.tb-inline-head h2{font-size:1.05rem}}`;
  document.head.appendChild(st);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(install,160));else setTimeout(install,160);
})();