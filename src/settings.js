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

exports.getSettings = function (overrides = {}) {
  return Object.assign({}, defaultSettings, getUserSettings(), getLocalSettings(), overrides);
};

exports.resetSettings = function () {
  Object.keys(defaultSettings).forEach(key => userSettings.unset(key));
};

exports.setSettings = function (settings) {
  Object.keys(settings).forEach(key => userSettings.set(key, settings[key]));
};

function getUserSettings() {
  return Object.keys(defaultSettings).reduce((settings, key) => {
    const setting = userSettings.get(key);

    if (setting) {
      settings[key] = setting;
    }

    return settings;
  }, {});
}

function hasLocalSettings() {
  return fs.existsSync(path.resolve(settingsFile));
}

function getLocalSettings() {
  if (hasLocalSettings()) {
    const fileContent = fs.readFileSync(path.resolve(settingsFile), {encoding: 'utf-8'});

    let settings;

    try {
      settings = JSON.parse(fileContent);
    } catch (e) {
      console.error(chalk.red(`Error parsing ${settingsFile} file.`));
      process.exit(1);
    }

    return settings;
  }

  return {};
}

function saveLocalSettings(overrides) {

}
