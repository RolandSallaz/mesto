import "../pages/index.css";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import { Card } from "./Card";
import UserInfo from "./UserInfo.js";
import Api from "./Api";
import {
    userAvatar,
    popupAvatar,
    profileChangeAvatarButton,
    popupDelete,
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
let userId = null;
let cardId = null;
const api = new Api({
    url: apiUrl,
    headers: {
        authorization: apiAuthKey,
        "Content-type": "application/json"
    }
});
api.getUserInfo().then(res => {
    userId = res._id;
    userAvatar.style.backgroundImage = `url(${res.avatar})`;
    userInf.setUserInfo({ userName: res.name, about: res.about });
});
api.getCards().then(res => {
    res.forEach(item => {
        createCard(item);
    });
    return res;
});
const PopupEditvalidator = new FormValidator(validConfig, popupEdit);
PopupEditvalidator.enableValidation();

const PopupAddValidator = new FormValidator(validConfig, popupAdd);
PopupAddValidator.enableValidation();

const PopupAvatarValidator = new FormValidator(validConfig, popupAvatar);
PopupAvatarValidator.enableValidation();

const popupWithImg = new PopupWithImage(popupPreview);
popupWithImg.setEventListeners();

const userInf = new UserInfo();
const editPopup = new PopupWithForm({
        submit: ({ userName, about }) => {
            loading(true, popupEdit);
            api.setUserInfo(userName, about).then(res => {
                loading(false, popupEdit);
                userInf.setUserInfo({ userName, about });
                editPopup.close();
            });

        },
    },
    popupEdit
);
editPopup.setEventListeners();
const changeAvatatPopup = new PopupWithForm({
    submit: ({ link }) => {
        loading(true, popupAvatar);
        api.changerAvatar(link).then(res => {
            loading(false, popupAvatar);
            userAvatar.style.backgroundImage = `url(${res.avatar})`;
            changeAvatatPopup.close();
        });
    }
}, popupAvatar);
changeAvatatPopup.setEventListeners();
const deletePopup = new PopupWithForm({
        submit: () => {
            api.deleteCard(cardId).
            then(() => {
                document.querySelector(`.element_id_${cardId}`).remove()
            }).then(() => {
                deletePopup.close();
                cardId = null;
            });
        }
    },
    popupDelete);
deletePopup.setEventListeners();

const savePopup = new PopupWithForm({
        submit: ({ imgName, link }) => {
            loading(true, popupAdd);
            api.sendCard(imgName, link).then((res) => {
                loading(false, popupAdd);
                createCard(res);
                savePopup.close();
            });


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
profileChangeAvatarButton.addEventListener('click', () => {
    changeAvatatPopup.open()
    PopupEditvalidator.checkValid();
})
const cardList = new Section({
        items: [],
        renderer: (item) => {
            createCard(item);
        },
    },
    cardContainer
);
cardList.renderItem();

function createCard(cardData) {
    const card = new Card({
        data: { cardData, currentUserId: userId },
        handleCardClick: (name, link) => {
            popupWithImg.open(name, link);
        },
        handleDeleteIconClick: (id) => {
            cardId = id;
            deletePopup.open();
        },
        handleLikeClick: ({ id, liked }) => {
            return (liked) ? api.removeLike(id) : api.setLike(id);
        }
    }, defaultCardSelector);
    const generatedCard = card.createCard();
    cardList.addItem(generatedCard);
}

function loading(loaded, selector) {
    if (loaded) {
        document.querySelector(selector).querySelector('.form__save-button').textContent = "Сохранение...";
    } else {
        document.querySelector(selector).querySelector('.form__save-button').textContent = "Cохранить";
    }
}