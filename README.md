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




## Templates

```console
$ vg -h
```

