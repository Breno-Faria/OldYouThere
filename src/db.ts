import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBiBb3gkrvpqOn1aIYxSAj0eJP8EvsxrLg",
  authDomain: "u-there.firebaseapp.com",
  projectId: "u-there",
  storageBucket: "u-there.appspot.com",
  messagingSenderId: "1088510786884",
  appId: "1:1088510786884:web:4fd89fa40ffd17c5dbeb11"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)