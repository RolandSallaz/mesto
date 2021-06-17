const popupEdit = document.querySelector('.popup_name_edit'); // выбрал попап который редактирует профиль
const popupAdd = document.querySelector('.popup_name_add'); // выбрал попап который добавляет карточку
const popupPreview = document.querySelector('.popup_name_image'); // выбрал попап с просмотром картинки
const popupPreviewImageName = popupPreview.querySelector('.popup__image-name');
const popupPreviewImage = popupPreview.querySelector('.popup__image');
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
const elements = document.querySelector(".elements"); // выбрал секцию
const templateCard = document.querySelector("#card").content; // выбрал шаблон с карточкой
const elementCard = templateCard.cloneNode(true);
const elementCardHeading = templateCard.querySelector('.element__heading');
const elementCardImage = templateCard.querySelector('.element__image');
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

function deleteCard(evt) { // удалить карточку
    evt.target.closest('.element').remove();
}

function saveCard(evt) { // отправка попапа с карточками
    evt.preventDefault();
    closePopup(evt.target);
    addCard(formCardName.value, formLink.value);
}

function createCard(name, link) {
    elementCardHeading.innerText = name;
    elementCardImage.setAttribute('src', link);
    elementCardImage.setAttribute('alt', 'Добавленная пользователем карточка');
    const elementCard = templateCard.cloneNode(true);
    setEventListeners(elementCard);
    return elementCard;
}

function addCard(name, link) { // добавить карточку
    const card = createCard(name, link);
    elements.prepend(card);
}

function openPopupImageView(evt) { // попап с картинкой
    const elementText = evt.target.closest('.element').querySelector('.element__heading').textContent;
    const elementSrc = evt.target.closest('.element').querySelector('.element__image').getAttribute('src');
    showPopup(popupPreview);
    popupPreviewImageName.innerText = elementText;
    popupPreviewImage.setAttribute('src', elementSrc);
    popupPreviewImage.setAttribute('alt', 'Картинка в режиме просмотра');
}

function submitEditProfileForm(evt) { // сохранить форму профиля
    evt.preventDefault();
    closePopup(evt.target);
    profileName.textContent = formName.value;
    profileSubtitle.textContent = formAbout.value;
}

function setLike(evt) { // поставить лайк
    evt.target.classList.toggle('element__like_clicked');
}

function setEventListeners(element) { // добавить ивенты кнопкам карт
    element.querySelector('.element__deleteButton').addEventListener('click', deleteCard);
    element.querySelector('.element__like').addEventListener('click', setLike);
    element.querySelector('.element__image').addEventListener('click', openPopupImageView);
}
profileAddButton.addEventListener("click", (evt) => {
    formCardName.value = "";
    formLink.value = "";
    showPopup(popupAdd);
    checkValid(popupAdd);
});
profileEditButton.addEventListener("click", () => {
    formName.value = profileName.textContent;
    formAbout.value = profileSubtitle.textContent;
    showPopup(popupEdit);
    checkValid(popupEdit);
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