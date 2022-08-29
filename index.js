#!/usr/bin/env node
require('dotenv').config();
const { signUpUser } = require('./lib/utils/user-utils');
const chalk = require('chalk');
const prompt = require('prompt-sync')();
const cookie = require('cookie');
const inquirer = require('inquirer');

const setUser = async () => {
  inquirer
    .prompt([{
      prefix: '*',
      name: 'username',
      message: 'Name your termagotchi!',
    },
    ])
    .then((answer) => {
      console.log(
        chalk.bold(
          `Say hi to ${answer.username}!`
        )
      );
      return signUpUser(answer.username);
    });

};

setUser();


console.log('hello world');
