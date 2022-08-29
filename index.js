#!/usr/bin/env node
require('dotenv').config();
const { signUpUser } = require('./lib/utils/user-utils');
const chalk = require('chalk');
const inquirer = require('inquirer');

const setUser = async () => {
  inquirer
    .prompt([{
      prefix: '*',
      name: 'username',
      message: 'Name your Termagotchi!',
    },
    {
      prefix: '*',
      name: 'password',
      type: 'password',
      message: 'Enter your password',
    },
    ])
    .then((answers) => {
      console.log(
        chalk.bold(
          `Say hi to ${answers.username}!`
        )
      );
      return signUpUser(answers.username, answers.password);
    });

};

setUser();
