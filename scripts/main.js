const popupEdit = document.querySelector('.popup_name_edit'); // выбрал попап который редактирует профиль
const popupAdd = document.querySelector('.popup_name_add'); // выбрал попап который добавляет карточку
const popupPreview = document.querySelector('.popup_name_image'); // выбрал попап с просмотром картинки
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
const elements= document.querySelector(".elements"); // выбрал секцию
const templateCard = document.querySelector("#card").content; // выбрал шаблон с карточкой


const popupCloseButtonsEvent= popupCloseButton.forEach((item)=>{ // каждой кнопке  закрытия попапа добавил событие
    item.addEventListener('click',closePopup);
})
const initialCards = [
{
    name:'Домбай',
    link:'../images/element__image-dombai.jpg'
},
{
    name:'Лес Тахо',
    link:'../images/element__image-forestTahoe.jpg'
},
{
    name:'Карачевск',
    link:'../images/element__image-karachevsk.jpg'
},
{
    name:'Озеро Тахо',
    link:'../images/element__image-lakeTahoe.jpg'
},
{
    name:'Гора Эльбрус',
    link:'../images/element__image-mounainElbrus.jpg'
},
{
    name:'Мауна Кеа',
    link:'../images/element__image-observatory.jpg'
}
];


function closePopup(evt) { // закрытие попапа
    evt.target.closest('.popup').classList.add('popup_hide');
}

function showEditForm() { // показать попап с редактированием профиля
    popupEdit.classList.remove('popup_hide');
    formName.value = profileName.textContent;
    formAbout.value = profileSubtitle.textContent;
}
function showAddForm() { // показать попап с добавлением карт
    popupAdd.classList.remove('popup_hide');

}
function deleteCard(evt){ // удалить карточку
    evt.target.closest('.element').remove();
}
function cardSave(evt){ // отправка попапа с карточками
    evt.preventDefault();
    closePopup(evt);
    addCard(formCardName.value,formLink.value);
}
function addCard(name,link){  // добавить карточку
    const elementCard = templateCard.cloneNode(true);
    elementCard.querySelector('.element__heading').innerText=name;
    elementCard.querySelector('.element__image').setAttribute('src',link);
    setEventListeners(elementCard);
    elements.prepend(elementCard);
}

function popupImageView(evt){  // попап с картинкой
    const elementText=evt.target.closest('.element').querySelector('.element__heading').textContent;
    const elementSrc=evt.target.closest('.element').querySelector('.element__image').getAttribute('src');
    popupPreview.classList.remove('popup_hide');
    popupPreview.querySelector('.popup__image-name').innerText = elementText;
    popupPreview.querySelector('.popup__image').setAttribute('src',elementSrc);
}
function formSave(evt) { // сохранить форму профиля
    evt.preventDefault();
    closePopup(evt);
    profileName.textContent = formName.value;
    profileSubtitle.textContent = formAbout.value;

}
function setLike(evt) {  // поставить лайк
    evt.target.classList.toggle('element__like_clicked');
}
function setEventListeners(element){ // добавить ивенты кнопкам карт
    element.querySelector('.element__deleteButton').addEventListener('click',deleteCard);
    element.querySelector('.element__like').addEventListener('click',setLike);
    element.querySelector('.element__image').addEventListener('click',popupImageView);
}

profileAddButton.addEventListener("click",showAddForm);
profileEditButton.addEventListener("click", showEditForm);
editForm.addEventListener("submit", formSave);
addForm.addEventListener("submit", cardSave);

const initDefoultCards = initialCards.forEach((item)=>{  // загрузить стартовые карточки из списка
    addCard(item.name,item.link);
})
