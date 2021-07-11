import '../pages/index.css';
import { validator } from './FormValidator.js';
import { Card } from './Card.js';
import { initialCards } from './initial-сards.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
const popupEdit = document.querySelector('.popup_name_edit'); // выбрал попап который редактирует профиль
const popupAdd = document.querySelector('.popup_name_add'); // выбрал попап который добавляет карточку
const profileAddButton = document.querySelector('.profile__add-button'); // кнопка с добавлением карточек
const profileEditButton = document.querySelector(".profile__edit-button"); // кнопка которая редактирует профиль
const formCardName = document.querySelector('#form__input_info_cardName');
const formLink = document.querySelector('#form__input_info_link');
const cardContainer = document.querySelector(".elements"); // ceкция куда нужно добавить карточку
const defaultCardSelector = "#card"
const popupPreview = document.querySelector('.popup_name_image'); // выбрал попап с просмотром картинки
const userInf = new UserInfo({ user: "", about: "" });
const popupWithImg = new PopupWithImage(popupPreview);
popupWithImg.setEventListeners();
const editPopup = new PopupWithForm({
    submit: () => {
        userInf.setUserInfo();
        editPopup.close();
    }
}, popupEdit);
editPopup.setEventListeners();
const savePopup = new PopupWithForm({
    submit: () => {
        const cardObject = {
            name: formCardName.value,
            link: formLink.value
        }
        const card = new Card(cardObject, defaultCardSelector, popupWithImg.open);
        const generatedCard = card.createCard();
        cardList.addItem(generatedCard);
        savePopup.close();
    }
}, popupAdd);
savePopup.setEventListeners();
const cardList = new Section({
        items: initialCards,
        renderer: (item) => {
            const card = new Card(item, defaultCardSelector, popupWithImg.open);
            const generatedCard = card.createCard();
            cardList.addItem(generatedCard);
        },
    },
    cardContainer
)
cardList.renderItem();
profileAddButton.addEventListener("click", () => {
    savePopup.open();
    validator.checkValid(popupAdd);
});
profileEditButton.addEventListener("click", () => {
    editPopup.open();
    validator.checkValid(popupEdit);
});