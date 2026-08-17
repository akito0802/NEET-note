(()=>{
'use strict';
if(!document.querySelector('script[src^="seo.js"]')){const s=document.createElement('script');s.src='seo.js?v=3';document.head.appendChild(s)}
const root=document.documentElement,meta=document.querySelector('meta[name="theme-color"]'),THEME='neet-note-theme';
const preferred=()=>{const s=localStorage.getItem(THEME);return s==='light'||s==='dark'?s:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')};
const apply=t=>{root.dataset.theme=t;root.style.colorScheme=t;meta?.setAttribute('content',t==='dark'?'#141311':'#d9c7a8');document.querySelectorAll('[data-theme-toggle]').forEach(b=>{const d=t==='dark';b.innerHTML=`<span>${d?'☀️':'🌙'}</span><span>${d?'ライトモード':'ダークモード'}</span>`})};
apply(preferred());document.addEventListener('click',e=>{const b=e.target.closest('[data-theme-toggle]');if(!b)return;const n=root.dataset.theme==='dark'?'light':'dark';localStorage.setItem(THEME,n);apply(n)});

const params=new URLSearchParams(location.search),path=location.pathname.replace(/\/index\.html$/,'/'),intro=document.getElementById('neetIntro');
const shouldIntro=/\/NEET-note\/$/.test(path)&&!params.has('mode')&&!params.has('song')&&!document.referrer.startsWith(`${location.origin}/NEET-note/`)&&sessionStorage.getItem('neet-note-intro-shown')!=='1';
if(intro){if(shouldIntro)sessionStorage.setItem('neet-note-intro-shown','1');else{intro.remove();document.body.style.overflow=''}}

const side=document.getElementById('sideMenu');
if(side){
 const items=[['./?mode=note','📝','ノート'],['lyrics.html','🎤','歌詞メモ'],['voice-memo.html','🎙','ボイスメモ'],['ideas.html','💡','アイデアメモ'],['tools.html','🧰','ツール'],['calendar.html','📅','制作カレンダー'],['neeton-home.html','🏡','ニートンのおうち'],['terms.html','📜','利用規約']];
 const theme=side.querySelector('[data-theme-toggle]');
 items.forEach(([href,icon,label])=>{if([...side.querySelectorAll('a')].some(a=>a.getAttribute('href')?.includes(href.replace('./',''))))return;const a=document.createElement('a');a.className='menu-link';a.href=href;a.innerHTML=`<span class="menu-icon">${icon}</span><span>${label}</span>`;side.insertBefore(a,theme||null)});
 if(!document.getElementById('neetHelpButton')){const b=document.createElement('button');b.id='neetHelpButton';b.type='button';b.className='menu-link';b.innerHTML='<span class="menu-icon">❓</span><span>ヘルプ・使い方</span>';side.insertBefore(b,theme||null);b.onclick=()=>alert('ノート・歌詞・録音・アイデア・制作ツール・制作カレンダーを、それぞれ独立して使えるよ。')}
}

// トップ画面は home-v2.js が作る NEETNOTE ダッシュボードに統一。
document.getElementById('homeDashboard')?.remove();
document.getElementById('neetHomeDashboard')?.remove();

const NEETON_FALLBACK='neeton.svg?v=4';
const imageFallback=img=>{if(img.dataset.neetonFallback==='1')return;img.dataset.neetonFallback='1';img.src=NEETON_FALLBACK;img.alt=img.alt||'ニートン'};
document.querySelectorAll('img[data-neeton],img[src*="neeton"]').forEach(img=>img.addEventListener('error',()=>imageFallback(img),{once:true}));
document.addEventListener('error',e=>{const img=e.target;if(img instanceof HTMLImageElement&&(img.dataset.neeton!==undefined||/neeton/i.test(img.src)))imageFallback(img)},true);

if(intro&&!intro.querySelector('.neeton-intro-image')){
 const img=document.createElement('img');img.className='neeton-intro-image';img.src=NEETON_FALLBACK;img.alt='ニートン';img.dataset.neeton='';
 const style=document.createElement('style');style.textContent='.neeton-intro-image{display:block;width:min(54vw,220px);height:auto;object-fit:contain;margin:0 auto 16px;filter:drop-shadow(0 14px 22px rgba(0,0,0,.2));transform:translateZ(0);backface-visibility:hidden}@media(max-width:520px){.neeton-intro-image{width:min(48vw,170px)}}';
 document.head.appendChild(style);intro.querySelector('.intro-copy')?.prepend(img);
}

if(!document.getElementById('neetonPageMascot')&&!location.pathname.endsWith('neeton-home.html')&&!/\/NEET-note\/(?:index\.html)?$/.test(location.pathname)){
 const page=location.pathname.split('/').pop()||'index.html';
 const variants={
  'lyrics.html':{label:'歌詞のひらめき、メモしよ',x:'50%',y:'0%'},
  'voice-memo.html':{label:'メロディを忘れないうちに',x:'100%',y:'0%'},
  'ideas.html':{label:'そのアイデア、最高かも',x:'0%',y:'33.333%'},
  'tools.html':{label:'制作をちょっとお手伝い',x:'50%',y:'33.333%'},
  'calendar.html':{label:'今日の制作を残しておこう',x:'50%',y:'66.666%'},
  'terms.html':{label:'大事なことを確認中',x:'100%',y:'33.333%'},
  'about.html':{label:'NEET NOTEを紹介するね',x:'0%',y:'66.666%'},
  '404.html':{label:'迷子になっちゃったみたい',x:'100%',y:'66.666%'}
 };
 const v=variants[page];
 if(v){
  const style=document.createElement('style');style.textContent='.neeton-page-mascot{position:fixed;right:max(12px,env(safe-area-inset-right));bottom:max(14px,env(safe-area-inset-bottom));z-index:8500;display:flex;align-items:center;gap:10px;padding:8px 12px 8px 8px;border:1px solid var(--ui-line,rgba(0,0,0,.12));border-radius:999px;background:color-mix(in srgb,var(--ui-surface,#fffdf8) 94%,transparent);box-shadow:0 10px 28px rgba(0,0,0,.14);backdrop-filter:blur(10px);color:var(--ui-text,#1f2937);font-size:.76rem;font-weight:800;line-height:1.25;transition:.2s}.neeton-page-mascot:hover{transform:translateY(-2px)}.neeton-page-face{width:54px;height:54px;flex:0 0 auto;border-radius:50%;background-image:url("neeton-versions.svg?v=3"),url("neeton.svg?v=4");background-size:300% 400%,cover;background-repeat:no-repeat;background-position:var(--nx) var(--ny),center;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08)}.neeton-page-close{display:grid;place-items:center;width:24px;height:24px;padding:0;border:0;border-radius:50%;background:rgba(0,0,0,.07);color:inherit;font-size:14px;cursor:pointer}@media(max-width:520px){.neeton-page-mascot{max-width:170px}.neeton-page-mascot span{display:none}.neeton-page-face{width:50px;height:50px}}';document.head.appendChild(style);
  const mascot=document.createElement('aside');mascot.id='neetonPageMascot';mascot.className='neeton-page-mascot';mascot.setAttribute('aria-label',`ニートン：${v.label}`);mascot.innerHTML=`<div class="neeton-page-face" style="--nx:${v.x};--ny:${v.y}"></div><span>${v.label}</span><button class="neeton-page-close" type="button" aria-label="ニートンを閉じる">×</button>`;document.body.appendChild(mascot);mascot.querySelector('button').onclick=()=>mascot.remove();
 }
}

if(!document.querySelector('link[rel="manifest"]')){const m=document.createElement('link');m.rel='manifest';m.href='manifest.webmanifest?v=19';document.head.appendChild(m)}
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(console.error));
const load=(src,v='4')=>new Promise((r,j)=>{if(document.querySelector(`script[src^="${src}"]`)){r();return}const s=document.createElement('script');s.src=`${src}?v=${v}`;s.onload=r;s.onerror=j;document.body.appendChild(s)});
if(!location.pathname.endsWith('terms.html')&&!location.pathname.endsWith('neeton-home.html'))load('firebase-config.js','20260805b').then(()=>load('cloud-sync.js','20260805b')).catch(console.error);
})();