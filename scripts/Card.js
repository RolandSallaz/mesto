export class Card {
    constructor(name, link) {
        this._name = name;
        this._link = link;
        this._templateCard = document.querySelector("#card").content; // выбрал шаблон с карточкой
        this._elementCard = this._templateCard.cloneNode(true);
        this._elementCardHeading = this._templateCard.querySelector('.element__heading');
        this._elementCardImage = this._templateCard.querySelector('.element__image');
        this._elements = document.querySelector(".elements"); // выбрал секцию
    }
    _createCard = () => {
        this._elementCardHeading.innerText = this._name;
        this._elementCardImage.setAttribute('src', this._link);
        this._elementCardImage.setAttribute('alt', 'Добавленная пользователем карточка');
        this._elementCard = this._templateCard.cloneNode(true);
        this._setEventListeners(this._elementCard);
        return this._elementCard;
    }
    addCard = () => {
        const _card = this._createCard();
        this._elements.prepend(_card);
    }
    _setEventListeners = (_element) => {
        _element.querySelector('.element__deleteButton').addEventListener('click', this._deleteCard);
        _element.querySelector('.element__like').addEventListener('click', this._setLike);
        _element.querySelector('.element__image').addEventListener('click', this._cardPopup);
    }
    _deleteCard = (_evt) => {
        _evt.target.closest('.element').remove();
    }
    _setLike = (_evt) => {
        _evt.target.classList.toggle('element__like_clicked');
    }
    _cardPopup(_evt) {
        const _elementText = _evt.target.closest('.element').querySelector('.element__heading').textContent;
        const _elementSrc = _evt.target.closest('.element').querySelector('.element__image').getAttribute('src');
        const _popupPreview = document.querySelector('.popup_name_image'); // выбрал попап с просмотром картинки
        const _popupPreviewImageName = _popupPreview.querySelector('.popup__image-name');
        const _popupPreviewImage = _popupPreview.querySelector('.popup__image');
        showPopup(_popupPreview);
        _popupPreviewImageName.innerText = _elementText;
        _popupPreviewImage.setAttribute('src', _elementSrc);
        _popupPreviewImage.setAttribute('alt', 'Картинка в режиме просмотра');
    }
}
import { showPopup } from './index.js';