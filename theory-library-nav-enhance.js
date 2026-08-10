(()=>{
'use strict';
function install(){
 const root=document.getElementById('textbookLibrary');
 if(!root){setTimeout(install,120);return}
 const homeBtn=root.querySelector('[data-back="home"]');
 const chapterBtn=root.querySelector('[data-back="chapter"]');
 if(homeBtn){homeBtn.innerHTML='<span class="tb-back-icon">←</span><span><b>目次に戻る</b><small>第1編〜第12編の一覧へ</small></span>';homeBtn.classList.add('tb-back-strong','tb-back-home')}
 if(chapterBtn){chapterBtn.innerHTML='<span class="tb-back-icon">←</span><span><b>この章の一覧に戻る</b><small>前の理論項目一覧へ</small></span>';chapterBtn.classList.add('tb-back-strong')}
 const style=document.createElement('style');
 style.textContent=`.tb-back-strong{width:100%;display:flex!important;align-items:center;gap:11px!important;margin:4px 0 14px!important;padding:12px 14px!important;border:1px solid var(--line)!important;border-radius:14px!important;background:#fff!important;color:var(--ink)!important;text-align:left!important;box-shadow:0 4px 14px rgba(80,60,30,.05)!important}.tb-back-strong .tb-back-icon{display:grid;place-items:center;flex:0 0 34px;width:34px;height:34px;border-radius:10px;background:var(--soft);color:var(--accent);font-size:1.15rem;font-weight:900}.tb-back-strong b{display:block;font-size:.82rem;color:var(--accent)}.tb-back-strong small{display:block;margin-top:2px;color:var(--muted);font-size:.64rem;font-weight:600}.tb-back-home{border-color:#d8c9b5!important;background:#fffaf2!important}@media(max-width:650px){.tb-back-strong{position:sticky;top:62px;z-index:5;padding:10px 12px!important;margin-bottom:12px!important}.tb-back-strong .tb-back-icon{width:32px;height:32px;flex-basis:32px}}`;
 document.head.appendChild(style);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(install,120));else setTimeout(install,120);
})();