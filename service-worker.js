const CACHE='neet-note-v4';
const CORE=['./','./?mode=note','./index.html','./tools.html','./style.css','./background.css','./chord-picker.css','./print.css','./common-ui.css','./app.js','./structure-sync.js','./chord-picker.js','./print.js','./favicon.svg','./apple-touch-icon.png','./manifest.webmanifest'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==location.origin)return;
  const alwaysFresh=['cloud-sync.js','firebase-config.js','common-ui.js','service-worker.js'].some(name=>url.pathname.endsWith(name));
  if(alwaysFresh){
    event.respondWith(fetch(event.request,{cache:'no-store'}).catch(()=>caches.match(event.request)));
    return;
  }
  event.respondWith(fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match(event.request).then(cached=>cached||caches.match('./index.html'))));
});
