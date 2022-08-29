require('dotenv').config();

const agent = require('superagent');
const chalk = require('chalk');
const GAME_URL = 'http://localhost:7890';
const cookie = require('cookie');

const signUpUser = async (username, password) => {
  const res = await agent
    .post(`${GAME_URL}/users`)
    .send({ username, password })
    .catch((error) => error);
  return res.body;
};

module.exports = {
  signUpUser,
};
