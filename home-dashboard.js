(()=>{
'use strict';
function install(){
  const list=document.getElementById('listView');
  if(!list||document.getElementById('neetHomeDashboard'))return;
  const toolbar=list.querySelector('.toolbar');
  const dashboard=document.createElement('div');
  dashboard.id='neetHomeDashboard';
  dashboard.innerHTML=`
    <section class="nh-section">
      <div class="nh-section-head"><div><span>QUICK ACCESS</span><h3>クイックアクセス</h3></div></div>
      <div class="nh-feature-grid">
        <a class="nh-feature" href="theory-assist.html"><span class="nh-feature-icon">🧠</span><span><b>理論アシスト</b><small>進行・キー・次コードを分析</small></span><em>›</em></a>
        <a class="nh-feature" href="theory-library.html"><span class="nh-feature-icon">📖</span><span><b>統合理論ライブラリ</b><small>基礎から発展まで順番に学ぶ</small></span><em>›</em></a>
        <a class="nh-feature" href="https://akito0802.github.io/Cordhyo-/index.html"><span class="nh-feature-icon">🎹</span><span><b>コード辞典</b><small>コードフォームと構成音を確認</small></span><em>›</em></a>
        <a class="nh-feature" href="tools.html"><span class="nh-feature-icon">🧰</span><span><b>作曲ツール</b><small>制作に使うツールを開く</small></span><em>›</em></a>
        <a class="nh-feature" href="https://akito0802.github.io/scale/"><span class="nh-feature-icon">🎸</span><span><b>スケール</b><small>音階とポジションを確認</small></span><em>›</em></a>
        <a class="nh-feature" href="https://akito0802.github.io/-h/"><span class="nh-feature-icon">🎵</span><span><b>指板</b><small>指板上の音を確認</small></span><em>›</em></a>
      </div>
    </section>`;
  if(toolbar)toolbar.insertAdjacentElement('beforebegin',dashboard);else list.prepend(dashboard);
  const style=document.createElement('style');
  style.textContent=`#neetHomeDashboard{margin-bottom:18px}.nh-section{margin:4px 0 20px}.nh-section-head{margin-bottom:9px;padding:0 2px}.nh-section-head span{font-size:.64rem;font-weight:900;letter-spacing:.14em;color:#8b6f47}.nh-section-head h3{margin:2px 0 0;font-size:1rem}.nh-feature-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.nh-feature{display:grid;grid-template-columns:40px 1fr auto;align-items:center;gap:10px;min-height:68px;padding:11px 13px;border:1px solid var(--ui-line,#ded6c9);border-radius:15px;background:rgba(255,253,248,.96);color:#1f2937;text-decoration:none}.nh-feature-icon{display:grid;place-items:center;width:40px;height:40px;border-radius:11px;background:#f4eee4;font-size:1.18rem}.nh-feature b{display:block;font-size:.82rem}.nh-feature small{display:block;margin-top:2px;color:#71695f;font-size:.63rem}.nh-feature em{font-style:normal;color:#8b6f47;font-size:1rem}@media(max-width:650px){.nh-feature-grid{grid-template-columns:1fr}.nh-feature{min-height:64px;padding:10px 12px}}`;
  document.head.appendChild(style);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();