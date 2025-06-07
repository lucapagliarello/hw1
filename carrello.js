fetchCartProducts();

function fetchCartProducts() {
  fetch("fetch_cart.php")
    .then(response => response.json())
    .then(displayCartProducts)
    .catch(error => console.error("Errore nel fetch del carrello:", error));
}

function displayCartProducts(json) {
  const container = document.getElementById('results');
  if (!container) {
    console.error("Elemento #results non trovato nel DOM.");
    return;
  }

  container.innerHTML = '';

  if (!json.length) {
    const nores = document.createElement('div');
    nores.className = "nores";
    nores.textContent = "Il carrello è vuoto.";
    container.appendChild(nores);

    updateSummaryPrice(0);
    return;
  }

  let totalPrice = 0;

  json.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product");

    if (product.thumbnail) {
      const img = document.createElement("img");
      img.src = product.thumbnail;
      img.alt = product.title;
      card.appendChild(img);
    }

    const info = document.createElement("div");
    info.classList.add("info");

    const title = document.createElement("h2");
    title.textContent = product.title;
    info.appendChild(title);

    const snippet = document.createElement("p");
    snippet.textContent = product.snippet;
    info.appendChild(snippet);

    const price = document.createElement("p");
    price.textContent = product.price;
    info.appendChild(price);

    const cleanPrice = parseFloat(product.price.replace(/[^\d,.-]/g, '').replace(',', '.'));
    if (!isNaN(cleanPrice)) {
      totalPrice += cleanPrice;
    }

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Rimuovi dal carrello";
    removeBtn.classList.add("remove-button");
    removeBtn.addEventListener("click", () => {
      removeFromCart(product.id);
    });

    info.appendChild(removeBtn);
    card.appendChild(info);
    container.appendChild(card);
  });

  updateSummaryPrice(totalPrice);
}

function updateSummaryPrice(orderPrice) {
  const commission = 1.95;
  const shipping = 3.79;
  const freeShipping = -3.79;

  const total = orderPrice + commission + shipping + freeShipping;

  document.querySelector('.summary-row:nth-child(2) span:last-child').textContent = formatEuro(orderPrice);
  document.querySelector('.summary-row:nth-child(3) span:last-child').textContent = formatEuro(commission);
  document.querySelector('.summary-row:nth-child(4) span:last-child').textContent = formatEuro(shipping);
  document.querySelector('.summary-row.green span:last-child').textContent = formatEuro(freeShipping);
  document.querySelector('.summary-row.total strong:last-child').textContent = formatEuro(total);
}

function formatEuro(number) {
  return number.toFixed(2).replace('.', ',') + ' €';
}


function removeFromCart(id) {
  fetch('remove_from_cart.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `id=${encodeURIComponent(id)}`
  })
  .then(response => response.json())
  .then(result => {
    if (result.ok) {
      console.log("Prodotto rimosso correttamente");
      fetchCartProducts();
    } else {
      console.error("Errore nel server:", result.error);
    }
  })
  .catch(error => {
    console.error("Errore nella rimozione dal carrello:", error);
  });
}

/* selezione della modalità di spedizione nel carrello */

const radios = document.querySelectorAll('.shipping-option input');

  for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener('change', onShippingChange);
  }

  function onShippingChange(event) {
    const options = document.querySelectorAll('.shipping-option');

    for (let j = 0; j < options.length; j++) {
      options[j].classList.remove('selected');
    }

    let currentElement = event.target;
    while (currentElement && !currentElement.classList.contains('shipping-option')) {
      currentElement = currentElement.parentNode;
    }

    if (currentElement) {
      currentElement.classList.add('selected');
    }
}
