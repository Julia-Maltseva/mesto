let editButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let closePopupButton = document.querySelector('.popup__close-button')
let userName = document.querySelector('.profile__name')
let nameForm = document.querySelector('.popup__username')
let userJob = document.querySelector('.profile__job')
let jobForm = document.querySelector('.popup__job')
let popupForm = document.querySelector('.popup__form')

//console.log(editButton)
//console.log(popup)
//console.log(closePopupButton)

editButton.addEventListener('click', function() {
  popup.classList.add('popup_opened')
  nameForm.value = userName.textContent
  jobForm.value = userJob.textContent;
})

closePopupButton.addEventListener('click', function() {
  popup.classList.remove('popup_opened')
})

popupForm.addEventListener('submit', function(event) {
  console.log(event)
  debugger;
  event.preventDefault()  
  popup.classList.remove('popup_opened')
  userName.textContent = nameForm.value
  userJob.textContent = jobForm.value;
})