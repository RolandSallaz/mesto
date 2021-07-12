import "../pages/index.css";
import { Card } from "./Card.js";
import { initialCards } from "./initial-сards.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import {
    formUserName,
    formAbout,
    popupAdd,
    popupEdit,
    profileAddButton,
    profileEditButton,
    cardContainer,
    defaultCardSelector,
    popupPreview,
} from "./constants.js";

export const validator = new FormValidator({
    formSelector: "form",
    inputSelector: "form__input",
    submitButtonSelector: "form__save-button",
    inactiveButtonClass: "form__save-button-disabled",
    inputErrorClass: "popup__error",
    errorClass: "form__error_show",
});
validator.enableValidation();


const popupWithImg = new PopupWithImage(popupPreview);
popupWithImg.setEventListeners();
const userInf = new UserInfo("Жак-Ив Кусто", "Исследователь океана");

const editPopup = new PopupWithForm({
        submit: ({ userName, about }) => {
            userInf.setUserInfo({ userName, about });
            editPopup.close();
        },
    },
    popupEdit
);
editPopup.setEventListeners();

const savePopup = new PopupWithForm({
        submit: ({ imgName, link }) => {
            createCard({ name: imgName, link: link });
            savePopup.close();
        },
    },
    popupAdd
);
savePopup.setEventListeners();

const cardList = new Section({
        items: initialCards,
        renderer: (item) => {
            createCard(item);
        },
    },
    cardContainer
);
cardList.renderItem();

profileAddButton.addEventListener("click", () => {
    savePopup.open();
    validator.checkValid(popupAdd);
});
profileEditButton.addEventListener("click", () => {
    const newUserData = userInf.getUserInfo();
    formUserName.value = newUserData.user;
    formAbout.value = newUserData.about;
    editPopup.open();
    validator.checkValid(popupEdit);
});

function createCard(data) {
    const card = new Card(data, defaultCardSelector, popupWithImg.open);
    const generatedCard = card.createCard();
    cardList.addItem(generatedCard);
}