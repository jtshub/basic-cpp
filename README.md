## generator-basic-cpp [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> A basic C++ app generator.

## Additional requirements

This generator relies on [Cmake](https://cmake.org/) version 3.7.2 or higher to generate makefiles.  Once Cmake is installed, make sure it is in our path and is referenceable from the command line. 

## Installation

First, install [Yeoman](http://yeoman.io) and generator-basic-cpp using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-basic-cpp
```

## Help
```bash
yo basic-cpp --help
```
## Usage

Generating a new C++ application.  Specifying an application name is required, if you forget, you will be prompted for it.

```bash
yo basic-cpp [appname]
```

Adding a new class to your application.  New classes have their own header and implementation files.  Each time you add a new class [Cmake](https://cmake.org) you will have the option to regenerate the makefile. 

```bash
yo basic-cpp:class [classname]
```

## Visual Studio Code integration

This generator will setup a basic set of [Visual Studio Code](https://code.visualstudio.com) settings under the .vscode directory within your project directory.  Additionally, you should have the [C/C++ Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) from Microsoft installed.

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## To Do
* Have the generator setup the vscode settings to debug the application.
* Add support for both CLang and g++ compilers and allow the user to choose which to use.
* Add additional unit tests, especially around CMake generation.
* Add support for a testing framework and a sub-generator that will generate C++ tests.
* Generate License file for the C++ project.

## License

MIT © [John Thomas]()


[npm-image]: https://badge.fury.io/js/generator-basic-cpp.svg
[npm-url]: https://npmjs.org/package/generator-basic-cpp
[travis-image]: https://travis-ci.org/jthub/generator-basic-cpp.svg?branch=master
[travis-url]: https://travis-ci.org/jthub/generator-basic-cpp
[daviddm-image]: https://david-dm.org/jthub/generator-basic-cpp.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/jthub/generator-basic-cpp
