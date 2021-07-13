import "../pages/index.css";
import { Card } from "./Card.js";
import { initialCards } from "./initial-сards.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import {
    validConfig,
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

const PopupEditvalidator = new FormValidator(validConfig, popupEdit);
PopupEditvalidator.enableValidation();

const PopupAddValidator = new FormValidator(validConfig, popupAdd);
PopupAddValidator.enableValidation();

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
    PopupAddValidator.checkValid();
});
profileEditButton.addEventListener("click", () => {
    const newUserData = userInf.getUserInfo();
    formUserName.value = newUserData.user;
    formAbout.value = newUserData.about;
    editPopup.open();
    PopupEditvalidator.checkValid();
});

function createCard(data) {
    const card = new Card(data, defaultCardSelector, popupWithImg.open);
    const generatedCard = card.createCard();
    cardList.addItem(generatedCard);
}