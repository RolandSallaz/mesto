let editForm = document.querySelector('.edit-form');
let profileEditButton = document.querySelector(".profile__edit-button");
let formCloseButton = document.querySelector(".form__close-button");
let formSaveButton = document.querySelector(".form__save-button");
let form = document.querySelectorAll(".form__input");
let like = document.querySelectorAll(".element__like");

let profileName = document.querySelector(".profile__name");
let profileSubtitle = document.querySelector(".profile__subtitle");



profileEditButton.addEventListener("click", showEditForm);
formCloseButton.addEventListener("click", closeEditForm);
formSaveButton.addEventListener("click", formSave);

for (let index = 0; index < like.length; index++) {
    like[index].addEventListener("click", function() {
        like[index].classList.toggle("element__like_clicked");
    });
}

function closeEditForm() {
    editForm.classList.add("edit-form_hide");
}

function showEditForm() {
    editForm.classList.remove("edit-form_hide");
}

function formSave() {

    closeEditForm();
    profileName.textContent = form[0].value;
    profileSubtitle.textContent = form[1].value;

}