(()=>{
'use strict';
if(window.__NEET_GLOBAL_MENU_COMPACT_WIDTH__)return;
window.__NEET_GLOBAL_MENU_COMPACT_WIDTH__=true;
const style=document.createElement('style');
style.id='ngm-compact-width-style';
style.textContent=`
@media(max-width:600px){
  .ngm-menu{
    width:min(80vw,310px)!important;
    max-width:310px!important;
    border-radius:0 22px 22px 0!important;
    padding-left:10px!important;
    padding-right:10px!important;
  }
}
`;
document.head.appendChild(style);
})();
