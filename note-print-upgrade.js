(()=>{
'use strict';
if(window.__NEET_NOTE_PRINT_UPGRADE__)return;
window.__NEET_NOTE_PRINT_UPGRADE__=true;

const NOTE_PATH_RE=/\/NEET-note\/(?:index\.html)?$/;
if(!NOTE_PATH_RE.test(location.pathname))return;
const params=new URLSearchParams(location.search);
if(params.get('mode')!=='note'&&!params.has('song'))return;

const valueOf=id=>document.getElementById(id)?.value?.trim?.()||'';
const textOr=value=>value||'未設定';

function formatDuration(seconds){
  if(!Number.isFinite(seconds)||seconds<=0)return '';
  const total=Math.round(seconds);
  const min=Math.floor(total/60);
  const sec=String(total%60).padStart(2,'0');
  return `${min}:${sec}`;
}

function ensurePrintSections(){
  const sheet=document.getElementById('printSheet');
  if(!sheet)return null;
  let sections=document.getElementById('printFullSections');
  if(!sections){
    sections=document.createElement('div');
    sections.id='printFullSections';
    sections.className='print-full-sections';
    sheet.appendChild(sections);
  }
  return sections;
}

function appendMeta(container,items){
  if(!container)return;
  container.innerHTML='';
  items.filter(([,value])=>value).forEach(([label,value])=>{
    const span=document.createElement('span');
    span.textContent=`${label}: ${value}`;
    container.appendChild(span);
  });
}

function makeSection(title,text,extraClass=''){
  const section=document.createElement('section');
  section.className=`print-note-section ${extraClass}`.trim();
  const heading=document.createElement('h2');
  heading.className='print-note-section-title';
  heading.textContent=title;
  const body=document.createElement('pre');
  body.className='print-note-section-body';
  body.textContent=text||'未入力';
  section.append(heading,body);
  return section;
}

function getAudioInfo(){
  const input=document.getElementById('audioInput');
  const preview=document.getElementById('audioPreview');
  const wrap=document.getElementById('audioPreviewWrap');
  const file=input?.files?.[0]||null;
  const hasStoredAudio=Boolean(preview?.currentSrc||preview?.src)||Boolean(wrap&&!wrap.classList.contains('hidden'));
  if(!file&&!hasStoredAudio)return '音源・ボイスメモ：なし';
  const parts=['音源・ボイスメモ：あり'];
  if(file?.name)parts.push(`ファイル名：${file.name}`);
  const duration=formatDuration(preview?.duration);
  if(duration)parts.push(`再生時間：${duration}`);
  if(!file&&hasStoredAudio)parts.push('ノートに保存済み');
  return parts.join('\n');
}

function buildFullPrintSheet(){
  const printTitle=document.getElementById('printTitle');
  const printCredits=document.getElementById('printCredits');
  const printMeta=document.getElementById('printMeta');
  const printContent=document.getElementById('printContent');
  const sections=ensurePrintSections();
  if(!printTitle||!printCredits||!printMeta||!sections)return false;

  const title=valueOf('titleInput')||'無題の曲';
  printTitle.textContent=title;
  appendMeta(printCredits,[
    ['アーティスト',valueOf('artistInput')],
    ['作詞',valueOf('lyricistInput')],
    ['作曲',valueOf('composerInput')],
    ['編曲',valueOf('arrangerInput')],
    ['制作日',valueOf('productionDateInput')]
  ]);
  appendMeta(printMeta,[
    ['Key',textOr(valueOf('keyInput'))],
    ['BPM',textOr(valueOf('bpmInput'))],
    ['拍子',textOr(valueOf('timeSignatureInput'))]
  ]);

  sections.innerHTML='';
  sections.append(
    makeSection('曲の構成',valueOf('structureInput')),
    makeSection('コード進行メモ',valueOf('chordsInput'),'print-note-chords'),
    makeSection('音源・ボイスメモ',getAudioInfo(),'print-note-audio')
  );
  if(printContent)printContent.style.display='none';
  document.body.dataset.neetPrintMode='full-note';
  document.getElementById('printSheet')?.setAttribute('aria-hidden','false');
  return true;
}

function installStyle(){
  if(document.getElementById('neetNotePrintUpgradeStyle'))return;
  const style=document.createElement('style');
  style.id='neetNotePrintUpgradeStyle';
  style.textContent=`
    #notePrintBtn{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:38px;padding:8px 12px;border:1px solid var(--border,#ded8cf);border-radius:10px;background:#fffdf8;color:var(--text,#2f2a24);font:inherit;font-weight:800;white-space:nowrap}
    #notePrintBtn:active{transform:translateY(1px)}
    .editor-topbar{gap:9px;flex-wrap:wrap}
    @media(max-width:560px){#notePrintBtn{order:3;width:100%;margin-top:2px}}
    .print-full-sections{display:none}
    @media print{
      body[data-neet-print-mode="full-note"] .print-content{display:none!important}
      body[data-neet-print-mode="full-note"] .print-full-sections{display:block!important}
      .print-full-sections{margin-top:3mm}
      .print-note-section{margin:0 0 7mm;break-inside:avoid-page;page-break-inside:avoid}
      .print-note-section-title{margin:0 0 3mm;padding:0 0 2mm;border-bottom:1px solid #bbb;font-size:13pt;letter-spacing:.02em}
      .print-note-section-body{margin:0;white-space:pre-wrap;overflow-wrap:anywhere;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue","Hiragino Sans","Yu Gothic",sans-serif;font-size:10.5pt;line-height:1.65}
      .print-note-chords .print-note-section-body{font-family:"SFMono-Regular",Menlo,Monaco,Consolas,"Noto Sans Mono CJK JP",monospace;white-space:pre-wrap;overflow-wrap:normal}
      .print-note-audio .print-note-section-body{font-size:10pt;color:#333}
    }
  `;
  document.head.appendChild(style);
}

function install(){
  const topbar=document.querySelector('.editor-topbar');
  const saveStatus=document.getElementById('saveStatus');
  const oldPrint=document.getElementById('printChordMemoBtn');
  const sheet=document.getElementById('printSheet');
  if(!topbar||!sheet)return false;

  installStyle();
  ensurePrintSections();

  if(oldPrint){
    oldPrint.textContent='コードのみ印刷';
    oldPrint.setAttribute('aria-label','コード進行メモだけを印刷');
    oldPrint.addEventListener('click',()=>{
      document.body.dataset.neetPrintMode='chords-only';
      const printContent=document.getElementById('printContent');
      if(printContent)printContent.style.display='';
      const sections=document.getElementById('printFullSections');
      if(sections)sections.style.display='none';
    },true);
  }

  if(!document.getElementById('notePrintBtn')){
    const button=document.createElement('button');
    button.id='notePrintBtn';
    button.type='button';
    button.textContent='🖨 ノートを印刷';
    button.setAttribute('aria-label','曲ノート全体を印刷');
    if(saveStatus)topbar.insertBefore(button,saveStatus);else topbar.appendChild(button);
    button.addEventListener('click',()=>{
      if(!buildFullPrintSheet())return;
      window.print();
    });
  }

  window.addEventListener('afterprint',()=>{
    delete document.body.dataset.neetPrintMode;
    const printContent=document.getElementById('printContent');
    if(printContent)printContent.style.display='';
    const sections=document.getElementById('printFullSections');
    if(sections)sections.style.display='';
    document.getElementById('printSheet')?.setAttribute('aria-hidden','true');
  });
  return true;
}

if(!install()){
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});
  let tries=0;
  const timer=setInterval(()=>{
    tries+=1;
    if(install()||tries>24)clearInterval(timer);
  },250);
}
})();