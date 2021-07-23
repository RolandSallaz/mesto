export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }
    getUserInfo() {
        return fetch(`${this._url}users/me`, {
            headers: this._headers
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('error in getUserInfo()');
        }).then(res => { return res });
    }
    setUserInfo(newName, newInfo) {
        return fetch(`${this._url}users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ name: newName, about: newInfo })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('error in setUserInfo()');
        });
    }
    getCards() {
        return fetch(`${this._url}cards`, {
            headers: this._headers
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('error in getCards()');
        }).then(res => { return res });
    }

}