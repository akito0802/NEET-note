(()=>{
'use strict';
const reviewed='2026-08-21';
const chapters=[
 {no:0,id:'intro',name:'はじめる前に',en:'Before You Begin',level:1,minutes:12,goal:'音楽理論を「正解集」ではなく、耳・分析・制作を助ける地図として扱えるようになる。',prereq:[],next:[1],rule:'editorial'},
 {no:1,id:'foundation',name:'音楽理論の基礎',en:'Foundations',level:1,minutes:35,goal:'音程・音階・調号・ローマ数字を使い、コードやスケールを自力で読み解く土台を作る。',prereq:[0],next:[2,13,17],rule:'standard'},
 {no:2,id:'major',name:'長調の和声',en:'Major-key Harmony',level:2,minutes:40,goal:'T/SD/D、終止、導音と7thの解決を「耳と声部」で説明できる。',prereq:[1],next:[3,5],rule:'standard'},
 {no:3,id:'minor',name:'短調の和声',en:'Minor-key Harmony',level:2,minutes:40,goal:'自然・和声・旋律的短音階の違いと、短調のドミナントを説明できる。',prereq:[1,2],next:[6,9],rule:'standard'},
 {no:4,id:'tension',name:'テンションを含む和音',en:'Chord Tensions',level:3,minutes:50,goal:'9th/11th/13th、アヴェイラブル/アヴォイドを響きと配置から判断する。',prereq:[1,2],next:[10,12],rule:'school'},
 {no:5,id:'secondary',name:'セカンダリードミナント',en:'Secondary Dominants',level:3,minutes:45,goal:'目的コードから逆算してV/xを作り、転調との違いを説明できる。',prereq:[1,2],next:[7,9],rule:'standard'},
 {no:6,id:'modal',name:'モーダルインターチェンジ',en:'Modal Interchange',level:4,minutes:55,goal:'同主調・モードから借りた和音を、主音中心を保ったまま分析できる。',prereq:[1,2,3],next:[10,11],rule:'school'},
 {no:7,id:'dominant',name:'ドミナントコードの応用と発展',en:'Advanced Dominants',level:4,minutes:55,goal:'subV7、トライトーン、連続ドミナントを解決方向から扱える。',prereq:[2,5],next:[8,9,10],rule:'school'},
 {no:8,id:'diminished',name:'ディミニッシュコード',en:'Diminished Harmony',level:4,minutes:45,goal:'dim7の対称性とアプローチ機能を、声部進行とセットで使える。',prereq:[2,7],next:[10,11],rule:'school'},
 {no:9,id:'modulation',name:'転調',en:'Modulation',level:4,minutes:60,goal:'ダイレクト、ピボット、ドミナント型の転調を見分け、作曲で選べる。',prereq:[2,3,5],next:[11,18],rule:'standard'},
 {no:10,id:'chordscale',name:'コードスケール',en:'Chord-scale Theory',level:5,minutes:70,goal:'コードとスケールを1対1の暗記ではなく、機能・旋律・ボイシングから選べる。',prereq:[3,4,6,7],next:[12,17],rule:'school'},
 {no:11,id:'otherharmony',name:'その他の和声技法',en:'Other Harmonic Techniques',level:5,minutes:60,goal:'ペダル、コンスタントストラクチャー、マルチトニック等を効果で選べる。',prereq:[2,6,7,9],next:[18],rule:'practice'},
 {no:12,id:'compound',name:'コンパウンドコード',en:'Compound Chords',level:5,minutes:55,goal:'ハイブリッド、ポリコード、アッパーストラクチャーを音域と役割で整理する。',prereq:[4,10],next:[18],rule:'school'},
 {no:13,id:'rhythm',name:'拍とリズム',en:'Pulse and Rhythm',level:1,minutes:35,goal:'パルス・拍・拍子・音価・BPMを分けて聴き取り、身体で拍を保てる。',prereq:[0],next:[14,18],rule:'standard'},
 {no:14,id:'meter',name:'拍子の拡張',en:'Advanced Meter',level:3,minutes:50,goal:'複合拍子・混合拍子・ヘミオラ・ポリリズムをグルーピングで理解する。',prereq:[13],next:[18],rule:'standard'},
 {no:15,id:'texture',name:'音楽のテクスチュア',en:'Musical Texture',level:2,minutes:30,goal:'モノ/ホモ/ポリフォニー等を、声部の関係として聴き分ける。',prereq:[0],next:[18,19],rule:'standard'},
 {no:16,id:'form',name:'楽曲形式・曲の構造',en:'Form and Structure',level:2,minutes:45,goal:'フレーズ・セクション・反復/対比を捉え、曲の地図を作れる。',prereq:[0,13],next:[18],rule:'standard'},
 {no:17,id:'melody',name:'メロディ理論',en:'Melody Theory',level:2,minutes:70,goal:'スケール、コードトーン、非和声音、輪郭、反復を使って旋律を分析・制作する。',prereq:[1],next:[18],rule:'practice'},
 {no:18,id:'arrangement',name:'アレンジ・構成',en:'Arrangement',level:3,minutes:75,goal:'和声・旋律・リズム・音域・密度を組み合わせ、セクション差を設計する。',prereq:[2,13,16,17],next:[19],rule:'practice'},
 {no:19,id:'sound',name:'サウンド・音色',en:'Sound and Timbre',level:2,minutes:55,goal:'倍音・エンベロープ・音域・レイヤーを、編曲とミックスの両面から扱う。',prereq:[0],next:[20],rule:'practice'},
 {no:20,id:'tuning',name:'チューニング・音律',en:'Tuning and Temperament',level:4,minutes:60,goal:'平均律・純正律・倍音関係を、理論上の比と聴感差の両方で理解する。',prereq:[1,19],next:[21],rule:'school'},
 {no:21,id:'stylehistory',name:'スタイル・理論史',en:'Style and Theory History',level:2,minutes:60,goal:'理論を歴史・ジャンル・流派の文脈に置き、「絶対の禁則」と誤解しない。',prereq:[0],next:[],rule:'editorial'}
];
const courses=[
 {id:'songwriting',name:'作曲をしたい',icon:'✍️',desc:'最短で「作れる」ことを優先。全部学ばなくてOK。',chapters:[0,1,2,13,16,17,5,6,18],stop:'第18編までで、自作曲の分析と改善が自力でできるなら一度卒業してOK。'},
 {id:'band',name:'バンドで使いたい',icon:'🎸',desc:'コード・リズム・アレンジの共通言語を優先。',chapters:[0,1,2,13,16,17,18,19],stop:'合奏中に「どこをどう変えるか」を言葉で共有できたら十分。'},
 {id:'dtm',name:'DTM・編曲を強くしたい',icon:'💻',desc:'和声に加え、構成・音色・密度・ボイシングへ接続。',chapters:[0,1,2,4,13,16,17,18,19,9],stop:'理論からDAW上の具体的な編集判断へ移せるなら、残りは必要時に参照でOK。'},
 {id:'jazz',name:'ジャズを学びたい',icon:'🎷',desc:'7th、テンション、II-V、代理、コードスケールを重点的に。',chapters:[0,1,2,3,4,5,7,8,10,12,17],stop:'リードシートを見て機能・ガイドトーン・主要スケールを判断できたら実践比率を上げる。'},
 {id:'ear',name:'耳コピ・分析を強くしたい',icon:'👂',desc:'知識より「聴く→仮説→確認」の循環を重視。',chapters:[0,1,2,13,15,16,17,19,21],stop:'知らない曲を聴いて、拍・キー・主要進行・構造の仮説を立てられたら十分。'},
 {id:'deep',name:'総合的に深く学びたい',icon:'🧠',desc:'21編を依存関係順に進むフルルート。',chapters:[0,1,2,3,13,15,16,17,4,5,6,7,8,9,14,10,11,12,18,19,20,21],stop:'知らない技法に出会う頻度が下がったら、読む量を減らし制作・研究へ戻す。'}
];
const glossary=[
 ['音程','Interval','2つの音の高さの距離。度数と半音数の両方で表す。',['インターバル']],
 ['度数','Scale degree / Interval number','音階上の位置、または音程を数える番号。文脈で意味が変わる。',['ディグリー']],
 ['キー','Key','曲の中心となる音・和音と、その周辺の音の関係。',['調']],
 ['調性','Tonality','中心音・中心和音へ向かう関係が組織化された状態。',['トーナリティ']],
 ['調号','Key signature','楽譜の冒頭に置かれ、基本的な♯/♭をまとめて示す記号。',[]],
 ['ローマ数字','Roman numeral analysis','コードをキー内の位置と機能で表す記法。',['ディグリーネーム']],
 ['トニック','Tonic','安定・中心・帰着を担う音や和音。',['T']],
 ['サブドミナント','Subdominant','中心から外へ広がる機能として説明されることが多い和音群。',['SD']],
 ['ドミナント','Dominant','トニックへ強く向かう緊張を作る音・和音・機能。',['D']],
 ['終止','Cadence','フレーズやセクションの区切りを作る和声・旋律的な着地。',['カデンツ']],
 ['導音','Leading tone','主音の半音下にあり、主音へ向かう傾向を持つ音。',[]],
 ['テンション','Tension','7thコード等へ加える9th/11th/13thなどの拡張音。',[]],
 ['アヴォイドノート','Avoid note','特定の理論体系で、持続時に強い衝突を作りやすいとして注意される音。絶対禁止ではない。',['アボイド']],
 ['セカンダリードミナント','Secondary dominant','主調のI以外のコードを一時的な目的地と見立て、そのV7を置く技法。',['副属和音']],
 ['モーダルインターチェンジ','Modal interchange','同じ主音を持つ別モード/同主調から和音を借りる考え方。',['借用和音']],
 ['ボイスリーディング','Voice leading','各声部が次の和音へどう移動するかを見る考え方。',['声部進行']],
 ['コードトーン','Chord tone','そのコードを構成する基本音。',[]],
 ['非和声音','Non-chord tone','その瞬間の和音構成音に含まれない旋律音。経過・刺繍などの役割を持つ。',['非和音構成音']],
 ['ヘミオラ','Hemiola','2と3の拍の感じ方が一時的に入れ替わる/重なるリズム現象。',[]],
 ['ポリリズム','Polyrhythm','異なるリズム周期を同時に重ねること。',[]],
 ['テクスチュア','Texture','複数の声部・旋律・伴奏がどう関係して鳴るかという音楽の織り方。',[]],
 ['倍音','Overtone / Harmonic','基音の整数倍付近に現れる成分。音色や音程感に関わる。',['ハーモニクス']],
 ['平均律','Equal temperament','オクターブを等しい比率で分割する音律。現代の12平均律が代表。',[]],
 ['純正律','Just intonation','単純な整数比を重視して音程を作る音律群。',[]]
].map((x,i)=>({id:`g${i+1}`,ja:x[0],en:x[1],definition:x[2],aliases:x[3]}));
const references=[
 {id:'omt',title:'Open Music Theory',type:'公開教材',scope:'形式・基礎理論の確認と対照',url:'https://viva.pressbooks.pub/openmusictheory/'},
 {id:'general',title:'一般音楽論',type:'提供資料',scope:'拍・拍子・テクスチュア等の要約・再構成'},
 {id:'levine',title:'The Jazz Theory Book - Mark Levine',type:'参考書',scope:'ジャズ和声・コードスケール・テンションの対照'},
 {id:'kostka',title:'Tonal Harmony - Kostka/Payne/Almen',type:'参考書',scope:'機能和声・声部進行・調性の標準的説明の対照'},
 {id:'laitz',title:'The Complete Musician - Steven G. Laitz',type:'参考書',scope:'調性音楽の分析・声部進行・形式の対照'}
];
const terminologyPolicy=[
 ['Key / 調','NEETNOTEでは「中心音と、その中心を支える音・和音の関係」をまとめて扱う。調号だけとは区別する。'],
 ['Tonality / 調性','「中心へ向かう関係の組織」を指す。Keyと完全な同義として固定しない。'],
 ['Chord / 和音','同時発音だけでなく、アルペジオ等で知覚される和声単位も文脈上コードとして扱う。'],
 ['Function / 機能','T/SD/Dは有力な説明モデルだが、全ジャンル・全和音を1つへ固定する絶対分類とはしない。'],
 ['Avoid note / アヴォイド','「禁止音」ではなく、特定配置・持続で衝突しやすいという実用上の注意として扱う。'],
 ['Rule / 禁則','歴史的規範、聴感傾向、実用目安、流派依存を区別し、単に「ダメ」と書かない。'],
 ['引用 / 要約 / 参考','引用は原文を必要最小限に明示、要約は意味を再構成、参考は理解・照合に利用したものとして分ける。']
].map((x,i)=>({id:`p${i+1}`,term:x[0],policy:x[1]}));
const chapterExtras={
 1:{misconception:'コード名を丸暗記することが基礎ではない。音程と度数から自力で導出できる状態を目標にする。',style:'クラシックでは五線譜と声部進行、ポップ/ジャズではコード記号やローマ数字が前面に出やすい。',analysis:['曲の主音候補を探す','主要コードをローマ数字化する','同じ進行を別キーへ移調する']},
 2:{misconception:'T/SD/Dは便利な説明モデルだが、すべてのコードが必ず1つの機能に固定されるわけではない。',style:'古典機能和声とポップスの機能ラベルは分類の細かさが異なる。',analysis:['V-IとIV-Iの着地感を比較','導音と7thの解決を声部で追う','終止の強さをセクションごとに比較']},
 3:{misconception:'短調には「1つの固定スケール」しかないわけではない。旋律・和声の都合で第6・7音が変化する。',style:'古典では上行/下行の旋律的短音階の扱いが強調され、ジャズでは上行形を独立音階として扱うことが多い。',analysis:['短調のVがメジャー/7thになる箇所を探す','第6・7音の変化を確認','平行調との行き来を分析']},
 4:{misconception:'「使えるテンション」の一覧は絶対ルールではない。メロディ、音域、ボイシング、ジャンルで衝突の感じ方が変わる。',style:'ジャズ理論ではアヴェイラブル・ノート・スケールが整理される一方、現代ポップでは響き優先で扱うことも多い。',analysis:['3rd/7thを残してテンションを追加','A/Bでadd9と三和音を比較','メロディ音と半音衝突を確認']},
 5:{misconception:'キー外のV7が出た瞬間に転調したとは限らない。目的コードを一時的に強調して元キーへ戻る場合が多い。',style:'クラシックでは一時的主和音化、ジャズ/ポップではV/x表記が一般的。',analysis:['目的コードから5度上を逆算','V/xをローマ数字化','転調との境界を耳と継続時間で判断']},
 6:{misconception:'借用和音は「平行調から何でも借りる」だけではなく、主音中心を保つことが重要。',style:'ポップスではivや♭VIIなどの色彩として、モード理論では特徴音との関係として説明されやすい。',analysis:['同主短調由来候補を探す','借用前後で主音中心が変わるか確認','特徴音をメロディでも探す']},
 9:{misconception:'臨時記号が増えることと転調は同じではない。中心音・終止・継続時間を合わせて判断する。',style:'クラシックではピボット/属和音、ポップではダイレクト転調や半音上げも頻出。',analysis:['転調前後の主音を確認','ピボット候補を探す','転調点の前後8小節を比較']},
 13:{misconception:'BPMが大きいほど必ず速く聴こえるわけではない。基準音価と音符密度を合わせて考える。',style:'記譜上の拍子と、身体で感じる大きな拍が一致しないこともある。',analysis:['強拍を手拍子で探す','ドラムと歌詞のアクセントを比較','2拍/4拍で数えた時の自然さを比較']},
 16:{misconception:'Aメロ/Bメロ/サビは日本のポップスで便利な呼び名だが、すべての楽曲形式へ普遍的に当てはまる名称ではない。',style:'クラシック形式論とポップソングのsection labelsは目的と粒度が異なる。',analysis:['反復と対比を色分け','各セクションの小節数を数える','コード/音域/密度の変化を比較']},
 17:{misconception:'良いメロディはスケール内音だけで作られるわけではない。非和声音やクロマチック音も文脈で機能する。',style:'クラシックは非和声音の型、ジャズはコードスケール、ポップはフックや輪郭から説明することが多い。',analysis:['強拍のコードトーン率を確認','輪郭と反復を抽出','非和声音の解決方向を聴く']},
 18:{misconception:'アレンジは「楽器を足すこと」ではない。音域・密度・役割・時間変化を設計すること。',style:'バンド編曲、オーケストレーション、DTMでは用語と優先順位が異なる。',analysis:['各パートの役割を1語で書く','セクションごとの密度を比較','音域の重なりを可視化']},
 19:{misconception:'音色はプリセット名だけで決まらない。倍音、エンベロープ、演奏法、音域、処理の組み合わせで生まれる。',style:'音響学の用語とシンセ/ミックスの実務用語を区別して扱う。',analysis:['アタック/サステインを聴き分け','倍音の明るさを比較','同音域の競合を探す']},
 20:{misconception:'平均律は「音程が正しい」、純正律は「より正しい」という単純な優劣ではない。目的と転調可能性が違う。',style:'理論比率・歴史的音律・実際の楽器調律は別レイヤー。',analysis:['長3度のうなりを比較','倍音列との比を確認','転調時の利便性を考える']},
 21:{misconception:'理論は時代・ジャンル・教育目的で変わる。別教材と説明が違っても、ただちに片方が誤りとは限らない。',style:'クラシック、ジャズ、ポップ、学術的分析では同じ語の射程が異なる場合がある。',analysis:['用語の定義元を確認','規範と記述を区別','別流派の説明を2つ並べる']}
};
const gateways={
 2:[
  {type:'choice',q:'CメジャーのVは？',choices:['F','G','Am'],answer:1,explain:'Cから5度上のG。'},
  {type:'order',q:'機能の典型的な流れを並べて',items:['T','SD','D','T'],answer:['T','SD','D','T']},
  {type:'choice',q:'G7の導音は？',choices:['F','B','D'],answer:1,explain:'BがCへ半音上行する。'},
  {type:'choice',q:'V7の7thは一般にどう解決しやすい？',choices:['上行','下行','動かないだけ'],answer:1,explain:'G7のFがCコードのEへ下行する例が代表。'},
  {type:'ear',q:'A/Bのうち、より強い正格的な着地は？',pattern:'cadence',answer:'A'}
 ],
 3:[
  {type:'choice',q:'A natural minorの第7音は？',choices:['G','G#','F#'],answer:0,explain:'自然短音階はA B C D E F G。'},
  {type:'choice',q:'A minorでE7→Amを強くする音は？',choices:['G#','F#','Bb'],answer:0,explain:'E7の3rd G#がAへ導く。'},
  {type:'order',q:'短調を学ぶ基本順を並べて',items:['自然短音階','和声的短音階','旋律的短音階'],answer:['自然短音階','和声的短音階','旋律的短音階']},
  {type:'choice',q:'自然短音階だけだとVが弱くなりやすい主因は？',choices:['導音がない','主音がない','完全5度がない'],answer:0,explain:'第7音が主音の半音下にならない。'},
  {type:'ear',q:'A/Bのうち、短調の強いV-i感がある方は？',pattern:'minorCadence',answer:'A'}
 ],
 4:[
  {type:'choice',q:'Cmaj7上のDは通常何th？',choices:['9th','11th','13th'],answer:0,explain:'DはCから9度。'},
  {type:'choice',q:'テンションを選ぶ時に最も重要なのは？',choices:['一覧の丸暗記だけ','全体の響きとメロディ/配置','必ず全部足す'],answer:1,explain:'ボイシングと文脈で聴感が変わる。'},
  {type:'order',q:'コードを作る積み上げを並べて',items:['3rd','5th','7th','9th'],answer:['3rd','5th','7th','9th']},
  {type:'choice',q:'sus4とadd11の違いとして正しいのは？',choices:['susは3rdを置換する','addは必ず3rdを消す','同じ意味'],answer:0,explain:'susは3rdを4thへ置き換える。'},
  {type:'ear',q:'A/Bのうち、add9の広がりがある方は？',pattern:'tension',answer:'A'}
 ],
 5:[
  {type:'choice',q:'CキーでDmへ向かう代表的なV/iiは？',choices:['A7','D7','E7'],answer:0,explain:'Dmの完全5度上はA。'},
  {type:'choice',q:'セカンダリードミナントと転調の違いを見る時に重要なのは？',choices:['臨時記号の数だけ','中心がどれだけ持続するか','テンポ'],answer:1,explain:'一時的主和音化か中心移動かを見る。'},
  {type:'order',q:'Cへ向かう連続ドミナント例を並べて',items:['E7','A7','D7','G7','C'],answer:['E7','A7','D7','G7','C']},
  {type:'choice',q:'D7→GをCキーで見ると？',choices:['V/V→V','V/ii→ii','iv→I'],answer:0,explain:'GはCのV、そのVがD7。'},
  {type:'ear',q:'A/Bのうち、目的コードへ強く引く方は？',pattern:'secondary',answer:'A'}
 ],
 6:[
  {type:'choice',q:'CメジャーでFmを借りる典型的な考え方は？',choices:['同主短調から借用','平行調A minorからのみ借用','必ず転調'],answer:0,explain:'C minor側のivを借りたと考えられる。'},
  {type:'choice',q:'Dorianの特徴音として重要なのは？',choices:['♮6','♭2','#4'],answer:0,explain:'minor系の♭3,♭7に対する♮6が特徴。'},
  {type:'order',q:'借用判定の考え方を並べて',items:['主音中心を確認','候補モードを確認','借用音/和音を確認'],answer:['主音中心を確認','候補モードを確認','借用音/和音を確認']},
  {type:'choice',q:'借用和音が出た時に必ず起きることは？',choices:['転調','主音が変わる','どちらも必須ではない'],answer:2,explain:'中心を保ったまま借用できる。'},
  {type:'ear',q:'A/Bのうち、メジャー内にminor ivの陰りがある方は？',pattern:'modal',answer:'A'}
 ],
 9:[
  {type:'choice',q:'前後の両キーに共通する和音を橋にする転調は？',choices:['ピボットコード転調','ダイレクト転調','音量転調'],answer:0,explain:'共通和音をpivotとして使う。'},
  {type:'choice',q:'臨時記号が1つ出たら？',choices:['必ず転調','転調とは限らない','必ず借用'],answer:1,explain:'中心性と持続を確認する。'},
  {type:'order',q:'転調分析の基本順を並べて',items:['旧キーを確認','転調点候補を探す','新キーの確立を確認'],answer:['旧キーを確認','転調点候補を探す','新キーの確立を確認']},
  {type:'choice',q:'サビで半音上へ一気に移る例は？',choices:['ダイレクト転調','必ずピボット','必ずsubV'],answer:0,explain:'共通和音なしで直接移ることがある。'},
  {type:'ear',q:'A/Bのうち、中心が途中で上へ移る方は？',pattern:'modulation',answer:'A'}
 ],
 13:[
  {type:'choice',q:'6/8は一般に大きく何拍で感じやすい？',choices:['2拍','6拍のみ','4拍'],answer:0,explain:'八分音符3つを大きな1拍として2拍。'},
  {type:'choice',q:'BPMだけで速度感が決まる？',choices:['決まる','音価や密度も関係する','拍子は無関係'],answer:1,explain:'同じBPMでも細分やアクセントで体感が変わる。'},
  {type:'order',q:'4拍子の典型的な強弱を並べて',items:['強','弱','中強','弱'],answer:['強','弱','中強','弱']},
  {type:'choice',q:'5/4を感じる助けになる考え方は？',choices:['3+2や2+3に分ける','5を高速で数えるだけ','必ず4+1'],answer:0,explain:'内部グルーピングを見る。'},
  {type:'ear',q:'A/Bのうち、3+3の複合2拍に感じる方は？',pattern:'meter',answer:'A'}
 ],
 16:[
  {type:'choice',q:'形式分析で最初に見ると便利なのは？',choices:['反復と対比','楽器メーカー','音量だけ'],answer:0,explain:'同じ/違うを分けると大枠が見える。'},
  {type:'choice',q:'Aメロ/Bメロ/サビは？',choices:['全世界の普遍的形式名','日本のポップスで便利なsection label','ソナタ形式の正式区分'],answer:1,explain:'ジャンル/地域依存の呼び名。'},
  {type:'order',q:'曲構造の分析順を並べて',items:['フレーズ','セクション','曲全体'],answer:['フレーズ','セクション','曲全体']},
  {type:'choice',q:'サビを大きく感じさせる方法として妥当なのは？',choices:['音域/密度/反復を変える','必ず転調する','必ずBPMを倍にする'],answer:0,explain:'複数要素の対比でセクション差を作れる。'},
  {type:'ear',q:'A/Bのうち、後半で密度が増す構成は？',pattern:'form',answer:'A'}
 ],
 17:[
  {type:'choice',q:'強拍のメロディ音とコードの関係を見る時の基本候補は？',choices:['コードトーン','楽器価格','BPMだけ'],answer:0,explain:'強拍にコードトーンが置かれると和声感が明確になりやすい。'},
  {type:'choice',q:'非和声音は悪い音？',choices:['必ず悪い','役割と解決次第で重要','使ってはいけない'],answer:1,explain:'経過音・刺繍音など旋律の動きを作る。'},
  {type:'order',q:'メロディ分析の流れを並べて',items:['輪郭/反復を見る','強拍とコードの関係を見る','非和声音の動きを見る'],answer:['輪郭/反復を見る','強拍とコードの関係を見る','非和声音の動きを見る']},
  {type:'choice',q:'同じ音型の反復が作りやすいものは？',choices:['フック/統一感','必ず転調','音律変更'],answer:0,explain:'反復は記憶と統一感を作る。'},
  {type:'ear',q:'A/Bのうち、コードトーンへ解決する旋律は？',pattern:'melody',answer:'A'}
 ]
};
const tools=[
 {id:'fifths',name:'五度圏',url:'circle-of-fifths.html',keys:['キー','調号','五度圏','転調']},
 {id:'modulation',name:'転調ルート',url:'modulation-route.html',keys:['転調','ピボット','ドミナント']},
 {id:'nondiatonic',name:'ノンダイアトニック分析',url:'nondiatonic-analyzer.html',keys:['借用','セカンダリー','キー外']},
 {id:'tension',name:'テンションチェッカー',url:'tension-checker.html',keys:['テンション','アヴォイド','コードスケール']},
 {id:'slash',name:'オンコードLab',url:'slash-chord-lab.html',keys:['転回','オンコード','スラッシュ']},
 {id:'reharm',name:'リハーモナイズ',url:'reharmonize.html',keys:['置換','代理','リハーモナイズ']},
 {id:'voice',name:'ボイスリーディング',url:'voice-leading.html',keys:['声部','ボイスリーディング','ガイドトーン']},
 {id:'majorMinor',name:'長短変換Lab',url:'major-to-minor-lab.html',keys:['長調','短調','借用']},
 {id:'tools',name:'理論ツール一覧',url:'tools.html',keys:[]}
];
const audioPatterns={
 third:{a:[[60,64]],b:[[60,63]],labelA:'長3度',labelB:'短3度'},
 cadence:{a:[[67,71,74,77],[60,64,67]],b:[[65,69,72],[60,64,67]],labelA:'V7→I',labelB:'IV→I'},
 minorCadence:{a:[[64,68,71,74],[57,60,64]],b:[[64,67,71],[57,60,64]],labelA:'E7→Am',labelB:'Em→Am'},
 tension:{a:[[60,64,67,74]],b:[[60,64,67]],labelA:'Cadd9',labelB:'C'},
 secondary:{a:[[69,73,76,79],[62,65,69]],b:[[60,64,67],[62,65,69]],labelA:'A7→Dm',labelB:'C→Dm'},
 modal:{a:[[60,64,67],[65,68,72],[60,64,67]],b:[[60,64,67],[65,69,72],[60,64,67]],labelA:'C→Fm→C',labelB:'C→F→C'},
 modulation:{a:[[60,64,67],[67,71,74],[61,65,68],[68,72,75]],b:[[60,64,67],[67,71,74],[60,64,67],[67,71,74]],labelA:'中心が半音上へ',labelB:'同じキー内'},
 meter:{a:[[60],[60],[60],[60],[60],[60]],b:[[60],[60],[60],[60]],labelA:'3+3',labelB:'2+2',rhythmA:[0,.22,.44,.78,1,1.22],rhythmB:[0,.32,.64,.96]},
 form:{a:[[60,64,67],[60,64,67],[60,64,67,72],[60,64,67,72,76]],b:[[60,64,67],[60,64,67],[60,64,67],[60,64,67]],labelA:'後半で密度増加',labelB:'一定密度'},
 melody:{a:[[64],[62],[60]],b:[[61],[63],[66]],labelA:'E→D→C 解決',labelB:'未解決方向'}
};
window.NEET_THEORY_OS_DATA={version:'5.0.0',reviewed,chapters,courses,glossary,references,terminologyPolicy,chapterExtras,gateways,tools,audioPatterns,author:{name:'NEETNOTE Editorial',role:'編集・実装'},brand:'理論を守るためではなく、聴く・作る・説明する自由を増やすために使う。',editorial:{sourceLabels:['独自解説','要約・再構成','参考','引用'],certainty:['標準的','流派依存','諸説あり','実践的目安'],ruleTypes:['歴史的規範','聴感傾向','実用目安','流派依存']}};
})();