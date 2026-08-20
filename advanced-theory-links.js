(()=>{
'use strict';
if(window.NEETAdvancedTheoryLinks)return;
const ROOT='https://akito0802.github.io/NEET-note/';
const tools=[
 {href:ROOT+'voice-leading.html',icon:'↔',home:'ボイスリーディング',menu:'ボイスリーディング・ナビ',desc:'声部を最短距離で滑らかにつなぐ',key:'voice-leading'},
 {href:ROOT+'guitar-pro.html',icon:'🎸',home:'GUITAR PRO',menu:'GUITAR PRO',desc:'ギターのコードチェンジとボイシングを設計',key:'guitar-pro'},
 {href:ROOT+'modulation-route.html',icon:'◎',home:'転調メーカー',menu:'転調ルートメーカー',desc:'転調ルートを作る・理論を学ぶ',key:'modulation-route'},
 {href:ROOT+'reharmonize.html',icon:'◇',home:'代理コード',menu:'代理コード・リハーモナイズ',desc:'役割を保つ置換候補を調べる',key:'reharmonize'},
 {href:ROOT+'nondiatonic-analyzer.html',icon:'△',home:'ノンダイアトニック',menu:'ノンダイアトニック判定',desc:'キー外コードの役割を分析',key:'nondiatonic'},
 {href:ROOT+'tension-checker.html',icon:'＋',home:'テンション',menu:'テンション適合チェッカー',desc:'9th・11th・13thの適合を確認',key:'tension'},
 {href:ROOT+'slash-chord-lab.html',icon:'／',home:'オンコード',menu:'オンコード設計ラボ',desc:'転回形とベースラインを設計',key:'slash-chord'}
];
function installHome(){const grid=document.querySelector('.nh-grid-theory');if(!grid)return false;for(const t of tools){if(grid.querySelector(`[data-advanced-theory="${t.key}"]`))continue;const a=document.createElement('a');a.href=t.href;a.className='nh-tile';a.dataset.advancedTheory=t.key;a.innerHTML=`<span class="nh-icon">${t.icon}</span><span class="nh-tile-copy"><b>${t.home}</b><small>${t.desc}</small></span>`;grid.appendChild(a)}const group=grid.closest('.nh-tool-group');const count=group?.querySelector('.nh-group-head small');if(count)count.textContent=`${6+tools.length} tools`;const status=document.querySelector('.nh-status span:first-child');if(status)status.textContent=`${14+tools.length} TOOLS`;return true}
function installMenu(){const sections=[...document.querySelectorAll('.ngm-section')];const section=sections.find(s=>s.querySelector('.ngm-section-label')?.textContent.includes('ライブラリ'));const list=section?.querySelector('.ngm-card-list');if(!list)return false;for(const t of tools){if(list.querySelector(`[data-advanced-theory="${t.key}"]`))continue;const current=location.pathname.endsWith('/'+t.href.split('/').pop());const a=document.createElement('a');a.className='ngm-link'+(current?' current':'');a.href=t.href;a.dataset.advancedTheory=t.key;if(current)a.setAttribute('aria-current','page');a.innerHTML=`<span class="ngm-icon">${t.icon}</span><span>${t.menu}</span><span class="ngm-chevron">›</span>`;list.appendChild(a)}return true}
function startHome(){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',installHome,{once:true});else installHome()}
window.NEETAdvancedTheoryLinks={installHome,installMenu};startHome();
})();