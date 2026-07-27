const chordRootSelect = document.getElementById('chordRootSelect');
const chordTypeSelect = document.getElementById('chordTypeSelect');
const addChordBtn = document.getElementById('addChordBtn');
const addChordLineBtn = document.getElementById('addChordLineBtn');
const chordMemoTextArea = document.getElementById('chordsInput');

function displayWidth(text) {
  return Array.from(text).reduce((width, char) => {
    const code = char.codePointAt(0);
    const isWide =
      code >= 0x1100 &&
      (code <= 0x115f ||
        code === 0x2329 ||
        code === 0x232a ||
        (code >= 0x2e80 && code <= 0xa4cf) ||
        (code >= 0xac00 && code <= 0xd7a3) ||
        (code >= 0xf900 && code <= 0xfaff) ||
        (code >= 0xfe10 && code <= 0xfe19) ||
        (code >= 0xfe30 && code <= 0xfe6f) ||
        (code >= 0xff00 && code <= 0xff60) ||
        (code >= 0xffe0 && code <= 0xffe6));
    return width + (isWide ? 2 : 1);
  }, 0);
}

function looksLikeChordLine(line) {
  return line.trim() === '' || /^[\sA-G#b0-9majinsudg()+/♭♯-]+$/.test(line);
}

function placeChordAboveMemoText(chord) {
  if (!chordMemoTextArea || !chord) return;

  const value = chordMemoTextArea.value;
  const cursor = chordMemoTextArea.selectionStart ?? value.length;
  const lineStart = value.lastIndexOf('\n', Math.max(0, cursor - 1)) + 1;
  const lineEndIndex = value.indexOf('\n', cursor);
  const lineEnd = lineEndIndex === -1 ? value.length : lineEndIndex;
  const textLine = value.slice(lineStart, lineEnd);
  const cursorInLine = Math.max(0, Math.min(cursor - lineStart, textLine.length));
  const targetColumn = displayWidth(textLine.slice(0, cursorInLine));

  const beforeCurrentLine = value.slice(0, lineStart);
  const previousLineEnd = Math.max(0, lineStart - 1);
  const previousLineStart = value.lastIndexOf('\n', Math.max(0, previousLineEnd - 1)) + 1;
  const previousLine = lineStart > 0 ? value.slice(previousLineStart, previousLineEnd) : '';
  const hasChordLine = lineStart > 0 && looksLikeChordLine(previousLine);

  let newValue;
  let newCursor;

  if (hasChordLine) {
    const padded = previousLine.padEnd(targetColumn, ' ');
    const prefix = padded.slice(0, targetColumn);
    const suffixStart = targetColumn + chord.length;
    const suffix = padded.length > suffixStart ? padded.slice(suffixStart) : '';
    const updatedChordLine = prefix + chord + suffix;

    newValue =
      value.slice(0, previousLineStart) +
      updatedChordLine +
      value.slice(previousLineEnd);

    const lengthDiff = updatedChordLine.length - previousLine.length;
    newCursor = cursor + lengthDiff;
  } else {
    const chordLine = ' '.repeat(targetColumn) + chord;
    newValue = beforeCurrentLine + chordLine + '\n' + value.slice(lineStart);
    newCursor = cursor + chordLine.length + 1;
  }

  chordMemoTextArea.value = newValue;
  chordMemoTextArea.dispatchEvent(new Event('input', { bubbles: true }));
  chordMemoTextArea.focus();
  chordMemoTextArea.setSelectionRange(newCursor, newCursor);
}

function insertLineBreakAtCursor() {
  if (!chordMemoTextArea) return;
  const start = chordMemoTextArea.selectionStart ?? chordMemoTextArea.value.length;
  const end = chordMemoTextArea.selectionEnd ?? start;
  chordMemoTextArea.setRangeText('\n', start, end, 'end');
  chordMemoTextArea.dispatchEvent(new Event('input', { bubbles: true }));
  chordMemoTextArea.focus();
}

if (addChordBtn) {
  addChordBtn.addEventListener('click', () => {
    if (!chordRootSelect.value) return;
    placeChordAboveMemoText(chordRootSelect.value + chordTypeSelect.value);
  });
}

if (addChordLineBtn) {
  addChordLineBtn.addEventListener('click', insertLineBreakAtCursor);
}
