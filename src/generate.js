const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const async = require('async');
const metalsmith = require('metalsmith');
const render = require('consolidate').handlebars.render;
const toSlugCase = require('to-slug-case');
const toCamelCase = require('to-camel-case');
const toPascalCase = require('to-pascal-case');

module.exports = function generate(type, options, settings)
{
	if(settings.templatePath == '')
	{
		settings.templatePath = path.join(__dirname, '../template');
	}

	if(!pathExists(settings.templatePath))
	{
		console.log();
		console.error(chalk.red(`template folder (${settings.templatePath}) doesn't exist`));
		return;
	}

	const fullTemplatePath = path.join(settings.templatePath, '/' + type);

	if(!pathExists(fullTemplatePath))
	{
		console.log();
		console.log(chalk.red(`'${options.type}' folder doesn't exist in ${settings.templatePath}`));
		return;
	}

	console.log();
	console.log(chalk.green(chalk.bold(`Generating ${type} with name: ${options.name}`)));

	metalsmith(fullTemplatePath)
		.metadata(Object.assign({}, getNames(options.name)))
		.source('.')
		.destination(path.resolve(options.destination))
		.clean(false)
		.use(renderPaths)
		.use(renderTemplates)
		.build(function(err)
		{
			if(err)
			{
				console.error(chalk.red(err));
			}
			else
			{
				console.log();
				console.log(chalk.green('Done!'));
			}
		});
};

function getNames(name)
{
	return {
		name,
		name_cc: toCamelCase(name),
		name_pc: toPascalCase(name),
		name_sc: toSlugCase(name)
	}
}

function pathExists(value)
{
	return fs.existsSync(path.resolve(value));
}

function renderPaths(files, metalsmith, done)
{
	var keys = Object.keys(files);
	var metadata = metalsmith.metadata();

	keys.forEach((key)=>
	{
		let newKey = replaceVars(key, metadata);

		if(newKey != key)
		{
			files[newKey] = files[key];
			delete files[key];
		}
	});

	done();
}

function renderTemplates(files, metalsmith, done)
{
	var keys = Object.keys(files);
	var metadata = metalsmith.metadata();

	async.each(keys, run, done);

	function run(file, done)
	{
		var str = files[file].contents.toString();
		render(str, metadata, function(err, res)
		{
			if(err)
			{
				return done(err);
			}
			files[file].contents = new Buffer(res);
			done();
		});
	}
}

function replaceVars(value, object)
{
	return value.replace(/\$?\{([@#$%&\w\.]*)(\((.*?)\))?\}/gi, (match, name) =>
	{
		var props = name.split(".");
		var prop = props.shift();
		var o = object;

		if(o != null && prop in o)
		{
			return o[prop];
		}
		return '';
	});
}

