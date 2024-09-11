// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9MgFPt9lgYejOaar07iceLFEj8uZ_1vM",
  authDomain: "halopips-4ee32.firebaseapp.com",
  databaseURL:
    "https://halopips-4ee32-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "halopips-4ee32",
  storageBucket: "halopips-4ee32.appspot.com",
  messagingSenderId: "695345967837",
  appId: "1:695345967837:web:2c2e28a656fd4a4d6ca134",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
