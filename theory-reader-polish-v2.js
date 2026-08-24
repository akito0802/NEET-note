(()=>{
'use strict';
if(window.__NEET_THEORY_READER_POLISH_V2__)return;
window.__NEET_THEORY_READER_POLISH_V2__=true;

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const CSS=`
#tbReaderBody,[id$="ReaderBody"]{font-size:17px!important;line-height:1.76!important;letter-spacing:.002em!important;color:#26292d!important}
#tbReaderBody>p,[id$="ReaderBody"]>p{margin:0 0 1.08em!important;line-height:1.76!important}
#tbReaderBody>h2,[id$="ReaderBody"]>h2{font-size:1.28rem!important;line-height:1.4!important;margin:2.05em 0 .68em!important}
#tbReaderBody>h3,[id$="ReaderBody"]>h3{font-size:1.12rem!important;line-height:1.45!important;margin:1.8em 0 .62em!important}
#tbReaderBody>h4,[id$="ReaderBody"]>h4{font-size:1rem!important;line-height:1.5!important;margin:1.55em 0 .55em!important}
#tbReaderBody li,[id$="ReaderBody"] li{font-size:16px!important;line-height:1.72!important}
.rp2-flow{display:grid;grid-template-columns:repeat(5,minmax(112px,1fr));gap:7px;margin:0 0 26px;padding:8px;overflow-x:auto;border:1px solid #ded6ca;border-radius:14px;background:#f8f4ed;scrollbar-width:none}
.rp2-flow::-webkit-scrollbar{display:none}
.rp2-flow button{min-height:40px;padding:8px 10px;border:0;border-radius:10px;background:transparent;color:#625b53;font:800 12.5px/1.25 -apple-system,BlinkMacSystemFont,"Hiragino Sans","Yu Gothic",sans-serif;white-space:nowrap;cursor:pointer}
.rp2-flow button b{display:inline-grid;place-items:center;width:20px;height:20px;margin-right:5px;border-radius:7px;background:#eee3d5;color:#765b38;font-size:10px}
.rp2-flow button:focus-visible,.rp2-flow button:hover{outline:1px solid #ddd3c6;background:#fff}
.rp2-phase{display:grid;grid-template-columns:36px minmax(0,1fr);gap:11px;align-items:start;margin:34px 0 14px;padding-top:22px;border-top:1px solid #ddd5ca}
.rp2-flow+.rp2-phase{margin-top:0;padding-top:0;border-top:0}
.rp2-phase-no{display:grid;place-items:center;width:34px;height:34px;border-radius:11px;background:#efe5d8;color:#765b38;font-size:11px;font-weight:950}
.rp2-phase-copy b{display:block;color:#25282c;font-size:1.08rem;line-height:1.35}
.rp2-phase-copy small{display:block;margin-top:4px;color:#625c55;font-size:13px;line-height:1.55}
#tbReaderBody>.tlo-objective,[id$="ReaderBody"]>.tlo-objective{margin:0 0 20px!important;padding:15px 16px!important;border-left:3px solid #547188!important;border-radius:10px!important;background:#eef4f7!important}
.tlo-objective h3{font-size:15px!important}.tlo-objective p{font-size:15.5px!important;line-height:1.7!important;color:#34383d!important}.tlo-objective small{font-size:12.5px!important;color:#605b55!important}
#tbReaderBody>.tcd,[id$="ReaderBody"]>.tcd{margin:0!important;padding:0!important;border-top:0!important}.tcd h3{font-size:1.2rem!important}.tcd>p{font-size:14px!important;line-height:1.65!important}.tcd-l summary{font-size:14px!important}.tcd-l li{font-size:15px!important;line-height:1.7!important}.tcd-c p,.tcd-q li,.tcd-q p{font-size:14.5px!important;line-height:1.67!important}
.tlo-practice-shell{display:grid!important;gap:12px!important;margin:0!important;padding:11px!important;border:1px solid #ded5c8!important;border-radius:15px!important;background:#f7f2ea!important}
.tlo-practice-shell>.tlo-svg,.tlo-practice-shell>.tlo-visual,.tlo-practice-shell>.tlo-audio{margin:0!important;padding:14px!important;border:1px solid #e1d9ce!important;border-radius:12px!important;background:#fff!important}
.tlo-practice-shell>.tlo-audio{border-bottom:1px solid #e1d9ce!important}.tlo-practice-title{margin:1px 2px!important;font-size:12px!important;color:#625c55!important;letter-spacing:.04em!important}.tlo-practice-shell .tlo-btn{min-height:46px!important;font-size:14px!important}
#tbReaderBody>.tlo-cta,[id$="ReaderBody"]>.tlo-cta{margin:0!important;padding:18px!important;border:1px solid #dfc8aa!important;border-radius:14px!important;background:linear-gradient(135deg,#f7eddd,#fff9ef)!important}.tlo-cta h3{font-size:16px!important}.tlo-cta .tlo-btn.primary{min-height:48px!important;font-size:14.5px!important}
.v8-fold>summary{font-size:14px!important;color:#3d3935!important}.v8-fold>.v8-fold-body{font-size:14.5px!important;line-height:1.74!important;color:#5d5852!important}
@media(max-width:760px){.rp2-flow{grid-template-columns:repeat(5,max-content);padding:6px;margin-left:-2px;margin-right:-2px}.rp2-flow button{font-size:12px}.rp2-phase{grid-template-columns:32px minmax(0,1fr);gap:10px;margin-top:29px;padding-top:18px}.rp2-phase-no{width:32px;height:32px}.rp2-phase-copy b{font-size:1rem}.rp2-phase-copy small{font-size:12.5px}#tbReaderBody,[id$="ReaderBody"]{font-size:17px!important;line-height:1.75!important}}
`;

function addStyle(){
  let style=$('#theory-reader-polish-v2-style');
  if(style)return;
  style=document.createElement('style');
  style.id='theory-reader-polish-v2-style';
  style.textContent=CSS;
  document.head.appendChild(style);
}

function phase(key,no,title,desc,anchor){return{key,no,title,desc,anchor}}
function mainContentAnchor(body){
  const ignored='.rp-flow,.rp-phase-head,.rp2-flow,.rp2-phase,.tlo-objective,.tcd,.tlo-practice-shell,.tlo-cta,.v8-fold,.tlo-audio,.tlo-svg,.tlo-visual,.tlo-os';
  return [...body.children].find(el=>!el.matches(ignored))||$('.tlo-objective',body)||body.firstElementChild;
}
function makeHead(p){
  const el=document.createElement('div');
  el.className='rp2-phase';
  el.dataset.rp2=p.key;
  el.innerHTML=`<span class="rp2-phase-no">${p.no}</span><span class="rp2-phase-copy"><b>${p.title}</b><small>${p.desc}</small></span>`;
  return el;
}
function makeFlow(phases){
  const nav=document.createElement('nav');
  nav.className='rp2-flow';
  nav.setAttribute('aria-label','この項目の学習フロー');
  nav.innerHTML=phases.map(p=>`<button type="button" data-rp2-jump="${p.key}"><b>${p.no}</b>${p.title}</button>`).join('');
  nav.addEventListener('click',e=>{
    const b=e.target.closest('[data-rp2-jump]');
    if(!b)return;
    const target=$(`.rp2-phase[data-rp2="${b.dataset.rp2Jump}"]`,nav.parentElement);
    target?.scrollIntoView({behavior:'smooth',block:'start'});
  });
  return nav;
}
function polish(reader){
  if(!reader||reader.hidden)return;
  const body=$('[id$="ReaderBody"],#tbReaderBody',reader);
  if(!body)return;
  const objective=$(':scope > .tlo-objective',body);
  const main=mainContentAnchor(body);
  const depth=$(':scope > .tcd',body);
  const practice=$(':scope > .tlo-practice-shell',body);
  const cta=$(':scope > .tlo-cta',body);
  const fold=$(':scope > .v8-fold',body);
  const steps=[];
  steps.push(phase('understand','01','理解する','まず要点と本文。ここで概念の芯をつかむ。',objective||main));
  if(depth)steps.push(phase('deepen',String(steps.length+1).padStart(2,'0'),'深める','STANDARD → DEEP → MASTER。必要な深さだけ開く。',depth));
  if(practice)steps.push(phase('listen',String(steps.length+1).padStart(2,'0'),'見て・聴く','譜面や図で形を見て、A/Bで耳へつなげる。',practice));
  if(cta)steps.push(phase('apply',String(steps.length+1).padStart(2,'0'),'試す','NEET NOTEのツールで実際に触って定着させる。',cta));
  if(fold)steps.push(phase('reference',String(steps.length+1).padStart(2,'0'),'補足する','誤解・流派差・実曲・出典は必要な時だけ確認。',fold));
  const valid=steps.filter(p=>p.anchor&&p.anchor.parentElement===body);
  if(!valid.length)return;
  const sig=[reader.dataset.tloLesson||'',!!depth,!!practice,!!cta,$$(':scope > .v8-fold',body).length].join('|');
  if(body.dataset.rp2Sig===sig&&$('.rp2-flow',body)&&$$('.rp2-phase',body).length===valid.length)return;
  body.dataset.rp2Sig=sig;
  $$(':scope > .rp-flow,:scope > .rp-phase-head,:scope > .rp2-flow,:scope > .rp2-phase',body).forEach(x=>x.remove());
  valid[0].anchor.before(makeFlow(valid));
  valid.forEach(p=>p.anchor.before(makeHead(p)));
}
let queued=false;
function run(){queued=false;$$('[id$="Reader"],#tbReader').forEach(polish)}
function schedule(){if(queued)return;queued=true;requestAnimationFrame(run)}
function boot(){addStyle();schedule();new MutationObserver(schedule).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden','class']});setTimeout(schedule,250);setTimeout(schedule,900);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
