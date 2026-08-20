(()=>{
'use strict';
const T=window.NEETTheory;
if(!T)return;
const $=id=>document.getElementById(id);
const progression=$('progression'),result=$('result'),error=$('error'),modeCaption=$('modeCaption');
let mode='beginner';

const qualityToDictionary={
  major:'major',minor:'minor',dominant7:'7',major7:'maj7',minor7:'m7',
  'half-diminished':'m7b5',diminished:'dim',diminished7:'dim7',
  augmented:'aug',sus2:'sus2',sus4:'sus4',sixth:'6',minor6:'m6',
  add9:'add9',dominant9:'9'
};
const sharpRoot={C:'C','C♯':'C#','D♭':'C#',D:'D','D♯':'D#','E♭':'D#',E:'E',F:'F','F♯':'F#','G♭':'F#',G:'G','G♯':'G#','A♭':'G#',A:'A','A♯':'A#','B♭':'A#',B:'B'};

function setMode(next){
  mode=next;
  document.querySelectorAll('.gp-tab').forEach(b=>{
    const on=b.dataset.mode===mode;b.classList.toggle('active',on);b.setAttribute('aria-selected',String(on));
  });
  modeCaption.textContent=mode==='beginner'?'初心者向け':'中上級者向け';
  analyze();
}
function tokens(text){
  return text.replace(/\s+(?:\/|\||→|>)\s+/g,' ').replace(/[,\n]+/g,' ').trim().split(/\s+/).filter(Boolean);
}
function dictionaryType(ch){return qualityToDictionary[ch.name]||'major'}
function dictionaryHref(ch){
  const root=sharpRoot[ch.root]||ch.root.replace('♯','#').replace('♭','b');
  const p=new URLSearchParams({root,type:dictionaryType(ch),from:'guitar-pro',return:location.href});
  if(ch.bass)p.set('bass',sharpRoot[ch.bass]||ch.bass.replace('♯','#').replace('♭','b'));
  return 'https://akito0802.github.io/Cordhyo-/index.html?'+p.toString();
}
function commonPcs(a,b){
  const set=new Set(a.pcs);return [...new Set(b.pcs.filter(x=>set.has(x)))];
}
function commonNames(a,b){
  const prefer=/b|♭/.test(a.root+b.root)?'flat':'sharp';
  return commonPcs(a,b).map(pc=>T.noteName(pc,prefer));
}
function smoothness(a,b){
  const v=T.voiceLead(a,b,{commonFixed:true,topFixed:false});
  const total=v.moves.reduce((s,n)=>s+Math.abs(n),0);
  const shared=commonPcs(a,b).length;
  const score=Math.max(0,Math.min(100,100-total*7+shared*6));
  return {total,shared,score,moves:v.moves};
}
function grade(score){return score>=88?'かなり滑らか':score>=72?'滑らか':score>=55?'普通':'動き大きめ'}
function chordCard(ch,i){
  const tones=T.chordToneNames(ch).join('・');
  return `<article class="gp-chord-card">
    <div class="gp-chord-head"><span class="gp-chord-name">${ch.raw}</span><span class="gp-tag">${i+1}</span></div>
    <div class="gp-tones">構成音 ${tones}<br>${ch.bass?`ベース ${ch.bass}`:'通常ベース'}</div>
    <a class="gp-dict" href="${dictionaryHref(ch)}">コード辞典で ${ch.raw} を詳しく見る →</a>
  </article>`;
}
function transitionCard(a,b,i){
  const s=smoothness(a,b),names=commonNames(a,b),width=Math.max(5,s.score);
  const detail=mode==='beginner'
    ? `音の共通音 ${s.shared}個。左手の「残せる指」判定は、次フェーズでコード辞典のフォーム情報と接続して追加します。`
    : `4声の合計移動 ${s.total}半音。音側のボイスリーディングを先に評価し、次フェーズでCAGED・弦セット・押弦を重ねます。`;
  return `<article class="gp-transition">
    <div class="gp-transition-head"><b>${a.raw} → ${b.raw}</b><span>${grade(s.score)} ${Math.round(s.score)}点</span></div>
    <div class="gp-meter"><i style="width:${width}%"></i></div>
    ${names.length?`<div class="gp-common">${names.map(n=>`<span>共通 ${n}</span>`).join('')}</div>`:''}
    <p>${detail}</p>
  </article>`;
}
function summary(chords){
  let scores=[];for(let i=0;i<chords.length-1;i++)scores.push(smoothness(chords[i],chords[i+1]).score);
  const avg=scores.length?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length):100;
  const intro=mode==='beginner'
    ? 'まずは「音のつながり」と各コードの辞典リンクを確認。実際の左手フォーム比較は辞典データとの共有を追加して段階的に強化します。'
    : '進行全体の音の移動を確認しながら、各コードを辞典で開いて別ポジション・CAGED・フォームを調べられます。';
  return `<section class="gp-summary"><strong>${chords.length}コードを解析</strong><p>${intro}</p><span class="gp-score">音側の平均なめらかさ ${avg} / 100</span></section>`;
}
function advancedInfo(){
  if(mode==='beginner')return `<div class="gp-mode-note"><b>コードチェンジ支援 Phase 1</b><br>今は共通音とコード辞典への直通を実装済み。次に辞典側のフォーム座標・指番号を共有して「残す指 / 動かす指 / バレー / ストレッチ」を採点します。</div>`;
  return `<div class="gp-mode-note"><b>ボイシング設計 Phase 1</b><br>今は音側のボイスリーディング＋辞典連携まで実装済み。次にCAGED最短ルート、3音/4音、Shell、Drop 2、トップノート固定をフォームデータと結びます。</div>`;
}
function analyze(){
  error.hidden=true;
  const raw=tokens(progression.value);
  const chords=raw.map(T.parseChord);
  const bad=raw.filter((_,i)=>!chords[i]);
  if(!raw.length||bad.length){
    error.hidden=false;error.textContent=!raw.length?'コード進行を入力してください。':`読み取れないコード: ${bad.join('、')}`;
    result.innerHTML='';return;
  }
  const valid=chords.filter(Boolean);
  const transitions=valid.slice(0,-1).map((ch,i)=>transitionCard(ch,valid[i+1],i)).join('');
  result.innerHTML=`${summary(valid)}
    ${advancedInfo()}
    <section class="gp-panel"><div class="gp-section-head"><div><span>CHORDS</span><h2>コード辞典へ直通</h2></div><small>${valid.length} chords</small></div><div class="gp-chords">${valid.map(chordCard).join('')}</div></section>
    <section class="gp-panel"><div class="gp-section-head"><div><span>VOICE LEADING</span><h2>${mode==='beginner'?'コード間のつながり':'進行全体の音移動'}</h2></div></div><div class="gp-transitions">${transitions||'<p class="gp-note">2コード以上入力すると接続を比較できます。</p>'}</div></section>`;
}
document.querySelectorAll('.gp-tab').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));
document.querySelectorAll('[data-progression]').forEach(b=>b.addEventListener('click',()=>{progression.value=b.dataset.progression;analyze()}));
$('analyze').addEventListener('click',analyze);
progression.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key==='Enter')analyze()});

const params=new URLSearchParams(location.search);
if(params.get('mode')==='voicing')mode='voicing';
if(params.get('progression'))progression.value=params.get('progression');
if(params.get('importChord')){
  const c=params.get('importChord');
  progression.value=progression.value.trim()?`${progression.value.trim()} / ${c}`:c;
}
setMode(mode);
})();