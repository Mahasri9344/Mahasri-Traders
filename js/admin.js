import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
async function loadDashboard(){

    const products = await getDocs(collection(db,"products"));

    const orders = await getDocs(collection(db,"orders"));

    document.getElementById("totalProducts").innerText = products.size;

    document.getElementById("totalOrders").innerText = orders.size;

    const customers = new Set();

    let revenue = 0;

    orders.forEach(doc=>{

        const order = doc.data();

        customers.add(order.phone);

        if(order.products){

            order.products.forEach(product=>{

                revenue += Number(product.price);

            });

        }

    });

    document.getElementById("totalCustomers").innerText = customers.size;

    document.getElementById("totalRevenue").innerText = "₹"+revenue;

}

const ordersContainer = document.getElementById("ordersContainer");

async function loadOrders() {

    const snapshot = await getDocs(collection(db, "orders"));

    ordersContainer.innerHTML = "";

    snapshot.forEach((orderDoc) => {

        const order = orderDoc.data();

        let productsHTML = "";

        if (order.products) {

            order.products.forEach(product => {

                productsHTML += `
                    <li>
                        ${product.name} - ₹${product.price}
                    </li>
                `;

            });

        }

        ordersContainer.innerHTML += `
        <div class="card">

            <h3>${order.customerName}</h3>

            <p>📞 ${order.phone}</p>

            <p>📧 ${order.email}</p>

            <p>${order.address}</p>

            <p>Payment : ${order.payment}</p>

            <h4>Products</h4>

            <ul>
                ${productsHTML}
            </ul>

            <p><strong>Status:</strong></p>

<select onchange="updateStatus('${orderDoc.id}', this.value)">

    <option value="Pending" ${order.status==="Pending"?"selected":""}>
        Pending
    </option>

    <option value="Processing" ${order.status==="Processing"?"selected":""}>
        Processing
    </option>

    <option value="Shipped" ${order.status==="Shipped"?"selected":""}>
        Shipped
    </option>

    <option value="Delivered" ${order.status==="Delivered"?"selected":""}>
        Delivered
    </option>

</select>

            <button onclick="approveOrder('${orderDoc.id}')">
                Approve
            </button>

            <button onclick="deleteOrder('${orderDoc.id}')">
                Delete
            </button>

        </div>
        `;

    });

}

window.approveOrder = async function(id){

    await updateDoc(doc(db,"orders",id),{

        status:"Approved"

    });

    loadOrders();

}

window.deleteOrder = async function(id){

    await deleteDoc(doc(db,"orders",id));

    loadOrders();

}

loadDashboard();
loadOrders();
window.updateStatus = async function(id, status){

    await updateDoc(doc(db, "orders", id), {

        status: status

    });

    alert("Order status updated!");

}