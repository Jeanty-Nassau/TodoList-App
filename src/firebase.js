// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC51O0v5dj6nluh9gWfsSllNs3Yv6d_WbE",
  authDomain: "todo-list-da567.firebaseapp.com",
  projectId: "todo-list-da567",
  storageBucket: "todo-list-da567.appspot.com",
  messagingSenderId: "427215057223",
  appId: "1:427215057223:web:5a6f383c20dd488b189c62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };