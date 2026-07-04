console.log("Mahasri Traders Website Loaded");

// ==========================
// Product Search
// ==========================

const searchBox = document.getElementById("searchBox");
const cards = document.querySelectorAll(".card");
const productCount = document.getElementById("productCount");

searchBox.addEventListener("keyup", function () {

    const searchText = searchBox.value.toLowerCase();
    let visibleProducts = 0;

    cards.forEach(function (card) {

        const productName = card.dataset.name.toLowerCase();

        if (productName.includes(searchText)) {
            card.style.display = "block";
            visibleProducts++;
        } else {
            card.style.display = "none";
        }

    });

    productCount.textContent = `Showing ${visibleProducts} products`;

});

// ==========================
// Product Popup
// ==========================

const detailsButtons = document.querySelectorAll(".details-btn");
const modal = document.getElementById("productModal");
const closeBtn = document.querySelector(".close-btn");

const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");

detailsButtons.forEach(function(button){

    button.addEventListener("click", function(){

        const card = button.parentElement;

        modalImage.src = card.dataset.image;
        modalTitle.textContent = card.dataset.title;
        modalDescription.textContent = card.dataset.description;

        modal.style.display = "flex";

    });

});

closeBtn.addEventListener("click", function(){

    modal.style.display = "none";

});

// Close popup when clicking outside

window.addEventListener("click", function(event){

    if(event.target === modal){
        modal.style.display = "none";
    }

});

// ==========================
// Shopping Cart
// ==========================

let cart = [];
let cartCount = 0;
let totalPrice = 0;

const cartButtons = document.querySelectorAll(".cart-btn");
const cartCounter = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartGST = document.getElementById("cartGST");
const deliveryCharge = document.getElementById("deliveryCharge");

cartButtons.forEach(function(button){

    button.addEventListener("click", function(){

        const card = button.parentElement;

        const packSize = card.querySelector(".pack-size");

const selectedPrice = Number(packSize.value);

const selectedPack = packSize.options[packSize.selectedIndex].text;

const product = {
    name: card.dataset.title,
    image: card.dataset.image,
    pack: selectedPack,
    price: selectedPrice,
    quantity: 1
};

        const existingProduct = cart.find(function(item){

    return item.name === product.name &&
           item.pack === product.pack;

});

        if(existingProduct){

            existingProduct.quantity++;

        }else{

            cart.push(product);

        }

        cartCount++;
        cartCounter.textContent = cartCount;

        updateCart();

    });

});

// ==========================
// Update Cart
// ==========================

function updateCart(){

    cartItems.innerHTML = "";
    if(cart.length === 0){

    cartItems.innerHTML = "<p>Your cart is empty.</p>";

    cartTotal.textContent = "0";

    return;

}

    totalPrice = 0;

    cart.forEach(function(product, index){

        const li = document.createElement("li");

        li.innerHTML = `
<div class="cart-item">

    <img src="${product.image}" class="cart-image">

    <div class="cart-info">

        <strong>${product.name}</strong><br>

        <small>${product.pack}</small><br>

        Price: ₹${product.price} each

        <div class="quantity-controls">

            <button class="minus-btn" data-index="${index}">
                ➖
            </button>

            <span class="qty">
                ${product.quantity}
            </span>

            <button class="plus-btn" data-index="${index}">
                ➕
            </button>

        </div>

        <strong>
            Subtotal: ₹${product.price * product.quantity}
        </strong>

        <br><br>

        <button class="remove-btn" data-index="${index}">
            🗑 Remove
        </button>

    </div>

</div>
`;

        cartItems.appendChild(li);

        totalPrice += product.price * product.quantity;

    });

   const gst = Math.round(totalPrice * 0.05);

cartSubtotal.textContent = totalPrice;

cartGST.textContent = gst;

if(totalPrice >= 999){

    deliveryCharge.textContent = "FREE";

}else{

    deliveryCharge.textContent = "₹50";

}

cartTotal.textContent =
totalPrice + gst + (totalPrice >= 999 ? 0 : 50);

localStorage.setItem("cart", JSON.stringify(cart));

}

// ==========================
// Cart Panel
// ==========================

const cartIcon = document.getElementById("cartIcon");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");

cartIcon.addEventListener("click", function(event){

    event.preventDefault();

    cartPanel.classList.add("active");

});

closeCart.addEventListener("click", function(){

    cartPanel.classList.remove("active");

});

document.addEventListener("click", function(event){

    if(event.target.classList.contains("remove-btn")){

        const index = event.target.dataset.index;

        cart.splice(index, 1);

        cartCount = 0;

        cart.forEach(function(product){

            cartCount += product.quantity;

        });

        cartCounter.textContent = cartCount;

        updateCart();

    }

});
// Increase Quantity

document.addEventListener("click", function(event){

    if(event.target.classList.contains("plus-btn")){

        const index = event.target.dataset.index;

        cart[index].quantity++;

        cartCount++;

        cartCounter.textContent = cartCount;

        updateCart();

    }

});

// Decrease Quantity

document.addEventListener("click", function(event){

    if(event.target.classList.contains("minus-btn")){

        const index = event.target.dataset.index;

        if(cart[index].quantity > 1){

            cart[index].quantity--;

            cartCount--;

        }else{

            cart.splice(index,1);

            cartCount--;

        }

        cartCounter.textContent = cartCount;

        updateCart();

    }

});

// ==========================
// Checkout
// ==========================

const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckout = document.getElementById("closeCheckout");

checkoutBtn.addEventListener("click", function(){

    checkoutModal.style.display = "flex";

});

closeCheckout.addEventListener("click", function(){

    checkoutModal.style.display = "none";

});

// ==========================
// Place Order
// ==========================

const placeOrder = document.getElementById("placeOrder");

placeOrder.addEventListener("click", function(){

    // Get customer details
    const name = document.getElementById("customerName").value;
    const phone = document.getElementById("customerPhone").value;
    const email = document.getElementById("customerEmail").value;
    const address = document.getElementById("customerAddress").value;

    // Check if fields are empty
    if(name === "" || phone === "" || address === ""){

        alert("Please fill all required fields.");

        return;
    }

    // Create product list
    let orderDetails = "";

    cart.forEach(function(product){

        orderDetails +=
`${product.name} × ${product.quantity} - ₹${product.price * product.quantity}\n`;

    });

    // Create WhatsApp message
    const message =
`🛒 *New Order - Mahasri Traders*

👤 Name: ${name}

📞 Phone: ${phone}

📧 Email: ${email}

🏠 Address:
${address}

------------------------

Products:

${orderDetails}

------------------------

💰 Total: ₹${totalPrice}`;

    // Your WhatsApp number
    const whatsappNumber = "9344513062";

    // Open WhatsApp
    window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
        "_blank"
    );
    // Clear cart
cart = [];
cartCount = 0;
totalPrice = 0;

// Update display
cartCounter.textContent = 0;
updateCart();

// Clear checkout form
document.getElementById("customerName").value = "";
document.getElementById("customerPhone").value = "";
document.getElementById("customerEmail").value = "";
document.getElementById("customerAddress").value = "";

// Close checkout popup
checkoutModal.style.display = "none";

// Success message
alert("🎉 Thank you! Your order has been sent successfully.");

});

// ==========================
// Product Category Filter
// ==========================

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(function(button){

    button.addEventListener("click", function(){

        // Remove active class
        filterButtons.forEach(function(btn){
            btn.classList.remove("active");
        });

        // Add active class
        button.classList.add("active");

        const filter = button.dataset.filter;
        console.log(filter);

        cards.forEach(function(card){
            console.log(card.dataset.title, card.dataset.category);

            if(filter === "all"){

                card.style.display = "block";

            }else if(card.dataset.category === filter){

                card.style.display = "block";

            }else{

                card.style.display = "none";

            }

        });

    });

});

// ==========================
// Product Sorting
// ==========================

const sortProducts = document.getElementById("sortProducts");

sortProducts.addEventListener("change", function () {

    const value = this.value;

    const productContainers = document.querySelectorAll(".products");

    productContainers.forEach(function(container){

        const cards = Array.from(container.querySelectorAll(".card"));

        cards.sort(function(a, b){

            if(value === "low-high"){
                return Number(a.dataset.price) - Number(b.dataset.price);
            }

            if(value === "high-low"){
                return Number(b.dataset.price) - Number(a.dataset.price);
            }

            if(value === "a-z"){
                return a.dataset.title.localeCompare(b.dataset.title);
            }

            if(value === "z-a"){
                return b.dataset.title.localeCompare(a.dataset.title);
            }

            return 0;

        });

        cards.forEach(function(card){
            container.appendChild(card);
        });

    });

});
// ==========================
// Wishlist
// ==========================
// ==========================
// Wishlist
// ==========================

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const wishlistButtons = document.querySelectorAll(".wishlist-btn");

const wishlistCount = document.getElementById("wishlistCount");

wishlistCount.textContent = wishlist.length;

wishlistButtons.forEach(function(button){

    button.addEventListener("click", function(){

        const card = button.parentElement;

        const product = {

            name: card.dataset.title,

            image: card.dataset.image,

            price: card.dataset.price,

            pack: "Available"

        };

        const exists = wishlist.find(function(item){

            return item.name === product.name;

        });

        if(exists){

            wishlist = wishlist.filter(function(item){

                return item.name !== product.name;

            });

            button.textContent = "🤍";

            button.classList.remove("active");

        }else{

            wishlist.push(product);

            button.textContent = "❤️";

            button.classList.add("active");

        }

        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        wishlistCount.textContent = wishlist.length;

    });

});
// ==========================
// Load Cart from Local Storage
// ==========================

const savedCart = localStorage.getItem("cart");

if(savedCart){

    cart = JSON.parse(savedCart);

    cartCount = 0;

    cart.forEach(function(product){

        cartCount += product.quantity;

    });

    cartCounter.textContent = cartCount;

    updateCart();

}