class FormValidator {
    constructor() {
        this._object = {
            formSelector: 'form',
            inputSelector: 'form__input',
            submitButtonSelector: 'form__save-button',
            inactiveButtonClass: 'form__save-button-disabled',
            inputErrorClass: 'popup__error',
            errorClass: 'form__error_show'
        };
    }
    enableValidation = () => {
        const _forms = Array.from(document.querySelectorAll(`.${this._object.formSelector}`));
        _forms.forEach((_formElement) => {
            _formElement.addEventListener('submit', function(evt) {
                evt.preventDefault();
            });
            this._setFormListeners(_formElement);
            this._isValid(_formElement);
        });
    }
    _setFormListeners = (_formElement) => {
        const _inputList = Array.from(_formElement.querySelectorAll(`.${this._object.inputSelector}`));
        _inputList.forEach((_input) => {
            _input.addEventListener('input', () => {
                this._formValidation(_formElement, _input);
                this._isValid(_formElement);
            });
        });
    }
    _formValidation = (_form, _input) => {
        if (_input.validity.valid) {
            this._hideError(_form, _input);
        } else {
            this._showError(_form, _input, _input.validationMessage);
        }
    }
    _isValid = (_form) => {
        const _formButton = _form.querySelector(`.${this._object.submitButtonSelector}`);
        if (_form.checkValidity()) {
            _formButton.removeAttribute('disabled');
            _formButton.classList.remove(this._object.inactiveButtonClass);

        } else {
            _formButton.classList.add(this._object.inactiveButtonClass);
            _formButton.setAttribute('disabled', true);
        }
    }
    _showError = (_form, _input, _errorMessage) => {
        const _errorElement = _form.querySelector(`#${_input.id}-error`);
        _errorElement.textContent = _errorMessage;
        _errorElement.classList.add(this._object.errorClass);
    }
    _hideError = (_form, _input) => {
        const _errorElement = _form.querySelector(`#${_input.id}-error`);
        _errorElement.classList.remove(this._object.errorClass);
    }
    checkValid = (_form) => {
        const _currentForm = _form.querySelector('.form');
        const _inputList = Array.from(_form.querySelectorAll('.form__input'));
        _inputList.forEach((_input) => {
            this._hideError(_currentForm, _input, this._object);
            this._isValid(_currentForm, this._object);
        });
    }
}
export const validator = new FormValidator();
validator.enableValidation();