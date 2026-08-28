(()=>{
'use strict';
if(window.__NEET_NOTE_PRINT_PREVIEW_FIX__)return;
window.__NEET_NOTE_PRINT_PREVIEW_FIX__=true;

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
    structure:valueOf('structureInput')||'未入力',
    chords:valueOf('chordsInput')||'未入力'
  };
}

function appendMeta(container,items){
  if(!container)return;
  container.innerHTML='';
  items.filter(([,value])=>value).forEach(([label,value])=>{
    const item=document.createElement('span');
    item.textContent=`${label}: ${value}`;
    container.appendChild(item);
  });
}

function makeSection(title,text,extraClass=''){
  const section=document.createElement('section');
  section.className=`neet-note-print-section ${extraClass}`.trim();
  const heading=document.createElement('h2');
  heading.textContent=title;
  const body=document.createElement('pre');
  body.textContent=text||'未入力';
  section.append(heading,body);
  return section;
}

function buildCleanPrintSheet(){
  const sheet=document.getElementById('printSheet');
  const title=document.getElementById('printTitle');
  const credits=document.getElementById('printCredits');
  const meta=document.getElementById('printMeta');
  const oldContent=document.getElementById('printContent');
  if(!sheet||!title||!credits||!meta)return false;

  const data=currentData();
  title.textContent=data.title;
  appendMeta(credits,[
    ['アーティスト',data.artist],
    ['作詞',data.lyricist],
    ['作曲',data.composer],
    ['編曲',data.arranger],
    ['制作日',data.date]
  ]);
  appendMeta(meta,[
    ['Key',data.key],
    ['BPM',data.bpm],
    ['拍子',data.time]
  ]);

  if(oldContent)oldContent.style.display='none';
  let sections=document.getElementById('neetCleanPrintSections');
  if(!sections){
    sections=document.createElement('div');
    sections.id='neetCleanPrintSections';
    sheet.appendChild(sections);
  }
  sections.innerHTML='';
  sections.append(
    makeSection('曲の構成',data.structure),
    makeSection('コード進行メモ',data.chords,'neet-note-print-chords')
  );

  const legacy=document.getElementById('printFullSections');
  if(legacy)legacy.style.display='none';
  document.body.dataset.neetPrintMode='clean-note';
  sheet.setAttribute('aria-hidden','false');
  return true;
}

function ensureStyle(){
  if(document.getElementById('neetCleanNotePrintStyle'))return;
  const style=document.createElement('style');
  style.id='neetCleanNotePrintStyle';
  style.textContent=`
    @media print{
      @page{size:A4 portrait;margin:15mm}
      html,body{background:#fff!important;margin:0!important;padding:0!important}
      body *{visibility:hidden!important}
      #printSheet,#printSheet *{visibility:visible!important}
      #printSheet{
        display:block!important;
        position:absolute!important;
        inset:0 auto auto 0!important;
        width:100%!important;
        margin:0!important;
        padding:0!important;
        background:#fff!important;
        color:#111!important;
        box-shadow:none!important;
      }
      #printSheet #printContent,
      #printSheet #printFullSections{display:none!important}
      #printTitle{margin:0 0 5mm!important;font-size:24pt!important;line-height:1.25!important}
      #printCredits,#printMeta{display:flex!important;flex-wrap:wrap!important;gap:2mm 6mm!important;margin:0 0 4mm!important;padding:0 0 3mm!important;border-bottom:1px solid #bbb!important;font-size:10.5pt!important}
      #neetCleanPrintSections{display:block!important}
      .neet-note-print-section{display:block!important;margin:0 0 7mm!important;break-inside:avoid-page!important;page-break-inside:avoid!important}
      .neet-note-print-section h2{margin:0 0 3mm!important;padding:0 0 2mm!important;border-bottom:1px solid #bbb!important;font-size:13pt!important}
      .neet-note-print-section pre{margin:0!important;white-space:pre-wrap!important;overflow-wrap:anywhere!important;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue","Hiragino Sans","Yu Gothic",sans-serif!important;font-size:10.5pt!important;line-height:1.65!important;color:#111!important}
      .neet-note-print-chords pre{font-family:"SFMono-Regular",Menlo,Monaco,Consolas,"Noto Sans Mono CJK JP",monospace!important;white-space:pre-wrap!important;overflow-wrap:normal!important}
    }
  `;
  document.head.appendChild(style);
}

function printCleanNote(){
  ensureStyle();
  if(!buildCleanPrintSheet()){
    alert('ノートの印刷データを作れませんでした。');
    return;
  }
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    try{window.print();}
    catch{alert('印刷画面を開けませんでした。Safariで開いてもう一度試してね。');}
  }));
}

document.addEventListener('click',event=>{
  const button=event.target instanceof Element?event.target.closest('#notePrintBtn'):null;
  if(!button)return;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  printCleanNote();
},true);

window.addEventListener('afterprint',()=>{
  delete document.body.dataset.neetPrintMode;
  const oldContent=document.getElementById('printContent');
  if(oldContent)oldContent.style.display='';
  const legacy=document.getElementById('printFullSections');
  if(legacy)legacy.style.display='';
  document.getElementById('printSheet')?.setAttribute('aria-hidden','true');
});
})();