const printChordMemoBtn = document.getElementById('printChordMemoBtn');
const printSongBtn = document.getElementById('printSongBtn');
const savePdfBtn = document.getElementById('savePdfBtn');
const printTitle = document.getElementById('printTitle');
const printCredits = document.getElementById('printCredits');
const printMeta = document.getElementById('printMeta');
const printStructure = document.getElementById('printStructure');
const printLyrics = document.getElementById('printLyrics');
const printContent = document.getElementById('printContent');

function appendPrintItems(container, items) {
  container.innerHTML = '';
  items.filter(([, value]) => value).forEach(([label, value]) => {
    const item = document.createElement('span');
    item.textContent = `${label}: ${value}`;
    container.appendChild(item);
  });
}

function fillPrintSection(element, sectionId, value, emptyMessage) {
  if (!element) return;
  const section = document.getElementById(sectionId);
  const text = String(value || '').trim();
  element.textContent = text || emptyMessage;
  section?.classList.toggle('print-section-empty', !text);
}

function buildPrintSheet(options = {}) {
  const title = document.getElementById('titleInput')?.value.trim() || '無題の曲';
  const lyricist = document.getElementById('lyricistInput')?.value.trim() || '';
  const composer = document.getElementById('composerInput')?.value.trim() || '';
  const arranger = document.getElementById('arrangerInput')?.value.trim() || '';
  const artist = document.getElementById('artistInput')?.value.trim() || '';
  const productionDate = document.getElementById('productionDateInput')?.value || '';
  const key = document.getElementById('keyInput')?.value || '未設定';
  const bpm = document.getElementById('bpmInput')?.value || '未設定';
  const timeSignature = document.getElementById('timeSignatureInput')?.value || '未設定';
  const structure = document.getElementById('structureInput')?.value || '';
  const lyrics = document.getElementById('lyricIdeaInput')?.value || '';
  const chords = document.getElementById('chordsInput')?.value || '';

  printTitle.textContent = title;
  appendPrintItems(printCredits, [
    ['アーティスト', artist],
    ['作詞', lyricist],
    ['作曲', composer],
    ['編曲', arranger],
    ['制作日', productionDate]
  ]);
  appendPrintItems(printMeta, [
    ['Key', key],
    ['BPM', bpm],
    ['拍子', timeSignature]
  ]);

  fillPrintSection(printStructure, 'printStructureSection', structure, '曲の構成はまだありません。');
  fillPrintSection(printLyrics, 'printLyricsSection', lyrics, '歌詞メモはまだありません。');
  fillPrintSection(printContent, 'printChordsSection', chords, 'コード進行メモはまだありません。');

  document.documentElement.dataset.printMode = options.chordsOnly ? 'chords' : 'song';
  return title;
}

function openPrintDialog(options = {}) {
  if (typeof autoSaveNow === 'function') autoSaveNow();
  const title = buildPrintSheet(options);
  const originalTitle = document.title;
  document.title = `${title} - NEET NOTE`;
  window.print();
  window.setTimeout(() => {
    document.title = originalTitle;
    delete document.documentElement.dataset.printMode;
  }, 800);
}

printChordMemoBtn?.addEventListener('click', () => openPrintDialog({ chordsOnly: true }));
printSongBtn?.addEventListener('click', () => openPrintDialog());
savePdfBtn?.addEventListener('click', () => openPrintDialog());
