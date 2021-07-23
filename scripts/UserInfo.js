export default class UserInfo {
    constructor() {
        this._selectorName = document.querySelector('.profile__name');
        this._selectorAbout = document.querySelector('.profile__subtitle');
        this.getUserInfo = this.getUserInfo.bind(this);
    }
    getUserInfo() {
        this._userName = this._selectorName.textContent;
        this._about = this._selectorAbout.textContent;
        return { user: this._userName, about: this._about };
    }
    setUserInfo = ({ userName, about }) => {
        this._userName = userName;
        this._about = about;
        this._selectorName.textContent = userName;
        this._selectorAbout.textContent = about;
    }
}