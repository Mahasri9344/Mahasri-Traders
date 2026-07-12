import { app } from "./firebase.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const auth = getAuth(app);

document.getElementById("registerForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if(password !== confirmPassword){

        alert("Passwords do not match!");

        return;

    }

    try{

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        await updateProfile(userCredential.user, {

            displayName: name

        });

        alert("✅ Registration Successful!");

        window.location.href = "login.html";

    }

    catch(error){

        alert(error.message);

    }

});