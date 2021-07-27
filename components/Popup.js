export default class Popup {
    constructor(selector) {
        this._popup = document.querySelector(selector);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this._closeButton = this._popup.querySelector(".popup__close-button");
    }
    open() {
        this._popup.classList.add("popup_show");
        document.addEventListener("keydown", this._handleEscClose);
    }
    close() {
        this._popup.classList.remove("popup_show");
        document.removeEventListener("keydown", this._handleEscClose);
    }
    setEventListeners() {
        this._closeButton.addEventListener("click", this.close);
        this._popup.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("popup")) {
                this.close();
            }
        });
    }
    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    };
}