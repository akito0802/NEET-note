(()=>{
'use strict';
if(window.__NEET_THEORY_NOTATION_V3__)return;
window.__NEET_THEORY_NOTATION_V3__=true;

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const NS='http://www.w3.org/2000/svg';
const LETTERS=['C','D','E','F','G','A','B'];
const LETTER_PC={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
const ACC_PC={'':0,'#':1,'♯':1,'b':-1,'♭':-1,'##':2,'bb':-2,'𝄪':2,'𝄫':-2};
const ACC_GLYPH={'#':'♯','♯':'♯','b':'♭','♭':'♭','##':'𝄪','bb':'𝄫','𝄪':'𝄪','𝄫':'𝄫','':''};
const NOTE_RE=/^([A-Ga-g])(bb|##|[b#♭♯𝄪𝄫]?)(-?\d)$/;
const ROOT_RE=/^([A-Ga-g])(bb|##|[b#♭♯𝄪𝄫]?)$/;

const QUALITY={
  maj:{semi:[0,4,7],dia:[0,2,4]},
  min:{semi:[0,3,7],dia:[0,2,4]},
  '7':{semi:[0,4,7,10],dia:[0,2,4,6]},
  maj7:{semi:[0,4,7,11],dia:[0,2,4,6]},
  m7:{semi:[0,3,7,10],dia:[0,2,4,6]},
  dim:{semi:[0,3,6],dia:[0,2,4]},
  dim7:{semi:[0,3,6,9],dia:[0,2,4,6]},
  m7b5:{semi:[0,3,6,10],dia:[0,2,4,6]},
  sus4:{semi:[0,5,7],dia:[0,3,4]},
  '6':{semi:[0,4,7,9],dia:[0,2,4,5]},
  m6:{semi:[0,3,7,9],dia:[0,2,4,5]},
  '9':{semi:[0,4,7,10,14],dia:[0,2,4,6,8]},
  maj9:{semi:[0,4,7,11,14],dia:[0,2,4,6,8]},
  m9:{semi:[0,3,7,10,14],dia:[0,2,4,6,8]},
  '7b9':{semi:[0,4,7,10,13],dia:[0,2,4,6,8]},
  '7#9':{semi:[0,4,7,10,15],dia:[0,2,4,6,8]},
  '13':{semi:[0,4,7,10,14,21],dia:[0,2,4,6,8,12]}
};

const mod=(n,m)=>((n%m)+m)%m;
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

function parseNote(note){
  const m=String(note).trim().match(NOTE_RE);
  if(!m)return null;
  const letter=m[1].toUpperCase(),acc=m[2]||'',oct=Number(m[3]);
  const pc=mod(LETTER_PC[letter]+(ACC_PC[acc]||0),12);
  const midi=(oct+1)*12+pc;
  const dia=oct*7+LETTERS.indexOf(letter);
  return{letter,acc,oct,pc,midi,dia,raw:note};
}

function parseRoot(root){
  const m=String(root).trim().match(ROOT_RE);
  if(!m)return null;
  const letter=m[1].toUpperCase(),acc=m[2]||'';
  return{letter,acc,pc:mod(LETTER_PC[letter]+(ACC_PC[acc]||0),12),li:LETTERS.indexOf(letter)};
}

function accidentalFor(delta){
  const d=((delta+6)%12)-6;
  if(d===0)return'';
  if(d===1)return'#';
  if(d===2)return'##';
  if(d===-1)return'b';
  if(d===-2)return'bb';
  return d>0?'#':'b';
}

function spellChord({root,quality='maj',octave=4,inversion=0}){
  const r=parseRoot(root),q=QUALITY[quality];
  if(!r||!q)return[];
  let tones=q.semi.map((semi,i)=>({semi,dia:q.dia[i]}));
  const inv=Math.max(0,Math.min(Number(inversion)||0,tones.length-1));
  tones=tones.map((t,i)=>i<inv?{semi:t.semi+12,dia:t.dia+7}:t).sort((a,b)=>a.semi-b.semi);
  const rootMidi=(octave+1)*12+r.pc;
  const rootDia=octave*7+r.li;
  return tones.map(t=>{
    const targetMidi=rootMidi+t.semi;
    const absDia=rootDia+t.dia;
    const li=mod(absDia,7),letter=LETTERS[li],oct=Math.floor(absDia/7);
    const targetPc=mod(targetMidi,12);
    const naturalPc=LETTER_PC[letter];
    const acc=accidentalFor(mod(targetPc-naturalPc+6,12)-6);
    return `${letter}${acc}${oct}`;
  });
}

function chord(spec){
  return{
    notes:spec.notes||spellChord(spec),
    label:spec.label||`${spec.root||''}${spec.quality==='maj'?'':spec.quality||''}`,
    roman:spec.roman||'',
    sub:spec.sub||''
  };
}

function titleProgression(title,ch){
  const t=String(title||'');
  if(/セカンダリ|secondary/i.test(t))return{
    caption:'C major：I → V/ii → ii → V7 → I',
    groups:[
      chord({root:'C',quality:'maj',octave:4,label:'C',roman:'I'}),
      chord({root:'A',quality:'7',octave:3,label:'A7',roman:'V/ii',sub:'iiへ向かう属和音'}),
      chord({root:'D',quality:'min',octave:4,label:'Dm',roman:'ii'}),
      chord({root:'G',quality:'7',octave:3,label:'G7',roman:'V7'}),
      chord({root:'C',quality:'maj',octave:4,label:'C',roman:'I'})
    ]
  };
  if(/II.?V.?I|ツーファイブ|2.?5.?1/i.test(t))return{
    caption:'C major：ii7 → V7 → Imaj7',
    groups:[
      chord({root:'D',quality:'m7',octave:4,label:'Dm7',roman:'ii7'}),
      chord({root:'G',quality:'7',octave:3,label:'G7',roman:'V7'}),
      chord({root:'C',quality:'maj7',octave:4,label:'Cmaj7',roman:'Imaj7'})
    ]
  };
  if(/転回|inversion/i.test(t))return{
    caption:'C major：I⁶ → IV → V7 → I',
    groups:[
      chord({root:'C',quality:'maj',octave:3,inversion:1,label:'C/E',roman:'I⁶'}),
      chord({root:'F',quality:'maj',octave:3,label:'F',roman:'IV'}),
      chord({root:'G',quality:'7',octave:3,label:'G7',roman:'V7'}),
      chord({root:'C',quality:'maj',octave:4,label:'C',roman:'I'})
    ]
  };
  if(/テンション|9th|9度|maj9/i.test(t))return{
    caption:'Cmaj9：root・3rd・5th・7th・9th',
    groups:[chord({root:'C',quality:'maj9',octave:4,label:'Cmaj9',roman:'Imaj9'})]
  };
  if(/ディミニッシュ|dim7|減七/i.test(t))return{
    caption:'vii°7 → I',
    groups:[
      chord({root:'B',quality:'dim7',octave:3,label:'Bdim7',roman:'vii°7'}),
      chord({root:'C',quality:'maj',octave:4,label:'C',roman:'I'})
    ]
  };
  if(/トライトーン|subV|裏コード/i.test(t))return{
    caption:'subV7 → I',
    groups:[
      chord({root:'Db',quality:'7',octave:4,label:'D♭7',roman:'subV7'}),
      chord({root:'C',quality:'maj',octave:4,label:'C',roman:'I'})
    ]
  };
  if(/モーダル.*インターチェンジ|借用和音|modal interchange/i.test(t))return{
    caption:'I → iv → I',
    groups:[
      chord({root:'C',quality:'maj',octave:4,label:'C',roman:'I'}),
      chord({root:'F',quality:'min',octave:4,label:'Fm',roman:'iv'}),
      chord({root:'C',quality:'maj',octave:4,label:'C',roman:'I'})
    ]
  };
  if(/終止|cadence/i.test(t))return{
    caption:'V7 → I',
    groups:[
      chord({root:'G',quality:'7',octave:3,label:'G7',roman:'V7'}),
      chord({root:'C',quality:'maj',octave:4,label:'C',roman:'I'})
    ]
  };
  const fallback={
    2:{caption:'C major：I → IV → V7 → I',groups:[chord({root:'C',quality:'maj',octave:4,label:'C',roman:'I'}),chord({root:'F',quality:'maj',octave:3,label:'F',roman:'IV'}),chord({root:'G',quality:'7',octave:3,label:'G7',roman:'V7'}),chord({root:'C',quality:'maj',octave:4,label:'C',roman:'I'})]},
    3:{caption:'A minor：V7 → i',groups:[chord({root:'E',quality:'7',octave:4,label:'E7',roman:'V7'}),chord({root:'A',quality:'min',octave:3,label:'Am',roman:'i'})]},
    4:{caption:'Cmaj9',groups:[chord({root:'C',quality:'maj9',octave:4,label:'Cmaj9',roman:'Imaj9'})]},
    5:{caption:'C major：I → V/ii → ii → V7 → I',groups:[chord({root:'C',quality:'maj',octave:4,label:'C',roman:'I'}),chord({root:'A',quality:'7',octave:3,label:'A7',roman:'V/ii'}),chord({root:'D',quality:'min',octave:4,label:'Dm',roman:'ii'}),chord({root:'G',quality:'7',octave:3,label:'G7',roman:'V7'}),chord({root:'C',quality:'maj',octave:4,label:'C',roman:'I'})]},
    6:{caption:'I → iv → I',groups:[chord({root:'C',quality:'maj',octave:4,label:'C',roman:'I'}),chord({root:'F',quality:'min',octave:4,label:'Fm',roman:'iv'}),chord({root:'C',quality:'maj',octave:4,label:'C',roman:'I'})]},
    7:{caption:'subV7 → I',groups:[chord({root:'Db',quality:'7',octave:4,label:'D♭7',roman:'subV7'}),chord({root:'C',quality:'maj',octave:4,label:'C',roman:'I'})]},
    8:{caption:'vii°7 → I',groups:[chord({root:'B',quality:'dim7',octave:3,label:'Bdim7',roman:'vii°7'}),chord({root:'C',quality:'maj',octave:4,label:'C',roman:'I'})]},
    9:{caption:'C → D♭',groups:[chord({root:'C',quality:'maj',octave:4,label:'C',roman:'I'}),chord({root:'Db',quality:'maj',octave:4,label:'D♭',roman:'I（新調）'})]},
    10:{caption:'Cmaj7',groups:[chord({root:'C',quality:'maj7',octave:4,label:'Cmaj7',roman:'Imaj7'})]},
    12:{caption:'D/C',groups:[{notes:['C3','D4','F#4','A4'],label:'D/C',roman:'upper triad / bass'}]}
  };
  return fallback[ch]||null;
}

function noteY(note,staff){
  const p=parseNote(note);if(!p)return null;
  const e4=4*7+LETTERS.indexOf('E');
  return staff.bottom-(p.dia-e4)*(staff.gap/2);
}

function uniqueLedgerYs(notes,staff){
  const ys=new Set();
  for(const n of notes){
    const y=noteY(n,staff);if(y==null)continue;
    if(y>staff.bottom+staff.gap/2){
      for(let ly=staff.bottom+staff.gap;ly<=y+1;ly+=staff.gap)ys.add(ly);
    }else if(y<staff.top-staff.gap/2){
      for(let ly=staff.top-staff.gap;ly>=y-1;ly-=staff.gap)ys.add(ly);
    }
  }
  return[...ys].sort((a,b)=>a-b);
}

function headOffsets(notes,stemUp){
  const parsed=notes.map(parseNote);
  const out=new Array(notes.length).fill(0);
  let clusterStart=0;
  for(let i=1;i<=parsed.length;i++){
    const contiguous=i<parsed.length&&Math.abs(parsed[i].dia-parsed[i-1].dia)===1;
    if(contiguous)continue;
    const len=i-clusterStart;
    if(len>1){
      for(let j=clusterStart;j<i;j++){
        const parity=(j-clusterStart)%2;
        if(parity)out[j]=stemUp?-9:9;
      }
    }
    clusterStart=i;
  }
  return out;
}

function accidentalColumns(notes,ys){
  const items=[];
  notes.forEach((n,i)=>{const p=parseNote(n);if(p?.acc)items.push({i,y:ys[i],acc:p.acc})});
  items.sort((a,b)=>a.y-b.y);
  const cols=[];
  const assigned=new Map();
  for(const item of items){
    let col=0;
    while(true){
      const used=cols[col]||[];
      if(used.every(y=>Math.abs(y-item.y)>18))break;
      col++;
    }
    (cols[col]||(cols[col]=[])).push(item.y);
    assigned.set(item.i,col);
  }
  return assigned;
}

function addLine(svg,x1,y1,x2,y2,attrs={}){
  const e=document.createElementNS(NS,'line');
  Object.entries({x1,y1,x2,y2,...attrs}).forEach(([k,v])=>e.setAttribute(k,String(v)));
  svg.append(e);return e;
}
function addText(svg,x,y,text,attrs={}){
  const e=document.createElementNS(NS,'text');e.textContent=text;
  Object.entries({x,y,...attrs}).forEach(([k,v])=>e.setAttribute(k,String(v)));
  svg.append(e);return e;
}
function addEllipse(svg,cx,cy,rx,ry,attrs={}){
  const e=document.createElementNS(NS,'ellipse');
  Object.entries({cx,cy,rx,ry,...attrs}).forEach(([k,v])=>e.setAttribute(k,String(v)));
  svg.append(e);return e;
}

function renderChordScore(prog,{aria='和音譜例'}={}){
  const W=760,H=214;
  const staff={left:98,right:22,top:58,gap:13,bottom:58+13*4};
  const svg=document.createElementNS(NS,'svg');
  svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
  svg.setAttribute('role','img');
  svg.setAttribute('aria-label',aria);
  svg.setAttribute('preserveAspectRatio','xMidYMid meet');
  svg.classList.add('tlo-score','tlo-chord-score');
  svg.style.width='100%';svg.style.height='auto';svg.style.display='block';
  svg.style.overflow='visible';

  const bg=document.createElementNS(NS,'rect');
  bg.setAttribute('x','0');bg.setAttribute('y','0');bg.setAttribute('width',W);bg.setAttribute('height',H);
  bg.setAttribute('rx','12');bg.setAttribute('fill','#fffdfa');svg.append(bg);

  for(let i=0;i<5;i++)addLine(svg,staff.left,staff.top+i*staff.gap,W-staff.right,staff.top+i*staff.gap,{stroke:'#343434','stroke-width':'1.15'});
  addText(svg,38,105,'𝄞',{'font-size':'68','font-family':'Bravura, Noto Music, Apple Symbols, Segoe UI Symbol, serif',fill:'#1e2329','text-anchor':'middle'});
  addText(svg,76,78,'4',{'font-size':'22','font-family':'Georgia, serif','font-weight':'700',fill:'#1e2329','text-anchor':'middle'});
  addText(svg,76,103,'4',{'font-size':'22','font-family':'Georgia, serif','font-weight':'700',fill:'#1e2329','text-anchor':'middle'});

  const groups=prog.groups||[];
  const innerW=W-staff.left-staff.right;
  const measureW=innerW/Math.max(1,groups.length);
  groups.forEach((g,gi)=>{
    const x=staff.left+measureW*(gi+.5);
    const notes=(g.notes||[]).filter(parseNote).sort((a,b)=>parseNote(a).dia-parseNote(b).dia);
    const ys=notes.map(n=>noteY(n,staff));
    const avg=ys.reduce((s,v)=>s+v,0)/Math.max(1,ys.length);
    const mid=staff.top+2*staff.gap;
    const stemUp=avg>=mid;
    const offs=headOffsets(notes,stemUp);
    const accCols=accidentalColumns(notes,ys);

    addText(svg,x,25,g.label||'',{'font-size':'18','font-family':'system-ui, sans-serif','font-weight':'750',fill:'#20242a','text-anchor':'middle'});
    if(g.sub)addText(svg,x,43,g.sub,{'font-size':'9.5','font-family':'system-ui, sans-serif',fill:'#7a7066','text-anchor':'middle'});

    const ledgers=uniqueLedgerYs(notes,staff);
    const minOff=Math.min(0,...offs),maxOff=Math.max(0,...offs);
    ledgers.forEach(ly=>addLine(svg,x-15+minOff,ly,x+15+maxOff,ly,{stroke:'#343434','stroke-width':'1.2'}));

    notes.forEach((n,i)=>{
      const p=parseNote(n),y=ys[i],xo=x+offs[i];
      const col=accCols.get(i);
      if(col!=null){
        addText(svg,x-23-col*14,y+5,ACC_GLYPH[p.acc]||p.acc,{
          'font-size':'20','font-family':'Bravura, Noto Music, Apple Symbols, Segoe UI Symbol, serif',fill:'#20242a','text-anchor':'middle'
        });
      }
      addEllipse(svg,xo,y,8.3,5.7,{fill:'#fffdfa',stroke:'#20242a','stroke-width':'2','transform':`rotate(-18 ${xo} ${y})`});
    });

    if(g.roman)addText(svg,x,172,g.roman,{'font-size':'14','font-family':'Georgia, Times New Roman, serif',fill:'#343434','text-anchor':'middle'});

    const bx=staff.left+measureW*(gi+1);
    addLine(svg,bx,staff.top,bx,staff.bottom,{stroke:'#343434','stroke-width':gi===groups.length-1?'2.2':'1.15'});
    if(gi===groups.length-1)addLine(svg,bx-5,staff.top,bx-5,staff.bottom,{stroke:'#343434','stroke-width':'1.1'});
  });
  return svg;
}

function renderScale(notes,labels,aria){
  const W=760,H=190,staff={left:94,right:22,top:55,gap:13,bottom:107};
  const svg=document.createElementNS(NS,'svg');svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.setAttribute('role','img');svg.setAttribute('aria-label',aria);svg.classList.add('tlo-score');svg.style.width='100%';svg.style.height='auto';
  for(let i=0;i<5;i++)addLine(svg,staff.left,staff.top+i*staff.gap,W-staff.right,staff.top+i*staff.gap,{stroke:'#343434','stroke-width':'1.1'});
  addText(svg,38,102,'𝄞',{'font-size':'66','font-family':'Bravura, Noto Music, Apple Symbols, Segoe UI Symbol, serif',fill:'#20242a','text-anchor':'middle'});
  const step=(W-staff.left-staff.right-18)/Math.max(1,notes.length);
  notes.forEach((n,i)=>{
    const p=parseNote(n),x=staff.left+14+step*(i+.5),y=noteY(n,staff);
    uniqueLedgerYs([n],staff).forEach(ly=>addLine(svg,x-12,ly,x+12,ly,{stroke:'#343434','stroke-width':'1.1'}));
    if(p.acc)addText(svg,x-18,y+5,ACC_GLYPH[p.acc]||p.acc,{'font-size':'18','font-family':'Bravura, Noto Music, Apple Symbols, Segoe UI Symbol, serif',fill:'#20242a','text-anchor':'middle'});
    addEllipse(svg,x,y,7.3,5.1,{fill:'#20242a',stroke:'#20242a','stroke-width':'1','transform':`rotate(-18 ${x} ${y})`});
    const up=y>=staff.top+2*staff.gap;addLine(svg,x+(up?6:-6),y,x+(up?6:-6),y+(up?-30:30),{stroke:'#20242a','stroke-width':'1.5'});
    if(labels?.[i])addText(svg,x,155,labels[i],{'font-size':'11','font-family':'system-ui, sans-serif',fill:'#71695f','text-anchor':'middle'});
  });
  return svg;
}

function diagram(rows){
  const d=document.createElement('div');d.className='tlo-diagram';
  rows.forEach(r=>{const row=document.createElement('div');row.className='tlo-diagram-row';row.innerHTML=`<span class="tlo-diagram-label">${esc(r.label||'')}</span>`;(r.cells||[]).forEach((c,i)=>{const cell=document.createElement('span');cell.className='tlo-diagram-cell';cell.textContent=c;row.append(cell);if(i<r.cells.length-1){const a=document.createElement('span');a.className='tlo-diagram-arrow';a.textContent=r.arrow===false?'':'→';row.append(a)}});d.append(row)});return d;
}

function visualShell(title,caption,body,type='score'){
  const root=document.createElement('section');root.className='tlo-visual';
  root.innerHTML=`<div class="tlo-visual-head"><b>${esc(title)}</b><small>${esc(caption)}</small></div><div class="${type==='score'?'tlo-score-wrap':'tlo-diagram-wrap'}"></div>`;
  root.lastElementChild.append(body);return root;
}

function currentChapter(){
  const u=new URL(location.href),q=Number(u.searchParams.get('chapter'));if(q)return q;
  const visible=$$('[id$="Chapter"],#tbChapter').find(x=>!x.hidden);const m=visible?.textContent?.match(/第\s*(\d+)\s*編/);if(m)return+m[1];
  const ids={tbMelodyReader:17,tbArrangementReader:18,tbSoundReader:19,tbTuningReader:20,tbStyleHistoryReader:21};
  const vr=$$('[id$="Reader"]').find(x=>!x.hidden);return ids[vr?.id]||0;
}
function currentTitle(){
  const heads=['#tbReaderHead h2','#tbMelodyReaderHead h2','#tbArrangementReaderHead h2','#tbSoundReaderHead h2','#tbTuningReaderHead h2','#tbStyleHistoryReaderHead h2'];
  for(const s of heads){const e=$(s);if(e&&e.offsetParent!==null)return e.textContent.trim()}
  return document.title.split('|')[0].trim();
}

function build(ch,title){
  if(/音程|長3度/.test(title))return visualShell('譜例','長3度：C → E',renderScale(['C4','E4'],['C','E'],`${title}の譜例`));
  if(/短3度/.test(title))return visualShell('譜例','短3度：C → E♭',renderScale(['C4','Eb4'],['C','E♭'],`${title}の譜例`));
  if(/長音階|メジャー.*スケール|major scale/i.test(title)||ch===1)return visualShell('譜例','C major scale',renderScale(['C4','D4','E4','F4','G4','A4','B4','C5'],['C','D','E','F','G','A','B','C'],`${title}の譜例`));
  if(/短音階|マイナー.*スケール|minor scale/i.test(title))return visualShell('譜例','A natural minor',renderScale(['A3','B3','C4','D4','E4','F4','G4','A4'],['A','B','C','D','E','F','G','A'],`${title}の譜例`));

  const prog=titleProgression(title,ch);
  if(prog)return visualShell('和音譜例',prog.caption,renderChordScore(prog,{aria:`${title}の和音譜例`}));

  if(ch===13)return visualShell('リズム図','4/4の拍と8分細分',diagram([{label:'拍',cells:['1','2','3','4'],arrow:false},{label:'8分',cells:['1 &','2 &','3 &','4 &'],arrow:false}]),'diagram');
  if(ch===14)return visualShell('拍子図','5/4の代表的グルーピング',diagram([{label:'3 + 2',cells:['● ● ●','● ●'],arrow:false},{label:'2 + 3',cells:['● ●','● ● ●'],arrow:false}]),'diagram');
  if(ch===15)return visualShell('テクスチュア図','声部同士の関係を可視化',diagram([{label:'Melody',cells:['A','A′','B'],arrow:false},{label:'Inner',cells:['—','counter','—'],arrow:false},{label:'Bass',cells:['root','motion','cadence'],arrow:false}]),'diagram');
  if(ch===16)return visualShell('形式図','反復と対比の例',diagram([{label:'Form',cells:['A','A','B','A′'],arrow:true}]),'diagram');
  if(ch===18)return visualShell('アレンジ図','役割と密度の時間変化',diagram([{label:'Vocal',cells:['lead','lead','lead'],arrow:false},{label:'Harmony',cells:['thin','medium','wide'],arrow:false},{label:'Rhythm',cells:['light','build','full'],arrow:false}]),'diagram');
  if(ch===20)return visualShell('音律図','純正比と12平均律を混同しない',diagram([{label:'完全5度',cells:['3:2','≈ 702 cents'],arrow:true},{label:'長3度',cells:['5:4','≈ 386 cents'],arrow:true},{label:'12平均律',cells:['100 cents × 12'],arrow:false}]),'diagram');
  if(ch===21)return visualShell('理論史図','時代・ジャンルで説明モデルが変わる',diagram([{label:'流れ',cells:['Tonal','Jazz','Pop / Contemporary'],arrow:true}]),'diagram');
  return visualShell('図解','この項目は五線譜より構造図で確認',diagram([{label:'Theory',cells:['聴く','分析','試す'],arrow:true}]),'diagram');
}

function injectStyle(){
  if($('#tloNotationV3Style'))return;
  const s=document.createElement('style');s.id='tloNotationV3Style';s.textContent=`
.tlo-score-wrap{width:100%;max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}
.tlo-score{min-width:560px}
.tlo-chord-score{min-width:620px}
.tlo-visual-head{display:flex;align-items:baseline;justify-content:space-between;gap:10px;margin-bottom:8px}
.tlo-visual-head small{color:#71695f;font-size:.72rem;text-align:right}
@media(max-width:640px){.tlo-score{min-width:520px}.tlo-chord-score{min-width:600px}.tlo-visual-head{display:block}.tlo-visual-head small{display:block;margin-top:3px;text-align:left}}
`;
  document.head.append(s);
}

function fixBox(box){
  if(!box)return;const ch=currentChapter(),title=currentTitle(),key=`${ch}:${title}`;
  if(box.dataset.notationV3===key)return;
  box.dataset.notationV3=key;
  box.replaceChildren(build(ch,title));
}
function scan(){injectStyle();$$('.tlo-svg').forEach(fixBox)}
let timer=0;
function schedule(){clearTimeout(timer);timer=setTimeout(scan,25)}
function start(){
  scan();const target=$('#textbookLibrary')||document.body;
  new MutationObserver(schedule).observe(target,{subtree:true,childList:true});
  addEventListener('popstate',()=>setTimeout(scan,60));
  document.addEventListener('click',e=>{if(e.target.closest('.tb-row,.tb-result,.tb-cat'))setTimeout(scan,80)},true);
}
window.NEET_THEORY_NOTATION_V3_API=Object.freeze({spellChord});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
