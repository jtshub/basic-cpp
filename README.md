# generator-basic-cpp [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> A basic C++ app generator.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-basic-cpp using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-basic-cpp
```

Then generate your new project:

```bash
yo basic-cpp
```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

 ## Basic flow
 * app name  -- what is your cpp application name?
    * create directory
    * create a main.cpp
    * create an assoicated makefile that outputs the app name

## To Do
* write out the Readme.md
* add the ability to reference boost and opengl
* add the ability to regenerate the makefile when creating a new class
* add unit tests
* add option to regerate makefile when we add a class

## class subgenerator
* just call with your class name
    * generates the class with a constructor and deconstructor

## License

MIT © [John Thomas]()


[npm-image]: https://badge.fury.io/js/generator-basic-cpp.svg
[npm-url]: https://npmjs.org/package/generator-basic-cpp
[travis-image]: https://travis-ci.org/jthub/generator-basic-cpp.svg?branch=master
[travis-url]: https://travis-ci.org/jthub/generator-basic-cpp
[daviddm-image]: https://david-dm.org/jthub/generator-basic-cpp.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/jthub/generator-basic-cpp
