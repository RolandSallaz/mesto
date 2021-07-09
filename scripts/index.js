import { validator } from './FormValidator.js';
import { Card } from './Card.js';
import { initialCards } from './initial-сards.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
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
const cardContainer = document.querySelector(".elements"); // ceкция куда нужно добавить карточку
const defaultCardSelector = "#card"
const popupPreview = document.querySelector('.popup_name_image'); // выбрал попап с просмотром картинки



function saveCard(evt) { // отправка попапа с карточками
    evt.preventDefault();
    closePopup(evt.target);
    const cardObject = {
        name: formCardName.value,
        link: formLink.value
    }
    const card = new Card(cardObject, defaultCardSelector);
    const generatedCard = card.createCard();
    cardList.addItem(generatedCard);
}

function submitEditProfileForm(evt) { // сохранить форму профиля
    evt.preventDefault();
    closePopup(evt.target);
    profileName.textContent = formName.value;
    profileSubtitle.textContent = formAbout.value;
}
profileAddButton.addEventListener("click", (evt) => {
    addForm.reset();
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
        if (evt.target.classList.contains('popup_show')) {
            closePopup(evt.target);
        }
    });

});
editForm.addEventListener("submit", submitEditProfileForm);
addForm.addEventListener("submit", saveCard);
const popupWithImg = new PopupWithImage(popupPreview);
const cardList = new Section({
        items: initialCards,
        renderer: (item) => {
            const card = new Card(item, defaultCardSelector, popupWithImg);
            const generatedCard = card.createCard();
            cardList.addItem(generatedCard);

        },
    },
    cardContainer
)
cardList.renderItem();