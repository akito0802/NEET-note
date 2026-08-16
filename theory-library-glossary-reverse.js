(()=>{
'use strict';
function termKey(){
 const title=document.getElementById('tbGlossaryTitle');
 return (title?.textContent||'').trim();
}
function arrangeCard(){
 const layer=document.getElementById('tbGlossaryLayer');
 if(!layer||!layer.classList.contains('is-open'))return;
 const meaning=document.getElementById('tbGlossaryMeaning');
 const detail=document.getElementById('tbGlossaryDetail');
 if(!meaning||!detail)return;
 const meaningSec=meaning.closest('.tb-glossary-sec');
 if(!meaningSec)return;

 // 詳しい側は最初から見える通常の「説明」にする。
 const detailSummary=detail.querySelector('summary');
 if(detailSummary){
   detailSummary.textContent='説明';
   detailSummary.setAttribute('tabindex','-1');
   detailSummary.setAttribute('aria-disabled','true');
 }
 detail.classList.add('tb-glossary-detail-static');
 detail.open=true;
 if(detail.nextElementSibling!==meaningSec && detail.nextElementSibling?.id!=='tbGlossaryEasy'){
   meaningSec.before(detail);
 }

 // やさしい説明はタップした時だけ開く。
 let easy=document.getElementById('tbGlossaryEasy');
 if(!easy){
   easy=document.createElement('details');
   easy.id='tbGlossaryEasy';
   easy.className='tb-glossary-easy';
   const summary=document.createElement('summary');
   summary.textContent='やさしく説明すると';
   easy.appendChild(summary);
   meaningSec.before(easy);
   easy.appendChild(meaningSec);
 }else if(!easy.contains(meaningSec)){
   easy.appendChild(meaningSec);
 }

 const label=meaning.previousElementSibling;
 if(label)label.style.display='none';
 const key=termKey();
 if(easy.dataset.termKey!==key){
   easy.dataset.termKey=key;
   easy.open=false;
 }

 // 並びは「説明」→「やさしく説明すると」→「たとえば」。
 if(detail.nextElementSibling!==easy)detail.after(easy);
}
function installStyle(){
 if(document.getElementById('tbGlossaryOrderStyle'))return;
 const s=document.createElement('style');
 s.id='tbGlossaryOrderStyle';
 s.textContent=`
 #tbGlossaryDetail.tb-glossary-detail-static>summary{cursor:default!important;pointer-events:none;color:#8b6f47!important;font-weight:800!important;font-size:.82rem!important;list-style:none!important}
 #tbGlossaryDetail.tb-glossary-detail-static>summary::-webkit-details-marker{display:none!important}
 #tbGlossaryDetail.tb-glossary-detail-static>summary:after{content:''!important}
 #tbGlossaryDetail.tb-glossary-detail-static>p{display:block!important}
 #tbGlossaryEasy{margin-top:13px;border-top:1px solid #eadfce;padding-top:11px}
 #tbGlossaryEasy>summary{cursor:pointer;color:#8b6f47;font-weight:800;font-size:.82rem;list-style:none}
 #tbGlossaryEasy>summary::-webkit-details-marker{display:none}
 #tbGlossaryEasy>summary:after{content:' ＋'}
 #tbGlossaryEasy[open]>summary:after{content:' −'}
 #tbGlossaryEasy>.tb-glossary-sec{margin-top:10px!important;padding-top:0!important;border-top:0!important}
 `;
 document.head.appendChild(s);
}
function schedule(){
 [0,8,24,60,120].forEach(ms=>setTimeout(arrangeCard,ms));
}
function run(){
 installStyle();
 document.addEventListener('click',e=>{if(e.target.closest?.('.tb-glossary-term'))schedule()},true);
 document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.closest?.('.tb-glossary-term'))schedule()},true);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
