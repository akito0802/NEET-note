(()=>{
'use strict';
if(window.__NEET_CHORD_INPUT_HOTFIX__)return;
window.__NEET_CHORD_INPUT_HOTFIX__=true;

const NOTE_PATH_RE=/\/NEET-note\/(?:index\.html)?$/;
if(!NOTE_PATH_RE.test(location.pathname))return;
const params=new URLSearchParams(location.search);
if(params.get('mode')!=='note'&&!params.has('song'))return;

function install(){
  const area=document.getElementById('chordsInput');
  const picker=document.querySelector('.chord-section .chord-picker');
  const addButton=document.getElementById('addChordBtn');
  if(!area||!picker)return false;

  const makeEditable=()=>{
    area.disabled=false;
    area.readOnly=false;
    area.removeAttribute('disabled');
    area.removeAttribute('readonly');
    area.setAttribute('inputmode','text');
    area.setAttribute('autocomplete','off');
    area.setAttribute('autocapitalize','characters');
    area.setAttribute('spellcheck','false');
    area.style.setProperty('pointer-events','auto','important');
    area.style.setProperty('touch-action','auto','important');
    area.style.setProperty('-webkit-user-select','text','important');
    area.style.setProperty('user-select','text','important');
    area.style.setProperty('position','relative','important');
    area.style.setProperty('z-index','3','important');
    if(!area.placeholder)area.placeholder='文章を書いて、コードを置きたい位置にカーソルを合わせてね。';
  };
  makeEditable();

  const normalize=value=>String(value||'').trim().replace(/[♯＃]/g,'#').replace(/♭/g,'b').replace(/／/g,'/').replace(/　/g,' ');
  const displayWidth=text=>Array.from(text).reduce((width,char)=>{
    const code=char.codePointAt(0);
    const wide=code>=0x1100&&(code<=0x115f||code===0x2329||code===0x232a||(code>=0x2e80&&code<=0xa4cf)||(code>=0xac00&&code<=0xd7a3)||(code>=0xf900&&code<=0xfaff)||(code>=0xfe10&&code<=0xfe19)||(code>=0xfe30&&code<=0xfe6f)||(code>=0xff00&&code<=0xff60)||(code>=0xffe0&&code<=0xffe6));
    return width+(wide?2:1);
  },0);
  const looksLikeChordLine=line=>line.trim()===''||/^[\sA-Ga-g#b0-9Mmajinsudg()+/♭♯°øΔ-]+$/.test(line);
  const notify=()=>{
    area.dispatchEvent(new Event('input',{bubbles:true}));
    area.dispatchEvent(new Event('change',{bubbles:true}));
  };

  let lastCaret=Number.isInteger(area.selectionStart)?area.selectionStart:0;
  const rememberCaret=()=>{
    if(Number.isInteger(area.selectionStart))lastCaret=area.selectionStart;
  };
  ['focus','click','keyup','input','select','touchend','pointerup'].forEach(type=>area.addEventListener(type,rememberCaret,{passive:type==='touchend'||type==='pointerup'}));

  const selectedChord=()=>{
    const root=document.getElementById('chordRootSelect')?.value||'';
    const type=document.getElementById('chordTypeSelect')?.value||'';
    const bass=document.getElementById('chordBassSelect')?.value||'';
    return root?`${root}${type}${bass?`/${bass}`:''}`:'';
  };

  const placeAbove=rawChord=>{
    const chord=normalize(rawChord);
    if(!chord)return;
    makeEditable();

    const value=area.value;
    let cursor=Number.isInteger(lastCaret)?lastCaret:(Number.isInteger(area.selectionStart)?area.selectionStart:value.length);
    cursor=Math.max(0,Math.min(cursor,value.length));

    const lineStart=value.lastIndexOf('\n',Math.max(0,cursor-1))+1;
    const lineEndIndex=value.indexOf('\n',cursor);
    const lineEnd=lineEndIndex===-1?value.length:lineEndIndex;
    const textLine=value.slice(lineStart,lineEnd);
    const cursorInLine=Math.max(0,Math.min(cursor-lineStart,textLine.length));
    const targetColumn=displayWidth(textLine.slice(0,cursorInLine));

    const previousLineEnd=Math.max(0,lineStart-1);
    const previousLineStart=value.lastIndexOf('\n',Math.max(0,previousLineEnd-1))+1;
    const previousLine=lineStart>0?value.slice(previousLineStart,previousLineEnd):'';
    const hasChordLine=lineStart>0&&looksLikeChordLine(previousLine);

    let newValue;
    let newCaret;
    if(hasChordLine){
      let chordLine=previousLine;
      if(chordLine.length<targetColumn)chordLine=chordLine.padEnd(targetColumn,' ');
      const prefix=chordLine.slice(0,targetColumn);
      const replaceEnd=targetColumn+chord.length;
      const suffix=chordLine.length>replaceEnd?chordLine.slice(replaceEnd):'';
      const updated=prefix+chord+suffix;
      newValue=value.slice(0,previousLineStart)+updated+value.slice(previousLineEnd);
      newCaret=cursor+(updated.length-previousLine.length);
    }else{
      const chordLine=' '.repeat(targetColumn)+chord;
      newValue=value.slice(0,lineStart)+chordLine+'\n'+value.slice(lineStart);
      newCaret=cursor+chordLine.length+1;
    }

    area.value=newValue;
    lastCaret=Math.max(0,Math.min(newCaret,newValue.length));
    notify();
    area.focus({preventScroll:true});
    area.setSelectionRange(lastCaret,lastCaret);
  };

  if(addButton&&!addButton.dataset.neetChordAbovePatched){
    addButton.dataset.neetChordAbovePatched='1';
    addButton.textContent='＋ 上に配置';
    addButton.setAttribute('aria-label','選択中のコードを文章の1行上へ配置');
    addButton.addEventListener('pointerdown',()=>rememberCaret(),true);
    addButton.addEventListener('touchstart',()=>rememberCaret(),{capture:true,passive:true});
    addButton.addEventListener('click',event=>{
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      const chord=selectedChord();
      if(chord)placeAbove(chord);
    },true);
  }

  if(!document.getElementById('neetChordHotfixStyle')){
    const style=document.createElement('style');
    style.id='neetChordHotfixStyle';
    style.textContent=`
      .chord-section{position:relative!important;isolation:isolate}
      #chordsInput{min-height:220px!important;background:#fff!important;color:#1d1d1f!important;caret-color:#007aff!important;pointer-events:auto!important;-webkit-user-select:text!important;user-select:text!important;touch-action:auto!important}
      .neet-direct-chord{position:relative;z-index:4;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;margin:0 0 10px}
      .neet-direct-chord input{width:100%;min-width:0;min-height:46px;padding:11px 12px;border:1px solid var(--border,#e5e5ea);border-radius:10px;background:#fff;color:#1d1d1f;font:inherit;font-size:16px;pointer-events:auto!important;-webkit-user-select:text!important;user-select:text!important}
      .neet-direct-chord button{min-height:46px;padding:10px 14px;border:0;border-radius:10px;background:var(--accent,#007aff);color:#fff;font:inherit;font-weight:800}
      .neet-chord-input-note{position:relative;z-index:4;display:block;margin:-2px 0 8px;color:var(--muted,#6e6e73);font-size:.76rem;line-height:1.5}
      @media(max-width:560px){.neet-direct-chord{grid-template-columns:1fr}.neet-direct-chord button{width:100%}}
    `;
    document.head.appendChild(style);
  }

  const oldNote=document.querySelector('.neet-chord-input-note');
  if(oldNote)oldNote.textContent='文章内の置きたい位置にカーソルを合わせて「＋ 上に配置」を押すと、その位置の1行上にコードが入るよ。';

  if(!document.getElementById('neetDirectChordInput')){
    const note=document.createElement('small');
    note.className='neet-chord-input-note';
    note.textContent='文章内の置きたい位置にカーソルを合わせて「＋ 上に配置」を押すと、その位置の1行上にコードが入るよ。';

    const row=document.createElement('div');
    row.className='neet-direct-chord';
    row.innerHTML='<input id="neetDirectChordInput" type="text" inputmode="text" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="直接コード入力：C / Am / F#m7 / G7/B"><button id="neetInsertChordBtn" type="button">上に配置</button>';
    picker.insertAdjacentElement('afterend',note);
    note.insertAdjacentElement('afterend',row);

    const input=row.querySelector('#neetDirectChordInput');
    const button=row.querySelector('#neetInsertChordBtn');
    const insert=()=>{
      const text=normalize(input.value);
      if(!text){input.focus();return}
      placeAbove(text);
      input.value='';
    };
    button.addEventListener('click',insert);
    input.addEventListener('keydown',e=>{
      if(e.key!=='Enter'||e.isComposing)return;
      e.preventDefault();
      insert();
    });
  }else{
    const directButton=document.getElementById('neetInsertChordBtn');
    if(directButton)directButton.textContent='上に配置';
  }

  const observer=new MutationObserver(()=>makeEditable());
  observer.observe(area,{attributes:true,attributeFilter:['readonly','disabled','style','class']});
  return true;
}

if(!install()){
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});
  let tries=0;
  const timer=setInterval(()=>{
    tries+=1;
    if(install()||tries>20)clearInterval(timer);
  },250);
}
})();
