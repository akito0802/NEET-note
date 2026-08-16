(()=>{
'use strict';
let homeScrollY=0;
let lastCardIndex=-1;
let lastCardId='';

function install(){
  const root=document.getElementById('textbookLibrary');
  if(!root){setTimeout(install,120);return;}
  if(root.dataset.backPositionV2==='1')return;
  root.dataset.backPositionV2='1';

  const home=()=>root.querySelector('#tbHome');
  const homeCards=()=>[...(home()?.querySelectorAll('button')||[])].filter(b=>
    b.matches('.tb-cat,.tb-catx,[class*="card"]') ||
    /第\s*\d+編/.test(b.textContent||'')
  );

  function rememberCard(card){
    homeScrollY=window.scrollY;
    const cards=homeCards();
    lastCardIndex=cards.indexOf(card);
    lastCardId=card.dataset.id||card.id||'';
  }

  function rememberedCard(){
    const cards=homeCards();
    if(lastCardId){
      const byId=cards.find(c=>c.dataset.id===lastCardId||c.id===lastCardId);
      if(byId)return byId;
    }
    return lastCardIndex>=0?cards[lastCardIndex]||null:null;
  }

  function isContentsBack(el){
    if(!el?.matches?.('.tb-back'))return false;
    const text=(el.textContent||'').replace(/\s+/g,'');
    if(text.includes('目次へ')||text.includes('目次に戻る'))return true;
    return el.dataset.back==='home' ||
      el.dataset.melodyBack==='home' ||
      el.dataset.arrangementBack==='home' ||
      el.dataset.soundBack==='home' ||
      el.dataset.tuningBack==='home' ||
      el.dataset.styleHistoryBack==='home';
  }

  root.addEventListener('click',e=>{
    const h=home();
    if(h&&!h.hidden){
      const card=e.target.closest('button');
      if(card&&h.contains(card)&&homeCards().includes(card)){
        rememberCard(card);
        return;
      }
    }

    const back=e.target.closest('.tb-back');
    if(!isContentsBack(back))return;

    // 各章固有の showHome() が呼ぶ scrollTo(0) を、このクリック中だけ無効化する。
    const originalScrollTo=window.scrollTo;
    try{
      window.scrollTo=function(){return undefined;};
      queueMicrotask(()=>{try{window.scrollTo=originalScrollTo}catch(_){}});
    }catch(_){ }

    const restore=()=>{
      const target=rememberedCard();
      if(target){
        const r=target.getBoundingClientRect();
        const topPad=90;
        const bottomPad=24;
        if(r.top<topPad||r.bottom>window.innerHeight-bottomPad){
          const y=Math.max(0,window.scrollY+r.top-window.innerHeight*0.34);
          try{originalScrollTo.call(window,{top:y,behavior:'auto'})}catch(_){originalScrollTo.call(window,0,y)}
        }else{
          try{originalScrollTo.call(window,{top:homeScrollY,behavior:'auto'})}catch(_){originalScrollTo.call(window,0,homeScrollY)}
        }
      }else{
        try{originalScrollTo.call(window,{top:homeScrollY,behavior:'auto'})}catch(_){originalScrollTo.call(window,0,homeScrollY)}
      }
    };

    requestAnimationFrame(()=>requestAnimationFrame(restore));
    setTimeout(restore,90);
    setTimeout(restore,220);
  },true);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();