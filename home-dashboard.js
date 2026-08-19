(()=>{
'use strict';
const ROOT='https://akito0802.github.io/NEET-note/';
const NEETON=ROOT+'neeton.svg?v=4';
const CURRENT_HOME_ID='neetCurrentHomeDashboard';

const productionItems=[
 [ROOT+'?mode=note','▤','ノート','曲のアイデアと構成を整理'],
 [ROOT+'lyrics.html','♬','歌詞メモ','フレーズや歌詞をストック'],
 [ROOT+'voice-memo.html','♩','ボイスメモ','思いついた音をその場で録音'],
 [ROOT+'ideas.html','♧','アイデアメモ','制作のひらめきをすぐ残す'],
 [ROOT+'tools.html','⌘','制作ツール','制作を支える便利機能'],
 [ROOT+'calendar.html','▣','制作カレンダー','予定と制作記録をまとめる'],
 [ROOT+'melody.html','♪','メロディ入力','旋律を形にして確認する'],
 [ROOT+'theory-assist.html','✣','理論アシスト','理論から制作をサポート']
];
const theoryItems=[
 [ROOT+'theory-library.html','▥','統合理論ライブラリ','音楽理論を体系的に学ぶ'],
 ['https://akito0802.github.io/Cordhyo-/','♮','コード辞典','コードの構成とフォームを確認'],
 ['https://akito0802.github.io/scale/','♯','スケール辞典','スケールの構成音を調べる'],
 ['https://akito0802.github.io/-h/','♯','指板','指板上の音を視覚的に確認'],
 [ROOT+'circle-of-fifths.html','◉','五度圏','調・近親調・ダイアトニックを可視化'],
 [ROOT+'major-to-minor-lab.html','⇄','長調→短調','コードとメロディを同主短調へ変換']
];
const tiles=items=>items.map(([href,icon,label,desc])=>`<a href="${href}" class="nh-tile"><span class="nh-icon">${icon}</span><span class="nh-tile-copy"><b>${label}</b><small>${desc}</small></span></a>`).join('');

function install(){
 const list=document.getElementById('listView');
 if(!list||document.getElementById(CURRENT_HOME_ID))return;
 const params=new URLSearchParams(location.search);
 if(params.get('mode')==='note'||params.has('song'))return;

 document.getElementById('homeDashboard')?.remove();
 document.getElementById('neetHomeDashboard')?.remove();
 document.body.classList.add('neet-home-mode');

 const dashboard=document.createElement('section');
 dashboard.id=CURRENT_HOME_ID;
 dashboard.innerHTML=`<div class="nh-card">
  <header class="nh-brand"><div><b>NEETNOTE</b><span>音楽と、いつまでも。</span></div><img src="${NEETON}" alt="ニートン"></header>
  <section class="nh-account"><div class="nh-avatar"><img src="${NEETON}" alt="ニートン"><i></i></div><div class="nh-account-copy"><b id="nhName">ニートン</b><span id="nhMail">未ログイン</span><small id="nhState">この端末に保存中</small></div><span class="nh-chevron">›</span></section>
  <button class="nh-sync" id="nhSync" type="button"><span>♧</span> ログイン・同期</button>
  <main class="nh-workspace">
   <div class="nh-pc-intro"><div><span class="nh-kicker">WORKSPACE</span><h1>音楽制作ホーム</h1><p>作る・残す・学ぶを、ここから。</p></div><div class="nh-status"><span>14 TOOLS</span><span id="nhPcState">LOCAL</span></div></div>
   <section class="nh-tool-group"><div class="nh-group-head"><div><span>CREATE</span><h2>制作・記録</h2></div><small>8 tools</small></div><nav class="nh-grid nh-grid-create">${tiles(productionItems)}</nav></section>
   <section class="nh-tool-group nh-tool-group-theory"><div class="nh-group-head"><div><span>LEARN</span><h2>理論・学習</h2></div><small>6 tools</small></div><nav class="nh-grid nh-grid-theory">${tiles(theoryItems)}</nav></section>
  </main>
  <a class="nh-wide nh-home" href="${ROOT}neeton-home.html"><span class="nh-house">⌂</span><b>ニートンのおうち</b></a>
  <button class="nh-wide nh-theme" id="nhTheme" type="button"><span>☾</span><b>ダークモード</b><i></i></button>
  <button class="nh-wide nh-help" id="nhHelp" type="button"><span>?</span><b>ヘルプ・使い方</b><em>›</em></button>
 </div>`;
 list.prepend(dashboard);

 const style=document.createElement('style');
 style.id='neet-home-approved-style';
 style.textContent=`
 body.neet-home-mode{background:#f3eadc!important}.neet-home-mode .app-header{display:none!important}.neet-home-mode #listView>.toolbar,.neet-home-mode #emptyState,.neet-home-mode #songList,.neet-home-mode #homeDashboard{display:none!important}.neet-home-mode .app-shell{width:100%;max-width:none;padding:0!important}.neet-home-mode main{width:100%;max-width:none!important;padding:0!important}
 #${CURRENT_HOME_ID}{width:100%;padding:max(18px,env(safe-area-inset-top)) 12px calc(26px + env(safe-area-inset-bottom));font-family:-apple-system,BlinkMacSystemFont,"Hiragino Sans","Yu Gothic",sans-serif;color:#3d2b1e}
 .nh-card{width:min(100%,540px);margin:0 auto;padding:18px;border:1px solid #dfcdb5;border-radius:24px;background:linear-gradient(180deg,#fffaf1 0%,#fcf5ea 100%);box-shadow:0 12px 36px rgba(94,65,34,.12)}
 .nh-brand{display:grid;grid-template-columns:1fr 64px;align-items:center;padding:2px 8px 14px;border-bottom:1px solid #eadccb;text-align:center}.nh-brand div{padding-left:64px}.nh-brand b{display:block;font-size:1.12rem;letter-spacing:.12em}.nh-brand span{display:block;margin-top:5px;font-size:.78rem;font-weight:700}.nh-brand img{width:62px;height:62px;object-fit:contain}
 .nh-account{display:grid;grid-template-columns:52px 1fr 24px;align-items:center;gap:11px;margin-top:14px;padding:12px 13px;border:1px solid #e3d3bf;border-radius:15px;background:#fffdf8;box-shadow:0 4px 13px rgba(80,52,27,.06)}.nh-avatar{position:relative;display:grid;place-items:center;width:50px;height:50px;border:1px solid #dec8aa;border-radius:50%;background:#f8efe3}.nh-avatar img{width:43px;height:43px}.nh-avatar i{position:absolute;right:0;bottom:2px;width:12px;height:12px;border:2px solid #fff;border-radius:50%;background:#b8aa96}.nh-avatar i.on{background:#70bd59}.nh-account-copy b,.nh-account-copy span,.nh-account-copy small{display:block}.nh-account-copy b{font-size:.92rem}.nh-account-copy span{margin-top:2px;font-size:.69rem;color:#6f5d4d}.nh-account-copy small{margin-top:3px;font-size:.66rem;font-weight:750;color:#806a56}.nh-chevron{font-size:1.5rem;color:#6f4b2b}
 .nh-sync{width:100%;min-height:50px;margin:11px 0;border:1px solid #dfcdb7;border-radius:13px;background:#fffaf3;color:#4b3422;font:inherit;font-size:.86rem;font-weight:900;box-shadow:0 3px 10px rgba(79,51,25,.05)}.nh-sync span{font-size:1.1rem;color:#8b623d}
 .nh-workspace{width:100%;max-width:none!important;padding:0!important}.nh-pc-intro,.nh-group-head{display:none}.nh-tool-group{margin:0;padding:0}.nh-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px}.nh-tool-group-theory{margin-top:9px}.nh-tile{display:flex;flex-direction:column;align-items:center;justify-content:center;min-width:0;min-height:105px;padding:10px 4px;border:1px solid #e3d2bd;border-radius:13px;background:#fffdf8;color:#4a3322;text-align:center;text-decoration:none;box-shadow:0 3px 10px rgba(82,53,28,.055);transition:transform .12s ease,background .12s ease,box-shadow .12s ease,border-color .12s ease}.nh-tile:active{transform:scale(.97);background:#f6eadb}.nh-icon{display:grid;place-items:center;height:35px;margin-bottom:7px;color:#8c6039;font-family:Georgia,serif;font-size:1.65rem;line-height:1}.nh-tile-copy b{display:block;font-size:.69rem;line-height:1.3}.nh-tile-copy small{display:none}
 .nh-wide{display:grid;grid-template-columns:38px 1fr 28px;align-items:center;gap:9px;min-height:58px;margin-top:11px;padding:8px 13px;border:1px solid #e0cfba;border-radius:13px;background:#fffdf8;color:#493321;text-decoration:none;box-shadow:0 3px 10px rgba(82,53,28,.05);font:inherit;text-align:left;width:100%}.nh-wide>span{display:grid;place-items:center;width:34px;height:34px;color:#7f5735;font-size:1.55rem}.nh-wide b{font-size:.84rem}.nh-wide em{justify-self:end;font-style:normal;font-size:1.35rem}.nh-theme i{justify-self:end;width:48px;height:27px;padding:3px;border-radius:999px;background:#b49a78}.nh-theme i:after{content:'';display:block;width:21px;height:21px;border-radius:50%;background:white;transition:.2s}.nh-theme.on i{background:#765536}.nh-theme.on i:after{transform:translateX(21px)}

 /* Dark mode: gold outlines for clearer separation. */
 html[data-theme="dark"] body.neet-home-mode{background:#241f1a!important}
 html[data-theme="dark"] .nh-card{background:#2c251f;border:1px solid #9f753d;color:#f6ecdf;box-shadow:0 14px 42px rgba(0,0,0,.28),0 0 0 1px rgba(218,173,94,.06)}
 html[data-theme="dark"] .nh-brand{border-color:#9a713b}
 html[data-theme="dark"] .nh-account,
 html[data-theme="dark"] .nh-sync,
 html[data-theme="dark"] .nh-tile,
 html[data-theme="dark"] .nh-wide{background:#332b24;border-color:#a67a3f;color:#f6ecdf;box-shadow:0 4px 14px rgba(0,0,0,.17)}
 html[data-theme="dark"] .nh-avatar{border-color:#a67a3f;background:#2f2822}
 html[data-theme="dark"] .nh-icon{color:#e0b668}
 html[data-theme="dark"] .nh-wide>span,
 html[data-theme="dark"] .nh-sync span,
 html[data-theme="dark"] .nh-chevron{color:#e0b668}
 html[data-theme="dark"] .nh-account-copy span,
 html[data-theme="dark"] .nh-account-copy small,
 html[data-theme="dark"] .nh-tile-copy small,
 html[data-theme="dark"] .nh-pc-intro p{color:#d6c2a6}
 html[data-theme="dark"] .nh-theme i{border:1px solid #b88945;background:#72532e}
 html[data-theme="dark"] .nh-theme.on i{background:#a7793d}
 html[data-theme="dark"] .nh-tile:hover,
 html[data-theme="dark"] .nh-sync:hover,
 html[data-theme="dark"] .nh-wide:hover{border-color:#d8ab5c!important;background:#3b3026!important;box-shadow:0 8px 22px rgba(0,0,0,.22),0 0 0 1px rgba(216,171,92,.16)!important}

 @media(max-width:430px){#${CURRENT_HOME_ID}{padding-left:8px;padding-right:8px}.nh-card{padding:14px 11px;border-radius:19px}.nh-brand{grid-template-columns:1fr 54px}.nh-brand div{padding-left:54px}.nh-brand img{width:52px;height:52px}.nh-grid{gap:6px}.nh-tool-group-theory{margin-top:6px}.nh-tile{min-height:91px;padding:8px 2px}.nh-icon{height:30px;margin-bottom:5px;font-size:1.42rem}.nh-tile-copy b{font-size:.62rem}.nh-wide{min-height:54px;margin-top:8px}.nh-account{margin-top:10px}}

 @media(min-width:760px){
  body.neet-home-mode{background:radial-gradient(circle at 8% 0%,#fff7ea 0,rgba(255,247,234,.55) 17%,transparent 42%),#efe3d2!important}
  #${CURRENT_HOME_ID}{padding:30px 26px 48px}
  .nh-card{width:min(1220px,calc(100vw - 52px));max-width:none;display:grid;grid-template-columns:250px minmax(0,1fr);grid-template-areas:"brand workspace" "account workspace" "sync workspace" "home workspace" "theme workspace" "help workspace" ". workspace";grid-template-rows:auto auto auto auto auto auto 1fr;gap:10px 24px;padding:20px;border:0;border-radius:30px;background:rgba(255,250,242,.76);box-shadow:0 22px 70px rgba(86,57,27,.13);backdrop-filter:blur(14px)}
  .nh-brand{grid-area:brand;min-height:88px;grid-template-columns:1fr 62px;padding:4px 6px 16px;text-align:left}.nh-brand div{padding-left:0}.nh-brand b{font-size:1.3rem;letter-spacing:.15em}.nh-brand span{font-size:.77rem;color:#725b46}.nh-brand img{width:60px;height:60px;justify-self:end}
  .nh-account{grid-area:account;margin-top:4px;min-height:96px;grid-template-columns:58px 1fr 18px;gap:11px;padding:14px;border-radius:18px}.nh-avatar{width:54px;height:54px}.nh-avatar img{width:47px;height:47px}.nh-account-copy b{font-size:.96rem}.nh-account-copy span{font-size:.72rem}.nh-account-copy small{font-size:.67rem}
  .nh-sync{grid-area:sync;margin:0;min-height:54px;border-radius:15px;font-size:.86rem;cursor:pointer;transition:.15s}.nh-sync:hover{transform:translateY(-1px);border-color:#cda97d;background:#fff7ec}
  .nh-home{grid-area:home}.nh-theme{grid-area:theme}.nh-help{grid-area:help}.nh-wide{min-height:54px;margin-top:0;padding:9px 12px;border-radius:15px;cursor:pointer;transition:.15s}.nh-wide:hover{transform:translateY(-1px);border-color:#cda97d;background:#fff7ec}.nh-wide b{font-size:.83rem}
  .nh-workspace{grid-area:workspace;min-width:0;padding:5px 4px 6px!important}
  .nh-pc-intro{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;padding:2px 4px 20px;border-bottom:1px solid #ead7bf}.nh-kicker{display:block;margin-bottom:7px;color:#9a6b3f;font-size:.64rem;font-weight:900;letter-spacing:.24em}.nh-pc-intro h1{margin:0;color:#3f2a1b;font-family:Georgia,"Yu Mincho",serif;font-size:clamp(1.5rem,2.2vw,2rem);font-weight:700;letter-spacing:.02em}.nh-pc-intro p{margin:7px 0 0;color:#75604d;font-size:.78rem;font-weight:650}.nh-status{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.nh-status span{display:inline-flex;align-items:center;min-height:29px;padding:0 10px;border:1px solid #dec7a9;border-radius:999px;background:#fffaf3;color:#795a3a;font-size:.62rem;font-weight:900;letter-spacing:.08em}
  .nh-tool-group{margin-top:22px}.nh-tool-group-theory{margin-top:26px}.nh-group-head{display:flex;align-items:flex-end;justify-content:space-between;margin:0 3px 10px}.nh-group-head>div>span{display:block;margin-bottom:3px;color:#a17a54;font-size:.57rem;font-weight:900;letter-spacing:.2em}.nh-group-head h2{margin:0;color:#4a3321;font-size:.92rem;letter-spacing:.04em}.nh-group-head>small{color:#9a8168;font-size:.62rem;font-weight:800}
  .nh-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.nh-tile{display:grid;grid-template-columns:46px minmax(0,1fr);align-items:center;justify-content:stretch;min-height:86px;padding:13px 14px;border-radius:17px;text-align:left}.nh-icon{width:42px;height:42px;margin:0;border:1px solid #ead5ba;border-radius:12px;background:#fff8ed;font-size:1.4rem}.nh-tile-copy{min-width:0}.nh-tile-copy b{font-size:.8rem;line-height:1.3}.nh-tile-copy small{display:block;margin-top:5px;color:#806b57;font-size:.61rem;font-weight:650;line-height:1.35}.nh-tile:hover{transform:translateY(-3px);border-color:#d3b48e;background:#fffaf3;box-shadow:0 13px 28px rgba(82,53,28,.09)}

  html[data-theme="dark"] body.neet-home-mode{background:radial-gradient(circle at 8% 0%,rgba(173,125,58,.13),transparent 34%),#211c17!important}
  html[data-theme="dark"] .nh-card{background:rgba(44,37,31,.94);border:1px solid #9f753d}
  html[data-theme="dark"] .nh-pc-intro{border-color:#9a713b}
  html[data-theme="dark"] .nh-pc-intro h1,html[data-theme="dark"] .nh-group-head h2{color:#f8ead3}
  html[data-theme="dark"] .nh-status span{background:#2f2822;border-color:#ad8042;color:#e6c37d}
  html[data-theme="dark"] .nh-icon{background:#2f2822;border-color:#ad8042;color:#e6c37d}
  html[data-theme="dark"] .nh-group-head>div>span,html[data-theme="dark"] .nh-kicker{color:#d1a45b}
  html[data-theme="dark"] .nh-group-head>small{color:#c5a879}
 }

 @media(min-width:1040px){.nh-card{grid-template-columns:275px minmax(0,1fr);gap:12px 30px;padding:24px}.nh-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.nh-tile{min-height:94px}.nh-workspace{padding:7px 7px 8px!important}}
 @media(min-width:1320px){#${CURRENT_HOME_ID}{padding-top:36px}.nh-card{width:1280px;grid-template-columns:290px minmax(0,1fr);gap:12px 34px;padding:28px}.nh-grid-create{grid-template-columns:repeat(4,minmax(0,1fr))}.nh-grid-theory{grid-template-columns:repeat(4,minmax(0,1fr))}.nh-tile{min-height:104px;padding:15px}.nh-pc-intro{padding-bottom:23px}.nh-tool-group{margin-top:24px}}
 `;
 document.head.appendChild(style);

 const theme=document.getElementById('nhTheme');
 const apply=t=>{document.documentElement.dataset.theme=t;theme.classList.toggle('on',t==='dark')};
 apply(localStorage.getItem('neet-note-theme')==='dark'?'dark':'light');
 theme.onclick=()=>{
  const t=document.documentElement.dataset.theme==='dark'?'light':'dark';
  localStorage.setItem('neet-note-theme',t);
  apply(t)
 };

 document.getElementById('nhHelp').onclick=()=>alert('上のカードからNEETNOTEの各機能へ移動できるよ。');
 const syncButton=document.getElementById('nhSync');
 syncButton.onclick=()=>{
  const btn=document.querySelector('.ngm-btn,.n4-trigger');
  if(btn)btn.click();
  else alert('ハンバーガーメニューの「ログイン・同期」から設定できるよ。')
 };

 const syncAccountFromGlobalMenu=()=>{
  const menuName=document.getElementById('ngmMenuAccountName');
  const menuMail=document.getElementById('ngmMenuAccountMail');
  const menuState=document.getElementById('ngmMenuSyncState');
  const menuDot=document.getElementById('ngmMenuDot');
  const cloudLabel=document.getElementById('ngmCloudLabel');
  if(!menuMail)return;
  const loggedIn=menuDot?.classList.contains('on')||menuMail.textContent.trim()!=='未ログイン';
  document.getElementById('nhName').textContent=loggedIn?(menuName?.textContent.trim()||'NEETNOTEユーザー'):'ニートン';
  document.getElementById('nhMail').textContent=loggedIn?(menuMail.textContent.trim()||'Googleアカウント'):'未ログイン';
  document.getElementById('nhState').textContent=loggedIn?(menuState?.textContent.trim()||'ログイン済み'):'この端末に保存中';
  document.querySelector('.nh-avatar i')?.classList.toggle('on',loggedIn);
  syncButton.innerHTML=loggedIn?`<span>☁️</span> ${cloudLabel?.textContent.trim()||'ログイン済み・同期'}`:'<span>♧</span> ログイン・同期';
  const pcState=document.getElementById('nhPcState');
  if(pcState)pcState.textContent=loggedIn?'SYNCED':'LOCAL';
 };

 let authBindTries=0;
 const bindGlobalAuth=()=>{
  const accountCard=document.querySelector('.ngm-account-card');
  if(!accountCard){
   if(authBindTries++<60)setTimeout(bindGlobalAuth,250);
   return;
  }
  syncAccountFromGlobalMenu();
  new MutationObserver(syncAccountFromGlobalMenu).observe(accountCard,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class']});
 };
 bindGlobalAuth();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);
else install();
})();
