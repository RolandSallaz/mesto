export default class FormValidator {
    constructor(config, selector) {
        this._object = config;
        this._selector = document.querySelector(selector);
        this._form = this._selector.querySelector(this._object.formSelector);
    }
    enableValidation = () => {
        this._form.addEventListener('submit', function(evt) {
            evt.preventDefault();
        });
        this._setFormListeners();
        this._toggleButtonState();
    }
    _setFormListeners = () => {
        const _inputList = Array.from(this._form.querySelectorAll(`.${this._object.inputSelector}`));
        _inputList.forEach((_input) => {
            _input.addEventListener('input', () => {
                this._formValidation(_input);
                this._toggleButtonState();
            });
        });
    }
    _formValidation = (_input) => {
        if (_input.validity.valid) {
            this._hideError(_input);
        } else {
            this._showError(_input, _input.validationMessage);
        }
    }
    _toggleButtonState = () => {
        const _formButton = this._form.querySelector(`.${this._object.submitButtonSelector}`);
        if (this._form.checkValidity()) {
            _formButton.removeAttribute('disabled');
            _formButton.classList.remove(this._object.inactiveButtonClass);

        } else {
            _formButton.classList.add(this._object.inactiveButtonClass);
            _formButton.setAttribute('disabled', true);
        }
    }
    _showError = (_input, _errorMessage) => {
        const _errorElement = this._form.querySelector(`#${_input.id}-error`);
        _errorElement.textContent = _errorMessage;
        _errorElement.classList.add(this._object.errorClass);
    }
    _hideError = (_input) => {
        const _errorElement = this._form.querySelector(`#${_input.id}-error`);
        _errorElement.classList.remove(this._object.errorClass);
    }
    checkValid = () => {
        const _inputList = Array.from(this._form.querySelectorAll('.form__input'));
        _inputList.forEach((_input) => {
            this._hideError(_input, this._object);
            this._toggleButtonState(this._object);
        });
    }
}