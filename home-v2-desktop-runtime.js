(()=>{
'use strict';
if(window.__NEET_HOME_DESKTOP_RUNTIME__)return;
window.__NEET_HOME_DESKTOP_RUNTIME__=true;

const CSS=`
@media (min-width:1000px){
  .neet-final-home{
    min-height:100dvh!important;
    padding:36px 38px 48px!important;
    display:grid!important;
    place-items:start center!important;
    background:
      radial-gradient(circle at 15% 0%,rgba(255,255,255,.55),transparent 30%),
      var(--h-bg)!important;
  }
  .neet-final-home .nf-shell{
    width:min(1240px,calc(100vw - 76px))!important;
    max-width:none!important;
    margin:0 auto!important;
    padding:28px 30px 30px!important;
    display:grid!important;
    grid-template-columns:minmax(285px,.72fr) minmax(0,1.7fr)!important;
    grid-template-rows:auto auto auto auto auto auto!important;
    gap:14px 24px!important;
    border-radius:28px!important;
    box-shadow:0 22px 55px rgba(90,61,32,.13)!important;
  }
  .neet-final-home .nf-head{
    grid-column:1 / -1!important;
    grid-row:1!important;
    min-height:92px!important;
    grid-template-columns:1fr 76px!important;
    text-align:left!important;
    padding:4px 8px 22px!important;
  }
  .neet-final-home .nf-head>div{padding-left:0!important}
  .neet-final-home .nf-head b{font-size:1.45rem!important;letter-spacing:.16em!important}
  .neet-final-home .nf-head small{margin-top:7px!important;font-size:.84rem!important}
  .neet-final-home .nf-head img{width:72px!important;height:72px!important}

  .neet-final-home .nf-account{
    grid-column:1!important;
    grid-row:2!important;
    margin-top:0!important;
    min-height:100px!important;
    grid-template-columns:64px 1fr 24px!important;
    gap:14px!important;
    padding:16px!important;
    border-radius:18px!important;
  }
  .neet-final-home .nf-avatar{width:60px!important;height:60px!important}
  .neet-final-home .nf-avatar img{width:52px!important;height:52px!important}
  .neet-final-home .nf-user b{font-size:1rem!important}
  .neet-final-home .nf-user span{font-size:.77rem!important}
  .neet-final-home .nf-user small{font-size:.72rem!important}

  .neet-final-home .nf-sync{
    grid-column:1!important;
    grid-row:3!important;
    margin:0!important;
    min-height:56px!important;
    border-radius:15px!important;
    font-size:.9rem!important;
  }

  .neet-final-home .nf-grid{
    grid-column:2!important;
    grid-row:2 / span 5!important;
    display:grid!important;
    grid-template-columns:repeat(3,minmax(0,1fr))!important;
    align-content:start!important;
    gap:14px!important;
  }
  .neet-final-home .nf-tile{
    min-height:128px!important;
    padding:16px 12px!important;
    border-radius:18px!important;
    transition:transform .16s ease,box-shadow .16s ease,border-color .16s ease!important;
  }
  .neet-final-home .nf-tile:hover{
    transform:translateY(-3px)!important;
    border-color:#cfb08b!important;
    box-shadow:0 12px 24px rgba(82,54,28,.11)!important;
  }
  .neet-final-home .nf-icon{height:38px!important;margin-bottom:9px!important;font-size:1.72rem!important}
  .neet-final-home .nf-tile b{font-size:.8rem!important;line-height:1.35!important}
  .neet-final-home .nf-tile small{margin-top:4px!important;font-size:.66rem!important}

  .neet-final-home .nf-row{
    grid-column:1!important;
    min-height:58px!important;
    margin-top:0!important;
    padding:10px 13px!important;
    border-radius:15px!important;
  }
  .neet-final-home .nf-row[href*="neeton-home"]{grid-row:4!important}
  .neet-final-home #nfTheme{grid-row:5!important}
  .neet-final-home #nfHelp{grid-row:6!important}
  .neet-final-home .nf-row b{font-size:.88rem!important}
  .neet-final-home .nf-row>span:first-child{width:34px!important;height:34px!important}
}
@media (min-width:1400px){
  .neet-final-home .nf-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important}
  .neet-final-home .nf-tile{min-height:142px!important}
}
`;

function inject(){
  if(!document.querySelector('.neet-final-home'))return false;
  let style=document.getElementById('neetHomeDesktopRuntimeStyle');
  if(!style){
    style=document.createElement('style');
    style.id='neetHomeDesktopRuntimeStyle';
    style.textContent=CSS;
    document.head.appendChild(style);
  }else if(style.parentElement===document.head){
    document.head.appendChild(style);
  }
  document.documentElement.classList.add('neet-home-desktop-runtime-ready');
  return true;
}

if(!inject()){
  const mo=new MutationObserver(()=>{if(inject())mo.disconnect();});
  mo.observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(inject,3200);
  setTimeout(inject,4200);
}
})();
