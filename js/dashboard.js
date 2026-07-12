import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

async function loadDashboard() {

    // Total Products
    const productsSnapshot = await getDocs(collection(db, "products"));
    document.getElementById("totalProducts").innerText = productsSnapshot.size;

    // Total Orders
    const ordersSnapshot = await getDocs(collection(db, "orders"));
    document.getElementById("totalOrders").innerText = ordersSnapshot.size;

    // Total Revenue
    let revenue = 0;

    ordersSnapshot.forEach((doc) => {
        const order = doc.data();

        if (order.total) {
            revenue += Number(order.total);
        }
    });

    document.getElementById("totalRevenue").innerText = "₹" + revenue;
    // Low Stock Products

let lowStockHTML = "";

productsSnapshot.forEach((doc) => {

    const product = doc.data();

    if (product.stock <= 10) {

        lowStockHTML += `
        <div class="card">
            <h3>${product.name}</h3>
            <p>Only ${product.stock} left</p>
        </div>
        `;

    }

});

document.getElementById("lowStockProducts").innerHTML =
lowStockHTML || "<p>✅ All products have sufficient stock.</p>";
}

loadDashboard();