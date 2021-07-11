import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ submit }, popupSelector) {
        super(popupSelector);
        this._submit = submit;

    }
    _getInputValues() {

    }

    close() {
        super.close();
        const form = this._selector.querySelector('.form');
        form.reset();
    }
    setEventListeners() {
        super.setEventListeners();
        this._selector.querySelector('.form__save-button').addEventListener('click', (evt) => {
            evt.preventDefault();
            this._submit();
        });
    }
}