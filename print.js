const printSongBtn = document.getElementById('printSongBtn');
let currentPrintJob = null;

function readPrintData() {
  const value = id => document.getElementById(id)?.value?.trim() || '';
  return {
    title: value('titleInput') || '無題の曲',
    artist: value('artistInput'),
    lyricist: value('lyricistInput'),
    composer: value('composerInput'),
    arranger: value('arrangerInput'),
    productionDate: value('productionDateInput'),
    key: value('keyInput') || '未設定',
    bpm: value('bpmInput') || '未設定',
    timeSignature: value('timeSignatureInput') || '未設定',
    lyrics: document.getElementById('lyricIdeaInput')?.value || '',
    chords: document.getElementById('chordsInput')?.value || ''
  };
}

function safeFileName(title) {
  return (title || '無題の曲').replace(/[\\/:*?"<>|]/g, '_').slice(0, 70) + '_ノート.pdf';
}

function makePageCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = 1240;
  canvas.height = 1754;
  const context = canvas.getContext('2d');
  context.fillStyle = '#fff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#171717';
  context.textBaseline = 'top';
  return { canvas, context };
}

function drawWrappedTokens(context, tokens, x, y, maxWidth, gap, lineHeight) {
  let cursorX = x;
  let cursorY = y;
  tokens.forEach(token => {
    const width = context.measureText(token).width;
    if (cursorX > x && cursorX + width > x + maxWidth) {
      cursorX = x;
      cursorY += lineHeight;
    }
    context.fillText(token, cursorX, cursorY);
    cursorX += width + gap;
  });
  return cursorY + lineHeight;
}

function wrapText(context, text, maxWidth) {
  if (!text) return [''];
  const rows = [];
  String(text).split('\n').forEach(sourceLine => {
    if (sourceLine === '') {
      rows.push('');
      return;
    }
    let line = '';
    for (const char of Array.from(sourceLine)) {
      const candidate = line + char;
      if (line && context.measureText(candidate).width > maxWidth) {
        rows.push(line);
        line = char;
      } else {
        line = candidate;
      }
    }
    rows.push(line);
  });
  return rows;
}

function buildPageCanvases(data) {
  const pages = [];
  let page = makePageCanvas();
  pages.push(page.canvas);
  let context = page.context;
  const marginX = 136;
  const contentWidth = 968;
  const pageBottom = 1688;
  let y = 140;

  context.font = '800 48px -apple-system,BlinkMacSystemFont,"Helvetica Neue","Hiragino Sans","Yu Gothic",sans-serif';
  context.fillText(data.title, marginX, y);
  y += 82;

  context.font = '27px -apple-system,BlinkMacSystemFont,"Helvetica Neue","Hiragino Sans","Yu Gothic",sans-serif';
  y = drawWrappedTokens(context, [
    `アーティスト: ${data.artist || '未設定'}`,
    `作詞: ${data.lyricist || '未設定'}`,
    `作曲: ${data.composer || '未設定'}`,
    `編曲: ${data.arranger || '未設定'}`,
    `制作日: ${data.productionDate || '未設定'}`
  ], marginX, y, contentWidth, 36, 42);
  y += 7;
  context.strokeStyle = '#999';
  context.lineWidth = 1.5;
  context.beginPath();
  context.moveTo(marginX, y);
  context.lineTo(marginX + contentWidth, y);
  context.stroke();
  y += 30;

  y = drawWrappedTokens(context, [
    `Key: ${data.key}`,
    `BPM: ${data.bpm}`,
    `拍子: ${data.timeSignature}`
  ], marginX, y, contentWidth, 45, 42);
  y += 7;
  context.beginPath();
  context.moveTo(marginX, y);
  context.lineTo(marginX + contentWidth, y);
  context.stroke();
  y += 47;

  context.font = '800 31px -apple-system,BlinkMacSystemFont,"Helvetica Neue","Hiragino Sans","Yu Gothic",sans-serif';
  context.fillText('コード進行メモ', marginX, y);
  y += 48;
  context.beginPath();
  context.moveTo(marginX, y);
  context.lineTo(marginX + contentWidth, y);
  context.stroke();
  y += 37;

  context.font = '27px -apple-system,BlinkMacSystemFont,"Helvetica Neue","Hiragino Sans","Yu Gothic",sans-serif';
  const lyrics = String(data.lyrics || '').trim();
  const chords = String(data.chords || '').trim();
  const noteBody = [lyrics, chords].filter(Boolean).join('\n\n') || '歌詞・コード進行メモはまだありません。';
  const lines = wrapText(context, noteBody, contentWidth);
  const lineHeight = 47;

  lines.forEach(line => {
    if (y + lineHeight > pageBottom) {
      page = makePageCanvas();
      pages.push(page.canvas);
      context = page.context;
      context.font = '27px -apple-system,BlinkMacSystemFont,"Helvetica Neue","Hiragino Sans","Yu Gothic",sans-serif';
      y = 18;
    }
    if (line) context.fillText(line, marginX, y);
    y += lineHeight;
  });

  return pages;
}

function ensurePreviewModal() {
  let modal = document.getElementById('notePrintPreview');
  if (modal) return modal;
  modal = document.createElement('div');
  modal.id = 'notePrintPreview';
  modal.className = 'note-print-preview';
  modal.innerHTML = `
    <section class="note-print-preview-panel" role="dialog" aria-modal="true" aria-labelledby="notePrintPreviewTitle">
      <header class="note-print-preview-head">
        <div><small>PRINT PREVIEW</small><h2 id="notePrintPreviewTitle">印刷レイアウト</h2></div>
        <button id="closePrintPreviewBtn" type="button" aria-label="プレビューを閉じる">×</button>
      </header>
      <div id="notePrintPreviewPages" class="note-print-preview-pages"></div>
      <footer class="note-print-preview-actions">
        <button id="cancelPrintPreviewBtn" type="button" class="ghost-button">閉じる</button>
        <button id="exportPrintPreviewBtn" type="button" class="primary-button">📄 PDF保存・印刷</button>
      </footer>
    </section>`;
  document.body.appendChild(modal);
  const close = () => closePrintPreview();
  modal.querySelector('#closePrintPreviewBtn').addEventListener('click', close);
  modal.querySelector('#cancelPrintPreviewBtn').addEventListener('click', close);
  modal.addEventListener('click', event => {
    if (event.target === modal) close();
  });
  modal.querySelector('#exportPrintPreviewBtn').addEventListener('click', exportCurrentPrintJob);
  return modal;
}

function closePrintPreview() {
  const modal = document.getElementById('notePrintPreview');
  modal?.classList.remove('open');
  document.body.style.overflow = '';
  currentPrintJob = null;
  const pages = document.getElementById('notePrintPreviewPages');
  if (pages) pages.innerHTML = '';
}

function openPrintPreview() {
  if (typeof autoSaveNow === 'function') autoSaveNow();
  try {
    const data = readPrintData();
    const canvases = buildPageCanvases(data);
    currentPrintJob = { data, canvases };
    const modal = ensurePreviewModal();
    const pages = modal.querySelector('#notePrintPreviewPages');
    pages.innerHTML = '';
    canvases.forEach((canvas, index) => {
      const pageWrap = document.createElement('figure');
      pageWrap.className = 'note-print-page';
      const label = document.createElement('figcaption');
      label.textContent = `${index + 1} / ${canvases.length}`;
      pageWrap.append(canvas, label);
      pages.appendChild(pageWrap);
    });
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.note-print-preview-panel').scrollTop = 0;
  } catch (error) {
    console.error(error);
    alert(`印刷レイアウトを表示できなかったよ。\n${error.message || ''}`);
  }
}

function makePdf(job) {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
  job.canvases.forEach((canvas, index) => {
    if (index > 0) pdf.addPage();
    pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
  });
  pdf.setProperties({ title: job.data.title + '_ノート', subject: 'NEET NOTE コード進行メモ' });
  return pdf;
}

async function exportCurrentPrintJob() {
  if (!currentPrintJob) return;
  const button = document.getElementById('exportPrintPreviewBtn');
  const originalLabel = button.textContent;
  button.disabled = true;
  button.textContent = 'PDF作成中…';

  try {
    if (!window.jspdf?.jsPDF) throw new Error('PDF機能を読み込めませんでした');
    const pdf = makePdf(currentPrintJob);
    const fileName = safeFileName(currentPrintJob.data.title);
    const blob = pdf.output('blob');
    const file = new File([blob], fileName, { type: 'application/pdf' });

    if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
      try {
        await navigator.share({ files: [file], title: currentPrintJob.data.title + '_ノート' });
        return;
      } catch (shareError) {
        if (shareError?.name === 'AbortError') return;
      }
    }
    pdf.save(fileName);
  } catch (error) {
    console.error(error);
    alert(`PDFを作成できなかったよ。\n${error.message || ''}`);
  } finally {
    button.disabled = false;
    button.textContent = originalLabel;
  }
}

printSongBtn?.addEventListener('click', openPrintPreview);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && document.getElementById('notePrintPreview')?.classList.contains('open')) {
    closePrintPreview();
  }
});
