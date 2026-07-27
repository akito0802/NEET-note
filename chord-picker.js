const chordRootSelect = document.getElementById('chordRootSelect');
const chordTypeSelect = document.getElementById('chordTypeSelect');
const addChordBtn = document.getElementById('addChordBtn');
const addChordLineBtn = document.getElementById('addChordLineBtn');
const chordTextArea = document.getElementById('chordsInput');

function addTextToChordArea(text) {
  if (!chordTextArea) return;
  const current = chordTextArea.value;
  const spacer = current && !current.endsWith(' ') && !current.endsWith('\n') ? '  ' : '';
  chordTextArea.value = current + spacer + text;
  chordTextArea.dispatchEvent(new Event('input', { bubbles: true }));
  chordTextArea.focus();
}

if (addChordBtn) {
  addChordBtn.addEventListener('click', () => {
    if (!chordRootSelect.value) return;
    addTextToChordArea(chordRootSelect.value + chordTypeSelect.value);
  });
}

if (addChordLineBtn) {
  addChordLineBtn.addEventListener('click', () => addTextToChordArea('\n'));
}
