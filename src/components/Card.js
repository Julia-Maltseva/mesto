
export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._image = this._element.querySelector('.element__image');
    this._buttonLike = this._element.querySelector('.element__like-button');
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._deleteElement();
    });

    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._buttonLike.addEventListener('click', () => {
      this._toggleLike();
    });
  }

  _deleteElement() {
    this._element.remove();
  }

_toggleLike() {
  this._buttonLike.classList.toggle('element__like-button_active');
  }
}

