import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    open(name, link) {
        this._name = name;
        this._link = link;
        const popupPreview = document.querySelector('.popup_name_image'); // выбрал попап с просмотром картинки
        const popupPreviewImageName = popupPreview.querySelector('.popup__image-name');
        const popupPreviewImage = popupPreview.querySelector('.popup__image');
        popupPreviewImageName.textContent = this._name;
        popupPreviewImage.setAttribute('src', this._link);
        popupPreviewImage.setAttribute('alt', 'Картинка в режиме просмотра');
        super.open();
    }
}