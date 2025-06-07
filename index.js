/* funzione per il bottone iscriviti | accesso  */
function onButtonClick() {
  document.body.classList.add('no-scroll'); 
  modalView.classList.remove('hidden'); 
}

function onModalClick(event) {
  if (event.target === modalView) {
    closeModal();
  }
}

function closeModal() {
  document.body.classList.remove('no-scroll'); 
  modalView.classList.add('hidden'); 
}

function closeModalOnX() {
  closeModal();
}

const accesso = document.querySelector(".button-accesso");
const modalView = document.querySelector('#modal-view');
const closeButton = document.querySelector('#X');

accesso.addEventListener('click', onButtonClick);
modalView.addEventListener('click', onModalClick);
closeButton.addEventListener('click', closeModalOnX);
