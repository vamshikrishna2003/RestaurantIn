// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD0B01NvOFq08SpAaX8AbrLCGHrbiaHpcc",
    authDomain: "restaurant-c2742.firebaseapp.com",
    projectId: "restaurant-c2742",
    storageBucket: "restaurant-c2742.firebasestorage.app",
    messagingSenderId: "531405461193",
    appId: "1:531405461193:web:ac5061e45f53802c4c1f18",
    measurementId: "G-XCK63GVD09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);