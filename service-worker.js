const CACHE_VERSION='neet-note-mobile-offline-v20';
const OFFLINE_URL='./offline.html';

// NEET NOTE内でスマホ利用に必要なページ・見た目・ローカル機能を先に保存する。
// 1ファイルの取得失敗でインストール全体が失敗しないよう、個別にキャッシュする。
const CORE_ASSETS=[
  './',
  './?mode=note',
  './index.html',
  './offline.html',
  './tools.html',
  './lyrics.html',
  './voice-memo.html',
  './ideas.html',
  './calendar.html',
  './neeton-home.html',
  './terms.html',
  './about.html',
  './style.css',
  './background.css',
  './chord-picker.css',
  './print.css',
  './common-ui.css',
  './common-ui.js',
  './app.js',
  './structure-sync.js',
  './chord-picker.js',
  './print.js',
  './lyrics-page.js',
  './voice-memo.js',
  './ideas.js',
  './seo.js',
  './favicon.svg',
  './neeton.svg',
  './neeton-versions.svg',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
  './favicon-32x32.png',
  './favicon-16x16.png',
  './manifest.webmanifest'
];

const cacheOne=async(cache,url)=>{
  try{
    const request=new Request(url,{cache:'reload'});
    const response=await fetch(request);
    if(response.ok)await cache.put(request,response);
  }catch(error){
    console.warn('[NEET NOTE] precache skipped:',url,error);
  }
};

self.addEventListener('install',event=>{
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE_VERSION);
    await Promise.allSettled(CORE_ASSETS.map(url=>cacheOne(cache,url)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key!==CACHE_VERSION).map(key=>caches.delete(key)));
    await self.clients.claim();
    const clients=await self.clients.matchAll({type:'window'});
    clients.forEach(client=>client.postMessage({type:'NEET_NOTE_OFFLINE_READY',cache:CACHE_VERSION}));
  })());
});

self.addEventListener('message',event=>{
  if(event.data?.type==='SKIP_WAITING')self.skipWaiting();
  if(event.data?.type==='CACHE_NEET_NOTE_NOW'){
    event.waitUntil((async()=>{
      const cache=await caches.open(CACHE_VERSION);
      await Promise.allSettled(CORE_ASSETS.map(url=>cacheOne(cache,url)));
      event.source?.postMessage?.({type:'NEET_NOTE_CACHE_COMPLETE'});
    })());
  }
});

const putSafe=async(request,response)=>{
  if(!response||(!response.ok&&response.type!=='opaque'))return response;
  const cache=await caches.open(CACHE_VERSION);
  await cache.put(request,response.clone());
  return response;
};

const navigationResponse=async request=>{
  try{
    const response=await fetch(request);
    await putSafe(request,response);
    return response;
  }catch{
    return await caches.match(request,{ignoreSearch:true})
      || await caches.match('./index.html')
      || await caches.match('./')
      || await caches.match(OFFLINE_URL);
  }
};

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;

  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;

  if(request.mode==='navigate'){
    event.respondWith(navigationResponse(request));
    return;
  }

  // Firebase同期・AI・認証など通信前提の処理は、オンライン時は最新版を優先。
  const networkFirstNames=[
    'cloud-sync.js','firebase-config.js','auth-fix.js','service-worker.js',
    'common-ui.js','common-ui.css','manifest.webmanifest','seo.js'
  ];
  const networkFirst=networkFirstNames.some(name=>url.pathname.endsWith(name));

  if(networkFirst){
    event.respondWith((async()=>{
      try{return await putSafe(request,await fetch(request,{cache:'no-store'}));}
      catch{return await caches.match(request,{ignoreSearch:true});}
    })());
    return;
  }

  // CSS・JS・画像・音声などは保存済みを即表示し、未保存なら取得して次回用に保存。
  event.respondWith((async()=>{
    const cached=await caches.match(request,{ignoreSearch:true});
    if(cached)return cached;
    try{return await putSafe(request,await fetch(request));}
    catch{return Response.error();}
  })());
});
