function enableValidation(object) {
    const forms = Array.from(document.querySelectorAll(`.${object.formSelector}`));

    forms.forEach((formElement) => {

        formElement.addEventListener('submit', function(evt) {
            evt.preventDefault();
        });
        setFormListeners(formElement, object);
        isValid(formElement, object);
    });
}


function setFormListeners(formElement, object) {
    const inputList = Array.from(formElement.querySelectorAll(`.${object.inputSelector}`));
    inputList.forEach((input) => {
        input.addEventListener('input', function() {
            formValidation(formElement, input, object);
            isValid(formElement, object);
        });
    });

}

function formValidation(form, input, object) {
    if (input.validity.valid) {
        hideError(form, input, object.errorClass);
    } else {
        showError(form, input, input.validationMessage, object.errorClass);
    }
}

function showError(form, input, errorMessage, errorClass) {
    const errorElement = form.querySelector(`.${input.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
}

function hideError(form, input, errorClass) {
    const errorElement = form.querySelector(`.${input.id}-error`);
    errorElement.classList.remove(errorClass);
}

function isValid(form, object) {
    const formButton = form.querySelector(`.${object.submitButtonSelector}`);
    if (form.checkValidity()) {
        formButton.removeAttribute('disabled');
        formButton.classList.remove(object.inactiveButtonClass);

    } else {
        formButton.classList.add(object.inactiveButtonClass);
        formButton.setAttribute('disabled', true);
    }
}
enableValidation({
    formSelector: 'form',
    inputSelector: 'form__input',
    submitButtonSelector: 'form__save-button',
    inactiveButtonClass: 'form__save-button-disabled',
    errorClass: 'form__error_show'
});