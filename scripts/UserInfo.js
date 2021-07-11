export default class UserInfo {
    constructor(data) {
        this._user = data.user;
        this._about = data.about;
    }
    getUserInfo = () => {
        return { user: this._user, about: this._about };
    }
    setUserInfo = () => {
        this._user = document.querySelector('.form__input_info_name').value;
        this._about = document.querySelector('.form__input_info_about').value;
        document.querySelector('.profile__name').textContent = this._user;
        document.querySelector('.profile__subtitle').textContent = this._about;
    }
}