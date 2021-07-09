import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    open = (name, link) => {
        this._name = name;
        this._link = link;
        super.open();
    }
}