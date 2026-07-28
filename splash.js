(() => {
  const params = new URLSearchParams(location.search);
  if (params.has('song') || params.get('mode') === 'note') return;

  const launch = document.createElement('div');
  launch.id = 'neetLaunch';
  launch.setAttribute('role', 'dialog');
  launch.setAttribute('aria-label', 'NEET NOTE モード選択');
  launch.innerHTML = `
    <div class="launch-book" id="launchBook">
      <section class="launch-inside" aria-label="モードを選択">
        <h2>NEET NOTE</h2>
        <p>使いたいモードを選んでね</p>
        <div class="launch-grid">
          <button class="launch-card" id="openNoteMode" type="button"><span>📝</span><span>ノート<small>作曲メモ・曲管理</small></span></button>
          <a class="launch-card" href="https://akito0802.github.io/scale/"><span>🎸</span><span>スケール<small>スケール辞典</small></span></a>
          <a class="launch-card" href="https://akito0802.github.io/-h/"><span>🎵</span><span>指板<small>ギター指板ビューア</small></span></a>
          <a class="launch-card" href="https://akito0802.github.io/Cordhyo-/index.html"><span>📚</span><span>コード表<small>コード・進行・音楽理論</small></span></a>
        </div>
      </section>
      <section class="launch-cover" aria-hidden="true">
        <div class="launch-cover-content">
          <div class="launch-cover-title">NEET NOTE</div>
          <div class="launch-cover-sub">MUSIC CREATION BOOK</div>
        </div>
      </section>
    </div>`;

  document.body.prepend(launch);
  document.body.style.overflow = 'hidden';

  const book = document.getElementById('launchBook');
  const noteButton = document.getElementById('openNoteMode');

  window.setTimeout(() => book.classList.add('turning'), 2000);
  noteButton.addEventListener('click', () => {
    const nextUrl = new URL(location.href);
    nextUrl.searchParams.set('mode', 'note');
    history.replaceState(null, '', nextUrl);
    launch.animate([{opacity:1},{opacity:0}], {duration:260, easing:'ease', fill:'forwards'}).finished.then(() => {
      launch.remove();
      document.body.style.overflow = '';
    });
  });
})();