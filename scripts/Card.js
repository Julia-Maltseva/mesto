import { openPopup, imageBigPhoto, nameBigPhoto, popupShowPhoto, closePopupByEsc, closePopup } from './variables.js';

export default class Card {
  constructor(data, templateSelector, popupShowPhoto) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._popupShowPhoto = popupShowPhoto;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.element__like-button');
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._deleteElement();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._showPhoto();
    });

    this._buttonLike.addEventListener('click', () => {
      this._toggleLike();
    });
  }

  _deleteElement() {
    this._element.remove();
  }

  _showPhoto() {
    openPopup(popupShowPhoto);
    nameBigPhoto.textContent = this._name;
    imageBigPhoto.src = this._link;
    imageBigPhoto.alt = this._name;
}

_toggleLike() {
  this._buttonLike.classList.toggle('element__like-button_active');
}
}

