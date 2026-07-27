const chordRootSelect = document.getElementById('chordRootSelect');
const chordTypeSelect = document.getElementById('chordTypeSelect');
const addChordBtn = document.getElementById('addChordBtn');
const addChordLineBtn = document.getElementById('addChordLineBtn');
const chordTextArea = document.getElementById('chordsInput');

let savedSelectionStart = 0;
let savedSelectionEnd = 0;

function rememberChordSelection() {
  if (!chordTextArea) return;
  savedSelectionStart = chordTextArea.selectionStart ?? chordTextArea.value.length;
  savedSelectionEnd = chordTextArea.selectionEnd ?? savedSelectionStart;
}

function insertTextAtSelection(text, addSpacing = false) {
  if (!chordTextArea) return;

  const value = chordTextArea.value;
  const start = Math.min(savedSelectionStart, value.length);
  const end = Math.min(savedSelectionEnd, value.length);
  const before = value.slice(0, start);
  const after = value.slice(end);

  let insertedText = text;
  if (addSpacing && start === end) {
    const needsSpaceBefore = before.length > 0 && !/[\s\n]$/.test(before);
    const needsSpaceAfter = after.length > 0 && !/^[\s\n]/.test(after);
    insertedText = `${needsSpaceBefore ? '  ' : ''}${text}${needsSpaceAfter ? '  ' : ''}`;
  }

  chordTextArea.value = before + insertedText + after;

  const nextCursor = before.length + insertedText.length;
  chordTextArea.focus();
  chordTextArea.setSelectionRange(nextCursor, nextCursor);
  savedSelectionStart = nextCursor;
  savedSelectionEnd = nextCursor;

  chordTextArea.dispatchEvent(new Event('input', { bubbles: true }));
}

if (chordTextArea) {
  ['click', 'keyup', 'input', 'select', 'focus'].forEach(eventName => {
    chordTextArea.addEventListener(eventName, rememberChordSelection);
  });

  chordTextArea.addEventListener('blur', rememberChordSelection);
}

if (addChordBtn) {
  addChordBtn.addEventListener('click', () => {
    if (!chordRootSelect.value) return;
    insertTextAtSelection(chordRootSelect.value + chordTypeSelect.value, true);
  });
}

if (addChordLineBtn) {
  addChordLineBtn.addEventListener('click', () => insertTextAtSelection('\n'));
}
