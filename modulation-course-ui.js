(()=>{
'use strict';
const $=id=>document.getElementById(id);
const META={1:['LEVEL 1','基礎'],2:['LEVEL 2','基本技法'],3:['LEVEL 3','応用'],4:['LEVEL 4','実践']};
let timer=0;

function currentLesson(){return new URLSearchParams(location.search).get('lesson')||''}
function preserveLibraryUrl(){
  const p=new URLSearchParams(location.search);
  p.set('view','library');
  const from=$('fromKey')?.value,to=$('toKey')?.value;
  if(from)p.set('from',from);if(to)p.set('to',to);
  history.replaceState(null,'',`${location.pathname}?${p.toString()}`);
}
function regroup(){
  const grid=$('lessonGrid');if(!grid)return;
  const cards=[...grid.children].filter(el=>el.classList?.contains('ml-card'));
  if(!cards.length)return;
  const selected=currentLesson();
  const wrap=document.createElement('div');wrap.className='ml-course-columns';
  let visible=0;
  for(let lv=1;lv<=4;lv++){
    const group=cards.filter(card=>card.querySelector('.ml-card-top span')?.textContent.includes(`LEVEL ${lv}`));
    if(!group.length)continue;
    visible++;
    const section=document.createElement('section');section.className='ml-course-column';section.dataset.courseLevel=String(lv);
    const head=document.createElement('header');head.className='ml-course-column-head';head.innerHTML=`<span>${META[lv][0]}</span><b>${META[lv][1]}</b>`;
    const list=document.createElement('div');list.className='ml-course-list';
    group.forEach(card=>{
      card.classList.add('ml-course-row');
      card.classList.toggle('selected',card.dataset.id===selected);
      card.tabIndex=0;card.setAttribute('role','button');
      card.setAttribute('aria-label',`${card.querySelector('h3')?.textContent||'レッスン'}を開く`);
      card.onclick=e=>{
        if(e.target.closest('button,a'))return;
        card.querySelector('[data-detail]')?.click();
      };
      card.onkeydown=e=>{if((e.key==='Enter'||e.key===' ')&&!e.target.closest('button,a')){e.preventDefault();card.querySelector('[data-detail]')?.click()}};
      list.appendChild(card);
    });
    section.append(head,list);wrap.appendChild(section);
  }
  grid.innerHTML='';grid.appendChild(wrap);
  wrap.dataset.visible=String(visible);
}
function decorateDetail(){
  const detail=$('detail');if(!detail)return;
  detail.classList.add('ml-course-detail');
  const title=detail.querySelector('h2')?.textContent;
  if(title){
    document.querySelectorAll('.ml-course-row').forEach(card=>card.classList.toggle('selected',card.querySelector('h3')?.textContent===title));
  }
  preserveLibraryUrl();
}
function sync(){clearTimeout(timer);timer=setTimeout(()=>{regroup();decorateDetail()},0)}
function init(){
  sync();
  document.addEventListener('click',e=>{
    if(e.target.closest('[data-level],[data-purpose],#clearSearch,[data-detail]'))sync();
  },false);
  document.addEventListener('input',e=>{if(e.target.id==='search')sync()},false);
  document.addEventListener('change',e=>{if(e.target.id==='fromKey'||e.target.id==='toKey')setTimeout(preserveLibraryUrl,0)},false);
  const q=new URLSearchParams(location.search);if(q.get('view')==='library')setTimeout(preserveLibraryUrl,0);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
