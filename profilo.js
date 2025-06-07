function fetchProducts() {
    fetch("fetch_product.php")
        .then(response => response.json())
        .then(displaySavedProducts);
}

function displaySavedProducts(json) {
    console.log("Prodotti salvati:", json);
    const container = document.getElementById('results');
    if (!container) {
        console.error("Elemento #results non trovato nel DOM.");
        return;
    }

    container.innerHTML = '';

    if (!json.length) {
        const nores = document.createElement('div');
        nores.className = "nores";
        nores.textContent = "Nessun prodotto salvato.";
        container.appendChild(nores);
        return;
    }

    json.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("saved-product-card");

        if (product.thumbnail) {
            const img = document.createElement("img");
            img.src = product.thumbnail;
            img.alt = product.title;
            card.appendChild(img);
        }

        const infoContainer = document.createElement("div");
        infoContainer.classList.add("infoContainer");
        card.appendChild(infoContainer);

        const title = document.createElement("strong");
        title.textContent = product.title;
        infoContainer.appendChild(title);

        const snippet = document.createElement("p");
        snippet.textContent = product.snippet;
        infoContainer.appendChild(snippet);

        const price = document.createElement("p");
        price.textContent = product.price;
        infoContainer.appendChild(price);

        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
});