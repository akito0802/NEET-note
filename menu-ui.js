(()=>{
'use strict';
if(window.__NEET_MENU_UI__)return;window.__NEET_MENU_UI__=true;
const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
const isHome=page==='index.html'||page==='';
const items=[
 ['index.html?mode=note','📝','ノート',isHome],
 ['lyrics.html','🎤','歌詞メモ',page==='lyrics.html'],
 ['voice-memo.html','🎙','ボイスメモ',page==='voice-memo'],
 ['ideas.html','💡','アイデアメモ',page==='ideas.html'],
 ['tools.html','🧰','制作ツール',page==='tools.html'],
 ['calendar.html','📅','制作カレンダー',page==='calendar.html'],
 ['melody.html','🎹','メロディ入力',page==='melody.html'],
 ['theory-assist.html','🧠','理論アシスト',page==='theory-assist.html'],
 ['https://akito0802.github.io/Cordhyo-/index.html','📚','コード辞典',false],
 ['https://akito0802.github.io/Cordhyo-/mix-lab.html','🎛️','Mix Lab',false],
 ['https://akito0802.github.io/scale/','🎸','スケール辞典',false],
 ['https://akito0802.github.io/-h/','🎵','指板',false],
 ['neeton-home.html','🏡','ニートンのおうち',page==='neeton-home.html'],
 ['about.html','ℹ️','NEET NOTEについて',page==='about.html'],
 ['terms.html','📜','利用規約',page==='terms.html']
];
const oldMenus=[...document.querySelectorAll('#sideMenu,#menu,.side-menu,.menu')];
const oldOverlays=[...document.querySelectorAll('#menuOverlay,#overlay,.menu-overlay')];
oldMenus.forEach(x=>{x.hidden=true;x.setAttribute('aria-hidden','true')});oldOverlays.forEach(x=>x.hidden=true);
const style=document.createElement('style');style.id='neet-menu-style';style.textContent=`
.neet-menu-overlay{position:fixed;inset:0;z-index:29000;background:rgba(17,24,39,.48);opacity:0;visibility:hidden;pointer-events:none;transition:opacity .22s ease,visibility .22s ease;backdrop-filter:blur(2px)}
.neet-menu-overlay.open{opacity:1;visibility:visible;pointer-events:auto}
.neet-side-menu{position:fixed;inset:0 auto 0 0;z-index:29001;display:flex;flex-direction:column;width:min(86vw,320px);height:100dvh;box-sizing:border-box;padding:max(22px,env(safe-area-inset-top)) 16px max(18px,env(safe-area-inset-bottom));background:var(--paper,var(--ui-surface,#fffdf8));color:var(--text,var(--ui-text,#1f2937));box-shadow:18px 0 46px rgba(0,0,0,.22);transform:translateX(-105%);visibility:hidden;transition:transform .24s cubic-bezier(.2,.8,.2,1),visibility .24s;overflow:hidden}
.neet-side-menu.open{transform:none;visibility:visible}.neet-menu-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:2px 4px 16px;border-bottom:1px solid var(--border,var(--ui-line,rgba(0,0,0,.1)))}.neet-menu-brand{display:flex;align-items:center;gap:11px}.neet-menu-logo{display:grid;place-items:center;width:42px;height:42px;border-radius:14px;background:linear-gradient(145deg,#eee1ce,#fffaf1);font-size:1.25rem;box-shadow:inset 0 0 0 1px rgba(0,0,0,.06)}.neet-menu-brand b{display:block;font-size:1rem}.neet-menu-brand small{display:block;margin-top:2px;color:var(--muted,var(--ui-muted,#756f67));font-size:.68rem;font-weight:800;letter-spacing:.12em}.neet-menu-close{display:grid;place-items:center;width:40px;height:40px;padding:0;border:1px solid var(--border,var(--ui-line,rgba(0,0,0,.1)));border-radius:12px;background:var(--surface,var(--ui-surface-2,rgba(127,127,127,.1)));color:inherit;font-size:1.25rem;cursor:pointer}.neet-menu-links{display:grid;gap:5px;margin:14px 0;overflow-y:auto;overscroll-behavior:contain}.neet-menu-link{display:flex;align-items:center;gap:12px;width:100%;min-height:46px;box-sizing:border-box;padding:10px 12px;border:1px solid transparent;border-radius:13px;background:transparent;color:inherit;text-decoration:none;font:inherit;font-weight:800;text-align:left;cursor:pointer}.neet-menu-link:hover{background:var(--surface,var(--ui-surface-2,rgba(127,127,127,.08)))}.neet-menu-link.current{border-color:rgba(169,120,69,.22);background:rgba(169,120,69,.14);color:inherit}.neet-menu-icon{display:grid;place-items:center;width:30px;height:30px;flex:0 0 30px;border-radius:9px;background:rgba(169,120,69,.1);font-size:1rem}.neet-menu-footer{display:grid;gap:7px;margin-top:auto;padding-top:14px;border-top:1px solid var(--border,var(--ui-line,rgba(0,0,0,.1)))}.neet-menu-footer .neet-menu-link{min-height:42px}.neet-menu-hamburger{display:grid!important;place-items:center!important;width:42px!important;height:42px!important;padding:0!important;border:1px solid var(--border,var(--ui-line,rgba(0,0,0,.1)))!important;border-radius:12px!important;background:var(--paper,var(--ui-surface,#fffdf8))!important;color:inherit!important;font-size:1.3rem!important;cursor:pointer!important}.neet-menu-fallback{position:fixed!important;top:max(14px,env(safe-area-inset-top))!important;left:max(14px,env(safe-area-inset-left))!important;z-index:28000!important;box-shadow:0 8px 24px rgba(0,0,0,.16)!important}
@media(max-width:520px){.neet-side-menu{width:min(90vw,310px)}.neet-menu-hamburger{width:40px!important;height:40px!important}}
@media(prefers-reduced-motion:reduce){.neet-side-menu,.neet-menu-overlay{transition:none}}
`;document.head.appendChild(style);
const overlay=document.createElement('div');overlay.className='neet-menu-overlay';overlay.id='neetMenuOverlay';
const nav=document.createElement('nav');nav.className='neet-side-menu';nav.id='neetSideMenu';nav.setAttribute('aria-label','NEET NOTE メニュー');nav.setAttribute('aria-hidden','true');
nav.innerHTML=`<div class="neet-menu-head"><div class="neet-menu-brand"><div class="neet-menu-logo">♪</div><div><b>NEET NOTE</b><small>COMPOSITION NOTE</small></div></div><button class="neet-menu-close" type="button" aria-label="メニューを閉じる">×</button></div><div class="neet-menu-links">${items.map(([href,icon,label,current])=>`<a class="neet-menu-link${current?' current':''}" href="${href}"${current?' aria-current="page"':''}><span class="neet-menu-icon">${icon}</span><span>${label}</span></a>`).join('')}</div><div class="neet-menu-footer"><button class="neet-menu-link" type="button" id="neetCloudMenuSlot"><span class="neet-menu-icon">☁️</span><span>ログイン・同期</span></button><button class="neet-menu-link" type="button" data-theme-toggle><span class="neet-menu-icon">🌙</span><span>ダークモード</span></button><button class="neet-menu-link" type="button" id="neetHelpMenu"><span class="neet-menu-icon">❓</span><span>ヘルプ・使い方</span></button></div>`;
document.body.append(overlay,nav);
const open=()=>{overlay.classList.add('open');nav.classList.add('open');nav.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';nav.querySelector('.neet-menu-close')?.focus()};
const close=()=>{overlay.classList.remove('open');nav.classList.remove('open');nav.setAttribute('aria-hidden','true');document.body.style.overflow=''};
let triggers=[...document.querySelectorAll('#menuOpenBtn,#openMenu,.menu-button,[aria-label*="メニューを開く"]')];
if(!triggers.length){const fallback=document.createElement('button');fallback.id='neetFallbackMenuButton';fallback.type='button';fallback.className='neet-menu-hamburger neet-menu-fallback';fallback.setAttribute('aria-label','メニューを開く');fallback.setAttribute('aria-expanded','false');fallback.textContent='☰';document.body.appendChild(fallback);triggers=[fallback]}
triggers.forEach(btn=>{btn.classList.add('neet-menu-hamburger');btn.innerHTML='☰';btn.setAttribute('aria-label','メニューを開く');btn.setAttribute('aria-expanded','false');btn.onclick=e=>{e.preventDefault();open();btn.setAttribute('aria-expanded','true')}});
nav.querySelector('.neet-menu-close').onclick=()=>{close();triggers.forEach(btn=>btn.setAttribute('aria-expanded','false'))};overlay.onclick=()=>{close();triggers.forEach(btn=>btn.setAttribute('aria-expanded','false'))};nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape'){close();triggers.forEach(btn=>btn.setAttribute('aria-expanded','false'))}});
nav.querySelector('#neetHelpMenu').onclick=()=>alert('ノート・歌詞・録音・アイデア・制作ツール・制作カレンダー・コード・Mix Lab・スケール・指板・理論アシストへ、同じメニューから移動できるよ。');
const cloudSlot=nav.querySelector('#neetCloudMenuSlot');
const connectCloud=()=>{const original=document.getElementById('cloudSyncMenuButton');if(!original)return false;cloudSlot.onclick=()=>original.click();const label=original.querySelector('#cloudMenuLabel')?.textContent||'ログイン・同期';cloudSlot.querySelector('span:last-child').textContent=label;new MutationObserver(()=>{cloudSlot.querySelector('span:last-child').textContent=original.querySelector('#cloudMenuLabel')?.textContent||'ログイン・同期'}).observe(original,{subtree:true,childList:true,characterData:true});return true};
if(!connectCloud()){let tries=0;const timer=setInterval(()=>{if(connectCloud()||++tries>30)clearInterval(timer)},300)}
if(page==='theory-assist.html'&&!document.querySelector('script[data-neet-theory-guide]')){const g=document.createElement('script');g.src='theory-guide.js?v=20260810-2';g.dataset.neetTheoryGuide='1';document.body.appendChild(g)}
if(page==='theory-assist.html'&&!document.querySelector('script[data-neet-theory-layout]')){const l=document.createElement('script');l.src='theory-layout-split.js?v=20260810-1';l.dataset.neetTheoryLayout='1';document.body.appendChild(l)}
})();