export default class UserInfo {
    constructor(nameSelector, subSelector, userAvatar) {
        this._profileName = document.querySelector(nameSelector);
        this._profileSub = document.querySelector(subSelector);
        this._profileAvatar = userAvatar;
        this.getUserInfo = this.getUserInfo.bind(this);
    }
    getUserInfo() {
        return { user: this._profileName.textContent, about: this._profileSub.textContent };
    }
    setUserInfo = ({ userName, about }) => {
        this._profileName.textContent = userName;
        this._profileSub.textContent = about;
    }
    setAvatar(image) {
        this._profileAvatar.style.backgroundImage = `url(${image})`;
    }

}