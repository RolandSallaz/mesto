export class Card {
    constructor({ data, handleCardClick, handleLikeClick, handleDeleteIconClick }, selector) {
        this._name = data.cardData.name;
        this._link = data.cardData.link;
        this._cardId = data.cardData._id;
        this._userId = data.currentUserId;
        this._ownerId = data.cardData.owner._id;
        this._likes = data.cardData.likes;
        this._cardSelector = selector;
        this._getTemplate = this._getTemplate.bind(this);
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
    }
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .cloneNode(true);
        return cardElement;
    }
    createCard = () => {
        const card = this._getTemplate();
        this._likes.forEach(person => { if (person._id === this._userId) card.querySelector('.element__like').classList.add("element__like_clicked") }); // что-бы иконка с лайком сохранялась после перезагрузки
        card.querySelector('.element').classList.add(`element_id_${this._cardId}`);
        card.querySelector('.element__deleteButton').classList.add(this._userId === this._ownerId ? 'element__deleteButton_visible' : 'element__deleteButton_hidden');
        card.querySelector('.element__like-counter').textContent = this._likes.length;
        card.querySelector('.element__heading').textContent = this._name;
        card.querySelector('.element__image').setAttribute('src', this._link);
        card.querySelector('.element__image').setAttribute('alt', this._name);
        this._setEventListeners(card);
        this._element = card.querySelector('.element');
        return card;
    }
    getId() {
        return this._cardId;
    }
    removeCard() {
        this._element.remove()
    }
    updateLikes(count) {
        this._element.querySelector('.element__like-counter').textContent = count;
        this._element.querySelector('.element__like').classList.toggle('element__like_clicked');
    }
    _setEventListeners(element) {
        element.querySelector('.element__deleteButton').addEventListener('click', () => { this._handleDeleteIconClick() });
        element.querySelector('.element__like').addEventListener('click', (evt) => { this._handleLikeClick({ element: evt.target.closest('.element__like'), id: this._cardId }) });
        element.querySelector('.element__image').addEventListener('click', () => { this._handleCardClick(this._name, this._link) });
    }

}