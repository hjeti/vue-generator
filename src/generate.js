const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const async = require('async');
const metalsmith = require('metalsmith');
const render = require('consolidate').handlebars.render;
const toSlugCase = require('to-slug-case');
const toCamelCase = require('to-camel-case');
const toPascalCase = require('to-pascal-case');
const isTextOrBinary = require('istextorbinary');

module.exports = function generate(type, options, settings) {
  if (settings.templatePath == '') {
    settings.templatePath = path.join(__dirname, '../template');
  }

  if (!pathExists(settings.templatePath)) {
    console.log();
    console.error(chalk.red(`Template folder (${path.resolve(settings.templatePath)}) doesn't exist`));
    return;
  }

  const fullTemplatePath = path.join(settings.templatePath, '/' + type);

  if (!pathExists(fullTemplatePath)) {
    console.log();
    console.log(chalk.red(`'${options.type}' template folder doesn't exist in ${path.resolve(settings.templatePath)}`));
    return;
  }

  console.log();
  console.log(chalk.green(chalk.bold(`Generating files from '${type}' template with name: ${options.name}`)));

  metalsmith(fullTemplatePath)
    .metadata(Object.assign({}, getNames(options.name)))
    .source('.')
    .destination(path.resolve(options.destination))
    .clean(false)
    .use(renderPaths)
    .use(renderTemplates)
    .build(function (err) {
      if (err) {
        console.error(chalk.red(err));
      }
      else {
        console.log();
        console.log(chalk.green('Done!'));
      }
    });
};

function getNames(name) {
  return {
    name,
    name_cc: toCamelCase(name),
    name_pc: toPascalCase(name),
    name_sc: toSlugCase(name)
  }
}

function pathExists(value) {
  return fs.existsSync(path.resolve(value));
}

function renderPaths(files, metalsmith, done) {
  const keys = Object.keys(files);
  const metadata = metalsmith.metadata();

  keys.forEach((key) => {
    let newKey = replaceVars(key, metadata);

    if (newKey != key) {
      files[newKey] = files[key];
      delete files[key];
    }
  });

  done();
}

function renderTemplates(files, metalsmith, done) {
  const keys = Object.keys(files);
  const metadata = metalsmith.metadata();

  async.each(keys, run, done);

  function run(file, done) {
    if(isTextOrBinary.isBinarySync(path.basename(file), files[file].contents)) {
      done();
      return;
    }

    let str = files[file].contents.toString();
    render(str, metadata, function (err, res) {
      if (err) {
        return done(err);
      }
      files[file].contents = new Buffer(res);
      done();
    });
  }
}

function replaceVars(value, object) {
  return value.replace(/\$?\{([@#$%&\w\.]*)(\((.*?)\))?\}/gi, (match, name) => {
    const props = name.split(".");
    const prop = props.shift();
    let o = object;

    if (o != null && prop in o) {
      return o[prop];
    }
    return '';
  });
}

