(()=>{
'use strict';
const KEY='song-note-songs-v1',cfg=window.NEET_FIREBASE_CONFIG||{},ready=Boolean(cfg.apiKey&&cfg.authDomain&&cfg.projectId&&cfg.appId),side=document.getElementById('sideMenu');if(!side)return;
const b=document.createElement('button');b.className='menu-link';b.type='button';b.innerHTML='<span class="menu-icon">☁️</span><span>ログイン・同期</span>';side.insertBefore(b,side.querySelector('[data-theme-toggle]')||null);
const box=document.createElement('div');box.style.cssText='position:fixed;inset:0;z-index:32000;display:none;place-items:center;padding:18px;background:rgba(17,24,39,.58)';box.innerHTML='<section style="width:min(430px,100%);padding:22px;border-radius:22px;background:var(--ui-surface,#fffdf8);color:var(--ui-text,#1f2937)"><div style="display:flex;justify-content:space-between;align-items:center"><h2>☁️ クラウド同期</h2><button id="cloudClose" type="button">×</button></div><p id="cloudMessage">曲データを端末間で同期できるよ。</p><div style="display:flex;gap:10px;flex-wrap:wrap"><button id="cloudLogin" class="primary-button" type="button">Googleでログイン</button><button id="cloudSync" class="ghost-button" type="button">今すぐ同期</button><button id="cloudLogout" class="ghost-button" type="button">ログアウト</button></div></section>';document.body.appendChild(box);
const msg=box.querySelector('#cloudMessage'),login=box.querySelector('#cloudLogin'),syncBtn=box.querySelector('#cloudSync'),logout=box.querySelector('#cloudLogout');b.onclick=()=>box.style.display='grid';box.querySelector('#cloudClose').onclick=()=>box.style.display='none';
if(!ready){msg.textContent='Firebase設定がまだ入っていないよ。';login.disabled=syncBtn.disabled=logout.disabled=true;return;}
(async()=>{try{
 const appMod=await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js');
 const authMod=await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js');
 const dbMod=await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js');
 const app=appMod.initializeApp(cfg),auth=authMod.getAuth(app),db=dbMod.getFirestore(app);let user=null,syncing=false,syncTimer=null;
 const provider=new authMod.GoogleAuthProvider();provider.setCustomParameters({prompt:'select_account'});
 const read=()=>{try{const v=JSON.parse(localStorage.getItem(KEY));return Array.isArray(v)?v:[]}catch{return[]}};
 const merge=(a,b)=>{const m=new Map();[...a,...b].forEach(x=>{const old=m.get(x.id);if(!old||new Date(x.updatedAt||0)>new Date(old.updatedAt||0))m.set(x.id,x)});return[...m.values()]};
 const sync=async()=>{if(!user||syncing)return;syncing=true;msg.textContent='同期中…';try{const ref=dbMod.doc(db,'users',user.uid),snap=await dbMod.getDoc(ref),remote=snap.exists()&&Array.isArray(snap.data().songs)?snap.data().songs:[],songs=merge(read(),remote);localStorage.setItem(KEY,JSON.stringify(songs));await dbMod.setDoc(ref,{songs,updatedAt:dbMod.serverTimestamp()},{merge:true});msg.textContent=`同期済み：${songs.length}曲`;}catch(e){console.error(e);msg.textContent=`同期エラー：${e.code||e.message}`;}finally{syncing=false}};
 try{await authMod.getRedirectResult(auth)}catch(e){console.error(e);msg.textContent=`ログインエラー：${e.code||e.message}`;}
 authMod.onAuthStateChanged(auth,async u=>{user=u;login.hidden=Boolean(u);logout.hidden=!u;syncBtn.hidden=!u;msg.textContent=u?`${u.email||'Googleアカウント'}でログイン中`:'未ログイン。データはこの端末に保存中。';if(u)await sync()});
 login.onclick=async()=>{login.disabled=true;msg.textContent='Googleログインを開いているよ…';try{const mobile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)||window.matchMedia('(display-mode: standalone)').matches;if(mobile){await authMod.signInWithRedirect(auth,provider);}else{await authMod.signInWithPopup(auth,provider);}}catch(e){console.error(e);msg.textContent=`ログインエラー：${e.code||e.message}`;login.disabled=false;}};
 logout.onclick=()=>authMod.signOut(auth);syncBtn.onclick=sync;
 window.addEventListener('storage',e=>{if(e.key===KEY&&user){clearTimeout(syncTimer);syncTimer=setTimeout(sync,800)}});
 document.addEventListener('neet-note:saved',()=>{if(user){clearTimeout(syncTimer);syncTimer=setTimeout(sync,900)}});
}catch(e){console.error(e);msg.textContent=`クラウド機能の読込エラー：${e.message}`;}})();
})();
