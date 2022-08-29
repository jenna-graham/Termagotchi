require('dotenv').config();

// const agent = require('superagent');
// const chalk = require('chalk');
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
  console.log(cookieInfo);
  const user = await res.json();
  return [cookieInfo, user];
};

module.exports = {
  signUpUser,
};
