// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiX1hc_th0wmTTEkVvdma7NAl84HkVwpI",
  authDomain: "innovators-hub-music-a0676.firebaseapp.com",
  projectId: "innovators-hub-music-a0676",
  storageBucket: "innovators-hub-music-a0676.firebasestorage.app",
  messagingSenderId: "632074496279",
  appId: "1:632074496279:web:3cbd06a6c48d1ff9816f52"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const __AUTH=getAuth(firebaseApp)
export const __DB=getFirestore(firebaseApp)