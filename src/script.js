import Card from './components/Card.js'
import FormValidator from './FormValidator.js'
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import PopupWithImage from './components/PopupWithImage.js';

const popup = document.querySelector('.popup')
const buttonEditProfile = document.querySelector('.profile__edit-button')
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

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'
});

buttonEditProfile.addEventListener('click', () => {
  formValidEdit.resetValidation();
  formEdit.open();
  const data = userInfo.getUserInfo();
  popupFirstFieldEdit.value = data.name;
  popupSecondFieldEdit.value = data.job;
})


buttonAddCard.addEventListener('click', () => {
  formValidAdd.resetValidation();
  formAdd.open();
})

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

function createCard(data) {
  const card = new Card(data, '.template-card', () => {
    popupImage.open(data.name, data.link)
  })
  return card.generateCard();
}

const section = new Section({items: initialCards, renderer: (item) => {
  const card = createCard(item);
  section.addItem(card);
}}, '.elements')
section.renderItems();

const formValidEdit = new FormValidator(settings, popupFormEdit);
const formValidAdd = new FormValidator(settings, popupFormAdd);

formValidEdit.enableValidation();
formValidAdd.enableValidation();

const formAdd = new PopupWithForm('.popup_type_add-card', (formData) => {
  const card = createCard({name: formData.imageName, link: formData.imageLink});
  cards.prepend(card);
})

formAdd.setEventListeners();

const formEdit = new PopupWithForm('.popup_type_edit', (formData) => {
  const {userName, userJob} = formData;
  userInfo.setUserInfo(userName, userJob);
})

formEdit.setEventListeners();

const popupImage = new PopupWithImage('.popup_type_show-photo')
popupImage.setEventListeners();
