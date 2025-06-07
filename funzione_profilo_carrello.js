/* click sull'icona del profilo per aprire i sotto-menù con collegamento al proprio account e al proprio carrello */
function toggleMenu(event) {
  console.log('Profilo cliccato!');
  const menu = document.querySelector('#collegamento-menu');
  menu.classList.toggle('hidden');
}

const profilo = document.querySelector('#profilo-btn');
profilo.addEventListener('click', toggleMenu);

// Chiudi il menu se clic fuori
document.addEventListener('click', function (e) {
  const menu = document.querySelector('#collegamento-menu');
  const profilo = document.querySelector('#profilo-btn');

  if (!menu.contains(e.target) && !profilo.contains(e.target)) {
    menu.classList.add('hidden');
  }
});
