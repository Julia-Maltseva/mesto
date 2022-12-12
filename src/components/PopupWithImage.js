import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageBigPhoto = this._popupElement.querySelector('.popup__photo');
    this._nameBigPhoto = this._popupElement.querySelector('.popup__photo-title');
  }

  open(name, link) {
    this._imageBigPhoto.src = link;
    this._imageBigPhoto.alt = link;
    this._nameBigPhoto.textContent = name;
    super.open();
  }
}