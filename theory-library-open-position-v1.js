(()=>{
'use strict';

function root(){return document.getElementById('textbookLibrary');}
function home(){return root()?.querySelector('#tbHome');}
function chapterNo(btn){
  const n=(btn?.querySelector?.('.tb-no')?.textContent||btn?.textContent||'').match(/第\s*(\d+)\s*編/);
  return n?Number(n[1]):0;
}
function isChapterCard(btn){
  const h=home();
  if(!h||h.hidden||!btn||!h.contains(btn))return false;
  if(btn.matches('.tb-cat,.tb-catx'))return true;
  if(['tbMelodyCard','tbArrangementCard','tbSoundCard','tbTuningCard','tbStyleHistoryCard'].includes(btn.id))return true;
  return /第\s*\d+編/.test(btn.textContent||'');
}

const chapterIds=[
  'tbChapter','tbMelodyChapter','tbArrangementChapter','tbSoundChapter','tbTuningChapter','tbStyleHistoryChapter'
];

function visibleChapter(){
  const r=root();
  if(!r)return null;
  for(const id of chapterIds){
    const el=r.querySelector('#'+id);
    if(!el||el.hidden||el.closest('[hidden]'))continue;
    const box=el.getBoundingClientRect();
    if(box.width>0&&box.height>0)return el;
  }
  return null;
}

function visibleContentsBack(){
  const ch=visibleChapter();
  if(!ch)return null;
  const buttons=[...ch.querySelectorAll('.tb-back,button,a')];
  return buttons.find(btn=>{
    const t=(btn.textContent||'').replace(/\s+/g,'');
    if(!(t.includes('目次へ')||t.includes('目次に戻る')))return false;
    const box=btn.getBoundingClientRect();
    return box.width>0&&box.height>0&&!btn.closest('[hidden]');
  })||null;
}

let active=false;
let activeNo=0;
let timer=0;
let real={};
let contentsDocTop=0;

function rawScrollTo(y){
  const fn=real.scrollTo||window.scrollTo;
  const sc=document.scrollingElement||document.documentElement;
  const max=Math.max(0,(sc?.scrollHeight||0)-window.innerHeight);
  const target=Math.max(0,Math.min(y,max));
  try{fn.call(window,{top:target,behavior:'auto'});}catch(_){try{fn.call(window,0,target);}catch(__){}}
}

function defaultBackTop(back){
  const style=getComputedStyle(back);
  const top=parseFloat(style.top);
  if((style.position==='sticky'||style.position==='fixed')&&Number.isFinite(top))return top;
  return 0;
}

function captureContentsPosition(){
  const h=home();
  if(!h)return;
  contentsDocTop=Math.max(0,window.scrollY+h.getBoundingClientRect().top);
}

function align(){
  if(!active)return;

  // 第13〜21編は、章を開く直前に「目次」が始まっていた位置へ戻す。
  // ライブラリ全体の先頭ではなく #tbHome の位置を基準にする。
  if(activeNo>=13){
    const ch=visibleChapter();
    if(!ch)return;
    rawScrollTo(contentsDocTop);
    return;
  }

  // 第1〜12編は既存位置を維持。
  const back=visibleContentsBack();
  if(!back)return;
  const box=back.getBoundingClientRect();
  rawScrollTo(window.scrollY+box.top-defaultBackTop(back));
}

function unlock(){
  clearTimeout(timer);
  align();
  try{if(real.scrollTo)window.scrollTo=real.scrollTo;}catch(_){ }
  try{if(real.scroll)window.scroll=real.scroll;}catch(_){ }
  try{if(real.scrollBy)window.scrollBy=real.scrollBy;}catch(_){ }
  try{if(real.scrollIntoView)Element.prototype.scrollIntoView=real.scrollIntoView;}catch(_){ }
  real={};active=false;activeNo=0;
}

function lockAndAlign(no){
  if(active)unlock();
  active=true;
  activeNo=no;
  real={scrollTo:window.scrollTo,scroll:window.scroll,scrollBy:window.scrollBy,scrollIntoView:Element.prototype.scrollIntoView};
  try{window.scrollTo=()=>{};}catch(_){ }
  try{window.scroll=()=>{};}catch(_){ }
  try{window.scrollBy=()=>{};}catch(_){ }
  try{Element.prototype.scrollIntoView=function(){};}catch(_){ }
  [0,16,40,80,140,220,320,460].forEach(ms=>setTimeout(align,ms));
  requestAnimationFrame(align);
  requestAnimationFrame(()=>requestAnimationFrame(align));
  timer=setTimeout(unlock,560);
}

// clickより前に、目次が実際にあった文書上の位置を保存する。
document.addEventListener('pointerdown',e=>{
  const btn=e.target.closest('button');
  if(!isChapterCard(btn))return;
  captureContentsPosition();
},true);

document.addEventListener('click',e=>{
  const btn=e.target.closest('button');
  if(!isChapterCard(btn))return;
  // キーボード操作などpointerdownが無い場合にも対応。
  if(!contentsDocTop)captureContentsPosition();
  lockAndAlign(chapterNo(btn));
},true);
})();