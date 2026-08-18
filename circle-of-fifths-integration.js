(()=>{
'use strict';
if(window.__NEET_FIFTHS_INTEGRATION__)return;
window.__NEET_FIFTHS_INTEGRATION__=true;
const ROOT='https://akito0802.github.io/NEET-note/';
const HREF=ROOT+'circle-of-fifths.html';

function installHome(){
  const grid=document.querySelector('.nh-grid-theory');
  if(!grid||grid.querySelector('[data-neet-fifths]'))return;
  const a=document.createElement('a');
  a.href=HREF;
  a.className='nh-tile';
  a.dataset.neetFifths='1';
  a.innerHTML='<span class="nh-icon">◉</span><span class="nh-tile-copy"><b>五度圏</b><small>調・近親調・ダイアトニックを可視化</small></span>';
  grid.appendChild(a);
  const group=grid.closest('.nh-tool-group');
  const count=group?.querySelector('.nh-group-head small');
  if(count)count.textContent='5 tools';
  const status=document.querySelector('.nh-status span:first-child');
  if(status)status.textContent='13 TOOLS';
}

function installMenu(){
  const sections=[...document.querySelectorAll('.ngm-section')];
  const section=sections.find(s=>s.querySelector('.ngm-section-label')?.textContent.includes('ライブラリ'));
  const list=section?.querySelector('.ngm-card-list');
  if(!list||list.querySelector('[data-neet-fifths]'))return;
  const a=document.createElement('a');
  const current=location.pathname.endsWith('/circle-of-fifths.html');
  a.className='ngm-link'+(current?' current':'');
  a.href=HREF;
  a.dataset.neetFifths='1';
  if(current)a.setAttribute('aria-current','page');
  a.innerHTML='<span class="ngm-icon">◉</span><span>インタラクティブ五度圏</span><span class="ngm-chevron">›</span>';
  list.appendChild(a);
}

function install(){installHome();installMenu()}
install();
new MutationObserver(install).observe(document.documentElement,{childList:true,subtree:true});
window.addEventListener('pageshow',install,{passive:true});
})();