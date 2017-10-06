# vue-generator
A CLI generator for Vue components, views and store modules

Supports Vue 2.x

## Install

```console
$ npm install -g vue-generator
```

## Usage

The most basic command runs a wizard to create a component, view or store.

```console
$ vg
``` 

**Note**: Names can be inputted in any format (slug-case, camelCase, PascalCase etc.). 

## Templates

Vue generator comes with default templates but all the templates are fully customizable. 
There are two ways to customize templates:

**edit default templates**

The default templates can be customized to fit your needs. Run ```vg show-templates``` to open the default template directory.

**create custom templates**

It's also possible to create custom templates in another directory. 
The best way to start is by copying the default templates ```vg copy-templates``` and edit them. 
Don't forget to run ```vg init``` or set the template path with ```vg settings``` to use your custom templates with vue-generator

There are 3 template types:

* view
* component
* store

A template path should at least contain 3 folders with the names that match the template types.

#### custom template folders

It's also possible to add other custom template folders. If you created a custom template folder and want to use it 
when creating a view, store or component you have to set the ```-t, -template <template>``` option of the following commands
```vg component```, ```vg view``` and ```vg store```

#### Template folder structure

Inside a template folder there are no limits it can contain as much files and folder as possible.

#### Variables

Templates can be customized by using variables. Variables can be used as folder name in the following format ```{variable}```. 
Inside files you can use the handlebar syntax ```{{variable}}```.

**available variables:**

* ```name```: Name in it's original format
* ```name_pc```: Name converted to PascalCase
* ```name_sc```: Name converted to slug-case
* ```name_cc```: Name converted to CamelCase
* ```filename```: Filename - different from `name` as it takes into account any '/' included in the arguments.

See default templates for examples.

## Settings

There are four layers of settings (From least to most important):

* default global settings
* global settings in user directory .vuegenerator file
* local settings in .vuegenerator file in current directory
* options of the command you are running

An option will always override a local setting etc. 

The four layers combined determine the settings used in every command.

You can see the settings of a directory by running ```vg settings```. 
This is without the option overrides of course.

## Commands

#### help

Show help

```console
$ vg -h
```

#### wizard

Starts a wizard to create a component, view or store module. 

```console
$ vg wizard [type] [name]
```

Arguments:

* ```type```: (Optional) The type of template you want to use (store, page, view). 
* ```name```: (Optional) The name you want to use in the template.

Examples:
```console
$ vg
$ vg wizard view
$ vg wizard
$ vg wizard component scrollBar
```

#### init

Create a local settings file (.vuegenerator). Local settings always override global settings.

```console
$ vg init
```

#### component

Directly create a component based on the current settings.

```console
$ vg component <name>
```

Arguments:

* ```name```: The name you want to use for the component.

Options:

* ```-d, --destination <destination>```: Override the destination for component.
* ```-p, --template-path <template-path>```: Override template path.
* ```-t, --template <template>```: Override template type. By default it uses the 'component' folder from the template path. With this option you can use a different template folder.
* ```-f, --force```: Force creation of a component. By default it's impossible to create a component if the destination path doesn't exist. This option forces the creation of a component and will generates the destination folders if they don't exist. 

Examples:
```console
$ vg component check-box
$ vg component RadioButton -d ./components/ui 
$ vg component videoPlayer -d ./src/components/players/ -t base-video-component -f
```

#### view

Directly create a view based on the current settings.

```console
$ vg view <name>
```

Arguments:

* ```name```: The name you want to use for the view.

Options:

* ```-d, --destination <destination>```: Override the destination for view.
* ```-p, --template-path <template-path>```: Override template path.
* ```-t, --template <template>```: Override template type. By default it uses the 'view' folder from the template path. With this option you can use a different template folder.
* ```-f, --force```: Force creation of a view. By default it's impossible to create a component if the destination path doesn't exist. This option forces the creation of a component and will generates the destination folders if they don't exist. 

Examples:
```console
$ vg view home
$ vg view Contact -d ./components/view 
$ vg view video-detail -p ./custom-templates -t detail-view
```

#### store

Directly create a store module based on the current settings.

```console
$ vg store <name>
```

Arguments:

* ```name```: The name you want to use for the store module.

Options:

* ```-d, --destination <destination>```: Override the destination for store module.
* ```-p, --template-path <template-path>```: Override template path.
* ```-t, --template <template>```: Override template type. By default it uses the 'store' folder from the template path. With this option you can use a different template folder.
* ```-f, --force```: Force creation of a store. By default it's impossible to create a component if the destination path doesn't exist. This option forces the creation of a component and will generates the destination folders if they don't exist. 

Examples:
```console
$ vg store user
$ vg store shopping-cart -d ./modules 
$ vg store Car -t complex-store
```

#### settings

Set or display settings. Without any options it will display the settings. By default it will set the settings locally in a .vuegenerator file.
You can also set global settings by using the global option ```-g --global```.

```console
$ vg settings
```

Options:

* ```-v, --view-destination <destination>```: Set default view destination.
* ```-c, --component-destination <destination>```: Set default component destination.
* ```-s, --store-destination <destination>```: Set default store destination.
* ```-t, --template-path <template-path>```: Set template path.
* ```-l, --log```: Log global or local settings depending on the global flag.
* ```-g, --global```: Set global settings.

Examples:
```console
$ vg settings -l
$ vg settings -v ./view -c ./component -s ./store/modules -t ./template
$ vg settings -g -c ./components
```

#### reset

Reset global settings to the defaults.

```console
$ vg reset
```

#### show-templates

Open the default template directory. The default templates can be edited to fit your needs. 

```console
$ vg show-templates
```

#### copy-templates

Copy the default templates to another directory. This is handy when you want to customize the default templates. 
Don't forget to run ```vg init``` or set the template path with ```vg settings```.

```console
$ vg copy-templates
```






