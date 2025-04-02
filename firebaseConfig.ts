import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Replace with your Firebase config (found in Firebase Console → Project Settings)
const firebaseConfig = {
    apiKey: "AIzaSyAJlHoxskoUY0ijRzjnSTPQ6VhW1plgal8",
    authDomain: "cook-419e0.firebaseapp.com",
    projectId: "cook-419e0",
    storageBucket: "cook-419e0.firebasestorage.app",
    messagingSenderId: "73310809811",
    appId: "1:73310809811:web:d6df163ab45c820f75ee26",
    measurementId: "G-96JBH76WEY"
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  
  export { storage };
