import { db, auth } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const ordersContainer = document.getElementById("ordersContainer");

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        alert("Please login first!");

        window.location.href = "login.html";

        return;

    }

    loadOrders(user.email);

});

async function loadOrders(email) {

    const snapshot = await getDocs(collection(db, "orders"));

    ordersContainer.innerHTML = "";

    let found = false;

    snapshot.forEach((doc) => {

        const order = doc.data();

        if (order.email === email) {

            found = true;

            ordersContainer.innerHTML += `

            <div class="card">

                <h3>${order.customerName}</h3>

                <p>📞 ${order.phone}</p>

                <p>📍 ${order.address}</p>

                <p><strong>Payment:</strong> ${order.payment}</p>

                <p><strong>Status:</strong> ${order.status}</p>

            </div>

            `;

        }

    });

    if (!found) {

        ordersContainer.innerHTML = `
            <h3>No orders found.</h3>
        `;

    }

}