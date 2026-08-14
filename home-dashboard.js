(()=>{
'use strict';
const ROOT='https://akito0802.github.io/NEET-note/';
const NEETON=ROOT+'neeton.svg?v=4';
const CURRENT_HOME_ID='neetCurrentHomeDashboard';
const items=[
 [ROOT+'?mode=note','▤','ノート'],[ROOT+'lyrics.html','♬','歌詞メモ'],[ROOT+'voice-memo.html','♩','ボイスメモ','（録音）'],[ROOT+'ideas.html','♧','アイデアメモ'],
 [ROOT+'tools.html','⌘','制作ツール'],[ROOT+'calendar.html','▣','制作カレンダー'],[ROOT+'melody.html','♪','メロディ入力'],[ROOT+'theory-assist.html','✣','理論アシスト'],
 [ROOT+'theory-library.html','▥','統合理論','ライブラリ'],['https://akito0802.github.io/Cordhyo-/','♮','コード辞典'],['https://akito0802.github.io/scale/','♯','スケール辞典'],['https://akito0802.github.io/-h/','♯','指板']
];
function install(){
 const list=document.getElementById('listView'); if(!list||document.getElementById(CURRENT_HOME_ID))return;
 const params=new URLSearchParams(location.search); if(params.get('mode')==='note'||params.has('song'))return;
 // common-ui.js が作る旧トップは使わず、現在のカード型トップを唯一のTOP画面にする。
 document.getElementById('homeDashboard')?.remove();
 document.getElementById('neetHomeDashboard')?.remove();
 document.body.classList.add('neet-home-mode');
 const dashboard=document.createElement('section'); dashboard.id=CURRENT_HOME_ID;
 dashboard.innerHTML=`<div class="nh-card">
  <header class="nh-brand"><div><b>NEETNOTE</b><span>音楽と、いつまでも。</span></div><img src="${NEETON}" alt="ニートン"></header>
  <section class="nh-account"><div class="nh-avatar"><img src="${NEETON}" alt="ニートン"><i></i></div><div class="nh-account-copy"><b id="nhName">ニートン</b><span id="nhMail">未ログイン</span><small id="nhState">この端末に保存中</small></div><span class="nh-chevron">›</span></section>
  <button class="nh-sync" id="nhSync" type="button"><span>♧</span> ログイン・同期</button>
  <nav class="nh-grid">${items.map(([href,icon,label,sub])=>`<a href="${href}" class="nh-tile"><span class="nh-icon">${icon}</span><b>${label}</b>${sub?`<small>${sub}</small>`:''}</a>`).join('')}</nav>
  <a class="nh-wide" href="${ROOT}neeton-home.html"><span class="nh-house">⌂</span><b>ニートンのおうち</b></a>
  <button class="nh-wide nh-theme" id="nhTheme" type="button"><span>☾</span><b>ダークモード</b><i></i></button>
  <button class="nh-wide" id="nhHelp" type="button"><span>?</span><b>ヘルプ・使い方</b><em>›</em></button>
 </div>`;
 list.prepend(dashboard);
 const style=document.createElement('style');style.id='neet-home-approved-style';style.textContent=`
 body.neet-home-mode{background:#f3eadc!important}.neet-home-mode .app-header{display:none!important}.neet-home-mode #listView>.toolbar,.neet-home-mode #emptyState,.neet-home-mode #songList,.neet-home-mode #homeDashboard{display:none!important}.neet-home-mode .app-shell{width:100%;max-width:none;padding:0!important}.neet-home-mode main{width:100%;max-width:none!important;padding:0!important}
 #${CURRENT_HOME_ID}{width:100%;padding:max(18px,env(safe-area-inset-top)) 12px calc(26px + env(safe-area-inset-bottom));font-family:-apple-system,BlinkMacSystemFont,"Hiragino Sans","Yu Gothic",sans-serif;color:#3d2b1e}
 .nh-card{width:min(100%,540px);margin:0 auto;padding:18px;border:1px solid #dfcdb5;border-radius:24px;background:linear-gradient(180deg,#fffaf1 0%,#fcf5ea 100%);box-shadow:0 12px 36px rgba(94,65,34,.12)}
 .nh-brand{display:grid;grid-template-columns:1fr 64px;align-items:center;padding:2px 8px 14px;border-bottom:1px solid #eadccb;text-align:center}.nh-brand div{padding-left:64px}.nh-brand b{display:block;font-size:1.12rem;letter-spacing:.12em}.nh-brand span{display:block;margin-top:5px;font-size:.78rem;font-weight:700}.nh-brand img{width:62px;height:62px;object-fit:contain}
 .nh-account{display:grid;grid-template-columns:52px 1fr 24px;align-items:center;gap:11px;margin-top:14px;padding:12px 13px;border:1px solid #e3d3bf;border-radius:15px;background:#fffdf8;box-shadow:0 4px 13px rgba(80,52,27,.06)}.nh-avatar{position:relative;display:grid;place-items:center;width:50px;height:50px;border:1px solid #dec8aa;border-radius:50%;background:#f8efe3}.nh-avatar img{width:43px;height:43px}.nh-avatar i{position:absolute;right:0;bottom:2px;width:12px;height:12px;border:2px solid #fff;border-radius:50%;background:#b8aa96}.nh-avatar i.on{background:#70bd59}.nh-account-copy b,.nh-account-copy span,.nh-account-copy small{display:block}.nh-account-copy b{font-size:.92rem}.nh-account-copy span{margin-top:2px;font-size:.69rem;color:#6f5d4d}.nh-account-copy small{margin-top:3px;font-size:.66rem;font-weight:750;color:#806a56}.nh-chevron{font-size:1.5rem;color:#6f4b2b}
 .nh-sync{width:100%;min-height:50px;margin:11px 0;border:1px solid #dfcdb7;border-radius:13px;background:#fffaf3;color:#4b3422;font:inherit;font-size:.86rem;font-weight:900;box-shadow:0 3px 10px rgba(79,51,25,.05)}.nh-sync span{font-size:1.1rem;color:#8b623d}
 .nh-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px}.nh-tile{display:flex;flex-direction:column;align-items:center;justify-content:center;min-width:0;min-height:105px;padding:10px 4px;border:1px solid #e3d2bd;border-radius:13px;background:#fffdf8;color:#4a3322;text-align:center;text-decoration:none;box-shadow:0 3px 10px rgba(82,53,28,.055);transition:transform .12s ease,background .12s ease}.nh-tile:active{transform:scale(.97);background:#f6eadb}.nh-icon{display:grid;place-items:center;height:35px;margin-bottom:7px;color:#8c6039;font-family:Georgia,serif;font-size:1.65rem;line-height:1}.nh-tile b{font-size:.69rem;line-height:1.3}.nh-tile small{margin-top:1px;font-size:.59rem;font-weight:750}
 .nh-wide{display:grid;grid-template-columns:38px 1fr 28px;align-items:center;gap:9px;min-height:58px;margin-top:11px;padding:8px 13px;border:1px solid #e0cfba;border-radius:13px;background:#fffdf8;color:#493321;text-decoration:none;box-shadow:0 3px 10px rgba(82,53,28,.05);font:inherit;text-align:left;width:100%}.nh-wide>span{display:grid;place-items:center;width:34px;height:34px;color:#7f5735;font-size:1.55rem}.nh-wide b{font-size:.84rem}.nh-wide em{justify-self:end;font-style:normal;font-size:1.35rem}.nh-theme i{justify-self:end;width:48px;height:27px;padding:3px;border-radius:999px;background:#b49a78}.nh-theme i:after{content:'';display:block;width:21px;height:21px;border-radius:50%;background:white;transition:.2s}.nh-theme.on i{background:#765536}.nh-theme.on i:after{transform:translateX(21px)}
 html[data-theme="dark"] body.neet-home-mode{background:#241f1a!important}html[data-theme="dark"] .nh-card{background:#2c251f;border-color:#514438;color:#f6ecdf}html[data-theme="dark"] .nh-brand{border-color:#514438}html[data-theme="dark"] .nh-account,html[data-theme="dark"] .nh-sync,html[data-theme="dark"] .nh-tile,html[data-theme="dark"] .nh-wide{background:#332b24;border-color:#514438;color:#f6ecdf}html[data-theme="dark"] .nh-account-copy span,html[data-theme="dark"] .nh-account-copy small{color:#cdbca8}
 @media(max-width:430px){#${CURRENT_HOME_ID}{padding-left:8px;padding-right:8px}.nh-card{padding:14px 11px;border-radius:19px}.nh-brand{grid-template-columns:1fr 54px}.nh-brand div{padding-left:54px}.nh-brand img{width:52px;height:52px}.nh-grid{gap:6px}.nh-tile{min-height:91px;padding:8px 2px}.nh-icon{height:30px;margin-bottom:5px;font-size:1.42rem}.nh-tile b{font-size:.62rem}.nh-tile small{font-size:.53rem}.nh-wide{min-height:54px;margin-top:8px}.nh-account{margin-top:10px}}
 `;document.head.appendChild(style);
 const theme=document.getElementById('nhTheme');const apply=t=>{document.documentElement.dataset.theme=t;theme.classList.toggle('on',t==='dark')};apply(localStorage.getItem('neet-note-theme')==='dark'?'dark':'light');theme.onclick=()=>{const t=document.documentElement.dataset.theme==='dark'?'light':'dark';localStorage.setItem('neet-note-theme',t);apply(t)};
 document.getElementById('nhHelp').onclick=()=>alert('上のカードからNEETNOTEの各機能へ移動できるよ。');
 const syncButton=document.getElementById('nhSync');
 syncButton.onclick=()=>{const btn=document.querySelector('.ngm-btn,.n4-trigger');if(btn)btn.click();else alert('ハンバーガーメニューの「ログイン・同期」から設定できるよ。')};

 // TOP画面のアカウント表示は、ハンバーガーメニューのFirebase認証状態を唯一の正として同期する。
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
 };
 let authBindTries=0;
 const bindGlobalAuth=()=>{
  const accountCard=document.querySelector('.ngm-account-card');
  if(!accountCard){if(authBindTries++<60)setTimeout(bindGlobalAuth,250);return;}
  syncAccountFromGlobalMenu();
  new MutationObserver(syncAccountFromGlobalMenu).observe(accountCard,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class']});
 };
 bindGlobalAuth();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();