import { showPopup } from './index.js';
export class Card {
    constructor(template) {
        this._name = template.name;
        this._link = template.link;
        this._elements = document.querySelector(".elements"); // выбрал секцию
    }
    _getTemplate = () => {
        const cardElement = document
            .querySelector("#card")
            .content
            .cloneNode(true);
        return cardElement;
    }
    _createCard = () => {
        const card = this._getTemplate();
        card.querySelector('.element__heading').textContent = this._name;
        card.querySelector('.element__image').setAttribute('src', this._link);
        card.querySelector('.element__image').setAttribute('alt', this._name);
        this._elementCard = card.cloneNode(true);
        this._setEventListeners(this._elementCard);
        return this._elementCard;
    }
    addCard = () => {
        const card = this._createCard();
        this._elements.prepend(card);
    }
    _setEventListeners = (_element) => {
        _element.querySelector('.element__deleteButton').addEventListener('click', this._deleteCard);
        _element.querySelector('.element__like').addEventListener('click', this._toggleLike);
        _element.querySelector('.element__image').addEventListener('click', this._cardPopup);
    }
    _deleteCard = (_evt) => {
        _evt.target.closest('.element').remove();
    }
    _toggleLike = (_evt) => {
        _evt.target.classList.toggle('element__like_clicked');
    }
    _cardPopup = () => {
        const _popupPreview = document.querySelector('.popup_name_image'); // выбрал попап с просмотром картинки
        const _popupPreviewImageName = _popupPreview.querySelector('.popup__image-name');
        const _popupPreviewImage = _popupPreview.querySelector('.popup__image');
        showPopup(_popupPreview);
        _popupPreviewImageName.innerText = this._name;
        _popupPreviewImage.setAttribute('src', this._link);
        _popupPreviewImage.setAttribute('alt', 'Картинка в режиме просмотра');
    }
}