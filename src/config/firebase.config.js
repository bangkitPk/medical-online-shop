import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAI49b_X7P4xJTXOgHn9cMbGk81cFWYt9Q",
  authDomain: "health-online-shopping.firebaseapp.com",
  projectId: "health-online-shopping",
  storageBucket: "health-online-shopping.appspot.com",
  messagingSenderId: "922578934423",
  appId: "1:922578934423:web:8e44ac40d066ba5d3867d2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
