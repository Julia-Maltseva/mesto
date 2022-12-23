
export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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
    this._likeCount = this._element.querySelector('.element__like-count')
    this._setEventListeners();

    this._element.querySelector('.element__title').textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;

    this.setLikes(this._likes);

    if (this._ownerId !== this._userId) {
      this._element.querySelector('.element__delete-button').style.display = 'none'
    }

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });

    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick(this._id);
    });
  }

  deleteElement() {
    this._element.remove();
  }

  isLiked() {
    const hasLike = this._likes.find((user) => user._id === this._userId)
    return hasLike;
  }

  setLikes(data) {
    this._likes = data;
    this._likeCount.textContent = this._likes.length

    
    if (this.isLiked()) {
      this._activeLike();
    } else {
      this._inactiveLike();
    }
  }  

  _activeLike() {
    this._buttonLike.classList.add('element__like-button_active');
  }

  _inactiveLike() {
    this._buttonLike.classList.remove('element__like-button_active');
  }
}

