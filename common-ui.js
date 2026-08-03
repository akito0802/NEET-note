(()=>{
'use strict';
if(!document.querySelector('script[src^="seo.js"]')){const s=document.createElement('script');s.src='seo.js?v=1';document.head.appendChild(s)}
const root=document.documentElement,meta=document.querySelector('meta[name="theme-color"]'),THEME='neet-note-theme';
const preferred=()=>{const s=localStorage.getItem(THEME);return s==='light'||s==='dark'?s:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')};
const apply=t=>{root.dataset.theme=t;root.style.colorScheme=t;meta?.setAttribute('content',t==='dark'?'#141311':'#d9c7a8');document.querySelectorAll('[data-theme-toggle]').forEach(b=>{const d=t==='dark';b.innerHTML=`<span>${d?'☀️':'🌙'}</span><span>${d?'ライトモード':'ダークモード'}</span>`})};
apply(preferred());document.addEventListener('click',e=>{const b=e.target.closest('[data-theme-toggle]');if(!b)return;const n=root.dataset.theme==='dark'?'light':'dark';localStorage.setItem(THEME,n);apply(n)});

const params=new URLSearchParams(location.search),path=location.pathname.replace(/\/index\.html$/,'/'),intro=document.getElementById('neetIntro');
const shouldIntro=/\/NEET-note\/$/.test(path)&&!params.has('mode')&&!params.has('song')&&!document.referrer.startsWith(`${location.origin}/NEET-note/`)&&sessionStorage.getItem('neet-note-intro-shown')!=='1';
if(intro){if(shouldIntro)sessionStorage.setItem('neet-note-intro-shown','1');else{intro.remove();document.body.style.overflow=''}}

const side=document.getElementById('sideMenu');
if(side){
 const items=[['./?mode=note','📝','ノート'],['lyrics.html','🎤','歌詞メモ'],['voice-memo.html','🎙','ボイスメモ'],['ideas.html','💡','アイデアメモ'],['tools.html','🧰','ツール']];
 const theme=side.querySelector('[data-theme-toggle]');
 items.forEach(([href,icon,label])=>{if([...side.querySelectorAll('a')].some(a=>a.getAttribute('href')?.includes(href.replace('./',''))))return;const a=document.createElement('a');a.className='menu-link';a.href=href;a.innerHTML=`<span class="menu-icon">${icon}</span><span>${label}</span>`;side.insertBefore(a,theme||null)});
 if(!document.getElementById('neetHelpButton')){const b=document.createElement('button');b.id='neetHelpButton';b.type='button';b.className='menu-link';b.innerHTML='<span class="menu-icon">❓</span><span>ヘルプ・使い方</span>';side.insertBefore(b,theme||null);b.onclick=()=>alert('ノート・歌詞・録音・アイデア・制作ツールを、それぞれ独立して使えるよ。')}
}

const list=document.getElementById('listView'),toolbar=list?.querySelector('.toolbar');
if(list&&toolbar&&!document.getElementById('homeDashboard')){
 const style=document.createElement('style');style.textContent='.home-dashboard{margin-bottom:26px}.home-welcome{padding:clamp(20px,4vw,30px);border:1px solid var(--border);border-radius:22px;background:var(--paper);box-shadow:var(--shadow)}.home-welcome h2{margin:0;font-size:clamp(1.55rem,5vw,2.25rem)}.home-welcome>p{margin:10px 0 20px;color:var(--muted);line-height:1.75}.home-actions{display:flex;gap:10px;flex-wrap:wrap}.home-section-label{margin:26px 0 10px;color:var(--muted);font-size:.74rem;font-weight:800;letter-spacing:.14em}.home-tool-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.home-tool-card{display:flex;flex-direction:column;justify-content:center;gap:7px;min-height:92px;padding:16px;border:1px solid var(--border);border-radius:17px;background:var(--paper);color:var(--text);text-decoration:none;font-weight:800}.home-tool-card small{color:var(--muted);font-size:.75rem;font-weight:600;line-height:1.45}.home-tool-card.lyrics{background:linear-gradient(145deg,var(--paper),rgba(236,72,153,.08))}.home-tool-card.voice{background:linear-gradient(145deg,var(--paper),rgba(239,68,68,.07))}.home-tool-card.ideas{background:linear-gradient(145deg,var(--paper),rgba(234,179,8,.09))}.home-tool-card.tools{background:linear-gradient(145deg,var(--paper),rgba(59,130,246,.07))}@media(max-width:820px){.home-tool-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:480px){.home-actions{display:grid}.home-actions>*{width:100%;box-sizing:border-box}.home-tool-grid{grid-template-columns:1fr 1fr;gap:9px}}';document.head.appendChild(style);
 const d=document.createElement('div');d.id='homeDashboard';d.className='home-dashboard';d.innerHTML='<section class="home-welcome"><h2>思いついた音を、すぐ形に。</h2><p>作曲・歌詞・録音・アイデアを、それぞれ使いやすい場所に保存しよう。</p><div class="home-actions"><button id="homeNewSongBtn" class="primary-button">＋ 新しい曲を作る</button></div><p class="home-section-label">QUICK ACCESS</p><div class="home-tool-grid"><a class="home-tool-card lyrics" href="lyrics.html"><span>🎤 歌詞メモ</span><small>歌詞だけを独立して保存</small></a><a class="home-tool-card voice" href="voice-memo.html"><span>🎙 ボイスメモ</span><small>メロディをその場で録音</small></a><a class="home-tool-card ideas" href="ideas.html"><span>💡 アイデアメモ</span><small>曲名・MV・演出案を記録</small></a><a class="home-tool-card tools" href="tools.html"><span>🧰 制作ツール</span><small>移調・メトロノームなど</small></a><a class="home-tool-card" href="https://akito0802.github.io/Cordhyo-/index.html"><span>📚 コード</span><small>コードフォームを確認</small></a><a class="home-tool-card" href="https://akito0802.github.io/scale/"><span>🎸 スケール・指板</span><small>音階と指板上の音を確認</small></a></div></section>';list.insertBefore(d,toolbar);document.getElementById('homeNewSongBtn')?.addEventListener('click',()=>document.getElementById('newSongBtn')?.click())
}

if(!document.querySelector('link[rel="manifest"]')){const m=document.createElement('link');m.rel='manifest';m.href='manifest.webmanifest?v=16';document.head.appendChild(m)}
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(console.error));
const load=(src,v='4')=>new Promise((r,j)=>{if(document.querySelector(`script[src^="${src}"]`)){r();return}const s=document.createElement('script');s.src=`${src}?v=${v}`;s.onload=r;s.onerror=j;document.body.appendChild(s)});
if(!location.pathname.endsWith('voice-memo.html')&&!location.pathname.endsWith('ideas.html'))load('firebase-config.js').then(()=>load('cloud-sync.js')).catch(console.error);
})();