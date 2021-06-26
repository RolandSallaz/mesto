import { validator } from './FormValidator.js';
import { Card } from './Card.js';
const popupEdit = document.querySelector('.popup_name_edit'); // выбрал попап который редактирует профиль
const popupAdd = document.querySelector('.popup_name_add'); // выбрал попап который добавляет карточку
const profileAddButton = document.querySelector('.profile__add-button'); // кнопка с добавлением карточек
const profileEditButton = document.querySelector(".profile__edit-button"); // кнопка которая редактирует профиль
const popupCloseButton = document.querySelectorAll(".popup__close-button"); // выбрал все кнопки закрывающие попапы;
const editForm = document.querySelector('#edit'); // форма сохранения профиля
const addForm = document.querySelector('#add'); // форма добавления карт
const formName = document.querySelector("#form__input_info_name"); //  имя в форме редактирования
const formAbout = document.querySelector("#form__input_info_about"); // "о себе" в форме редактирования
const formCardName = document.querySelector('#form__input_info_cardName');
const formLink = document.querySelector('#form__input_info_link');
const profileName = document.querySelector(".profile__name"); // переменная с именем в профиле
const profileSubtitle = document.querySelector(".profile__subtitle"); // переменная с "о себе" в профиле
const popupsList = document.querySelectorAll('.popup');
const popupCloseButtonsEvent = popupCloseButton.forEach((item) => { // каждой кнопке  закрытия попапа добавил событие
    item.addEventListener('click', (evt) => {
        closePopup(evt.target);
    });
})

function closePopup(evt) { // закрытие попапа
    evt.closest(".popup").classList.remove('popup_show');
    document.removeEventListener('keydown', closePopupByKey);
}

function showPopup(item) {
    item.classList.add('popup_show');
    document.addEventListener('keydown', closePopupByKey);
}

function closePopupByKey(evt) { // закрытие по нажатию на ESC
    const activePopup = document.querySelector('.popup_show');
    if (evt.key === 'Escape') {
        closePopup(activePopup);
    }
}

function saveCard(evt) { // отправка попапа с карточками
    evt.preventDefault();
    closePopup(evt.target);
    const newCard = new Card(formCardName.value, formLink.value);
    newCard.addCard();
}

function submitEditProfileForm(evt) { // сохранить форму профиля
    evt.preventDefault();
    closePopup(evt.target);
    profileName.textContent = formName.value;
    profileSubtitle.textContent = formAbout.value;
}
profileAddButton.addEventListener("click", (evt) => {
    formCardName.value = "";
    formLink.value = "";
    showPopup(popupAdd);
    validator.checkValid(popupAdd);
});
profileEditButton.addEventListener("click", () => {
    formName.value = profileName.textContent;
    formAbout.value = profileSubtitle.textContent;
    showPopup(popupEdit);
    validator.checkValid(popupEdit);
});
popupsList.forEach((popups) => { // добавил на каждый попап закрытие по оверлею
    popups.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('popup')) {
            closePopup(evt.target);
        }
    });

});
editForm.addEventListener("submit", submitEditProfileForm);
addForm.addEventListener("submit", saveCard);
generateCards(Card);