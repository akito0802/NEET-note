(()=>{
'use strict';
const params=new URLSearchParams(location.search);
if(params.get('mode')==='note'||params.has('song'))return;
const target='https://akito0802.github.io/NEET-note/home.html';
if(location.href!==target)location.replace(target);
})();
