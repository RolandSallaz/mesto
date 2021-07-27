import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupCardImage = this._popup.querySelector('.popup__image')
        this._cardImageCaption = this._popup.querySelector('.popup__image-name');
    }
    open(name, link) {
        this._popupCardImage.setAttribute('src', link);
        this._popupCardImage.setAttribute('alt', 'Картинка в режиме просмотра');
        this._cardImageCaption.textContent = name;
        super.open();
    }
}