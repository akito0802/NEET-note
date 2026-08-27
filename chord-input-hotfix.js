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
  const looksLikeChordLine=line=>line.trim()===''||/^[\sA-Ga-g#b0-9Mmajinsudg()+/♭♯°øΔ-]+$/.test(line);
  const notify=()=>{
    area.dispatchEvent(new Event('input',{bubbles:true}));
    area.dispatchEvent(new Event('change',{bubbles:true}));
  };

  let lastCaret=Number.isInteger(area.selectionStart)?area.selectionStart:0;
  const rememberCaret=()=>{
    if(Number.isInteger(area.selectionStart))lastCaret=area.selectionStart;
  };
  ['focus','click','keyup','input','select','beforeinput','touchend','pointerup','blur'].forEach(type=>{
    area.addEventListener(type,rememberCaret,{passive:type==='touchend'||type==='pointerup'});
  });
  document.addEventListener('selectionchange',()=>{
    if(document.activeElement===area)rememberCaret();
  });

  const selectedChord=()=>{
    const root=document.getElementById('chordRootSelect')?.value||'';
    const type=document.getElementById('chordTypeSelect')?.value||'';
    const bass=document.getElementById('chordBassSelect')?.value||'';
    return root?`${root}${type}${bass?`/${bass}`:''}`:'';
  };

  let measureCanvas;
  const renderedSpaceCount=text=>{
    try{
      measureCanvas=measureCanvas||document.createElement('canvas');
      const ctx=measureCanvas.getContext('2d');
      if(!ctx)return Array.from(text).length;
      const style=getComputedStyle(area);
      ctx.font=[style.fontStyle,style.fontVariant,style.fontWeight,style.fontSize,style.fontFamily].filter(Boolean).join(' ');
      const letterSpacing=parseFloat(style.letterSpacing)||0;
      const expanded=String(text).replace(/\t/g,'  ');
      const chars=Array.from(expanded);
      const textWidth=ctx.measureText(expanded).width+(chars.length>1?letterSpacing*(chars.length-1):0);
      const spaceWidth=Math.max(1,ctx.measureText(' ').width+letterSpacing);
      return Math.max(0,Math.round(textWidth/spaceWidth));
    }catch{
      return Array.from(String(text)).reduce((n,ch)=>n+(/[\u1100-\u115f\u2e80-\ua4cf\uac00-\ud7a3\uf900-\ufaff\ufe10-\ufe6f\uff00-\uffe6]/.test(ch)?2:1),0);
    }
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
    const textBeforeCursor=textLine.slice(0,cursorInLine);
    const targetSpaceCount=renderedSpaceCount(textBeforeCursor);

    const previousLineEnd=Math.max(0,lineStart-1);
    const previousLineStart=value.lastIndexOf('\n',Math.max(0,previousLineEnd-1))+1;
    const previousLine=lineStart>0?value.slice(previousLineStart,previousLineEnd):'';
    const hasChordLine=lineStart>0&&looksLikeChordLine(previousLine);

    let newValue;
    let newCaret;
    if(hasChordLine){
      let updated=previousLine;
      if(updated.length<targetSpaceCount)updated=updated.padEnd(targetSpaceCount,' ');

      const occupied=updated.slice(targetSpaceCount,targetSpaceCount+chord.length).trim();
      if(!occupied){
        updated=updated.slice(0,targetSpaceCount)+chord+updated.slice(targetSpaceCount+chord.length);
      }else if(updated.slice(targetSpaceCount,targetSpaceCount+chord.length)!==chord){
        updated=updated.slice(0,targetSpaceCount)+chord+' '+updated.slice(targetSpaceCount);
      }

      newValue=value.slice(0,previousLineStart)+updated+value.slice(previousLineEnd);
      newCaret=cursor+(updated.length-previousLine.length);
    }else{
      const chordLine=' '.repeat(targetSpaceCount)+chord;
      newValue=value.slice(0,lineStart)+chordLine+'\n'+value.slice(lineStart);
      newCaret=cursor+chordLine.length+1;
    }

    area.value=newValue;
    lastCaret=Math.max(0,Math.min(newCaret,newValue.length));
    notify();
    area.focus({preventScroll:true});
    area.setSelectionRange(lastCaret,lastCaret);
  };

  if(addButton&&!addButton.dataset.neetChordPixelPatched){
    addButton.dataset.neetChordPixelPatched='1';
    addButton.textContent='＋ コードを上に配置';
    addButton.setAttribute('aria-label','選択中のコードを文章のカーソル位置の真上へ配置');
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
      #chordsInput{min-height:220px!important;background:#fff!important;color:#1d1d1f!important;caret-color:#007aff!important;pointer-events:auto!important;-webkit-user-select:text!important;user-select:text!important;touch-action:auto!important;font-family:"SFMono-Regular",Menlo,Monaco,Consolas,"Liberation Mono","Noto Sans Mono CJK JP",monospace!important;white-space:pre!important;overflow-x:auto!important}
      .neet-direct-chord{position:relative;z-index:4;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;margin:0 0 10px}
      .neet-direct-chord input{width:100%;min-width:0;min-height:46px;padding:11px 12px;border:1px solid var(--border,#e5e5ea);border-radius:10px;background:#fff;color:#1d1d1f;font:inherit;font-size:16px;pointer-events:auto!important;-webkit-user-select:text!important;user-select:text!important}
      .neet-direct-chord button{min-height:46px;padding:10px 14px;border:0;border-radius:10px;background:var(--accent,#007aff);color:#fff;font:inherit;font-weight:800}
      .neet-chord-input-note{position:relative;z-index:4;display:block;margin:-2px 0 8px;color:var(--muted,#6e6e73);font-size:.76rem;line-height:1.5}

      @media(max-width:560px){
        .chord-picker{display:grid!important;grid-template-columns:repeat(6,minmax(0,1fr))!important;gap:9px!important;align-items:stretch!important}
        .chord-picker #chordRootSelect{grid-column:1/4!important;grid-row:1!important}
        .chord-picker #chordTypeSelect{grid-column:4/7!important;grid-row:1!important}
        .chord-picker #chordBassSelect{grid-column:1/7!important;grid-row:2!important}
        .chord-picker #addChordBtn{grid-column:1/7!important;grid-row:3!important;width:100%!important;min-height:52px!important;padding:12px 14px!important;font-size:.98rem!important;border-radius:12px!important}
        .chord-picker #playSelectedChordBtn{grid-column:1/3!important;grid-row:4!important;width:100%!important;min-width:0!important;padding:9px 4px!important}
        .chord-picker #addChordLineBtn{grid-column:3/5!important;grid-row:4!important;width:100%!important;min-width:0!important;padding:9px 4px!important}
        .chord-picker #printChordMemoBtn{grid-column:5/7!important;grid-row:4!important;width:100%!important;min-width:0!important;padding:9px 4px!important}
        .chord-picker select,.chord-picker button{min-height:48px!important}
        .neet-direct-chord{grid-template-columns:1fr}
        .neet-direct-chord button{width:100%}
      }
    `;
    document.head.appendChild(style);
  }

  const helpText='文章の置きたい場所にカーソルを置いて「＋ コードを上に配置」を押すと、画面上の横位置を測って真上にコードを置くよ。';
  const oldNote=document.querySelector('.neet-chord-input-note');
  if(oldNote)oldNote.textContent=helpText;

  if(!document.getElementById('neetDirectChordInput')){
    const note=document.createElement('small');
    note.className='neet-chord-input-note';
    note.textContent=helpText;

    const row=document.createElement('div');
    row.className='neet-direct-chord';
    row.innerHTML='<input id="neetDirectChordInput" type="text" inputmode="text" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="直接コード入力：C / Am / F#m7 / G7/B"><button id="neetInsertChordBtn" type="button">真上に配置</button>';
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
    if(directButton)directButton.textContent='真上に配置';
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
