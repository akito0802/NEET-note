(()=>{
'use strict';
if(window.__NEET_GLOBAL_MENU_SAFE_AREA__)return;
window.__NEET_GLOBAL_MENU_SAFE_AREA__=true;

const STYLE_ID='ngm-safe-area-style';
if(!document.getElementById(STYLE_ID)){
  const style=document.createElement('style');
  style.id=STYLE_ID;
  style.textContent=`
    .ngm-safe-left{box-sizing:border-box!important}
    @media(max-width:620px){
      body[data-ngm-host="fretboard"] .mobile-page-head{padding-left:56px!important}
    }
    @media(min-width:621px){
      body[data-ngm-host="fretboard"] .side-rail>.brand{margin-top:62px!important}
    }
  `;
  document.head.appendChild(style);
}

const host=location.hostname;
if(host.includes('akito0802.github.io')){
  const path=location.pathname;
  if(path.startsWith('/-h/'))document.body.dataset.ngmHost='fretboard';
  else if(path.startsWith('/Cordhyo-/'))document.body.dataset.ngmHost='chords';
  else if(path.startsWith('/scale/'))document.body.dataset.ngmHost='scale';
  else if(path.startsWith('/NEET-note/'))document.body.dataset.ngmHost='neetnote';
}

const preferred='header,nav,.site-nav,.mobile-page-head,.top-card,.appbar,.app-bar,.toolbar,.topbar,.top-bar,.page-header,.hero,.string-hero,.brand';
const ignore=el=>!el||el===document.body||el===document.documentElement||el.closest('.ngm-menu,.ngm-overlay,.ngm-btn,.ngm-modal,.ngm-top-return');

function reserveLeftSpace(){
  const btn=document.querySelector('.ngm-btn');
  if(!btn)return false;
  const br=btn.getBoundingClientRect();
  if(!br.width||!br.height)return false;
  const points=[
    [br.left+br.width/2,br.top+br.height/2],
    [br.right-2,br.top+br.height/2],
    [br.left+br.width/2,br.bottom-2]
  ];
  const candidates=new Set();
  for(const [x,y] of points){
    for(const el of document.elementsFromPoint(x,y)){
      if(ignore(el))continue;
      const target=el.closest(preferred)||el;
      if(ignore(target))continue;
      const r=target.getBoundingClientRect();
      if(r.width<20||r.height<18)continue;
      if(r.bottom<br.top||r.top>br.bottom||r.right<br.left||r.left>br.right)continue;
      candidates.add(target);
      break;
    }
  }
  candidates.forEach(target=>{
    if(target.classList.contains('side-rail'))return;
    const r=target.getBoundingClientRect();
    const cs=getComputedStyle(target);
    const current=parseFloat(cs.paddingLeft)||0;
    const needed=Math.max(current,Math.ceil(br.right+10-r.left));
    if(needed>current+1){
      target.classList.add('ngm-safe-left');
      target.style.setProperty('padding-left',needed+'px','important');
    }
  });
  return true;
}

let tries=0;
const run=()=>{
  reserveLeftSpace();
  if(++tries<20)setTimeout(run,80);
};
run();
window.addEventListener('resize',()=>setTimeout(reserveLeftSpace,60),{passive:true});
new MutationObserver(()=>setTimeout(reserveLeftSpace,30)).observe(document.body,{childList:true,subtree:true});
})();