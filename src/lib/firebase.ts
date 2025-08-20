// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGL7z7pU5YQZHbhjlH-bXZfTYrVVwqWes",
  authDomain: "elevate-pivot.firebaseapp.com",
  projectId: "elevate-pivot",
  storageBucket: "elevate-pivot.firebasestorage.app",
  messagingSenderId: "207884074329",
  appId: "1:207884074329:web:3ebe89642cd1151b43e048",
  measurementId: "G-VV9E7H17XZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;