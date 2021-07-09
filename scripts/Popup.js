export default class Popup {
    constructor(selector) {
        this._selector = selector;
    }
    open() {
        this._selector.classList.add('popup_show');
    }
    close() {
        selector.closest(".popup").classList.remove('popup_show');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    setEventListeners() {
        this._selector.querySelector('.popup__close-button').addEventListener('click', this.close());
        document.addEventListener('keydown', this._handleEscClose);
        this._selector.addEventListener('click', (evt) => {
            this.close(evt.target);
        });
    }
    _handleEscClose(evt) {
        const activePopup = document.querySelector('.popup_show');
        if (evt.key === 'Escape') {
            closePopup(activePopup);
        }
    }
}