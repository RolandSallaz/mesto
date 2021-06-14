const validationConfig = ({
    formSelector: 'form',
    inputSelector: 'form__input',
    submitButtonSelector: 'form__save-button',
    inactiveButtonClass: 'form__save-button-disabled',
    inputErrorClass: 'popup__error',
    errorClass: 'form__error_show'
});


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
        formValidation(formElement, input, object);
        input.addEventListener('input', function() {
            formValidation(formElement, input, object);
            isValid(formElement, object);
        });
    });

}


function formValidation(form, input, object) {
    if (input.validity.valid) {
        hideError(form, input, object);
    } else {
        showError(form, input, input.validationMessage, object);
    }
}

function showError(form, input, errorMessage, object) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(object.errorClass);
}

function hideError(form, input, object) {
    const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.classList.remove(object.errorClass);
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
enableValidation(validationConfig);