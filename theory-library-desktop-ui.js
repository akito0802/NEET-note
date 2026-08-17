(()=>{
'use strict';
if(window.__NEET_THEORY_DESKTOP_UI__)return;
window.__NEET_THEORY_DESKTOP_UI__=true;

const style=document.createElement('style');
style.id='neetTheoryDesktopUI';
style.textContent=`
@media (min-width:1000px){
  html{scroll-padding-top:24px}
  body{background:#f4efe6!important}
  .wrap{
    width:min(100%,1460px)!important;
    max-width:1460px!important;
    padding:0 48px 64px!important;
  }
  .c-appbar{
    height:86px!important;
    grid-template-columns:58px 1fr 58px!important;
    margin:0 -48px!important;
    padding:0 48px!important;
  }
  .c-site{font-size:1.04rem!important;letter-spacing:.035em!important}
  .c-back,.menu-button{width:52px!important;height:52px!important}
  .c-hero{
    display:grid!important;
    grid-template-columns:minmax(0,1fr) auto!important;
    align-items:end!important;
    gap:30px!important;
    padding:46px 6px 34px!important;
  }
  .c-hero h1{font-size:3.25rem!important;line-height:1.05!important}
  .c-hero .lead{max-width:640px!important;margin-top:14px!important;font-size:1.02rem!important}

  #textbookLibrary{
    width:min(100%,1280px)!important;
    max-width:1280px!important;
    margin:0 auto!important;
    padding-bottom:90px!important;
  }
  #textbookLibrary .tb-tools{
    grid-template-columns:minmax(0,1fr) 250px!important;
    gap:16px!important;
    margin-bottom:24px!important;
  }
  #textbookLibrary .tb-tools label,
  #textbookLibrary .tb-tools select{min-height:64px!important}
  #textbookLibrary .tb-tools label{padding-inline:20px!important}
  #textbookLibrary .tb-tools input{font-size:1.03rem!important}

  .c-theory-quick{padding:24px 26px 26px!important;margin-bottom:36px!important}
  .c-quick-grid{gap:18px!important}
  .c-quick-card{min-height:102px!important;padding:16px 18px!important}
  .c-quick-icon{width:56px!important;height:56px!important}
  .c-quick-card b{font-size:.98rem!important}

  #textbookLibrary .tb-section-label{margin:42px 4px 18px!important}
  #textbookLibrary .tb-section-label b{font-size:1.38rem!important}
  #textbookLibrary .tb-categories{
    grid-template-columns:repeat(2,minmax(0,1fr))!important;
    column-gap:16px!important;
    row-gap:12px!important;
  }
  #textbookLibrary .tb-cat,
  #textbookLibrary .tb-catx{
    min-height:104px!important;
    grid-template-columns:64px minmax(0,1fr) auto!important;
    gap:15px!important;
    padding:18px 20px!important;
    border-radius:18px!important;
    transition:transform .16s ease,box-shadow .16s ease,border-color .16s ease,background .16s ease!important;
  }
  #textbookLibrary .tb-cat .tb-icon,
  #textbookLibrary .tb-catx .tb-icon{display:none!important}
  #textbookLibrary .tb-cat:hover,
  #textbookLibrary .tb-catx:hover{
    transform:translateY(-2px)!important;
    border-color:#d9c39f!important;
    box-shadow:0 12px 28px rgba(84,59,31,.08)!important;
  }
  #textbookLibrary .tb-no{font-size:.78rem!important;align-self:start!important;padding-top:3px!important}
  #textbookLibrary .tb-cat b,
  #textbookLibrary .tb-catx b{font-size:1.08rem!important}
  #textbookLibrary .tb-cat small,
  #textbookLibrary .tb-catx small{font-size:.78rem!important;line-height:1.55!important}
  #textbookLibrary .tb-cat em,
  #textbookLibrary .tb-catx em{font-size:.82rem!important;white-space:nowrap!important}

  #tbChapter,#tbMelodyChapter,#tbArrangementChapter,#tbSoundChapter,#tbTuningChapter,#tbStyleHistoryChapter,
  #tbReader,#tbMelodyReader,#tbArrangementReader,#tbSoundReader,#tbTuningReader,#tbStyleHistoryReader{
    width:min(100%,1160px)!important;
    max-width:1160px!important;
    margin-inline:auto!important;
  }
  #textbookLibrary .tb-back-strong{
    width:auto!important;
    min-width:248px!important;
    max-width:320px!important;
    margin:4px 0 18px!important;
    padding:10px 14px!important;
  }
  #textbookLibrary .tb-ch-title{
    grid-template-columns:64px 1fr!important;
    gap:18px!important;
    margin:8px 0 22px!important;
    padding:14px 6px 22px!important;
  }
  #textbookLibrary .tb-ch-title>span{width:58px!important;height:58px!important}
  #textbookLibrary .tb-ch-title h2{font-size:2rem!important}
  #textbookLibrary .tb-ch-title p{font-size:.9rem!important;max-width:820px!important}

  #tbChapterList,#tbMelodyList,.tb-arr-list,.tb-sound-list,.tb-tuning-list,#tbStyleHistoryList{
    border-radius:20px!important;
  }
  #textbookLibrary .tb-row{
    min-height:88px!important;
    grid-template-columns:72px minmax(0,1fr) 34px!important;
    gap:18px!important;
    padding:17px 22px!important;
    transition:background .14s ease!important;
  }
  #textbookLibrary .tb-row:hover{background:#fff9ef!important}
  #textbookLibrary .tb-row>span{font-size:1.16rem!important}
  #textbookLibrary .tb-row b{font-size:1.04rem!important}
  .c-lesson-meta{font-size:.76rem!important}

  #textbookLibrary .tb-inline-reader{
    margin:0 0 14px!important;
    padding:28px 34px 30px!important;
    border-radius:0 0 20px 20px!important;
  }
  #textbookLibrary .tb-inline-head{max-width:940px!important;margin-inline:auto!important}
  #textbookLibrary .tb-inline-head h2{font-size:1.7rem!important}
  #textbookLibrary .tb-inline-body{
    max-width:940px!important;
    margin-inline:auto!important;
    font-size:1rem!important;
    line-height:1.95!important;
  }
  #textbookLibrary .gm-summary{padding:18px 20px!important;font-size:1.02rem!important;line-height:1.85!important}
  #textbookLibrary .gm-two{
    display:grid!important;
    grid-template-columns:repeat(2,minmax(0,1fr))!important;
    gap:16px!important;
    align-items:stretch!important;
  }
  #textbookLibrary .gm-block{padding:18px 20px!important}
  #textbookLibrary .gm-block h3{font-size:.92rem!important}
  #textbookLibrary .tb-inline-close{
    display:block!important;
    width:min(100%,360px)!important;
    margin:24px auto 0!important;
  }

  #tbResults:not([hidden]){
    display:grid!important;
    grid-template-columns:repeat(2,minmax(0,1fr))!important;
    gap:14px!important;
    align-items:start!important;
  }
  #tbResults>button,#tbResults>.tb-result,#tbResults>a{
    min-height:90px!important;
    border:1px solid var(--c-line)!important;
    border-radius:18px!important;
    background:#fffdf9!important;
    box-shadow:0 7px 20px rgba(84,59,31,.045)!important;
  }

  #tbGlossaryLayer{
    align-items:center!important;
    justify-content:center!important;
    padding:32px!important;
    background:rgba(35,27,18,.24)!important;
    backdrop-filter:blur(2px)!important;
  }
  #tbGlossaryLayer .tb-glossary-sheet{
    width:min(760px,calc(100vw - 80px))!important;
    max-height:min(78vh,760px)!important;
    border-radius:26px!important;
    padding:24px 28px 26px!important;
    box-shadow:0 28px 80px rgba(45,32,18,.22)!important;
  }
  #tbGlossaryLayer .tb-glossary-title{font-size:1.5rem!important}
  #tbGlossaryLayer .tb-glossary-sec p,
  #tbGlossaryDetail p{font-size:1rem!important;line-height:1.85!important}
  #tbGlossaryEasy>summary,#tbGlossaryDetail>summary{font-size:.86rem!important}

  .tb-sh-section{margin-top:36px!important}
  .tb-sh-section-head{margin-bottom:18px!important}

  @media (min-width:1320px){
    #textbookLibrary .tb-cat,
    #textbookLibrary .tb-catx{min-height:110px!important;padding:20px 22px!important}
    #textbookLibrary .tb-inline-reader{padding-inline:42px!important}
  }
}
`;
document.head.appendChild(style);

function markMode(){
  const desktop=window.matchMedia('(min-width:1000px)').matches;
  document.documentElement.classList.toggle('neet-theory-desktop',desktop);
  document.documentElement.classList.toggle('neet-theory-mobile',!desktop);
}
markMode();
const mq=window.matchMedia('(min-width:1000px)');
if(mq.addEventListener)mq.addEventListener('change',markMode);else mq.addListener?.(markMode);
})();
