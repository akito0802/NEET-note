(()=>{
'use strict';
const style=document.createElement('style');
style.textContent=`
/* C案: 章一覧・章ヘッダーでは絵文字を使わない */
#textbookLibrary .tb-cat,
#textbookLibrary .tb-catx{
  grid-template-columns:64px minmax(0,1fr) auto!important;
  gap:16px!important;
}
#textbookLibrary .tb-cat .tb-icon,
#textbookLibrary .tb-catx .tb-icon{
  display:none!important;
}
#textbookLibrary .tb-ch-title{
  grid-template-columns:1fr!important;
  gap:0!important;
  padding-left:4px!important;
}
#textbookLibrary .tb-ch-title>span{
  display:none!important;
}
@media(max-width:650px){
  #textbookLibrary .tb-cat,
  #textbookLibrary .tb-catx{
    grid-template-columns:54px minmax(0,1fr) auto!important;
    gap:10px!important;
  }
}
`;
document.head.appendChild(style);
})();
