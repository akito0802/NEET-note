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

function stylePdfSheet(sheet) {
  sheet.removeAttribute('aria-hidden');
  sheet.style.cssText = 'display:block;position:fixed;left:-10000px;top:0;width:794px;min-height:1123px;box-sizing:border-box;padding:86px 87px 48px;background:#fff;color:#161616;font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue","Hiragino Sans","Yu Gothic",sans-serif;';
  const title = sheet.querySelector('h1');
  title.style.cssText = 'margin:0 0 22px;font-size:34px;font-weight:800;line-height:1.2;letter-spacing:-.02em;';
  sheet.querySelectorAll('.print-meta').forEach(meta => {
    meta.style.cssText = 'display:flex;flex-wrap:wrap;align-items:baseline;column-gap:28px;row-gap:7px;margin:0;padding:0 0 14px;border-bottom:1px solid #aaa;font-size:16px;line-height:1.5;';
  });
  sheet.querySelector('.print-credits').style.marginBottom = '17px';
  sheet.querySelector('.print-settings').style.marginBottom = '35px';
  const heading = sheet.querySelector('.print-note-section h2');
  heading.style.cssText = 'margin:0 0 20px;padding:0 0 10px;border-bottom:1px solid #aaa;font-size:21px;font-weight:800;line-height:1.35;';
  const body = sheet.querySelector('.print-content');
  body.style.cssText = 'margin:0;white-space:pre-wrap;word-break:normal;overflow-wrap:anywhere;font:17px/1.9 -apple-system,BlinkMacSystemFont,"Helvetica Neue","Hiragino Sans","Yu Gothic",sans-serif;';
}

function safeFileName(title) {
  return (title || '無題の曲').replace(/[\\/:*?"<>|]/g, '_').slice(0, 70) + '_ノート.pdf';
}

async function createPdf() {
  if (typeof autoSaveNow === 'function') autoSaveNow();
  const originalLabel = printSongBtn.textContent;
  const preview = window.open('about:blank', '_blank');
  if (preview) {
    try {
      preview.document.title = 'PDF作成中';
      preview.document.body.innerHTML = '<p style="font-family:sans-serif;padding:24px">PDFを作成中…</p>';
    } catch {}
  }

  printSongBtn.disabled = true;
  printSongBtn.textContent = 'PDF作成中…';
  let capture = null;

  try {
    if (!window.html2canvas || !window.jspdf?.jsPDF) {
      throw new Error('PDF機能の読み込みに失敗しました');
    }

    const title = buildPrintSheet();
    capture = document.getElementById('printSheet').cloneNode(true);
    capture.id = 'pdfCaptureSheet';
    stylePdfSheet(capture);
    document.body.appendChild(capture);

    if (document.fonts?.ready) await document.fonts.ready;
    const canvas = await window.html2canvas(capture, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true,
      width: 794,
      windowWidth: 794
    });

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
    const pageHeightPx = Math.round(canvas.width * 297 / 210);
    let sourceY = 0;
    let pageIndex = 0;

    while (sourceY < canvas.height) {
      const segmentHeight = Math.min(pageHeightPx, canvas.height - sourceY);
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = segmentHeight;
      const context = pageCanvas.getContext('2d');
      context.fillStyle = '#fff';
      context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      context.drawImage(canvas, 0, sourceY, canvas.width, segmentHeight, 0, 0, canvas.width, segmentHeight);
      if (pageIndex > 0) pdf.addPage();
      pdf.addImage(pageCanvas.toDataURL('image/jpeg', 0.96), 'JPEG', 0, 0, 210, segmentHeight / canvas.width * 210, undefined, 'FAST');
      sourceY += segmentHeight;
      pageIndex += 1;
    }

    const fileName = safeFileName(title);
    const blobUrl = URL.createObjectURL(pdf.output('blob'));
    if (preview) {
      preview.location.replace(blobUrl);
    } else {
      pdf.save(fileName);
    }
    window.setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
  } catch (error) {
    console.error(error);
    if (preview) preview.close();
    alert(`PDFを開けなかったよ。通信を確認して、もう一度押してね。\n${error.message || ''}`);
  } finally {
    capture?.remove();
    printSongBtn.disabled = false;
    printSongBtn.textContent = originalLabel;
  }
}

printSongBtn?.addEventListener('click', createPdf);
