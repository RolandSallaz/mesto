export class Card {
    constructor(data, selector, popup) {
        this._popup = popup;
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = selector;
    }
    _getTemplate = () => {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .cloneNode(true);
        return cardElement;
    }
    createCard = () => {
        const card = this._getTemplate();
        card.querySelector('.element__heading').textContent = this._name;
        card.querySelector('.element__image').setAttribute('src', this._link);
        card.querySelector('.element__image').setAttribute('alt', this._name);
        this._setEventListeners(card);
        return card;
    }
    _setEventListeners = (element) => {
        element.querySelector('.element__deleteButton').addEventListener('click', this._deleteCard);
        element.querySelector('.element__like').addEventListener('click', this._toggleLike);
        element.querySelector('.element__image').addEventListener('click', this._popup.open());
    }
    _deleteCard = (evt) => {
        evt.target.closest('.element').remove();
    }
    _toggleLike = (evt) => {
        evt.target.classList.toggle('element__like_clicked');
    }
    _cardPopup = () => {

        const popupPreviewImageName = popupPreview.querySelector('.popup__image-name');
        const popupPreviewImage = popupPreview.querySelector('.popup__image');
        showPopup(_popupPreview);
        popupPreviewImageName.textContent = this._name;
        popupPreviewImage.setAttribute('src', this._link);
        popupPreviewImage.setAttribute('alt', 'Картинка в режиме просмотра');
    }
}