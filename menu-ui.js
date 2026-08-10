(()=>{
'use strict';
if(window.__NEET_MENU_UI__)return;window.__NEET_MENU_UI__=true;
const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
const isHome=page==='index.html'||page==='';
const items=[
 ['index.html?mode=note','📝','ノート',isHome],
 ['lyrics.html','🎤','歌詞メモ',page==='lyrics.html'],
 ['voice-memo.html','🎙','ボイスメモ',page==='voice-memo.html'],
 ['ideas.html','💡','アイデアメモ',page==='ideas.html'],
 ['tools.html','🧰','制作ツール',page==='tools.html'],
 ['calendar.html','📅','制作カレンダー',page==='calendar.html'],
 ['melody.html','🎹','メロディ入力',page==='melody.html'],
 ['theory-assist.html','🧠','理論アシスト',page==='theory-assist.html'],
 ['theory-library.html','📚','統合理論ライブラリ',page==='theory-library.html'],
 ['https://akito0802.github.io/Cordhyo-/index.html','🎸','コード辞典',false],
 ['https://akito0802.github.io/scale/','🎼','スケール辞典',false],
 ['https://akito0802.github.io/-h/','🎵','指板',false],
 ['neeton-home.html','🏡','ニートンのおうち',page==='neeton-home.html']
];
const oldMenu=document.getElementById('sideMenu');
const oldOverlay=document.getElementById('menuOverlay');
if(oldMenu)oldMenu.style.display='none';
if(oldOverlay)oldOverlay.style.display='none';
const style=document.createElement('style');
style.textContent=`.neet-menu-overlay{position:fixed;inset:0;z-index:29000;background:rgba(17,24,39,.45);opacity:0;visibility:hidden;pointer-events:none;transition:.18s}.neet-menu-overlay.open{opacity:1;visibility:visible;pointer-events:auto}.neet-side-menu{position:fixed;top:0;bottom:0;left:0;z-index:29001;width:min(86vw,310px);padding:20px 14px;background:var(--paper,#fffdf8);color:var(--text,#1f2937);box-shadow:16px 0 34px rgba(0,0,0,.2);transform:translateX(-105%);transition:.2s;overflow-y:auto}.neet-side-menu.open{transform:translateX(0)}.neet-menu-head{display:flex;align-items:center;justify-content:space-between;padding:2px 4px 14px;border-bottom:1px solid var(--border,#ded6c9)}.neet-menu-head b{font-size:1rem}.neet-menu-close{width:38px;height:38px;border:1px solid var(--border,#ded6c9);border-radius:11px;background:var(--surface,#f4eee4);color:inherit;font-size:1.2rem}.neet-menu-links{display:grid;gap:4px;margin-top:12px}.neet-menu-link{display:flex;align-items:center;gap:11px;min-height:44px;padding:9px 11px;border-radius:12px;color:inherit;text-decoration:none;font-weight:800}.neet-menu-link.current{background:rgba(139,111,71,.13)}.neet-menu-icon{width:28px;text-align:center}.neet-menu-hamburger{display:grid!important;place-items:center!important;width:42px!important;height:42px!important;padding:0!important;border:1px solid var(--border,#ded6c9)!important;border-radius:12px!important;background:var(--paper,#fffdf8)!important;color:inherit!important;font-size:1.25rem!important}`;
document.head.appendChild(style);
const overlay=document.createElement('div');overlay.className='neet-menu-overlay';
const nav=document.createElement('nav');nav.className='neet-side-menu';nav.setAttribute('aria-hidden','true');
nav.innerHTML=`<div class="neet-menu-head"><b>NEET NOTE</b><button class="neet-menu-close" type="button" aria-label="閉じる">×</button></div><div class="neet-menu-links">${items.map(([href,icon,label,current])=>`<a class="neet-menu-link${current?' current':''}" href="${href}"><span class="neet-menu-icon">${icon}</span><span>${label}</span></a>`).join('')}</div>`;
document.body.append(overlay,nav);
const triggers=[...document.querySelectorAll('#menuOpenBtn,#openMenu,.menu-button,[aria-label*="メニューを開く"]')];
if(!triggers.length){const b=document.createElement('button');b.id='menuOpenBtn';b.className='neet-menu-hamburger';b.textContent='☰';b.style.position='fixed';b.style.top='14px';b.style.left='14px';b.style.zIndex='28000';document.body.appendChild(b);triggers.push(b)}
const open=()=>{overlay.classList.add('open');nav.classList.add('open');nav.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'};
const close=()=>{overlay.classList.remove('open');nav.classList.remove('open');nav.setAttribute('aria-hidden','true');document.body.style.overflow=''};
triggers.forEach(btn=>{btn.classList.add('neet-menu-hamburger');btn.textContent='☰';btn.onclick=e=>{e.preventDefault();open()}});
nav.querySelector('.neet-menu-close').onclick=close;overlay.onclick=close;nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
})();