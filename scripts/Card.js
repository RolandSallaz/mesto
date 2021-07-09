export class Card {
    constructor(data, selector, popupOpen) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = selector;
        this._popupOpen = popupOpen;
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
        element.querySelector('.element__image').addEventListener('click', this._cardPopup);
    }
    _deleteCard = (evt) => {
        evt.target.closest('.element').remove();
    }
    _toggleLike = (evt) => {
        evt.target.classList.toggle('element__like_clicked');
    }
    _cardPopup = () => {
        this._popupOpen(this._name, this._link);
    }
}