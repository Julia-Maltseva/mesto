import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    const imageBigPhoto = this._popupElement.querySelector('.popup__photo');
    const nameBigPhoto = this._popupElement.querySelector('.popup__photo-title');
    imageBigPhoto.src = link;
    imageBigPhoto.alt = link;
    nameBigPhoto.textContent = name;
    super.open();
  }
}