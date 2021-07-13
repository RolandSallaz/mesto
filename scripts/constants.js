export { validConfig, formAbout, formUserName, popupAdd, popupEdit, profileAddButton, profileEditButton, formCardName, formLink, cardContainer, defaultCardSelector, popupPreview };
const popupEdit = '.popup_name_edit'; // выбрал попап который редактирует профиль
const popupAdd = '.popup_name_add'; // выбрал попап который добавляет карточку
const profileAddButton = document.querySelector('.profile__add-button'); // кнопка с добавлением карточек
const profileEditButton = document.querySelector(".profile__edit-button");
const formCardName = document.querySelector('#form__input_info_cardName');
const formLink = document.querySelector('#form__input_info_link');
const formUserName = document.querySelector('.form__input_info_name');
const formAbout = document.querySelector('.form__input_info_about');
const cardContainer = document.querySelector(".elements"); // ceкция куда нужно добавить карточку
const defaultCardSelector = "#card"
const popupPreview = '.popup_name_image'; // выбрал попап с просмотром картинки
const validConfig = {
    formSelector: "form",
    inputSelector: "form__input",
    submitButtonSelector: "form__save-button",
    inactiveButtonClass: "form__save-button-disabled",
    inputErrorClass: "popup__error",
    errorClass: "form__error_show",
};