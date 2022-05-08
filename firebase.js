import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDm_nU9Kaj24apOVCRQ6NQgdaDTaMqEC5o",
  authDomain: "fergetider-16775.firebaseapp.com",
  databaseURL:
    "https://fergetider-16775-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fergetider-16775",
  storageBucket: "fergetider-16775.appspot.com",
  messagingSenderId: "664741013983",
  appId: "1:664741013983:web:49b1fbe18cac5089727c6a",
  measurementId: "G-JLLK5V8G8H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
