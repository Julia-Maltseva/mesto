
export default class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers
    }).then(this.checkResponse)
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers  
    }).then(this.checkResponse)
  }

  editProfile({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",  
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    }).then(this.checkResponse)
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",  
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    }).then(this.checkResponse)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",  
      headers: this._headers
      })
      .then(this.checkResponse)
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",  
      headers: this._headers
      })
      .then(this.checkResponse)
    .catch(console.log)
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",  
      headers: this._headers
      })
      .then(this.checkResponse)
  }

  addAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",  
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    }).then(this.checkResponse)
  }
} 

