require('dotenv').config();

const fetch = require('cross-fetch');
const GAME_URL = 'http://localhost:7890';
const cookie = require('cookie');

const signUpUser = async (username, password) => {
  const res = await fetch(`${GAME_URL}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  });
  const cookieInfo = cookie.parse(res.headers.raw()['set-cookie'][0]);
  const user = await res.json();
  return [cookieInfo, user];
};

const signInUser = async (username, password) => {
  const res = await fetch(`${GAME_URL}/users/sessions`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  const cookieInfo = cookie.parse(res.headers.raw()['set-cookie'][0]);
  const user = await res.json();
  return [cookieInfo, user];
};

const logOutUser = async () => {
  const res = await fetch(`${GAME_URL}/users`, {
    method: 'DELETE',
    credentials: 'include',
  });
  res.response = 'You are logged out!';
};

const getPromptsById = async (id) => {
  const res = await fetch(`${GAME_URL}/actions/${id}`, {
    method: 'GET',
    header: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (res.error) {
    console.error(res.error.message);
  } else {
    return res.json(res.data);
  }
};

module.exports = {
  signUpUser,
  signInUser,
  getPromptsById,
  logOutUser,
};
