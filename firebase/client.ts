// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoZmisDZywOFzinZX_V41PVtKa4m5LjPw",
  authDomain: "crackd-2a387.firebaseapp.com",
  projectId: "crackd-2a387",
  storageBucket: "crackd-2a387.firebasestorage.app",
  messagingSenderId: "976277968689",
  appId: "1:976277968689:web:baa92c4fa5c3eecc514210",
  measurementId: "G-12TGGQ4BPX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);