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
    if(!area.placeholder)area.placeholder='ここをタップして直接入力：C  Am  F  G7  /  F#m7  B7  E';
  };
  makeEditable();

  const normalize=value=>String(value||'').trim().replace(/[♯＃]/g,'#').replace(/♭/g,'b').replace(/／/g,'/').replace(/　/g,' ');
  const insertText=text=>{
    text=normalize(text);
    if(!text)return;
    makeEditable();
    const start=Number.isInteger(area.selectionStart)?area.selectionStart:area.value.length;
    const end=Number.isInteger(area.selectionEnd)?area.selectionEnd:start;
    const before=area.value.slice(0,start);
    const after=area.value.slice(end);
    const left=before&&!/[\s|\n]$/.test(before)?' ':'';
    const right=after&&!/^[\s|\n]/.test(after)?' ':'';
    area.setRangeText(left+text+right,start,end,'end');
    area.dispatchEvent(new Event('input',{bubbles:true}));
    area.dispatchEvent(new Event('change',{bubbles:true}));
    area.focus({preventScroll:true});
  };

  if(addButton&&!addButton.dataset.neetChordDownPatched){
    addButton.dataset.neetChordDownPatched='1';
    addButton.textContent='＋ 下に追加';
    addButton.setAttribute('aria-label','選択中のコードを下のコード進行メモへ追加');
    addButton.addEventListener('click',event=>{
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      const root=document.getElementById('chordRootSelect')?.value||'';
      const type=document.getElementById('chordTypeSelect')?.value||'';
      const bass=document.getElementById('chordBassSelect')?.value||'';
      if(!root)return;
      insertText(`${root}${type}${bass?`/${bass}`:''}`);
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

  if(!document.getElementById('neetDirectChordInput')){
    const note=document.createElement('small');
    note.className='neet-chord-input-note';
    note.textContent='「＋ 下に追加」で選んだコードを下の大きい欄へ入れられるよ。大きい欄への直接キーボード入力もOK。';

    const row=document.createElement('div');
    row.className='neet-direct-chord';
    row.innerHTML='<input id="neetDirectChordInput" type="text" inputmode="text" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="例：C / Am / F#m7 / G7/B"><button id="neetInsertChordBtn" type="button">コードを入れる</button>';
    picker.insertAdjacentElement('afterend',note);
    note.insertAdjacentElement('afterend',row);

    const input=row.querySelector('#neetDirectChordInput');
    const button=row.querySelector('#neetInsertChordBtn');
    const insert=()=>{
      const text=normalize(input.value);
      if(!text){input.focus();return}
      insertText(text);
      input.value='';
    };
    button.addEventListener('click',insert);
    input.addEventListener('keydown',e=>{
      if(e.key!=='Enter'||e.isComposing)return;
      e.preventDefault();
      insert();
    });
  }

  // ほかのスクリプトが readonly / disabled を付け直しても編集可能に戻す。
  const observer=new MutationObserver(()=>makeEditable());
  observer.observe(area,{attributes:true,attributeFilter:['readonly','disabled','style','class']});

  // iOS Safariでタップ時に確実に編集対象になるよう、ユーザー操作内でfocusする。
  area.addEventListener('touchend',()=>{makeEditable();area.focus({preventScroll:true})},{passive:true});
  area.addEventListener('pointerup',()=>{makeEditable()},{passive:true});
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
