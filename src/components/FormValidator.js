export default class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._config = config;
    this._inputElement = this._formElement.querySelector(this._config.inputElement);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputElement));
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonElement);
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._activeButtonClass = config.activeButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showInputError = () => {
    const errorElement = this._formElement.querySelector(`#${this._inputElement.id}-error`);
    this._inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = this._inputElement.validationMessage;
  }

  _hideInputError = () => {
    const errorElement = this._formElement.querySelector(`#${this._inputElement.id}-error`);
    this._inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';  
  }

  _checkInputValidity = () => {
    if(this._inputElement.validity.valid) {
      this._hideInputError();
    } else {
      this._showInputError();
    }
  }

  _hasInvalidInput = () => {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  _toggleButtonState = () => {
    if(this._hasInvalidInput(this._inputList)) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.classList.remove(this._activeButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.classList.add(this._activeButtonClass);
    }
  }

  _setEventListeners = () => {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._inputElement = inputElement;
        this._checkInputValidity();
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._inputElement = inputElement;
      this._hideInputError(inputElement);
    });
  }

  enableValidation = () => {
      this._setEventListeners();
  };
}
