(()=>{
'use strict';
if(window.__NEET_HOME_ROUTE_FIX__)return;
window.__NEET_HOME_ROUTE_FIX__=true;

const ROOT='https://akito0802.github.io/NEET-note/';
const TOP_URL=ROOT+'?home=current';
const TOP_PATH_RE=/\/NEET-note\/(?:index\.html)?$/;

const labelOf=el=>[el?.textContent,el?.getAttribute?.('aria-label'),el?.getAttribute?.('title')].filter(Boolean).join(' ').replace(/\s+/g,' ').trim();
const isHomeControl=el=>{
  if(!(el instanceof Element))return false;
  if(el.matches('.ngm-top-return,.neet-top-return,.note-home-link,[data-neet-home-control="current"],[data-home-link="current"]'))return true;
  const label=labelOf(el);
  if(/トップへ戻る|トップに戻る|←\s*ホーム|ホームへ戻る|ホームに戻る/.test(label))return true;
  if(/^(?:⌂|🏠)?\s*(?:HOME|ホーム|TOP|トップ)\s*$/i.test(label))return true;
  const idClass=`${el.id||''} ${typeof el.className==='string'?el.className:''}`;
  return /(?:^|[-_\s])(home|top)(?:[-_\s]|$)/i.test(idClass)&&!/dashboard|neeton/i.test(idClass);
};

const normalizeHomeControls=()=>{
  document.querySelectorAll('a,button').forEach(el=>{
    if(!isHomeControl(el))return;
    const label=labelOf(el);
    if(/ノート/.test(label)&&!/ホーム|トップ/.test(label))return;
    el.dataset.neetHomeControl='current';
    if(el.tagName==='A')el.setAttribute('href',TOP_URL);
  });
};

document.addEventListener('click',e=>{
  const el=e.target instanceof Element?e.target.closest('a,button'):null;
  if(!el||!isHomeControl(el))return;
  const label=labelOf(el);
  if(/ノート/.test(label)&&!/ホーム|トップ/.test(label))return;
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  window.location.assign(TOP_URL);
},true);

const ensureGuardStyle=()=>{
  if(document.getElementById('neet-current-home-route-guard'))return;
  const style=document.createElement('style');
  style.id='neet-current-home-route-guard';
  style.textContent=`html.neet-current-home-loading .app-header,html.neet-current-home-loading #listView>.toolbar,html.neet-current-home-loading #songList,html.neet-current-home-loading #emptyState{display:none!important}`;
  document.head.appendChild(style);
};

const forceCurrentHome=()=>{
  if(!TOP_PATH_RE.test(location.pathname))return;
  const params=new URLSearchParams(location.search);
  if(params.get('home')!=='current')return;
  if(params.has('mode')||params.has('song')){location.replace(TOP_URL);return;}

  ensureGuardStyle();
  document.documentElement.classList.add('neet-current-home-loading');
  document.body?.classList.remove('note-premium-ui');
  document.getElementById('homeDashboard')?.remove();
  document.getElementById('neetHomeDashboard')?.remove();

  if(document.getElementById('neetCurrentHomeDashboard')){
    document.documentElement.classList.remove('neet-current-home-loading');
    return;
  }
  if(!document.getElementById('listView'))return;
  if(document.querySelector('script[data-neet-current-home-force]'))return;

  const s=document.createElement('script');
  s.src=ROOT+'home-dashboard.js?v=20260814-6-'+Date.now();
  s.dataset.neetCurrentHomeForce='1';
  s.onload=()=>{
    if(document.getElementById('neetCurrentHomeDashboard'))document.documentElement.classList.remove('neet-current-home-loading');
  };
  document.body.appendChild(s);
};

const apply=()=>{normalizeHomeControls();forceCurrentHome()};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
new MutationObserver(()=>{
  normalizeHomeControls();
  if(document.getElementById('neetCurrentHomeDashboard'))document.documentElement.classList.remove('neet-current-home-loading');
}).observe(document.documentElement,{childList:true,subtree:true});
})();
