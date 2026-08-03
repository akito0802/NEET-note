(()=>{
'use strict';

const root=document.documentElement;
const meta=document.querySelector('meta[name="theme-color"]');
const THEME_KEY='neet-note-theme';

function preferredTheme(){
  const saved=localStorage.getItem(THEME_KEY);
  if(saved==='light'||saved==='dark')return saved;
  return matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
}
function applyTheme(theme){
  root.dataset.theme=theme;
  root.style.colorScheme=theme;
  meta?.setAttribute('content',theme==='dark'?'#141311':'#d9c7a8');
  document.querySelectorAll('[data-theme-toggle]').forEach(button=>{
    const dark=theme==='dark';
    button.innerHTML=`<span aria-hidden="true">${dark?'☀️':'🌙'}</span><span>${dark?'ライトモード':'ダークモード'}</span>`;
    button.setAttribute('aria-pressed',String(dark));
  });
}
applyTheme(preferredTheme());
document.addEventListener('click',event=>{
  const button=event.target.closest('[data-theme-toggle]');
  if(!button)return;
  const next=root.dataset.theme==='dark'?'light':'dark';
  localStorage.setItem(THEME_KEY,next);
  applyTheme(next);
});

const params=new URLSearchParams(location.search);
const path=location.pathname.replace(/\/index\.html$/,'/');
const isHome=/\/NEET-note\/$/.test(path);
const intro=document.getElementById('neetIntro');
const shouldIntro=isHome&&!params.has('mode')&&!params.has('song')&&!document.referrer.startsWith(`${location.origin}/NEET-note/`)&&sessionStorage.getItem('neet-note-intro-shown')!=='1';
if(intro){
  if(shouldIntro)sessionStorage.setItem('neet-note-intro-shown','1');
  else{intro.remove();document.body.style.overflow='';}
}

const sideMenu=document.getElementById('sideMenu');
if(sideMenu){
  const hasLyrics=[...sideMenu.querySelectorAll('a')].some(link=>link.getAttribute('href')?.includes('lyrics.html'));
  if(!hasLyrics){
    const lyricsLink=document.createElement('a');
    lyricsLink.className='menu-link';
    lyricsLink.href='lyrics.html';
    lyricsLink.innerHTML='<span class="menu-icon">🎤</span><span>歌詞メモ</span>';
    const toolsLink=[...sideMenu.querySelectorAll('a')].find(link=>link.getAttribute('href')?.includes('tools.html'));
    sideMenu.insertBefore(lyricsLink,toolsLink||sideMenu.querySelector('[data-theme-toggle]')||null);
  }

  if(!document.getElementById('neetHelpButton')){
    const helpButton=document.createElement('button');
    helpButton.id='neetHelpButton';
    helpButton.type='button';
    helpButton.className='menu-link';
    helpButton.innerHTML='<span class="menu-icon">❓</span><span>ヘルプ・使い方</span>';
    sideMenu.insertBefore(helpButton,sideMenu.querySelector('[data-theme-toggle]')||null);

    const style=document.createElement('style');
    style.textContent='.neet-help-backdrop{position:fixed;inset:0;z-index:30000;display:none;place-items:center;padding:18px;background:rgba(17,24,39,.58)}.neet-help-backdrop.open{display:grid}.neet-help-dialog{width:min(680px,100%);max-height:84dvh;overflow:auto;padding:20px;background:var(--ui-surface,#fffdf8);color:var(--ui-text,#1f2937);border:1px solid var(--ui-line,#ded6c9);border-radius:20px;box-shadow:0 24px 70px rgba(0,0,0,.3)}.neet-help-head{display:flex;align-items:center;justify-content:space-between;gap:12px}.neet-help-close{width:38px;height:38px;border:0;border-radius:11px;background:var(--ui-surface-2,#f1f1f1);color:inherit;font-size:1.35rem}.neet-help-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:16px}.neet-help-item{padding:14px;border:1px solid var(--ui-line,#ded6c9);border-radius:14px;background:var(--ui-surface-2,#f7f2e9)}.neet-help-item b{display:block;margin-bottom:5px}.neet-help-item p{margin:0;color:var(--ui-muted,#6b7280);font-size:.88rem;line-height:1.65}@media(max-width:600px){.neet-help-backdrop{align-items:end;padding:0}.neet-help-dialog{max-height:88dvh;border-radius:22px 22px 0 0}.neet-help-grid{grid-template-columns:1fr}}';
    document.head.appendChild(style);

    const modal=document.createElement('div');
    modal.className='neet-help-backdrop';
    modal.setAttribute('aria-hidden','true');
    modal.innerHTML='<section class="neet-help-dialog" role="dialog" aria-modal="true"><div class="neet-help-head"><h2>NEET NOTEの使い方</h2><button class="neet-help-close" type="button" aria-label="閉じる">×</button></div><div class="neet-help-grid"><div class="neet-help-item"><b>📝 作曲ノート</b><p>曲の情報、構成、コード、音源をまとめて保存する。</p></div><div class="neet-help-item"><b>🎤 歌詞メモ</b><p>作曲ノートとは別に、歌詞だけを独立して保存する。</p></div><div class="neet-help-item"><b>🧰 ツール</b><p>コード進行、移調、メトロノームなどを使う。</p></div><div class="neet-help-item"><b>☰ メニュー</b><p>各機能やダークモードへ移動する。</p></div></div></section>';
    document.body.appendChild(modal);
    const close=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';};
    helpButton.addEventListener('click',()=>{
      sideMenu.classList.remove('open');
      document.getElementById('menuOverlay')?.classList.remove('open');
      modal.classList.add('open');
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow='hidden';
    });
    modal.querySelector('.neet-help-close')?.addEventListener('click',close);
    modal.addEventListener('click',event=>{if(event.target===modal)close();});
  }
}

const listView=document.getElementById('listView');
const toolbar=listView?.querySelector('.toolbar');
if(listView&&toolbar&&!document.getElementById('homeDashboard')){
  const style=document.createElement('style');
  style.textContent='.home-dashboard{margin-bottom:26px}.home-welcome{padding:clamp(20px,4vw,30px);border:1px solid var(--border);border-radius:22px;background:var(--paper);box-shadow:var(--shadow)}.home-welcome h2{margin:0;font-size:clamp(1.55rem,5vw,2.25rem);letter-spacing:-.03em}.home-welcome>p{max-width:620px;margin:10px 0 20px;color:var(--muted);line-height:1.75}.home-actions{display:flex;gap:10px;flex-wrap:wrap}.home-actions>a,.home-actions>button{min-height:44px}.home-section-label{margin:26px 0 10px;color:var(--muted);font-size:.74rem;font-weight:800;letter-spacing:.14em}.home-tool-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.home-tool-card{display:flex;flex-direction:column;justify-content:center;gap:7px;min-height:88px;padding:16px;border:1px solid var(--border);border-radius:17px;background:var(--paper);color:var(--text);text-decoration:none;font-weight:800;transition:transform .16s ease,box-shadow .16s ease,border-color .16s ease}.home-tool-card:hover{transform:translateY(-2px);border-color:rgba(139,111,71,.45);box-shadow:0 10px 22px rgba(0,0,0,.07)}.home-tool-card small{color:var(--muted);font-size:.75rem;font-weight:600;line-height:1.45}.home-tool-card.lyrics{background:linear-gradient(145deg,var(--paper),rgba(236,72,153,.08))}.home-tool-card.tools{background:linear-gradient(145deg,var(--paper),rgba(59,130,246,.07))}@media(max-width:820px){.home-tool-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:480px){.home-actions{display:grid;grid-template-columns:1fr}.home-actions>*{width:100%;box-sizing:border-box}.home-tool-grid{gap:9px}.home-tool-card{min-height:82px;padding:14px}}';
  document.head.appendChild(style);

  const dashboard=document.createElement('div');
  dashboard.id='homeDashboard';
  dashboard.className='home-dashboard';
  dashboard.innerHTML='<section class="home-welcome"><h2>思いついた音を、すぐ形に。</h2><p>作曲ノートと歌詞メモを中心に、必要な制作機能へ迷わず移動できるホーム。</p><div class="home-actions"><button id="homeNewSongBtn" class="primary-button">＋ 新しい曲を作る</button><a class="ghost-button" href="lyrics.html" style="text-decoration:none">🎤 歌詞メモを開く</a></div><p class="home-section-label">QUICK ACCESS</p><div class="home-tool-grid"><a class="home-tool-card lyrics" href="lyrics.html"><span>🎤 歌詞メモ</span><small>歌詞だけを独立して保存</small></a><a class="home-tool-card tools" href="tools.html"><span>🧰 制作ツール</span><small>移調・メトロノームなど</small></a><a class="home-tool-card" href="https://akito0802.github.io/Cordhyo-/index.html"><span>📚 コード</span><small>コードフォームを確認</small></a><a class="home-tool-card" href="https://akito0802.github.io/scale/"><span>🎸 スケール・指板</span><small>音階と指板上の音を確認</small></a></div></section>';
  listView.insertBefore(dashboard,toolbar);
  document.getElementById('homeNewSongBtn')?.addEventListener('click',()=>document.getElementById('newSongBtn')?.click());
}

if(!document.querySelector('link[rel="manifest"]')){
  const manifest=document.createElement('link');
  manifest.rel='manifest';
  manifest.href='manifest.webmanifest?v=14';
  document.head.appendChild(manifest);
}
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(console.error));
}
const loadScript=(src,version='3')=>new Promise((resolve,reject)=>{
  if(document.querySelector(`script[src^="${src}"]`)){resolve();return;}
  const script=document.createElement('script');
  script.src=`${src}?v=${version}`;
  script.onload=resolve;
  script.onerror=reject;
  document.body.appendChild(script);
});
loadScript('firebase-config.js').then(()=>loadScript('cloud-sync.js')).catch(console.error);
})();