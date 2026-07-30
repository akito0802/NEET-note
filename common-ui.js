(() => {
  'use strict';
  const STORAGE_KEY = 'neet-note-theme';
  const root = document.documentElement;
  const metaTheme = document.querySelector('meta[name="theme-color"]');

  const preferredTheme = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    if (metaTheme) metaTheme.setAttribute('content', theme === 'dark' ? '#141311' : '#d9c7a8');
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      const dark = theme === 'dark';
      button.innerHTML = `<span aria-hidden="true">${dark ? '☀️' : '🌙'}</span><span>${dark ? 'ライトモード' : 'ダークモード'}</span>`;
      button.setAttribute('aria-label', dark ? 'ライトモードに切り替える' : 'ダークモードに切り替える');
      button.setAttribute('aria-pressed', String(dark));
    });
  };

  applyTheme(preferredTheme());

  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-theme-toggle]');
    if (!button) return;
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    if (!localStorage.getItem(STORAGE_KEY)) applyTheme(event.matches ? 'dark' : 'light');
  });

  const buildHomeDashboard = () => {
    const listView = document.getElementById('listView');
    const toolbar = listView?.querySelector('.toolbar');
    if (!listView || !toolbar || document.getElementById('homeDashboard')) return;

    const style = document.createElement('style');
    style.textContent = `
      .home-dashboard{margin-bottom:24px}.home-welcome{position:relative;overflow:hidden;padding:26px;border:1px solid var(--border);border-radius:22px;background:linear-gradient(135deg,rgba(255,255,255,.96),rgba(238,246,255,.94));box-shadow:var(--shadow)}.home-welcome:after{content:'♪';position:absolute;right:18px;bottom:-27px;color:rgba(0,122,255,.09);font-family:Georgia,serif;font-size:9rem;line-height:1;transform:rotate(-8deg);pointer-events:none}.home-welcome-copy{position:relative;z-index:1;max-width:590px}.home-kicker{margin:0 0 7px;color:var(--accent);font-size:.74rem;font-weight:800;letter-spacing:.14em}.home-welcome h2{margin:0;font-size:clamp(1.55rem,5vw,2.25rem);letter-spacing:-.035em}.home-welcome p{margin:10px 0 20px;color:var(--muted);line-height:1.7}.home-actions{display:flex;flex-wrap:wrap;gap:10px}.home-main-action,.home-sub-action{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:11px 16px;border-radius:13px;font-weight:800;text-decoration:none}.home-main-action{border:0;color:#fff;background:var(--accent);box-shadow:0 5px 14px rgba(0,122,255,.22)}.home-sub-action{color:var(--text);background:rgba(255,255,255,.88);border:1px solid var(--border)}.home-section{margin-top:22px}.home-section-head{display:flex;align-items:end;justify-content:space-between;gap:14px;margin-bottom:11px}.home-section-head h2{margin:0;font-size:1.05rem}.home-section-head p{margin:0;color:var(--muted);font-size:.78rem}.home-tool-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:11px}.home-tool-card{display:flex;min-width:0;align-items:center;gap:11px;padding:15px;color:var(--text);background:rgba(255,255,255,.9);border:1px solid var(--border);border-radius:16px;box-shadow:0 5px 18px rgba(0,0,0,.045);text-decoration:none;transition:transform .16s ease,box-shadow .16s ease,border-color .16s ease}.home-tool-card:hover,.home-tool-card:focus{transform:translateY(-2px);border-color:rgba(0,122,255,.3);box-shadow:0 10px 25px rgba(0,0,0,.075);outline:none}.home-tool-icon{display:grid;flex:0 0 40px;width:40px;height:40px;place-items:center;border-radius:12px;background:#eef6ff;font-size:1.2rem}.home-tool-copy{min-width:0}.home-tool-title{display:block;font-size:.91rem;font-weight:800}.home-tool-note{display:block;margin-top:3px;overflow:hidden;color:var(--muted);font-size:.7rem;text-overflow:ellipsis;white-space:nowrap}.home-song-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:25px 0 11px}.home-song-heading h2{margin:0;font-size:1.05rem}.home-song-heading span{color:var(--muted);font-size:.76rem}.home-dashboard + .toolbar{margin-bottom:16px}html[data-theme='dark'] .home-welcome{background:linear-gradient(135deg,rgba(36,34,31,.98),rgba(29,36,44,.96))}html[data-theme='dark'] .home-sub-action,html[data-theme='dark'] .home-tool-card{background:rgba(35,33,30,.9)}html[data-theme='dark'] .home-tool-icon{background:rgba(0,122,255,.14)}@media(max-width:760px){.home-tool-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:520px){.home-welcome{padding:21px 18px}.home-welcome:after{right:4px;font-size:7rem}.home-actions{display:grid;grid-template-columns:1fr 1fr}.home-main-action,.home-sub-action{padding-inline:10px}.home-section-head{align-items:start;flex-direction:column;gap:3px}.home-tool-card{padding:13px 12px}.home-tool-icon{flex-basis:36px;width:36px;height:36px}.home-song-heading{margin-top:22px}}
    `;
    document.head.appendChild(style);

    const dashboard = document.createElement('div');
    dashboard.id = 'homeDashboard';
    dashboard.className = 'home-dashboard';
    dashboard.innerHTML = `
      <section class="home-welcome" aria-labelledby="homeWelcomeTitle">
        <div class="home-welcome-copy">
          <p class="home-kicker">YOUR MUSIC WORKSPACE</p>
          <h2 id="homeWelcomeTitle">思いついた音を、すぐ形に。</h2>
          <p>曲のアイデアを残すところから、コードやスケールを調べるところまで。いつものNEET NOTEで、そのまま音楽を始めよう。</p>
          <div class="home-actions">
            <button id="homeNewSongBtn" class="home-main-action" type="button"><span>＋</span>新しい曲を作る</button>
            <a class="home-sub-action" href="tools.html"><span>🧰</span>ツールを開く</a>
          </div>
        </div>
      </section>
      <section class="home-section" aria-labelledby="quickAccessTitle">
        <div class="home-section-head"><h2 id="quickAccessTitle">クイックアクセス</h2><p>使いたい機能へすぐ移動</p></div>
        <div class="home-tool-grid">
          <a class="home-tool-card" href="https://akito0802.github.io/Cordhyo-/index.html"><span class="home-tool-icon">📚</span><span class="home-tool-copy"><span class="home-tool-title">コード</span><span class="home-tool-note">フォームと構成音</span></span></a>
          <a class="home-tool-card" href="https://akito0802.github.io/scale/"><span class="home-tool-icon">🎸</span><span class="home-tool-copy"><span class="home-tool-title">スケール</span><span class="home-tool-note">キーから音を確認</span></span></a>
          <a class="home-tool-card" href="https://akito0802.github.io/-h/"><span class="home-tool-icon">🎵</span><span class="home-tool-copy"><span class="home-tool-title">指板</span><span class="home-tool-note">音の位置を表示</span></span></a>
          <a class="home-tool-card" href="tools.html"><span class="home-tool-icon">🧰</span><span class="home-tool-copy"><span class="home-tool-title">ツール</span><span class="home-tool-note">制作をまとめて支援</span></span></a>
        </div>
      </section>
      <div class="home-song-heading"><h2>作曲ノート</h2><span>保存した曲を検索・編集</span></div>
    `;

    listView.insertBefore(dashboard, toolbar);
    document.getElementById('homeNewSongBtn')?.addEventListener('click', () => {
      document.getElementById('newSongBtn')?.click();
    });
  };

  buildHomeDashboard();
})();