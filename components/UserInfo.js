export default class UserInfo {
    constructor(nameSelector, subSelector, userAvatar) {
        this._profileName = document.querySelector(nameSelector);
        this._profileSub = document.querySelector(subSelector);
        this._profileAvatar = userAvatar;
        this.getUserInfo = this.getUserInfo.bind(this);
    }
    getUserInfo() {
        return { user: this._userName, about: this._about, avatar: this._avatar };
    }
    setUserInfo = ({ userName, about }) => {
        this._userName = userName;
        this._about = about;
    }
    setAvatar(image) {
        this._avatar = image;
    }
    updateInfo() {
        this._profileName.textContent = this._userName;
        this._profileSub.textContent = this._about;
        this._profileAvatar.style.backgroundImage = `url(${this._avatar})`;
    }
}