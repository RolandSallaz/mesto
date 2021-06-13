function enableValidation() {
    const forms = Array.from(document.querySelectorAll('.form'));

    forms.forEach((formElement) => {

        formElement.addEventListener('submit', function(evt) {
            evt.preventDefault();
        });
        setFormListeners(formElement);
        isValid(formElement);
    });
}


function setFormListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
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
    errorElement.classList.add("form__error_show-error")
}

function hideError(form, input) {
    const errorElement = form.querySelector(`.${input.id}-error`);
    errorElement.classList.remove("form__error_show-error")
}

function isValid(form) {
    const formButton = form.querySelector('.form__save-button');
    if (form.checkValidity()) {
        formButton.removeAttribute('disabled');
        formButton.classList.remove('form__save-button-disabled');

    } else {
        formButton.classList.add('form__save-button-disabled');
        formButton.setAttribute('disabled', true);
    }
}
enableValidation();