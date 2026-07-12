import { db } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

document.getElementById("checkoutForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    const order = {

        customerName: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        payment: document.getElementById("payment").value,

        products: JSON.parse(localStorage.getItem("cart")) || [],

        status: "Pending",

        createdAt: new Date()

    };

    try {

       const docRef = await addDoc(collection(db, "orders"), order);

console.log("Order saved successfully!");
console.log("Document ID:", docRef.id);

alert("✅ Order Placed Successfully!");

localStorage.removeItem("cart");

//window.location.href = "index.html";
    }

    catch(error){

        console.error(error);

        alert("Order Failed");

    }

});