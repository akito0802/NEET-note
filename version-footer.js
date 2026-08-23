(()=>{
'use strict';
if(window.__NEET_VERSION_FOOTER__)return;
window.__NEET_VERSION_FOOTER__=true;

const VERSION='1.0.0';
window.NEET_NOTE_VERSION=VERSION;

function install(){
  if(!document.body)return;

  if(!document.getElementById('neet-version-footer-style')){
    const style=document.createElement('style');
    style.id='neet-version-footer-style';
    style.textContent=`
#neet-version-footer{
  box-sizing:border-box;
  width:100%;
  clear:both;
  margin:0;
  padding:18px 12px calc(14px + env(safe-area-inset-bottom));
  text-align:center;
  color:rgba(89,78,66,.52);
  font:600 10px/1.4 -apple-system,BlinkMacSystemFont,"Hiragino Sans","Yu Gothic",sans-serif;
  letter-spacing:.08em;
  user-select:none;
  -webkit-user-select:none;
}
html[data-theme="dark"] #neet-version-footer,
body.dark #neet-version-footer{
  color:rgba(220,210,198,.48);
}
@media(max-width:600px){
  #neet-version-footer{padding-top:15px;font-size:9px}
}
`;
    document.head.appendChild(style);
  }

  let footer=document.getElementById('neet-version-footer');
  if(!footer){
    footer=document.createElement('footer');
    footer.id='neet-version-footer';
    footer.setAttribute('aria-label',`NEET NOTE version ${VERSION}`);
    footer.textContent=`NEET NOTE · v${VERSION}`;
  }

  const moveToBottom=()=>{
    if(!document.body)return;
    if(footer.parentNode!==document.body||footer!==document.body.lastElementChild){
      document.body.appendChild(footer);
    }
  };

  moveToBottom();
  let raf=0;
  const observer=new MutationObserver(()=>{
    if(raf)return;
    raf=requestAnimationFrame(()=>{raf=0;moveToBottom()});
  });
  observer.observe(document.body,{childList:true});
  [250,1000,3000].forEach(ms=>setTimeout(moveToBottom,ms));
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});
else install();
})();
