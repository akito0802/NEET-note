(()=>{
'use strict';

function getRoot(){return document.getElementById('textbookLibrary');}
function getHome(){return getRoot()?.querySelector('#tbHome');}
function isChapterCard(btn){
  const home=getHome();
  if(!home||home.hidden||!btn||!home.contains(btn))return false;
  if(btn.matches('.tb-cat,.tb-catx'))return true;
  return /第\s*\d+編/.test((btn.textContent||''));
}

let lock=false;
let savedY=0;
let savedTop=0;
let savedCard=null;
let restoreTimer=0;

function safeScrollTo(y){
  const scroller=document.scrollingElement||document.documentElement;
  const max=Math.max(0,(scroller?.scrollHeight||0)-window.innerHeight);
  const target=Math.max(0,Math.min(y,max));
  try{window.__neetRealScrollTo?.call(window,{top:target,behavior:'auto'});}catch(_){
    try{window.__neetRealScrollTo?.call(window,0,target);}catch(__){ }
  }
}

function restorePosition(){
  if(!lock)return;
  let targetY=savedY;
  if(savedCard&&document.contains(savedCard)){
    const nowTop=savedCard.getBoundingClientRect().top;
    if(Number.isFinite(nowTop)&&Number.isFinite(savedTop)){
      targetY=window.scrollY+nowTop-savedTop;
    }
  }
  safeScrollTo(targetY);
}

function unlock(){
  clearTimeout(restoreTimer);
  restorePosition();
  if(window.__neetRealScrollTo)window.scrollTo=window.__neetRealScrollTo;
  if(window.__neetRealScroll)window.scroll=window.__neetRealScroll;
  if(window.__neetRealScrollBy)window.scrollBy=window.__neetRealScrollBy;
  if(Element.prototype.__neetRealScrollIntoView)Element.prototype.scrollIntoView=Element.prototype.__neetRealScrollIntoView;
  delete window.__neetRealScrollTo;
  delete window.__neetRealScroll;
  delete window.__neetRealScrollBy;
  delete Element.prototype.__neetRealScrollIntoView;
  lock=false;
}

function lockScroll(card){
  if(lock)unlock();
  savedCard=card;
  savedY=window.scrollY;
  savedTop=card.getBoundingClientRect().top;
  lock=true;

  window.__neetRealScrollTo=window.scrollTo;
  window.__neetRealScroll=window.scroll;
  window.__neetRealScrollBy=window.scrollBy;
  Element.prototype.__neetRealScrollIntoView=Element.prototype.scrollIntoView;

  // 各編の showChapter() に残る scrollTo(0) / scrollIntoView を、この章選択中だけ止める。
  try{window.scrollTo=()=>{};}catch(_){ }
  try{window.scroll=()=>{};}catch(_){ }
  try{window.scrollBy=()=>{};}catch(_){ }
  try{Element.prototype.scrollIntoView=function(){};}catch(_){ }

  // DOM切替後も、章を押した時のスクロール位置を維持する。
  requestAnimationFrame(restorePosition);
  requestAnimationFrame(()=>requestAnimationFrame(restorePosition));
  setTimeout(restorePosition,40);
  setTimeout(restorePosition,100);
  setTimeout(restorePosition,180);
  setTimeout(restorePosition,300);
  restoreTimer=setTimeout(unlock,420);
}

// captureで先にロックし、その後は既存の章表示ハンドラをそのまま動かす。
document.addEventListener('click',e=>{
  const btn=e.target.closest('button');
  if(!isChapterCard(btn))return;
  lockScroll(btn);
},true);

})();
