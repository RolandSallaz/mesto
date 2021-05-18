const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector(".profile__edit-button");
const popupCloseButton = document.querySelector(".popup__close-button");
const popupForm = document.querySelector(".form");
const formName = document.querySelector(".form__input_info_name");
const formAbout = document.querySelector(".form__input_info_about");
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

function formSave(evt) {
    evt.preventDefault();
    closePopup();
    profileName.textContent = formName.value;
    profileSubtitle.textContent = formAbout.value;

}
profileEditButton.addEventListener("click", showEditForm);
popupCloseButton.addEventListener("click", closePopup);
popupForm.addEventListener("submit", formSave);