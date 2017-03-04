const settingsFile = '.vuegenerator';

const userSettings = require('user-settings').file(settingsFile);
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const defaultSettings = {
  pageDestination: './src/page/',
  storeDestination: './src/store/module/',
  componentDestination: './src/component/',
  templatePath: ''
};

exports.getSettings = function (overrides = {}, ignoreLocalSettings = false) {
  const localSettings = ignoreLocalSettings ? {} : this.getLocalSettings();

  return Object.assign({}, defaultSettings, this.getUserSettings(), localSettings, overrides);
};

exports.resetSettings = function () {
  Object.keys(defaultSettings).forEach(key => userSettings.unset(key));
};

exports.setGlobalSettings = function (settings) {
  Object.keys(settings).forEach(key => userSettings.set(key, settings[key]));
};

exports.setLocalSettings = function (settings) {
  fs.writeFileSync(path.resolve(settingsFile), JSON.stringify(settings, null, 2));
};

exports.hasLocalSettings = function (settings) {
  return fs.existsSync(path.resolve(settingsFile));
};

exports.getLocalSettings = function (settings) {
  if (this.hasLocalSettings()) {
    const fileContent = fs.readFileSync(path.resolve(settingsFile), {encoding: 'utf-8'});

    let settings;

    try {
      settings = JSON.parse(fileContent);
    } catch (e) {
      console.error(chalk.red(`Error parsing local ${settingsFile} file.`));
      process.exit(1);
    }

    return settings;
  }

  return {};
};

exports.getUserSettings = function () {
  return Object.keys(defaultSettings).reduce((settings, key) => {
    const setting = userSettings.get(key);

    if (setting) {
      settings[key] = setting;
    }

    return settings;
  }, {});
};

exports.logSettings = function (settings) {
  return Object.keys(settings).forEach((key) => {
    console.log(`${chalk.bold(key)}: '${settings[key]}'`);
  });
};

