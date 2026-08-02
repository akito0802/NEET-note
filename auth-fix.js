(()=>{
'use strict';
const waitForButton=()=>new Promise(resolve=>{const found=document.getElementById('cloudLogin');if(found){resolve(found);return;}const timer=setInterval(()=>{const button=document.getElementById('cloudLogin');if(button){clearInterval(timer);resolve(button)}},100);setTimeout(()=>{clearInterval(timer);resolve(null)},10000)});
(async()=>{try{
 const login=await waitForButton();if(!login)return;
 const appMod=await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js');
 const authMod=await import('https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js');
 const cfg=window.NEET_FIREBASE_CONFIG||{};
 const app=appMod.getApps().length?appMod.getApp():appMod.initializeApp(cfg);
 const auth=authMod.getAuth(app);
 await authMod.setPersistence(auth,authMod.browserLocalPersistence);
 const provider=new authMod.GoogleAuthProvider();provider.setCustomParameters({prompt:'select_account'});
 login.onclick=async()=>{
  login.disabled=true;
  const msg=document.getElementById('cloudMessage');if(msg)msg.textContent='Googleログインを開いているよ…';
  try{
   const result=await authMod.signInWithPopup(auth,provider);
   if(result?.user){if(msg)msg.textContent=`✅ ${result.user.displayName||result.user.email||'Googleアカウント'}でログイン中`;location.reload();}
  }catch(e){
   console.error(e);
   if(['auth/popup-blocked','auth/cancelled-popup-request','auth/operation-not-supported-in-this-environment'].includes(e.code)){
    if(msg)msg.textContent='別画面でログインします…';
    await authMod.signInWithRedirect(auth,provider);return;
   }
   if(msg)msg.textContent=`ログインエラー：${e.code||e.message}`;
   login.disabled=false;
  }
 };
}catch(e){console.error('auth-fix',e)}})();
})();
