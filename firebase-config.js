window.NEET_FIREBASE_CONFIG = {
  apiKey: "AIzaSyCc0sOk8DjbS5McxqjIh8ums0FFJfkm9q8",
  authDomain: "neet-note.firebaseapp.com",
  projectId: "neet-note",
  storageBucket: "neet-note.firebasestorage.app",
  messagingSenderId: "176196540165",
  appId: "1:176196540165:web:78a3f5af002b4f5445496c",
  measurementId: "G-F5F2ZD45C9"
};

// iPhone・アプリ内ブラウザ向けGoogleログイン補助
setTimeout(()=>{
  if(document.querySelector('script[data-neet-auth-fix]')) return;
  const script=document.createElement('script');
  script.src=`auth-fix.js?v=20260803-1`;
  script.dataset.neetAuthFix='1';
  document.body.appendChild(script);
},1200);
