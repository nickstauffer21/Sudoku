import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4EuVoOTR_BRq_eHwBrh3QLDRTNvaioLU",
  authDomain: "sudoku-28114.firebaseapp.com",
  projectId: "sudoku-28114",
  storageBucket: "sudoku-28114.firebasestorage.app",
  messagingSenderId: "279778841127",
  appId: "1:279778841127:web:4f86cc9b3036e4da717402",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
