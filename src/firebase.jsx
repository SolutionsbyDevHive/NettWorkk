// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5ym62Mtg452PeRHxouITznkw30c5YJ9E",
  authDomain: "nettworkk-85cdc.firebaseapp.com",
  projectId: "nettworkk-85cdc",
  storageBucket: "nettworkk-85cdc.firebasestorage.app",
  messagingSenderId: "1023148830203",
  appId: "1:1023148830203:web:4871a24e652632243eef5e",
  measurementId: "G-EHDB025CX6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore();