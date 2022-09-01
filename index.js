#!/usr/bin/env node
/* eslint-disable no-console */
require('dotenv').config();
const { signUpUser, getPromptsById, signInUser } = require('./lib/utils/utils');
const chalk = require('chalk');
const chalkRainbow = require('chalk-rainbow');
const gradient = require('gradient-string');
const inquirer = require('inquirer');
const figlet = require('figlet');

const { excited } = require('./lib/utils/ascii');

const sleep = (ms = 3000) => new Promise((r) => setTimeout(r, ms));

async function startStory() {
  figlet.text(
    'Termagotchi',
    {
      font: 'puffy',
      horizontalLayout: 'fitted',
      verticalLayout: 'fitted',
      width: 80,
      whitespaceBreak: true,
    },
    (err, data) => {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      console.log(gradient.rainbow(data));
      console.log(chalkRainbow(data));
    }
  );
  await sleep();
  console.clear();
}

const setUser = async () => {
  inquirer
    .prompt([
      {
        name: 'auth',
        type: 'confirm',
        message: 'Do you already have an account?',
      },
    ])
    .then((answers) => {
      if (answers.auth === true) {
        signIn();
      }
      if (answers.auth === false) {
        signUp();
      }
    });

  const signIn = async () => {
    inquirer
      .prompt([
        {
          prefix: '*',
          name: 'username',
          message: 'Enter your Termagotchi name:',
        },
        {
          prefix: '*',
          name: 'password',
          type: 'password',
          message: 'Enter your password',
        },
      ])
      .then((answers) => {
        console.log(chalk.bold(`Welcome back to ${answers.username}!`));
        console.log(gradient.retro(excited));
        return signInUser(answers.username, answers.password);
      })
      .then(() => {
        storyLine(1);
      });
  };
};

const signUp = async () => {
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
      console.log(gradient.retro(excited));
      return signUpUser(answers.username, answers.password);
    })
    .then(() => {
      storyLine(1);
    });
};

const storyLine = (id = 1) => {
  getPromptsById(id).then((prompts) => {
    const {
      prompt,
      happy_choice,
      neglect_choice,
      happy_path_id,
      neglect_path_id,
    } = prompts;
    inquirer
      .prompt([
        {
          name: 'options',
          type: 'list',
          message: prompt,
          choices: [happy_choice, neglect_choice],
        },
      ])
      .then((options) => {
        console.log(options);
        if (options.options === happy_choice) {
          storyLine(happy_path_id);
        }
        if (options.options === neglect_choice) {
          storyLine(neglect_path_id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

startStory().then(() => setUser());
