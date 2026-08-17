(()=>{
'use strict';
if(window.__NEET_GLOBAL_MENU_COLLAPSE__)return;
window.__NEET_GLOBAL_MENU_COLLAPSE__=true;

const install=()=>{
  const menu=document.querySelector('.ngm-menu');
  if(!menu||menu.dataset.collapseReady==='1')return false;
  const sections=[...menu.querySelectorAll('.ngm-section')];
  if(!sections.length)return false;
  menu.dataset.collapseReady='1';

  if(!document.getElementById('ngm-collapse-style')){
    const style=document.createElement('style');
    style.id='ngm-collapse-style';
    style.textContent=`
      .ngm-section{margin-top:9px!important}
      .ngm-section-toggle{display:grid;grid-template-columns:1fr auto;align-items:center;gap:10px;width:100%;min-height:44px;padding:9px 11px;border:1px solid var(--ngm-line);border-radius:13px;background:rgba(255,253,248,.82);color:var(--ngm-text);font:inherit;text-align:left;cursor:pointer;transition:.14s background,.14s border-color}
      .ngm-section-toggle:hover{background:#f4eadc}
      .ngm-section-toggle-label{font-size:.76rem;font-weight:900;letter-spacing:.025em}
      .ngm-section-toggle-meta{display:flex;align-items:center;gap:8px;color:var(--ngm-muted);font-size:.64rem;font-weight:800}
      .ngm-section-toggle-arrow{display:inline-block;font-size:.9rem;transition:transform .18s ease}
      .ngm-section.open>.ngm-section-toggle .ngm-section-toggle-arrow{transform:rotate(90deg)}
      .ngm-section>.ngm-card-list{margin-top:5px;overflow:hidden}
      .ngm-section>.ngm-card-list[hidden]{display:none!important}
      html[data-theme="dark"] .ngm-section-toggle{background:rgba(48,42,35,.94)}
      html[data-theme="dark"] .ngm-section-toggle:hover{background:#3a3027}
      @media(max-width:600px){
        .ngm-menu{width:min(88vw,340px)!important;max-width:340px!important;border-radius:0 22px 22px 0!important;padding-left:12px!important;padding-right:12px!important}
        .ngm-section-toggle{min-height:48px;padding:10px 11px}
        .ngm-section-toggle-label{font-size:.79rem}
      }
    `;
    document.head.appendChild(style);
  }

  let currentSection=null;
  sections.forEach((section,index)=>{
    const label=section.querySelector('.ngm-section-label');
    const list=section.querySelector('.ngm-card-list');
    if(!label||!list)return;
    const id=`ngm-section-list-${index}`;
    list.id=id;
    const button=document.createElement('button');
    button.type='button';
    button.className='ngm-section-toggle';
    button.setAttribute('aria-controls',id);
    button.innerHTML=`<span class="ngm-section-toggle-label">${label.textContent.trim()}</span><span class="ngm-section-toggle-meta"><span>${list.querySelectorAll('.ngm-link').length}件</span><span class="ngm-section-toggle-arrow">›</span></span>`;
    label.replaceWith(button);
    if(list.querySelector('.ngm-link.current'))currentSection=section;
  });

  const setOpen=(section,open)=>{
    const button=section.querySelector('.ngm-section-toggle');
    const list=section.querySelector('.ngm-card-list');
    if(!button||!list)return;
    section.classList.toggle('open',open);
    button.setAttribute('aria-expanded',open?'true':'false');
    list.hidden=!open;
  };
  sections.forEach(section=>setOpen(section,section===currentSection));

  menu.addEventListener('click',e=>{
    const button=e.target.closest('.ngm-section-toggle');
    if(!button||!menu.contains(button))return;
    const section=button.closest('.ngm-section');
    const willOpen=!section.classList.contains('open');
    sections.forEach(s=>setOpen(s,s===section&&willOpen));
  });
  return true;
};

if(!install()){
  let tries=0;
  const timer=setInterval(()=>{if(install()||++tries>50)clearInterval(timer)},50);
}
})();