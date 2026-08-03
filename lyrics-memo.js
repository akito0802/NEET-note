(()=>{
'use strict';
const hidden=document.getElementById('lyricIdeaInput');
const form=document.getElementById('songForm');
if(!hidden||!form||document.getElementById('lyricsMemoInput'))return;

const section=document.createElement('section');
section.className='lyrics-memo-section';
section.innerHTML=`
  <div class="lyrics-memo-head">
    <div><p class="eyebrow">LYRICS MEMO</p><h2>歌詞メモ</h2></div>
    <div class="lyrics-memo-actions">
      <span id="lyricsCharCount">0文字</span>
      <button id="insertLyricsSectionBtn" class="ghost-button" type="button">＋ セクション</button>
      <button id="copyLyricsBtn" class="ghost-button" type="button">コピー</button>
    </div>
  </div>
  <textarea id="lyricsMemoInput" rows="18" placeholder="Aメロ、Bメロ、サビなど、思いついた歌詞を自由に書いてね。\n\n例：\n【Aメロ】\n窓の向こうに朝が来て\nまだ眠れない夢を見てる\n\n【サビ】\n君の声が聞こえるだけで"></textarea>
  <div class="lyrics-memo-footer">
    <small>入力内容は曲データと一緒に自動保存・クラウド同期されるよ。</small>
  </div>`;

const structureField=document.getElementById('structureInput')?.closest('.field');
if(structureField)structureField.insertAdjacentElement('afterend',section);
else form.insertBefore(section,form.querySelector('.chord-section'));

const style=document.createElement('style');
style.textContent=`
.lyrics-memo-section{margin:22px 0;padding:18px;border:1px solid var(--ui-line,var(--border,#ded6c9));border-radius:18px;background:var(--ui-surface,var(--paper,#fffdf8))}
.lyrics-memo-head{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:12px}
.lyrics-memo-head h2{margin:2px 0 0;font-size:1.2rem}
.lyrics-memo-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}
.lyrics-memo-actions span{color:var(--ui-muted,var(--muted,#6b7280));font-size:.78rem;font-weight:700}
#lyricsMemoInput{width:100%;min-height:330px;padding:16px;border:1px solid var(--ui-line,var(--border,#ded6c9));border-radius:14px;background:var(--ui-surface-2,#faf7f1);color:var(--ui-text,var(--text,#1f2937));font:inherit;font-size:1rem;line-height:1.9;resize:vertical;box-sizing:border-box}
#lyricsMemoInput:focus{outline:2px solid color-mix(in srgb,var(--accent,#8b6f47) 35%,transparent);outline-offset:2px}
.lyrics-memo-footer{display:flex;justify-content:space-between;margin-top:9px;color:var(--ui-muted,var(--muted,#6b7280))}
@media(max-width:640px){.lyrics-memo-head{display:block}.lyrics-memo-actions{justify-content:flex-start;margin-top:10px}#lyricsMemoInput{min-height:420px}}
`;
document.head.appendChild(style);

const visible=section.querySelector('#lyricsMemoInput');
const count=section.querySelector('#lyricsCharCount');
const sectionButton=section.querySelector('#insertLyricsSectionBtn');
const copyButton=section.querySelector('#copyLyricsBtn');
let syncing=false;

const updateCount=()=>{count.textContent=`${visible.value.length.toLocaleString('ja-JP')}文字`};
const copyHiddenToVisible=()=>{
  if(syncing)return;
  syncing=true;
  if(visible.value!==hidden.value)visible.value=hidden.value||'';
  updateCount();
  syncing=false;
};
const copyVisibleToHidden=()=>{
  if(syncing)return;
  syncing=true;
  hidden.value=visible.value;
  hidden.dispatchEvent(new Event('input',{bubbles:true}));
  updateCount();
  syncing=false;
};

visible.addEventListener('input',copyVisibleToHidden);
hidden.addEventListener('input',copyHiddenToVisible);

sectionButton.addEventListener('click',()=>{
  const labels=['【Aメロ】','【Bメロ】','【サビ】','【Cメロ】','【イントロ】','【アウトロ】'];
  const current=visible.value;
  const next=labels.find(label=>!current.includes(label))||'【歌詞メモ】';
  const insert=`${current.trim()? '\n\n':''}${next}\n`;
  const start=visible.selectionStart;
  const end=visible.selectionEnd;
  visible.setRangeText(insert,start,end,'end');
  visible.focus();
  copyVisibleToHidden();
});

copyButton.addEventListener('click',async()=>{
  try{
    await navigator.clipboard.writeText(visible.value);
    const before=copyButton.textContent;
    copyButton.textContent='コピー済み ✓';
    setTimeout(()=>copyButton.textContent=before,1400);
  }catch{
    visible.select();
    document.execCommand('copy');
  }
});

const observer=new MutationObserver(()=>{
  if(document.getElementById('editorView')?.classList.contains('active')){
    queueMicrotask(copyHiddenToVisible);
  }
});
observer.observe(document.getElementById('editorView'),{attributes:true,attributeFilter:['class']});
copyHiddenToVisible();
})();
