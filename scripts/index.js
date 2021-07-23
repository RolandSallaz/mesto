import "../pages/index.css";
import { Card } from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api";
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
    apiUrl,
    apiAuthKey,
} from "./constants.js";
const api = new Api({
    url: apiUrl,
    headers: {
        authorization: apiAuthKey,
        "Content-type": "application/json"
    }
});

api.getUserInfo().then(res => {
    userInf.setUserInfo({ userName: res.name, about: res.about });
});

api.getCards().then(res => {
    res.forEach(card => {
        createCard(card);
    });
})





const PopupEditvalidator = new FormValidator(validConfig, popupEdit);
PopupEditvalidator.enableValidation();

const PopupAddValidator = new FormValidator(validConfig, popupAdd);
PopupAddValidator.enableValidation();

const popupWithImg = new PopupWithImage(popupPreview);
popupWithImg.setEventListeners();

const userInf = new UserInfo();
const editPopup = new PopupWithForm({
        submit: ({ userName, about }) => {
            api.setUserInfo(userName, about).then(res => {
                userInf.setUserInfo({ userName, about });
                editPopup.close();
            });

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
const cardList = new Section({
        items: [],
        renderer: (item) => {
            createCard(item);
        },
    },
    cardContainer
);
cardList.renderItem();

function createCard(data) {
    const card = new Card(data, defaultCardSelector, popupWithImg.open);
    const generatedCard = card.createCard();
    cardList.addItem(generatedCard);
}