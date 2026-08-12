(()=>{
'use strict';
if(window.__NEET_GLOBAL_MENU_V4__)return;
window.__NEET_GLOBAL_MENU_V4__=true;

const ROOT='https://akito0802.github.io/NEET-note/';
const NEETON=ROOT+'neeton.svg?v=4';

// 旧共通メニューも含めて一旦完全撤去
['.ngm-btn','.ngm-overlay','.ngm-menu','.ngm-modal','.neet-menu-trigger','.neet-menu-open','.neet-full-menu','.neet-side-menu','.neet-menu-overlay'].forEach(sel=>document.querySelectorAll(sel).forEach(el=>el.remove()));
document.querySelectorAll('#menuOpenBtn,#menuOverlay,#sideMenu,#siteMenuOpenBtn,#siteSideMenu,#siteMenuOverlay,#openMenu').forEach(el=>el.style.setProperty('display','none','important'));

const groups=[
 {label:'メイン',items:[
  [ROOT+'?mode=note','📝','ノート'],[ROOT+'lyrics.html','🎤','歌詞メモ'],[ROOT+'voice-memo.html','🎙️','ボイスメモ'],[ROOT+'ideas.html','💡','アイデアメモ'],
  [ROOT+'tools.html','🛠️','制作ツール'],[ROOT+'calendar.html','📅','制作カレンダー'],[ROOT+'melody.html','🎵','メロディ入力'],[ROOT+'theory-assist.html','🧠','理論アシスト']
 ]},
 {label:'ライブラリ・辞典',items:[
  [ROOT+'theory-library.html','📖','統合理論ライブラリ'],['https://akito0802.github.io/Cordhyo-/','🎸','コード辞典'],['https://akito0802.github.io/scale/','🎼','スケール辞典'],['https://akito0802.github.io/-h/','🎵','指板']
 ]}
];

const css=document.createElement('style');
css.id='neet-global-menu-v4-style';
css.textContent=`
:root{--n4-bg:#f6eee2;--n4-paper:#fffaf2;--n4-card:#fffdf8;--n4-line:#e2d4c1;--n4-text:#33271d;--n4-muted:#806f5c;--n4-accent:#a36d31;--n4-soft:#f2e5d3;--n4-shadow:0 22px 60px rgba(82,56,28,.20)}
.n4-trigger{position:fixed;top:max(12px,env(safe-area-inset-top));left:max(12px,env(safe-area-inset-left));z-index:50001;display:grid;place-items:center;width:50px;height:50px;border:1px solid #dcc9ae;border-radius:50%;background:rgba(255,250,242,.96);color:#6b4722;font-size:1.45rem;box-shadow:0 8px 24px rgba(83,56,28,.17);backdrop-filter:blur(12px);cursor:pointer}
.n4-overlay{position:fixed;inset:0;z-index:50000;background:rgba(48,35,22,.42);opacity:0;visibility:hidden;pointer-events:none;transition:.22s;backdrop-filter:blur(3px)}.n4-overlay.open{opacity:1;visibility:visible;pointer-events:auto}
.n4-menu{position:fixed;top:0;bottom:0;left:0;z-index:50002;width:min(92vw,380px);overflow:auto;padding:max(18px,env(safe-area-inset-top)) 14px calc(18px + env(safe-area-inset-bottom));background:linear-gradient(180deg,#fffaf2,#f9f0e4);color:var(--n4-text);box-shadow:var(--n4-shadow);transform:translateX(-104%);transition:.25s cubic-bezier(.2,.7,.2,1);font-family:-apple-system,BlinkMacSystemFont,"Hiragino Sans","Yu Gothic",sans-serif}.n4-menu.open{transform:none}
.n4-head{display:grid;grid-template-columns:1fr auto;align-items:center;gap:12px;padding:2px 3px 13px;border-bottom:1px solid var(--n4-line)}.n4-brand{display:flex;align-items:center;gap:10px}.n4-brand img{width:46px;height:46px;object-fit:contain}.n4-brand b{display:block;font-size:1rem;letter-spacing:.13em}.n4-brand small{display:block;margin-top:3px;color:var(--n4-muted);font-size:.67rem;font-weight:700}.n4-close{width:42px;height:42px;border:1px solid var(--n4-line);border-radius:14px;background:var(--n4-card);color:var(--n4-text);font-size:1.25rem}
.n4-account{margin-top:12px;padding:12px;border:1px solid var(--n4-line);border-radius:18px;background:rgba(255,253,248,.9);box-shadow:0 6px 16px rgba(84,57,28,.06)}.n4-user{display:grid;grid-template-columns:48px 1fr auto;gap:10px;align-items:center}.n4-avatar{display:grid;place-items:center;width:48px;height:48px;border-radius:50%;background:#f7ead9;border:1px solid var(--n4-line)}.n4-avatar img{width:40px;height:40px}.n4-user b{font-size:.88rem}.n4-mail{margin-top:2px;color:var(--n4-muted);font-size:.69rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.n4-state{margin-top:4px;color:var(--n4-muted);font-size:.68rem}.n4-dot{display:inline-block;width:8px;height:8px;margin-right:5px;border-radius:50%;background:#b4a38e}.n4-dot.on{background:#55a65a}.n4-login{width:100%;min-height:44px;margin-top:10px;border:1px solid var(--n4-line);border-radius:13px;background:#fff8ef;color:var(--n4-text);font:inherit;font-weight:900}
.n4-section{margin-top:13px}.n4-label{margin:0 4px 7px;color:var(--n4-muted);font-size:.68rem;font-weight:900;letter-spacing:.08em}.n4-list{display:grid;gap:5px}.n4-link{display:grid;grid-template-columns:36px 1fr auto;align-items:center;gap:9px;min-height:48px;padding:6px 10px;border:1px solid var(--n4-line);border-radius:14px;background:rgba(255,253,248,.88);color:inherit;text-decoration:none;font-size:.81rem;font-weight:850}.n4-link.current{background:#efe0cb;border-color:#d9bd97;color:#603e1d}.n4-icon{display:grid;place-items:center;width:34px;height:34px;border-radius:10px;background:#f7ead9;font-size:1rem}.n4-arrow{color:#9c8870;font-size:1rem}
.n4-home{display:grid;grid-template-columns:36px 1fr auto;align-items:center;gap:9px;min-height:50px;margin-top:13px;padding:7px 10px;border:1px solid var(--n4-line);border-radius:15px;background:#fffaf3;color:inherit;text-decoration:none;font-weight:900;font-size:.82rem}
.n4-actions{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:10px}.n4-action{min-height:48px;border:1px solid var(--n4-line);border-radius:14px;background:rgba(255,253,248,.9);color:inherit;font:inherit;font-size:.76rem;font-weight:850}.n4-foot{text-align:center;padding:15px 0 2px;color:#a18e76;font-size:.61rem;letter-spacing:.16em}
.n4-modal{position:fixed;inset:0;z-index:51000;display:none;place-items:center;padding:16px;background:rgba(44,31,20,.52)}.n4-modal.open{display:grid}.n4-panel{width:min(430px,100%);padding:20px;border:1px solid var(--n4-line);border-radius:22px;background:var(--n4-paper);color:var(--n4-text);box-shadow:0 28px 80px rgba(45,30,17,.28)}.n4-panel-head{display:flex;justify-content:space-between;align-items:center}.n4-panel-head h2{margin:0;font-size:1.05rem}.n4-panel button{min-height:42px;padding:8px 12px;border:1px solid var(--n4-line);border-radius:12px;background:#fff;color:inherit;font-weight:850}.n4-auth-actions{display:flex;gap:8px;flex-wrap:wrap}.n4-status{color:var(--n4-muted);font-size:.82rem;line-height:1.65}
html[data-theme="dark"]{--n4-bg:#241f1a;--n4-paper:#2b251f;--n4-card:#322b24;--n4-line:#514538;--n4-text:#f7eee3;--n4-muted:#c7b8a7;--n4-accent:#d3a66e;--n4-soft:#3d3329}html[data-theme="dark"] .n4-menu{background:linear-gradient(180deg,#2b251f,#211d19)}html[data-theme="dark"] .n4-account,html[data-theme="dark"] .n4-link,html[data-theme="dark"] .n4-home,html[data-theme="dark"] .n4-action{background:#302922}html[data-theme="dark"] .n4-icon,html[data-theme="dark"] .n4-avatar{background:#3a3027}html[data-theme="dark"] .n4-link.current{background:#493727;color:#f2d4ac}
@media(max-width:600px){
 .n4-trigger{width:46px;height:46px}
 .n4-menu{width:100%;max-width:none;right:0;padding:calc(max(16px,env(safe-area-inset-top))) 12px calc(18px + env(safe-area-inset-bottom));transform:translateY(105%);transition:.28s cubic-bezier(.2,.7,.2,1)}.n4-menu.open{transform:none}
 .n4-head{padding-bottom:11px}.n4-brand img{width:42px;height:42px}
 .n4-account{margin-top:10px}
 .n4-section{margin-top:11px}.n4-label{margin-left:3px}
 .n4-list{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.n4-link{display:flex;flex-direction:column;justify-content:center;gap:7px;min-height:88px;padding:10px 6px;text-align:center;font-size:.72rem;line-height:1.35}.n4-link .n4-arrow{display:none}.n4-icon{width:38px;height:38px;font-size:1.05rem}
 .n4-section:nth-of-type(3) .n4-list{grid-template-columns:repeat(2,minmax(0,1fr))}
 .n4-home{min-height:52px}.n4-actions{grid-template-columns:1fr 1fr}.n4-foot{padding-top:13px}
 .n4-modal{align-items:end;padding:0}.n4-panel{border-radius:22px 22px 0 0;padding-bottom:calc(20px + env(safe-area-inset-bottom))}
}
`;
document.head.appendChild(css);

const here=location.href.replace(/[#?].*$/,'').replace(/index\.html$/,'');
const overlay=document.createElement('div');overlay.className='n4-overlay';
const menu=document.createElement('nav');menu.className='n4-menu';menu.setAttribute('aria-label','NEETNOTE メインメニュー');
const sections=groups.map(g=>`<section class="n4-section"><p class="n4-label">${g.label}</p><div class="n4-list">${g.items.map(([href,icon,label])=>{const target=href.replace(/[#?].*$/,'').replace(/index\.html$/,'');const current=here===target;return `<a class="n4-link${current?' current':''}" href="${href}"><span class="n4-icon">${icon}</span><span>${label}</span><span class="n4-arrow">›</span></a>`}).join('')}</div></section>`).join('');
menu.innerHTML=`<header class="n4-head"><div class="n4-brand"><img src="${NEETON}" alt="ニートン"><div><b>NEETNOTE</b><small>音楽と、いつまでも。</small></div></div><button class="n4-close" type="button">×</button></header><section class="n4-account"><div class="n4-user"><div class="n4-avatar"><img src="${NEETON}" alt="ニートン"></div><div><b id="n4Name">ニートン</b><div id="n4Mail" class="n4-mail">未ログイン</div><div class="n4-state"><span id="n4Dot" class="n4-dot"></span><span id="n4State">この端末に保存中</span></div></div><span>›</span></div><button id="n4Cloud" class="n4-login" type="button">☁️ <span id="n4CloudLabel">ログイン・同期</span></button></section>${sections}<a class="n4-home" href="${ROOT}neeton-home.html"><span class="n4-icon">🏠</span><span>ニートンのおうち</span><span class="n4-arrow">›</span></a><div class="n4-actions"><button id="n4Theme" class="n4-action" type="button">🌙 ダークモード</button><button id="n4Help" class="n4-action" type="button">❓ ヘルプ・使い方</button></div><div class="n4-foot">NEETNOTE × NEETON</div>`;
const trigger=document.createElement('button');trigger.className='n4-trigger';trigger.type='button';trigger.textContent='☰';trigger.setAttribute('aria-label','メニューを開く');
document.body.append(overlay,menu,trigger);

const open=()=>{overlay.classList.add('open');menu.classList.add('open');document.body.style.overflow='hidden'};
const close=()=>{overlay.classList.remove('open');menu.classList.remove('open');document.body.style.overflow=''};
trigger.onclick=open;overlay.onclick=close;menu.querySelector('.n4-close').onclick=close;menu.querySelectorAll('a').forEach(a=>a.onclick=close);document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});

const THEME='neet-note-theme';
const themeBtn=menu.querySelector('#n4Theme');
const applyTheme=t=>{document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;themeBtn.textContent=t==='dark'?'☀️ ライトモード':'🌙 ダークモード'};
applyTheme(localStorage.getItem(THEME)==='dark'?'dark':'light');
themeBtn.onclick=()=>{const n=document.documentElement.dataset.theme==='dark'?'light':'dark';localStorage.setItem(THEME,n);applyTheme(n)};
menu.querySelector('#n4Help').onclick=()=>alert('NEETNOTEの各機能へ、このメニューからすぐ移動できるよ。スマホではカードをタップして開けるよ。');

const modal=document.createElement('div');modal.className='n4-modal';modal.innerHTML=`<section class="n4-panel"><div class="n4-panel-head"><h2>☁️ ログイン・同期</h2><button id="n4CloseModal" type="button">×</button></div><p id="n4Status" class="n4-status">認証機能を読み込み中…</p><div class="n4-auth-actions"><button id="n4Login" type="button" disabled>Googleでログイン</button><button id="n4Sync" type="button" hidden>今すぐ同期</button><button id="n4Logout" type="button" hidden>ログアウト</button></div></section>`;document.body.appendChild(modal);
menu.querySelector('#n4Cloud').onclick=()=>{close();modal.classList.add('open');document.body.style.overflow='hidden'};modal.querySelector('#n4CloseModal').onclick=()=>{modal.classList.remove('open');document.body.style.overflow=''};
const status=modal.querySelector('#n4Status'),login=modal.querySelector('#n4Login'),syncBtn=modal.querySelector('#n4Sync'),logout=modal.querySelector('#n4Logout'),nameEl=menu.querySelector('#n4Name'),mailEl=menu.querySelector('#n4Mail'),dot=menu.querySelector('#n4Dot'),state=menu.querySelector('#n4State'),cloudLabel=menu.querySelector('#n4CloudLabel');
const loadConfig=()=>new Promise((resolve,reject)=>{if(window.NEET_FIREBASE_CONFIG)return resolve();const s=document.createElement('script');s.src=ROOT+'firebase-config.js?v=20260813';s.onload=resolve;s.onerror=reject;document.head.appendChild(s)});
const KEYS=['song-note-songs-v1','neet-note-lyrics-memos-v1','neet-note-calendar-v1','neet-note-ideas-v1','neet-note-theme','neet-note-melodies-v1'];
loadConfig().then(async()=>{const cfg=window.NEET_FIREBASE_CONFIG||{};if(!(cfg.apiKey&&cfg.authDomain&&cfg.projectId&&cfg.appId)){status.textContent='Firebase設定を読み込めなかったよ。';return}const v='12.17.0',appMod=await import(`https://www.gstatic.com/firebasejs/${v}/firebase-app.js`),authMod=await import(`https://www.gstatic.com/firebasejs/${v}/firebase-auth.js`),dbMod=await import(`https://www.gstatic.com/firebasejs/${v}/firebase-firestore.js`),app=appMod.getApps().length?appMod.getApp():appMod.initializeApp(cfg),auth=authMod.getAuth(app),db=dbMod.getFirestore(app),provider=new authMod.GoogleAuthProvider();provider.setCustomParameters({prompt:'select_account'});login.disabled=false;let user=null;const sync=async()=>{if(!user)return;status.textContent='同期中…';try{const ref=dbMod.doc(db,'users',user.uid),storage={};KEYS.forEach(k=>{const value=localStorage.getItem(k);if(value!==null)storage[k]={value,updatedAt:Date.now()}});await dbMod.setDoc(ref,{storage,email:user.email||'',updatedAt:dbMod.serverTimestamp()},{merge:true});status.textContent='✅ 同期完了';state.textContent='同期済み';}catch(e){status.textContent='同期エラー：'+(e.code||e.message)}};authMod.onAuthStateChanged(auth,u=>{user=u;if(u){nameEl.textContent=u.displayName||'ニートン';mailEl.textContent=u.email||'Googleアカウント';dot.classList.add('on');state.textContent='ログイン済み';cloudLabel.textContent='ログイン済み ✓';login.hidden=true;syncBtn.hidden=false;logout.hidden=false;status.textContent='ログイン済み。必要なら同期できるよ。'}else{nameEl.textContent='ニートン';mailEl.textContent='未ログイン';dot.classList.remove('on');state.textContent='この端末に保存中';cloudLabel.textContent='ログイン・同期';login.hidden=false;syncBtn.hidden=true;logout.hidden=true;status.textContent='未ログイン。データはこの端末に保存されているよ。'}});login.onclick=()=>authMod.signInWithPopup(auth,provider).then(sync).catch(e=>status.textContent='ログインエラー：'+(e.code||e.message));syncBtn.onclick=sync;logout.onclick=()=>authMod.signOut(auth)}).catch(()=>status.textContent='認証機能の読み込みに失敗したよ。');
})();