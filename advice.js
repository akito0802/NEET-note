const generateAdviceBtn = document.getElementById('generateAdviceBtn');
const adviceEmpty = document.getElementById('adviceEmpty');
const adviceResults = document.getElementById('adviceResults');
const chordAdvice = document.getElementById('chordAdvice');
const melodyAdvice = document.getElementById('melodyAdvice');
const lyricAdvice = document.getElementById('lyricAdvice');
const arrangementAdvice = document.getElementById('arrangementAdvice');

const NOTE_MAP = {
  C: ['C','D','E','F','G','A','B'],
  'C# / Db': ['Db','Eb','F','Gb','Ab','Bb','C'],
  D: ['D','E','F#','G','A','B','C#'],
  'D# / Eb': ['Eb','F','G','Ab','Bb','C','D'],
  E: ['E','F#','G#','A','B','C#','D#'],
  F: ['F','G','A','Bb','C','D','E'],
  'F# / Gb': ['Gb','Ab','Bb','Cb','Db','Eb','F'],
  G: ['G','A','B','C','D','E','F#'],
  'G# / Ab': ['Ab','Bb','C','Db','Eb','F','G'],
  A: ['A','B','C#','D','E','F#','G#'],
  'A# / Bb': ['Bb','C','D','Eb','F','G','A'],
  B: ['B','C#','D#','E','F#','G#','A#']
};

const MOOD_DATA = {
  '明るい': { degrees: ['I - V - vi - IV', 'I - IV - V - I'], motion: '3度と5度を中心に跳ねる', rhythm: '8分音符主体で前向きに', words: ['光', '笑顔', '朝', '未来'], arrange: '明るいギターカッティングと軽いピアノ。サビでコーラスを重ねる。' },
  '爽やか': { degrees: ['I - V - ii - IV', 'vi - IV - I - V'], motion: '上行する順次進行を多めに', rhythm: 'シンコペーションを少し入れる', words: ['風', '空', '夏', '透明'], arrange: 'クリーンギター、ハイハット、薄いパッド。低音を重くしすぎない。' },
  '切ない': { degrees: ['vi - IV - I - V', 'IV - V - iii - vi'], motion: '3度下降と同音反復を混ぜる', rhythm: '語尾を長く伸ばして余白を作る', words: ['駅', '夜', '記憶', 'さよなら'], arrange: 'ピアノとストリングスを中心に、サビ後半でドラムを広げる。' },
  '寂しい': { degrees: ['vi - iii - IV - I', 'ii - V - iii - vi'], motion: '狭い音域から始めて最後だけ上げる', rhythm: '休符を多めにして孤独感を出す', words: ['ひとり', '影', '静けさ', '遠い'], arrange: '単音ピアノ、アンビエントギター、深めのリバーブ。' },
  '優しい': { degrees: ['I - iii - IV - I', 'IV - I - ii - V'], motion: '2度進行中心でなめらかに', rhythm: '付点を少し使って歌うように', words: ['手', 'ぬくもり', '灯り', '帰る'], arrange: 'アコースティックギター、柔らかいベース、ブラシ系ドラム。' },
  '壮大': { degrees: ['I - V - vi - iii - IV - I - IV - V', 'vi - IV - I - V'], motion: 'サビで1オクターブ近くまで音域を広げる', rhythm: '長い音価と大きい跳躍を使う', words: ['世界', '空', '永遠', '旅'], arrange: 'ストリングス、タム、広いパッド。最後のサビで転調感を作る。' },
  '不穏': { degrees: ['i - bVI - bII - V', 'i - iv - bII - V'], motion: '半音進行と増4度をアクセントに', rhythm: '短い反復フレーズで緊張を作る', words: ['影', '歪み', '冷たい', '境界'], arrange: '低いドローン、歪んだシンセ、乾いたキック。' },
  '激しい': { degrees: ['i - bVI - bVII - i', 'I - bVII - IV - I'], motion: '4度・5度跳躍を強く使う', rhythm: '16分の反復と食い気味の入り', words: ['衝動', '壊す', '叫ぶ', '火'], arrange: '歪みギター、太いベース、強いスネア。ブレイクで一度音数を落とす。' },
  'おしゃれ': { degrees: ['Imaj7 - iii7 - vi7 - ii7 - V7', 'IVmaj7 - V/IV - iii7 - vi7'], motion: '7thや9thをコードトーンとして狙う', rhythm: '裏拍から入るフレーズを使う', words: ['ネオン', 'グラス', '深夜', '香り'], arrange: 'エレピ、丸いベース、ハーフタイム気味のドラム。テンションコードを活かす。' },
  '幻想的': { degrees: ['Imaj7 - Vadd9 - vi7 - IVmaj7', 'i - bIIImaj7 - bVII - IV'], motion: '同じ音を軸にコードだけ動かす', rhythm: '長音と細かい装飾音を組み合わせる', words: ['月', '夢', '海', '光'], arrange: 'パッド、ディレイギター、ベル系音色。残響を長めにする。' }
};

function degreeToChord(key, degree) {
  const notes = NOTE_MAP[key] || NOTE_MAP.C;
  const major = {
    I: notes[0], ii: notes[1] + 'm', iii: notes[2] + 'm', IV: notes[3], V: notes[4], vi: notes[5] + 'm', vii: notes[6] + 'dim'
  };
  return major[degree] || degree;
}

function convertProgression(key, progression) {
  return progression.split(' - ').map(token => degreeToChord(key, token)).join('  ');
}

function extractExistingChords(text) {
  return (text.match(/\b[A-G](?:#|b)?(?:maj13|maj9|maj7|mMaj7|m13|m11|m9|m7b5|m7|m6|madd9|add11|add9|dim7|dim|aug|7sus4|sus4|sus2|13|11|9|7b9|7#9|7#11|7b5|7#5|7|6|5|m)?(?:\/[A-G](?:#|b)?)?\b/g) || []).slice(0, 8);
}

function buildLyricLines(theme, fragment, words, mood) {
  const anchor = theme || words[0];
  const source = fragment.trim();
  const seed = source ? `「${source.split('\n')[0].slice(0, 28)}」` : `「${anchor}」`;
  return [
    `${seed}をサビの核にして、同じ意味を言い換えながら2回繰り返す。`,
    `Aメロは「${words[1]}」の具体的な情景、Bメロは心の変化、サビは「${words[2]}」に結論を置く。`,
    `歌詞案：${words[0]}の向こうで　まだ君を探してる / ${anchor}だけが　昨日を照らしてる`,
    `${mood}な曲なので、説明しすぎず名詞と景色を多めにするとまとまりやすい。`
  ];
}

function setParagraphs(target, lines, codeLine = '') {
  target.innerHTML = '';
  if (codeLine) {
    const code = document.createElement('code');
    code.textContent = codeLine;
    target.appendChild(code);
  }
  lines.forEach(line => {
    const p = document.createElement('p');
    p.textContent = line;
    target.appendChild(p);
  });
}

function generateAdvice() {
  const key = document.getElementById('keyInput')?.value || 'C';
  const bpm = Number(document.getElementById('bpmInput')?.value) || 100;
  const mood = document.getElementById('moodInput')?.value || '優しい';
  const theme = document.getElementById('themeInput')?.value.trim() || '';
  const fragment = document.getElementById('lyricIdeaInput')?.value || '';
  const currentProgression = document.getElementById('chordsInput')?.value || '';
  const data = MOOD_DATA[mood] || MOOD_DATA['優しい'];
  const existing = extractExistingChords(currentProgression);
  const progression = convertProgression(key, data.degrees[0]);
  const altProgression = convertProgression(key, data.degrees[1]);
  const notes = NOTE_MAP[key] || NOTE_MAP.C;

  const chordLines = [
    existing.length ? `今の進行には ${existing.join(' → ')} が入ってる。サビ前でVコードを長めにすると着地が強くなる。` : '今の進行がまだ短いので、まず4小節単位で作ると整理しやすい。',
    `別案：${altProgression}`,
    mood === 'おしゃれ' ? 'maj7・m7・9thを混ぜると雰囲気がまとまりやすい。' : '最後の1小節だけオンコードを使うと、次のコードへ滑らかにつながる。'
  ];
  setParagraphs(chordAdvice, chordLines, progression);

  const melodyLines = [
    `使いやすい音：${notes.join('・')}`,
    `${data.motion}。Aメロは低め、サビ頭だけ最高音を置くと印象が残る。`,
    bpm >= 130 ? 'BPMが速めなので、1音を詰め込みすぎず2小節単位でフレーズを区切る。' : bpm <= 75 ? 'BPMが遅めなので、ロングトーンと装飾音で間を埋める。' : data.rhythm,
    `サビ頭候補：${notes[4]} → ${notes[5]} → ${notes[4]} → ${notes[2]}`
  ];
  setParagraphs(melodyAdvice, melodyLines);

  setParagraphs(lyricAdvice, buildLyricLines(theme, fragment, data.words, mood));

  const arrangementLines = [
    data.arrange,
    `BPM ${bpm}なら、Aメロは音数を抑え、Bメロでハイハットやパッドを足し、サビで低音とコーラスを広げる。`,
    `曲の構成が未定なら「イントロ4小節 → Aメロ8 → Bメロ8 → サビ8 → 間奏4 → ラスサビ16」が扱いやすい。`
  ];
  setParagraphs(arrangementAdvice, arrangementLines);

  adviceEmpty.classList.add('hidden');
  adviceResults.classList.remove('hidden');
}

if (generateAdviceBtn) generateAdviceBtn.addEventListener('click', generateAdvice);