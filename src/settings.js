const userSettings = require('user-settings').file('.vuegenerator');

const defaultSettings = {
  pageDestination: './src/page/',
  storeDestination: './src/store/module/',
  componentDestination: './src/component/',
  templatePath: ''
};

exports.getSettings = function (overrides = {}) {
  return Object.assign({}, defaultSettings, getUserSettings(), overrides);
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

function getLocalSettings() {

}

function saveSettingsLocal(overrides) {

}
