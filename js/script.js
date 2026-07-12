import { db, auth } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const productsContainer = document.getElementById("productsContainer");
const cartBtn = document.getElementById("cartBtn");
const userName = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");

let allProducts = [];
async function loadProducts() {

    const snapshot = await getDocs(collection(db, "products"));

    allProducts = [];

    productsContainer.innerHTML = "";

    snapshot.forEach((doc) => {

        const product = {
            id: doc.id,
            ...doc.data()
        };
        allProducts.push(product);

    });
    displayProducts(allProducts);

}
function addToCart(product) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();

    alert(product.name + " added to cart!");

}

window.addToCart = addToCart;
function updateCart() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartBtn.innerHTML = `🛒 Cart (${cart.length})`;

}

updateCart();
onAuthStateChanged(auth, (user) => {

    if (user) {

        userName.textContent = `👋 ${user.displayName || user.email}`;

        logoutBtn.style.display = "inline-block";

    } else {

        userName.textContent = "";

        logoutBtn.style.display = "none";

    }

});

logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    alert("Logged out successfully!");

    window.location.href = "login.html";

});
loadProducts();

function displayProducts(products) {

    productsContainer.innerHTML = "";

    products.forEach((product) => {

        productsContainer.innerHTML += `

        <div class="card">

            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p><strong>₹${product.price}</strong></p>

            <p>${product.category}</p>

            <button onclick='addToCart(${JSON.stringify(product)})'>
                Add to Cart
            </button>

        </div>

        `;

    });

}
const searchBox = document.getElementById("searchBox");

searchBox.addEventListener("input", () => {

    const searchText = searchBox.value.toLowerCase();

    const filteredProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchText)
    );

    displayProducts(filteredProducts);

});
const categoryButtons = document.querySelectorAll(".categoryBtn");

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category = button.dataset.category;

        if (category === "All") {

            displayProducts(allProducts);

            return;
        }

        const filteredProducts = allProducts.filter(product =>
            product.category.toLowerCase() === category.toLowerCase()
        );

        displayProducts(filteredProducts);

    });

});
const priceFilter = document.getElementById("priceFilter");

priceFilter.addEventListener("change", () => {

    const value = priceFilter.value;

    let filteredProducts = [];

    if (value === "all") {

        filteredProducts = allProducts;

    } else if (value === "0-500") {

        filteredProducts = allProducts.filter(product =>
            product.price >= 0 && product.price <= 500
        );

    } else if (value === "501-1000") {

        filteredProducts = allProducts.filter(product =>
            product.price >= 501 && product.price <= 1000
        );

    } else if (value === "1001") {

        filteredProducts = allProducts.filter(product =>
            product.price > 1000
        );

    }

    displayProducts(filteredProducts);

});
const sortProducts = document.getElementById("sortProducts");

sortProducts.addEventListener("change", () => {

    let sorted = [...allProducts];

    switch(sortProducts.value){

        case "low":
            sorted.sort((a,b)=>a.price-b.price);
            break;

        case "high":
            sorted.sort((a,b)=>b.price-a.price);
            break;

        case "az":
            sorted.sort((a,b)=>a.name.localeCompare(b.name));
            break;

        case "za":
            sorted.sort((a,b)=>b.name.localeCompare(a.name));
            break;

        default:
            sorted = [...allProducts];

    }

    displayProducts(sorted);

});