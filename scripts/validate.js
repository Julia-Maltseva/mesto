const settings = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  submitButtonElement: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  activeButtonClass: '.popup__save-button_valid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'error'  
}

const showInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement);
  } else {
    showInputError(formElement, inputElement);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
}

const toggleButtonState = (buttonElement, inputList) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.classList.remove(settings.activeButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.classList.add(settings.activeButtonClass);
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputElement));
  const buttonElement = formElement.querySelector(settings.submitButtonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(buttonElement, inputList);
    });
  })
  toggleButtonState(buttonElement, inputList);
}

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formElement));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  })
};

enableValidation(settings);
  