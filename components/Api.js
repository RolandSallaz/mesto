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
            return Promise.reject(`error in getUserInfo() status:${res.status}`);
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
            return Promise.reject(`error in setUserInfo() status:${res.status}`);
        });
    }
    getCards() {
        return fetch(`${this._url}cards`, {
            headers: this._headers
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`error in getCards() status:${res.status}`);
        }).then(res => { return res });
    }
    sendCard(name, link) {
        return fetch(`${this._url}cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ name, link })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`error in getCards() status:${res.status}`);
        }).then(res => { return res });
    }
    deleteCard(id) {
        return fetch(`${this._url}cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`error in deleteCard() status:${res.status}`);
        }).then(res => { return res });
    }
    setLike(id) {
        return fetch(`${this._url}cards/likes/${id}`, {
            method: "PUT",
            headers: this._headers,
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`error in setLike() status:${res.status}`);
        }).then(res => { return res });
    }
    removeLike(id) {
        return fetch(`${this._url}cards/likes/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`error in getLike() status:${res.status}`);
        }).then(res => { return res });
    }
    changerAvatar(avatar) {
        return fetch(`${this._url}users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ avatar }),
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`error in changeAvatar() status:${res.status}`);
        }).then(res => { return res });
    }
}