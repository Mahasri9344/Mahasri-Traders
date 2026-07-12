console.log("Cart JS Loaded");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

if (cart.length === 0) {

    cartItems.innerHTML = "<h2>Your cart is empty 🛒</h2>";

} else {

    cart.forEach((product, index) => {

        total += Number(product.price);

        cartItems.innerHTML += `
        <div class="cart-card">

            <img src="${product.image}" alt="${product.name}" width="150">

            <div class="cart-info">

<h3>${product.name}</h3>

<p><strong>Price : ₹${product.price}</strong></p>

<p>Category : ${product.category}</p>

</div>

           <button class="removeBtn" onclick="removeItem(${index})">
                Remove
            </button>

        </div>
        `;

    });

}

totalPrice.innerHTML = "Total : ₹" + total;

function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();

}

window.removeItem = removeItem;