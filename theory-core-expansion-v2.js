(()=>{
'use strict';
if(window.__NEET_CORE_EXPANSION_V2__)return;
window.__NEET_CORE_EXPANSION_V2__=1;
const lesson=(title,summary,points,example,use)=>({title,summary,points,example,use});
const EXPANSION={
 version:'20260825-2',
 groups:[
  {
   id:'secondary',
   lessons:[
    lesson('セカンダリー・リーディングトーンコード','セカンダリードミナントと同じように、一時的な目標コードの導音上へdim / dim7を作ると、そのコードへ半音で吸い込まれる強い進行を作れる。',['C majorでV/VはD7→Gだが、vii°7/VならF#dim7→Gとして同じ目標Gを別方向から強調できる。','dim7では各構成音が半音進行しやすく、ルート進行よりVoice Leadingが機能感を作ることが多い。','表記はvii°7/Vのように「どのコードを一時的なTonicとして見ているか」を右側に示す。'],'C majorでF#–A–C–EbをGへ進めると、F#→G、Eb→Dなど半音解決を作れる。','V/Vとvii°7/Vを同じ場所で弾き比べ、どちらが滑らかに目標コードへ入れるかトップノートも変えて比較する。'),
    lesson('Related ii–Vを目標コードの前に置く','セカンダリードミナントの前へ、そのdominantに対応するiiを置くと、一時的なii–Vとして目標コードへの助走を長くできる。',['C majorでGを一時的な目標にするならAm7–D7→Gはii/V–V/V→Vと考えられる。','目標がminor系ならiiø7を使う場面もあり、目標コードの調性を仮定してiiの品質を決める。','Related iiは転調を確定させるものではなく、短いtonicizationとして元キーへ戻ることも多い。'],'C–Am7–D7–G7–Cなら、Gへ向かうAm7–D7とCへ戻るG7–Cが連続した二段階の解決になる。','既存のV/xの前に1コード足し、ii/x–V/x–xの3コードで滑らかさと尺の変化を確認する。'),
    lesson('Extended Dominant Chainを声部進行で追う','Dominantを次のdominantへ連鎖させると、5度進行を保ちながら長い推進力を作れる。コード名の列より3rdと7thの解決を追うと構造が見えやすい。',['C majorではE7→A7→D7→G7→Cのようなchainを作れる。','各dominantは次のコードを一時的に目標化し、最後に本来のTonicへ到達する。','全てに強いaltered tensionを足す必要はなく、メロディとの衝突と解決先を見て色を変える。'],'E7のG#→A、A7のC#→D、D7のF#→G、G7のB→Cという半音解決を順に追うとchainの方向性が明確になる。','4つのdominant chainを作り、各コードの3rdだけを上声に置いて半音解決の線が聞こえるボイシングへする。'),
    lesson('遅延解決・偽解決でSecondary Dominantを外す','V/xを置いたからといって必ず直後にxへ行く必要はない。解決を遅らせたり別コードへ外したりすると、期待を保ったまま展開を作れる。',['V/V→Vの代わりにV/V→ii→Vのように解決を遅らせることができる。','Secondary Dominantの導音や7thがその後どこへ進むかを確認すれば、機能を保ったまま意外性を作りやすい。','解決しないdominantが長く続くと、一時的tonicizationより色彩的dominantとして聞こえる場合もある。'],'C majorでD7→Dm7→G7→Cとすると、D7のF#がFへ半音下降してからG7へ進み、直接Gへ行かない迂回が作れる。','V/xの直後を①x ②xの代理 ③半音で近い別コードの3種類にし、どこまで期待が残るか聞き比べる。'),
    lesson('Secondary DominantのTensionは解決先から逆算する','セカンダリードミナントに9thやaltered tensionを足す時は、元キーの音階だけで決めず、次の目標コードへどう解決するかから選ぶ。',['V/iiのような一時dominantでも、♭9や13thなどを目標コードの構成音へ半音・全音で解決できる。','目標がmajorかminorかで自然に聞こえるtensionが変わるため、同じdominant記号でも毎回同じscaleを当てない。','メロディがdominant上で長く保持される場合、その音をコードのtensionとして受け止められるvoicingを優先する。'],'C majorでA7→DmならB♭(♭9)→A、F#(13)→Fのような解決線を設計できる。','V/ii、V/V、V/viの3つを選び、それぞれ1音だけtensionを足して「次コードへ最短で解決する音」を探す。')
   ]
  },
  {
   id:'modal',
   lessons:[
    lesson('借用元のModeを特定して色を言語化する','Modal Interchangeは「キー外コード」とだけ覚えるより、Parallel modeのどこから借りたかを特定すると特徴音と使い分けが見える。',['C majorでFmはC minor系から借用したiv、Abは♭VI、Bbは♭VIIとして整理できる。','Dorian由来なら♮6、Phrygian由来なら♭2など、modeごとのCharacteristic Noteを手掛かりにする。','同じコードでも複数modeから説明できる場合があるため、前後の旋律・ベース・他の借用音も合わせて判断する。'],'C major中のBbはC Mixolydian由来ともC minor系由来とも説明できる。前後にAbがあるならminor系borrowとして見る根拠が強まる。','借用コードを1つ見つけたら、コード名だけでなく「元mode・変化音・その音が上声/内声/ベースのどこに出るか」まで記録する。'),
    lesson('iv・♭VI・♭VIIを役割別に使い分ける','長調で頻出する借用コードは、同じminor系由来でも機能と色が異なる。進行中の役割で使い分けるとパターン暗記から抜けられる。',['ivはIへ戻る時に♭6→5の半音下降を作り、切なさを伴うPlagal系の解決に使いやすい。','♭VIは大きな色彩変化やPredominant的な広がりを作り、Vへ向かう中継にも使える。','♭VIIはMixolydian/rock的な開放感やIへの全音下降を作り、Vとは違う循環感を生みやすい。'],'C majorでFm→CはAb→G、Ab→G7→Cは♭VI→V→I、Bb→Cは♭VII→Iとして別の帰結を比較できる。','同じメロディ終止音Gの前へiv、♭VI、♭VIIをそれぞれ置き、どのborrowが歌詞やセクションの感情に合うか比較する。'),
    lesson('短調からParallel Major・Dorianを借りる','Modal Interchangeは長調からminor系を借りるだけではない。Minor key側からParallel majorやDorianの明るい音を借りると、中心を保ったまま色を持ち上げられる。',['A minorでA major(I)やD major(IV)を一時的に使うと、C#やF#が明るい色として現れる。','Dorian系のIV majorは♮6を含み、Natural minorのivとは異なる浮遊感を作る。','借用音が一時的でもTonic中心がAに保たれていれば、必ずしも転調とは限らない。'],'Am→D→AmならF#を含むD majorがA Dorian的な色を作り、Am→Dm→Amとは違う明るさになる。','minor loopの1コードだけをParallel major/Dorian由来へ置換し、変化音がメロディと衝突しないか確認する。'),
    lesson('Borrowed ChordをVoice Leadingで選ぶ','借用コードは種類名より、元のダイアトニックコードからどの音が半音変化するかを見ると実用的に選べる。',['C majorのIV=Fからiv=FmへはA→Abだけが変わるため、内声に半音下降を作れる。','I=Cから♭VI=AbへはCが共通音として残り、E→EbやG→Abの近接進行を作れる。','借用コードの効果はRootの珍しさより、変化音がどの声部に現れるかで大きく変わる。'],'C–F–Fm–CならA→Ab→Gという一つの半音ラインが進行全体の感情を作る。','借用コードを入れる前後の各声部を書き出し、「共通音」「半音変化」「跳躍」の3種類で色分けする。'),
    lesson('Modal Interchangeと転調を区別する','一時的なborrowと本格的なkey changeを区別するには、1コードだけでなく中心音・終止・持続時間・導音の扱いを見る。',['借用コードが出てもすぐ元のTonicへ戻り、旋律の中心も変わらないならModal Interchangeとして説明しやすい。','新しいTonicへのV–Iや長い滞在、旋律終止、調号相当の音変化が続くと転調の根拠が強くなる。','tonicization・modal mixture・modulationは連続的で、実曲では境界が曖昧な場合もある。'],'C major中でAb→G→Cならborrowとして自然だが、Ab majorへ向かうEb7→Abが続き長く滞在すればmodulationの可能性が高まる。','8小節のキー外コードを「borrow / tonicization / modulation」の3候補で仮ラベルし、中心感の証拠を最低2つ書く。')
   ]
  },
  {
   id:'dominant',
   lessons:[
    lesson('Tritone SubstitutionをGuide Toneで理解する','subV7はRootがトライトーン離れていても、元のV7と3rd/7thの核を共有できるため同じTonicへ強く解決できる。',['Cへ進むG7のGuide ToneはBとF。Db7ではFとCb(B)が3rd/7thとして同じ音を持つ。','RootがG→Dbへ置換されることで、ベースはDb→Cの半音下降になり滑らかさが増す。','subV7は「何でも半音上の7thに置換」ではなく、共有するtritoneと解決先を確認して使う。'],'Dm7–G7–Cmaj7をDm7–Db7–Cmaj7へ変えると、ベースD→Db→Cと半音下降しながらGuide Toneの機能を維持できる。','V7とsubV7を交互に弾き、Rootを消して3rd/7thだけ鳴らすと類似性が残るか確認する。'),
    lesson('Backdoor Dominantを♭VII7→Iとして聞く','Backdoorは♭VII7からIへ進む代表的なdominant代替。V7とは異なるroot motionだが、borrowと半音Voice Leadingで柔らかい帰結を作る。',['C majorではBb7→Cmaj7が基本例で、Bb7はParallel minorのiv系統から派生的に説明されることが多い。','Bb7のAbはCmaj7のGへ、DはEへ半音または全音で進み、滑らかな上声を作れる。','subV7とは別物で、Db7→CとBb7→CはRootもGuide Toneも異なるため区別する。'],'Fm7–Bb7–Cmaj7とDm7–G7–Cmaj7を比べると、前者はBackdoor系、後者は通常ii–V–Iとして異なる色になる。','Chorus終止を通常V7→IとBackdoor→Iで差し替え、どちらが柔らかく戻るか歌メロ込みで比較する。'),
    lesson('Dominant susで3rdの登場を遅らせる','V7sus4はdominantの3rdを一時的にsus4へ置き換え、解決方向を保ちながら決定的なGuide Toneの登場を遅らせる。',['G7sus4ではCがsus4で、通常はBへ下がってG7の3rdを形成してからC majorへ解決できる。','susのままIへ進むこともあり、必ずsus4→3rdを内部解決させる必要はない。','Pop/Funkではsus13や9susのように4thを保持したdominant sonority自体を色として使う。'],'Dm7/GのようなUpper StructureでG9susを作り、その後G7→Cへ進めると緊張を二段階にできる。','同じV→Iで①G7 ②G7sus→G7 ③G7sus→Cの3種類を作り、導音Bが現れるタイミングを聞く。'),
    lesson('Dominant ScaleをTension構成で選ぶ','Dominant上のscale選択はコード名だけで固定せず、♭9・♯9・♯11・13など実際に欲しいtensionと解決先から逆算する。',['Mixolydianはnatural 9/13を持つ基本形、Alteredは♭9/♯9/♭5(♯11)/♯5(♭13)をまとめて含む。','Half-Whole Diminishedは♭9/♯9/3/♯11/5/13/♭7など対称的なdominant colorを持つ。','Whole Toneは9/3/♯11/♯5/♭7を持ち、augmented dominantの浮遊感に向く。'],'G7(♭9,13)ならHalf-Whole、G7altならAltered、G7#5ならWhole Tone候補を比較できるが、最終判断はメロディとVoice Leadingで行う。','同じG7→Cに3種類のscaleから2音ずつtensionを選び、どの音がCmaj7のどこへ解決するか矢印で書く。'),
    lesson('Non-functioning Dominantを別カテゴリーで読む','7th chordだから必ずVとして機能するとは限らない。Blues、Mixolydian、constant structureではdominant7thの音色が機能解決とは別目的で使われる。',['BluesではI7・IV7がTonic/Predominant的に長く滞在し、古典的V7→Iの意味とは異なる。','Parallel dominant7thを平行移動する場合、各コードを二次dominantとして無理に読むより音色・root patternで説明した方が自然なことがある。','分析では「dominant7th quality」と「dominant function」を分けて記述する。'],'C7→Eb7→F7のような進行は、各コードが必ず次をV関係で支配しているとは限らず、parallel colorとして聞ける。','実曲の7th chordを5つ拾い、Dominant function / Blues tonic / Color chordのどれに近いか前後関係で分類する。')
   ]
  },
  {
   id:'diminished',
   lessons:[
    lesson('dim7の対称性と4つの根音候補','Fully diminished 7thは短3度ずつ積まれ、転回しても同じ音集合になるため、1つの形から複数の根音・解決先を説明できる。',['Bdim7=B–D–F–AbはDdim7・Fdim7・Abdim7と異名同音的に同じ鍵盤集合を共有できる。','各音を導音として半音上へ解決させれば、4つの異なる目標和音へ向かう可能性を作れる。','理論上の根音は前後の解決先と綴りで判断し、鍵盤形だけで決めない。'],'Bdim7→C、Ddim7→Eb、Fdim7→Gb、G#dim7→Aは同じ鍵盤形を別の綴りと機能で使える。','1つのdim7 voicingを固定し、各構成音をroot候補として4種類の半音上解決を作る。'),
    lesson('Secondary Leading-tone diminishedを目標コードへ解決する','vii°7/xは目標コードxの半音下の導音を根音にして、Secondary DominantよりコンパクトなVoice Leadingで一時的な解決を作る。',['C majorでvii°7/VはF#dim7→G、vii°7/iiはC#dim7→Dmとして使える。','dim7の各声部が目標コードの構成音へ半音または共通音で動くため、ベース以外も強い方向感を持つ。','V/xとvii°7/xは同じ目標を持つが、dominant rootを省いたV7♭9系として関連づけて理解できる場合がある。'],'F#dim7のF#→G、A→BまたはG、C→B、Eb→DのようにG系和音へ近接解決できる。','V/V→Vとvii°7/V→Vを並べ、ベース距離・内声距離・緊張度を比較する。'),
    lesson('Passing diminishedでベースの隙間をつなぐ','Passing diminishedは2つの安定コード間に半音の中継点を置き、ベースと内声を滑らかにつなぐ。',['C→C#dim7→DmのようにRootが半音上行する形は代表的。','機能名だけでなく、前後コードとの共通音と半音進行を見ると自然なvoicingを作りやすい。','Passing diminishedは短く置くことが多いが、保持時間を伸ばすと一時的dominant的な緊張が強くなる。'],'C(E–G–C)→C#dim7(E–G–Bb–C#)→Dm(F–A–D)ならE/Gを一時保持しながら他声部を段階的に動かせる。','I→ii、ii→iiiなど全音離れたダイアトニックコード間へ半音上のdim7を挟み、自然に聞こえる場所を探す。'),
    lesson('Common-tone diminishedで同じ根音を装飾する','Common-tone diminishedは解決先コードの1音を共通音として保持し、他の声部だけを半音で動かして装飾的な緊張を作る。',['C major周辺でCdim7→Cのように、Cを共通音として残し他声部をE/Gへ解決する使い方ができる。','Passing diminishedのようにベースを次へ運ぶより、同じ和音の周辺を一度曇らせて戻る装飾感が強い。','綴りや配置は文脈で変わるため、固定フォームより「何を共通音として残すか」を先に決める。'],'C–Cdim7–Cを弾くと、Tonicを離れず一瞬だけ暗い緊張を挟める。トップノートCを保持すると共通音の役割が明確になる。','Iコードを長く保つ小節で、途中2拍だけcommon-tone diminishedへ変えてメロディを保持したまま色を変える。'),
    lesson('V7♭9とdim7の関係を実戦で使う','Dominant7♭9はRootを除くとdim7を形成するため、dim7 voicingをdominantのUpper Structureとして再利用できる。',['G7♭9=G–B–D–F–AbからRoot Gを除くとB–D–F–Ab=Bdim7になる。','この関係により、dim7の対称形を3半音ずつ移動しても同じG7♭9系のtension集合として扱える。','BassがGを示していれば、上でBdim7系voicingを動かしてdominant tensionを保てる。'],'左手G、右手Bdim7を鳴らすとG7♭9になる。右手形をDdim7/Fdim7/Abdim7の転回として動かしても同じ音集合を保てる。','V7♭9→Iで、右手dim7 voicingを3つの転回形へ変え、どのトップノートがメロディへ最も滑らかに解決するか比較する。')
   ]
  }
 ]
};
const base=window.NEET_GENERAL_MUSIC||{groups:[]};
const ids=new Set(EXPANSION.groups.map(g=>g.id));
base.groups=[...(base.groups||[]).filter(g=>!ids.has(g.id)),...EXPANSION.groups];
window.NEET_GENERAL_MUSIC=base;
window.NEET_CORE_EXPANSION_V2=EXPANSION;
const titles=new Set(EXPANSION.groups.flatMap(g=>g.lessons.map(x=>x.title)));
function relabel(){
 document.querySelectorAll('.tb-row').forEach(row=>{const t=row.querySelector('b')?.textContent?.trim();if(titles.has(t)){const s=row.querySelector('small');if(s)s.textContent='追加教材 · 第2強化';row.dataset.coreExpansion='2'}});
 const h=document.querySelector('#tbReaderHead h2')?.textContent?.trim();
 if(titles.has(h)){const src=document.querySelector('#tbReaderBody .gm-source');if(src){src.classList.add('gm-source-core');const a=src.querySelector('span'),b=src.querySelector('b');if(a)a.textContent='NEET NOTE EXPANSION';if(b)b.textContent='第5〜8編 · 第2強化レッスン'}}
}
function boot(){relabel();new MutationObserver(()=>requestAnimationFrame(relabel)).observe(document.body,{subtree:true,childList:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
