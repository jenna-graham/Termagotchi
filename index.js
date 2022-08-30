#!/usr/bin/env node
/* eslint-disable no-console */
require('dotenv').config();
const { signUpUser } = require('./lib/utils/utils');
const chalk = require('chalk');
const inquirer = require('inquirer');
const figlet = require('figlet');
const sleep = (ms = 3000) => new Promise((r) => setTimeout(r, ms));

async function startStory() {
  figlet.text(
    'Termagotchi',
    {
      font: 'puffy',
      horizontalLayout: 'fitted',
      verticalLayout: 'fitted',
      width: 80,
      whitespaceBreak: true
    },
    (err, data) => {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      console.log(chalk.magenta(data));
    });
  await sleep();
  console.clear();
}


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

// setUser();
startStory().then(() => setUser());
