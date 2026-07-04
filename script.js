console.log("Mahasri Traders Website Loaded");

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

// Product Popup

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

// Shopping Cart

let cartCount = 0;

const cartButtons = document.querySelectorAll(".cart-btn");
const cartCounter = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");

cartButtons.forEach(function(button){

    button.addEventListener("click", function(){

        cartCount++;
        cartCounter.textContent = cartCount;

        const card = button.parentElement;

        const productName = card.dataset.title;
        const productPrice = card.dataset.price;

        const li = document.createElement("li");

        li.textContent = productName + " - ₹" + productPrice;

        cartItems.appendChild(li);

    });

});
// Cart Panel

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