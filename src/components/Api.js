
export default class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }).then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
    })
    .catch(console.log)
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers  
    }).then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
    })
    .catch(console.log)
  }

  editProfile(name, job) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",  
      headers: this._headers,
      body: JSON.stringify({
        name,
        job
      })
    }).then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
    })
    .catch(console.log)
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",  
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    }).then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
    })
    .catch(console.log)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",  
      headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
    })
    .catch(console.log)
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",  
      headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
    })
    .catch(console.log)
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",  
      headers: this._headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
    })
    .catch(console.log)
  }

  addAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",  
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    }).then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
    })
    .catch(console.log)
  }
} 

