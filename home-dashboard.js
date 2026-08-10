(()=>{
'use strict';
function install(){
  const list=document.getElementById('listView');
  if(!list||document.getElementById('neetHomeDashboard'))return;
  const toolbar=list.querySelector('.toolbar');
  const dashboard=document.createElement('div');
  dashboard.id='neetHomeDashboard';
  dashboard.innerHTML=`
    <section class="nh-hero">
      <div class="nh-hero-copy">
        <span class="nh-kicker">NEET NOTE WORKSPACE</span>
        <h2>作る・調べる・学ぶを、ここから。</h2>
        <p>曲作りの途中で必要になる機能へ、すぐ移動できるホームに整理したよ。</p>
      </div>
      <button class="nh-new" type="button" data-new-song>＋ 新しい曲を作る</button>
    </section>

    <section class="nh-section">
      <div class="nh-section-head"><div><span>QUICK ACCESS</span><h3>よく使う機能</h3></div></div>
      <div class="nh-feature-grid">
        <a class="nh-feature nh-feature-primary" href="theory-assist.html"><span class="nh-feature-icon">🧠</span><span><b>理論アシスト</b><small>進行・キー・次コードを分析</small></span><em>開く ›</em></a>
        <a class="nh-feature" href="theory-library.html"><span class="nh-feature-icon">📖</span><span><b>統合理論ライブラリ</b><small>基礎から発展まで順番に学ぶ</small></span><em>読む ›</em></a>
        <a class="nh-feature" href="https://akito0802.github.io/Cordhyo-/index.html"><span class="nh-feature-icon">🎹</span><span><b>コード辞典</b><small>コードフォームと構成音を確認</small></span><em>調べる ›</em></a>
        <a class="nh-feature" href="tools.html"><span class="nh-feature-icon">🧰</span><span><b>作曲ツール</b><small>移調・ルーレット・メトロノームなど</small></span><em>使う ›</em></a>
      </div>
    </section>

    <section class="nh-section nh-learn">
      <div class="nh-section-head"><div><span>MUSIC LAB</span><h3>演奏・リズムを学ぶ</h3></div></div>
      <div class="nh-mini-grid">
        <a href="https://akito0802.github.io/scale/"><span>🎸</span><b>スケール</b><small>指板で音階を見る</small></a>
        <a href="https://akito0802.github.io/-h/"><span>🎵</span><b>指板</b><small>ポジション確認</small></a>
        <a href="https://akito0802.github.io/rhythm-lab/"><span>🥁</span><b>Rhythm Lab</b><small>ビートを目で学ぶ</small></a>
      </div>
    </section>

    <section class="nh-songs-head">
      <div><span>MY SONGS</span><h3>作曲ノート</h3><p>保存した曲を検索して、すぐ続きを書けるよ。</p></div>
      <button type="button" data-new-song>＋ 新規</button>
    </section>`;
  if(toolbar)toolbar.insertAdjacentElement('beforebegin',dashboard);else list.prepend(dashboard);

  dashboard.querySelectorAll('[data-new-song]').forEach(btn=>btn.addEventListener('click',()=>document.getElementById('newSongBtn')?.click()));

  const menu=document.getElementById('sideMenu');
  const tools=menu?.querySelector('a[href="tools.html"]');
  if(menu&&tools&&!menu.querySelector('a[href="theory-assist.html"]')){
    const assist=document.createElement('a');assist.className='menu-link';assist.href='theory-assist.html';assist.innerHTML='<span class="menu-icon">🧠</span><span>理論アシスト</span>';
    const library=document.createElement('a');library.className='menu-link';library.href='theory-library.html';library.innerHTML='<span class="menu-icon">📖</span><span>理論ライブラリ</span>';
    tools.before(assist,library);
  }

  const style=document.createElement('style');
  style.textContent=`
  #neetHomeDashboard{margin-bottom:24px}.nh-hero{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:18px;padding:24px;border:1px solid var(--ui-line,#ded6c9);border-radius:22px;background:linear-gradient(135deg,rgba(255,253,248,.98),rgba(239,230,214,.88));box-shadow:0 12px 34px rgba(80,60,30,.08)}.nh-kicker,.nh-section-head span,.nh-songs-head>div>span{font-size:.65rem;font-weight:900;letter-spacing:.14em;color:#8b6f47}.nh-hero h2{margin:5px 0 6px;font-size:clamp(1.25rem,3.5vw,1.75rem);letter-spacing:-.02em}.nh-hero p{margin:0;color:#71695f;font-size:.82rem;line-height:1.65}.nh-new,.nh-songs-head>button{flex:0 0 auto;border:0;border-radius:13px;padding:12px 16px;background:#8b6f47;color:#fff;font-weight:900;cursor:pointer}.nh-section{margin:20px 0}.nh-section-head{display:flex;align-items:end;justify-content:space-between;margin-bottom:9px;padding:0 2px}.nh-section-head h3,.nh-songs-head h3{margin:2px 0 0;font-size:1rem}.nh-feature-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.nh-feature{display:grid;grid-template-columns:42px 1fr auto;align-items:center;gap:11px;min-height:76px;padding:13px 14px;border:1px solid var(--ui-line,#ded6c9);border-radius:16px;background:rgba(255,253,248,.96);color:#1f2937;text-decoration:none;box-shadow:0 5px 16px rgba(80,60,30,.04)}.nh-feature-primary{background:linear-gradient(135deg,#fffdf8,#f2e8d8);border-color:#d6c3a7}.nh-feature-icon{display:grid;place-items:center;width:42px;height:42px;border-radius:12px;background:#f4eee4;font-size:1.25rem}.nh-feature b{display:block;font-size:.85rem}.nh-feature small{display:block;margin-top:3px;color:#71695f;font-size:.65rem;line-height:1.4}.nh-feature em{font-style:normal;color:#8b6f47;font-size:.66rem;font-weight:900}.nh-mini-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.nh-mini-grid a{display:grid;grid-template-columns:32px 1fr;grid-template-rows:auto auto;column-gap:9px;padding:12px;border:1px solid var(--ui-line,#ded6c9);border-radius:14px;background:rgba(255,253,248,.88);color:#1f2937;text-decoration:none}.nh-mini-grid a>span{grid-row:1/3;align-self:center;font-size:1.2rem}.nh-mini-grid b{font-size:.78rem}.nh-mini-grid small{color:#71695f;font-size:.62rem}.nh-songs-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:26px 0 10px;padding-top:17px;border-top:1px solid var(--ui-line,#ded6c9)}.nh-songs-head p{margin:3px 0 0;color:#71695f;font-size:.7rem}.nh-songs-head>button{padding:9px 13px;font-size:.75rem}
  @media(max-width:720px){.nh-hero{padding:18px;align-items:flex-start}.nh-hero p{max-width:220px}.nh-new{padding:10px 12px;font-size:.72rem}.nh-feature-grid{grid-template-columns:1fr}.nh-mini-grid{grid-template-columns:repeat(3,1fr)}.nh-mini-grid a{display:flex;flex-direction:column;align-items:center;text-align:center;gap:4px;padding:10px 5px}.nh-mini-grid a>span{font-size:1.3rem}.nh-mini-grid small{font-size:.58rem}.nh-feature{min-height:70px}}
  @media(max-width:420px){.nh-hero{display:block}.nh-new{width:100%;margin-top:13px}.nh-feature em{display:none}}
  `;
  document.head.appendChild(style);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();