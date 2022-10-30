const settings = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  fieldSet: '.form__set',
  submitButtonElement: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  activeButtonClass: '.popup__save-button_valid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'error'  
}

const showInputError = (settings, formElement, inputElement, validationMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = validationMessage;
    errorElement.classList.add(settings.errorClass);
  }
    
  const hideInputError = (settings, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass)
    errorElement.textContent = '';
  }
  
  const checkInputValidity = (settings, formElement, inputElement) => {
    if(!inputElement.validity.valid) {
      showInputError(settings, formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(settings, formElement, inputElement);
    }
  }
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })  
  }
      
  const toggleButtonSubmitState = (settings, inputList, buttonElement) => {
    if(hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.classList.remove(settings.activeButtonClass);
    } else {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.classList.add(settings.activeButtonClass);
    }
  }
  
  const setEventListeners = (settings, formElement) => {
    const inputList = Array.from(document.querySelectorAll(settings.inputElement));
    const buttonElement = formElement.querySelector(settings.submitButtonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(settings, formElement, inputElement);
        toggleButtonSubmitState(settings, inputList, buttonElement);
      });
    });
  }
  
  const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formElement));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();  
      });
      const fieldsetList = Array.from(formElement.querySelectorAll(settings.fieldSet));
      fieldsetList.forEach((fieldSet) => {
        setEventListeners(settings, fieldSet);
      });
    });
  }
      
  enableValidation(settings);
  
  