(()=>{
'use strict';

const QUICK=[
  {icon:'♪',label:'楽曲の構造とモチーフ'},
  {icon:'𝄞',label:'音楽の様式と歴史'},
  {icon:'Ⅲ',label:'音楽表現と調性・和声'}
];

function ensureQuick(root){
  if(root.querySelector('.c-theory-quick'))return;
  const tools=root.querySelector('.tb-tools');
  if(!tools)return;
  const quick=document.createElement('section');
  quick.className='c-theory-quick';
  quick.innerHTML=`
    <div class="c-quick-title"><span></span><b>主要な理論領域</b></div>
    <div class="c-quick-grid">
      ${QUICK.map(x=>`<div class="c-quick-card"><span class="c-quick-icon">${x.icon}</span><b>${x.label}</b></div>`).join('')}
    </div>`;
  tools.insertAdjacentElement('afterend',quick);
}

function decorateRows(root){
  root.querySelectorAll('.tb-row').forEach(row=>{
    if(row.dataset.cUi==='1')return;
    row.dataset.cUi='1';
    const text=row.querySelector('div');
    if(text&&!text.querySelector('.c-lesson-meta')){
      const meta=document.createElement('span');
      meta.className='c-lesson-meta';
      meta.textContent='レッスン';
      text.appendChild(meta);
    }
  });
}

function decorateSections(root){
  root.querySelectorAll('.tb-section-label').forEach((label,i)=>{
    if(label.dataset.cUi==='1')return;
    label.dataset.cUi='1';
    const roman=document.createElement('span');
    roman.className='c-section-roman';
    roman.textContent=i===0?'Ⅰ':'Ⅱ';
    label.prepend(roman);
  });
}

function cleanLegacy(root){
  root.querySelectorAll('.tb-intro').forEach(x=>x.style.display='none');
  root.querySelectorAll('.gm-source,.gm-refs,.tb-source-badge,.pdf-force-panel').forEach(x=>x.remove());
}

function apply(){
  const root=document.getElementById('textbookLibrary');
  if(!root)return false;
  ensureQuick(root);
  decorateRows(root);
  decorateSections(root);
  cleanLegacy(root);
  return true;
}

const style=document.createElement('style');
style.textContent=`
:root{
  --c-bg:#fbf6ed;
  --c-paper:#fffdf8;
  --c-paper-2:#fffaf2;
  --c-ink:#2d2118;
  --c-muted:#8c8378;
  --c-line:#e8dccb;
  --c-gold:#b9852e;
  --c-gold-2:#d7a94f;
  --c-shadow:0 10px 26px rgba(84,59,31,.055);
}
body{
  background:var(--c-bg)!important;
  color:var(--c-ink)!important;
}
.wrap{
  max-width:920px!important;
  padding:0 24px 30px!important;
}
.c-appbar{
  height:76px;
  display:grid;
  grid-template-columns:52px 1fr 52px;
  align-items:center;
  gap:12px;
  margin:0 -24px;
  padding:0 24px;
  border-bottom:1px solid rgba(185,133,46,.16);
  background:rgba(255,253,248,.66);
}
.c-site{
  text-align:center;
  font-weight:800;
  font-size:1rem;
  letter-spacing:.02em;
  color:#3b2a1c;
}
.c-back,.menu-button{
  width:50px!important;
  height:50px!important;
  display:grid!important;
  place-items:center!important;
  border:1px solid var(--c-line)!important;
  border-radius:50%!important;
  background:rgba(255,255,255,.86)!important;
  color:#4c3420!important;
  text-decoration:none!important;
  box-shadow:0 6px 18px rgba(82,56,30,.06)!important;
  font-size:1.7rem!important;
  line-height:1!important;
}
.menu-button{font-size:1.25rem!important}
.c-hero{
  padding:34px 4px 26px;
}
.c-hero h1{
  margin:0;
  font-family:"Yu Mincho","Hiragino Mincho ProN","Hiragino Mincho Pro",serif;
  font-size:clamp(2rem,6vw,3rem);
  line-height:1.16;
  font-weight:800;
  letter-spacing:.02em;
  color:#4a2f18;
}
.c-hero .lead{
  margin:12px 0 0!important;
  font-size:1rem!important;
  line-height:1.75!important;
  color:#76695c!important;
}
#textbookLibrary{
  max-width:none!important;
  margin:0!important;
  padding:0 0 110px!important;
}
#textbookLibrary .tb-tools{
  position:static!important;
  display:grid!important;
  grid-template-columns:minmax(0,1fr) 220px!important;
  gap:14px!important;
  margin:0 0 20px!important;
  padding:0!important;
  background:transparent!important;
  backdrop-filter:none!important;
}
#textbookLibrary .tb-tools label,
#textbookLibrary .tb-tools select{
  min-height:62px!important;
  border:1px solid var(--c-line)!important;
  border-radius:18px!important;
  background:rgba(255,255,255,.76)!important;
  color:#594839!important;
  box-shadow:0 5px 16px rgba(84,59,31,.03)!important;
}
#textbookLibrary .tb-tools label{
  padding:13px 18px!important;
  font-size:1.25rem;
}
#textbookLibrary .tb-tools input{
  font-size:1rem!important;
  color:var(--c-ink)!important;
}
#textbookLibrary .tb-tools select{
  padding:0 16px!important;
  font-size:.96rem!important;
  font-weight:750!important;
}
.c-theory-quick{
  margin:0 0 30px;
  padding:20px 22px 22px;
  border:1px solid var(--c-line);
  border-radius:22px;
  background:rgba(255,253,248,.72);
  box-shadow:var(--c-shadow);
}
.c-quick-title{
  display:flex;
  align-items:center;
  gap:10px;
  margin-bottom:16px;
  font-size:.92rem;
}
.c-quick-title span{
  width:4px;
  height:24px;
  border-radius:999px;
  background:linear-gradient(180deg,var(--c-gold-2),var(--c-gold));
}
.c-quick-title b{font-size:.98rem}
.c-quick-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:14px;
}
.c-quick-card{
  min-height:88px;
  display:grid;
  grid-template-columns:54px 1fr;
  align-items:center;
  gap:12px;
  padding:12px 14px;
  border:1px solid var(--c-line);
  border-radius:18px;
  background:#fffdfa;
  box-shadow:0 6px 16px rgba(84,59,31,.035);
}
.c-quick-icon{
  width:50px;
  height:50px;
  display:grid;
  place-items:center;
  border-radius:50%;
  background:linear-gradient(145deg,#dfb35d,#b67f23);
  color:white;
  font-family:serif;
  font-size:1.35rem;
  font-weight:800;
}
.c-quick-card b{
  font-size:.9rem;
  line-height:1.45;
}
#textbookLibrary .tb-intro{display:none!important}
#textbookLibrary .tb-section-label{
  position:relative;
  display:grid!important;
  grid-template-columns:auto auto 1fr!important;
  align-items:center!important;
  gap:12px!important;
  margin:34px 4px 14px!important;
  padding:0!important;
  border:0!important;
}
#textbookLibrary .tb-section-label::after{
  content:"";
  height:1px;
  margin-left:8px;
  background:linear-gradient(90deg,rgba(185,133,46,.36),rgba(185,133,46,.08));
}
#textbookLibrary .tb-section-label b{
  font-family:"Yu Mincho","Hiragino Mincho ProN",serif;
  font-size:1.28rem!important;
  color:#5a391c!important;
  white-space:nowrap;
}
#textbookLibrary .tb-section-label small{display:none!important}
.c-section-roman{
  font-family:"Times New Roman",serif;
  font-size:1.42rem;
  font-weight:700;
  color:var(--c-gold);
}
#textbookLibrary .tb-categories{
  display:grid!important;
  gap:8px!important;
}
#textbookLibrary .tb-cat,
#textbookLibrary .tb-catx{
  min-height:80px!important;
  display:grid!important;
  grid-template-columns:58px 46px minmax(0,1fr) auto!important;
  gap:12px!important;
  align-items:center!important;
  padding:14px 16px!important;
  border:1px solid var(--c-line)!important;
  border-radius:15px!important;
  background:rgba(255,255,255,.82)!important;
  color:var(--c-ink)!important;
  box-shadow:none!important;
}
#textbookLibrary .tb-cat:hover,
#textbookLibrary .tb-catx:hover{background:#fffdf8!important}
#textbookLibrary .tb-no{
  font-size:.72rem!important;
  color:var(--c-gold)!important;
}
#textbookLibrary .tb-icon{
  width:42px!important;
  height:42px!important;
  border-radius:50%!important;
  background:#f7ebd8!important;
}
#textbookLibrary .tb-cat b,
#textbookLibrary .tb-catx b{
  font-size:.98rem!important;
  line-height:1.4!important;
}
#textbookLibrary .tb-cat small,
#textbookLibrary .tb-catx small{
  margin-top:4px!important;
  font-size:.72rem!important;
  color:var(--c-muted)!important;
}
#textbookLibrary .tb-cat em,
#textbookLibrary .tb-catx em{
  color:var(--c-gold)!important;
}
#textbookLibrary .tb-back{
  min-height:44px!important;
  padding:7px 4px!important;
  color:#9a6c25!important;
  font-size:.82rem!important;
}
#textbookLibrary .tb-ch-title{
  position:relative;
  display:grid!important;
  grid-template-columns:52px 1fr!important;
  gap:14px!important;
  align-items:center!important;
  margin:8px 0 16px!important;
  padding:10px 4px 18px!important;
  border-bottom:1px solid rgba(185,133,46,.24)!important;
}
#textbookLibrary .tb-ch-title>span{
  width:48px;
  height:48px;
  display:grid;
  place-items:center;
  border-radius:50%;
  background:#f5e7d1;
  font-size:1.3rem!important;
}
#textbookLibrary .tb-ch-title h2{
  margin:0!important;
  font-family:"Yu Mincho","Hiragino Mincho ProN",serif;
  font-size:1.65rem!important;
  line-height:1.35!important;
  color:#53351d!important;
}
#textbookLibrary .tb-ch-title p{
  margin:6px 0 0!important;
  font-size:.82rem!important;
  color:var(--c-muted)!important;
}
#tbChapterList,
#tbMelodyList,
.tb-arr-list,
.tb-sound-list,
.tb-tuning-list{
  overflow:hidden;
  border:1px solid var(--c-line);
  border-radius:18px;
  background:rgba(255,255,255,.86);
  box-shadow:var(--c-shadow);
}
#textbookLibrary .tb-row{
  min-height:82px!important;
  grid-template-columns:62px minmax(0,1fr) 28px!important;
  gap:14px!important;
  padding:15px 18px!important;
  border:0!important;
  border-top:1px solid #efe5d7!important;
  border-radius:0!important;
  background:transparent!important;
  color:var(--c-ink)!important;
}
#textbookLibrary .tb-row:first-child{border-top:0!important}
#textbookLibrary .tb-row>span{
  align-self:stretch;
  display:flex!important;
  align-items:center;
  border-right:1px solid #eadfce;
  color:var(--c-gold)!important;
  font-family:Georgia,serif;
  font-size:1.1rem!important;
  font-weight:800!important;
}
#textbookLibrary .tb-row b{
  display:block!important;
  font-size:1rem!important;
  line-height:1.42!important;
  letter-spacing:.005em;
}
.c-lesson-meta{
  display:block;
  margin-top:5px;
  color:#9a9288;
  font-size:.75rem;
  line-height:1.2;
}
#textbookLibrary .tb-row em{
  color:var(--c-gold)!important;
  font-size:1.45rem!important;
}
#textbookLibrary .tb-row.is-open{
  background:#fff7e8!important;
  box-shadow:inset 0 0 0 1px rgba(213,165,77,.48)!important;
}
#textbookLibrary .tb-inline-reader{
  margin:0 0 10px!important;
  padding:20px 20px 22px!important;
  border:1px solid var(--c-line)!important;
  border-top:0!important;
  border-radius:0 0 18px 18px!important;
  background:#fffdf9!important;
  box-shadow:0 10px 24px rgba(84,59,31,.045)!important;
}
#textbookLibrary .tb-inline-head h2{
  font-family:"Yu Mincho","Hiragino Mincho ProN",serif;
  color:#4e321b!important;
}
#textbookLibrary .tb-inline-body{
  color:#4b4239!important;
  line-height:1.92!important;
}
#textbookLibrary .gm-summary,
#textbookLibrary .gm-block{
  border:1px solid #eadfce!important;
  border-radius:15px!important;
  background:#fffdf9!important;
}
#textbookLibrary .gm-block h3{color:#9b6e2c!important}
#textbookLibrary .tb-inline-close{
  min-height:50px!important;
  border:1px solid #dfcfb9!important;
  border-radius:14px!important;
  background:#f7efe4!important;
  color:#8a6228!important;
}
.tb-sh-section{margin:28px 0 0}
.tb-sh-section-head{
  display:grid!important;
  grid-template-columns:auto auto 1fr!important;
  align-items:center!important;
  gap:12px!important;
  margin:0 4px 14px!important;
  color:#5a391c!important;
}
.tb-sh-section-head::after{
  content:"";
  height:1px;
  margin-left:8px;
  background:linear-gradient(90deg,rgba(185,133,46,.36),rgba(185,133,46,.08));
}
.tb-sh-section-head span{
  font-family:"Times New Roman",serif;
  font-size:1.42rem!important;
  font-weight:700!important;
  color:var(--c-gold)!important;
}
.tb-sh-section-head b{
  font-family:"Yu Mincho","Hiragino Mincho ProN",serif;
  font-size:1.3rem!important;
  white-space:nowrap;
}
.tb-sh-section{
  overflow:hidden;
}
.tb-sh-section>.tb-row{
  background:rgba(255,255,255,.86)!important;
}
.tb-sh-section>.tb-row:first-of-type{
  border-radius:18px 18px 0 0!important;
  border-top:1px solid var(--c-line)!important;
}
.tb-sh-section>.tb-row:last-of-type{
  border-radius:0 0 18px 18px!important;
  border-bottom:1px solid var(--c-line)!important;
}
@media(max-width:650px){
  .wrap{padding:0 16px 28px!important}
  .c-appbar{height:70px;margin:0 -16px;padding:0 16px;grid-template-columns:48px 1fr 48px}
  .c-back,.menu-button{width:46px!important;height:46px!important}
  .c-site{font-size:.9rem}
  .c-hero{padding:30px 4px 22px}
  .c-hero h1{font-size:2.35rem}
  .c-hero .lead{font-size:.88rem!important}
  #textbookLibrary .tb-tools{grid-template-columns:minmax(0,1fr) 145px!important;gap:10px!important}
  #textbookLibrary .tb-tools label,#textbookLibrary .tb-tools select{min-height:56px!important;border-radius:16px!important}
  #textbookLibrary .tb-tools select{font-size:.82rem!important;padding:0 10px!important}
  .c-theory-quick{padding:16px 14px 17px;border-radius:19px}
  .c-quick-grid{gap:8px}
  .c-quick-card{grid-template-columns:42px 1fr;gap:8px;min-height:78px;padding:10px 9px;border-radius:15px}
  .c-quick-icon{width:40px;height:40px;font-size:1.05rem}
  .c-quick-card b{font-size:.72rem;line-height:1.42}
  #textbookLibrary .tb-section-label{margin-top:28px!important;gap:9px!important}
  #textbookLibrary .tb-section-label b{font-size:1.08rem!important}
  .c-section-roman{font-size:1.2rem}
  #textbookLibrary .tb-cat,#textbookLibrary .tb-catx{grid-template-columns:46px 38px minmax(0,1fr) auto!important;gap:8px!important;padding:12px 10px!important}
  #textbookLibrary .tb-cat b,#textbookLibrary .tb-catx b{font-size:.88rem!important}
  #textbookLibrary .tb-cat small,#textbookLibrary .tb-catx small{font-size:.66rem!important}
  #textbookLibrary .tb-ch-title h2{font-size:1.42rem!important}
  #textbookLibrary .tb-row{min-height:76px!important;grid-template-columns:48px minmax(0,1fr) 22px!important;gap:11px!important;padding:14px 12px!important}
  #textbookLibrary .tb-row>span{font-size:.98rem!important}
  #textbookLibrary .tb-row b{font-size:.94rem!important}
  .c-lesson-meta{font-size:.7rem}
  #textbookLibrary .tb-inline-reader{padding:17px 15px 20px!important}
  .tb-sh-section-head b{font-size:1.08rem!important}
}
`;
document.head.appendChild(style);

function boot(){
  if(apply()){
    const root=document.getElementById('textbookLibrary');
    new MutationObserver(()=>apply()).observe(root,{childList:true,subtree:true});
  }else setTimeout(boot,120);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();