(()=>{
'use strict';
const load=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=()=>reject(new Error(`Failed to load ${src}`));document.head.appendChild(s)});
(async()=>{if(!window.NEET_THEORY_OS_DATA)await load('theory-learning-os-data.js?v=20260821-2');await load('theory-learning-os.js?v=20260821-2');await load('theory-cloud-sync.js?v=20260821-2')})().catch(e=>{console.error('Theory OS bootstrap:',e);const m=document.getElementById('libraryMount');if(m)m.textContent='理論ライブラリの追加機能を読み込めませんでした。再読み込みしてください。'});
})();
