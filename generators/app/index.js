'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('appname', {type: String, required: false});
  }

  initializing() {
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the awe-inspiring ' + chalk.red('generator-basic-cpp') + ' generator!'
    ));

    let prompts = [];

    // Only add this prompt of it was not specified as an arguement.
    if (!this.options.appname) {
      prompts.push({
        type: 'input',
        name: 'name',
        message: 'What would you like your application name to be?',
        default: this.appname
      });
    }

    prompts.push({
      type: 'confirm',
      name: 'projectDir',
      message: 'Create a project directory?'
    });

    prompts.push({
      type: 'confirm',
      name: 'cpp11',
      message: 'Would you like to use C++ 11 syntax?'
    });

    this.prompt(prompts).then(answers => {
      if (answers.name) {
        this.options.appname = answers.name;
      }

      if (answers.projectDir) {
        this.options.projectDir = answers.projectDir;
        this.options.projectDirName = this.options.appname;
      }
      this.options.cpp11 = answers.cpp11;
    });
  }

  configuring() {
  }

  default() {
  }
  writing() {
    // this.log('temp path is ' + this.templatePath());
    // this.log('dest path is ' + this.destinationPath());
    // this.fs.copy(
    //   this.templatePath('dummyfile.txt'),
    //   this.destinationPath('dummyfile.txt')
    // );
  }

  conflicts() {
  }

  install() {
  }

  end() {
  }
};
