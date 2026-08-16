(()=>{
'use strict';

let lastY=0;
let lastTop=120;
let lastId='';
let lastIndex=-1;

function root(){return document.getElementById('textbookLibrary')}
function home(){return root()?.querySelector('#tbHome')}
function homeCards(){
  const h=home();
  if(!h)return[];
  return [...h.querySelectorAll('button')].filter(b=>
    b.matches('.tb-cat,.tb-catx') ||
    /^第\s*\d+編/.test((b.textContent||'').trim()) ||
    /第\s*\d+編/.test(b.textContent||'')
  );
}
function remember(card){
  if(!card)return;
  const cards=homeCards();
  lastY=window.scrollY;
  lastTop=card.getBoundingClientRect().top;
  lastId=card.id||card.dataset.id||'';
  lastIndex=cards.indexOf(card);
  try{
    sessionStorage.setItem('neet-theory-return',JSON.stringify({y:lastY,top:lastTop,id:lastId,index:lastIndex}));
  }catch(_){ }
}
function loadState(){
  try{
    const s=JSON.parse(sessionStorage.getItem('neet-theory-return')||'null');
    if(s&&Number.isFinite(s.y)){
      lastY=s.y;
      lastTop=Number.isFinite(s.top)?s.top:120;
      lastId=s.id||'';
      lastIndex=Number.isInteger(s.index)?s.index:-1;
    }
  }catch(_){ }
}
function rememberedCard(){
  const cards=homeCards();
  if(lastId){
    const byId=cards.find(c=>c.id===lastId||c.dataset.id===lastId);
    if(byId)return byId;
  }
  return lastIndex>=0?cards[lastIndex]||null:null;
}
function showHomeOnly(){
  const r=root(),h=home();
  if(!r||!h)return;
  const ids=[
    'tbChapter','tbReader','tbResults',
    'tbMelodyChapter','tbMelodyReader',
    'tbArrangementChapter','tbArrangementReader',
    'tbSoundChapter','tbSoundReader',
    'tbTuningChapter','tbTuningReader',
    'tbStyleHistoryChapter','tbStyleHistoryReader'
  ];
  ids.forEach(id=>{const el=r.querySelector('#'+id);if(el)el.hidden=true;});
  r.querySelectorAll('.tb-inline-reader').forEach(x=>x.remove());
  r.querySelectorAll('.tb-row.is-open').forEach(x=>x.classList.remove('is-open'));
  h.hidden=false;
}
function restore(){
  const card=rememberedCard();
  let y=lastY;
  if(card){
    const rect=card.getBoundingClientRect();
    // 章カードを、開く前と同じ画面内の高さへ戻す。
    y=Math.max(0,window.scrollY+rect.top-lastTop);
  }
  try{window.scrollTo({top:y,behavior:'auto'})}catch(_){window.scrollTo(0,y)}
}
function isContentsButton(el){
  if(!el)return false;
  const t=(el.textContent||'').replace(/\s+/g,'');
  return t.includes('目次へ')||t.includes('目次に戻る')||t==='‹目次' || t==='←目次';
}

// 章カードを開く「直前」の位置を保存。後から追加される第17〜21編にも効く。
document.addEventListener('pointerdown',e=>{
  const h=home();
  if(!h||h.hidden)return;
  const card=e.target.closest('button');
  if(card&&h.contains(card)&&homeCards().includes(card))remember(card);
},true);

document.addEventListener('click',e=>{
  const r=root();
  if(!r)return;

  // pointerdownが発生しない操作にも対応。
  const h=home();
  if(h&&!h.hidden){
    const card=e.target.closest('button');
    if(card&&h.contains(card)&&homeCards().includes(card))remember(card);
  }

  const btn=e.target.closest('button,a');
  if(!btn||!r.contains(btn)||!isContentsButton(btn))return;

  // 各編に埋め込まれた showHome()/scrollTo(0) を一切動かさない。
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();

  loadState();
  showHomeOnly();
  restore();
  requestAnimationFrame(restore);
  requestAnimationFrame(()=>requestAnimationFrame(restore));
  setTimeout(restore,60);
  setTimeout(restore,180);
},true);

loadState();
})();
