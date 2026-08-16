(()=>{
'use strict';
function reorderCard(){
 const layer=document.getElementById('tbGlossaryLayer');
 if(!layer||!layer.classList.contains('is-open'))return;
 const meaning=document.getElementById('tbGlossaryMeaning');
 const detail=document.getElementById('tbGlossaryDetail');
 if(!meaning||!detail)return;
 const meaningSec=meaning.closest('.tb-glossary-sec');
 if(!meaningSec)return;
 // 内容はそのまま。表示順だけ「もう少しくわしく」→「やさしく説明すると」にする。
 if(detail.nextElementSibling!==meaningSec) meaningSec.before(detail);
 const summary=detail.querySelector('summary');
 if(summary) summary.textContent='もう少しくわしく';
 const label=meaning.previousElementSibling;
 if(label&&label.textContent.trim()==='もう少しくわしく') label.textContent='やさしく説明すると';
 detail.open=false;
}
function schedule(){
 [0,8,24,60].forEach(ms=>setTimeout(reorderCard,ms));
}
function run(){
 document.addEventListener('click',e=>{if(e.target.closest?.('.tb-glossary-term'))schedule()},true);
 document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.closest?.('.tb-glossary-term'))schedule()},true);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
