import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.popup__input'));
    this._buttonSave = document.querySelector('.popup__save-button');
    this._buttonSaveText = this._buttonSave.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    
    return this._formValues;
  }

  changeSubmitHandler(newSubmit) {
    this._handleSubmitForm = newSubmit;
  }

  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this._buttonSave.textContent = loadingText;
    } else {
      this._buttonSave.textContent = this._buttonSaveText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleSubmitForm(this._getInputValues())
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}