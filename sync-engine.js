// One sync owner for both menu UIs. Opening a page never makes its cache newer.
(()=>{
'use strict';
if(window.NEETSyncEngine)return;
const KEYS=['song-note-songs-v1','neet-note-lyrics-memos-v1','neet-note-calendar-v1','neet-note-ideas-v1','neet-note-theme','neet-note-melodies-v1'];
const originalSet=Storage.prototype.setItem,originalRemove=Storage.prototype.removeItem;
const read=k=>{try{return JSON.parse(localStorage.getItem(k))}catch{return null}};
const rawSet=(k,v)=>originalSet.call(localStorage,k,v);
let db,api,user=null,ready=false,running=null,again=false,timer,reloading=false,needsReload=false;
let base={},pending={},generation=0;
const metaKey=uid=>'neet-sync-state-v2:'+uid;
const persist=()=>{if(user)rawSet(metaKey(user.uid),JSON.stringify({base,pending}))};
const state=(text,error=false)=>window.dispatchEvent(new CustomEvent('neet-note:sync-status',{detail:{text,error}}));
const backup=(key,value)=>{
  if(value===null)return;
  const name='neet-sync-recovery-v2';
  const copies=read(name)||[];
  if(!copies.some(x=>x.key===key&&x.value===value)){
    copies.unshift({key,value,at:new Date().toISOString(),uid:user?.uid});
    rawSet(name,JSON.stringify(copies.slice(0,12)));
  }
};
const schedule=()=>{clearTimeout(timer);timer=setTimeout(()=>sync(),500)};
const record=(key,value)=>{
  if(!user)return;
  pending[key]={value,base:pending[key]?.base??base[key]??null,id:crypto.randomUUID()};
  persist();schedule();
};
Storage.prototype.setItem=function(key,value){
  key=String(key);value=String(value);
  if(this!==localStorage||!KEYS.includes(key))return originalSet.call(this,key,value);
  if(reloading)return;
  const previous=this.getItem(key);
  originalSet.call(this,key,value);
  if(previous===value)return;
  rawSet('neet-sync-time:'+key,String(Date.now()));
  record(key,value);
};
Storage.prototype.removeItem=function(key){
  key=String(key);
  if(this!==localStorage||!KEYS.includes(key))return originalRemove.call(this,key);
  if(reloading)return;
  const previous=this.getItem(key);originalRemove.call(this,key);
  if(previous!==null)record(key,null);
};
async function sync(){
  if(!user||!api||reloading)return;
  if(running){again=true;return running}
  const owner=user,epoch=generation;
  state('最新データを同期中…');
  running=(async()=>{
    try{
      // Flush the editor's debounce before capturing the upload. No-op saves stay no-op.
      window.dispatchEvent(new CustomEvent('neet-note:before-sync'));
      const sent=JSON.parse(JSON.stringify(pending));
      const local=Object.fromEntries(KEYS.map(k=>[k,localStorage.getItem(k)]));
      const ref=api.doc(db,'users',owner.uid);
      const result=await api.runTransaction(db,async tx=>{
        const snap=await tx.get(ref);
        const data=snap.exists()?snap.data():{};
        const storage={...(data.storage||{})};
        // Older versions also kept songs in a top-level compatibility field.
        if(!storage[KEYS[0]]&&Array.isArray(data.songs))storage[KEYS[0]]={value:JSON.stringify(data.songs),updatedAt:0};
        let wrote=false;const accepted=[];
        for(const key of KEYS){
          const remote=storage[key]?.value??null,edit=sent[key];
          // Only a real local edit based on this cloud version may replace it.
          // An unknown legacy cache loses to an existing cloud value.
          if(edit&&(edit.base===remote||edit.value===remote)){
            storage[key]={value:edit.value,updatedAt:Date.now()};accepted.push(key);wrote=true;
          }else if(!snap.exists()&&local[key]!==null){
            storage[key]={value:local[key],updatedAt:Date.now()};accepted.push(key);wrote=true;
          }
        }
        if(wrote){
          if(epoch!==generation)throw new Error('アカウントが切り替わったため同期を中止したよ');
          tx.set(ref,{storage,songs:storage[KEYS[0]]?.value?JSON.parse(storage[KEYS[0]].value):[],email:owner.email||'',updatedAt:api.serverTimestamp()},{merge:true});
        }
        return {storage,accepted};
      });
      if(epoch!==generation)return;
      window.dispatchEvent(new CustomEvent('neet-note:before-sync'));
      let changed=false,conflict=false;
      for(const key of KEYS){
        const entry=result.storage[key];
        if(!entry)continue;
        const value=entry.value??null,edit=sent[key],current=pending[key];
        base[key]=value;
        // Edits made while the request was in flight remain queued.
        if(current&&current.id!==edit?.id){
          if(result.accepted.includes(key))current.base=value;
          again=true;continue;
        }
        const previous=localStorage.getItem(key);
        if(previous!==value){
          backup(key,previous);
          if(edit)conflict=true;
          if(value===null)originalRemove.call(localStorage,key);else rawSet(key,value);
          changed=true;
        }
        rawSet('neet-sync-time:'+key,String(entry.updatedAt||0));
        delete pending[key];
      }
      ready=true;persist();
      state(conflict?'最新データを受信したよ。競合した端末データは復元用に保管済み。':'✅ 同期済み');
      if(changed)needsReload=true;
      if(needsReload){
        window.dispatchEvent(new CustomEvent('neet-note:cloud-synced'));
        // Other pages hold data in closures; reload only once all queued edits are saved.
        if(!Object.keys(pending).length){reloading=true;location.reload()}
        else again=true;
      }
    }catch(e){console.error(e);state('同期できなかったよ。端末の変更は保持中：'+(e.code||e.message),true)}
    finally{running=null;if(again){again=false;schedule()}}
  })();
  return running;
}
window.NEETSyncEngine={
  configure(database,module){db=database;api=module;return this},
  setUser(next){
    if(user?.uid===next?.uid)return running||Promise.resolve();
    generation++;clearTimeout(timer);user=next;ready=false;base={};pending={};
    if(user){
      const saved=read(metaKey(user.uid));base=saved?.base||{};pending=saved?.pending||{};
      // Recover edits saved before Firebase/auth finished loading on this page.
      for(const key of KEYS){
        if(!Object.prototype.hasOwnProperty.call(base,key))continue;
        const value=localStorage.getItem(key);
        if(value!==(pending[key]?pending[key].value:base[key])){
          pending[key]={value,base:pending[key]?pending[key].base:base[key],id:crypto.randomUUID()};
        }
      }
      persist();return sync();
    }
  },
  sync,
  get ready(){return ready}
};
window.addEventListener('focus',()=>sync());
window.addEventListener('online',()=>sync());
window.addEventListener('pageshow',e=>{if(e.persisted)sync()});
document.addEventListener('visibilitychange',()=>{
  if(document.visibilityState==='visible')sync();
  else{window.dispatchEvent(new CustomEvent('neet-note:before-sync'));sync()}
});
})();
