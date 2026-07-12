import { db } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Container
const productDetails = document.getElementById("productDetails");

// Load product
async function loadProduct() {

    if (!productId) {
        productDetails.innerHTML = "<h2>Product not found.</h2>";
        return;
    }

    const productRef = doc(db, "products", productId);
    const snapshot = await getDoc(productRef);

    if (snapshot.exists()) {

        const product = snapshot.data();

        productDetails.innerHTML = `
            <div class="product-page">

                <img src="${product.image}" class="product-image">

                <div class="product-info">

                    <h2>${product.name}</h2>

                    <h3>₹${product.price}</h3>

                    <p><strong>Category:</strong> ${product.category}</p>

                    <p><strong>Stock:</strong> ${product.stock}</p>

                    <button id="addCartBtn">
                        Add to Cart
                    </button>

                </div>

            </div>
        `;

        document.getElementById("addCartBtn").onclick = () => {

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            cart.push({
                id: productId,
                ...product
            });

            localStorage.setItem("cart", JSON.stringify(cart));

            alert("Product added to cart!");

        };

    } else {

        productDetails.innerHTML = "<h2>Product not found.</h2>";

    }

}

loadProduct();