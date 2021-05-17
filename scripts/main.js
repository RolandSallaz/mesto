let popup = document.querySelector('.popup');
let popupSaveButton = document.querySelector(".popup__save-button");
let profileEditButton = document.querySelector(".profile__edit-button");
let formCloseButton = document.querySelector(".form__close-button");
let form = document.querySelectorAll(".form__input");
let like = document.querySelectorAll(".element__like");

let profileName = document.querySelector(".profile__name");
let profileSubtitle = document.querySelector(".profile__subtitle");



profileEditButton.addEventListener("click", showEditForm);
formCloseButton.addEventListener("click", closePopup);
popupSaveButton.addEventListener("click", formSave);

for (let index = 0; index < like.length; index++) {
    like[index].addEventListener("click", function() {
        like[index].classList.toggle("element__like_clicked");
    });
}

function closePopup() {
    popup.classList.add("popup_hide");
}

function showEditForm() {
    popup.classList.remove("popup_hide");
}

function formSave() {

    closePopup();
    profileName.textContent = form[0].value;
    profileSubtitle.textContent = form[1].value;

}