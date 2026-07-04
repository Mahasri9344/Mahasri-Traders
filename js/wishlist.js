const wishlistItems = document.getElementById("wishlistItems");

const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

if (wishlist.length === 0) {

    wishlistItems.innerHTML = "<h2>Your wishlist is empty ❤️</h2>";

} else {

    wishlist.forEach(function(product) {

        wishlistItems.innerHTML += `

        <div class="card">

            <img src="${product.image}">

            <h3>${product.name}</h3>

            <p>${product.pack}</p>

            <p>₹${product.price}</p>

        </div>

        `;

    });

}