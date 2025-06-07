/* pulsante Mostra Altri articoli per aggiungere ulteriori articoli nella home */

function mostraAltro(event) {
  const extraContainer = document.querySelector('#flex-container-extra').parentElement;
  const bottone = event.currentTarget;
  const link = bottone.querySelector('a');

  const isHidden = extraContainer.classList.contains('hidden');

  if (isHidden) {
    extraContainer.classList.remove('hidden');
    link.textContent = 'Mostra meno articoli';
  } else {
    extraContainer.classList.add('hidden');
    link.textContent = 'Mostra altri articoli';
  }
}

const toggleButton = document.querySelector('#mostra-altro');
toggleButton.addEventListener('click', mostraAltro);

/* Cambiamento immagine numero di like, quando clicco sull'immagine, modificando l'attributo src*/

function onLikeClick(event) {
  const likeButton = event.currentTarget;
  const heartImg = likeButton.querySelector('img');
  const likeCount = likeButton.querySelector('span');
  const initialLikes = parseInt(likeButton.dataset.likes);

  let liked = heartImg.src.includes('cuorepieno.png');

  if (liked) {
    liked = false;
    updateHeartImage(heartImg, liked);
    updateLikeCount(likeCount, liked, initialLikes, likeButton);
  } else {
    liked = true;
    updateHeartImage(heartImg, liked);
    updateLikeCount(likeCount, liked, initialLikes, likeButton);
  }
}

function updateHeartImage(heartImg, liked) {
  if (liked) {
    heartImg.src = 'cuorepieno.png';
  } else {
    heartImg.src = 'like.png';
  }
}

function updateLikeCount(likeCount, liked, initialLikes, likeButton) {
  let newLikeCount;
  if (liked) {
    newLikeCount = initialLikes + 1;
  } else {
    newLikeCount = initialLikes - 1;
  }

  likeCount.textContent = newLikeCount;

  likeButton.dataset.likes = newLikeCount;
}

const allLikes = document.querySelectorAll('.likes');
for (let i = 0; i < allLikes.length; i++) {
  allLikes[i].addEventListener('click', onLikeClick);
}
