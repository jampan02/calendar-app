import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDr8Mkdw8ZJX3okCoBoE2Fb5n1ITMBAL7s",
  authDomain: "calendarapp-c8d46.firebaseapp.com",
  projectId: "calendarapp-c8d46",
  storageBucket: "calendarapp-c8d46.appspot.com",
  messagingSenderId: "536602971855",
  appId: "1:536602971855:web:f4f262d15d7d9b40fc71ba",
  measurementId: "G-K0Y3BJWZVM",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
export const db = firebase.firestore();
