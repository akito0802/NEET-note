(()=>{
'use strict';
const SONG_KEY='song-note-songs-v1';
const BACKUP_KEY='song-note-auto-backups-v1';
const MARKER_KEY='neet-note-mellow-rain-recovery-v2';
const normalize=value=>String(value||'').normalize('NFKC').toLowerCase().replace(/[\s_\-・]+/g,'');
const isMellowRain=song=>{
  const title=normalize(song?.title);
  return title==='mellowrain'||title==='メロウレイン';
};

const reconstructedLyrics=`もう夏が終わるような　わたしはもう泣かない
ふいに香る風に　秋を感じて　雨が降ってきたみたい
夏が終わっても　わたしを美しいなんて思ってくれるかな
消えた花火のように

［A］
今日もこの夏を　ただ平凡に過ごしている
夜の街もずっと　ただ永遠に続くようで

［B］
今宵の雨が私をただ濡らして　装いの風がふっと
あなたの香水を漂わせて

［サビ］
もう夏が終わるような　夕立はいつやんだの
雨の中不意に思いたって　探したあなたのあの香り
ただ夜の雨の中　終わりの近い花火大会も
逆らった人の波　あなたの香りを見つけたい

［A］
今日もこの夏の　終わりのひぐらしが憂い
本の終わりでそっと　指でなぞった文字を無下に

［B］
旅立ちを告げた　夏の終わりの夕立
仮初の言葉で不意に　流した夏の雨

［サビ］
もう夏が終わっても　わたしは空っぽで
夏が運んできた　あの入道雲が壊れて
もう何もなくても　ただ何も残ることはなくても
消えた花火がまた咲いて`;

const makeFallbackSong=()=>{
  const now=new Date().toISOString();
  return {
    id:(crypto.randomUUID?crypto.randomUUID():`mellow-rain-${Date.now()}`),
    title:'Mellow Rain',
    lyricist:'',
    composer:'',
    arranger:'',
    artist:'',
    productionDate:'',
    key:'',
    bpm:'',
    timeSignature:'',
    structure:'冒頭 → A → B → サビ → A → B → サビ',
    chords:'',
    mood:'',
    theme:'',
    lyricIdea:reconstructedLyrics,
    lyrics:reconstructedLyrics,
    audioData:'',
    createdAt:now,
    updatedAt:now,
    recoveryNote:'2026-09-03: 会話履歴に残っていたMellow Rainの歌詞から再構築'
  };
};

try{
  const currentRaw=localStorage.getItem(SONG_KEY);
  const current=currentRaw?JSON.parse(currentRaw):[];
  if(!Array.isArray(current))return;

  if(current.some(isMellowRain)){
    localStorage.setItem(MARKER_KEY,'present');
    return;
  }

  let recovered=null;
  let recoveryType='reconstructed';

  const backups=JSON.parse(localStorage.getItem(BACKUP_KEY)||'[]');
  if(Array.isArray(backups)&&backups.length){
    const candidates=[];
    backups.forEach(snapshot=>{
      const snapshotSongs=Array.isArray(snapshot?.songs)?snapshot.songs:[];
      snapshotSongs.forEach(song=>{
        if(isMellowRain(song))candidates.push({song,backupAt:Number(snapshot?.createdAt||0)});
      });
    });

    if(candidates.length){
      const score=item=>{
        const t=Date.parse(item.song?.updatedAt||item.song?.createdAt||'');
        return Number.isFinite(t)?t:item.backupAt;
      };
      candidates.sort((a,b)=>score(b)-score(a));
      recovered=JSON.parse(JSON.stringify(candidates[0].song));
      recoveryType='backup';
    }
  }

  if(!recovered)recovered=makeFallbackSong();

  if(current.some(song=>song?.id&&song.id===recovered.id)){
    recovered.id=(crypto.randomUUID?crypto.randomUUID():`mellow-rain-${Date.now()}`);
  }
  recovered.updatedAt=recovered.updatedAt||new Date().toISOString();
  current.unshift(recovered);
  localStorage.setItem(SONG_KEY,JSON.stringify(current));
  localStorage.setItem(`neet-sync-time:${SONG_KEY}`,String(Date.now()));
  localStorage.setItem(MARKER_KEY,recoveryType);
  sessionStorage.setItem(
    'neet-note-recovery-toast',
    recoveryType==='backup'
      ?'Mellow Rainをバックアップから復元したよ'
      :'Mellow Rainを会話履歴から再構築して復元したよ'
  );
}catch(error){
  console.warn('Mellow Rain recovery skipped',error);
}
})();
