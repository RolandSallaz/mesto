export { profileAboutSelector, profileNameSelector, popupAddSaveButton, popupAvatarSaveButton, popupEditSaveButton, userAvatar, popupAvatar, popupDelete, apiAuthKey, apiUrl, validConfig, formAbout, formUserName, popupAdd, popupEdit, profileAddButton, profileEditButton, formCardName, formLink, cardContainer, defaultCardSelector, popupPreview };
const popupEdit = '.popup_name_edit'; // выбрал попап который редактирует профиль
const popupAdd = '.popup_name_add'; // выбрал попап который добавляет карточку
const popupDelete = '.popup_name_delete-card';
const popupAvatar = '.popup_name_changeAvatar';
const popupPreview = '.popup_name_image'; // выбрал попап с просмотром картинки
const popupEditSaveButton = document.querySelector(popupEdit).querySelector('.form__save-button');
const popupAddSaveButton = document.querySelector(popupAdd).querySelector('.form__save-button');
const popupAvatarSaveButton = document.querySelector(popupAvatar).querySelector('.form__save-button');
const userAvatar = document.querySelector('.profile__avatar');
const profileAboutSelector = '.profile__subtitle';
const profileNameSelector = '.profile__name';
const profileAddButton = document.querySelector('.profile__add-button'); // кнопка с добавлением карточек
const profileEditButton = document.querySelector(".profile__edit-button");
const formCardName = document.querySelector('#form__input_info_cardName');
const formLink = document.querySelector('#form__input_info_link');
const formUserName = document.querySelector('.form__input_info_name');
const formAbout = document.querySelector('.form__input_info_about');
const cardContainer = document.querySelector(".elements"); // ceкция куда нужно добавить карточку
const defaultCardSelector = "#card";
const apiUrl = 'https://mesto.nomoreparties.co/v1/cohort-26/';
const apiAuthKey = '6df61dab-da31-4f8e-8ce7-f211bdfa5ef2';

const validConfig = {
    formSelector: "form",
    inputSelector: "form__input",
    submitButtonSelector: "form__save-button",
    inactiveButtonClass: "form__save-button-disabled",
    inputErrorClass: "popup__error",
    errorClass: "form__error_show",
};