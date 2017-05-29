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

    // Only add this prompt if it was not specified as an arguement.
    if (!this.options.appname) {
      prompts.push({
        type: 'input',
        name: 'name',
        message: 'What would you like your application name to be?',
        default: this.config.get('appname') || this.appname
      });
    }

    prompts.push({
      type: 'confirm',
      name: 'projectDir',
      message: 'Create a project directory?',
      default: this.config.get('projectDir') || 'Y'
    });

    prompts.push({
      type: 'confirm',
      name: 'cpp11',
      message: 'Would you like to use C++ 11 syntax?',
      default: this.config.get('cpp11') || 'Y'
    });

    return this.prompt(prompts).then(answers => {
      if (answers.name) {
        this.options.appname = answers.name;
      }

      if (answers.projectDir) {
        this.options.projectDir = answers.projectDir;
        this.options.projectDirName = this.options.appname;
      }
      this.options.cpp11 = answers.cpp11;

      // Store the supplied settings.
      this.config.set('appname', this.options.appname);
      this.config.set('projectDir', this.options.projectDir);
      this.config.set('cpp11', this.options.cpp11);
      this.config.save();
    });
  }

  configuring() {
  }

  default() {
  }
  writing() {
    var destination = '';
    if (this.options.projectDirName) {
      destination = this.options.projectDirName + '/';
    }
    this.fs.copyTpl(
       this.templatePath('_CMakeLists.txt'),
       this.destinationPath(destination + 'CMakeLists.txt'), {
         appname: this.options.appname
       }
    );

    this.fs.copy(
      this.templatePath('_main.cpp'),
      this.destinationPath(destination + 'main.cpp')
    );
  }

  conflicts() {
  }

  install() {
  }

  end() {
  }
};
