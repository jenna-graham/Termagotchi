#!/usr/bin/env node
/* eslint-disable no-console */
require('dotenv').config();
const { signUpUser, getPromptsById, signInUser, logOutUser } = require('./lib/utils/utils');
const chalk = require('chalk');
const chalkRainbow = require('chalk-rainbow');
const gradient = require('gradient-string');
const inquirer = require('inquirer');
const figlet = require('figlet');
const sound = require('sound-play');
const path = require('path');
const filePath = path.join(__dirname, 'sound.mp3');
const volume = 0.1;
const { 
  excited, 
  squirrel,
  fire, 
  mushroom,
  portal,
  taxi,
  chocolate,
  spaghetti,
  tokyo,
  trash2,
  karoke,
  tripshroom,
  prideful,
  knife,
  circus,
  school,
  toiletPaper,
  sad,
  bedroom,
  camera,
  playful,
  goblin,
  forest,
  pie,
  skull,
  parade,
  cereal,
  heart,
  heart2,
  heart3,
  suitcase,
} = require('./lib/utils/ascii');

const sleep = (ms = 3000) => new Promise((r) => setTimeout(r, ms));
const asciiMap = { 
  2: forest,
  3: spaghetti,
  4: mushroom,
  5: gradient.pastel(portal),
  6: taxi,
  7: chocolate,
  8: pie,
  9: chalk.yellow(squirrel),
  10: skull,
  11: gradient.fruit(fire),
  12: tokyo,
  13: trash2,
  14: parade,
  15: cereal,
  16: karoke,
  17: gradient.rainbow(tripshroom),
  18: prideful,
  19: heart,
  20: knife,
  21: heart2,
  22: circus,
  23: heart3,
  24: school,
  25: suitcase,
  26: prideful,
  27: toiletPaper,
  28: playful,
  29: spaghetti,
  30: heart3,
  31: sad,
  32: bedroom,
  33: camera,
  34: playful,
  35: goblin,
};

async function startStory() {
  sound.play(filePath, volume);

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
        return signIn();
      }
      if (answers.auth === false) {
        return signUp();
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
        return storyLine(1);
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
      return storyLine(1);
    });
};

const storyLine = (id = 1) => {
  if (id === 0) {
    console.log('Thank you for playing!');
    console.log('Developed by: Jenna Graham, Jessica Martin, Mariah Schock, Colter Garrison');
    return logOutUser().then(() => startStory());
  }
  return getPromptsById(id).then((prompts) => {
    const {
      prompt,
      happy_choice,
      neglect_choice,
      happy_path_id,
      neglect_path_id,
    } = prompts;
    if (asciiMap[prompts.id]) console.log(asciiMap[prompts.id]);
    return inquirer
      .prompt([
        {
          name: 'options',
          type: 'list',
          message: chalk.greenBright.bgBlack(prompt),
          choices: [happy_choice, neglect_choice],
        },
      ])
      .then((options) => {
        console.log(options);
        if (options.options === happy_choice) {
          console.clear();
          return storyLine(happy_path_id);
        }
        if (options.options === neglect_choice) {
          console.clear();
          return storyLine(neglect_path_id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

startStory().then(() => setUser());
