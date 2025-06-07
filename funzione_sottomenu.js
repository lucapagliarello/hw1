/* Funzione quando si passa con il mouse le varie categorie donna-uomo ecc. che si aprono le "sottocategorie" */

function showSubMenu(button) {
  const submenu = document.querySelectorAll('div[data-submenu]');
  for (let i = 0; i < submenu.length; i++) {
    const data = submenu[i].dataset.submenu;
    if (data === button) {
      submenu[i].classList.remove('hidden');
    } else {
      submenu[i].classList.add('hidden');
    }
  }
}

function hideSubMenu(button) {
  const submenu = document.querySelectorAll('div[data-submenu]');
  for (let i = 0; i < submenu.length; i++) {
    const data = submenu[i].dataset.submenu;
    if (data === button) {
      submenu[i].classList.add('hidden');
    }
  }
}

function mostraData(event) {
  const button = event.currentTarget.dataset.button;
  showSubMenu(button);
}

function nascondiData(event) {
  const button = event.currentTarget.dataset.button;
  hideSubMenu(button);
}

function nascondiSubMenu(event) {
  const submenu = event.currentTarget.parentElement;
  submenu.classList.add('hidden');
}

const linkSingolo = document.querySelectorAll('.link-singolo');

for (let i = 0; i < linkSingolo.length; i++) {
  linkSingolo[i].addEventListener("mouseover", mostraData);
}

const linkMobile = document.querySelectorAll('.link-mobile');

for(let i = 0; i < linkMobile.length; i++) {
  linkMobile[i].addEventListener("mouseover", mostraData);
}

const subMenu = document.querySelectorAll('.submenu');

for(let i=0; i < subMenu.length; i++){
  subMenu[i].addEventListener("mouseleave", nascondiSubMenu);
}

function showSubSubMenu(key) {
  const allRightSubmenus = document.querySelectorAll('[data-submenu-right]');
  for (let i = 0; i < allRightSubmenus.length; i++) {
    const submenuKey = allRightSubmenus[i].dataset.submenuRight;
    if (submenuKey === key) {
      allRightSubmenus[i].classList.remove('hidden');
    } else {
      allRightSubmenus[i].classList.add('hidden');
    }
  }
}

function hideSubSubMenuRight() {
  const allRightSubmenus = document.querySelectorAll('[data-submenu-right]');
  for (let i = 0; i < allRightSubmenus.length; i++) {
    allRightSubmenus[i].classList.add('hidden');
  }
}

function handleMouseOver(event) {
  const key = event.currentTarget.dataset.subsubmenu;
  showSubSubMenu(key);
}

function handleMouseLeave() {
  hideSubSubMenuRight();
}

const subsubmenuLinks = document.querySelectorAll('[data-subsubmenu]');
for (let i = 0; i < subsubmenuLinks.length; i++) {
  subsubmenuLinks[i].addEventListener('mouseover', handleMouseOver);
}

const submenuRight = document.querySelectorAll('.submenu-right');
for (let i = 0; i < submenuRight.length; i++) {
  submenuRight[i].addEventListener('mouseleave', handleMouseLeave);
}

/* Menu a tendina versione mobile */

function showMenuMobile(){
  mobileMenu.classList.toggle('hidden');
}

const menuIcon = document.querySelector('#menu');
const mobileMenu = document.querySelector('#mobile-menu');

menuIcon.addEventListener('click', showMenuMobile);