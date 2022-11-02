const popup = document.querySelector('.popup')
const buttonEditProfile = document.querySelector('.profile__edit-button')
const buttonClose = document.querySelector('.popup__close-button')
const buttonAddCard = document.querySelector('.profile__add-button')
const popupForm = document.querySelector('.popup__form')
const popupFirstField = popup.querySelector('.popup__first-field')
const popupSecondField = popup.querySelector('.popup__second-field')
const userName = document.querySelector('.profile__name')
const userJob = document.querySelector('.profile__job')
const popupEditProfile = document.querySelector('.popup_type_edit')
const popupAddCard = document.querySelector('.popup_type_add-card')
const popupShowPhoto = document.querySelector('.popup_type_show-photo')
const cards = document.querySelector('.elements')
const popupFormAdd = document.querySelector('.popup__form_add')
const nameBigPhoto = document.querySelector('.popup__photo-title')
const imageBigPhoto = document.querySelector('.popup__photo')
const popupFirstFieldAdd = document.querySelector('.popup__first-field_add')
const popupSecondFieldAdd = document.querySelector('.popup__second-field_add')
const template = document.querySelector('#template-card')

function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupByEsc)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupByEsc)
}

buttonEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile)
  popupFirstField.value = userName.textContent
  popupSecondField.value = userJob.textContent;
})

buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard)  
})

function submitFormHandler (evt) {
  evt.preventDefault()
  closePopup(popup)
  userName.textContent = popupFirstField.value
  userJob.textContent = popupSecondField.value;
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const render = () => {
  initialCards.forEach((item) => {
    const card = createCard(item.name, item.link);
    cards.append(card)
  });
} 

function createCard(name, link) {
  const card = template.content.cloneNode(true)
  const elementTitle = card.querySelector('.element__title')
  elementTitle.textContent = name;
  const elementImage = card.querySelector('.element__image')
  elementImage.src = link;
  elementImage.alt = name;
  const buttonLike = card.querySelector('.element__like-button')
  const buttonDelete = card.querySelector('.element__delete-button')

  buttonLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like-button_active');
  });

  elementImage.addEventListener('click', showPhoto)
  buttonDelete.addEventListener('click', deleteElement)

  function showPhoto(evt) {
    const elementImage = evt.target.closest('.element__image');
    openPopup(popupShowPhoto)
    nameBigPhoto.textContent = elementTitle.textContent;
    imageBigPhoto.src = elementImage.src;
    imageBigPhoto.alt = elementImage.textContent;
  }

  return card
  
} 

render();

function submitFormAdd (evt) {
  evt.preventDefault()
  const item = createCard(popupFirstFieldAdd.value, popupSecondFieldAdd.value);
  cards.prepend(item)
  closePopup(popupAddCard)
  popupFormAdd.reset();
}

function deleteElement(evt) {
  const card = evt.target.closest('.element');
  card.remove();
}

const popups = document.querySelectorAll('.popup')
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)  
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)  
    }
  })  
})

const closePopupByEsc = (evt) => {
  if(evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup)
  }
}

popupForm.addEventListener('submit', submitFormHandler)
popupFormAdd.addEventListener('submit', submitFormAdd)

