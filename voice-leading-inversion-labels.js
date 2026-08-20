(()=>{
'use strict';
const T=window.NEETTheory;
if(!T)return;

function pcOfNote(note){return T.pc(note)}
function unique(arr){return [...new Set(arr)]}
function originalChordFromButton(btn){
  if(btn.dataset.originalChord)return btn.dataset.originalChord;
  const text=(btn.firstChild&&btn.firstChild.nodeType===Node.TEXT_NODE?btn.firstChild.nodeValue:'').trim()||btn.textContent.replace(/鳴らす/g,'').trim();
  btn.dataset.originalChord=text;
  return text;
}
function inversionInfo(raw,bassNote){
  const ch=T.parseChord(raw);
  if(!ch)return{name:raw,kind:''};
  const bassPc=pcOfNote(bassNote);
  if(bassPc==null)return{name:raw,kind:''};
  const rootPc=((ch.rootPc%12)+12)%12;
  const base=(ch.raw||raw).split('/')[0];
  if(bassPc===rootPc)return{name:base,kind:'基本形'};
  const pcs=unique(ch.pcs.map(p=>((p%12)+12)%12));
  const idx=pcs.indexOf(bassPc);
  const prefer=/b|♭/.test(raw)?'flat':'sharp';
  const bass=T.noteName(bassPc,prefer);
  const name=`${base}/${bass}`;
  if(idx===1)return{name,kind:'第1転回形'};
  if(idx===2)return{name,kind:'第2転回形'};
  if(idx===3)return{name,kind:'第3転回形'};
  if(idx>3)return{name,kind:'オンコード'};
  return{name,kind:'オンコード'};
}
function decorate(){
  const chordButtons=[...document.querySelectorAll('.vl-chord-row button[data-play-chord]')];
  const voiceRows=[...document.querySelectorAll('.vl-voice-row')];
  if(!chordButtons.length||voiceRows.length<4)return;
  const bassRow=voiceRows.find(r=>(r.querySelector('b')?.textContent||'').trim()==='Bass')||voiceRows[voiceRows.length-1];
  const bassCells=[...bassRow.querySelectorAll(':scope > span')];
  const labels=[];

  chordButtons.forEach((btn,i)=>{
    const raw=originalChordFromButton(btn);
    const bassNote=bassCells[i]?.querySelector('strong')?.textContent?.trim();
    const info=inversionInfo(raw,bassNote);
    labels.push(info);
    let small=btn.querySelector('small');
    btn.childNodes.forEach(n=>{if(n.nodeType===Node.TEXT_NODE)n.nodeValue=''});
    let strong=btn.querySelector('.vl-inversion-name');
    if(!strong){strong=document.createElement('strong');strong.className='vl-inversion-name';btn.insertBefore(strong,small||btn.firstChild)}
    strong.textContent=info.name;
    if(!small){small=document.createElement('small');btn.appendChild(small)}
    small.textContent=info.kind==='基本形'?'基本形 · 鳴らす':`${info.kind} · 鳴らす`;
    btn.title=info.kind==='基本形'?`${info.name}（基本形）`:`${info.name}（${info.kind}）`;
  });

  document.querySelectorAll('.vl-keyboard-card').forEach((card,i)=>{
    const b=card.querySelector('button b');
    const small=card.querySelector('button small');
    if(!b||!labels[i])return;
    b.textContent=labels[i].name;
    if(small){
      const notes=small.dataset.notes||small.textContent;
      small.dataset.notes=notes;
      small.textContent=`${labels[i].kind} ｜ ${notes}`;
    }
  });

  document.querySelectorAll('.vl-check-card').forEach((card,i)=>{
    const b=card.querySelector('header b');
    if(!b||!labels[i]||!labels[i+1])return;
    b.textContent=`${labels[i].name} → ${labels[i+1].name}`;
  });
}
function schedule(){setTimeout(decorate,0)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',decorate,{once:true});else decorate();
document.addEventListener('click',e=>{
  if(e.target.closest('#analyze,[data-candidate],[data-progression],[data-mode]'))schedule();
},true);
document.addEventListener('change',e=>{
  if(e.target.closest('#commonFixed,#rootBass,#avoidParallels,#analysisKey'))schedule();
},true);
document.addEventListener('keydown',e=>{
  if((e.metaKey||e.ctrlKey)&&e.key==='Enter')schedule();
},true);
})();