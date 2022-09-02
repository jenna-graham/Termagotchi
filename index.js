#!/usr/bin/env node
/* eslint-disable no-console */
require('dotenv').config();
const { signUpUser, getPromptsById, signInUser, logOutUser } = require('./lib/utils/utils');
const chalk = require('chalk');
const chalkRainbow = require('chalk-rainbow');
const gradient = require('gradient-string');
const inquirer = require('inquirer');
const figlet = require('figlet');
// const sound = require('sound-play');
const player = require('play-sound')();
const path = require('path');
const filePath = path.join(__dirname, 'sound.mp3');
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
  2: gradient.summer(forest),
  3: gradient.fruit(spaghetti),
  4: gradient.cristal(mushroom),
  5: gradient.pastel(portal),
  6: chalk.yellow(taxi),
  7: gradient.passion(chocolate),
  8: gradient.fruit(pie),
  9: chalk.yellow(squirrel),
  10: chalk.bold.white(skull),
  11: gradient.fruit(fire),
  12: gradient.instagram(tokyo),
  13: chalk.blackBright(trash2),
  14: gradient.passion(parade),
  15: gradient.fruit(cereal),
  16: gradient.instagram(karoke),
  17: gradient.rainbow(tripshroom),
  18: gradient.atlas(prideful),
  19: gradient.atlas(heart),
  20: chalk.blackBright(knife),
  21: gradient.passion(heart2),
  22: gradient.pastel(circus),
  23: gradient.morning(heart3),
  24: gradient.retro(school),
  25: gradient.teen(suitcase),
  26: gradient.atlas(prideful),
  27: chalk.bold.white(toiletPaper),
  28: gradient.summer(playful),
  29: gradient.fruit(spaghetti),
  30: gradient.morning(heart3),
  31: gradient.mind(sad),
  32: gradient.vice(bedroom),
  33: gradient.instagram(camera),
  34: gradient.summer(playful),
  35: chalk.green(goblin),
};

async function startStory() {
  // sound.play(filePath, volume);
  
  player.play(filePath, (err) => {
    if (err) console.log(`Could not play sound: ${err}`);
  });

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
