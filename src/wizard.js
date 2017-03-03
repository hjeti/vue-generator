const Settings = require('./settings');
const getQuestions = require('./questions');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const generate = require('./generate');

module.exports = function wizard(type, name)
{
	let settingOverrides = {};

	if(name)
	{
        settingOverrides['defaultName'] = name;
	}

	let settings = Settings.getSettings(settingOverrides);

	let questions = getQuestions(type, settings);

	inquirer.prompt(questions).then((answers) =>
	{
		generate(answers.type || type, answers, settings);
	});
};
