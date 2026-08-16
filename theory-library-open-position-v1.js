(()=>{
'use strict';

function root(){return document.getElementById('textbookLibrary');}
function home(){return root()?.querySelector('#tbHome');}
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
let timer=0;
let real={};

function rawScrollTo(y){
  const fn=real.scrollTo||window.scrollTo;
  const sc=document.scrollingElement||document.documentElement;
  const max=Math.max(0,(sc?.scrollHeight||0)-window.innerHeight);
  const target=Math.max(0,Math.min(y,max));
  try{fn.call(window,{top:target,behavior:'auto'});}catch(_){try{fn.call(window,0,target);}catch(__){}}
}

function align(){
  if(!active)return;
  const back=visibleContentsBack();
  if(!back)return;
  const box=back.getBoundingClientRect();
  // スクショと同じく「目次に戻る」の上端を画面上から約100pxに合わせる。
  rawScrollTo(window.scrollY+box.top-100);
}

function unlock(){
  clearTimeout(timer);
  align();
  try{if(real.scrollTo)window.scrollTo=real.scrollTo;}catch(_){ }
  try{if(real.scroll)window.scroll=real.scroll;}catch(_){ }
  try{if(real.scrollBy)window.scrollBy=real.scrollBy;}catch(_){ }
  try{if(real.scrollIntoView)Element.prototype.scrollIntoView=real.scrollIntoView;}catch(_){ }
  real={};active=false;
}

function lockAndAlign(){
  if(active)unlock();
  active=true;
  real={scrollTo:window.scrollTo,scroll:window.scroll,scrollBy:window.scrollBy,scrollIntoView:Element.prototype.scrollIntoView};
  // 第1〜21編それぞれに残っているトップスクロールを章切替中だけ止める。
  try{window.scrollTo=()=>{};}catch(_){ }
  try{window.scroll=()=>{};}catch(_){ }
  try{window.scrollBy=()=>{};}catch(_){ }
  try{Element.prototype.scrollIntoView=function(){};}catch(_){ }
  [0,16,40,80,140,220,320,460].forEach(ms=>setTimeout(align,ms));
  requestAnimationFrame(align);
  requestAnimationFrame(()=>requestAnimationFrame(align));
  timer=setTimeout(unlock,560);
}

document.addEventListener('click',e=>{
  const btn=e.target.closest('button');
  if(!isChapterCard(btn))return;
  lockAndAlign();
},true);
})();