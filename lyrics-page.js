(()=>{
'use strict';
const STORAGE_KEY='neet-note-lyrics-memos-v1';
const list=document.getElementById('lyricsNoteList');
const search=document.getElementById('lyricsSearch');
const empty=document.getElementById('lyricsEmpty');
const workspace=document.getElementById('lyricsWorkspace');
const titleInput=document.getElementById('lyricsTitleInput');
const text=document.getElementById('lyricsText');
const count=document.getElementById('lyricsCount');
const status=document.getElementById('lyricsStatus');
let notes=loadNotes(),currentId='',timer=null;

function loadNotes(){try{const value=JSON.parse(localStorage.getItem(STORAGE_KEY));return Array.isArray(value)?value:[]}catch{return[]}}
function persist(){localStorage.setItem(STORAGE_KEY,JSON.stringify(notes));window.dispatchEvent(new CustomEvent('neet-note-lyrics-updated',{detail:{notes}}))}
function makeId(){return crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random().toString(16).slice(2)}`}
function escapeHtml(value){return String(value).replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]))}
function formatDate(value){try{return new Intl.DateTimeFormat('ja-JP',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(value))}catch{return''}}
function updateCount(){count.textContent=`${text.value.length}文字`}

function newNote(){saveNow();const now=new Date().toISOString();const note={id:makeId(),title:'',text:'',createdAt:now,updatedAt:now};notes.unshift(note);persist();selectNote(note.id);titleInput.focus()}
function render(){const q=search.value.trim().toLowerCase();const filtered=notes.slice().sort((a,b)=>new Date(b.updatedAt)-new Date(a.updatedAt)).filter(note=>[note.title,note.text].join(' ').toLowerCase().includes(q));list.innerHTML='';if(!notes.length){list.innerHTML='<div style="padding:18px;text-align:center;color:var(--muted,#6b7280)">まだ歌詞メモがないよ。</div>';return}if(!filtered.length){list.innerHTML='<div style="padding:18px;text-align:center;color:var(--muted,#6b7280)">見つからなかったよ。</div>';return}filtered.forEach(note=>{const button=document.createElement('button');button.type='button';button.className='lyrics-note'+(note.id===currentId?' active':'');button.innerHTML=`<b>${escapeHtml(note.title||'無題の歌詞')}</b><small>${note.text.length}文字 · ${formatDate(note.updatedAt)}</small>`;button.onclick=()=>selectNote(note.id);list.appendChild(button)})}
function selectNote(id){saveNow();const note=notes.find(item=>item.id===id);if(!note)return;currentId=id;titleInput.value=note.title||'';text.value=note.text||'';empty.hidden=true;workspace.hidden=false;status.textContent='保存済み';updateCount();render()}
function scheduleSave(){if(!currentId)return;status.textContent='保存中…';clearTimeout(timer);timer=setTimeout(saveNow,350)}
function saveNow(){clearTimeout(timer);if(!currentId)return;const index=notes.findIndex(note=>note.id===currentId);if(index<0)return;notes[index]={...notes[index],title:titleInput.value.trim(),text:text.value,updatedAt:new Date().toISOString()};persist();status.textContent='保存済み';render()}
function deleteCurrent(){if(!currentId)return;const note=notes.find(item=>item.id===currentId);if(!confirm(`「${note?.title||'無題の歌詞'}」を削除しますか？`))return;notes=notes.filter(item=>item.id!==currentId);persist();currentId='';workspace.hidden=true;empty.hidden=false;render();if(notes.length)selectNote(notes[0].id)}
function insertSection(){const sections=['【Aメロ】','【Bメロ】','【サビ】','【Cメロ】','【イントロ】','【アウトロ】'];const choice=prompt(`追加するセクション名を入力してね。\n例：${sections.join('、')}`,'【Aメロ】');if(!choice)return;const start=text.selectionStart,end=text.selectionEnd,before=text.value.slice(0,start),after=text.value.slice(end),prefix=before&&!before.endsWith('\n')?'\n\n':'';text.value=before+prefix+choice+'\n'+after;const caret=(before+prefix+choice+'\n').length;text.setSelectionRange(caret,caret);text.focus();updateCount();scheduleSave()}
async function copyLyrics(){try{await navigator.clipboard.writeText(text.value);status.textContent='歌詞をコピーしたよ';setTimeout(()=>status.textContent='保存済み',1300)}catch{alert('コピーできなかったよ。歌詞を長押ししてコピーしてね。')}}

text.addEventListener('input',()=>{updateCount();scheduleSave()});
titleInput.addEventListener('input',scheduleSave);
search.addEventListener('input',render);
document.getElementById('newLyricsBtn').addEventListener('click',newNote);
document.getElementById('emptyNewLyricsBtn').addEventListener('click',newNote);
document.getElementById('insertSection').addEventListener('click',insertSection);
document.getElementById('copyLyrics').addEventListener('click',copyLyrics);
document.getElementById('deleteLyrics').addEventListener('click',deleteCurrent);
window.addEventListener('beforeunload',saveNow);
window.addEventListener('storage',()=>{notes=loadNotes();render()});

render();
if(notes.length)selectNote(notes[0].id);
})();
