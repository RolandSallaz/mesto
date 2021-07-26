import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
    }
    open(name, link) {
        this._name = name;
        this._link = link;
        const popupPreviewImageName = this._popup.querySelector('.popup__image-name');
        const popupPreviewImage = this._popup.querySelector('.popup__image');
        popupPreviewImageName.textContent = this._name;
        popupPreviewImage.setAttribute('src', this._link);
        popupPreviewImage.setAttribute('alt', 'Картинка в режиме просмотра');
        super.open();
    }
}