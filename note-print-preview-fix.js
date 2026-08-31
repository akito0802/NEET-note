(()=>{
'use strict';
if(window.__NEET_NOTE_PRINT_PREVIEW_FIX__)return;
window.__NEET_NOTE_PRINT_PREVIEW_FIX__=true;

const ROOT='https://akito0802.github.io/NEET-note/';
const PRINT_KEY='neet-note-print-current-v1';
const SONGS_KEY='song-note-songs-v1';
const BACKUP_KEY='neet-note-text-backup-before-print-v1';
const valueOf=id=>document.getElementById(id)?.value?.trim?.()||'';
const rawValueOf=id=>{
  const el=document.getElementById(id);
  return typeof el?.value==='string'?el.value:'';
};

function chordLayout(){
  const area=document.getElementById('chordsInput');
  if(!area)return null;
  const style=getComputedStyle(area);
  return {
    fontFamily:style.fontFamily,
    fontSize:style.fontSize,
    fontWeight:style.fontWeight,
    fontStyle:style.fontStyle,
    lineHeight:style.lineHeight,
    letterSpacing:style.letterSpacing,
    wordSpacing:style.wordSpacing,
    tabSize:style.tabSize||'2',
    fontVariantLigatures:style.fontVariantLigatures||'none',
    editorWidth:Math.max(0,Math.round(area.clientWidth))
  };
}

function currentSongSnapshot(){
  const rawChords=rawValueOf('chordsInput');
  const songId=rawValueOf('songId').trim();
  return {
    songId,
    title:valueOf('titleInput')||'無題の曲',
    artist:valueOf('artistInput'),
    lyricist:valueOf('lyricistInput'),
    composer:valueOf('composerInput'),
    arranger:valueOf('arrangerInput'),
    date:valueOf('productionDateInput'),
    productionDate:rawValueOf('productionDateInput'),
    key:valueOf('keyInput')||'未設定',
    bpm:valueOf('bpmInput')||'未設定',
    time:valueOf('timeSignatureInput')||'未設定',
    timeSignature:rawValueOf('timeSignatureInput'),
    structure:rawValueOf('structureInput'),
    chords:rawChords.trim().length?rawChords:'未入力',
    rawChords,
    mood:rawValueOf('moodInput'),
    theme:rawValueOf('themeInput'),
    lyricIdea:rawValueOf('lyricIdeaInput'),
    chordLayout:chordLayout(),
    returnUrl:songId?ROOT+'?song='+encodeURIComponent(songId):location.href,
    savedAt:Date.now()
  };
}

function textOnlyBackup(songs){
  return songs.map(song=>({
    id:song.id,
    title:song.title||'',
    lyricist:song.lyricist||'',
    composer:song.composer||'',
    arranger:song.arranger||'',
    artist:song.artist||'',
    productionDate:song.productionDate||'',
    key:song.key||'',
    bpm:song.bpm||'',
    timeSignature:song.timeSignature||'',
    structure:song.structure||'',
    chords:song.chords||'',
    mood:song.mood||'',
    theme:song.theme||'',
    lyricIdea:song.lyricIdea||song.lyrics||'',
    createdAt:song.createdAt||'',
    updatedAt:song.updatedAt||''
  }));
}

function saveCurrentSongSynchronously(snapshot){
  let songs=[];
  try{
    const parsed=JSON.parse(localStorage.getItem(SONGS_KEY)||'[]');
    if(Array.isArray(parsed))songs=parsed;
  }catch{}

  try{
    localStorage.setItem(BACKUP_KEY,JSON.stringify({savedAt:Date.now(),songs:textOnlyBackup(songs)}));
  }catch{}

  if(!snapshot.songId||!songs.length)return;
  const index=songs.findIndex(song=>song&&song.id===snapshot.songId);
  if(index<0)return;
  songs[index]={
    ...songs[index],
    title:rawValueOf('titleInput').trim(),
    lyricist:rawValueOf('lyricistInput').trim(),
    composer:rawValueOf('composerInput').trim(),
    arranger:rawValueOf('arrangerInput').trim(),
    artist:rawValueOf('artistInput').trim(),
    productionDate:rawValueOf('productionDateInput'),
    key:rawValueOf('keyInput'),
    bpm:rawValueOf('bpmInput'),
    timeSignature:rawValueOf('timeSignatureInput'),
    structure:rawValueOf('structureInput'),
    chords:rawValueOf('chordsInput'),
    mood:rawValueOf('moodInput'),
    theme:rawValueOf('themeInput').trim(),
    lyricIdea:rawValueOf('lyricIdeaInput'),
    updatedAt:new Date().toISOString()
  };
  localStorage.setItem(SONGS_KEY,JSON.stringify(songs));
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
  const snapshot=currentSongSnapshot();
  try{
    saveCurrentSongSynchronously(snapshot);
    localStorage.setItem(PRINT_KEY,JSON.stringify(snapshot));
  }catch(error){
    console.error('[NEET NOTE] print save failed',error);
    alert('ノートを安全に保存できなかったため、印刷画面への移動を中止しました。');
    return;
  }
  window.location.assign(ROOT+'note-print.html?v=20260901-pdf1');
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