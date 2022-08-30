#!/usr/bin/env node
/* eslint-disable no-console */
require('dotenv').config();
const { signUpUser, getPromptsById } = require('./lib/utils/utils');
const chalk = require('chalk');
const inquirer = require('inquirer');

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
  getPromptsById(1).then((prompts) => {
    const { prompt, happy_choice, neglect_choice } = prompts;
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
      });
  });
};

// const storyLine = async (id) => {
//   getPromptsById(id).then((prompts) => {
//     prompts;
//     inquirer
//       .prompt([
//         {
//           type: 'list',
//           message: prompts,
//           name: 'option',
//           choices: [prompts.happy_choice, prompts.neglect_choice],
//         },
//       ])
//       .then((answers) => {
//         getPromptsById(id).then((prompts) => {
//           prompts;
//           answers.option === prompts.happy_choice
//             ? storyLine(prompts.happy_path_id)
//             : storyLine(prompts.neglect_path_id);
//         });
//       });
//   });
// };

// const storyLine = async () => {
//   console.log('it works');
//   getPromptsById(1).then((prompts) => {
//     console.log(getPromptsById(1));
//     return getPromptsById(prompts.neglect_choice);
//   });
// };

// const storyLine = async (storyId) => {
//   let currentPrompts = {};
//   getPromptsById(storyId)
//     .then((prompts) => {
//       currentPrompts = prompts;
//       return getPromptsById(prompts.neglect_path_id);

//     });

setUser();
