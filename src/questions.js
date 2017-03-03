const templateType = require('./templateType');
const wizardType = require('./wizardType');
const path = require('path');
const fs = require('fs');

module.exports = function questions(type, settings, name) {
  let questions;

  console.log('*', name);

  switch (type) {
    case wizardType.WIZARD: {
      questions = [askType(), askName(name), askDestination(templateType.PAGE, settings.pageDestination, true), askDestination(templateType.STORE, settings.storeDestination, true), askDestination(templateType.COMPONENT, settings.componentDestination, true)];
      break;
    }
    case wizardType.STORE: {
      questions = [askName(name), askDestination(templateType.STORE, settings.storeDestination)];
      break;
    }
    case wizardType.COMPONENT: {
      questions = [askName(name), askDestination(templateType.COMPONENT, settings.componentDestination)];
      break;
    }
    case wizardType.PAGE: {
      questions = [askName(name), askDestination(templateType.PAGE, settings.pageDestination)];
      break;
    }
  }

  return questions;
};

function askType() {
  return {
    type: 'list',
    name: 'type',
    message: 'What do you want to generate?',
    choices: Object.keys(templateType).map((key) => templateType[key])
  }
}

function askName(defaultName) {
  console.log('askName', defaultName);

  return {
    type: 'input',
    name: 'name',
    message: 'What name do you want to use?',
    default: defaultName || ''
  }
}

function askDestination(name, defaultDestination, optional = false) {
  return {
    type: 'input',
    name: 'destination',
    message: 'Where do you want to create the ' + name + '?',
    default: defaultDestination || '',
    when(answers){
      return !optional || (optional && answers.type == name);
    },
    validate(input){
      const destination = path.resolve(input);

      if (!fs.existsSync(destination)) {
        return `path: ${destination} doesn't exist`;
      }
      return true;
    }
  }
}
