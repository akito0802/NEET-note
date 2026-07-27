const GEMINI_KEY_STORAGE = 'neet-note-gemini-api-key';
const OLD_OPENAI_KEY_STORAGE = 'neet-note-openai-api-key';

const generateAdviceBtn = document.getElementById('generateAdviceBtn');
const adviceEmpty = document.getElementById('adviceEmpty');
const adviceResults = document.getElementById('adviceResults');
const aiAdviceOutput = document.getElementById('aiAdviceOutput');
const geminiApiKeyInput = document.getElementById('geminiApiKeyInput');
const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
const clearApiKeyBtn = document.getElementById('clearApiKeyBtn');
const apiKeyStatus = document.getElementById('apiKeyStatus');

function getStoredApiKey() {
  return localStorage.getItem(GEMINI_KEY_STORAGE) || '';
}

function maskKey(key) {
  if (!key) return '';
  if (key.length < 12) return '保存済み';
  return `${key.slice(0, 6)}…${key.slice(-4)}`;
}

function refreshApiKeyState() {
  const key = getStoredApiKey();
  if (geminiApiKeyInput) geminiApiKeyInput.value = key;
  if (apiKeyStatus) apiKeyStatus.textContent = key ? `${maskKey(key)} を使用中` : '未設定';
}

function saveApiKey() {
  const key = geminiApiKeyInput?.value.trim() || '';
  if (!key) {
    alert('GeminiのAPIキーを入力してね。');
    return;
  }
  localStorage.setItem(GEMINI_KEY_STORAGE, key);
  localStorage.removeItem(OLD_OPENAI_KEY_STORAGE);
  refreshApiKeyState();
}

function clearApiKey() {
  localStorage.removeItem(GEMINI_KEY_STORAGE);
  localStorage.removeItem(OLD_OPENAI_KEY_STORAGE);
  if (geminiApiKeyInput) geminiApiKeyInput.value = '';
  refreshApiKeyState();
}

function collectSongContext() {
  return {
    title: document.getElementById('titleInput')?.value.trim() || '無題の曲',
    key: document.getElementById('keyInput')?.value || '未設定',
    bpm: document.getElementById('bpmInput')?.value || '未設定',
    timeSignature: document.getElementById('timeSignatureInput')?.value || '未設定',
    structure: document.getElementById('structureInput')?.value.trim() || '未設定',
    chords: document.getElementById('chordsInput')?.value.trim() || '未入力',
    mood: document.getElementById('moodInput')?.value || '未設定',
    theme: document.getElementById('themeInput')?.value.trim() || '未設定',
    lyricIdea: document.getElementById('lyricIdeaInput')?.value.trim() || '未入力'
  };
}

function buildPrompt(context) {
  return `あなたは実践的な作曲アドバイザーです。以下の曲メモを分析して、日本語で具体的な提案をしてください。\n\n` +
    `【曲タイトル】${context.title}\n` +
    `【キー】${context.key}\n` +
    `【BPM】${context.bpm}\n` +
    `【拍子】${context.timeSignature}\n` +
    `【構成】${context.structure}\n` +
    `【雰囲気】${context.mood}\n` +
    `【テーマ・情景】${context.theme}\n` +
    `【現在のコード進行メモ】\n${context.chords}\n` +
    `【歌詞の断片・入れたい言葉】\n${context.lyricIdea}\n\n` +
    `次の見出し順で回答してください。\n` +
    `1. 現在の曲の良い点\n` +
    `2. おすすめコード進行（実際のコード名で2案）\n` +
    `3. メロディ案（使う音、音域、サビ頭の音列例）\n` +
    `4. 歌詞案（Aメロまたはサビの短い例）\n` +
    `5. アレンジ案（楽器、展開、音数の増減）\n` +
    `6. 次にやること3つ\n\n` +
    `既存アーティストの作風をそのまま模倣せず、一般的な音楽的特徴として提案してください。コードはキーとの関係も簡潔に説明してください。`;
}

function extractGeminiText(data) {
  const parts = data?.candidates?.[0]?.content?.parts || [];
  return parts.map(part => part.text || '').join('\n').trim();
}

function showAdviceText(text) {
  aiAdviceOutput.innerHTML = '';
  const response = document.createElement('div');
  response.className = 'ai-response-text';
  response.textContent = text;
  aiAdviceOutput.appendChild(response);
  adviceEmpty.classList.add('hidden');
  adviceResults.classList.remove('hidden');
}

function showError(message) {
  adviceEmpty.classList.remove('hidden');
  adviceResults.classList.add('hidden');
  adviceEmpty.textContent = message;
}

async function generateAiAdvice() {
  const apiKey = getStoredApiKey();
  if (!apiKey) {
    showError('先に「Gemini API設定」を開いて、APIキーを保存してね。');
    return;
  }

  const context = collectSongContext();
  const originalLabel = generateAdviceBtn.textContent;
  generateAdviceBtn.disabled = true;
  generateAdviceBtn.textContent = 'Geminiが考え中…';
  adviceEmpty.classList.remove('hidden');
  adviceResults.classList.add('hidden');
  adviceEmpty.textContent = '曲の情報を読み取って、アドバイスを作ってるよ…';

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [{ text: buildPrompt(context) }]
        }],
        generationConfig: {
          temperature: 0.85,
          maxOutputTokens: 1800
        }
      })
    });

    const data = await response.json();
    if (!response.ok) {
      const apiMessage = data?.error?.message || `HTTP ${response.status}`;
      throw new Error(apiMessage);
    }

    const text = extractGeminiText(data);
    if (!text) {
      const reason = data?.candidates?.[0]?.finishReason;
      throw new Error(reason ? `回答を生成できませんでした（${reason}）` : 'AIの回答を読み取れませんでした。');
    }
    showAdviceText(text);
  } catch (error) {
    console.error(error);
    showError(`Geminiへの接続に失敗しました：${error.message}`);
  } finally {
    generateAdviceBtn.disabled = false;
    generateAdviceBtn.textContent = originalLabel;
  }
}

if (saveApiKeyBtn) saveApiKeyBtn.addEventListener('click', saveApiKey);
if (clearApiKeyBtn) clearApiKeyBtn.addEventListener('click', clearApiKey);
if (generateAdviceBtn) generateAdviceBtn.addEventListener('click', generateAiAdvice);

refreshApiKeyState();