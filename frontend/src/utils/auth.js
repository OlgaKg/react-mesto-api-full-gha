// export const BASE_URL = 'http://localhost:3000';
export const BASE_URL = 'https://api.ypmesto.nomoreparties.co';

const checkReply = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`)
    }
};

const request = async (url, options) => {
    return fetch(`${BASE_URL}/${url}`, options).then(checkReply);
};

export const registerUser = (email, password) => {
    return request(`signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    })
};

export const loginUser = (email, password) => {
    return request(`signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    })
};

export const getContent = () => {
    return request(`users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
};