(()=>{
'use strict';
if(window.__NEET_CORE_EXPANSION_V1__)return;
window.__NEET_CORE_EXPANSION_V1__=1;
const lesson=(title,summary,points,example,use)=>({title,summary,points,example,use});
const EXPANSION={
 version:'20260825-1',
 groups:[
  {
   id:'foundation',
   lessons:[
    lesson('転回形とベースラインを分けて考える','転回形は「最低音がどの構成音か」を示し、コードの根音そのものが変わったわけではない。ベースラインを独立して設計すると、同じコード進行でも流れを滑らかにできる。',['C/EはCメジャーコードの第1転回形で、根音はC・最低音はE。','転回形を使う主な目的は、低音を順次進行させる、同じコードを違う重心で聞かせる、声部移動を小さくすること。','ローマ数字ではI6のように転回を示す表記もあり、ポップスのコードネームではC/Eのようなスラッシュ表記が実用的。'],'C–G/B–Am–FならベースをC→B→A→Fと動かせる。C–G–Am–Fより低音の流れが滑らかに聞こえる場合がある。','好きな4コード進行を一度すべて基本形で弾き、その後ベースがなるべく順次進行するよう転回形へ置き換えて比較する。'),
    lesson('コード構成音の綴りと異名同音','同じ鍵盤を押しても、理論上の綴りが違えばコード内での役割や解決方向の説明が変わる。コード名から3度ずつ積む意識を持つとスペルミスを減らせる。',['C majorはC–E–G、C# majorはC#–E#–G#のように、原則として文字名を1つ飛ばしで積む。','F#とGbのような異名同音は12平均律では同じ高さでも、記譜上の機能は同じとは限らない。','コードスペルを正しく書くと、3rd・5th・7th・tensionの番号が見やすくなり、転調や声部進行の分析もしやすい。'],'C#7はC#–E#–G#–B。E#をFと書くと音は同じでも、C#から見た「3度」という構造が見えにくくなる。','コードを5つ選び、鍵盤上の音名だけでなく「Root / 3rd / 5th / 7th」と役割も横に書いて確認する。'),
    lesson('ダイアトニック7thコードを一周する','三和音だけでなく各音階音の上へ7thまで積むと、そのキーで自然に使える7thコードの全体像が見える。',['C majorのダイアトニック7thはImaj7=Cmaj7、ii7=Dm7、iii7=Em7、IVmaj7=Fmaj7、V7=G7、vi7=Am7、viiø7=Bm7♭5。','V7だけがmajor triad+minor 7thになるため、Tonicへ向かう強いdominant機能を作りやすい。','三和音から7thコードへ拡張してもローマ数字上の度数は同じで、機能の大枠を保ったまま色を増やせる。'],'I–vi–ii–VをC–Am–Dm–GからCmaj7–Am7–Dm7–G7へ置き換えると、骨格を保ちながら響きが滑らかになる。','1つのキーで7つのダイアトニック7thコードを順番に弾き、major7 / minor7 / dominant7 / half-diminishedの違いを聞き分ける。'),
    lesson('ローマ数字で進行を移調する','ローマ数字はコード名をキーから切り離して構造として保存する道具。曲を別キーへ移す時、音名ではなく度数で考えると進行をそのまま再現できる。',['C majorのI–V–vi–IVはC–G–Am–F、G majorならG–D–Em–C。','数字が大文字か小文字かでmajor/minorの性質を示す表記が多い。','移調ではメロディも同じ度数関係へ動かすと、曲全体の構造を保てる。'],'C majorのI–vi–IV–VをD majorへ移すとD–Bm–G–A。コード名は変わるが機能の並びは同じ。','好きな進行をローマ数字へ変換し、原曲キーから全音上と完全4度上の2キーへ移調する。'),
    lesson('コード進行の共通音を残す最短声部進行','コードチェンジのたびに全音を動かす必要はない。共通音を保持し、残りの声部を最短距離で動かすと自然なVoice Leadingになる。',['C→AmならCとEが共通音なので保持でき、GだけAへ動かせる。','F→Gでは共通音が少ないため、各声部を近い構成音へ割り当てると大きな跳躍を減らせる。','Voice Leadingはコード進行そのものを変えずに、滑らかさ・緊張・内声の歌いやすさを調整する方法。'],'C(E–G–C)→Am(E–A–C)なら外声をほぼ保ち、G→Aだけ動かせる。','4つのコードを鍵盤で弾き、各コードごとに一番近い転回形を選んでトップノートと内声の移動量を記録する。')
   ]
  },
  {
   id:'major',
   lessons:[
    lesson('終止を4種類で比較する','長調の和声では、同じフレーズでも最後の2コードを変えるだけで閉じ方を大きく変えられる。Authentic / Half / Deceptive / Plagalを聴き比べると終止の強度設計が分かる。',['Authentic cadenceはV→Iで強くTonicへ着地する。','Half cadenceはVで止まり、次を要求する未完感を残す。','Deceptive cadenceはV→viなど期待外の着地で続行感を作る。','Plagal cadenceはIV→Iで、V→Iとは違う柔らかい帰結を作る。'],'C majorでG7→C、Dm→Gで停止、G7→Am、F→Cを順番に鳴らすと4種類の終止感を比較できる。','Verse末・Prechorus末・Chorus末に別の終止を割り当て、セクションの開閉感を意図的に変える。'),
    lesson('ダイアトニック代理コードの考え方','代理コードは「同じ機能だから自由交換」ではなく、共通音・ベース・メロディとの相性を保ちながら役割を近づける考え方。',['Tonic系ではIとvi、場合によってiiiが共通音を多く持つ。','Predominant系ではiiとIVが共通音を持ち、Vへ向かう準備として似た働きを作れる。','置換後にメロディ音がコード外にならないか、次のコードへの声部進行が不自然にならないかを確認する。'],'C–F–G–CのFをDmへ変えてC–Dm–G–Cにすると、PD機能を保ちながらベースと色を変えられる。','1つの8小節進行でI↔vi、IV↔iiを試し、どの置換がメロディと最も自然に噛み合うか比較する。'),
    lesson('機能和声とベースラインで方向を作る','同じコード群でもベースの進み方を設計すると、機能感・推進力・セクションの重心が変わる。',['Root positionを連続するとコード機能が明確になりやすい一方、跳躍が大きくなることがある。','転回形を使うとスケール状のベースラインや半音進行を作りやすい。','ベース音が非根音になると、コード自体は同じでも聴感上の重心や次への期待が変わる。'],'C–G/B–Am–C/G–FのようにベースをC→B→A→G→Fと下降させると、コード進行へ一本の線を作れる。','既存曲のコード進行を変えず、ベースだけ「下降版」「上昇版」「Rootのみ版」の3種類にして聞き比べる。'),
    lesson('機能和声のハーモニックリズムを設計する','コードが何拍ごとに変わるかというHarmonic Rhythmは、同じコード進行でも速度感と緊張の上がり方を大きく左右する。',['1小節1コードは安定して広く聞こえやすく、2拍ごと・1拍ごとに変えると和声情報が密になる。','Prechorusだけコードチェンジを細かくすると、テンポを変えずにChorusへ向かう加速感を作れる。','すべての小節を同じ周期で変える必要はなく、終止前だけ速める方法も有効。'],'C | Am | F | G を各1小節で鳴らした後、最後の1小節だけF Gを2拍ずつにすると終止前の推進力が上がる。','同じ8小節のコードを「1小節1コード」「2拍1コード」に組み替え、メロディの余白と緊張感の違いを確認する。'),
    lesson('4コードループを機能だけで決めつけない','ポップスの反復進行では、古典的なT–PD–D–Tだけでなく、ループの開始位置・メロディ・反復回数そのものが中心感を作る。',['I–V–vi–IVのようなループは終止せず循環し続けるため、毎回のIが必ず強い最終着地になるとは限らない。','同じ4コードでもどこから再生を始めるかで、聴感上の「1番目」が変わることがある。','機能分析に加え、共通音・ベースの周期・メロディ終止音・セクション境界を見ると実曲へ適用しやすい。'],'C–G–Am–FをFから再生してF–C–G–Amとして聞くと、同じコード集合でも重心の感じ方が変わることがある。','好きな4コード曲を機能記号だけでなく「ループの頭」「メロディ着地点」「最も長く鳴るコード」の3軸でも分析する。')
   ]
  },
  {
   id:'minor',
   lessons:[
    lesson('短音階から関係調・同主調を区別する','短調を学ぶ時は、C majorとA minorのように調号を共有する関係と、C majorとC minorのように主音を共有する関係を分けて考える。',['Relative major/minorは調号を共有し、C major↔A minorのように中心音が異なる。','Parallel major/minorは主音を共有し、C major↔C minorのように第3・6・7音などが変化する。','日本語の「平行調」「同主調」は教材によって英語対応を混同しやすいため、主音共有か調号共有かを明示すると安全。'],'A minorからC majorへ移ると構成音はほぼ同じでも中心が変わる。C minorからC majorへ移ると中心は同じまま色彩が変わる。','2組ずつ鍵盤で弾き、「同じ音集合・中心違い」と「同じ中心・音集合違い」を耳で区別する。'),
    lesson('iiø7–V7–iを短調の骨格として聞く','短調ではiiø7–V7–iがPredominant→Dominant→Tonicを明確に示す代表的な進行。各コード名よりGuide Toneの半音解決を追うと機能が聞こえやすい。',['A minorではBm7♭5→E7→Amが基本例。','E7のG#はAへ、DはCへ進むと強い解決を作る。','iiø7には短調固有の♭6音が含まれ、majorのii7とは違う色を持つ。'],'Bm7♭5のFをE7のEまたはDへ近く動かし、E7のG#→A・D→Cを確認すると3コードの方向がつながる。','左手Root、右手3rd/7th中心でiiø7–V7–iを12キーへ移し、最小Voice Leadingを練習する。'),
    lesson('短調の和声：♭VI・♭VIIでAeolianの色を作る','短調ではV→iの強い機能和声だけでなく、Natural minor由来の♭VI・♭VIIを使うと循環的でモーダルな色を作れる。',['A minorではF=♭VI、G=♭VII。','i–♭VII–♭VI–♭VIIのような進行は導音G#を使わず、Aeolianらしい開放的な循環感を作る。','同じ短調でもE7を入れるとtonal minorの強い帰結、Gを使うとmodal minorの色が強まりやすい。'],'Am–G–F–GとAm–Dm–E7–Amを比較すると、前者は循環、後者は明確な終止として聞こえやすい。','自作のminorループを「導音あり版」「導音なし版」に分け、サビとVerseで使い分ける。'),
    lesson('短調の和声：ピカルディ終止で最後だけ長三和音にする','minor中心の曲を最後だけ同主majorのIで閉じるPicardy Thirdは、暗い文脈の中へ明るい終結色を入れる歴史的な手法。',['A minorなら最終AmのCをC#へ上げA majorで閉じる。','主音は同じまま3rdだけ変えるため、転調というより終止時の色彩変化として捉えることが多い。','現代のポップスでも「最後だけmajorへ反転」という演出として応用できる。'],'Dm–E7–Amで終える版とDm–E7–Aで終える版を比べると、最後の3rd変更だけで印象が大きく変わる。','短調の8小節を作り、最後の1コードだけminor/majorを切り替えて歌詞の意味との相性を比較する。'),
    lesson('旋律的短音階：短調の6度・7度を使い分ける','短調の6th・7thは固定された一種類ではなく、和声機能と旋律線の滑らかさに応じて上げ下げされる。',['Classical melodic minorでは上行時に6・7度を上げ、下行時はnatural minorへ戻す教え方が代表的。','Jazz melodic minorでは上下行とも同じ音集合として扱うのが一般的。','実曲では教科書的な上下行ルールより、コード・旋律目標・ジャンルによってF/F#、G/G#が選ばれる。'],'A minorでE→F#→G#→Aは上行の滑らかさと導音を作り、A→G→F→Eはnatural minorの色へ戻せる。','A minorの4小節メロディを作り、F/F#とG/G#を1音ずつ差し替えてコードとの相性と歌いやすさを確認する。')
   ]
  },
  {
   id:'tension',
   lessons:[
    lesson('コードタイプ別Available Tensionを整理する','テンションはコード品質と機能によって使いやすい音が変わる。まずmaj7 / m7 / dominant7 / m7♭5ごとの代表候補を比較すると選択が速くなる。',['maj7では9th・13thが使いやすく、11thは3rdと短9度を作るため注意されることが多い。','m7では9th・11thが自然に使いやすく、Dorian文脈なら13thも特徴音になる。','dominant7では9th・13thに加え、♭9・#9・#11・♭13などaltered tensionを解決先に応じて選べる。','m7♭5では11thや♭13などを文脈とscaleに合わせて選ぶ。'],'Dm7に9th=E、11th=Gを足すと比較的自然。G7ではA=9thとA♭=♭9で緊張度が大きく変わる。','同じii–V–Iを「無テンション」「natural tension」「altered tension」の3版で弾き、各段階の色を言語化する。'),
    lesson('Avoid Noteを禁止音にしない','Avoid Noteは「鳴らしてはいけない音」ではなく、特定のコードトーンと強く衝突しやすいため長く強調する時に注意する音として捉えると実践的。',['Cmaj7上のFはEと短9度を作るため、traditional chord-scale理論ではavoidとして扱われることが多い。','Fを短い経過音にする、Eをvoicingから外す、Fを上声のsus的色として意図的に保持するなど使い方は複数ある。','ジャンルや配置が変われば「avoid」の扱いも変わるため、ルールより実際の衝突を耳で確認する。'],'Cmaj7(E–B)の上へFを長く置く版と、Fを一瞬通過させる版を比較すると同じ音でも印象が変わる。','注意音を1つ選び、①長く保持 ②弱拍で通過 ③衝突するコードトーンを省略、の3条件で試す。'),
    lesson('ガイドトーン＋テンションの最小ボイシング','すべてのコードトーンを鳴らさなくても、3rd・7thで機能を示し、必要なTensionを1〜2音足すだけで洗練された響きを作れる。',['dominant7では3rdと7thが機能を最も強く示すため、rootをベースへ任せれば上物はGuide Tone中心で成立しやすい。','5thはコード品質を変えない場面では省略できることが多く、その分9thや13thを入れられる。','少ない音数ほど各音の役割が明確になり、バンド内で他楽器とぶつかりにくい。'],'G13ならベースGの上にB(3rd)–F(7th)–E(13th)だけでも性格を強く出せる。','鍵盤右手を常に3音以内に制限し、ii–V–IをGuide Tone＋1 tensionだけで伴奏する。'),
    lesson('テンション表記：sus・add9・9thコードを区別する','似た響きでも、3rdがあるか・7thがあるかでコード表記と機能が変わる。sus / add / extensionを分けると譜面とアレンジの意図が伝わりやすい。',['Csus4は基本的に3rd EをFへ置き換え、C–F–Gのような構造。','Cadd9は三和音C–E–GへDを足し、7thを含まない。','C9は通常C7に9thを加えたC–E–G–B♭–Dを意味し、dominant機能を持つ。','Cmaj9はmajor7th=Bを含むためC9とは別物。'],'Cadd9とCmaj9はどちらもDを含むが、Bの有無で響きとコード情報が大きく変わる。','sus4 / add9 / maj9 / 9を同じRootで順番に鳴らし、3rdと7thの有無を声に出して確認する。'),
    lesson('メロディとテンションの衝突を管理する','伴奏側のテンションはメロディ音とセットで決める。コード単体で美しくても、歌の重要音と半音衝突すれば意図しない濁りになる。',['メロディが9thを長く歌うなら、伴奏側で同じ音を重ねるか、逆に空けて主旋律へ任せる選択がある。','メロディが3rdを強調する時、伴奏で11thを近い音域へ置くと短9度衝突が目立つ場合がある。','衝突を避ける方法は音を削るだけでなく、オクターブを離す・音価をずらす・別楽器へ分配する方法もある。'],'Cmaj7上でメロディEを伸ばす時、伴奏FをEのすぐ隣へ置く版と1オクターブ以上離す版で濁り方を比較する。','自作サビの各ロングトーンについて、メロディ音と伴奏テンションの半音関係を確認し、配置だけ変えるA/Bテストをする。')
   ]
  }
 ]
};
const base=window.NEET_GENERAL_MUSIC||{groups:[]};
const ids=new Set(EXPANSION.groups.map(g=>g.id));
base.groups=[...(base.groups||[]).filter(g=>!ids.has(g.id)),...EXPANSION.groups];
window.NEET_GENERAL_MUSIC=base;
window.NEET_CORE_EXPANSION=EXPANSION;
const titles=new Set(EXPANSION.groups.flatMap(g=>g.lessons.map(x=>x.title)));
function relabel(){
 document.querySelectorAll('.tb-row').forEach(row=>{const t=row.querySelector('b')?.textContent?.trim();if(titles.has(t)){const s=row.querySelector('small');if(s)s.textContent='追加教材 · 第2強化';row.dataset.coreExpansion='1'}});
 const h=document.querySelector('#tbReaderHead h2')?.textContent?.trim();
 if(titles.has(h)){const src=document.querySelector('#tbReaderBody .gm-source');if(src){src.classList.add('gm-source-core');const a=src.querySelector('span'),b=src.querySelector('b');if(a)a.textContent='NEET NOTE EXPANSION';if(b)b.textContent='第1〜4編 · 第2強化レッスン'}}
}
function boot(){relabel();new MutationObserver(()=>requestAnimationFrame(relabel)).observe(document.body,{subtree:true,childList:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
