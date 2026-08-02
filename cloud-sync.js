(()=>{
'use strict';
const STORAGE_KEY='song-note-songs-v1';
const cfg=window.NEET_FIREBASE_CONFIG||{};
const side=document.getElementById('sideMenu');
if(!side||document.getElementById('cloudSyncMenuButton'))return;

const configured=Boolean(cfg.apiKey&&cfg.authDomain&&cfg.projectId&&cfg.appId);
const menuButton=document.createElement('button');
menuButton.id='cloudSyncMenuButton';
menuButton.className='menu-link';
menuButton.type='button';
menuButton.innerHTML='<span class="menu-icon">☁️</span><span id="cloudMenuLabel">ログイン・同期</span>';
side.insertBefore(menuButton,side.querySelector('[data-theme-toggle]')||null);

const css=document.createElement('style');
css.textContent=`
.cloud-modal{position:fixed;inset:0;z-index:32000;display:none;place-items:center;padding:18px;background:rgba(17,24,39,.58)}
.cloud-modal.open{display:grid}.cloud-panel{width:min(430px,100%);padding:22px;border-radius:22px;background:var(--ui-surface,#fffdf8);color:var(--ui-text,#1f2937);box-shadow:0 24px 70px rgba(0,0,0,.3)}
.cloud-head{display:flex;align-items:center;justify-content:space-between;gap:12px}.cloud-head h2{margin:0}.cloud-close{width:44px;height:44px;border:0;border-radius:999px;background:var(--ui-surface-2,#eee);color:inherit;font-size:1.25rem}
.cloud-account{display:none;align-items:center;gap:12px;margin:16px 0;padding:14px;border:1px solid rgba(52,199,89,.35);border-radius:16px;background:rgba(52,199,89,.12)}.cloud-account.show{display:flex}
.cloud-check{display:grid;place-items:center;width:42px;height:42px;flex:0 0 42px;border-radius:50%;background:#34c759;color:#fff;font-weight:900}.cloud-account b,.cloud-account small{display:block}.cloud-account small{margin-top:3px;word-break:break-all;color:var(--ui-muted,#6b7280)}
.cloud-actions{display:flex;gap:10px;flex-wrap:wrap}.cloud-error{color:#c62828}.cloud-toast{position:fixed;left:50%;top:max(18px,env(safe-area-inset-top));z-index:50000;width:min(92vw,430px);padding:15px 18px;border-radius:18px;background:rgba(28,28,30,.94);color:#fff;box-shadow:0 18px 50px rgba(0,0,0,.3);transform:translate(-50%,-150%);opacity:0;transition:.3s;pointer-events:none}.cloud-toast.show{transform:translate(-50%,0);opacity:1}.cloud-toast b,.cloud-toast small{display:block}.cloud-toast small{margin-top:3px;color:rgba(255,255,255,.75)}
@media(max-width:600px){.cloud-modal{align-items:end;padding:0}.cloud-panel{border-radius:22px 22px 0 0;padding-bottom:calc(22px + env(safe-area-inset-bottom))}}
`;
document.head.appendChild(css);

const modal=document.createElement('div');
modal.className='cloud-modal';
modal.innerHTML=`<section class="cloud-panel" role="dialog" aria-modal="true" aria-labelledby="cloudTitle">
  <div class="cloud-head"><h2 id="cloudTitle">☁️ クラウド同期</h2><button class="cloud-close" type="button" aria-label="閉じる">×</button></div>
  <div id="cloudAccount" class="cloud-account"><span class="cloud-check">✓</span><span><b>Googleログイン済み</b><small id="cloudAccountText"></small></span></div>
  <p id="cloudMessage">曲データを端末間で同期できるよ。</p>
  <div class="cloud-actions"><button id="cloudLogin" class="primary-button" type="button">Googleでログイン</button><button id="cloudSync" class="ghost-button" type="button" hidden>今すぐ同期</button><button id="cloudLogout" class="ghost-button" type="button" hidden>ログアウト</button></div>
</section>`;
document.body.appendChild(modal);

const toast=document.createElement('div');
toast.className='cloud-toast';
toast.innerHTML='<b id="cloudToastTitle"></b><small id="cloudToastText"></small>';
document.body.appendChild(toast);
let toastTimer;
function notify(title,text=''){
  toast.querySelector('#cloudToastTitle').textContent=title;
  toast.querySelector('#cloudToastText').textContent=text;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove('show'),3200);
}

const label=document.getElementById('cloudMenuLabel');
const message=modal.querySelector('#cloudMessage');
const account=modal.querySelector('#cloudAccount');
const accountText=modal.querySelector('#cloudAccountText');
const loginButton=modal.querySelector('#cloudLogin');
const syncButton=modal.querySelector('#cloudSync');
const logoutButton=modal.querySelector('#cloudLogout');
const close=()=>{modal.classList.remove('open');document.body.style.overflow=''};
menuButton.addEventListener('click',()=>{modal.classList.add('open');document.body.style.overflow='hidden'});
modal.querySelector('.cloud-close').addEventListener('click',close);
modal.addEventListener('click',e=>{if(e.target===modal)close()});

if(!configured){message.textContent='Firebase設定がまだ入っていないよ。';loginButton.disabled=true;return;}

(async()=>{
 try{
  const version='12.17.0';
  const appMod=await import(`https://www.gstatic.com/firebasejs/${version}/firebase-app.js`);
  const authMod=await import(`https://www.gstatic.com/firebasejs/${version}/firebase-auth.js`);
  const dbMod=await import(`https://www.gstatic.com/firebasejs/${version}/firebase-firestore.js`);
  const app=appMod.getApps().length?appMod.getApp():appMod.initializeApp(cfg);
  const auth=authMod.getAuth(app);
  const db=dbMod.getFirestore(app);
  const provider=new authMod.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  let currentUser=null;
  let syncing=false;
  let syncTimer=null;

  try{
    await authMod.setPersistence(auth,authMod.indexedDBLocalPersistence);
  }catch(firstError){
    console.warn('IndexedDB persistence unavailable',firstError);
    await authMod.setPersistence(auth,authMod.browserLocalPersistence);
  }

  const readLocal=()=>{
    try{const value=JSON.parse(localStorage.getItem(STORAGE_KEY));return Array.isArray(value)?value:[];}catch{return[];}
  };
  const mergeSongs=(local,remote)=>{
    const map=new Map();
    [...remote,...local].forEach(song=>{
      if(!song||!song.id)return;
      const previous=map.get(song.id);
      if(!previous||new Date(song.updatedAt||0)>=new Date(previous.updatedAt||0))map.set(song.id,song);
    });
    return [...map.values()].sort((a,b)=>new Date(b.updatedAt||0)-new Date(a.updatedAt||0));
  };
  const setSignedOut=()=>{
    currentUser=null;label.textContent='ログイン・同期';account.classList.remove('show');accountText.textContent='';loginButton.hidden=false;loginButton.disabled=false;syncButton.hidden=true;logoutButton.hidden=true;message.className='';message.textContent='未ログイン。データはこの端末に保存中。';
  };
  const setSignedIn=user=>{
    currentUser=user;const name=user.displayName||user.email||'Googleアカウント';label.textContent='ログイン済み ✓';account.classList.add('show');accountText.textContent=user.email||name;loginButton.hidden=true;syncButton.hidden=false;logoutButton.hidden=false;message.className='';message.textContent=`✅ ${name}でログイン中`;
  };
  const sync=async(manual=false)=>{
    if(!currentUser||syncing)return;
    syncing=true;syncButton.disabled=true;message.className='';message.textContent='同期中…';
    try{
      const ref=dbMod.doc(db,'users',currentUser.uid);
      const snap=await dbMod.getDoc(ref);
      const remote=snap.exists()&&Array.isArray(snap.data().songs)?snap.data().songs:[];
      const songs=mergeSongs(readLocal(),remote);
      localStorage.setItem(STORAGE_KEY,JSON.stringify(songs));
      await dbMod.setDoc(ref,{songs,updatedAt:dbMod.serverTimestamp(),email:currentUser.email||''},{merge:true});
      message.textContent=`✅ 同期済み：${songs.length}曲`;
      if(manual)notify('同期できたよ！',`${songs.length}曲をクラウドへ保存したよ`);
      window.dispatchEvent(new CustomEvent('neet-note:cloud-synced',{detail:{songs}}));
    }catch(error){
      console.error(error);message.className='cloud-error';message.textContent=`同期エラー：${error.code||error.message}`;
    }finally{syncing=false;syncButton.disabled=false;}
  };

  try{
    const result=await authMod.getRedirectResult(auth);
    if(result?.user){notify('ログインできたよ！',`${result.user.displayName||result.user.email||'Googleアカウント'}で接続したよ`);}
  }catch(error){
    console.error(error);message.className='cloud-error';message.textContent=`ログインエラー：${error.code||error.message}`;
  }

  authMod.onAuthStateChanged(auth,async user=>{
    if(user){
      const wasDifferent=sessionStorage.getItem('neet-note-auth-uid')!==user.uid;
      setSignedIn(user);
      sessionStorage.setItem('neet-note-auth-uid',user.uid);
      if(wasDifferent)notify('ログインできたよ！',`${user.displayName||user.email||'Googleアカウント'}で接続したよ`);
      await sync(false);
    }else{
      sessionStorage.removeItem('neet-note-auth-uid');setSignedOut();
    }
  });

  loginButton.addEventListener('click',async()=>{
    loginButton.disabled=true;message.className='';message.textContent='Googleログインを開いているよ…';
    try{
      const result=await authMod.signInWithPopup(auth,provider);
      if(result.user){setSignedIn(result.user);notify('ログインできたよ！',`${result.user.displayName||result.user.email||'Googleアカウント'}で接続したよ`);await sync(false);}
    }catch(error){
      console.error(error);
      const redirectCodes=['auth/popup-blocked','auth/operation-not-supported-in-this-environment','auth/cancelled-popup-request'];
      if(redirectCodes.includes(error.code)){
        message.textContent='画面を切り替えてログインするよ…';
        await authMod.signInWithRedirect(auth,provider);
        return;
      }
      message.className='cloud-error';message.textContent=`ログインエラー：${error.code||error.message}`;loginButton.disabled=false;
    }
  });
  syncButton.addEventListener('click',()=>sync(true));
  logoutButton.addEventListener('click',async()=>{await authMod.signOut(auth);notify('ログアウトしたよ','端末内のデータは残っているよ');});
  document.addEventListener('neet-note:saved',()=>{if(currentUser){clearTimeout(syncTimer);syncTimer=setTimeout(()=>sync(false),1000);}});
 }catch(error){
  console.error(error);message.className='cloud-error';message.textContent=`クラウド機能の読込エラー：${error.message}`;
 }
})();
})();
