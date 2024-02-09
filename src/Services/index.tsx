// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBK6TJhRDskCsuQFPEKunwJ9UH2NPqTJzM",
  authDomain: "notes-4a560.firebaseapp.com",
  projectId: "notes-4a560",
  storageBucket: "notes-4a560.appspot.com",
  messagingSenderId: "764279884794",
  appId: "1:764279884794:web:55b080dcd1224199553243",
  measurementId: "G-LED3TJ7G6S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)
const storage = getStorage(app)

export {db, auth, storage}