const STORAGE_KEY = "song-note-songs-v1";

const listView = document.getElementById("listView");
const editorView = document.getElementById("editorView");
const songList = document.getElementById("songList");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const saveStatus = document.getElementById("saveStatus");

const fields = {
  id: document.getElementById("songId"),
  title: document.getElementById("titleInput"),
  lyricist: document.getElementById("lyricistInput"),
  composer: document.getElementById("composerInput"),
  arranger: document.getElementById("arrangerInput"),
  artist: document.getElementById("artistInput"),
  productionDate: document.getElementById("productionDateInput"),
  key: document.getElementById("keyInput"),
  bpm: document.getElementById("bpmInput"),
  timeSignature: document.getElementById("timeSignatureInput"),
  structure: document.getElementById("structureInput"),
  chords: document.getElementById("chordsInput"),
  mood: document.getElementById("moodInput"),
  theme: document.getElementById("themeInput"),
  lyricIdea: document.getElementById("lyricIdeaInput")
};

const audioInput = document.getElementById("audioInput");
const audioPreviewWrap = document.getElementById("audioPreviewWrap");
const audioPreview = document.getElementById("audioPreview");
const songCardTemplate = document.getElementById("songCardTemplate");

let songs = loadSongs();
let currentAudioData = "";
let saveTimer = null;

function loadSongs() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistSongs() { localStorage.setItem(STORAGE_KEY, JSON.stringify(songs)); }
function makeId() { return crypto.randomUUID ? crypto.randomUUID() : String(Date.now()); }

function newSong() {
  const song = {
    id: makeId(), title: "", lyricist: "", composer: "", arranger: "", artist: "", productionDate: "",
    key: "", bpm: "", timeSignature: "", structure: "", chords: "", mood: "", theme: "", lyricIdea: "", audioData: "",
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
  };
  songs.unshift(song);
  persistSongs();
  openEditor(song.id);
}

function openEditor(id) {
  const song = songs.find(item => item.id === id);
  if (!song) return;
  fields.id.value = song.id;
  fields.title.value = song.title || "";
  fields.lyricist.value = song.lyricist || "";
  fields.composer.value = song.composer || "";
  fields.arranger.value = song.arranger || "";
  fields.artist.value = song.artist || "";
  fields.productionDate.value = song.productionDate || "";
  fields.key.value = song.key || "";
  fields.bpm.value = song.bpm || "";
  fields.timeSignature.value = song.timeSignature || "";
  fields.structure.value = song.structure || "";
  fields.chords.value = song.chords || "";
  fields.mood.value = song.mood || "";
  fields.theme.value = song.theme || "";
  fields.lyricIdea.value = song.lyricIdea || song.lyrics || "";
  currentAudioData = song.audioData || "";
  renderAudioPreview();
  saveStatus.textContent = "保存済み";
  listView.classList.remove("active");
  editorView.classList.add("active");
  window.scrollTo({ top: 0, behavior: "instant" });
}

function showList() {
  autoSaveNow();
  editorView.classList.remove("active");
  listView.classList.add("active");
  renderSongList();
  window.scrollTo({ top: 0, behavior: "instant" });
}

function collectFormData() {
  return {
    title: fields.title.value.trim(), lyricist: fields.lyricist.value.trim(), composer: fields.composer.value.trim(),
    arranger: fields.arranger.value.trim(), artist: fields.artist.value.trim(), productionDate: fields.productionDate.value,
    key: fields.key.value, bpm: fields.bpm.value, timeSignature: fields.timeSignature.value,
    structure: fields.structure.value, chords: fields.chords.value, mood: fields.mood.value,
    theme: fields.theme.value.trim(), lyricIdea: fields.lyricIdea.value, audioData: currentAudioData
  };
}

function scheduleSave() {
  saveStatus.textContent = "保存中…";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(autoSaveNow, 350);
}

function autoSaveNow() {
  clearTimeout(saveTimer);
  const id = fields.id.value;
  if (!id) return;
  const index = songs.findIndex(item => item.id === id);
  if (index === -1) return;
  songs[index] = { ...songs[index], ...collectFormData(), updatedAt: new Date().toISOString() };
  persistSongs();
  saveStatus.textContent = "保存済み";
}

function renderSongList() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = songs.slice().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).filter(song => {
    const haystack = [song.title, song.lyricist, song.composer, song.arranger, song.artist, song.productionDate,
      song.key, song.bpm, song.timeSignature, song.structure, song.chords, song.mood, song.theme, song.lyricIdea, song.lyrics]
      .join(" ").toLowerCase();
    return haystack.includes(query);
  });

  songList.innerHTML = "";
  emptyState.classList.toggle("hidden", songs.length !== 0 || query !== "");
  if (songs.length > 0 && filtered.length === 0) {
    songList.innerHTML = '<div class="empty-state"><h2>見つかりませんでした</h2><p>別の言葉で検索してみてね。</p></div>';
    return;
  }

  filtered.forEach(song => {
    const node = songCardTemplate.content.cloneNode(true);
    const card = node.querySelector(".song-card");
    const title = node.querySelector(".song-title");
    const meta = node.querySelector(".song-meta");
    const date = node.querySelector(".song-date");
    const preview = node.querySelector(".song-preview");
    title.textContent = song.title || "無題の曲";
    const metaItems = [song.artist || "", song.mood || "", song.key ? `Key ${song.key}` : "", song.bpm ? `${song.bpm} BPM` : ""].filter(Boolean);
    meta.textContent = metaItems.length ? metaItems.join(" · ") : "作品情報未設定";
    date.textContent = new Intl.DateTimeFormat("ja-JP", { month: "numeric", day: "numeric" }).format(new Date(song.updatedAt));
    preview.textContent = song.lyricIdea?.trim() || song.theme?.trim() || song.chords?.trim() || song.structure?.trim() || "まだ内容がありません";
    card.addEventListener("click", () => openEditor(song.id));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openEditor(song.id); }
    });
    songList.appendChild(node);
  });
}

function deleteCurrentSong() {
  const id = fields.id.value;
  if (!id) return;
  const song = songs.find(item => item.id === id);
  const title = song?.title || "無題の曲";
  if (!confirm(`「${title}」を削除しますか？`)) return;
  songs = songs.filter(item => item.id !== id);
  persistSongs();
  fields.id.value = "";
  showList();
}

function renderAudioPreview() {
  if (currentAudioData) { audioPreview.src = currentAudioData; audioPreviewWrap.classList.remove("hidden"); }
  else { audioPreview.removeAttribute("src"); audioPreview.load(); audioPreviewWrap.classList.add("hidden"); }
}

function handleAudioFile(file) {
  if (!file) return;
  const maxSize = 4 * 1024 * 1024;
  if (file.size > maxSize) { alert("音源が大きすぎます。4MB以下のファイルを選んでください。"); audioInput.value = ""; return; }
  const reader = new FileReader();
  reader.onload = () => { currentAudioData = reader.result; renderAudioPreview(); scheduleSave(); };
  reader.readAsDataURL(file);
}

document.getElementById("newSongBtn").addEventListener("click", newSong);
document.getElementById("emptyNewSongBtn").addEventListener("click", newSong);
document.getElementById("backBtn").addEventListener("click", showList);
document.getElementById("doneBtn").addEventListener("click", showList);
document.getElementById("deleteBtn").addEventListener("click", deleteCurrentSong);
Object.values(fields).forEach(field => { if (field && field.id !== "songId") { field.addEventListener("input", scheduleSave); field.addEventListener("change", scheduleSave); } });
audioInput.addEventListener("change", event => handleAudioFile(event.target.files[0]));
document.getElementById("removeAudioBtn").addEventListener("click", () => { currentAudioData = ""; audioInput.value = ""; renderAudioPreview(); scheduleSave(); });
searchInput.addEventListener("input", renderSongList);
window.addEventListener("beforeunload", autoSaveNow);
renderSongList();