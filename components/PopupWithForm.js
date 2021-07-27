import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ submit }, popupSelector) {
        super(popupSelector);
        this._submit = submit;
        this._form = this._popup.querySelector('.form');
        this._inputList = this._form.querySelectorAll('.form__input');

    }
    setSubmit(func) {
        this._submit = func;
    }
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }
    open() {
        super.open();
        document.addEventListener('keydown', this._handleEnterDown);
    }
    close() {
        super.close();
        document.removeEventListener('keydown', this._handleEnterDown);
        this._form.reset();
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this._submit(this._getInputValues());
        });
    }
    _handleEnterDown = (evt) => {
        if (evt.key === "Enter") {
            this._submit();
        }
    }

}