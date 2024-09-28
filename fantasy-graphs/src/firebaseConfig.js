import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJiINrhBlqQ93Y0oI2eHr6qMlVv7IxvFw",
  authDomain: "fantasy-football-stats-b5b65.firebaseapp.com",
  projectId: "fantasy-football-stats-b5b65",
  storageBucket: "fantasy-football-stats-b5b65.appspot.com",
  messagingSenderId: "784792654200",
  appId: "1:784792654200:web:2a73b1d03b0e21ba6af88d",
  measurementId: "G-KH1XFSDC0N"
};

const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);
const auth = getAuth(app);

export { app, auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };
