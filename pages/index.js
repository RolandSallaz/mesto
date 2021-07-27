import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { Card } from "../components/Card";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
    profileNameSelector,
    profileAboutSelector,
    popupAddSaveButton,
    popupAvatarSaveButton,
    popupEditSaveButton,
    userAvatar,
    popupAvatar,
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
} from "../utils/constants.js";
let userId = null;
const api = new Api({
    url: apiUrl,
    headers: {
        authorization: apiAuthKey,
        "Content-type": "application/json"
    }
});
const userInf = new UserInfo(profileNameSelector, profileAboutSelector, userAvatar);
Promise.all([api.getUserInfo(), api.getCards()])
    .then(([userData, cards]) => {
        userId = userData._id;
        userInf.setUserInfo({ userName: userData.name, about: userData.about });
        userInf.setAvatar(userData.avatar);
        userInf.updateInfo();
        cards.forEach(item => {
            createCard(item);
        });
    })
    .catch(console.log('error in promises.all userinfo+getcard'));

const PopupEditvalidator = new FormValidator(validConfig, popupEdit);
PopupEditvalidator.enableValidation();

const PopupAddValidator = new FormValidator(validConfig, popupAdd);
PopupAddValidator.enableValidation();

const PopupAvatarValidator = new FormValidator(validConfig, popupAvatar);
PopupAvatarValidator.enableValidation();

const popupWithImg = new PopupWithImage(popupPreview);
popupWithImg.setEventListeners();

const editPopup = new PopupWithForm({
        submit: ({ userName, about }) => {
            loading(true, popupEditSaveButton);
            api.setUserInfo(userName, about).then(res => {
                loading(false, popupEditSaveButton);
                userInf.setUserInfo({ userName, about });
                userInf.updateInfo();
                editPopup.close();
            }).catch(err => console.log("Ошибка при редактировании"));
        },
    },
    popupEdit
);
editPopup.setEventListeners();
const changeAvatatPopup = new PopupWithForm({
    submit: ({ link }) => {
        loading(true, popupAvatarSaveButton);
        api.changerAvatar(link).then(res => {
            loading(false, popupAvatarSaveButton);
            userInf.setAvatar(res.avatar);
            userInf.updateInfo();
            changeAvatatPopup.close();
        });
    }
}, popupAvatar);
changeAvatatPopup.setEventListeners();
const deletePopup = new PopupWithForm({},
    popupDelete);
deletePopup.setEventListeners();

const savePopup = new PopupWithForm({
        submit: ({ imgName, link }) => {
            loading(true, popupAddSaveButton);
            api.sendCard(imgName, link).then((res) => {
                loading(false, popupAddSaveButton);
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
userAvatar.addEventListener('click', () => {
    changeAvatatPopup.open()
    PopupEditvalidator.checkValid();
})
const cardList = new Section(cardContainer);

function createCard(cardData) {
    const card = new Card({
        data: { cardData, currentUserId: userId },
        handleCardClick: (name, link) => {
            popupWithImg.open(name, link);
        },
        handleDeleteIconClick: () => {
            deletePopup.open()
            deletePopup.setSubmit(() => {
                api.deleteCard(card.getId()).
                then(() => {
                    deletePopup.close();
                    card.removeCard();
                });
            });
        },
        handleLikeClick: ({ element, id }) => {
            if (!element.classList.contains("element__like_clicked")) {
                api.setLike(id).then(res => card.updateLikes(res.likes.length));
            } else {
                api.removeLike(id).then(res => card.updateLikes(res.likes.length));
            }

        }
    }, defaultCardSelector);
    const generatedCard = card.createCard();
    cardList.addItem(generatedCard);
    card.setElement(document.querySelector(`.element_id_${cardData._id}`));
}

function rofl(card) {
    console.log(card);
}

function loading(loaded, button) {
    loaded ? button.textContent = "Сохранение..." : button.textContent = "Cохранить";
}