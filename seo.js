(()=>{
'use strict';
const BASE='https://akito0802.github.io/NEET-note/';
const path=location.pathname.replace(/\/index\.html$/,'/');
const pages={
  '/NEET-note/':{title:'NEET NOTE | 作曲・歌詞・アイデア・ボイスメモをひとつに',description:'NEET NOTEは、作曲ノート・歌詞メモ・アイデアメモ・ボイスメモ・制作ツールをまとめた無料の音楽制作Webアプリです。スマホ・PCから利用できます。',canonical:BASE},
  '/NEET-note/lyrics.html':{title:'無料の歌詞メモ | NEET NOTE',description:'歌詞をタイトルごとに保存・検索・編集できる、無料の歌詞メモWebアプリ。Aメロ・Bメロ・サビなどのセクション追加にも対応しています。',canonical:BASE+'lyrics.html'},
  '/NEET-note/voice-memo.html':{title:'無料のボイスメモ・メロディ録音 | NEET NOTE',description:'スマホやPCのマイクでメロディや音楽アイデアを録音・再生・保存できる無料のボイスメモWebアプリです。',canonical:BASE+'voice-memo.html'},
  '/NEET-note/ideas.html':{title:'音楽アイデアメモ | NEET NOTE',description:'曲名、歌詞、MV、ジャケット、演出などの音楽アイデアをカテゴリ別に保存・検索できる無料のメモWebアプリです。',canonical:BASE+'ideas.html'},
  '/NEET-note/tools.html':{title:'無料の作曲・演奏支援ツール | NEET NOTE',description:'コード進行ルーレット、移調・カポ変換、メトロノーム、チューナー、ドラムなどを無料で使える音楽制作ツール集です。',canonical:BASE+'tools.html'},
  '/NEET-note/terms.html':{title:'利用規約 | NEET NOTE',description:'個人開発の無料音楽制作Webアプリ「NEET NOTE」の利用条件、禁止事項、保存データ、著作権、免責事項について掲載しています。',canonical:BASE+'terms.html'}
};
const data=pages[path]||pages['/NEET-note/'];
const setMeta=(name,content,property=false)=>{const selector=property?`meta[property="${name}"]`:`meta[name="${name}"]`;let el=document.head.querySelector(selector);if(!el){el=document.createElement('meta');el.setAttribute(property?'property':'name',name);document.head.appendChild(el)}el.setAttribute('content',content)};
const setLink=(rel,href)=>{let el=document.head.querySelector(`link[rel="${rel}"]`);if(!el){el=document.createElement('link');el.rel=rel;document.head.appendChild(el)}el.href=href};
document.title=data.title;setMeta('description',data.description);setMeta('robots','index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');setLink('canonical',data.canonical);setMeta('og:locale','ja_JP',true);setMeta('og:type','website',true);setMeta('og:site_name','NEET NOTE',true);setMeta('og:title',data.title,true);setMeta('og:description',data.description,true);setMeta('og:url',data.canonical,true);setMeta('og:image',BASE+'icon-512.png',true);setMeta('og:image:alt','NEET NOTE アプリアイコン',true);setMeta('twitter:card','summary_large_image');setMeta('twitter:title',data.title);setMeta('twitter:description',data.description);setMeta('twitter:image',BASE+'icon-512.png');
if(!document.getElementById('neetNoteStructuredData')){const json=document.createElement('script');json.id='neetNoteStructuredData';json.type='application/ld+json';json.textContent=JSON.stringify({'@context':'https://schema.org','@type':'WebApplication',name:'NEET NOTE',url:BASE,applicationCategory:'MusicApplication',operatingSystem:'Web',description:'作曲ノート、歌詞メモ、ボイスメモ、アイデアメモ、制作ツールをまとめた無料の音楽制作Webアプリ。',offers:{'@type':'Offer',price:'0',priceCurrency:'JPY'},inLanguage:'ja'});document.head.appendChild(json)}
})();