const printChordMemoBtn = document.getElementById('printChordMemoBtn');
const printTitle = document.getElementById('printTitle');
const printCredits = document.getElementById('printCredits');
const printMeta = document.getElementById('printMeta');
const printContent = document.getElementById('printContent');

function appendPrintItems(container, items) {
  container.innerHTML = '';
  items.filter(([, value]) => value).forEach(([label, value]) => {
    const item = document.createElement('span');
    item.textContent = `${label}: ${value}`;
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
}

if (printChordMemoBtn) {
  printChordMemoBtn.addEventListener('click', () => {
    buildPrintSheet();
    window.print();
  });
}