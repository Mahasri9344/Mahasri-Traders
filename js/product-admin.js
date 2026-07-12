import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const form = document.getElementById("productForm");
const productsContainer = document.getElementById("productsContainer");

// Add Product
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const product = {

        name: document.getElementById("name").value,
        price: Number(document.getElementById("price").value),
        category: document.getElementById("category").value,
        image: document.getElementById("image").value,
        stock: Number(document.getElementById("stock").value)

    };

    await addDoc(collection(db, "products"), product);

    alert("✅ Product Added Successfully!");

    form.reset();

    loadProducts();

});

// Load Products
async function loadProducts(){

    const snapshot = await getDocs(collection(db,"products"));

    productsContainer.innerHTML="";

    snapshot.forEach((document)=>{

        const product=document.data();

        productsContainer.innerHTML += `

        <div class="card">

            <img src="${product.image}" width="120">

            <h3>${product.name}</h3>

            <p>₹${product.price}</p>

            <p>${product.category}</p>

            <p>Stock : ${product.stock}</p>
<button onclick="editProduct('${document.id}')">
    Edit
</button>

<button onclick="deleteProduct('${document.id}')">
    Delete
</button>

        </div>

        `;

    });

}

// Delete Product
window.deleteProduct = async function(id){

    await deleteDoc(doc(db,"products",id));

    alert("Product Deleted");

    loadProducts();

}

loadProducts();
import {
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

window.editProduct = async function(id){

    const snap = await getDoc(doc(db, "products", id));

    const product = snap.data();

    document.getElementById("name").value = product.name;
    document.getElementById("price").value = product.price;
    document.getElementById("category").value = product.category;
    document.getElementById("image").value = product.image;
    document.getElementById("stock").value = product.stock;

    form.onsubmit = async function(e){

        e.preventDefault();

        await updateDoc(doc(db, "products", id), {

            name: document.getElementById("name").value,
            price: Number(document.getElementById("price").value),
            category: document.getElementById("category").value,
            image: document.getElementById("image").value,
            stock: Number(document.getElementById("stock").value)

        });

        alert("✅ Product Updated!");

        form.reset();

        form.onsubmit = null;

        loadProducts();

    };

};