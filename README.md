# vue-generator
A CLI generator for Vue components, views and store modules

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

## Commands

#### help

Show help

```console
$ vg -h
```

#### wizard

Starts a wizard to create a component, view or store. 

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

Examples:
```console
$ vg component check-box
$ vg component RadioButton -d ./components/ui 
$ vg component videoPlayer -d ./src/components/players/ -t base-video-component
```

## Templates

```console
$ vg -h
```

