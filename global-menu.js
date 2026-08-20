(()=>{
'use strict';
if(window.__NEET_GLOBAL_MENU__)return;
window.__NEET_GLOBAL_MENU__=true;

const ROOT='https://akito0802.github.io/NEET-note/';
const NEETON=ROOT+'neeton.svg?v=4';
const groups=[
  {label:'メインメニュー',items:[
    [ROOT+'?mode=note','📝','ノート'],
    [ROOT+'lyrics.html','🎤','歌詞メモ'],
    [ROOT+'voice-memo.html','🎙️','ボイスメモ（録音）'],
    [ROOT+'ideas.html','💡','アイデアメモ'],
    [ROOT+'tools.html','🛠️','制作ツール'],
    [ROOT+'calendar.html','📅','制作カレンダー'],
    [ROOT+'melody.html','🎵','メロディ入力'],
    [ROOT+'theory-assist.html','🧠','理論アシスト']
  ]},
  {label:'ライブラリ・辞典',items:[
    [ROOT+'theory-library.html','📖','統合理論ライブラリ'],
    ['https://akito0802.github.io/Cordhyo-/index.html','🎸','コード辞典'],
    ['https://akito0802.github.io/scale/','🎼','スケール辞典'],
    ['https://akito0802.github.io/-h/','🎵','指板'],
    [ROOT+'circle-of-fifths.html','◉','インタラクティブ五度圏'],
    [ROOT+'major-to-minor-lab.html','⇄','長調→短調 変換ラボ']
  ]},
  {label:'その他',items:[
    [ROOT+'neeton-home.html','🏠','ニートンのおうち'],
    [ROOT+'terms.html','📜','利用規約']
  ]}
];

// 旧メニューと旧ハンバーガーを必ず隠し、共通メニューだけを残す。
const legacySelector='#sideMenu,#menuOverlay,#siteSideMenu,#siteMenuOverlay,#menuOpenBtn,#siteMenuOpenBtn,#openMenu,#menuBtn,#hamburgerBtn,.menu-button,.site-menu-button,.neet-side-menu,.neet-menu-overlay,.neet-menu-trigger,.neet-menu-open,.neet-menu-hamburger,.n4-trigger,#open.menu-button,#open.icon,button[aria-label*="メニューを開く"]';
const hideOldMenus=()=>{
  document.querySelectorAll(legacySelector).forEach(el=>{
    if(el.classList.contains('ngm-btn')||el.classList.contains('ngm-menu')||el.classList.contains('ngm-overlay')||el.closest('.ngm-menu'))return;
    el.style.setProperty('display','none','important');
    el.setAttribute('aria-hidden','true');
  });
};
hideOldMenus();
new MutationObserver(hideOldMenus).observe(document.documentElement,{childList:true,subtree:true});

const css=document.createElement('style');
css.textContent=`
:root{--ngm-bg:#fbf6ee;--ngm-paper:#fffaf2;--ngm-card:#fffdf8;--ngm-soft:#f3eadc;--ngm-line:#dfd1bd;--ngm-text:#2f241b;--ngm-muted:#7a6a59;--ngm-accent:#a66f32;--ngm-accent-dark:#704a25;--ngm-shadow:0 18px 44px rgba(93,68,37,.18)}
.ngm-btn{position:fixed;top:max(12px,env(safe-area-inset-top));left:max(12px,env(safe-area-inset-left));z-index:39001;display:grid;place-items:center;width:48px;height:48px;padding:0;border:1px solid rgba(154,117,73,.26);border-radius:50%;background:rgba(255,250,242,.95);color:var(--ngm-accent-dark);font-size:1.35rem;box-shadow:0 8px 24px rgba(89,62,31,.16);backdrop-filter:blur(12px);cursor:pointer;transition:.18s transform,.18s box-shadow}.ngm-btn:hover{transform:translateY(-1px);box-shadow:0 10px 26px rgba(89,62,31,.22)}
.ngm-top-return{position:fixed;left:max(12px,env(safe-area-inset-left));bottom:max(14px,env(safe-area-inset-bottom));z-index:38990;display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:44px;padding:0 14px;border:1px solid rgba(154,117,73,.28);border-radius:999px;background:rgba(255,250,242,.95);color:var(--ngm-accent-dark);box-shadow:0 8px 24px rgba(89,62,31,.16);backdrop-filter:blur(12px);text-decoration:none;font-size:.78rem;font-weight:900;line-height:1;transition:.18s transform,.18s box-shadow}.ngm-top-return:hover{transform:translateY(-1px);box-shadow:0 10px 26px rgba(89,62,31,.22)}.ngm-top-return-icon{font-size:1.08rem}
.ngm-overlay{position:fixed;inset:0;z-index:39000;background:rgba(46,34,23,.38);opacity:0;visibility:hidden;pointer-events:none;transition:.22s;backdrop-filter:blur(2px)}.ngm-overlay.open{opacity:1;visibility:visible;pointer-events:auto}
.ngm-menu{position:fixed;inset:0 auto 0 0;z-index:39002;width:min(90vw,360px);padding:max(18px,env(safe-area-inset-top)) 14px calc(16px + env(safe-area-inset-bottom));overflow-y:auto;background:linear-gradient(180deg,#fffaf2 0%,#fbf4e9 100%);color:var(--ngm-text);box-shadow:var(--ngm-shadow);transform:translateX(-104%);transition:transform .24s cubic-bezier(.2,.7,.2,1);font-family:-apple-system,BlinkMacSystemFont,"Hiragino Sans","Yu Gothic",sans-serif}.ngm-menu.open{transform:none}
.ngm-head{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:center;padding:4px 4px 13px;border-bottom:1px solid var(--ngm-line)}.ngm-brand{display:flex;align-items:center;gap:10px;min-width:0}.ngm-brand img{width:42px;height:42px;object-fit:contain;filter:drop-shadow(0 3px 7px rgba(80,55,28,.12))}.ngm-brand-copy b{display:block;font-size:.94rem;letter-spacing:.14em}.ngm-brand-copy small{display:block;margin-top:3px;color:var(--ngm-muted);font-size:.67rem;font-weight:700}.ngm-close{width:40px;height:40px;border:1px solid var(--ngm-line);border-radius:12px;background:var(--ngm-card);color:var(--ngm-text);font-size:1.2rem;cursor:pointer}
.ngm-account-card{margin:12px 0 8px;padding:12px;border:1px solid var(--ngm-line);border-radius:16px;background:rgba(255,253,248,.92);box-shadow:0 4px 14px rgba(89,62,31,.06)}.ngm-account-row{display:grid;grid-template-columns:44px 1fr auto;gap:10px;align-items:center}.ngm-avatar{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;background:#f7ecdd;border:1px solid var(--ngm-line);overflow:hidden}.ngm-avatar img{width:38px;height:38px;object-fit:contain}.ngm-account-copy{min-width:0}.ngm-account-name{font-weight:900;font-size:.84rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ngm-account-mail{margin-top:2px;color:var(--ngm-muted);font-size:.68rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ngm-sync-state{display:flex;align-items:center;gap:5px;margin-top:4px;color:var(--ngm-muted);font-size:.67rem}.ngm-status-dot{width:8px;height:8px;border-radius:50%;background:#b8aa96;box-shadow:0 0 0 3px rgba(184,170,150,.15)}.ngm-status-dot.on{background:#58a75c;box-shadow:0 0 0 3px rgba(88,167,92,.14)}.ngm-account-arrow{color:var(--ngm-muted);font-size:1rem}.ngm-login-card{display:flex;align-items:center;justify-content:center;gap:9px;width:100%;min-height:42px;margin-top:10px;border:1px solid var(--ngm-line);border-radius:12px;background:#fffaf3;color:var(--ngm-text);font:inherit;font-weight:900;font-size:.78rem;cursor:pointer}
.ngm-section{margin-top:11px}.ngm-section-label{margin:0 7px 6px;color:var(--ngm-muted);font-size:.65rem;font-weight:900;letter-spacing:.08em}.ngm-card-list{display:grid;gap:2px;padding:4px;border:1px solid rgba(223,209,189,.92);border-radius:15px;background:rgba(255,253,248,.76)}.ngm-link{display:grid;grid-template-columns:31px 1fr auto;align-items:center;gap:9px;min-height:43px;padding:7px 8px;border-radius:11px;color:inherit;text-decoration:none;font-size:.79rem;font-weight:850;transition:.14s background,.14s transform}.ngm-link:hover{background:#f4eadc}.ngm-link:active{transform:scale(.992)}.ngm-link.current{background:#efe2cf;color:#5c3d1f}.ngm-icon{display:grid;place-items:center;width:30px;height:30px;border-radius:9px;background:#f7eee2;font-size:.95rem}.ngm-chevron{color:#9a8873;font-size:.9rem}.ngm-actions{display:grid;gap:7px;margin-top:10px}.ngm-action{display:grid;grid-template-columns:31px 1fr auto;align-items:center;gap:9px;width:100%;min-height:44px;padding:7px 9px;border:1px solid var(--ngm-line);border-radius:13px;background:rgba(255,253,248,.82);color:inherit;text-align:left;font:inherit;font-weight:850;font-size:.78rem;cursor:pointer}.ngm-toggle{position:relative;width:38px;height:22px;border-radius:999px;background:#d9c8b1;transition:.18s}.ngm-toggle::after{content:'';position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 2px 5px rgba(0,0,0,.18);transition:.18s}.ngm-action.on .ngm-toggle{background:#9b7448}.ngm-action.on .ngm-toggle::after{left:19px}.ngm-footer-note{text-align:center;padding:13px 0 2px;color:#9b8973;font-size:.63rem;letter-spacing:.16em}
.ngm-modal{position:fixed;inset:0;z-index:40000;display:none;place-items:center;padding:16px;background:rgba(46,34,23,.5)}.ngm-modal.open{display:grid}.ngm-panel{width:min(430px,100%);padding:20px;border:1px solid var(--ngm-line);border-radius:22px;background:var(--ngm-paper);color:var(--ngm-text);box-shadow:0 24px 70px rgba(55,38,20,.28)}.ngm-panel-head{display:flex;align-items:center;justify-content:space-between}.ngm-panel-head h2{margin:0;font-size:1.05rem}.ngm-panel button{min-height:42px;padding:8px 12px;border:1px solid var(--ngm-line);border-radius:12px;background:var(--ngm-card);color:var(--ngm-text);font-weight:850}.ngm-modal-actions{display:flex;gap:8px;flex-wrap:wrap}.ngm-modal-account{display:none;margin:12px 0;padding:12px;border-radius:13px;background:#edf5eb}.ngm-modal-account.show{display:block}.ngm-modal-status{font-size:.82rem;line-height:1.6;color:var(--ngm-muted)}
html[data-theme="dark"]{--ngm-bg:#24201b;--ngm-paper:#2a251f;--ngm-card:#302a23;--ngm-soft:#3a3128;--ngm-line:#514438;--ngm-text:#f6eee3;--ngm-muted:#c1b19f;--ngm-accent:#d3a56b;--ngm-accent-dark:#e0b77f}html[data-theme="dark"] .ngm-menu{background:linear-gradient(180deg,#29231e,#211d19)}html[data-theme="dark"] .ngm-card-list,html[data-theme="dark"] .ngm-account-card,html[data-theme="dark"] .ngm-action,html[data-theme="dark"] .ngm-login-card,html[data-theme="dark"] .ngm-top-return{background:rgba(48,42,35,.94)}html[data-theme="dark"] .ngm-link:hover{background:#3a3027}html[data-theme="dark"] .ngm-link.current{background:#443424;color:#f4d7ad}html[data-theme="dark"] .ngm-icon,html[data-theme="dark"] .ngm-avatar{background:#3b3127}
@media(max-width:600px){.ngm-btn{width:44px;height:44px}.ngm-top-return{width:46px;height:46px;min-height:46px;padding:0;border-radius:50%}.ngm-top-return-label{display:none}.ngm-menu{width:100%;max-width:none;border-radius:0;padding-left:12px;padding-right:12px}.ngm-section{margin-top:10px}.ngm-card-list{gap:3px}.ngm-link{min-height:46px}.ngm-modal{align-items:end;padding:0}.ngm-panel{border-radius:22px 22px 0 0;padding-bottom:calc(20px + env(safe-area-inset-bottom))}}
`;
document.head.appendChild(css);

const here=location.href.replace(/[#?].*$/,'').replace(/index\.html$/,'');
const overlay=document.createElement('div');overlay.className='ngm-overlay';
const menu=document.createElement('nav');menu.className='ngm-menu';menu.setAttribute('aria-label','NEETNOTE メインメニュー');
const groupHtml=groups.map(g=>`<section class="ngm-section"><p class="ngm-section-label">${g.label}</p><div class="ngm-card-list">${g.items.map(([href,icon,label])=>{const target=href.replace(/[#?].*$/,'').replace(/index\.html$/,'');const current=here===target;return `<a class="ngm-link${current?' current':''}" href="${href}"${current?' aria-current="page"':''}><span class="ngm-icon">${icon}</span><span>${label}</span><span class="ngm-chevron">›</span></a>`}).join('')}</div></section>`).join('');
menu.innerHTML=`
  <header class="ngm-head">
    <div class="ngm-brand"><img src="${NEETON}" alt="ニートン"><div class="ngm-brand-copy"><b>NEETNOTE</b><small>音楽と、いつまでも。</small></div></div>
    <button class="ngm-close" type="button" aria-label="メニューを閉じる">×</button>
  </header>
  <section class="ngm-account-card">
    <div class="ngm-account-row"><div class="ngm-avatar"><img src="${NEETON}" alt="ニートン"></div><div class="ngm-account-copy"><div id="ngmMenuAccountName" class="ngm-account-name">ニートン</div><div id="ngmMenuAccountMail" class="ngm-account-mail">未ログイン</div><div class="ngm-sync-state"><i id="ngmMenuDot" class="ngm-status-dot"></i><span id="ngmMenuSyncState">この端末に保存中</span></div></div><span class="ngm-account-arrow">›</span></div>
    <button id="ngmCloud" class="ngm-login-card" type="button">☁️ <span id="ngmCloudLabel">ログイン・同期</span></button>
  </section>
  ${groupHtml}
  <div class="ngm-actions">
    <button id="ngmTheme" class="ngm-action" type="button"><span class="ngm-icon">🌙</span><span id="ngmThemeLabel">ダークモード</span><span class="ngm-toggle" aria-hidden="true"></span></button>
    <button id="ngmHelp" class="ngm-action" type="button"><span class="ngm-icon">❓</span><span>ヘルプ・使い方</span><span class="ngm-chevron">›</span></button>
  </div>
  <div class="ngm-footer-note">NEETNOTE × NEETON</div>`;

const btn=document.createElement('button');btn.className='ngm-btn';btn.type='button';btn.innerHTML='☰';btn.setAttribute('aria-label','メニューを開く');
let topReturn=document.querySelector('.ngm-top-return,.neet-top-return');
if(!topReturn){topReturn=document.createElement('a');topReturn.href=ROOT;topReturn.setAttribute('aria-label','NEETNOTEトップへ戻る');topReturn.innerHTML='<span class="ngm-top-return-icon" aria-hidden="true">⌂</span><span class="ngm-top-return-label">トップへ戻る</span>';document.body.appendChild(topReturn)}
topReturn.href=ROOT+'home.html';
topReturn.classList.add('ngm-top-return','neet-top-return');
document.body.append(overlay,menu,btn);
hideOldMenus();

const open=()=>{overlay.classList.add('open');menu.classList.add('open');document.body.style.overflow='hidden'};
const close=()=>{overlay.classList.remove('open');menu.classList.remove('open');document.body.style.overflow=''};
btn.onclick=open;overlay.onclick=close;menu.querySelector('.ngm-close').onclick=close;menu.querySelectorAll('a').forEach(a=>a.onclick=close);document.addEventListener('keydown',e=>e.key==='Escape'&&close());

const THEME='neet-note-theme';
const themeBtn=menu.querySelector('#ngmTheme'),themeLabel=menu.querySelector('#ngmThemeLabel');
const applyTheme=t=>{document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;const dark=t==='dark';themeBtn.classList.toggle('on',dark);themeLabel.textContent=dark?'ライトモード':'ダークモード';themeBtn.querySelector('.ngm-icon').textContent=dark?'☀️':'🌙'};
applyTheme(localStorage.getItem(THEME)==='dark'?'dark':'light');
themeBtn.onclick=()=>{const n=document.documentElement.dataset.theme==='dark'?'light':'dark';localStorage.setItem(THEME,n);applyTheme(n);window.dispatchEvent(new StorageEvent('storage',{key:THEME,newValue:n}))};
menu.querySelector('#ngmHelp').onclick=()=>alert('NEETNOTEの各機能をカテゴリごとにまとめた共通メニューだよ。上部の「ログイン・同期」からGoogleアカウント連携もできるよ。');

// ログイン・同期モーダル
const modal=document.createElement('div');modal.className='ngm-modal';
modal.innerHTML=`<section class="ngm-panel"><div class="ngm-panel-head"><h2>☁️ ログイン・同期</h2><button id="ngmModalClose" type="button">×</button></div><div id="ngmAccount" class="ngm-modal-account"><b>✅ Googleログイン済み</b><div id="ngmAccountText"></div></div><p id="ngmStatus" class="ngm-modal-status">認証機能を読み込み中…</p><div class="ngm-modal-actions"><button id="ngmLogin" type="button" disabled>Googleでログイン</button><button id="ngmSync" type="button" hidden>今すぐ同期</button><button id="ngmLogout" type="button" hidden>ログアウト</button></div></section>`;
document.body.appendChild(modal);
const cloudButton=menu.querySelector('#ngmCloud');
cloudButton.onclick=()=>{close();modal.classList.add('open');document.body.style.overflow='hidden'};
modal.querySelector('#ngmModalClose').onclick=()=>{modal.classList.remove('open');document.body.style.overflow=''};

const status=modal.querySelector('#ngmStatus'),login=modal.querySelector('#ngmLogin'),syncBtn=modal.querySelector('#ngmSync'),logout=modal.querySelector('#ngmLogout'),acct=modal.querySelector('#ngmAccount'),acctText=modal.querySelector('#ngmAccountText'),cloudLabel=menu.querySelector('#ngmCloudLabel'),menuName=menu.querySelector('#ngmMenuAccountName'),menuMail=menu.querySelector('#ngmMenuAccountMail'),menuState=menu.querySelector('#ngmMenuSyncState'),menuDot=menu.querySelector('#ngmMenuDot');
const loadConfig=()=>new Promise((resolve,reject)=>{if(window.NEET_FIREBASE_CONFIG)return resolve();const s=document.createElement('script');s.src=ROOT+'firebase-config.js?v=20260812';s.onload=resolve;s.onerror=reject;document.head.appendChild(s)});
const KEYS=['song-note-songs-v1','neet-note-lyrics-memos-v1','neet-note-calendar-v1','neet-note-ideas-v1','neet-note-theme','neet-note-melodies-v1'];

loadConfig().then(async()=>{
  const cfg=window.NEET_FIREBASE_CONFIG||{};
  if(!(cfg.apiKey&&cfg.authDomain&&cfg.projectId&&cfg.appId)){status.textContent='Firebase設定を読み込めなかったよ。';return}
  const v='12.17.0';
  const appMod=await import(`https://www.gstatic.com/firebasejs/${v}/firebase-app.js`),authMod=await import(`https://www.gstatic.com/firebasejs/${v}/firebase-auth.js`),dbMod=await import(`https://www.gstatic.com/firebasejs/${v}/firebase-firestore.js`);
  const app=appMod.getApps().length?appMod.getApp():appMod.initializeApp(cfg),auth=authMod.getAuth(app),db=dbMod.getFirestore(app),provider=new authMod.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});login.disabled=false;let user=null;
  const collect=()=>{const o={};KEYS.forEach(k=>{const x=localStorage.getItem(k);if(x!==null)o[k]={value:x,updatedAt:Number(localStorage.getItem('neet-sync-time:'+k)||Date.now())}});return o};
  const sync=async()=>{if(!user)return;status.textContent='同期中…';menuState.textContent='同期中…';try{const ref=dbMod.doc(db,'users',user.uid),snap=await dbMod.getDoc(ref),remote=snap.exists()?(snap.data().storage||{}):{},local=collect(),merged={...remote};Object.entries(local).forEach(([k,val])=>{if(!remote[k]||val.updatedAt>=(remote[k].updatedAt||0))merged[k]=val;else{localStorage.setItem(k,remote[k].value);localStorage.setItem('neet-sync-time:'+k,String(remote[k].updatedAt||Date.now()))}});await dbMod.setDoc(ref,{storage:merged,email:user.email||'',updatedAt:dbMod.serverTimestamp()},{merge:true});status.textContent='✅ 同期完了';menuState.textContent='同期済み';}catch(e){console.error(e);status.textContent='同期エラー：'+(e.code||e.message);menuState.textContent='同期エラー'}};
  authMod.onAuthStateChanged(auth,async u=>{user=u;if(u){cloudLabel.textContent='ログイン済み・同期';acct.classList.add('show');acctText.textContent=u.email||u.displayName||'Googleアカウント';login.hidden=true;syncBtn.hidden=false;logout.hidden=false;status.textContent='ログイン済み。同期できるよ。';menuName.textContent=u.displayName||'NEETNOTEユーザー';menuMail.textContent=u.email||'Googleアカウント';menuState.textContent='ログイン済み';menuDot.classList.add('on');await sync()}else{cloudLabel.textContent='ログイン・同期';acct.classList.remove('show');login.hidden=false;syncBtn.hidden=true;logout.hidden=true;status.textContent='未ログイン。データはこの端末に保存中。';menuName.textContent='ニートン';menuMail.textContent='未ログイン';menuState.textContent='この端末に保存中';menuDot.classList.remove('on')}});
  login.onclick=()=>authMod.signInWithPopup(auth,provider).catch(e=>status.textContent='ログインエラー：'+(e.code||e.message));syncBtn.onclick=sync;logout.onclick=()=>authMod.signOut(auth);
}).catch(e=>{console.error(e);status.textContent='認証機能の読み込みに失敗したよ。'});

// 転調理論ライブラリ専用：ページ本体に古い↑が残っていても、ここで必ず置き換える。
if(location.pathname==='/NEET-note/modulation-route.html'){
  document.querySelectorAll('#modScrollTop,#modScrollTopFresh,.mod-scroll-top').forEach(el=>el.remove());
  const toolbar=document.querySelector('#libraryView .ml-toolbar');
  if(toolbar&&!toolbar.id)toolbar.id='librarySearchTop';
  const style=document.createElement('style');
  style.id='ngm-mod-search-return-style';
  style.textContent=`
#ngm-mod-search-return{position:fixed;right:max(14px,env(safe-area-inset-right));bottom:max(82px,calc(env(safe-area-inset-bottom) + 82px));z-index:39030;display:none;align-items:center;justify-content:center;gap:6px;min-height:46px;padding:0 14px;border:1px solid rgba(154,117,73,.28);border-radius:999px;background:rgba(255,250,242,.98);color:#704a25;box-shadow:0 9px 26px rgba(89,62,31,.18);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);text-decoration:none;font-size:.74rem;font-weight:900}
#ngm-mod-search-return.show{display:inline-flex}
html[data-theme="dark"] #ngm-mod-search-return{background:rgba(48,42,35,.97);color:#e0b77f;border-color:#514438}
`;
  document.head.appendChild(style);
  const searchReturn=document.createElement('a');
  searchReturn.id='ngm-mod-search-return';
  searchReturn.href='#librarySearchTop';
  searchReturn.setAttribute('aria-label','理論ライブラリの検索欄へ戻る');
  searchReturn.innerHTML='<span aria-hidden="true">↑</span><span>検索へ</span>';
  searchReturn.addEventListener('click',e=>{
    const lib=document.getElementById('libraryView');
    if(lib&&lib.hidden){e.preventDefault();document.getElementById('makerView')?.scrollIntoView({behavior:'smooth',block:'start'});return}
    const target=document.getElementById('librarySearchTop')||document.querySelector('#libraryView .ml-toolbar');
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'})}
  });
  const syncSearchReturn=()=>searchReturn.classList.toggle('show',window.scrollY>420);
  window.addEventListener('scroll',syncSearchReturn,{passive:true});
  document.body.appendChild(searchReturn);
  syncSearchReturn();
}
})();