(()=>{
'use strict';
const T=window.NEETTheory;
if(!T)return;
const $=id=>document.getElementById(id);
const VOICES=['Bass','Tenor','Alto','Soprano'];
const RANGES=[[40,57],[45,64],[50,69],[55,76]];
let mode='arrange';
let results=[];
let selected=0;

function uniq(arr){return [...new Set(arr)]}
function pcOfMidi(m){return ((m%12)+12)%12}
function chordPcs(ch){return uniq(ch.pcs.map(x=>((x%12)+12)%12))}
function progressionTokens(text=''){
  return text.replace(/\s+(?:\/|\||→|>)\s+/g,' ').replace(/[,\n]+/g,' ').trim().split(/\s+/).filter(Boolean);
}
function melodyTokens(text=''){
  if(!text.trim())return[];
  return text.replace(/\s+(?:\/|\||→|>)\s+/g,' ').replace(/[,\n]+/g,' ').trim().split(/\s+/).filter(Boolean);
}
function requiredPcs(ch){
  const pcs=ch.pcs.map(pcOfMidi);
  if(pcs.length>=5)return [pcs[0],pcs[1],pcs[3],pcs[4]];
  if(pcs.length===4)return pcs.slice();
  if(pcs.length===3)return [pcs[0],pcs[1],pcs[2],pcs[0]];
  if(pcs.length===2)return [pcs[0],pcs[1],pcs[0],pcs[1]];
  return [ch.rootPc,ch.rootPc,ch.rootPc,ch.rootPc];
}
function uniquePermutations(arr){
  const out=[],used=new Set();
  function walk(prefix,left){
    if(!left.length){const k=prefix.join(',');if(!used.has(k)){used.add(k);out.push(prefix.slice())}return}
    for(let i=0;i<left.length;i++)walk(prefix.concat(left[i]),left.slice(0,i).concat(left.slice(i+1)));
  }
  walk([],arr);return out;
}
function midiOptions(pc,range){
  const out=[];
  for(let m=range[0];m<=range[1];m++)if(pcOfMidi(m)===pc)out.push(m);
  return out;
}
function candidatePenalty(v,style){
  const span=v[3]-v[0];
  const center=(v[0]+v[3])/2;
  const targetSpan=style==='open'?20:style==='top'?15:13;
  let p=Math.abs(span-targetSpan)*.65+Math.abs(center-58)*.12;
  for(let i=1;i<4;i++){
    const gap=v[i]-v[i-1];
    if(gap>12)p+=(gap-12)*1.8;
    if(gap<3)p+=(3-gap)*.5;
  }
  if(style==='open'&&span<16)p+=(16-span)*2;
  return p;
}
function generateCandidates(ch,style,melodyPc,rootBass){
  const base=requiredPcs(ch),perms=uniquePermutations(base),bassPc=ch.bassPc!=null?ch.bassPc:ch.rootPc;
  const found=new Map();
  for(const perm of perms){
    if(rootBass&&perm[0]!==bassPc)continue;
    if(melodyPc!=null&&perm[3]!==melodyPc)continue;
    const opts=perm.map((pc,i)=>midiOptions(pc,RANGES[i]));
    function walk(i,cur){
      if(i===4){
        if(cur[3]-cur[0]>27)return;
        const k=cur.join(',');if(!found.has(k))found.set(k,cur.slice());return;
      }
      for(const m of opts[i]){
        if(i&&m<=cur[i-1])continue;
        cur.push(m);walk(i+1,cur);cur.pop();
      }
    }
    walk(0,[]);
  }
  if(!found.size&&melodyPc!=null)return generateCandidates(ch,style,null,rootBass);
  if(!found.size&&rootBass)return generateCandidates(ch,style,melodyPc,false);
  return [...found.values()].sort((a,b)=>candidatePenalty(a,style)-candidatePenalty(b,style)).slice(0,56);
}
function commonPcs(a,b){const B=new Set(chordPcs(b));return chordPcs(a).filter(p=>B.has(p))}
function exactCommonHeld(from,to,pc){return from.some(m=>pcOfMidi(m)===pc&&to.includes(m))}
function parallelIssues(from,to){
  const issues=[];
  for(let i=0;i<4;i++)for(let j=i+1;j<4;j++){
    const before=(from[j]-from[i])%12,after=(to[j]-to[i])%12;
    const di=to[i]-from[i],dj=to[j]-from[j];
    if(!di||!dj||Math.sign(di)!==Math.sign(dj))continue;
    if(before===7&&after===7)issues.push({type:'P5',voices:[i,j]});
    if(before===0&&after===0)issues.push({type:'P8',voices:[i,j]});
  }
  return issues;
}
function transitionCost(from,to,a,b,style,opt){
  const topW=style==='top'?2.8:1.15;
  const weights=[.85,1,1,topW];
  let cost=0;
  const moves=to.map((m,i)=>m-from[i]);
  moves.forEach((d,i)=>{cost+=Math.abs(d)*weights[i];if(Math.abs(d)>7)cost+=(Math.abs(d)-7)*2.6});
  const commons=commonPcs(a,b);
  if(opt.commonFixed)for(const pc of commons)if(!exactCommonHeld(from,to,pc))cost+=5;
  const par=parallelIssues(from,to);
  if(opt.avoidParallels||mode==='harmony')cost+=par.length*(mode==='harmony'?18:10);
  if(style==='top'&&pcOfMidi(from[3])===pcOfMidi(to[3]))cost-=2;
  return {cost,moves,par,commons};
}
function runDP(chords,style,opt,melodyPcs){
  const candidates=chords.map((ch,i)=>generateCandidates(ch,style,melodyPcs[i]??null,opt.rootBass));
  if(candidates.some(x=>!x.length))return null;
  const dp=candidates.map(c=>Array(c.length).fill(Infinity));
  const prev=candidates.map(c=>Array(c.length).fill(-1));
  candidates[0].forEach((v,j)=>dp[0][j]=candidatePenalty(v,style));
  for(let i=1;i<candidates.length;i++){
    for(let j=0;j<candidates[i].length;j++){
      const to=candidates[i][j],basePenalty=candidatePenalty(to,style);
      for(let k=0;k<candidates[i-1].length;k++){
        const from=candidates[i-1][k];
        const tr=transitionCost(from,to,chords[i-1],chords[i],style,opt);
        const val=dp[i-1][k]+tr.cost+basePenalty*.24;
        if(val<dp[i][j]){dp[i][j]=val;prev[i][j]=k}
      }
    }
  }
  const last=dp.length-1;
  let j=dp[last].indexOf(Math.min(...dp[last]));
  const path=Array(chords.length);
  for(let i=last;i>=0;i--){path[i]=candidates[i][j];j=prev[i][j]}
  return summarizePath(chords,path,style,opt);
}
function dominantSeventhWarning(ch,from,to){
  if(ch.name!=='dominant7')return null;
  const seventh=(ch.rootPc+10)%12;
  for(let i=0;i<4;i++)if(pcOfMidi(from[i])===seventh){
    const d=to[i]-from[i];
    if(!(d===-1||d===-2))return `${VOICES[i]}の7thが下行解決していません`;
  }
  return null;
}
function leadingToneWarning(from,to,keyId){
  if(!keyId||typeof T.keyFromId!=='function')return null;
  const k=T.keyFromId(keyId),tonic=T.pc(T.keyRoot(k)),leading=(tonic+11)%12;
  for(let i=0;i<4;i++)if(pcOfMidi(from[i])===leading){
    const nextPc=pcOfMidi(to[i]);
    if(nextPc!==tonic&&to.some(m=>pcOfMidi(m)===tonic))return `${VOICES[i]}の導音が主音へ解決していません`;
  }
  return null;
}
function transitionAnalysis(a,b,from,to,opt){
  const moves=to.map((m,i)=>m-from[i]);
  const exact=commonPcs(a,b).filter(pc=>exactCommonHeld(from,to,pc));
  const par=parallelIssues(from,to);
  const leaps=moves.map((d,i)=>({d,i})).filter(x=>Math.abs(x.d)>7);
  const warnings=[];
  par.forEach(p=>warnings.push(`平行${p.type==='P5'?'5度':'8度'}：${VOICES[p.voices[0]]} / ${VOICES[p.voices[1]]}`));
  leaps.forEach(x=>warnings.push(`${VOICES[x.i]}が${Math.abs(x.d)}半音ジャンプ`));
  const sev=dominantSeventhWarning(a,from,to);if(sev)warnings.push(sev);
  const lead=leadingToneWarning(from,to,opt.keyId);if(lead)warnings.push(lead);
  return {moves,exact,par,leaps,warnings};
}
function summarizePath(chords,path,style,opt){
  const transitions=[];let totalMove=0,totalWarn=0,totalHeld=0;
  for(let i=0;i<path.length-1;i++){
    const a=transitionAnalysis(chords[i],chords[i+1],path[i],path[i+1],opt);
    totalMove+=a.moves.reduce((s,d)=>s+Math.abs(d),0);totalWarn+=a.warnings.length;totalHeld+=a.exact.length;
    transitions.push(a);
  }
  const n=Math.max(1,path.length-1),avgMove=totalMove/n;
  const score=Math.max(0,Math.min(100,Math.round(100-avgMove*2.5-totalWarn*4+Math.min(10,totalHeld*1.5))));
  return {style,path,transitions,totalMove,totalWarn,totalHeld,score,chords};
}
function styleLabel(style){return style==='smooth'?'A 最小移動':style==='top'?'B トップ優先':'C 広がり重視'}
function styleText(style){return style==='smooth'?'声部全体の移動量を最優先':style==='top'?'一番上の声部をなるべく動かさない':'音域を広げて開放的な響き'}
function parseMelody(count){
  const raw=melodyTokens($('melody').value),out=Array(count).fill(null);
  raw.slice(0,count).forEach((n,i)=>{const p=T.pc(n);if(p!=null)out[i]=p});
  return out;
}
function options(){return{commonFixed:$('commonFixed').checked,rootBass:$('rootBass').checked,avoidParallels:$('avoidParallels').checked,keyId:$('analysisKey').value}}
function analyze(){
  const raw=progressionTokens($('progression').value),chords=raw.map(T.parseChord),bad=raw.filter((_,i)=>!chords[i]);
  const err=$('error');
  if(raw.length<2||bad.length){err.hidden=false;err.textContent=raw.length<2?'2コード以上の進行を入力してください。':`読み取れないコード：${bad.join('、')}`;$('results').innerHTML='';return}
  err.hidden=true;
  const opt=options(),melody=parseMelody(chords.length);
  results=['smooth','top','open'].map(s=>runDP(chords,s,opt,melody)).filter(Boolean);
  selected=0;render();
}
function render(){
  if(!results.length)return;
  const r=results[selected],root=$('results');
  root.innerHTML=`
  <section class="vl-summary">
    <div><span class="vl-kicker">PROGRESSION RESULT</span><strong>${r.chords.length}コードを進行全体で最適化</strong><p>${styleText(r.style)}</p></div>
    <div class="vl-score"><small>自然さ</small><b>${r.score}</b><span>/ 100</span></div>
  </section>
  <section class="vl-candidates">${results.map((x,i)=>`<button type="button" class="vl-candidate ${i===selected?'active':''}" data-candidate="${i}"><span>${styleLabel(x.style)}</span><b>${x.score}</b><small>${styleText(x.style)}</small></button>`).join('')}</section>
  <section class="vl-panel">
    <div class="vl-section-head"><div><span>VOICE MAP</span><h2>4声の流れ</h2></div><button id="playAll" class="vl-action primary" type="button">▶ 進行を聴く</button></div>
    ${renderTimeline(r)}
  </section>
  <section class="vl-panel">
    <div class="vl-section-head"><div><span>KEYBOARD</span><h2>鍵盤で音域を見る</h2></div><small>コードをタップして試聴</small></div>
    <div class="vl-keyboards">${r.path.map((v,i)=>renderKeyboard(v,r.chords[i].raw,i)).join('')}</div>
  </section>
  <section class="vl-panel">
    <div class="vl-section-head"><div><span>${mode==='harmony'?'HARMONY CHECK':'MOVEMENT DETAIL'}</span><h2>${mode==='harmony'?'和声チェック':'コード間の動き'}</h2></div><small>${r.totalWarn?`注意 ${r.totalWarn}`:'大きな注意なし'}</small></div>
    <div class="vl-checks">${r.transitions.map((t,i)=>renderTransition(r,i,t)).join('')}</div>
  </section>`;
  root.querySelectorAll('[data-candidate]').forEach(b=>b.onclick=()=>{selected=Number(b.dataset.candidate);render()});
  root.querySelectorAll('[data-play-chord]').forEach(b=>b.onclick=()=>{const i=Number(b.dataset.playChord);T.playMidis(r.path[i],.7)});
  $('playAll').onclick=()=>r.path.forEach((v,i)=>T.playMidis(v,.55,i*.62));
}
function renderTimeline(r){
  const rows=[3,2,1,0].map(vi=>`<div class="vl-voice-row"><b>${VOICES[vi]}</b>${r.path.map((v,i)=>`<span><strong>${T.midiName(v[vi])}</strong>${i<r.path.length-1?`<small>${formatMove(r.transitions[i].moves[vi])}</small>`:''}</span>`).join('')}</div>`).join('');
  return `<div class="vl-timeline-scroll"><div class="vl-timeline" style="--cols:${r.path.length}"><div class="vl-chord-row"><i></i>${r.chords.map((ch,i)=>`<button type="button" data-play-chord="${i}">${ch.raw}<small>鳴らす</small></button>`).join('')}</div>${rows}</div></div>`;
}
function formatMove(d){return d===0?'共通':`${d>0?'↑':'↓'}${Math.abs(d)}`}
function renderKeyboard(v,label,i){
  const min=36,max=83,set=new Set(v),black=new Set([1,3,6,8,10]);
  let keys='';for(let m=min;m<=max;m++){const pc=pcOfMidi(m);keys+=`<span class="vl-key ${black.has(pc)?'black':'white'} ${set.has(m)?'on':''}" title="${T.midiName(m)}"><i>${set.has(m)?T.midiName(m):''}</i></span>`}
  return `<article class="vl-keyboard-card"><button type="button" data-play-chord="${i}"><b>${label}</b><small>${v.map(T.midiName).join(' · ')}</small></button><div class="vl-keyboard-strip">${keys}</div></article>`;
}
function renderTransition(r,i,t){
  const moves=t.moves.map((d,vi)=>`<span class="${Math.abs(d)>7?'warn':d===0?'held':''}">${VOICES[vi]} ${formatMove(d)}</span>`).join('');
  const held=t.exact.length?`${t.exact.length}個の共通音を同じ高さで保持`:'同じ高さで保持した共通音なし';
  const checks=mode==='harmony'
    ? (t.warnings.length?t.warnings.map(w=>`<li class="warn">⚠ ${w}</li>`).join(''):'<li class="ok">◎ 平行5度/8度・大跳躍などの大きな注意はありません</li>')
    : `<li class="ok">${held}</li>`;
  return `<article class="vl-check-card"><header><b>${r.chords[i].raw} → ${r.chords[i+1].raw}</b><span>${t.moves.reduce((s,d)=>s+Math.abs(d),0)} semitones</span></header><div class="vl-moves">${moves}</div><ul>${checks}</ul></article>`;
}
function setMode(next){
  mode=next;
  document.querySelectorAll('[data-mode]').forEach(b=>{const on=b.dataset.mode===mode;b.classList.toggle('active',on);b.setAttribute('aria-selected',String(on))});
  $('modeHelp').innerHTML=mode==='arrange'
    ? '<b>実用アレンジ</b>：正解を1つに決めず、A/B/Cを聴き比べて好きな響きを選びます。'
    : '<b>和声学</b>：平行5度・8度、大きな跳躍、ドミナント7thや導音の解決をチェックします。';
  $('avoidParallels').checked=mode==='harmony';
  analyze();
}
function init(){
  if(typeof T.populateKeySelect==='function')T.populateKeySelect($('analysisKey'));
  $('analysisKey').value='C';
  document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>setMode(b.dataset.mode));
  document.querySelectorAll('[data-progression]').forEach(b=>b.onclick=()=>{$('progression').value=b.dataset.progression;analyze()});
  $('analyze').onclick=analyze;
  ['commonFixed','rootBass','avoidParallels','analysisKey'].forEach(id=>$(id).onchange=analyze);
  $('progression').addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key==='Enter')analyze()});
  const q=new URLSearchParams(location.search);if(q.get('mode')==='harmony')mode='harmony';if(q.get('progression'))$('progression').value=q.get('progression');
  setMode(mode);
}
init();
})();