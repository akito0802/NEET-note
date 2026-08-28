(()=>{
'use strict';
if(window.__NEET_NOTE_PRINT_PREVIEW_FIX__)return;
window.__NEET_NOTE_PRINT_PREVIEW_FIX__=true;

const valueOf=id=>document.getElementById(id)?.value?.trim?.()||'';
const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

function audioInfo(){
  const input=document.getElementById('audioInput');
  const preview=document.getElementById('audioPreview');
  const wrap=document.getElementById('audioPreviewWrap');
  const file=input?.files?.[0]||null;
  const hasAudio=Boolean(file)||Boolean(preview?.currentSrc||preview?.src)||Boolean(wrap&&!wrap.classList.contains('hidden'));
  if(!hasAudio)return 'なし';
  const lines=['あり'];
  if(file?.name)lines.push(`ファイル名：${file.name}`);
  if(Number.isFinite(preview?.duration)&&preview.duration>0){
    const total=Math.round(preview.duration),m=Math.floor(total/60),s=String(total%60).padStart(2,'0');
    lines.push(`再生時間：${m}:${s}`);
  }
  return lines.join('\n');
}

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
    chords:valueOf('chordsInput')||'未入力',
    audio:audioInfo()
  };
}

function fillPrintSheet(data){
  const sheet=document.getElementById('printSheet');
  const title=document.getElementById('printTitle');
  const credits=document.getElementById('printCredits');
  const meta=document.getElementById('printMeta');
  const content=document.getElementById('printContent');
  if(!sheet||!title||!credits||!meta)return false;

  title.textContent=data.title;
  credits.innerHTML='';
  [['アーティスト',data.artist],['作詞',data.lyricist],['作曲',data.composer],['編曲',data.arranger],['制作日',data.date]].forEach(([k,v])=>{
    if(!v)return; const s=document.createElement('span'); s.textContent=`${k}: ${v}`; credits.appendChild(s);
  });
  meta.innerHTML='';
  [['Key',data.key],['BPM',data.bpm],['拍子',data.time]].forEach(([k,v])=>{const s=document.createElement('span');s.textContent=`${k}: ${v}`;meta.appendChild(s);});

  let sections=document.getElementById('printFullSections');
  if(!sections){sections=document.createElement('div');sections.id='printFullSections';sections.className='print-full-sections';sheet.appendChild(sections);}
  sections.innerHTML='';
  [['曲の構成',data.structure,''],['コード進行メモ',data.chords,' print-note-chords'],['音源・ボイスメモ',data.audio,'']].forEach(([heading,text,extra])=>{
    const sec=document.createElement('section');sec.className=`print-note-section${extra}`;
    const h=document.createElement('h2');h.className='print-note-section-title';h.textContent=heading;
    const pre=document.createElement('pre');pre.className='print-note-section-body';pre.textContent=text;
    sec.append(h,pre);sections.appendChild(sec);
  });
  if(content)content.style.display='none';
  document.body.dataset.neetPrintMode='full-note';
  return true;
}

function ensureStyle(){
  if(document.getElementById('neetPrintPreviewFixStyle'))return;
  const style=document.createElement('style');
  style.id='neetPrintPreviewFixStyle';
  style.textContent=`
  .neet-print-preview-overlay{position:fixed;inset:0;z-index:50000;background:rgba(20,20,20,.46);display:flex;align-items:flex-end;justify-content:center;padding:12px}
  .neet-print-preview{width:min(760px,100%);max-height:90dvh;overflow:auto;background:#fffdf9;border-radius:18px 18px 12px 12px;box-shadow:0 -10px 35px rgba(0,0,0,.22);padding:18px;color:#222;-webkit-overflow-scrolling:touch}
  .neet-print-preview-head{display:flex;align-items:center;justify-content:space-between;gap:12px;position:sticky;top:-18px;background:#fffdf9;padding:18px 0 10px;z-index:2;border-bottom:1px solid #e8e0d4}
  .neet-print-preview-head h2{margin:0;font-size:1.08rem}.neet-print-preview-close{border:0;background:#eee9e1;border-radius:999px;width:36px;height:36px;font-size:1.2rem}
  .neet-print-preview-title{font-size:1.5rem;font-weight:900;margin:18px 0 8px}.neet-print-preview-meta{display:flex;flex-wrap:wrap;gap:7px 12px;color:#655c52;font-size:.8rem;padding-bottom:12px;border-bottom:1px solid #e8e0d4}
  .neet-print-preview-section{margin:16px 0}.neet-print-preview-section h3{margin:0 0 7px;font-size:.92rem}.neet-print-preview-section pre{margin:0;white-space:pre-wrap;overflow-wrap:anywhere;font:inherit;font-size:.88rem;line-height:1.65;background:#faf7f1;border:1px solid #ece4d8;border-radius:11px;padding:11px}
  .neet-print-preview-section.chords pre{font-family:"SFMono-Regular",Menlo,Monaco,Consolas,"Noto Sans Mono CJK JP",monospace;white-space:pre-wrap}
  .neet-print-preview-actions{position:sticky;bottom:-18px;background:#fffdf9;display:grid;grid-template-columns:1fr 1.5fr;gap:9px;padding:12px 0 18px;border-top:1px solid #e8e0d4}.neet-print-preview-actions button{min-height:48px;border-radius:12px;font:inherit;font-weight:850}.neet-print-preview-cancel{border:1px solid #d8d0c5;background:#fff;color:#444}.neet-print-preview-print{border:0;background:#2f2a24;color:#fff}
  @media(min-width:700px){.neet-print-preview-overlay{align-items:center}.neet-print-preview{border-radius:18px}}
  @media print{.neet-print-preview-overlay{display:none!important}body[data-neet-print-mode="full-note"] .print-full-sections{display:block!important}body[data-neet-print-mode="full-note"] .print-content{display:none!important}.print-note-section{margin:0 0 7mm;break-inside:avoid-page}.print-note-section-title{margin:0 0 3mm;padding-bottom:2mm;border-bottom:1px solid #bbb;font-size:13pt}.print-note-section-body{margin:0;white-space:pre-wrap;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue","Hiragino Sans","Yu Gothic",sans-serif;font-size:10.5pt;line-height:1.65}.print-note-chords .print-note-section-body{font-family:"SFMono-Regular",Menlo,Monaco,Consolas,"Noto Sans Mono CJK JP",monospace}}
  `;
  document.head.appendChild(style);
}

function closePreview(){document.getElementById('neetPrintPreviewOverlay')?.remove();document.body.style.overflow='';}

function showPreview(){
  ensureStyle();
  closePreview();
  const d=currentData();
  const overlay=document.createElement('div');
  overlay.id='neetPrintPreviewOverlay';
  overlay.className='neet-print-preview-overlay';
  overlay.innerHTML=`<div class="neet-print-preview" role="dialog" aria-modal="true" aria-label="印刷プレビュー">
    <div class="neet-print-preview-head"><h2>印刷プレビュー</h2><button class="neet-print-preview-close" type="button" aria-label="閉じる">×</button></div>
    <div class="neet-print-preview-title">${esc(d.title)}</div>
    <div class="neet-print-preview-meta">
      ${d.artist?`<span>アーティスト: ${esc(d.artist)}</span>`:''}${d.lyricist?`<span>作詞: ${esc(d.lyricist)}</span>`:''}${d.composer?`<span>作曲: ${esc(d.composer)}</span>`:''}${d.arranger?`<span>編曲: ${esc(d.arranger)}</span>`:''}${d.date?`<span>制作日: ${esc(d.date)}</span>`:''}<span>Key: ${esc(d.key)}</span><span>BPM: ${esc(d.bpm)}</span><span>拍子: ${esc(d.time)}</span>
    </div>
    <section class="neet-print-preview-section"><h3>曲の構成</h3><pre>${esc(d.structure)}</pre></section>
    <section class="neet-print-preview-section chords"><h3>コード進行メモ</h3><pre>${esc(d.chords)}</pre></section>
    <section class="neet-print-preview-section"><h3>音源・ボイスメモ</h3><pre>${esc(d.audio)}</pre></section>
    <div class="neet-print-preview-actions"><button class="neet-print-preview-cancel" type="button">閉じる</button><button class="neet-print-preview-print" type="button">🖨 印刷する</button></div>
  </div>`;
  document.body.appendChild(overlay);document.body.style.overflow='hidden';
  overlay.querySelector('.neet-print-preview-close').onclick=closePreview;
  overlay.querySelector('.neet-print-preview-cancel').onclick=closePreview;
  overlay.addEventListener('click',e=>{if(e.target===overlay)closePreview();});
  overlay.querySelector('.neet-print-preview-print').onclick=()=>{
    if(!fillPrintSheet(d)){alert('印刷用データを作れませんでした。');return;}
    try{window.print();}catch(err){alert('このブラウザでは直接印刷を開けません。Safariで開いて再度「印刷する」を押してね。');}
  };
}

document.addEventListener('click',e=>{
  const btn=e.target instanceof Element?e.target.closest('#notePrintBtn'):null;
  if(!btn)return;
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
  showPreview();
},true);

window.addEventListener('afterprint',()=>{delete document.body.dataset.neetPrintMode;const c=document.getElementById('printContent');if(c)c.style.display='';});
})();