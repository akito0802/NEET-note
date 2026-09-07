const printSongBtn = document.getElementById('printSongBtn');
const printTitle = document.getElementById('printTitle');
const printCredits = document.getElementById('printCredits');
const printMeta = document.getElementById('printMeta');
const printContent = document.getElementById('printContent');

function appendPrintItems(container, items) {
  container.innerHTML = '';
  items.forEach(([label, value]) => {
    const item = document.createElement('span');
    item.textContent = `${label}: ${value || '未設定'}`;
    container.appendChild(item);
  });
}

function buildPrintSheet() {
  const title = document.getElementById('titleInput')?.value.trim() || '無題の曲';
  const lyricist = document.getElementById('lyricistInput')?.value.trim() || '';
  const composer = document.getElementById('composerInput')?.value.trim() || '';
  const arranger = document.getElementById('arrangerInput')?.value.trim() || '';
  const artist = document.getElementById('artistInput')?.value.trim() || '';
  const productionDate = document.getElementById('productionDateInput')?.value || '';
  const key = document.getElementById('keyInput')?.value || '未設定';
  const bpm = document.getElementById('bpmInput')?.value || '未設定';
  const timeSignature = document.getElementById('timeSignatureInput')?.value || '未設定';
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
  printContent.textContent = chords || 'コード進行メモはまだありません。';
  return title;
}

function openPrintDialog() {
  if (typeof autoSaveNow === 'function') autoSaveNow();
  const title = buildPrintSheet();
  const originalTitle = document.title;
  document.title = `${title}_ノート`;
  const restoreTitle = () => {
    document.title = originalTitle;
    window.removeEventListener('afterprint', restoreTitle);
  };
  window.addEventListener('afterprint', restoreTitle);
  window.print();
  window.setTimeout(restoreTitle, 1500);
}

printSongBtn?.addEventListener('click', openPrintDialog);
