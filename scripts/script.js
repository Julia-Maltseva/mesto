const popupEditProfile = document.querySelector('.popup_type_edit')
const popupAddCard = document.querySelector('.popup_type_add-card')
const popup = document.querySelector('.popup')
const buttonEditProfile = document.querySelector('.profile__edit-button')
const buttonClose = document.querySelector('.popup__close-button')
const buttonAddCard = document.querySelector('.profile__add-button')
const popupFormEdit = document.querySelector('.popup__form_edit')
const popupFirstFieldEdit = popup.querySelector('.popup__first-field_edit')
const popupSecondFieldEdit = popup.querySelector('.popup__second-field_edit')
const userName = document.querySelector('.profile__name')
const userJob = document.querySelector('.profile__job')
const cards = document.querySelector('.elements')
const popupFormAdd = document.querySelector('.popup__form_add')
const popupFirstFieldAdd = document.querySelector('.popup__first-field_add')
const popupSecondFieldAdd = document.querySelector('.popup__second-field_add')

buttonEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile)
  popupFirstFieldEdit.value = userName.textContent;
  popupSecondFieldEdit.value = userJob.textContent;
})

const inactiveButtonClass = () => {
  const buttonSave = document.getElementById('buttonSaveAdd');
  buttonSave.classList.add('popup__save-button_invalid');
  buttonSave.classList.remove('popup__save-button_valid');
  buttonSave.disabled = true;
}

buttonAddCard.addEventListener('click', () => {
  openPopup(popupAddCard)
})

function submitFormHandler (evt) {
  evt.preventDefault()
  closePopup(popup)
  userName.textContent = popupFirstFieldEdit.value;
  userJob.textContent = popupSecondFieldEdit.value;
}

import Card from './Card.js'
import FormValidator from './FormValidator.js'

const settings = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  submitButtonElement: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  activeButtonClass: 'popup__save-button_valid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'error'  
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
    const card = createCard(item);
    cards.append(card);
  });
} 

function createCard(data) {
  const card = new Card(data, '.template-card');
  const cardElement = card.generateCard();

  return cardElement;
} 

render();

function submitFormAdd (evt) {
  evt.preventDefault()
  const item = createCard({name: popupFirstFieldAdd.value, link: popupSecondFieldAdd.value});
  cards.prepend(item)
  closePopup(popupAddCard);
  popupFormAdd.reset();
  inactiveButtonClass();
}

const formValidEdit = new FormValidator(settings, popupFormEdit);
const formValidAdd = new FormValidator(settings, popupFormAdd);

formValidEdit.enableValidation();
formValidAdd.enableValidation();

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

popupFormEdit.addEventListener('submit', submitFormHandler)
popupFormAdd.addEventListener('submit', submitFormAdd)

import { openPopup, closePopupByEsc, closePopup } from './variables.js';
