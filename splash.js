(() => {
  const params = new URLSearchParams(location.search);
  const sameSiteReferrer = (() => {
    try {
      if (!document.referrer) return false;
      const ref = new URL(document.referrer);
      return ref.origin === location.origin && ref.pathname.startsWith('/NEET-note/');
    } catch {
      return false;
    }
  })();
  const alreadySeen = sessionStorage.getItem('neet-note-intro-seen') === '1';
  const directTopVisit = !params.has('song') && params.get('mode') !== 'note' && !sameSiteReferrer;

  const loadHome = () => {
    if (document.querySelector('script[data-neet-home-v2]')) return;
    const script = document.createElement('script');
    script.src = 'home-v2.js?v=20260813-4';
    script.dataset.neetHomeV2 = '1';
    document.body.appendChild(script);
  };

  const loadHomeAfterExistingIntro = () => {
    const existing = document.getElementById('neetIntro');
    if (!existing) { loadHome(); return; }
    const observer = new MutationObserver(() => {
      if (!document.getElementById('neetIntro')) {
        observer.disconnect();
        requestAnimationFrame(() => requestAnimationFrame(loadHome));
      }
    });
    observer.observe(document.body, {childList:true, subtree:true});
  };

  if (!directTopVisit) return;

  // index.html側のタイトル演出が既に出ている場合は、演出が完全に消えてからトップを表示
  if (document.getElementById('neetIntro')) {
    sessionStorage.setItem('neet-note-intro-seen', '1');
    loadHomeAfterExistingIntro();
    return;
  }

  if (alreadySeen) { loadHome(); return; }
  sessionStorage.setItem('neet-note-intro-seen', '1');

  const style = document.createElement('style');
  style.textContent = `
    #neetIntro{position:fixed;inset:0;z-index:20000;display:grid;place-items:center;overflow:hidden;background:#f5f5f7;perspective:1600px}
    .neet-intro-book{position:relative;width:min(82vw,430px);aspect-ratio:3/4;transform-style:preserve-3d;filter:drop-shadow(0 22px 42px rgba(0,0,0,.18))}
    .neet-intro-back,.neet-intro-page{position:absolute;inset:0;border-radius:10px 20px 20px 10px}
    .neet-intro-back{background:#fffdf8;border:1px solid #e7dfd2}
    .neet-intro-page{display:grid;place-items:center;transform-origin:left center;transform-style:preserve-3d;background:linear-gradient(90deg,#f1eadf 0 3%,#fffdf8 8% 100%);border:1px solid #ded5c7;backface-visibility:hidden;will-change:transform}
    .neet-intro-page::after{content:'';position:absolute;inset:0;border-radius:inherit;background:linear-gradient(90deg,rgba(0,0,0,.14),transparent 18%,transparent 78%,rgba(255,255,255,.55));opacity:.35;pointer-events:none}
    .neet-intro-title{position:relative;z-index:1;text-align:center;padding:24px;color:#1d1d1f}
    .neet-intro-kicker{margin:0 0 12px;color:#6e6e73;font-size:.72rem;font-weight:800;letter-spacing:.22em}
    .neet-intro-title h1{margin:0;font-family:'Hannotate SC','Chalkboard SE',-apple-system,sans-serif;font-size:clamp(2.5rem,11vw,4.6rem);letter-spacing:-.05em}
    .neet-intro-title p{margin:14px 0 0;color:#6e6e73;font-size:.95rem}
    #neetIntro.turning .neet-intro-page{animation:neetPageTurn .9s cubic-bezier(.55,.08,.2,.99) forwards}
    #neetIntro.finishing{animation:neetIntroFade .4s ease forwards}
    @keyframes neetPageTurn{0%{transform:rotateY(0deg)}45%{transform:rotateY(-78deg)}100%{transform:rotateY(-178deg)}}
    @keyframes neetIntroFade{to{opacity:0;visibility:hidden}}
    @media (prefers-reduced-motion:reduce){#neetIntro.turning .neet-intro-page{animation-duration:.01ms}#neetIntro.finishing{animation-duration:.01ms}}
  `;
  document.head.appendChild(style);

  const intro = document.createElement('div');
  intro.id = 'neetIntro';
  intro.setAttribute('aria-label', 'NEET NOTE 起動画面');
  intro.innerHTML = `
    <div class="neet-intro-book" aria-hidden="true">
      <div class="neet-intro-back"></div>
      <div class="neet-intro-page">
        <div class="neet-intro-title">
          <p class="neet-intro-kicker">COMPOSITION NOTE</p>
          <h1>NEET NOTE</h1>
          <p>作曲・練習・記録をひとつに。</p>
        </div>
      </div>
    </div>`;

  document.body.prepend(intro);
  document.body.style.overflow = 'hidden';

  window.setTimeout(() => intro.classList.add('turning'), 1600);
  window.setTimeout(() => intro.classList.add('finishing'), 2500);
  window.setTimeout(() => {
    intro.remove();
    style.remove();
    document.body.style.overflow = '';
    window.scrollTo({top: 0, behavior: 'instant'});
    requestAnimationFrame(() => requestAnimationFrame(loadHome));
  }, 2950);
})();