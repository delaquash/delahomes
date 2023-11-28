// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "delahomes-29716.firebaseapp.com",
  projectId: "delahomes-29716",
  storageBucket: "delahomes-29716.appspot.com",
  messagingSenderId: "32674193223",
  appId: "1:32674193223:web:3ee0f30df59411f5f77662",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
