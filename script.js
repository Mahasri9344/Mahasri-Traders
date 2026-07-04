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