(()=>{
'use strict';
function reverseCard(){
 const layer=document.getElementById('tbGlossaryLayer');
 if(!layer||!layer.classList.contains('is-open'))return;
 const meaning=document.getElementById('tbGlossaryMeaning');
 const detail=document.getElementById('tbGlossaryDetail');
 if(!meaning||!detail)return;
 const p=detail.querySelector('p');
 const summary=detail.querySelector('summary');
 if(!p||!summary)return;
 const easy=meaning.textContent.trim();
 const detailed=p.textContent.trim();
 if(!easy||!detailed)return;
 meaning.textContent=detailed;
 const label=meaning.previousElementSibling;
 if(label)label.textContent='もう少しくわしく';
 p.textContent=easy;
 summary.textContent='やさしく説明すると';
 detail.open=false;
}
function schedule(){
 setTimeout(reverseCard,8);
 setTimeout(reverseCard,24);
}
function run(){
 document.addEventListener('click',e=>{if(e.target.closest?.('.tb-glossary-term'))schedule()},true);
 document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.closest?.('.tb-glossary-term'))schedule()},true);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
