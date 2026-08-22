(()=>{
'use strict';
const KEY='neet-theory-course-v2';
let raf=0;
let observer=null;
let retries=0;

function readCourseId(){
  try{return JSON.parse(localStorage.getItem(KEY))||''}catch{return''}
}
function courseById(id){
  return window.NEET_THEORY_OS_DATA?.courses?.find(c=>c.id===id)||null;
}
function chapterNo(card){
  const match=(card?.textContent||'').match(/第\s*(\d+)\s*編/);
  return match?Number(match[1]):0;
}
function apply(courseId=readCourseId()){
  const selected=courseById(courseId);
  document.querySelectorAll('.tb-cat,.tb-catx').forEach(card=>{
    const no=chapterNo(card);
    if(!selected||!no){
      card.classList.remove('tlo-course-hit','tlo-course-dim');
      return;
    }
    const hit=selected.chapters.includes(no);
    card.classList.toggle('tlo-course-hit',hit);
    card.classList.toggle('tlo-course-dim',!hit);
  });
}
function schedule(courseId){
  if(raf)cancelAnimationFrame(raf);
  raf=requestAnimationFrame(()=>{
    raf=0;
    apply(courseId===undefined?readCourseId():courseId);
  });
}
function waitForData(){
  if(window.NEET_THEORY_OS_DATA?.courses){
    schedule();
    return;
  }
  if(retries++<100)setTimeout(waitForData,100);
}
function boot(){
  document.addEventListener('click',e=>{
    const button=e.target.closest?.('.tlo-course[data-course]');
    if(!button)return;
    setTimeout(()=>schedule(button.dataset.course),0);
  });
  observer=new MutationObserver(()=>schedule());
  observer.observe(document.body,{childList:true,subtree:true});
  waitForData();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
else boot();
})();
