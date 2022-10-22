const popup = document.querySelector('.popup')
const editButton = document.querySelector('.profile__edit-button')
const closeButton = document.querySelector('.popup__close-button')
const addButton = document.querySelector('.profile__add-button')
let popupForm = document.querySelector('.popup__form')
let popupFirstField = popup.querySelector('.popup__first-field')
let popupSecondField = popup.querySelector('.popup__second-field')
let userName = document.querySelector('.profile__name')
let userJob = document.querySelector('.profile__job')
const popupEdit = document.querySelector('.popup_edit')
const popupAddCard = document.querySelector('.popup_add-card')
const popupShowPhoto = document.querySelector('.popup_show-photo')
const cards = document.querySelector('.elements')
let popupFormAdd = document.querySelector('.popup__form_add')
const closeButtonAdd = document.querySelector('.popup__close-button_add')
const nameBigPhoto = document.querySelector('.popup__photo-title')
const imageBigPhoto = document.querySelector('.popup__photo')
const closeButtonPhoto = document.querySelector('.popup__close-button_photo')

function openPopup(popup) {
  popup.classList.add('popup_opened')  
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')  
}

editButton.addEventListener('click', () => {
  openPopup(popupEdit)
  popupFirstField.value = userName.textContent
  popupSecondField.value = userJob.textContent;
})

closeButton.addEventListener('click', () => {
  closePopup(popupEdit)
})

addButton.addEventListener('click', () => {
  openPopup(popupAddCard)  
})

closeButtonAdd.addEventListener('click', () => {
  closePopup(popupAddCard)  
})

function formSubmitHandler (evt) {
  evt.preventDefault()
  closePopup(popup)
  userName.textContent = popupFirstField.value
  userJob.textContent = popupSecondField.value;
}

popupForm.addEventListener('submit', formSubmitHandler)

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

const template = document.querySelector('#template-card')
function createCard(name, link) {
  const card = template.content.cloneNode(true)
  const elementTitle = card.querySelector('.element__title')
  elementTitle.textContent = name;
  const elementImage = card.querySelector('.element__image')
  elementImage.src = link;
  const likeButton = card.querySelector('.element__like-button')
  const deleteButton = card.querySelector('.element__delete-button')

  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like-button_active');
  });

  elementImage.addEventListener('click', showPhoto)
  deleteButton.addEventListener('click', deleteElement)

  function showPhoto(evt) {
    const elementImage = evt.target.closest('.element__image');
    openPopup(popupShowPhoto)
    nameBigPhoto.textContent = elementTitle.textContent;
    imageBigPhoto.src = elementImage.src;
  }

  return card
  
}

render();

popupFormAdd.addEventListener('submit', formSubmitAdd)

let popupFirstFieldAdd = document.querySelector('.popup__first-field_add')
let popupSecondFieldAdd = document.querySelector('.popup__second-field_add')

function formSubmitAdd (evt) {
  evt.preventDefault()
  const item = createCard(popupFirstFieldAdd.value, popupSecondFieldAdd.value);
  cards.prepend(item)
  closePopup(popupAddCard)
  popupFirstFieldAdd.value = ""
  popupSecondFieldAdd.value = ""
}

function deleteElement(evt) {
  const card = evt.target.closest('.element');
  card.remove();
}

closeButtonPhoto.addEventListener('click', () => {
  closePopup(popupShowPhoto)  
});
