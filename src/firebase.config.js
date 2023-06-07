import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBTCPYvpPkBKHlMVuoADG9Gg0AzyNdoNiA",
    authDomain: "fastfoodapp-cb507.firebaseapp.com",
    databaseURL: "https://fastfoodapp-cb507-default-rtdb.firebaseio.com",
    projectId: "fastfoodapp-cb507",
    storageBucket: "fastfoodapp-cb507.appspot.com",
    messagingSenderId: "310083103653",
    appId: "1:310083103653:web:77b30671e0564bf286164c",
    measurementId: "G-QFK7K4BRDH"
  };

  const app = getApps.Length > 0 ? getApp() : initializeApp(firebaseConfig)
  const firestore = getFirestore(app);
  const storage = getStorage(app);

  export {app,firestore,storage};