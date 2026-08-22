(()=>{
'use strict';
const mq=window.matchMedia('(max-width: 640px)');

function set(el,prop,value){if(el)el.style.setProperty(prop,value,'important')}
function clear(el,props){if(!el)return;for(const p of props)el.style.removeProperty(p)}

function applyCard(card){
  const no=card.querySelector(':scope > .tb-no');
  const icon=card.querySelector(':scope > .tb-icon');
  const count=card.querySelector(':scope > em');
  const content=[...card.children].find(el=>el.tagName==='SPAN'&&!el.classList.contains('tb-no')&&!el.classList.contains('tb-icon'));

  if(!mq.matches){
    clear(card,['display','grid-template-columns','grid-template-areas','gap','width','min-height','padding','align-items']);
    clear(no,['grid-area','padding','font-size','line-height','white-space']);
    clear(icon,['display']);
    clear(content,['grid-area','display','width','min-width']);
    clear(content?.querySelector('b'),['display','margin','font-size','line-height','letter-spacing','white-space','word-break','overflow-wrap']);
    clear(content?.querySelector('small'),['display','margin-top','font-size','line-height','white-space','word-break','overflow-wrap']);
    clear(count,['grid-area','align-self','justify-self','max-width','margin','font-size','line-height','text-align','white-space']);
    return;
  }

  set(card,'display','grid');
  set(card,'grid-template-columns','minmax(0,1fr) auto');
  set(card,'grid-template-areas','"no count" "content content"');
  set(card,'gap','9px 12px');
  set(card,'width','100%');
  set(card,'min-height','auto');
  set(card,'padding','16px');
  set(card,'align-items','start');

  set(no,'grid-area','no');
  set(no,'padding','0');
  set(no,'font-size','.78rem');
  set(no,'line-height','1.3');
  set(no,'white-space','nowrap');

  set(icon,'display','none');

  set(content,'grid-area','content');
  set(content,'display','block');
  set(content,'width','100%');
  set(content,'min-width','0');

  const title=content?.querySelector('b');
  set(title,'display','block');
  set(title,'margin','0');
  set(title,'font-size','1.16rem');
  set(title,'line-height','1.45');
  set(title,'letter-spacing','-.01em');
  set(title,'white-space','normal');
  set(title,'word-break','normal');
  set(title,'overflow-wrap','break-word');

  const desc=content?.querySelector('small');
  set(desc,'display','block');
  set(desc,'margin-top','6px');
  set(desc,'font-size','.84rem');
  set(desc,'line-height','1.7');
  set(desc,'white-space','normal');
  set(desc,'word-break','normal');
  set(desc,'overflow-wrap','break-word');

  set(count,'grid-area','count');
  set(count,'align-self','start');
  set(count,'justify-self','end');
  set(count,'max-width','none');
  set(count,'margin','0');
  set(count,'font-size','.8rem');
  set(count,'line-height','1.3');
  set(count,'text-align','right');
  set(count,'white-space','nowrap');
}

function apply(){
  document.querySelectorAll('.tb-categories').forEach(grid=>{
    if(mq.matches){set(grid,'grid-template-columns','1fr');set(grid,'gap','12px')}
    else clear(grid,['grid-template-columns','gap']);
  });
  document.querySelectorAll('.tb-cat').forEach(applyCard);
}

function schedule(){requestAnimationFrame(apply)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
if(mq.addEventListener)mq.addEventListener('change',schedule);else mq.addListener(schedule);
})();
