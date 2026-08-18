(()=>{
'use strict';
if(window.__NEET_FIFTHS_INTEGRATION__)return;
window.__NEET_FIFTHS_INTEGRATION__=true;
const ROOT='https://akito0802.github.io/NEET-note/';
const FIFTHS=ROOT+'circle-of-fifths.html';
const MINORLAB=ROOT+'major-to-minor-lab.html';

function addHomeTile(grid,{href,icon,label,desc,key}){
  if(grid.querySelector(`[data-neet-theory-tool="${key}"]`))return;
  const a=document.createElement('a');
  a.href=href;
  a.className='nh-tile';
  a.dataset.neetTheoryTool=key;
  a.innerHTML=`<span class="nh-icon">${icon}</span><span class="nh-tile-copy"><b>${label}</b><small>${desc}</small></span>`;
  grid.appendChild(a);
}
function installHome(){
  const grid=document.querySelector('.nh-grid-theory');
  if(!grid)return;
  addHomeTile(grid,{href:FIFTHS,icon:'◉',label:'五度圏',desc:'調・近親調・ダイアトニックを可視化',key:'fifths'});
  addHomeTile(grid,{href:MINORLAB,icon:'⇄',label:'長調→短調',desc:'コードとメロディを同主短調へ変換',key:'major-minor'});
  const group=grid.closest('.nh-tool-group');
  const count=group?.querySelector('.nh-group-head small');
  if(count)count.textContent='6 tools';
  const status=document.querySelector('.nh-status span:first-child');
  if(status)status.textContent='14 TOOLS';
}
function addMenuLink(list,{href,icon,label,key}){
  if(list.querySelector(`[data-neet-theory-tool="${key}"]`))return;
  const current=location.pathname.endsWith('/'+href.split('/').pop());
  const a=document.createElement('a');
  a.className='ngm-link'+(current?' current':'');
  a.href=href;
  a.dataset.neetTheoryTool=key;
  if(current)a.setAttribute('aria-current','page');
  a.innerHTML=`<span class="ngm-icon">${icon}</span><span>${label}</span><span class="ngm-chevron">›</span>`;
  list.appendChild(a);
}
function installMenu(){
  const sections=[...document.querySelectorAll('.ngm-section')];
  const section=sections.find(s=>s.querySelector('.ngm-section-label')?.textContent.includes('ライブラリ'));
  const list=section?.querySelector('.ngm-card-list');
  if(!list)return;
  addMenuLink(list,{href:FIFTHS,icon:'◉',label:'インタラクティブ五度圏',key:'fifths'});
  addMenuLink(list,{href:MINORLAB,icon:'⇄',label:'長調→短調 変換ラボ',key:'major-minor'});
}
function install(){installHome();installMenu()}
install();
new MutationObserver(install).observe(document.documentElement,{childList:true,subtree:true});
window.addEventListener('pageshow',install,{passive:true});
})();