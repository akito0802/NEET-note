(()=>{
'use strict';

function isHomeBack(btn){
  if(!btn?.matches?.('.tb-back'))return false;
  const t=(btn.textContent||'').replace(/\s+/g,'');
  return t.includes('目次へ')||t.includes('目次に戻る')||
    btn.dataset.back==='home'||
    btn.dataset.melodyBack==='home'||
    btn.dataset.arrangementBack==='home'||
    btn.dataset.soundBack==='home'||
    btn.dataset.tuningBack==='home'||
    btn.dataset.styleHistoryBack==='home'||
    btn.classList.contains('arr-home');
}

function isChapterBack(btn){
  if(!btn?.matches?.('.tb-back'))return false;
  const t=(btn.textContent||'').replace(/\s+/g,'');
  return t.includes('章一覧へ')||t.includes('この章の一覧に戻る')||
    btn.dataset.back==='chapter'||
    btn.dataset.melodyBack==='chapter'||
    btn.dataset.arrangementBack==='chapter'||
    btn.dataset.soundBack==='chapter'||
    btn.dataset.tuningBack==='chapter'||
    btn.dataset.styleHistoryBack==='chapter'||
    btn.classList.contains('arr-chapter');
}

function enhanceButton(btn){
  if(isHomeBack(btn)){
    if(btn.dataset.navEnhanced==='home')return;
    btn.dataset.navEnhanced='home';
    btn.innerHTML='<span class="tb-back-icon">←</span><span><b>目次に戻る</b><small>全21編の一覧へ</small></span>';
    btn.classList.add('tb-back-strong','tb-back-home');
    return;
  }
  if(isChapterBack(btn)){
    if(btn.dataset.navEnhanced==='chapter')return;
    btn.dataset.navEnhanced='chapter';
    btn.innerHTML='<span class="tb-back-icon">←</span><span><b>この章の一覧に戻る</b><small>前の理論項目一覧へ</small></span>';
    btn.classList.add('tb-back-strong');
  }
}

function enhanceAll(root){
  root.querySelectorAll('.tb-back').forEach(enhanceButton);
}

function install(){
  const root=document.getElementById('textbookLibrary');
  if(!root){setTimeout(install,120);return}
  enhanceAll(root);
  const mo=new MutationObserver(()=>enhanceAll(root));
  mo.observe(root,{childList:true,subtree:true});
  setTimeout(()=>enhanceAll(root),120);
  setTimeout(()=>enhanceAll(root),400);
  setTimeout(()=>enhanceAll(root),900);
}

const style=document.createElement('style');
style.textContent=`
.tb-back-strong{width:100%;display:flex!important;align-items:center;gap:11px!important;margin:4px 0 14px!important;padding:12px 14px!important;border:1px solid var(--line)!important;border-radius:14px!important;background:#fff!important;color:var(--ink)!important;text-align:left!important;box-shadow:0 4px 14px rgba(80,60,30,.05)!important}
.tb-back-strong .tb-back-icon{display:grid;place-items:center;flex:0 0 34px;width:34px;height:34px;border-radius:10px;background:var(--soft);color:var(--accent);font-size:1.15rem;font-weight:900}
.tb-back-strong b{display:block;font-size:.82rem;color:var(--accent)}
.tb-back-strong small{display:block;margin-top:2px;color:var(--muted);font-size:.64rem;font-weight:600}
.tb-back-home{border-color:#d8c9b5!important;background:#fffaf2!important}
@media(max-width:650px){.tb-back-strong{position:sticky;top:62px;z-index:5;padding:10px 12px!important;margin-bottom:12px!important}.tb-back-strong .tb-back-icon{width:32px;height:32px;flex-basis:32px}}
`;
document.head.appendChild(style);

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(install,120));else setTimeout(install,120);
})();