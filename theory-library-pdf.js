(()=>{
'use strict';
const CHAPTERS=[
['第1編','音楽理論の基礎','音程／音階と調号／調性内三和音／調性内四和音／和音分析／ローマ数字／転回／その他の三和音・四和音'],
['第2編','長調の和声','長音階構成音／各音の特色／トニック・ドミナント・サブドミナント機能／終止／コードアナライズ／機能別分析／和音の置換'],
['第3編','短調の和声','自然短音階／和声的短音階／旋律的短音階／各短音階の調性内和音／短調の楽曲分析'],
['第4編','テンションを含む和音','非和音構成音／テンションの基礎／使用可能なテンション／オルタードテンション／短調・旋律的短音階でのアヴェイラブルテンション'],
['第5編','セカンダリードミナント','トニック以外へのドミナントモーション／ナチュラル・ハーモニック・メロディックマイナーでの用法／リレイティッドII-7／エクステンデッドドミナント／ツーファイブ連続'],
['第6編','モーダルインターチェンジ','チャーチモード／メロディックマイナー派生モード／コード借用／代表的借用コード／セカンダリードミナントとの併用'],
['第7編','ドミナントコードの応用と発展','サブスティテュートドミナント／トライトーン／subV7／マイナーキーのsubV7／ツーファイブ／エクステンデッドsubV／ドミナント機能を持たないドミナント7th'],
['第8編','ディミニッシュコード','dim7の基礎／上行・下行・オグジュアリーアプローチ／転回／テンション／オクタトニックスケール／ブルース進行での使用'],
['第9編','転調','一時的トーナリティ／ダイレクト・平行メジャー・ピボットコード転調／ドミナントを用いた転調／トランジショナルモジュレーション'],
['第10編','コードスケール','メジャー・マイナーキー／セカンダリードミナント／モーダルインターチェンジ／subV／dim7／モーダルハーモニー／ドリアン・フリジアン・リディアン・ミクソリディアン'],
['第11編','その他の和声技法','ペダルポイント／トニック・ドミナント・サブドミナント・インテリア・ソプラノペダル／コンスタントストラクチャー／マルチトニックシステム／コンティギュアスモーション'],
['第12編','コンパウンドコード','ハイブリッドコード／ハイブリッドコードの置換と導出／ポリコード／ポリコードの条件と導出']
];
const EXTRA=[
['基礎','音程の仕組みと転回','度数だけでなく半音数で長・短・完全・増・減を判別し、上下を入れ替えた音程の転回まで扱う。','C–E=長3度、C–E♭=短3度。増4度と減5度はトライトーン。','コード構成音やボイスリーディングを「音名」ではなく距離として理解する。'],
['基礎','調性内和音とローマ数字分析','スケール各音上へ3度堆積して三和音・四和音を作り、I・II-7・V7のようなローマ数字で機能を追う。','Cメジャーなら I=C、II-=Dm、V7=G7。','移調しても同じ進行構造を比較でき、アナライズの土台になる。'],
['長調の和声','長音階の各音の特色','主音は最も安定、導音は主音へ半音上行する強い傾向を持つなど、各スケール音を「どこへ進みたがるか」で理解する。','CメジャーのBはCへ、FはEへ解決しやすい。','メロディと和音の自然な解決方向を設計する。'],
['長調の和声','トニックファンクション','安定感を持ち、曲の冒頭や最後で使われやすい機能。IだけでなくIII-やVI-などもトニック機能として扱われる。','C、Em、Amなど。','着地・休息・セクション終端を作る。'],
['長調の和声','ドミナントファンクション','導音とトライトーンを含み、トニックへ強く解決したがる機能。V7→Iでは構成音が半音・全音で順次進行する。','G7(B–F)→C(C–E)。','サビ直前や終止で解決欲求を最大化する。'],
['長調の和声','サブドミナントファンクション','トニックとドミナントの中間で、トニックを離れて展開を作る機能。','CキーのDm7、F、Fmaj7。','T→SD→D→Tの流れで曲を前へ運ぶ。'],
['長調の和声','和音の置換','三和音から四和音への置換、同じ機能を保つ置換、機能を変えた置換を区別する。','CをCmaj7へ、AmをC6のように読み替えるなど。','メロディを保ちながら響きだけを豊かにする。'],
['短調の和声','自然・和声・旋律的短音階','短調では第6・7音の扱いにより3種類の音階が生まれ、それぞれ調性内和音やドミナントの強さが変わる。','A natural minorのGをG♯にするとharmonic minor。','短調のV7→i、メロディ、コードスケールを正確に選ぶ。'],
['テンション','アヴェイラブルテンション','非和音構成音を無条件に足すのではなく、コード機能・調性・旋律との関係から使用可能なテンションを判断する。','maj7上の9th、ドミナント上の♭9/♯9など。','コードを濁らせず色彩を増やす。'],
['テンション','アヴォイドノート','コードトーンと強い短9度関係などを作り、コード機能を曖昧にしやすい音を注意音として扱う。','Cmaj7上のFはEと短9度関係になりやすい。','長く伸ばすか経過音にするかを判断する。'],
['テンション','オルタードテンション','ドミナント上で♭9・♯9・♭5/♯11・♯5/♭13などを使い、解決直前の緊張を強める。','G7(♭9)→C、G7(♯9♭13)→C。','V7→Iの直前をジャズ的・劇的にする。'],
['セカンダリーD','ナチュラルマイナーでのセカンダリードミナント','短調でも一時的な目的コードへ向けてドミナントを作るが、音階由来の臨時記号と機能を区別して読む。','Am内で目的和音ごとのV7を設定する。','短調の進行に局所的な方向感を足す。'],
['セカンダリーD','リレイティッドII-7','セカンダリードミナントの前に、そのVに対応するII-7を置いて局所的なII–Vを作る。','Em7–A7→Dm7 のように目的和音へII–Vで接近。','単発のV7より滑らかでジャズ的な流れを作る。'],
['セカンダリーD','エクステンデッドドミナント','ドミナントを連続させ、各コードを次のコードのVとして鎖状につなぐ。','E7→A7→D7→G7→C。','長い推進力と明確な到達点を作る。'],
['モーダルインターチェンジ','メロディックマイナー派生モード','借用元をメジャー/ナチュラルマイナーだけに限定せず、メロディックマイナー派生モードまで拡張する。','同主音を持つ派生モードから特徴的な和音を借りる。','より現代的で複雑な色彩を作る。'],
['ドミナント発展','subV7とトライトーン','ドミナント7thの3rdと7thが作るトライトーンを共有する別の7thへ置換する。','G7→C を D♭7→Cへ。','ルートを半音進行にしながらドミナント機能を保つ。'],
['ドミナント発展','エクステンデッドsubV','subVを単発でなく連続させたり、リレイティッドII-7と組み合わせてクロマチックな進行を作る。','複数のsubV7を半音進行で連結。','ジャズ的なクロマチック進行を設計する。'],
['ドミナント発展','ドミナント機能を持たない7th','7thコードでも必ずV→Iへ解決するとは限らず、ブルースやモーダルな文脈では色彩和音として存在する。','ブルースのI7・IV7など。','「7th=必ずドミナント」と決めつけず文脈で分析する。'],
['ディミニッシュ','dim7の4つのアプローチ','dim7を上行・下行・オグジュアリー・転回形として整理し、経過和音だけでなく独立した進行技法として扱う。','C→C♯dim7→Dm、C→Bdim7→B♭系など。','半音接近や内声の滑らかな接続を作る。'],
['ディミニッシュ','dim7のテンションとオクタトニック','dim7上では対称性を持つテンションとオクタトニックスケールを対応させる。','全音・半音を交互に並べる8音音階。','dim7上の旋律やアドリブを体系化する。'],
['転調','ピボットコードモジュレーション','旧キーと新キーの両方に属する和音を共通コードとして読み替え、自然に新しいトーナリティへ移る。','CのAmをGのiiとして Am→D7→G。','急激さを抑えた自然な転調を作る。'],
['転調','ドミナントを用いた転調','新しいキーのプライマリーD、セカンダリーD、subV、♭VII7などを入口にして新トニックを確立する。','D7→Gを新キーのV7→Iとして確立。','短い導入で新しいキーを強く認識させる。'],
['コードスケール','メジャーキーのダイアトニックコードスケール','各ダイアトニックコードへモードを機械的に当てるだけでなく、特性音とアヴォイドの理由まで見る。','Imaj7=Ionian、II-7=Dorian、V7=Mixolydian。','コード上のメロディ・アドリブ音を選ぶ。'],
['コードスケール','マイナーキーのコードスケール','ナチュラル・ハーモニック・メロディックマイナー由来のダイアトニックコードスケールを分けて考える。','V7では導音を含むスケール候補が重要。','短調でコードごとに適切な6th/7thを選ぶ。'],
['コードスケール','モーダルハーモニー','Dorian、Phrygian、Lydian、Mixolydianなどは機能和声のV→Iより特徴音・ペダル・反復で中心を作る。','D DorianならBが特徴音。','モード感を壊さないコードと旋律を作る。'],
['その他の和声','ペダルポイント5種','トニック、ドミナント、サブドミナント、インテリア、ソプラノの各ペダルを区別する。','低音Cを保つだけでなく、内声や最高音を固定する方法もある。','持続感と和声変化を同時に作る。'],
['その他の和声','コンスタントストラクチャー','同一コードタイプを平行移動し、機能和声よりも形・響きの連続性で進行を作る。','maj7を同じ形のまま複数ルートへ移動。','映画的・現代的な非機能進行を作る。'],
['その他の和声','マルチトニックシステム','短い区間で複数の調性中心を対称的に巡る。五種類のマルチトニックシステムとして整理される。','複数のトニックへドミナントを介して移動。','単一キーから離れた高度な循環進行を作る。'],
['その他の和声','コンティギュアスモーション','ドミナントの連続やツーファイブを隣接的に接続し、機能の連鎖として進行を作る。','V7やII–V単位を連続配置する。','長いフレーズに連続した方向感を与える。'],
['コンパウンド','ハイブリッドコード','上部構造とベースを分けて考え、通常の三度堆積コードとは異なる複合的な響きを作る。','上部のトライアド＋独立したベース音。','少ない音数で複雑なテンション感を出す。'],
['コンパウンド','ハイブリッドコードの置換','既存コードをハイブリッド表記へ置き換えたり、メジャーキーや各コードスケールから使用可能な組合せを導く。','コードトーン/テンションを上部構造として再編する。','ボイシングを整理し、複雑なコードを弾きやすくする。'],
['コンパウンド','ポリコード','複数のコードを上下に重ねる考え方。成立条件と導出を確認して、単なる音の密集と区別する。','上部トライアドと下部コードを別レイヤーとして扱う。','アレンジや大編成で複雑な和声色彩を作る。']
];
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function install(){const lib=document.getElementById('neetUnifiedTheory');if(!lib||document.getElementById('neetPdfExpansion'))return;const sec=document.createElement('section');sec.id='neetPdfExpansion';sec.innerHTML=`<div class="pdfx-head"><div><span class="pdfx-kicker">コード理論大全ベース</span><h2>📖 12編・発展理論ガイド</h2><p>PDFの体系をNEETNOTE向けに再構成。まず全体像を12編でつかんで、下の発展項目から詳しく読めるよ。</p></div><span class="pdfx-count">12編 / ${EXTRA.length}発展項目</span></div><div class="pdfx-chapters">${CHAPTERS.map((c,i)=>`<details class="pdfx-ch"><summary><span>${String(i+1).padStart(2,'0')}</span><div><b>${esc(c[1])}</b><small>${esc(c[0])}</small></div></summary><p>${esc(c[2])}</p></details>`).join('')}</div><h3 class="pdfx-sub">発展項目</h3><div class="pdfx-grid">${EXTRA.map(x=>`<details class="pdfx-item"><summary><span>${esc(x[0])}</span><b>${esc(x[1])}</b></summary><div><p>${esc(x[2])}</p><dl><dt>例・考え方</dt><dd>${esc(x[3])}</dd><dt>作曲・分析で使う</dt><dd>${esc(x[4])}</dd></dl></div></details>`).join('')}</div>`;lib.insertAdjacentElement('beforebegin',sec);const st=document.createElement('style');st.textContent=`#neetPdfExpansion{margin:0 0 14px;padding:15px;border:1px solid var(--line,#ded6c9);border-radius:18px;background:rgba(255,253,248,.98);box-shadow:0 10px 28px rgba(80,60,30,.07)}.pdfx-head{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}.pdfx-head h2{margin:3px 0 4px;font-size:1.08rem}.pdfx-head p{margin:0;color:var(--muted);font-size:.77rem;line-height:1.6}.pdfx-kicker{font-size:.62rem;font-weight:900;letter-spacing:.12em;color:var(--accent)}.pdfx-count{flex:0 0 auto;padding:6px 9px;border-radius:999px;background:var(--soft);font-size:.65rem;font-weight:900;color:#6d5940}.pdfx-chapters{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px;margin-top:12px}.pdfx-ch,.pdfx-item{border:1px solid var(--line);border-radius:12px;background:#fff;overflow:hidden}.pdfx-ch summary,.pdfx-item summary{cursor:pointer;list-style:none}.pdfx-ch summary::-webkit-details-marker,.pdfx-item summary::-webkit-details-marker{display:none}.pdfx-ch summary{display:flex;gap:9px;align-items:center;padding:10px}.pdfx-ch summary>span{font-size:.67rem;font-weight:900;color:var(--accent)}.pdfx-ch b{display:block;font-size:.8rem}.pdfx-ch small{display:block;color:var(--muted);font-size:.61rem}.pdfx-ch p{margin:0;padding:0 10px 10px;color:var(--muted);font-size:.7rem;line-height:1.55}.pdfx-sub{margin:15px 0 8px;font-size:.9rem}.pdfx-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.pdfx-item summary{display:grid;grid-template-columns:auto 1fr;gap:7px;align-items:center;padding:10px}.pdfx-item summary span{padding:3px 6px;border-radius:999px;background:var(--soft);font-size:.6rem;font-weight:900;color:#6d5940}.pdfx-item summary b{font-size:.79rem}.pdfx-item>div{padding:0 10px 10px}.pdfx-item p,.pdfx-item dd{margin:0;font-size:.72rem;line-height:1.6}.pdfx-item dl{margin:8px 0 0}.pdfx-item dt{margin-top:7px;color:var(--accent);font-size:.63rem;font-weight:900}.pdfx-item dd{margin-top:2px;color:var(--muted)}@media(max-width:760px){.pdfx-chapters{grid-template-columns:repeat(2,minmax(0,1fr))}.pdfx-grid{grid-template-columns:1fr}}@media(max-width:480px){.pdfx-head{display:block}.pdfx-count{display:inline-flex;margin-top:8px}.pdfx-chapters{grid-template-columns:1fr}}`;document.head.appendChild(st)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();