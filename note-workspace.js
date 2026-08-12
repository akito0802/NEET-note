(()=>{
'use strict';
const params=new URLSearchParams(location.search);
if(params.get('mode')!=='note'&&!params.has('song'))return;
if(window.__NEET_NOTE_WORKSPACE__)return;window.__NEET_NOTE_WORKSPACE__=true;

// トップ用UIが残っていたら完全に外す
for(const el of document.querySelectorAll('.neet-home,#neetHomeDashboard'))el.remove();
document.body.classList.remove('neet-home-mode');
const shell=document.querySelector('.app-shell');if(shell)shell.style.display='block';

const header=document.querySelector('.app-header');
if(header){
 const brand=header.querySelector('.header-brand');
 const title=brand?.querySelector('h1');
 const eyebrow=brand?.querySelector('.eyebrow');
 if(title)title.textContent='曲ノート';
 if(eyebrow)eyebrow.textContent='SONG WORKSPACE';
 if(!header.querySelector('.note-home-link')){
  const home=document.createElement('a');home.className='note-home-link';home.href='./';home.textContent='⌂ ホーム';
  header.insertBefore(home,header.lastElementChild);
 }
}

const list=document.getElementById('listView');
if(list&&!document.getElementById('noteWorkspaceIntro')){
 const intro=document.createElement('section');intro.id='noteWorkspaceIntro';intro.innerHTML=`<div><small>YOUR SONGS</small><h2>曲を作る・整理する</h2><p>ここは曲ノート専用。ホームの機能一覧は置かず、作品だけに集中できる画面にしたよ。</p></div><span id="noteSongCount"></span>`;
 list.prepend(intro);
 const refresh=()=>{let a=[];try{a=JSON.parse(localStorage.getItem('song-note-songs-v1')||'[]');if(!Array.isArray(a))a=[]}catch{}const c=document.getElementById('noteSongCount');if(c)c.textContent=`${a.length} 曲`;};refresh();window.addEventListener('storage',refresh);
}

const style=document.createElement('style');style.id='note-workspace-style';style.textContent=`
body:not(.neet-home-mode){background:#f3eadc!important;color:#33271d}.app-shell{width:min(100%,980px);padding-top:20px}.app-header{align-items:center;margin-bottom:14px;padding:0 2px}.header-brand{padding-left:54px}.app-header h1{font-family:-apple-system,BlinkMacSystemFont,"Hiragino Sans","Yu Gothic",sans-serif!important;font-size:1.45rem!important;letter-spacing:-.03em}.app-header .eyebrow{color:#8c6b48;font-size:.62rem;letter-spacing:.14em}.note-home-link{margin-left:auto;padding:9px 12px;border:1px solid #ddccb6;border-radius:12px;background:#fffaf2;color:#694a2d;text-decoration:none;font-size:.76rem;font-weight:850}.app-header .primary-button{background:#946431!important;box-shadow:none!important;border-radius:12px!important;padding:10px 13px!important;font-size:.8rem}
#noteWorkspaceIntro{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin:0 0 12px;padding:17px 18px;border:1px solid #e0ceb7;border-radius:18px;background:linear-gradient(135deg,#fffaf2,#f9efe1);box-shadow:0 7px 20px rgba(83,58,30,.06)}#noteWorkspaceIntro small{color:#8b6845;font-size:.61rem;font-weight:900;letter-spacing:.13em}#noteWorkspaceIntro h2{margin:3px 0 4px;font-size:1.16rem}#noteWorkspaceIntro p{margin:0;color:#796a5a;font-size:.76rem;line-height:1.6}#noteSongCount{flex:none;padding:7px 10px;border-radius:999px;background:#eee0cd;color:#6c4a2a;font-size:.72rem;font-weight:900}
.toolbar{margin-bottom:12px}.search-box{padding:11px 13px;border:1px solid #dfcdb7;border-radius:13px;background:#fffaf3}.search-box input{color:#3c2c20}.song-grid{gap:10px}.song-card{min-height:128px;padding:15px 16px!important;border:1px solid #e0ceb9!important;border-radius:15px!important;background:#fffdf8!important;box-shadow:0 5px 16px rgba(78,52,27,.055)!important}.song-card:hover,.song-card:focus{transform:none!important;box-shadow:0 8px 20px rgba(78,52,27,.09)!important}.song-title{font-size:1rem}.song-meta{font-size:.76rem}.song-preview{margin-top:13px;font-size:.82rem;line-height:1.65}.song-date{font-size:.66rem}.song-delete-button{border:0;border-radius:9px;background:#f7eee4;color:#9a5944;padding:6px 8px;font-size:.67rem;font-weight:800}.empty-state{border-color:#e0ceb9;background:#fffaf3;box-shadow:none}.editor-topbar{position:sticky;top:8px;z-index:20;padding:8px;border:1px solid #e0ceb9;border-radius:14px;background:rgba(255,250,242,.94);backdrop-filter:blur(12px)}.editor-card{padding:20px!important;border:1px solid #e0ceb9!important;border-radius:18px!important;background:#fffdf8!important;box-shadow:0 7px 24px rgba(78,52,27,.07)!important}.field>span{color:#5a422f}.field input,.field textarea,.field select{background:#fffaf3!important;border-color:#e4d5c2!important}.field input:focus,.field textarea:focus,.field select:focus{border-color:#a6794d!important;box-shadow:0 0 0 3px rgba(166,121,77,.12)!important}
html[data-theme="dark"] body:not(.neet-home-mode){background:#211d19!important;color:#f6eee3}html[data-theme="dark"] #noteWorkspaceIntro,html[data-theme="dark"] .search-box,html[data-theme="dark"] .song-card,html[data-theme="dark"] .empty-state,html[data-theme="dark"] .editor-card,html[data-theme="dark"] .editor-topbar{background:#302922!important;border-color:#514438!important;color:#f6eee3}html[data-theme="dark"] .note-home-link{background:#302922;border-color:#514438;color:#f6eee3}
@media(max-width:650px){.app-shell{padding:14px 8px 40px}.app-header{gap:7px}.header-brand{padding-left:48px}.app-header h1{font-size:1.18rem!important}.app-header .eyebrow{display:none}.note-home-link{padding:8px 9px;font-size:.69rem}.app-header .primary-button{padding:9px 10px!important;font-size:.72rem}#noteWorkspaceIntro{padding:14px;margin-top:4px}#noteWorkspaceIntro p{font-size:.7rem}.song-grid{grid-template-columns:1fr}.song-card{min-height:112px}.editor-card{padding:14px!important}.editor-topbar{top:5px}}
`;
document.head.appendChild(style);
})();