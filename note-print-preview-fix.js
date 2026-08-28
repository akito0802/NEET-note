(()=>{
'use strict';
if(window.__NEET_NOTE_PRINT_PREVIEW_FIX__)return;
window.__NEET_NOTE_PRINT_PREVIEW_FIX__=true;

const ROOT='https://akito0802.github.io/NEET-note/';
const STORAGE_KEY='neet-note-print-current-v1';
const valueOf=id=>document.getElementById(id)?.value?.trim?.()||'';

function currentData(){
  return {
    title:valueOf('titleInput')||'無題の曲',
    artist:valueOf('artistInput'),
    lyricist:valueOf('lyricistInput'),
    composer:valueOf('composerInput'),
    arranger:valueOf('arrangerInput'),
    date:valueOf('productionDateInput'),
    key:valueOf('keyInput')||'未設定',
    bpm:valueOf('bpmInput')||'未設定',
    time:valueOf('timeSignatureInput')||'未設定',
    chords:valueOf('chordsInput')||'未入力',
    savedAt:Date.now()
  };
}

function ensureStyle(){
  if(document.getElementById('neetUnifiedPrintStyle'))return;
  const style=document.createElement('style');
  style.id='neetUnifiedPrintStyle';
  style.textContent=`
    #notePrintBtn{display:inline-flex!important;align-items:center;justify-content:center;gap:6px;min-height:40px;padding:8px 13px;border:1px solid var(--border,#ded8cf);border-radius:10px;background:#fffdf8;color:var(--text,#2f2a24);font:inherit;font-weight:800;white-space:nowrap}
    #notePrintBtn:active{transform:translateY(1px)}
    .editor-topbar{gap:9px;flex-wrap:wrap}
    @media(max-width:560px){#notePrintBtn{width:100%;order:3}}
  `;
  document.head.appendChild(style);
}

function ensureButton(){
  ensureStyle();
  let button=document.getElementById('notePrintBtn');
  if(!button){
    const topbar=document.querySelector('.editor-topbar');
    if(!topbar)return null;
    button=document.createElement('button');
    button.id='notePrintBtn';
    button.type='button';
    const saveStatus=document.getElementById('saveStatus');
    if(saveStatus)topbar.insertBefore(button,saveStatus);else topbar.appendChild(button);
  }
  button.textContent='🖨 ノート内容を印刷';
  button.setAttribute('aria-label','タイトル・作詞作曲・コード進行メモだけを印刷');
  return button;
}

function openPrintView(){
  try{
    localStorage.setItem(STORAGE_KEY,JSON.stringify(currentData()));
  }catch{
    alert('印刷データを準備できませんでした。');
    return;
  }
  window.location.assign(ROOT+'note-print.html?v=20260828-1');
}

document.addEventListener('click',event=>{
  const button=event.target instanceof Element?event.target.closest('#notePrintBtn'):null;
  if(!button)return;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  openPrintView();
},true);

function install(){return Boolean(ensureButton());}
if(!install()){
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});
  let tries=0;
  const timer=setInterval(()=>{tries+=1;if(install()||tries>24)clearInterval(timer);},250);
}
})();