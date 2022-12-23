export { 
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
  popupSecondFieldAdd,
  popupFormAvatar,
  buttonAvatar,
  validationConfig
}

const buttonEditProfile = document.querySelector('.profile__edit-button')
const buttonAddCard = document.querySelector('.profile__add-button')
const popupFormEdit = document.querySelector('.popup__form_edit')
const popupFirstFieldEdit = document.querySelector('.popup__first-field_edit')
const popupSecondFieldEdit = document.querySelector('.popup__second-field_edit')
const userName = document.querySelector('.profile__name')
const userJob = document.querySelector('.profile__job')
const cardsContainer = document.querySelector('.elements')
const popupFormAdd = document.querySelector('.popup__form_add')
const popupFirstFieldAdd = document.querySelector('.popup__first-field_add')
const popupSecondFieldAdd = document.querySelector('.popup__second-field_add')
const popupFormAvatar = document.querySelector('.popup__form_avatar')
const buttonAvatar = document.querySelector('.profile__avatar-button')

const validationConfig = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  submitButtonElement: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  activeButtonClass: 'popup__save-button_valid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'error'  
}