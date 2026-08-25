(()=>{'use strict';
const KEY='neet-note-ideas-v1';
const list=document.getElementById('ideaList'),search=document.getElementById('ideaSearch'),empty=document.getElementById('ideaEmpty'),editor=document.getElementById('ideaEditor'),title=document.getElementById('ideaTitle'),category=document.getElementById('ideaCategory'),text=document.getElementById('ideaText'),favorite=document.getElementById('ideaFavorite'),status=document.getElementById('ideaStatus');
let ideas=load(),currentId='',currentPage=0,timer;

function load(){try{const x=JSON.parse(localStorage.getItem(KEY));return Array.isArray(x)?x:[]}catch{return[]}}
function saveAll(){localStorage.setItem(KEY,JSON.stringify(ideas))}
function id(){return crypto.randomUUID?crypto.randomUUID():String(Date.now())}
function esc(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function normalizeExtraPages(x){if(!Array.isArray(x.pages))return[];return x.pages.map((p,n)=>typeof p==='string'?{id:`legacy-${n+2}`,text:p}:{id:p?.id||id(),text:p?.text||'',createdAt:p?.createdAt||x.createdAt||new Date().toISOString()})}
function pageCount(x){return 1+normalizeExtraPages(x).length}
function pageText(x,index){if(index===0)return x.text||'';return normalizeExtraPages(x)[index-1]?.text||''}
function allText(x){return [x.text||'',...normalizeExtraPages(x).map(p=>p.text||'')].join(' ')}

function installPageUI(){
  if(!editor||document.getElementById('ideaPageBar'))return;
  const style=document.createElement('style');
  style.textContent=`
    .idea-pagebar{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;padding:9px 10px;border:1px solid var(--border,#ded6c9);border-radius:12px;background:var(--surface,#faf7f1)}
    .idea-pagebar-left,.idea-pagebar-right{display:flex;align-items:center;gap:7px;flex-wrap:wrap}.idea-page-label{min-width:82px;text-align:center;font-size:.72rem;font-weight:800;color:var(--muted,#6b7280)}
    .idea-page-btn{display:inline-flex;align-items:center;justify-content:center;min-width:40px;min-height:38px;padding:0 11px;border:1px solid var(--border,#ded6c9);border-radius:10px;background:var(--paper,#fffdf8);color:inherit;font:inherit;font-size:.75rem;font-weight:800}
    .idea-page-btn:disabled{opacity:.38;cursor:not-allowed}.idea-page-add{color:#765c37;border-color:#cbb48d;background:rgba(184,154,112,.10)}
    @media(max-width:460px){.idea-pagebar{align-items:stretch}.idea-pagebar-left,.idea-pagebar-right{width:100%}.idea-pagebar-left{justify-content:space-between}.idea-pagebar-right .idea-page-add{width:100%}}
  `;
  document.head.appendChild(style);
  const bar=document.createElement('div');
  bar.id='ideaPageBar';bar.className='idea-pagebar';bar.innerHTML=`<div class="idea-pagebar-left"><button id="ideaPrevPage" class="idea-page-btn" type="button" aria-label="前のメモへ">←</button><span id="ideaPageLabel" class="idea-page-label">メモ 1 / 1</span><button id="ideaNextPage" class="idea-page-btn" type="button" aria-label="次のメモへ">→</button></div><div class="idea-pagebar-right"><button id="ideaAddPage" class="idea-page-btn idea-page-add" type="button">＋ 2枚目を追加</button></div>`;
  const memoLabel=text.closest('.field-label');
  editor.insertBefore(bar,memoLabel);
  document.getElementById('ideaPrevPage').addEventListener('click',()=>movePage(-1));
  document.getElementById('ideaNextPage').addEventListener('click',()=>movePage(1));
  document.getElementById('ideaAddPage').addEventListener('click',addPage);
}

function renderPageControls(x){
  const count=pageCount(x),prev=document.getElementById('ideaPrevPage'),next=document.getElementById('ideaNextPage'),label=document.getElementById('ideaPageLabel'),add=document.getElementById('ideaAddPage');
  if(!label)return;
  currentPage=Math.max(0,Math.min(currentPage,count-1));
  label.textContent=`メモ ${currentPage+1} / ${count}`;
  prev.disabled=currentPage===0;next.disabled=currentPage===count-1;
  add.textContent=count===1?'＋ 2枚目を追加':'＋ メモを追加';
}
function showPage(x){currentPage=Math.max(0,Math.min(currentPage,pageCount(x)-1));text.value=pageText(x,currentPage);renderPageControls(x)}
function movePage(step){if(!currentId)return;saveNow();const x=ideas.find(v=>v.id===currentId);if(!x)return;currentPage=Math.max(0,Math.min(currentPage+step,pageCount(x)-1));showPage(x);status.textContent='保存済み';text.focus()}
function addPage(){if(!currentId)return;saveNow();const i=ideas.findIndex(v=>v.id===currentId);if(i<0)return;const now=new Date().toISOString(),pages=normalizeExtraPages(ideas[i]);pages.push({id:id(),text:'',createdAt:now});ideas[i]={...ideas[i],pages,updatedAt:now};saveAll();currentPage=pages.length;showPage(ideas[i]);status.textContent='新しいメモを追加したよ';render();text.focus()}

function render(){
  const q=search.value.trim().toLowerCase();
  const rows=ideas.slice().sort((a,b)=>(b.favorite-a.favorite)||new Date(b.updatedAt)-new Date(a.updatedAt)).filter(x=>[x.title,allText(x),x.category].join(' ').toLowerCase().includes(q));
  list.innerHTML=rows.length?'':'<div style="padding:16px;text-align:center;color:var(--muted)">まだアイデアがないよ。</div>';
  rows.forEach(x=>{const b=document.createElement('button');b.className='idea-item'+(x.id===currentId?' active':'');const count=pageCount(x);b.innerHTML=`<b>${x.favorite?'★ ':''}${esc(x.title||'無題のアイデア')}</b><small>${esc(x.category||'その他')}${count>1?` ・ ${count}枚`:''}</small>`;b.onclick=()=>select(x.id);list.appendChild(b)})
}
function make(){saveNow();const now=new Date().toISOString(),x={id:id(),title:'',category:'曲名',text:'',pages:[],favorite:false,createdAt:now,updatedAt:now};ideas.unshift(x);saveAll();select(x.id);title.focus()}
function select(i){saveNow();const x=ideas.find(v=>v.id===i);if(!x)return;currentId=i;currentPage=0;title.value=x.title||'';category.value=x.category||'その他';favorite.checked=!!x.favorite;showPage(x);empty.hidden=true;editor.hidden=false;status.textContent='保存済み';render()}
function schedule(){if(!currentId)return;status.textContent='保存中…';clearTimeout(timer);timer=setTimeout(saveNow,350)}
function saveNow(){
  clearTimeout(timer);if(!currentId)return;
  const i=ideas.findIndex(v=>v.id===currentId);if(i<0)return;
  const old=ideas[i],pages=normalizeExtraPages(old),now=new Date().toISOString();
  let firstText=old.text||'';
  if(currentPage===0)firstText=text.value;else if(pages[currentPage-1])pages[currentPage-1]={...pages[currentPage-1],text:text.value};
  ideas[i]={...old,title:title.value.trim(),category:category.value,text:firstText,pages,favorite:favorite.checked,updatedAt:now};
  saveAll();status.textContent='保存済み';render();renderPageControls(ideas[i])
}
function remove(){if(!currentId||!confirm('このアイデアを削除しますか？'))return;ideas=ideas.filter(v=>v.id!==currentId);saveAll();currentId='';currentPage=0;editor.hidden=true;empty.hidden=false;render();if(ideas.length)select(ideas[0].id)}

installPageUI();
[title,category,text,favorite].forEach(x=>{x.addEventListener('input',schedule);x.addEventListener('change',schedule)});
search.oninput=render;document.getElementById('newIdeaBtn').onclick=make;document.getElementById('deleteIdea').onclick=remove;
document.getElementById('copyIdea').onclick=async()=>{saveNow();const x=ideas.find(v=>v.id===currentId);if(!x)return;const pages=[x.text||'',...normalizeExtraPages(x).map(p=>p.text||'')];const body=pages.map((v,n)=>pages.length>1?`【メモ ${n+1}】\n${v}`:v).join('\n\n');try{await navigator.clipboard.writeText(`${title.value}\n\n${body}`);status.textContent='コピーしたよ';setTimeout(()=>status.textContent='保存済み',1200)}catch{alert('コピーできなかったよ。')}};
window.addEventListener('beforeunload',saveNow);render();if(ideas.length)select(ideas[0].id);
})();
