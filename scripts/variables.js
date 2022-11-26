export {openPopup, nameBigPhoto, imageBigPhoto, popupShowPhoto, closePopupByEsc, closePopup}

const nameBigPhoto = document.querySelector('.popup__photo-title')
const imageBigPhoto = document.querySelector('.popup__photo')
const popupShowPhoto = document.querySelector('.popup_type_show-photo')

function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupByEsc)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupByEsc)
}

const closePopupByEsc = (evt) => {
  if(evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup)
  }
}