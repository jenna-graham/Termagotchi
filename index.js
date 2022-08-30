#!/usr/bin/env node
require('dotenv').config();
const { signUpUser, getPromptsById } = require('./lib/utils/utils');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { prompt, happy_choice, neglect_choice } = getPromptsById(1);

const setUser = async () => {
  inquirer
    .prompt([
      {
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
      console.log(chalk.bold(`Say hi to ${answers.username}!`));
      return signUpUser(answers.username, answers.password);
    })
    .then((user) => {
      storyLine(user);
    });
};

const storyLine = () => {
  inquirer
    .prompt([
      {
        name: 'Question',
        type: 'list',
        message: 'Do you want to walk?',
        choices: ['yes', 'no'],
      },
    ])
    .then((answers) => {
      console.log(answers.Question);
    });
};

// const storyLine = async (storyId) => {
//   let currentPrompts = {};
//   getPromptsById(storyId)
//     .then((prompts) => {
//       currentPrompts = prompts;
//       return getPromptsById(prompts.neglect_path_id);

//     });

setUser();
