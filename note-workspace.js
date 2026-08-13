(()=>{
'use strict';
const params=new URLSearchParams(location.search);
if(params.get('mode')!=='note'&&!params.has('song'))return;
if(window.__NEET_NOTE_WORKSPACE__)return;window.__NEET_NOTE_WORKSPACE__=true;

function stripHomeOnly(){
 document.querySelectorAll('#noteWorkspaceIntro,.neet-home,#neetHomeDashboard,.neet-final-home').forEach(el=>el.remove());
 const list=document.getElementById('listView');
 if(list){
  [...list.children].forEach(el=>{
   const t=(el.textContent||'').replace(/\s+/g,' ').trim();
   if(t.includes('QUICK ACCESS')||t.includes('思いついた音を、すぐ形に。')||t.includes('作曲・歌詞・録音・アイデアを、それぞれ使いやすい場所に保存しよう。')) el.remove();
  });
 }
}
stripHomeOnly();
const listForWatch=document.getElementById('listView');
if(listForWatch)new MutationObserver(stripHomeOnly).observe(listForWatch,{childList:true,subtree:false});
document.body.classList.remove('neet-home-mode');
const shell=document.querySelector('.app-shell');if(shell){shell.style.display='block';shell.style.visibility='visible';shell.style.opacity='1'}

const header=document.querySelector('.app-header');
if(header){
 const brand=header.querySelector('.header-brand');
 const title=brand?.querySelector('h1');
 const eyebrow=brand?.querySelector('.eyebrow');
 if(title)title.textContent='NEET NOTE';
 if(eyebrow)eyebrow.textContent='COMPOSITION NOTE';
 if(!header.querySelector('.note-home-link')){
  const home=document.createElement('a');home.className='note-home-link';home.href='./';home.textContent='← ホーム';
  header.insertBefore(home,header.lastElementChild);
 }
}

const list=document.getElementById('listView');
const editor=document.getElementById('editorView');
if(list&&!editor?.classList.contains('active'))list.classList.add('active');

const style=document.createElement('style');style.id='note-workspace-style';style.textContent=`
body:not(.neet-home-mode){background:#f3eadc!important;color:#33271d}.app-shell{display:block!important;visibility:visible!important;opacity:1!important;width:min(100%,980px);padding-top:20px}.app-header{display:flex!important;align-items:center;margin-bottom:14px;padding:0 2px}.header-brand{padding-left:54px}.app-header h1{font-family:-apple-system,BlinkMacSystemFont,"Hiragino Sans","Yu Gothic",sans-serif!important;font-size:1.45rem!important;letter-spacing:-.03em}.app-header .eyebrow{color:#8c6b48;font-size:.62rem;letter-spacing:.14em}.note-home-link{margin-left:auto;padding:9px 12px;border:1px solid #ddccb6;border-radius:12px;background:#fffaf2;color:#694a2d;text-decoration:none;font-size:.76rem;font-weight:850}.app-header .primary-button{background:#946431!important;box-shadow:none!important;border-radius:12px!important;padding:10px 13px!important;font-size:.8rem}.toolbar{margin-bottom:12px}.search-box{padding:11px 13px;border:1px solid #dfcdb7;border-radius:13px;background:#fffaf3}.search-box input{color:#3c2c20}.song-grid{gap:10px}.song-card{min-height:128px;padding:15px 16px!important;border:1px solid #e0ceb9!important;border-radius:15px!important;background:#fffdf8!important;box-shadow:0 5px 16px rgba(78,52,27,.055)!important}.song-card:hover,.song-card:focus{transform:none!important;box-shadow:0 8px 20px rgba(78,52,27,.09)!important}.song-title{font-size:1rem}.song-meta{font-size:.76rem}.song-preview{margin-top:13px;font-size:.82rem;line-height:1.65}.song-date{font-size:.66rem}.song-delete-button{border:0;border-radius:9px;background:#f7eee4;color:#9a5944;padding:6px 8px;font-size:.67rem;font-weight:800}.empty-state{border-color:#e0ceb9;background:#fffaf3;box-shadow:none}.editor-topbar{position:sticky;top:8px;z-index:20;padding:8px;border:1px solid #e0ceb9;border-radius:14px;background:rgba(255,250,242,.94);backdrop-filter:blur(12px)}
@media(max-width:650px){.app-shell{padding:14px 8px 40px}.app-header{gap:7px}.header-brand{padding-left:48px}.app-header h1{font-size:1.18rem!important}.app-header .eyebrow{font-size:.56rem}.note-home-link{padding:8px 9px;font-size:.69rem}.app-header .primary-button{padding:9px 10px!important;font-size:.72rem}.song-grid{grid-template-columns:1fr}}
`;
document.head.appendChild(style);
})();