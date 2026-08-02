(()=>{
'use strict';
const STORAGE_KEY='song-note-songs-v1';
const cfg=window.NEET_FIREBASE_CONFIG||{};
const side=document.getElementById('sideMenu');
if(!side||document.getElementById('cloudSyncMenuButton'))return;

const menuButton=document.createElement('button');
menuButton.id='cloudSyncMenuButton';
menuButton.className='menu-link';
menuButton.type='button';
menuButton.innerHTML='<span class="menu-icon">☁️</span><span id="cloudMenuLabel">ログイン・同期</span>';
side.insertBefore(menuButton,side.querySelector('[data-theme-toggle]')||null);

const css=document.createElement('style');
css.textContent=`.cloud-modal{position:fixed;inset:0;z-index:32000;display:none;place-items:center;padding:18px;background:rgba(17,24,39,.58)}.cloud-modal.open{display:grid}.cloud-panel{width:min(430px,100%);padding:22px;border-radius:22px;background:var(--ui-surface,#fffdf8);color:var(--ui-text,#1f2937);box-shadow:0 24px 70px rgba(0,0,0,.3)}.cloud-head{display:flex;align-items:center;justify-content:space-between}.cloud-close{width:44px;height:44px;border:0;border-radius:50%;font-size:1.25rem}.cloud-account{display:none;margin:14px 0;padding:14px;border-radius:15px;background:rgba(52,199,89,.12)}.cloud-account.show{display:block}.cloud-account b,.cloud-account small{display:block}.cloud-account small{margin-top:4px;word-break:break-all}.cloud-actions{display:flex;gap:10px;flex-wrap:wrap}.cloud-error{color:#c62828;font-weight:700}.cloud-debug{margin-top:12px;color:var(--ui-muted,#6b7280);font-size:.76rem;word-break:break-all}.cloud-toast{position:fixed;left:50%;top:18px;z-index:50000;width:min(92vw,430px);padding:15px 18px;border-radius:18px;background:#1c1c1e;color:#fff;transform:translate(-50%,-150%);opacity:0;transition:.3s}.cloud-toast.show{transform:translate(-50%,0);opacity:1}@media(max-width:600px){.cloud-modal{align-items:end;padding:0}.cloud-panel{border-radius:22px 22px 0 0;padding-bottom:calc(22px + env(safe-area-inset-bottom))}}`;
document.head.appendChild(css);

const modal=document.createElement('div');
modal.className='cloud-modal';
modal.innerHTML=`<section class="cloud-panel"><div class="cloud-head"><h2>☁️ クラウド同期</h2><button class="cloud-close" type="button">×</button></div><div id="cloudAccount" class="cloud-account"><b>✅ Googleログイン済み</b><small id="cloudAccountText"></small></div><p id="cloudMessage">認証状態を確認中…</p><div class="cloud-actions"><button id="cloudLogin" class="primary-button" type="button" disabled>Googleでログイン</button><button id="cloudSync" class="ghost-button" type="button" hidden>今すぐ同期</button><button id="cloudLogout" class="ghost-button" type="button" hidden>ログアウト</button></div><p id="cloudDebug" class="cloud-debug">認証モジュール準備中</p></section>`;
document.body.appendChild(modal);
const toast=document.createElement('div');toast.className='cloud-toast';document.body.appendChild(toast);
let toastTimer;const notify=text=>{toast.textContent=text;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),3200)};

const label=document.getElementById('cloudMenuLabel');
const message=modal.querySelector('#cloudMessage');
const debug=modal.querySelector('#cloudDebug');
const account=modal.querySelector('#cloudAccount');
const accountText=modal.querySelector('#cloudAccountText');
const loginButton=modal.querySelector('#cloudLogin');
const syncButton=modal.querySelector('#cloudSync');
const logoutButton=modal.querySelector('#cloudLogout');
menuButton.onclick=()=>{modal.classList.add('open');document.body.style.overflow='hidden'};
modal.querySelector('.cloud-close').onclick=()=>{modal.classList.remove('open');document.body.style.overflow=''};

if(!(cfg.apiKey&&cfg.authDomain&&cfg.projectId&&cfg.appId)){
 message.className='cloud-error';message.textContent='Firebase設定が不足しているよ。';debug.textContent='config-missing';return;
}

(async()=>{
 try{
  const v='12.17.0';
  const appMod=await import(`https://www.gstatic.com/firebasejs/${v}/firebase-app.js`);
  const authMod=await import(`https://www.gstatic.com/firebasejs/${v}/firebase-auth.js`);
  const dbMod=await import(`https://www.gstatic.com/firebasejs/${v}/firebase-firestore.js`);
  const app=appMod.getApps().length?appMod.getApp():appMod.initializeApp(cfg);
  let auth;
  try{
    auth=authMod.initializeAuth(app,{
      persistence:[authMod.indexedDBLocalPersistence,authMod.browserLocalPersistence,authMod.browserSessionPersistence],
      popupRedirectResolver:authMod.browserPopupRedirectResolver
    });
  }catch(error){
    auth=authMod.getAuth(app);
  }
  auth.languageCode='ja';
  const db=dbMod.getFirestore(app);
  const provider=new authMod.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  let user=null,syncing=false;
  debug.textContent=`認証準備完了 / ${location.hostname}`;
  loginButton.disabled=false;

  const localSongs=()=>{try{const x=JSON.parse(localStorage.getItem(STORAGE_KEY));return Array.isArray(x)?x:[]}catch{return[]}};
  const merge=(a,b)=>{const m=new Map();[...b,...a].forEach(s=>{if(!s?.id)return;const old=m.get(s.id);if(!old||new Date(s.updatedAt||0)>=new Date(old.updatedAt||0))m.set(s.id,s)});return[...m.values()]};
  const setOut=()=>{user=null;label.textContent='ログイン・同期';account.classList.remove('show');loginButton.hidden=false;loginButton.disabled=false;syncButton.hidden=true;logoutButton.hidden=true;message.className='';message.textContent='未ログイン。データはこの端末に保存中。';};
  const setIn=u=>{user=u;label.textContent='ログイン済み ✓';account.classList.add('show');accountText.textContent=u.email||u.displayName||'Googleアカウント';loginButton.hidden=true;syncButton.hidden=false;logoutButton.hidden=false;message.className='';message.textContent='ログインできたよ！';};
  const sync=async()=>{if(!user||syncing)return;syncing=true;message.textContent='同期中…';try{const ref=dbMod.doc(db,'users',user.uid);const snap=await dbMod.getDoc(ref);const remote=snap.exists()&&Array.isArray(snap.data().songs)?snap.data().songs:[];const songs=merge(localSongs(),remote);localStorage.setItem(STORAGE_KEY,JSON.stringify(songs));await dbMod.setDoc(ref,{songs,email:user.email||'',updatedAt:dbMod.serverTimestamp()},{merge:true});message.textContent=`✅ 同期済み：${songs.length}曲`;}catch(e){message.className='cloud-error';message.textContent=`同期エラー：${e.code||e.message}`;}finally{syncing=false}};

  authMod.onAuthStateChanged(auth,async u=>{
    debug.textContent=`認証状態：${u?'ログイン済み':'未ログイン'} / ${location.hostname}`;
    if(u){setIn(u);notify('ログインできたよ！');await sync();}else setOut();
  },error=>{message.className='cloud-error';message.textContent=`認証監視エラー：${error.code||error.message}`;});

  loginButton.onclick=async()=>{
    loginButton.disabled=true;message.className='';message.textContent='Googleの画面を開いているよ…';debug.textContent='ポップアップ認証を開始';
    try{
      const result=await authMod.signInWithPopup(auth,provider,authMod.browserPopupRedirectResolver);
      debug.textContent=`ポップアップ成功：${result.user?.uid||'user'}`;
      setIn(result.user);notify('ログインできたよ！');await sync();
    }catch(e){
      console.error(e);loginButton.disabled=false;message.className='cloud-error';message.textContent=`ログインエラー：${e.code||e.message}`;debug.textContent=`失敗：${e.code||e.name||'unknown'}`;
    }
  };
  syncButton.onclick=sync;
  logoutButton.onclick=async()=>{await authMod.signOut(auth);notify('ログアウトしたよ');};
 }catch(e){
  console.error(e);message.className='cloud-error';message.textContent=`読込エラー：${e.message}`;debug.textContent=e.stack||e.message;
 }
})();
})();
