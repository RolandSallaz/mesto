validation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_show'
});

function enableValidation() {
    const forms = Array.from(document.querySelectorAll(validation.formSelector));

    forms.forEach((formElement) => {

        formElement.addEventListener('submit', function(evt) {
            evt.preventDefault();
        });
        setFormListeners(formElement);
        isValid(formElement);
    });
}


function setFormListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(validation.inputSelector));
    inputList.forEach((input) => {
        input.addEventListener('input', function() {
            formValidation(formElement, input);
            isValid(formElement);
        });
    });

}

function formValidation(form, input) {
    if (input.validity.valid) {
        hideError(form, input);
    } else {
        showError(form, input, input.validationMessage);
    }
}

function showError(form, input, errorMessage) {
    const errorElement = form.querySelector(`.${input.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validation.inputErrorClass);
}

function hideError(form, input) {
    const errorElement = form.querySelector(`.${input.id}-error`);
    errorElement.classList.remove(validation.inputErrorClass);
}

function isValid(form) {
    const formButton = form.querySelector(validation.su);
    if (form.checkValidity()) {
        formButton.removeAttribute('disabled');
        formButton.classList.remove(validation.inactiveButtonClass);

    } else {
        formButton.classList.add(validation.inactiveButtonClass);
        formButton.setAttribute('disabled', true);
    }
}
enableValidation();