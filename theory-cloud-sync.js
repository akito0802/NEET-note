(()=>{
'use strict';
const cfg=window.NEET_FIREBASE_CONFIG||{};if(!(cfg.apiKey&&cfg.authDomain&&cfg.projectId&&cfg.appId))return;
const KEYS=['neet-theory-bookmarks-v2','neet-theory-progress-v2','neet-theory-settings-v2','neet-theory-recent-v2','neet-theory-course-v2','neet-theory-notes-v1'];
const stamp=k=>Number(localStorage.getItem(`neet-sync-time:${k}`)||0);
const snapshot=()=>Object.fromEntries(KEYS.flatMap(k=>{const v=localStorage.getItem(k);return v===null?[]:[[k,{value:v,updatedAt:stamp(k)||Date.now()}]]}));
const safeJson=(x,f)=>{try{return JSON.parse(x)}catch{return f}};
const mergeSet=(a,b)=>[...new Set([...(Array.isArray(a)?a:[]),...(Array.isArray(b)?b:[])])];
const mergeRecent=(a,b)=>{const m=new Map();[...(Array.isArray(b)?b:[]),...(Array.isArray(a)?a:[])].forEach(x=>{if(!x?.id)return;const old=m.get(x.id);if(!old||(x.at||0)>(old.at||0))m.set(x.id,x)});return[...m.values()].sort((x,y)=>(y.at||0)-(x.at||0)).slice(0,30)};
(async()=>{try{const v='12.17.0',appMod=await import(`https://www.gstatic.com/firebasejs/${v}/firebase-app.js`),authMod=await import(`https://www.gstatic.com/firebasejs/${v}/firebase-auth.js`),dbMod=await import(`https://www.gstatic.com/firebasejs/${v}/firebase-firestore.js`),app=appMod.getApps().length?appMod.getApp():appMod.initializeApp(cfg),auth=authMod.getAuth(app),db=dbMod.getFirestore(app);let user=null,timer=null,syncing=false;
 const sync=async()=>{if(!user||syncing)return;syncing=true;try{const ref=dbMod.doc(db,'users',user.uid),snap=await dbMod.getDoc(ref),remote=snap.exists()?(snap.data().theoryStorage||{}):{},local=snapshot(),merged={};for(const k of KEYS){const l=local[k],r=remote[k];if(!l&&!r)continue;let value,time=Math.max(l?.updatedAt||0,r?.updatedAt||0,Date.now());if(k==='neet-theory-bookmarks-v2'||k==='neet-theory-progress-v2'){value=JSON.stringify(mergeSet(l?safeJson(l.value,[]):[],r?safeJson(r.value,[]):[]))}else if(k==='neet-theory-recent-v2'){value=JSON.stringify(mergeRecent(l?safeJson(l.value,[]):[],r?safeJson(r.value,[]):[]))}else{const win=!r||((l?.updatedAt||0)>=(r?.updatedAt||0))?l:r;value=win?.value??'';time=win?.updatedAt||time}merged[k]={value,updatedAt:time};if(!l||l.value!==value){localStorage.setItem(k,value);localStorage.setItem(`neet-sync-time:${k}`,String(time))}}
 await dbMod.setDoc(ref,{theoryStorage:merged,theoryUpdatedAt:dbMod.serverTimestamp()},{merge:true});window.dispatchEvent(new CustomEvent('neet-theory:cloud-synced'));}catch(e){console.warn('Theory sync:',e)}finally{syncing=false}};
 authMod.onAuthStateChanged(auth,u=>{user=u;if(u)sync()});const original=Storage.prototype.setItem;if(!window.__neetTheorySyncWrapped){window.__neetTheorySyncWrapped=true;Storage.prototype.setItem=function(k,val){original.call(this,k,val);if(this===localStorage&&KEYS.includes(k)){original.call(localStorage,`neet-sync-time:${k}`,String(Date.now()));if(user){clearTimeout(timer);timer=setTimeout(sync,1000)}}}};
}catch(e){console.warn('Theory cloud sync init:',e)}})();
})();
