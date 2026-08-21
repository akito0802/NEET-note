(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const NS='http://www.w3.org/2000/svg';
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const noteRe=/^([A-Ga-g])([#b♯♭]?)(-?\d)$/;
const letterIndex={C:0,D:1,E:2,F:3,G:4,A:5,B:6};
const accidentalText=a=>a==='#'||a==='♯'?'♯':a==='b'||a==='♭'?'♭':'';
function parseNote(n){const m=String(n).match(noteRe);if(!m)return null;return{letter:m[1].toUpperCase(),acc:m[2],oct:+m[3],raw:n}}
function dia(n){const p=parseNote(n);return p?p.oct*7+letterIndex[p.letter]:0}
function yFor(n){const ref=4*7+letterIndex.E;return 92-(dia(n)-ref)*6.5}
function ledgerYs(y){const out=[];if(y>98){for(let ly=105;ly<=y+1;ly+=13)out.push(ly)}else if(y<34){for(let ly=27;ly>=y-1;ly-=13)out.push(ly)}return out}
function scoreSvg(groups,{melody=false,aria='譜例'}={}){
  const W=720,H=174,left=84,right=24,top=40,gap=13;
  const svg=document.createElementNS(NS,'svg');svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.setAttribute('role','img');svg.setAttribute('aria-label',aria);svg.classList.add('tlo-score');
  const line=(x1,y1,x2,y2,cls='staff')=>{const e=document.createElementNS(NS,'line');for(const[k,v]of Object.entries({x1,y1,x2,y2}))e.setAttribute(k,v);e.setAttribute('class',cls);svg.append(e)};
  const text=(x,y,t,cls='label',anchor='middle')=>{const e=document.createElementNS(NS,'text');e.setAttribute('x',x);e.setAttribute('y',y);e.setAttribute('class',cls);e.setAttribute('text-anchor',anchor);e.textContent=t;svg.append(e)};
  for(let i=0;i<5;i++)line(left,top+i*gap,W-right,top+i*gap);
  text(43,82,'𝄞','clef');
  const step=(W-left-right-48)/Math.max(1,groups.length);
  groups.forEach((g,i)=>{
    const x=left+30+step*(i+.5);
    const notes=(g.notes||[]).filter(parseNote).sort((a,b)=>dia(a)-dia(b));
    const ys=notes.map(yFor);
    const offsets=[];
    for(let j=0;j<notes.length;j++)offsets[j]=j>0&&Math.abs(dia(notes[j])-dia(notes[j-1]))===1?(offsets[j-1]===0?7:0):0;
    notes.forEach((n,j)=>{
      const y=ys[j],xo=x+offsets[j];
      ledgerYs(y).forEach(ly=>line(xo-12,ly,xo+12,ly,'ledger'));
      const p=parseNote(n);const acc=accidentalText(p.acc);if(acc)text(xo-18,y+6,acc,'accidental','middle');
      const e=document.createElementNS(NS,'ellipse');e.setAttribute('cx',xo);e.setAttribute('cy',y);e.setAttribute('rx','7.4');e.setAttribute('ry','5.2');e.setAttribute('transform',`rotate(-18 ${xo} ${y})`);e.setAttribute('class',notes.length>1?'notehead whole':'notehead');svg.append(e);
      if(notes.length===1&&melody){const up=y>=66;line(xo+(up?6:-6),y,xo+(up?6:-6),y+(up?-32:32),'stem')}
    });
    if(g.label)text(x,136,g.label,'label');
    if(i<groups.length-1)line(x+step/2,34,x+step/2,112,'bar');
  });
  return svg;
}
function visualShell(title,caption,body,type='score'){
  const root=document.createElement('section');root.className='tlo-visual';root.innerHTML=`<div class="tlo-visual-head"><b>${esc(title)}</b><small>${esc(caption)}</small></div><div class="${type==='score'?'tlo-score-wrap':'tlo-diagram-wrap'}"></div>`;root.lastElementChild.append(body);return root
}
function diagram(rows){const d=document.createElement('div');d.className='tlo-diagram';rows.forEach(r=>{const row=document.createElement('div');row.className='tlo-diagram-row';row.innerHTML=`<span class="tlo-diagram-label">${esc(r.label||'')}</span>`;(r.cells||[]).forEach((c,i)=>{const cell=document.createElement('span');cell.className='tlo-diagram-cell';cell.textContent=c;row.append(cell);if(i<r.cells.length-1){const a=document.createElement('span');a.className='tlo-diagram-arrow';a.textContent=r.arrow===false?'':'→';row.append(a)}});d.append(row)});return d}
function envelope(){const s=document.createElementNS(NS,'svg');s.setAttribute('viewBox','0 0 700 170');s.classList.add('tlo-envelope');s.setAttribute('role','img');s.setAttribute('aria-label','音色のエンベロープ図');const pts='45,130 125,35 245,72 455,72 625,130';const p=document.createElementNS(NS,'polyline');p.setAttribute('points',pts);p.setAttribute('fill','none');p.setAttribute('stroke','#7b6545');p.setAttribute('stroke-width','3');s.append(p);[['Attack',85,154],['Decay',185,154],['Sustain',350,154],['Release',540,154]].forEach(([t,x,y])=>{const e=document.createElementNS(NS,'text');e.setAttribute('x',x);e.setAttribute('y',y);e.setAttribute('text-anchor','middle');e.setAttribute('font-size','12');e.setAttribute('fill','#746d63');e.textContent=t;s.append(e)});return s}
function currentChapter(){const u=new URL(location.href);const q=Number(u.searchParams.get('chapter'));if(q)return q;const visible=$$('[id$="Chapter"],#tbChapter').find(x=>!x.hidden);const m=visible?.textContent?.match(/第\s*(\d+)\s*編/);if(m)return +m[1];const ids={tbMelodyReader:17,tbArrangementReader:18,tbSoundReader:19,tbTuningReader:20,tbStyleHistoryReader:21};const vr=$$('[id$="Reader"]').find(x=>!x.hidden);return ids[vr?.id]||0}
function currentTitle(){const heads=['#tbReaderHead h2','#tbMelodyReaderHead h2','#tbArrangementReaderHead h2','#tbSoundReaderHead h2','#tbTuningReaderHead h2','#tbStyleHistoryReaderHead h2'];for(const s of heads){const e=$(s);if(e&&e.offsetParent!==null)return e.textContent.trim()}return document.title.split('|')[0].trim()}
function pitched(ch,title){
  if(/音程|長3度/.test(title))return {groups:[{notes:['C4'],label:'C4'},{notes:['E4'],label:'E4'}],melody:true,cap:'長3度の実音位置'};
  if(/短3度/.test(title))return {groups:[{notes:['C4'],label:'C4'},{notes:['Eb4'],label:'E♭4'}],melody:true,cap:'短3度の実音位置'};
  if(/長音階|メジャー.*スケール|major scale/i.test(title))return {groups:['C4','D4','E4','F4','G4','A4','B4','C5'].map(n=>({notes:[n],label:n.replace(/4|5/,'')})),melody:true,cap:'C major scale'};
  if(/短音階|マイナー.*スケール|minor scale/i.test(title))return {groups:['A3','B3','C4','D4','E4','F4','G4','A4'].map(n=>({notes:[n],label:n.replace(/3|4/, '')})),melody:true,cap:'A natural minor'};
  const map={
    1:{groups:['C4','D4','E4','F4','G4','A4','B4','C5'].map(n=>({notes:[n],label:n.replace(/4|5/,'')})),melody:true,cap:'C major scale'},
    2:{groups:[{notes:['G4','B4','D5','F5'],label:'G7'},{notes:['C4','E4','G4','B4'],label:'Cmaj7'}],cap:'V7 → Imaj7'},
    3:{groups:[{notes:['E4','G#4','B4','D5'],label:'E7'},{notes:['A3','C4','E4'],label:'Am'}],cap:'V7 → i'},
    4:{groups:[{notes:['C4','E4','G4','B4','D5'],label:'Cmaj9'}],cap:'7th + 9th'},
    5:{groups:[{notes:['A3','C#4','E4','G4'],label:'A7'},{notes:['D4','F4','A4'],label:'Dm'}],cap:'V/ii → ii'},
    6:{groups:[{notes:['C4','E4','G4'],label:'C'},{notes:['F4','Ab4','C5'],label:'Fm'},{notes:['C4','E4','G4'],label:'C'}],cap:'I → iv → I'},
    7:{groups:[{notes:['Db4','F4','Ab4','Cb5'],label:'D♭7'},{notes:['C4','E4','G4'],label:'C'}],cap:'subV7 → I'},
    8:{groups:[{notes:['B3','D4','F4','Ab4'],label:'Bdim7'},{notes:['C4','E4','G4'],label:'C'}],cap:'vii°7 → I'},
    9:{groups:[{notes:['C4','E4','G4'],label:'C'},{notes:['Db4','F4','Ab4'],label:'D♭'}],cap:'direct modulation example'},
    10:{groups:['C4','D4','E4','F4','G4','A4','B4','C5'].map(n=>({notes:[n],label:n.replace(/4|5/,'')})),melody:true,cap:'Cmaj7上の基本音列'},
    12:{groups:[{notes:['C3','D4','F#4','A4'],label:'D/C'}],cap:'bass + upper triad'},
    17:{groups:['C4','D4','E4','G4','E4','D4','C4'].map(n=>({notes:[n],label:''})),melody:true,cap:'旋律輪郭の例'}
  };
  return map[ch]||null
}
function build(ch,title){const p=pitched(ch,title);if(p){return visualShell('譜例',p.cap,scoreSvg(p.groups,{melody:p.melody,aria:`${title}の譜例`}),'score')}
  if(ch===13)return visualShell('リズム図','4/4の拍と8分細分',diagram([{label:'拍',cells:['1','2','3','4'],arrow:false},{label:'8分',cells:['1 &','2 &','3 &','4 &'],arrow:false}]),'diagram');
  if(ch===14)return visualShell('拍子図','5/4の代表的グルーピング',diagram([{label:'3 + 2',cells:['● ● ●','● ●'],arrow:false},{label:'2 + 3',cells:['● ●','● ● ●'],arrow:false}]),'diagram');
  if(ch===15)return visualShell('テクスチュア図','声部同士の関係を可視化',diagram([{label:'Melody',cells:['A','A′','B'],arrow:false},{label:'Inner',cells:['—','counter','—'],arrow:false},{label:'Bass',cells:['root','motion','cadence'],arrow:false}]),'diagram');
  if(ch===16)return visualShell('形式図','反復と対比の例',diagram([{label:'Form',cells:['A','A','B','A′'],arrow:true}]),'diagram');
  if(ch===18)return visualShell('アレンジ図','役割と密度の時間変化',diagram([{label:'Vocal',cells:['lead','lead','lead'],arrow:false},{label:'Harmony',cells:['thin','medium','wide'],arrow:false},{label:'Rhythm',cells:['light','build','full'],arrow:false}]),'diagram');
  if(ch===19)return visualShell('音色図','ADSRエンベロープ',envelope(),'diagram');
  if(ch===20)return visualShell('音律図','純正比と12平均律を混同しない',diagram([{label:'完全5度',cells:['3:2','≈ 702 cents'],arrow:true},{label:'長3度',cells:['5:4','≈ 386 cents'],arrow:true},{label:'12平均律',cells:['100 cents × 12'],arrow:false}]),'diagram');
  if(ch===21)return visualShell('理論史図','時代・ジャンルで説明モデルが変わる',diagram([{label:'流れ',cells:['Tonal','Jazz','Pop / Contemporary'],arrow:true}]),'diagram');
  if(ch===11)return visualShell('構造図','ペダル音と上部構造の分離',diagram([{label:'Upper',cells:['triad A','triad B','triad C'],arrow:true},{label:'Pedal',cells:['C','C','C'],arrow:false}]),'diagram');
  return visualShell('図解','この項目は五線譜より構造図で確認',diagram([{label:'Theory',cells:['聴く','分析','試す'],arrow:true}]),'diagram')
}
function fixBox(box){if(!box)return;const ch=currentChapter(),title=currentTitle(),key=`${ch}:${title}`;if(box.dataset.notationV2===key)return;box.dataset.notationV2=key;const v=build(ch,title);box.replaceChildren(v)}
function scan(){for(const box of $$('.tlo-svg'))fixBox(box)}
const obs=new MutationObserver(scan);
function start(){scan();const target=$('#textbookLibrary')||document.body;obs.observe(target,{subtree:true,childList:true});addEventListener('popstate',()=>setTimeout(scan,60));document.addEventListener('click',e=>{if(e.target.closest('.tb-row,.tb-result,.tb-cat'))setTimeout(scan,80)},true)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
