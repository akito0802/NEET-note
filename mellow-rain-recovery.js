(()=>{
'use strict';
const SONG_KEY='song-note-songs-v1';
const BACKUP_KEY='song-note-auto-backups-v1';
const MARKER_KEY='neet-note-mellow-rain-recovery-v1';
const normalize=value=>String(value||'').normalize('NFKC').toLowerCase().replace(/[\s_\-・]+/g,'');
const isMellowRain=song=>{
  const title=normalize(song?.title);
  return title==='mellowrain'||title==='メロウレイン';
};
try{
  const currentRaw=localStorage.getItem(SONG_KEY);
  const current=currentRaw?JSON.parse(currentRaw):[];
  if(!Array.isArray(current))return;

  if(current.some(isMellowRain)){
    localStorage.setItem(MARKER_KEY,'present');
    return;
  }
  if(localStorage.getItem(MARKER_KEY)==='restored')return;

  const backups=JSON.parse(localStorage.getItem(BACKUP_KEY)||'[]');
  if(!Array.isArray(backups)||!backups.length)return;

  const candidates=[];
  backups.forEach(snapshot=>{
    const snapshotSongs=Array.isArray(snapshot?.songs)?snapshot.songs:[];
    snapshotSongs.forEach(song=>{
      if(isMellowRain(song))candidates.push({song,backupAt:Number(snapshot?.createdAt||0)});
    });
  });
  if(!candidates.length)return;

  const score=item=>{
    const t=Date.parse(item.song?.updatedAt||item.song?.createdAt||'');
    return Number.isFinite(t)?t:item.backupAt;
  };
  candidates.sort((a,b)=>score(b)-score(a));
  const recovered=JSON.parse(JSON.stringify(candidates[0].song));

  if(current.some(song=>song?.id&&song.id===recovered.id)){
    recovered.id=(crypto.randomUUID?crypto.randomUUID():`mellow-rain-${Date.now()}`);
  }
  recovered.updatedAt=recovered.updatedAt||new Date().toISOString();
  current.unshift(recovered);
  localStorage.setItem(SONG_KEY,JSON.stringify(current));
  localStorage.setItem(`neet-sync-time:${SONG_KEY}`,String(Date.now()));
  localStorage.setItem(MARKER_KEY,'restored');
  sessionStorage.setItem('neet-note-recovery-toast','Mellow Rainをバックアップから復元したよ');
}catch(error){
  console.warn('Mellow Rain recovery skipped',error);
}
})();
