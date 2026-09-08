import vm from 'node:vm';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
const source=fs.readFileSync(new URL('../sync-engine.js',import.meta.url),'utf8');
const KEY='song-note-songs-v1',IDEAS='neet-note-ideas-v1';
const song=t=>JSON.stringify([{id:'song',title:t}]);
const user={uid:'test',email:'test@example.invalid'};
function device(server,initial={},saved){
  const values=saved||new Map(Object.entries(initial)),listeners={},timers=new Map();let next=0,reloads=0;
  class Storage{getItem(k){return values.get(k)??null}setItem(k,v){values.set(k,String(v))}removeItem(k){values.delete(k)}}
  const on=(name,fn)=>(listeners[name]||=[]).push(fn);
  const context={Storage,localStorage:new Storage(),crypto:{randomUUID},console,
    CustomEvent:class{constructor(type,init={}){this.type=type;this.detail=init.detail}},
    setTimeout(fn){timers.set(++next,fn);return next},clearTimeout(id){timers.delete(id)},
    addEventListener:on,dispatchEvent(e){for(const fn of listeners[e.type]||[])fn(e)},
    document:{visibilityState:'visible',addEventListener:on},location:{reload(){reloads++}}};
  context.window=context;
  vm.runInNewContext(source,context);
  const api={doc:(_,__,uid)=>uid,serverTimestamp:()=>123,async runTransaction(_,fn){
    if(server.fail)throw new Error('offline');
    const snapshot=structuredClone(server.data);let write;
    const result=await fn({get:async()=>({exists:()=>snapshot!==null,data:()=>snapshot}),set:(_,data)=>{write=data}});
    if(server.hold){const hold=server.hold;server.hold=null;await hold()}
    if(write){server.data={...server.data,...write};server.writes++}
    return result;
  }};
  const engine=context.NEETSyncEngine.configure({},api);
  return {engine,values,context,get reloads(){return reloads},set:(k,v)=>context.localStorage.setItem(k,v),
    async drain(){for(let n=0;timers.size&&n<10;n++){const batch=[...timers.values()];timers.clear();for(const fn of batch)await fn()}assert.equal(timers.size,0)}};
}
const server={data:{storage:{[KEY]:{value:song('phone newest'),updatedAt:10}}},writes:0};
let pc=device(server,{[KEY]:song('old PC'),['neet-sync-time:'+KEY]:999999});
await pc.engine.setUser(user);
assert.equal(pc.values.get(KEY),song('phone newest'));
assert.equal(server.writes,0,'opening old PC must not upload');
assert.equal(pc.reloads,1);
assert.ok(pc.values.get('neet-sync-recovery-v2').includes('old PC'));
pc.set(KEY,song('unload stale'));assert.equal(pc.values.get(KEY),song('phone newest'),'reload cannot save stale closure');
pc=device(server,{},pc.values);await pc.engine.setUser(user);
pc.set(KEY,song('edited PC'));await pc.drain();
assert.equal(server.data.storage[KEY].value,song('edited PC'));
assert.equal(pc.reloads,0);
const before=server.writes;pc.set(KEY,song('edited PC'));await pc.drain();assert.equal(server.writes,before,'no-op is not an edit');
await pc.engine.setUser(user);assert.equal(server.writes,before,'two menu auth callbacks share one owner');
let phone=device(server,{[KEY]:song('phone newest')});await phone.engine.setUser(user);
assert.equal(phone.values.get(KEY),song('edited PC'),'PC to phone works');
phone=device(server,{},phone.values);await phone.engine.setUser(user);
phone.set(KEY,song('phone next'));await phone.drain();
await pc.engine.sync();assert.equal(pc.values.get(KEY),song('phone next'),'focus/manual pull refreshes idle PC');
// Offline unsent edits survive reopening when their base is still current.
phone.set(KEY,song('offline draft'));server.fail=true;await phone.drain();server.fail=false;
phone=device(server,{},phone.values);await phone.engine.setUser(user);
assert.equal(server.data.storage[KEY].value,song('offline draft'));
// A stale offline cache must not overwrite another device's newer cloud revision.
phone.set(KEY,song('stale draft'));
server.data.storage[KEY]={value:song('other device latest'),updatedAt:20};
await phone.drain();assert.equal(server.data.storage[KEY].value,song('other device latest'));
assert.ok(phone.values.get('neet-sync-recovery-v2').includes('stale draft'));
// Edits during a request are queued, rebased only after our own successful write.
let active=device(server,{[KEY]:song('other device latest')});await active.engine.setUser(user);
active.set(KEY,song('first edit'));
let release;server.hold=()=>new Promise(r=>release=r);
const flight=active.engine.sync();await new Promise(r=>setImmediate(r));
active.set(KEY,song('second edit'));release();await flight;await active.drain();
assert.equal(server.data.storage[KEY].value,song('second edit'));
// Remote-only keys and deletion markers propagate without resurrecting entries.
server.data.storage[IDEAS]={value:'[{"id":"idea"}]',updatedAt:30};
await active.engine.sync();assert.equal(active.values.get(IDEAS),'[{"id":"idea"}]');
active=device(server,{},active.values);await active.engine.setUser(user);
active.context.localStorage.removeItem(IDEAS);await active.drain();assert.equal(server.data.storage[IDEAS].value,null);
// A brand-new account can import its existing local work exactly once.
const empty={data:null,writes:0};const first=device(empty,{[KEY]:song('local only')});await first.engine.setUser(user);
assert.equal(empty.data.storage[KEY].value,song('local only'));await first.engine.sync();assert.equal(empty.writes,1);
console.log('PASS: startup, both directions, duplicate owners, no-op saves, offline retry, conflict preservation, in-flight edits, remote-only keys, deletion, first-account import');

// Regression: cloud contains only Mellow Rain but the displaced snapshot contains other songs.
const mellow={id:'mellow',title:'Mellow Rain',lyricIdea:'KEEP CURRENT'};
const lost={id:'scene',title:'scene',lyricIdea:'original lyrics'};
const deleted={id:'deleted',title:'Deleted',deletedAt:'2026-09-08T00:00:00Z'};
const damaged={data:{storage:{[KEY]:{value:JSON.stringify([mellow,deleted]),updatedAt:10}}},writes:0};
const repaired=device(damaged,{[KEY]:JSON.stringify([mellow]),'neet-sync-recovery-v2':JSON.stringify([
 {uid:user.uid,key:KEY,value:JSON.stringify([{...mellow,lyricIdea:'OLD'},lost,{id:'deleted',title:'Deleted'}])},
 {uid:'other-account',key:KEY,value:JSON.stringify([{id:'private',title:'Must not import'}])}
])});
await repaired.engine.setUser(user);
const recovered=JSON.parse(damaged.data.storage[KEY].value);
assert.equal(recovered.find(x=>x.id==='mellow').lyricIdea,'KEEP CURRENT');
assert.equal(recovered.find(x=>x.id==='scene').lyricIdea,'original lyrics');
assert.ok(recovered.find(x=>x.id==='deleted').deletedAt);
assert.equal(recovered.find(x=>x.id==='private'),undefined);
assert.equal(JSON.parse(repaired.values.get(KEY)).length,3);
assert.equal(JSON.parse(repaired.values.get('neet-sync-repair-report:'+user.uid)).songs.length,1);
// Future first-time sync retains locally unique songs while cloud wins matching IDs.
const unique=device(damaged,{[KEY]:JSON.stringify([{...mellow,lyricIdea:'STALE'},lost,{id:'apricot',title:'apricot'}])});
await unique.engine.setUser(user);
assert.equal(JSON.parse(damaged.data.storage[KEY].value).find(x=>x.id==='mellow').lyricIdea,'KEEP CURRENT');
assert.ok(JSON.parse(damaged.data.storage[KEY].value).find(x=>x.id==='apricot'));
console.log('PASS: restore missing songs from displaced backups, preserve current lyrics and tombstones, exclude other accounts, retain unique device songs');

const resumed=device(damaged,{},unique.values);await resumed.engine.setUser(user);
resumed.set(KEY,JSON.stringify([{...mellow,title:'Mellow Rain edit'}]));await resumed.drain();
assert.ok(JSON.parse(damaged.data.storage[KEY].value).find(x=>x.id==='scene'));
assert.ok(JSON.parse(damaged.data.storage[KEY].value).find(x=>x.id==='apricot'));
console.log('PASS: saving a partial editor snapshot cannot drop restored songs');
