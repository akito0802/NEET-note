(()=>{
'use strict';
const side=document.getElementById('sideMenu');
if(!side||side.querySelector('a[href="lyrics.html"]'))return;
const link=document.createElement('a');
link.className='menu-link';
link.href='lyrics.html';
link.innerHTML='<span class="menu-icon">🎤</span><span>歌詞メモ</span>';
const tools=[...side.querySelectorAll('a.menu-link')].find(a=>a.getAttribute('href')==='tools.html');
side.insertBefore(link,tools||side.querySelector('[data-theme-toggle]')||null);
})();
