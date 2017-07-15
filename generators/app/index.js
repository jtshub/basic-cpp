'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const util = require('../util');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('appname', {type: String, required: false});
    var notMakeOptArgs = {
      description: 'Skip the CMake generation of the makefile.',
      type: Boolean,
      default: false
    };

    this.option('doNotMake', notMakeOptArgs);
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
      name: 'setupVSC',
      message: 'Setup Visual Studio code settings?',
      default: this.config.get('setupVSC') || 'Y'
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
      this.options.setupVSC = answers.setupVSC;

      // Store the supplied settings.
      this.config.set('appname', this.options.appname);
      this.config.set('projectDir', this.options.projectDir);
      this.config.set('projectDirName', this.options.projectDirName);
      this.config.set('setupVSC', this.options.setupVSC);
      this.config.set('cpp11', this.options.cpp11);
      this.config.save();
    });
  }

  writing() {
    var destination = '';
    if (this.options.projectDirName) {
      destination = this.options.projectDirName + '/';
    }

    if (this.options.setupVSC) {
      this.fs.copyTpl(
        this.templatePath('_vscode/_tasks.json'),
        this.destinationPath(destination + '.vscode/tasks.json')
      );

      this.fs.copyTpl(
        this.templatePath('_vscode/_launch.json'),
        this.destinationPath(destination + '.vscode/launch.json'), {
          appname: this.options.appname
        }
      );

      this.fs.copyTpl(
        this.templatePath('_vscode/_c_cpp_properties.json'),
        this.destinationPath(destination + '.vscode/c_cpp_properties.json')
      );
    }

    var use11 = 'OFF';
    if (this.options.cpp11) {
      use11 = 'ON';
    }

    this.fs.copyTpl(
       this.templatePath('_CMakeLists.txt'),
       this.destinationPath(destination + 'CMakeLists.txt'), {
         appname: this.options.appname,
         cpp11: use11
       }
    );

    this.fs.copy(
      this.templatePath('_main.cpp'),
      this.destinationPath(destination + 'src/main.cpp')
    );
  }

  end() {
    var theName = this.options.appname;
    var createdMsg = 'Project ' + theName + ' has been created.';
    this.log(this.options.doNotMake);
    if (this.options.doNotMake) {
      this.log(chalk.red(createdMsg));
      this.log(chalk.red('The automatic generation of the makefile has been skipped, run "CMake CMakeLists.txt" to generate the makefile for this project.'));
    } else {
      var cmake = util.cmake(this.spawnCommand, this.config.get('projectDirName'));
      cmake.on('exit', function () {
        console.log(chalk.red(createdMsg));
      });
    }
  }
};
