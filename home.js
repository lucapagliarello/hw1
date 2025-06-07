/* barra di ricerca, con collegamento tramite API esterna, effettuata su search_product.php */

document.getElementById("form-products").addEventListener("submit", searchProducts);

function searchProducts(event) {
  event.preventDefault();

  const input = document.getElementById("search-input-products");
  const query = input.value.trim();

  fetch("search_product.php?q=" + encodeURIComponent(query))
    .then(response => response.json())
    .then(displayProducts);
}

function displayProducts(json) {
  const container = document.getElementById("results-products");
  container.innerHTML = ""; // pulisce risultati precedenti

  if (!json.shopping_results || json.shopping_results.length === 0) {
    container.innerHTML = '<p>Nessun prodotto trovato.</p>';
    return;
  }

  json.shopping_results.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    // Immagine prodotto (se presente)
    if (product.thumbnail) {
      const img = document.createElement("img");
      img.src = product.thumbnail;
      img.alt = product.title || "Immagine prodotto";
      card.appendChild(img);
    }

    // Info contenitore
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("infoContainer");
    card.appendChild(infoContainer);

    // Titolo prodotto
    const title = document.createElement("strong");
    title.textContent = product.title || "Titolo non disponibile";
    infoContainer.appendChild(title);

    // Descrizione/snippet
    const snippet = document.createElement("p");
    snippet.textContent = product.snippet || "";
    infoContainer.appendChild(snippet);

    // Prezzo prodotto
    const price = document.createElement("p");
    price.textContent = product.price || "Prezzo non disponibile";
    infoContainer.appendChild(price);

    // Form salva prodotto
    const saveForm = document.createElement("div");
    saveForm.classList.add("saveForm");
    card.appendChild(saveForm);

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Salva prodotto";
    saveBtn.type = "button";
    saveBtn.addEventListener("click", () => saveProduct(product));
    saveForm.appendChild(saveBtn);

    // Bottone "Aggiungi al carrello"
    const cartBtn = document.createElement("button");
    cartBtn.textContent = "Aggiungi al carrello";
    cartBtn.type = "button";
    cartBtn.addEventListener("click", () => addToCarrello(product));
    saveForm.appendChild(cartBtn);


    container.appendChild(card);
  });
}

function saveProduct(product) {
  const formData = new FormData();
  formData.append("title", product.title || "");
  formData.append("snippet", product.snippet || "");
  formData.append("price", product.price || "");
  formData.append("thumbnail", product.thumbnail || "");

  fetch("save_product.php", {
    method: "POST",
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      if (data.ok) alert("Prodotto salvato!");
      else alert("Errore nel salvataggio");
    })
    .catch(() => alert("Errore nel salvataggio"));
}

function addToCarrello(product) {
  const formData = new FormData();
  formData.append("title", product.title || "");
  formData.append("snippet", product.snippet || "");
  formData.append("price", product.price || "");
  formData.append("thumbnail", product.thumbnail || "");

  fetch("add_to_carrello.php", {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.ok) alert("Prodotto aggiunto al carrello!");
      else alert("Errore nel carrello: " + (data.error || "errore sconosciuto"));
    })
    .catch(error => {
      console.error("Errore fetch carrello:", error);
      alert("Errore nel carrello");
    });
}