const Settings = require('./settings');
const inquirer = require('inquirer');
const Questions = require('./questions');
const chalk = require('chalk');

module.exports = function init() {
  let settings = Settings.getSettings();

  const questions = Questions.getSettingQuestions(settings);

  inquirer.prompt(questions).then((answers) => {
    Settings.setLocalSettings(answers);

    console.log();
    console.log(chalk.green('Local settings:'));

    Settings.logSettings(Settings.getLocalSettings());
  });
};


