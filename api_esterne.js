/* Funzione per aprire il box del cambio-valuta */

function cambioValuta(event) {
  console.log('Cambio valuta cliccato!');
  const wrapper = document.querySelector('.wrapper');

  wrapper.classList.toggle('hidden');
}

const cerchio = document.querySelector('.cerchio-vinted');
cerchio.addEventListener('click', cambioValuta);

/* API di ExchangeRate per poter effettuare il cambio valuta da una moneta all'altra
collegamento con l'API effettuato in exchange.php */

const currencies = ["AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTC","BTN","BWP","BYN","BZD","CAD","CDF","CHF","CLF","CLP","CNY","COP","CRC","CUC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GGP","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","IMP","INR","IQD","IRR","ISK","JEP","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRO","MRU","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLL","SOS","SRD","SSP","STD","STN","SVC","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","USD","UYU","UZS","VEF","VES","VND","VUV","WST","XAF","XAG","XAU","XCD","XDR","XOF","XPD","XPF","XPT","YER","ZAR","ZMW","ZWL"]; 
const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");
const result = document.getElementById("result");

// Popolamento dropdown
currencies.forEach(currency => {
  const option1 = document.createElement("option");
  option1.value = currency;
  option1.text = currency;
  fromDropDown.add(option1);

  const option2 = document.createElement("option");
  option2.value = currency;
  option2.text = currency;
  toDropDown.add(option2);
});

fromDropDown.value = "USD";
toDropDown.value = "INR";

function onResponse(response) {
  return response.json();
}

function onJson(json) {
  const amount = document.querySelector("#amount").value;
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;

  if (!json.conversion_rates) {
    result.textContent = "Errore nel recupero dei tassi di cambio.";
    return;
  }

  const fromRate = json.conversion_rates[fromCurrency];
  const toRate = json.conversion_rates[toCurrency];
  const convertedAmount = (amount / fromRate) * toRate;

  result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
}

function convertCurrency(event) {
  event.preventDefault();

  const fromCurrency = fromDropDown.value;
  const amount = document.querySelector("#amount").value;

  if (amount.trim() === '') {
    alert("Inserisci un importo valido!");
    return;
  }

  const url = `exchange.php?from=${encodeURIComponent(fromCurrency)}`;

  fetch(url)
    .then(onResponse)
    .then(onJson);
}

document.getElementById("currency-form").addEventListener("submit", convertCurrency);


/* API di Open Library (con collegamento con fetch con search_book.php) 
che consente la ricerca multipla di libri in base alla lingua, al titolo,
all'autore e all'anno di pubblicazione */


function onJsonRicerca(json) {
  const libreria = document.querySelector('#library-view');
  libreria.innerHTML = '';
  
  let numeroRisultati = json.num_found;
  if (numeroRisultati > 16)
    numeroRisultati = 16;

  for (let i = 0; i < numeroRisultati; i++) {
    const libro = json.docs[i];
    const titolo = libro.title;
    const copertina = libro.cover_i 
      ? 'http://covers.openlibrary.org/b/id/' + libro.cover_i + '-M.jpg'
      : 'copertina-non-disponibile.jpg';

    const contenitore = document.createElement('div');
    contenitore.classList.add('book');

    const immagine = document.createElement('img');
    immagine.src = copertina;

    const didascalia = document.createElement('span');
    didascalia.textContent = titolo;

    contenitore.appendChild(immagine);
    contenitore.appendChild(didascalia);
    libreria.appendChild(contenitore);
  }
}

function onResponseRicerca(response) {
  return response.json();
}

function eseguiRicerca(evento) {
  evento.preventDefault();

  const testo = document.querySelector('#search').value;
  const criterio = document.querySelector('#criteria').value;
  const lingua = document.querySelector('#language-api').value;

  if (testo === '') {
    alert('Inserisci un valore da cercare.');
    return;
  }

  const url = 'search_book.php?q=' + encodeURIComponent(testo) +
              '&criterio=' + encodeURIComponent(criterio) +
              '&lingua=' + encodeURIComponent(lingua);

  console.log('Eseguo ricerca con URL PHP: ' + url);
  fetch(url).then(onResponseRicerca).then(onJsonRicerca);
}

const formLibrary = document.querySelector('#form-library');
formLibrary.addEventListener('submit', eseguiRicerca);

