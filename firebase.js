// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDzJRE6n3h78HCZ7TFDb7b_pVf7aLgvTJY",
    authDomain: "bani-native.firebaseapp.com",
    projectId: "bani-native",
    storageBucket: "bani-native.appspot.com",
    messagingSenderId: "202438382912",
    appId: "1:202438382912:web:080c8b00ee6152fe3bd6a5",
    measurementId: "G-E8FJTCRTW0"
  };

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth();
const firestore = firebase.firestore(); // Add Firestore instance

export { auth, firestore }; // Export both auth and firestore
