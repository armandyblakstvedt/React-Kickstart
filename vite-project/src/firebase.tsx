// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLSsHKBDttN1wgCvnJwZz4H_4OMCkb8fw",
  authDomain: "ibdb-465f7.firebaseapp.com",
  projectId: "ibdb-465f7",
  storageBucket: "ibdb-465f7.appspot.com",
  messagingSenderId: "785791733774",
  appId: "1:785791733774:web:0ea11be74c5c8cf8feec5f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
