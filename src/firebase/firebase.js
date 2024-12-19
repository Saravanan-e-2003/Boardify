// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiszM4n7jMdtaPKd596qnV80N33EceCfk",
  authDomain: "boardify-5b962.firebaseapp.com",
  projectId: "boardify-5b962",
  storageBucket: "boardify-5b962.firebasestorage.app",
  messagingSenderId: "570504496058",
  appId: "1:570504496058:web:cbd371141cfeb16d0b5383",
  measurementId: "G-3DN744L1LY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export {auth,app};