import '../pages/index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';
import { initialCards } from '../utils/initialCards.js';
import {
  buttonEditProfile, 
  buttonAddCard, 
  popupFormEdit, 
  popupFirstFieldEdit, 
  popupSecondFieldEdit, 
  userName, 
  userJob, 
  cardsContainer,
  popupFormAdd, 
  popupFirstFieldAdd, 
  popupSecondFieldAdd,
  popupFormAvatar,
  buttonAvatar,
  validationConfig
} from '../utils/constants.js';

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
  avatarSelector: '.profile__avatar'
});

buttonEditProfile.addEventListener('click', () => {
  formValidEdit.resetValidation();
  popupProfile.open();
  const data = userInfo.getUserInfo();
  popupFirstFieldEdit.value = data.name;
  popupSecondFieldEdit.value = data.job;
})

buttonAddCard.addEventListener('click', () => {
  formValidAdd.resetValidation();
  popupCard.open();
})

function createCard(data) {
  const card = new Card(data, '.template-card', () => {
    popupImage.open(data.name, data.link)
  }, (id) => {
    popupDelete.open();
    popupDelete.changeSubmitHandler(() => {
      api.deleteCard(id)
        .then(() => {
          card.deleteElement()
          popupDelete.close();
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => popupDelete.renderLoading(false))
    });
      },
    (id) => {
      if (card.isLiked()) {
        api.deleteLike(id)
        .then(res => {
          card.setLikes(res.likes)
        })
        .catch(err => {
          console.log(err)
        })
      } else {
        api.addLike(id)
        .then(res => {
          card.setLikes(res.likes)
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
    );

  return card.generateCard();
}

const section = new Section({renderer: (item) => {
  const card = createCard(item);
  section.addItem(card);
}}, '.elements')

const formValidEdit = new FormValidator(validationConfig, popupFormEdit);
const formValidAdd = new FormValidator(validationConfig, popupFormAdd);
const formValidAvatar = new FormValidator(validationConfig, popupFormAvatar);

formValidEdit.enableValidation();
formValidAdd.enableValidation();
formValidAvatar.enableValidation();

const prepareData = (dataCard) => ({
  name: dataCard.name,
  link: dataCard.link,
  likes: dataCard.likes,
  id: dataCard._id,
  userId: userId,
  ownerId: dataCard.owner._id
});

const popupCard = new PopupWithForm('.popup_type_add-card', (formData) => {
  popupCard.renderLoading(true);
  api.addCard(formData.imageName, formData.imageLink)
    .then((res) => {
      const card = createCard(prepareData(res));
      popupCard.close();
      section.prependItem(card)
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => popupCard.renderLoading(false))
})

popupCard.setEventListeners();

const popupProfile = new PopupWithForm('.popup_type_edit', (formData) => {
  popupProfile.renderLoading(true);
  api.editProfile({name: formData.userName, about: formData.userJob})
    .then((res) => {
      userInfo.setUserInfo(res);
      popupProfile.close();
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => popupProfile.renderLoading(false))
})

popupProfile.setEventListeners();

const popupImage = new PopupWithImage('.popup_type_show-photo')
popupImage.setEventListeners();

const popupDelete = new PopupWithForm('.popup_type_delete')
popupDelete.setEventListeners();

const popupAvatar = new PopupWithForm('.popup_type_avatar', (formData) => {
  popupAvatar.renderLoading(true);
  api.addAvatar(formData.avatarLink)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupAvatar.close()
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => popupAvatar.renderLoading(false))
})

popupAvatar.setEventListeners();

buttonAvatar.addEventListener('click', () => {
  formValidAvatar.resetValidation();
  popupAvatar.open();
})

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: '203a374d-3063-4bcc-bd34-4d3d86ed3dae',
    'Content-Type': 'application/json'
  }  
});

let userId = null;

Promise.all([api.getProfile(), api.getCards()])
  .then(([userData, cardList]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    
    section.renderItems(cardList.map(prepareData))
  })
  .catch((err) => console.log(err))


