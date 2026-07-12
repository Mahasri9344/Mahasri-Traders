import { app } from "./firebase.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const auth = getAuth(app);

// Change this to your admin email
const ADMIN_EMAIL = "mahasrirajkumar07@gmail.com";

onAuthStateChanged(auth, (user) => {

    if (!user) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;
    }

    if (user.email !== ADMIN_EMAIL) {

        alert("Access Denied!");

        window.location.href = "index.html";

    }

});