#!/usr/bin/env node
/* eslint-disable no-console */
require('dotenv').config();
const { signUpUser, getPromptsById } = require('./lib/utils/utils');
const chalk = require('chalk');
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
      whitespaceBreak: true
    },
    (err, data) => {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      console.log(chalk.bold.magenta(data));
    });
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
      if(answers.auth === true) {
        console.log(chalk.rgb(232, 133, 52)(excited));
        storyLine();
      }
      if(answers.auth === false) {
        signUp();
      }
    });

    
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
        console.log(chalk.rgb(232, 133, 52)(excited));
        return signUpUser(answers.username, answers.password);
      })
      .then((user) => {
        storyLine(user);
      });
  };
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

// setUser();

startStory().then(() => setUser());                        


