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

let active=false;
let restoreTimer=0;
let realScrollTo=null;
let realScroll=null;
let realScrollBy=null;
let realScrollIntoView=null;

function visibleContentsBack(){
  const root=getRoot();
  if(!root)return null;
  const buttons=[...root.querySelectorAll('.tb-back')];
  return buttons.find(btn=>{
    const text=(btn.textContent||'').replace(/\s+/g,'');
    if(!(text.includes('目次へ')||text.includes('目次に戻る')))return false;
    const box=btn.getBoundingClientRect();
    const parentHidden=btn.closest('[hidden]');
    return !parentHidden && box.width>0 && box.height>0;
  })||null;
}

function scrollToContentsBack(){
  if(!active||!realScrollTo)return;
  const back=visibleContentsBack();
  if(!back)return;
  const box=back.getBoundingClientRect();
  // スクショの見え方に合わせ、目次ボタンを画面上部から約100pxに置く。
  const target=Math.max(0,window.scrollY+box.top-100);
  try{realScrollTo.call(window,{top:target,behavior:'auto'});}catch(_){
    try{realScrollTo.call(window,0,target);}catch(__){ }
  }
}

function unlock(){
  clearTimeout(restoreTimer);
  scrollToContentsBack();
  try{if(realScrollTo)window.scrollTo=realScrollTo;}catch(_){ }
  try{if(realScroll)window.scroll=realScroll;}catch(_){ }
  try{if(realScrollBy)window.scrollBy=realScrollBy;}catch(_){ }
  try{if(realScrollIntoView)Element.prototype.scrollIntoView=realScrollIntoView;}catch(_){ }
  active=false;
  realScrollTo=realScroll=realScrollBy=realScrollIntoView=null;
}

function openAtChapterTop(){
  if(active)unlock();
  active=true;

  realScrollTo=window.scrollTo;
  realScroll=window.scroll;
  realScrollBy=window.scrollBy;
  realScrollIntoView=Element.prototype.scrollIntoView;

  // 既存の各章処理に残る scrollTo(0) は、このクリック中だけ無効化する。
  try{window.scrollTo=()=>{};}catch(_){ }
  try{window.scroll=()=>{};}catch(_){ }
  try{window.scrollBy=()=>{};}catch(_){ }
  try{Element.prototype.scrollIntoView=function(){};}catch(_){ }

  // DOM切替後に「目次へ」ボタンを基準に位置合わせする。
  requestAnimationFrame(scrollToContentsBack);
  requestAnimationFrame(()=>requestAnimationFrame(scrollToContentsBack));
  setTimeout(scrollToContentsBack,40);
  setTimeout(scrollToContentsBack,90);
  setTimeout(scrollToContentsBack,160);
  setTimeout(scrollToContentsBack,260);
  restoreTimer=setTimeout(unlock,360);
}

document.addEventListener('click',e=>{
  const btn=e.target.closest('button');
  if(!isChapterCard(btn))return;
  openAtChapterTop();
},true);

})();
