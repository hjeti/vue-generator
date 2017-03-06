#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const Settings = require('../src/settings');
const generate = require('../src/generate');
const fs = require('fs');
const path = require('path');

module.exports = function generateDirect(type, destinationSettingsKey) {
  let componentName = null;

  program
    .usage('<name>')
    .arguments('<name>')
    .action((name) => {
      componentName = name;
    })
    .option('-d, --destination <destination>', 'Override destination')
    .option('-p, --template-path <template-path>', 'Override template path')
    .option('-t, --template <template>', 'Override template type')
    .option('-f, --force', 'Force creation of a component')
    .parse(process.argv);


  if (!componentName) {
    console.error(chalk.red('No name given'));
    process.exit(1);
  }

  let settingsOverrides = {};

  if (program.destination) {
    settingsOverrides[destinationSettingsKey] = program.destination;
  }

  if (program.templatePath) {
    settingsOverrides['templatePath'] = program.templatePath;
  }

  if (program.template) {
    type = program.template;
  }

  const settings = Settings.getSettings(settingsOverrides);
  const destination = settings[destinationSettingsKey];

  if (!fs.existsSync(destination) && !program.force) {
    console.error(chalk.red(`Destination path (${path.resolve(destination)}) doesn't exist. Use '-force' or '-f' to generate missing folders.`));
    process.exit(1);
  }

  const options = {
    name: componentName,
    destination: destination
  };

  generate(type, options, settings);
};







