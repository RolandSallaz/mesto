const popup = document.querySelector('.popup');
const popupSaveButton = document.querySelector(".popup__save-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const formCloseButton = document.querySelector(".form__close-button");
const formName = document.querySelector(".form__input_name");
const formAbout = document.querySelector(".form__input_about");
const profileName = document.querySelector(".profile__name");
const profileSubtitle = document.querySelector(".profile__subtitle");


function closePopup() {
    popup.classList.add("popup_hide");
}

function showEditForm() {
    popup.classList.remove("popup_hide");
    formName.value = profileName.textContent;
    formAbout.value = profileSubtitle.textContent;
}

function formSave() {

    closePopup();
    profileName.textContent = formName.value;
    profileSubtitle.textContent = formAbout.value;

}
profileEditButton.addEventListener("click", showEditForm);
formCloseButton.addEventListener("click", closePopup);
popupSaveButton.addEventListener("click", formSave);