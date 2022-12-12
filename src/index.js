import './pages/index.css';

import Card from './scripts/components/Card.js';
import FormValidator from './scripts/FormValidator.js';
import Section from './scripts/components/Section.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import UserInfo from './scripts/components/UserInfo.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import { initialCards } from './scripts/components/initialCards.js';
import {
  buttonEditProfile, 
  buttonAddCard, 
  popupFormEdit, 
  popupFirstFieldEdit, 
  popupSecondFieldEdit, 
  userName, 
  userJob, 
  cardsContainer,
  popupFormAdd, 
  popupFirstFieldAdd, 
  popupSecondFieldAdd
} from './scripts/components/constants.js';

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'
});

buttonEditProfile.addEventListener('click', () => {
  formValidEdit.resetValidation();
  popupProfile.open();
  const data = userInfo.getUserInfo();
  popupFirstFieldEdit.value = data.name;
  popupSecondFieldEdit.value = data.job;
})

buttonAddCard.addEventListener('click', () => {
  formValidAdd.resetValidation();
  popupCard.open();
})

const validationConfig = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  submitButtonElement: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  activeButtonClass: 'popup__save-button_valid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'error'  
}

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

const formValidEdit = new FormValidator(validationConfig, popupFormEdit);
const formValidAdd = new FormValidator(validationConfig, popupFormAdd);

formValidEdit.enableValidation();
formValidAdd.enableValidation();

const popupCard = new PopupWithForm('.popup_type_add-card', (formData) => {
  const card = createCard({name: formData.imageName, link: formData.imageLink});
  cardsContainer.prepend(card);
})

popupCard.setEventListeners();

const popupProfile = new PopupWithForm('.popup_type_edit', (formData) => {
  const {userName, userJob} = formData;
  userInfo.setUserInfo(userName, userJob);
})

popupProfile.setEventListeners();

const popupImage = new PopupWithImage('.popup_type_show-photo')
popupImage.setEventListeners();
