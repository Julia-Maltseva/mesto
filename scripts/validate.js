const settings = {
  formElement: '.popup__form',
  inputLabelElement: '.popup__form-input',
  inputElement: '.popup__input',
  errorClass: '.error',
  submitButtonElement: '.popup__save-button',
  inputErrorClass: 'popup__input_type_error',
}

const checkInputValidity = (input, error) => {
  if (input.checkValidity()) {
      input.classList.remove(settings.inputErrorClass);
      error.innerHTML = '';
      return;
  }

  let textError = '';
  if (input.validity.valueMissing) {
      textError = input.type === 'url' ? 'Введите ссылку' : 'Вы пропустили это поле';
  } else if (input.validity.tooShort) {
      textError = 'Текст должен быть длиннее'
  }

  error.innerHTML = textError;
  input.classList.add(settings.inputErrorClass);
}

const addEventListenerForButtonForm = (formElement) => {
  formElement.addEventListener('input', () => {
      formElement.querySelector(settings.submitButtonElement).disabled = !formElement.checkValidity();
  });
}

const addEventListenerForValidationInputsForm = (formElement) => {
  const labels = formElement.querySelectorAll(settings.inputLabelElement);
  labels.forEach(label => {
      const input = label.querySelector(settings.inputElement);
      const error = label.querySelector(settings.errorClass);
      input.addEventListener('input', () => checkInputValidity(input, error))
  })
}

const enableValidationForAllForms = () => {
  const formList = Array.from(document.querySelectorAll(settings.formElement));
  formList.forEach((formElement) => {
      addEventListenerForButtonForm(formElement);
      addEventListenerForValidationInputsForm(formElement);
  });
}

enableValidationForAllForms();

