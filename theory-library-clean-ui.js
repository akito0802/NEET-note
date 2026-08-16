(()=>{
'use strict';
function clean(){
  const root=document.getElementById('textbookLibrary');
  if(!root)return;

  // 学習画面にはPDF/出典確認用の重複UIを一切出さない。
  root.querySelectorAll('.pdf-force-panel,.tb-pdf-upgrade,.tb-pdf-note,.gm-source,.gm-refs,.tb-source-badge').forEach(el=>el.remove());

  const sourceWords=[
    '一般音楽論','PDF章立て','PDF 151','PDF本文','PDF参照','PDF STRUCTURE',
    '資料本文を要約','公開理論教材を要約','公開教材を要約',
    '音響・公開教材','音律・音響資料','OPEN THEORY SOURCE','GENERAL MUSIC SOURCE',
    '本文確認済み','PDF範囲外','書籍 p'
  ];

  // 行・検索結果・章見出しに残る出典ラベルも削除。
  root.querySelectorAll('.tb-row small,.tb-result small,.tb-ch-title small,.tb-inline-reader small').forEach(el=>{
    const t=(el.textContent||'').trim();
    if(sourceWords.some(w=>t.includes(w)))el.remove();
  });

  // 「p248–250」のようなページ番号だけの補助表示も削除。
  root.querySelectorAll('.tb-pdf-upgrade span,.gm-refs span,.tb-inline-reader .source-page,.tb-inline-reader [data-page]').forEach(el=>el.remove());
}

const style=document.createElement('style');
style.textContent=`
/* PDF/出典確認用UIは描画段階から隠し、ちらつきも防ぐ */
#textbookLibrary .pdf-force-panel,
#textbookLibrary .tb-pdf-upgrade,
#textbookLibrary .tb-pdf-note,
#textbookLibrary .gm-source,
#textbookLibrary .gm-refs,
#textbookLibrary .tb-source-badge{display:none!important}

/* 読むことを最優先したスマホUI */
#textbookLibrary .tb-row{
  min-height:66px;
  padding:16px 12px;
  gap:11px;
}
#textbookLibrary .tb-row b{
  font-size:.98rem;
  line-height:1.45;
  letter-spacing:.01em;
}
#textbookLibrary .tb-row>span{
  font-size:.72rem;
}
#textbookLibrary .tb-row small{
  display:none!important;
}
#textbookLibrary .tb-ch-title{
  padding:12px 4px 18px;
}
#textbookLibrary .tb-ch-title h2{
  font-size:1.35rem;
  line-height:1.35;
}
#textbookLibrary .tb-ch-title p{
  margin-top:6px;
  font-size:.82rem;
  line-height:1.65;
}
#textbookLibrary .tb-inline-reader{
  padding:18px 16px 20px;
  margin-bottom:14px;
  border-radius:0 0 16px 16px;
  box-shadow:none;
}
#textbookLibrary .tb-inline-head h2{
  margin:4px 0 15px;
  font-size:1.2rem;
  line-height:1.4;
}
#textbookLibrary .tb-inline-head .tb-breadcrumb{
  font-size:.68rem;
}
#textbookLibrary .tb-inline-body{
  font-size:1rem;
  line-height:1.9;
}
#textbookLibrary .tb-inline-body p,
#textbookLibrary .tb-inline-body li,
#textbookLibrary .tb-inline-body dd{
  font-size:.96rem;
  line-height:1.9;
}
#textbookLibrary .tb-inline-body h3,
#textbookLibrary .tb-inline-body h4{
  margin:22px 0 9px;
  font-size:1rem;
  line-height:1.45;
}
#textbookLibrary .tb-inline-body ul{
  margin:8px 0 16px;
  padding-left:1.35rem;
}
#textbookLibrary .tb-inline-body li+li{
  margin-top:9px;
}
#textbookLibrary .gm-summary{
  margin:0 0 14px;
  padding:14px 15px;
  font-size:.98rem;
  line-height:1.8;
  border:1px solid var(--line);
  background:#fffdf8;
}
#textbookLibrary .gm-block{
  margin:12px 0;
  padding:15px;
  border-radius:13px;
  box-shadow:none;
}
#textbookLibrary .gm-block h3{
  margin:0 0 9px;
}
#textbookLibrary .gm-two{
  grid-template-columns:1fr!important;
  gap:0!important;
}
#textbookLibrary .tb-inline-close{
  min-height:48px;
  margin-top:18px;
  font-size:.95rem;
}
#textbookLibrary .tb-tools{
  margin-bottom:16px;
}
#textbookLibrary .tb-tools label,
#textbookLibrary .tb-tools select{
  min-height:48px;
}
@media(max-width:650px){
  #textbookLibrary{padding-left:10px;padding-right:10px}
  #textbookLibrary .tb-row{padding:15px 9px;grid-template-columns:32px 1fr auto}
  #textbookLibrary .tb-inline-reader{padding:16px 14px 18px}
  #textbookLibrary .tb-inline-body p,
  #textbookLibrary .tb-inline-body li,
  #textbookLibrary .tb-inline-body dd{font-size:.98rem}
}
`;
document.head.appendChild(style);

function install(){
  clean();
  const target=document.getElementById('textbookLibrary')||document.documentElement;
  new MutationObserver(clean).observe(target,{childList:true,subtree:true});
  setTimeout(clean,100);
  setTimeout(clean,300);
  setTimeout(clean,800);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();