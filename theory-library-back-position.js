(()=>{
'use strict';
let homeScrollY=0;
let lastCardIndex=-1;
let lastCardId='';

function install(){
  const root=document.getElementById('textbookLibrary');
  if(!root){setTimeout(install,120);return;}
  if(root.dataset.backPositionV3==='1')return;
  root.dataset.backPositionV3='1';

  const home=root.querySelector('#tbHome');
  if(!home)return;

  const homeCards=()=>[...home.querySelectorAll('button')].filter(b=>
    b.matches('.tb-cat,.tb-catx,[class*="card"]') || /第\s*\d+編/.test(b.textContent||'')
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

  function showContentsOnly(){
    const ids=[
      'tbChapter','tbReader','tbResults',
      'tbMelodyChapter','tbMelodyReader',
      'tbArrangementChapter','tbArrangementReader',
      'tbSoundChapter','tbSoundReader',
      'tbTuningChapter','tbTuningReader',
      'tbStyleHistoryChapter','tbStyleHistoryReader'
    ];
    ids.forEach(id=>{const el=root.querySelector('#'+id);if(el)el.hidden=true;});
    home.hidden=false;
  }

  function restorePosition(){
    const target=rememberedCard();
    let y=homeScrollY;
    if(target){
      // 元のスクロール位置が不自然な場合でも、その章カード付近を基準に戻す。
      const r=target.getBoundingClientRect();
      const targetDocY=window.scrollY+r.top;
      if(!Number.isFinite(y)||y<0)y=Math.max(0,targetDocY-window.innerHeight*.32);
    }
    try{window.scrollTo({top:y,behavior:'auto'})}catch(_){window.scrollTo(0,y)}
  }

  // 目次の章カードを開く直前の位置を記憶。
  root.addEventListener('click',e=>{
    if(home.hidden)return;
    const card=e.target.closest('button');
    if(card&&home.contains(card)&&homeCards().includes(card))rememberCard(card);
  },true);

  // 「目次へ」は元の各章ハンドラへ渡さず、ここだけで処理する。
  root.addEventListener('click',e=>{
    const back=e.target.closest('.tb-back');
    if(!isContentsBack(back))return;

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    showContentsOnly();
    restorePosition();
    requestAnimationFrame(restorePosition);
    requestAnimationFrame(()=>requestAnimationFrame(restorePosition));
    setTimeout(restorePosition,80);
    setTimeout(restorePosition,220);
  },true);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();