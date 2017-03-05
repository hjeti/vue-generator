const Settings = require('./settings');
const Questions = require('./questions');
const inquirer = require('inquirer');
const generate = require('./generate');

module.exports = function wizard(type, name) {
  let settingOverrides = {};

  let settings = Settings.getSettings(settingOverrides);

  let questions = Questions.getGeneratorQuestions(type, settings, name);

  inquirer.prompt(questions).then((answers) => {
    generate(answers.type || type, answers, settings);
  });
};
