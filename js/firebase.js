// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

// Firestore
import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Authentication
import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {

    apiKey: "AIzaSyA0PIblusgWYgU6itE3-Jnd_gseGbLQD9I",

    authDomain: "mahasri-traders.firebaseapp.com",

    projectId: "mahasri-traders",

    storageBucket: "mahasri-traders.firebasestorage.app",

    messagingSenderId: "559849109728",

    appId: "1:559849109728:web:1553d838dda4ae82e33885"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { app, db, auth };