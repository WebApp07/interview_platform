// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQGNJzpWkrM6eeaqkDEguZ2WC5MBWnoY4",
  authDomain: "interviewplatform-4696d.firebaseapp.com",
  projectId: "interviewplatform-4696d",
  storageBucket: "interviewplatform-4696d.firebasestorage.app",
  messagingSenderId: "697342169379",
  appId: "1:697342169379:web:da6fa973f3b762535dfc96",
  measurementId: "G-0TW10FDJYD",
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
