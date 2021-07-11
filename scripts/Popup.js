export default class Popup {
    constructor(selector) {
        this._selector = selector;
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);

    }
    open() {
        this._selector.classList.add('popup_show');
    }
    close() {
        this._selector.closest(".popup").classList.remove('popup_show');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose);
        const closeButton = this._selector.querySelector('.popup__close-button');
        closeButton.addEventListener('click', this.close);
        this._selector.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup')) {
                this.close();
            }
        });

    }
    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close()
        }
    }
}