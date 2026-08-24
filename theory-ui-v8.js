(()=>{
'use strict';
if(window.__NEET_THEORY_UI_V8__)return;
window.__NEET_THEORY_UI_V8__=true;
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
let queued=false;

function makeToolbarMenu(toolbar){
  if(!toolbar||toolbar.dataset.v8Toolbar==='1')return;
  const actions=$(':scope > .tlo-actions',toolbar);
  if(!actions)return;
  toolbar.dataset.v8Toolbar='1';
  const more=document.createElement('details');
  more.className='tlo-more';
  const summary=document.createElement('summary');
  summary.setAttribute('aria-label','理論ライブラリの操作メニュー');
  summary.textContent='•••';
  const panel=document.createElement('div');
  panel.className='tlo-more-panel';
  while(actions.firstChild)panel.appendChild(actions.firstChild);
  more.append(summary,panel);
  actions.replaceWith(more);
  panel.addEventListener('click',e=>{
    if(e.target.closest('button,a'))setTimeout(()=>{more.open=false},0);
  });
  document.addEventListener('click',e=>{
    if(more.open&&!more.contains(e.target))more.open=false;
  },{passive:true});
}

function toFold(el,label){
  if(!el)return null;
  if(el.matches('details')){
    el.classList.add('v8-fold');
    const current=$(':scope > summary',el);
    if(current&&label)current.textContent=label;
    if(!$('.v8-fold-body',el)){
      const wrap=document.createElement('div');
      wrap.className='v8-fold-body';
      [...el.childNodes].filter(n=>n!==current).forEach(n=>wrap.appendChild(n));
      el.appendChild(wrap);
    }
    return el;
  }
  if(el.dataset.v8Fold==='1')return el;
  const details=document.createElement('details');
  details.className='tlo-os v8-fold';
  details.dataset.v8Fold='1';
  const summary=document.createElement('summary');
  summary.textContent=label;
  const body=document.createElement('div');
  body.className='v8-fold-body';
  const heading=$(':scope > h2,:scope > h3,:scope > h4',el);
  if(heading)heading.remove();
  while(el.firstChild)body.appendChild(el.firstChild);
  details.append(summary,body);
  el.replaceWith(details);
  return details;
}

function groupPractice(body){
  if(!body)return;
  let shell=$(':scope > .tlo-practice-shell',body);
  const audio=$(':scope > .tlo-audio',body) || $('.tlo-practice-shell > .tlo-audio',body);
  const visual=$(':scope > .tlo-svg,:scope > .tlo-visual',body) || $('.tlo-practice-shell > .tlo-svg,.tlo-practice-shell > .tlo-visual',body);
  if(!audio&&!visual)return;
  if(!shell){
    shell=document.createElement('section');
    shell.className='tlo-practice-shell';
    const title=document.createElement('h3');
    title.className='tlo-practice-title';
    title.textContent='譜面・図で確認 → 耳で聴き比べ';
    shell.appendChild(title);
    (visual||audio).before(shell);
  }
  const title=$(':scope > .tlo-practice-title',shell);
  if(visual&&visual.parentElement!==shell)shell.appendChild(visual);
  if(audio&&audio.parentElement!==shell)shell.appendChild(audio);
  if(visual&&title&&title.nextElementSibling!==visual)title.after(visual);
  const audioAnchor=visual||title;
  if(audio&&audioAnchor&&audioAnchor.nextElementSibling!==audio)audioAnchor.after(audio);
}

function markCta(body){
  $$(':scope > section.tlo-os',body).forEach(sec=>{
    const h=$(':scope > h2,:scope > h3,:scope > h4',sec);
    const text=(h?.textContent||'').trim();
    if(/^試す/.test(text)||/NEETNOTEツール/.test(text))sec.classList.add('tlo-cta');
  });
}

function foldSecondary(body){
  $$(':scope > section.tlo-os,:scope > footer.tlo-os',body).forEach(sec=>{
    if(sec.classList.contains('tlo-objective')||sec.classList.contains('tlo-audio')||sec.classList.contains('tlo-svg')||sec.classList.contains('tlo-visual')||sec.classList.contains('tlo-practice-shell')||sec.classList.contains('tlo-cta'))return;
    const heading=$(':scope > h2,:scope > h3,:scope > h4',sec);
    const title=(heading?.textContent||'').trim();
    if(sec.classList.contains('tlo-warn'))return void toFold(sec,'よくある誤解');
    if(sec.classList.contains('tlo-source')||sec.tagName==='FOOTER')return void toFold(sec,'参考文献・出典');
    if(/流派|ジャンル/.test(title))return void toFold(sec,'ジャンル・流派による違い');
    if(/実曲/.test(title))return void toFold(sec,'実曲で確認する');
  });
  $$(':scope > details.tlo-os',body).forEach(d=>{
    if(d.classList.contains('v8-fold'))return;
    const summary=$(':scope > summary',d);
    const label=(summary?.textContent||'補足・詳しい仕組み').trim();
    toFold(d,label);
  });
}

function foldRank(el){
  const label=($(':scope > summary',el)?.textContent||el.textContent||'').trim();
  if(/補足|詳しい仕組み/.test(label))return 10;
  if(/誤解/.test(label))return 20;
  if(/流派|ジャンル/.test(label))return 30;
  if(/実曲/.test(label))return 40;
  if(/参考文献|出典|編集/.test(label))return 50;
  return 35;
}

function placeAfter(node,anchor){
  if(!node||!anchor||node===anchor)return anchor;
  if(anchor.nextElementSibling!==node)anchor.after(node);
  return node;
}

function reorderReader(body){
  if(!body)return;
  const objective=$(':scope > .tlo-objective',body);
  if(objective&&body.firstElementChild!==objective)body.prepend(objective);

  const depth=$(':scope > .tcd',body);
  const practice=$(':scope > .tlo-practice-shell',body);
  const cta=$(':scope > .tlo-cta',body);
  const quiz=$(':scope > .tlo-quiz',body);
  const folds=$$(':scope > .v8-fold',body).sort((a,b)=>foldRank(a)-foldRank(b));

  const firstGenerated=practice||cta||quiz||folds[0];
  if(depth&&firstGenerated&&depth.nextElementSibling!==firstGenerated)firstGenerated.before(depth);

  let anchor=practice||depth;
  if(practice&&depth)anchor=placeAfter(practice,depth);
  if(cta&&anchor)anchor=placeAfter(cta,anchor);
  else if(cta&&!anchor)anchor=cta;
  if(quiz&&anchor)anchor=placeAfter(quiz,anchor);
  else if(quiz&&!anchor)anchor=quiz;

  folds.forEach(fold=>{
    if(anchor)anchor=placeAfter(fold,anchor);
    else anchor=fold;
  });
}

function foldGateway(root){
  $$('.tlo-gateway',root).forEach(g=>{
    if(g.classList.contains('v8-fold'))return;
    if(g.matches('details'))return void toFold(g,'前提確認（Gateway）');
    const details=document.createElement('details');
    details.className='tlo-gateway v8-fold';
    const summary=document.createElement('summary');
    summary.textContent='前提確認（Gateway）';
    const wrap=document.createElement('div');
    wrap.className='v8-fold-body';
    const h=$(':scope > h3',g);if(h)h.remove();
    while(g.firstChild)wrap.appendChild(g.firstChild);
    details.append(summary,wrap);
    g.replaceWith(details);
  });
}

function transformReader(reader){
  if(!reader||reader.hidden)return;
  const body=$('[id$="ReaderBody"],#tbReaderBody',reader);
  if(!body)return;
  markCta(body);
  groupPractice(body);
  foldSecondary(body);
  reorderReader(body);
}

function syncMode(root){
  const reader=$$('[id$="Reader"],#tbReader',root).find(x=>!x.hidden);
  document.body.classList.toggle('theory-reader-open',!!reader);
}

function run(){
  queued=false;
  const root=$('#textbookLibrary')||$('#libraryMount')||document;
  const toolbar=$('.tlo-toolbar',root);
  if(toolbar)makeToolbarMenu(toolbar);
  foldGateway(root);
  $$('[id$="Reader"],#tbReader',root).forEach(transformReader);
  syncMode(root);
}
function schedule(){
  if(queued)return;
  queued=true;
  requestAnimationFrame(run);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});
else schedule();
const target=$('#libraryMount')||document.body;
new MutationObserver(schedule).observe(target,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden','class']});
})();
