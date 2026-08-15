(()=>{
'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const DATA={
  15:{title:'音楽のテクスチュア',note:'『一般音楽論』第5編後半（書籍151ページ以降）本文ベース',items:[
    ['三種類のテクスチュア','モノフォニック、ポリフォニック、ホモフォニックを基本形として、旋律と伴奏・声部の関係からテクスチュアを捉える。'],
    ['グレゴリオ聖歌と教会旋法','グレゴリオ聖歌をモノフォニーの代表として扱い、正格・変格を含む8種類の教会旋法、Final、Reciting Tone、音域から旋法を判断する。'],
    ['聖歌の分析','シラビック、ネウマティック、メリスマティックの違い、最終音・音域・朗唱音と歌詞の対応を確認する。'],
    ['オルガヌムとノートルダム学派','聖歌の旋律へ別声部を加えるオルガヌムから、西洋ポリフォニーが発展していく流れを扱う。レオニヌス、ペロティヌス、リズミックモードも整理する。'],
    ['アルス・ノーヴァとアイソリズム','音高だけでなく反復するリズム型そのものを構造化する考え方を学ぶ。'],
    ['ルネサンスのカノンと模倣','一つの旋律を時間差で別声部が模倣することで、複数の独立した声部を組み立てる。'],
    ['対位法','各声部を旋律として自立させながら、同時に鳴った時の協和・不協和や進行も成立させる。'],
    ['バイフォニック／ヘテロフォニック','二つの主要層からなる構造や、同一旋律を装飾差を付けて同時演奏する構造まで整理する。']
  ]},
  16:{title:'楽曲形式・曲の構造',note:'『一般音楽論』第6編「音楽の形式」書籍182〜220ページ本文ベース',items:[
    ['終止','完全正格終止・不完全正格終止・変格終止・半終止を、フレーズや形式の区切りとして使う。'],
    ['フレーズとピリオド','フレーズ、サブフレーズ、アンティシデント、コンセクエント、パラレル／コントラスティング・ピリオドを整理する。'],
    ['二部形式','二つの主要セクションからなる形式。単純二部形式と周回二部形式などを区別する。'],
    ['三部形式・複合三部形式','A-B-Aを基本とする三部形式と、より大きな単位を持つ複合三部形式を学ぶ。'],
    ['ソナタ形式','提示部・展開部・再現部を中心に、主題・調性・展開の関係から大規模形式を読む。'],
    ['ロンド形式','主要主題が複数回回帰し、その間へ異なるセクションが挟まる構造を捉える。'],
    ['変奏形式','同じ主題を保ちながら、旋律・和声・リズム・伴奏・音色などを変化させる。'],
    ['ポピュラー音楽の形式','Intro、Verse、Chorus、Pre-Chorus、Bridge、Outroなど、現代の曲構成をセクション単位で整理する。'],
    ['ジャンル別の構成','ロック、ブルース、ジャズなど、ジャンルごとに典型的なセクション構成や反復単位を見る。']
  ]},
  18:{title:'編曲・アレンジ／楽器編成',note:'『一般音楽論』第7編「音楽の編成」書籍224〜244ページ本文ベース',items:[
    ['ポピュラー音楽の編成','歌、ギター／キーボード、ベース、ドラムを基本に、各楽器の音域・音色・役割を補完関係として考える。'],
    ['独奏','ピアノなど単独で旋律・和声・強弱を担える楽器と、単旋律楽器による独奏の違いを整理する。'],
    ['室内楽','2〜10人程度の小編成を中心に、Duo、Trio、Quartetなど奏者数による名称と各パートの独立性を学ぶ。'],
    ['弦楽・管楽室内楽','弦楽三重奏／四重奏、木管五重奏、金管四重奏／五重奏など、音色と音域の組み合わせを確認する。'],
    ['ピエロアンサンブル','フルート、クラリネット、ヴァイオリン、チェロ、ピアノを核とする特徴的な小編成を扱う。'],
    ['弦楽合奏','弦五部の人数比、divisi、unisonなど、大きな弦セクションを組織する考え方を学ぶ。'],
    ['オーケストラ','弦・木管・金管・打楽器を含む大規模編成と、交響曲における各セクションの役割を整理する。'],
    ['古典派からロマン派へ','古典派の比較的小規模な編成から、木管・金管・打楽器を拡張したロマン派の大編成への変化を見る。'],
    ['吹奏楽・大規模編成','管楽器と打楽器を中心とした編成や、近代以降の大規模オーケストレーションまで視野を広げる。']
  ]},
  19:{title:'音響・音色・サウンドデザイン',note:'『一般音楽論』第9編「音の正体」書籍296〜300ページで確認できる本文範囲',items:[
    ['疎密波としての音','空気中の音は圧縮と希薄化が伝わる疎密波として捉える。音源の振動と、空気を伝わる波を分けて考える。'],
    ['音の知覚','物理的な振動が耳へ届き、知覚として音になるまでを分けて考える。周波数・強さと、実際に感じる高さ・大きさは同一ではない。'],
    ['今回のPDF範囲','第9編は300ページで途中。301ページ以降の音速・音圧・倍音などは、このファイルだけでは本文確認できないためPDF本文由来としてはここで止める。']
  ]},
  21:{title:'音楽史・様式',note:'『一般音楽論』第8編「音楽の様式」書籍248〜295ページ本文ベース',items:[
    ['絶対音楽','音楽外の物語や情景を明示的な題材とせず、形式・調・編成など音楽内部の構造を中心に成立させる考え方を扱う。'],
    ['標題音楽と交響詩','音楽外の出来事や情景と結び付く標題音楽、その代表的な管弦楽ジャンルである交響詩を整理する。'],
    ['イデーフィクスとライトモティーフ','人物・感情・観念などと結び付く旋律を繰り返し、変形しながら作品全体を統一する技法を学ぶ。'],
    ['ナショナリズムの音楽','地域の民謡・舞曲・文化的特徴を作品へ反映し、国や地域のアイデンティティを音楽で表す流れを見る。'],
    ['トリスタン和音と調性からの脱却','19世紀後半の半音階和声が機能和声の枠を押し広げ、ポストトーナルへ向かう流れを追う。'],
    ['印象派の音楽','機能和声だけに依存せず、音階・響き・平行的な和音・音色を前景化する書法を扱う。'],
    ['新ウィーン楽派','シェーンベルク、ベルク、ウェーベルンと、自由無調・十二音技法へ向かう20世紀音楽を整理する。'],
    ['原始主義・パンディアトニシズム','強い反復やアクセント、ダイアトニック音を機能和声から解放して扱う発想など、新しい音楽表現を学ぶ。'],
    ['その他の新しい表現','第8編後半で扱われる20世紀以降の様々な表現方法を、従来の調性・形式との違いから整理する。']
  ]}
};
function panel(no){
 const d=DATA[no]; if(!d)return'';
 return `<section class="pdf-force-panel" data-pdf-no="${no}"><div class="pdf-force-head"><div><span>PDF 151–300 反映</span><b>${esc(d.title)}</b></div><small>${esc(d.note)}</small></div><div class="pdf-force-list">${d.items.map((x,i)=>`<details ${i===0?'open':''}><summary><span>${String(i+1).padStart(2,'0')}</span><b>${esc(x[0])}</b><em>＋</em></summary><p>${esc(x[1])}</p></details>`).join('')}</div></section>`;
}
function mountBase(){
 const ch=document.getElementById('tbChapter');
 const head=document.querySelector('#tbChapterHead h2');
 if(!ch||!head||ch.hidden)return;
 let no=0;
 if(head.textContent.includes('テクスチュア'))no=15;
 else if(head.textContent.includes('楽曲形式')||head.textContent.includes('曲の構造'))no=16;
 if(!no)return;
 const old=ch.querySelector('.pdf-force-panel');
 if(old?.dataset.pdfNo===String(no))return;
 old?.remove();
 document.getElementById('tbChapterHead')?.insertAdjacentHTML('afterend',panel(no));
}
function mountExt(id,no){
 const ch=document.getElementById(id); if(!ch)return;
 if(ch.querySelector(`.pdf-force-panel[data-pdf-no="${no}"]`))return;
 const anchor=ch.querySelector('.tb-ch-title');
 if(anchor)anchor.insertAdjacentHTML('afterend',panel(no));
}
function run(){
 mountBase();
 mountExt('tbArrangementChapter',18);
 mountExt('tbSoundChapter',19);
 mountExt('tbStyleHistoryChapter',21);
}
const style=document.createElement('style');
style.textContent=`.pdf-force-panel{margin:14px 0 18px;padding:14px;border:1px solid #d5c09f;border-radius:16px;background:linear-gradient(180deg,#fffaf1,#fffdf8);box-shadow:0 5px 18px rgba(80,60,30,.05)}.pdf-force-head{display:flex;justify-content:space-between;gap:12px;align-items:flex-end;margin-bottom:10px}.pdf-force-head span{display:block;color:var(--accent);font-size:.62rem;font-weight:950;letter-spacing:.08em}.pdf-force-head b{display:block;margin-top:2px;font-size:.92rem}.pdf-force-head small{max-width:48%;color:var(--muted);font-size:.62rem;line-height:1.45;text-align:right}.pdf-force-list details{border-top:1px solid #e8ddcc;padding:9px 0}.pdf-force-list details:first-child{border-top:0}.pdf-force-list summary{display:grid;grid-template-columns:30px 1fr auto;gap:8px;align-items:center;list-style:none;cursor:pointer}.pdf-force-list summary::-webkit-details-marker{display:none}.pdf-force-list summary span{display:grid;place-items:center;width:28px;height:28px;border-radius:9px;background:var(--soft);color:var(--accent);font-size:.64rem;font-weight:950}.pdf-force-list summary b{font-size:.79rem}.pdf-force-list summary em{font-style:normal;color:var(--accent);font-size:.9rem}.pdf-force-list p{margin:8px 2px 2px 38px;color:var(--muted);font-size:.76rem;line-height:1.75}@media(max-width:640px){.pdf-force-head{display:block}.pdf-force-head small{display:block;max-width:none;margin-top:4px;text-align:left}.pdf-force-panel{padding:12px}.pdf-force-list p{margin-left:0}}`;
document.head.appendChild(style);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
new MutationObserver(run).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});
let n=0;const timer=setInterval(()=>{run();if(++n>30)clearInterval(timer)},250);
})();