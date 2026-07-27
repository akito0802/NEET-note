const printChordMemoBtn = document.getElementById('printChordMemoBtn');
const printTitle = document.getElementById('printTitle');
const printMeta = document.getElementById('printMeta');
const printContent = document.getElementById('printContent');

function buildPrintSheet() {
  const title = document.getElementById('titleInput')?.value.trim() || '無題の曲';
  const key = document.getElementById('keyInput')?.value || '未設定';
  const bpm = document.getElementById('bpmInput')?.value || '未設定';
  const timeSignature = document.getElementById('timeSignatureInput')?.value || '未設定';
  const chords = document.getElementById('chordsInput')?.value || '';

  printTitle.textContent = title;
  printMeta.innerHTML = '';

  [
    `Key: ${key}`,
    `BPM: ${bpm}`,
    `拍子: ${timeSignature}`
  ].forEach(text => {
    const item = document.createElement('span');
    item.textContent = text;
    printMeta.appendChild(item);
  });

  printContent.textContent = chords || 'コード進行メモはまだありません。';
}

if (printChordMemoBtn) {
  printChordMemoBtn.addEventListener('click', () => {
    buildPrintSheet();
    window.print();
  });
}
