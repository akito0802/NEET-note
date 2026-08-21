(()=>{
'use strict';
if(window.__NEET_THEORY_UI_V7__)return;
window.__NEET_THEORY_UI_V7__=true;
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
let queued=false;

function makeToolbarMenu(toolbar){
  if(!toolbar||toolbar.dataset.v7Toolbar==='1')return;
  const actions=$(':scope > .tlo-actions',toolbar);
  if(!actions)return;
  toolbar.dataset.v7Toolbar='1';
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
  if(!el||el.matches('details')||el.dataset.v7Fold==='1')return el;
  const details=document.createElement('details');
  details.className='tlo-os v7-fold';
  details.dataset.v7Fold='1';
  const summary=document.createElement('summary');
  summary.textContent=label;
  const body=document.createElement('div');
  body.className='v7-fold-body';
  const heading=$(':scope > h2,:scope > h3,:scope > h4',el);
  if(heading)heading.remove();
  while(el.firstChild)body.appendChild(el.firstChild);
  details.append(summary,body);
  el.replaceWith(details);
  return details;
}

function foldExistingDetails(body){
  $$(':scope > details.tlo-os',body).forEach(d=>{
    if(d.classList.contains('v7-fold'))return;
    d.classList.add('v7-fold');
    if(!$('.v7-fold-body',d)){
      const summary=$(':scope > summary',d);
      const wrap=document.createElement('div');
      wrap.className='v7-fold-body';
      [...d.childNodes].filter(n=>n!==summary).forEach(n=>wrap.appendChild(n));
      d.appendChild(wrap);
    }
  });
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
    title.textContent='聴いて、譜面・図で確認';
    shell.appendChild(title);
    const first=audio||visual;
    first.before(shell);
  }
  if(audio&&audio.parentElement!==shell)shell.appendChild(audio);
  if(visual&&visual.parentElement!==shell)shell.appendChild(visual);
}

function markCta(body){
  $$(':scope > section.tlo-os',body).forEach(sec=>{
    const h=$(':scope > h2,:scope > h3,:scope > h4',sec);
    const t=(h?.textContent||'').trim();
    if(/^試す/.test(t)||/NEETNOTEツール/.test(t))sec.classList.add('tlo-cta');
  });
}

function foldSecondary(body){
  $$(':scope > section.tlo-os,:scope > footer.tlo-os',body).forEach(sec=>{
    if(sec.classList.contains('tlo-objective')||sec.classList.contains('tlo-audio')||sec.classList.contains('tlo-svg')||sec.classList.contains('tlo-practice-shell')||sec.classList.contains('tlo-cta'))return;
    const heading=$(':scope > h2,:scope > h3,:scope > h4',sec);
    const title=(heading?.textContent||'').trim();
    if(sec.classList.contains('tlo-warn'))return void toFold(sec,'よくある誤解');
    if(sec.classList.contains('tlo-source')||sec.tagName==='FOOTER')return void toFold(sec,'出典・編集情報');
    if(/流派|ジャンル/.test(title))return void toFold(sec,'流派・ジャンルでの違い');
    if(/実曲/.test(title))return void toFold(sec,'実曲・参考音源を探す');
  });
  foldExistingDetails(body);
}

function foldGateway(root){
  $$('.tlo-gateway',root).forEach(g=>{
    if(g.matches('details')||g.dataset.v7Gateway==='1')return;
    g.dataset.v7Gateway='1';
    const details=document.createElement('details');
    details.className='tlo-gateway v7-fold';
    const summary=document.createElement('summary');
    summary.textContent='前提確認（Gateway）';
    const wrap=document.createElement('div');
    wrap.className='v7-fold-body';
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
}

function run(){
  queued=false;
  const root=$('#textbookLibrary')||$('#libraryMount')||document;
  const toolbar=$('.tlo-toolbar',root);
  if(toolbar)makeToolbarMenu(toolbar);
  foldGateway(root);
  $$('[id$="Reader"],#tbReader',root).forEach(transformReader);
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
